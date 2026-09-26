import { brand } from "@/config/brand";
import { routes } from "@/config/routes";

const kbBase = routes.kb;

export type KbSection = { title: string; paragraphs: string[] };
export type KbArticle = {
  slug: string;
  title: string;
  category?: string;
  intro: { text: string; link?: { label: string; href: string; before: string; after: string } }[];
  cta?: { label: string; href: string };
  sections: KbSection[];
};

export const kbArticles: KbArticle[] = [
  {
    slug: "1184-audit-your-website",
    title: "Audit your website",
    intro: [
      {
        text: "",
        link: {
          before: `Technical SEO errors can hold back your site and negatively impact rankings, overall visibility, and conversions. To identify and fix such issues quickly, use the ${brand.name} `,
          label: "Site Audit Tool",
          href: routes.siteAudit,
          after: ". It crawls a domain and creates a report to show where there are potential problems and suggests recommendations on how to improve your website’s technical health. Site Audit offers a range of thematic reports covering crawlability, HTTPS, site performance, Core Web Vitals, and more.",
        },
      },
      { text: "We’ve put together this workflow to show how you can organize your work in Site Audit in an efficient way. Follow these steps to quickly discover a website’s gaps you need to focus on first to improve its technical health and as a result enhance its visibility." },
    ],
    cta: { label: "Launch Site Audit", href: routes.siteAudit },
    sections: [
      {
        title: "Launch Site Audit",
        paragraphs: [
          `When you create your first folder in ${brand.name}, a Site Audit campaign is automatically launched for the domain. You can also start a new audit at any time from the Site Audit projects list by clicking “Create project” and entering your domain.`,
          "In the setup window, choose how many pages to crawl, which crawl source to use, and whether to include or exclude specific subfolders. Once the crawl is finished, you will see the Overview report with your Site Health score and the number of errors, warnings, and notices.",
        ],
      },
      {
        title: "Prioritize Your Work",
        paragraphs: [
          "Open the Issues tab to see every problem found on your site, grouped by severity. Start with errors, since they have the biggest impact on how search engines crawl and index your pages, then move on to warnings and notices.",
          "Click “Why and how to fix it” next to any issue to get a short explanation and a recommendation. Use the Top Issues widget on the Overview report to focus on the problems affecting the largest number of pages.",
        ],
      },
      {
        title: "Send Issues to Task Trackers",
        paragraphs: [
          "To share work with your team, send issues directly to Trello, Zapier, or Jira from the Issues report. Each task contains the issue description, the list of affected pages, and a link back to the report, so developers have everything they need.",
        ],
      },
      {
        title: "Track Changes in the Progress Tab",
        paragraphs: [
          "After you fix the issues, rerun the campaign or schedule automatic weekly audits. The Progress tab shows how your Site Health score and the number of issues change over time, so you can confirm that fixes were applied correctly.",
        ],
      },
      {
        title: "Monitor Visibility Progress in Position Tracking",
        paragraphs: [
          "Technical improvements should translate into better rankings. Set up a Position Tracking campaign for your key target keywords to monitor daily visibility changes and see how your work in Site Audit affects your performance in search.",
        ],
      },
    ],
  },
  {
    slug: "1185-conduct-keyword-research",
    title: "Conduct keyword research",
    intro: [{ text: "Keyword research helps you find the search terms your audience uses and decide which topics to target. Start with Keyword Overview to evaluate a single term, then expand your list in Keyword Magic Tool." }],
    cta: { label: "Open Keyword Magic Tool", href: routes.keywordMagic },
    sections: [
      { title: "Analyze a Seed Keyword", paragraphs: ["Enter a keyword in Keyword Overview to see its volume, difficulty, intent, and SERP features across databases."] },
      { title: "Expand Your List", paragraphs: ["Use Keyword Magic Tool to find thousands of related keywords, group them by topic, and filter by volume, difficulty, and intent."] },
      { title: "Build a Strategy", paragraphs: ["Send your best keywords to Keyword Strategy Builder to create topic clusters and plan your content."] },
    ],
  },
  {
    slug: "1186-track-your-rankings",
    title: "Track your rankings",
    intro: [{ text: "Position Tracking monitors your daily rankings for a custom set of keywords, in any location and on any device." }],
    cta: { label: "Launch Position Tracking", href: routes.positionTracking },
    sections: [
      { title: "Set Up a Campaign", paragraphs: ["Choose your domain, search engine, device, and location, then add the keywords you want to track."] },
      { title: "Review Your Visibility", paragraphs: ["The Landscape and Overview reports show your visibility trend, estimated traffic, and average position over time."] },
    ],
  },
  {
    slug: "1187-create-winning-content",
    title: "Create winning content",
    intro: [{ text: "Use the Content Toolkit to research topics, write SEO-friendly drafts, and optimize them for search and AI visibility." }],
    cta: { label: "Open Content Toolkit", href: routes.content.dashboard },
    sections: [
      { title: "Find Topics", paragraphs: ["Topic Finder surfaces the subjects your audience is searching for, based on your niche and competitors."] },
      { title: "Write and Optimize", paragraphs: ["Generate a draft with AI Article Generator, then improve it with the recommendations in Content Optimizer."] },
    ],
  },
  {
    slug: "1188-optimize-backlinks",
    title: "Optimize backlinks",
    intro: [{ text: "A healthy backlink profile is one of the strongest ranking signals. Use Backlink Analytics and Backlink Audit to review and improve your links." }],
    cta: { label: "Open Backlink Analytics", href: routes.backlinks },
    sections: [
      { title: "Review Your Profile", paragraphs: ["Check your referring domains, anchors, and new and lost backlinks in Backlink Analytics."] },
      { title: "Audit Toxic Links", paragraphs: ["Backlink Audit flags potentially harmful links so you can remove or disavow them."] },
    ],
  },
  {
    slug: "1189-run-competitive-analysis",
    title: "Run competitive analysis",
    intro: [{ text: "Understand who you compete with in search and how their strategies differ from yours." }],
    cta: { label: "Open Domain Overview", href: routes.domainOverview },
    sections: [
      { title: "Identify Competitors", paragraphs: ["The Competitors report in Organic Research lists the domains that rank for the same keywords as you."] },
      { title: "Compare Domains", paragraphs: ["Use Keyword Gap and Backlink Gap to find keywords and links your competitors have that you don’t."] },
    ],
  },
];

