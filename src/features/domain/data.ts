import { routes } from "@/config/routes";

export const domain = "rkjh.se";

export const databases = ["Worldwide", "US", "UK", "SE"] as const;
export type Db = (typeof databases)[number];

export const moreDatabases = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "India",
  "Norway",
  "Spain",
  "United Arab Emirates",
];

export const devices = ["Desktop", "Mobile"] as const;
export const dates = ["Sep 23, 2026", "Sep 15, 2026", "Aug 15, 2026", "Jul 15, 2026", "Jun 15, 2026", "May 15, 2026", "Apr 15, 2026"] as const;
export const currencies = ["USD", "EUR", "GBP", "SEK", "NOK", "DKK"] as const;

export const aiSummary = {
  visibility: 0,
  mentions: 0,
  cited: 1,
  rows: [
    { name: "ChatGPT", icon: "chatgpt", mentions: 0, cited: 0 },
    { name: "AI Overview", icon: "google", mentions: 0, cited: 1 },
    { name: "AI Mode", icon: "google", mentions: 0, cited: 0 },
    { name: "Gemini", icon: "gemini", mentions: 0, cited: 0 },
  ],
} as const;

export const seoSummary = [
  { label: "Authority Score", value: "8", badge: "Low authority", href: routes.backlinks },
  { label: "Organic Traffic", value: "59", delta: "-9.2%", href: routes.organic.overview },
  { label: "Paid Traffic", value: "0" },
  { label: "Ref.Domains", value: "262", globe: true, href: routes.referringDomains },
  { label: "Traffic Share", value: "9%", share: true, href: routes.organic.competitors },
  { label: "Organic Keywords", value: "134", delta: "-12%", href: routes.organic.positions },
  { label: "Paid Keywords", value: "0" },
  { label: "Backlinks", value: "374", globe: true, href: routes.backlinks },
];

export const trafficShare = [
  { domain: "rkjh.se", color: "#6167e6", pct: 7.3, traffic: 59 },
  { domain: "jbekonomi.com", color: "#3ed4a4", pct: 47.6, traffic: 386 },
  { domain: "ellox.se", color: "#c28bf5", pct: 5.8, traffic: 47 },
  { domain: "accenten.se", color: "#ffb200", pct: 19, traffic: 154 },
  { domain: "palmsredovisning.se", color: "#ff6b70", pct: 20.3, traffic: 165 },
];

export const googleCountries = [
  { name: "Worldwide", flag: null, bar: 1, traffic: 60, keywords: 214 },
  { name: "SE", flag: "SE", bar: 0.98, traffic: 59, keywords: 136 },
  { name: "IN", flag: "IN", bar: 0.02, traffic: 1, keywords: 2 },
  { name: "US", flag: "US", bar: 0, traffic: 0, keywords: 21 },
  { name: "Other", flag: null, bar: 0, traffic: 0, keywords: 55 },
];

export const aiCountries = [
  { name: "Worldwide", flag: null, visibility: 0, mentions: 0 },
  { name: "AE", flag: "AE", visibility: 0, mentions: 0 },
  { name: "AF", flag: "AF", visibility: 0, mentions: 0 },
  { name: "SE", flag: "SE", visibility: 0, mentions: 0 },
] as const;

export const serpDistribution = [
  { label: "Organic", value: 99.3, color: "#6167e6" },
  { label: "AI Overviews", value: 0, color: "#f06ae6" },
  { label: "Other SERP Features", value: 0.7, color: "#6ad96a" },
];

export const keywordLegend = [
  { label: "Top 3", color: "#ffb200" },
  { label: "4-10", color: "#3d3b9c" },
  { label: "11-20", color: "#5d63e0" },
  { label: "21-50", color: "#8f9cf2" },
  { label: "51-100", color: "#b8c3fa" },
  { label: "AI Overviews", color: "#f06ae6" },
  { label: "Other SERP Features", color: "#5dd66a" },
];

export const googleMarkers = [0.063, 0.103, 0.114, 0.232, 0.25, 0.404, 0.746, 0.824, 0.873, 0.95];

