import { domainColors } from "../TrafficFrame";
import type { CloudWord, FlowSource, TrafficSeries, TrendingPage } from "../charts";

const M = 1e6;
const K = 1e3;

export const ser = (z: number[], a: number[], h: number[], mul = M): TrafficSeries[] => [
  { name: "zara.com", color: domainColors.zara, data: z.map((v) => v * mul) },
  { name: "asos.com", color: domainColors.asos, data: a.map((v) => v * mul) },
  { name: "hm.com", color: domainColors.hm, data: h.map((v) => v * mul) },
];

export type ChannelChart = { series: TrafficSeries[]; ticks: number[]; plotHeight?: number };

type ChannelConfig = {
  title: string;
  tabs?: string[];
  trend: ChannelChart;
  desktop: ChannelChart;
  mobile: ChannelChart;
  growing: TrendingPage[];
  sources: FlowSource[];
  sourcesNote?: string;
  sourcesExport?: boolean;
  keywords?: { note: string; words: CloudWord[] };
};

const cz = "#8b98f1";
const ca = "#35dcae";
const ch = "#c99bf7";

export const referral: ChannelConfig = {
  title: "Referral",
  trend: {
    ticks: [0, 5 * M, 10 * M, 15 * M],
    series: ser([2.39, 1.88, 1.7, 2.64, 2.13, 4.09, 6.6], [2.3, 2.05, 1.53, 3.07, 3.24, 8.69, 11.4], [4.43, 3.75, 3.92, 4.69, 5.03, 9.72, 11.8]),
  },
  desktop: {
    ticks: [0, 1 * M, 2 * M, 3 * M, 4 * M],
    series: ser([1.07, 0.86, 0.89, 1.86, 1.57, 2.73, 3.7], [0.82, 0.66, 0.75, 1.95, 2.45, 3.5, 3.45], [1.25, 1.0, 1.09, 1.57, 2.68, 3.82, 3.45]),
  },
  mobile: {
    ticks: [0, 5 * M, 10 * M],
    series: ser([1.3, 1.1, 0.8, 0.8, 0.6, 1.6, 2.3], [1.5, 1.4, 0.8, 1.1, 0.85, 6.2, 7], [3.1, 2.8, 2.9, 3.1, 2.3, 6.8, 7.5]),
  },
  growing: [
    { kind: "Spiked", pct: "161.7K%", url: "zara.com/us/e...l1251.html", value: "1.6K" },
    { kind: "Trending up", pct: "57.3K%", url: "zara.com/vn/vi...l1114.html", value: "574" },
    { kind: "Trending up", pct: "38.1K%", url: "zara.com/do", value: "764" },
    { kind: "Trending up", pct: "30.7K%", url: "zara.com/tr/tr/...-l737.html", value: "615" },
    { kind: "Trending up", pct: "25.2K%", url: "zara.com/pl/pl/...l1047.html", value: "402" },
  ],
  sources: [
    { name: "hm.com", delta: "13.21%", up: false, share: "0.13%", h: 52 },
    { name: "jofogas.hu", delta: "736.97%", up: true, share: "0.11%", h: 44 },
    { name: "massimodutti.com", delta: "135.96%", up: true, share: "0.1%", h: 38 },
    { name: "kleinanzeigen.de", delta: "398.14%", up: true, share: "0.09%", h: 37 },
    { name: "asos.com", delta: "75.14%", up: true, share: "0.09%", h: 35 },
  ],
};

