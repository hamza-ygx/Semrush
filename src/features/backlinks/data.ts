import type { Tone } from "./ui";

export const domain = "rkjh.se";

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const relTimes = ["1h ago", "2h ago", "5h ago", "11h ago", "12h ago", "Yesterday", "2d ago", "3d ago", "4d ago", "5d ago", "6d ago", "7d ago", "8d ago", "11d ago", "12d ago", "13d ago"];

function dateOf(r: () => number, from: number, to: number) {
  const t = from + Math.floor(r() * (to - from));
  const y = 2019 + Math.floor(t / 365);
  const d = t % 365;
  return `${months[Math.min(11, Math.floor(d / 30.5))]} ${1 + (d % 28)}, ${y}`;
}

export const summary = [
  { label: "Referring Domains", value: "265", delta: "+34%", w: 158 },
  { label: "Backlinks", value: "377", delta: "+20%", w: 116 },
  { label: "Monthly Visits", value: "n/a", w: 145 },
  { label: "Organic Traffic", value: "60", chevron: true, w: 150 },
  { label: "Outbound Domains", value: "34", w: 180 },
];

export const authorityTrend = [7, 6, 7, 7, 7, 7, 7, 8, 8, 9, 8];

export const trendMonths = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026"];

export const organicDbs = [
  { name: "Sweden", flag: "SE", v: 59 },
  { name: "India", flag: "IN", v: 1 },
  { name: "United Arab Emirates", flag: "AE", v: 0 },
  { name: "Afghanistan", flag: "AF", v: 0 },
  { name: "Australia", flag: "AU", v: 0 },
  { name: "Canada", flag: "CA", v: 0 },
  { name: "Germany", flag: "DE", v: 0 },
  { name: "Denmark", flag: "DK", v: 0 },
  { name: "Spain", flag: "ES", v: 0 },
  { name: "France", flag: "FR", v: 0 },
  { name: "United Kingdom", flag: "GB", v: 0 },
  { name: "Netherlands", flag: "NL", v: 0 },
  { name: "Norway", flag: "NO", v: 0 },
  { name: "United States", flag: "US", v: 0 },
  { name: "Singapore", flag: "SG", v: 0 },
  { name: "Moldova", flag: "MD", v: 0 },
  ...["Austria", "Belgium", "Brazil", "Switzerland", "Finland", "Italy", "Japan", "Poland", "Portugal", "Turkey"].map((name) => ({ name, flag: name.slice(0, 2).toUpperCase(), v: 0 })),
];

export const rdTrend = {
  data: [158, 151, 161, 168, 146, 154, 158, 161, 165, 167, 196, 263],
  min: 147,
  max: 259,
  ticks: ["259", "231", "203", "175", "147"],
};

export const blTrend = {
  data: [207, 230, 262, 279, 273, 301, 317, 319, 302, 278, 318, 375],
  min: 210,
  max: 358,
  ticks: ["358", "321", "284", "247", "210"],
};

export const trendLabels = [
  { at: 0, label: "Oct 2025" },
  { at: 0.246, label: "Dec 2025" },
  { at: 0.487, label: "Mar 2026" },
  { at: 0.731, label: "Jun 2026" },
  { at: 0.975, label: "Sep 2026" },
];

export const rdAllTime = {
  data: [0, 2, 3, 3, 4, 6, 8, 11, 15, 22, 31, 38, 44, 52, 61, 70, 82, 96, 110, 123, 140, 147, 155, 168, 196, 263],
  min: 0,
  max: 280,
  ticks: ["280", "210", "140", "70", "0"],
};

export const blAllTime = {
  data: [0, 3, 4, 6, 8, 11, 14, 19, 25, 34, 48, 61, 72, 88, 104, 120, 141, 166, 190, 214, 241, 262, 279, 301, 318, 375],
  min: 0,
  max: 400,
  ticks: ["400", "300", "200", "100", "0"],
};

export const allTimeLabels = [
  { at: 0, label: "2019" },
  { at: 0.2, label: "2020" },
  { at: 0.4, label: "2022" },
  { at: 0.6, label: "2023" },
  { at: 0.8, label: "2025" },
  { at: 0.975, label: "2026" },
];

export const weeks = ["Mar 23", "Mar 30", "Apr 6", "Apr 13", "Apr 20", "Apr 27", "May 4", "May 11", "May 18", "May 25", "Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 29", "Jul 6", "Jul 13", "Jul 20", "Jul 27", "Aug 3", "Aug 10", "Aug 17", "Aug 24", "Aug 31", "Sep 7", "Sep 14", "Sep 21"];