export const marketChannels = [
  { label: "Direct", pct: "53%", value: "329K", color: "#6167e6", height: 24 },
  { label: "AI traffic", pct: "37%", value: "229K", color: "#c68cf5", height: 16, ai: true },
  { label: "Referral", pct: "14%", value: "86.8K", color: "#3ed4a4", height: 6 },
  { label: "Organic Search", pct: "15%", value: "93K", color: "#f0313d", height: 6 },
  { label: "Google AI Mode", pct: "15%", value: "93K", color: "#ffb200", height: 6, ai: true },
  { label: "Paid Search", pct: "3%", value: "18.6K", color: "#e03fd8", height: 2 },
  { label: "Other", pct: "21%", value: "130K", color: "#c4c7cf", height: 8 },
];

export type Intent = "C" | "I" | "N" | "T";

export const topKeywords = [
  { keyword: "redovisningsbyrå halmstad", intent: "C" as Intent, pos: "3", volume: "720", cpc: "5.89", traffic: "61.01" },
  { keyword: "redovisningskonsult halmstad", intent: "C" as Intent, pos: "8", volume: "1K", cpc: "10.00", traffic: "22.03" },
  { keyword: "entrepreneur", intent: "I" as Intent, pos: "12", volume: "2.4K", cpc: "1.89", traffic: "11.86" },
  { keyword: "outsourcing redovisning", intent: "I" as Intent, pos: "30", volume: "1.6K", cpc: "6.39", traffic: "1.69" },
  { keyword: "revision halmstad", intent: "I" as Intent, pos: "local", volume: "30", cpc: "2.34", traffic: "1.69" },
];

export const intents = [
  { label: "Informational", pct: "84.7%", share: 84.7, keywords: 116, traffic: 10, color: "#9ba7f5" },
  { label: "Navigational", pct: "3.6%", share: 3.6, keywords: 5, traffic: 0, color: "#c792f5" },
  { label: "Commercial", pct: "9.5%", share: 9.5, keywords: 13, traffic: 49, color: "#eb9000" },
  { label: "Transactional", pct: "2.2%", share: 2.2, keywords: 3, traffic: 0, color: "#00c78f" },
];

export const positionDistribution = [
  { label: "1-3", value: 1.2 },
  { label: "4-10", value: 4 },
  { label: "11-20", value: 12.6 },
  { label: "21-50", value: 58 },
  { label: "51-100", value: 22.5 },
  { label: "SF", value: 0.7 },
];

export const competitors = [
  { domain: "jbekonomi.com", level: 42, common: 5, keywords: 30, traffic: 382, color: "#5a5fd6" },
  { domain: "ellox.se", level: 42, common: 5, keywords: 16, traffic: 45, color: "#3ed4a4" },
  { domain: "ek3hjartan.se", level: 38, common: 5, keywords: 12, traffic: 8, color: "#c28bf5" },
  { domain: "accenten.se", level: 37, common: 4, keywords: 26, traffic: 153, color: "#ffb200" },
  { domain: "palmsredovisning.se", level: 38, common: 5, keywords: 25, traffic: 163, color: "#ff6b70" },
];

export const selfPoint = { domain: "rkjh.se", keywords: 134, traffic: 59, color: "#b3bcf7" };

export const backlinkRows = [
  { title: "bobbyfraherc", url: "https://bobbyfraherc.blogspot.com/", anchor: "rkjh.se", target: "https://rkjh.se/", type: "nofollow" },
  { title: "sleagueasenm", url: "https://sleagueasenm.blogspot.com/", anchor: "https://rkjh.se/", target: "https://rkjh.se/", type: "nofollow" },
  { title: "Sites like rkjh.se – Similar Websites to rkjh.se", url: "https://www.sitelike.org/similar/rkjh.se/", anchor: "rkjh.se", target: "https://www.rkjh.se/", type: "nofollow" },
  { title: "Dlig+KOST - Search Images", url: "https://4.bing.com/images/search?q=Dlig%2bKOST", anchor: "rkjh.se", target: "http://rkjh.se/kost-2/", type: "follow" },
  { title: "Revisionskonsulterna J Hägglund | Brand assets", url: "https://brandfetch.com/rkjh.se", anchor: "rkjh.se", target: "https://rkjh.se/", type: "follow" },
];

export const followSplit = { follow: 274, nofollow: 100 };

export const backlinkTypes = [
  { label: "Text", pct: 98, count: 353 },
  { label: "Image", pct: 2, count: 6 },
  { label: "Form", pct: 0, count: 0 },
  { label: "Frame", pct: 0, count: 0 },
];

