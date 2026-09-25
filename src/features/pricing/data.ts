import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { kbArticles, kbHref } from "@/features/kb/data";

const kb = kbHref(kbArticles[0].slug);

const B = brand.name;

export const pricingRoutes = routes.pricing;

export type ToolkitSlug = "one" | "seo" | "ai" | "traffic" | "local" | "content" | "social" | "advertising" | "pr";

export type PlanSection = { heading?: string; chip?: boolean; sparkle?: boolean; items: string[] };

export type Plan = {
  name: string;
  desc: string;
  price: number | null;
  cents?: string;
  annual?: string;
  unit?: string;
  cta: string;
  ctaKind?: "dark" | "outline";
  ctaIcon?: boolean;
  subscribe?: boolean;
  activePlan?: boolean;
  sections: PlanSection[];
};

export type CompareValue = string | boolean;
export type CompareRow = { label: string; tag?: string; underline?: boolean; values: CompareValue[] };
export type CompareGroup = { title: string; rows: CompareRow[] };
export type CompareTable = { columns: string[]; highlight?: number; accent?: number; labelWidth?: number; collapsed?: number; headSize?: number; groups: CompareGroup[] };

export type Toolkit = {
  slug: ToolkitSlug;
  title: string;
  desc: string[];
  descWidth?: number;
  badge?: boolean;
  plans: Plan[];
  compare: CompareTable;
  addons?: boolean;
};

const oneDesc = [`${B} helps you build and measure brand visibility, everywhere search happens.`, "Start with what you need. Add more as you grow."];

const seoCompare: CompareTable = {
  columns: ["Pro", "Guru", "Business"],
  highlight: 1,
  groups: [
    {
      title: "Website monitoring",
      rows: [
        { label: "AI Search Site Audit", tag: "Site Audit", values: [true, true, true] },
        { label: "Keywords to track (daily updates)", tag: "Position Tracking", values: ["500", "1,500", "5,000"] },
        { label: "Mobile data", tag: "Position Tracking", values: [true, true, true] },
        { label: "Targets per monitored website", tag: "Position Tracking", values: ["1", "10", "unlimited"] },
        { label: "Pages to crawl per month", tag: "Site Audit", values: ["100,000", "300,000", "1,000,000"] },
        { label: "Share of Voice metric", tag: "Position Tracking", values: [false, false, true] },
      ],
    },
    {
      title: "Competitive research",
      rows: [
        { label: "Results per report", values: ["10,000", "30,000", "50,000"] },
        { label: "Historical data", values: [false, "back to 2012", "back to 2012"] },
        { label: "Keyword Gap", tag: "Competitive research", values: [true, true, true] },
        { label: "Backlink Gap", tag: "Competitive research", values: [true, true, true] },
        { label: "Multi-location and device data", values: [false, true, true] },
      ],
    },
    {
      title: "Keyword research",
      rows: [
        { label: "Keyword Magic Tool", tag: "Keyword research", values: [true, true, true] },
        { label: "Keyword Strategy Builder lists", values: ["5", "250", "500"] },
        { label: "Keyword metrics updates per month", values: ["3,000", "5,000", "10,000"] },
      ],
    },
    {
      title: "Content",
      rows: [
        { label: "SEO Writing Assistant", values: [false, true, true] },
        { label: "SEO Content Template", values: [false, true, true] },
        { label: "Topic Research", values: [false, true, true] },
      ],
    },
    {
      title: "Reporting and access",
      rows: [
        { label: "Scheduled PDF reports", values: ["5", "20", "50"] },
        { label: "Branded PDF reports", values: [false, true, true] },
        { label: "API access", values: [false, false, true] },
        { label: "MCP Access", values: [true, true, true] },
      ],
    },
  ],
};

const threeCol = (columns: string[], groups: CompareGroup[]): CompareTable => ({ columns, groups });

