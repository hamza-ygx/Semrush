import { routes } from "@/config/routes";

export const project = {
  domain: "www.rkjh.se",
  name: "www.rkjh.se",
};

export type WidgetId =
  | "ai"
  | "seo"
  | "pt"
  | "sa"
  | "opsc"
  | "ba"
  | "oti"
  | "ta"
  | "tp"
  | "or"
  | "bl"
  | "gsc";

export const widgetTitles: Record<WidgetId, string> = {
  ai: "AI Search",
  seo: "SEO",
  pt: "Position Tracking",
  sa: "Site Audit",
  opsc: "On Page SEO Checker",
  ba: "Backlink Audit",
  oti: "Organic Traffic Insights",
  ta: "Traffic Analytics",
  tp: "Top pageviews",
  or: "Organic Rankings",
  bl: "Backlinks",
  gsc: "Google Search Console",
};

export const aiSearch = {
  visibility: 0,
  mentions: 0,
  cited: 1,
  rows: [
    { key: "chatgpt", label: "ChatGPT", mentions: 0, cited: 0 },
    { key: "aio", label: "AI Overview", mentions: 0, cited: 1 },
    { key: "aimode", label: "AI Mode", mentions: 0, cited: 0 },
    { key: "gemini", label: "Gemini", mentions: 0, cited: 0 },
  ],
};

export const seoWidget = {
  date: "Sep 23, 2026",
  authorityScore: 8,
  authorityDelta: "0",
  rank: "267K",
  organicTraffic: "59",
  organicTrafficDelta: "-9.23%",
  organicTrafficSpark: [60, 60, 23, 23, 23, 15, 15, 15, 15, 23, 23, 23, 23, 15, 15, 15, 15, 10],
  organicKeywords: "134",
  organicKeywordsDelta: "-12.42%",
  organicKeywordsSpark: [55, 58, 52, 50, 47, 45, 43, 40, 38, 35, 33, 30, 26, 22, 20, 28, 30, 22],
  paidKeywords: "0",
  paidKeywordsPct: "0%",
  paidTraffic: "0",
  refDomains: "261",
  refDomainsDelta: "+31.82%",
  backlinks: "373",
};

export const ptWidget = {
  updated: "Updated: 16 hours ago",
  range: "Sep 18 – Sep 24, 2026",
  location: "Sweden (Google) • Swedish",
  visibility: "0%",
  buckets: ["Top 3", "Top 10", "Top 20", "Top 100"],
  keywords: [
    "anstånd deklaration dödsbo",
    "arbetsgivaravgift på förmån",
    "arbetskläder avdragsgillt",
    "att vara entreprenör",
    "avdrag deklaration dödsbo",
    "avdrag gåvor",
  ],
};

export const periods = ["last 2 days", "last 7 days", "last 30 days", "last 60 days", "last 90 days"] as const;

export const siteAudit = {
  updated: "Updated: Wed, Jul 22, 2026",
  health: 82,
  errors: "16",
  warnings: "1,099",
  crawled: "100",
  crawledBar: [
    { value: 12, color: "#3ee3b6" },
    { value: 3, color: "#ff6b70" },
    { value: 83, color: "#ffb400" },
    { value: 2, color: "#b1c0ff" },
  ],
};

export const promos = [
  { id: "opsc" as const, title: "On Page SEO Checker", text: "Collect ideas on strategy, content, backlinks and more.", href: routes.onPageSeoChecker },
  { id: "ba" as const, title: "Backlink Audit", text: "Detoxify your backlink portfolio and strengthen your website rankings.", href: routes.backlinkAudit },
  { id: "oti" as const, title: "Organic Traffic Insights", text: "Uncover “not provided” keywords combining GA, GSC and {brand} data.", href: routes.organicTrafficInsights },
];

export const gaSource = "Google Analytics: WWW.rkjh.se/rkjh.se - GA4";
export const gaRange = "Aug 25 - Sep 23, 2026";

export const trafficMetrics = [
  { label: "Users", value: "820", delta: "-27.94%" },
  { label: "Sessions", value: "1K", delta: "-20.36%" },
  { label: "Engaged Sessions", value: "455", delta: "-19.61%" },
  { label: "Avg. engagement time", value: "00:00:11", delta: "-68.92%" },
  { label: "Engaged Sessions P...", value: "0.55", delta: "+11.56%" },
  { label: "Engagement rate", value: "44.22%", delta: "+0.94%" },
];