export const anchors = [
  { anchor: "rkjh.se", domains: 152, backlinks: 221 },
  { anchor: "high quality dofollow backlinks for seo", domains: 59, backlinks: 67 },
  { anchor: "<EmptyAnchor>", domains: 8, backlinks: 26, empty: true },
  { anchor: "trusted dofollow link building services", domains: 25, backlinks: 25 },
  { anchor: "https://rkjh.se/", domains: 3, backlinks: 5 },
];

export const refDomains = [
  { domain: "egetbolag.se", flag: "NO", ip: "91.189.123.141", backlinks: 16 },
  { domain: "selling.com", flag: "US", ip: "18.67.76.80", backlinks: 9 },
  { domain: "factmags.com", flag: "US", ip: "203.161.54.114", backlinks: 6 },
  { domain: "goooogla.com", flag: "US", ip: "203.161.54.114", backlinks: 4 },
  { domain: "portailorange.net", flag: null, ip: "172.67.167.49", backlinks: 4 },
];

export const indexedPages = [
  { title: "Redovisningsbyrå i Halmstad | Revisionskonsulterna J Hägglund", url: "https://rkjh.se/", domains: 119, backlinks: 240 },
  { title: "-", url: "http://rkjh.se/", domains: 36, backlinks: 58 },
  { title: "-", url: "https://www.rkjh.se/", domains: 3, backlinks: 6 },
  { title: "-", url: "http://www.rkjh.se/", domains: 2, backlinks: 4 },
  { title: "-", url: "http://rkjh.se/kost-2/", domains: 1, backlinks: 2 },
];

export const periods = ["Past 3 Months", "Past 6 Months", "Season over Season", "Quarter over Quarter", "Year over Year"] as const;

export const growthSummary = [
  { period: "October – March", color: "#a55ff2", rank: "642K", traffic: "7", backlinks: "302", refDomains: "155", paid: "0" },
  { period: "April – September", color: "#6167e6", rank: "267.2K", traffic: "59", backlinks: "314", refDomains: "198", paid: "0" },
];

export const growthRow = { rank: "-374,832", traffic: "+742.9%", backlinks: "+4%", refDomains: "+27.7%", paid: "0%" };

export const growthLabels = ["Oct / Apr", "Nov / May", "Dec / Jun", "Jan / Jul", "Feb / Aug", "Mar / Sep"];

export const growthCharts = [
  {
    title: "Organic Traffic",
    value: "59",
    delta: "+742.9%",
    kind: "line" as const,
    a: [7.6, 5, 11.5, 26, 23, 7],
    b: [111.6, 120, 94, 105.4, 65, 59],
    right: [0, 30, 60, 90, 120],
  },
  {
    title: "Organic Keywords",
    value: "134",
    delta: "-52%",
    kind: "bar" as const,
    a: [157, 208, 263, 284, 306, 279],
    b: [222, 253, 277, 210, 149, 134],
    right: [0, 76.5, 153, 229.5, 306],
  },
  {
    title: "Organic Traffic Cost",
    value: "365",
    delta: "+3,218.2%",
    kind: "line" as const,
    a: [7.9, 12.1, 11.9, 89.9, 90.8, 11],
    b: [704, 723, 585, 612, 373, 365],
    right: [0, 180.8, 361.5, 542.3, 723],
  },
];

export const paidGrowthCharts = [
  { title: "Paid Traffic", value: "0", delta: "0%" },
  { title: "Paid Keywords", value: "0", delta: "0%" },
  { title: "Paid Traffic Cost", value: "0", delta: "0%" },
];

export const topPositionChanges = [
  { label: "Top 1-3", value: 2, delta: "+1", data: [4, 6, 3, 3, 1, 1] },
  { label: "Top 4-10", value: 6, delta: "0", data: [2, 1, 5, 7, 2, 2] },
  { label: "Top 11-20", value: 17, delta: "-4", data: [3, 7, 8, 6, 1, 0] },
];

export const growthPositions = [
  { label: "1-3", a: 1, b: 2 },
  { label: "4-10", a: 5, b: 5 },
  { label: "11-20", a: 20, b: 17 },
  { label: "21-50", a: 96, b: 77 },
  { label: "51-100", a: 149, b: 29 },
];

