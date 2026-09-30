import type { SemBacklink, SemBacklinksHistory, SemBacklinksOverview, SemOverview, SemRefDomain } from "@/lib/seo/semrushNormalize";
import type { Tone } from "./ui";

type Ds<T> = { fetchedAt: string; rows: T[] };

export type BacklinksSource = {
  domain: string;
  backlinksOverview?: Ds<SemBacklinksOverview>;
  backlinks?: Ds<SemBacklink>;
  refdomains?: Ds<SemRefDomain>;
  backlinksHistory?: Ds<SemBacklinksHistory>;
  overview?: Ds<SemOverview>;
  overviewAll?: Ds<SemOverview>;
};

export type LTag = { label: string; tone: Tone };
export type Trend = { data: number[]; ticks: string[] };
export type AxisLabel = { at: number; label: string };
export type NewLost = { newV: number[]; lostV: number[]; max: number; ticks: string[] };
export type Weekly = { weeks: string[]; ranges: string[]; rd: NewLost; bl: NewLost };
export type BarRow = { label: string; pct: string; w: number; count: number; color?: string };

export type HeadLive = { today: number; day: string };

export type OverviewLive = {
  summary: { label: string; value: string; delta?: string; w: number; chevron?: boolean }[];
  organicDbs: { name: string; flag: string; v: number }[];
  ascore: number | null;
  ascoreLabel: string;
  asTrend: { values: number[]; months: string[]; labels: AxisLabel[] } | null;
  rd1y: Trend | null;
  bl1y: Trend | null;
  rdAll: Trend | null;
  blAll: Trend | null;
  labels1y: AxisLabel[];
  labelsAll: AxisLabel[];
  weekly: Weekly | null;
  cloud: { text: string; x: number; y: number; size: number; italic?: boolean }[] | null;
  authorityBuckets: BarRow[] | null;
  backlinkTypes: BarRow[] | null;
  linkAttributes: BarRow[] | null;
  tlds: { label: string; pct: string; v: number; color: string }[] | null;
  countries: { flag: string; name: string; pct: string; w: number; v: number }[] | null;
  profile: { domains: number; ips: number; subnets: number } | null;
  topPages: { url: string; v: number }[] | null;
};

export type BlRow = {
  as: number;
  title?: string;
  url: string;
  href: string;
  broken?: boolean;
  tags: string[];
  ext: number;
  int: number;
  anchor: string;
  target: string;
  targetHref: string;
  targetBroken?: boolean;
  ltags: LTag[];
  first: string;
  last: string;
  nofollow: boolean;
  image: boolean;
  sitewide: boolean;
  isNew: boolean;
  lost: boolean;
  code: number | null;
  day: string;
  firstTs: number;
};

export type TableLive = { rows: BlRow[]; total: number; counts: { all: number; best: number; isNew: number; lost: number }; day: string };

export type RdLinkLive = { target: string; lost?: boolean; lostLabel?: string; broken?: boolean; first: string; last: string; lastLost?: boolean; code?: string };
export type RdPageLive = { as: number; url: string; ext: number; int: number; tag?: string; links: RdLinkLive[] };
export type RdRowLive = {
  as: number;
  d: string;
  tags?: LTag[];
  bl: number;
  flag?: string;
  ip: string;
  first: string;
  last: string;
  firstNew?: boolean;
  isNew: boolean;
  lost: boolean;
  nofollow: boolean;
};
export type RefDomainsLive = { rows: RdRowLive[]; total: number; pages: Record<string, RdPageLive[]>; weekly: Weekly | null };

export type AnchorRow = { a: string; empty?: boolean; bl: number; d: number; first: string; last: string };
export type PageRowLive = { title?: string; url: string; bl: number; d: number; ext: number | string; int: number | string; last: string; e404?: boolean };

export type BulkLive = {
  as: number | string;
  bl: number;
  d: number;
  visits: string;
  follow: number;
  nofollow: number;
  fPct: string;
  nPct: string;
  text: number;
  tPct: string;
  image: number;
  iPct: string;
  form: number;
  fmPct: string;
  frame: number;
  frPct: string;
  more: [string, string][];
};

