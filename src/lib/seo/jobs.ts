import type { Sql } from "@/lib/db";
import { crawlSite } from "./crawler";
import { searchAnalytics, searchAnalyticsAll } from "./gsc";

const day = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);

export type ProjectRow = { id: string; domain: string; name: string; gsc_property: string | null; crawl_limit: number };

export async function getProject(db: Sql, projectId: string) {
  const [p] = await db<ProjectRow[]>`select id, domain, name, gsc_property, crawl_limit from projects where id = ${projectId}`;
  if (!p) throw new Error("Project not found");
  return p;
}

function chunks<T>(rows: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += size) out.push(rows.slice(i, i + size));
  return out;
}

export async function runCrawl(db: Sql, projectId: string, budgetMs: number, by: string) {
  const project = await getProject(db, projectId);
  const [running] = await db`select id from crawls where project_id = ${projectId} and status = 'running' and started_at > now() - interval '10 minutes' limit 1`;
  if (running) throw new Error("A crawl is already running for this project");
  const [crawl] = await db<{ id: string }[]>`insert into crawls (project_id, started_by) values (${projectId}, ${by}) returning id`;
  try {
    const r = await crawlSite(project.domain, { limit: project.crawl_limit, budgetMs });
    for (const c of chunks(r.pages, 500)) await db`insert into crawl_pages ${db(c.map((p) => ({ ...p, crawl_id: crawl.id })))}`;
    for (const c of chunks(r.issues, 1000)) await db`insert into crawl_issues ${db(c.map((i) => ({ ...i, crawl_id: crawl.id })), "crawl_id", "check_id", "severity", "url", "detail")}`;
    const summary = { status: "done", finished_at: new Date(), pages_crawled: r.pages.length, health: r.health, ...r.counts };
    await db`update crawls set ${db(summary)} where id = ${crawl.id}`;
    return { crawlId: crawl.id, ...summary, finished_at: summary.finished_at.toISOString(), truncated: r.truncated };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Crawl failed";
    await db`update crawls set status = 'failed', finished_at = now(), error = ${message.slice(0, 500)} where id = ${crawl.id}`;
    throw e;
  }
}

export async function syncSearchConsole(db: Sql, projectId: string, by: string) {
  const project = await getProject(db, projectId);
  const site = project.gsc_property ?? `sc-domain:${project.domain.replace(/^www\./, "")}`;
  const end = new Date(Date.now() - 2 * day);
  const dailyStart = new Date(end.getTime() - 486 * day);
  const [last] = await db<{ date: string }[]>`select max(date)::text as date from gsc_query_daily where project_id = ${projectId}`;
  const lastDate = last?.date ? new Date(last.date).getTime() : 0;
  const queryStart = new Date(Math.max(end.getTime() - 90 * day, lastDate - 3 * day));
  let rows = 0;
  try {
    const daily = await searchAnalytics(site, { startDate: iso(dailyStart), endDate: iso(end), dimensions: ["date"], rowLimit: 25000, dataState: "all" });
    for (const c of chunks(daily, 500))
      await db`insert into gsc_daily ${db(c.map((r) => ({ project_id: projectId, date: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })))}
        on conflict (project_id, date) do update set clicks = excluded.clicks, impressions = excluded.impressions, ctr = excluded.ctr, position = excluded.position`;
    const detail = await searchAnalyticsAll(site, { startDate: iso(queryStart), endDate: iso(end), dimensions: ["date", "query", "page", "country", "device"] });
    for (const c of chunks(detail, 1000))
      await db`insert into gsc_query_daily ${db(c.map((r) => ({ project_id: projectId, date: r.keys[0], query: r.keys[1], page: r.keys[2], country: r.keys[3], device: r.keys[4], clicks: r.clicks, impressions: r.impressions, position: r.position })))}
        on conflict (project_id, date, query, page, country, device) do update set clicks = excluded.clicks, impressions = excluded.impressions, position = excluded.position`;
    rows = daily.length + detail.length;
    await db`insert into gsc_syncs (project_id, start_date, end_date, rows, synced_by) values (${projectId}, ${iso(queryStart)}, ${iso(end)}, ${rows}, ${by})`;
    return { site, rows, daily: daily.length, detail: detail.length, from: iso(queryStart), to: iso(end) };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Sync failed";
    await db`insert into gsc_syncs (project_id, start_date, end_date, rows, error, synced_by) values (${projectId}, ${iso(queryStart)}, ${iso(end)}, ${rows}, ${message.slice(0, 500)}, ${by})`;
    throw e;
  }
}
