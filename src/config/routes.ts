import { brand } from "./brand";

const SA = "/siteaudit/campaign/30526913/review";
const PT = "/tracking";
const PT_ID = "30526913_5175527";

export const routes = {
  home: "/",
  seoDashboard: "/seo",

  siteAudit: "/siteaudit",
  siteAuditCampaign: {
    overview: `${SA}/overview`,
    issues: `${SA}/issues`,
    issueDetail: (id: number | string) => `${SA}/issue/detail/${id}`,
    pageDetail: (id: string) => `${SA}/page/${id}`,
    crawledPages: `${SA}/pagereport/pages`,
    siteStructure: `${SA}/pagereport/structure`,
    statisticsTile: `${SA}/statistics/tile`,
    statisticsGraph: `${SA}/statistics/graph`,
    compare: `${SA}/compare`,
    progress: `${SA}/history`,
    jsImpact: `${SA}/js-impact`,
    crawlability: `${SA}/crawlability`,
    https: `${SA}/https`,
    international: `${SA}/international`,
    webVitals: `${SA}/web_vitals`,
    performance: `${SA}/performance`,
    linking: `${SA}/linking`,
    markups: `${SA}/markups`,
  },

  positionTracking: "/position-tracking",
  tracking: {
    landscape: `${PT}/landscape/${PT_ID}`,
    overview: `${PT}/overview/${PT_ID}`,
    rankingsDistribution: `${PT}/rankings_distribution/${PT_ID}`,
    tags: `${PT}/tags/${PT_ID}`,
    pages: `${PT}/landings/${PT_ID}`,
    cannibalization: `${PT}/cannibalization/${PT_ID}`,
    competitorsDiscovery: `${PT}/top/${PT_ID}`,
    devicesLocations: `${PT}/targets_comparison/${PT_ID}`,
    featuredSnippets: `${PT}/featured_snippets/${PT_ID}`,
    serp: (keyword: string) => `${PT}/serp/${encodeURIComponent(keyword)}`,
  },

  domainOverview: "/analytics/overview",
  domainGrowthReport: "/analytics/overview/compare-periods",
  domainCompareCountries: "/analytics/overview/compare-databases",

  organic: {
    overview: "/analytics/organic/overview",
    positions: "/analytics/organic/positions",
    changes: "/analytics/organic/changes",
    competitors: "/analytics/organic/competitors",
    topics: "/analytics/organic/topics",
    subdomains: "/analytics/organic/subdomains",
    pages: "/analytics/organic/pages",
  },

  topPages: "/analytics/toppages",
  serp: "/analytics/serp",
  kb: "/kb",
  appsSearch: "/apps/search",
  multilogin: "/multilogin",
  compareDomains: "/analytics/comparedomains",
  keywordGap: "/analytics/keywordgap",
  backlinkGap: "/analytics/gap/backlinks/report",

  keywordOverview: "/analytics/keywordoverview",
  keywordOverviewBulk: "/analytics/keywordoverview/bulk",
  keywordMagic: "/analytics/keywordmagic",
  keywordStrategyBuilder: "/analytics/keywordmanager",

  seoWritingAssistant: "/swa",
  seoContentTemplate: "/seo-content-template",
  logFileAnalyzer: "/log-file-analyzer",
  topicResearch: "/topic-research",
  topicResearchProject: {
    cards: "/topic-research/6ab52896550d8001abe4c526",
    explorer: "/topic-research/6ab52896550d8001abe4c526/explorer",
    overview: "/topic-research/6ab52896550d8001abe4c526/overview",
    mindMap: "/topic-research/6ab52896550d8001abe4c526/mind-map",
  },

  backlinks: "/analytics/backlinks/overview",
  backlinksToolkit: {
    overview: "/analytics/backlinks/overview",
    backlinks: "/analytics/backlinks/backlinks",
    networkGraph: "/analytics/backlinks/network-graph",
    anchors: "/analytics/backlinks/anchors",
    pages: "/analytics/backlinks/pages",
    outboundDomains: "/analytics/backlinks/outbound-domains",
    bulkAnalysis: "/analytics/backlinks/bulk-analysis",
    competitors: "/analytics/backlinks/competitors",
    refIps: "/analytics/backlinks/refips",
  },
  referringDomains: "/analytics/refdomains/report",
  backlinkAudit: "/backlink_audit",
  sensor: "/sensor",
  sensorPages: {
    personal: "/sensor/personal",
    deviations: "/sensor/deviations",
    winners: "/sensor/winners",
  },
  seoquake: "/features/seoquake",
  rank: "/analytics/ranks/rank",
  rankWinnersLosers: "/analytics/ranks/winnerslosers",
  onPageSeoChecker: "/on-page-seo-checker",
  organicTrafficInsights: "/organic_traffic_insights",

  homeAlias: "/home",

  ai: {
    overview: "/ai-seo/overview",
    competitorResearch: "/ai-seo/competitor-research",
    promptResearch: "/ai-seo/prompt-research",
    brandPerformance: "/ai-seo/brand-performance",
    perception: "/ai-seo/perception",
    narrativeDrivers: "/ai-seo/narrative-drivers",
    questions: "/ai-seo/questions",
    promptTracking: "/ai-seo/prompt-tracking",
  },

  traffic: {
    home: "/analytics/traffic",
    overview: "/analytics/traffic/traffic-overview",
    marketOverview: "/analytics/traffic/market-overview",
    topPages: "/analytics/traffic/top-pages",
    competitorMonitoring: "/analytics/traffic/competitor-monitoring",
    aiTraffic: "/analytics/traffic/ai-traffic",
    referral: "/analytics/traffic/referral",
    organicSearch: "/analytics/traffic/organic-search",
    paidSearch: "/analytics/traffic/paid-search",
    organicSocial: "/analytics/traffic/organic-social",
    paidSocial: "/analytics/traffic/paid-social",
    email: "/analytics/traffic/email",
    displayAds: "/analytics/traffic/display-ads",
    sourcesDestinations: "/analytics/traffic/sources-destinations",
    subfoldersSubdomains: "/analytics/traffic/subfolders-subdomains",
    pageGroups: "/analytics/traffic/page-groups",
    usa: "/analytics/traffic/usa",
    countries: "/analytics/traffic/countries",
    businessRegions: "/analytics/traffic/business-regions",
    geographicalRegions: "/analytics/traffic/geographical-regions",
    demographics: "/analytics/traffic/demographics",
    audienceOverlap: "/analytics/traffic/audience-overlap",
    socioeconomics: "/analytics/traffic/socioeconomics",
    behavior: "/analytics/traffic/behavior",
    dailyTrends: "/analytics/traffic/daily-trends",
    industryBulk: "/analytics/traffic/industry-and-bulk-analysis",
    trendsApi: "/analytics/traffic/trends-api",
    trendingWebsites: "/trending-websites/global/all",
  },

  local: {
    start: "/local-business/start",
    scan: "/local-business/scan/5aaa736914324c66b1cea8c2232961d2",
    listings: "/listings-management/start",
    reviews: "/review-management/start",
    gbpOptimization: "/gbp-optimization/start",
    gbpAgent: "/gbp-ai-agent/start",
    mapRankTracker: "/map-rank-tracker",
  },

  content: {
    dashboard: "/content",
    articleGenerator: "/content/articles/create",
    optimizer: "/content/optimizer",
    repurpose: "/content/articles/repurpose",
    topicFinder: "/content/topic-finder",
    seoBrief: "/content/briefs/create",
    myContent: "/content/my-content",
  },

  ad: {
    home: "/advertising",
    launchAssistant: "/advertising/ads-launch-assistant",
    aiAgent: "/advertising/ads-ai-agent",
    research: "/analytics/adwords/positions",
    pla: "/analytics/pla/positions",
    adclarity: "/apps/adclarity-advertising-intelligence",
  },

  aipr: {
    dashboard: "/pr-toolkit",
    aiCitedMedia: "/pr-toolkit/ai-cited-media",
    contactSearch: "/pr-toolkit/media-database/landing",
    mediaLists: "/pr-toolkit/media-lists",
    yourEmails: "/pr-toolkit/emails/landing",
    senders: "/pr-toolkit/senders-and-domains",
    mediaMonitoring: "/pr-toolkit/media-monitoring/landing",
    alerts: "/pr-toolkit/alerts-and-digests",
  },

  social: {
    dashboard: "/social-media",
    poster: "/social-media/poster",
    tracker: "/social-media/tracker",
    contentInsights: "/social-media/content-insights",
    analytics: "/social-media/analytics",
    influencer: "/influencer-analytics",
    mediaMonitoring: "/media-monitoring",
  },

  reports: {
    myReports: "/my_reports",
    constructor: "/my_reports/constructor",
  },

  apps: "/apps",

  account: {
    profile: "/accounts/profile/account-info",
    email: "/accounts/profile/email",
    password: "/accounts/profile/password",
    security: "/accounts/profile/2fa",
    subscription: "/accounts/subscription-info",
    apiUnits: "/accounts/subscription-info/api-units",
    activity: "/accounts/activities",
    authorizedApps: "/accounts/authorized-apps",
    agencyPartners: "/agencies/get-started",
  },
};

