import { routes } from "@/config/routes";
import { ser } from "./channelData";

const M = 1e6;

export const summaryCols = ["Visits", "Unique Visitors", "Purchase Conversion", "Pages / Visit", "Avg. Visit Duration", "Bounce Rate"];

type Cell = { v: string; up: boolean; bold?: boolean };

export const summaryRows: { name: string; color: string; cells: Cell[] }[] = [
  {
    name: "zara.com",
    color: "#5d62de",
    cells: [
      { v: "64.3M", up: false },
      { v: "30.4M", up: false },
      { v: "2.17%", up: false, bold: true },
      { v: "10.2", up: true, bold: true },
      { v: "07:48", up: false, bold: true },
      { v: "33.52%", up: true, bold: true },
    ],
  },
  {
    name: "asos.com",
    color: "#2ee6b1",
    cells: [
      { v: "52.1M", up: true },
      { v: "26.3M", up: true },
      { v: "1.01%", up: false },
      { v: "5.3", up: false },
      { v: "07:33", up: false },
      { v: "41.08%", up: false },
    ],
  },
  {
    name: "hm.com",
    color: "#bd87f9",
    cells: [
      { v: "85.6M", up: true, bold: true },
      { v: "44.5M", up: true, bold: true },
      { v: "1.51%", up: false },
      { v: "6", up: false },
      { v: "07:16", up: false },
      { v: "44.7%", up: true },
    ],
  },
];

export const trendTabs = ["Visits", "Unique Visitors", "Purchase Conversion", "Pages / Visit", "Avg. Visit Duration", "Bounce Rate"] as const;

export const visitsTrend = ser([78.4, 64, 76, 76.9, 73.1, 64.3, 70], [51, 40.9, 41.3, 44.2, 48.6, 52.1, 54.8], [92.3, 72.6, 77.4, 85.1, 84.6, 85.6, 93.7]);

export const channels = [
  { label: "Direct" },
  { label: "AI Traffic", href: routes.traffic.aiTraffic },
  { label: "Referral", href: routes.traffic.referral },
  { label: "Organic Search", href: routes.traffic.organicSearch },
  { label: "Google AI Mode", href: routes.traffic.organicSearch },
  { label: "Paid Search", href: routes.traffic.paidSearch },
  { label: "Organic Social", href: routes.traffic.organicSocial },
  { label: "Paid Social", href: routes.traffic.paidSocial },
  { label: "Email", href: routes.traffic.email },
  { label: "Display Ads", href: routes.traffic.displayAds },
];

export const channelDist = ser(
  [47.8, 0.2, 4.1, 10.5, 0.1, 0.2, 0.5, 0.3, 0.5, 0.3],
  [28.6, 0.2, 8.6, 6.2, 0.1, 4.2, 1.5, 0.3, 0.7, 0.4],
  [50.2, 0.2, 9.7, 17.8, 0.1, 2.8, 2.6, 0.3, 0.5, 0.3],
);

export const channelTrend: Record<string, ReturnType<typeof ser>> = {
  Direct: ser([60, 48.4, 60, 60, 58, 47.8, 52], [32, 29, 29.5, 28.8, 30, 28.6, 30], [59, 44.7, 48.4, 54.7, 54.7, 50.2, 55]),
  "AI Traffic": ser([0.1, 0.12, 0.15, 0.16, 0.18, 0.2, 0.22], [0.1, 0.1, 0.12, 0.15, 0.17, 0.2, 0.21], [0.1, 0.12, 0.14, 0.16, 0.19, 0.2, 0.22]),
  Referral: ser([2.4, 1.9, 1.7, 2.6, 2.1, 4.1, 6.6], [2.3, 2.1, 1.5, 3.1, 3.2, 8.6, 11.4], [4.4, 3.8, 3.9, 4.7, 5, 9.7, 11.8]),
  "Organic Search": ser([12.9, 10.8, 11.6, 11.7, 11.3, 10.5, 11], [8.6, 7.1, 6.8, 6.4, 6.7, 6.2, 6.5], [21.4, 18.1, 19.2, 19.3, 18.6, 17.8, 18.5]),
};

export const channelTrendTicks: Record<string, number[]> = {
  Direct: [0, 20 * M, 40 * M, 60 * M, 80 * M],
  "AI Traffic": [0, 100e3, 200e3, 300e3],
  Referral: [0, 5 * M, 10 * M, 15 * M],
  "Organic Search": [0, 10 * M, 20 * M, 30 * M],
};