export const trafficByCountry = [
  { country: "Sweden", flag: "SE", aPct: "100%", a: "7", bPct: "98%", b: "59", diff: "+742.9%" },
  { country: "India", flag: "IN", aPct: "0%", a: "0", bPct: "2%", b: "1", diff: "+100%" },
  { country: "United States", flag: "US", aPct: "0%", a: "0", bPct: "0%", b: "0", diff: "0%" },
  { country: "Norway", flag: "NO", aPct: "0%", a: "0", bPct: "0%", b: "0", diff: "0%" },
  { country: "Vietnam", flag: "VN", aPct: "0%", a: "0", bPct: "0%", b: "0", diff: "0%" },
  { country: "Other", flag: null, aPct: "0%", a: "0", bPct: "0%", b: "0", diff: "0%" },
];

export type TopPage = {
  url: string;
  traffic: number;
  diff?: number;
  pct: string;
  keywords: number;
  prompts: number;
  refDomains: number;
  keyword?: string;
  intent?: Intent;
};

const zero = (url: string, keywords: number): TopPage => ({ url, traffic: 0, pct: "< 0.01", keywords, prompts: 0, refDomains: 0 });

export const topPages: TopPage[] = [
  { url: "rkjh.se/", traffic: 50, pct: "84.74", keywords: 11, prompts: 0, refDomains: 213, keyword: "redovisningsbyrå halmstad", intent: "C" },
  { url: "rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-defining-entrepreneurship/", traffic: 7, diff: -5, pct: "11.86", keywords: 1, prompts: 0, refDomains: 0, keyword: "entrepreneur", intent: "I" },
  { url: "rkjh.se/blog/tjanster/outsourcing/", traffic: 1, pct: "1.69", keywords: 1, prompts: 0, refDomains: 0 },
  { url: "rkjh.se/", traffic: 1, pct: "1.69", keywords: 1, prompts: 0, refDomains: 41, keyword: "revision halmstad", intent: "I" },
  zero("rkjh.se/project/lilluns-agg/", 0),
  zero("rkjh.se/kurser/", 1),
  zero("rkjh.se/blog/2018/07/30/kost-2/", 7),
  zero("rkjh.se/blog/2020/02/03/bilda-eller-kopa-aktiebolag/", 4),
  zero("rkjh.se/blog/2019/11/04/vad-ar-ett-bokslut/", 3),
  zero("rkjh.se/tjanster/redovisning/", 2),
  zero("rkjh.se/tjanster/bokslut-och-arsredovisning/", 2),
  zero("rkjh.se/tjanster/lon/", 1),
  zero("rkjh.se/om-oss/", 1),
  zero("rkjh.se/kontakt/", 1),
  zero("rkjh.se/blog/2021/01/12/deklaration-for-enskild-firma/", 3),
  zero("rkjh.se/blog/2019/05/21/moms-for-nystartade-foretag/", 2),
  zero("rkjh.se/blog/2020/06/08/starta-eget-checklista/", 2),
  zero("rkjh.se/en/", 1),
  zero("rkjh.se/en/services/", 1),
  zero("rkjh.se/blog/2018/09/14/representation-och-avdrag/", 1),
  zero("rkjh.se/blog/2021/03/02/friskvardsbidrag-2021/", 2),
  zero("rkjh.se/blog/2019/02/18/foretagsbil-eller-privat-bil/", 1),
  zero("rkjh.se/project/kaffebaren/", 0),
  zero("rkjh.se/project/halmstad-bygg/", 0),
  zero("rkjh.se/blog/2020/09/22/k2-eller-k3/", 2),
  zero("rkjh.se/blog/2018/12/03/julklapp-till-anstallda/", 1),
  zero("rkjh.se/blog/2022/04/11/revisor-eller-redovisningskonsult/", 3),
  zero("rkjh.se/blog/2019/08/26/periodiseringsfond/", 1),
  zero("rkjh.se/blog/2020/11/16/utdelning-3-12-reglerna/", 2),
  zero("rkjh.se/blog/events/frukostseminarium-skatt/", 1),
  zero("rkjh.se/kurser/bokforing-grund/", 1),
  zero("rkjh.se/kurser/excel-for-ekonomer/", 1),
  zero("rkjh.se/blog/2018/03/05/kvitton-och-verifikationer/", 1),
  zero("rkjh.se/blog/2021/06/28/semesterersattning/", 1),
  zero("rkjh.se/blog/2019/10/07/traktamente/", 2),
  zero("rkjh.se/tjanster/radgivning/", 1),
  zero("rkjh.se/tjanster/skattedeklaration/", 1),
  zero("rkjh.se/blog/2020/04/14/korttidspermittering/", 1),
  zero("rkjh.se/blog/2022/01/31/digital-bokforing/", 1),
  zero("rkjh.se/blog/2018/05/22/gdpr-for-smaforetag/", 1),
  zero("rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-2/", 1),
  zero("rkjh.se/en/blog/2020/03/18/who-is-an-entrepreneur-3/", 1),
  zero("rkjh.se/project/cafe-tylosand/", 0),
  zero("rkjh.se/blog/2019/03/25/bokforing-av-leasing/", 1),
  zero("rkjh.se/blog/2021/09/13/arbetsgivaravgifter/", 1),
  zero("rkjh.se/blog/2020/08/03/rot-och-rut/", 1),
  zero("rkjh.se/blog/2018/10/29/eget-aktiebolag/", 1),
  zero("rkjh.se/blog/2019/12/16/bokslutsdispositioner/", 1),
  zero("rkjh.se/blog/2021/11/22/inventering/", 1),
  zero("rkjh.se/blog/2022/06/07/f-skatt/", 1),
  zero("rkjh.se/blog/2018/01/15/nytt-ar-nya-regler/", 1),
  zero("rkjh.se/blog/2020/01/20/momsregistrering/", 1),
  zero("rkjh.se/blog/2019/06/10/handelsbolag/", 1),
  zero("rkjh.se/jobb/", 0),
  zero("rkjh.se/integritetspolicy/", 0),
  zero("rkjh.se/blog/2021/05/03/ekonomisk-forening/", 1),
  zero("rkjh.se/blog/2022/02/14/lonebesked/", 1),
  zero("rkjh.se/blog/2019/04/01/kassaregister/", 1),
  zero("rkjh.se/blog/2020/10/05/kontantmetoden/", 1),
  zero("rkjh.se/blog/2018/06/18/sponsring/", 1),
  zero("rkjh.se/blog/2021/08/16/avskrivningar/", 1),
  zero("rkjh.se/blog/2022/05/09/koncernbidrag/", 1),
  zero("rkjh.se/blog/2020/05/25/firmatecknare/", 1),
  zero("rkjh.se/blog/2019/03/12/bo-sverige-och-arbeta-danmark/", 2),
  zero("rkjh.se/blog/events/lasa-och-forsta-bokslut/", 14),
  zero("rkjh.se/blog/2020/03/18/who-is-an-entrepreneur-4/", 1),
];

