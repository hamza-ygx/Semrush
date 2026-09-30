import type { LiveSemrush } from "@/lib/seo/semrush";
import type { SemChange, SemKeyword, SemOverview } from "@/lib/seo/semrushNormalize";
import { intents as mockIntents, linkingFeatures, notLinkingFeatures, type ChangeRow, type Intent, type MetricChange, type PositionRow, type SerpFeature } from "./data";
import {
  addDays,
  brandRoot,
  compact,
  countryByCode,
  daysBetween,
  deltaPct,
  fullDate,
  hostOf,
  longDay,
  dayLabel,
  monthYear,
  rangeText,
  stripUrl,
  type LiveBubble,
  type LiveCompetitors,
  type LiveCountry,
  type LiveIntent,
  type LiveMoves,
  type LivePage,
  type LiveTrend,
  type OrganicLive,
} from "./live";

export type SemMonth = { date: string; rank: number; keywords: number; traffic: number; cost: number; adKeywords: number; adTraffic: number; buckets: number[] };

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const INTENTS: Record<number, Intent> = { 0: "C", 1: "I", 2: "N", 3: "T" };

export const serpCodes: Record<number, { label: string; icon: string }> = {
  0: { label: "Instant answer", icon: "question" },
  1: { label: "Knowledge panel", icon: "cap" },
  2: { label: "Carousel", icon: "carousel" },
  3: { label: "Local pack", icon: "pin" },
  4: { label: "Top stories", icon: "stories" },
  5: { label: "Image pack", icon: "imagePack" },
  6: { label: "Sitelinks", icon: "link" },
  7: { label: "Reviews", icon: "star" },
  8: { label: "X", icon: "x" },
  9: { label: "Video", icon: "play" },
  10: { label: "Featured video", icon: "playBox" },
  11: { label: "Featured snippet", icon: "crown" },
  13: { label: "Image", icon: "image" },
  14: { label: "Ads top", icon: "ad" },
  15: { label: "Ads bottom", icon: "adBottom" },
  16: { label: "Shopping ads", icon: "cart" },
  17: { label: "Hotels pack", icon: "hotel" },
  18: { label: "Jobs", icon: "bag" },
  20: { label: "Video carousel", icon: "play" },
  21: { label: "People also ask", icon: "paa" },
  22: { label: "FAQ", icon: "question" },
  23: { label: "Flights", icon: "plane" },
  24: { label: "Find results on", icon: "findResults" },
  25: { label: "Recipes", icon: "fork" },
  27: { label: "X carousel", icon: "x" },
  28: { label: "Indented", icon: "indent" },
  29: { label: "News", icon: "news" },
  30: { label: "Address pack", icon: "address" },
  32: { label: "Events", icon: "calendar" },
  34: { label: "Popular products", icon: "cartDots" },
  35: { label: "Related products", icon: "cart" },
  36: { label: "Related searches", icon: "related" },
  37: { label: "See results about", icon: "seeResults" },
  41: { label: "Buying Guide", icon: "list" },
  42: { label: "Organic Carousel", icon: "news" },
  43: { label: "Things to Know", icon: "bullets" },
  44: { label: "Datasets", icon: "folder" },
  45: { label: "Discussions and Forums", icon: "chat" },
  46: { label: "Explore Brands", icon: "tag" },
  47: { label: "Questions and Answers", icon: "paa" },
  49: { label: "Refine", icon: "funnel" },
  50: { label: "People also search", icon: "pas" },
  51: { label: "Ads middle", icon: "ad" },
  52: { label: "AI Overview", icon: "spark" },
};

const AI_OVERVIEW = 52;

export const showUrl = (u: string) => {
  try {
    return stripUrl(decodeURI(u));
  } catch {
    return stripUrl(u);
  }
};

export const isoDay = (s: string | null | undefined) => (s && /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null);

export const shortDay = (iso: string) => `${MON[+iso.slice(5, 7) - 1]} ${iso.slice(8, 10)}`;