export type BacklinksLive = {
  domain: string;
  head: HeadLive | null;
  overview: OverviewLive | null;
  table: TableLive | null;
  refdomains: RefDomainsLive | null;
  anchors: AnchorRow[] | null;
  pages: PageRowLive[] | null;
  bulk: BulkLive | null;
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY = 864e5;

export function toMs(s: string | null | undefined): number {
  if (!s) return NaN;
  let v = s.trim().replace(" ", "T");
  if (/[+-]\d\d$/.test(v)) v += ":00";
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) v += "T00:00:00Z";
  return Date.parse(v);
}

export const fmtDate = (t: number) => {
  const d = new Date(t);
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
};

export function rel(iso: string | null, now: number): string {
  const t = toMs(iso);
  if (!Number.isFinite(t)) return "n/a";
  const h = Math.floor((now - t) / 36e5);
  if (h < 24) return `${Math.max(1, h)}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return "Yesterday";
  if (d < 14) return `${d}d ago`;
  return fmtDate(t);
}

export const pct = (n: number, total: number) => {
  if (!total || !n) return "0%";
  const p = (n / total) * 100;
  return p < 1 ? "<1%" : `${Math.round(p)}%`;
};

const barW = (n: number, total: number) => {
  if (!total || !n) return 0;
  const p = (n / total) * 100;
  return p < 1 ? 0.5 : Math.round(p);
};

export const stripProto = (u: string) => u.replace(/^https?:\/\//, "");

export function hostOf(u: string) {
  try {
    return new URL(u.startsWith("http") ? u : `https://${u}`).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return stripProto(u).split("/")[0].toLowerCase().replace(/^www\./, "");
  }
}

export function rootOf(host: string, roots: Set<string>) {
  const parts = host.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    const c = parts.slice(i).join(".");
    if (roots.has(c)) return c;
  }
  return parts.slice(-2).join(".");
}

const fmtNum = (n: number) => n.toLocaleString("en-US");

const delta = (cur: number | null | undefined, prev: number | null | undefined) => {
  if (!cur || !prev) return undefined;
  const d = Math.round(((cur - prev) / prev) * 100);
  if (!d) return undefined;
  return `${d > 0 ? "+" : ""}${d}%`;
};

export function linearTicks(values: number[]): string[] {
  const lo = Math.floor(Math.min(...values));
  const step = Math.max(1, Math.ceil((Math.max(...values) - lo) / 4));
  return [4, 3, 2, 1, 0].map((k) => `${lo + k * step}`);
}

export function zeroTicks(values: number[]): string[] {
  const q = Math.max(1, Math.max(...values) / 4);
  const mag = 10 ** Math.floor(Math.log10(q));
  const step = Math.ceil(q / mag) * mag;
  return [4, 3, 2, 1, 0].map((k) => `${k * step}`);
}

const monthLabel = (date: string) => {
  const [y, m] = date.split("-").map(Number);
  return `${months[m - 1]} ${y}`;
};

function axisLabels(dates: string[], ats: number[], fmt: (d: string) => string): AxisLabel[] {
  const out: AxisLabel[] = [];
  for (const at of ats) {
    const label = fmt(dates[Math.round(at * (dates.length - 1))]);
    if (!out.some((o) => o.label === label)) out.push({ at, label });
  }
  return out;
}

const weekStartOf = (t: number) => {
  const d = new Date(t);
  const day = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  return day - ((new Date(day).getUTCDay() + 6) % 7) * DAY;
};

export function weekGrid(now: number, n = 27) {
  const last = weekStartOf(now);
  const starts = Array.from({ length: n }, (_, i) => last - (n - 1 - i) * 7 * DAY);
  const weeks = starts.map((s) => {
    const d = new Date(s);
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
  });
  const ranges = starts.map((s) => {
    const a = new Date(s);
    const b = new Date(s + 6 * DAY);
    const end = a.getUTCMonth() === b.getUTCMonth() ? `${b.getUTCDate()}` : `${months[b.getUTCMonth()]} ${b.getUTCDate()}`;
    return `${months[a.getUTCMonth()]} ${a.getUTCDate()} - ${end}, ${b.getUTCFullYear()}`;
  });
  const index = (t: number) => {
    if (!Number.isFinite(t)) return -1;
    const i = Math.floor((t - starts[0]) / (7 * DAY));
    return i >= 0 && i < n ? i : -1;
  };
  return { starts, weeks, ranges, index };
}

