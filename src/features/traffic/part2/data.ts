export const months = ["Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026"];

export type Triple = { zara: (number | null)[]; asos: (number | null)[]; hm: (number | null)[] };

export type GrowingPage = { kind: "Spiked" | "Trending up"; pct: string; url: string; value: string };

export type SourceRow = { label: string; change: string; up: boolean; share: string; h: number };

type ChannelReportData = {
  title: string;
  total: { ticks: number[]; data: Triple };
  desktop: { ticks: number[]; data: Triple };
  mobile: { ticks: number[]; data: Triple };
  growing: Record<string, GrowingPage[]>;
  sources?: Record<string, SourceRow[]>;
};

const M = 1e6;
const K = 1e3;

const socialSourcesAsos: SourceRow[] = [
  { label: "l.facebook.com", change: "38.4%", up: true, share: "0.21%", h: 55 },
  { label: "instagram.com", change: "12.08%", up: true, share: "0.17%", h: 46 },
  { label: "youtube.com", change: "4.51%", up: false, share: "0.08%", h: 37 },
  { label: "pinterest.com", change: "21.9%", up: true, share: "0.06%", h: 35 },
  { label: "l.instagram.com", change: "7.3%", up: false, share: "0.05%", h: 32 },
];

const socialSourcesHm: SourceRow[] = [
  { label: "instagram.com", change: "88.1%", up: true, share: "0.41%", h: 58 },
  { label: "l.facebook.com", change: "143.6%", up: true, share: "0.33%", h: 48 },
  { label: "l.instagram.com", change: "65.02%", up: true, share: "0.19%", h: 37 },
  { label: "facebook.com", change: "9.87%", up: false, share: "0.1%", h: 35 },
  { label: "youtube.com", change: "3.4%", up: true, share: "0.07%", h: 27 },
];

