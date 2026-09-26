import { routes, sectionNavs, type NavGroup } from "@/config/routes";

const headingOverrides: Record<string, string> = { "Geo Distribution": "Regional Trends" };
const betaItems = new Set<string>([routes.traffic.pageGroups]);

const appHref = (name: string) => `${routes.appsSearch}?q=${encodeURIComponent(name)}`;
const serpGapHref = appHref("SERP Gap Analyzer");
const forYouItems = new Set<string>([serpGapHref]);

const reportsNav: NavGroup[] = [
  { items: [{ label: "My Reports", href: routes.reports.myReports }] },
  {
    heading: "Top Templates",
    items: [
      { label: "Google Analytics 4", href: `${routes.reports.constructor}?template=ga4` },
      { label: "Google Search Console", href: `${routes.reports.constructor}?template=gsc` },
      { label: "Monthly SEO", href: `${routes.reports.constructor}?template=monthly-seo` },
    ],
  },
  {
    items: [
      { label: "Create report", href: routes.reports.constructor },
      { label: "Templates", href: `${routes.reports.constructor}?view=templates` },
      { label: "Themes", href: `${routes.reports.constructor}?view=themes` },
      { label: "About My Reports Suite", href: routes.reports.suite },
    ],
  },
];

const appsNav: NavGroup[] = [
  {
    items: [
      { label: "Store", href: routes.apps },
      { label: "My Apps", href: routes.appsMyApps },
    ],
  },
  {
    heading: "Try for free",
    items: [
      { label: "SERP Gap Analyzer", href: serpGapHref },
      { label: "AdClarity - Advertising Intelligence", href: routes.ad.adclarity },
      { label: "CallRail", href: appHref("CallRail") },
      { label: "Influencer Analytics", href: routes.social.influencer },
      { label: "Exploding Topics", href: appHref("Exploding Topics") },
      { label: "AdCreative.ai", href: appHref("AdCreative.ai") },
    ],
  },
];

export const drawerNavs: Partial<Record<string, { title: string; groups: NavGroup[] }>> = {
  ...sectionNavs,
  reports: { title: "Reports", groups: reportsNav },
  apps: { title: "App Center", groups: appsNav },
};

export function navHeading(h: string) {
  return headingOverrides[h] ?? h;
}

export function NavBadge({ href, className = "" }: { href: string; className?: string }) {
  if (forYouItems.has(href))
    return <span className={`ml-1 inline-flex h-[14px] shrink-0 items-center rounded-[6px] bg-[#9f66f5] px-1 text-[10px] leading-[14px] font-medium text-white ${className}`}>for you</span>;
  if (!betaItems.has(href)) return null;
  return <span className={`ml-[6px] inline-flex h-[14px] shrink-0 items-center rounded-full bg-[#dc620c] px-[5px] text-[11px] leading-none font-semibold text-white ${className}`}>beta</span>;
}