export const unbuiltRoutes = [
  routes.seoquake,
  routes.ai.promptTracking,
  routes.content.myContent,
  routes.social.poster,
  routes.social.tracker,
  routes.social.contentInsights,
  routes.social.analytics,
];

export type NavItem = { label: string; href: string; match?: string[]; external?: boolean };
export type NavGroup = { heading?: string; items: NavItem[] };

export const seoNav: NavGroup[] = [
  { items: [{ label: "Dashboard", href: routes.seoDashboard }] },
  {
    heading: "Site Performance",
    items: [
      { label: "Site Audit", href: routes.siteAudit, match: ["/siteaudit"] },
      { label: "Position Tracking", href: routes.positionTracking, match: ["/position-tracking", "/tracking"] },
    ],
  },
  {
    heading: "Competitive Analysis",
    items: [
      { label: "Domain Overview", href: routes.domainOverview, match: ["/analytics/overview"] },
      { label: "Organic Rankings", href: routes.organic.overview, match: ["/analytics/organic"] },
      { label: "Top Pages", href: routes.topPages },
      { label: "Compare Domains", href: routes.compareDomains },
      { label: "Keyword Gap", href: routes.keywordGap },
      { label: "Backlink Gap", href: routes.backlinkGap, match: ["/analytics/gap/backlinks"] },
    ],
  },
  {
    heading: "Keyword Research",
    items: [
      { label: "Keyword Overview", href: routes.keywordOverview, match: ["/analytics/keywordoverview"] },
      { label: "Keyword Magic Tool", href: routes.keywordMagic, match: [routes.keywordMagic] },
      { label: "Keyword Strategy Builder", href: routes.keywordStrategyBuilder },
    ],
  },
  {
    heading: "Content Ideas",
    items: [
      { label: "SEO Writing Assistant", href: routes.seoWritingAssistant },
      { label: "Topic Research", href: routes.topicResearch, match: ["/topic-research"] },
    ],
  },
  {
    heading: "Link Building",
    items: [
      { label: "Backlinks", href: routes.backlinks, match: ["/analytics/backlinks"] },
      { label: "Referring Domains", href: routes.referringDomains },
      { label: "Backlink Audit", href: routes.backlinkAudit },
    ],
  },
  {
    heading: "Extras",
    items: [
      { label: "Sensor", href: routes.sensor, match: ["/sensor"] },
      { label: "SEOquake", href: routes.seoquake },
      { label: `${brand.name} Rank`, href: routes.rank, match: ["/analytics/ranks"] },
    ],
  },
  {
    heading: "Other",
    items: [
      { label: "On Page SEO Checker", href: routes.onPageSeoChecker },
      { label: "Organic Traffic Insights", href: routes.organicTrafficInsights },
    ],
  },
];

