export const you = "rkjh.se";
export const rival = "jbekonomi.com";

export const cdLanding = {
  examples: ["imdb.com", "fandom.com", "rottentomatoes.com"],
};

export type CdRow = {
  domain: string;
  as: number;
  rank: string;
  rankDelta?: "up" | "down";
  traffic: string;
  trafficDelta?: "up" | "down";
  keywords: string;
  keywordsDelta?: "up" | "down";
  backlinks: string;
  refDomains: string;
  paidKeywords: string;
  paidCost: string;
  best: (keyof Omit<CdRow, "domain" | "best">)[];
};

export const cdRows: CdRow[] = [
  {
    domain: you,
    as: 8,
    rank: "267.2K",
    rankDelta: "down",
    traffic: "59",
    trafficDelta: "down",
    keywords: "134",
    keywordsDelta: "down",
    backlinks: "375",
    refDomains: "263",
    paidKeywords: "0",
    paidCost: "$0",
    best: ["keywords", "backlinks", "refDomains"],
  },
  {
    domain: rival,
    as: 9,
    rank: "99.7K",
    rankDelta: "down",
    traffic: "386",
    keywords: "30",
    keywordsDelta: "up",
    backlinks: "319",
    refDomains: "216",
    paidKeywords: "0",
    paidCost: "$0",
    best: ["as", "rank", "traffic"],
  },
];

export const trafficShare = [
  { domain: you, pct: 13.3 },
  { domain: rival, pct: 86.7 },
];

export const trafficMonths = ["Sep 2025", "", "Nov 2025", "", "Jan", "", "Mar", "", "May", "", "Jul", "", "Sep"];
export const organicTraffic = {
  [you]: [7, 7, 7, 10, 30, 25, 5, 112, 120, 95, 107, 70, 59],
  [rival]: [0, 0, 55, 55, 168, 168, 250, 457, 457, 160, 165, 386, 386],
};
export const paidTraffic = {
  [you]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [rival]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};
export const backlinksTrend = {
  [you]: [158, 150, 160, 168, 146, 153, 157, 160, 165, 167, 200, 263, 263],
  [rival]: [88, 89, 101, 110, 91, 98, 101, 102, 101, 106, 130, 216, 216],
};

export type Opp = { keyword: string; volume: number };
export const topOpportunities: Opp[] = [
  { keyword: "vad kostar bokföring", volume: 390 },
  { keyword: "jwk redovisning", volume: 140 },
  { keyword: "bokföring kostnad", volume: 50 },
  { keyword: "kostnad för bokföring", volume: 50 },
  { keyword: "redovisning pris", volume: 50 },
];
export const weakOpportunities: Opp[] = [{ keyword: "redovisningsbyrå halmstad", volume: 720 }];

export const overlap = { [you]: 122, [rival]: 23 };

export type KgRow = {
  keyword: string;
  intent: ("C" | "I" | "N" | "T")[];
  a: number;
  b: number;
  volume: string;
  kd: number;
  cpc: string;
  com: string;
  results: string;
};

export const kgTabs = [
  { key: "shared", label: "Shared", count: 7 },
  { key: "missing", label: "Missing", count: 16 },
  { key: "weak", label: "Weak", count: 1 },
  { key: "strong", label: "Strong", count: 6 },
  { key: "untapped", label: "Untapped", count: 16 },
  { key: "unique", label: "Unique", count: 115 },
  { key: "all", label: "All", count: 138 },
] as const;
export type KgTab = (typeof kgTabs)[number]["key"];

