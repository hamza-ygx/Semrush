import { brand } from "@/config/brand";

export const baFeatures = [
  {
    title: "Audit your backlink health from all sides",
    bullets: [
      "Investigate the quality of backlinks through 50+ parameters",
      "Group referring domains by metrics like IP, category or link type",
      "Check for good distribution of anchors and Authority Score",
    ],
  },
  {
    title: "Manage suspicious links that could hurt your rankings",
    bullets: ["Contact site owners right from the tool", "Send backlinks to your Disavow list", `Upload the Disavow file from ${brand.name} to Google`],
  },
  {
    title: "Keep all your backlink data in one place",
    bullets: [`Audit backlinks from the ${brand.name} database`, "Connect your Google Search Console account", "Import backlinks directly from a Majestic account or file"],
  },
  {
    title: "Monitor any significant changes",
    bullets: ["Receive alerts about new, broken, and lost backlinks", "Keep your eye on any spikes and drops", "Instantly catch possible spam attacks or Google penalties"],
  },
];

export const baKeyFeatures = [
  "50+ evaluation parameters",
  "Actionable Insights",
  "AI-based Toxicity score",
  "Built-in disavow workflow",
  "New, lost, and broken backlink data",
  "Error alerts for your target pages",
  "New target page alerts",
  "Outreach flow with site owners' email data",
  "Automated updates and alerts about changes",
];

export const baFaq = [
  {
    q: "Why Backlink Audit is important?",
    a: "Toxic backlinks can lead to manual actions or lost rankings. Regular audits help you spot harmful links early and keep your link profile clean.",
  },
  {
    q: "What metrics are available for each backlink in the tool?",
    a: "Each backlink comes with Toxicity Score, Authority Score, anchor type, referral traffic, link attributes, first and last seen dates and more.",
  },
  {
    q: `What does the ${brand.name} Toxicity score mean?`,
    a: "The Toxicity Score estimates how likely a referring domain is to be considered spammy or manipulative, based on dozens of toxic markers.",
  },
  {
    q: "How often is the data in the Backlink Audit Tool updated?",
    a: "You can recrawl your backlinks at any time or set an automatic schedule to update the audit once a week.",
  },
];

export const opscIdeas = [
  { code: "St", label: "Strategy Ideas", color: "#0091ff", count: 9, text: "Find out which of your pages are ranking the highest and optimize them to get more traffic." },
  { code: "Ba", label: "Backlinks Ideas", color: "#8fd94a", count: 24, text: "Discover which websites you should earn links from." },
  { code: "Te", label: "Technical SEO Ideas", color: "#ff8a2e", count: 39, text: "Get a structured list of technical issues found on your website." },
  { code: "Ux", label: "User Experience Ideas", color: "#b262ff", count: 12, text: "Connect your Google Analytics account and boost your user experience for better rankings." },
  { code: "Sf", label: "SERP Features Ideas", color: "#ff3a4f", count: 8, text: "Learn what you can do to get your webpage featured in special SERP results." },
  { code: "Se", label: "Semantic Ideas", color: "#7fcfff", count: 21, text: "Discover what important words are used by the websites in Google’s Top 10." },
  { code: "Co", label: "Content Ideas", color: "#12a90a", count: 142, text: "Adopt the best practices of Google’s top 10 performers." },
];

export const opscPages = [
  { prio: 3, url: "http://www.krispykreme.com/locate/\nlocation-search", ideas: 11 },
  { prio: 3, url: "http://www.krispykreme.com", ideas: 14 },
  { prio: 2, url: "http://www.krispykreme.com/locate/\nbowling-green", ideas: 12 },
  { prio: 1, url: "http://www.krispykreme.com/locate/\ncoffee-and-drinks/latte", ideas: 9 },
];

export const otiKeywords = ["rkjh", "rkjh se", "rkjh.se"];

export const sensorDates = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 7, 26 + i));
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
});

export const volatility: (number | null)[] = [
  0.57, 0.68, 0.9, 0.68, 0.68, 0.57, 0.57, 0.68, 0.68, 0.77, 0.77, 0.96, 1.89, 1.67, 2.48, null, null, 0.68, 0.68, 0.57, 2.06, 4.08, 4.47, 5.07, 5.48, 3.09, 1.8, 0.96, 1.97, 2.2,
];

