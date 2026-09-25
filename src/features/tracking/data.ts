import { routes } from "@/config/routes";

export const project = {
  domain: "www.rkjh.se",
  keywords: 89,
  location: "Sweden",
  engine: "Google",
  language: "Swedish",
  device: "Desktop",
  updated: "17h ago",
  period: "Sep 17-24, 2026",
  periodLong: "Sep 17 – 24, 2026",
};

export type TrackingTab =
  | "landscape"
  | "overview"
  | "rankingsDistribution"
  | "tags"
  | "pages"
  | "cannibalization"
  | "competitorsDiscovery"
  | "devicesLocations"
  | "featuredSnippets";

const t = routes.tracking;

export const trackingTabs: { key: TrackingTab; label: string; href: string }[] = [
  { key: "landscape", label: "Landscape", href: t.landscape },
  { key: "overview", label: "Overview", href: t.overview },
  { key: "rankingsDistribution", label: "Rankings Distribution", href: t.rankingsDistribution },
  { key: "tags", label: "Tags", href: t.tags },
  { key: "pages", label: "Pages", href: t.pages },
  { key: "cannibalization", label: "Cannibalization", href: t.cannibalization },
  { key: "competitorsDiscovery", label: "Competitors Discovery", href: t.competitorsDiscovery },
  { key: "devicesLocations", label: "Devices & Locations", href: t.devicesLocations },
  { key: "featuredSnippets", label: "Featured Snippets", href: t.featuredSnippets },
];

export const days = ["Sep 17", "Sep 18", "Sep 19", "Sep 20", "Sep 21", "Sep 22", "Sep 23", "Sep 24"];

export type Intent = "I" | "C" | "T" | "N" | "n/a";

export type TrackedKeyword = {
  keyword: string;
  intent: Intent;
  sf: number;
  kd: number;
  potTraffic: number;
  volume: number;
};