export const channelReports: Record<"organicSocial" | "paidSocial" | "email" | "displayAds", ChannelReportData> = {
  organicSocial: {
    title: "Organic Social",
    total: {
      ticks: [0, 1 * M, 2 * M, 3 * M],
      data: {
        zara: [0.58, 0.61, 0.7, 0.68, 0.34, 0.51, 0.75].map((v) => v * M),
        asos: [0.375, 0.29, 0.31, 0.41, 0.66, 1.64, 2.08].map((v) => v * M),
        hm: [1.53, 0.87, 0.94, 1.14, 1.35, 2.61, 2.78].map((v) => v * M),
      },
    },
    desktop: {
      ticks: [0, 0.5 * M, 1 * M, 1.5 * M],
      data: {
        zara: [0.305, 0.23, 0.27, 0.32, 0.26, 0.305, 0.35].map((v) => v * M),
        asos: [0.15, 0.11, 0.127, 0.29, 0.45, 0.64, 0.62].map((v) => v * M),
        hm: [0.66, 0.44, 0.53, 0.66, 0.9, 1.29, 1.19].map((v) => v * M),
      },
    },
    mobile: {
      ticks: [0, 0.5 * M, 1 * M, 1.5 * M, 2 * M],
      data: {
        zara: [0.24, 0.34, 0.4, 0.35, 0.07, 0.19, 0.25].map((v) => v * M),
        asos: [0.2, 0.16, 0.16, 0.11, 0.22, 1.0, 1.1].map((v) => v * M),
        hm: [0.85, 0.41, 0.375, 0.45, 0.41, 1.6, 1.7].map((v) => v * M),
      },
    },
    growing: {
      "zara.com": [
        { kind: "Spiked", pct: "70K%", url: "zara.com/ticket", value: "1.4K" },
        { kind: "Trending up", pct: "8.3K%", url: "zara.com/cl/es...l7139.html", value: "168" },
        { kind: "Trending up", pct: "8.2K%", url: "zara.com/tr/tr...l8862.html", value: "83" },
        { kind: "Trending up", pct: "6.7K%", url: "zara.com/us/...23145.html", value: "136" },
        { kind: "Trending up", pct: "5.9K%", url: "zara.com/mx/...40211.html", value: "121" },
      ],
      "asos.com": [
        { kind: "Spiked", pct: "12.4K%", url: "asos.com/women/...cid=4169", value: "2.1K" },
        { kind: "Trending up", pct: "3.1K%", url: "asos.com/us/...prd/2047", value: "311" },
        { kind: "Trending up", pct: "2.6K%", url: "asos.com/men/...cid=7616", value: "204" },
        { kind: "Trending up", pct: "1.9K%", url: "asos.com/au/...prd/9981", value: "96" },
        { kind: "Trending up", pct: "1.2K%", url: "asos.com/fr/...cid=2623", value: "74" },
      ],
      "hm.com": [
        { kind: "Spiked", pct: "44.8K%", url: "hm.com/en_gb/...sale.html", value: "3.3K" },
        { kind: "Trending up", pct: "6.2K%", url: "hm.com/de_de/...0123.html", value: "410" },
        { kind: "Trending up", pct: "4.4K%", url: "hm.com/sv_se/...1177.html", value: "256" },
        { kind: "Trending up", pct: "3.9K%", url: "hm.com/en_us/...8810.html", value: "189" },
        { kind: "Trending up", pct: "2.2K%", url: "hm.com/fr_fr/...4402.html", value: "97" },
      ],
    },
    sources: {
      "zara.com": [
        { label: "l.facebook.com", change: "1.1K%", up: true, share: "0.13%", h: 52 },
        { label: "instagram.com", change: "69.18%", up: true, share: "0.11%", h: 44 },
        { label: "l.instagram.com", change: "283.38%", up: true, share: "0.09%", h: 37 },
        { label: "youtube.com", change: "22.02%", up: false, share: "0.09%", h: 37 },
        { label: "facebook.com", change: "14.24%", up: false, share: "0.06%", h: 35 },
      ],
      "asos.com": socialSourcesAsos,
      "hm.com": socialSourcesHm,
    },
  },
  paidSocial: {
    title: "Paid Social",
    total: {
      ticks: [0, 50 * K, 100 * K, 150 * K],
      data: {
        zara: [4, 2, 2, 6, 0, 0.5, 0.5].map((v) => v * K),
        asos: [108, 71, 85, 139, 120, 136, 134].map((v) => v * K),
        hm: [50, 48, 65, 32, 61, 28, 32].map((v) => v * K),
      },
    },
    desktop: {
      ticks: [0, 50 * K, 100 * K, 150 * K],
      data: {
        zara: [0.2, 1.8, 1.8, 0.9, 0, 0.3, 0].map((v) => v * K),
        asos: [70, 38, 47, 61, 82, 119, 120].map((v) => v * K),
        hm: [49, 41, 57, 29, 41, 21, 30].map((v) => v * K),
      },
    },
    mobile: {
      ticks: [0, 20 * K, 40 * K, 60 * K, 80 * K],
      data: {
        zara: [4, null, null, 5, null, null, null].map((v) => (v == null ? null : v * K)),
        asos: [38, 33, 38, 78, 37, 22, 20].map((v) => v * K),
        hm: [null, 7, 7.2, 3, 20, 10, 9].map((v) => (v == null ? null : v * K)),
      },
    },
    growing: { "zara.com": [], "asos.com": [], "hm.com": [] },
    sources: {
      "zara.com": [
        { label: "instagram.com", change: "100%", up: true, share: "< 0.01%", h: 101 },
        { label: "l.facebook.com", change: "100%", up: true, share: "< 0.01%", h: 45 },
        { label: "youtube.com", change: "100%", up: true, share: "< 0.01%", h: 36 },
        { label: "web.whatsapp.com", change: "100%", up: true, share: "< 0.01%", h: 35 },
      ],
      "asos.com": [
        { label: "l.facebook.com", change: "18.5%", up: true, share: "0.38%", h: 96 },
        { label: "instagram.com", change: "7.44%", up: false, share: "0.16%", h: 50 },
        { label: "l.instagram.com", change: "31.2%", up: true, share: "0.05%", h: 35 },
        { label: "youtube.com", change: "2.07%", up: true, share: "0.03%", h: 35 },
      ],
      "hm.com": [
        { label: "instagram.com", change: "52.3%", up: true, share: "0.12%", h: 90 },
        { label: "l.facebook.com", change: "11.9%", up: false, share: "0.07%", h: 56 },
        { label: "l.instagram.com", change: "4.6%", up: true, share: "0.02%", h: 35 },
        { label: "tiktok.com", change: "100%", up: true, share: "< 0.01%", h: 35 },
      ],
    },
  },
  email: {
    title: "Email",
    total: {
      ticks: [0, 0.5 * M, 1 * M, 1.5 * M],
      data: {
        zara: [0.98, 0.675, 0.735, 0.84, 0.77, 0.495, 0.6].map((v) => v * M),
        asos: [0.7, 0.74, 1.08, 0.95, 1.15, 1.04, 1.02].map((v) => v * M),
        hm: [0.99, 0.87, 0.89, 1.08, 1.22, 0.92, 0.94].map((v) => v * M),
      },
    },
    desktop: {
      ticks: [0, 200 * K, 400 * K, 600 * K, 800 * K],
      data: {
        zara: [420, 330, 380, 464, 477, 300, 330].map((v) => v * K),
        asos: [250, 300, 420, 380, 460, 450, 440].map((v) => v * K),
        hm: [495, 415, 540, 686, 786, 555, 564].map((v) => v * K),
      },
    },
    mobile: {
      ticks: [0, 200 * K, 400 * K, 600 * K, 800 * K],
      data: {
        zara: [573, 350, 360, 390, 300, 200, 270].map((v) => v * K),
        asos: [450, 495, 768, 559, 709, 600, 590].map((v) => v * K),
        hm: [482, 473, 350, 400, 430, 370, 380].map((v) => v * K),
      },
    },
    growing: {
      "zara.com": [
        { kind: "Spiked", pct: "20.1K%", url: "zara.com/se", value: "403" },
        { kind: "Trending up", pct: "9.2K%", url: "zara.com/kr/ko...-l391.html", value: "373" },
        { kind: "Trending up", pct: "7.9K%", url: "zara.com/ro/ro...l1180.html", value: "80" },
        { kind: "Trending up", pct: "5.2K%", url: "zara.com/br/p...l1400.html", value: "106" },
        { kind: "Trending up", pct: "4.8K%", url: "zara.com/pl/...l1020.html", value: "92" },
      ],
      "asos.com": [
        { kind: "Spiked", pct: "8.8K%", url: "asos.com/discover/...", value: "912" },
        { kind: "Trending up", pct: "2.4K%", url: "asos.com/us/...prd/5561", value: "140" },
        { kind: "Trending up", pct: "1.7K%", url: "asos.com/women/...cid=27", value: "118" },
        { kind: "Trending up", pct: "1.1K%", url: "asos.com/men/...cid=1059", value: "66" },
        { kind: "Trending up", pct: "940%", url: "asos.com/de/...prd/4410", value: "51" },
      ],
      "hm.com": [
        { kind: "Spiked", pct: "15.3K%", url: "hm.com/member/...", value: "1.2K" },
        { kind: "Trending up", pct: "5.5K%", url: "hm.com/en_gb/...6621.html", value: "288" },
        { kind: "Trending up", pct: "3.2K%", url: "hm.com/de_de/...3008.html", value: "143" },
        { kind: "Trending up", pct: "2.8K%", url: "hm.com/en_us/...7713.html", value: "120" },
        { kind: "Trending up", pct: "1.6K%", url: "hm.com/sv_se/...2290.html", value: "77" },
      ],
    },
  },
  displayAds: {
    title: "Display Ads",
    total: {
      ticks: [0, 0.5 * M, 1 * M],
      data: {
        zara: [0.44, 0.255, 0.31, 0.165, 0.005, 0.057, 0.06].map((v) => v * M),
        asos: [0.955, 0.65, 0.375, 0.44, 0.6, 0.795, 0.74].map((v) => v * M),
        hm: [0.79, 0.6, 0.215, 0.425, 0.36, 0.665, 0.64].map((v) => v * M),
      },
    },
    desktop: {
      ticks: [0, 5 * K, 10 * K, 15 * K, 20 * K],
      data: {
        zara: [0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2].map((v) => v * K),
        asos: [0.3, 0.8, 0.3, 0.2, 0.3, 0.2, 0.2].map((v) => v * K),
        hm: [15.7, 12.2, 3.1, 1.2, 0.6, 0.3, 0.4].map((v) => v * K),
      },
    },
    mobile: {
      ticks: [0, 0.5 * M, 1 * M],
      data: {
        zara: [0.43, 0.25, 0.3, 0.16, 0.005, 0.05, 0.06].map((v) => v * M),
        asos: [0.94, 0.64, 0.37, 0.43, 0.59, 0.79, 0.73].map((v) => v * M),
        hm: [0.77, 0.58, 0.2, 0.41, 0.35, 0.65, 0.62].map((v) => v * M),
      },
    },
    growing: { "zara.com": [], "asos.com": [], "hm.com": [] },
  },
};

