import { brand } from "@/config/brand";
import { routes } from "@/config/routes";

export const socialHero = {
  title: ["Social Media Management", "as Easy as Click, Click"],
  cta: "Try for free",
  note: "7 days free, then $20/month",
  subtitle: "Easily Grow Your Brand’s Visibility On Social Media",
};

export const socialTools = ["tracker", "poster", "content-insights", "analytics"] as const;
export type SocialTool = (typeof socialTools)[number];
export const toolFeature: Record<SocialTool, number> = { tracker: 0, poster: 1, "content-insights": 2, analytics: 2 };
export const socialToolHref = (tool: SocialTool) => `${routes.social.dashboard}?tool=${tool}`;

export type SocialFeature = { title: string; bullets: string[]; cta: string; href: string; art: "audience" | "calendar" | "engagement" | "influencers" | "mentions" };

export const socialFeatures: SocialFeature[] = [
  {
    title: "Track and analyze any brand’s social strategy",
    bullets: [
      "Track all your competitors’ accounts to uncover their best tactics",
      "Get a 360-degree view of your brand’s impact by comparing your KPIs",
      "Monitor the top social media accounts in your niche and jump on best trends early",
    ],
    cta: "Analyze competitors",
    href: socialToolHref("tracker"),
    art: "audience",
  },
  {
    title: "Create and share engaging content on all your social profiles",
    bullets: [
      "Streamline your social calendar by scheduling posts to Instagram, Facebook, Pinterest, LinkedIn, and Google Business Profile",
      "Create content, manage your approval process, and find the best time to post",
      "Effortlessly share any type of social content on all of your social profiles",
    ],
    cta: "Drive engagement",
    href: socialToolHref("poster"),
    art: "calendar",
  },
  {
    title: "Hone your social strategy with analytical insights",
    bullets: [
      "Strengthen your social presence with data-driven recommendations",
      "Track your KPIs with easy-to-understand data visualization",
      "Stay up-to-date with automated reporting delivered straight to your inbox",
    ],
    cta: "Amplify your success",
    href: socialToolHref("analytics"),
    art: "engagement",
  },
  {
    title: "Find influencers who fit your brand",
    bullets: [
      "Search a database of 30M+ creators on YouTube, Instagram, TikTok, and Twitch",
      "Check audience demographics and engagement before you reach out",
      "Track campaign performance from discovery to clicks",
    ],
    cta: "Discover influencers",
    href: routes.social.influencer,
    art: "influencers",
  },
  {
    title: "Catch every conversation about your brand",
    bullets: [
      "Monitor mentions across social media, news sites, and forums",
      "Filter the noise with sentiment and reach filters",
      "Act fast on the conversations that matter",
    ],
    cta: "Monitor mentions",
    href: routes.social.mediaMonitoring,
    art: "mentions",
  },
];


export const upsell = {
  title: ["Unlock", "our most", "advanced plan"],
  text: "Get every social tool in one place: scheduling, competitor tracking, analytics, and reporting for your whole team.",
  bullets: ["Unlimited scheduled posts", "Track up to 100 competitor profiles", "Automated PDF reports"],
  cta: "Upgrade now",
  chips: [
    { title: "Social media management", text: "Create and schedule engaging posts, track performance" },
    { title: "Competitor insights", text: "Benchmark your profiles against rivals" },
  ],
};

export const testimonials: { quote: string; title: string; company: string; avatar?: { tone: string; hair: string; bg: string } }[][] = [
  [
    {
      quote: `“${brand.name} Social has made planning our content calendar so much easier. We schedule a whole month of posts in an afternoon.”`,
      title: "Social Media Manager",
      company: "Retail brand",
    },
    {
      quote: "“The competitor tracking alone is worth it. We finally see what works for other brands in our niche and can react quickly.”",
      title: "Digital Marketing Lead",
      company: "",
      avatar: { tone: "#c99a7c", hair: "#1e1a18", bg: "#6e9b5a" },
    },
    {
      quote: `“My boss always tells me to ‘Work smarter, not harde’ ... that’s exactly what the ${brand.name} Social Tracker is and does - simply put, it’s AMAZING!”`,
      title: "Event Planning and Online Marketing",
      company: "Events agency",
    },
  ],
  [
    {
      quote: "“Scheduling posts to every network from one place saves me hours every week, and the analytics make reporting to clients painless.”",
      title: "Agency Owner",
      company: "Marketing agency",
      avatar: { tone: "#e0b494", hair: "#6b4a2e", bg: "#c9d7e6" },
    },
    {
      quote: "“Great for keeping an eye on engagement.”",
      title: "Community Manager",
      company: "SaaS company",
    },
    {
      quote: "“Tracking social media campaigns is very handy to determine what types of content shares are more effective and bring in the most interaction and traffic conversions.”",
      title: "Entrepreneur & Consultant",
      company: "Marketing consultancy",
      avatar: { tone: "#c79a7c", hair: "#3a2a1e", bg: "#5fae9e" },
    },
  ],
];

export const influencerFeatures = [
  {
    word: "Campaign management",
    title: "Plan, launch, and track influencer campaigns in one place: budgets, posts, clicks, and ROI.",
  },
  {
    word: "Competitor analysis",
    title: "See which influencers your competitors work with and how their campaigns perform.",
  },
];

export const mmFeatures = [
  {
    title: "Stay on top of your brand reputation",
    bullets: ["Track mentions of your brand across social networks, news, blogs, and forums", "See sentiment at a glance and spot issues early", "Get alerts when something needs your attention"],
  },
  {
    title: "Follow industry conversations",
    bullets: ["Monitor keywords, hashtags, and competitors", "Discover trending topics in your niche", "Find new audiences and partnership opportunities"],
  },
  {
    title: "Measure the impact of your campaigns",
    bullets: ["Track reach and engagement of every mention", "Compare periods to see how buzz changes over time", "Share reports with your team"],
  },
];
