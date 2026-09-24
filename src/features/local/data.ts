import { brand } from "@/config/brand";

const L = `${brand.name} Local`;

export type Example = { label: string; flag: "us" | "ca" | "uk" };

export const examples: Example[] = [
  { label: "Cafe in the US", flag: "us" },
  { label: "Plumbers in Canada", flag: "ca" },
  { label: "Health Center in the UK", flag: "uk" },
];

export const agentLog = [
  "Photo published",
  "Review replied",
  "Post published",
  "Business description optimized",
  "Post published",
  "Review replied",
  "Photo published",
];

export const listingRows = [
  { name: "OpenAI", status: "no" },
  { name: "Facebook", status: "ok" },
  { name: "Siri", status: "no" },
  { name: "Bing", status: "no" },
  { name: "Yelp", status: "no" },
  { name: "CitySearch", status: "no" },
] as const;

export const reviewCards = [
  { name: "Brad S.", stars: 4, text: "John was easy to work with, excellent quality and fair pricing.", reply: "We really appreciate your kind words, Brad!" },
  { name: "Mark J.", stars: 5, text: "They were very responsive and fixed our roof in a day.", reply: "Thank you for choosing us, Mark!" },
  { name: "Anna S.", stars: 3, text: "Quite expensive for the work that was done.", reply: "We are sorry to hear that, Anna. Let us make it right." },
];

export const audiences = ["Small businesses", "Franchises", "Multi-location brands", "Agencies"] as const;

export const testimonials: Record<(typeof audiences)[number], { quote: string; role: string; company: string; hue: string }[]> = {
  "Small businesses": [
    { quote: "I've never seen a local practice in the world with as much traffic as we have.", role: "Chief Executive Officer", company: "Smileworks", hue: "#f4c9a4" },
    { quote: "Our calls doubled within three months of fixing our listings.", role: "Owner", company: "Neighborhood bakery", hue: "#e7b98f" },
    { quote: "Replying to every review used to take hours. Now it takes minutes.", role: "Office Manager", company: "Family dental clinic", hue: "#d9a27b" },
    { quote: "We finally show up on the map for the searches that matter to us.", role: "Founder", company: "Local plumbing company", hue: "#f0cfae" },
    { quote: "Everything we need for local search is in a single dashboard.", role: "Marketing Lead", company: "Yoga studio", hue: "#c98f6a" },
    { quote: "The free scan showed us exactly which directories we were missing.", role: "Co-owner", company: "Coffee shop", hue: "#eac1a0" },
    { quote: "Setting up the AI agent took five minutes and it just keeps working.", role: "General Manager", company: "Auto repair shop", hue: "#d7a888" },
  ],
  Franchises: [
    { quote: "Keeping hundreds of franchise listings consistent is finally manageable.", role: "Head of Local Marketing", company: "Fitness franchise", hue: "#e3b48f" },
  ],
  "Multi-location brands": [
    { quote: "Bulk edits across all our locations save our team days every month.", role: "Digital Director", company: "Retail chain", hue: "#d9a27b" },
  ],
  Agencies: [
    { quote: "We onboard new local clients in minutes and show them results in weeks.", role: "Agency Founder", company: "Local SEO agency", hue: "#f0cfae" },
  ],
};

export const dashboardFaq = [
  { q: `What's included in the ${L} toolkit?`, a: `${L} includes Listing Management, Review Management, GBP Optimization, the GBP AI Agent and Map Rank Tracker.` },
  { q: `Can I purchase ${L} as a standalone product?`, a: `Yes. ${L} can be purchased on its own, without any other ${brand.name} subscription.` },
  { q: "In which countries does the tool work?", a: "Listing distribution is available in dozens of countries, and Map Rank Tracker works anywhere Google Maps is available." },
  { q: "Do you offer special pricing for businesses managing multiple locations?", a: "Yes, pricing scales with the number of locations. Contact our sales team for a custom quote." },
  { q: `Does ${brand.name} offer a solution for agencies?`, a: "Agencies can manage all client locations from one account and share white-label reports." },
  { q: `Does the ${L} suite integrate with other ${brand.name} solutions and apps?`, a: `Yes, ${L} data is available in other ${brand.name} toolkits and reports.` },
  { q: `Does ${L} support team collaboration functionality?`, a: "You can invite team members and share access to locations and reports." },
];

export const listingFaq = [
  { q: "What is listing management?", a: "Listing management keeps your business information consistent across directories, maps and voice assistants." },
  { q: "Which directories are supported?", a: "More than 150 directories worldwide, including Google, Apple, Bing, Facebook and many industry-specific sites." },
  { q: "How long does it take for my listings to update?", a: "Most directories update within a few days; some can take up to several weeks." },
  { q: "Can I manage multiple locations?", a: "Yes, you can manage as many locations as your subscription allows from a single dashboard." },
  { q: "How do I cancel my subscription?", a: "You can cancel at any time from the Subscription info page in your account settings." },
];

