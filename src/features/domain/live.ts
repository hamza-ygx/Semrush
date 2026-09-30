import type { LiveSemrush } from "@/lib/seo/semrush";
import type { SemBacklink } from "@/lib/seo/semrushNormalize";
import { addDays, compact, countryByCode, daysBetween, deltaPct, historyMonths, hostOf, mockFor, seriesAt, snapshotDates, ticksFor, type OrganicLive } from "@/features/organic/live";
import { aiOverviewCode, bucketsOf, byTraffic, dailySteps, intentOf, isoDay, semMonths, SERIES_DAYS, volText, type SemMonth } from "@/features/organic/semrushLive";
import { intents as mockIntents, indexedPages, topPages as mockPages, type Intent, type TopPage } from "./data";

export type SeriesLive = { start: string; values: number[] };

export type SeoOverride = { value: string; delta?: string; up?: boolean; badge?: string };

export type KwBand = "Top 3" | "4-10" | "11-20" | "21-50" | "51-100";

export type DomainBacklinks = {
  rows: { title: string; url: string; anchor: string; target: string; type: string }[];
  follow: { follow: number; nofollow: number } | null;
  types: { label: string; pct: number; count: number }[] | null;
  anchors: { anchor: string; domains: number; backlinks: number; empty?: boolean }[];
  refDomains: { domain: string; flag: string | null; ip: string; backlinks: number }[] | null;
  pages: { title: string; url: string; domains: number; backlinks: number }[];
};

export type DomainLive = {
  domain: string;
  to: string;
  date: string;
  history: string[];
  dates: string[];
  seo: Record<string, SeoOverride>;
  seoWorld: Record<string, SeoOverride>;
  countries: { name: string; flag: string | null; bar: number; traffic: number; keywords: number }[];
  series: SeriesLive;
  keywords: number;
  topKeywords: { keyword: string; intent: Intent | null; pos: string; volume: string; cpc: string; traffic: string }[];
  distribution: { label: string; value: number }[];
  compare: Record<string, [string, string, string, string]>;
  share?: { domain: string; color: string; pct: number; traffic: number }[] | null;
  kwTrend?: { start: string; bands: Record<KwBand, number[]>; max: number } | null;
  serpDistribution?: { label: string; value: number; color: string }[] | null;
  intents?: { label: string; pct: string; share: number; keywords: number; traffic: number; color: string }[] | null;
  competitors?: {
    rows: { domain: string; level: number; common: number; keywords: number; traffic: number; color: string }[];
    self: { domain: string; keywords: number; traffic: number; color: string };
    total: number;
    maxX: number;
    maxY: number;
  } | null;
  backlinks?: DomainBacklinks | null;
};

export type TopPagesLive = {
  traffic: { value: string; delta: string };
  pages: { value: string; delta: string };
  count: number;
  rows: TopPage[];
  newRows: TopPage[];
  lostRows: TopPage[];
  chart: { start: string; values: number[]; right: string[]; max: number };
};

export type GrowthChartLive = { value: string; delta: string; a: number[]; b: number[]; right: number[]; left: string[] };

export type GrowthRowLive = { rank: string; traffic: string; backlinks: string; refDomains: string; paid: string };