const simple = (slug: string, title: string, category: string, intro: string, sections: [string, string][], cta?: { label: string; href: string }): KbArticle => ({
  slug,
  title,
  category,
  intro: [{ text: intro }],
  cta,
  sections: sections.map(([t, p]) => ({ title: t, paragraphs: [p] })),
});

kbArticles.push(
  simple("1200-how-to-articles", "How-to articles", "How-To Articles", `Ready-made workflows that show how to solve everyday marketing tasks with ${brand.name}, step by step.`, [
    ["Pick a Workflow", "Browse workflows for audits, keyword research, competitor analysis, and reporting. Each one lists the tools you need and the order to use them in."],
    ["Follow the Steps", "Every step links straight to the right report, so you can repeat the workflow on your own projects."],
  ]),
  simple("1201-billing-and-account", "Billing and account", "Billing and Account", "Manage your subscription, payment details, invoices, and limits from your account settings.", [
    ["Subscription Info", "See your current plan, renewal date, and the limits available to you and your team."],
    ["Invoices and Payments", "Download invoices, update your card, or change your billing details at any time."],
  ], { label: "Open Subscription info", href: routes.account.subscription }),
  simple("1202-seo-toolkit", "SEO Toolkit", `${brand.name} Toolkits`, "The SEO Toolkit brings together 20+ tools for keyword research, competitor analysis, rank tracking, link building, and technical SEO.", [
    ["Start With the Dashboard", "The SEO Dashboard gives you an overview of your projects, rankings, and site health in one place."],
    ["Explore the Tools", "Use Domain Overview, Keyword Magic Tool, Site Audit, and Position Tracking to grow your organic traffic."],
  ], { label: "Open SEO Dashboard", href: routes.seoDashboard }),
  simple("1203-ai-visibility-toolkit", "AI Visibility Toolkit", `${brand.name} Toolkits`, "See how AI platforms mention your brand and find opportunities to gain visibility in AI answers.", [
    ["Visibility Overview", "Check how often your brand appears in AI answers compared with competitors."],
    ["Prompt Research", "Discover the prompts your audience uses and where your brand is missing."],
  ], { label: "Open Visibility Overview", href: routes.ai.overview }),
  simple("1204-local-toolkit", "Local Toolkit", `${brand.name} Toolkits`, "Build your business’s online presence, keep listings accurate, and manage its reputation.", [
    ["Listing Management", "Distribute accurate business information to directories and maps."],
    ["Review Management", "Monitor and reply to reviews from one place."],
  ], { label: "Open Local Toolkit", href: routes.local.start }),
  simple("1205-traffic-and-market-toolkit", "Traffic & Market Toolkit", `${brand.name} Toolkits`, "Analyze the market, benchmark against competitors, and follow emerging trends.", [
    ["Traffic Analytics", "Estimate any website’s traffic, engagement, and sources."],
    ["Market Overview", "Understand the size and leaders of your market."],
  ], { label: "Open Traffic Analytics", href: routes.traffic.overview }),
  simple("1206-advertising-toolkit", "Advertising Toolkit", `${brand.name} Toolkits`, "Research your competitors’ advertising campaigns and launch your own.", [
    ["Advertising Research", "See the keywords and ad copies your competitors use in paid search."],
    ["Ads Launch Assistant", "Create and launch campaigns with guided recommendations."],
  ], { label: "Open Advertising Toolkit", href: routes.ad.home }),
  simple("1207-content-toolkit", "Content Toolkit", `${brand.name} Toolkits`, "Find content ideas, create SEO briefs, generate articles with AI, and optimize your drafts.", [
    ["Topic Finder", "Find the topics your audience is looking for."],
    ["Content Optimizer", "Improve drafts with recommendations for search and AI visibility."],
  ], { label: "Open Content Toolkit", href: routes.content.dashboard }),
  simple("1208-social-toolkit", "Social Toolkit", `${brand.name} Toolkits`, "Schedule, post, and track performance across all key social platforms.", [
    ["Plan and Post", "Schedule posts for several networks from one calendar."],
    ["Track Performance", "Compare your results with competitors and find what works."],
  ], { label: "Open Social Toolkit", href: routes.social.dashboard }),
  simple("1209-teamwork", "Teamwork", "Teamwork", "Manage users, share insights, and stay in sync with your team members.", [
    ["Add Users", "Invite colleagues to your subscription and set their access levels."],
    ["Share Projects", "Share projects and reports so everyone works with the same data."],
  ]),
  simple("1210-app-center", "App Center", "App Center", "The home for all your marketing apps, from market research to campaign management.", [
    ["Find Apps", "Browse apps by category and try them before you buy."],
    ["Manage Your Apps", "See all the apps you use and your subscriptions in My Apps."],
  ], { label: "Open App Center", href: routes.apps }),
  simple("1211-check-your-online-visibility", "Check your online visibility", "Getting Started", "Find out how visible your website is in search and which keywords bring you traffic.", [
    ["Analyze Your Domain", "Enter your domain in Domain Overview to see authority, organic traffic, and top keywords."],
    ["Track Changes", "Set up Position Tracking to follow your visibility every day."],
  ], { label: "Open Domain Overview", href: routes.domainOverview }),
  simple("1212-analyze-competitors-advertising", "Analyze your competitor’s advertising", "How-To Articles", "See where your competitors advertise, which keywords they bid on, and how their ads look.", [
    ["Research Paid Keywords", "Advertising Research lists the keywords a domain bids on with positions and estimated costs."],
    ["Review Ad Copies", "Browse competitors’ ad texts to find messaging ideas."],
  ], { label: "Open Advertising Research", href: routes.ad.research }),
  simple("1213-domain-overview", "Domain Overview", `${brand.name} Toolkits`, "Get an instant summary of any domain’s organic and paid performance, backlinks, and AI visibility.", [
    ["Read the Summary", "Authority Score, organic traffic, and keywords are shown at the top of the report."],
    ["Compare Databases", "Switch countries or compare several markets side by side."],
  ], { label: "Open Domain Overview", href: routes.domainOverview }),
  simple("1214-traffic-analytics", "Traffic Analytics", `${brand.name} Toolkits`, "Estimate the traffic of any website and see where its visitors come from.", [
    ["Traffic Overview", "Check visits, unique visitors, pages per visit, and bounce rate."],
    ["Sources", "Break traffic down by channel, country, and device."],
  ], { label: "Open Traffic Analytics", href: routes.traffic.overview }),
  simple("1215-keyword-gap", "Keyword Gap", `${brand.name} Toolkits`, "Compare keyword profiles of up to five domains and find the keywords you are missing.", [
    ["Add Competitors", "Enter your domain and up to four competitors."],
    ["Find Opportunities", "Use the Missing and Weak tabs to spot keywords worth targeting."],
  ], { label: "Open Keyword Gap", href: routes.keywordGap }),
  simple("1216-seo-writing-assistant", "SEO Writing Assistant", `${brand.name} Toolkits`, "Check your texts for SEO, readability, originality, and tone of voice as you write.", [
    ["Add Target Keywords", "Get recommendations based on the top-ranking pages for your keywords."],
    ["Improve Your Score", "Follow the tips until your text reaches a high overall score."],
  ], { label: "Open SEO Writing Assistant", href: routes.seoWritingAssistant }),
  simple("1217-troubleshooting-site-audit", "Troubleshooting Site Audit", "Troubleshooting", "What to do when Site Audit can’t crawl your website or shows unexpected results.", [
    ["Check Access", "Make sure your server doesn’t block our crawler and that robots.txt allows crawling."],
    ["Adjust Settings", "Change the crawl source, user agent, or crawl delay and run the audit again."],
  ], { label: "Open Site Audit", href: routes.siteAudit }),
  simple("1218-core-web-vitals-report", "Core Web Vitals Site Audit report", `${brand.name} Toolkits`, "Review how your pages perform on Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift.", [
    ["Read the Report", "See which pages pass and which need improvement."],
    ["Fix Issues", "Follow the recommendations for each metric to speed up your pages."],
  ], { label: "Open Core Web Vitals", href: routes.siteAuditCampaign.webVitals }),
  simple("1219-social-tracker", "Social Tracker", `${brand.name} Toolkits`, "Track your competitors’ social media performance and learn from their best posts.", [
    ["Add Competitors", "Add the profiles you want to follow on each network."],
    ["Compare Results", "See audience growth, activity, and engagement side by side."],
  ]),
  simple("1220-looker-studio-integration", `Integrating ${brand.name} with Looker Studio`, "Integrations", `Bring ${brand.name} data into Looker Studio dashboards with our connectors.`, [
    ["Connect Your Account", "Add the connector in Looker Studio and authorize access."],
    ["Build Dashboards", "Combine our metrics with your own data sources in one report."],
  ]),
  simple("1221-subscriptions-and-toolkits", "Subscriptions and toolkits", "Subscriptions and Toolkits", `Learn how ${brand.name} One and individual toolkits work and what each plan includes.`, [
    ["Choose a Plan", "Compare the limits and features of each plan."],
    ["Add Toolkits", "Add toolkits and extra limits to your subscription whenever you need them."],
  ], { label: "See plans and pricing", href: routes.pricing.one }),
  simple("1222-api", "API", "Data and Metrics", `Access ${brand.name} data programmatically and use it in your own tools.`, [
    ["API Units", "Each request consumes API units. Check your balance on the Subscription info page."],
    ["Get Started", "Create an API key and send your first request."],
  ], { label: "Open API units", href: routes.account.apiUnits }),
  simple("1223-integrations", "Integrations", "Integrations", `Connect ${brand.name} with Google Analytics, Google Search Console, and other tools you use every day.`, [
    ["Google Integrations", "Connect Google accounts to enrich your reports with first-party data."],
    ["Task Trackers", "Send tasks to Trello, Jira, or Zapier."],
  ]),
  simple("1224-data-and-metrics", "Data and metrics", "Data and Metrics", "How we collect our data and what each metric in our reports means.", [
    ["Data Sources", "Our data comes from clickstream panels, crawlers, and partner providers."],
    ["Metrics Glossary", "Definitions of volume, keyword difficulty, Authority Score, and more."],
  ]),
  simple("1225-academy-courses", "Free courses and certifications", "Getting Started", "Try out dozens of free courses and certification exams developed by SEO and digital marketing experts.", [
    ["Pick a Course", "Courses cover SEO, content marketing, PPC, and our tools."],
    ["Get Certified", "Pass the exam at the end of a course to get a certificate."],
  ]),
  simple("1226-free-training-sessions", "Free training sessions", "Getting Started", `Join a free training session to learn how ${brand.name} can help you solve specific problems and reach particular goals.`, [
    ["Request a Session", "Tell us about your goals and pick a time that suits you."],
    ["Prepare Questions", "Bring your projects and questions so the session covers what matters to you."],
  ]),
);

