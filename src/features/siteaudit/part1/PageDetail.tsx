"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChevronDown, WarningIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { FixPopover } from "./FixPopover";
import { incomingLinks, type DetailIssue, type PageDetailData } from "./pageDetail";
import { ErrorBolt, ExtIcon, NoticeIcon, useToggle } from "./ui";

const c = routes.siteAuditCampaign;

type Detail = PageDetailData;

const BackIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M13.5 8h-11M6.5 4 2.5 8l4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Metric({ label, short, children }: { label: string; short?: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-[1px] text-[14px] leading-5 text-rk-muted">
        {short ? (
          <span title={label} className="w-[139px] shrink-0 overflow-hidden whitespace-nowrap">
            {short}
          </span>
        ) : (
          <span className="whitespace-nowrap">{label}</span>
        )}
        <Info className="shrink-0 text-[#a9abaa]" />
      </div>
      <div className="mt-[4px] text-[14px] leading-5 text-rk-text">{children}</div>
    </div>
  );
}

const Big = ({ children }: { children: ReactNode }) => <div className="text-[20px] leading-6 font-semibold text-rk-text">{children}</div>;

function Incoming({ n }: { n: number | null }) {
  const { open, ref, toggle } = useToggle();
  if (n == null) return <Big>n/a</Big>;
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={toggle} data-testid="sa-incoming" className="flex items-center gap-[4px] text-[20px] leading-6 font-semibold text-rk-muted">
        <span className="underline decoration-[#a9abaa] decoration-dashed decoration-1 underline-offset-[5px]">{n}</span>
        <ChevronDown width={14} height={14} strokeWidth={2} className="text-rk-text-2" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+7px)] left-0 z-40 w-[425px] rounded-md bg-white px-4 pt-[13px] pb-[17px] text-[14px] leading-5 font-normal shadow-popover">
          {incomingLinks.slice(0, n).map((u) => (
            <div key={u} className="flex h-[28px] items-center gap-[6px]">
              <Link href={c.crawledPages} className="truncate text-rk-link hover:text-rk-link-hover">
                {u}
              </Link>
              <a href={u} target="_blank" rel="noreferrer" aria-label="Open page" className="shrink-0 text-[#8b8d8c] hover:text-rk-text-2">
                <ExtIcon />
              </a>
            </div>
          ))}
          {n > incomingLinks.length && <div className="flex h-[28px] items-center text-rk-muted">and {n - incomingLinks.length} more</div>}
        </div>
      )}
    </div>
  );
}

function SevIcon({ sev }: { sev: DetailIssue["sev"] }) {
  if (sev === "error") return <ErrorBolt />;
  if (sev === "warning") return <WarningIcon className="shrink-0" />;
  return <NoticeIcon />;
}