export const backlinkSummary = [
  { label: "Referring Domains", value: "263", delta: "+33%", href: routes.referringDomains },
  { label: "Backlinks", value: "375", delta: "+19%", href: routes.backlinks },
  { label: "Monthly Visits", value: "n/a" },
  { label: "Organic Traffic", value: "60", chevron: true, href: routes.organic.overview },
  { label: "Outbound Domains", value: "34" },
];

export const backlinkTabs = ["Overview", "Backlinks", "Network Graph", "Anchors", "Indexed Pages", "Outbound Domains", "Bulk Analysis"];

export const authorityTrend = [7, 6, 7, 7, 7, 7, 7, 8, 8, 9, 8, 8];

export const newLostDomains = {
  labels: ["Oct 2025", "Nov", "Dec", "Jan 2026", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  newD: [6, 9, 4, 12, 8, 5, 22, 18, 11, 9, 14, 7],
  lostD: [3, 4, 2, 6, 5, 3, 7, 9, 6, 4, 8, 5],
};

export const refDomainsTrend = [155, 158, 160, 166, 171, 174, 190, 205, 221, 236, 250, 263];
export const backlinksTrend = [288, 292, 295, 302, 306, 310, 322, 334, 346, 358, 368, 375];

export const categories = [
  { label: "Business & Industrial / Accounting & Auditing", pct: 21 },
  { label: "Internet & Telecom / Web Services", pct: 14 },
  { label: "Arts & Entertainment / Online Media", pct: 9 },
  { label: "Business & Industrial / Advertising & Marketing", pct: 7 },
  { label: "Computers & Electronics / Software", pct: 5 },
];

export const tldDistribution = [
  { label: ".com", pct: 58, color: "#6167e6" },
  { label: ".se", pct: 14, color: "#3ed4a4" },
  { label: ".net", pct: 9, color: "#ffb200" },
  { label: ".org", pct: 6, color: "#ff6b70" },
  { label: "Others", pct: 13, color: "#c4c7cf" },
];
