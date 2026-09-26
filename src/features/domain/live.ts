import { addDays, compact, daysBetween, deltaPct, historyMonths, mockFor, seriesAt, snapshotDates, ticksFor, type OrganicLive } from "@/features/organic/live";
import { indexedPages, topPages as mockPages, type Intent, type TopPage } from "./data";

export type SeriesLive = { start: string; values: number[] };

export type DomainLive = {
  domain: string;
  to: string;
  date: string;
  history: string[];
  dates: string[];
  seo: { traffic: { value: string; delta: string; up: boolean }; keywords: { value: string; delta: string; up: boolean } };
  countries: { name: string; flag: string | null; bar: number; traffic: number; keywords: number }[];
  series: SeriesLive;
  keywords: number;
  topKeywords: { keyword: string; intent: Intent | null; pos: string; volume: string; cpc: string; traffic: string }[];
  distribution: { label: string; value: number }[];
  compare: Record<string, [string, string, string, string]>;
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

export type GrowthLive = {
  periods: [string, string];
  months: [string, string];
  labels: string[];
  traffic: { value: string; delta: string; a: number[]; b: number[]; right: number[]; left: string[] };
  summary: { a: string; b: string; growth: string };
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const signed = (d: string) => ({ delta: d, up: !d.startsWith("-") });

export function buildDomainLive(o: OrganicLive): DomainLive {
  const d1 = (c: number, p: number) => signed(deltaPct(c, p, 1));
  const top = o.countries.filter((c) => c.code).slice(0, 3);
  const rest = o.countries.filter((c) => !top.includes(c));
  const total = o.traffic || 1;
  const kw = o.keywords || 1;
  const [a, b, c, dd, e] = o.dist;
  const compare: DomainLive["compare"] = {};
  for (const x of o.countries) compare[x.name] = [compact(x.traffic), compact(x.keywords), "0", "0"];
  return {
    domain: o.domain,
    to: o.to,
    date: o.date,
    history: historyMonths(o.to),
    dates: snapshotDates(o.to),
    seo: { traffic: { value: compact(o.traffic), ...d1(o.traffic, o.prevTraffic) }, keywords: { value: compact(o.keywords), ...d1(o.keywords, o.prevKeywords) } },
    countries: [
      { name: "Worldwide", flag: null, bar: 1, traffic: o.traffic, keywords: o.keywords },
      ...top.map((x) => ({ name: x.code!, flag: x.code, bar: x.traffic / total, traffic: x.traffic, keywords: x.keywords })),
      { name: "Other", flag: null, bar: 0, traffic: rest.reduce((s, x) => s + x.traffic, 0), keywords: rest.reduce((s, x) => s + x.keywords, 0) },
    ],
    series: o.series,
    keywords: o.keywords,
    topKeywords: o.rows.slice(0, 5).map((r) => ({ keyword: r.keyword, intent: r.intent, pos: String(r.position), volume: r.volume, cpc: mockFor(r.keyword)?.cpc ?? "n/a", traffic: r.pct })),
    distribution: [
      { label: "1-3", value: (a / kw) * 100 },
      { label: "4-10", value: (b / kw) * 100 },
      { label: "11-20", value: (c / kw) * 100 },
      { label: "21-50", value: (dd / kw) * 100 },
      { label: "51-100", value: (e / kw) * 100 },
      { label: "SF", value: 0 },
    ],
    compare,
  };
}

const mockByUrl = new Map([...mockPages].reverse().map((p) => [p.url, p]));
const refByUrl = new Map(indexedPages.map((p) => [p.url.replace(/^https?:\/\//, ""), p.domains]));

export function buildTopPagesLive(o: OrganicLive): TopPagesLive {
  const row = (p: OrganicLive["pages"][number]): TopPage => {
    const m = mockByUrl.get(p.url);
    const ref = m?.refDomains ?? refByUrl.get(p.url) ?? null;
    return {
      url: p.url,
      traffic: p.traffic,
      diff: p.prevTraffic == null ? undefined : p.traffic - p.prevTraffic,
      pct: p.pct,
      keywords: p.keywords,
      prompts: m ? m.prompts : null,
      refDomains: ref,
      keyword: p.keyword ?? undefined,
      intent: p.keyword ? (mockFor(p.keyword)?.intent ?? undefined) : undefined,
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
    pages: { value: compact(o.pageCount), delta: o.prevPageCount == null ? "0%" : deltaPct(o.pageCount, o.prevPageCount) },
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

export function buildGrowthLive(o: OrganicLive): GrowthLive {
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