const monthShort = (iso: string) => `${MON[+iso.slice(5, 7) - 1]} ${iso.slice(2, 4)}`;

export const intentOf = (codes: number[]) => (codes.length ? (INTENTS[codes[0]] ?? null) : null);

export const pctText = (v: number | null | undefined) => (v == null || v < 0.01 ? "< 0.01" : v.toFixed(2));

export const volText = (v: number | null | undefined) => (v == null ? "n/a" : compact(v));

export const cpcText = (v: number | null | undefined) => (v == null ? "n/a" : String(+v.toFixed(2)));

export function money(n: number) {
  return Math.abs(n) < 1000 ? `$${n.toFixed(1)}` : `$${compact(n)}`;
}

export function costText(n: number | null | undefined) {
  const v = n ?? 0;
  if (Math.abs(v) < 1000) return String(Math.round(v));
  if (Math.abs(v) < 1e6) return `${+(v / 1e3).toFixed(2)}K`;
  return `${+(v / 1e6).toFixed(2)}M`;
}

export function niceStep(v: number) {
  if (v <= 1) return 1;
  const mag = 10 ** Math.floor(Math.log10(v));
  return [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= v) ?? 10 * mag;
}

export const bucketsOf = (b: number[]) => {
  const s = (from: number, to: number) => b.slice(from, to).reduce((a, v) => a + v, 0);
  return [s(0, 1), s(1, 2), s(2, 3), s(3, 6), s(6, 11)] as [number, number, number, number, number];
};

export function semTo(sem: LiveSemrush) {
  const d = sem.overview ?? sem.keywords ?? sem.history ?? sem.pages ?? sem.competitors ?? sem.changes ?? sem.overviewAll ?? sem.subdomains;
  return isoDay(d?.fetchedAt) ?? null;
}