export const overviewScores: [string, number][] = [
  ["All categories", 2.2],
  ["Arts & Entertainment", 1.5],
  ["Autos & Vehicles", 2.7],
  ["Beauty & Fitness", 1.9],
  ["Books & Literature", 0.9],
  ["Business & Industrial", 3.0],
  ["Computers & Electronics", 1.6],
  ["Finance", 2.7],
  ["Food & Drink", 3.4],
  ["Games", 2.5],
  ["Health", 0.8],
  ["Hobbies & Leisure", 1.7],
  ["Home & Garden", 1.9],
  ["Internet & Telecom", 2.2],
  ["Jobs & Education", 1.7],
  ["Law & Government", 2.1],
  ["News", 4.6],
  ["Online Communities", 2.7],
  ["People & Society", 2.2],
  ["Pets & Animals", 2.2],
  ["Real Estate", 0.9],
  ["Reference", 2.2],
  ["Science", 0.9],
  ["Shopping", 2.8],
  ["Sports", 2.7],
  ["Travel", 2.4],
];

export const deviationScores: [string, number][] = [
  ["All categories", 0.5],
  ["Business & Industrial", 1.0],
  ["Food & Drink", 0.9],
  ["Shopping", 0.9],
  ["Online Communities", 0.7],
  ["Games", 0.7],
  ["News", 0.7],
  ["Autos & Vehicles", 0.6],
  ["Sports", 0.6],
  ["Travel", 0.6],
  ["Internet & Telecom", 0.5],
  ["People & Society", 0.5],
  ["Pets & Animals", 0.5],
  ["Reference", 0.5],
  ["Hobbies & Leisure", 0.5],
  ["Finance", 0.3],
  ["Computers & Electronics", 0.3],
  ["Law & Government", 0.3],
  ["Arts & Entertainment", 0.2],
  ["Home & Garden", 0.2],
  ["Jobs & Education", 0.1],
  ["Real Estate", 0.1],
  ["Science", 0.1],
  ["Beauty & Fitness", -0.1],
  ["Books & Literature", -0.2],
  ["Health", -0.3],
];

export const winnerScores: [string, number][] = [
  ["All categories", 7.0],
  ["Pets & Animals", 3.7],
  ["News", 3.3],
  ["Law & Government", 2.9],
  ["Food & Drink", 2.9],
  ["Finance", 2.8],
  ["Games", 2.8],
  ["Business & Industrial", 2.8],
  ["Health", 2.7],
  ["Jobs & Education", 2.7],
  ["Real Estate", 2.7],
  ["Reference", 2.6],
  ["People & Society", 2.6],
  ["Shopping", 2.6],
  ["Travel", 2.5],
  ["Sports", 2.5],
  ["Science", 2.4],
  ["Computers & Electronics", 2.4],
  ["Internet & Telecom", 2.3],
  ["Autos & Vehicles", 2.3],
  ["Hobbies & Leisure", 2.2],
  ["Home & Garden", 2.1],
  ["Arts & Entertainment", 2.0],
  ["Online Communities", 1.9],
  ["Beauty & Fitness", 1.8],
  ["Books & Literature", 1.6],
];

export const serpFeatures: [string, string, string, string][] = [
  ["link", "Sitelinks", "49.99%", "+0.15"],
  ["spark", "AI Overview", "60.54%", "-7.21"],
  ["starO", "Reviews", "34.32%", "+1.44"],
  ["question", "Instant answer", "2.56%", "-0.11"],
  ["image", "Image", "25.99%", "+0.59"],
  ["imagePack", "Image pack", "21.77%", "+0.11"],
  ["playBox", "Video", "61.22%", "+5.55"],
  ["carousel", "Video carousel", "20.36%", "+0.03"],
  ["paa", "People also ask", "77.85%", "+0.78"],
  ["pin", "Local pack", "17.14%", "-0.08"],
  ["cap", "Knowledge panel", "17.2%", "-0.02"],
  ["stories", "Top stories", "2.7%", "-0.22"],
  ["hotel", "Hotels pack", "0.79%", "+0.03"],
  ["plane", "Flights", "0.03%", "-0.01"],
  ["fork", "Recipes", "1.86%", "+0.01"],
  ["bag", "Jobs", "0.36%", "+0.05"],
  ["seeResults", "See results about", "0.58%", "0"],
  ["related", "Related searches", "89.94%", "-0.17"],
  ["cartDots", "Popular products", "14.75%", "+0.28"],
  ["cart", "Shopping ads", "0.01%", "0"],
  ["ad", "Ads top", "0.03%", "-0.01"],
  ["adBottom", "Ads bottom", "0.32%", "-0.04"],
  ["dash", "No SERP Features", "1.24%", "-0.12"],
];

