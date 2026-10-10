export const bingConfigured = () => Boolean(process.env.BING_WEBMASTER_API_KEY);

const msDate = (v: unknown) => {
  const m = typeof v === "string" && v.match(/\/Date\((-?\d+)/);
  return m ? new Date(Number(m[1])).toISOString() : null;
};

async function call<T>(method: string, params: Record<string, string | number>) {
  const key = process.env.BING_WEBMASTER_API_KEY;
  if (!key) throw new Error("BING_WEBMASTER_API_KEY is not set");
  const url = new URL(`https://ssl.bing.com/webmaster/api.svc/json/${method}`);
  url.search = new URLSearchParams({ ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])), apikey: key }).toString();
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  const text = await res.text();
  if (!res.ok) throw new Error(`Bing ${method} ${res.status}: ${text.slice(0, 160)}`);
  return (JSON.parse(text) as { d: T }).d;
}

type LinkCount = { Url: string; Count: number };
type Link = { Url: string; AnchorText: string };
type QueryStat = { Query: string; Impressions: number; Clicks: number; AvgImpressionPosition: number; AvgClickPosition: number; Date: string };
type RankTraffic = { Date: string; Impressions: number; Clicks: number };

export async function fetchBing(site: string) {
  const counts: LinkCount[] = [];
  for (let page = 0; page < 5; page++) {
    const r = await call<{ Links?: LinkCount[]; TotalPages?: number }>("GetLinkCounts", { siteUrl: site, page });
    counts.push(...(r.Links ?? []));
    if (!r.TotalPages || page + 1 >= r.TotalPages) break;
  }
  counts.sort((a, b) => b.Count - a.Count);
  const links: { targetUrl: string; sourceUrl: string; anchor: string }[] = [];
  for (const c of counts.slice(0, 15)) {
    const r = await call<{ Details?: Link[] }>("GetUrlLinks", { siteUrl: site, link: c.Url, page: 0 });
    for (const l of r.Details ?? []) links.push({ targetUrl: c.Url, sourceUrl: l.Url, anchor: l.AnchorText ?? "" });
  }
  const queries = (await call<QueryStat[]>("GetQueryStats", { siteUrl: site })) ?? [];
  const traffic = (await call<RankTraffic[]>("GetRankAndTrafficStats", { siteUrl: site })) ?? [];
  return {
    linkCounts: counts.map((c) => ({ targetUrl: c.Url, links: c.Count })),
    links,
    queries: queries.map((q) => ({ query: q.Query, impressions: q.Impressions, clicks: q.Clicks, position: q.AvgImpressionPosition, clickPosition: q.AvgClickPosition, date: msDate(q.Date) })),
    traffic: traffic.map((t) => ({ date: msDate(t.Date), impressions: t.Impressions, clicks: t.Clicks })),
  };
}