export type FlowRow = { domain: string; note?: string; cat: string; channel?: string; split: number[] };

const r = (domain: string, cat: string, channel: string, split: number[], note?: string): FlowRow => ({ domain, cat, channel, split, note });

export const sourceRows: FlowRow[] = [
  r("hm.com", "CB", "Direct", [0, 0, 1]),
  r("zara.com", "CBL", "Direct", [1, 0, 0]),
  r("google.com", "LDW", "Organic Search", [0.31, 0.18, 0.51], "Google Organic Search"),
  r("asos.com", "CBL", "Direct", [0, 1, 0]),
  r("google.com", "LDW", "Paid Search", [0.045, 0.57, 0.385], "Google Paid Search"),
  r("googleadservices.com", "", "Display Ads", [0.045, 0.53, 0.425], "Google Display Ads"),
  r("linksynergy.com", "LW", "Referral", [0, 0.045, 0.955]),
  r("klarna.com", "$L", "Referral", [0.08, 0.52, 0.4]),
  r("duckduckgo.com", "", "Organic Search", [0.29, 0.21, 0.5]),
  r("l.facebook.com", "", "Organic Social", [0.135, 0.045, 0.82]),
  r("apple.com", "LDW", "Referral", [0.045, 0.505, 0.45]),
  r("chatgpt.com", "", "AI Traffic", [0.12, 0.44, 0.44]),
  r("facebook.com", "LD", "Organic Social", [0.09, 0.34, 0.57]),
  r("pinterest.com", "LD", "Organic Social", [0.06, 0.37, 0.57]),
  r("youtube.com", "LDD", "Organic Social", [0.146, 0.35, 0.504]),
  r("instagram.com", "LDD", "Organic Social", [0.18, 0.36, 0.46]),
  r("ecosia.org", "F", "Organic Search", [0.2, 0.2, 0.6]),
  r("bing.com", "LPD", "Organic Search", [0.25, 0.19, 0.56]),
  r("brave.com", "LLS", "Referral", [0.12, 0.22, 0.66]),
  r("canva.com", "LL", "Referral", [0.05, 0.45, 0.5]),
  r("ikea.com", "CL", "Referral", [0.1, 0.6, 0.3]),
  r("disneyplus.com", "PDLW", "Referral", [0.05, 0.5, 0.45]),
  r("revolut.com", "$D", "Referral", [0.05, 0.54, 0.41]),
  r("yahoo.com", "LDD", "Organic Search", [0.22, 0.3, 0.48]),
  r("paypal.com", "$LL", "Referral", [0.14, 0.44, 0.42]),
  r("tiktok.com", "PL", "Organic Social", [0.1, 0.36, 0.54]),
  r("perplexity.ai", "", "AI Traffic", [0.16, 0.41, 0.43]),
  r("amazon.com", "CL", "Referral", [0.07, 0.49, 0.44]),
  r("reddit.com", "LD", "Organic Social", [0.09, 0.47, 0.44]),
  r("outlook.live.com", "LW", "Email", [0.11, 0.46, 0.43]),
  r("mail.google.com", "LW", "Email", [0.13, 0.4, 0.47]),
  r("vinted.com", "CB", "Referral", [0.12, 0.33, 0.55]),
  r("zalando.com", "CB", "Referral", [0.08, 0.39, 0.53]),
  r("klarna.se", "$L", "Referral", [0.04, 0.35, 0.61]),
  r("t.co", "", "Organic Social", [0.1, 0.52, 0.38]),
  r("yandex.ru", "LD", "Organic Search", [0.46, 0.2, 0.34]),
  r("naver.com", "LDD", "Organic Search", [0.35, 0.06, 0.59]),
  r("gemini.google.com", "", "AI Traffic", [0.14, 0.45, 0.41]),
  r("spotify.com", "PL", "Referral", [0.05, 0.47, 0.48]),
  r("netflix.com", "PL", "Referral", [0.06, 0.45, 0.49]),
  r("shopify.com", "CLW", "Referral", [0.03, 0.62, 0.35]),
  r("trustpilot.com", "LD", "Referral", [0.07, 0.56, 0.37]),
  r("baidu.com", "LD", "Organic Search", [0.58, 0.04, 0.38]),
  r("booking.com", "ULH", "Referral", [0.06, 0.52, 0.42]),
  r("wikipedia.org", "LDD", "Referral", [0.05, 0.44, 0.51]),
  r("wolt.com", "LG", "Referral", [0.05, 0.43, 0.52]),
  r("euronews.com", "DD", "Referral", [0, 0.51, 0.49]),
  r("ubereats.com", "LK", "Referral", [0.05, 0.49, 0.46]),
  r("aliexpress.com", "LC", "Referral", [0.1, 0.42, 0.48]),
  r("bahn.de", "TU", "Referral", [0, 0.47, 0.53]),
];