export const sensorFaq = [
  ["How is the Sensor score calculated?", "Sensor tracks a fixed set of keywords every day and measures how much their search results change. The more the results shift, the higher the score."],
  ["Is a High or Very High score bad for me?", "Not necessarily. A high score means Google results are changing more than usual. Check your own positions to see whether you were affected."],
  ["What does a low score mean?", "A low score means the search results were stable and ranking changes were minor."],
  ["Why do I see different score at the beginning and end of a day?", "Scores are recalculated as new data arrives during the day, so the value may change until the day is complete."],
  ["What do the categories mean?", "Keywords are grouped into categories based on their topic so you can see volatility for your specific niche."],
  ["Does the Sensor work with any international databases?", "Yes, Sensor is available for a number of country databases on desktop and mobile."],
  ["What is Personal Score in Sensor?", "Personal Score calculates volatility for the keywords you track in your Position Tracking campaigns."],
  ["How do notifications work?", "Subscribe to notifications to receive an email when volatility in a selected category reaches a high level."],
  ["What are Sensor Winners and Losers?", "Winners and Losers are domains whose positions improved or dropped the most for the tracked keyword set on a given day."],
  ["How are Winners and Losers per category calculated?", "The calculation uses the keywords of each category and compares domain positions with the previous day."],
];

export type SiteRow = { url: string; rise: number; keywords: number; fresh: number };

export const winnersRows: SiteRow[] = [
  { url: "https://interagencystandingcommittee.org", rise: 8, keywords: 3, fresh: 3 },
  { url: "https://www.lewisblack.com", rise: 8, keywords: 3, fresh: 3 },
  { url: "https://upullitne.com", rise: 8, keywords: 4, fresh: 2 },
  { url: "https://www.jekyllisland.com", rise: 8, keywords: 4, fresh: 4 },
  { url: "https://angular.io", rise: 8, keywords: 5, fresh: 5 },
  { url: "https://www.muji.us", rise: 8, keywords: 3, fresh: 0 },
  { url: "https://bwiairport.com", rise: 8, keywords: 4, fresh: 4 },
  { url: "https://www.cheesecakefactory.com", rise: 7, keywords: 6, fresh: 2 },
  { url: "https://www.nps.gov", rise: 7, keywords: 12, fresh: 1 },
  { url: "https://www.allrecipes.com", rise: 7, keywords: 9, fresh: 3 },
];

export const losersRows: SiteRow[] = [
  { url: "https://www.pinterest.com", rise: -8, keywords: 14, fresh: 0 },
  { url: "https://www.quora.com", rise: -8, keywords: 9, fresh: 0 },
  { url: "https://www.yelp.com", rise: -8, keywords: 7, fresh: 1 },
  { url: "https://www.tripadvisor.com", rise: -7, keywords: 6, fresh: 0 },
  { url: "https://www.webmd.com", rise: -7, keywords: 5, fresh: 0 },
  { url: "https://www.target.com", rise: -7, keywords: 8, fresh: 2 },
  { url: "https://www.imdb.com", rise: -6, keywords: 4, fresh: 0 },
  { url: "https://www.indeed.com", rise: -6, keywords: 3, fresh: 1 },
  { url: "https://www.etsy.com", rise: -6, keywords: 5, fresh: 0 },
  { url: "https://www.walmart.com", rise: -6, keywords: 11, fresh: 0 },
];