export function newLostScale(newV: number[], lostV: number[]): NewLost {
  const top = Math.max(3, ...newV, ...lostV.map((v) => v * 3));
  const max = Math.ceil(top / 3) * 3;
  const ticks = [max, (2 * max) / 3, max / 3, 0, -max / 3].map((v) => `${Math.round(v)}`);
  return { newV, lostV, max, ticks };
}

const countryNames: Record<string, string> = {
  sg: "Singapore",
  us: "United States of America",
  md: "Moldova",
  se: "Sweden",
  dk: "Denmark",
  no: "Norway",
  nl: "Netherlands",
  fi: "Finland",
  gb: "United Kingdom",
  uk: "United Kingdom",
  in: "India",
  de: "Germany",
  fr: "France",
  es: "Spain",
  ae: "United Arab Emirates",
  af: "Afghanistan",
  au: "Australia",
  ca: "Canada",
  zm: "Zambia",
  et: "Ethiopia",
  ee: "Estonia",
  gy: "Guyana",
  za: "South Africa",
  qa: "Qatar",
  vn: "Vietnam",
  ph: "Philippines",
  th: "Thailand",
  ru: "Russia",
  pl: "Poland",
  it: "Italy",
  ch: "Switzerland",
  at: "Austria",
  be: "Belgium",
  br: "Brazil",
  jp: "Japan",
  pt: "Portugal",
  tr: "Turkey",
  ie: "Ireland",
  lt: "Lithuania",
  lv: "Latvia",
  hk: "Hong Kong",
  cn: "China",
  ua: "Ukraine",
};

const shortCountry: Record<string, string> = { us: "United States", ae: "UAE", gb: "United Kingdom", uk: "United Kingdom" };

const flagOf = (code: string) => (code === "uk" ? "GB" : code.toUpperCase());
export const countryName = (code: string) => countryNames[code] ?? code.toUpperCase();
const countryShort = (code: string) => shortCountry[code] ?? countryName(code);

const cloudSlots = [
  { x: 161, y: 236, size: 34, cap: 12 },
  { x: 75, y: 197, size: 18, cap: 33 },
  { x: 244, y: 168, size: 14, cap: 33 },
  { x: 285, y: 264, size: 14, cap: 26 },
  { x: 20, y: 138, size: 12, cap: 31 },
  { x: 303, y: 288, size: 12, cap: 32 },
  { x: 301, y: 226, size: 12, cap: 29 },
  { x: 354, y: 149, size: 12, cap: 24 },
  { x: 93, y: 159, size: 12, cap: 20 },
  { x: 231, y: 144, size: 12, cap: 13 },
];

export function midTrim(s: string, limit: number) {
  if (s.length <= limit) return s;
  const k = Math.max(1, Math.floor((limit - 3) / 2));
  return `${s.slice(0, k)}...${s.slice(-k)}`;
}

const normAnchor = (a: string) => a.trim().replace(/\s+/g, " ").toLowerCase();

export function buildAnchors(backlinks: SemBacklink[], now: number): AnchorRow[] {
  const m = new Map<string, { bl: number; hosts: Set<string>; first: number; last: number }>();
  for (const b of backlinks) {
    const k = normAnchor(b.anchor);
    const e = m.get(k) ?? { bl: 0, hosts: new Set<string>(), first: Infinity, last: -Infinity };
    e.bl++;
    e.hosts.add(hostOf(b.sourceUrl));
    const f = toMs(b.firstSeen);
    const l = toMs(b.lastSeen);
    if (f < e.first) e.first = f;
    if (l > e.last) e.last = l;
    m.set(k, e);
  }
  return [...m.entries()]
    .map(([k, e]) => ({
      a: k || "Empty Anchor",
      empty: k ? undefined : true,
      bl: e.bl,
      d: e.hosts.size,
      first: Number.isFinite(e.first) ? rel(new Date(e.first).toISOString(), now) : "n/a",
      last: Number.isFinite(e.last) ? rel(new Date(e.last).toISOString(), now) : "n/a",
    }))
    .sort((a, b) => b.bl - a.bl || b.d - a.d || a.a.localeCompare(b.a));
}

export function buildCloud(anchors: AnchorRow[]) {
  const top = anchors.slice(0, cloudSlots.length);
  const head = top.slice(0, 4);
  const rest = [...top.slice(4)].sort((a, b) => b.a.length - a.a.length);
  return [...head, ...rest].map((a, i) => {
    const s = cloudSlots[i];
    return { text: a.empty ? "Empty Anchor" : midTrim(a.a, s.cap), x: s.x, y: s.y, size: s.size, italic: a.empty };
  });
}

