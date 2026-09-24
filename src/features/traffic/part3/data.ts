import { brand } from "@/config/brand";
import { domainColors } from "../TrafficFrame";

export const doms = [
  { name: "zara.com", color: domainColors.zara, tag: "bg-[#e6e7fb] text-[#5c61c9]" },
  { name: "asos.com", color: domainColors.asos, tag: "bg-[#d6f7ee] text-[#16876a]" },
  { name: "hm.com", color: domainColors.hm, tag: "bg-[#f3e4fe] text-[#9747d6]" },
] as const;

export const lightColors = { zara: "#b0b3ea", asos: "#9aedd7", hm: "#dcc3fd" };

export const trendsFaq: { q: string; a: string; link?: string }[] = [
  { q: "Do I need technical skills to use Trends API?", a: "Not at all! Building an API request and sending it to the system is simple. Everything you need to know is in the", link: "Trends API Documentation" },
  { q: "How far back can I pull Trends API data?", a: "Trends API gives you access to historical traffic data starting from January 2017." },
  { q: "What data can I get with Trends API Basic or Premium access?", a: "Basic access includes the Traffic Summary report. Premium access adds 16 additional data types, daily and weekly data and purchase conversion insights." },
  { q: `Can API data be purchased without a ${brand.name} subscription?`, a: `No. Trends API is available as an add-on to any paid ${brand.name} subscription.` },
  { q: "How often can I pull Trends API data?", a: "You can send requests at any time, as long as you have API units left on your balance." },
  { q: `What is the data methodology for ${brand.name} Trends API?`, a: "Our traffic estimations are based on clickstream data from third-party providers, processed by machine learning algorithms." },
  { q: `Does ${brand.name} offer a free API trial?`, a: "We do not offer a free trial for Trends API, but you can explore sample data in the Traffic & Market reports." },
];

export const ageGroups = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
export const ageData = [
  [22.9, 27.0, 21.9],
  [22.8, 25.7, 23.3],
  [17.5, 16.5, 17.5],
  [17.7, 14.5, 17.6],
  [10.5, 9.3, 10.8],
  [7.8, 5.9, 8.0],
];
export const sexData = [
  { male: 25.54, female: 74.46 },
  { male: 27.29, female: 72.71 },
  { male: 24.57, female: 75.43 },
];

export const uvMonths = ["Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026"];
export const uvData = [
  [28.3, 28.6, 29.9, 34.8, 34.3, 30.8, 30.4, 32.1],
  [18.0, 20.7, 19.1, 19.4, 20.6, 22.1, 26.3, 26.8],
  [33.2, 33.1, 34.6, 37.2, 40.2, 41.2, 44.5, 46.0],
];

export const geoRows = [
  { code: "US", name: "United States", share: "18.07%", value: "11.6M", desktop: "39.68%", mobile: "60.32%" },
  { code: "ES", name: "Spain", share: "7.81%", value: "5M", desktop: "35.69%", mobile: "64.31%" },
  { code: "UK", name: "United Kingdom", share: "7.72%", value: "5M", desktop: "39.35%", mobile: "60.65%" },
  { code: "FR", name: "France", share: "5.49%", value: "3.5M", desktop: "34.16%", mobile: "65.84%" },
  { code: "DE", name: "Germany", share: "5.47%", value: "3.5M", desktop: "45.97%", mobile: "54.03%" },
];

export const venn = [
  { a: 0, b: 1, av: "30.4M", bv: "26.3M", total: "52.4M", potential: "21.9M", overlapPct: "8.37%", overlap: "4.4M", ra: 93, rb: 86, d: 132 },
  { a: 0, b: 2, av: "30.4M", bv: "44.5M", total: "66.1M", potential: "35.7M", overlapPct: "13.1%", overlap: "8.7M", ra: 76, rb: 92, d: 116 },
  { a: 1, b: 2, av: "26.3M", bv: "44.5M", total: "62.8M", potential: "36.5M", overlapPct: "12.9%", overlap: "8.1M", ra: 72, rb: 92, d: 112 },
];

export type Cat = "shop" | "cart" | "laptop" | "plane" | "luggage" | "music" | "video" | "news" | "money" | "truck" | "leaf" | "game" | "car" | "home";