export const destinationRows: FlowRow[] = [
  r("google.com", "LDW", "", [0.34, 0.3, 0.36]),
  r("jscrambler.com", "SL", "", [1, 0, 0]),
  r("apple.com", "LDW", "", [0.08, 0.41, 0.51]),
  r("paypal.com", "$LL", "", [0.26, 0.34, 0.4]),
  r("youtube.com", "LDD", "", [0.14, 0.48, 0.38]),
  r("ikea.com", "CL", "", [0.12, 0.62, 0.26]),
  r("whatsapp.com", "LD", "", [0.07, 0.5, 0.43]),
  r("instagram.com", "LDD", "", [0.21, 0.33, 0.46]),
  r("facebook.com", "LD", "", [0.11, 0.37, 0.52]),
  r("klarna.com", "$L", "", [0.09, 0.55, 0.36]),
  r("adyen.com", "$LW", "", [0.52, 0.18, 0.3]),
  r("pinterest.com", "LD", "", [0.06, 0.4, 0.54]),
  r("tiktok.com", "PL", "", [0.12, 0.35, 0.53]),
  r("amazon.com", "CL", "", [0.08, 0.5, 0.42]),
  r("bing.com", "LPD", "", [0.24, 0.2, 0.56]),
  r("wikipedia.org", "LDD", "", [0.05, 0.45, 0.5]),
  r("linkedin.com", "LW", "", [0.18, 0.41, 0.41]),
  r("reddit.com", "LD", "", [0.1, 0.46, 0.44]),
  r("zalando.com", "CB", "", [0.09, 0.38, 0.53]),
  r("vinted.com", "CB", "", [0.12, 0.34, 0.54]),
  r("netflix.com", "PL", "", [0.07, 0.44, 0.49]),
  r("spotify.com", "PL", "", [0.06, 0.46, 0.48]),
  r("booking.com", "ULH", "", [0.06, 0.51, 0.43]),
  r("chatgpt.com", "", "", [0.15, 0.43, 0.42]),
  r("outlook.live.com", "LW", "", [0.12, 0.45, 0.43]),
];

export const sourceChannels: [string, string][] = [
  ["Total", "4,738"],
  ["AI Traffic", "10"],
  ["Referral", "4,278"],
  ["Organic Search", "186"],
  ["Google AI Mode", "1"],
  ["Paid Search", "34"],
  ["Organic Social", "111"],
];

export const moreChannels: [string, string][] = [
  ["Paid Social", "12"],
  ["Email", "57"],
  ["Display Ads", "48"],
  ["Direct", "3"],
];

export const categories = ["Shopping", "Fashion & Apparel", "Computers & Electronics", "News & Media", "Business & Industrial", "Finance", "Travel", "Arts & Entertainment", "Food & Drink"];

type SubfolderRow = { path: string; share: number; pv: string; uv: string; visits: string; ppv: string; dur: string; bounce: string };

const sf = (path: string, share: number, pv: string, uv: string, visits: string, ppv: string, dur = "05:12", bounce = "38.4%"): SubfolderRow => ({ path, share, pv, uv, visits, ppv, dur, bounce });

const midFolders: [string, number][] = [
  ["/fr/", 4.41], ["/it/", 3.92], ["/mx/", 3.35], ["/pl/", 3.02], ["/de/de/", 2.84], ["/fr/fr/", 2.61], ["/it/it/", 2.3], ["/nl/", 2.08],
  ["/tr/", 1.94], ["/pt/", 1.77], ["/ro/", 1.61], ["/gr/", 1.5], ["/ch/", 1.43], ["/be/", 1.36], ["/jp/", 1.29], ["/kr/", 1.22],
  ["/ca/", 1.16], ["/au/", 1.11], ["/se/", 1.06], ["/ie/", 1.02], ["/cz/", 0.98], ["/hu/", 0.95], ["/sa/", 0.92], ["/ae/", 0.9],
  ["/il/", 0.87], ["/eg/", 0.85], ["/ma/", 0.83], ["/in/", 0.81], ["/br/", 0.79], ["/ar/", 0.78], ["/co/", 0.77], ["/cl/", 0.76],
  ["/pe/", 0.75], ["/uk/en/woman/", 0.74], ["/us/en/woman/", 0.73], ["/bg/", 0.72],
];

const kfmt = (v: number) => (v >= 1e6 ? `${+(v / 1e6).toFixed(1)}M` : `${+(v / 1e3).toFixed(1)}K`);