export type GrowthLive = {
  periods: [string, string];
  months: [string, string];
  labels: string[];
  traffic: GrowthChartLive;
  keywords?: GrowthChartLive;
  cost?: GrowthChartLive;
  paid?: GrowthChartLive[];
  backlinks?: GrowthChartLive[];
  summary: { a: string; b: string; growth: string };
  rows?: [GrowthRowLive, GrowthRowLive];
  growth?: GrowthRowLive;
  bottom?: {
    nonBranded: [string, string];
    top: { label: string; value: number; delta: string; data: number[] }[];
    positions: { label: string; a: number; b: number }[];
    max: number;
  };
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const signed = (d: string) => ({ delta: d, up: !d.startsWith("-") });

const COMP_COLORS = ["#5a5fd6", "#3ed4a4", "#c28bf5", "#ffb200", "#ff6b70"];
const SHARE_COLORS = ["#6167e6", "#3ed4a4", "#c28bf5", "#ffb200", "#ff6b70"];

export const authorityBadge = (a: number) => (a <= 30 ? "Low authority" : a <= 60 ? "Medium authority" : "High authority");

const hostKey = (u: string) => hostOf(u).replace(/^www\./, "").toLowerCase();

export function backlinksOf(sem: LiveSemrush): DomainBacklinks | null {
  const links = sem.backlinks?.rows ?? [];
  const ov = sem.backlinksOverview?.rows[0] ?? null;
  const refs = sem.refdomains?.rows ?? null;
  if (!links.length && !ov && !refs) return null;
  const seen = new Set<string>();
  const rows = [...links]
    .sort((a, b) => (b.pageAscore ?? 0) - (a.pageAscore ?? 0))
    .filter((l) => (seen.has(l.sourceUrl) ? false : (seen.add(l.sourceUrl), true)))
    .slice(0, 5)
    .map((l) => ({ title: l.sourceTitle || hostOf(l.sourceUrl), url: l.sourceUrl, anchor: l.anchor, target: l.targetUrl, type: l.nofollow ? "nofollow" : "follow" }));
  const group = (key: (l: SemBacklink) => string) => {
    const m = new Map<string, { hosts: Set<string>; n: number }>();
    for (const l of links) {
      const k = key(l);
      const e = m.get(k) ?? { hosts: new Set<string>(), n: 0 };
      e.hosts.add(hostKey(l.sourceUrl));
      e.n++;
      m.set(k, e);
    }
    return [...m].map(([k, e]) => ({ key: k, domains: e.hosts.size, backlinks: e.n })).sort((a, b) => b.domains - a.domains || b.backlinks - a.backlinks);
  };
  const anchors = group((l) => l.anchor.trim()).slice(0, 5).map((a) => (a.key ? { anchor: a.key, domains: a.domains, backlinks: a.backlinks } : { anchor: "<EmptyAnchor>", domains: a.domains, backlinks: a.backlinks, empty: true }));
  const pages = group((l) => l.targetUrl).slice(0, 5).map((p) => ({ title: "-", url: p.key, domains: p.domains, backlinks: p.backlinks }));
  const typeTotal = ov ? (ov.texts ?? 0) + (ov.images ?? 0) + (ov.forms ?? 0) + (ov.frames ?? 0) : 0;
  const types = ov
    ? ([
        ["Text", ov.texts],
        ["Image", ov.images],
        ["Form", ov.forms],
        ["Frame", ov.frames],
      ] as const).map(([label, v]) => ({ label, count: v ?? 0, pct: typeTotal ? Math.round(((v ?? 0) / typeTotal) * 100) : 0 }))
    : null;
  const flagOf = (c: string | null) => (c ? (c.toUpperCase() === "GB" ? "UK" : c.toUpperCase()) : null);
  return {
    rows,
    follow: ov ? { follow: ov.follows ?? 0, nofollow: ov.nofollows ?? 0 } : null,
    types,
    anchors,
    refDomains: refs
      ? [...refs]
          .sort((a, b) => (b.backlinks ?? 0) - (a.backlinks ?? 0) || (b.ascore ?? 0) - (a.ascore ?? 0))
          .slice(0, 5)
          .map((r) => ({ domain: r.domain, flag: flagOf(r.country), ip: (r.country && countryByCode(flagOf(r.country)!)) || "n/a", backlinks: r.backlinks ?? 0 }))
      : null,
    pages,
  };
}

function kwTrendOf(months: SemMonth[], to: string): DomainLive["kwTrend"] {
  if (!months.length) return null;
  const band = (k: number) => dailySteps(months, to, SERIES_DAYS, (m) => bucketsOf(m.buckets).slice(k).reduce((a, v) => a + v, 0));
  const top3 = band(0);
  const bands: Record<KwBand, number[]> = { "Top 3": top3.values, "4-10": band(1).values, "11-20": band(2).values, "21-50": band(3).values, "51-100": band(4).values };
  return { start: top3.start, bands, max: ticksFor(Math.max(1, ...top3.values), 4)[4] };
}

export function buildDomainLive(o: OrganicLive, sem: LiveSemrush | null = null): DomainLive {
  const d1 = (c: number, p: number) => signed(deltaPct(c, p, 1));
  const semrush = o.source === "semrush" && !!sem;
  const top = o.countries.filter((c) => c.code).slice(0, 3);
  const rest = o.countries.filter((c) => !top.includes(c));
  const worldTraffic = semrush && o.countries.length ? o.countries.reduce((s, c) => s + c.traffic, 0) : o.traffic;
  const worldKeywords = semrush && o.countries.length ? o.countries.reduce((s, c) => s + c.keywords, 0) : o.keywords;
  const total = worldTraffic || 1;
  const [a, b, c, dd, e] = o.dist;
  const compare: DomainLive["compare"] = {};
  const all = sem?.overviewAll?.rows ?? [];
  for (const x of o.countries) {
    const r = all.find((y) => y.database === x.iso3);
    compare[x.name] = [compact(x.traffic), compact(x.keywords), compact(r?.adTraffic ?? 0), compact(r?.adKeywords ?? 0)];
  }
  const seoBase: Record<string, SeoOverride> = {
    "Organic Traffic": { value: compact(o.traffic), ...d1(o.traffic, o.prevTraffic) },
    "Organic Keywords": { value: compact(o.keywords), ...d1(o.keywords, o.prevKeywords) },
  };
  const out: DomainLive = {
    domain: o.domain,
    to: o.to,
    date: o.date,
    history: historyMonths(o.to),
    dates: snapshotDates(o.to),
    seo: seoBase,
    seoWorld: seoBase,
    countries: [
      { name: "Worldwide", flag: null, bar: 1, traffic: worldTraffic, keywords: worldKeywords },
      ...top.map((x) => ({ name: x.code!, flag: x.code, bar: x.traffic / total, traffic: x.traffic, keywords: x.keywords })),
      { name: "Other", flag: null, bar: 0, traffic: rest.reduce((s, x) => s + x.traffic, 0), keywords: rest.reduce((s, x) => s + x.keywords, 0) },
    ],
    series: o.series,
    keywords: o.keywords,
    topKeywords: o.rows.slice(0, 5).map((r) => ({ keyword: r.keyword, intent: r.intent, pos: r.local ? "local" : String(r.position), volume: r.volume, cpc: mockFor(r.keyword)?.cpc ?? "n/a", traffic: r.pct })),
    distribution: [],
    compare,
  };
  if (!semrush) {
    const kw = o.keywords || 1;
    out.distribution = [
      { label: "1-3", value: (a / kw) * 100 },
      { label: "4-10", value: (b / kw) * 100 },
      { label: "11-20", value: (c / kw) * 100 },
      { label: "21-50", value: (dd / kw) * 100 },
      { label: "51-100", value: (e / kw) * 100 },
      { label: "SF", value: 0 },
    ];
    return out;
  }
  const ov = sem.overview?.rows[0] ?? null;
  const bo = sem.backlinksOverview?.rows[0] ?? null;
  const kwRows = sem.keywords?.rows ?? [];
  const byKw = new Map<string, { pos: Set<number> }>();
  for (const k of kwRows) {
    const x = byKw.get(k.keyword) ?? { pos: new Set<number>() };
    for (const f of k.serpByPosition) x.pos.add(f);
    byKw.set(k.keyword, x);
  }
  const kwList = [...byKw.values()];
  const sfCount = kwList.filter((k) => k.pos.size > 0).length;
  const aiCount = kwList.filter((k) => k.pos.has(aiOverviewCode)).length;
  const denom = a + b + c + dd + e + sfCount || 1;
  out.distribution = [
    { label: "1-3", value: (a / denom) * 100 },
    { label: "4-10", value: (b / denom) * 100 },
    { label: "11-20", value: (c / denom) * 100 },
    { label: "21-50", value: (dd / denom) * 100 },
    { label: "51-100", value: (e / denom) * 100 },
    { label: "SF", value: (sfCount / denom) * 100 },
  ];
  if (kwRows.length) {
    const n = kwList.length || 1;
    const ai = +((aiCount / n) * 100).toFixed(1);
    const other = +(((sfCount - aiCount) / n) * 100).toFixed(1);
    out.serpDistribution = [
      { label: "Organic", value: +(100 - ai - other).toFixed(1), color: "#6167e6" },
      { label: "AI Overviews", value: ai, color: "#f06ae6" },
      { label: "Other SERP Features", value: other, color: "#6ad96a" },
    ];
    out.topKeywords = [...kwRows]
      .sort(byTraffic)
      .slice(0, 5)
      .map((k) => ({
        keyword: k.keyword,
        intent: intentOf(k.intents),
        pos: /local/i.test(k.positionType ?? "") ? "local" : String(k.position ?? ""),
        volume: volText(k.volume),
        cpc: k.cpc == null ? "n/a" : k.cpc.toFixed(2),
        traffic: k.trafficPct == null || k.trafficPct < 0.01 ? "< 0.01" : k.trafficPct.toFixed(2),
      }));
  }
  if (o.intents) out.intents = o.intents.map((i) => ({ label: i.label, pct: i.pct, share: i.share, keywords: i.keywords, traffic: i.traffic, color: mockIntents.find((m) => m.label === i.label)?.color ?? i.color }));
  const comps = sem.competitors?.rows ?? [];
  if (comps.length) {
    const rows = comps.slice(0, 5).map((x, i) => ({ domain: x.domain, level: Math.round((x.relevance ?? 0) * 100), common: x.common ?? 0, keywords: x.keywords ?? 0, traffic: x.traffic ?? 0, color: COMP_COLORS[i] }));
    const self = { domain: o.domain, keywords: o.keywords, traffic: o.traffic, color: "#b3bcf7" };
    const maxK = Math.max(1, self.keywords, ...rows.map((r) => r.keywords));
    const maxT = Math.max(1, self.traffic, ...rows.map((r) => r.traffic));
    out.competitors = { rows, self, total: comps.length, maxX: Math.ceil((maxK * 1.1) / 20) * 20, maxY: +(maxT * 1.1).toFixed(1) };
    const pts = [{ domain: o.domain, traffic: o.traffic }, ...comps.slice(0, 4).map((x) => ({ domain: x.domain, traffic: x.traffic ?? 0 }))];
    const sum = pts.reduce((s, p) => s + p.traffic, 0) || 1;
    out.share = pts.map((p, i) => ({ domain: p.domain, color: SHARE_COLORS[i], traffic: p.traffic, pct: +((p.traffic / sum) * 100).toFixed(1) }));
  }
  const shareValue = out.share ? `${Math.round(out.share[0].pct)}%` : null;
  const common: Record<string, SeoOverride> = {};
  if (bo) {
    common["Authority Score"] = { value: String(bo.ascore ?? 0), badge: authorityBadge(bo.ascore ?? 0) };
    common["Ref.Domains"] = { value: compact(bo.domains ?? 0) };
    common["Backlinks"] = { value: compact(bo.total ?? 0) };
  }
  if (shareValue) common["Traffic Share"] = { value: shareValue };
  const worldAll = all.filter((r) => r.database && !r.database.startsWith("mobile"));
  const sumAll = (f: (r: (typeof worldAll)[number]) => number | null) => worldAll.reduce((s, r) => s + (f(r) ?? 0), 0);
  out.seo = {
    ...seoBase,
    ...common,
    ...(ov ? { "Paid Traffic": { value: compact(ov.adTraffic ?? 0) }, "Paid Keywords": { value: compact(ov.adKeywords ?? 0) } } : {}),
  };
  out.seoWorld = worldAll.length
    ? {
        ...common,
        "Organic Traffic": { value: compact(sumAll((r) => r.traffic)), delta: undefined },
        "Organic Keywords": { value: compact(sumAll((r) => r.keywords)), delta: undefined },
        "Paid Traffic": { value: compact(sumAll((r) => r.adTraffic)) },
        "Paid Keywords": { value: compact(sumAll((r) => r.adKeywords)) },
      }
    : out.seo;
  out.kwTrend = kwTrendOf(semMonths(sem), o.to);
  out.backlinks = backlinksOf(sem);
  return out;
}

const mockByUrl = new Map([...mockPages].reverse().map((p) => [p.url, p]));
const refByUrl = new Map(indexedPages.map((p) => [p.url.replace(/^https?:\/\//, ""), p.domains]));

export function buildTopPagesLive(o: OrganicLive, sem: LiveSemrush | null = null): TopPagesLive {
  const links = o.source === "semrush" ? (sem?.backlinks?.rows ?? null) : null;
  const refs = new Map<string, Set<string>>();
  for (const l of links ?? []) {
    const e = refs.get(l.targetUrl) ?? new Set<string>();
    e.add(hostKey(l.sourceUrl));
    refs.set(l.targetUrl, e);
  }
  const row = (p: OrganicLive["pages"][number]): TopPage => {
    const m = mockByUrl.get(p.url);
    const ref = links ? (refs.get(p.href ?? "")?.size ?? 0) : (m?.refDomains ?? refByUrl.get(p.url) ?? null);
    return {
      url: p.url,
      traffic: p.traffic,
      diff: p.prevTraffic == null ? undefined : p.traffic - p.prevTraffic,
      pct: p.pct,
      keywords: p.keywords,
      prompts: m ? m.prompts : null,
      refDomains: ref,
      keyword: p.keyword ?? undefined,
      intent: p.intent !== undefined ? (p.intent ?? undefined) : p.keyword ? (mockFor(p.keyword)?.intent ?? undefined) : undefined,
    };
  };
  const rows = o.pages.filter((p) => !p.lost).map(row);
  const end = o.to;
  const days = 365;
  const start = addDays(end, -(days - 1));
  const first = daysBetween(o.series.start, start) >= 0 ? start : o.series.start;
  const values = Array.from({ length: daysBetween(first, end) + 1 }, (_, i) => seriesAt(o.series, addDays(first, i)) ?? 0);
  const ticks = ticksFor(Math.max(1, ...values));
  return {
    traffic: { value: compact(o.traffic), delta: deltaPct(o.traffic, o.prevTraffic) },
    pages: { value: compact(o.pageCount), delta: o.prevPageCount == null ? "n/a" : deltaPct(o.pageCount, o.prevPageCount) },
    count: rows.length,
    rows,
    newRows: o.pages.filter((p) => p.isNew).map(row),
    lostRows: o.pages.filter((p) => p.lost).map(row),
    chart: { start: first, values, right: ticks.map((t) => compact(t)), max: ticks[ticks.length - 1] },
  };
}

const monthEnd = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).toISOString().slice(0, 10);

function growthLabel(v: number) {
  const a = Math.abs(v);
  const s = a >= 1000 ? `${+(v / 1000).toFixed(1)}K` : `${Math.round(v)}`;
  return `${s}%`;
}

const quarters = (max: number) => [0, 1, 2, 3, 4].map((i) => +((max * i) / 4).toFixed(1));

function chartOf(a: number[], b: number[], value: string, digits = 1, right?: number[]): GrowthChartLive {
  const growth = a.map((v, i) => (v ? ((b[i] - v) / v) * 100 : 0));
  const gMin = Math.min(...growth);
  const gMax = Math.max(...growth);
  return {
    value,
    delta: deltaPct(b[5], a[5], digits),
    a,
    b,
    right: right ?? quarters(Math.max(1, ...a, ...b)),
    left: Array.from({ length: 5 }, (_, i) => growthLabel(gMin + ((gMax - gMin) * i) / 4)),
  };
}

const signedInt = (n: number) => `${n > 0 ? "+" : ""}${Math.round(n).toLocaleString("en-US")}`;

function semGrowth(months: SemMonth[], sem: LiveSemrush): GrowthLive | null {
  if (months.length < 12) return null;
  const aM = months.slice(-12, -6);
  const bM = months.slice(-6);
  const mi = (m: SemMonth) => +m.date.slice(5, 7) - 1;
  const short = (m: SemMonth) => MONTHS[mi(m)].slice(0, 3);
  const pick = (f: (m: SemMonth) => number) => [aM.map(f), bM.map(f)] as const;
  const [ta, tb] = pick((m) => m.traffic);
  const [ka, kb] = pick((m) => m.keywords);
  const [ca, cb] = pick((m) => m.cost);
  const [pa, pb] = pick((m) => m.adTraffic);
  const [pka, pkb] = pick((m) => m.adKeywords);
  const bl = new Map((sem.backlinksHistory?.rows ?? []).filter((r) => isoDay(r.date)).map((r) => [isoDay(r.date)!.slice(0, 7), r]));
  const hasBl = bl.size > 0;
  const blOf = (m: SemMonth) => bl.get(m.date.slice(0, 7));
  const [ba, bb] = pick((m) => blOf(m)?.backlinks ?? 0);
  const [ra, rb] = pick((m) => blOf(m)?.domains ?? 0);
  const aEnd = aM[5];
  const bEnd = bM[5];
  const row = (m: SemMonth): GrowthRowLive => ({
    rank: m.rank ? compact(m.rank) : "n/a",
    traffic: compact(m.traffic),
    backlinks: hasBl ? compact(blOf(m)?.backlinks ?? 0) : "n/a",
    refDomains: hasBl ? compact(blOf(m)?.domains ?? 0) : "n/a",
    paid: compact(m.adTraffic),
  });
  const traffic = chartOf(ta, tb, compact(tb[5]));
  const bands = ["1-3", "4-10", "11-20", "21-50", "51-100"];
  const posA = bucketsOf(aEnd.buckets);
  const posB = bucketsOf(bEnd.buckets);
  const posMax = Math.max(1, ...posA, ...posB);
  const step = Math.max(1, Math.ceil(posMax / 7 / 5) * 5);
  return {
    periods: [`${MONTHS[mi(aM[0])]} – ${MONTHS[mi(aEnd)]}`, `${MONTHS[mi(bM[0])]} – ${MONTHS[mi(bEnd)]}`],
    months: [MONTHS[mi(aEnd)], MONTHS[mi(bEnd)]],
    labels: aM.map((m, i) => `${short(m)} / ${short(bM[i])}`),
    traffic,
    keywords: chartOf(ka, kb, compact(kb[5])),
    cost: chartOf(ca, cb, compact(Math.round(cb[5]))),
    paid: [chartOf(pa, pb, compact(pb[5])), chartOf(pka, pkb, compact(pkb[5]))],
    backlinks: hasBl ? [chartOf(ba, bb, compact(bb[5])), chartOf(ra, rb, compact(rb[5]))] : undefined,
    summary: { a: compact(ta[5]), b: compact(tb[5]), growth: traffic.delta },
    rows: [row(aEnd), row(bEnd)],
    growth: {
      rank: aEnd.rank && bEnd.rank ? signedInt(bEnd.rank - aEnd.rank) : "n/a",
      traffic: traffic.delta,
      backlinks: hasBl ? deltaPct(bb[5], ba[5], 1) : "n/a",
      refDomains: hasBl ? deltaPct(rb[5], ra[5], 1) : "n/a",
      paid: deltaPct(pb[5], pa[5], 1),
    },
    bottom: {
      nonBranded: [compact(aEnd.traffic), compact(bEnd.traffic)],
      top: [0, 1, 2].map((k) => {
        const data = bM.map((m) => bucketsOf(m.buckets)[k]);
        const d = data[5] - posA[k];
        return { label: ["Top 1-3", "Top 4-10", "Top 11-20"][k], value: data[5], delta: `${d > 0 ? "+" : ""}${d}`, data };
      }),
      positions: bands.map((label, i) => ({ label, a: posA[i], b: posB[i] })),
      max: step * 7,
    },
  };
}

export function buildGrowthLive(o: OrganicLive, sem: LiveSemrush | null = null): GrowthLive {
  if (o.source === "semrush" && sem) {
    const g = semGrowth(semMonths(sem), sem);
    if (g) return g;
  }
  const y = +o.to.slice(0, 4);
  const m = +o.to.slice(5, 7) - 1;
  const at = (k: number) => {
    const t = y * 12 + m - k;
    const iso = k === 0 ? o.to : monthEnd(Math.floor(t / 12), t % 12);
    return { iso, month: t % 12, value: seriesAt(o.series, iso) ?? 0 };
  };
  const bPts = [5, 4, 3, 2, 1, 0].map(at);
  const aPts = [11, 10, 9, 8, 7, 6].map(at);
  const a = aPts.map((p) => p.value);
  const b = bPts.map((p) => p.value);
  const short = (i: number) => MONTHS[i].slice(0, 3);
  const growth = a.map((v, i) => (v ? ((b[i] - v) / v) * 100 : 0));
  const gMin = Math.min(...growth);
  const gMax = Math.max(...growth);
  const right = ticksFor(Math.max(1, ...a, ...b), 4);
  const delta = deltaPct(b[5], a[5], 1);
  return {
    periods: [`${MONTHS[aPts[0].month]} – ${MONTHS[aPts[5].month]}`, `${MONTHS[bPts[0].month]} – ${MONTHS[bPts[5].month]}`],
    months: [MONTHS[aPts[5].month], MONTHS[bPts[5].month]],
    labels: aPts.map((p, i) => `${short(p.month)} / ${short(bPts[i].month)}`),
    traffic: { value: compact(b[5]), delta, a, b, right, left: Array.from({ length: 5 }, (_, i) => growthLabel(gMin + ((gMax - gMin) * i) / 4)) },
    summary: { a: compact(a[5]), b: compact(b[5]), growth: delta },
  };
}
