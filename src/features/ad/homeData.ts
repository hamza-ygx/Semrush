export type Block = {
  tag: string;
  isNew?: boolean;
  title: string;
  bullets: string[];
  cta: string;
  tone: { band: string; tag: string };
  mock: "chat" | "research" | "keywords" | "creative" | "launch" | "optimize" | "report" | "integrations";
};

export const homeExamples = ["youtube.com", "amazon.com", "samsung.com", "nba.com"];

export const blocks: Block[] = [
  {
    tag: "AI AUTOMATIONS",
    isNew: true,
    title: "Meet your Ads AI Agent",
    bullets: ["Ask questions about your campaigns in plain language.", "Get instant reports and benchmarks for your accounts.", "Receive clear suggestions on what to optimize next."],
    cta: "Try Ads AI Agent",
    tone: { band: "#f2f4fd", tag: "#7d6fc9" },
    mock: "chat",
  },
  {
    tag: "RESEARCH",
    title: "See what works for your competitors",
    bullets: ["Discover the keywords and ads your competitors pay for.", "Estimate their ad budgets and traffic.", "Spot new opportunities for your own campaigns."],
    cta: "Get Started",
    tone: { band: "#f5f7e0", tag: "#7c7a1e" },
    mock: "research",
  },
  {
    tag: "PLAN",
    title: "Organize your PPC campaigns with ease",
    bullets: ["Organize keywords at the campaign and ad group level.", "Set up single-keyword ad groups and auto-generate negatives to block irrelevant traffic.", "Get better relevance and lower CPCs."],
    cta: "Get Started",
    tone: { band: "#f6f3fa", tag: "#a3389e" },
    mock: "keywords",
  },
  {
    tag: "CREATE WITH AI",
    title: "Fast and simple ad creation",
    bullets: ["Generate ad copy and visuals in seconds.", "Keep every creative on brand with your assets.", "Adapt ads for Google and Meta formats automatically."],
    cta: "Get Started",
    tone: { band: "#f2f4fd", tag: "#5b64a8" },
    mock: "creative",
  },
  {
    tag: "LAUNCH",
    title: "Launch Google and Meta campaigns in a few clicks",
    bullets: ["Publish campaigns to both platforms from one place.", "Use proven templates built on best practices.", "Set budgets and targeting without the guesswork."],
    cta: "Get Started",
    tone: { band: "#eef8f4", tag: "#1f7a5c" },
    mock: "launch",
  },
  {
    tag: "OPTIMIZE",
    title: "Improve performance around the clock",
    bullets: ["Get AI recommendations to lower your costs.", "Pause underperforming ads automatically.", "Reallocate budget to the campaigns that convert."],
    cta: "Get Started",
    tone: { band: "#fdf3ee", tag: "#b3541e" },
    mock: "optimize",
  },
  {
    tag: "REPORT",
    title: "Share results with automated reports",
    bullets: ["Combine Google and Meta data in one report.", "Schedule reports for clients and stakeholders.", "Track ROI trends over time."],
    cta: "Get Started",
    tone: { band: "#f6f3fa", tag: "#a3389e" },
    mock: "report",
  },
  {
    tag: "INTEGRATIONS",
    title: "Connect the tools you already use",
    bullets: ["Link Google Ads and Meta Ads accounts in minutes.", "Sync conversions from Google Analytics.", "Export keyword lists straight to your campaigns."],
    cta: "Get Started",
    tone: { band: "#f2f4fd", tag: "#5b64a8" },
    mock: "integrations",
  },
];
