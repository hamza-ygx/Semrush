import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { gscConfigured } from "@/lib/seo/gsc";
import { getProject, runCrawl, syncSearchConsole } from "@/lib/seo/jobs";
import { bingConfigured } from "@/lib/seo/bing";
import { ga4Configured } from "@/lib/seo/ga4";
import { ga4Property, runPsi, syncBing, syncGa4 } from "@/lib/seo/sourceJobs";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

function authorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization") ?? "";
  if (!secret || secret.length < 16) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(`Bearer ${secret}`);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sql) return NextResponse.json({ error: "Backend is not configured" }, { status: 503 });
  const started = Date.now();
  const projects = await sql<{ id: string; domain: string }[]>`select id, domain from projects order by created_at`;
  const results: Record<string, Record<string, unknown>> = {};
  for (const p of projects) {
    const r: Record<string, unknown> = {};
    if (gscConfigured()) {
      try {
        const s = await syncSearchConsole(sql, p.id, "cron");
        r.searchConsole = { rows: s.rows, to: s.to };
      } catch (e) {
        r.searchConsole = { error: e instanceof Error ? e.message : "failed" };
      }
    }
    const full = await getProject(sql, p.id);
    const attempt = async (name: string, fn: () => Promise<Record<string, unknown>>) => {
      try {
        r[name] = await fn();
      } catch (e) {
        r[name] = { error: e instanceof Error ? e.message : "failed" };
      }
    };
    if (ga4Configured() && ga4Property(full)) await attempt("ga4", () => syncGa4(sql!, full, "cron"));
    if (bingConfigured() && new Date().getUTCDay() === 1) await attempt("bing", () => syncBing(sql!, full, "cron"));
    if (280_000 - (Date.now() - started) > 120_000) await attempt("pagespeed", () => runPsi(sql!, full, "cron"));
    const left = 280_000 - (Date.now() - started);
    if (left > 30_000) {
      try {
        const c = await runCrawl(sql, p.id, Math.min(90_000, left - 20_000), "cron");
        r.crawl = { pages: c.pages_crawled, health: c.health };
      } catch (e) {
        r.crawl = { error: e instanceof Error ? e.message : "failed" };
      }
    } else r.crawl = { skipped: "time budget" };
    results[p.domain] = r;
  }
  return NextResponse.json({ ok: true, ms: Date.now() - started, results });
}