export function buildPages(backlinks: SemBacklink[], now: number): PageRowLive[] {
  const m = new Map<string, { bl: number; hosts: Set<string>; last: number }>();
  for (const b of backlinks) {
    const e = m.get(b.targetUrl) ?? { bl: 0, hosts: new Set<string>(), last: -Infinity };
    e.bl++;
    e.hosts.add(hostOf(b.sourceUrl));
    const l = toMs(b.lastSeen);
    if (l > e.last) e.last = l;
    m.set(b.targetUrl, e);
  }
  return [...m.entries()]
    .map(([url, e]) => ({ url, bl: e.bl, d: e.hosts.size, ext: "n/a", int: "n/a", last: Number.isFinite(e.last) ? rel(new Date(e.last).toISOString(), now) : "n/a" }))
    .sort((a, b) => b.d - a.d || b.bl - a.bl || a.url.localeCompare(b.url));
}

function linkTags(b: SemBacklink): LTag[] {
  const t: LTag[] = [{ label: b.image ? "Image" : "Text", tone: "gray" }];
  if (b.sitewide) t.push({ label: "Sitewide", tone: "gray" });
  if (b.nofollow) t.push({ label: "Nofollow", tone: "orange" });
  if (b.newLink) t.push({ label: "New", tone: "green" });
  if (b.lostLink) t.push({ label: b.responseCode === 404 ? "Lost: Page not found" : b.responseCode && b.responseCode >= 300 && b.responseCode < 400 ? "Lost: Page redirect" : "Lost", tone: "red" });
  return t;
}

export function buildTable(src: BacklinksSource, now: number): TableLive | null {
  const rows = src.backlinks?.rows;
  if (!rows?.length) return null;
  const out: BlRow[] = rows
    .map((b) => {
      const f = toMs(b.firstSeen);
      return {
        as: b.pageAscore ?? 0,
        title: b.sourceTitle || undefined,
        url: stripProto(b.sourceUrl),
        href: b.sourceUrl,
        broken: b.responseCode !== null && b.responseCode >= 400 ? true : undefined,
        tags: [],
        ext: b.externalLinks ?? 0,
        int: b.internalLinks ?? 0,
        anchor: b.anchor,
        target: stripProto(b.targetUrl),
        targetHref: b.targetUrl,
        ltags: linkTags(b),
        first: rel(b.firstSeen, now),
        last: rel(b.lastSeen, now),
        nofollow: b.nofollow,
        image: b.image,
        sitewide: b.sitewide,
        isNew: b.newLink,
        lost: b.lostLink,
        code: b.responseCode,
        day: Number.isFinite(f) ? new Date(f).toISOString().slice(0, 10) : "",
        firstTs: Number.isFinite(f) ? f : 0,
      };
    })
    .sort((a, b) => b.as - a.as || b.firstTs - a.firstTs);
  const ov = src.backlinksOverview?.rows[0];
  return {
    rows: out,
    total: ov?.total ?? out.length,
    counts: { all: ov?.total ?? out.length, best: out.filter((r) => !r.nofollow && !r.lost).length, isNew: out.filter((r) => r.isNew).length, lost: out.filter((r) => r.lost).length },
    day: new Date(now).toISOString().slice(0, 10),
  };
}

function domainLinks(src: BacklinksSource) {
  const roots = new Set((src.refdomains?.rows ?? []).map((r) => r.domain.toLowerCase()));
  const by = new Map<string, SemBacklink[]>();
  for (const b of src.backlinks?.rows ?? []) {
    const r = rootOf(hostOf(b.sourceUrl), roots);
    const list = by.get(r) ?? [];
    list.push(b);
    by.set(r, list);
  }
  return by;
}