export function semMonths(sem: LiveSemrush): SemMonth[] {
  const rows: SemMonth[] = (sem.history?.rows ?? [])
    .filter((h) => isoDay(h.date))
    .map((h) => ({
      date: isoDay(h.date)!,
      rank: h.rank ?? 0,
      keywords: h.keywords ?? 0,
      traffic: h.traffic ?? 0,
      cost: h.cost ?? 0,
      adKeywords: h.adKeywords ?? 0,
      adTraffic: h.adTraffic ?? 0,
      buckets: h.buckets ?? Array(11).fill(0),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const ov = sem.overview?.rows[0];
  const to = semTo(sem);
  if (!ov || !to) return rows;
  const out = rows.filter((r) => r.date.slice(0, 7) < to.slice(0, 7));
  out.push({
    date: to,
    rank: ov.rank ?? 0,
    keywords: ov.keywords ?? 0,
    traffic: ov.traffic ?? 0,
    cost: ov.cost ?? 0,
    adKeywords: ov.adKeywords ?? 0,
    adTraffic: ov.adTraffic ?? 0,
    buckets: ov.buckets ?? Array(11).fill(0),
  });
  return out;
}

export function dailySteps(months: SemMonth[], to: string, days: number, pick: (m: SemMonth) => number) {
  if (!months.length) return { start: to, values: [] as number[] };
  const first = months[0].date;
  const start = daysBetween(first, addDays(to, -(days - 1))) > 0 ? addDays(to, -(days - 1)) : first;
  const n = daysBetween(start, to) + 1;
  const values: number[] = [];
  let k = 0;
  for (let i = 0; i < n; i++) {
    const d = addDays(start, i);
    while (k + 1 < months.length && months[k + 1].date <= d) k++;
    values.push(months[k].date <= d ? pick(months[k]) : 0);
  }
  return { start, values };
}

const monthBars = (m: SemMonth, serp = 0) => [...bucketsOf(m.buckets), serp];

function keywordFeatures(rows: SemKeyword[]) {
  const map = new Map<string, { pos: Set<number>; all: Set<number> }>();
  for (const r of rows) {
    const e = map.get(r.keyword) ?? { pos: new Set<number>(), all: new Set<number>() };
    for (const c of r.serpByPosition) e.pos.add(c);
    for (const c of r.serpByKeyword) e.all.add(c);
    map.set(r.keyword, e);
  }
  return [...map.values()];
}

export function serpOf(rows: SemKeyword[]): { linking: SerpFeature[]; notLinking: SerpFeature[] } {
  const kws = keywordFeatures(rows);
  const codesOf = (label: string) => Object.entries(serpCodes).filter(([, v]) => v.label === label).map(([k]) => +k);
  const count = (label: string, linked: boolean) => {
    const codes = codesOf(label);
    return kws.filter((k) => codes.some((c) => (linked ? k.pos.has(c) : k.all.has(c) && !k.pos.has(c)))).length;
  };
  const order = (list: SerpFeature[]) => [...list.filter((f) => f.count > 0), ...list.filter((f) => f.count === 0)];
  return {
    linking: order(linkingFeatures.map((f) => ({ ...f, count: count(f.name, true) }))),
    notLinking: order(notLinkingFeatures.map((f) => ({ ...f, count: count(f.name, false) }))),
  };
}

export const linkedCount = (rows: SemKeyword[]) => keywordFeatures(rows).filter((k) => k.pos.size > 0).length;

export function positionRowOf(k: SemKeyword): PositionRow {
  const features = k.serpByKeyword.map((c) => serpCodes[c]).filter((f): f is { label: string; icon: string } => !!f);
  const updated = isoDay(k.updated);
  return {
    keyword: k.keyword,
    intent: intentOf(k.intents),
    position: k.position ?? 0,
    local: /local/i.test(k.positionType ?? "") || undefined,
    sf: k.serpByKeyword.length,
    features,
    traffic: Math.round(k.traffic ?? 0),
    pct: pctText(k.trafficPct),
    volume: volText(k.volume),
    kd: k.kd == null ? null : Math.round(k.kd),
    url: showUrl(k.url),
    updated: updated ? shortDay(updated) : "n/a",
  };
}

export const byTraffic = (a: SemKeyword, b: SemKeyword) => (b.trafficPct ?? 0) - (a.trafficPct ?? 0) || (b.traffic ?? 0) - (a.traffic ?? 0) || (b.volume ?? 0) - (a.volume ?? 0) || (a.position ?? 999) - (b.position ?? 999);

export function intentsOf(ov: SemOverview): LiveIntent[] | null {
  if (!ov.intents) return null;
  const names: Record<Intent, string> = { I: "informational", N: "navigational", C: "commercial", T: "transactional" };
  const list = mockIntents.map((m) => ({ m, v: ov.intents![names[m.key]] ?? { positions: 0, traffic: 0 } }));
  const total = list.reduce((s, x) => s + (x.v.positions ?? 0), 0);
  return list.map(({ m, v }) => {
    const share = total ? ((v.positions ?? 0) / total) * 100 : 0;
    return { key: m.key, label: m.label, color: m.color, keywords: v.positions ?? 0, traffic: v.traffic ?? 0, share: +share.toFixed(1), pct: `${share.toFixed(1)}%` };
  });
}

const BUBBLE_COLORS = ["#6167e6", "#3ddab4", "#c686f5", "#fdb42c", "#ff6b70"];
const SELF_COLOR = "#a9b8fb";

export function competitorsOf(sem: LiveSemrush, domain: string, self: { keywords: number; traffic: number }): LiveCompetitors | null {
  const list = sem.competitors?.rows;
  if (!list?.length) return null;
  const rows = list.map((c) => ({
    domain: c.domain,
    level: Math.round((c.relevance ?? 0) * 100),
    common: c.common ?? 0,
    se: compact(c.keywords ?? 0),
    traffic: compact(c.traffic ?? 0),
    costs: costText(c.cost),
    paid: compact(c.adKeywords ?? 0),
  }));
  const pts = [...list.slice(0, 5).map((c, i) => ({ domain: c.domain, color: BUBBLE_COLORS[i], keywords: c.keywords ?? 0, traffic: c.traffic ?? 0 })), { domain, color: SELF_COLOR, ...self }];
  const maxT = Math.max(1, ...pts.map((p) => p.traffic));
  const maxK = Math.max(1, ...pts.map((p) => p.keywords));
  const bubbles: LiveBubble[] = pts.map((p) => {
    const r = Math.max(8, Math.round(50 * Math.sqrt(p.traffic / maxT)));
    return { ...p, r, kx: p.keywords, cr: r };
  });
  const xMax = Math.max(10, maxK * 1.08);
  const yMax = Math.max(4, maxT * 1.04);
  const xs = niceStep(xMax / 3);
  const ys = niceStep(yMax / 2.5);
  const ticks = (step: number, max: number) => Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step);
  return { rows, total: list.length, bubbles, map: { xMax, yMax, xTicks: ticks(xs, xMax), yTicks: ticks(ys, yMax) } };
}

const CHANGE: Record<SemChange["change"], ChangeRow["diff"]> = { new: "new", lost: "lost", rise: "improved", fall: "declined" };

export function changeRowOf(c: SemChange): ChangeRow {
  const previous = c.previousPosition || null;
  const current = c.position || null;
  const diff = CHANGE[c.change];
  const traffic = Math.round(c.traffic ?? 0);
  const pct = pctText(c.trafficPct);
  const updated = isoDay(c.updated);
  return {
    keyword: c.keyword,
    intent: intentOf(c.intents),
    previous,
    current,
    diff,
    change: previous != null && current != null ? previous - current : undefined,
    traffic,
    pct,
    volume: volText(c.volume),
    kd: c.kd == null ? null : Math.round(c.kd),
    cpc: cpcText(c.cpc),
    url: showUrl(c.url),
    updated: updated ? shortDay(updated) : "n/a",
    results: c.results == null ? "n/a" : compact(c.results),
    cells: { pct, change: diff === "new" ? (traffic > 0 ? `+${traffic}` : "0") : "n/a" },
    com: c.competition == null ? "n/a" : c.competition.toFixed(2),
  };
}

export function movesOf(list: SemChange[], months: SemMonth[], to: string, basePages: LiveMoves["pages"] | null): LiveMoves {
  const sorted = [...list].sort((a, b) => (b.traffic ?? 0) - (a.traffic ?? 0) || (b.volume ?? 0) - (a.volume ?? 0) || a.keyword.localeCompare(b.keyword));
  const rows = sorted.map(changeRowOf);
  const count = (k: ChangeRow["diff"]) => rows.filter((r) => r.diff === k).length;
  const top = (k: ChangeRow["diff"]) => rows.filter((r) => r.diff === k).map((r) => ({ keyword: r.keyword, previous: r.previous, current: r.current, volume: r.volume, traffic: r.pct }));
  const byUrl = new Map<string, { traffic: number; diff: number }>();
  for (const c of sorted) {
    const e = byUrl.get(c.url) ?? { traffic: 0, diff: 0 };
    const t = Math.round(c.traffic ?? 0);
    e.traffic += t;
    if (c.change === "new") e.diff += t;
    byUrl.set(c.url, e);
  }
  const pages =
    basePages ??
    [...byUrl]
      .map(([url, e]) => ({ url, ...e }))
      .filter((p) => p.diff !== 0)
      .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff) || b.traffic - a.traffic)
      .slice(0, 5);
  const days = Array.from({ length: 28 }, (_, i) => addDays(to, i - 27));
  const traffic = dailySteps(months, to, 28, (m) => m.traffic);
  const at = (d: string) => {
    const i = daysBetween(traffic.start, d);
    return i >= 0 && i < traffic.values.length ? traffic.values[i] : 0;
  };
  const dayOf = (c: SemChange) => isoDay(c.updated);
  const moved = (d: string, kinds: SemChange["change"][]) => list.filter((c) => dayOf(c) === d && kinds.includes(c.change)).length;
  const dates = list.map(dayOf).filter((d): d is string => !!d).sort();
  const last = dates[dates.length - 1] ?? to;
  const first = dates[0] && dates[0] !== last ? dates[0] : addDays(last, -1);
  return {
    rows,
    counts: { all: rows.length, improved: count("improved"), declined: count("declined"), new: count("new"), lost: count("lost") },
    top: { New: top("new"), Lost: top("lost"), Improved: top("improved"), Declined: top("declined") },
    pages,
    trend: {
      labels: days.map((d, i) => (i % 3 === 0 ? dayLabel(d) : "")),
      titles: days.map(longDay),
      traffic: days.map(at),
      improved: days.map((d) => moved(d, ["rise", "new"])),
      declined: days.map((d) => moved(d, ["fall", "lost"])),
    },
    label: rangeText(first, last),
  };
}

