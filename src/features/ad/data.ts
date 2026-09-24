export const basePlan = {
  name: "Base",
  price: "$99",
  features: [
    "Unlimited ad spend",
    "AI-generated Google and Meta ad copy",
    "AI-generated keywords for Google campaigns",
    "Competitor keyword analysis and spend tracking",
    "Competitor Google Shopping ad positions monitoring",
    "Unlimited exports to Google Ads",
    "Two monthly custom reports with Google and Meta ad insights",
  ],
};

export const proPlan = {
  name: "Pro",
  price: "$220",
  features: [
    "View all your competitors’ ads",
    "Exclusive insights on Display, Video, or Social ads",
    "Three months of historical advertising data",
    "Up to 100 views of competitor landing pages",
    "Export 5 competitor ad intelligence reports per month",
  ],
};

export type ResearchFeature = { title: string; bullets: string[]; art: "paid" | "keywords" | "history" | "pla" | "ecommerce" };

export const researchConfig = {
  research: {
    title: "Advertising Research",
    lines: ["Take an inside look at your competitors' ad strategies.", "Spot their strengths and weaknesses to improve your own campaign."],
    examples: ["ebay.com", "shopzilla.com", "amazon.com"],
    features: [
      {
        title: "Uncover competitors' ad strategies and budgets",
        bullets: [
          "Monitor your rivals' PPC activities, their ad spends and most profitable ad copy",
          "Analyze your competitors' Google Ads usage trends",
          "View examples of their live ads",
          "Discover desktop and mobile keywords your competitors are bidding on",
        ],
        art: "paid",
      },
      {
        title: "Analyze competitors' keywords and ad copies",
        bullets: ["See which keywords bring your competitors paid traffic", "Track position changes for every keyword they bid on", "Compare ad texts to find the messages that convert"],
        art: "keywords",
      },
      {
        title: "Explore the history of their ad campaigns",
        bullets: ["Review how competitors' ads and landing pages changed over time", "Spot seasonal campaigns before they launch again", "Learn from years of historical ad data"],
        art: "history",
      },
    ] as ResearchFeature[],
  },
  pla: {
    title: "PLA Research",
    lines: ["Does Google Shopping optimization seem like a puzzling riddle?", "Upgrade your campaigns using {brand} PLA data."],
    examples: ["ebay.com", "bestbuy.com", "amazon.com"],
    features: [
      {
        title: "Research competitors' PLAs",
        bullets: [
          "Discover product listing ads that showed up for every keyword",
          "See the position a domain's Google Shopping ad received in paid search",
          "View the number of search queries that trigger rivals' PLAs to appear",
        ],
        art: "pla",
      },
      {
        title: "Get insights for your e-commerce campaigns",
        bullets: ["Find the products your competitors promote the most", "Compare prices and product titles across shopping ads", "Uncover new keywords to target with your own PLAs"],
        art: "ecommerce",
      },
    ] as ResearchFeature[],
  },
};

export const databases = [
  { code: "SE", name: "Sweden" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
];