const Chev = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${open ? "rotate-90" : ""}`}>
    <path d="m6 3.5 4.5 4.5L6 12.5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function IssueRow({ issue, first }: { issue: DetailIssue; first: boolean }) {
  const [open, setOpen] = useState(false);
  const t = issue.table;
  return (
    <div className={first ? "" : "border-t border-rk-border"}>
      <div className={`group flex h-[52px] items-center pr-5 pl-3 text-[14px] leading-5 hover:bg-[#f5f6f6] ${open ? "bg-[#f5f6f6]" : ""}`}>
        <span className="flex w-[30px] shrink-0 justify-center text-rk-text-2">
          {t && (
            <button type="button" aria-label={open ? "Collapse" : "Expand"} data-testid="sa-issue-toggle" onClick={() => setOpen(!open)} className="flex h-6 w-6 items-center justify-center">
              <Chev open={open} />
            </button>
          )}
        </span>
        <span className="ml-[4px] flex w-[16px] shrink-0 justify-center">
          <SevIcon sev={issue.sev} />
        </span>
        <span className="ml-[8px] w-[325px] shrink-0 truncate text-rk-text">{issue.name}</span>
        <span className="w-[20px] text-right text-rk-muted">{issue.count}</span>
        <Link href={issue.id ? c.issueDetail(issue.id) : c.issues} className="invisible ml-auto text-rk-muted group-hover:visible hover:text-rk-text">
          View all affected pages
        </Link>
        <span className="ml-[33px]">
          <FixPopover issue={issue.fix} className="right-0" />
        </span>
      </div>
      {open && t && (
        <div className="border-t border-rk-border">
          <div className="flex h-[40px] items-center border-b border-rk-border bg-[#f9f9f9] pr-5 pl-[71px] text-[12px] leading-4 text-rk-text">
            <span className="flex-1">{t.cols[0]}</span>
            <span className="w-[160px] text-center">{t.cols[1]}</span>
            <span className="w-[270px]" />
          </div>
          {t.rows.map((r, k) => (
            <div key={r.url + k} className={`flex h-[45px] items-center pr-5 pl-[71px] text-[14px] leading-5 ${k ? "border-t border-rk-border" : ""}`}>
              <span className="flex flex-1 items-center gap-[6px] text-rk-text">
                {r.url}
                <a href={r.url} target="_blank" rel="noreferrer" aria-label="Open page" className="text-[#8b8d8c] hover:text-rk-text-2">
                  <ExtIcon />
                </a>
              </span>
              <span className="flex w-[160px] justify-center">
                {/^\d{3}$/.test(r.value) ? (
                  <span className="flex h-5 items-center rounded-full bg-[#ffdcc4] px-2 text-[12px] leading-4 text-[#a2470b]">{r.value}</span>
                ) : (
                  <span className="max-w-full truncate text-rk-text">{r.value}</span>
                )}
              </span>
              <span className="w-[270px] text-right text-rk-danger">{r.tag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PageDetail({ d }: { d: Detail }) {
  const s = d.row.status;
  const statusCls = s != null && s < 300 ? "bg-[#d2f7ea] text-[#007c65]" : s != null && s < 400 ? "bg-[#e8e7fb] text-[#5a50c8]" : "bg-[#ffdcbc] text-[#a2470b]";
  return (
    <div className="px-8 pt-4 pb-[140px]">
      <div className="flex items-center">
        <Link href={c.crawledPages} aria-label="Back to Crawled Pages" className="flex h-7 w-7 items-center justify-center rounded-md border border-rk-border-strong bg-[#f5f6f6] text-rk-text-2 hover:bg-rk-hover">
          <BackIcon />
        </Link>
        <h2 className="ml-4 text-[20px] leading-7 font-semibold text-rk-text">{d.row.url}</h2>
        <a href={d.row.url} target="_blank" rel="noreferrer" aria-label="Open page" className="ml-[9px] text-[#a9abaa] hover:text-rk-text-2">
          <ExtIcon />
        </a>
        <span className={`ml-[13px] flex h-[26px] items-center rounded-full px-[9px] text-[14px] ${statusCls}`}>{d.row.status}</span>
      </div>
      <div className="mt-[1px] pl-[44px] text-[14px] leading-5 text-rk-text">{d.title}</div>
      <div className="mt-[24px] grid grid-cols-6 gap-x-5 gap-y-[20px] rounded-lg bg-white px-5 pt-[19px] pb-[18px] shadow-card">
        <Metric label="Internal Link Rank">
          <div className="flex items-center gap-[10px]">
            <Big>{d.ilr ?? "n/a"}</Big>
            <span className="mt-[2px] h-[7px] w-[80px] rounded-full bg-[#edefef]">
              <span className="block h-full rounded-full bg-rk-accent" style={{ width: `${d.ilr ?? 0}%` }} />
            </span>
          </div>
        </Metric>
        <Metric label="Incoming Internal Links" short="Incoming Internal ...">
          <Incoming n={d.incoming} />
        </Metric>
        <Metric label="Outgoing Internal Links" short="Outgoing Internal ...">
          <Big>{d.outgoing ?? "n/a"}</Big>
        </Metric>
        <Metric label="Outgoing External Links" short="Outgoing External...">
          <Big>{d.external ?? "n/a"}</Big>
        </Metric>
        <Metric label="Canonicalization">
          <div className="pt-[1px]">{d.canonical}</div>
        </Metric>
        <Metric label="Markup">
          <div className="space-y-[4px] pt-[1px]">
            {d.markup.map((m) => (
              <div key={m}>{m}</div>
            ))}
          </div>
        </Metric>
        <Metric label="Structured Data Items" short="Structured Data It...">
          <div className="space-y-[4px] pt-[1px]">
            {d.structured.length ? (
              d.structured.map(([k, n]) => (
                <div key={k}>
                  {k} <span className="text-rk-muted">({n})</span>
                </div>
              ))
            ) : (
              <div>n/a</div>
            )}
          </div>
        </Metric>
      </div>
      <div className="mt-[21px] flex items-baseline gap-[8px]">
        <h3 className="text-[16px] leading-6 font-semibold text-rk-muted">Issues Found</h3>
        <span className="text-[14px] text-rk-muted">({d.total})</span>
      </div>
      <div className="mt-[11px] overflow-hidden rounded-lg bg-white shadow-card">
        {d.issues.map((i, k) => (
          <IssueRow key={i.name} issue={i} first={!k} />
        ))}
      </div>
    </div>
  );
}