export const toolkits: Record<ToolkitSlug, Toolkit> = {
  one: {
    slug: "one",
    title: "Plans & Pricing",
    desc: oneDesc,
    badge: true,
    plans: [
      {
        name: "Starter",
        desc: "For small teams and agencies growing across organic search and AI",
        price: 199,
        annual: "165.17",
        cta: "Subscribe",
        sections: [
          { heading: "SEO:", items: ["5 websites to [[monitor]]", "500 keywords to [[track]] daily", "Keyword research and optimization [[tools]]", "Competitors insights [[tools]]", "[[MCP access]]"] },
          { heading: "AI Visibility:", chip: true, sparkle: true, items: ["50 [[prompts]] to track daily", "AI visibility reports for any domain", "Brand Performance for 1 domain"] },
        ],
      },
      {
        name: "Pro+",
        desc: "For growing teams and agencies scaling SEO and AI visibility across multiple markets, locations, or websites",
        price: 299,
        annual: "248.17",
        cta: "Subscribe",
        sections: [
          { heading: "All Starter features plus:", items: ["15 websites to [[monitor]]", "1,500 keywords to [[track]] daily", "[[Historical SEO data]]", "Content optimization", "Keyword cannibalization [[analysis]]", "[[Multi-location/device tracking]]"] },
          { heading: "More in AI Visibility:", chip: true, sparkle: true, items: ["100 [[prompts]] to track daily", "Brand Performance for 3 domains"] },
        ],
      },
      {
        name: "Advanced",
        desc: "For organizations and agencies scaling SEO and AI visibility with deeper insights, API access, and automation",
        price: 549,
        annual: "455.67",
        cta: "Subscribe",
        sections: [
          { heading: "All Pro+ features plus:", items: ["40 websites to [[monitor]]", "5,000 keywords to [[track]] daily", "SEO [[share of voice]]", "[[API data integration]]"] },
          { heading: "More in AI Visibility:", chip: true, sparkle: true, items: ["200 [[prompts]] to track daily", "Brand Performance for 5 domains"] },
        ],
      },
    ],
    compare: threeCol(["Starter", "Pro+", "Advanced"], [
      {
        title: "SEO",
        rows: [
          { label: "Websites to monitor", underline: true, values: ["5", "15", "40"] },
          { label: "Keywords to track (daily updates)", tag: "Position Tracking", values: ["500", "1,500", "5,000"] },
          { label: "Historical SEO data", values: [false, true, true] },
          { label: "Content optimization", values: [false, true, true] },
          { label: "API data integration", values: [false, false, true] },
        ],
      },
      {
        title: "AI Visibility",
        rows: [
          { label: "Prompts to track daily", underline: true, values: ["50", "100", "200"] },
          { label: "Brand Performance domains", values: ["1", "3", "5"] },
          { label: "AI visibility reports for any domain", values: [true, true, true] },
        ],
      },
    ]),
    addons: true,
  },
  seo: {
    slug: "seo",
    title: "SEO Classic Plans",
    desc: ["Build the SEO foundation your visibility depends on — from keyword research to technical site audits. Start with what you need. Add more as you grow."],
    descWidth: 420,
    badge: true,
    plans: [
      {
        name: "Pro",
        desc: "For freelancers and small businesses looking to grow their online visibility with SEO",
        price: 139,
        cents: ".95",
        annual: "117.33",
        cta: "Downgrade",
        ctaKind: "outline",
        sections: [
          { heading: "What’s inside:", items: ["Up to 5 websites to [[monitor]]", "[[Keyword research tools]]", "[[Competitor analysis tools]]", "[[Position Tracking]]", "Backlinks", "[[Site Audit]]", "[[MCP Access]]"] },
        ],
      },
      {
        name: "Guru",
        desc: "For growing teams and small businesses scaling SEO across multiple sites and locations",
        price: 249,
        cents: ".95",
        annual: "208.33",
        cta: "Add users",
        ctaKind: "outline",
        ctaIcon: true,
        activePlan: true,
        sections: [{ heading: "All Pro features plus:", items: ["Up to 15 websites to [[monitor]]", "[[Historical data]]", "[[Multi-location and device data]]", "Content optimization tools"] }],
      },
      {
        name: "Business",
        desc: "For agencies and teams managing SEO across many clients and sites — with API access and extended limits",
        price: 499,
        cents: ".95",
        annual: "416.66",
        cta: "Upgrade now",
        sections: [{ heading: "All Guru features plus:", items: ["Up to 40 websites to [[monitor]]", "[[Share of Voice]]", "[[Extended limits]]", "[[API access]]", "[[Migration from third-party tools]]"] }],
      },
    ],
    compare: seoCompare,
    addons: true,
  },
  ai: {
    slug: "ai",
    title: "Plans & Pricing",
    desc: oneDesc,
    plans: [
      {
        name: "Base",
        desc: "For businesses that want to track how they’re mentioned in AI search",
        price: 99,
        unit: "/mo per domain",
        cta: "Subscribe",
        sections: [
          {
            heading: "What’s inside:",
            items: [
              "AI visibility reports for any domain",
              "Track 25 custom prompts (daily AI rankings)",
              "1 domain for Brand Performance analysis",
              "Mentions from ChatGPT, Google AI, Gemini, and Perplexity",
              "AI competitor analysis and prompt research",
              "AI-powered recommendations to improve visibility",
            ],
          },
        ],
      },
    ],
    compare: threeCol(["Base"], [
      {
        title: "AI Visibility",
        rows: [
          { label: "Custom prompts to track", values: ["25"] },
          { label: "Domains for Brand Performance", values: ["1"] },
          { label: "AI competitor analysis", values: [true] },
        ],
      },
    ]),
  },
  traffic: {
    slug: "traffic",
    title: "Plans & Pricing",
    desc: oneDesc,
    plans: [
      {
        name: "Pro",
        desc: "For those making strategic data-driven decisions",
        price: 289,
        cta: "Subscribe",
        sections: [{ heading: "What’s inside:", items: ["Traffic Overview", "Market Landscape", "Acquisition Channel Mix", "Traffic & Market AI Insights", "Top Pages & Conversions", "Competitor Alerts"] }],
      },
    ],
    compare: threeCol(["Pro"], [
      {
        title: "Traffic & Market",
        rows: [
          { label: "Traffic Overview", values: [true] },
          { label: "Market Landscape", values: [true] },
          { label: "Competitor Alerts", values: [true] },
        ],
      },
    ]),
  },
  local: {
    slug: "local",
    title: "Plans & Pricing",
    desc: oneDesc,
    plans: [
      {
        name: "Base",
        desc: "For small local businesses",
        price: 30,
        unit: "/mo per location",
        cta: "Get started",
        subscribe: true,
        sections: [
          {
            heading: "What’s inside:",
            items: ["Automated Google Business Profile management with AI Agent", "AI-powered post generation & publishing", "Review auto-replies", "Automated photo posting", "Map Rank Tracker, 375 credits"],
          },
        ],
      },
      {
        name: "Pro",
        desc: "For growing businesses",
        price: 60,
        unit: "/mo per location",
        cta: "Get started",
        subscribe: true,
        sections: [{ heading: "All Base features plus:", items: ["Listing Management", "Review management and generation", "Advanced GBP management", "Map Rank Tracker, 1,225 credits"] }],
      },
      {
        name: "Business",
        desc: "For large businesses",
        price: null,
        cta: "Contact sales",
        sections: [{ heading: "All Pro features plus:", items: ["Custom pricing and billing cycle", "Customizable limits", "Priority customer support"] }],
      },
    ],
    compare: threeCol(["Base", "Pro", "Business"], [
      {
        title: "Local presence",
        rows: [
          { label: "Google Business Profile management", values: [true, true, true] },
          { label: "Listing Management", values: [false, true, true] },
          { label: "Map Rank Tracker credits", values: ["375", "1,225", "custom"] },
        ],
      },
    ]),
  },
  content: {
    slug: "content",
    title: "Plans & Pricing",
    desc: oneDesc,
    plans: [
      {
        name: "Base",
        desc: "For individuals and small teams scaling content production",
        price: 60,
        cta: "Get started",
        subscribe: true,
        sections: [{ heading: "What’s inside:", items: ["Data-driven content ideas", "10,000 articles/mo", "5 SEO content boosts/mo", "AI and SEO content optimization", "Content in your brand voice"] }],
      },
    ],
    compare: threeCol(["Base"], [
      {
        title: "Content",
        rows: [
          { label: "Articles per month", values: ["10,000"] },
          { label: "SEO content boosts per month", values: ["5"] },
          { label: "Brand voice", values: [true] },
        ],
      },
    ]),
  },
  social: {
    slug: "social",
    title: "Plans & Pricing",
    desc: oneDesc,
    plans: [
      {
        name: "Base",
        desc: "For individuals and small teams",
        price: 20,
        cta: "Get started",
        sections: [{ heading: "What’s inside:", items: ["All essential tools for SMM", "Up to 5 profiles to manage", "Up to 10 profiles to track", "50 monthly posts to publish"] }],
      },
      {
        name: "Pro",
        desc: "For social media pros, businesses and agencies",
        price: 40,
        cta: "Get started",
        sections: [{ heading: "All Base features plus:", items: ["Up to 10 profiles to manage", "Up to 20 profiles to track", "Unlimited posts to publish"] }],
      },
      {
        name: "Business",
        desc: "For scaling businesses, agencies, and brand marketing teams",
        price: 250,
        cta: "Get started",
        sections: [{ heading: "All Pro features plus:", items: ["Influencer Analytics tool", "Media Monitoring tool"] }],
      },
    ],
    compare: threeCol(["Base", "Pro", "Business"], [
      {
        title: "Social media",
        rows: [
          { label: "Profiles to manage", values: ["5", "10", "10"] },
          { label: "Profiles to track", values: ["10", "20", "20"] },
          { label: "Monthly posts to publish", values: ["50", "unlimited", "unlimited"] },
          { label: "Influencer Analytics", values: [false, false, true] },
          { label: "Media Monitoring", values: [false, false, true] },
        ],
      },
    ]),
  },
  advertising: {
    slug: "advertising",
    title: "Plans & Pricing",
    desc: oneDesc,
    plans: [
      {
        name: "Base",
        desc: "For small businesses and marketers scaling ads and maximizing ROI",
        price: 99,
        cta: "Get started",
        sections: [
          {
            heading: "What’s inside:",
            items: [
              "AI recommendations for campaign optimization",
              "Unlimited ad spend",
              "Unified dashboard for Google and Meta",
              "Unlimited ad creative generation",
              "Competitor keyword analysis",
              "Google Shopping ads research",
            ],
          },
        ],
      },
      {
        name: "Pro",
        desc: "For advanced advertisers seeking in-depth competitor insights",
        price: 220,
        cta: "Get started",
        sections: [{ heading: "All Base features plus:", items: ["AdClarity", "All competitor ads", "Display, video, or social ads", "Competitor landing page views"] }],
      },
    ],
    compare: threeCol(["Base", "Pro"], [
      {
        title: "Advertising",
        rows: [
          { label: "Ad spend", values: ["unlimited", "unlimited"] },
          { label: "Competitor keyword analysis", values: [true, true] },
          { label: "AdClarity", values: [false, true] },
        ],
      },
    ]),
  },
  pr: {
    slug: "pr",
    title: "Plans & Pricing",
    desc: oneDesc,
    plans: [
      {
        name: "Base",
        desc: "For individuals focused on PR essentials",
        price: 149,
        cta: "Get started",
        sections: [
          {
            heading: "What’s inside:",
            items: ["AI-cited media finder", "Global media database with AI search", "AI-driven journalist recommendations", "Media pitching tool", "AI for email and press release writing", "Email analytics"],
          },
        ],
      },
      {
        name: "Pro",
        desc: "For those who grow and track their PR impact",
        price: 279,
        cta: "Get started",
        sections: [
          {
            heading: "All Base features plus:",
            items: [
              "Online media monitoring with AI support",
              "Audience and traffic insights for media outlets",
              "Exporting contacts",
              "Scheduling follow-up emails",
              "Advanced email analytics",
              "Tracking which pitches led to earned media coverage",
            ],
          },
        ],
      },
      {
        name: "Business",
        desc: "For professionals needing all-around competitive intelligence",
        price: 499,
        cta: "Get started",
        sections: [
          {
            heading: "All Pro features plus:",
            items: [
              "Tracking competitor media presence",
              "Benchmarking your coverage against competitors",
              "Identifying coverage gaps and opportunities",
              "Grouping media monitoring searches by brand",
              "50,000 media mentions to monitor per month",
            ],
          },
        ],
      },
    ],
    compare: threeCol(["Base", "Pro", "Business"], [
      {
        title: "AI PR",
        rows: [
          { label: "Media database", values: [true, true, true] },
          { label: "Online media monitoring", values: [false, true, true] },
          { label: "Media mentions to monitor per month", values: [false, "10,000", "50,000"] },
        ],
      },
    ]),
  },
};

