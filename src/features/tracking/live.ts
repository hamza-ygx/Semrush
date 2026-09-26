import type { LiveSearch } from "@/lib/seo/live";

export type RankHistory = Map<string, Map<string, number | null>>;

export type LiveKw = {
  first: number | null;
  last: number | null;
  vis: number;
  prevVis: number;
  traffic: number;
  prevTraffic: number;
  url: string | null;
  series: (number | null)[];
};

export type Bucket = { now: number; prev: number; gained: number; lost: number; improved: number; declined: number; daily: number[] };

export type LivePage = { url: string; kws: string[]; prevKws: string[]; traffic: number; prevTraffic: number; avgPos: number; prevAvgPos: number };

export type TrackingLive = {
  from: string;
  to: string;
  days: string[];
  chartDays: string[];
  kws: Record<string, LiveKw>;
  vis: number;
  prevVis: number;
  traffic: number;
  prevTraffic: number;
  avgPos: number;
  prevAvgPos: number;
  improved: number;
  declined: number;
  ranking: number;
  total: number;
  buckets: Record<3 | 10 | 20 | 100, Bucket>;
  dist: [number, number, number, number][];
  chart: { vis: number[]; sov: number[]; traffic: number[]; avgPos: number[] };
  pages: LivePage[];
};

const ctrCurve = [0.3, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018];

export function ctrAt(p: number | null) {
  if (p == null || p > 100) return 0;
  const r = Math.max(1, Math.round(p));
  return r <= 10 ? ctrCurve[r - 1] : r <= 20 ? 0.01 : 0;
}

export const visibilityOf = (p: number | null) => (ctrAt(p) / ctrCurve[0]) * 100;

const DAY = 864e5;
export const addDays = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);
const range = (to: string, n: number) => Array.from({ length: n }, (_, i) => addDays(to, i - n + 1));

