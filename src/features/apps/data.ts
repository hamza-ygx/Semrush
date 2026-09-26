import { brand } from "@/config/brand";
import { routes } from "@/config/routes";

export type AppLogo =
  | "callrail"
  | "serpgap"
  | "adclarity"
  | "influencer"
  | "exploding"
  | "llmgap"
  | "crazyegg"
  | "voiceassist"
  | "aimarketing"
  | "aivideo"
  | "backlinkbuilder"
  | "websitetesting"
  | "mobileinsights"
  | "socialcontent"
  | "brandmonitoring"
  | "adcreative"
  | "ppclead"
  | "audience"
  | "mobiletester"
  | "localkit"
  | "reddittrend"
  | "trendfeed"
  | "seokit"
  | "aikit"
  | "keywordcluster";

export type App = { name: string; description: string; price: string; logo: AppLogo; tags: string[]; href?: string; badge?: "Free trial" | "Free plan" | null; toolkit?: boolean };

export const appsBase = routes.apps;
export const myAppsHref = routes.appsMyApps;
export const influencerAppSlug = "influencer-marketing-platform";

export const appSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const appDetailHref = routes.appDetail;

const a = (name: string, description: string, price: string, logo: AppLogo, tags: string[], href?: string): App => ({
  name,
  description,
  price,
  logo,
  tags,
  href: href ?? appDetailHref(appSlug(name)),
});

export const apps = {
  callrail: a("CallRail", "Know which ads, keywords, and campaigns drive phone leads", "$125/mo", "callrail", ["Advertising", "SMB", "LeadGen"]),
  serpGap: a("SERP Gap Analyzer", "Find SERP opportunities. See where your brand stands in AI Search. Fix decaying pages.", "$99/mo", "serpgap", ["SEO", "AI Apps", "Competitors"]),
  adclarity: a(
    "AdClarity - Advertising Intelligence",
    "Unwrap competitors’ digital ads, ad spend and impressions",
    "$298/mo",
    "adclarity",
    ["Advertising", "Competitors"],
    routes.ad.adclarity,
  ),
  influencer: a(
    "Influencer Analytics",
    "Improve your influencer marketing campaign’s performance. From discovery to clicks.",
    "$249/mo",
    "influencer",
    ["Social Media", "Brand"],
    appDetailHref(influencerAppSlug),
  ),
  exploding: a("Exploding Topics", "Discover trending topics before they take off", "$99/mo", "exploding", ["Content", "Competitors"]),
  llmGap: a("LLM Gap Analyzer", "Outrank the competitors currently winning in Google AI and ChatGPT.", "$49/mo", "llmgap", ["SEO", "AI Apps"]),
  crazyEgg: a("Crazy Egg", "Get more conversions from the traffic you’ve already earned", "$249/mo", "crazyegg", ["Advertising", "Ecommerce", "SMB"]),
  voiceAssist: a("Voice Assist by CallRail", "Answer all calls. Convert more leads.", "$50/mo", "voiceassist", ["AI Apps", "SMB", "LeadGen"]),
  aiMarketing: a("AI Marketing Agent", "Turn marketing ideas into campaign-ready, on-brand creatives", "$79/mo", "aimarketing", ["AI Apps", "Content", "Workflows"]),
  aiVideo: a("AI Video Marketing Automator", "Automate video marketing for SEO and Social Media", "$39/mo", "aivideo", ["AI Apps", "Video", "Social Media"]),
  backlinkBuilder: a("AI Backlink Builder", "Automate link building, find contacts, and personalize outreach with AI", "$99/mo", "backlinkbuilder", ["SEO", "AI Apps"]),
  websiteTesting: a("AI Website Testing", "Make sure your website looks and behaves correctly, everywhere", "$49/mo", "websitetesting", ["SEO", "AI Apps"]),
  mobileInsights: a("Mobile App Insights", "All the essentials to maximize your mobile app’s visibility and ASO", "$69/mo", "mobileinsights", ["Mobile", "SEO"]),
  socialContent: a("AI Social Content Generator", "Generate & publish social media videos, ads, and posts in your brand language", "$35/mo", "socialcontent", ["Social Media", "AI Apps", "Video"]),
  brandMonitoring: a("Brand Monitoring", "Track social mentions, press hits, and backlinks across the web", "$79/mo", "brandmonitoring", ["Brand", "Social Media"]),
  adCreative: a("AdCreative.ai", "Generate ad creatives, ad copy and product photoshoots with AI to outperform competitors", "$109/mo", "adcreative", ["Advertising", "AI Apps", "Ecommerce"]),
};

export type Section = { title: string; filter: string; apps: App[]; gray: boolean };

export const sections: Section[] = [
  {
    title: "Most Popular",
    filter: "Store",
    gray: true,
    apps: [apps.callrail, apps.serpGap, apps.adclarity, apps.influencer, apps.exploding, apps.llmGap],
  },
  { title: "New Apps", filter: "Store", gray: false, apps: [apps.crazyEgg, apps.voiceAssist, apps.llmGap] },
  {
    title: "AI & Automation Apps: The Best AI Tools for Your Marketing Strategy",
    filter: "AI Apps",
    gray: true,
    apps: [apps.voiceAssist, apps.aiMarketing, apps.aiVideo],
  },
  { title: "SEO & Link Building Apps", filter: "SEO", gray: false, apps: [apps.backlinkBuilder, apps.websiteTesting, apps.mobileInsights] },
  { title: "Social Media Apps", filter: "Social Media", gray: true, apps: [apps.socialContent, apps.influencer, apps.brandMonitoring] },
  { title: "Advertising Apps", filter: "Advertising", gray: false, apps: [apps.adclarity, apps.adCreative, apps.crazyEgg] },
];