export const trafficDays = [
  "Aug 25", "Aug 26", "Aug 27", "Aug 28", "Aug 29", "Aug 30", "Aug 31", "Sep 1", "Sep 2", "Sep 3",
  "Sep 4", "Sep 5", "Sep 6", "Sep 7", "Sep 8", "Sep 9", "Sep 10", "Sep 11", "Sep 12", "Sep 13",
  "Sep 14", "Sep 15", "Sep 16", "Sep 17", "Sep 18", "Sep 19", "Sep 20", "Sep 21", "Sep 22", "Sep 23",
];

export const trafficSeries = [
  { name: "Direct", color: "#5a55d0", data: [33, 14, 4, 3, 4, 3, 4, 15, 28, 13, 7, 4, 2, 1, 7, 26, 11, 3, 4, 7, 11, 35, 16, 8, 10, 3, 5, 12, 29, 11] },
  { name: "Referral", color: "#3ee3b6", data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3] },
  { name: "Organic Search", color: "#e3232f", data: [1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 3, 3, 2, 1, 2, 1, 1, 1, 2, 3, 1, 1, 1, 1, 3, 2, 1] },
  { name: "Organic Social", color: "#ff9a9a", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Paid Search", color: "#d42dd6", data: [0, 1, 2, 1, 3, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0] },
  { name: "Display", color: "#a8b2f7", data: [19, 21, 8, 11, 7, 14, 8, 7, 10, 13, 9, 11, 10, 7, 12, 12, 11, 10, 11, 17, 13, 20, 11, 13, 9, 10, 13, 13, 18, 16] },
  { name: "Custom", color: "#9ef2c9", data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
];

export const referralGap = { from: 18, peak: 22, to: 26, value: 113 };

export const topPageviews = {
  total: { pageviews: "1,372", users: "820", time: "00:11", entrances: "1,029", rate: "44.22%" },
  rows: [
    { page: "/event/", pageviews: "579", users: "325", time: "00:05", entrances: "450", rate: "41.78%" },
    { page: "/", pageviews: "267", users: "165", time: "00:11", entrances: "216", rate: "56.94%" },
    { page: "/blog/events/40-arsjubileum/", pageviews: "41", users: "20", time: "00:35", entrances: "35", rate: "54.29%" },
    { page: "/kontakta-oss/", pageviews: "23", users: "22", time: "00:11", entrances: "24", rate: "83.33%" },
    { page: "/om-oss/", pageviews: "22", users: "20", time: "00:39", entrances: "21", rate: "90.48%" },
    { page: "/vara-tjanster/", pageviews: "17", users: "12", time: "00:21", entrances: "15", rate: "80%" },
    { page: "/blog/events/starta-eget/", pageviews: "13", users: "8", time: "00:25", entrances: "9", rate: "88.89%" },
  ],
};

export const refDomainsTrend = {
  labels: ["Oct 25", "", "Dec 25", "", "Feb 26", "", "Apr 26", "", "Jun 26", "", "Aug 26", ""],
  data: [160, 153, 162, 170, 147, 155, 159, 162, 167, 169, 198, 261],
};

export const refDomainsByAS = [
  { range: "81-100", pct: "0.38%", count: 1, value: 0.38, color: "#3ee3b6" },
  { range: "61-80", pct: "0.38%", count: 1, value: 0.38, color: "#6167e6" },
  { range: "41-60", pct: "0.38%", count: 1, value: 0.38, color: "#6167e6" },
  { range: "21-40", pct: "3.07%", count: 8, value: 3.07, color: "#6167e6" },
  { range: "0-20", pct: "95.79%", count: 250, value: 95.79, color: "#6167e6" },
];

export const countries = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Cambodia", "Canada",
  "Chile", "Colombia", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Ecuador", "Egypt", "Estonia",
  "Finland", "France", "Germany", "Greece", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland",
  "Israel", "Italy", "Japan", "Latvia", "Lithuania", "Mexico", "Netherlands", "New Zealand", "Norway", "Poland",
  "Portugal", "Romania", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "Spain", "Sweden", "Switzerland",
  "Turkey", "Ukraine", "United Kingdom", "United States",
];