export const newLostRd = {
  newV: [6, 4, 2, 2, 2, 1, 1, 4, 4, 0, 3, 1, 3, 4, 11, 1, 5, 4, 4, 7, 8, 6, 15, 14, 17, 23, 18],
  lostV: [0, 2, 0, 0, 3, 5, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  max: 24,
  ticks: ["24", "16", "8", "0", "-8"],
};

export const newLostBl = {
  newV: [9, 7, 5, 7, 5, 2, 4, 5, 7, 1, 4, 1, 4, 5, 12, 2, 6, 6, 6, 7, 12, 8, 16, 17, 17, 25, 22],
  lostV: [1, 4, 0, 0, 5, 8, 1, 0, 0, 0, 0, 1, 3, 1, 0, 1, 3, 5, 0, 0, 1, 1, 0, 3, 0, 0, 0],
  max: 28,
  ticks: ["28", "18", "9", "0", "-9"],
};

export const categories = [
  { label: "Online Services", pct: "4%", w: 4, count: 10 },
  { label: "Information Technology", pct: "3%", w: 3, count: 8 },
  { label: "Construction & Maintenance", pct: "1%", w: 0.7, count: 3 },
  { label: "Retail", pct: "<1%", w: 0.7, count: 2 },
  { label: "Finance", pct: "<1%", w: 0.7, count: 2 },
];

export const cloud = [
  { text: "revisionskonsulterna j hägglund", x: 20, y: 138, size: 12 },
  { text: "visit website", x: 231, y: 144, size: 12 },
  { text: "rkjh", x: 354, y: 149, size: 12 },
  { text: "https://rkjh.se/", x: 93, y: 159, size: 12 },
  { text: "Empty Anchor", x: 244, y: 168, size: 14, italic: true },
  { text: "high quality do...ks online cheap", x: 75, y: 197, size: 18 },
  { text: "rkjh.se", x: 161, y: 236, size: 34 },
  { text: "visit rkjh.se for latest info", x: 301, y: 226, size: 12 },
  { text: "trusted dofollo...ment reporting.", x: 285, y: 264, size: 14 },
  { text: "website", x: 303, y: 288, size: 12 },
];

export const authorityBuckets = [
  { label: "91 - 100", pct: "<1%", w: 0.5, count: 1, color: "#3ed4a4" },
  { label: "81 - 90", pct: "0%", w: 0, count: 0 },
  { label: "71 - 80", pct: "0%", w: 0, count: 0 },
  { label: "61 - 70", pct: "<1%", w: 0.5, count: 1 },
  { label: "51 - 60", pct: "0%", w: 0, count: 0 },
  { label: "41 - 50", pct: "<1%", w: 0.5, count: 1 },
  { label: "31 - 40", pct: "<1%", w: 0.5, count: 2 },
  { label: "21 - 30", pct: "2%", w: 2, count: 6 },
  { label: "11 - 20", pct: "3%", w: 3, count: 8, color: "#c3c5f5" },
  { label: "0 - 10", pct: "93%", w: 93, count: 244, color: "#c3c5f5" },
];

export const backlinkTypes = [
  { label: "Text", pct: "98%", w: 98, count: 353 },
  { label: "Image", pct: "2%", w: 2, count: 6 },
  { label: "Form", pct: "0%", w: 0, count: 0 },
  { label: "Frame", pct: "0%", w: 0, count: 0 },
];

export const linkAttributes = [
  { label: "Follow", pct: "73%", w: 73, count: 275, color: "#3ed4a4" },
  { label: "Nofollow", pct: "27%", w: 27, count: 100 },
  { label: "Sponsored", pct: "0%", w: 0, count: 0 },
  { label: "UGC", pct: "0%", w: 0, count: 0 },
];

export const tlds = [
  { label: ".com", pct: "56%", v: 148, color: "#6167e6" },
  { label: ".shop", pct: "6%", v: 17, color: "#3ed4a4" },
  { label: ".in", pct: "5%", v: 12, color: "#ffb200" },
  { label: ".gov", pct: "0%", v: 0, color: "#d6d8d7" },
  { label: ".edu", pct: "0%", v: 0, color: "#d6d8d7" },
  { label: "other", pct: "33%", v: 86, color: "#d6d8d7" },
];

export const countries = [
  { flag: "SG", name: "Singapore", pct: "35%", w: 35, v: 64 },
  { flag: "US", name: "United States of America", pct: "24%", w: 24, v: 44 },
  { flag: "MD", name: "Moldova", pct: "8%", w: 8, v: 15 },
  { flag: "SE", name: "Sweden", pct: "3%", w: 3, v: 5 },
  { flag: "DK", name: "Denmark", pct: "1%", w: 1, v: 2 },
  { flag: "NO", name: "Norway", pct: "<1%", w: 0.5, v: 1 },
];

export const topPages = [
  { url: "https://rkjh.se/", v: 119 },
  { url: "http://rkjh.se/", v: 36 },
  { url: "https://www.rkjh.se/", v: 3 },
  { url: "http://www.rkjh.se/", v: 2 },
  { url: "http://rkjh.se/kost-2/", v: 1 },
];

type SrcRow = {
  as: number;
  title?: string;
  url: string;
  broken?: boolean;
  tags: string[];
  ext: number;
  int: number;
  anchor: string;
  target: string;
  targetBroken?: boolean;
  ltags: { label: string; tone: Tone }[];
  first: string;
  last: string;
};

const T = (label: string, tone: Tone = "gray") => ({ label, tone });

const spamWords = ["seo", "rank", "link", "domain", "web", "site", "backlink", "traffic", "authority", "metric", "audit", "stat", "info", "value", "worth", "check", "top", "best", "free", "hub", "list", "index", "data", "net", "pro"];
const tlds2 = [".com", ".net", ".info", ".org", ".xyz", ".site", ".online", ".shop", ".in", ".top", ".io", ".co"];
const titleWords = ["Website Analysis", "Domain Info", "Site Worth and Traffic", "SEO Report", "Backlink Checker", "Similar Websites", "Traffic Estimate", "Domain Authority", "Web Stats", "Free Website Review"];

function genDomain(r: () => number) {
  const a = spamWords[Math.floor(r() * spamWords.length)];
  let b = spamWords[Math.floor(r() * spamWords.length)];
  if (b === a) b = "stats";
  return `${a}${r() < 0.4 ? "-" : ""}${b}${tlds2[Math.floor(r() * tlds2.length)]}`;
}

const backlinkHead: SrcRow[] = [
  { as: 30, title: "bobbyfraherc", url: "bobbyfraherc.blogspot.com/", tags: ["Blog", "Mobile friendly"], ext: 14511, int: 10, anchor: "rkjh.se", target: "rkjh.se/", ltags: [T("Text"), T("Content"), T("Nofollow", "orange")], first: "Jan 21, 2026", last: "Mar 13, 2026" },
  { as: 27, title: "sleagueasenm", url: "sleagueasenm.blogspot.com/", tags: ["Blog", "Mobile friendly"], ext: 14510, int: 7, anchor: "https://rkjh.se/", target: "rkjh.se/", ltags: [T("Text"), T("Content"), T("Nofollow", "orange")], first: "Feb 2, 2026", last: "Mar 15, 2026" },
  { as: 25, title: "Sites like rkjh.se – Similar Websit...", url: "www.sitelike.org/similar/rkjh.se/", tags: ["EN", "Mobile friendly"], ext: 2, int: 74, anchor: "rkjh.se", target: "www.rkjh.se/", ltags: [T("Image"), T("Content"), T("Nofollow", "orange")], first: "Nov 22, 2025", last: "Jul 14, 2026" },
];

const backlinkTail: SrcRow[] = [
  { as: 0, title: "rkjh.se – Website Analysis and Domain Report", url: "carplz.com/page-469874882a090a0af8be63bac0ef2bf6.html", broken: true, tags: ["EN", "Mobile friendly"], ext: 44, int: 12, anchor: "rkjh.se", target: "rkjh.se/", targetBroken: true, ltags: [T("Text"), T("Lost: Broken domain", "red")], first: "Dec 3, 2025", last: "Jun 30, 2026" },
  { as: 0, title: "seo domain research", url: "blinks.monster/domain/domain/part/200393", broken: true, tags: ["EN", "Mobile friendly"], ext: 1973, int: 3, anchor: "rkjh.se", target: "rkjh.se/", ltags: [T("Text"), T("Nofollow", "orange")], first: "Jan 16, 2026", last: "Aug 8, 2026" },
  { as: 0, title: "Keyword Research Tips for SEO and SEM ...", url: "backlinktime.com/keyword-research-tips-for-seo-and-sem-campaigns/", broken: true, tags: ["Blog", "EN", "Mobile friendly"], ext: 5006, int: 155, anchor: "rkjh.se", target: "rkjh.se/", ltags: [T("Text"), T("Content")], first: "Jul 29, 2025", last: "Aug 24, 2026" },
];

export const backlinkRows: SrcRow[] = (() => {
  const r = rng(7);
  const rows: SrcRow[] = [...backlinkHead];
  const anchors = ["rkjh.se", "rkjh.se", "https://rkjh.se/", "visit website", "high quality dofollow backlinks", "trusted dofollow link building", "rkjh"];
  for (let i = 0; i < 94; i++) {
    const as = Math.max(0, Math.round(24 * Math.pow(1 - i / 94, 2.2)));
    const d = genDomain(r);
    const nofollow = r() < 0.3;
    const tags = r() < 0.3 ? ["Blog", "EN", "Mobile friendly"] : r() < 0.7 ? ["EN", "Mobile friendly"] : ["Mobile friendly"];
    rows.push({
      as,
      title: `rkjh.se ${titleWords[Math.floor(r() * titleWords.length)]}`,
      url: `${d}/${["site", "domain", "info", "web"][Math.floor(r() * 4)]}/rkjh.se`,
      tags,
      ext: Math.floor(r() * 3000) + 3,
      int: Math.floor(r() * 180) + 1,
      anchor: anchors[Math.floor(r() * anchors.length)],
      target: r() < 0.8 ? "rkjh.se/" : "www.rkjh.se/",
      ltags: nofollow ? [T("Text"), T("Nofollow", "orange")] : [T("Text"), T("Content")],
      first: dateOf(r, 2350, 2700),
      last: dateOf(r, 2700, 2790),
    });
  }
  return [...rows, ...backlinkTail];
})();

export const categoryRows = [
  { label: "Online Services", pct: "34.3%", w: 34.3 },
  { label: "Education", pct: "12.8%", w: 12.8 },
  { label: "Government", pct: "12.8%", w: 12.8 },
  { label: "Information Technology", pct: "8.1%", w: 8.1 },
  { label: "Computer Software & Development", pct: "5.8%", w: 5.8 },
];

export const suspicionSignals = [
  { ok: true, label: "Mostly categorized domains" },
  { ok: false, label: "Uncategorized domain" },
  { ok: false, label: "No domains of the same category" },
  { ok: true, label: "No link farms" },
];

export const graphDomains = [
  { d: "brandfetch.com", c: "Retail", as: 61 },
  { d: "nyforetagarcentrum.se", c: "Government", as: 34 },
  { d: "selling.com", c: "Automotive", as: 30 },
  { d: "urlumbrella.com", c: "Information Technology", as: 25 },
  { d: "tek.se", c: "Education", as: 23 },
  { d: "domaineye.com", c: "Online Services", as: 15 },
  { d: "articlement.com", c: "Information Technology", as: 6 },
  { d: "kingranks.com", c: "Information Technology", as: 6 },
  { d: "wayranks.com", c: "Information Technology", as: 6 },
  { d: "webscountry.com", c: "Healthcare", as: 6 },
  { d: "egetbolag.se", c: "Computer Software & Development", as: 6 },
  { d: "siteprice.org", c: "Online Services", as: 5 },
  { d: "statsnode.com", c: "Online Services", as: 5 },
  { d: "websiteoutlook.com", c: "Online Services", as: 4 },
  { d: "hypestat.com", c: "Online Services", as: 4 },
  { d: "sitelike.org", c: "Online Services", as: 4 },
  { d: "bizstanding.com", c: "Finance", as: 3 },
  { d: "iphonestats.net", c: "Information Technology", as: 3 },
  { d: "rankwhois.com", c: "Online Services", as: 3 },
  { d: "domainpage.io", c: "Online Services", as: 2 },
  { d: "breachviews.com", c: "Education", as: 2 },
  { d: "bortkopplad.se", c: "Adult", as: 2 },
];

export const anchorsRows = [
  { a: "rkjh.se", bl: 221, d: 152, first: "Jun 21, 2025", last: "13h ago" },
  { a: "high quality dofollow backlinks da 50 pa 40 premium pbn network services online cheap", bl: 68, d: 60, first: "Jul 1, 2026", last: "7h ago" },
  { a: "Empty Anchor", empty: true, bl: 26, d: 8, first: "Sep 7, 2023", last: "10h ago" },
  { a: "trusted dofollow link building for rkjh.se for higher da and dr scores. independent accounting firm offering audit services and management reporting.", bl: 26, d: 26, first: "13d ago", last: "4h ago" },
  { a: "https://rkjh.se/", bl: 5, d: 3, first: "Feb 2, 2026", last: "9d ago" },
  { a: "revisionskonsulterna j hägglund", bl: 4, d: 2, first: "Dec 21, 2025", last: "2d ago" },
  { a: "visit website", bl: 4, d: 1, first: "Jul 26, 2025", last: "2d ago" },
  { a: "rkjh", bl: 2, d: 2, first: "Oct 13, 2025", last: "5d ago" },
  { a: "visit rkjh.se for latest info", bl: 2, d: 2, first: "Sep 7, 2025", last: "14d ago" },
  { a: "website", bl: 2, d: 1, first: "Mar 2, 2026", last: "6d ago" },
  { a: "redovisningsbyrå halmstad", bl: 1, d: 1, first: "Apr 11, 2026", last: "3d ago" },
  { a: "revisionskonsulterna", bl: 1, d: 1, first: "Nov 18, 2025", last: "Aug 30, 2026" },
  { a: "bokföring och bokslut", bl: 1, d: 1, first: "May 5, 2026", last: "May 5, 2026" },
  { a: "läs mer", bl: 1, d: 1, first: "Jan 9, 2026", last: "12d ago" },
  { a: "här", bl: 1, d: 1, first: "Aug 14, 2025", last: "Feb 27, 2026" },
  { a: "rkjh.se/", bl: 1, d: 1, first: "Jun 3, 2026", last: "Jun 3, 2026" },
  { a: "http://rkjh.se", bl: 1, d: 1, first: "Apr 22, 2026", last: "Jul 1, 2026" },
  { a: "https://rkjh.se", bl: 1, d: 1, first: "Jun 26, 2026", last: "Jun 26, 2026" },
  { a: "importing goods to sweden from countries outside the eu", bl: 1, d: 1, first: "Mar 6, 2026", last: "Mar 6, 2026" },
  { a: "redan i mars öppnar skatteverket möjligheten att deklarera den elektroniska deklarationen", bl: 1, d: 1, first: "Sep 23, 2025", last: "Jul 6, 2026" },
  { a: "revisionskonsulterna j hägglund ab", bl: 1, d: 1, first: "Mar 7, 2026", last: "5d ago" },
  { a: "rådrum vid företrädaransvar", bl: 1, d: 1, first: "Jul 9, 2026", last: "12d ago" },
  { a: "tusentals människor fick sätta livet till i de ständiga striderna om herraväldet", bl: 1, d: 1, first: "Jul 5, 2025", last: "Apr 3, 2026" },
];

type PageRow = { title?: string; url: string; bl: number; d: number; ext: number; int: number; last: string; e404?: boolean };

const pageHead: PageRow[] = [
  { title: "Redovisningsbyrå i Halmstad | Revisionskonsulterna J Hägglund AB", url: "https://rkjh.se/", bl: 240, d: 119, ext: 5, int: 57, last: "3d ago" },
  { url: "http://rkjh.se/", bl: 58, d: 36, ext: 0, int: 0, last: "11d ago" },
  { url: "https://www.rkjh.se/", bl: 6, d: 3, ext: 0, int: 0, last: "Jun 16, 2026" },
  { url: "http://www.rkjh.se/", bl: 4, d: 2, ext: 0, int: 0, last: "Aug 4, 2026" },
  { url: "http://rkjh.se/kost-2/", bl: 2, d: 1, ext: 0, int: 0, last: "Jan 29, 2026" },
  { title: "Sidan hittades inte – Revisionskonsulterna J Hägglund", url: "https://rkjh.se/blog/2018/04/03/7-tips-nar-du-skall-starta-eget/", bl: 1, d: 1, ext: 0, int: 0, last: "Jun 16, 2026", e404: true },
  { title: "Starta Eget Kvällen - Revisionskonsulterna J Hägglund", url: "https://rkjh.se/blog/events/starta-eget/", bl: 4, d: 1, ext: 5, int: 52, last: "Sep 9, 2026" },
];

const pageTail: PageRow[] = [
  { title: "Återvinn ditt vatten / Revisionskonsulterna J Hägglund", url: "http://rkjh.se/2015/03/31/atervinn-ditt-vatten/", bl: 0, d: 0, ext: 11, int: 28, last: "Oct 14, 2019", e404: true },
  { title: "404 · Sidan hittades inte / Revisionskonsulterna J Hägglund", url: "http://rkjh.se/2015/08/21/vi-expanderar-kraftigt-i-halmstad/", bl: 0, d: 0, ext: 15, int: 38, last: "May 11, 2019", e404: true },
  { title: "Chokladkväll på Triple Chocolate / Revisionskonsulterna J Hägglund", url: "http://rkjh.se/2015/10/16/chokladkvall-pa-triple-chocolate/", bl: 0, d: 0, ext: 11, int: 27, last: "Oct 6, 2019" },
];
pageTail[2].e404 = true;

const slugs = ["bokforing", "bokslut", "deklaration", "moms", "arsredovisning", "lonehantering", "skatteradgivning", "revision", "starta-eget", "aktiebolag", "enskild-firma", "fakturering", "personalliggare", "kvitton", "friskvard", "representation", "tjanstebil", "rot-och-rut", "k10", "periodisering"];
const slugTitles = ["Bokföring", "Bokslut", "Deklaration", "Moms", "Årsredovisning", "Lönehantering", "Skatterådgivning", "Revision", "Starta eget", "Aktiebolag", "Enskild firma", "Fakturering", "Personalliggare", "Kvitton", "Friskvård", "Representation", "Tjänstebil", "ROT och RUT", "K10", "Periodisering"];

export const pageRows: PageRow[] = (() => {
  const r = rng(11);
  const rows = [...pageHead];
  for (let i = 0; i < 90; i++) {
    const k = Math.floor(r() * slugs.length);
    const y = 2015 + Math.floor(r() * 6);
    const m = String(1 + Math.floor(r() * 12)).padStart(2, "0");
    const dd = String(1 + Math.floor(r() * 28)).padStart(2, "0");
    const e404 = r() < 0.6;
    rows.push({
      title: `${slugTitles[k]}${r() < 0.5 ? " – tips och råd" : ""} / Revisionskonsulterna J Hägglund`,
      url: `${r() < 0.5 ? "http" : "https"}://rkjh.se/${y}/${m}/${dd}/${slugs[k]}${r() < 0.5 ? "-" + slugs[(k + 3) % slugs.length] : ""}/`,
      bl: i < 20 ? 1 : 0,
      d: i < 20 ? 1 : 0,
      ext: 5 + Math.floor(r() * 12),
      int: 20 + Math.floor(r() * 40),
      last: dateOf(r, 0, 2400),
      e404,
    });
  }
  return [...rows, ...pageTail];
})();

type OutRow = { as: number; d: string; c: string; links: string; first: string; last: string; lost?: boolean };

const outHead: OutRow[] = [
  { as: 32, d: "loopia.com", c: "Online Services", links: "1,320", first: "Feb 23, 2026", last: "1h ago" },
  { as: 43, d: "loopia.se", c: "Online Services", links: "137", first: "Feb 23, 2026", last: "May 17, 2026" },
  { as: 100, d: "spotify.com", c: "Online Services", links: "48", first: "Jun 24, 2026", last: "2d ago" },
  { as: 84, d: "vimeo.com", c: "Online Services", links: "32", first: "Nov 3, 2024", last: "2h ago" },
  { as: 100, d: "google.com", c: "Online Services", links: "27", first: "Feb 15, 2026", last: "12h ago" },
  { as: 80, d: "office365.com", c: "Education", links: "17", first: "Jan 19, 2026", last: "2h ago" },
];

const outMid: [number, string, string, string][] = [
  [96, "microsoft.com", "Computer Software & Development", "14"],
  [95, "facebook.com", "Online Services", "12"],
  [94, "linkedin.com", "Online Services", "11"],
  [93, "instagram.com", "Online Services", "9"],
  [82, "skatteverket.se", "Government", "8"],
  [76, "verksamt.se", "Government", "6"],
  [71, "bolagsverket.se", "Government", "5"],
  [88, "wordpress.org", "Computer Software & Development", "5"],
  [58, "far.se", "Accounting & Auditing", "4"],
  [66, "fortnox.se", "Computer Software & Development", "4"],
  [61, "visma.se", "Computer Software & Development", "3"],
  [79, "gstatic.com", "Online Services", "3"],
  [92, "youtube.com", "Online Services", "3"],
  [74, "halmstad.se", "Government", "2"],
  [55, "srfkonsult.se", "Accounting & Auditing", "2"],
  [69, "almi.se", "Finance", "2"],
  [85, "x.com", "Online Services", "2"],
  [48, "hallandsposten.se", "News & Media", "1"],
  [63, "tillvaxtverket.se", "Government", "1"],
  [52, "revisorsinspektionen.se", "Government", "1"],
  [70, "hsbc.co.uk", "Banking", "1"],
  [77, "barclays.co.uk", "Banking", "1"],
  [44, "companieshouse.gov.uk", "Government", "1"],
  [67, "nordea.se", "Banking", "1"],
];

export const outRows: OutRow[] = [
  ...outHead,
  ...outMid.map(([as, d, c, links], i) => ({ as, d, c, links, first: ["Jan 21, 2026", "Feb 23, 2026", "Mar 4, 2026", "Nov 3, 2024"][i % 4], last: ["2d ago", "May 23, 2026", "3h ago", "Jun 2, 2026"][i % 4] })),
  { as: 70, d: "santander.co.uk", c: "Banking", links: "1", first: "Jan 21, 2026", last: "May 23, 2026" },
  { as: 5, d: "santanderbreakthrough.co.uk", c: "Finance", links: "1", first: "Jan 21, 2026", last: "May 23, 2026" },
  { as: 72, d: "sba.gov", c: "Finance", links: "1", first: "Jan 21, 2026", last: "May 23, 2026" },
  { as: 31, d: "tidningenbalans.se", c: "Accounting & Auditing", links: "1", first: "Jul 17, 2025", last: "Jul 7, 2026", lost: true },
];

export const bulk = { as: 8, bl: 375, d: 263, visits: "n/a", follow: 275, nofollow: 100, fPct: "73%", nPct: "27%", text: 353, tPct: "98%", image: 6, iPct: "2%", form: 0, frame: 0 };

type IpRow = { flag?: string; ip: string; d: number; bl: number; first: string; last: string };

const ipHead: IpRow[] = [
  { flag: "SG", ip: "118.139.181.85", d: 28, bl: 38, first: "Feb 7, 2026", last: "11h ago" },
  { flag: "US", ip: "203.161.54.114", d: 27, bl: 35, first: "Feb 19, 2026", last: "6d ago" },
  { flag: "MD", ip: "195.20.19.178", d: 15, bl: 25, first: "Dec 28, 2025", last: "2d ago" },
  { flag: "SG", ip: "118.139.176.46", d: 9, bl: 18, first: "Dec 31, 2025", last: "Yesterday" },
  { flag: "SG", ip: "184.168.115.60", d: 9, bl: 20, first: "Jan 4, 2026", last: "3d ago" },
  { flag: "SG", ip: "118.139.178.200", d: 6, bl: 10, first: "Dec 7, 2025", last: "7d ago" },
  { flag: "SG", ip: "118.139.161.199", d: 5, bl: 5, first: "Jul 14, 2026", last: "3d ago" },
  { flag: "US", ip: "67.223.118.29", d: 3, bl: 3, first: "Nov 12, 2025", last: "Jul 19, 2026" },
  { flag: "SG", ip: "118.139.181.255", d: 2, bl: 6, first: "Jan 12, 2026", last: "12d ago" },
  { flag: "SG", ip: "184.168.111.168", d: 2, bl: 4, first: "Jul 4, 2025", last: "Mar 14, 2026" },
];

export const ipRows: IpRow[] = (() => {
  const r = rng(23);
  const flags = ["SG", "US", "US", "US", "SG", "MD", "SE", "DE", "NL", "", "", "DK", "NO", "FR", "GB"];
  const rows = [...ipHead];
  for (let i = 0; i < 90; i++) {
    const f = flags[Math.floor(r() * flags.length)];
    const ip = f === "" ? `172.67.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}` : `${[104, 118, 184, 203, 67, 91, 185, 45, 212][Math.floor(r() * 9)]}.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}`;
    rows.push({ flag: f || undefined, ip, d: i < 14 ? 2 : 1, bl: i < 14 ? 2 + Math.floor(r() * 4) : 1 + Math.floor(r() * 2), first: dateOf(r, 2300, 2790), last: r() < 0.5 ? relTimes[Math.floor(r() * relTimes.length)] : dateOf(r, 2700, 2790) });
  }
  return rows;
})();

export type RdRow = { as: number; d: string; c?: string; tags?: { label: string; tone: Tone }[]; bl: number; flag?: string; ip: string; first: string; last: string; firstNew?: boolean };

const rdHead: RdRow[] = [
  { as: 6, d: "egetbolag.se", c: "Computer Software & Development", bl: 16, flag: "NO", ip: "91.189.123.141", first: "Sep 7, 2023", last: "2d ago" },
  { as: 30, d: "selling.com", c: "Automotive", bl: 9, flag: "US", ip: "18.67.76.80", first: "Jul 26, 2025", last: "Yesterday" },
];

const rdFixed: RdRow[] = [
  { as: 2, d: "seolinkbooster.com", tags: [T("Nofollow", "orange")], bl: 6, flag: "US", ip: "203.161.54.114", first: "Feb 19, 2026", last: "10d ago" },
  { as: 2, d: "toprankbacklinks.com", tags: [T("Nofollow", "orange")], bl: 4, flag: "US", ip: "203.161.54.114", first: "Apr 15, 2026", last: "8d ago" },
  { as: 2, d: "portailorange.net", bl: 4, ip: "172.67.167.49", first: "Jul 1, 2026", last: "Yesterday" },
  { as: 28, d: "revenuebase.ai", c: "Information Technology", tags: [T("New", "green"), T("Nofollow", "orange")], bl: 4, flag: "US", ip: "3.167.112.80", first: "Sep 4, 2026", last: "Yesterday", firstNew: true },
  { as: 2, d: "allwebsitesdirectory.com", bl: 3, flag: "SG", ip: "184.168.115.60", first: "Jan 8, 2026", last: "11d ago" },
  { as: 2, d: "bestwebstats.com", bl: 3, flag: "SG", ip: "184.168.115.60", first: "Mar 4, 2026", last: "Sep 5, 2026" },
  { as: 2, d: "bolag.info", c: "Construction & Maintenance", bl: 3, flag: "SE", ip: "213.164.219.24", first: "Oct 29, 2025", last: "Sep 9, 2026" },
];

const rdMulti: [number, string, string | undefined, number][] = [
  ...rdFixed.map((f): [number, string, string | undefined, number] => [f.as, f.d, f.c, f.bl]),
  [34, "nyforetagarcentrum.se", "Government", 3],
  [5, "siteprice.org", "Online Services", 3],
  [5, "statsnode.com", "Online Services", 3],
  [4, "websiteoutlook.com", "Online Services", 3],
  [4, "hypestat.com", "Online Services", 3],
  [4, "sitelike.org", "Online Services", 3],
  [3, "bizstanding.com", "Finance", 2],
  [3, "rankwhois.com", "Online Services", 2],
  [2, "domainpage.io", "Online Services", 2],
  [1, "seoranker.shop", undefined, 2],
  [1, "linkvault.in", undefined, 2],
  [2, "webstatsdomain.org", "Online Services", 2],
  [1, "sitesummary.net", undefined, 2],
];

const rdSingles = [
  "0-100.shop", "1-linkbuilding.com", "10backlinks.in", "123-seo.site", "24hbacklinks.com", "a-rankcheck.com", "aboutdomain.org", "accountingdirectory.se", "actualseo.shop", "adbacklink.in",
  "addlinks.site", "adminseo.online", "advancedseo.shop", "affordablelinks.in", "agencyrank.com", "ahrefslinks.shop", "aibacklinks.site", "alexa-rank.org", "alldomains.info", "allinfo.site",
  "alphalink.shop", "altseo.in", "amazinglinks.site", "analyticsrank.com", "anchorhub.in", "apexseo.shop", "appraisal.site", "archivelinks.com", "articlebase.in", "askseo.shop",
  "atlaslinks.site", "audit-web.com", "authoritylink.shop", "autobacklinks.in", "awesomeseo.site", "backlink-bank.com", "backlinkfarm.shop", "backlinkhub.in", "backlinkpro.site", "backlinks4u.shop",
  "backlinkstation.com", "baseseo.in", "basiclinks.site", "beaconrank.shop", "bestbacklinks.in", "bestlinkbuilding.site", "betterseo.shop", "bigbacklinks.com", "bizdirectory.in", "bizlinks.site",
  "blackhatlinks.shop", "blogbacklinks.in", "bloglinks.site", "bloomrank.shop", "blueseo.com", "boldlinks.in", "bonuslinks.in", "bonanzaseo.site", "bondrank.shop", "bonoseo.in",
  "a1directory.com", "abcseo.in", "accessrank.site", "acmelinks.shop", "activelinks.in", "adrank.site", "agilelinks.com", "allseo.in", "amberlinks.site", "anyrank.shop",
  "bamboolinks.in", "bananaseo.site", "beamlinks.com", "bestrank.in",
  "booastrankingwithbacklinks.com",
].sort();

const rdTail: RdRow[] = [
  { as: 2, d: "bortkopplad.se", c: "Adult", bl: 1, ip: "172.67.212.123", first: "Apr 8, 2026", last: "Sep 5, 2026" },
  { as: 62, d: "brandfetch.com", c: "Retail", bl: 1, ip: "104.26.1.96", first: "Aug 22, 2026", last: "Aug 22, 2026" },
  { as: 2, d: "breachviews.com", tags: [T("New", "green")], bl: 1, ip: "172.67.216.74", first: "10d ago", last: "10d ago", firstNew: true },
];

export const rdRows: RdRow[] = (() => {
  const r = rng(31);
  const flags = ["US", "US", "SG", "SG", "MD", "", "", "DE", "SE"];
  const ip = (f: string) => (f === "" ? `172.67.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}` : `${[104, 118, 184, 203, 67, 195][Math.floor(r() * 6)]}.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}`);
  const cats = ["Online Services", "Information Technology", "Education", "Government", undefined, undefined];
  const rows: RdRow[] = [...rdHead];
  rdMulti.forEach(([as, d, c, bl], i) => {
    const f = flags[Math.floor(r() * flags.length)];
    const row: RdRow = { as, d, c, bl, flag: f || undefined, ip: ip(f), first: dateOf(r, 2300, 2700), last: relTimes[Math.floor(r() * relTimes.length)] };
    rows.push(rdFixed[i] ?? row);
  });
  rdSingles.forEach((d, i) => {
    const f = d.startsWith("booast") ? "US" : flags[Math.floor(r() * flags.length)];
    const c = cats[Math.floor(r() * cats.length)];
    const nf = i === rdSingles.length - 2 || d.startsWith("booast") || r() < 0.12;
    rows.push({
      as: d.startsWith("booast") ? 2 : Math.floor(r() * 12),
      d,
      c: nf ? undefined : c,
      tags: nf ? [T("Nofollow", "orange")] : undefined,
      bl: 1,
      flag: f || undefined,
      ip: d.startsWith("booast") ? "203.161.54.114" : ip(f),
      first: d.startsWith("booast") ? "Jul 2, 2026" : dateOf(r, 2400, 2790),
      last: d.startsWith("booast") ? "Aug 16, 2026" : dateOf(r, 2700, 2790),
    });
  });
  return [...rows, ...rdTail];
})();

const weekStart = Date.UTC(2026, 2, 23);

export const weekRanges = weeks.map((_, i) => {
  const a = new Date(weekStart + i * 7 * 864e5);
  const b = new Date(weekStart + (i * 7 + 6) * 864e5);
  const m = (d: Date) => months[d.getUTCMonth()];
  const end = a.getUTCMonth() === b.getUTCMonth() ? `${b.getUTCDate()}` : `${m(b)} ${b.getUTCDate()}`;
  return `${m(a)} ${a.getUTCDate()} - ${end}, ${b.getUTCFullYear()}`;
});

const fmtK = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : `${n}`);

