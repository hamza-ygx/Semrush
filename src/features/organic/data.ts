export const domain = "rkjh.se";

export const databases = [
  { code: "SE", count: 134, flag: "se" },
  { code: "US", count: 21, flag: "us" },
  { code: "UK", count: 18, flag: "uk" },
] as const;

export const moreDatabases = [
  { code: "DE", name: "Germany", count: 4 },
  { code: "NO", name: "Norway", count: 3 },
  { code: "DK", name: "Denmark", count: 2 },
  { code: "FI", name: "Finland", count: 1 },
  { code: "ES", name: "Spain", count: 1 },
];

export const summary = {
  keywords: { value: "134", delta: "-12.42%" },
  traffic: { value: "59", delta: "-9.23%" },
  cost: { value: "$365.0", delta: "-2.41%" },
  branded: { value: "0", delta: "0%" },
  nonBranded: { value: "59", delta: "-9.23%" },
};

export const keywordsSpark = [15, 19, 22, 23, 24, 22, 18, 20, 22, 17, 13, 10];
export const trafficSpark = [2, 2, 3, 5, 4, 2, 24, 26, 22, 24, 17, 16];

export const trendColors = {
  top3: "#f5b000",
  "4-10": "#4f4ba6",
  "11-20": "#636ce1",
  "21-50": "#829ef5",
  "51-100": "#adbdfb",
  serp: "#80dc6b",
} as const;

export type TrendKey = keyof typeof trendColors;

export const trendLegend: { key: TrendKey; label: string }[] = [
  { key: "top3", label: "Top 3" },
  { key: "4-10", label: "4-10" },
  { key: "11-20", label: "11-20" },
  { key: "21-50", label: "21-50" },
  { key: "51-100", label: "51-100" },
  { key: "serp", label: "SERP Features" },
];

const ovRaw: number[][] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,2,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,3,0],[0,0,0,4,0],[0,0,0,4,0],[0,0,0,4,0],[0,0,0,4,0],[0,0,0,4,0],[0,0,0,11,0],[0,0,0,8,0],[0,0,0,14,0],[0,0,0,19,0],[0,0,0,14,0],[0,0,0,14,0],[0,0,0,14,0],[0,0,0,14,0],[0,0,0,5,0],[0,0,0,14,0],[0,0,0,19,0],[0,0,0,5,0],[0,0,0,11,0],[0,0,0,5,0],[0,0,0,11,0],[0,0,0,8,0],[0,0,0,16,0],[0,0,3,27,0],[0,0,3,16,0],[0,0,3,22,0],[0,0,5,38,0],[0,0,3,27,0],[0,0,0,16,0],[0,0,0,14,0],[0,0,0,16,0],[0,0,0,30,0],[0,0,0,27,0],[0,0,3,30,0],[0,0,0,33,0],[0,0,0,33,0],[0,0,0,33,0],[0,0,0,44,0],[0,0,5,52,0],[0,0,5,46,0],[3,0,5,73,0],[0,0,3,57,0],[0,0,3,63,0],[0,5,60,125,0],[0,3,52,141,0],[3,3,82,125,0],[0,0,90,144,0],[0,0,71,155,0],[0,0,49,152,0],[0,0,46,166,0],[0,0,68,150,0],[0,0,76,166,0],[0,0,63,150,0],[0,0,65,174,0],[0,5,75,140,0],[3,5,71,150,0],[0,5,82,188,0],[0,5,73,199,0],[0,5,71,193,0],[0,11,87,177,0],[0,24,103,128,0],[8,22,101,147,0],[0,24,109,158,0],[3,16,95,139,0],[0,27,95,136,0],[3,30,84,136,0],[3,27,100,130,0],[0,27,103,136,0],[0,22,106,141,0],[0,30,90,144,0],[11,33,98,150,0],[0,24,106,147,0],[0,24,98,139,0],[3,38,122,147,0],[8,41,133,120,0],[8,41,128,109,0],[11,35,125,109,0],[14,33,133,122,0],[14,41,128,109,0],[16,46,114,120,0],[8,30,106,144,0],[22,33,84,95,0],[3,22,60,139,0],[0,8,50,120,0],[0,8,54,106,0],[0,5,38,122,5],[0,8,50,120,0],[3,5,38,128,0],[0,14,57,136,0],[5,14,65,125,0],[0,19,38,133,0],[3,5,46,128,0],[0,0,35,112,0],[0,0,22,90,0],[0,0,19,79,0],[0,0,16,101,0],[0,0,22,73,0],[0,0,19,84,0],[0,0,16,73,0],[0,0,11,63,5],[0,0,8,57,0],[0,0,11,87,0],[0,0,24,84,0],[0,0,16,68,0],[0,0,0,41,0],[0,0,0,19,0],[0,0,0,30,0],[0,0,14,46,0],[0,0,19,44,0],[0,0,22,46,0],[0,0,22,57,8],[0,0,46,71,3],[0,0,49,90,3],[0,0,41,101,0],[0,0,68,125,0],[0,5,93,150,0],[0,5,93,161,5],[0,5,103,166,5],[0,8,93,158,0],[0,11,73,120,0],[0,22,106,109,0],[0,30,131,101,0],[0,24,101,71,0],[3,3,84,44,0],[2,5,16,79,32,0]].map((r) => (r.length === 5 ? [0, ...r] : r));

export type TrendBar = number[];

export const overviewTrend: TrendBar[] = ovRaw;
export const overviewTrendLabels = ["Dec 13", "Dec 14", "Dec 15", "Dec 16", "Dec 17", "Dec 18", "Dec 19", "Dec 20", "Dec 21", "Dec 22", "Dec 23", "Dec 24", "Dec 25"];
export const overviewNotes = [
  { index: 71, label: "Database growth" },
  { index: 112, label: "SERP features" },
];
export const googleUpdates = [63, 64, 65, 66, 67, 68, 69, 70, 72, 74, 76, 82, 83, 87, 88, 89, 90, 91, 100, 104, 105, 106, 107, 109, 110, 115, 116, 117, 118, 119, 123, 124, 125, 128, 129, 130, 131, 138, 146, 147, 148, 149, 151];
export const redFlags = [112, 126];

