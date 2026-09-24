"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { GoToTool } from "@/components/shell/HeaderSearch";
import { MoreMenu, ProfileMenu } from "@/components/shell/HeaderMenus";
import { InviteUsersModal } from "@/components/shell/InviteUsersModal";
import { CenteredFooter } from "@/features/gaps/common";
import { ArrowLeft, ChevronRight, PlusIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { sideItems, type SideKey } from "./data";

function Sidebar({ active }: { active: SideKey }) {
  const [beta, setBeta] = useState(false);
  const item = "flex h-[28px] items-center rounded-md px-3 text-[14px] leading-5 text-rk-text";
  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 border-r border-[#e3e5e5] px-[6px] pt-3 xl:block">
      <Link
        href={routes.home}
        className="ml-3 inline-flex h-[28px] items-center gap-[6px] rounded-md border border-[#d9dbdb] bg-[#e6e8e9] px-[7px] text-[14px] text-rk-text-2 hover:bg-[#dcdee0]"
      >
        <ArrowLeft width={16} height={16} />
        Back to main page
      </Link>
      <div className="mt-[20px] mb-[7px] px-3 text-[14px] leading-5 font-semibold">My profile</div>
      <nav className="flex flex-col">
        {sideItems.map((it) =>
          it.href ? (
            <Link key={it.key} href={it.href} className={`${item} ${it.key === active ? "bg-[#d1d3d6]" : "hover:bg-rk-hover"}`}>
              {it.label}
            </Link>
          ) : (
            <button key={it.key} type="button" className={`${item} text-left hover:bg-rk-hover`}>
              {it.label}
            </button>
          ),
        )}
        <button type="button" onClick={() => setBeta((b) => !b)} className={`${item} mt-3 text-left hover:bg-rk-hover`}>
          {beta ? "Thanks for joining!" : "Join our Beta Tester Club"}
        </button>
      </nav>
    </aside>
  );
}

export function AccountShell({ active, search = false, children }: { active: SideKey; search?: boolean; children: ReactNode }) {
  const [invite, setInvite] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-rk-border pr-[33px] pl-8">
          <div>{search && <GoToTool />}</div>
          <nav className="flex items-center gap-10 text-[14px] text-rk-text xl:gap-[29px]">
            <button type="button" onClick={() => setInvite(true)} className="flex items-center gap-[7px] hover:text-rk-link">
              <PlusIcon />
              Invite users
            </button>
            <Link href={routes.home} className="hover:text-rk-link">
              Pricing
            </Link>
            <Link href={routes.home} className="hover:text-rk-link">
              Enterprise
            </Link>
            <MoreMenu />
            <div className="-ml-4">
              <ProfileMenu />
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <div className="hidden pt-[34px] xl:block">
          <Footer />
        </div>
        <div className="xl:hidden">
          <CenteredFooter />
        </div>
      </div>
      <InviteUsersModal open={invite} onClose={() => setInvite(false)} />
    </div>
  );
}

export function PageTop({
  crumb,
  title,
  meta,
  tabs,
  activeTab,
  links,
  variant = "profile",
}: {
  crumb: string;
  title: ReactNode;
  meta?: ReactNode;
  tabs?: readonly { key: string; label: string; href: string }[];
  activeTab?: string;
  links?: ReactNode;
  variant?: "profile" | "sub" | "plain";
}) {
  const pad = variant === "sub" ? "px-6 pt-5" : "px-8 pt-4";
  return (
    <div className={`border-b border-[#e0e2e2] ${pad} ${tabs ? "" : "pb-[21px]"}`}>
      <div className={`flex items-center justify-between ${variant === "sub" ? "max-w-[1009px]" : ""}`}>
        <nav className="flex items-center gap-[9px] text-[14px] leading-5">
          <Link href={routes.home} className="text-rk-muted hover:text-rk-link">
            Dashboard
          </Link>
          <ChevronRight className="text-rk-muted" width={14} height={14} />
          <span className="text-rk-text">{crumb}</span>
        </nav>
        {links}
      </div>
      <h1 className={`${variant === "sub" ? "mt-[11px]" : "mt-[6px]"} flex items-center gap-2 text-[20px] leading-7 font-semibold`}>{title}</h1>
      {meta && <div className={`${variant === "sub" ? "mt-[5px]" : "mt-[6px]"} flex items-center text-[14px] leading-5 text-rk-text`}>{meta}</div>}
      {tabs && (
        <div className={`${variant === "sub" ? "mt-[32px]" : "mt-[33px]"} flex gap-4`}>
          {tabs.map((t) => {
            const on = t.key === activeTab;
            return (
              <Link key={t.key} href={t.href} className={`relative ${variant === "sub" ? "pb-[9px]" : "pb-[8px]"} text-[16px] leading-6 whitespace-nowrap text-rk-text`}>
                {t.label}
                {on && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-rk-tab" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