export const filters = [
  "Store",
  "SEO",
  "Social Media",
  "Content",
  "Advertising",
  "AI Apps",
  "Competitors",
  "SMB",
  "Mobile",
  "Workflows",
  "Ecommerce",
  "Video",
  "Brand",
  "LeadGen",
  "Toolkits",
] as const;

export type Filter = (typeof filters)[number];

const plan = (app: App, price: string, badge: App["badge"] = "Free trial"): App => ({ ...app, price, badge });
const kit = (name: string, description: string, logo: AppLogo, tags: string[], href: string): App => ({ name, description, price: "", logo, tags, href, toolkit: true });

export const searchResults: App[] = [
  kit(`${brand.name} SEO Toolkit`, "Do keyword research, track rankings, audit your site, and grow organic traffic", "seokit", ["SEO", "Toolkits"], routes.seoDashboard),
  kit(`${brand.name} AI Visibility Toolkit`, "Track how your brand shows up in AI search and win more AI mentions", "aikit", ["SEO", "AI Apps", "Toolkits"], routes.ai.overview),
  apps.exploding,
  plan(apps.serpGap, "$99/mo"),
  a("AI Keyword Cluster", "Group thousands of keywords into topic clusters in minutes", "$29/mo", "keywordcluster", ["SEO", "AI Apps", "Content"]),
  kit(`${brand.name} Local`, "Manage listings and reviews, and track local rankings on Google Maps", "localkit", ["SMB", "Toolkits"], routes.local.start),
  apps.callrail,
  a("PPC Lead Intelligence", "Discover active Google Ads advertisers and turn them into new clients", "$97/mo", "ppclead", ["Advertising", "LeadGen"]),
  apps.aiVideo,
  plan(a("Audience Intelligence", "Discover in-depth consumer segmentation and cultural insights from social data", "$150/mo", "audience", ["Social Media", "Brand"]), "$150/mo", "Free plan"),
  a("Mobile App Tester", "Test your native mobile app on physical iOS and Android devices", "$29/mo", "mobiletester", ["Mobile"]),
  plan(apps.websiteTesting, "$69/mo"),
  apps.llmGap,
  apps.brandMonitoring,
  plan(a(`${brand.name} Local`, "Be found in local search and AI results and win more customers", "$60/mo", "localkit", ["SMB"], routes.local.start), "$60/mo", null),
  a("Trend Analytics for Reddit", "Explore the most influential communities to connect your business to 500M+ Reddit users", "$10/mo", "reddittrend", ["Social Media", "Content"]),
  a("TrendFeed", "Discover, create and curate trending content for hundreds of industries", "$25/mo", "trendfeed", ["Content", "Social Media"]),
  plan(apps.backlinkBuilder, "$169/mo"),
];

export type AppFeature = { word: string; title: string };
export type AppDetail = { app: App; slug: string; likes: string; features: AppFeature[] };

const details: Record<string, { likes: string; features: AppFeature[] }> = {
  callrail: {
    likes: "4,1K",
    features: [
      { word: "Call tracking", title: "See which ads, keywords, and campaigns make your phone ring and turn calls into revenue." },
      { word: "Lead attribution", title: "Connect every call and form to its marketing source to prove the ROI of each channel." },
    ],
  },
  "serp-gap-analyzer": {
    likes: "2,3K",
    features: [
      { word: "SERP opportunities", title: "Find the keywords where the results are weak and your pages can win the top spots." },
      { word: "AI Search visibility", title: "See where your brand shows up in AI answers and which pages need a refresh." },
    ],
  },
  "exploding-topics": {
    likes: "3,8K",
    features: [
      { word: "Trend discovery", title: "Spot fast-growing topics months before they hit the mainstream, across every industry." },
      { word: "Topic insights", title: "Check search growth, seasonality, and related trends before you invest in content." },
    ],
  },
  "llm-gap-analyzer": {
    likes: "1,2K",
    features: [
      { word: "LLM visibility", title: "Compare how often you and your competitors appear in Google AI Overviews and ChatGPT." },
      { word: "Content gaps", title: "Find the prompts where competitors win and get a plan to close the gap." },
    ],
  },
  "crazy-egg": {
    likes: "2,9K",
    features: [
      { word: "Heatmaps", title: "See where visitors click, scroll, and drop off on every page of your website." },
      { word: "A/B testing", title: "Test new layouts and copy to turn more of your existing traffic into customers." },
    ],
  },
};

const fallbackFeatures = (app: App): AppFeature[] => [
  { word: app.name, title: app.description },
  { word: "Easy setup", title: `Connect ${app.name} to your account in minutes and start getting results right away.` },
];

const allApps = [...Object.values(apps), ...searchResults].filter((x) => !x.toolkit && x.href?.startsWith(`${appsBase}/`));

export function findAppDetail(slug: string): AppDetail | null {
  const app = allApps.find((x) => x.href === appDetailHref(slug));
  if (!app) return null;
  const d = details[slug];
  return { app, slug, likes: d?.likes ?? "1,0K", features: d?.features ?? fallbackFeatures(app) };
}