export const positionsTrend: TrendBar[] = [
  [2,5,17,94,38,3],[2,5,17,97,35,3],[2,4,20,97,36,3],[2,5,17,93,35,1],[2,4,19,90,36,1],[2,4,19,90,36,3],[2,4,19,89,35,3],[2,4,17,87,38,3],[2,4,19,86,38,3],[2,4,19,85,36,3],[2,4,16,87,36,3],[2,4,17,83,36,3],[2,4,17,85,38,3],[2,4,17,82,36,1],[2,4,16,83,35,3],[2,5,13,83,36,3],[2,5,13,83,34,3],[2,5,13,83,34,1],[2,5,13,82,35,3],[2,5,13,82,35,3],[2,5,13,79,32,3],[2,5,13,81,31,0],[2,4,16,79,30,0],[2,4,15,77,32,3],[2,4,16,78,35,1],[2,4,16,79,36,1],[2,4,16,81,35,1],[2,4,16,79,36,1],[2,4,16,81,32,3],[2,4,16,79,34,0],[2,4,16,79,33,0],
];

export const monthLabels = ["Aug 24", "", "Aug 26", "", "Aug 28", "", "Aug 30", "", "Sep 1", "", "Sep 3", "", "Sep 5", "", "Sep 7", "", "Sep 9", "", "Sep 11", "", "Sep 13", "", "Sep 15", "", "Sep 17", "", "Sep 19", "", "Sep 21", "", "Sep 23"];

export const serpTrendColors = { imagePack: "#621a00", paa: "#f9b300", localPack: "#fd7074" } as const;
export const serpTrend: [number, number, number][] = Array.from({ length: 31 }, (_, i) => (i <= 20 ? [2, 0, 1] : i === 21 || i >= 29 ? [0, 0, 1] : [1, 0, 1]));

export type Intent = "C" | "I" | "N" | "T";

export const topKeywords = [
  { keyword: "redovisningsbyrå halmstad", position: 3 as number | "local", sf: 3, volume: "720", traffic: "61.01" },
  { keyword: "redovisningskonsult halmstad", position: 8, sf: 3, volume: "1K", traffic: "22.03" },
  { keyword: "entrepreneur", position: 12, sf: 8, volume: "2.4K", traffic: "11.86" },
  { keyword: "outsourcing redovisning", position: 30, sf: 4, volume: "1.6K", traffic: "1.69" },
  { keyword: "revision halmstad", position: "local" as const, sf: 5, volume: "30", traffic: "1.69" },
];

export const intentColors: Record<Intent, string> = { I: "#8b9cf4", N: "#c983f5", C: "#f0a012", T: "#1fcf9a" };

export const intents = [
  { key: "I" as Intent, label: "Informational", pct: "84.7%", keywords: 116, traffic: 10, share: 84.7, color: "#95a4f5" },
  { key: "N" as Intent, label: "Navigational", pct: "3.6%", keywords: 5, traffic: 0, share: 3.6, color: "#cf8ef7" },
  { key: "C" as Intent, label: "Commercial", pct: "9.5%", keywords: 13, traffic: 49, share: 9.5, color: "#e99500" },
  { key: "T" as Intent, label: "Transactional", pct: "2.2%", keywords: 3, traffic: 0, share: 2.2, color: "#15c895" },
];

export const topChanges = {
  New: [{ keyword: "business audit", previous: null as number | null, current: 19, volume: "30", traffic: "< 0.01" }],
  Lost: [
    { keyword: "skatteverket hobbyverksamhet", previous: 42, current: null as number | null, volume: "320", traffic: "0" },
    { keyword: "vad gör en entreprenör", previous: 97, current: null, volume: "140", traffic: "0" },
    { keyword: "business audit", previous: 13, current: null, volume: "30", traffic: "0" },
    { keyword: "vad är återvinning", previous: 75, current: null, volume: "140", traffic: "0" },
  ],
  Improved: [],
  Declined: [],
} as const;

export type SerpFeature = { name: string; icon: string; count: number };

export const linkingFeatures: SerpFeature[] = [
  { name: "Local pack", icon: "pin", count: 1 },
  { name: "Featured snippet", icon: "crown", count: 0 },
  { name: "Sitelinks", icon: "link", count: 0 },
  { name: "AI Overview", icon: "spark", count: 0 },
  { name: "FAQ", icon: "question", count: 0 },
  { name: "Reviews", icon: "star", count: 0 },
  { name: "Indented", icon: "indent", count: 0 },
  { name: "News", icon: "news", count: 0 },
  { name: "Image", icon: "image", count: 0 },
  { name: "Image pack", icon: "imagePack", count: 0 },
  { name: "Video", icon: "play", count: 0 },
  { name: "Featured video", icon: "playBox", count: 0 },
  { name: "Video carousel", icon: "play", count: 0 },
  { name: "People also ask", icon: "paa", count: 0 },
  { name: "Knowledge panel", icon: "cap", count: 0 },
  { name: "Top stories", icon: "stories", count: 0 },
  { name: "Recipes", icon: "fork", count: 0 },
  { name: "Jobs", icon: "bag", count: 0 },
  { name: "Instant answer", icon: "question", count: 0 },
  { name: "Related searches", icon: "related", count: 0 },
  { name: "People also search", icon: "pas", count: 0 },
  { name: "Carousel", icon: "carousel", count: 0 },
  { name: "Events", icon: "calendar", count: 0 },
  { name: "Hotels pack", icon: "hotel", count: 0 },
  { name: "Flights", icon: "plane", count: 0 },
  { name: "Address pack", icon: "address", count: 0 },
  { name: "Related products", icon: "cart", count: 0 },
  { name: "Popular products", icon: "cartDots", count: 0 },
  { name: "Refine", icon: "funnel", count: 0 },
  { name: "See results about", icon: "seeResults", count: 0 },
  { name: "X", icon: "x", count: 0 },
  { name: "X carousel", icon: "x", count: 0 },
  { name: "Buying Guide", icon: "list", count: 0 },
  { name: "Datasets", icon: "folder", count: 0 },
  { name: "Discussions and Forums", icon: "chat", count: 0 },
  { name: "Explore Brands", icon: "tag", count: 0 },
  { name: "Find results on", icon: "findResults", count: 0 },
  { name: "Organic Carousel", icon: "news", count: 0 },
  { name: "Questions and Answers", icon: "paa", count: 0 },
  { name: "Things to Know", icon: "bullets", count: 0 },
];

