import { brand } from "@/config/brand";
import { routes } from "@/config/routes";

const kbBase = routes.kb;

export type KbSection = { title: string; paragraphs: string[] };
export type KbArticle = {
  slug: string;
  title: string;
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

export const kbHref = (slug: string) => `${kbBase}/${slug}`;

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
  { label: "How-To Articles" },
  { label: "Subscriptions and Toolkits" },
  { label: `${brand.name} One` },
  { label: "Billing and Account", collapsed: true },
  { label: `${brand.name} Toolkits`, collapsed: true },
  { label: "App Center", collapsed: true },
  { label: "Integrations", collapsed: true },
  { label: "Teamwork", collapsed: true },
  { label: "Data and Metrics" },
  { label: "Troubleshooting", collapsed: true },
  { label: "Glossary" },
];
