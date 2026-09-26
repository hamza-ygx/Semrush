import { createClient, type Db } from "@/lib/supabase/server";
import { checks, type CheckId } from "./checks";

export type LiveProject = { id: string; domain: string; gsc_property: string | null };

const bare = (d: string) => d.toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");

export async function liveDb(): Promise<Db | null> {
  const db = await createClient();
  if (!db) return null;
  const { data } = await db.auth.getClaims();
  return data?.claims ? db : null;
}

export async function findProject(db: Db, domain?: string | null): Promise<LiveProject | null> {
  const { data } = await db.from("projects").select("id, domain, gsc_property").order("created_at");
  const list = (data ?? []) as LiveProject[];
  if (!domain) return list[0] ?? null;
  return list.find((p) => bare(p.domain) === bare(domain)) ?? null;
}

export type LiveAudit = {
  crawl: { id: string; finished_at: string | null; started_at: string; pages_crawled: number; health: number; errors: number; warnings: number; notices: number };
  checks: { id: CheckId; severity: "error" | "warning" | "notice"; title: string; description: string; count: number; urls: { url: string; detail: string | null }[] }[];
  pages: { url: string; status: number | null; depth: number; ms: number | null; title: string | null; word_count: number | null; internal_links: number | null; issues: number }[];
};

export async function liveAudit(domain?: string | null): Promise<LiveAudit | null> {
  const db = await liveDb();
  const project = db && (await findProject(db, domain));
  if (!db || !project) return null;
  const { data: crawl } = await db
    .from("crawls")
    .select("id, finished_at, started_at, pages_crawled, health, errors, warnings, notices")
    .eq("project_id", project.id)
    .eq("status", "done")
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!crawl) return null;
  const [{ data: issues }, { data: pages }] = await Promise.all([
    db.from("crawl_issues").select("check_id, severity, url, detail").eq("crawl_id", crawl.id).limit(20000),
    db.from("crawl_pages").select("url, status, depth, ms, title, word_count, internal_links").eq("crawl_id", crawl.id).order("depth").limit(5000),
  ]);
  const byCheck = new Map<CheckId, { url: string; detail: string | null }[]>();
  const perPage = new Map<string, number>();
  for (const i of issues ?? []) {
    const id = i.check_id as CheckId;
    if (!(id in checks)) continue;
    byCheck.set(id, [...(byCheck.get(id) ?? []), { url: i.url, detail: i.detail }]);
    perPage.set(i.url, (perPage.get(i.url) ?? 0) + 1);
  }
  const order = { error: 0, warning: 1, notice: 2 };
  return {
    crawl: { ...crawl, health: crawl.health ?? 0 },
    checks: [...byCheck]
      .map(([id, urls]) => ({ id, ...checks[id], count: urls.length, urls }))
      .sort((a, b) => order[a.severity] - order[b.severity] || b.count - a.count),
    pages: (pages ?? []).map((p) => ({ ...p, issues: perPage.get(p.url) ?? 0 })),
  };
}

export type LiveDay = { date: string; clicks: number; impressions: number; ctr: number; position: number };
export type LiveQuery = { query: string; page: string; clicks: number; impressions: number; position: number; ctr: number; pages: { page: string; impressions: number }[] };

export type LiveSearch = {
  project: LiveProject;
  range: { from: string; to: string };
  daily: LiveDay[];
  totals: { clicks: number; impressions: number; ctr: number; position: number; keywords: number; prevClicks: number; prevKeywords: number };
  queries: LiveQuery[];
  pages: { page: string; clicks: number; impressions: number; keywords: number }[];
  countries: { country: string; clicks: number; impressions: number; keywords: number }[];
  distribution: { top3: number; top10: number; top20: number; top100: number };
};

type Row = { date: string; query: string; page: string; country: string; device: string; clicks: number; impressions: number; position: number };

function aggregate(rows: Row[]) {
  const q = new Map<string, { query: string; clicks: number; impressions: number; posSum: number; pages: Map<string, number> }>();
  for (const r of rows) {
    const e = q.get(r.query) ?? { query: r.query, clicks: 0, impressions: 0, posSum: 0, pages: new Map() };
    e.clicks += r.clicks;
    e.impressions += r.impressions;
    e.posSum += r.position * r.impressions;
    e.pages.set(r.page, (e.pages.get(r.page) ?? 0) + r.impressions);
    q.set(r.query, e);
  }
  return [...q.values()].map((e) => {
    const pages = [...e.pages].sort((a, b) => b[1] - a[1]).map(([page, impressions]) => ({ page, impressions }));
    const position = e.impressions ? e.posSum / e.impressions : 0;
    return { query: e.query, page: pages[0]?.page ?? "", pages, clicks: e.clicks, impressions: e.impressions, position, ctr: e.impressions ? e.clicks / e.impressions : 0 };
  });
}

