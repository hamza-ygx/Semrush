"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Footer } from "../Footer";
import { HamburgerIcon, PlusIcon } from "../ui/icons";
import { AnalyzeSearch, GoToTool } from "./HeaderSearch";
import { HelpButtonAndPanel } from "./HelpPanel";
import { MoreMenu, ProfileMenu } from "./HeaderMenus";
import { InviteUsersModal } from "./InviteUsersModal";
import { Rail, type Section } from "./Rail";
import { SectionNav } from "./SectionNav";

export type HeaderSearchConfig = { kind: "goto" } | { kind: "analyze"; value: string; scope?: boolean };

const STORAGE_KEY = "rk.sidebar.collapsed";
const listeners = new Set<() => void>();

function readCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeCollapsed(v: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function AppShell({
  section = "seo",
  search = { kind: "goto" },
  children,
  footer = true,
}: {
  section?: Section;
  search?: HeaderSearchConfig;
  children: ReactNode;
  footer?: boolean;
}) {
  const collapsed = useSyncExternalStore(subscribe, readCollapsed, () => false);
  const [drawer, setDrawer] = useState(false);
  const [invite, setInvite] = useState(false);

  const toggle = () => writeCollapsed(!collapsed);

  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen shrink-0 xl:flex">
        <Rail active={section} collapsed={collapsed} onToggle={toggle} />
        {!collapsed && section === "seo" && <SectionNav />}
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[80] flex xl:hidden" onMouseDown={(e) => e.target === e.currentTarget && setDrawer(false)}>
          <div className="flex h-full shadow-popover">
            <Rail active={section} collapsed={false} onToggle={() => setDrawer(false)} />
            {section === "seo" && <SectionNav />}
          </div>
          <div className="flex-1 bg-[rgba(25,27,35,0.3)]" onClick={() => setDrawer(false)} />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-rk-border pr-[38px] pl-8">
          <div className="flex items-center gap-[14px]">
            <button type="button" aria-label="Menu" onClick={() => setDrawer(true)} className="-ml-[3px] flex h-9 w-9 items-center justify-center rounded text-rk-text-2 hover:bg-rk-hover xl:hidden">
              <HamburgerIcon width={22} height={22} />
            </button>
            {search.kind === "goto" ? <GoToTool /> : <AnalyzeSearch value={search.value} scope={search.scope} />}
          </div>
          <nav className="flex items-center gap-10 text-[14px] text-rk-text xl:gap-[27px]">
            <button type="button" onClick={() => setInvite(true)} className="flex items-center gap-[7px] hover:text-rk-link">
              <PlusIcon />
              Invite users
            </button>
            <a href="#" className="hover:text-rk-link">
              Pricing
            </a>
            <a href="#" className="hover:text-rk-link">
              Enterprise
            </a>
            <MoreMenu />
            <ProfileMenu />
          </nav>
        </header>

        <main className="flex-1">{children}</main>
        {footer && (
          <div className="pt-[34px]">
            <Footer />
          </div>
        )}
      </div>

      <HelpButtonAndPanel />
      <InviteUsersModal open={invite} onClose={() => setInvite(false)} />
    </div>
  );
}