export const sidebarToolkits: { slug: ToolkitSlug; label: string }[] = [
  { slug: "seo", label: "SEO Classic" },
  { slug: "ai", label: "AI Visibility" },
  { slug: "traffic", label: "Traffic & Market" },
  { slug: "local", label: "Local" },
  { slug: "content", label: "Content" },
  { slug: "social", label: "Social" },
  { slug: "advertising", label: "Advertising" },
  { slug: "pr", label: "AI PR" },
];

export const addons = [
  {
    icon: "users",
    title: "Additional Users",
    price: "$80/mo",
    cta: "Add users",
    items: [`Add colleagues to your ${B} account`, "Collaborate across shared projects", "Assign roles and permissions", "Keep your account secure with individual logins"],
  },
  {
    icon: "megaphone",
    title: "Lead Generation",
    price: "$90/mo",
    cta: "Buy add-on",
    items: [`Branded profile on the ${B} Agency Partners platform`, "Get leads from businesses looking for an agency", "Promote your services across marketing channels"],
  },
  {
    icon: "report",
    title: "Base Report",
    price: "$10/mo",
    cta: "Buy add-on",
    items: [`Data from 20+ ${B} tools`, "Google Analytics and Google Search Console integrations", "Monthly/Weekly/Daily scheduling", "PDF export", `Sharing with ${B} users`],
  },
  {
    icon: "reportPro",
    title: "Pro Report",
    price: "$20/mo",
    cta: "Buy add-on",
    items: ["All Base Report features", "20+ external integrations", "Delivery at a specific time", "Branding and white-labeling", "AI-generated summaries", "Sharing by link"],
  },
] as const;