export const reviewFaq = [
  { q: "Why is review management important?", a: "Reviews influence both how customers choose a business and how search engines rank it." },
  { q: "What is a review management service?", a: "A service that helps you collect, monitor and reply to reviews across platforms from one place." },
  { q: "How much does reputation resolution cost?", a: "Review Management is included in the Local toolkit subscription at no extra cost per review." },
  { q: "How do I start using the Review Management tool?", a: "Connect your Google Business Profile and your reviews will be imported automatically." },
  { q: "How do I cancel my subscription?", a: "You can cancel at any time from the Subscription info page in your account settings." },
];

export const mapRankFaq = [
  { q: "What is Map Rank Tracker?", a: "A tool that shows where your business ranks on Google Maps across a grid of locations." },
  { q: "How are Google Maps rankings different from standard Google SERP positions?", a: "Maps rankings depend heavily on the searcher's location, so they vary block by block." },
  { q: "How is Map Rank Tracker different from Local Rank Checker and Position Tracking by ZIP Code?", a: "Map Rank Tracker checks Google Maps results on a grid, while Position Tracking checks regular search results." },
  { q: "Can I set up Map Rank Tracker for a service area business (SAB)?", a: "Yes, you can place the grid anywhere within your service area." },
  { q: "Can I view competitor data in Map Rank Tracker?", a: "Yes, you see your top competitors and a heatmap of their rankings." },
  { q: "How much does it cost?", a: "Map Rank Tracker is available as a monthly subscription based on the number of keywords and grid size." },
  { q: "How do I cancel my subscription?", a: "You can cancel at any time from the Subscription info page in your account settings." },
];

export const scanDirectories = [
  { name: "Facebook", crown: true, status: "No Phone Number", tone: "warn", details: "" },
  { name: "Bing", crown: true, status: "Not Present", tone: "bad", details: "650.8M" },
  { name: "Google Business Profile", crown: true, status: "Issues not found", tone: "ok", details: "Thump Coffee, 1201 E 13th Ave, 7204566648" },
  { name: "Yelp", crown: true, status: "Issues not found", tone: "ok", details: "Thump Coffee, 1201 E 13th Ave, 7204566648" },
  { name: "tellows", crown: false, status: "No Phone Number", tone: "warn", details: "" },
  { name: "8coupons", crown: false, status: "Not Present", tone: "bad", details: "55.7K" },
  { name: "Foursquare", crown: false, status: "Not Present", tone: "bad", details: "9.0M" },
  { name: "GoLocal247", crown: false, status: "Not Present", tone: "bad", details: "84.2K" },
  { name: "Hours.com", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Snapchat", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "TripAdvisor", crown: false, status: "Not Present", tone: "bad", details: "105.4M" },
  { name: "Yahoo!", crown: false, status: "Not Present", tone: "bad", details: "653.2K" },
  { name: "Apple Maps", crown: false, status: "Not Present", tone: "bad", details: "1.2B" },
  { name: "Waze", crown: false, status: "Not Present", tone: "bad", details: "88.1M" },
  { name: "HERE", crown: false, status: "Not Present", tone: "bad", details: "4.4M" },
  { name: "TomTom", crown: false, status: "Not Present", tone: "bad", details: "6.3M" },
  { name: "Alexa", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Brownbook.net", crown: false, status: "Not Present", tone: "bad", details: "310.5K" },
  { name: "Cylex", crown: false, status: "Not Present", tone: "bad", details: "1.9M" },
  { name: "Hotfrog", crown: false, status: "Not Present", tone: "bad", details: "402.1K" },
  { name: "Infobel", crown: false, status: "Not Present", tone: "bad", details: "1.1M" },
  { name: "Judy's Book", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "MapQuest", crown: false, status: "Not Present", tone: "bad", details: "18.7M" },
  { name: "Navmii", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Opendi", crown: false, status: "Not Present", tone: "bad", details: "560.4K" },
  { name: "Where To?", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Yellow Place", crown: false, status: "Not Present", tone: "bad", details: "120.3K" },
  { name: "YellowMoxie", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "ShowMeLocal", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "n49", crown: false, status: "Not Present", tone: "bad", details: "210.7K" },
  { name: "Tupalo", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "iGlobal", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Find-Open", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Cybo", crown: false, status: "Not Present", tone: "bad", details: "2.8M" },
  { name: "Lacartes", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Brownbook", crown: false, status: "Not Present", tone: "bad", details: "-" },
  { name: "Bizwiki", crown: false, status: "Not Present", tone: "bad", details: "-" },
] as const;

export const scanBusiness = {
  name: "Thump Coffee",
  address: "1201 E 13th Ave, Denver, CO, 80218, US,+1 720 456 6648, ZIP: 80218",
};

export const directoryGroups = [
  { title: "Top directories", items: ["Google", "Apple", "Instagram", "Facebook", "Foursquare", "Tripadvisor"] },
  { title: "Navigation services", items: ["Google Maps", "NDrive", "Waze"] },
  { title: "Voice search sources", items: ["Assistant", "Alexa", "Siri"] },
  { title: "Healthcare directories (US only)", items: ["RatingsMD", "DocSpot", "WebMD", "Vitals", "Wellness.com"] },
  { title: "Search engines", items: ["Bing", "Yahoo!"] },
];

export const mapRankExamples = [`${brand.name} Barcelona`, "Slate Cafe NoMade", "King Key Locksmith San Francisco"];