function pagesOf(links: SemBacklink[], now: number): RdPageLive[] {
  const m = new Map<string, SemBacklink[]>();
  for (const b of links) m.set(b.sourceUrl, [...(m.get(b.sourceUrl) ?? []), b]);
  return [...m.values()]
    .map((ls) => {
      const b = ls[0];
      const redirect = b.responseCode !== null && b.responseCode >= 300 && b.responseCode < 400;
      return {
        as: b.pageAscore ?? 0,
        url: stripProto(b.sourceUrl),
        ext: b.externalLinks ?? 0,
        int: b.internalLinks ?? 0,
        tag: redirect ? "Redirect" : undefined,
        links: ls.map((l) => ({
          code: redirect ? String(l.responseCode) : undefined,
          target: stripProto(l.targetUrl),
          lost: l.lostLink || undefined,
          lostLabel: l.lostLink ? (l.responseCode === 404 ? "Lost: Page not found" : l.responseCode !== null && l.responseCode >= 300 && l.responseCode < 400 ? "Lost: Page redirect" : "Lost") : undefined,
          broken: (l.responseCode !== null && l.responseCode >= 400) || undefined,
          first: rel(l.firstSeen, now),
          last: rel(l.lastSeen, now),
          lastLost: l.lostLink || undefined,
        })),
      };
    })
    .sort((a, b) => b.as - a.as);
}

const lostLabel = (links: SemBacklink[]) => links.length > 0 && links.every((l) => l.lostLink);

export function buildRefDomains(src: BacklinksSource, now: number, weekly: Weekly | null): RefDomainsLive | null {
  const rows = src.refdomains?.rows;
  if (!rows?.length) return null;
  const by = domainLinks(src);
  const pages: Record<string, RdPageLive[]> = {};
  const out = rows
    .map((r) => {
      const d = r.domain.toLowerCase();
      const links = by.get(d) ?? [];
      if (links.length) pages[d] = pagesOf(links, now);
      const first = toMs(r.firstSeen);
      const isNew = Number.isFinite(first) && now - first <= 30 * DAY;
      const lost = lostLabel(links);
      const nofollow = links.length > 0 && links.every((l) => l.nofollow);
      const tags: LTag[] = [];
      if (isNew) tags.push({ label: "New", tone: "green" });
      if (lost) tags.push({ label: "Lost", tone: "red" });
      if (nofollow) tags.push({ label: "Nofollow", tone: "orange" });
      return {
        as: r.ascore ?? 0,
        d,
        tags: tags.length ? tags : undefined,
        bl: r.backlinks ?? links.length,
        flag: r.country ? flagOf(r.country) : undefined,
        ip: r.country ? countryShort(r.country) : "n/a",
        first: rel(r.firstSeen, now),
        last: rel(r.lastSeen, now),
        firstNew: isNew || undefined,
        isNew,
        lost,
        nofollow,
      };
    })
    .sort((a, b) => b.bl - a.bl || b.as - a.as || a.d.localeCompare(b.d));
  return { rows: out, total: src.backlinksOverview?.rows[0]?.domains ?? out.length, pages, weekly };
}

export function buildWeekly(src: BacklinksSource, now: number): Weekly | null {
  const bls = src.backlinks?.rows ?? [];
  const rds = src.refdomains?.rows ?? [];
  if (!bls.length && !rds.length) return null;
  const g = weekGrid(now);
  const n = g.starts.length;
  const bNew = Array(n).fill(0);
  const bLost = Array(n).fill(0);
  for (const b of bls) {
    const i = g.index(toMs(b.firstSeen));
    if (i >= 0) bNew[i]++;
    if (b.lostLink) {
      const j = g.index(toMs(b.lastSeen));
      if (j >= 0) bLost[j]++;
    }
  }
  const rNew = Array(n).fill(0);
  const rLost = Array(n).fill(0);
  for (const r of rds) {
    const i = g.index(toMs(r.firstSeen));
    if (i >= 0) rNew[i]++;
  }
  for (const links of domainLinks(src).values()) {
    if (!lostLabel(links)) continue;
    const j = g.index(Math.max(...links.map((l) => toMs(l.lastSeen))));
    if (j >= 0) rLost[j]++;
  }
  return { weeks: g.weeks, ranges: g.ranges, rd: newLostScale(rNew, rLost), bl: newLostScale(bNew, bLost) };
}

const ascoreLabel = (a: number) => (a < 40 ? "Low authority" : a < 70 ? "Medium authority" : "High authority");

const asBucketDefs = [
  { label: "91 - 100", lo: 91, hi: 100, color: "#3ed4a4" },
  { label: "81 - 90", lo: 81, hi: 90 },
  { label: "71 - 80", lo: 71, hi: 80 },
  { label: "61 - 70", lo: 61, hi: 70 },
  { label: "51 - 60", lo: 51, hi: 60 },
  { label: "41 - 50", lo: 41, hi: 50 },
  { label: "31 - 40", lo: 31, hi: 40 },
  { label: "21 - 30", lo: 21, hi: 30 },
  { label: "11 - 20", lo: 11, hi: 20, color: "#c3c5f5" },
  { label: "0 - 10", lo: 0, hi: 10, color: "#c3c5f5" },
];