export const organicSearch: ChannelConfig = {
  title: "Organic Search",
  tabs: ["Organic Search", "Google AI Mode"],
  trend: {
    ticks: [0, 10 * M, 20 * M, 30 * M],
    plotHeight: 202,
    series: ser([12.9, 10.8, 11.6, 11.7, 11.3, 10.5, 11], [8.6, 7.1, 6.8, 6.4, 6.7, 6.2, 6.5], [21.4, 18.1, 19.2, 19.3, 18.6, 17.8, 18.5]),
  },
  desktop: {
    ticks: [0, 5 * M, 10 * M, 15 * M],
    plotHeight: 203,
    series: ser([4.4, 4.0, 4.2, 4.7, 4.5, 4.6, 5.2], [3.8, 3.1, 3.4, 3.3, 3.5, 3.4, 3.5], [10.2, 7.9, 8.9, 9.5, 9.6, 8.9, 9.8]),
  },
  mobile: {
    ticks: [0, 5 * M, 10 * M, 15 * M],
    plotHeight: 203,
    series: ser([8.3, 6.9, 7.2, 6.9, 6.8, 6.1, 6], [4.8, 4.1, 3.5, 3.2, 3.3, 3.0, 2.9], [11.1, 10.2, 10.1, 9.8, 8.9, 8.9, 8.9]),
  },
  growing: [
    { kind: "Spiked", pct: "271.4K%", url: "zara.com/br/...84361.html", value: "5.4K" },
    { kind: "Spiked", pct: "232.6K%", url: "zara.com/es/...10378.html", value: "4.7K" },
    { kind: "Trending up", pct: "117.4K%", url: "zara.com/es/e...l3174.html", value: "2.3K" },
    { kind: "Trending up", pct: "71.7K%", url: "zara.com/tr/en...l1180.html", value: "718" },
    { kind: "Trending up", pct: "64.2K%", url: "zara.com/mx/...l2231.html", value: "651" },
  ],
  sourcesNote: "Data shown for Organic Search",
  sources: [
    { name: "google.com", delta: "7.15%", up: false, share: "15.38%", h: 65 },
    { name: "duckduckgo.com", delta: "32.92%", up: false, share: "0.3%", h: 36 },
    { name: "bing.com", delta: "6.2%", up: false, share: "0.14%", h: 35 },
    { name: "ecosia.org", delta: "23.75%", up: false, share: "0.12%", h: 35 },
    { name: "search.yahoo.co.jp", delta: "262.59%", up: true, share: "0.06%", h: 35 },
  ],
  keywords: {
    note: "Data shown for Organic Search (United States, Desktop)",
    words: [
      { text: "zara basic plain knit sweater", size: 24, color: ca, x: 134, y: 62 },
      { text: "zara", size: 46, color: cz, x: 237, y: 85 },
      { text: "zara kids", size: 24, color: ch, x: 206, y: 134 },
      { text: "zara usa", size: 24, color: ch, x: 323, y: 131 },
      { text: "zara leather slingback shoes", size: 24, color: cz, x: 80, y: 165 },
    ],
  },
};

export const paidSearch: ChannelConfig = {
  title: "Paid Search",
  trend: {
    ticks: [0, 2 * M, 4 * M, 6 * M],
    series: ser([0.75, 0.61, 0.89, 0.41, 0.03, 0.17, 0.2], [4.7, 3.58, 4.06, 4.16, 4.6, 4.23, 4.9], [3.44, 2.86, 3.68, 2.93, 2.8, 2.86, 2.9]),
  },
  desktop: {
    ticks: [0, 500 * K, 1 * M, 1.5 * M, 2 * M],
    series: ser([0.14, 0.15, 0.19, 0.1, 0.05, 0.09, 0.15], [1.32, 1.16, 1.39, 1.53, 1.8, 1.58, 1.5], [0.93, 1.11, 1.08, 0.95, 0.99, 0.85, 0.9]),
  },
  mobile: {
    ticks: [0, 1 * M, 2 * M, 3 * M, 4 * M],
    series: ser([0.61, 0.45, 0.68, 0.3, 0, 0.15, 0.2], [3.39, 2.43, 2.64, 2.64, 2.8, 2.7, 2.7], [2.52, 1.73, 2.59, 1.98, 1.8, 2.0, 2.1]),
  },
  growing: [{ kind: "Spiked", pct: "457.55%", url: "zara.com", value: "8.6K" }],
  sourcesExport: true,
  sources: [
    { name: "google.com", delta: "172.04%", up: true, share: "0.32%", h: 157 },
    { name: "docs.google.com", delta: "100%", up: true, share: "< 0.01%", h: 35 },
    { name: "google.ie", delta: "100%", up: true, share: "< 0.01%", h: 35 },
  ],
  keywords: {
    note: "Data shown for United States, Desktop",
    words: [
      { text: "square open toe heels", size: 24, color: ch, x: 197, y: 21 },
      { text: "blue jean set", size: 28, color: ca, x: 258, y: 53 },
      { text: "pointy kitten heels", size: 48, color: cz, x: 91, y: 84 },
      { text: "h and m tanks", size: 28, color: ch, x: 178, y: 139 },
      { text: "black low rise capri", size: 26, color: cz, x: 144, y: 173 },
    ],
  },
};
