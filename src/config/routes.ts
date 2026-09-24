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
  compareDomains: "/analytics/comparedomains",
  keywordGap: "/analytics/keywordgap",
  backlinkGap: "/analytics/gap/backlinks/report",

  keywordOverview: "/analytics/keywordoverview",
  keywordOverviewBulk: "/analytics/keywordoverview/bulk",
  keywordMagic: "/analytics/keywordmagic",
  keywordStrategyBuilder: "/analytics/keywordmanager",

  seoWritingAssistant: "/swa",
  topicResearch: "/topic-research",
  topicResearchProject: {
    cards: "/topic-research/6ab52896550d8001abe4c526",
    explorer: "/topic-research/6ab52896550d8001abe4c526/explorer",
    mindMap: "/topic-research/6ab52896550d8001abe4c526/mind-map",
  },

  backlinks: "/analytics/backlinks/overview",
  referringDomains: "/analytics/backlinks/refdomains",
  backlinkAudit: "/backlink-audit",
  sensor: "/sensor",
  seoquake: "/features/seoquake",
  rank: "/analytics/rank",
  onPageSeoChecker: "/on-page-seo-checker",
  organicTrafficInsights: "/oti",
};

export type NavItem = { label: string; href: string; match?: string[] };
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
      { label: "Keyword Magic Tool", href: routes.keywordMagic },
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
      { label: "Backlinks", href: routes.backlinks },
      { label: "Referring Domains", href: routes.referringDomains },
      { label: "Backlink Audit", href: routes.backlinkAudit },
    ],
  },
  {
    heading: "Extras",
    items: [
      { label: "Sensor", href: routes.sensor },
      { label: "SEOquake", href: routes.seoquake },
      { label: `${brand.name} Rank`, href: routes.rank },
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
  { name: "Topic Research", description: "Find content ideas your audience is searching for", href: routes.topicResearch },
  { name: "SEO Dashboard", description: "See all your SEO metrics in one place", href: routes.seoDashboard },
];
