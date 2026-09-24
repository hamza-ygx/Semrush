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
import { routes } from "@/config/routes";

export type Section = "home" | "seo" | "ai" | "traffic" | "local" | "content" | "ad" | "aipr" | "social" | "reports" | "apps";

export const railItems: { key: Section; label: string; href: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "home", label: "Home", href: routes.home, icon: LogoIcon },
  { key: "seo", label: "SEO", href: routes.seoDashboard, icon: SeoIcon },
  { key: "ai", label: "AI", href: routes.ai.overview, icon: AiIcon },
  { key: "traffic", label: "Traffic & Market", href: routes.traffic.home, icon: TrafficIcon },
  { key: "local", label: "Local", href: routes.local.start, icon: LocalIcon },
  { key: "content", label: "Content", href: routes.content.dashboard, icon: ContentIcon },
  { key: "ad", label: "Ad", href: routes.ad.home, icon: AdIcon },
  { key: "aipr", label: "AI PR", href: routes.aipr.dashboard, icon: AiPrIcon },
  { key: "social", label: "Social", href: routes.social.dashboard, icon: SocialIcon },
  { key: "reports", label: "Reports", href: routes.reports.myReports, icon: ReportsIcon },
  { key: "apps", label: "Apps", href: routes.apps, icon: AppsIcon },
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
      <nav className="flex flex-1 flex-col gap-[calc(61*var(--u)_-_56px)] overflow-y-auto px-[6px] pt-[calc(8*var(--u))] no-scrollbar">
        {railItems.map(({ key, label, href, icon: Icon }) => {
          const on = key === active;
          return (
            <Link
              key={key}
              href={href}
              className={`flex w-16 flex-col items-center rounded-lg px-1 pt-[9px] text-center text-[12px] leading-4 [@media(min-height:800px)]:pt-[10px] [@media(min-height:800px)]:pb-[8.4px] ${
                key === "seo" ? "pb-[11px]" : "pb-[9px]"} ${key === "reports" ? "mt-[3px] [@media(min-height:800px)]:mt-[1px]" : ""
              } ${on ? "bg-rk-hover font-medium text-rk-text" : "text-rk-muted hover:bg-rk-hover"}`}
            >
              {key === "home" ? (
                <Icon width={22} height={18} className="[@media(min-height:800px)]:h-[22px] [@media(min-height:800px)]:w-[27px]" />
              ) : (
                <Icon width={20} height={20} className={`[@media(min-height:800px)]:h-6 [@media(min-height:800px)]:w-6 ${on ? "text-rk-text" : "text-rk-muted"}`} />
              )}
              <span className={key === "home" ? "mt-[2px] [@media(min-height:800px)]:mt-1" : "mt-[2px] [@media(min-height:800px)]:mt-[5px]"}>{label}</span>
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        className="flex h-[43px] shrink-0 items-center justify-center border-t border-rk-border text-rk-text-2 hover:text-rk-text"
      >
        {collapsed ? <ChevronsRight width={18} height={18} /> : <ChevronsLeft width={18} height={18} />}
      </button>
    </aside>
  );
}