const tldColors = ["#6167e6", "#3ed4a4", "#ffb200"];

export function buildOverview(src: BacklinksSource, now: number, weekly: Weekly | null, anchors: AnchorRow[] | null): OverviewLive | null {
  const ov = src.backlinksOverview?.rows[0];
  const hist = [...(src.backlinksHistory?.rows ?? [])].filter((h) => h.date).sort((a, b) => (a.date! < b.date! ? -1 : 1));
  const rds = src.refdomains?.rows ?? [];
  const bls = src.backlinks?.rows ?? [];
  if (!ov && !hist.length && !rds.length && !bls.length) return null;
  const last = hist[hist.length - 1];
  const prev = hist[hist.length - 2];
  const organic = src.overview?.rows[0]?.traffic;
  const summary = [
    { label: "Referring Domains", value: ov?.domains != null ? fmtNum(ov.domains) : "n/a", delta: delta(last?.domains, prev?.domains), w: 158 },
    { label: "Backlinks", value: ov?.total != null ? fmtNum(ov.total) : "n/a", delta: delta(last?.backlinks, prev?.backlinks), w: 116 },
    { label: "Monthly Visits", value: "n/a", w: 145 },
    { label: "Organic Traffic", value: organic != null ? fmtNum(organic) : "n/a", chevron: true, w: 150 },
    { label: "Outbound Domains", value: "n/a", w: 180 },
  ];
  const organicDbs = (src.overviewAll?.rows ?? [])
    .filter((r) => !r.database.includes("-"))
    .map((r) => ({ name: countryName(r.database), flag: flagOf(r.database), v: r.traffic ?? 0 }))
    .sort((a, b) => b.v - a.v || a.flag.localeCompare(b.flag));
  const y1 = hist.slice(-12);
  const as11 = hist.slice(-11).filter((h) => h.ascore != null);
  const asTrend = as11.length
    ? { values: as11.map((h) => h.ascore!), months: as11.map((h) => monthLabel(h.date!)), labels: [0, 4, 8].filter((i) => i < as11.length).map((i) => ({ at: 0.02 + 0.0888 * i, label: monthLabel(as11[i].date!) })) }
    : null;
  const series = (list: SemBacklinksHistory[], k: "domains" | "backlinks") => list.map((h) => h[k] ?? 0);
  const trend = (data: number[], zero: boolean): Trend | null => (data.length > 1 ? { data, ticks: zero ? zeroTicks(data) : linearTicks(data) } : null);
  const aTotal = rds.length;
  const authorityBuckets = aTotal
    ? asBucketDefs.map((b) => {
        const count = rds.filter((r) => (r.ascore ?? 0) >= b.lo && (r.ascore ?? 0) <= b.hi).length;
        return { label: b.label, pct: pct(count, aTotal), w: barW(count, aTotal), count, color: b.color };
      })
    : null;
  const typesTotal = ov ? (ov.texts ?? 0) + (ov.images ?? 0) + (ov.forms ?? 0) + (ov.frames ?? 0) : 0;
  const backlinkTypes = ov
    ? [
        ["Text", ov.texts ?? 0],
        ["Image", ov.images ?? 0],
        ["Form", ov.forms ?? 0],
        ["Frame", ov.frames ?? 0],
      ].map(([label, count]) => ({ label: label as string, pct: pct(count as number, typesTotal), w: barW(count as number, typesTotal), count: count as number }))
    : null;
  const attrTotal = ov ? (ov.follows ?? 0) + (ov.nofollows ?? 0) + (ov.sponsored ?? 0) + (ov.ugc ?? 0) : 0;
  const linkAttributes = ov
    ? (
        [
          ["Follow", ov.follows ?? 0, "#3ed4a4"],
          ["Nofollow", ov.nofollows ?? 0, undefined],
          ["Sponsored", ov.sponsored ?? 0, undefined],
          ["UGC", ov.ugc ?? 0, undefined],
        ] as [string, number, string | undefined][]
      ).map(([label, count, color]) => ({ label, pct: pct(count, attrTotal), w: barW(count, attrTotal), count, color }))
    : null;
  let tlds: OverviewLive["tlds"] = null;
  if (aTotal) {
    const c = new Map<string, number>();
    for (const r of rds) {
      const t = `.${r.domain.toLowerCase().split(".").pop()}`;
      c.set(t, (c.get(t) ?? 0) + 1);
    }
    const top = [...c.entries()].filter(([t]) => t !== ".gov" && t !== ".edu").sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3);
    const gov = c.get(".gov") ?? 0;
    const edu = c.get(".edu") ?? 0;
    const other = aTotal - top.reduce((a, t) => a + t[1], 0) - gov - edu;
    tlds = [
      ...top.map(([label, v], i) => ({ label, pct: pct(v, aTotal), v, color: tldColors[i] })),
      { label: ".gov", pct: pct(gov, aTotal), v: gov, color: "#d6d8d7" },
      { label: ".edu", pct: pct(edu, aTotal), v: edu, color: "#d6d8d7" },
      { label: "other", pct: pct(other, aTotal), v: other, color: "#d6d8d7" },
    ];
  }
  let countries: OverviewLive["countries"] = null;
  if (aTotal) {
    const c = new Map<string, number>();
    for (const r of rds) if (r.country) c.set(r.country.toLowerCase(), (c.get(r.country.toLowerCase()) ?? 0) + 1);
    countries = [...c.entries()]
      .sort((a, b) => b[1] - a[1] || countryName(a[0]).localeCompare(countryName(b[0])))
      .slice(0, 6)
      .map(([code, v]) => ({ flag: flagOf(code), name: countryName(code), pct: pct(v, aTotal), w: barW(v, aTotal), v }));
  }
  let topPages: OverviewLive["topPages"] = null;
  if (bls.length) {
    const m = new Map<string, Set<string>>();
    for (const b of bls) m.set(b.targetUrl, (m.get(b.targetUrl) ?? new Set()).add(hostOf(b.sourceUrl)));
    topPages = [...m.entries()]
      .map(([url, s]) => ({ url, v: s.size }))
      .sort((a, b) => b.v - a.v || a.url.localeCompare(b.url))
      .slice(0, 5);
  }
  return {
    summary,
    organicDbs,
    ascore: ov?.ascore ?? null,
    ascoreLabel: ascoreLabel(ov?.ascore ?? 0),
    asTrend,
    rd1y: trend(series(y1, "domains"), false),
    bl1y: trend(series(y1, "backlinks"), false),
    rdAll: trend(series(hist, "domains"), true),
    blAll: trend(series(hist, "backlinks"), true),
    labels1y: y1.length ? axisLabels(y1.map((h) => h.date!), [0, 0.246, 0.487, 0.731, 0.975], monthLabel) : [],
    labelsAll: hist.length ? axisLabels(hist.map((h) => h.date!), [0, 0.2, 0.4, 0.6, 0.8, 0.975], (d) => d.slice(0, 4)) : [],
    weekly,
    cloud: anchors?.length ? buildCloud(anchors) : null,
    authorityBuckets,
    backlinkTypes,
    linkAttributes,
    tlds,
    countries,
    profile: ov ? { domains: ov.domains ?? 0, ips: ov.ips ?? 0, subnets: ov.ipsClassC ?? 0 } : null,
    topPages,
  };
}

