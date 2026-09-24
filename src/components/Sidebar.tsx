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
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
};

const items: Item[] = [
  { label: "Home", icon: LogoIcon, active: true },
  { label: "SEO", icon: SeoIcon },
  { label: "AI", icon: AiIcon },
  { label: "Traffic & Market", icon: TrafficIcon },
  { label: "Local", icon: LocalIcon },
  { label: "Content", icon: ContentIcon },
  { label: "Ad", icon: AdIcon },
  { label: "AI PR", icon: AiPrIcon },
  { label: "Social", icon: SocialIcon },
  { label: "Reports", icon: ReportsIcon },
  { label: "Apps", icon: AppsIcon },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[73px] shrink-0 flex-col items-start gap-[4.5px] border-r border-[#e0e1e9] bg-[#f4f5f9] pt-[6px] pl-[3px]">
      {items.map(({ label, icon: Icon, active }) => (
        <a
          key={label}
          href="#"
          className={`flex w-[63px] flex-col items-center rounded-lg px-1 pt-2 pb-3 text-center text-[12px] leading-4 text-[#191b23] transition-colors ${
            active ? "bg-[#e6e7ec]" : "hover:bg-[#e6e7ec]"
          }`}
        >
          <Icon className={active ? "text-[#191b23]" : "text-[#2b2e38]"} />
          <span className="mt-1">{label}</span>
        </a>
      ))}
    </aside>
  );
}
