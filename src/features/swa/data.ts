export const features = [
  { key: "seo", title: ["Make your copy more", "SEO-friendly"], width: 223 },
  { key: "readability", title: ["Improve readability and", "engagement"], width: 226 },
  { key: "tone", title: ["Maintain a consistent", "tone of voice"], width: 215 },
  { key: "plagiarism", title: ["Check your copy for", "plagiarism"], width: 195 },
] as const;

export type FeatureKey = (typeof features)[number]["key"];

export const captions: Record<FeatureKey, string[]> = {
  seo: ["Get quick tips on which related keywords to include and how to optimize your", "images, tags, and links."],
  readability: ["Check the readability score of your text against top-ranking pages and", "rewrite hard-to-read sentences in one click."],
  tone: ["Keep your brand voice consistent across every piece of content, from casual", "to formal."],
  plagiarism: ["Make sure your text is original: find copied passages and see the sources", "they come from."],
};

export const bullets = [
  "Leverage real-time data and insights based on the top-ranking rivals for your keywords.",
  "Use add-ons to optimize your text in Google Docs, WordPress, or MS Word 365.",
  "Automate your editing process: get immediate detailed tips on how to improve each content piece.",
];

export const testimonials = [
  {
    quote:
      "“This is an amazing tool that can be used by both writers and SEOs to optimize content based on their target SERPs. Instead of having guidelines which are then impossible to verify, you have the data right at your fingertips when and where you need it the most. It’s a great addition to any blogger’s or SEO’s toolkit.”",
    name: "Agency founder",
    role: "Chief Executive Officer at an SEO agency",
  },
  {
    quote: "“We brief every writer with the recommendations and review drafts against the score before publishing. It keeps the whole team aligned on what good looks like.”",
    name: "Content lead",
    role: "Digital marketing agency",
  },
  {
    quote: "“The readability and tone of voice checks save us a full editing round on every article.”",
    name: "Managing editor",
    role: "Online publication",
  },
  {
    quote: "“Having originality checks next to SEO tips means one tool instead of three for our content workflow.”",
    name: "SEO manager",
    role: "E-commerce brand",
  },
  {
    quote: "“Our freelancers use the Google Docs add-on, so optimization happens while they write rather than after.”",
    name: "Head of content",
    role: "SaaS company",
  },
];

export const addOns = ["Google Docs Add-On", "WordPress Add-On", "MS Word Add-On"] as const;