export function asMetrics(d: string, as: number) {
  if (d === "egetbolag.se") return { backlinks: "3.9K", refDomains: "213", visits: "n/a", organic: "11", outbound: "112" };
  if (d === "brandfetch.com") return { backlinks: "899K", refDomains: "12.4K", visits: "1.3M", organic: "1.4M", outbound: "118K" };
  const r = rng([...d].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) % 2147483646 || 1);
  const k = 1 + as / 4;
  return {
    backlinks: fmtK(Math.floor((40 + r() * 900) * k * k)),
    refDomains: fmtK(Math.floor((8 + r() * 120) * k)),
    visits: as > 20 ? fmtK(Math.floor(r() * 90000)) : "n/a",
    organic: fmtK(Math.floor(r() * 80 * k)),
    outbound: fmtK(Math.floor((5 + r() * 150) * k)),
  };
}

type RdLink = { target: string; lost?: boolean; broken?: boolean; first: string; last: string; lastLost?: boolean; code?: string };
type RdPage = { as: number; url: string; ext: number; int: number; tag?: string; links: RdLink[] };

const egetPages: RdPage[] = [
  {
    as: 0,
    url: "www.egetbolag.se/?adID=168&isBig=0&pageID=1",
    ext: 0,
    int: 0,
    tag: "Redirect",
    links: [
      { code: "302", target: "www.rkjh.se/", lost: true, broken: true, first: "Jan 30, 2026", last: "Jul 25, 2026", lastLost: true },
      { code: "302", target: "rkjh.se/", first: "Jan 16, 2026", last: "Sep 4, 2026" },
    ],
  },
  { as: 0, url: "egetbolag.se/?adID=317&isBig=1&pageID=1", ext: 0, int: 0, tag: "Redirect", links: [{ code: "302", target: "rkjh.se/blog/events/starta-eget/", first: "Oct 11, 2025", last: "Sep 9, 2026" }] },
  { as: 0, url: "egetbolag.se/?adID=317&isBig=0&pageID=1", ext: 0, int: 0, tag: "Redirect", links: [{ code: "302", target: "rkjh.se/blog/events/starta-eget/", first: "Sep 30, 2025", last: "Sep 6, 2026" }] },
  { as: 0, url: "egetbolag.se/?adID=169&isBig=1&pageID=1", ext: 0, int: 0, tag: "Redirect", links: [{ code: "302", target: "www.rkjh.se/", lost: true, first: "Mar 14, 2026", last: "Apr 4, 2026", lastLost: true }] },
];