function emptyLive(domain: string, to: string): OrganicLive {
  const z = { value: "0", delta: "0%" };
  const t: MetricChange = { current: "0", previous: "0", diff: "0" };
  return {
    domain,
    source: "semrush",
    from: `${to.slice(0, 7)}-01`,
    to,
    date: fullDate(to),
    keywords: 0,
    prevKeywords: 0,
    traffic: 0,
    prevTraffic: 0,
    summary: { keywords: z, traffic: z, branded: z, nonBranded: z },
    tips: { keywords: t, traffic: t, branded: t, nonBranded: t },
    months: { current: monthYear(to), previous: monthYear(addDays(`${to.slice(0, 7)}-01`, -1)) },
    rows: [],
    pages: [],
    pageCount: 0,
    prevPageCount: null,
    subdomains: [],
    countries: [],
    dist: [0, 0, 0, 0, 0],
    series: { start: to, values: [] },
    trafficSpark: [],
    trend: null,
    moves: null,
    dbCounts: {},
  };
}

export const SERIES_DAYS = 800;

export function countriesOf(sem: LiveSemrush): LiveCountry[] | null {
  const all = sem.overviewAll?.rows.filter((r) => r.database && !r.database.startsWith("mobile"));
  if (!all?.length) return null;
  return all
    .map((r) => {
      const code = r.database.toUpperCase();
      return { iso3: r.database, code, name: countryByCode(code) ?? code, traffic: r.traffic ?? 0, keywords: r.keywords ?? 0 };
    })
    .sort((a, b) => b.traffic - a.traffic || b.keywords - a.keywords);
}