export const subfolderRows: SubfolderRow[] = [
  sf("/us/", 14.14, "10.5M", "4.9M", "9.1M", "6.4", "07:41", "31.2%"),
  sf("/us/en/", 11.94, "9.9M", "4.6M", "7.7M", "6.5", "07:55", "30.8%"),
  sf("/uk/", 7.72, "5.3M", "2.1M", "5M", "5.4", "06:20", "35.1%"),
  sf("/es/", 7.57, "5.4M", "2.5M", "4.9M", "11", "09:02", "27.4%"),
  sf("/uk/en/", 6.8, "5.2M", "2M", "4.4M", "5.3", "06:11", "35.9%"),
  sf("/es/es/", 5.24, "4.5M", "2M", "3.4M", "11.6", "09:30", "26.6%"),
  sf("/de/", 4.73, "3.3M", "1.6M", "3M", "6.1", "06:48", "33.3%"),
  ...midFolders.map(([p, s], i) => sf(p, s, kfmt(s * 643000 * (1.1 + (i % 5) * 0.2)), kfmt(s * 643000 * (0.45 + (i % 3) * 0.08)), kfmt(s * 643000), `${(4 + (i % 7) * 1.1).toFixed(1)}`, `0${4 + (i % 5)}:${10 + ((i * 7) % 49)}`, `${(30 + (i % 9) * 1.7).toFixed(1)}%`)),
  sf("/mx/es/", 0.71, "635K", "393K", "456.2K", "5.1"),
  sf("/at/", 0.69, "487.8K", "162.6K", "446K", "8.7"),
  sf("/ticket/", 0.69, "454.1K", "255.9K", "443.4K", "1.7", "01:02", "71.3%"),
  sf("/ua/", 0.66, "470.7K", "168.2K", "424.5K", "127.7", "21:40", "12.1%"),
  sf("/es/en/", 0.64, "549.2K", "314.3K", "414K", "9.9"),
  sf("/rs/sr/", 0.64, "462.3K", "245.4K", "411.3K", "4.4"),
  sf("/us/en/shop/", 0.59, "1.2M", "519.7K", "381K", "3.9"),
];

export const subdomainRows: { name: string; visits: string; desktop: string; mobile: string; ppv: string; dur: string }[] = [
  { name: "zara.com", visits: "64.3M", desktop: "42.71%", mobile: "57.29%", ppv: "6.8", dur: "07:12" },
  { name: "account.zara.com", visits: "1.7M", desktop: "20.33%", mobile: "79.67%", ppv: "3.1", dur: "03:40" },
  { name: "news.zara.com", visits: "271.3K", desktop: "0.6%", mobile: "99.4%", ppv: "1.4", dur: "00:52" },
  { name: "payments.zara.com", visits: "179K", desktop: "25.81%", mobile: "74.19%", ppv: "2.2", dur: "02:05" },
  { name: "cx.zara.com", visits: "27.7K", desktop: "0.43%", mobile: "99.57%", ppv: "1.9", dur: "01:33" },
  { name: "app.zara.com", visits: "15.3K", desktop: "0%", mobile: "100%", ppv: "1.2", dur: "00:40" },
  { name: "www.zara.com", visits: "3.2K", desktop: "0%", mobile: "100%", ppv: "1", dur: "00:12" },
  { name: "static.zara.com", visits: "1.1K", desktop: "64.2%", mobile: "35.8%", ppv: "1", dur: "00:08" },
];

export const pageGroupDomains = [
  { name: "zara.com (Women jeans)", color: "#5d62de" },
  { name: "asos.com (Women jeans)", color: "#2ee6b1" },
  { name: "www2.hm.com (Women jeans)", color: "#bd87f9" },
];

export const pageGroupSummary: { cells: [string, boolean][] }[] = [
  { cells: [["338.7K", false], ["249.6K", false], ["4.86%", true], ["1.3", true], ["11:40", false], ["41.02%", true]] },
  { cells: [["22.3K", true], ["12.3K", true], ["8.14%", true], ["1.1", false], ["23:35", true], ["38.5%", false]] },
  { cells: [["81.1K", true], ["72.9K", true], ["6.09%", true], ["1.5", false], ["19:27", true], ["44.87%", true]] },
];

export const pageGroupMetrics = ["Visits", "Unique Visitors", "Purchase Conversion", "Pages / Visit", "Avg. Visit Duration", "Bounce Rate"] as const;

export const pageGroupTrend: Record<(typeof pageGroupMetrics)[number], { ticks: number[]; data: Triple; fmt?: "pct" | "num" | "time" }> = {
  Visits: { ticks: [0, 100e3, 200e3, 300e3, 400e3], data: { zara: [266, 317, 389, 337, 398, 339].map((v) => v * 1e3), asos: [100, 47, 16, 29, 25, 22.3].map((v) => v * 1e3), hm: [119, 105, 90, 110, 74, 81.1].map((v) => v * 1e3) } },
  "Unique Visitors": { ticks: [0, 100e3, 200e3, 300e3], data: { zara: [201, 240, 288, 251, 290, 249.6].map((v) => v * 1e3), asos: [61, 30, 11, 18, 14, 12.3].map((v) => v * 1e3), hm: [104, 93, 80, 98, 66, 72.9].map((v) => v * 1e3) } },
  "Purchase Conversion": { ticks: [0, 3, 6, 9], fmt: "pct", data: { zara: [5.2, 5.4, 5.1, 4.9, 5.0, 4.86], asos: [7.1, 7.5, 7.9, 7.6, 8.0, 8.14], hm: [5.5, 5.8, 5.9, 6.0, 5.95, 6.09] } },
  "Pages / Visit": { ticks: [0, 0.5, 1, 1.5, 2], fmt: "num", data: { zara: [1.2, 1.25, 1.2, 1.3, 1.28, 1.3], asos: [1.2, 1.15, 1.1, 1.14, 1.12, 1.1], hm: [1.6, 1.55, 1.6, 1.52, 1.54, 1.5] } },
  "Avg. Visit Duration": { ticks: [0, 600, 1200, 1800], fmt: "time", data: { zara: [760, 720, 690, 705, 712, 700], asos: [1300, 1380, 1400, 1370, 1390, 1415], hm: [1100, 1130, 1150, 1170, 1160, 1167] } },
  "Bounce Rate": { ticks: [0, 20, 40, 60], fmt: "pct", data: { zara: [43, 42, 41.5, 41.8, 41.2, 41.02], asos: [37, 38, 39, 38.8, 38.4, 38.5], hm: [46, 45.5, 45, 44.6, 44.9, 44.87] } },
};

