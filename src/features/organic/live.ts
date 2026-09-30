import type { LiveQuery, LiveSearch } from "@/lib/seo/live";
import { topKeywords as domainTopKeywords } from "@/features/domain/data";
import { changeRows, forvarvKeywords, positionRows, topicKeywords, type ChangeRow, type Intent, type MetricChange, type PositionRow, type SerpFeature } from "./data";

export type RankHistory = Map<string, Map<string, number | null>>;

export type MockKw = {
  intent: Intent | null;
  volume: string | null;
  kd: number | null;
  sf: number | null;
  cpc: string | null;
};

export type LivePage = {
  url: string;
  traffic: number;
  prevTraffic: number | null;
  pct: string;
  keywords: number;
  keyword: string | null;
  intent?: Intent | null;
  href?: string;
  isNew: boolean;
  lost: boolean;
};
export type LiveCountry = {
  iso3: string;
  code: string | null;
  name: string;
  traffic: number;
  keywords: number;
};
export type LiveSubdomain = {
  host: string;
  traffic: number;
  pct: string;
  keywords: number;
};
export type Delta = { value: string; delta: string };

export type LiveTrend = {
  labels: string[];
  titles: string[];
  bars: number[][];
  traffic: number[];
};

export type LiveMoves = {
  rows: ChangeRow[];
  counts: {
    all: number;
    improved: number;
    declined: number;
    new: number;
    lost: number;
  };
  top: Record<
    "New" | "Lost" | "Improved" | "Declined",
    {
      keyword: string;
      previous: number | null;
      current: number | null;
      volume: string;
      traffic: string;
    }[]
  >;
  pages: { url: string; traffic: number; diff: number }[];
  trend: {
    labels: string[];
    titles: string[];
    traffic: number[];
    improved: number[];
    declined: number[];
  };
  label: string;
};

export type LiveIntent = { key: Intent; label: string; pct: string; keywords: number; traffic: number; share: number; color: string };

export type LiveCompetitor = { domain: string; level: number; common: number; se: string; traffic: string; costs: string; paid: string };

export type LiveBubble = { domain: string; color: string; keywords: number; traffic: number; r: number; kx: number; cr: number };

export type LiveCompetitors = {
  rows: LiveCompetitor[];
  total: number;
  bubbles: LiveBubble[];
  map: { xMax: number; yMax: number; xTicks: number[]; yTicks: number[] };
};

export type OrganicLive = {
  domain: string;
  source?: "semrush" | "gsc";
  from: string;
  to: string;
  date: string;
  keywords: number;
  prevKeywords: number;
  traffic: number;
  prevTraffic: number;
  summary: Record<"keywords" | "traffic" | "branded" | "nonBranded", Delta> & { cost?: Delta };
  tips: Record<"keywords" | "traffic" | "branded" | "nonBranded", MetricChange> & { cost?: MetricChange };
  months: { current: string; previous: string };
  rows: PositionRow[];
  pages: LivePage[];
  pageCount: number;
  prevPageCount: number | null;
  subdomains: LiveSubdomain[];
  countries: LiveCountry[];
  dist: [number, number, number, number, number];
  series: { start: string; values: number[] };
  trafficSpark: number[];
  trend: LiveTrend | null;
  moves: LiveMoves | null;
  dbCounts: Record<string, number>;
  keywordSpark?: number[];
  overviewTrend?: { bars: number[][]; labels: string[]; titles: string[] } | null;
  intents?: LiveIntent[] | null;
  serp?: { linking: SerpFeature[]; notLinking: SerpFeature[] } | null;
  competitors?: LiveCompetitors | null;
};

const DAY = 864e5;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const addDays = (iso: string, n: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / DAY);
const parts = (iso: string) => ({
  y: +iso.slice(0, 4),
  m: +iso.slice(5, 7) - 1,
  d: +iso.slice(8, 10),
});
export const dayLabel = (iso: string) => `${MONTHS[parts(iso).m]} ${parts(iso).d}`;
export const fullDate = (iso: string) => `${dayLabel(iso)}, ${parts(iso).y}`;
export const longDay = (iso: string) => `${MONTH_NAMES[parts(iso).m]} ${parts(iso).d}`;
export const longDate = (iso: string) => `${longDay(iso)}, ${parts(iso).y}`;
export const monthYear = (iso: string) => `${MONTH_NAMES[parts(iso).m]} ${parts(iso).y}`;