export const journeySources = [
  { name: "zara.com", pct: "75.04%", up: false, h: 88, bw: 88 },
  { name: "google.com", pct: "15.38%", up: false, h: 58, bw: 18 },
  { name: "google.com", pct: "0.32%", up: true, h: 58, bw: 10 },
  { name: "mail.google.com", pct: "0.3%", up: false, h: 58, bw: 10 },
  { name: "duckduckgo.com", pct: "0.3%", up: false, h: 58, bw: 10 },
];

export const journeyDest = [
  { name: "zara.com", pct: "71.2%", up: true, h: 96, bw: 96 },
  { name: "google.com", pct: "4.51%", up: false, h: 58, bw: 14 },
  { name: "instagram.com", pct: "1.2%", up: true, h: 58, bw: 10 },
  { name: "account.zara.com", pct: "0.92%", up: true, h: 58, bw: 10 },
  { name: "youtube.com", pct: "0.41%", up: false, h: 58, bw: 10 },
];

export const topPagesTabs = ["Top Pages", "Top Subfolders", "Top Subdomains"] as const;

export const topPagesData: Record<(typeof topPagesTabs)[number], { page: string; share: string; views: string; visitors: string; bold?: boolean }[]> = {
  "Top Pages": [
    { page: "zara.com", share: "11.71%", views: "8.1M", visitors: "6.2M", bold: true },
    { page: "zara.com/us", share: "2.03%", views: "2.1M", visitors: "1.4M" },
    { page: "account.zara.com/init-authorize", share: "1.89%", views: "3.5M", visitors: "2.8M" },
    { page: "zara.com/es", share: "1.62%", views: "1.4M", visitors: "799.3K" },
    { page: "zara.com/uk", share: "0.92%", views: "792.3K", visitors: "527.2K" },
  ],
  "Top Subfolders": [
    { page: "zara.com/us/", share: "14.22%", views: "12.4M", visitors: "5.1M", bold: true },
    { page: "zara.com/es/", share: "9.87%", views: "8.8M", visitors: "3.9M" },
    { page: "zara.com/uk/", share: "6.41%", views: "5.6M", visitors: "2.6M" },
    { page: "zara.com/fr/", share: "4.93%", views: "4.1M", visitors: "1.9M" },
    { page: "zara.com/de/", share: "4.12%", views: "3.6M", visitors: "1.6M" },
  ],
  "Top Subdomains": [
    { page: "zara.com", share: "81.4%", views: "96.2M", visitors: "27.8M", bold: true },
    { page: "account.zara.com", share: "9.61%", views: "7.3M", visitors: "4.1M" },
    { page: "static.zara.net", share: "3.12%", views: "2.2M", visitors: "1.2M" },
    { page: "news.zara.com", share: "1.07%", views: "701.4K", visitors: "388.2K" },
    { page: "careers.zara.com", share: "0.41%", views: "288.9K", visitors: "161.3K" },
  ],
};

export const geoRows = [
  { flag: "US", country: "United States", share: "18.07%", value: "11.6M", desktop: "39.68%", mobile: "60.32%", bold: true },
  { flag: "ES", country: "Spain", share: "7.81%", value: "5M", desktop: "35.69%", mobile: "64.31%" },
  { flag: "UK", country: "United Kingdom", share: "7.72%", value: "5M", desktop: "39.35%", mobile: "60.65%" },
  { flag: "FR", country: "France", share: "5.49%", value: "3.5M", desktop: "34.16%", mobile: "65.84%" },
  { flag: "DE", country: "Germany", share: "5.47%", value: "3.5M", desktop: "45.97%", mobile: "54.03%" },
];

export const visitsTip: { value: string; delta: number }[][] = [
  [
    { value: "78.4M", delta: -2.12 },
    { value: "51M", delta: 2.62 },
    { value: "92.3M", delta: 2.33 },
  ],
  [
    { value: "64M", delta: -18.37 },
    { value: "40.9M", delta: -19.8 },
    { value: "72.6M", delta: -21.34 },
  ],
  [
    { value: "76.8M", delta: 20 },
    { value: "41.8M", delta: 2.2 },
    { value: "78.3M", delta: 7.85 },
  ],
  [
    { value: "77.4M", delta: 0.81 },
    { value: "44.5M", delta: 6.33 },
    { value: "85.4M", delta: 9.08 },
  ],
  [
    { value: "73.1M", delta: -5.56 },
    { value: "48.6M", delta: 9.21 },
    { value: "84.6M", delta: -0.94 },
  ],
  [
    { value: "64.3M", delta: -12.04 },
    { value: "52.1M", delta: 7.2 },
    { value: "85.6M", delta: 1.18 },
  ],
  [
    { value: "70M", delta: 8.86 },
    { value: "54.8M", delta: 5.18 },
    { value: "93.7M", delta: 9.46 },
  ],
];
