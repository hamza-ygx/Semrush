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
  | "adcreative";

export type App = { name: string; description: string; price: string; logo: AppLogo; tags: string[]; href?: string };

const a = (name: string, description: string, price: string, logo: AppLogo, tags: string[], href?: string): App => ({ name, description, price, logo, tags, href });

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
    routes.social.influencer,
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
