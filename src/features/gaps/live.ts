import type { SemBacklinksHistory, SemBacklinksOverview, SemCompetitor, SemGap, SemHistory, SemOverview } from "@/lib/seo/semrushNormalize";
import { dateLabel, metricFor, shortNum, type KwMetrics } from "@/features/keywords/live";
import type { CdRow, KgRow, KgTab } from "./data";

type Ds<T> = { fetchedAt: string; rows: T[] } | undefined;

export type GapSource = {
  gap?: Ds<SemGap>;
  competitors?: Ds<SemCompetitor>;
  overview?: Ds<SemOverview>;
  history?: Ds<SemHistory>;
  backlinksOverview?: Ds<SemBacklinksOverview>;
  backlinksHistory?: Ds<SemBacklinksHistory>;
};

export type Opp = { keyword: string; volume: number };

export type GapLive = {
  you: string;
  rivals: string[];
  date: string;
  counts: Record<KgTab, number>;
  rows: Record<KgTab, KgRow[]>;
  top: Opp[];
  weak: Opp[];
  overlap: { domain: string; count: number }[];
};

const bare = (d: string) => d.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");

export function gapDomains(gap: Ds<SemGap>) {
  const set = new Set<string>();
  for (const r of gap?.rows ?? []) for (const k of Object.keys(r.positions)) set.add(k);
  return [...set];
}

export function matchGap(gap: Ds<SemGap>, you: string, rivals: string[]) {
  const doms = gapDomains(gap);
  const find = (d: string) => doms.find((x) => bare(x) === bare(d));
  const y = find(you);
  const rs = [...new Set(rivals.map((r) => find(r)))];
  if (!y || !rivals.length || rs.some((r) => !r || r === y)) return null;
  return { you: y, rivals: rs as string[] };
}

const volLabel = (n: number | null) => (n == null ? "n/a" : shortNum(n));
const intentOrder = ["C", "I", "N", "T"];

function toRow(r: SemGap, doms: string[], metrics: KwMetrics | null | undefined, mock: Map<string, KgRow>): KgRow {
  const m = metricFor(metrics, r.keyword);
  const old = mock.get(r.keyword);
  const pos = doms.map((d) => r.positions[d] ?? 0);
  const intents = (m?.intents.length ? m.intents : (old?.intent ?? [])).filter((i): i is KgRow["intent"][number] => intentOrder.includes(i));
  return {
    keyword: r.keyword,
    intent: intents,
    a: pos[0],
    b: pos[1] ?? 0,
    pos,
    volume: volLabel(r.volume ?? m?.volume ?? null),
    kd: Math.round(r.kd ?? m?.kd ?? 0),
    cpc: (r.cpc ?? m?.cpc ?? 0).toFixed(2),
    com: (r.competition ?? m?.competition ?? 0).toFixed(2),
    results: m?.results != null ? shortNum(m.results) : (old?.results ?? "n/a"),
  };
}

export function buildGapLive({
  gap,
  you,
  rivals,
  metrics,
  mockRows = [],
}: {
  gap: Ds<SemGap>;
  you: string;
  rivals: string[];
  metrics?: KwMetrics | null;
  mockRows?: KgRow[];
}): GapLive | null {
  const match = matchGap(gap, you, rivals);
  if (!gap || !match) return null;
  const doms = [match.you, ...match.rivals];
  const mock = new Map(mockRows.map((r) => [r.keyword, r]));
  const src = gap.rows
    .filter((r) => doms.some((d) => r.positions[d]))
    .map((r, i) => ({ r, i }))
    .sort((a, b) => (b.r.volume ?? 0) - (a.r.volume ?? 0) || a.i - b.i)
    .map((x) => x.r);
  const at = (r: SemGap, d: string) => r.positions[d] ?? null;
  const others = (r: SemGap) => match.rivals.map((d) => at(r, d));
  const mine = (r: SemGap) => at(r, match.you);
  const pick: Record<KgTab, (r: SemGap) => boolean> = {
    shared: (r) => mine(r) != null && others(r).every((p) => p != null),
    missing: (r) => mine(r) == null && others(r).every((p) => p != null),
    weak: (r) => mine(r) != null && others(r).every((p) => p != null && p < mine(r)!),
    strong: (r) => mine(r) != null && others(r).every((p) => p != null && p > mine(r)!),
    untapped: (r) => mine(r) == null && others(r).some((p) => p != null),
    unique: (r) => mine(r) != null && others(r).every((p) => p == null),
    all: () => true,
  };
  const keys = Object.keys(pick) as KgTab[];
  const sel = Object.fromEntries(keys.map((k) => [k, src.filter(pick[k])])) as Record<KgTab, SemGap[]>;
  const rows = Object.fromEntries(keys.map((k) => [k, sel[k].map((r) => toRow(r, doms, metrics, mock))])) as Record<KgTab, KgRow[]>;
  const opp = (list: SemGap[]) => list.slice(0, 5).map((r) => ({ keyword: r.keyword, volume: r.volume ?? 0 }));
  return {
    you: match.you,
    rivals: match.rivals,
    date: dateLabel(gap.fetchedAt),
    counts: Object.fromEntries(keys.map((k) => [k, sel[k].length])) as Record<KgTab, number>,
    rows,
    top: opp(sel.missing),
    weak: opp(sel.weak),
    overlap: doms.map((d) => ({ domain: d, count: src.filter((r) => at(r, d) != null).length })),
  };
}