export const kgShared: KgRow[] = [
  { keyword: "redovisningskonsult halmstad", intent: ["C"], a: 8, b: 16, volume: "1K", kd: 12, cpc: "10.00", com: "0.76", results: "107" },
  { keyword: "redovisningsbyrå halmstad", intent: ["C"], a: 3, b: 27, volume: "720", kd: 22, cpc: "5.89", com: "0.76", results: "106" },
  { keyword: "bokföring halmstad", intent: ["C"], a: 40, b: 14, volume: "260", kd: 10, cpc: "3.17", com: "0.41", results: "106" },
  { keyword: "revisor halmstad", intent: ["C"], a: 9, b: 53, volume: "40", kd: 8, cpc: "10.33", com: "0.42", results: "109" },
  { keyword: "ekonomibyrån halmstad", intent: ["I"], a: 26, b: 29, volume: "30", kd: 23, cpc: "0.00", com: "0.41", results: "105" },
  { keyword: "redovisning halmstad", intent: ["C"], a: 6, b: 29, volume: "30", kd: 19, cpc: "9.45", com: "0.59", results: "262K" },
  { keyword: "revision halmstad", intent: ["I"], a: 2, b: 43, volume: "30", kd: 13, cpc: "2.34", com: "0.73", results: "110" },
];

const other = (keyword: string, intent: KgRow["intent"], a: number, b: number, volume: string, kd: number, cpc: string, com: string, results: string): KgRow => ({
  keyword,
  intent,
  a,
  b,
  volume,
  kd,
  cpc,
  com,
  results,
});

export const kgOther: Record<Exclude<KgTab, "shared">, KgRow[]> = {
  missing: [
    other("vad kostar bokföring", ["I"], 0, 11, "390", 14, "4.12", "0.52", "6.1M"),
    other("jwk redovisning", ["N"], 0, 4, "140", 3, "0.00", "0.08", "1.2K"),
    other("bokföring kostnad", ["C"], 0, 9, "50", 11, "3.80", "0.61", "2.3M"),
    other("kostnad för bokföring", ["I"], 0, 12, "50", 9, "3.45", "0.55", "2.1M"),
    other("redovisning pris", ["C"], 0, 17, "50", 15, "4.02", "0.64", "1.9M"),
  ],
  weak: [other("redovisningsbyrå halmstad", ["C"], 3, 27, "720", 22, "5.89", "0.76", "106")],
  strong: [
    other("redovisningskonsult halmstad", ["C"], 8, 16, "1K", 12, "10.00", "0.76", "107"),
    other("redovisningsbyrå halmstad", ["C"], 3, 27, "720", 22, "5.89", "0.76", "106"),
    other("revisor halmstad", ["C"], 9, 53, "40", 8, "10.33", "0.42", "109"),
    other("ekonomibyrån halmstad", ["I"], 26, 29, "30", 23, "0.00", "0.41", "105"),
    other("redovisning halmstad", ["C"], 6, 29, "30", 19, "9.45", "0.59", "262K"),
    other("revision halmstad", ["I"], 2, 43, "30", 13, "2.34", "0.73", "110"),
  ],
  untapped: [
    other("vad kostar bokföring", ["I"], 0, 11, "390", 14, "4.12", "0.52", "6.1M"),
    other("jwk redovisning", ["N"], 0, 4, "140", 3, "0.00", "0.08", "1.2K"),
    other("bokföring kostnad", ["C"], 0, 9, "50", 11, "3.80", "0.61", "2.3M"),
  ],
  unique: [
    other("rkjh", ["N"], 1, 0, "30", 0, "0.00", "0.00", "1.4K"),
    other("revisionskonsulterna", ["N"], 1, 0, "20", 2, "0.00", "0.02", "3.8K"),
    other("bokslut halmstad", ["C"], 7, 0, "20", 6, "4.10", "0.44", "98"),
  ],
  all: [],
};
kgOther.all = [...kgShared, ...kgOther.missing, ...kgOther.unique];

export type BgRow = { domain: string; category?: string; as: number; visits: string; a: number; b: number };

const bgTop: BgRow[] = [
  { domain: "vainu.com", category: "Computer Software & Development", as: 41, visits: "27.1K", a: 0, b: 1 },
  { domain: "tic.io", as: 28, visits: "37.9K", a: 0, b: 5 },
  { domain: "seo-revealed.club", as: 14, visits: "95", a: 0, b: 1 },
  { domain: "shortenurls.eu", as: 14, visits: "10.2K", a: 0, b: 1 },
  { domain: "allbiz.se", category: "Online Services", as: 9, visits: "2K", a: 0, b: 1 },
  { domain: "drjack.world", category: "Online Services", as: 6, visits: "21K", a: 0, b: 2 },
];

