"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import { Footer } from "../Footer";
import { HamburgerIcon, PlusIcon } from "../ui/icons";
import { AnalyzeSearch, GoToTool } from "./HeaderSearch";
import { HelpButtonAndPanel } from "./HelpPanel";
import { MoreMenu, ProfileMenu } from "./HeaderMenus";
import { InviteUsersModal } from "./InviteUsersModal";
import { NavDrawer } from "./NavDrawer";
import { ProjectSelect } from "./ProjectSelect";
import { Rail, type Section } from "./Rail";
import { SectionNav } from "./SectionNav";

export type HeaderSearchConfig =
  | { kind: "goto" }
  | { kind: "none" }
  | { kind: "analyze"; value: string; scope?: boolean; placeholder?: string; inputClassName?: string; action?: string };

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
  enterprise = true,
  help = "question",
  project = false,
  projectWidth,
  minWidth,
}: {
  section?: Section;
  search?: HeaderSearchConfig;
  children: ReactNode;
  footer?: boolean;
  enterprise?: boolean;
  help?: "question" | "chat" | "chat-dark" | "none";
  project?: boolean;
  projectWidth?: number;
  minWidth?: number;
}) {
  const collapsed = useSyncExternalStore(subscribe, readCollapsed, () => false);
  const [drawer, setDrawer] = useState(false);
  const [invite, setInvite] = useState(false);

  const toggle = () => writeCollapsed(!collapsed);

  return (
    <div className="flex min-h-screen" style={minWidth ? { minWidth } : undefined}>
      <div className="sticky top-0 z-[65] hidden h-screen shrink-0 xl:flex">
        <Rail active={section} collapsed={collapsed} onToggle={toggle} />
        {!collapsed && <SectionNav section={section} />}
      </div>

      {drawer && <NavDrawer section={section} onClose={() => setDrawer(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-rk-border pr-[33px] pl-8">
          <div className="flex items-center gap-[12px] xl:gap-[14px]">
            <button type="button" aria-label="Menu" onClick={() => setDrawer(true)} className="ml-[2px] flex h-9 w-9 items-center justify-center rounded text-rk-text-2 hover:bg-rk-hover xl:hidden">
              <HamburgerIcon width={22} height={22} />
            </button>
            {project && <ProjectSelect width={projectWidth} />}
            {search.kind === "goto" ? (
              <GoToTool compact={project} extra={projectWidth ? 162 - projectWidth : 0} />
            ) : search.kind === "analyze" ? (
              <AnalyzeSearch value={search.value} scope={search.scope} placeholder={search.placeholder} inputClassName={search.inputClassName} action={search.action} />
            ) : null}
          </div>
          <nav className="flex items-center gap-[39px] text-[14px] text-rk-text xl:gap-[28px]">
            <button type="button" onClick={() => setInvite(true)} className="flex items-center gap-[7px] hover:text-rk-link">
              <PlusIcon />
              Invite users
            </button>
            <a href="#" className="hover:text-rk-link">
              Pricing
            </a>
            {enterprise && (
              <a href="#" className="hover:text-rk-link">
                Enterprise
              </a>
            )}
            <MoreMenu />
            <div className="-ml-4">
              <ProfileMenu />
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>
        {footer && (
          <div className="pt-[34px]">
            <Footer />
          </div>
        )}
      </div>

      {help !== "none" && <HelpButtonAndPanel variant={help} />}
      <InviteUsersModal open={invite} onClose={() => setInvite(false)} />
    </div>
  );
}