export function posAt(hist: Map<string, number | null> | undefined, date: string, lookback = 7) {
  if (!hist) return null;
  for (let i = 0; i < lookback; i++) {
    const v = hist.get(addDays(date, -i));
    if (v != null) return v;
  }
  return null;
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const round = (p: number | null) => (p == null ? null : Math.max(1, Math.round(p)));
const inTop = (p: number | null, n: number) => p != null && p <= n;

export function buildTrackingLive({
  tracked,
  extra = [],
  volumes = {},
  history,
  cur,
  wide,
  windowDays = 8,
  chartLen = 30,
}: {
  tracked: string[];
  extra?: string[];
  volumes?: Record<string, number>;
  history: RankHistory;
  cur: LiveSearch;
  wide?: LiveSearch | null;
  windowDays?: number;
  chartLen?: number;
}): TrackingLive {
  const to = cur.range.to;
  const days = range(to, windowDays);
  const chartDays = range(to, chartLen);
  const from = days[0];
  const curQ = new Map(cur.queries.map((q) => [q.query, q]));
  const wideQ = new Map((wide?.queries ?? []).map((q) => [q.query, q]));

  const kws: Record<string, LiveKw> = {};
  for (const k of [...new Set([...tracked, ...extra])]) {
    const h = history.get(k);
    const first = round(posAt(h, from));
    const last = round(posAt(h, to));
    const traffic = curQ.get(k)?.clicks ?? 0;
    const url = last == null ? null : (curQ.get(k)?.page ?? wideQ.get(k)?.page ?? null);
    kws[k] = {
      first,
      last,
      vis: visibilityOf(last),
      prevVis: visibilityOf(first),
      traffic,
      prevTraffic: Math.max(0, (wideQ.get(k)?.clicks ?? traffic) - traffic),
      url,
      series: chartDays.map((d) => {
        const v = posAt(h, d);
        return v == null ? null : Math.round(v * 10) / 10;
      }),
    };
  }

  const list = tracked.map((k) => kws[k]);
  const offset = chartLen - windowDays;
  const bucket = (n: number): Bucket => ({
    now: list.filter((k) => inTop(k.last, n)).length,
    prev: list.filter((k) => inTop(k.first, n)).length,
    gained: list.filter((k) => inTop(k.last, n) && !inTop(k.first, n)).length,
    lost: list.filter((k) => !inTop(k.last, n) && inTop(k.first, n)).length,
    improved: list.filter((k) => inTop(k.last, n) && k.first != null && k.last! < k.first).length,
    declined: list.filter((k) => inTop(k.first, n) && k.last != null && k.last > k.first!).length,
    daily: days.map((_, i) => list.filter((k) => inTop(k.series[offset + i], n)).length),
  });

  const dist = days.map((_, i) => {
    const ps = list.map((k) => k.series[offset + i]);
    const c = (lo: number, hi: number) => ps.filter((p) => p != null && Math.round(p) >= lo && Math.round(p) <= hi).length;
    return [c(1, 3), c(4, 10), c(11, 20), c(21, 100)] as [number, number, number, number];
  });

  const totalVolume = tracked.reduce((s, k) => s + (volumes[k] ?? 0), 0);
  const dailyClicks = new Map(cur.daily.map((d) => [d.date, d.clicks]));
  const chart = {
    vis: chartDays.map((_, i) => mean(list.map((k) => visibilityOf(k.series[i])))),
    sov: chartDays.map((_, i) => (totalVolume ? (tracked.reduce((s, k) => s + visibilityOf(kws[k].series[i]) * (volumes[k] ?? 0), 0) / totalVolume) : 0)),
    traffic: chartDays.map((d) => dailyClicks.get(d) ?? 0),
    avgPos: chartDays.map((_, i) => mean(list.map((k) => Math.min(100, k.series[i] ?? 100)))),
  };

  const pageMap = new Map<string, { kws: string[]; prevKws: string[]; prev: number[]; now: number[]; traffic: number; prevTraffic: number }>();
  for (const k of tracked) {
    const e = kws[k];
    const url = e.url ?? wideQ.get(k)?.page ?? curQ.get(k)?.page;
    if (!url || (e.last == null && e.first == null)) continue;
    const p = pageMap.get(url) ?? { kws: [], prevKws: [], prev: [], now: [], traffic: 0, prevTraffic: 0 };
    if (e.last != null) {
      p.kws.push(k);
      p.now.push(e.last);
    }
    if (e.first != null) {
      p.prevKws.push(k);
      p.prev.push(e.first);
    }
    p.traffic += e.traffic;
    p.prevTraffic += e.prevTraffic;
    pageMap.set(url, p);
  }
  const pages = [...pageMap]
    .map(([url, p]) => ({ url, kws: p.kws, prevKws: p.prevKws, traffic: p.traffic, prevTraffic: p.prevTraffic, avgPos: mean(p.now), prevAvgPos: mean(p.prev) }))
    .sort((a, b) => b.kws.length - a.kws.length || b.traffic - a.traffic || a.url.localeCompare(b.url));

  return {
    from,
    to,
    days,
    chartDays,
    kws,
    vis: mean(list.map((k) => k.vis)),
    prevVis: mean(list.map((k) => k.prevVis)),
    traffic: list.reduce((s, k) => s + k.traffic, 0),
    prevTraffic: list.reduce((s, k) => s + k.prevTraffic, 0),
    avgPos: mean(list.map((k) => k.last ?? 100)),
    prevAvgPos: mean(list.map((k) => k.first ?? 100)),
    improved: list.filter((k) => k.last != null && (k.first == null || k.last < k.first)).length,
    declined: list.filter((k) => k.first != null && (k.last == null || k.last > k.first)).length,
    ranking: list.filter((k) => k.last != null).length,
    total: list.length,
    buckets: { 3: bucket(3), 10: bucket(10), 20: bucket(20), 100: bucket(100) },
    dist,
    chart,
    pages,
  };
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const parts = (iso: string) => ({ y: +iso.slice(0, 4), m: months[+iso.slice(5, 7) - 1], d: +iso.slice(8, 10) });

export const dayLabel = (iso: string) => `${parts(iso).m} ${parts(iso).d}`;
export const fullDate = (iso: string) => `${dayLabel(iso)}, ${parts(iso).y}`;

export function rangeLabel(from: string, to: string, dash = "-") {
  const a = parts(from);
  const b = parts(to);
  if (a.m === b.m && a.y === b.y) return `${a.m} ${a.d}${dash}${b.d}, ${b.y}`;
  return `${a.m} ${a.d} - ${b.m} ${b.d}, ${b.y}`;
}

export const fmtPct = (v: number) => `${+v.toFixed(2)}%`;
export const signed = (v: number, digits = 2) => `${v > 0 ? "+" : ""}${v.toFixed(digits)}`;
export const signedInt = (v: number) => `${v > 0 ? "+" : ""}${Math.round(v)}`;

export function niceMax(v: number) {
  if (v <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(v / 4));
  const s = [1, 2, 2.5, 5, 10].map((m) => m * step).find((m) => m * 4 >= v) ?? 10 * step;
  return s * 4;
}