export function buildBulk(src: BacklinksSource): BulkLive | null {
  const ov = src.backlinksOverview?.rows[0];
  if (!ov) return null;
  const follow = ov.follows ?? 0;
  const nofollow = ov.nofollows ?? 0;
  const fTotal = follow + nofollow + (ov.sponsored ?? 0) + (ov.ugc ?? 0);
  const text = ov.texts ?? 0;
  const image = ov.images ?? 0;
  const form = ov.forms ?? 0;
  const frame = ov.frames ?? 0;
  const tTotal = text + image + form + frame;
  const organic = src.overview?.rows[0]?.traffic;
  return {
    as: ov.ascore ?? "n/a",
    bl: ov.total ?? 0,
    d: ov.domains ?? 0,
    visits: "n/a",
    follow,
    nofollow,
    fPct: pct(follow, fTotal),
    nPct: pct(nofollow, fTotal),
    text,
    tPct: pct(text, tTotal),
    image,
    iPct: pct(image, tTotal),
    form,
    fmPct: pct(form, tTotal),
    frame,
    frPct: pct(frame, tTotal),
    more: [
      ["Ref. IPs", ov.ips != null ? fmtNum(ov.ips) : "n/a"],
      ["Ref. Subnets", ov.ipsClassC != null ? fmtNum(ov.ipsClassC) : "n/a"],
      ["Outbound Domains", "n/a"],
      ["Organic Traffic", organic != null ? fmtNum(organic) : "n/a"],
    ],
  };
}