export const visited: { domain: string; cats: Cat[] | null; total: string; potential: string; pct: number }[] = [
  { domain: "ikea.com", cats: ["laptop", "cart"], total: "170.6M", potential: "86.6M", pct: 2.4 },
  { domain: "zalando.com", cats: null, total: "95.8M", potential: "11.9M", pct: 2.3 },
  { domain: "skyscanner.net", cats: ["plane", "laptop", "luggage"], total: "106.5M", potential: "22.5M", pct: 2.2 },
  { domain: "ryanair.com", cats: ["plane", "luggage"], total: "107.9M", potential: "24M", pct: 2.2 },
  { domain: "mango.com", cats: ["shop", "cart"], total: "89M", potential: "5.1M", pct: 2.1 },
  { domain: "uniqlo.com", cats: ["shop", "cart"], total: "104.6M", potential: "20.7M", pct: 2.1 },
  { domain: "thetrainline.com", cats: ["truck", "luggage"], total: "96.1M", potential: "12.1M", pct: 2.0 },
  { domain: "booking.com", cats: ["plane", "luggage"], total: "412.3M", potential: "328.5M", pct: 2.0 },
  { domain: "pullandbear.com", cats: ["shop", "cart"], total: "86.2M", potential: "2.4M", pct: 2.0 },
  { domain: "etsy.com", cats: ["laptop", "cart"], total: "301.7M", potential: "217.8M", pct: 1.9 },
  { domain: "vinted.co.uk", cats: ["shop", "cart"], total: "91.4M", potential: "7.5M", pct: 1.9 },
  { domain: "spotify.com", cats: ["music", "laptop"], total: "256.9M", potential: "173.1M", pct: 1.9 },
  { domain: "stradivarius.com", cats: ["shop", "cart"], total: "85.7M", potential: "1.8M", pct: 1.9 },
  { domain: "netflix.com", cats: ["video", "laptop"], total: "388.2M", potential: "304.4M", pct: 1.8 },
  { domain: "airbnb.com", cats: ["plane", "home"], total: "198.6M", potential: "114.7M", pct: 1.8 },
  { domain: "next.co.uk", cats: ["shop", "cart"], total: "93.9M", potential: "10.1M", pct: 1.8 },
  { domain: "massimodutti.com", cats: ["shop", "cart"], total: "85.3M", potential: "1.5M", pct: 1.8 },
  { domain: "ebay.com", cats: ["laptop", "cart"], total: "352.4M", potential: "268.6M", pct: 1.7 },
  { domain: "shein.com", cats: ["shop", "cart"], total: "146.8M", potential: "62.9M", pct: 1.7 },
  { domain: "easyjet.com", cats: ["plane", "luggage"], total: "99.2M", potential: "15.4M", pct: 1.7 },
  { domain: "primark.com", cats: ["shop", "cart"], total: "88.1M", potential: "4.3M", pct: 1.7 },
  { domain: "cosstores.com", cats: ["shop", "cart"], total: "84.9M", potential: "1.1M", pct: 1.6 },
  { domain: "theguardian.com", cats: ["news", "news"], total: "187.3M", potential: "103.5M", pct: 1.6 },
  { domain: "johnlewis.com", cats: ["home", "cart"], total: "97.6M", potential: "13.8M", pct: 1.6 },
  { domain: "nike.com", cats: ["shop", "cart"], total: "121.5M", potential: "37.7M", pct: 1.6 },
  { domain: "adidas.com", cats: ["shop", "cart"], total: "109.4M", potential: "25.6M", pct: 1.5 },
  { domain: "marksandspencer.com", cats: ["shop", "cart"], total: "96.8M", potential: "13M", pct: 1.5 },
  { domain: "asda.com", cats: ["cart", "home"], total: "94.3M", potential: "10.5M", pct: 1.5 },
  { domain: "tesco.com", cats: ["cart", "home"], total: "102.7M", potential: "18.9M", pct: 1.5 },
  { domain: "tripadvisor.com", cats: ["plane", "luggage"], total: "141.2M", potential: "57.4M", pct: 1.4 },
  { domain: "argos.co.uk", cats: ["laptop", "cart"], total: "98.9M", potential: "15.1M", pct: 1.4 },
  { domain: "weather.com", cats: ["leaf", "news"], total: "164.5M", potential: "80.7M", pct: 1.4 },
  { domain: "dailymail.co.uk", cats: ["news", "news"], total: "172.8M", potential: "89M", pct: 1.4 },
  { domain: "revolut.com", cats: ["money", "laptop"], total: "118.3M", potential: "34.5M", pct: 1.3 },
  { domain: "trainpal.com", cats: ["truck", "luggage"], total: "86.7M", potential: "2.9M", pct: 1.3 },
  { domain: "expedia.com", cats: ["plane", "luggage"], total: "134.6M", potential: "50.8M", pct: 1.3 },
  { domain: "vinted.fr", cats: ["shop", "cart"], total: "89.8M", potential: "6M", pct: 1.3 },
  { domain: "sephora.com", cats: ["shop", "cart"], total: "103.2M", potential: "19.4M", pct: 1.2 },
  { domain: "twitch.tv", cats: ["game", "video"], total: "163.1M", potential: "79.3M", pct: 1.2 },
  { domain: "steampowered.com", cats: ["game", "laptop"], total: "178.4M", potential: "94.6M", pct: 1.2 },
  { domain: "autotrader.co.uk", cats: ["car", "cart"], total: "92.7M", potential: "8.9M", pct: 1.2 },
  { domain: "rightmove.co.uk", cats: ["home", "laptop"], total: "101.3M", potential: "17.5M", pct: 1.1 },
  { domain: "hotels.com", cats: ["plane", "luggage"], total: "112.9M", potential: "29.1M", pct: 1.1 },
  { domain: "soundcloud.com", cats: ["music", "laptop"], total: "136.1M", potential: "52.1M", pct: 1.1 },
  { domain: "amazon.co.uk", cats: ["video", "laptop", "cart"], total: "143.8M", potential: "59.9M", pct: 1.1 },
  { domain: "bershka.com", cats: ["shop", "cart"], total: "88.6M", potential: "4.6M", pct: 1.0 },
  { domain: "bbc.com", cats: ["news", "news"], total: "196.8M", potential: "112.9M", pct: 1.0 },
  { domain: "paypal.com", cats: ["laptop", "money", "laptop"], total: "354.5M", potential: "270.5M", pct: 1.0 },
  { domain: "nordstrom.com", cats: ["shop", "laptop", "cart"], total: "98.5M", potential: "14.5M", pct: 1.0 },
  { domain: "accuweather.com", cats: ["leaf", "news", "laptop"], total: "176.9M", potential: "92.9M", pct: 1.0 },
];