const rdTargets = ["rkjh.se/", "www.rkjh.se/", "rkjh.se/tjanster/", "rkjh.se/blog/events/starta-eget/", "rkjh.se/kontakt/", "rkjh.se/om-oss/"];
const rdPaths = ["", "sv/", "site/", "info/", "domain/", "page/", "profile/", "company/"];

export function rdPages(d: string, bl: number): RdPage[] {
  const r = rng([...d].reduce((a, c) => a * 17 + c.charCodeAt(0), 3) % 2147483646 || 1);
  const pages: RdPage[] = d === "egetbolag.se" ? [...egetPages] : [];
  let n = pages.reduce((a, p) => a + p.links.length, 0);
  while (n < bl) {
    const lost = r() < 0.2;
    const ids = Math.floor(r() * 900) + 100;
    pages.push({
      as: Math.floor(r() * 4),
      url: d === "egetbolag.se" ? `egetbolag.se/?adID=${ids}&isBig=${ids % 2}&pageID=1` : `${d}/${rdPaths[Math.floor(r() * rdPaths.length)]}rkjh.se`,
      ext: Math.floor(r() * 40),
      int: Math.floor(r() * 60),
      tag: d === "egetbolag.se" ? "Redirect" : undefined,
      links: [{ code: d === "egetbolag.se" ? "302" : undefined, target: rdTargets[Math.floor(r() * rdTargets.length)], lost, first: dateOf(r, 2450, 2700), last: dateOf(r, 2700, 2790), lastLost: lost }],
    });
    n++;
  }
  return pages;
}

