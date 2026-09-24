"use client";

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
} from "../icons";
import { ChevronsLeft, ChevronsRight } from "../ui/icons";

export type Section = "home" | "seo" | "ai" | "traffic" | "local" | "content" | "ad" | "aipr" | "social" | "reports" | "apps";

const items: { key: Section; label: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "home", label: "Home", href: "/", icon: LogoIcon },
  { key: "seo", label: "SEO", href: "/seo", icon: SeoIcon },
  { key: "ai", label: "AI", href: "/ai", icon: AiIcon },
  { key: "traffic", label: "Traffic & Market", href: "/traffic-market", icon: TrafficIcon },
  { key: "local", label: "Local", href: "/local", icon: LocalIcon },
  { key: "content", label: "Content", href: "/content", icon: ContentIcon },
  { key: "ad", label: "Ad", href: "/ad", icon: AdIcon },
  { key: "aipr", label: "AI PR", href: "/ai-pr", icon: AiPrIcon },
  { key: "social", label: "Social", href: "/social", icon: SocialIcon },
  { key: "reports", label: "Reports", href: "/reports", icon: ReportsIcon },
  { key: "apps", label: "Apps", href: "/apps", icon: AppsIcon },
];

export function Rail({
  active,
  collapsed,
  onToggle,
}: {
  active: Section;
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside className="flex h-full w-[76px] shrink-0 flex-col border-r border-rk-border bg-rk-bg">
      <nav className="flex flex-1 flex-col gap-[5px] overflow-y-auto px-[6px] pt-2 no-scrollbar">
        {items.map(({ key, label, href, icon: Icon }) => {
          const on = key === active;
          return (
            <Link
              key={key}
              href={href}
              className={`flex w-16 flex-col items-center rounded-lg px-1 pt-[9px] pb-[11px] text-center text-[12px] leading-4 ${
                on ? "bg-rk-hover font-medium text-rk-text" : "text-rk-muted hover:bg-rk-hover"
              }`}
            >
              {key === "home" ? <Icon width={22} height={18} /> : <Icon width={20} height={20} className={on ? "text-rk-text" : "text-rk-muted"} />}
              <span className={key === "home" ? "mt-[2px]" : ""}>{label}</span>
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        className="flex h-[43px] shrink-0 items-center justify-center border-t border-rk-border text-rk-text-2 hover:bg-rk-hover"
      >
        {collapsed ? <ChevronsRight width={18} height={18} /> : <ChevronsLeft width={18} height={18} />}
      </button>
    </aside>
  );
}