const raw: [string, Intent, number, number, number, number][] = [
  ["anstånd deklaration dödsbo", "n/a", 5, 25, 0, 30],
  ["arbetsgivaravgift på förmån", "I", 3, 40, 0, 50],
  ["arbetskläder avdragsgillt", "I", 4, 20, 0, 90],
  ["att vara entreprenör", "I", 5, 18, 0, 40],
  ["avdrag deklaration dödsbo", "I", 1, 18, 0, 20],
  ["avdrag gåvor", "I", 4, 19, 0.01, 110],
  ["begränsad miljöpåverkan", "I", 4, 14, 0, 30],
  ["bokföra hyra av lokal", "I", 4, 12, 0, 40],
  ["bokföra representation", "I", 5, 21, 0, 170],
  ["bokföring enskild firma", "I", 6, 33, 0, 320],
  ["bokslut enskild firma", "I", 5, 27, 0, 210],
  ["bolagsskatt", "I", 5, 29, 0, 590],
  ["bouppteckning dödsbo", "I", 4, 22, 0, 480],
  ["deklaration dödsbo", "I", 5, 24, 0, 260],
  ["deklarera försäljning av bostadsrätt", "I", 6, 29, 0, 140],
  ["digital bokföring", "C", 4, 38, 0, 90],
  ["dödsbo skatt", "I", 3, 17, 0, 70],
  ["ekonomisk förening", "I", 5, 31, 0, 880],
  ["enskild firma eller aktiebolag", "I", 6, 26, 0, 590],
  ["enskild näringsidkare", "I", 5, 35, 0, 1000],
  ["esg rapportering", "I", 4, 19, 0, 50],
  ["f-skatt", "I", 6, 44, 0, 2400],
  ["fakturering enskild firma", "I", 4, 18, 0, 140],
  ["förenklat årsbokslut", "I", 4, 16, 0, 110],
  ["företagsekonomi", "I", 5, 24, 0, 320],
  ["förmånsvärde bil", "I", 5, 41, 0, 1300],
  ["gåva till anställda", "I", 5, 23, 0, 210],
  ["handelsbolag", "I", 6, 37, 0, 1600],
  ["hur fungerar moms", "I", 5, 18, 0, 90],
  ["hållbarhetsrapport", "I", 4, 21, 0, 170],
  ["ideell förening skatt", "I", 4, 13, 0, 90],
  ["inkomstdeklaration", "I", 6, 45, 0, 1900],
  ["internkontroll", "I", 4, 15, 0, 260],
  ["julbord skatt", "I", 4, 15, 0, 110],
  ["k10 blankett", "I", 5, 34, 0.01, 720],
  ["k2 eller k3", "I", 5, 12, 0, 140],
  ["kapitalvinst", "I", 5, 26, 0, 480],
  ["kassaregister", "C", 6, 29, 0, 390],
  ["koncernredovisning", "I", 4, 14, 0, 110],
  ["kontrollbalansräkning", "I", 4, 13, 0, 170],
  ["kostnadsersättning", "I", 5, 17, 0, 140],
  ["kvalificerade andelar", "I", 4, 16, 0, 90],
  ["lagerredovisning", "I", 3, 11, 0, 40],
  ["likvidation aktiebolag", "I", 5, 28, 0, 320],
  ["lönebesked", "I", 6, 27, 0, 590],
  ["löneväxling pension", "I", 5, 22, 0, 210],
  ["milersättning", "I", 5, 36, 0, 1300],
  ["momsdeklaration", "I", 6, 39, 0, 880],
  ["momsregistrering", "I", 5, 25, 0, 170],
  ["nystartat företag", "I", 5, 21, 0, 170],
  ["näringsbidrag", "I", 3, 12, 0, 30],
  ["omvänd skattskyldighet", "I", 5, 26, 0, 480],
  ["periodiseringsfond", "I", 5, 24, 0, 590],
  ["personalfest skatt", "I", 4, 15, 0, 70],
  ["preliminärskatt", "I", 6, 31, 0, 1000],
  ["redovisningsbyrå", "C", 6, 42, 0, 880],
  ["redovisningskonsult", "C", 5, 38, 0, 480],
  ["representation avdrag", "I", 5, 20, 0, 260],
  ["resultaträkning", "I", 5, 33, 0, 720],
  ["revisionsberättelse", "I", 4, 19, 0, 320],
  ["revisor aktiebolag", "C", 5, 30, 0, 170],
  ["revisor stockholm", "C", 6, 35, 0, 140],
  ["räntefördelning", "I", 4, 14, 0, 110],
  ["sidoinkomst skatt", "I", 5, 21, 0, 210],
  ["sjuklöneansvar", "I", 4, 17, 0, 90],
  ["skatt på utdelning", "I", 5, 34, 0, 590],
  ["skatteavdrag", "I", 5, 27, 0, 320],
  ["skattefri förmån", "I", 5, 23, 0, 170],
  ["skattereduktion", "I", 6, 40, 0, 880],
  ["skattetabell", "I", 6, 48, 0, 2900],
  ["sociala avgifter", "I", 5, 32, 0, 1000],
  ["starta aktiebolag", "I", 6, 46, 0, 1600],
  ["starta eget", "I", 6, 43, 0, 2400],
  ["sälja enskild firma", "I", 4, 16, 0, 110],
  ["särskild löneskatt", "I", 5, 29, 0, 480],
  ["tillväxtbolag", "I", 3, 11, 0, 50],
  ["tjänstebil förmån", "I", 5, 22, 0, 140],
  ["traktamente", "I", 6, 37, 0, 1600],
  ["uppskov vinstskatt", "I", 5, 25, 0, 320],
  ["utdelning aktiebolag", "I", 5, 30, 0, 720],
  ["utländsk inkomst deklaration", "I", 4, 18, 0, 90],
  ["vad är bokföring", "I", 5, 17, 0, 260],
  ["vad är bokslut", "I", 5, 15, 0, 210],
  ["vad är ekonomistyrning", "I", 4, 13, 0, 90],
  ["vad är ett dödsbo", "I", 5, 20, 0, 320],
  ["vad är f-skatt", "I", 5, 26, 0, 480],
  ["vad är förmånsvärde", "I", 5, 19, 0, 170],
  ["vad är hållbarhetsredovisning", "I", 6, 16, 0, 260],
  ["vad är utpressning", "I", 5, 12, 0.01, 170],
];

export const trackedKeywords: TrackedKeyword[] = raw.map(([keyword, intent, sf, kd, potTraffic, volume]) => ({ keyword, intent, sf, kd, potTraffic, volume }));

export const kdColor = (kd: number) =>
  kd < 15 ? "#009f81" : kd < 30 ? "#59ddaa" : kd < 50 ? "#fdc23c" : kd < 70 ? "#ff8c43" : kd < 85 ? "#ff4953" : "#d1002f";

type Competitor = {
  domain: string;
  legendDiff: string;
  visibility: string;
  visNum: number;
  visDiff: string;
  traffic: string;
  trafficDiff: string;
  keywords: number;
  avgPos: string;
  spread: string;
  color: string;
  x: number;
  y: number;
};

