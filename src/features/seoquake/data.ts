export type FeatureKey = "toolbar" | "serp" | "audit" | "density" | "links" | "compare" | "export";

export type Feature = { key: FeatureKey; title: string; text: string; bg: string; wide?: boolean };

export const features: Feature[] = [
  {
    key: "toolbar",
    title: "SEO toolbar",
    text: "See index size, rank, backlinks, and referring domains for any page right at the top of your browser—no tab switching.",
    bg: "#e8efff",
    wide: true,
  },
  {
    key: "serp",
    title: "SERP overlay",
    text: "Get key metrics under every organic result on Google, Bing, and Yahoo, and sort results by any parameter.",
    bg: "#fff1e6",
  },
  {
    key: "audit",
    title: "On-page SEO audit",
    text: "Check titles, meta descriptions, headings, images, and mobile compatibility in one click.",
    bg: "#e3f8f0",
  },
  {
    key: "density",
    title: "Keyword density",
    text: "Find the words and phrases a page uses most, with counts and density for 1–4 word combinations.",
    bg: "#f1ebff",
  },
  {
    key: "links",
    title: "Internal and external links",
    text: "List every link on a page, see which are nofollow, and spot where link equity is going.",
    bg: "#fff7d9",
  },
  {
    key: "compare",
    title: "Compare URLs and domains",
    text: "Put several URLs or domains side by side and compare their SEO metrics in one table.",
    bg: "#e4f6fb",
  },
  {
    key: "export",
    title: "Export to CSV",
    text: "Download SERP analysis, keyword density, links, and comparison results to share or work with in a spreadsheet.",
    bg: "#ffe9ec",
    wide: true,
  },
];

export type StepKey = "install" | "browse" | "analyze";

export const steps: { key: StepKey; title: string; text: string }[] = [
  {
    key: "install",
    title: "Install the extension",
    text: "Add SEOquake to Chrome, Firefox, Edge, or Opera from the official store. It takes a few seconds.",
  },
  {
    key: "browse",
    title: "Search or open any page",
    text: "The SERP overlay and SEO toolbar appear automatically. Pick which metrics to show in the settings.",
  },
  {
    key: "analyze",
    title: "Dig into the details",
    text: "Click the SEOquake icon to run a page audit, check keyword density, review links, or export the data.",
  },
];

export type BrowserKey = "chrome" | "firefox" | "edge" | "opera";

export const browsers: { key: BrowserKey; name: string; store: string; href: string }[] = [
  { key: "chrome", name: "Chrome", store: "Chrome Web Store", href: "https://chromewebstore.google.com/detail/seoquake/akdgnmcogleenhbclghghlkkdndkjdjc" },
  { key: "firefox", name: "Firefox", store: "Firefox Add-ons", href: "https://addons.mozilla.org/en-US/firefox/addon/seoquake-seo-extension/" },
  { key: "edge", name: "Edge", store: "Microsoft Edge Add-ons", href: "https://microsoftedge.microsoft.com/addons/search/seoquake" },
  { key: "opera", name: "Opera", store: "Opera add-ons", href: "https://addons.opera.com/en/extensions/details/seoquake-extension/" },
];

export const faq = (name: string) => [
  {
    q: "What is SEOquake?",
    a: "SEOquake is a free browser extension that shows key SEO metrics for any page or search result. It includes an SEO toolbar, a SERP overlay, an on-page SEO audit, keyword density, link analysis, and URL and domain comparison.",
  },
  {
    q: "Is SEOquake free?",
    a: "Yes. SEOquake is free to install and use. Some advanced metrics link to full reports that are part of a paid plan.",
  },
  {
    q: "Which browsers does SEOquake support?",
    a: "SEOquake is available for Google Chrome, Mozilla Firefox, Microsoft Edge, and Opera. Install it from each browser’s official extension store.",
  },
  {
    q: `How is SEOquake related to ${name}?`,
    a: `SEOquake is built by the ${name} team. Many toolbar and SERP overlay metrics come from ${name} data, and you can open the full report for any metric with one click.`,
  },
  {
    q: `Do I need a ${name} account to use SEOquake?`,
    a: `No. You can use the toolbar, SERP overlay, page audit, and keyword density without an account. Sign in to ${name} to see extended data for some parameters.`,
  },
  {
    q: "Can I choose which metrics SEOquake shows?",
    a: "Yes. Open the extension settings to turn the SEO toolbar or SERP overlay on or off for each search engine, pick the parameters to display, and switch to manual mode so data only loads when you request it.",
  },
  {
    q: "Can I export SEOquake data?",
    a: "Yes. You can export SERP analysis, keyword density, internal and external links, and URL or domain comparisons to a CSV file.",
  },
];