const T = routes.traffic;

export const aiNav: NavGroup[] = [
  {
    heading: "AI Analysis",
    items: [
      { label: "Visibility Overview", href: routes.ai.overview },
      { label: "Competitor Research", href: routes.ai.competitorResearch },
      { label: "Prompt Research", href: routes.ai.promptResearch },
    ],
  },
  {
    heading: "Brand Performance",
    items: [
      { label: "Brand Performance", href: routes.ai.brandPerformance },
      { label: "Perception", href: routes.ai.perception },
      { label: "Narrative Drivers", href: routes.ai.narrativeDrivers },
      { label: "Questions", href: routes.ai.questions },
    ],
  },
  {
    heading: "Boost & Monitor",
    items: [
      { label: "Site Audit", href: routes.siteAuditCampaign.overview },
      { label: "Prompt Tracking", href: routes.ai.promptTracking },
      { label: "Content Creation", href: routes.content.dashboard, external: true },
    ],
  },
];

export const trafficNav: NavGroup[] = [
  { items: [{ label: "Get Started", href: T.home }] },
  {
    items: [
      { label: "Traffic Analytics", href: T.overview },
      { label: "Market Overview", href: T.marketOverview },
      { label: "Top Pages", href: T.topPages },
      { label: "Competitor Monitoring", href: T.competitorMonitoring },
    ],
  },
  {
    heading: "Traffic Distribution",
    items: [
      { label: "AI Traffic", href: T.aiTraffic },
      { label: "Referral", href: T.referral },
      { label: "Organic Search", href: T.organicSearch },
      { label: "Paid Search", href: T.paidSearch },
      { label: "Organic Social", href: T.organicSocial },
      { label: "Paid Social", href: T.paidSocial },
      { label: "Email", href: T.email },
      { label: "Display Ads", href: T.displayAds },
      { label: "Sources & Destinations", href: T.sourcesDestinations },
    ],
  },
  {
    heading: "Pages and Categories",
    items: [
      { label: "Subfolders & Subdomains", href: T.subfoldersSubdomains },
      { label: "Page Groups", href: T.pageGroups },
    ],
  },
  {
    heading: "Geo Distribution",
    items: [
      { label: "USA", href: T.usa },
      { label: "Countries", href: T.countries },
      { label: "Business Regions", href: T.businessRegions },
      { label: "Geographical Regions", href: T.geographicalRegions },
    ],
  },
  {
    heading: "Audience Research",
    items: [
      { label: "Demographics", href: T.demographics },
      { label: "Audience Overlap", href: T.audienceOverlap },
      { label: "Socioeconomics", href: T.socioeconomics },
      { label: "Behavior", href: T.behavior },
    ],
  },
  {
    heading: "Market Trends",
    items: [
      { label: "Daily Trends", href: T.dailyTrends },
      { label: "Industry & Bulk Analysis", href: T.industryBulk },
      { label: "Trends API", href: T.trendsApi },
      { label: "Trending Websites", href: T.trendingWebsites, match: ["/trending-websites"] },
    ],
  },
];