export const kbHref = (slug: string) => `${kbBase}/${slug}`;

export const kbCategories = [
  { icon: "start", title: "Getting Started", text: "Start using our tools easily with our actionable tips.", slug: "1184-audit-your-website" },
  { icon: "howto", title: "How-to Articles", text: "Check out ready workflows tailored to your needs.", slug: "1200-how-to-articles" },
  { icon: "billing", title: "Billing and Account", text: "Adjust your subscription and limits to your liking.", slug: "1201-billing-and-account" },
  { icon: "seo", title: "SEO", text: "Increase traffic and boost search rankings with the help of 20+ tools.", slug: "1202-seo-toolkit" },
  { icon: "ai", title: "AI Visibility", text: "See how AI platforms mention your brand, find opportunities to gain visibility.", slug: "1203-ai-visibility-toolkit" },
  { icon: "local", title: "Local", text: "Enhance your visibility. Build your business’s online presence and manage its reputation.", slug: "1204-local-toolkit" },
  { icon: "traffic", title: "Traffic & Market", text: "Analyze the market, benchmark against competitors, and follow emerging trends.", slug: "1205-traffic-and-market-toolkit" },
  { icon: "ad", title: "Advertising", text: "Research your competitors’ advertising campaigns and launch your own.", slug: "1206-advertising-toolkit" },
  { icon: "content", title: "Content Toolkit", text: "Find content ideas, create SEO briefs, generate articles with AI, and optimize your drafts.", slug: "1207-content-toolkit" },
  { icon: "social", title: "Social Media", text: "Schedule, post, and track performance across all key social platforms.", slug: "1208-social-toolkit" },
  { icon: "team", title: "Teamwork", text: "Manage users, share insights & stay in sync with your team members.", slug: "1209-teamwork" },
  { icon: "apps", title: "App Center", text: "The home for all your marketing apps, from market research to campaign management.", slug: "1210-app-center" },
];