export const enterprise = {
  title: `${B} for Enterprise`,
  desc: "For complex organizations managing multiple brands, regions, and teams — with the scale, controls, and integrations to operationalize visibility and prove its impact.",
  bullets: ["Coordination-heavy environment", "Multiple brands, clients, or regions", "Shared accountability for results", "Consistency, control, and reporting at scale"],
  checks: [
    "Unlimited projects & custom limits",
    "Custom large-scale AI prompt tracking",
    "Daily or weekly tracking frequency",
    "Multi-brand, multi-product AI visibility",
    "Advanced AI Automations and content workflows",
    "Forecasting & ROI attribution",
    "Multi-million-page crawling",
    "Custom integrations & API",
    "SSO, team governance & audit logs",
    "Dedicated account manager",
    "Enterprise SLA & 24/7 support",
  ],
};

export const faq = [
  { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your subscription, downgrade or upgrade your plan at any time, unless you have custom terms and a signed agreement with us." },
  { q: `What is ${B}’s refund policy?`, a: "If you are not satisfied with your subscription, you can request a full refund within 7 days of purchase. Refunds are processed to the original payment method." },
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express and Discover cards, as well as PayPal. Annual business plans can also be paid by bank transfer." },
  { q: "Do I get a customer demo?", a: "Yes. Our team can walk you through the toolkits that matter to you and help you set up your first projects. Request a demo and we will get back to you." },
  { q: `Can I use ${B} for free?`, a: "Yes. A free account gives you limited access to reports and tools, so you can explore the platform before choosing a plan." },
  { q: "Am I charged when I enter my credit card?", a: "No. Your card is charged only when your subscription starts or when a free trial ends. You can cancel before that at no cost." },
  { q: "Can I change my plan later?", a: "Yes. You can switch between plans at any time from your subscription settings. Changes take effect immediately and are prorated." },
  { q: "Can I add more users to my subscription?", a: "Yes. Additional users can be added to any paid plan. Each user gets their own login and can collaborate on shared projects." },
  { q: "Which would be better for me, Guru or Pro?", a: "Pro covers the essentials for a small number of websites. Guru adds historical data, content tools and higher limits for teams managing several sites." },
  { q: "I run a small agency. What plan should I choose?", a: "Most small agencies start with Guru. If you need API access, Share of Voice or higher limits across many clients, choose Business." },
  { q: "What is the pricing currency?", a: "All prices are listed in US dollars. Taxes may apply depending on your location." },
];

export const testimonials = [
  {
    quote: `By using ${B}, my team saves a lot of time by working on the right content and in a more data-driven way. Everything we do here is backed up with data, and your tool is giving us more ammunition.`,
    title: "Organic Growth Lead",
    org: "Website building platform",
  },
  {
    quote: `${B} is the first tool we open every morning. It shows us where we stand and what our competitors are doing, all in one place.`,
    title: "Head of SEO",
    org: "E-commerce retailer",
  },
  {
    quote: "We moved all of our client reporting into one platform. The time we save every month goes straight back into strategy work.",
    title: "Agency Founder",
    org: "Digital marketing agency",
  },
  {
    quote: "Tracking our visibility in AI search next to classic rankings finally gave our leadership a complete picture of our brand online.",
    title: "Director of Digital Marketing",
    org: "Travel company",
  },
  {
    quote: "The data is reliable, the tools are easy to use, and the team behind it keeps shipping features that we actually need.",
    title: "Content Marketing Manager",
    org: "SaaS company",
  },
];

export const enterpriseCompare: CompareTable = {
  columns: ["AI Visibility toolkit", "AI Optimization"],
  accent: 1,
  highlight: 1,
  labelWidth: 360,
  collapsed: 207,
  headSize: 20,
  groups: [
    {
      title: "Prompt tracking",
      rows: [
        { label: "Prompt tracking", values: ["25 - 200", "Unlimited"] },
        { label: "LLM Coverage", values: ["ChatGPT, Google AI Overviews, Google AI Mode, Perplexity, and Gemini", "ChatGPT, Google AI Overview, Google AI Mode, Perplexity, MS Copilot, Grok, Gemini, Claude, DeepSeek"] },
        { label: "Tracking frequency", values: ["Daily", "Daily or weekly"] },
        { label: "Markets and languages", values: ["Selected markets", "Global & local markets"] },
      ],
    },
    {
      title: "Analysis",
      rows: [
        { label: "Brand, concept, or product line analysis", values: [false, true] },
        { label: "ROI attribution & funnel analysis", values: [false, true] },
        { label: "Segment-level forecasting", values: [false, true] },
      ],
    },
    {
      title: "Support",
      rows: [
        { label: "Dedicated account manager", values: [false, true] },
        { label: "SSO, team governance & audit logs", values: [false, true] },
      ],
    },
  ],
};

export const enterpriseCard = {
  title: "AI Optimization",
  desc: "For organizations managing multiple brands or markets that require granular insights and advanced technical capabilities",
  checks: ["Full LLM coverage", "Detailed analysis by brand, concept, or product line", "Market insights from global to local", "ROI attribution & funnel analysis", "Segment-level forecasting for visibility & traffic"],
  stats: [
    { value: "+50%", label: "more bookings from AI sources" },
    { value: "+70%", label: "share of Voice in ChatGPT AI Mode" },
  ],
  quote: "We're using AIO insights alongside traditional SEO tools to get a more complete view of our digital presence and explore how we can improve visibility in both search engines and LLMs.",
  quoteTitle: "Global SEO Manager",
  quoteOrg: "Diagnostics company, international",
};

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: B,
    links: [
      { label: `${B} One`, href: pricingRoutes.one },
      { label: "Features", href: routes.home },
      { label: "Solutions", href: routes.home },
      { label: "Pricing", href: pricingRoutes.seo },
      { label: `Compare ${B}`, href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Stats and Facts", href: "#" },
      { label: "Affiliate Program", href: "#" },
    ],
  },
  {
    title: "More tools",
    links: [
      { label: `${B} MCP`, href: "#" },
      { label: "Enterprise SEO", href: pricingRoutes.enterprise },
      { label: "Enterprise AIO", href: pricingRoutes.enterprise },
      { label: "Enterprise SI", href: pricingRoutes.enterprise },
      { label: "Insights24", href: "#" },
      { label: "Mfour", href: "#" },
      { label: "App Center", href: routes.apps },
      { label: "Top Websites", href: routes.traffic.trendingWebsites },
      { label: "Free Tools", href: "#" },
      { label: "Sensor", href: routes.sensor },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: `${B} Questions`, href: "#" },
      { label: "News", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Partners", href: routes.account.agencyPartners },
      { label: `${B} Select`, href: "#" },
      { label: "Global Issues Index", href: "#" },
      { label: "Do not sell my personal info", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Knowledge Base", href: kb },
      { label: "Academy", href: "#" },
      { label: `${B} API`, href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: `${B} Blog`, href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Ambassador Program", href: "#" },
    ],
  },
];

export const menuLinks = [
  { label: `${B} One`, href: pricingRoutes.one },
  { label: "SEO Classic", href: pricingRoutes.seo },
  { label: "Enterprise", href: pricingRoutes.enterprise },
  { label: "App Center", href: routes.apps },
  { label: "Knowledge Base", href: kb },
  { label: "Go to dashboard", href: routes.home },
];

export const languages = ["English", "Deutsch", "Español", "Français", "Italiano", "Português", "Svenska", "日本語"];
