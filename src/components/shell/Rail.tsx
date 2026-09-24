"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBadge, navHeading } from "./navExtras";
import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
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
import { ChevronsLeft, ChevronsRight, ExternalIcon } from "../ui/icons";
import { routes, sectionNavs } from "@/config/routes";
import { isActive } from "./SectionNav";

export type Section =
  | "home"
  | "seo"
  | "ai"
  | "traffic"
  | "local"
  | "content"
  | "ad"
  | "aipr"
  | "social"
  | "reports"
  | "apps";

export const railItems: {
  key: Section;
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { key: "home", label: "Home", href: routes.home, icon: LogoIcon },
  { key: "seo", label: "SEO", href: routes.seoDashboard, icon: SeoIcon },
  { key: "ai", label: "AI", href: routes.ai.overview, icon: AiIcon },
  {
    key: "traffic",
    label: "Traffic & Market",
    href: routes.traffic.home,
    icon: TrafficIcon,
  },
  { key: "local", label: "Local", href: routes.local.start, icon: LocalIcon },
  {
    key: "content",
    label: "Content",
    href: routes.content.dashboard,
    icon: ContentIcon,
  },
  { key: "ad", label: "Ad", href: routes.ad.home, icon: AdIcon },
  { key: "aipr", label: "AI PR", href: routes.aipr.dashboard, icon: AiPrIcon },
  {
    key: "social",
    label: "Social",
    href: routes.social.dashboard,
    icon: SocialIcon,
  },
  {
    key: "reports",
    label: "Reports",
    href: routes.reports.myReports,
    icon: ReportsIcon,
  },
  { key: "apps", label: "Apps", href: routes.apps, icon: AppsIcon },
];

const FLY_TOP = 54;
const FLY_BOTTOM = 3;

function RailFlyout({
  section,
  anchor,
  onClose,
}: {
  section: string;
  anchor: number;
  onClose: () => void;
}) {
  const path = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(anchor);
  const nav = sectionNavs[section];
  useLayoutEffect(() => {
    const h = ref.current?.offsetHeight ?? 0;
    setTop(
      Math.max(FLY_TOP, Math.min(anchor, window.innerHeight - FLY_BOTTOM - h)),
    );
  }, [anchor, section]);
  if (!nav) return null;
  return (
    <div
      ref={ref}
      data-testid="rail-flyout"
      style={{ top, maxHeight: `calc(100vh - ${FLY_TOP + FLY_BOTTOM}px)` }}
      className="fixed left-[74px] z-[70] w-[256px] overflow-y-auto rounded-lg bg-white pt-[17px] pb-[10px] shadow-[0_2px_16px_rgba(25,27,35,0.18)]"
    >
      <div className="px-[17px] text-[14px] leading-5 font-semibold text-rk-text">
        {nav.title}
      </div>
      {nav.groups.map((g, gi) => (
        <div
          key={gi}
          className={
            g.heading ? (gi === 0 ? "mt-[15px]" : "mt-5") : gi > 0 ? "mt-[12px]" : "mt-2"
          }
        >
          {g.heading && (
            <div className="mb-2 px-[17px] text-[12px] leading-4 text-rk-muted">
              {navHeading(g.heading)}
            </div>
          )}
          {g.items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={onClose}
              className={`mx-[5px] flex h-7 items-center justify-between rounded-md px-3 text-[14px] leading-5 text-rk-text ${isActive(it, path) ? "bg-rk-hover" : "hover:bg-rk-hover"}`}
            >
              <span className="flex min-w-0 items-center">
                <span className="truncate">{it.label}</span>
                <NavBadge href={it.href} />
              </span>
              {it.external && (
                <ExternalIcon className="shrink-0 text-rk-muted" />
              )}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Rail({
  active,
  collapsed,
  onToggle,
}: {
  active: Section;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const [fly, setFly] = useState<{ key: Section; top: number } | null>(null);
  return (
    <aside className="flex h-full w-[76px] shrink-0 flex-col border-r border-rk-border bg-rk-bg">
      <nav className="flex flex-1 flex-col gap-[calc(61*var(--u)_-_56px)] overflow-y-auto px-[6px] pt-[calc(8*var(--u))] no-scrollbar">
        {railItems.map(({ key, label, href, icon: Icon }) => {
          const on = key === active;
          const flyable = !!sectionNavs[key] && (collapsed || !on);
          return (
            <div
              key={key}
              onMouseEnter={(e) =>
                flyable &&
                setFly({
                  key,
                  top: e.currentTarget.getBoundingClientRect().top - 14,
                })
              }
              onMouseLeave={() => setFly(null)}
            >
              <Link
                href={href}
                data-testid={`rail-${key}`}
                onClick={() => setFly(null)}
                className={`flex w-16 flex-col items-center rounded-lg px-1 pt-[9px] text-center text-[12px] leading-4 [@media(min-height:800px)]:pt-[10px] [@media(min-height:800px)]:pb-[8.4px] ${
                  key === "seo" ? "pb-[11px]" : "pb-[9px]"
                } ${
                  key === "reports"
                    ? "mt-[3px] [@media(min-height:800px)]:mt-[1px]"
                    : ""
                } ${on ? "bg-rk-hover font-medium text-rk-text" : "text-rk-muted hover:bg-rk-hover"}`}
              >
                {key === "home" ? (
                  <Icon
                    width={22}
                    height={18}
                    className="[@media(min-height:800px)]:h-[22px] [@media(min-height:800px)]:w-[27px]"
                  />
                ) : (
                  <Icon
                    width={20}
                    height={20}
                    className={`[@media(min-height:800px)]:h-6 [@media(min-height:800px)]:w-6 ${on ? "text-rk-text" : "text-rk-muted"}`}
                  />
                )}
                <span
                  className={
                    key === "home"
                      ? "mt-[2px] [@media(min-height:800px)]:mt-1"
                      : "mt-[2px] [@media(min-height:800px)]:mt-[5px]"
                  }
                >
                  {label}
                </span>
              </Link>
              {fly?.key === key && (
                <RailFlyout
                  section={key}
                  anchor={fly.top}
                  onClose={() => setFly(null)}
                />
              )}
            </div>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        className="flex h-[43px] shrink-0 items-center justify-center border-t border-rk-border text-rk-text-2 hover:text-rk-text"
      >
        {collapsed ? (
          <ChevronsRight width={18} height={18} />
        ) : (
          <ChevronsLeft width={18} height={18} />
        )}
      </button>
    </aside>
  );
}
