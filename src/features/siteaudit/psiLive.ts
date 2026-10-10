import { C } from "./part2/data";
import { crawlDates, niceScale } from "./live";

export type Strategy = "mobile" | "desktop";

export type PsiFieldMetric = { p75: number; category: string };

export type PsiField = { overall: string | null; metrics: Record<string, PsiFieldMetric | undefined> } | null;

export type PsiLab = { value: number | null; score: number | null; display: string | null } | null;

export type PsiOpportunity = { id: string; title: string; savingsMs: number; display?: string | null };

export type PsiRun = {
  url: string;
  strategy: Strategy;
  fetchedAt: string;
  scores: Record<string, number | null>;
  lab: Record<string, PsiLab | undefined>;
  opportunities: PsiOpportunity[];
  field: PsiField;
  originField: PsiField;
};

export type PsiSource = { runs?: { fetchedAt: string; rows: PsiRun[] } };

export type VitalsStatus = "Good" | "To Improve" | "Poor" | "n/a";

export type Tone = "good" | "mid" | "bad" | "na";

export type DataSource = "url" | "origin" | "lab" | "none";

export type VitalsCell = { text: string; tone: Tone; status: VitalsStatus };

export type VitalsLiveRow = { url: string; status: VitalsStatus; cells: VitalsCell[]; source: DataSource };

export type VitalsMetric = { title: string; values: number[]; tips: [string, number][]; empty: string };

export type VitalsView = {
  strategy: Strategy;
  mode: "field" | "lab";
  score: number;
  pages: number;
  status: { label: VitalsStatus; value: number; color: string }[];
  metrics: VitalsMetric[];
  cols: string[];
  rows: VitalsLiveRow[];
  chart: { day: string; values: number[]; max: number; ticks: number[] };
  note: string | null;
};

export type VitalsLive = { views: Partial<Record<Strategy, VitalsView>>; initial: Strategy };

export type PerfCell = { text: string; tone: Tone };

export type PerfMetricRow = { label: string; cells: Partial<Record<Strategy, PerfCell>> };

export type PerfOpportunity = { title: string; pages: number; savings: string; severity: "Warnings" | "Notices" };

export type PerfLive = {
  score: number;
  strategies: Strategy[];
  pages: number;
  metrics: PerfMetricRow[];
  opportunities: PerfOpportunity[];
};

export type PsiLive = { vitals: VitalsLive | null; perf: PerfLive | null; scores: { webVitals?: number; performance?: number }; fetchedAt: string };

const statusOrder: VitalsStatus[] = ["Good", "To Improve", "Poor", "n/a"];
const statusColors = [C.green, C.orange, C.red, C.silver];
const rank: Record<VitalsStatus, number> = { "n/a": -1, Good: 0, "To Improve": 1, Poor: 2 };
const toneOf: Record<VitalsStatus, Tone> = { Good: "good", "To Improve": "mid", Poor: "bad", "n/a": "na" };

const fieldStatus = (cat: string | undefined): VitalsStatus => (cat === "FAST" ? "Good" : cat === "AVERAGE" ? "To Improve" : cat === "SLOW" ? "Poor" : "n/a");

const byThreshold = (v: number | null | undefined, good: number, poor: number): VitalsStatus => (v == null ? "n/a" : v <= good ? "Good" : v <= poor ? "To Improve" : "Poor");

const sec = (ms: number) => `${(ms / 1000).toFixed(2)}s`;
const ms = (v: number) => `${Math.round(v).toLocaleString("en-US")}ms`;
const cls = (v: number) => v.toFixed(3);

const cell = (text: string | null, status: VitalsStatus): VitalsCell => ({ text: text ?? "n/a", tone: toneOf[status], status });

const metricKeys = {
  lcp: "LARGEST_CONTENTFUL_PAINT_MS",
  inp: "INTERACTION_TO_NEXT_PAINT",
  cls: "CUMULATIVE_LAYOUT_SHIFT_SCORE",
};

