"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sectionNavs } from "@/config/routes";
import { ArrowLeft, ExternalIcon } from "../ui/icons";
import { railItems, type Section } from "./Rail";
import { isActive } from "./SectionNav";

export function NavDrawer({ section, onClose }: { section: Section; onClose: () => void }) {
  const path = usePathname();
  const [view, setView] = useState<string | null>(sectionNavs[section] ? section : null);
  const nav = view ? sectionNavs[view] : undefined;

  return (
    <div className="fixed inset-0 z-[80] flex xl:hidden">
      <aside data-testid="nav-drawer" className="h-full w-[360px] shrink-0 overflow-y-auto bg-rk-bg">
        {nav ? (
          <div className="px-2 pt-3 pb-6">
            <button
              type="button"
              onClick={() => setView(null)}
              className="mx-3 flex h-10 w-[calc(100%-24px)] items-center justify-center gap-2 rounded-md border border-rk-border-strong bg-rk-bg text-[16px] text-rk-text hover:bg-rk-hover"
            >
              <ArrowLeft width={16} height={16} />
              Back to toolkits
            </button>
            <div className="mt-7 px-3 text-[16px] leading-6 font-semibold">{nav.title}</div>
            {nav.groups.map((g, gi) => (
              <div key={gi} className={g.heading ? "mt-[18px]" : gi > 0 ? "mt-3" : "mt-1"}>
                {g.heading && <div className="px-3 pb-[6px] text-[14px] leading-5 text-rk-muted">{g.heading}</div>}
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={onClose}
                    className={`flex h-10 items-center justify-between rounded-lg px-3 text-[16px] text-rk-text ${isActive(it, path) ? "bg-rk-hover" : "hover:bg-rk-hover"}`}
                  >
                    <span className="truncate">{it.label}</span>
                    {it.external && <ExternalIcon className="shrink-0 text-rk-muted" />}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <nav className="px-2 pt-[11px] pb-6">
            {railItems.map(({ key, label, href, icon: Icon }) => {
              const hasNav = !!sectionNavs[key];
              const cls = `flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-[16px] text-rk-text ${key === section ? "bg-rk-hover" : "hover:bg-rk-hover"} ${
                key === "ai" || key === "reports" ? "mt-3" : "mt-2"
              } first:mt-0`;
              const icon = key === "home" ? <Icon width={22} height={18} /> : <Icon width={18} height={18} className="text-rk-text-2" />;
              return hasNav ? (
                <button key={key} type="button" onClick={() => setView(key)} className={cls}>
                  {icon}
                  {label}
                </button>
              ) : (
                <Link key={key} href={href} onClick={onClose} className={cls}>
                  {icon}
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </aside>
      <div className="flex-1 bg-[rgba(25,27,35,0.3)]" onClick={onClose} />
    </div>
  );
}