export function buildBacklinksLive(src: BacklinksSource): BacklinksLive | null {
  const has = src.backlinksOverview?.rows.length || src.backlinks?.rows.length || src.refdomains?.rows.length || src.backlinksHistory?.rows.length;
  if (!has) return null;
  const now = toMs(src.backlinks?.fetchedAt ?? src.backlinksOverview?.fetchedAt ?? src.refdomains?.fetchedAt ?? src.backlinksHistory?.fetchedAt);
  const at = Number.isFinite(now) ? now : Date.now();
  const bls = src.backlinks?.rows ?? [];
  const weekly = buildWeekly(src, at);
  const anchors = bls.length ? buildAnchors(bls, at) : null;
  const dayOf = new Date(at).toISOString().slice(0, 10);
  return {
    domain: src.domain,
    head: bls.length ? { today: bls.filter((b) => (b.firstSeen ?? "").slice(0, 10) === dayOf).length, day: dayOf } : null,
    overview: buildOverview(src, at, weekly, anchors),
    table: buildTable(src, at),
    refdomains: buildRefDomains(src, at, weekly),
    anchors,
    pages: bls.length ? buildPages(bls, at) : null,
    bulk: buildBulk(src),
  };
}

export type BlFilters = { tile: string; q: string; status: string; attr: string; picks: Record<string, string>; day: string | null };

export function filterBacklinks(rows: BlRow[], f: BlFilters) {
  const q = f.q.trim().toLowerCase();
  return rows.filter((r) => {
    if (f.tile === "best" && (r.nofollow || r.lost)) return false;
    if (f.tile === "new" && !r.isNew) return false;
    if (f.tile === "lost" && !r.lost) return false;
    if (q && !`${r.title ?? ""} ${r.url}`.toLowerCase().includes(q)) return false;
    if (f.status === "Active" && r.lost) return false;
    if (f.status === "New" && !r.isNew) return false;
    if (f.status === "Lost" && !r.lost) return false;
    if (f.attr === "Follow" && r.nofollow) return false;
    if (f.attr === "Nofollow" && !r.nofollow) return false;
    if (f.attr === "Sponsored" || f.attr === "UGC") return false;
    if (f.day && r.day !== f.day) return false;
    const lt = f.picks["Link type"];
    if (lt === "Text" && r.image) return false;
    if (lt === "Image" && !r.image) return false;
    const lp = f.picks["Link placement"];
    if (lp === "Sitewide" && !r.sitewide) return false;
    const li = f.picks["Lost issues"];
    if (li === "Page not found" && !(r.lost && r.code === 404)) return false;
    if (li === "Redirected" && !(r.lost && r.code !== null && r.code >= 300 && r.code < 400)) return false;
    return true;
  });
}

export function filterRefDomains(rows: RdRowLive[], f: { q: string; status: string; attr: string }) {
  const s = f.q.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (!s || r.d.includes(s)) &&
      (f.status === "All" || (f.status === "Active" && !r.lost) || (f.status === "New" && r.isNew) || (f.status === "Lost" && r.lost)) &&
      (f.attr === "All" || (f.attr === "Follow" && !r.nofollow) || (f.attr === "Nofollow" && r.nofollow)),
  );
}

export type BacklinksView = "overview" | "backlinks" | "refdomains" | "anchors" | "pages" | "bulk" | "header";

export function forView(l: BacklinksLive, view: BacklinksView): BacklinksLive {
  const base: BacklinksLive = { domain: l.domain, head: l.head, overview: null, table: null, refdomains: null, anchors: null, pages: null, bulk: null };
  if (view === "overview") return { ...base, overview: l.overview };
  if (view === "backlinks") return { ...base, table: l.table };
  if (view === "refdomains") return { ...base, refdomains: l.refdomains };
  if (view === "anchors") return { ...base, anchors: l.anchors };
  if (view === "pages") return { ...base, pages: l.pages };
  if (view === "bulk") return { ...base, bulk: l.bulk };
  return base;
}