export const pageGroupGrowing: Record<string, { pct: string; a: string; b: string; url: string }[]> = {
  "zara.com (Women jeans)": [
    { pct: "22.2K%", a: "446", b: "2", url: "zara.com/us/en/...l5233.html" },
    { pct: "2.9K%", a: "425", b: "14", url: "zara.com/us/en...30248.html" },
    { pct: "1.1K%", a: "21.7K", b: "1.8K", url: "zara.com/us/en/...l1140.html" },
    { pct: "524.51%", a: "7.4K", b: "1.2K", url: "zara.com/us/e...entmethods" },
    { pct: "310.2%", a: "3.9K", b: "950", url: "zara.com/us/en/...l0917.html" },
  ],
  "asos.com (Women jeans)": [
    { pct: "1.8K%", a: "1.3K", b: "68", url: "asos.com/us/women/...cid=3630" },
    { pct: "640.3%", a: "912", b: "123", url: "asos.com/us/asos...prd/2204" },
    { pct: "212.9%", a: "2.1K", b: "671", url: "asos.com/us/women/...cid=9577" },
    { pct: "118.4%", a: "488", b: "223", url: "asos.com/us/topsh...prd/6512" },
    { pct: "64.2%", a: "322", b: "196", url: "asos.com/us/women/...cid=1937" },
  ],
  "www2.hm.com (Women jeans)": [
    { pct: "4.4K%", a: "5.1K", b: "113", url: "www2.hm.com/en_us/...jeans.html" },
    { pct: "905.7%", a: "2.4K", b: "239", url: "www2.hm.com/en_us/...wide.html" },
    { pct: "377.1%", a: "8.8K", b: "1.8K", url: "www2.hm.com/en_us/...slim.html" },
    { pct: "150.6%", a: "1.9K", b: "758", url: "www2.hm.com/en_us/...flare.html" },
    { pct: "88.3%", a: "1.2K", b: "637", url: "www2.hm.com/en_us/...mom.html" },
  ],
};

export const channelNames = ["Direct", "AI Traffic", "Referral", "Organic Search", "Google AI Mode", "Paid Search", "Organic Social", "Paid Social", "Email", "Display Ads"];

export const channelBars: number[][] = [
  [261, 22, 37],
  [1.2, 0, 1.2],
  [10, 2, 2],
  [60, 2, 37],
  [0, 0, 0],
  [2, 2, 2],
  [2, 0, 2],
  [0, 0, 0],
  [2, 2, 2],
  [1.5, 1.2, 1.5],
].map((r) => r.map((v) => v * 1e3));

export const journeySources: Record<string, { label: string; pct: string; up: boolean; h: number }[]> = {
  "zara.com (Women jeans)": [
    { label: "Direct", pct: "77.72%", up: false, h: 162 },
    { label: "google.com", pct: "15.86%", up: false, h: 34 },
    { label: "yahoo.com", pct: "2.47%", up: true, h: 58 },
    { label: "giftful.com", pct: "0.37%", up: true, h: 59 },
    { label: "duckduckgo.com", pct: "0.2%", up: true, h: 58 },
  ],
  "asos.com (Women jeans)": [
    { label: "google.com", pct: "48.1%", up: true, h: 120 },
    { label: "Direct", pct: "31.4%", up: false, h: 76 },
    { label: "bing.com", pct: "6.2%", up: true, h: 58 },
    { label: "instagram.com", pct: "2.9%", up: true, h: 59 },
    { label: "pinterest.com", pct: "1.1%", up: false, h: 58 },
  ],
  "www2.hm.com (Women jeans)": [
    { label: "Direct", pct: "58.3%", up: true, h: 140 },
    { label: "google.com", pct: "30.2%", up: false, h: 56 },
    { label: "hm.com", pct: "4.8%", up: true, h: 58 },
    { label: "bing.com", pct: "1.9%", up: true, h: 59 },
    { label: "yahoo.com", pct: "0.6%", up: false, h: 58 },
  ],
};

export const countryCols = [
  { name: "United States", code: "US", width: 177 },
  { name: "Russia", code: "RU", width: 178 },
  { name: "Belgium", code: "BE", width: 187 },
  { name: "United Kingdom", code: "GB", width: 186 },
  { name: "Spain", code: "ES", width: 186 },
];

export const countryByGroup: { visits: [string, string][]; uv: [string, string][] }[] = [
  { visits: [["95.16%", "322.3K"], ["1.48%", "5K"], ["0.23%", "766"], ["0.03%", "114"], ["0.02%", "81"]], uv: [["94.8%", "236.6K"], ["1.61%", "4K"], ["0.25%", "624"], ["0.04%", "99"], ["0.02%", "52"]] },
  { visits: [["2.62%", "585"], ["", "n/a"], ["14.02%", "3.1K"], ["73.46%", "16.4K"], ["1.2%", "268"]], uv: [["2.9%", "357"], ["", "n/a"], ["13.4%", "1.6K"], ["74.1%", "9.1K"], ["1.1%", "135"]] },
  { visits: [["84.64%", "68.7K"], ["0.86%", "695"], ["", "n/a"], ["0.14%", "117"], ["6.72%", "5.4K"]], uv: [["85.1%", "62K"], ["0.8%", "583"], ["", "n/a"], ["0.13%", "95"], ["6.5%", "4.7K"]] },
];

export type GeoRow = { name: string; code?: string; share: number; visits: string; uv: string; desktop: number; ppv: string; dur: string; bounce: string };

const g = (name: string, share: number, visits: string, uv: string, desktop: number, ppv: string, code?: string, dur = "06:24", bounce = "36.2%"): GeoRow => ({ name, code, share, visits, uv, desktop, ppv, dur, bounce });

function fill(list: [string, number, string?][], total: number, seed: number): GeoRow[] {
  return list.map(([name, share, code], i) => {
    const v = (share / 100) * total;
    const d = 30 + ((i * 7 + seed) % 23) + ((i * 3) % 7) / 10;
    return g(name, share, kfmt(v), kfmt(v * (0.42 + ((i + seed) % 5) * 0.03)), +d.toFixed(2), (5 + ((i + seed) % 6) * 0.6).toFixed(1).replace(/\.0$/, ""), code, `0${5 + (i % 4)}:${10 + ((i * 13) % 49)}`, `${(31 + ((i * 5) % 11) * 1.3).toFixed(1)}%`);
  });
}

