"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { SearchIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { categoryTabs, issues, moreCategories, severityTabs, type Issue, type Severity } from "./data";
import { EyeIcon, HelpCircleIcon, SendIcon, SparkleIcon, useToggle, XIcon } from "./ui";

const c = routes.siteAuditCampaign;

const sections: { sev: Severity; label: string; line: string }[] = [
  { sev: "error", label: "Errors", line: "#ff6b78" },
  { sev: "warning", label: "Warnings", line: "#f29a0e" },
  { sev: "notice", label: "Notices", line: "#b4bffc" },
];

export const TrendBlob = () => (
  <svg viewBox="0 0 72 22" width={72} height={22} className="shrink-0">
    <path d="M0 22V10.5C6 8 12 6.5 18 7.5 24 8.5 28 11.5 34 11.5 40 11.5 44 4 52 3.5 60 3 64 7.5 72 8.5V22z" fill="#e6e7ed" />
  </svg>
);

function Seg({ on, onClick, children, className = "" }: { on?: boolean; onClick?: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative -ml-px flex h-7 items-center gap-[6px] border px-2 text-[14px] whitespace-nowrap first:ml-0 first:rounded-l-md last:rounded-r-md ${
        on ? "z-10 border-[#a3aae9] bg-[#e5e8f5] text-rk-text" : "border-rk-border-strong bg-white text-rk-text hover:bg-rk-bg"
      } ${className}`}
    >
      {children}
    </button>
  );
}

const N = ({ n }: { n: number }) => <span className="text-rk-muted">{n}</span>;

function MoreCats({ active, onPick }: { active: string; onPick: (k: string) => void }) {
  const { open, setOpen, ref, toggle } = useToggle();
  const on = moreCategories.some((m) => m.key === active);
  return (
    <div ref={ref} className="relative -ml-px flex last:rounded-r-md" data-morecats-btn>
      <Seg on={on} onClick={toggle} className="!ml-0 rounded-r-md px-[9px]">
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <circle cx="3" cy="8" r="1.4" fill="currentColor" />
          <circle cx="8" cy="8" r="1.4" fill="currentColor" />
          <circle cx="13" cy="8" r="1.4" fill="currentColor" />
        </svg>
      </Seg>
      {open && (
        <div className="absolute top-[calc(100%+6px)] right-0 z-50 w-[188px] rounded-md bg-white py-1 shadow-popover" data-more-cats>
          {moreCategories.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => {
                onPick(m.key);
                setOpen(false);
              }}
              className={`flex h-8 w-full items-center justify-between px-2 text-[14px] text-rk-text hover:bg-rk-bg ${m.key === active ? "bg-[#e9f7ff]" : ""}`}
            >
              {m.key}
              <span className="text-rk-muted">{m.n}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HowToFix({ issue }: { issue: Issue }) {
  const { open, ref, toggle } = useToggle();
  return (
    <span ref={ref} className="relative ml-3 inline-block">
      <button
        type="button"
        onClick={toggle}
        data-howto={issue.id}
        className="text-[14px] text-rk-muted underline decoration-[#a9abb6] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text"
      >
        How to fix
      </button>
      {open && <FixPanel issue={issue} />}
    </span>
  );
}

export function FixPanel({ issue, className = "top-[calc(100%+4px)] left-[1px]" }: { issue: Issue; className?: string }) {
  const hasLink = issue.about.endsWith("see ");
  return (
        <div className={`absolute z-40 flex w-[587px] overflow-hidden rounded-md bg-white text-[14px] leading-[19.5px] shadow-popover ${className}`}>
          <div className="w-[294px] shrink-0 px-4 pt-[16px] pb-[16px]">
            <div className="text-[16px] leading-6 font-semibold">About the issue</div>
            <p className="mt-[1px]">
              {issue.about}
              {hasLink && (
                <>
                  <a href="#" className="text-rk-link hover:text-rk-link-hover">
                    this Google article
                  </a>
                  .
                </>
              )}
            </p>
            <p className="mt-[10px] text-[14px]">
              <span className="text-[16px] font-semibold">Category:</span> {issue.category}
            </p>
          </div>
          <div className="flex-1 bg-[#dcf8ef] px-4 pt-[16px] pb-[16px]">
            <div className="text-[16px] leading-6 font-semibold">How to fix</div>
            <p className="mt-[1px] whitespace-pre-line">{issue.fix}</p>
            <p className="mt-[19.5px]">Work on the project with co-workers and keep everything organized</p>
            <button type="button" className="mt-[4px] flex h-[26px] items-center gap-[6px] rounded-md border border-[#b5dfd0] px-2 text-[14px] text-rk-text-2 hover:bg-[#c9f0e2]">
              <svg viewBox="0 0 16 16" width={16} height={16}>
                <g fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                  <circle cx="6" cy="5" r="2.5" />
                  <path d="M1.5 13.5c.4-2.4 2.1-3.8 4.5-3.8s4.1 1.4 4.5 3.8M12.5 5v4M10.5 7h4" />
                </g>
              </svg>
              Share
            </button>
          </div>
        </div>
  );
}

export function SendTo({ className = "", label = "Send to..." }: { className?: string; label?: string }) {
  const { open, setOpen, ref, toggle } = useToggle();
  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggle}
        data-sendto
        className={`flex h-7 items-center gap-2 rounded-md border border-rk-border-strong px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : "bg-[#f4f5f9]"}`}
      >
        <SendIcon />
        {label}
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 z-40 w-[231px] rounded-md bg-white shadow-popover">
          {[
            ["Trello", "Send a task to a Trello board"],
            ["Zapier", "Send a task to any task manager"],
          ].map(([a, b], i) => (
            <button key={a} type="button" onClick={() => setOpen(false)} className={`block w-full px-2 text-left hover:bg-rk-bg ${i ? "pt-[6px] pb-[8px]" : "pt-[8px] pb-[5px]"}`}>
              <div className="text-[14px] leading-5 text-rk-text">{a}</div>
              <div className="text-[14px] leading-5 whitespace-nowrap text-rk-muted">{b}</div>
            </button>
          ))}
          <div className="border-t border-rk-border py-[10px] pl-2">
            <a href="#" className="flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
              <HelpCircleIcon />
              How to connect Zapier
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function EyeButton() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-label="Hide issue"
      onClick={() => setOn(!on)}
      className={`flex h-[26px] w-[26px] items-center justify-center rounded-md border border-rk-border-strong text-rk-text-2 hover:bg-rk-hover ${on ? "bg-rk-hover" : "bg-[#f4f5f9]"}`}
    >
      <EyeIcon />
    </button>
  );
}

function IssueRow({ issue }: { issue: Issue }) {
  const href = c.issueDetail(issue.id);
  return (
    <div className="flex h-[51px] items-center border-b border-rk-border pr-5 pl-[23px] text-[14px] last:border-b-0 hover:bg-[#f9fafc]">
      <div className="flex min-w-0 flex-1 items-center">
        {issue.isNew && <span className="mr-[7px] -ml-[3px] rounded-[4px] bg-gradient-to-r from-[#9a5cff] to-[#b18bff] px-[4px] text-[11px] leading-[14px] font-semibold text-white">new</span>}
        <Link href={href} className="text-rk-link hover:text-rk-link-hover">
          {issue.count} {issue.unit}
        </Link>
        <span className="ml-[5px] text-rk-text">{issue.text}</span>
        <HowToFix issue={issue} />
      </div>
      <Link href={href} className="text-rk-link hover:text-rk-link-hover">
        {issue.count} new {issue.count === 1 ? "issue" : "issues"}
      </Link>
      <span className="mr-6 ml-[22px]">
        <TrendBlob />
      </span>
      <SendTo />
      <span className="ml-[9px]">
        <EyeButton />
      </span>
    </div>
  );
}

export function IssuesList() {
  const [cat, setCat] = useState("all");
  const [sev, setSev] = useState("all");
  const [withIssues, setWithIssues] = useState(true);
  const [q, setQ] = useState("");

  const list = issues.filter(
    (i) => (cat === "all" || i.cats.includes(cat)) && (sev === "all" || i.severity === sev) && (!q || `${i.count} ${i.unit} ${i.text}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="px-8 pb-[200px]">
      <div className="sticky top-0 z-30 -mx-8 flex items-center bg-rk-bg px-8 pt-[15px] pb-[13px]">
        <label className="flex h-7 w-[196px] items-center gap-[6px] rounded-md border border-rk-border-strong bg-white px-2 focus-within:border-[#8e92ec]">
          <SearchIcon width={15} height={15} className="text-[#8a8e9b]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="min-w-0 flex-1 text-[14px] outline-none placeholder:text-rk-muted" />
        </label>
        <div className="ml-[8px] flex">
          {categoryTabs.map((t) => (
            <Seg key={t.key} on={cat === t.key} onClick={() => setCat(t.key)}>
              {t.ai && <SparkleIcon />}
              {t.label} <N n={t.n} />
            </Seg>
          ))}
          <MoreCats active={cat} onPick={setCat} />
        </div>
        <div className="ml-[9px] flex">
          {severityTabs.map((t) => (
            <Seg key={t.key} on={sev === t.key} onClick={() => setSev(t.key)}>
              {t.label} <N n={t.n} />
            </Seg>
          ))}
        </div>
        {withIssues ? (
          <div className="ml-[9px] flex h-7 shrink-0 overflow-hidden rounded-md border border-[#a3aae9] bg-[#e5e8f5] text-[14px] whitespace-nowrap">
            <span className="flex items-center px-2">With issues</span>
            <button type="button" aria-label="Remove filter" onClick={() => setWithIssues(false)} className="flex w-[26px] items-center justify-center border-l border-[#a3aae9] hover:bg-[#d7dcf0]">
              <XIcon size={14} className="text-rk-text" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setWithIssues(true)} className="ml-[9px] h-7 rounded-md border border-rk-border-strong bg-white px-2 text-[14px] hover:bg-rk-bg">
            With issues
          </button>
        )}
      </div>

      <div className="mt-[4px] rounded-lg bg-white pt-[3px] shadow-card">
        {sections.map((s) => {
          const rows = list.filter((i) => i.severity === s.sev);
          if (!rows.length) return null;
          return (
            <section key={s.sev} className="border-b border-rk-border last:border-b-0">
              <div className="sticky top-[56px] z-20 bg-white">
                <div className="flex h-[44px] items-center pr-5 pl-5">
                  <span className="text-[16px] font-semibold">{s.label}</span>
                  <span className="ml-[5px] text-[16px] text-rk-muted">({rows.length})</span>
                  <Info className="ml-[6px] text-[#a9abb6]" />
                  <span className="mr-[160px] ml-auto">
                    <TrendBlob />
                  </span>
                </div>
                <div className="h-[3px]" style={{ background: s.line }} />
              </div>
              {rows.map((i) => (
                <IssueRow key={i.id} issue={i} />
              ))}
            </section>
          );
        })}
        {!list.length && <div className="px-5 py-10 text-center text-[14px] text-rk-muted">No issues found</div>}
      </div>
    </div>
  );
}