export const localNav: NavGroup[] = [
  { items: [{ label: "Dashboard", href: routes.local.start, match: ["/local-business"] }] },
  {
    items: [
      { label: "Listing Management", href: routes.local.listings, match: ["/listings-management"] },
      { label: "Review Management", href: routes.local.reviews, match: ["/review-management"] },
      { label: "GBP Optimization", href: routes.local.gbpOptimization, match: ["/gbp-optimization"] },
    ],
  },
  { heading: "Automations", items: [{ label: "GBP AI Agent", href: routes.local.gbpAgent, match: ["/gbp-ai-agent"] }] },
  { heading: "Competitive Analysis", items: [{ label: "Map Rank Tracker", href: routes.local.mapRankTracker }] },
];

export const contentNav: NavGroup[] = [
  { items: [{ label: "Dashboard", href: routes.content.dashboard }] },
  {
    items: [
      { label: "AI Article Generator", href: routes.content.articleGenerator },
      { label: "Content Optimizer", href: routes.content.optimizer },
      { label: "Repurposing Existing Content", href: routes.content.repurpose },
      { label: "Topic Finder", href: routes.content.topicFinder },
      { label: "SEO Brief Generator", href: routes.content.seoBrief },
    ],
  },
  { items: [{ label: "My Content", href: routes.content.myContent }] },
];

export const adNav: NavGroup[] = [
  { items: [{ label: "Get Started", href: routes.ad.home }] },
  {
    items: [
      { label: "Ads Launch Assistant", href: routes.ad.launchAssistant },
      { label: "Ads AI Agent", href: routes.ad.aiAgent },
      { label: "Advertising Research", href: routes.ad.research, match: ["/analytics/adwords"] },
      { label: "PLA Research", href: routes.ad.pla, match: ["/analytics/pla"] },
      { label: "AdClarity", href: routes.ad.adclarity },
    ],
  },
];

