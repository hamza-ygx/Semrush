"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { AdIcon, AiIcon, AiPrIcon, ContentIcon, LocalIcon, SeoIcon, SocialIcon, TrafficIcon } from "@/components/icons";
import { HelpButtonAndPanel } from "@/components/shell/HelpPanel";
import { MarketingHeader } from "./MarketingHeader";
import { MarketingFooter } from "./MarketingFooter";
import { AppCenterIcon, CrownIcon, EnterpriseIcon, ExternalArrow } from "./icons";
import { pricingRoutes, sidebarToolkits, type ToolkitSlug } from "./data";

const toolkitIcons: Record<string, (p: { width: number; height: number }) => ReactNode> = {
  seo: SeoIcon,
  ai: AiIcon,
  traffic: TrafficIcon,
  local: LocalIcon,
  content: ContentIcon,
  social: SocialIcon,
  advertising: AdIcon,
  pr: AiPrIcon,
};

function NavItem({ href, active, icon, children, external }: { href: string; active: boolean; icon: ReactNode; children: ReactNode; external?: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-12 items-center gap-[7px] rounded-full pr-3 pl-[9px] text-[14.5px] leading-[18px] ${
        active ? "bg-[#f1d6fd] font-semibold text-[#171a17]" : "text-[#575a58] hover:bg-[#f7ebfd] hover:text-[#171a17]"
      }`}
    >
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center ${active ? "text-[#171a17]" : "text-[#5c5f5d]"}`}>{icon}</span>
      <span className="py-[5px]">{children}</span>
      {external && <ExternalArrow className="-ml-[3px] text-[#575a58]" />}
    </Link>
  );
}

export function PricingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const current: ToolkitSlug | "enterprise" = pathname === pricingRoutes.enterprise ? "enterprise" : ((pathname.split("/")[2] as ToolkitSlug) ?? "one");
  const active = pathname === pricingRoutes.one ? "one" : current;

  return (
    <div className="relative min-h-screen bg-white text-[#1b1e1a]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1090px]"
        style={{ background: "linear-gradient(180deg, #dbedeb 0px, #dfeaf2 230px, #e9eafa 420px, #f1eefb 770px, #f7f5ff 880px, #ffffff 1090px)" }}
      />
      <MarketingHeader />
      <div className="relative flex gap-5 pt-[100px] pr-[25px] pl-6">
        <aside className="w-[218px] shrink-0">
          <nav className="sticky top-[102px] mt-[2px]" aria-label="Pricing">
            <NavItem href={pricingRoutes.one} active={active === "one"} icon={<CrownIcon width={22} height={22} />}>
              {brand.name} One{" "}
              <span className="ml-[3px] inline-block rounded-full bg-[linear-gradient(90deg,#8b5cf6,#4f8dfd)] px-[6px] text-[11.5px] leading-[16px] font-medium text-white">new</span>
            </NavItem>
            <div className="my-4 border-t border-black/[0.07]" />
            <div className="px-2 pt-[13px] pb-[13px] text-[19px] leading-[24px] font-medium text-[#6a6d6b]">Toolkits</div>
            {sidebarToolkits.map((t) => {
              const Icon = toolkitIcons[t.slug];
              return (
                <NavItem key={t.slug} href={pricingRoutes[t.slug]} active={active === t.slug} icon={<Icon width={22} height={22} />}>
                  {t.label}
                  {t.slug === "seo" && <span className="ml-[7px] inline-block rounded-[5px] bg-[#01aa80] px-[5px] text-[11.5px] leading-[16px] font-semibold text-white">Active</span>}
                </NavItem>
              );
            })}
            <div className="my-4 border-t border-black/[0.07]" />
            <NavItem href={pricingRoutes.enterprise} active={active === "enterprise"} icon={<EnterpriseIcon width={22} height={22} />}>
              Enterprise
            </NavItem>
            <NavItem href={routes.apps} active={false} icon={<AppCenterIcon width={22} height={22} />} external>
              App center
            </NavItem>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <MarketingFooter />
      <HelpButtonAndPanel variant="chat" />
    </div>
  );
}