type RankRow = { rank: number; domain: string; kw: string; traffic: string; cost: string; paidKw: string; paidTraffic: string; paidCost: string };

const rankTop: string[][] = [
  ["youtube.com", "42M", "67M", "15M", "15", "224", "25"],
  ["wikipedia.org", "10.6M", "64.9M", "22M", "0", "0", "0"],
  ["facebook.com", "17.6M", "36M", "13.4M", "50", "983", "18.2K"],
  ["instagram.com", "9.2M", "26.7M", "16.5M", "0", "0", "0"],
  ["aftonbladet.se", "1.7M", "20.4M", "13.1M", "4", "216", "761"],
  ["ica.se", "1.5M", "19.7M", "3.6M", "1.5K", "118.4K", "16.8K"],
  ["google.com", "1.7M", "15.8M", "139.2M", "211", "8.7K", "153.5K"],
  ["svt.se", "1.9M", "12.3M", "7.3M", "0", "0", "0"],
  ["expressen.se", "1.5M", "12M", "9.4M", "15", "60", "51"],
  ["1177.se", "948.7K", "11.4M", "2.9M", "144", "9.2K", "2K"],
];

const rankBottom: string[][] = [
  ["blomsterlandet.se", "220.5K", "1.5M", "347.4K", "42", "735", "222"],
  ["booking.com", "545K", "1.4M", "1.1M", "8.2K", "254.9K", "234.1K"],
  ["google.se", "25.5K", "1.4M", "1.2M", "0", "0", "0"],
  ["stockholm.se", "99.1K", "1.3M", "721.6K", "0", "0", "0"],
  ["kicks.se", "100.1K", "1.3M", "352.7K", "522", "13.4K", "4.2K"],
  ["goteborg.se", "196.9K", "1.3M", "338.2K", "6", "871", "97"],
  ["kronansapotek.se", "221.2K", "1.3M", "344.5K", "100", "18.1K", "4.6K"],
  ["allatvkanaler.se", "72.1K", "1.2M", "439.6K", "0", "0", "0"],
  ["tui.se", "159.7K", "1.2M", "485.2K", "3.2K", "121.4K", "42.8K"],
];

const rankMid = [
  "dn.se", "blocket.se", "hitta.se", "prisjakt.nu", "reddit.com", "svtplay.se", "ikea.com", "apotea.se", "skatteverket.se", "amazon.se",
  "postnord.se", "sj.se", "smhi.se", "klarna.com", "elgiganten.se", "hemnet.se", "eniro.se", "tiktok.com", "linkedin.com", "apoteket.se",
  "regeringen.se", "systembolaget.se", "coop.se", "willys.se", "netflix.com", "spotify.com", "bytbil.com", "byggahus.se", "clasohlson.com", "biltema.se",
  "sverigesradio.se", "gp.se", "svd.se", "di.se", "mitti.se", "tv4.se", "tv4play.se", "flashback.org", "familjeliv.se", "mobil.se",
  "zalando.se", "hm.com", "stadium.se", "jula.se", "bauhaus.se", "tradera.com", "pricerunner.se", "webhallen.com", "inet.se", "komplett.se",
  "sl.se", "vasttrafik.se", "arbetsformedlingen.se", "forsakringskassan.se", "csn.se", "polisen.se", "krisinformation.se", "riksdagen.se", "scb.se", "folkhalsomyndigheten.se",
  "allabolag.se", "ratsit.se", "merinfo.se", "bokadirekt.se", "thefork.se", "tripadvisor.se", "hotels.com", "expedia.se", "momondo.se", "flygresor.se",
  "matspar.se", "koket.se", "arla.se", "tasteline.com", "recepten.se", "mathem.se", "lensway.se", "cdon.se", "adlibris.com", "bokus.com",
  "akademibokhandeln.se",
];

