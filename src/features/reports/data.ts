import { brand } from "@/config/brand";

export type TemplateIcon =
  | "sparkle"
  | "ga"
  | "gsc"
  | "traffic"
  | "megaphone"
  | "google"
  | "plus"
  | "link"
  | "pulse"
  | "heart"
  | "doc"
  | "list"
  | "search"
  | "telescope"
  | "adbars"
  | "rank"
  | "gads"
  | "meta"
  | "facebook"
  | "linkedin"
  | "gbp";

export type Template = { title: string; description: string; icon: TemplateIcon; tabs: string[]; premium?: boolean };

export const landingTemplates: Template[] = [
  { title: "Start from scratch", description: "Choose among over 200 widgets to build your own report.", icon: "plus", tabs: [] },
  { title: "Brand Performance", description: "See how your brand is represented in LLMs like ChatGPT and get actionable insights.", icon: "sparkle", tabs: ["AI Visibility"] },
  { title: "Google Analytics 4", description: "Get key metrics such as sessions, events, and audience insights.", icon: "ga", tabs: ["Analytics"] },
  { title: "Google Search Console", description: "Get insights into your website’s search performance.", icon: "gsc", tabs: ["Analytics"] },
];

export const galleryTemplates: Template[] = [
  { title: "Brand Performance", description: "See how your brand is represented in LLMs like ChatGPT and get actionable insights.", icon: "sparkle", tabs: ["AI Visibility"] },
  { title: "Visibility Overview", description: "Analyze how AI platforms perceive your brand, including mentions, sources, and topics.", icon: "sparkle", tabs: ["AI Visibility"] },
  { title: "Prompt Tracking: Landscape", description: "See the overall picture of how your brand performs in AI-generated results.", icon: "sparkle", tabs: ["AI Visibility"] },
  { title: "Prompt Tracking: Overview", description: "View a detailed table that breaks down your brand’s performance in AI answers.", icon: "sparkle", tabs: ["AI Visibility"] },
  { title: "Competitor Research", description: "See how competitors perform in LLM outputs and compare the results with your brand.", icon: "sparkle", tabs: ["AI Visibility"] },
  { title: "Traffic Analytics: Overview", description: "View traffic trends and distribution, along with top pages, subfolders, and subdomains.", icon: "traffic", tabs: ["Analytics"] },
  { title: "AI PR: Brand Overview", description: "Get a detailed overview of your brand’s mentions and perception.", icon: "megaphone", tabs: [] },
  { title: "AI PR: Competitive Analysis", description: "Compare you brand’s mentions, share of voice, sources, and audience with competitors.", icon: "megaphone", tabs: [] },
  { title: "Marketing Report", description: "Get insights on traffic, ads, and search performance from GA4, GSC, and Google Ads.", icon: "google", tabs: ["Analytics", "Ads"], premium: true },
  { title: "AI Traffic Report", description: "View GA4 insights on AI-driven traffic and use them to guide your AI SEO strategy.", icon: "sparkle", tabs: ["AI Visibility"] },
  { title: "Google Analytics 4", description: "Get key metrics such as sessions, events, and audience insights.", icon: "ga", tabs: ["Analytics"] },
  { title: "Google Search Console", description: "Get insights into your website’s search performance.", icon: "gsc", tabs: ["Analytics"] },
  { title: "Backlinks: Full Report", description: "Analyze a website’s backlink profile and spot new link opportunities.", icon: "link", tabs: ["SEO"] },
  { title: "Site Audit: Overview", description: "Get a quick overview of a domain’s health.", icon: "pulse", tabs: ["SEO"] },
  { title: "Site Audit: Issues", description: "Get a complete list of issues detected on any website.", icon: "heart", tabs: ["SEO"] },
  { title: "Site Audit: Full Report", description: "Get an overview of a domain’s health, issues, and affected pages.", icon: "heart", tabs: ["SEO"] },
  { title: "Monthly SEO Report", description: "Get a complete overview of any website's performance and health.", icon: "doc", tabs: ["SEO"] },
  { title: "Organic Search Positions", description: "Get the top 100 keywords a domain is ranking for in Google.", icon: "list", tabs: ["SEO"] },
  { title: "Full Organic Research", description: "Dive into a keyword strategy of any domain.", icon: "search", tabs: ["SEO"] },
  { title: "Google Ads", description: "Reveal the vital information about your ads.", icon: "gads", tabs: ["Ads"], premium: true },
  { title: "Meta Ads", description: "Gather data on your ad campaigns and audience.", icon: "meta", tabs: ["Ads"], premium: true },
  { title: "PPC Report", description: "Get key insights from Meta Ads, Google Ads, and GA4 in one report.", icon: "facebook", tabs: ["Ads"], premium: true },
  { title: "LinkedIn Company Page Performance", description: "View performance, audience, and post metrics for your LinkedIn company page.", icon: "linkedin", tabs: ["Social"], premium: true },
  { title: "Facebook Page's Performance", description: "Generate a full report on your Facebook Page’s performance, audience, and posts.", icon: "facebook", tabs: ["Social"], premium: true },
  { title: "Monthly Competitor Analysis", description: "Learn more about your rivals: traffic, ads, SEO, content, PR, social media.", icon: "telescope", tabs: ["SEO", "Ads", "Social"] },
  { title: "Position Tracking", description: "Monitor daily rankings of your tracked keywords in any location.", icon: "rank", tabs: ["SEO"] },
  { title: "Full Advertising Research", description: "Analyze your rivals' ad strategies: budget, keywords, and ad copies.", icon: "adbars", tabs: ["Ads"] },
  { title: "Local SEO Report", description: "Track your local business customer journey by unifying GA4, GSC, and GBP data in one view.", icon: "google", tabs: ["Local"], premium: true },
  { title: "Google Business Profile Insights", description: "Get detailed performance data, including ratings, impressions, and interactions.", icon: "gbp", tabs: ["Local"], premium: true },
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

export type WidgetKind = "number" | "line" | "bar" | "table" | "pie";

export const widgetKinds: { kind: WidgetKind; label: string }[] = [
  { kind: "number", label: "Numbers" },
  { kind: "line", label: "Line charts" },
  { kind: "bar", label: "Bar charts" },
  { kind: "table", label: "Tables" },
  { kind: "pie", label: "Pie charts" },
];

type WidgetSection = { heading: string; items: { label: string; kind: WidgetKind }[] };

export const integrationWidgets: Record<string, WidgetSection[]> = {
  Backlinks: [
    {
      heading: "OVERVIEW",
      items: [
        { label: "Authority Score", kind: "number" },
        { label: "Authority Score Trend", kind: "line" },
        { label: "Link Attributes", kind: "pie" },
        { label: "New & Lost Backlinks", kind: "bar" },
        { label: "Referring Domains", kind: "number" },
        { label: "Referring Domains: Authority Score", kind: "table" },
        { label: "Referring IPs", kind: "number" },
        { label: "TLD Distributions", kind: "pie" },
        { label: "Top Competitors", kind: "table" },
        { label: "Top Countries", kind: "table" },
        { label: "Total Backlinks", kind: "number" },
        { label: "Types", kind: "pie" },
      ],
    },
    {
      heading: "COMPETITORS COMPARISON",
      items: [
        { label: "Follow vs. Nofollow", kind: "table" },
        { label: "Overview", kind: "table" },
        { label: "Authority Score Trend", kind: "line" },
        { label: "Backlinks Trend", kind: "line" },
        { label: "New & Lost Backlinks", kind: "bar" },
        { label: "Referring Domains Trend", kind: "line" },
        { label: "Top Anchors", kind: "table" },
      ],
    },
    {
      heading: "BACKLINKS",
      items: [
        { label: "Backlinks", kind: "table" },
        { label: "Anchors", kind: "table" },
        { label: "Referring Domains", kind: "table" },
        { label: "Indexed Pages", kind: "table" },
        { label: "Outbound Domains", kind: "table" },
      ],
    },
  ],
};

export const defaultWidgets = (name: string): WidgetSection[] => [
  {
    heading: "OVERVIEW",
    items: [
      { label: `${name}: Key Metrics`, kind: "number" },
      { label: `${name}: Trend`, kind: "line" },
      { label: `${name}: Distribution`, kind: "pie" },
      { label: `${name}: Comparison`, kind: "bar" },
      { label: `${name}: Details`, kind: "table" },
    ],
  },
];

export const settingsTip = "Add widgets or choose a template to change settings.";