export const socioSummary = [
  { hh: "2 persons", hhShare: "24.36%", income: "Low", incomeShare: "43.83%", emp: "Full-time work", empShare: "43.91%", edu: "University", eduShare: "41.02%" },
  { hh: "2 persons", hhShare: "25.1%", income: "Low", incomeShare: "48.38%", emp: "Full-time work", empShare: "44.42%", edu: "University", eduShare: "39.77%" },
  { hh: "2 persons", hhShare: "24.26%", income: "Low", incomeShare: "43.96%", emp: "Full-time work", empShare: "44.13%", edu: "University", eduShare: "40.85%" },
];

export const householdColors = ["#fcda6c", "#ffb100", "#ed9600", "#cf7000", "#aa040f"];
export const householdLabels = ["1", "2", "3-4", "5-6", "7+"];
export const household = [
  [19, 34, 29.5, 10.7, 6.8],
  [19.3, 34.6, 28.2, 10.9, 7],
  [18.4, 33.8, 29.6, 10.7, 7.5],
];

export const incomeLabels = [
  { label: "High", color: "#ed9600" },
  { label: "Middle", color: "#ffb100" },
  { label: "Low", color: "#fcda6c" },
];
export const income = [
  [12.3, 43.9, 43.8],
  [12.1, 39.5, 48.4],
  [12.4, 43.6, 44.0],
];

export type EmpIcon = "home" | "badge" | "shirt" | "cap" | "question" | "case" | "crown" | "hourglass" | "stroller";
export const employment: { label: string; icon: EmpIcon; yellow?: boolean; v: [number, number, number] }[] = [
  { label: "Homemaker", icon: "home", yellow: true, v: [33.8, 30.2, 36] },
  { label: "Full-time work", icon: "badge", yellow: true, v: [33.1, 33.6, 33.3] },
  { label: "Part-time work", icon: "shirt", yellow: true, v: [32.4, 35.1, 32.5] },
  { label: "Student", icon: "cap", v: [36.7, 32, 31.3] },
  { label: "Unemployed", icon: "question", v: [32.2, 34.3, 33.5] },
  { label: "Business owner", icon: "case", v: [34.3, 32.8, 32.9] },
  { label: "Retired", icon: "crown", v: [33.4, 33.3, 33.3] },
  { label: "Leave of absence", icon: "hourglass", v: [33.4, 33.2, 33.4] },
  { label: "Parental leave", icon: "stroller", v: [33.4, 33.2, 33.4] },
];

export const educationLabels = [
  { label: "Compulsory school", color: "#fcda6c" },
  { label: "University", color: "#ffb100" },
  { label: "Postgraduate education", color: "#ed9600" },
  { label: "None completed", color: "#cf7000" },
];
export const education = [
  [41, 39.2, 16.6, 3.2],
  [44.6, 37.2, 15, 3.2],
  [40.8, 39.4, 16.5, 3.3],
];