const fmt = (n: number) => (n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${+(n / 1e3).toFixed(1)}K` : `${Math.round(n)}`);

const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const rankRows: RankRow[] = [
  ...rankTop,
  ...rankMid.map((d, i) => {
    const traffic = 11.2e6 * Math.pow(1.52e6 / 11.2e6, (i + 1) / (rankMid.length + 1));
    const kw = traffic * (0.05 + seeded(i + 1) * 0.2);
    const cost = traffic * (0.15 + seeded(i + 7) * 0.5);
    const paid = seeded(i + 3) > 0.45;
    const pk = paid ? 5 + seeded(i + 11) * 2500 : 0;
    const pt = paid ? pk * (8 + seeded(i + 5) * 60) : 0;
    const pc = paid ? pt * (0.1 + seeded(i + 9) * 0.6) : 0;
    return [d, fmt(kw), fmt(traffic), fmt(cost), fmt(pk), fmt(pt), fmt(pc)];
  }),
  ...rankBottom,
].map((r, i) => ({ rank: i + 1, domain: r[0], kw: r[1], traffic: r[2], cost: r[3], paidKw: r[4], paidTraffic: r[5], paidCost: r[6] }));

export type WlCell = { d: string; v: string } | null;
type WlRow = { pos: number; domain: string; rank: number; cells: WlCell[] };

const wlTop: [string, number, (string | null)[]][] = [
  ["youtube.com", 1, ["+61.8K 42M", "-38.4K 67M", "-12.4M 15M", "-2 15", "-28 224", "-3 25"]],
  ["reddit.com", 12, ["+36K 5.9M", "+2.9K 9.7M", "-359.8K 2.9M", "-1 6", "-1 1", "-4 2"]],
  ["facebook.com", 3, ["+31.8K 17.6M", "+10.3K 36M", "-4.7M 13.4M", "+1 50", "+89 983", "+920 18.2K"]],
  ["instagram.com", 4, ["+25.6K 9.2M", "-19K 26.7M", "-3.5M 16.5M", null, null, null]],
  ["svt.se", 8, ["+18.9K 1.9M", "+37.5K 12.3M", "-2.5M 7.3M", null, null, null]],
  ["ikea.com", 14, ["+13.5K 760.3K", "+12.2K 7.2M", "-144.2K 2.7M", "-3 210", "-42 6.1K", "-51 1.9K"]],
  ["ica.se", 6, ["+5.4K 1.5M", "+6.5K 19.7M", "-1.7M 3.6M", "-21 1.5K", "-1.2K 118.4K", "-1.4K 16.8K"]],
  ["byggahus.se", 188, ["+4.6K 352.9K", "+2.9K 639K", "-33.9K 267.7K", null, null, null]],
  ["regeringen.se", 262, ["+4.2K 121.8K", "+3.2K 461.3K", "-33.7K 180K", null, null, null]],
  ["svtplay.se", 13, ["+4.1K 592.5K", "+54K 8.5M", "-1.3M 2.2M", "+7 223", "+175 227.4K", "+310 4.4K"]],
];

const cell = (s: string | null): WlCell => {
  if (!s) return null;
  const [d, v] = s.split(" ");
  return { d, v };
};

export const wlRows: WlRow[] = [
  ...wlTop.map(([domain, rank, cells], i) => ({ pos: i + 1, domain, rank, cells: cells.map(cell) })),
  ...rankRows.slice(10, 100).map((r, i) => {
    const s = (k: number) => seeded(i * 7 + k);
    const kwd = 4000 * Math.pow(0.97, i) * (0.6 + s(1));
    const td = (s(2) - 0.35) * 30000 * Math.pow(0.97, i);
    const cd = -(s(3) * 400000 * Math.pow(0.97, i));
    const paid = r.paidKw !== "0";
    const sign = (n: number) => `${n >= 0 ? "+" : "-"}${fmt(Math.abs(n))}`;
    return {
      pos: i + 11,
      domain: r.domain,
      rank: r.rank + Math.round(s(4) * 40),
      cells: [
        { d: sign(kwd), v: r.kw },
        { d: sign(td), v: r.traffic },
        { d: sign(cd), v: r.cost },
        paid ? { d: sign((s(5) - 0.5) * 40), v: r.paidKw } : null,
        paid ? { d: sign((s(6) - 0.5) * 900), v: r.paidTraffic } : null,
        paid ? { d: sign((s(7) - 0.5) * 600), v: r.paidCost } : null,
      ],
    };
  }),
];