const bgMiddle: [string, number, string][] = [
  ["hittaforetag.se", 6, "4.1K"],
  ["foretagsfakta.se", 5, "3.3K"],
  ["seoheap.link", 5, "n/a"],
  ["linkbuildseo.club", 5, "n/a"],
  ["rankvault.link", 5, "n/a"],
  ["infobel.com", 4, "88.5K"],
  ["seoprofiler.link", 4, "n/a"],
  ["directorylist.site", 4, "n/a"],
  ["bizdirectory.club", 4, "n/a"],
  ["seo-anomaly.site", 4, "n/a"],
  ["topseorank.link", 4, "n/a"],
  ["backlinkdoc.site", 4, "n/a"],
  ["seoboost.club", 3, "n/a"],
  ["cybo.com", 3, "12.8K"],
  ["linkstorm.site", 3, "n/a"],
  ["seoworld.link", 3, "n/a"],
  ["domainrank.club", 3, "n/a"],
  ["seositecheckup.link", 3, "n/a"],
  ["rankchecker.site", 3, "n/a"],
  ["seo-wave.club", 3, "n/a"],
  ["linkjuice.site", 3, "n/a"],
  ["seobacklinks.club", 3, "n/a"],
  ["seomaster.link", 3, "n/a"],
  ["serpboost.site", 3, "n/a"],
  ["webstats.club", 3, "n/a"],
  ["ahrefsrank.site", 2, "n/a"],
  ["backlinkseo.link", 2, "n/a"],
  ["bestseotools.club", 2, "n/a"],
  ["domainstats.site", 2, "n/a"],
  ["freebacklinks.link", 2, "n/a"],
  ["googlerank.site", 2, "n/a"],
  ["linkbooster.club", 2, "n/a"],
  ["linkfarm.site", 2, "n/a"],
  ["mozrank.link", 2, "n/a"],
  ["pagerank.club", 2, "n/a"],
  ["rankboost.site", 2, "n/a"],
  ["seo-bots.link", 2, "n/a"],
  ["seochecker.club", 2, "n/a"],
  ["seocompany.site", 2, "n/a"],
  ["seodirectory.link", 2, "n/a"],
  ["seoexperts.club", 2, "n/a"],
  ["seoranker.site", 2, "n/a"],
  ["seotraffic.link", 2, "n/a"],
  ["siteranker.club", 2, "n/a"],
  ["toplinks.site", 2, "n/a"],
  ["trafficseo.link", 2, "n/a"],
  ["ultraseo.club", 2, "n/a"],
  ["uniquelinks.site", 2, "n/a"],
  ["unitedseo.link", 2, "n/a"],
  ["upperlinks.club", 2, "n/a"],
  ["uprankseo.site", 2, "n/a"],
];

const bgBottom: BgRow[] = [
  { domain: "upseorank.com", as: 2, visits: "n/a", a: 0, b: 1 },
  { domain: "usaseobiz.link", as: 2, visits: "n/a", a: 0, b: 1 },
  { domain: "webbestseo.link", as: 2, visits: "n/a", a: 0, b: 1 },
  { domain: "webrankindia.com", as: 2, visits: "2.4K", a: 0, b: 1 },
];

export const bgRows: BgRow[] = [...bgTop, ...bgMiddle.map(([domain, as, visits]) => ({ domain, as, visits, a: 0, b: 1 })), ...bgBottom];

export const bgTabs = ["Best", "Weak", "Strong", "Shared", "Unique", "All"] as const;
export type BgTab = (typeof bgTabs)[number];

export const bgMonthLabels = ["Oct 2025", "Dec 2025", "Feb 2026", "Mar 2026", "May 2026", "Jul 2026"];
export const bgAuthority = {
  [you]: [7, 6, 6, 7, 7, 7, 7, 7, 8, 8, 9, 8],
  [rival]: [2, 2, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9],
};
export const bgRefDomains = {
  [you]: [157, 151, 160, 168, 145, 154, 158, 161, 165, 167, 196, 260],
  [rival]: [84, 84, 100, 110, 89, 96, 100, 101, 100, 106, 130, 213],
};
