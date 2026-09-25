"use client";

import Link from "next/link";
import { useState } from "react";
import { helpArticleSlugs, kbHref } from "@/features/kb/data";
import { ChevronDown, CloseIcon, SearchIcon } from "../ui/icons";
import { SupportChat } from "./SupportChat";

const articles = ["Audit your website", "Conduct keyword research", "Track your rankings", "Create winning content", "Optimize backlinks", "Run competitive analysis"];

const res = (d: string) => (
  <svg viewBox="0 0 24 24" width={24} height={24} className="shrink-0 text-[#8b8d8c]">
    <path d={d} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const resources = [
  { label: "Help Center", icon: res("M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z") },
  { label: "Online Demo", icon: res("M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM2.5 17c.4-3 2-4.5 4.5-4.5 1.3 0 2.4.4 3.1 1.1M10 4h11.5v10H15M15 14l2 4") },
  { label: "Blog", icon: res("M3 4h18v16H3zM6 8h5v5H6zM14 8h4M14 11h4M6 16h12") },
  { label: "Academy", icon: res("M2 9l10-5 10 5-10 5zM6 11v5c1.5 1.3 3.6 2 6 2s4.5-.7 6-2v-5M22 9v6") },
];

export function HelpButtonAndPanel({ variant = "question" }: { variant?: "question" | "chat" | "chat-dark" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && variant !== "question" && <SupportChat onClose={() => setOpen(false)} />}
      {open && variant === "question" && (
        <aside className="fixed top-0 right-0 bottom-0 z-[60] flex w-[400px] flex-col xl:w-[403px] bg-white shadow-popover">
          <div className="flex h-[49px] shrink-0 items-center justify-between border-b border-rk-border px-6">
            <h2 className="text-[16px] font-semibold">Help &amp; Support</h2>
            <button type="button" aria-label="Close help" onClick={() => setOpen(false)} className="text-[#a9abaa] hover:text-rk-text">
              <CloseIcon width={22} height={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 pt-[21px]">
            <label className="flex h-10 items-center gap-2 rounded-md border border-rk-border-strong px-3 text-rk-muted">
              <SearchIcon />
              <input placeholder="Search for articles" className="flex-1 text-[16px] text-rk-text outline-none placeholder:text-rk-muted" />
            </label>
            <h3 className="mt-[29px] mb-[14px] text-[14px] font-semibold">Getting Started Articles</h3>
            <div className="grid grid-cols-2 gap-[15px]">
              {articles.map((a) => (
                <Link key={a} href={kbHref(helpArticleSlugs[a])} onClick={() => setOpen(false)} className="h-[82px] rounded-lg border border-rk-border px-4 pt-[15px] text-[14px] leading-5 text-rk-text hover:shadow-card">
                  {a}
                </Link>
              ))}
            </div>
            <h3 className="mt-[21px] mb-[8px] text-[14px] font-semibold">Resources</h3>
            {resources.map((r) => (
              <a key={r.label} href="#" className="flex h-10 items-center gap-[19px] text-[14px] text-rk-text hover:text-rk-link">
                {r.icon}
                {r.label}
              </a>
            ))}
          </div>
          <a href="#" className="flex h-[46px] shrink-0 items-center gap-4 border-t border-rk-border px-6 text-[14px] hover:text-rk-link">
            {res("M3 12 21 3l-4 18-5-7zM12 14l9-11")}
            Contact support
          </a>
        </aside>
      )}
      <button
        type="button"
        data-testid="help-toggle"
        aria-label={open ? "Close help" : "Help"}
        onClick={() => setOpen((o) => !o)}
        className={`fixed z-[110] flex items-center justify-center rounded-full font-bold hover:brightness-95 ${
          variant === "question" ? "right-[21px] bottom-[21px] h-[52px] w-[52px] text-[28px] shadow-card transition-transform hover:scale-110" : "right-5 bottom-5 h-12 w-12 shadow-[0_1px_6px_rgba(0,0,0,0.06),0_2px_32px_rgba(0,0,0,0.16)]"
        } ${variant === "chat-dark" ? "bg-[#0a0a0b] text-white" : "bg-rk-help text-rk-text"}`}
      >
        {open && variant !== "question" ? (
          <ChevronDown width={24} height={24} strokeWidth={1.8} className="text-white" />
        ) : open ? (
          <CloseIcon width={26} height={26} strokeWidth={2.4} />
        ) : variant === "question" ? (
          "?"
        ) : (
          <>
            <svg viewBox="0 0 22 24" width={22} height={24} className="mt-[3px] ml-[2px]">
              <path d="M4 0h14a4 4 0 0 1 4 4v20l-5.2-4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#fff" />
              <path
                d="M5 12.6c3.4 2.5 8.6 2.5 12 0"
                fill="none"
                stroke={variant === "chat-dark" ? "#0a0a0b" : "var(--color-rk-help)"}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute -top-[2px] -right-[9px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#e5173f] px-1 text-[11px] leading-none font-semibold text-white">
              1
            </span>
          </>
        )}
      </button>
    </>
  );
}