export const notLinkingFeatures: SerpFeature[] = [
  { name: "Sitelinks", icon: "link", count: 32 },
  { name: "AI Overview", icon: "spark", count: 113 },
  { name: "Reviews", icon: "star", count: 43 },
  { name: "Instant answer", icon: "question", count: 1 },
  { name: "Image", icon: "image", count: 6 },
  { name: "Image pack", icon: "imagePack", count: 4 },
  { name: "Video", icon: "play", count: 113 },
  { name: "Video carousel", icon: "play", count: 21 },
  { name: "People also ask", icon: "paa", count: 127 },
  { name: "Local pack", icon: "pin", count: 12 },
  { name: "Knowledge panel", icon: "cap", count: 16 },
  { name: "Related searches", icon: "related", count: 119 },
  { name: "People also search", icon: "pas", count: 1 },
  { name: "Ads top", icon: "ad", count: 5 },
  { name: "Ads bottom", icon: "adBottom", count: 9 },
  { name: "Featured snippet", icon: "crown", count: 0 },
  { name: "FAQ", icon: "question", count: 0 },
  { name: "Indented", icon: "indent", count: 0 },
  { name: "News", icon: "news", count: 0 },
  { name: "Featured video", icon: "playBox", count: 0 },
  { name: "Carousel", icon: "carousel", count: 0 },
  { name: "Top stories", icon: "stories", count: 0 },
  { name: "Events", icon: "calendar", count: 0 },
  { name: "Hotels pack", icon: "hotel", count: 0 },
  { name: "Flights", icon: "plane", count: 0 },
  { name: "Recipes", icon: "fork", count: 0 },
  { name: "Jobs", icon: "bag", count: 0 },
  { name: "X", icon: "x", count: 0 },
  { name: "X carousel", icon: "x", count: 0 },
  { name: "Address pack", icon: "address", count: 0 },
  { name: "Buying Guide", icon: "list", count: 0 },
  { name: "Datasets", icon: "folder", count: 0 },
  { name: "Discussions and Forums", icon: "chat", count: 0 },
  { name: "Explore Brands", icon: "tag", count: 0 },
  { name: "Find results on", icon: "findResults", count: 0 },
  { name: "Related products", icon: "cart", count: 0 },
  { name: "Organic Carousel", icon: "news", count: 0 },
  { name: "Popular products", icon: "cartDots", count: 0 },
  { name: "Questions and Answers", icon: "paa", count: 0 },
  { name: "Refine", icon: "funnel", count: 0 },
  { name: "See results about", icon: "seeResults", count: 0 },
  { name: "Things to Know", icon: "bullets", count: 0 },
  { name: "Shopping ads", icon: "cart", count: 0 },
  { name: "Ads middle", icon: "ad", count: 0 },
];

export const topPages = [
  { url: "rkjh.se/", traffic: "84.74", keywords: 11 },
  { url: "rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", short: "rkjh.se/en/blog/20… entrepreneurship/", traffic: "11.86", keywords: 1 },
  { url: "rkjh.se/blog/tjanster/outsourcing/", traffic: "1.69", keywords: 1 },
  { url: "rkjh.se/en/", traffic: "< 0.01", keywords: 1 },
  { url: "rkjh.se/blog/tjanster/startaeget/", traffic: "< 0.01", keywords: 1 },
];

export const allPages = [
  { url: "rkjh.se/", traffic: 50, pct: "84.74", keywords: 11 },
  { url: "rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", traffic: 7, pct: "11.86", keywords: 1 },
  { url: "rkjh.se/blog/tjanster/outsourcing/", traffic: 1, pct: "1.69", keywords: 1 },
  { url: "rkjh.se/en/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/blog/tjanster/startaeget/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/blog/events/lasa-och-forsta-bokslut/", traffic: 0, pct: "< 0.01", keywords: 4 },
  { url: "rkjh.se/blog/2018/03/12/skatt-pa-arbetsinkomster-förvärvsinkomstbeskattning/", traffic: 0, pct: "< 0.01", keywords: 3 },
  { url: "rkjh.se/blog/2018/03/12/ändrad-beräkning-av-bilförmån/", traffic: 0, pct: "< 0.01", keywords: 3 },
  { url: "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", traffic: 0, pct: "< 0.01", keywords: 3 },
  { url: "rkjh.se/blog/2020/03/18/who-is-an-entrepreneur-4/", traffic: 0, pct: "< 0.01", keywords: 2 },
  { url: "rkjh.se/begransad-klimatpaverkan-saker-foretag-kan-gora/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/hur-kan-jag-minska-min-klimatpaverkan/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/en/blog/2019/09/30/f-tax-and-vat-registration-application-2/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/blog/kurser/stratisk-affarsutveckling/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/blog/branscher/fastighet/", traffic: 0, pct: "< 0.01", keywords: 2 },
  { url: "rkjh.se/en/blog/branscher/industry/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/blog/2020/02/03/hot-och-utpressning/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/blog/tjanster/hallbar-utveckling/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/zh/", traffic: 0, pct: "< 0.01", keywords: 1 },
  { url: "rkjh.se/en/blog/tjanster/audit/", traffic: 0, pct: "< 0.01", keywords: 1 },
];

export const competitorsTop = [
  { domain: "jbekonomi.com", common: 5, level: 42 },
  { domain: "ellox.se", common: 5, level: 42 },
  { domain: "ek3hjartan.se", common: 5, level: 39 },
  { domain: "accenten.se", common: 4, level: 38 },
  { domain: "palmsredovisning.se", common: 5, level: 38 },
];