export async function liveSearch(domain?: string | null, days = 28): Promise<LiveSearch | null> {
  const db = await liveDb();
  const project = db && (await findProject(db, domain));
  if (!db || !project) return null;
  const { data: daily } = await db.from("gsc_daily").select("date, clicks, impressions, ctr, position").eq("project_id", project.id).order("date");
  if (!daily?.length) return null;
  const to = daily[daily.length - 1].date as string;
  const toMs = new Date(to).getTime();
  const from = new Date(toMs - (days - 1) * 86_400_000).toISOString().slice(0, 10);
  const prevFrom = new Date(toMs - (2 * days - 1) * 86_400_000).toISOString().slice(0, 10);
  const rows: Row[] = [];
  for (let offset = 0; offset < 100_000; offset += 1000) {
    const { data } = await db
      .from("gsc_query_daily")
      .select("date, query, page, country, device, clicks, impressions, position")
      .eq("project_id", project.id)
      .gte("date", prevFrom)
      .lte("date", to)
      .range(offset, offset + 999);
    rows.push(...((data ?? []) as Row[]));
    if (!data || data.length < 1000) break;
  }
  const current = rows.filter((r) => r.date >= from);
  const previous = rows.filter((r) => r.date < from);
  const queries = aggregate(current).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
  const pageMap = new Map<string, { page: string; clicks: number; impressions: number; keywords: Set<string> }>();
  const countryMap = new Map<string, { country: string; clicks: number; impressions: number; keywords: Set<string> }>();
  for (const r of current) {
    const p = pageMap.get(r.page) ?? { page: r.page, clicks: 0, impressions: 0, keywords: new Set<string>() };
    p.clicks += r.clicks;
    p.impressions += r.impressions;
    p.keywords.add(r.query);
    pageMap.set(r.page, p);
    const c = countryMap.get(r.country) ?? { country: r.country, clicks: 0, impressions: 0, keywords: new Set<string>() };
    c.clicks += r.clicks;
    c.impressions += r.impressions;
    c.keywords.add(r.query);
    countryMap.set(r.country, c);
  }
  const window = (daily as LiveDay[]).filter((d) => d.date >= from);
  const clicks = window.reduce((s, d) => s + d.clicks, 0);
  const impressions = window.reduce((s, d) => s + d.impressions, 0);
  const position = impressions ? window.reduce((s, d) => s + d.position * d.impressions, 0) / impressions : 0;
  const prevClicks = (daily as LiveDay[]).filter((d) => d.date >= prevFrom && d.date < from).reduce((s, d) => s + d.clicks, 0);
  return {
    project,
    range: { from, to },
    daily: daily as LiveDay[],
    totals: { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position, keywords: queries.length, prevClicks, prevKeywords: new Set(previous.map((r) => r.query)).size },
    queries,
    pages: [...pageMap.values()].map((p) => ({ page: p.page, clicks: p.clicks, impressions: p.impressions, keywords: p.keywords.size })).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions),
    countries: [...countryMap.values()].map((c) => ({ country: c.country, clicks: c.clicks, impressions: c.impressions, keywords: c.keywords.size })).sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions),
    distribution: {
      top3: queries.filter((q) => q.position <= 3).length,
      top10: queries.filter((q) => q.position > 3 && q.position <= 10).length,
      top20: queries.filter((q) => q.position > 10 && q.position <= 20).length,
      top100: queries.filter((q) => q.position > 20).length,
    },
  };
}

export async function liveRankHistory(keywords: string[], domain?: string | null, days = 30) {
  const db = await liveDb();
  const project = db && (await findProject(db, domain));
  if (!db || !project || !keywords.length) return null;
  const { data: last } = await db.from("gsc_daily").select("date").eq("project_id", project.id).order("date", { ascending: false }).limit(1);
  const anchor = last?.[0]?.date ? new Date(last[0].date as string).getTime() : Date.now();
  const since = new Date(anchor - (days + 3) * 86_400_000).toISOString().slice(0, 10);
  const out = new Map<string, Map<string, number | null>>();
  const unique = [...new Set(keywords)];
  for (let i = 0; i < unique.length; i += 200) {
    const { data, error } = await db.rpc("rank_history", { p_project: project.id, p_queries: unique.slice(i, i + 200), p_since: since });
    if (error) return null;
    for (const r of (data ?? []) as { query: string; day: string; avg_position: number | null }[]) {
      const byDate = out.get(r.query) ?? new Map<string, number | null>();
      byDate.set(r.day, r.avg_position);
      out.set(r.query, byDate);
    }
  }
  return out;
}
