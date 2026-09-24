"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sectionNavs } from "@/config/routes";
import { ArrowLeft, ExternalIcon } from "../ui/icons";
import { railItems, type Section } from "./Rail";
import { isActive } from "./SectionNav";

export function NavDrawer({ section, onClose }: { section: Section; onClose: () => void }) {
  const path = usePathname();
  const [view, setView] = useState<string | null>(sectionNavs[section] ? section : null);
  const nav = view ? sectionNavs[view] : undefined;

  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      el.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex xl:hidden">
      <aside data-testid="nav-drawer" className="h-full w-[360px] shrink-0 overflow-y-auto bg-rk-bg">
        {nav ? (
          <div className="px-2 pt-3 pb-3">
            <button
              type="button"
              onClick={() => setView(null)}
              className="mx-3 flex h-10 w-[calc(100%-24px)] items-center justify-center gap-[10px] rounded-md border border-[#cacccc] bg-[#eceeee] text-[16px] text-rk-text hover:bg-[#e6e8e8]"
            >
              <ArrowLeft width={14} height={14} />
              Back to toolkits
            </button>
            <div className="mt-[29px] mb-[10px] px-3 text-[16px] leading-5 font-semibold">{nav.title}</div>
            {nav.groups.map((g, gi) => (
              <div key={gi} className={g.heading ? (gi === 0 ? "mt-[19px]" : "mt-5") : gi > 0 ? "mt-3" : ""}>
                {g.heading && <div className="mb-2 px-3 text-[14px] leading-5 text-rk-muted">{g.heading}</div>}
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={onClose}
                    className={`flex h-10 items-center justify-between rounded-md px-3 text-[16px] text-rk-text ${isActive(it, path) ? "bg-[#e3e4e5]" : "hover:bg-[#e3e4e5]"}`}
                  >
                    <span className="truncate">{it.label}</span>
                    {it.external && <ExternalIcon width={16} height={16} className="mr-[1px] shrink-0 text-rk-muted" />}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <nav className="px-2 pt-[11px] pb-6">
            {railItems.map(({ key, label, href, icon: Icon }) => {
              const hasNav = !!sectionNavs[key];
              const on = key === section;
              const cls = `flex h-10 w-full items-center gap-[10px] rounded-md px-[10px] text-left text-[16px] ${on ? "bg-[#e3e4e5] text-rk-text" : "text-rk-muted hover:bg-[#e3e4e5]"} ${
                key === "ai" || key === "reports" ? "mt-3" : "mt-2"
              } first:mt-0`;
              const icon =
                key === "home" ? (
                  <Icon width={24} height={20} className="shrink-0" />
                ) : (
                  <Icon width={24} height={24} className={`shrink-0 ${on ? "text-rk-text" : "text-rk-muted"}`} />
                );
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
      <div data-testid="nav-drawer-backdrop" className="flex-1 bg-black/[0.26]" onClick={onClose} />
    </div>
  );
}