export const bubbles = [
  { domain: "jbekonomi.com", color: "#6167e6", keywords: 30, traffic: 386, r: 50, kx: 24, cr: 49 },
  { domain: "ellox.se", color: "#3ddab4", keywords: 16, traffic: 47, r: 20, kx: 10, cr: 20 },
  { domain: "ek3hjartan.se", color: "#c686f5", keywords: 12, traffic: 10, r: 11, kx: 12, cr: 11.5 },
  { domain: "accenten.se", color: "#fdb42c", keywords: 26, traffic: 154, r: 33, kx: 22, cr: 32.5 },
  { domain: "palmsredovisning.se", color: "#ff6b70", keywords: 25, traffic: 165, r: 33, kx: 18, cr: 33.5 },
  { domain: "rkjh.se", color: "#a9b8fb", keywords: 134, traffic: 59, r: 29, kx: 133, cr: 22.5 },
];

export type Competitor = { domain: string; level: number; common: number; se: string; traffic: string; costs: string; paid: string };

const c = (domain: string, level: number, common: number, se: string, traffic: string, costs: string, paid = "0"): Competitor => ({ domain, level, common, se, traffic, costs, paid });

export const competitors: Competitor[] = [
  c("jbekonomi.com", 42, 5, "30", "386", "2.23K"),
  c("ellox.se", 42, 5, "16", "47", "238"),
  c("ek3hjartan.se", 39, 5, "12", "10", "87"),
  c("accenten.se", 38, 4, "26", "154", "1.19K"),
  c("palmsredovisning.se", 38, 5, "25", "165", "1.26K"),
  c("halmstadrevisionsbyra.se", 37, 4, "45", "52", "283"),
  c("bdcg.se", 35, 5, "257", "424", "2.46K"),
  c("nsrevision.se", 32, 5, "14", "95", "721"),
  c("gustelia.se", 27, 4, "7", "2", "15"),
  c("eseb.se", 22, 3, "22", "43", "118"),
  c("lrakridi.se", 17, 5, "237", "386", "465"),
  c("bs-redovisning.se", 15, 3, "106", "163", "1.01K"),
  c("lawbusiness.se", 14, 2, "50", "50", "23"),
  c("bjaher.se", 12, 2, "10", "0", "0"),
  c("rtj.se", 10, 2, "41", "655", "2.83K"),
  c("delorean.law", 9, 1, "101", "19", "20"),
  c("hallandsredovisning.se", 9, 2, "38", "71", "412"),
  c("ekonomikonsulten-halmstad.se", 8, 2, "19", "24", "96"),
  c("redovisningsbyranhalmstad.se", 8, 1, "11", "14", "88"),
  c("tylosandsredovisning.se", 7, 1, "9", "6", "31"),
  c("westrevision.se", 7, 2, "64", "118", "690"),
  c("bokforingsbyran.se", 6, 1, "83", "142", "577"),
  c("sverigesredovisningskonsulter.se", 6, 2, "210", "520", "1.84K"),
  c("revisionsbyran-halland.se", 6, 1, "17", "9", "42"),
  c("ekonomibyran.nu", 5, 1, "44", "61", "205"),
  c("ageras.se", 5, 2, "1.1K", "2.9K", "6.12K"),
  c("redovisningsbyra.nu", 5, 1, "320", "610", "2.05K"),
  c("baker-tilly.se", 4, 1, "412", "388", "1.44K"),
  c("grant-thornton.se", 4, 2, "2.3K", "4.1K", "9.83K"),
  c("mazars.se", 4, 1, "1.4K", "1.9K", "5.21K"),
  c("rsm.se", 4, 1, "980", "1.2K", "3.66K"),
  c("bdo.se", 3, 2, "3.9K", "6.4K", "14.2K"),
  c("kpmg.com", 3, 1, "18.7K", "9.8K", "31.5K"),
  c("pwc.se", 3, 1, "5.6K", "7.7K", "19.9K"),
  c("ey.com", 3, 1, "12.1K", "5.3K", "22.1K"),
  c("deloitte.com", 3, 1, "9.4K", "4.6K", "18.4K"),
  c("far.se", 3, 1, "2.7K", "3.3K", "8.72K"),
  c("srfkonsult.se", 2, 1, "1.9K", "2.6K", "6.44K"),
  c("bokio.se", 2, 2, "6.8K", "21.4K", "48.3K", "12"),
  c("fortnox.se", 2, 2, "9.2K", "38.6K", "92.1K", "34"),
  c("visma.se", 2, 1, "7.5K", "18.9K", "51.7K", "18"),
  c("blinfo.se", 2, 1, "2.2K", "4.4K", "7.35K"),
  c("driva-eget.se", 2, 1, "3.1K", "7.9K", "12.6K"),
  c("foretagande.se", 2, 1, "1.6K", "3.5K", "5.91K"),
  c("verksamt.se", 2, 2, "4.3K", "41.2K", "63.8K"),
  c("bolagsverket.se", 1, 1, "6.1K", "184K", "212.5K"),
  c("ekonomifakta.se", 1, 1, "3.8K", "12.4K", "9.66K"),
  c("expowera.se", 1, 1, "1.3K", "2.7K", "8.14K", "6"),
  c("aktiebolagslagen.se", 1, 1, "940", "1.6K", "2.21K"),
  c("revisorsinspektionen.se", 1, 1, "520", "1.1K", "1.37K"),
  c("srf.se", 1, 1, "1.2K", "2.3K", "4.08K"),
  c("ekonomikollen.se", 1, 1, "2.9K", "8.8K", "7.72K"),
  c("konsumenternas.se", 1, 1, "2.4K", "9.3K", "11.2K"),
  c("hallandsposten.se", 1, 1, "14.9K", "38.1K", "22.6K"),
  c("halmstad.se", 1, 1, "6.6K", "52.7K", "31.4K"),
  c("almi.se", 1, 1, "2.1K", "11.9K", "18.3K"),
  c("nyforetagarcentrum.se", 1, 1, "860", "3.1K", "5.02K"),
  c("foretagarna.se", 1, 1, "3.4K", "14.6K", "24.9K"),
  c("svensktnaringsliv.se", 1, 1, "4.7K", "9.2K", "14.1K"),
  c("hjalpmedel-ekonomi.se", 1, 1, "310", "420", "612"),
  c("bokforingstips.se", 1, 1, "780", "1.9K", "2.47K"),
  c("e-conomic.se", 1, 1, "3.9K", "9.6K", "26.2K", "9"),
  c("wint.se", 1, 1, "1.2K", "2.8K", "9.42K", "4"),
  c("kontek.se", 1, 1, "680", "1.4K", "3.88K"),
  c("simployer.se", 0, 1, "2.6K", "3.9K", "11.7K"),
  c("forvaltarforum.se", 0, 1, "1.1K", "1.8K", "2.93K"),
  c("hogia.se", 0, 1, "2.5K", "6.9K", "17.2K", "7"),
  c("tidningenkonsulten.se", 0, 1, "970", "1.2K", "1.64K"),
  c("dagensindustri.se", 0, 1, "21.3K", "81.4K", "64.2K"),
  c("svd.se", 0, 1, "48.2K", "312K", "189.3K"),
  c("dn.se", 0, 1, "71.9K", "486K", "240.6K"),
  c("aftonbladet.se", 0, 1, "132.4K", "1.1M", "412.8K"),
  c("expressen.se", 0, 1, "97.3K", "702K", "288.4K"),
  c("gp.se", 0, 1, "31.5K", "126K", "71.9K"),
  c("sydsvenskan.se", 0, 1, "18.6K", "74.3K", "39.2K"),
  c("ne.se", 0, 1, "64.1K", "418K", "166.2K"),
  c("sv.wikipedia.org", 0, 2, "1.3M", "4.9M", "3.12M"),
  c("wikipedia.org", 0, 1, "812.4K", "1.2M", "902.1K"),
  c("lagen.nu", 0, 1, "28.4K", "96.2K", "58.7K"),
  c("riksdagen.se", 0, 1, "41.7K", "221K", "93.6K"),
  c("regeringen.se", 0, 1, "22.8K", "88.1K", "41.4K"),
  c("naturvardsverket.se", 0, 1, "16.2K", "63.9K", "28.8K"),
  c("energimyndigheten.se", 0, 1, "7.4K", "21.6K", "15.3K"),
  c("transportstyrelsen.se", 0, 1, "19.9K", "241K", "88.2K"),
  c("forsakringskassan.se", 0, 1, "24.6K", "612K", "231.7K"),
  c("pensionsmyndigheten.se", 0, 1, "9.8K", "184K", "76.9K"),
  c("scb.se", 0, 1, "14.2K", "96.4K", "39.1K"),
  c("sverigesradio.se", 0, 1, "36.8K", "187K", "58.3K"),
  c("svt.se", 0, 1, "88.1K", "921K", "274.1K"),
  c("hittaettjobb.se", 0, 1, "5.3K", "11.7K", "21.9K"),
  c("hn.se", 0, 1, "12.8K", "44.1K", "19.7K"),
  c("bokforingslagen.se", 0, 1, "640", "980", "1.12K"),
  c("sverigesnatur.org", 0, 1, "18.1K", "31K", "16.57K"),
  c("framfot.se", 0, 1, "3.8K", "12.3K", "10.72K", "68"),
  c("ri.se", 0, 1, "13.3K", "46K", "187.1K"),
  c("lindahl.se", 0, 1, "2.1K", "8K", "9.48K"),
  c("speedledger.se", 0, 3, "8.5K", "26.2K", "28.78K", "21"),
  c("eniro.se", 0, 1, "1.8M", "1.6M", "243.57K"),
  c("skatteverket.se", 0, 4, "260.6K", "3.5M", "2.71M"),
  c("revisor24.se", 0, 1, "1.2K", "300", "568"),
];