export const kbQuickLinks: { label: string; slug: string }[][] = [
  [
    { label: "Check Your Online Visibility", slug: "1211-check-your-online-visibility" },
    { label: "Position Tracking", slug: "1186-track-your-rankings" },
    { label: `Integrating ${brand.name} with Looker Studio`, slug: "1220-looker-studio-integration" },
  ],
  [
    { label: "Discover Your Competitors", slug: "1189-run-competitive-analysis" },
    { label: "SEO Writing Assistant", slug: "1216-seo-writing-assistant" },
    { label: "Subscriptions and Toolkits", slug: "1221-subscriptions-and-toolkits" },
  ],
  [
    { label: "Analyze Your Competitor's Advertising", slug: "1212-analyze-competitors-advertising" },
    { label: "Site Audit", slug: "1184-audit-your-website" },
    { label: "API", slug: "1222-api" },
  ],
  [
    { label: "Domain Overview", slug: "1213-domain-overview" },
    { label: "Troubleshooting Site Audit", slug: "1217-troubleshooting-site-audit" },
    { label: "Integrations", slug: "1223-integrations" },
  ],
  [
    { label: "Traffic Analytics", slug: "1214-traffic-analytics" },
    { label: "Core Web Vitals Site Audit Report", slug: "1218-core-web-vitals-report" },
    { label: "Data and Metrics", slug: "1224-data-and-metrics" },
  ],
  [
    { label: "Keyword Magic Tool", slug: "1185-conduct-keyword-research" },
    { label: "Auditing Your Backlinks", slug: "1188-optimize-backlinks" },
  ],
  [
    { label: "Keyword Gap", slug: "1215-keyword-gap" },
    { label: "Social Tracker", slug: "1219-social-tracker" },
  ],
];