export const aiprNav: NavGroup[] = [
  {
    items: [
      { label: "Dashboard", href: routes.aipr.dashboard },
      { label: "AI-Cited Media", href: routes.aipr.aiCitedMedia },
    ],
  },
  {
    heading: "Media Database",
    items: [
      { label: "Contact Search", href: routes.aipr.contactSearch },
      { label: "Media Lists", href: routes.aipr.mediaLists },
    ],
  },
  {
    heading: "Emails",
    items: [
      { label: "Your Emails", href: routes.aipr.yourEmails },
      { label: "Senders and Domains", href: routes.aipr.senders },
    ],
  },
  {
    heading: "Media Monitoring",
    items: [
      { label: "Media Monitoring", href: routes.aipr.mediaMonitoring },
      { label: "Alerts and Digests", href: routes.aipr.alerts },
    ],
  },
];

export const socialNav: NavGroup[] = [
  { items: [{ label: "Dashboard", href: routes.social.dashboard }] },
  {
    heading: "Core",
    items: [
      { label: "Social Poster", href: routes.social.poster },
      { label: "Social Tracker", href: routes.social.tracker },
      { label: "Social Content Insights", href: routes.social.contentInsights },
      { label: "Social Analytics", href: routes.social.analytics },
    ],
  },
  {
    heading: "Advanced",
    items: [
      { label: "Influencer Analytics", href: routes.social.influencer },
      { label: "Media Monitoring", href: routes.social.mediaMonitoring },
    ],
  },
];

export const sectionNavs: Partial<Record<string, { title: string; groups: NavGroup[] }>> = {
  seo: { title: "SEO", groups: seoNav },
  ai: { title: "AI Visibility", groups: aiNav },
  traffic: { title: "Traffic & Market", groups: trafficNav },
  local: { title: "Local", groups: localNav },
  content: { title: "Content", groups: contentNav },
  ad: { title: "Advertising", groups: adNav },
  aipr: { title: "AI PR", groups: aiprNav },
  social: { title: "Social", groups: socialNav },
};

export type Tool = { name: string; description: string; href: string };

export const tools: Tool[] = [
  { name: "Domain Overview", description: "Assess a website and its online visibility", href: routes.domainOverview },
  { name: "Keyword Strategy Builder", description: "Drive more traffic with a ready-made keyword strategy", href: routes.keywordStrategyBuilder },
  { name: "Position Tracking", description: "Monitor your rankings for target keywords", href: routes.positionTracking },
  { name: "Keyword Overview", description: "Access the largest keyword research database on the market", href: routes.keywordOverview },
  { name: "Keyword Gap", description: "Compare your keyword profile to your competitors", href: routes.keywordGap },
  { name: "Keyword Magic Tool", description: "Discover millions of keyword suggestions", href: routes.keywordMagic },
  { name: "Site Audit", description: "Find and fix technical SEO issues on your website", href: routes.siteAudit },
  { name: "Organic Rankings", description: "See which keywords a domain ranks for in Google", href: routes.organic.overview },
  { name: "Top Pages", description: "Find the pages that bring a domain the most traffic", href: routes.topPages },
  { name: "Compare Domains", description: "Compare up to five domains side by side", href: routes.compareDomains },
  { name: "Backlink Gap", description: "Find backlink opportunities your competitors already have", href: routes.backlinkGap },
  { name: "Backlinks", description: "Analyze any domain's backlink profile", href: routes.backlinks },
  { name: "SEO Writing Assistant", description: "Write SEO-friendly content with real-time recommendations", href: routes.seoWritingAssistant },
  { name: "SEO Content Template", description: "Get SEO recommendations for new content", href: routes.seoContentTemplate },
  { name: "Log File Analyzer", description: "See how search bots crawl your website", href: routes.logFileAnalyzer },
  { name: "Topic Research", description: "Find content ideas your audience is searching for", href: routes.topicResearch },
  { name: "SEO Dashboard", description: "See all your SEO metrics in one place", href: routes.seoDashboard },
];
