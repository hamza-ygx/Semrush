import { routes } from "@/config/routes";

const headingOverrides: Record<string, string> = { "Geo Distribution": "Regional Trends" };
const betaItems = new Set<string>([routes.traffic.pageGroups]);

export function navHeading(h: string) {
  return headingOverrides[h] ?? h;
}

export function NavBadge({ href, className = "" }: { href: string; className?: string }) {
  if (!betaItems.has(href)) return null;
  return <span className={`ml-[6px] inline-flex h-[14px] shrink-0 items-center rounded-full bg-[#dc620c] px-[5px] text-[11px] leading-none font-semibold text-white ${className}`}>beta</span>;
}