export const competitors: Competitor[] = [
  { domain: "www.skatteverket.se", legendDiff: "+4.96", visibility: "51.194%", visNum: 51.19, visDiff: "+4.961", traffic: "119.11", trafficDiff: "+4.44", keywords: 54, avgPos: "41.37", spread: "47.84", color: "#5c5fd6", x: 54, y: 41.4 },
  { domain: "verksamt.se", legendDiff: "+12.94", visibility: "15.5%", visNum: 15.5, visDiff: "+12.941", traffic: "41.75", trafficDiff: "+38.15", keywords: 34, avgPos: "70.30", spread: "40.41", color: "#3ddc9c", x: 34, y: 70.3 },
  { domain: "www.fortnox.se", legendDiff: "-0.5", visibility: "13.633%", visNum: 13.63, visDiff: "-0.505", traffic: "29.56", trafficDiff: "+0.78", keywords: 43, avgPos: "59.71", spread: "43.63", color: "#b77ef2", x: 43, y: 59.7 },
  { domain: "www.bokio.se", legendDiff: "+1.1", visibility: "11.841%", visNum: 11.84, visDiff: "+1.098", traffic: "39.19", trafficDiff: "+0.48", keywords: 21, avgPos: "80.87", spread: "36.35", color: "#f5b800", x: 21, y: 80.9 },
  { domain: "www.spiris.se", legendDiff: "-2.15", visibility: "11.285%", visNum: 11.29, visDiff: "-2.145", traffic: "21.23", trafficDiff: "-21.77", keywords: 40, avgPos: "62.97", spread: "43.38", color: "#f8646b", x: 40, y: 63 },
  { domain: "bjornlunden.com", legendDiff: "-0.09", visibility: "10.63%", visNum: 10.63, visDiff: "-0.094", traffic: "29.15", trafficDiff: "+0.10", keywords: 30, avgPos: "73.76", spread: "39.91", color: "#b0b5f7", x: 30, y: 73.8 },
  { domain: "www.speedledger.se", legendDiff: "+0.87", visibility: "8.269%", visNum: 8.27, visDiff: "+0.866", traffic: "37.85", trafficDiff: "+0.89", keywords: 17, avgPos: "83.90", spread: "34.01", color: "#ee58d6", x: 17, y: 83.9 },
  { domain: "www4.skatteverket.se", legendDiff: "-2.88", visibility: "7.561%", visNum: 7.56, visDiff: "-2.879", traffic: "17.87", trafficDiff: "-22.75", keywords: 44, avgPos: "66.34", spread: "38.91", color: "#58c75a", x: 44, y: 66.3 },
  { domain: "sv.wikipedia.org", legendDiff: "+2.78", visibility: "7.394%", visNum: 7.39, visDiff: "+2.781", traffic: "9.70", trafficDiff: "+2.63", keywords: 25, avgPos: "80.74", spread: "33.76", color: "#4a47a8", x: 25, y: 80.7 },
  { domain: "www.far.se", legendDiff: "-0.07", visibility: "6.178%", visNum: 6.18, visDiff: "-0.071", traffic: "9.95", trafficDiff: "-2.20", keywords: 15, avgPos: "86.02", spread: "31.83", color: "#27c28a", x: 15, y: 86 },
];

export const serpFeatureBars: { tracking: number; notTracking: number }[] = [
  { tracking: 0, notTracking: 0 },
  { tracking: 5, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 74, notTracking: 0 },
  { tracking: 83, notTracking: 0 },
  { tracking: 21, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 19, notTracking: 0 },
  { tracking: 65, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 82 },
  { tracking: 0, notTracking: 11 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 1 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 3 },
  { tracking: 0, notTracking: 26 },
  { tracking: 0, notTracking: 0 },
  { tracking: 0, notTracking: 0 },
];

const latestExtra: TrackedKeyword[] = [
  { keyword: "beskattningsbar förvärvsinkomst", intent: "n/a", sf: 6, kd: 16, potTraffic: 0, volume: 110 },
  { keyword: "betala lön till utlandet", intent: "I", sf: 4, kd: 13, potTraffic: 0, volume: 50 },
];
const latestLow = ["anstånd deklaration dödsbo", "arbetsgivaravgift på förmån"];
const latestDropped = ["vad är utpressning", "tillväxtbolag"];
const latestSf: Record<string, number> = { "avdrag deklaration dödsbo": 4 };

export const latestKeywords: (TrackedKeyword & { potVis: number })[] = [...trackedKeywords.filter((k) => !latestDropped.includes(k.keyword)), ...latestExtra]
  .map((k) => ({ ...k, sf: latestSf[k.keyword] ?? k.sf, potVis: latestLow.includes(k.keyword) ? 0.003 : 0.006 }))
  .sort((a, b) => b.potVis - a.potVis || a.keyword.localeCompare(b.keyword, "sv"));

export const onSerp: Record<string, string[]> = {
  "arbetskläder avdragsgillt": ["People also ask", "Site link", "Related searches", "AI Overview"],
};