export type Social = "youtube" | "instagram" | "facebook" | "reddit" | "tiktok" | "linkedin" | "pinterest" | "x" | "github";
export const behaviorSummary = [
  { label: "Social Media", cells: [["YouTube", "55.07%"], ["YouTube", "52.57%"], ["YouTube", "54.36%"]], icon: true },
  { label: "Interests", cells: [["Online Services", "99.81%"], ["Online Services", "99.94%"], ["Online Services", "99.87%"]] },
  { label: "Device", cells: [["Mobile", "61.3%"], ["Mobile", "66.84%"], ["Mobile", "71.1%"]] },
];
export const socialRows: { key: Social; label: string; v: [string, string][] }[] = [
  { key: "youtube", label: "YouTube", v: [["16.8M", "55.07%"], ["13.8M", "52.57%"], ["24.2M", "54.36%"]] },
  { key: "instagram", label: "Instagram", v: [["14M", "46.06%"], ["11.5M", "43.79%"], ["20.9M", "46.94%"]] },
  { key: "facebook", label: "Facebook", v: [["12.7M", "41.62%"], ["11M", "41.83%"], ["18.8M", "42.25%"]] },
  { key: "reddit", label: "Reddit", v: [["10.4M", "34.2%"], ["11.3M", "42.94%"], ["15.1M", "33.93%"]] },
  { key: "tiktok", label: "TikTok", v: [["8M", "26.37%"], ["9M", "34.16%"], ["12.4M", "27.87%"]] },
  { key: "linkedin", label: "LinkedIn", v: [["6.4M", "20.96%"], ["7.5M", "28.53%"], ["9.1M", "20.45%"]] },
  { key: "pinterest", label: "Pinterest", v: [["5.7M", "18.77%"], ["7.1M", "26.96%"], ["8.9M", "20%"]] },
  { key: "x", label: "X (Twitter)", v: [["5.4M", "17.63%"], ["3.6M", "13.77%"], ["7.3M", "16.4%"]] },
  { key: "github", label: "GitHub", v: [["2M", "6.7%"], ["4.2M", "15.92%"], ["2.8M", "6.29%"]] },
];
export const interestRows: { label: string; v: [string, string][] }[] = [
  { label: "Online Services", v: [["30.4M", "99.81%"], ["26.3M", "99.94%"], ["44.4M", "99.87%"]] },
  { label: "Mass Media", v: [["29.9M", "98.29%"], ["26.1M", "99.41%"], ["43.8M", "98.43%"]] },
  { label: "Retail", v: [["29.7M", "97.64%"], ["26M", "98.87%"], ["43.6M", "97.98%"]] },
  { label: "Publishing", v: [["28.8M", "94.47%"], ["25.9M", "98.52%"], ["42.1M", "94.61%"]] },
  { label: "Newspapers", v: [["25.5M", "83.6%"], ["23.7M", "90.29%"], ["37.6M", "84.49%"]] },
  { label: "Apparel & Fashion", v: [["26.9M", "88.2%"], ["22.4M", "85.07%"], ["39.8M", "89.44%"]] },
];
export const deviceDesktop = [38.7, 33.16, 28.9];

export const bulkRows = [
  { domain: "hm.com", visits: "85.6M", uv: "44.5M", conv: "1.51%", ppv: "6", dur: "07:16", bounce: "38.12%" },
  { domain: "zara.com", visits: "64.3M", uv: "30.4M", conv: "2.17%", ppv: "10.2", dur: "07:48", bounce: "31.57%" },
  { domain: "asos.com", visits: "52.1M", uv: "26.3M", conv: "1.01%", ppv: "5.3", dur: "07:33", bounce: "36.94%" },
];

export const paywallBullets = [
  "Traffic by channel (search, display, email, etc.)",
  "Market share by industry",
  "Daily trends and 7 years of historical data",
  "Top pages driving conversions",
  "Demographics breakdown",
  "190+ countries and regions",
];

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function series(seed: number, n: number, base: number, noise: number, opts: { trend?: number; spikes?: number; spikeAmp?: number; weekly?: number } = {}) {
  const r = rng(seed);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    let v = base * (1 + (opts.trend ?? 0) * (i / n)) + (r() - 0.5) * 2 * noise;
    if (opts.weekly) v += Math.sin((i / 7) * Math.PI * 2) * opts.weekly;
    if (opts.spikes && r() < opts.spikes) v += (opts.spikeAmp ?? noise * 3) * (0.5 + r());
    out.push(Math.max(0, v));
  }
  return out;
}