const jsOpportunities = new Set(["unused-javascript", "legacy-javascript", "duplicated-javascript", "unminified-javascript", "bootup-time", "mainthread-work-breakdown", "third-party-summary"]);
const clsOpportunities = new Set(["unsized-images", "layout-shifts", "non-composited-animations", "font-display"]);

const labValue = (r: PsiRun, id: string) => r.lab?.[id]?.value ?? null;

function labCells(r: PsiRun, second: "tbt" | "inp"): VitalsCell[] {
  const lcp = labValue(r, "largest-contentful-paint");
  const tbt = labValue(r, "total-blocking-time");
  const shift = labValue(r, "cumulative-layout-shift");
  return [
    cell(lcp == null ? null : sec(lcp), byThreshold(lcp, 2500, 4000)),
    second === "tbt" ? cell(tbt == null ? null : ms(tbt), byThreshold(tbt, 200, 600)) : cell(null, "n/a"),
    cell(shift == null ? null : cls(shift), byThreshold(shift, 0.1, 0.25)),
  ];
}

function fieldCells(f: NonNullable<PsiField>): VitalsCell[] {
  const m = (k: string) => f.metrics[k];
  const lcp = m(metricKeys.lcp);
  const inp = m(metricKeys.inp);
  const shift = m(metricKeys.cls);
  return [
    cell(lcp ? sec(lcp.p75) : null, fieldStatus(lcp?.category)),
    cell(inp ? ms(inp.p75) : null, fieldStatus(inp?.category)),
    cell(shift ? cls(shift.p75 / 100) : null, fieldStatus(shift?.category)),
  ];
}

const worst = (cells: VitalsCell[]): VitalsStatus => cells.reduce<VitalsStatus>((a, c) => (rank[c.status] > rank[a] ? c.status : a), "n/a");

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function tipsFor(runs: PsiRun[], keep: (id: string) => boolean): [string, number][] {
  const agg = new Map<string, { title: string; urls: Set<string>; savings: number }>();
  for (const r of runs)
    for (const o of r.opportunities ?? []) {
      if (!keep(o.id)) continue;
      const a = agg.get(o.id) ?? { title: o.title, urls: new Set<string>(), savings: 0 };
      a.urls.add(r.url);
      a.savings += o.savingsMs;
      agg.set(o.id, a);
    }
  return [...agg.values()]
    .sort((a, b) => b.urls.size - a.urls.size || b.savings - a.savings || a.title.localeCompare(b.title))
    .slice(0, 3)
    .map((a) => [a.title, a.urls.size]);
}