export function rangeText(from: string, to: string) {
  const a = parts(from);
  const b = parts(to);
  if (a.m === b.m && a.y === b.y) return `${MONTHS[a.m]} ${a.d} – ${b.d}, ${b.y}`;
  if (a.y === b.y) return `${MONTHS[a.m]} ${a.d} – ${MONTHS[b.m]} ${b.d}, ${b.y}`;
  return `${fullDate(from)} – ${fullDate(to)}`;
}

export function historyMonths(to: string, n = 36) {
  const { y, m } = parts(to);
  return Array.from({ length: n }, (_, i) => {
    const k = y * 12 + m - 1 - i;
    return `${MONTH_NAMES[k % 12]} ${Math.floor(k / 12)}`;
  });
}

export function snapshotDates(to: string) {
  const { y, m } = parts(to);
  const rest = Array.from({ length: 6 }, (_, i) => {
    const k = y * 12 + m - i;
    return `${MONTHS[k % 12]} 15, ${Math.floor(k / 12)}`;
  });
  return [fullDate(to), ...rest.filter((d) => d !== fullDate(to))].slice(0, 7);
}

const trim = (v: number, d = 1) => String(+v.toFixed(d));

export function compact(n: number) {
  const a = Math.abs(n);
  if (a < 1000) return String(Math.round(n));
  if (a < 1e6) return `${trim(n / 1e3)}K`;
  return `${trim(n / 1e6)}M`;
}

export function deltaPct(cur: number, prev: number, digits = 2) {
  if (!prev) return cur ? "+100%" : "0%";
  const v = +(((cur - prev) / prev) * 100).toFixed(digits);
  return `${v > 0 ? "+" : ""}${v}%`;
}

export function share(part: number, total: number) {
  if (!total || !part) return "< 0.01";
  const v = (part / total) * 100;
  return v < 0.01 ? "< 0.01" : v.toFixed(2);
}

