export type Raw = Record<string, string | undefined>;

const num = (v: string | undefined) => {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(String(v).replace(",", "."));
  return Number.isFinite(n) ? n : null;
};
const int = (v: string | undefined) => {
  const n = num(v);
  return n === null ? null : Math.round(n);
};
const bool = (v: string | undefined) => v === "true" || v === "1";
const list = (v: string | undefined) =>
  (v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number)
    .filter((n) => Number.isFinite(n));
const unix = (v: string | undefined) => {
  const n = num(v);
  return n ? new Date(n * 1000).toISOString() : null;
};
const ymd = (v: string | undefined) => (v && /^\d{8}$/.test(v) ? `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}` : (unix(v)?.slice(0, 10) ?? null));
const pick = (r: Raw, ...keys: string[]) => {
  for (const k of keys) if (r[k] !== undefined) return r[k];
  return undefined;
};

const bucketKeys = ["X0", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "X8", "X9", "XA"] as const;
const buckets = (r: Raw) => (bucketKeys.some((k) => r[k] !== undefined) ? bucketKeys.map((k) => int(r[k]) ?? 0) : null);

export type SemOverview = { database: string; rank: number | null; keywords: number | null; traffic: number | null; cost: number | null; adKeywords: number | null; adTraffic: number | null; adCost: number | null; buckets: number[] | null; intents: Record<string, { positions: number | null; traffic: number | null }> | null; serpFeatures: Record<string, number | null> | null };

export function overview(r: Raw, database: string): SemOverview {
  const intentNames = ["Commercial", "Informational", "Navigational", "Transactional", "Unknown"];
  const hasIntent = r["Intent Commercial Positions"] !== undefined;
  const serpNames = ["AI overview", "People also ask", "Local pack", "Sitelinks", "Image pack", "Video", "Featured snippet"];
  return {
    database: r.Database ?? database,
    rank: int(r.Rank),
    keywords: int(r["Organic Keywords"]),
    traffic: int(r["Organic Traffic"]),
    cost: num(r["Organic Cost"]),
    adKeywords: int(r["Adwords Keywords"]),
    adTraffic: int(r["Adwords Traffic"]),
    adCost: num(r["Adwords Cost"]),
    buckets: buckets(r),
    intents: hasIntent ? Object.fromEntries(intentNames.map((n) => [n.toLowerCase(), { positions: int(r[`Intent ${n} Positions`]), traffic: int(r[`Intent ${n} Traffic`]) }])) : null,
    serpFeatures: serpNames.some((n) => r[n] !== undefined) ? Object.fromEntries(serpNames.map((n) => [n, int(r[n])])) : null,
  };
}

export type SemHistory = { date: string | null; rank: number | null; keywords: number | null; traffic: number | null; cost: number | null; adKeywords: number | null; adTraffic: number | null; buckets: number[] | null };
export const history = (r: Raw): SemHistory => ({
  date: ymd(r.Date),
  rank: int(r.Rank),
  keywords: int(r["Organic Keywords"]),
  traffic: int(r["Organic Traffic"]),
  cost: num(r["Organic Cost"]),
  adKeywords: int(r["Adwords Keywords"]),
  adTraffic: int(r["Adwords Traffic"]),
  buckets: buckets(r),
});

export type SemKeyword = { keyword: string; position: number | null; previousPosition: number | null; volume: number | null; kd: number | null; cpc: number | null; url: string; traffic: number | null; trafficPct: number | null; trafficCostPct: number | null; competition: number | null; results: number | null; trends: number[]; intents: number[]; serpByPosition: number[]; serpByKeyword: number[]; positionType: string | null; updated: string | null };
export const keyword = (r: Raw): SemKeyword => ({
  keyword: r.Keyword ?? "",
  position: int(r.Position),
  previousPosition: int(r["Previous Position"]),
  volume: int(r["Search Volume"]),
  kd: num(pick(r, "Keyword Difficulty", "Keyword Difficulty Index")),
  cpc: num(r.CPC),
  url: r.Url ?? "",
  traffic: num(r.Traffic),
  trafficPct: num(r["Traffic (%)"]),
  trafficCostPct: num(r["Traffic Cost (%)"]),
  competition: num(r.Competition),
  results: int(r["Number of Results"]),
  trends: list(r.Trends),
  intents: list(pick(r, "Intents", "Intent")),
  serpByPosition: list(r["SERP Features by Position"]),
  serpByKeyword: list(r["SERP Features by Keyword"]),
  positionType: r["Position type"] ?? null,
  updated: unix(r.Timestamp),
});

export type SemKeywordMetrics = { keyword: string; volume: number | null; cpc: number | null; competition: number | null; results: number | null; trends: number[]; intents: number[]; kd: number | null };
export const keywordMetrics = (r: Raw): SemKeywordMetrics => ({
  keyword: r.Keyword ?? "",
  volume: int(r["Search Volume"]),
  cpc: num(r.CPC),
  competition: num(r.Competition),
  results: int(r["Number of Results"]),
  trends: list(r.Trends),
  intents: list(pick(r, "Intent", "Intents")),
  kd: num(pick(r, "Keyword Difficulty Index", "Keyword Difficulty")),
});