export type PositionRow = {
  keyword: string;
  intent: Intent;
  position: number;
  local?: boolean;
  sf: number;
  traffic: number;
  pct: string;
  volume: string;
  kd: number;
  url: string;
  updated: string;
};

const r = (keyword: string, intent: Intent, position: number, sf: number, traffic: number, pct: string, volume: string, kd: number, url: string, updated: string, local = false): PositionRow => ({
  keyword, intent, position, sf, traffic, pct, volume, kd, url, updated, local,
});

const L = "< 0.01";

export const positionRows: PositionRow[] = [
  r("redovisningsbyrå halmstad", "C", 3, 3, 36, "61.01", "720", 22, "rkjh.se/", "Aug 17"),
  r("redovisningskonsult halmstad", "C", 8, 3, 13, "22.03", "1K", 12, "rkjh.se/", "Aug 17"),
  r("entrepreneur", "I", 12, 8, 7, "11.86", "2.4K", 88, "rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", "2 days"),
  r("outsourcing redovisning", "I", 30, 4, 1, "1.69", "1.6K", 10, "rkjh.se/blog/tjanster/outsourcing/", "Aug 10"),
  r("revision halmstad", "I", 1, 5, 1, "1.69", "30", 13, "rkjh.se/", "Aug 27", true),
  r("revision halmstad", "I", 2, 5, 1, "1.69", "30", 13, "rkjh.se/", "Aug 27"),
  r("förmånsberäkning bil", "I", 69, 3, 0, L, "50", 27, "rkjh.se/blog/2018/03/12/ändrad-beräkning-av-bilförmån/", "Aug 06"),
  r("hur läser man årsredovisning", "I", 42, 4, 0, L, "30", 10, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Aug 22"),
  r("bolagsskatt aktiebolag", "I", 51, 7, 0, L, "30", 22, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Aug 17"),
  r("vad är utpressning", "I", 25, 4, 0, L, "90", 12, "rkjh.se/blog/2020/02/03/hot-och-utpressning/", "Aug 06"),
  r("vad är en hållbarhetsrapport", "I", 64, 3, 0, L, "260", 20, "rkjh.se/blog/tjanster/hallbar-affarutveckling-3/", "Aug 19"),
  r("revisor halmstad", "C", 9, 3, 0, L, "40", 8, "rkjh.se/", "Aug 15"),
  r("hur man läser en årsredovisning", "I", 35, 5, 0, L, "30", 12, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Sep 18"),
  r("beskattningsbar förvärvsinkomst", "I", 37, 5, 0, L, "140", 17, "rkjh.se/blog/2018/03/12/skatt-på-arbetsinkomster-förvärvsinkomstbeskattning/", "Aug 01"),
  r("beskattningsbar förvärvsinkomst", "I", 40, 5, 0, L, "140", 17, "rkjh.se/blog/2018/03/12/skatt-på-arbetsinkomster-förvärvsinkomstbeskattning/", "Aug 01"),
  r("iso 18541", "I", 34, 1, 0, L, "30", 10, "rkjh.se/en/blog/branscher/industry/", "Aug 12"),
  r("begränsad miljöpåverkan", "I", 17, 6, 0, L, "30", 12, "rkjh.se/begransad-klimatpaverkan-saker-foretag-kan-gora/", "Sep 18"),
  r("begränsad miljöpåverkan", "I", 56, 6, 0, L, "30", 12, "rkjh.se/hur-kan-jag-minska-min-klimatpaverkan/", "Sep 18"),
  r("f tax", "I", 29, 6, 0, L, "30", 20, "rkjh.se/en/blog/2019/09/30/f-tax-and-vat-registration-application-2/", "4 days"),
  r("strategisk affärsutveckling", "I", 13, 4, 0, L, "30", 8, "rkjh.se/blog/kurser/stratisk-affarsutveckling/", "Sep 14"),
  r("hur man gör bokslut", "I", 32, 6, 0, L, "170", 15, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Aug 07"),
  r("fastighetsredovisning", "I", 21, 4, 0, L, "390", 13, "rkjh.se/blog/branscher/fastighet/", "Aug 31"),
  r("redovisning halmstad", "C", 6, 4, 0, L, "30", 19, "rkjh.se/", "Aug 17"),
  r("bokföring halmstad", "C", 40, 5, 0, L, "260", 10, "rkjh.se/", "Aug 21"),
  r("hot och utpressning", "I", 38, 5, 0, L, "70", 14, "rkjh.se/blog/2020/02/03/hot-och-utpressning/", "Aug 06"),
  r("göra bokslut", "I", 44, 5, 0, L, "210", 18, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Aug 29"),
  r("bokslut enskild firma", "I", 58, 6, 0, L, "480", 24, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Sep 02"),
  r("audit requirements", "I", 47, 4, 0, L, "40", 26, "rkjh.se/en/blog/tjanster/audit/", "Aug 24"),
  r("revisionerna", "N", 18, 3, 0, L, "30", 9, "rkjh.se/", "Sep 11"),
  r("förmånsvärde bil", "I", 71, 5, 0, L, "1.3K", 29, "rkjh.se/blog/2018/03/12/ändrad-beräkning-av-bilförmån/", "Aug 14"),
  r("förvärvsinkomst", "I", 63, 5, 0, L, "590", 21, "rkjh.se/blog/2018/03/12/skatt-på-arbetsinkomster-förvärvsinkomstbeskattning/", "Aug 09"),
  r("skatt på arbetsinkomst", "I", 49, 6, 0, L, "110", 16, "rkjh.se/blog/2018/03/12/skatt-på-arbetsinkomster-förvärvsinkomstbeskattning/", "Aug 27"),
  r("vad är en entreprenör", "I", 52, 7, 0, L, "320", 25, "rkjh.se/blog/2020/03/18/who-is-an-entrepreneur-4/", "Sep 05"),
  r("entreprenör betydelse", "I", 66, 6, 0, L, "170", 19, "rkjh.se/blog/2020/03/18/who-is-an-entrepreneur-4/", "Aug 30"),
  r("hållbar utveckling företag", "I", 54, 6, 0, L, "90", 22, "rkjh.se/blog/tjanster/hallbar-utveckling/", "Sep 09"),
  r("klimatpåverkan företag", "I", 39, 5, 0, L, "50", 14, "rkjh.se/begransad-klimatpaverkan-saker-foretag-kan-gora/", "Sep 18"),
  r("minska klimatpåverkan", "I", 61, 6, 0, L, "210", 27, "rkjh.se/hur-kan-jag-minska-min-klimatpaverkan/", "Sep 18"),
  r("starta eget företag", "I", 77, 7, 0, L, "1.9K", 38, "rkjh.se/blog/tjanster/startaeget/", "Aug 20"),
  r("starta aktiebolag", "I", 82, 7, 0, L, "2.4K", 41, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Aug 11"),
  r("köpa aktiebolag", "C", 48, 5, 0, L, "260", 18, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Aug 26"),
  r("lagerbolag", "C", 88, 6, 0, L, "880", 33, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Sep 03"),
  r("f-skattsedel", "I", 57, 6, 0, L, "720", 28, "rkjh.se/en/blog/2019/09/30/f-tax-and-vat-registration-application-2/", "Aug 18"),
  r("vat registration sweden", "I", 36, 5, 0, L, "90", 24, "rkjh.se/en/blog/2019/09/30/f-tax-and-vat-registration-application-2/", "Aug 22"),
  r("momsregistrering", "I", 74, 6, 0, L, "390", 26, "rkjh.se/en/blog/2019/09/30/f-tax-and-vat-registration-application-2/", "Aug 28"),
  r("affärsutveckling", "I", 64, 7, 0, L, "880", 31, "rkjh.se/blog/kurser/stratisk-affarsutveckling/", "Sep 14"),
  r("affärsplan mall", "T", 91, 6, 0, L, "1.6K", 36, "rkjh.se/blog/kurser/stratisk-affarsutveckling/", "Aug 13"),
  r("fastighetsbolag redovisning", "I", 27, 4, 0, L, "40", 11, "rkjh.se/blog/branscher/fastighet/", "Aug 31"),
  r("redovisning fastighetsbolag", "I", 31, 4, 0, L, "50", 12, "rkjh.se/blog/branscher/fastighet/", "Aug 31"),
  r("industry accounting", "I", 59, 5, 0, L, "30", 22, "rkjh.se/en/blog/branscher/industry/", "Aug 12"),
  r("redovisningsbyrå", "C", 94, 6, 0, L, "2.9K", 34, "rkjh.se/", "Sep 07"),
  r("redovisningskonsult", "C", 86, 5, 0, L, "1.3K", 30, "rkjh.se/", "Aug 25"),
  r("revisor", "C", 97, 6, 0, L, "4.4K", 42, "rkjh.se/", "Aug 16"),
  r("revisionsbyrå halmstad", "C", 14, 4, 0, L, "30", 9, "rkjh.se/", "Sep 12"),
  r("bokföringsbyrå halmstad", "C", 22, 4, 0, L, "30", 11, "rkjh.se/", "Sep 01"),
  r("löneadministration halmstad", "C", 33, 4, 0, L, "30", 8, "rkjh.se/", "Aug 23"),
  r("deklaration hjälp", "C", 53, 5, 0, L, "170", 20, "rkjh.se/", "Aug 19"),
  r("deklaration enskild firma", "I", 68, 6, 0, L, "590", 26, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Aug 21"),
  r("direktavdrag", "I", 45, 5, 0, L, "140", 17, "rkjh.se/blog/2018/03/12/skatt-på-arbetsinkomster-förvärvsinkomstbeskattning/", "Aug 17"),
  r("företagsbeskattning", "I", 62, 6, 0, L, "260", 23, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Sep 04"),
  r("företagsekonomi grunder", "I", 79, 6, 0, L, "210", 21, "rkjh.se/blog/kurser/stratisk-affarsutveckling/", "Aug 15"),
  r("internationell affärsrätt", "I", 43, 5, 0, L, "40", 16, "rkjh.se/en/blog/2019/05/14/international-business-law/", "Aug 08"),
  r("international business law", "I", 72, 6, 0, L, "90", 35, "rkjh.se/en/blog/2019/05/14/international-business-law/", "Aug 08"),
  r("business law sweden", "I", 55, 5, 0, L, "30", 19, "rkjh.se/en/blog/2019/05/14/international-business-law/", "Aug 08"),
  r("utdelning aktiebolag", "I", 84, 7, 0, L, "1.9K", 37, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Aug 19"),
  r("3:12 regler", "I", 89, 6, 0, L, "2.4K", 40, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Aug 22"),
  r("gränsbelopp", "I", 76, 6, 0, L, "720", 32, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Aug 22"),
  r("årsredovisning aktiebolag", "I", 81, 7, 0, L, "1.3K", 35, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Sep 06"),
  r("läsa årsredovisning", "I", 46, 5, 0, L, "90", 15, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Sep 18"),
  r("förstå bokslut", "I", 28, 4, 0, L, "30", 10, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Sep 18"),
  r("bokslut", "I", 93, 7, 0, L, "3.6K", 39, "rkjh.se/blog/events/lasa-och-forsta-bokslut/", "Aug 30"),
  r("outsourcing ekonomi", "I", 41, 5, 0, L, "90", 14, "rkjh.se/blog/tjanster/outsourcing/", "Aug 10"),
  r("outsourca bokföring", "C", 50, 5, 0, L, "110", 18, "rkjh.se/blog/tjanster/outsourcing/", "Aug 10"),
  r("ekonomitjänster företag", "C", 65, 5, 0, L, "70", 16, "rkjh.se/blog/tjanster/outsourcing/", "Aug 27"),
  r("starta eget", "I", 95, 7, 0, L, "5.4K", 44, "rkjh.se/blog/tjanster/startaeget/", "Aug 20"),
  r("starta enskild firma", "I", 87, 7, 0, L, "2.9K", 39, "rkjh.se/blog/tjanster/startaeget/", "Aug 20"),
  r("hållbarhetsredovisning", "I", 70, 6, 0, L, "1.6K", 36, "rkjh.se/blog/tjanster/hallbar-utveckling/", "Sep 14"),
  r("hållbar utveckling", "I", 98, 7, 0, L, "6.6K", 47, "rkjh.se/blog/tjanster/hallbar-utveckling/", "Sep 14"),
  r("miljöpåverkan", "I", 90, 6, 0, L, "1.9K", 38, "rkjh.se/hur-kan-jag-minska-min-klimatpaverkan/", "Sep 18"),
  r("bilförmån", "I", 85, 6, 0, L, "2.4K", 33, "rkjh.se/blog/2018/03/12/ändrad-beräkning-av-bilförmån/", "Aug 06"),
  r("beräkna bilförmån", "I", 60, 5, 0, L, "480", 24, "rkjh.se/blog/2018/03/12/ändrad-beräkning-av-bilförmån/", "Aug 06"),
  r("ändrad bilförmån", "I", 26, 4, 0, L, "40", 13, "rkjh.se/blog/2018/03/12/ändrad-beräkning-av-bilförmån/", "Aug 06"),
  r("hot mot företagare", "I", 24, 4, 0, L, "30", 9, "rkjh.se/blog/2020/02/03/hot-och-utpressning/", "Aug 06"),
  r("utpressning", "I", 78, 6, 0, L, "880", 31, "rkjh.se/blog/2020/02/03/hot-och-utpressning/", "Aug 06"),
  r("who is an entrepreneur", "I", 73, 6, 0, L, "110", 42, "rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", "Aug 12"),
  r("entrepreneurship definition", "I", 92, 7, 0, L, "210", 55, "rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", "Aug 12"),
  r("defining entrepreneurship", "I", 67, 6, 0, L, "40", 38, "rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", "Aug 12"),
  r("entreprenörskap", "I", 83, 6, 0, L, "1.3K", 34, "rkjh.se/blog/2020/03/18/who-is-an-entrepreneur-4/", "Sep 01"),
  r("fastighetsförvaltning redovisning", "I", 38, 4, 0, L, "30", 12, "rkjh.se/blog/branscher/fastighet/", "Aug 31"),
  r("f skatt ansökan", "I", 80, 6, 0, L, "320", 25, "rkjh.se/en/blog/2019/09/30/f-tax-and-vat-registration-application-2/", "4 days"),
  r("business audit sweden", "I", 49, 4, 0, L, "30", 16, "rkjh.se/en/blog/tjanster/audit/", "Aug 24"),
  r("audit sweden", "I", 57, 5, 0, L, "40", 21, "rkjh.se/en/blog/tjanster/audit/", "Aug 24"),
  r("revision", "I", 99, 7, 0, L, "3.6K", 45, "rkjh.se/", "Sep 10"),
  r("ekonomikonsult halmstad", "C", 19, 4, 0, L, "30", 10, "rkjh.se/", "Sep 12"),
  r("redovisningsbyråer halmstad", "C", 16, 4, 0, L, "30", 12, "rkjh.se/", "Aug 17"),
  r("international business law firm", "I", 88, 6, 0, L, "50", 31, "rkjh.se/en/blog/2019/05/14/law-and-international-business-law/", "Aug 08"),
  r("business owner", "I", 61, 6, 0, L, "30", 27, "rkjh.se/blog/2020/03/18/who-is-an-entrepreneur-4/", "Aug 01"),
  r("räkna ut förmånsvärde bil", "I", 75, 4, 0, L, "260", 21, "rkjh.se/blog/2018/03/12/ändrad-beräkning-av-bilförmån/", "Sep 16"),
  r("jhm revision", "N", 45, 3, 0, L, "30", 23, "rkjh.se/zh/", "Aug 13"),
  r("bolagsskatt utdelning", "I", 51, 4, 0, L, "30", 25, "rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", "Aug 19"),
  r("vad menas med hållbar utveckling", "I", 67, 6, 0, L, "260", 18, "rkjh.se/blog/tjanster/hallbar-utveckling/", "Sep 14"),
];

export const pageChanges = [
  { url: "https://rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", short: "https://rkjh.se/en... trepreneurship/", traffic: 7, diff: -5 },
  { url: "https://rkjh.se/blog/2018/03/12/skatt-pa-arbetsinkomster-forvarvsinkomstbeskattning/", short: "https://rkjh.se/bl... mstbeskattning/", traffic: 0, diff: -2 },
];

export const changesTrend = {
  labels: ["Aug 27", "", "", "Aug 30", "", "", "Sep 2", "", "", "Sep 5", "", "", "Sep 8", "", "", "Sep 11", "", "", "Sep 14", "", "", "Sep 17", "", "", "Sep 20", "", "", "Sep 23"],
  traffic: [66, 65, 65, 65, 62, 62, 62, 62, 62, 62, 62, 65, 65, 65, 65, 65, 65, 65, 65, 62, 61, 61, 61, 61, 61, 61, 59, 59],
  improved: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  declined: [2, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
};

export type ChangeRow = {
  updated?: string;
  results?: string;
  keyword: string;
  intent: Intent;
  previous: number | null;
  current: number | null;
  diff: "lost" | "new";
  traffic: number;
  pct: string;
  volume: string;
  kd: number;
  cpc: string;
  url: string;
};

export const changeRows: ChangeRow[] = [
  { keyword: "skatteverket hobbyverksamhet", intent: "I", previous: 42, current: null, diff: "lost", traffic: 0, pct: L, volume: "320", kd: 28, cpc: "0.1", url: "rkjh.se/blog/2020/02/03/hobby-eller-foretag/" },
  { keyword: "vad gör en entreprenör", intent: "I", previous: 97, current: null, diff: "lost", traffic: 0, pct: L, volume: "140", kd: 13, cpc: "0", url: "rkjh.se/blog/2020/03/18/who-is-an-entrepreneur-4/" },
  { keyword: "business audit", intent: "I", previous: 13, current: null, diff: "lost", traffic: 0, pct: L, volume: "30", kd: 19, cpc: "0", url: "rkjh.se/blog/tjanster/audit/" },
  { keyword: "business audit", intent: "I", previous: null, current: 19, diff: "new", traffic: 0, pct: L, volume: "30", kd: 18, cpc: "0", url: "rkjh.se/en/blog/tjanster/audit/" },
  { keyword: "vad är återvinning", intent: "I", previous: 75, current: null, diff: "lost", traffic: 0, pct: L, volume: "140", kd: 25, cpc: "0", url: "rkjh.se/blog/2018/03/12/atervinning-och-avfall/" },
];

export const topicKeywords: { keyword: string; intent: Intent; position: number; traffic: number; volume: string; kd: number; url: string }[] = [
  { keyword: "redovisningsbyrå halmstad", intent: "C", position: 3, traffic: 36, volume: "720", kd: 22, url: "rkjh.se/" },
  { keyword: "redovisningskonsult halmstad", intent: "C", position: 8, traffic: 13, volume: "1K", kd: 12, url: "rkjh.se/" },
  { keyword: "revision halmstad", intent: "I", position: 2, traffic: 1, volume: "30", kd: 13, url: "rkjh.se/" },
  { keyword: "ekonomibyrån halmstad", intent: "I", position: 35, traffic: 0, volume: "30", kd: 23, url: "rkjh.se/" },
  { keyword: "revisor halmstad", intent: "C", position: 9, traffic: 0, volume: "40", kd: 8, url: "rkjh.se/" },
  { keyword: "redovisning halmstad", intent: "C", position: 6, traffic: 0, volume: "30", kd: 19, url: "rkjh.se/" },
  { keyword: "bokföring halmstad", intent: "C", position: 40, traffic: 0, volume: "260", kd: 10, url: "rkjh.se/" },
  { keyword: "akridi halmstad", intent: "N", position: 43, traffic: 0, volume: "40", kd: 13, url: "rkjh.se/" },
];