export const usStateRows: GeoRow[] = [
  g("California", 14.57, "1.6M", "715.5K", 40.2, "7"),
  g("New York", 9.55, "1.1M", "447.8K", 39.5, "7.6"),
  g("Texas", 8.81, "988.4K", "459.8K", 38.97, "7"),
  g("Florida", 6.35, "711.6K", "328.8K", 39.94, "6.9"),
  ...fill(
    [
      ["Illinois", 4.4], ["New Jersey", 4.1], ["Pennsylvania", 3.6], ["Georgia", 3.2], ["Massachusetts", 2.9], ["Virginia", 2.7], ["Washington", 2.6], ["North Carolina", 2.5],
      ["Ohio", 2.4], ["Michigan", 2.2], ["Arizona", 2.1], ["Maryland", 1.9], ["Colorado", 1.8], ["Tennessee", 1.6], ["Minnesota", 1.4], ["Indiana", 1.3], ["Missouri", 1.2],
      ["Wisconsin", 1.1], ["Oregon", 1], ["Connecticut", 0.98], ["South Carolina", 0.95], ["Nevada", 0.9], ["Alabama", 0.8], ["Louisiana", 0.78], ["Utah", 0.75], ["Kentucky", 0.7],
      ["Oklahoma", 0.6], ["Iowa", 0.52], ["Kansas", 0.48], ["Arkansas", 0.45], ["Hawaii", 0.42], ["Mississippi", 0.4], ["New Mexico", 0.38], ["Nebraska", 0.35], ["Idaho", 0.33],
      ["New Hampshire", 0.3], ["Rhode Island", 0.29], ["Maine", 0.27], ["West Virginia", 0.25],
    ],
    11e6,
    2,
  ),
  g("District of Columbia", 0.23, "26.1K", "11.1K", 22.77, "6.4"),
  g("Delaware", 0.21, "23.4K", "11.5K", 20.59, "6"),
  g("Montana", 0.19, "21.2K", "9.8K", 21.65, "5.8"),
  g("South Dakota", 0.15, "16.4K", "8.6K", 20.55, "5.2"),
  g("North Dakota", 0.12, "13.5K", "6.8K", 17.76, "5"),
  g("Vermont", 0.12, "13.1K", "6.1K", 14.32, "5.7"),
  g("Wyoming", 0.1, "11.3K", "5.4K", 17.32, "4.9"),
  g("Alaska", 0.1, "10.8K", "5.4K", 14.11, "5.6"),
];

export const countryRows: GeoRow[] = [
  g("United States", 18.07, "11.6M", "5.3M", 39.68, "7", "US"),
  g("Spain", 7.81, "5M", "2.2M", 35.69, "10.9", "ES"),
  g("United Kingdom", 7.72, "5M", "1.6M", 39.35, "6.1", "GB"),
  g("France", 5.49, "3.5M", "1.6M", 34.16, "5.6", "FR"),
  ...fill(
    [
      ["Germany", 4.9, "DE"], ["Italy", 4.1, "IT"], ["Mexico", 3.6, "MX"], ["Poland", 2.8, "PL"], ["Netherlands", 2.3, "NL"], ["Turkey", 2.1, "TR"], ["Portugal", 1.9, "PT"],
      ["Romania", 1.7, "RO"], ["Greece", 1.6, "GR"], ["Switzerland", 1.4, "CH"], ["Belgium", 1.35, "BE"], ["Japan", 1.3, "JP"], ["South Korea", 1.2, "KR"], ["Canada", 1.15, "CA"],
      ["Australia", 1.05, "AU"], ["Sweden", 1, "SE"], ["Ireland", 0.95, "IE"], ["Czechia", 0.9, "CZ"], ["Hungary", 0.85, "HU"], ["Saudi Arabia", 0.8, "SA"],
      ["United Arab Emirates", 0.75, "AE"], ["Israel", 0.7, "IL"], ["Egypt", 0.66, "EG"], ["India", 0.62, "IN"], ["Brazil", 0.6, "BR"], ["Argentina", 0.56, "AR"],
      ["Colombia", 0.53, "CO"], ["Chile", 0.5, "CL"], ["Austria", 0.48, "AT"], ["Ukraine", 0.46, "UA"], ["Serbia", 0.44, "RS"], ["Bulgaria", 0.42, "BG"], ["Croatia", 0.41, "HR"],
      ["Kazakhstan", 0.4, "KZ"], ["China", 0.39, "CN"], ["Thailand", 0.38, "TH"], ["Philippines", 0.38, "PH"], ["Denmark", 0.37, "DK"], ["Norway", 0.37, "NO"],
    ] as [string, number, string][],
    64.2e6,
    4,
  ),
  g("Russia", 0.36, "232.1K", "111K", 90.57, "8", "RU"),
  g("Algeria", 0.35, "226.9K", "175.6K", 74.36, "2.9", "DZ"),
  g("Peru", 0.3, "195.3K", "86.7K", 67.68, "8", "PE"),
  g("Morocco", 0.3, "192.4K", "99K", 33.01, "4.4", "MA"),
  g("Hong Kong SAR", 0.29, "187.2K", "70K", 31.01, "5", "HK"),
  g("Lithuania", 0.27, "173.3K", "75.3K", 39.72, "5", "LT"),
  g("Slovakia", 0.26, "166.8K", "79.6K", 53.6, "7.5", "SK"),
];