export const stripUrl = (u: string) => u.replace(/^https?:\/\//, "");
export const hostOf = (u: string) => stripUrl(u).replace(/[/?#].*$/, "");
export const roundPos = (p: number) => Math.max(1, Math.round(p));

export function niceTop(v: number, steps = 3) {
  if (v <= 0) return steps;
  const raw = v / steps;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const s = raw >= 1 && step < 1 ? 1 : step;
  return s * steps;
}

export function ticksFor(v: number, steps = 3) {
  const top = niceTop(v, steps);
  return Array.from({ length: steps + 1 }, (_, i) => +((top * i) / steps).toFixed(2));
}

let mockCache: Map<string, MockKw> | null = null;

export function mockKeywords() {
  if (mockCache) return mockCache;
  const m = new Map<string, MockKw>();
  const put = (k: string, v: Partial<MockKw>) => {
    const e = m.get(k) ?? {
      intent: null,
      volume: null,
      kd: null,
      sf: null,
      cpc: null,
    };
    m.set(k, {
      intent: e.intent ?? v.intent ?? null,
      volume: e.volume ?? v.volume ?? null,
      kd: e.kd ?? v.kd ?? null,
      sf: e.sf ?? v.sf ?? null,
      cpc: e.cpc ?? v.cpc ?? null,
    });
  };
  for (const r of positionRows) put(r.keyword, { intent: r.intent, volume: r.volume, kd: r.kd, sf: r.sf });
  for (const r of changeRows)
    put(r.keyword, {
      intent: r.intent,
      volume: r.volume,
      kd: r.kd,
      cpc: r.cpc,
    });
  for (const r of [...topicKeywords, ...forvarvKeywords]) put(r.keyword, { intent: r.intent, volume: r.volume, kd: r.kd });
  for (const r of domainTopKeywords) put(r.keyword, { intent: r.intent, volume: r.volume, cpc: r.cpc });
  mockCache = m;
  return m;
}

export const mockFor = (k: string) => mockKeywords().get(k.toLowerCase().trim()) ?? null;

const iso3: Record<string, [string, string]> = {
  swe: ["SE", "Sweden"],
  usa: ["US", "United States"],
  gbr: ["UK", "United Kingdom"],
  can: ["CA", "Canada"],
  aus: ["AU", "Australia"],
  fin: ["FI", "Finland"],
  ind: ["IN", "India"],
  nld: ["NL", "Netherlands"],
  vnm: ["VN", "Vietnam"],
  deu: ["DE", "Germany"],
  nor: ["NO", "Norway"],
  dnk: ["DK", "Denmark"],
  esp: ["ES", "Spain"],
  aut: ["AT", "Austria"],
  bel: ["BE", "Belgium"],
  fra: ["FR", "France"],
  irl: ["IE", "Ireland"],
  ita: ["IT", "Italy"],
  pol: ["PL", "Poland"],
  ukr: ["UA", "Ukraine"],
  afg: ["AF", "Afghanistan"],
  alb: ["AL", "Albania"],
  dza: ["DZ", "Algeria"],
  ago: ["AO", "Angola"],
  arg: ["AR", "Argentina"],
  arm: ["AM", "Armenia"],
  aze: ["AZ", "Azerbaijan"],
  bhr: ["BH", "Bahrain"],
  bgd: ["BD", "Bangladesh"],
  bra: ["BR", "Brazil"],
  bgr: ["BG", "Bulgaria"],
  chl: ["CL", "Chile"],
  col: ["CO", "Colombia"],
  are: ["AE", "United Arab Emirates"],
  che: ["CH", "Switzerland"],
  rus: ["RU", "Russia"],
  pak: ["PK", "Pakistan"],
  phl: ["PH", "Philippines"],
  nga: ["NG", "Nigeria"],
  tur: ["TR", "Turkey"],
  grc: ["GR", "Greece"],
  prt: ["PT", "Portugal"],
  cze: ["CZ", "Czechia"],
  est: ["EE", "Estonia"],
  lva: ["LV", "Latvia"],
  ltu: ["LT", "Lithuania"],
  isl: ["IS", "Iceland"],
  jpn: ["JP", "Japan"],
  chn: ["CN", "China"],
  kor: ["KR", "South Korea"],
  sgp: ["SG", "Singapore"],
  idn: ["ID", "Indonesia"],
  mys: ["MY", "Malaysia"],
  tha: ["TH", "Thailand"],
  egy: ["EG", "Egypt"],
  zaf: ["ZA", "South Africa"],
  mex: ["MX", "Mexico"],
  nzl: ["NZ", "New Zealand"],
  isr: ["IL", "Israel"],
  sau: ["SA", "Saudi Arabia"],
  irn: ["IR", "Iran"],
  irq: ["IQ", "Iraq"],
  syr: ["SY", "Syria"],
  som: ["SO", "Somalia"],
  eth: ["ET", "Ethiopia"],
  ken: ["KE", "Kenya"],
  rou: ["RO", "Romania"],
  hun: ["HU", "Hungary"],
  srb: ["RS", "Serbia"],
  hrv: ["HR", "Croatia"],
  bih: ["BA", "Bosnia and Herzegovina"],
  svn: ["SI", "Slovenia"],
  svk: ["SK", "Slovakia"],
  lux: ["LU", "Luxembourg"],
  cyp: ["CY", "Cyprus"],
  mlt: ["MT", "Malta"],
  hkg: ["HK", "Hong Kong"],
  twn: ["TW", "Taiwan"],
  lka: ["LK", "Sri Lanka"],
  npl: ["NP", "Nepal"],
  mar: ["MA", "Morocco"],
  tun: ["TN", "Tunisia"],
  per: ["PE", "Peru"],
  ven: ["VE", "Venezuela"],
  ecu: ["EC", "Ecuador"],
  qat: ["QA", "Qatar"],
  kwt: ["KW", "Kuwait"],
  jor: ["JO", "Jordan"],
  lbn: ["LB", "Lebanon"],
  geo: ["GE", "Georgia"],
  blr: ["BY", "Belarus"],
  mda: ["MD", "Moldova"],
  mkd: ["MK", "North Macedonia"],
  mne: ["ME", "Montenegro"],
  kaz: ["KZ", "Kazakhstan"],
  uzb: ["UZ", "Uzbekistan"],
  gha: ["GH", "Ghana"],
  eri: ["ER", "Eritrea"],
  cmr: ["CM", "Cameroon"],
  tza: ["TZ", "Tanzania"],
  uga: ["UG", "Uganda"],
  ury: ["UY", "Uruguay"],
  pry: ["PY", "Paraguay"],
  bol: ["BO", "Bolivia"],
  cri: ["CR", "Costa Rica"],
  pan: ["PA", "Panama"],
  dom: ["DO", "Dominican Republic"],
  cub: ["CU", "Cuba"],
  jam: ["JM", "Jamaica"],
  mmr: ["MM", "Myanmar"],
  khm: ["KH", "Cambodia"],
};

const byCode = new Map(Object.values(iso3));

export const countryByCode = (code: string) => byCode.get(code.toUpperCase()) ?? null;

export function countryOf(code: string) {
  const c = code.toLowerCase();
  const hit = iso3[c];
  if (hit) return { code: hit[0], name: hit[1] };
  if (c === "zzz" || !c) return { code: null, name: "Unknown Region" };
  return { code: null, name: c.toUpperCase() };
}

export function rolling(daily: { date: string; clicks: number }[], to: string, window = 28) {
  if (!daily.length) return { start: to, values: [] as number[] };
  const first = daily[0].date;
  const map = new Map(daily.map((d) => [d.date, d.clicks]));
  const n = daysBetween(first, to) + 1;
  const clicks = Array.from({ length: n }, (_, i) => map.get(addDays(first, i)) ?? 0);
  const values: number[] = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += clicks[i];
    if (i >= window) sum -= clicks[i - window];
    if (i >= window - 1) values.push(sum);
  }
  return { start: addDays(first, window - 1), values };
}

export function seriesAt(series: { start: string; values: number[] }, date: string) {
  const i = daysBetween(series.start, date);
  return i >= 0 && i < series.values.length ? series.values[i] : null;
}

export function posAt(hist: Map<string, number | null> | undefined, date: string, lookback = 28) {
  if (!hist) return null;
  for (let i = 0; i < lookback; i++) {
    const v = hist.get(addDays(date, -i));
    if (v != null) return v;
  }
  return null;
}

const bucketOf = (p: number) => {
  const r = roundPos(p);
  return r <= 3 ? 0 : r <= 10 ? 1 : r <= 20 ? 2 : r <= 50 ? 3 : 4;
};

type Prev = {
  clicks: number;
  impressions: number;
  position: number | null;
  page: string | null;
};

export function previousOf(cur: LiveQuery | undefined, wide: LiveQuery | undefined): Prev {
  if (!wide) return { clicks: 0, impressions: 0, position: null, page: null };
  const impressions = wide.impressions - (cur?.impressions ?? 0);
  const clicks = Math.max(0, wide.clicks - (cur?.clicks ?? 0));
  if (impressions <= 0) return { clicks, impressions: 0, position: null, page: null };
  const position = (wide.position * wide.impressions - (cur ? cur.position * cur.impressions : 0)) / impressions;
  const curPages = new Map((cur?.pages ?? []).map((p) => [p.page, p.impressions]));
  const page = [...wide.pages]
    .map((p) => ({
      page: p.page,
      n: p.impressions - (curPages.get(p.page) ?? 0),
    }))
    .sort((a, b) => b.n - a.n)[0];
  return {
    clicks,
    impressions,
    position: Math.max(1, position),
    page: page && page.n > 0 ? page.page : null,
  };
}

export function brandRoot(domain: string) {
  const host = hostOf(domain).replace(/^www\./, "");
  const root = host.split(".").slice(0, -1).join(".") || host;
  return root.toLowerCase();
}

function positionRow(q: LiveQuery, total: number, updated: string): PositionRow {
  const m = mockFor(q.query);
  return {
    keyword: q.query,
    intent: m?.intent ?? null,
    position: roundPos(q.position),
    sf: m?.sf ?? null,
    traffic: q.clicks,
    pct: share(q.clicks, total),
    volume: m?.volume ?? "n/a",
    kd: m?.kd ?? null,
    url: stripUrl(q.page),
    updated,
  };
}

function buildTrend(cur: LiveSearch, history: RankHistory, series: { start: string; values: number[] }, len = 31): LiveTrend {
  const to = cur.range.to;
  const days = Array.from({ length: len }, (_, i) => addDays(to, i - len + 1));
  const hists = [...history.values()];
  const bars = days.map((d) => {
    const b = [0, 0, 0, 0, 0, 0];
    for (const h of hists) {
      const p = posAt(h, d);
      if (p != null) b[bucketOf(p)]++;
    }
    return b;
  });
  return {
    labels: days.map((d, i) => (i % 2 ? "" : dayLabel(d))),
    titles: days.map(longDate),
    bars,
    traffic: days.map((d) => seriesAt(series, d) ?? 0),
  };
}

function buildMoves(cur: LiveSearch, wide: LiveSearch, history: RankHistory | null, series: { start: string; values: number[] }, updated: string): LiveMoves {
  const total = cur.totals.clicks;
  const curQ = new Map(cur.queries.map((q) => [q.query, q]));
  const rows: { row: ChangeRow; key: number }[] = [];
  for (const w of wide.queries) {
    const c = curQ.get(w.query);
    const prev = previousOf(c, w);
    const prevPos = prev.position == null ? null : roundPos(prev.position);
    const curPos = c ? roundPos(c.position) : null;
    if (prevPos == null && curPos == null) continue;
    if (prevPos != null && curPos != null && prevPos === curPos) continue;
    const kind: ChangeRow["diff"] = prevPos == null ? "new" : curPos == null ? "lost" : curPos < prevPos ? "improved" : "declined";
    const m = mockFor(w.query);
    const clicks = c?.clicks ?? 0;
    rows.push({
      key: clicks * 1e6 + (c?.impressions ?? 0) + prev.clicks * 1e3,
      row: {
        keyword: w.query,
        intent: m?.intent ?? null,
        previous: prevPos,
        current: curPos,
        diff: kind,
        change: prevPos != null && curPos != null ? prevPos - curPos : undefined,
        traffic: clicks,
        pct: share(clicks, total),
        volume: m?.volume ?? "n/a",
        kd: m?.kd ?? null,
        cpc: m?.cpc ?? "n/a",
        url: stripUrl(c?.page ?? prev.page ?? w.page),
        updated,
        results: "n/a",
        cells: {
          pct: share(clicks, total),
          change: `${clicks - prev.clicks > 0 ? "+" : ""}${clicks - prev.clicks}`,
        },
      },
    });
  }
  rows.sort((a, b) => b.key - a.key || a.row.keyword.localeCompare(b.row.keyword));
  const clean = rows.map((r) => r.row);
  const count = (k: ChangeRow["diff"]) => clean.filter((r) => r.diff === k).length;
  const top = (k: ChangeRow["diff"]) =>
    clean
      .filter((r) => r.diff === k)
      .map((r) => ({
        keyword: r.keyword,
        previous: r.previous,
        current: r.current,
        volume: r.volume,
        traffic: r.pct,
      }));

  const curPages = new Map(cur.pages.map((p) => [p.page, p.clicks]));
  const pageSet = new Set([...cur.pages.map((p) => p.page), ...wide.pages.map((p) => p.page)]);
  const widePages = new Map(wide.pages.map((p) => [p.page, p.clicks]));
  const pages = [...pageSet]
    .map((url) => {
      const now = curPages.get(url) ?? 0;
      const prev = Math.max(0, (widePages.get(url) ?? 0) - now);
      return { url, traffic: now, diff: now - prev };
    })
    .filter((p) => p.diff !== 0)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff) || b.traffic - a.traffic)
    .slice(0, 5);

  const to = cur.range.to;
  const days = Array.from({ length: 28 }, (_, i) => addDays(to, i - 27));
  const hists = history ? [...history.values()] : [];
  const moved = days.map((d) => {
    let up = 0;
    let down = 0;
    for (const h of hists) {
      const a = posAt(h, addDays(d, -1));
      const b = posAt(h, d);
      if (a == null || b == null) continue;
      if (roundPos(b) < roundPos(a)) up++;
      else if (roundPos(b) > roundPos(a)) down++;
    }
    return [up, down];
  });

  return {
    rows: clean,
    counts: {
      all: clean.length,
      improved: count("improved"),
      declined: count("declined"),
      new: count("new"),
      lost: count("lost"),
    },
    top: {
      New: top("new"),
      Lost: top("lost"),
      Improved: top("improved"),
      Declined: top("declined"),
    },
    pages,
    trend: {
      labels: days.map((d, i) => (i % 3 === 0 ? dayLabel(d) : "")),
      titles: days.map(longDay),
      traffic: days.map((d) => seriesAt(series, d) ?? 0),
      improved: moved.map((m) => m[0]),
      declined: moved.map((m) => m[1]),
    },
    label: rangeText(cur.range.from, to),
  };
}