export type SemPage = { url: string; keywords: number | null; traffic: number | null; trafficPct: number | null };
export const page = (r: Raw): SemPage => ({ url: r.Url ?? "", keywords: int(r["Number of Keywords"]), traffic: num(r.Traffic), trafficPct: num(r["Traffic (%)"]) });

export type SemCompetitor = { domain: string; relevance: number | null; common: number | null; keywords: number | null; traffic: number | null; cost: number | null; adKeywords: number | null };
export const competitor = (r: Raw): SemCompetitor => ({
  domain: r.Domain ?? "",
  relevance: num(r["Competitor Relevance"]),
  common: int(r["Common Keywords"]),
  keywords: int(r["Organic Keywords"]),
  traffic: int(r["Organic Traffic"]),
  cost: num(r["Organic Cost"]),
  adKeywords: int(r["Adwords Keywords"]),
});

const gapMeta = new Set(["Keyword", "Domain5 Pos", "Number of Results", "CPC", "Search Volume", "Keyword Difficulty", "Competition", "Trends"]);
export type SemGap = { keyword: string; positions: Record<string, number | null>; volume: number | null; kd: number | null; cpc: number | null; competition: number | null };
export const gap = (r: Raw): SemGap => ({
  keyword: r.Keyword ?? "",
  positions: Object.fromEntries(Object.keys(r).filter((k) => !gapMeta.has(k)).map((k) => [k, int(r[k]) || null])),
  volume: int(r["Search Volume"]),
  kd: num(r["Keyword Difficulty"]),
  cpc: num(r.CPC),
  competition: num(r.Competition),
});

export type SemBacklinksOverview = { ascore: number | null; total: number | null; domains: number | null; urls: number | null; ips: number | null; ipsClassC: number | null; follows: number | null; nofollows: number | null; sponsored: number | null; ugc: number | null; texts: number | null; images: number | null; forms: number | null; frames: number | null };
export const backlinksOverview = (r: Raw): SemBacklinksOverview => ({
  ascore: int(pick(r, "ascore", "authority_score")),
  total: int(r.total),
  domains: int(r.domains_num),
  urls: int(r.urls_num),
  ips: int(r.ips_num),
  ipsClassC: int(r.ipclassc_num),
  follows: int(r.follows_num),
  nofollows: int(r.nofollows_num),
  sponsored: int(r.sponsored_num),
  ugc: int(r.ugc_num),
  texts: int(r.texts_num),
  images: int(r.images_num),
  forms: int(r.forms_num),
  frames: int(r.frames_num),
});

export type SemBacklink = { sourceUrl: string; sourceTitle: string; targetUrl: string; anchor: string; pageAscore: number | null; nofollow: boolean; image: boolean; sitewide: boolean; newLink: boolean; lostLink: boolean; firstSeen: string | null; lastSeen: string | null; responseCode: number | null; externalLinks: number | null; internalLinks: number | null };
export const backlink = (r: Raw): SemBacklink => ({
  sourceUrl: r.source_url ?? "",
  sourceTitle: r.source_title ?? "",
  targetUrl: r.target_url ?? "",
  anchor: r.anchor ?? "",
  pageAscore: int(pick(r, "page_ascore", "page_authority_score")),
  nofollow: bool(r.nofollow),
  image: bool(r.image),
  sitewide: bool(r.sitewide),
  newLink: bool(r.newlink),
  lostLink: bool(r.lostlink),
  firstSeen: unix(r.first_seen),
  lastSeen: unix(r.last_seen),
  responseCode: int(r.response_code),
  externalLinks: int(r.external_num),
  internalLinks: int(r.internal_num),
});

export type SemRefDomain = { domain: string; ascore: number | null; backlinks: number | null; country: string | null; firstSeen: string | null; lastSeen: string | null };
export const refDomain = (r: Raw): SemRefDomain => ({
  domain: r.domain ?? "",
  ascore: int(pick(r, "domain_ascore", "domain_authority_score")),
  backlinks: int(r.backlinks_num),
  country: r.country || null,
  firstSeen: unix(r.first_seen),
  lastSeen: unix(r.last_seen),
});

export type SemBacklinksHistory = { date: string | null; backlinks: number | null; domains: number | null; ascore: number | null };
export const backlinksHistory = (r: Raw): SemBacklinksHistory => ({ date: ymd(r.date), backlinks: int(r.backlinks_num), domains: int(r.domains_num), ascore: int(r.score) });

export type SemChange = SemKeyword & { change: "new" | "lost" | "rise" | "fall" };

export type SemrushDatasets = {
  overview: SemOverview[];
  overviewAll: SemOverview[];
  history: SemHistory[];
  keywords: SemKeyword[];
  changes: SemChange[];
  pages: SemPage[];
  subdomains: SemPage[];
  competitors: SemCompetitor[];
  gap: SemGap[];
  keywordMetrics: SemKeywordMetrics[];
  backlinksOverview: SemBacklinksOverview[];
  backlinks: SemBacklink[];
  refdomains: SemRefDomain[];
  backlinksHistory: SemBacklinksHistory[];
};

export type SemrushDataset = keyof SemrushDatasets;