export const businessRows: GeoRow[] = [
  g("EMEA", 61.23, "39.4M", "18.2M", 41.58, "12.2"),
  g("NA", 21.59, "13.9M", "6.2M", 42.35, "7.3"),
  g("APAC", 10.83, "7M", "3.6M", 41.65, "6.8"),
  g("LATAM", 6.36, "4.1M", "2.4M", 56.65, "6"),
];

export const regionRows: GeoRow[] = [
  ...fill(
    [
      ["Northern America", 19.9], ["Southern Europe", 18.2], ["Western Europe", 15.4], ["Northern Europe", 12.6], ["Eastern Europe", 7.8], ["Western Asia", 6.1], ["Central America", 4.3],
      ["Eastern Asia", 3.9], ["South America", 3.2], ["Northern Africa", 2.4], ["Australia and New Zealand", 1.6], ["South-Eastern Asia", 1.5], ["Southern Asia", 1.2], ["Southern Africa", 0.62],
    ],
    64.2e6,
    1,
  ),
  g("Western Africa", 0.33, "210.9K", "155.7K", 83.43, "4.2"),
  g("Eastern Africa", 0.11, "73.3K", "44.7K", 98.85, "10.3"),
  g("Central Asia", 0.09, "58.5K", "24.1K", 90.56, "10.4"),
  g("Caribbean", 0.09, "57.6K", "27.4K", 80.95, "8.8"),
  g("Middle Africa", 0.03, "17K", "6.4K", 98.54, "11.4"),
  g("Melanesia", 0.004, "66", "27", 100, "8.6"),
  g("Polynesia", 0.002, "28", "19", 100, "6.2"),
  g("Micronesia", 0.001, "9", "9", 100, "4"),
];

export const geoTrend = {
  usa: {
    ticks: [0, 1e6, 2e6, 3e6],
    series: [
      { name: "California", color: "#5d62de", data: [2.0, 1.68, 2.24, 1.97, 1.83, 1.61, 1.7] },
      { name: "New York", color: "#16c79a", data: [1.35, 1.08, 1.46, 1.28, 1.17, 1.06, 1.1] },
      { name: "Texas", color: "#f7a3a1", data: [1.3, 1.06, 1.41, 1.21, 1.11, 0.97, 1.0] },
      { name: "Florida", color: "#da3fda", data: [0.92, 0.76, 1.01, 0.89, 0.79, 0.7, 0.72] },
      { name: "Illinois", color: "#f6b80f", data: [0.56, 0.46, 0.62, 0.54, 0.48, 0.42, 0.43] },
    ].map((s) => ({ ...s, data: s.data.map((v) => v * 1e6) })),
  },
  countries: {
    ticks: [0, 5e6, 10e6, 15e6, 20e6],
    series: [
      { name: "United States", color: "#5d62de", data: [15.0, 12.3, 16.2, 14.2, 13.0, 11.6, 13.0] },
      { name: "Spain", color: "#16c79a", data: [5.4, 4.4, 4.7, 5.9, 6.1, 5.0, 5.0] },
      { name: "United Kingdom", color: "#f7a3a1", data: [7.0, 5.2, 5.8, 5.5, 5.7, 4.9, 5.0] },
      { name: "France", color: "#da3fda", data: [3.9, 3.1, 3.8, 4.0, 3.5, 3.4, 3.5] },
      { name: "Germany", color: "#f6b80f", data: [5.6, 3.9, 3.7, 4.3, 4.8, 3.5, 3.6] },
    ].map((s) => ({ ...s, data: s.data.map((v) => v * 1e6) })),
  },
  business: {
    ticks: [0, 20e6, 40e6, 60e6],
    series: [
      { name: "EMEA", color: "#5d62de", data: [44.1, 38.2, 45.9, 41.7, 40.3, 39.4, 40.1] },
      { name: "NA", color: "#16c79a", data: [18.3, 14.6, 19.9, 16.8, 15.5, 13.9, 14.3] },
      { name: "APAC", color: "#f7a3a1", data: [7.9, 6.8, 7.6, 7.5, 7.3, 7.0, 7.1] },
      { name: "LATAM", color: "#da3fda", data: [4.8, 4.3, 5.4, 5.8, 4.9, 4.1, 4.4] },
    ].map((s) => ({ ...s, data: s.data.map((v) => v * 1e6) })),
  },
  regions: {
    ticks: [0, 5e6, 10e6, 15e6, 20e6],
    series: [
      { name: "Northern America", color: "#5d62de", data: [16.4, 13.2, 17.5, 15.3, 14.1, 12.8, 13.5] },
      { name: "Southern Europe", color: "#16c79a", data: [13.1, 11.2, 12.4, 13.6, 14.2, 11.7, 11.9] },
      { name: "Western Europe", color: "#f7a3a1", data: [11.4, 9.1, 9.8, 10.4, 10.9, 9.9, 10.1] },
      { name: "Northern Europe", color: "#da3fda", data: [9.8, 7.9, 8.6, 8.4, 8.8, 8.1, 8.2] },
      { name: "Eastern Europe", color: "#f6b80f", data: [5.9, 4.8, 5.2, 5.4, 5.3, 5.0, 5.1] },
    ].map((s) => ({ ...s, data: s.data.map((v) => v * 1e6) })),
  },
};

export const greyCountries = ["Greenland", "Libya", "Niger", "Chad", "Sudan", "Central African Rep.", "Iran", "Syria", "Myanmar", "Namibia", "Papua New Guinea", "North Korea"];
export const greyBusiness = ["Libya", "Sudan", "Syria", "Iran", "Myanmar", "North Korea"];

export const countryShareByMap: Record<string, number> = {
  "United States of America": 18.07,
  Spain: 7.81,
  "United Kingdom": 7.72,
  France: 5.49,
  Germany: 4.9,
  Italy: 4.1,
  Mexico: 3.6,
};

export const businessShare: Record<string, number> = { EMEA: 61.23, NA: 21.59, APAC: 10.83, LATAM: 6.36 };
