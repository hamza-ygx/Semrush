import { routes } from "@/config/routes";

export type FeatureArtKind = "generate" | "optimize" | "repurpose" | "topics" | "brief";

export type Feature = { title: string; bullets: string[]; cta: string; href: string; art: FeatureArtKind };

export const features: Feature[] = [
  {
    title: "Generate SEO-optimized articles in minutes",
    bullets: ["Create full drafts based on real search data and your brand voice", "Add AI-generated images and visuals in one click", "Publish straight to WordPress or Google Docs"],
    cta: "Go to AI Article Generator",
    href: routes.content.articleGenerator,
    art: "generate",
  },
  {
    title: "Optimize your drafts for Google and AI search visibility",
    bullets: [
      "Uncover issues that prevent your content from ranking in search results",
      "Get clear, guided fixes based on how Google and LLMs like ChatGPT surface content",
      "Improve tone, flow, and SEO with data and AI trained on your content",
    ],
    cta: "Go to AI Search Optimizer",
    href: routes.content.optimizer,
    art: "optimize",
  },
  {
    title: "Repurpose content for every platform",
    bullets: ["Turn website content into ready-to-publish emails and social media content", "Adjust the copy, add visuals or generate images with AI—all in one place", "Publish directly via WordPress, Mailchimp, and more"],
    cta: "Go to Content Repurposing",
    href: routes.content.repurpose,
    art: "repurpose",
  },
  {
    title: "Find topics your audience is searching for",
    bullets: ["Discover high-impact topics based on your niche and competitors", "See why each topic works with keyword, volume, and difficulty data", "Turn any idea into an article or brief in one click"],
    cta: "Go to Topic Finder",
    href: routes.content.topicFinder,
    art: "topics",
  },
  {
    title: "Create SEO briefs that help you rank",
    bullets: ["Build briefs from real SERP and competitor data", "Share them with writers or send to Google Docs", "Keep every article aligned with your SEO goals"],
    cta: "Go to SEO Brief Generator",
    href: routes.content.seoBrief,
    art: "brief",
  },
];

export const tiles = [
  { title: "Real-time SEO recommendations", bg: "#d3fef6" },
  { title: "Custom brand voice settings", bg: "#ffeff3" },
  { title: "One-click publishing to WordPress", bg: "#f2f5fd" },
  { title: "AI image\ngeneration", bg: "#d3fef6" },
  { title: "Canva integration", bg: "#ffeff3" },
  { title: "Connected to AI\nVisibility and SEO toolkits", bg: "#f2f5fd" },
];

export const testimonials = [
  {
    quote: "“It has really simplified keyword research, generating content ideas and, most importantly, creating SEO-friendly content briefs for the team we have hired.”",
    role: "Founder",
    company: "Contensify",
    hue: "#c9a98f",
  },
  {
    quote: "“AI Search Optimization was the moment it all clicked. This is where the industry is heading, and I want my brand to be the one people find in ChatGPT.”",
    role: "Head of Digital Marketing",
    company: "Aescape",
    hue: "#d9b99b",
  },
  {
    quote: "“We publish twice as many articles as before, and every draft already follows our brand voice. Editing time dropped dramatically.”",
    role: "Content Lead",
    company: "B2B SaaS company",
    hue: "#b9a1d9",
  },
  {
    quote: "“Repurposing one article into emails and social posts used to take a day. Now it takes minutes.”",
    role: "Marketing Manager",
    company: "E-commerce brand",
    hue: "#a1c9d9",
  },
];

export const faq = (brandName: string) => [
  { q: "Can AI content rank on Google?", a: "Yes. Google rewards helpful, high-quality content regardless of how it is produced. The toolkit grounds every draft in real search data so it meets search intent." },
  { q: `Is it safe to use the ${brandName} Content Toolkit for SEO?`, a: "Yes. The toolkit follows search engine guidelines and helps you create original content that is reviewed and edited by you before publishing." },
  { q: "How does AI Search optimization works?", a: "It analyzes how AI assistants and search engines surface content and suggests changes that make your pages easier to cite and quote." },
  { q: `How much does the ${brandName} Content Toolkit cost?`, a: "The Content Toolkit costs $60/month after a 7-day free trial." },
  { q: "How do you create content with the Content Toolkit?", a: "Choose a topic, generate a brief or draft, optimize it with real-time recommendations, and publish or repurpose it in a few clicks." },
  { q: "Can the Content Toolkit create content in different languages?", a: "Yes. You can generate and optimize content in many languages and for different markets." },
  { q: "Can you create content optimized for a specific location?", a: "Yes. Pick the target country and the recommendations adapt to local search results." },
];

export type ToolKey = "generator" | "optimizer" | "topics" | "brief";

export const tools: Record<ToolKey, { title: string; subtitle: string; featureIdx: number[] }> = {
  generator: { title: "Create search-friendly content in minutes", subtitle: "Generate copy with real SEO and AI search visibility data, your brand voice, and zero fluff.", featureIdx: [0, 2, 1] },
  optimizer: { title: "Optimize your content for modern search", subtitle: "Help your articles rank high in both traditional and AI search engines.", featureIdx: [1, 0, 2] },
  topics: { title: "Find high-impact content ideas", subtitle: "Discover relevant topics that drive engagement and traffic—fast.", featureIdx: [3, 4, 0] },
  brief: { title: "Create SEO briefs that help you rank", subtitle: "Generate content briefs with real SERP data—ready to hand off or use yourself.", featureIdx: [4, 3, 0] },
};