export function buildVitalsView(runs: PsiRun[], strategy: Strategy): VitalsView | null {
  const mine = latestPerUrl(runs.filter((r) => r.strategy === strategy));
  if (!mine.length) return null;
  const mode: "field" | "lab" = mine.some((r) => r.field || r.originField) ? "field" : "lab";
  const rows: VitalsLiveRow[] = mine.map((r) => {
    const f = r.field ?? r.originField;
    const source: DataSource = mode === "lab" ? "lab" : r.field ? "url" : r.originField ? "origin" : "lab";
    const cells = mode === "field" && f ? fieldCells(f) : labCells(r, mode === "lab" ? "tbt" : "inp");
    const status = worst(cells);
    return { url: r.url, status, cells, source: status === "n/a" && source === "lab" ? "none" : source };
  });
  rows.sort((a, b) => rank[b.status] - rank[a.status] || a.url.localeCompare(b.url));
  const P = rows.length;
  const count = (list: VitalsStatus[]) => statusOrder.map((s) => list.filter((x) => x === s).length);
  const pageCounts = count(rows.map((r) => r.status));
  const status = statusOrder.map((label, i) => ({ label, value: pageCounts[i], color: statusColors[i] }));
  const metricValues = [0, 1, 2].map((i) => count(rows.map((r) => r.cells[i].status)));
  const inMetric = (i: number) => new Set(rows.filter((r) => r.cells[i].status === "To Improve" || r.cells[i].status === "Poor").map((r) => r.url));
  const scoped = (i: number) => mine.filter((r) => inMetric(i).has(r.url));
  const second = mode === "field" ? "Interaction to Next Paint (INP)" : "Total Blocking Time (TBT)";
  const bad = (i: number) => metricValues[i][1] + metricValues[i][2] > 0;
  const all = (i: number) => (metricValues[i][3] ? "All measured pages" : "All pages");
  const metrics: VitalsMetric[] = [
    { title: "Largest Contentful Paint (LCP)", values: metricValues[0], tips: tipsFor(scoped(0), () => true), empty: bad(0) ? "Lighthouse found no opportunities for these pages." : `${all(0)} load their main content quickly.` },
    { title: second, values: metricValues[1], tips: tipsFor(scoped(1), (id) => jsOpportunities.has(id)), empty: bad(1) ? "Lighthouse found no JavaScript opportunities for these pages." : `${all(1)} respond quickly to user input.` },
    {
      title: "Cumulative Layout Shift (CLS)",
      values: metricValues[2],
      tips: tipsFor(scoped(2), (id) => clsOpportunities.has(id)),
      empty: bad(2) ? "Give images and embeds explicit sizes and avoid inserting content above existing content." : `${all(2)} have good visual stability. Content doesn’t shift or shifts slightly upon loading.`,
    },
  ];
  const origin = rows.filter((r) => r.source === "origin").length;
  const lab = rows.filter((r) => r.source === "lab" || r.source === "none").length;
  const notes: string[] = [];
  if (mode === "lab") notes.push("No Chrome UX Report field data yet, so Lighthouse lab values are shown and TBT stands in for INP.");
  else {
    notes.push("Field data: 75th percentile of real Chrome users over the last 28 days.");
    if (origin) notes.push(`${plural(origin, "page has", "pages have")} too little traffic of their own, so data for the whole origin is shown.`);
    if (lab) notes.push(`${plural(lab, "page has", "pages have")} no field data, so Lighthouse lab values are shown and INP is n/a.`);
  }
  const { max, ticks } = niceScale(P, 2);
  const fetchedAt = mine.map((r) => r.fetchedAt).sort().at(-1)!;
  return {
    strategy,
    mode,
    score: P ? Math.round((pageCounts[0] / P) * 100) : 0,
    pages: P,
    status,
    metrics,
    cols: ["LCP", mode === "field" ? "INP" : "TBT", "CLS"],
    rows,
    chart: { day: crawlDates(fetchedAt).day, values: pageCounts.slice(0, 3), max, ticks },
    note: notes.join(" "),
  };
}

function latestPerUrl(runs: PsiRun[]) {
  const m = new Map<string, PsiRun>();
  for (const r of runs) {
    const prev = m.get(r.url);
    if (!prev || prev.fetchedAt < r.fetchedAt) m.set(r.url, r);
  }
  return [...m.values()];
}

const median = (xs: number[]) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const scoreTone = (s: number | null): Tone => (s == null ? "na" : s >= 0.9 ? "good" : s >= 0.5 ? "mid" : "bad");

