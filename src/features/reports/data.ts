import { brand } from "@/config/brand";

export type TemplateIcon = "sparkle" | "ga" | "gsc" | "traffic" | "megaphone" | "google" | "plus";

export type Template = { title: string; description: string; icon: TemplateIcon; category: string; extra?: string };

export const landingTemplates: Template[] = [
  { title: "Start from scratch", description: "Choose among over 200 widgets to build your own report.", icon: "plus", category: "" },
  { title: "Brand Performance", description: "See how your brand is represented in LLMs like ChatGPT and get actionable insights.", icon: "sparkle", category: "AI Visibility" },
  { title: "Google Analytics 4", description: "Get key metrics such as sessions, events, and audience insights.", icon: "ga", category: "Analytics" },
  { title: "Google Search Console", description: "Get insights into your website’s search performance.", icon: "gsc", category: "SEO" },
];

export const galleryTemplates: Template[] = [
  { title: "Brand Performance", description: "See how your brand is represented in LLMs like ChatGPT and get actionable insights.", icon: "sparkle", category: "AI Visibility" },
  { title: "Visibility Overview", description: "Analyze how AI platforms perceive your brand, including mentions, sources, and topics.", icon: "sparkle", category: "AI Visibility" },
  { title: "Prompt Tracking: Landscape", description: "See the overall picture of how your brand performs in AI-generated results.", icon: "sparkle", category: "AI Visibility" },
  { title: "Prompt Tracking: Overview", description: "View a detailed table that breaks down your brand’s performance in AI answers.", icon: "sparkle", category: "AI Visibility" },
  { title: "Competitor Research", description: "See how competitors perform in LLM outputs and compare the results with your brand.", icon: "sparkle", category: "AI Visibility", extra: "SEO" },
  { title: "Traffic Analytics: Overview", description: "View traffic trends and distribution, along with top pages, subfolders, and subdomains.", icon: "traffic", category: "Analytics" },
  { title: "AI PR: Brand Overview", description: "Get a detailed overview of your brand’s mentions and perception.", icon: "megaphone", category: "Social" },
  { title: "AI PR: Competitive Analysis", description: "Compare you brand’s mentions, share of voice, sources, and audience with competitors.", icon: "megaphone", category: "Social" },
  { title: "Google Ads Performance", description: "Track clicks, impressions, conversions, and spend across your campaigns.", icon: "google", category: "Ads" },
  { title: "AI Search Visibility", description: "Monitor how often your brand appears in AI Overviews and chatbot answers.", icon: "sparkle", category: "AI Visibility" },
  { title: "Google Analytics 4", description: "Get key metrics such as sessions, events, and audience insights.", icon: "ga", category: "Analytics" },
  { title: "Google Search Console", description: "Get insights into your website’s search performance.", icon: "gsc", category: "SEO" },
  { title: "Monthly SEO Report", description: "Summarize rankings, visibility, and organic traffic for the past month.", icon: "traffic", category: "SEO" },
  { title: "Position Tracking Report", description: "Share daily ranking changes for your tracked keywords.", icon: "traffic", category: "SEO" },
  { title: "Site Audit Report", description: "Present the technical health of a website and the top issues to fix.", icon: "traffic", category: "SEO" },
  { title: "Backlink Profile", description: "Show referring domains, new and lost backlinks, and authority trends.", icon: "traffic", category: "SEO" },
  { title: "Keyword Research", description: "Share keyword opportunities with volumes, difficulty, and intent.", icon: "traffic", category: "SEO" },
  { title: "Competitor SEO Overview", description: "Compare organic performance of up to five competitors.", icon: "traffic", category: "SEO" },
  { title: "Content Performance", description: "Track how your content ranks and drives organic traffic.", icon: "traffic", category: "SEO" },
  { title: "Local SEO Report", description: "Show listings health, reviews, and map rankings for your locations.", icon: "google", category: "Local" },
  { title: "Map Rank Tracker", description: "Visualize your local rankings across a grid of map pins.", icon: "google", category: "Local" },
  { title: "PPC Overview", description: "Summarize paid search performance and competitors’ ad activity.", icon: "google", category: "Ads" },
  { title: "Meta Ads Performance", description: "Report on reach, clicks, and cost across Facebook and Instagram ads.", icon: "megaphone", category: "Ads" },
  { title: "Advertising Research", description: "Show competitors’ paid keywords, ad copies, and traffic cost.", icon: "google", category: "Ads" },
  { title: "PLA Research", description: "Analyze Google Shopping ads of any competitor.", icon: "google", category: "Ads" },
  { title: "Ads Budget Pacing", description: "Keep track of spend against monthly budgets across platforms.", icon: "ga", category: "Ads" },
  { title: "Social Media Overview", description: "Show audience growth, engagement, and top posts across networks.", icon: "megaphone", category: "Social" },
  { title: "Ecommerce Overview", description: "Report revenue, transactions, and conversion rate from Google Analytics.", icon: "ga", category: "Analytics" },
  { title: "Traffic Sources", description: "Break down sessions by channel, source, and medium.", icon: "ga", category: "Analytics" },
];