export function buildOrganicLive({ cur, wide = null, history = null }: { cur: LiveSearch; wide?: LiveSearch | null; history?: RankHistory | null }): OrganicLive {
  const { from, to } = cur.range;
  const t = cur.totals;
  const updated = dayLabel(to);
  const brand = brandRoot(cur.project.domain);
  const isBranded = (q: string) => brand.length > 2 && q.toLowerCase().replace(/\s+/g, "").includes(brand);
  const branded = cur.queries.filter((q) => isBranded(q.query)).reduce((s, q) => s + q.clicks, 0);
  const curQ = new Map(cur.queries.map((q) => [q.query, q]));
  const prevBranded = wide ? wide.queries.filter((q) => isBranded(q.query)).reduce((s, q) => s + previousOf(curQ.get(q.query), q).clicks, 0) : branded;
  const nonBranded = t.clicks - branded;
  const prevNon = t.prevClicks - prevBranded;
  const tip = (c: number, p: number): MetricChange => ({
    current: compact(c),
    previous: compact(p),
    diff: compact(Math.abs(c - p)),
  });

  const bestKeyword = new Map<string, string>();
  for (const q of cur.queries) if (!bestKeyword.has(q.page) && q.clicks > 0) bestKeyword.set(q.page, q.query);
  const curPageMap = new Map(cur.pages.map((p) => [p.page, p]));
  const pages: LivePage[] = cur.pages.map((p) => {
    const w = wide?.pages.find((x) => x.page === p.page);
    const prevImpr = w ? w.impressions - p.impressions : 0;
    return {
      url: stripUrl(p.page),
      traffic: p.clicks,
      prevTraffic: wide ? Math.max(0, (w?.clicks ?? p.clicks) - p.clicks) : null,
      pct: share(p.clicks, t.clicks),
      keywords: p.keywords,
      keyword: bestKeyword.get(p.page) ?? null,
      isNew: !!wide && prevImpr <= 0,
      lost: false,
    };
  });
  if (wide) {
    for (const w of wide.pages) {
      if (curPageMap.has(w.page)) continue;
      pages.push({
        url: stripUrl(w.page),
        traffic: 0,
        prevTraffic: w.clicks,
        pct: "0",
        keywords: 0,
        keyword: null,
        isNew: false,
        lost: true,
      });
    }
  }
  const prevPageCount = wide ? wide.pages.filter((w) => w.impressions - (curPageMap.get(w.page)?.impressions ?? 0) > 0).length : null;

  const hostMap = new Map<string, { traffic: number; keywords: Set<string> }>();
  for (const q of cur.queries) {
    for (const p of q.pages) {
      const h = hostOf(p.page);
      const e = hostMap.get(h) ?? { traffic: 0, keywords: new Set<string>() };
      e.keywords.add(q.query);
      hostMap.set(h, e);
    }
  }
  for (const p of cur.pages) {
    const h = hostOf(p.page);
    const e = hostMap.get(h) ?? { traffic: 0, keywords: new Set<string>() };
    e.traffic += p.clicks;
    hostMap.set(h, e);
  }
  const hostTotal = [...hostMap.values()].reduce((s, e) => s + e.traffic, 0);
  const subdomains = [...hostMap]
    .map(([host, e]) => ({
      host,
      traffic: hostTotal ? Math.round((t.clicks * e.traffic) / hostTotal) : 0,
      pct: hostTotal ? ((e.traffic / hostTotal) * 100).toFixed(2) : hostMap.size === 1 ? "100.00" : "0.00",
      keywords: e.keywords.size,
    }))
    .sort((a, b) => b.traffic - a.traffic || b.keywords - a.keywords);

  const countries = cur.countries.map((c) => ({
    iso3: c.country,
    ...countryOf(c.country),
    traffic: c.clicks,
    keywords: c.keywords,
  }));
  const dbCounts: Record<string, number> = {};
  for (const c of countries) if (c.code) dbCounts[c.code] = c.keywords;

  const split50 = cur.queries.filter((q) => roundPos(q.position) > 20 && roundPos(q.position) <= 50).length;
  const d = cur.distribution;
  const series = rolling(cur.daily, to);
  const trafficSpark = Array.from({ length: 12 }, (_, i) => seriesAt(series, addDays(to, -30 * (11 - i)))).filter((v): v is number => v != null);

  return {
    domain: hostOf(cur.project.domain),
    source: "gsc",
    from,
    to,
    date: fullDate(to),
    keywords: t.keywords,
    prevKeywords: t.prevKeywords,
    traffic: t.clicks,
    prevTraffic: t.prevClicks,
    summary: {
      keywords: {
        value: compact(t.keywords),
        delta: deltaPct(t.keywords, t.prevKeywords),
      },
      traffic: {
        value: compact(t.clicks),
        delta: deltaPct(t.clicks, t.prevClicks),
      },
      branded: {
        value: compact(branded),
        delta: deltaPct(branded, prevBranded),
      },
      nonBranded: {
        value: compact(nonBranded),
        delta: deltaPct(nonBranded, prevNon),
      },
    },
    tips: {
      keywords: tip(t.keywords, t.prevKeywords),
      traffic: tip(t.clicks, t.prevClicks),
      branded: tip(branded, prevBranded),
      nonBranded: tip(nonBranded, prevNon),
    },
    months: { current: monthYear(to), previous: monthYear(addDays(from, -1)) },
    rows: cur.queries.map((q) => positionRow(q, t.clicks, updated)),
    pages,
    pageCount: cur.pages.length,
    prevPageCount,
    subdomains,
    countries,
    dist: [d.top3, d.top10, d.top20, split50, d.top100 - split50],
    series,
    trafficSpark,
    trend: history ? buildTrend(cur, history, series) : null,
    moves: wide ? buildMoves(cur, wide, history, series, updated) : null,
    dbCounts,
  };
}

export type OrganicView = "overview" | "positions" | "changes" | "subdomains" | "competitors" | "header";

export function forView(live: OrganicLive, view: OrganicView): OrganicLive {
  const keepRows = view === "positions" ? live.rows : view === "overview" ? live.rows.slice(0, 5) : [];
  return {
    ...live,
    rows: keepRows,
    pages: view === "overview" ? live.pages.filter((p) => !p.lost).slice(0, 5) : [],
    series: { start: live.series.start, values: [] },
    moves:
      live.moves &&
      (view === "changes"
        ? live.moves
        : view === "overview"
          ? {
              ...live.moves,
              rows: [],
              top: Object.fromEntries(Object.entries(live.moves.top).map(([k, v]) => [k, v.slice(0, 3)])) as LiveMoves["top"],
            }
          : null),
    trend: view === "positions" ? live.trend : null,
    overviewTrend: view === "overview" ? live.overviewTrend : null,
    intents: view === "overview" ? live.intents : null,
    serp: view === "overview" ? live.serp : null,
    competitors:
      live.competitors && (view === "competitors" ? live.competitors : view === "overview" ? { ...live.competitors, rows: live.competitors.rows.slice(0, 5) } : null),
  };
}