export const helpArticleSlugs: Record<string, string> = {
  "Audit your website": "1184-audit-your-website",
  "Conduct keyword research": "1185-conduct-keyword-research",
  "Track your rankings": "1186-track-your-rankings",
  "Create winning content": "1187-create-winning-content",
  "Optimize backlinks": "1188-optimize-backlinks",
  "Run competitive analysis": "1189-run-competitive-analysis",
};

type NavNode = { label: string; slug?: string; children?: NavNode[]; collapsed?: boolean };

export const kbNav: NavNode[] = [
  { label: `What is ${brand.name}?` },
  {
    label: "Getting Started",
    children: [
      { label: "Audit your website", slug: "1184-audit-your-website" },
      { label: "Create Content That Brings You More Traffic", slug: "1187-create-winning-content" },
      { label: "Track your rankings", slug: "1186-track-your-rankings" },
      { label: "Run Competitive Analysis", slug: "1189-run-competitive-analysis" },
      { label: "Conduct Keyword research", slug: "1185-conduct-keyword-research" },
      { label: "Optimize Backlinks", slug: "1188-optimize-backlinks" },
    ],
  },
  { label: "How-To Articles", slug: "1200-how-to-articles" },
  { label: "Subscriptions and Toolkits", slug: "1221-subscriptions-and-toolkits" },
  { label: `${brand.name} One` },
  { label: "Billing and Account", collapsed: true, slug: "1201-billing-and-account" },
  { label: `${brand.name} Toolkits`, collapsed: true },
  { label: "App Center", collapsed: true, slug: "1210-app-center" },
  { label: "Integrations", collapsed: true, slug: "1223-integrations" },
  { label: "Teamwork", collapsed: true, slug: "1209-teamwork" },
  { label: "Data and Metrics", slug: "1224-data-and-metrics" },
  { label: "Troubleshooting", collapsed: true, slug: "1217-troubleshooting-site-audit" },
  { label: "Glossary" },
];