export const galleryTabs = ["All", "AI Visibility", "SEO", "Analytics", "Ads", "Social", "Local"] as const;

export const integrations = [
  `${brand.name} SEO`,
  "Google Analytics 4",
  "Google Search Console",
  "Google Ads",
  "Google Business Profile",
  "Meta Ads",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "YouTube",
  "TikTok",
  "Pinterest",
  "Mailchimp",
  "Matomo",
  "Microsoft Ads",
  "HubSpot",
  "Shopify",
  "Firebase",
  "Google Sheets",
  "Amazon Ads",
  "X (Twitter)",
];

export type IntegrationItem = { label: string; icon: "brand" | "ai" | "ga" | "matomo" | "gsc" | "google" | "letter"; isNew?: boolean; premium?: boolean };

export const integrationGroups: { heading: string; items: IntegrationItem[] }[] = [
  {
    heading: brand.name.toUpperCase(),
    items: [
      { label: "Advertising Research", icon: "brand", isNew: true },
      { label: "Backlinks", icon: "brand", isNew: true },
      { label: "Brand Performance", icon: "ai" },
      { label: "Competitor Research", icon: "ai", isNew: true },
      { label: "Listing Management", icon: "brand" },
      { label: "Map Rank Tracker", icon: "brand", isNew: true },
      { label: "Media Monitoring", icon: "brand", isNew: true },
      { label: "Prompt Tracking", icon: "ai", isNew: true },
      { label: "Site Audit", icon: "brand", isNew: true },
      { label: "Traffic Analytics", icon: "brand", isNew: true },
      { label: "Visibility Overview", icon: "ai", isNew: true },
    ],
  },
  {
    heading: "ANALYTICS",
    items: [
      { label: "Google Analytics v4", icon: "ga" },
      { label: "Matomo", icon: "matomo", premium: true },
    ],
  },
  { heading: "SEO", items: [{ label: "Google Search Console", icon: "gsc" }] },
  { heading: "LOCAL", items: [{ label: "Google Business Profile", icon: "google" }] },
  {
    heading: "ADS",
    items: [
      { label: "Google Ads", icon: "google" },
      { label: "Meta Ads", icon: "letter", premium: true },
      { label: "Microsoft Ads", icon: "letter", premium: true },
    ],
  },
  {
    heading: "SOCIAL",
    items: [
      { label: "Facebook", icon: "letter" },
      { label: "Instagram", icon: "letter" },
      { label: "LinkedIn", icon: "letter", premium: true },
      { label: "YouTube", icon: "letter", premium: true },
    ],
  },
];

export const widgetGroups: { label: string; disabled?: boolean; star?: boolean }[] = [
  { label: "Favorites", star: true },
  { label: "Domain Analytics" },
  { label: "Keyword Analytics" },
  { label: "Backlink Audit" },
  { label: "Position Tracking" },
  { label: "Site Audit", disabled: true },
  { label: "On Page SEO Checker" },
  { label: "Listing Management", disabled: true },
  { label: "Map Rank Tracker", disabled: true },
];

export const themes = [
  { name: "Default theme", accent: "", cover: "" },
  { name: "Flamingo", accent: "#ff8a86", cover: "Flamingo theme" },
  { name: "Sunny", accent: "#ffc53d", cover: "Sunny theme" },
  { name: "Veggie", accent: "#1fc28f", cover: "Veggie theme" },
  { name: "Ocean", accent: "#3d8bff", cover: "Ocean theme" },
];

export const railTips = {
  widgets: { title: "Widgets", text: "Choose metrics to compile your report." },
  integrations: { title: "Integrations", text: "Connect your data sources." },
  formatting: { title: "Formatting", text: "Change text styles, add images." },
  themes: { title: "Themes", text: "Brand your reports with a collection of styles." },
};