export function applySemrush(sem: LiveSemrush, base: OrganicLive | null): OrganicLive | null {
  const ov = sem.overview?.rows[0];
  const to = semTo(sem);
  if (!to || (!ov && !base)) return base;
  const domain = hostOf(sem.domain).replace(/^www\./, "");
  const o: OrganicLive = base ? { ...base, domain, source: "semrush" } : emptyLive(domain, to);
  const months = semMonths(sem);
  const keywords = sem.keywords?.rows ?? null;

  if (ov) {
    const prev = months.length > 1 ? months[months.length - 2] : null;
    const kw = ov.keywords ?? 0;
    const tr = ov.traffic ?? 0;
    const cost = ov.cost ?? 0;
    const pk = prev?.keywords ?? kw;
    const pt = prev?.traffic ?? tr;
    const pc = prev?.cost ?? cost;
    const brand = brandRoot(domain);
    const branded = brand.length > 2 && keywords ? Math.round(keywords.filter((k) => k.keyword.toLowerCase().replace(/\s+/g, "").includes(brand)).reduce((s, k) => s + (k.traffic ?? 0), 0)) : 0;
    const tip = (c: number, p: number): MetricChange => ({ current: compact(c), previous: compact(p), diff: compact(Math.abs(c - p)) });
    const recent = months.slice(-12);
    const trendMonths = months.slice(-12);
    const serpNow = keywords ? linkedCount(keywords) : 0;
    const series = dailySteps(months, to, SERIES_DAYS, (m) => m.traffic);
    Object.assign(o, {
      from: `${to.slice(0, 7)}-01`,
      to,
      date: fullDate(to),
      keywords: kw,
      prevKeywords: pk,
      traffic: tr,
      prevTraffic: pt,
      summary: {
        keywords: { value: compact(kw), delta: deltaPct(kw, pk) },
        traffic: { value: compact(tr), delta: deltaPct(tr, pt) },
        cost: { value: money(cost), delta: deltaPct(cost, pc) },
        branded: { value: compact(branded), delta: deltaPct(branded, branded) },
        nonBranded: { value: compact(tr - branded), delta: deltaPct(tr - branded, pt - branded) },
      },
      tips: {
        keywords: tip(kw, pk),
        traffic: tip(tr, pt),
        cost: { current: money(cost), previous: money(pc), diff: money(Math.abs(cost - pc)) },
        branded: tip(branded, branded),
        nonBranded: tip(tr - branded, pt - branded),
      },
      months: { current: monthYear(to), previous: prev ? monthYear(prev.date) : monthYear(addDays(`${to.slice(0, 7)}-01`, -1)) },
      dist: ov.buckets ? bucketsOf(ov.buckets) : o.dist,
      series,
      trafficSpark: recent.map((m) => m.traffic),
      keywordSpark: recent.map((m) => m.keywords),
      trend: {
        labels: trendMonths.map((m) => monthShort(m.date)),
        titles: trendMonths.map((m) => monthYear(m.date)),
        bars: trendMonths.map((m, i) => monthBars(m, i === trendMonths.length - 1 ? serpNow : 0)),
        traffic: trendMonths.map((m) => m.traffic),
      } satisfies LiveTrend,
      overviewTrend: {
        bars: months.map((m, i) => monthBars(m, i === months.length - 1 ? serpNow : 0)),
        labels: months.map((m, i) => (i % 12 === 0 ? monthShort(m.date) : "")),
        titles: months.map((m) => monthYear(m.date)),
      },
      intents: intentsOf(ov),
    });
  }

  if (keywords) {
    o.rows = [...keywords].sort(byTraffic).map(positionRowOf);
    o.serp = serpOf(keywords);
  }

  const pageRows = sem.pages?.rows;
  if (pageRows) {
    const best = new Map<string, SemKeyword>();
    for (const k of [...(keywords ?? [])].sort(byTraffic)) if (!best.has(k.url)) best.set(k.url, k);
    o.pages = pageRows.map(
      (p): LivePage => ({
        url: showUrl(p.url),
        href: p.url,
        traffic: Math.round(p.traffic ?? 0),
        prevTraffic: null,
        pct: pctText(p.trafficPct),
        keywords: p.keywords ?? 0,
        keyword: best.get(p.url)?.keyword ?? null,
        intent: best.has(p.url) ? intentOf(best.get(p.url)!.intents) : null,
        isNew: false,
        lost: false,
      }),
    );
    o.pageCount = pageRows.length;
    o.prevPageCount = null;
  }

  const subs = sem.subdomains?.rows;
  if (subs) o.subdomains = subs.map((s) => ({ host: hostOf(s.url), traffic: Math.round(s.traffic ?? 0), pct: (s.trafficPct ?? 0).toFixed(2), keywords: s.keywords ?? 0 }));

  const countries = countriesOf(sem);
  if (countries) {
    o.countries = countries;
    o.dbCounts = Object.fromEntries(countries.map((c) => [c.code, c.keywords]));
  }

  if (sem.changes) o.moves = movesOf(sem.changes.rows, months, to, base?.moves?.pages ?? null);

  o.competitors = competitorsOf(sem, domain, { keywords: o.keywords, traffic: o.traffic });

  return o;
}

export const aiOverviewCode = AI_OVERVIEW;