const bytes = (b: number) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(2)} MB` : `${Math.round(b / 1024).toLocaleString("en-US")} KB`);

const perfAudits: { label: string; id: string; fmt: (v: number) => string }[] = [
  { label: "First Contentful Paint", id: "first-contentful-paint", fmt: sec },
  { label: "Largest Contentful Paint", id: "largest-contentful-paint", fmt: sec },
  { label: "Speed Index", id: "speed-index", fmt: sec },
  { label: "Total Blocking Time", id: "total-blocking-time", fmt: ms },
  { label: "Cumulative Layout Shift", id: "cumulative-layout-shift", fmt: cls },
  { label: "Server response time", id: "server-response-time", fmt: ms },
  { label: "Total page size", id: "total-byte-weight", fmt: bytes },
  { label: "DOM elements", id: "dom-size", fmt: (v) => Math.round(v).toLocaleString("en-US") },
];

const perfTone = (n: number): Tone => (n >= 90 ? "good" : n >= 50 ? "mid" : "bad");

export function buildPerfLive(runs: PsiRun[]): PerfLive | null {
  const strategies = (["mobile", "desktop"] as const).filter((s) => runs.some((r) => r.strategy === s));
  const per = Object.fromEntries(strategies.map((s) => [s, latestPerUrl(runs.filter((r) => r.strategy === s))])) as Partial<Record<Strategy, PsiRun[]>>;
  const all = strategies.flatMap((s) => per[s]!);
  const perfScores = all.map((r) => r.scores?.performance).filter((v): v is number => v != null);
  if (!perfScores.length) return null;
  const score = Math.round(perfScores.reduce((a, b) => a + b, 0) / perfScores.length);
  const scoreRow: PerfMetricRow = {
    label: "Performance score",
    cells: Object.fromEntries(
      strategies.map((s) => {
        const xs = per[s]!.map((r) => r.scores?.performance).filter((v): v is number => v != null);
        const m = median(xs);
        return [s, m == null ? { text: "n/a", tone: "na" } : { text: String(Math.round(m)), tone: perfTone(m) }];
      }),
    ),
  };
  const metrics: PerfMetricRow[] = [
    scoreRow,
    ...perfAudits.map(({ label, id, fmt }) => ({
      label,
      cells: Object.fromEntries(
        strategies.map((s) => {
          const labs = per[s]!.map((r) => r.lab?.[id]).filter((l): l is NonNullable<PsiLab> => !!l && l.value != null);
          const v = median(labs.map((l) => l.value!));
          const sc = median(labs.map((l) => l.score).filter((x): x is number => x != null));
          return [s, v == null ? { text: "n/a", tone: "na" } : { text: fmt(v), tone: scoreTone(sc) }];
        }),
      ),
    })),
  ];
  const agg = new Map<string, { title: string; urls: Set<string>; max: number }>();
  for (const r of all)
    for (const o of r.opportunities ?? []) {
      const a = agg.get(o.id) ?? { title: o.title, urls: new Set<string>(), max: 0 };
      a.urls.add(r.url);
      a.max = Math.max(a.max, o.savingsMs);
      agg.set(o.id, a);
    }
  const opportunities: PerfOpportunity[] = [...agg.values()]
    .sort((a, b) => b.max - a.max || b.urls.size - a.urls.size)
    .map((a) => ({ title: a.title, pages: a.urls.size, savings: `Save ~${a.max >= 1000 ? `${(a.max / 1000).toFixed(1)} s` : `${a.max} ms`}`, severity: a.max >= 1000 ? "Warnings" : "Notices" }));
  return { score, strategies, pages: new Set(all.map((r) => r.url)).size, metrics, opportunities };
}

export function buildPsiLive(src: PsiSource | null | undefined): PsiLive | null {
  const runs = (src?.runs?.rows ?? []).filter((r) => r && typeof r.url === "string" && (r.strategy === "mobile" || r.strategy === "desktop"));
  if (!runs.length) return null;
  const views: Partial<Record<Strategy, VitalsView>> = {};
  for (const s of ["desktop", "mobile"] as const) {
    const v = buildVitalsView(runs, s);
    if (v) views[s] = v;
  }
  const initial: Strategy = views.desktop ? "desktop" : "mobile";
  const vitals = views[initial] ? { views, initial } : null;
  const perf = buildPerfLive(runs);
  return {
    vitals,
    perf,
    scores: { ...(vitals ? { webVitals: views[initial]!.score } : {}), ...(perf ? { performance: perf.score } : {}) },
    fetchedAt: src!.runs!.fetchedAt,
  };
}