export const newBacklinkRows: SrcRow[] = [
  {
    as: 0,
    title: "Trusted Niche Edit Links for Higher DA and DR Scores",
    url: "onlinegamblingbonus.online/link-profile-hub/trusted-niche-edit-links-for-higher-da-and-dr-scores-outrank-your-competitors-for-long-term-seo-results-85dcce.html",
    tags: ["EN", "Mobile friendly"],
    ext: 5000,
    int: 2,
    anchor: "Trusted Dofollow Link Building for rkjh.se",
    target: "rkjh.se/",
    ltags: [T("Text"), T("Content"), T("New", "green")],
    first: "4h ago",
    last: "4h ago",
  },
  {
    as: 0,
    title: "Premium Dofollow Link Building to Boost Domain Authority",
    url: "bazerdaily.com/link-equity-archive/premium-dofollow-link-building-to-boost-domain-authority-outrank-your-competitors-with-full-placement-reporting-89985e.html",
    tags: ["EN", "Mobile friendly"],
    ext: 3000,
    int: 2,
    anchor: "High Quality Dofollow Backlinks DA 50 PA 40",
    target: "rkjh.se/",
    ltags: [T("Text"), T("Content"), T("New", "green")],
    first: "7h ago",
    last: "7h ago",
  },
];

export const categoryAll = [
  ...categoryRows,
  { label: "Business & Industrial", pct: "4.7%", w: 4.7 },
  { label: "Retail", pct: "3.5%", w: 3.5 },
  { label: "News & Media", pct: "3.5%", w: 3.5 },
  { label: "Finance", pct: "2.3%", w: 2.3 },
  { label: "Healthcare", pct: "2.3%", w: 2.3 },
  { label: "Automotive", pct: "1.2%", w: 1.2 },
  { label: "Travel", pct: "1.2%", w: 1.2 },
  ...["Law & Government", "Real Estate", "Marketing & Advertising", "Jobs & Education", "Science", "Arts & Entertainment", "Home & Garden", "Sports", "Food & Drink", "Hobbies & Leisure", "Telecommunications", "Energy & Utilities", "Transportation & Logistics", "Construction", "Insurance", "Beauty & Fitness", "Pets & Animals", "Games"].map((label) => ({ label, pct: "1.2%", w: 1.2 })),
];

const namedNodes: Record<number, { d: string; c: string; as: number }> = {
  59: { d: "google.com", c: "Online Services", as: 100 },
  17: { d: "linkedin.com", c: "Online Services", as: 98 },
  19: { d: "facebook.com", c: "Online Services", as: 100 },
};

export function nodeInfo(i: number) {
  const n = namedNodes[i];
  if (n) return { ...n, named: true };
  const g = graphDomains[i % graphDomains.length];
  return { d: g.d, c: g.c, as: g.as, named: false };
}

