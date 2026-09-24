import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  AdIcon,
  AiIcon,
  AiPrIcon,
  AppsIcon,
  ContentIcon,
  LocalIcon,
  LogoIcon,
  ReportsIcon,
  SeoIcon,
  SocialIcon,
  TrafficIcon,
} from "./icons";

type Item = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
};

const items: Item[] = [
  { label: "Home", href: "/", icon: LogoIcon, active: true },
  { label: "SEO", href: "/seo", icon: SeoIcon },
  { label: "AI", href: "/ai", icon: AiIcon },
  { label: "Traffic & Market", href: "/traffic-market", icon: TrafficIcon },
  { label: "Local", href: "/local", icon: LocalIcon },
  { label: "Content", href: "/content", icon: ContentIcon },
  { label: "Ad", href: "/ad", icon: AdIcon },
  { label: "AI PR", href: "/ai-pr", icon: AiPrIcon },
  { label: "Social", href: "/social", icon: SocialIcon },
  { label: "Reports", href: "/reports", icon: ReportsIcon },
  { label: "Apps", href: "/apps", icon: AppsIcon },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[73px] shrink-0 flex-col items-start gap-[4.5px] border-r border-[#e0e1e9] bg-[#f3f5f5] pt-[6px] pl-[3px]">
      {items.map(({ label, href, icon: Icon, active }) => (
        <Link
          key={label}
          href={href}
          className={`flex w-[63px] flex-col items-center rounded-lg px-1 pt-2 pb-3 text-center text-[12px] leading-4 text-[#191b23] transition-colors ${
            active ? "bg-[#e6e7ec]" : "hover:bg-[#e6e7ec]"
          }`}
        >
          <Icon className={active ? "text-[#191b23]" : "text-[#2b2e38]"} />
          <span className="mt-1">{label}</span>
        </Link>
      ))}
    </aside>
  );
}
