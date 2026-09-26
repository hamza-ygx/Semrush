import type { Db } from "@/lib/supabase/server";
import { crawlSite } from "./crawler";
import { searchAnalytics, searchAnalyticsAll } from "./gsc";

const day = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

async function insertChunks(db: Db, table: string, rows: object[], size = 500, upsert?: string) {
  for (let i = 0; i < rows.length; i += size) {
    const chunk = rows.slice(i, i + size);
    const { error } = upsert ? await db.from(table).upsert(chunk, { onConflict: upsert }) : await db.from(table).insert(chunk);
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}

export async function getProject(db: Db, projectId: string) {
  const { data, error } = await db.from("projects").select("id, domain, name, gsc_property, crawl_limit").eq("id", projectId).single();
  if (error || !data) throw new Error("Project not found");
  return data as { id: string; domain: string; name: string; gsc_property: string | null; crawl_limit: number };
}

export async function runCrawl(db: Db, projectId: string, budgetMs: number) {
  const project = await getProject(db, projectId);
  const { data: running } = await db.from("crawls").select("id").eq("project_id", projectId).eq("status", "running").gt("started_at", new Date(Date.now() - 10 * 60_000).toISOString()).limit(1);
  if (running?.length) throw new Error("A crawl is already running for this project");
  const { data: crawl, error } = await db.from("crawls").insert({ project_id: projectId }).select("id").single();
  if (error || !crawl) throw new Error(error?.message ?? "Could not start crawl");
  try {
    const r = await crawlSite(project.domain, { limit: project.crawl_limit, budgetMs });
    await insertChunks(db, "crawl_pages", r.pages.map((p) => ({ ...p, crawl_id: crawl.id })));
    await insertChunks(db, "crawl_issues", r.issues.map((i) => ({ ...i, crawl_id: crawl.id })), 1000);
    const summary = { status: "done", finished_at: new Date().toISOString(), pages_crawled: r.pages.length, health: r.health, ...r.counts };
    await db.from("crawls").update(summary).eq("id", crawl.id);
    return { crawlId: crawl.id, ...summary, truncated: r.truncated };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Crawl failed";
    await db.from("crawls").update({ status: "failed", finished_at: new Date().toISOString(), error: message.slice(0, 500) }).eq("id", crawl.id);
    throw e;
  }
}

export async function syncSearchConsole(db: Db, projectId: string) {
  const project = await getProject(db, projectId);
  const site = project.gsc_property ?? `sc-domain:${project.domain.replace(/^www\./, "")}`;
  const end = new Date(Date.now() - 2 * day);
  const dailyStart = new Date(end.getTime() - 486 * day);
  const { data: last } = await db.from("gsc_query_daily").select("date").eq("project_id", projectId).order("date", { ascending: false }).limit(1);
  const lastDate = last?.[0]?.date ? new Date(last[0].date as string).getTime() : 0;
  const queryStart = new Date(Math.max(end.getTime() - 90 * day, lastDate - 3 * day));
  let rows = 0;
  try {
    const daily = await searchAnalytics(site, { startDate: iso(dailyStart), endDate: iso(end), dimensions: ["date"], rowLimit: 25000, dataState: "all" });
    await insertChunks(
      db,
      "gsc_daily",
      daily.map((r) => ({ project_id: projectId, date: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
      500,
      "project_id,date",
    );
    const detail = await searchAnalyticsAll(site, { startDate: iso(queryStart), endDate: iso(end), dimensions: ["date", "query", "page", "country", "device"] });
    await insertChunks(
      db,
      "gsc_query_daily",
      detail.map((r) => ({ project_id: projectId, date: r.keys[0], query: r.keys[1], page: r.keys[2], country: r.keys[3], device: r.keys[4], clicks: r.clicks, impressions: r.impressions, position: r.position })),
      1000,
      "project_id,date,query,page,country,device",
    );
    rows = daily.length + detail.length;
    await db.from("gsc_syncs").insert({ project_id: projectId, start_date: iso(queryStart), end_date: iso(end), rows });
    return { site, rows, daily: daily.length, detail: detail.length, from: iso(queryStart), to: iso(end) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Sync failed";
    await db.from("gsc_syncs").insert({ project_id: projectId, start_date: iso(queryStart), end_date: iso(end), rows, error: message.slice(0, 500) });
    throw e;
  }
}