export type CdLive = {
  gap: GapLive;
  rows: CdRow[];
  share: { domain: string; pct: number }[];
  paidOrganic: { left: string[]; right: string[] };
  date: string;
  months: string[];
  range: [string, string];
  organic: Record<string, number[]>;
  paid: Record<string, number[]>;
  backlinks: Record<string, number[]>;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ym = (iso: string) => iso.slice(0, 7);
const addMonths = (key: string, n: number) => {
  const d = new Date(Date.UTC(+key.slice(0, 4), +key.slice(5, 7) - 1 + n, 1));
  return d.toISOString().slice(0, 7);
};
const monthName = (key: string) => months[+key.slice(5, 7) - 1];

export function monthAxis(end: string, n = 13) {
  const keys = Array.from({ length: n }, (_, i) => addMonths(end, i - n + 1));
  const year = end.slice(0, 4);
  const labels = keys.map((k, i) => (i % 2 ? "" : k.slice(0, 4) === year ? monthName(k) : `${monthName(k)} ${k.slice(0, 4)}`));
  const range: [string, string] = [`${monthName(keys[0])} ${keys[0].slice(0, 4)}`, `${monthName(end)} ${year}`];
  return { keys, labels, range };
}

function series<T extends { date: string | null }>(rows: T[] | undefined, keys: string[], val: (r: T) => number | null, last?: number | null) {
  const by = new Map<string, number>();
  for (const r of rows ?? []) {
    const v = val(r);
    if (r.date && v != null && !by.has(ym(r.date))) by.set(ym(r.date), v);
  }
  if (last != null) by.set(keys[keys.length - 1], last);
  let prev = 0;
  return keys.map((k) => {
    const v = by.get(k);
    if (v != null) prev = v;
    return v ?? prev;
  });
}

const money = (v: number | null) => (v == null ? "n/a" : `$${shortNum(Math.round(v))}`);
const count = (v: number | null | undefined) => (v == null ? "n/a" : v >= 10000 ? shortNum(v) : String(v));
const rankLabel = (v: number | null) => (v == null ? "n/a" : shortNum(v));
const numOf = (v: string | number) => {
  if (typeof v === "number") return v;
  const m = /^\$?([\d.]+)([KM]?)$/.exec(v.replace(/,/g, ""));
  return m ? +m[1] * (m[2] === "M" ? 1e6 : m[2] === "K" ? 1e3 : 1) : null;
};

function bestOf(rows: CdRow[]) {
  const cols: { key: keyof CdRow; dir: 1 | -1 }[] = [
    { key: "as", dir: 1 },
    { key: "rank", dir: -1 },
    { key: "traffic", dir: 1 },
    { key: "keywords", dir: 1 },
    { key: "backlinks", dir: 1 },
    { key: "refDomains", dir: 1 },
  ];
  const best = rows.map(() => [] as CdRow["best"]);
  for (const c of cols) {
    const vals = rows.map((r) => numOf(r[c.key] as string | number));
    const ok = vals.filter((v): v is number => v != null);
    if (ok.length < 2 || new Set(ok).size < 2) continue;
    const top = c.dir === 1 ? Math.max(...ok) : Math.min(...ok);
    vals.forEach((v, i) => {
      if (v === top) best[i].push(c.key as CdRow["best"][number]);
    });
  }
  return best;
}

export function buildCdLive({
  sem,
  you,
  rivals,
  metrics,
  mockRows = [],
  mockCd = [],
}: {
  sem: GapSource;
  you: string;
  rivals: string[];
  metrics?: KwMetrics | null;
  mockRows?: KgRow[];
  mockCd?: CdRow[];
}): CdLive | null {
  const gap = buildGapLive({ gap: sem.gap, you, rivals, metrics, mockRows });
  const ov = sem.overview?.rows[0];
  if (!gap || !ov) return null;
  const comp = new Map((sem.competitors?.rows ?? []).map((c) => [bare(c.domain), c]));
  const bl = sem.backlinksOverview?.rows[0];
  const hist = [...(sem.history?.rows ?? [])].filter((h) => h.date).sort((a, b) => (a.date! < b.date! ? 1 : -1));
  const prev = hist[0];
  const dir = (now: number | null, before: number | null | undefined, lowerBetter = false) =>
    now == null || before == null || now === before ? undefined : (now > before) !== lowerBetter ? ("up" as const) : ("down" as const);
  const youRow: CdRow = {
    domain: gap.you,
    as: bl?.ascore ?? "n/a",
    rank: rankLabel(ov.rank),
    rankDelta: dir(ov.rank, prev?.rank, true),
    traffic: count(ov.traffic),
    trafficDelta: dir(ov.traffic, prev?.traffic),
    keywords: count(ov.keywords),
    keywordsDelta: dir(ov.keywords, prev?.keywords),
    backlinks: count(bl?.total),
    refDomains: count(bl?.domains),
    paidKeywords: count(ov.adKeywords),
    paidCost: money(ov.adCost),
    best: [],
  };
  const rivalRows: CdRow[] = gap.rivals.map((d) => {
    const c = comp.get(bare(d));
    const old = mockCd.find((r) => bare(r.domain) === bare(d));
    return {
      domain: d,
      as: old?.as ?? "n/a",
      rank: old?.rank ?? "n/a",
      traffic: c ? count(c.traffic) : (old?.traffic ?? "n/a"),
      keywords: c ? count(c.keywords) : (old?.keywords ?? "n/a"),
      backlinks: old?.backlinks ?? "n/a",
      refDomains: old?.refDomains ?? "n/a",
      paidKeywords: c ? count(c.adKeywords) : (old?.paidKeywords ?? "n/a"),
      paidCost: c && c.adKeywords === 0 ? "$0" : (old?.paidCost ?? "n/a"),
      best: [],
    };
  });
  const rows = [youRow, ...rivalRows];
  bestOf(rows).forEach((b, i) => (rows[i].best = b));
  const traffic = [ov.traffic, ...gap.rivals.map((d) => comp.get(bare(d))?.traffic ?? null)];
  const total = traffic.reduce<number>((s, v) => s + (v ?? 0), 0);
  const share = rows.map((r, i) => ({ domain: r.domain, pct: total ? Math.round(((traffic[i] ?? 0) / total) * 1000) / 10 : 0 }));
  const paidPct = (paid: number | null | undefined, org: number | null | undefined) => {
    const t = (paid ?? 0) + (org ?? 0);
    return t ? Math.round(((paid ?? 0) / t) * 100) : 0;
  };
  const paid = [paidPct(ov.adTraffic, ov.traffic), ...gap.rivals.map((d) => (comp.get(bare(d))?.adKeywords === 0 ? 0 : null))];
  const end = ym(sem.overview?.fetchedAt ?? hist[0]?.date ?? new Date().toISOString());
  const axis = monthAxis(end);
  const blHist = sem.backlinksHistory?.rows;
  return {
    gap,
    rows,
    share,
    paidOrganic: { left: paid.map((p) => (p == null ? "n/a" : `${p}%`)), right: paid.map((p) => (p == null ? "n/a" : `${100 - p}%`)) },
    date: dateLabel(sem.overview?.fetchedAt ?? gap.date),
    months: axis.labels,
    range: axis.range,
    organic: { [gap.you]: series(sem.history?.rows, axis.keys, (h) => h.traffic, ov.traffic) },
    paid: { [gap.you]: series(sem.history?.rows, axis.keys, (h) => h.adTraffic, ov.adTraffic) },
    backlinks: blHist?.length ? { [gap.you]: series(blHist, axis.keys, (h) => h.domains, bl?.domains) } : {},
  };
}

export function niceTicks(max: number) {
  if (max <= 0) return [0, 1, 2, 3, 4];
  const raw = max / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 7.5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const s = step >= 10 ? Math.ceil(step / 5) * 5 : step;
  return [0, 1, 2, 3, 4].map((i) => Math.round(i * s * 100) / 100);
}
