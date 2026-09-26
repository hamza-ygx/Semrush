"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { SendFeedback } from "@/components/shell/PageHeader";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { AccountShell, PageTop } from "./AccountShell";
import { apiQueryRows, queryPageSize, queryTabs, webQueryRows, type QueryRow, type QueryTab } from "./data";

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-[#6a6c6a]">
    <g fill="none" stroke="currentColor" strokeWidth={1.4}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 6.5h12M5 1.5v3M11 1.5v3" strokeLinecap="round" />
    </g>
  </svg>
);

const ItalicInfo = () => <span className="ml-[6px] font-serif text-[15px] font-normal text-[#8a8c8b] italic">i</span>;

const input = "h-7 rounded-md border border-[#d6d8d7] bg-white px-2 text-[14px] outline-none focus:border-[#7a86f2]";

export function QueryLog({ tab, page }: { tab: QueryTab; page: number }) {
  const api = tab === "api";
  const all = api ? apiQueryRows : webQueryRows;
  const [draft, setDraft] = useState({ q: "", ip: "" });
  const [filter, setFilter] = useState({ q: "", ip: "" });
  const [exp, setExp] = useState(false);
  const rows = all.filter((r) => r.query.includes(filter.q) && r.ip.includes(filter.ip));
  const pages = Math.max(1, Math.ceil(rows.length / queryPageSize));
  const cur = Math.min(page, pages);
  const start = (cur - 1) * queryPageSize;
  const shown = rows.slice(start, start + queryPageSize);
  const base = queryTabs.find((t) => t.key === tab)!.href;
  const cols = api ? "grid-cols-[50px_260px_212px_120px_120px_177px_114px_150px_150px_1fr]" : "grid-cols-[50px_260px_212px_120px_120px_157px_1fr]";
  return (
    <AccountShell active="queryLog" minWidth={api ? 1646 : undefined}>
      <PageTop
        crumb="Query Log"
        title="Query Log"
        variant="log"
        links={<SendFeedback />}
        meta={
          <span className="flex gap-6">
            <span>Timezone: (UTC+00:00) GMT</span>
            <span>Last results downloaded: September 25, 2026 {api ? "12:24" : "12:23"} PM</span>
          </span>
        }
        tabs={queryTabs}
        activeTab={tab}
      />
      <div className="px-8 pt-4">
        <div className="rounded-lg bg-white shadow-card">
          <h2 className={`flex items-center border-b border-[#eceef0] px-5 text-[16px] font-semibold ${api ? "h-[43px]" : "h-[39px]"}`}>
            {api ? "API Queries" : "Web Queries"}
            <span className="ml-[5px] font-normal text-rk-muted">({rows.length})</span>
            {api && <ItalicInfo />}
          </h2>
          <form
            className="flex items-end gap-2 px-5 pt-[21px] pb-[16px]"
            onSubmit={(e) => {
              e.preventDefault();
              setFilter(draft);
            }}
          >
            <label className="flex flex-col gap-2 text-[14px] leading-5">
              Query
              <input aria-label="Query" value={draft.q} onChange={(e) => setDraft({ ...draft, q: e.target.value })} className={`${input} w-[209px]`} />
            </label>
            <label className="flex flex-col gap-2 text-[14px] leading-5">
              Time
              <span className={`${input} flex w-[251px] items-center gap-2 text-[#a9abaa]`}>
                <CalendarIcon />
                MM/DD/YYYY <span className="mx-[1px]">–</span> MM/DD/YYYY
              </span>
            </label>
            <label className="flex flex-col gap-2 text-[14px] leading-5">
              IP
              <input aria-label="IP" value={draft.ip} onChange={(e) => setDraft({ ...draft, ip: e.target.value })} className={`${input} w-[209px]`} />
            </label>
            {!api && (
              <label className="ml-[8px] mr-[2px] flex h-7 items-center gap-2 text-[14px]">
                <input type="checkbox" checked={exp} onChange={(e) => setExp(e.target.checked)} className="h-4 w-4 appearance-none rounded-[3px] border border-[#d6d8d7] bg-white checked:border-rk-accent checked:bg-rk-accent" />
                Export queries
              </label>
            )}
            <button type="submit" className={`${api ? "ml-[8px]" : "ml-[6px]"} h-[26px] rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-medium text-white hover:bg-black`}>
              Apply filters
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft({ q: "", ip: "" });
                setFilter({ q: "", ip: "" });
              }}
              className="h-[26px] rounded-md border border-[#d6d8d7] bg-[#f5f6f6] px-2 text-[14px] text-rk-muted hover:bg-rk-hover"
            >
              Reset
            </button>
          </form>
          <div className={`grid ${cols} h-[40px] items-center border-y border-[#eceef0] bg-[#f9f9f9] px-3 text-[13px] leading-4 text-rk-text-2`}>
            <span>No.</span>
            <span>Query</span>
            <span>Time</span>
            <span>IP</span>
            <span>DB</span>
            <span>Report type</span>
            <span>Historical</span>
            {api && (
              <>
                <span>Requested lines</span>
                <span>API units</span>
                <span />
              </>
            )}
          </div>
          {shown.map((r: QueryRow, i) => (
            <div key={start + i} className={`grid ${cols} h-[45px] items-center border-b border-[#eceef0] px-3 text-[14px] leading-5 last:border-b-0`}>
              <span>{start + i + 1}</span>
              <span className="truncate pr-4">
                {r.link ? (
                  <Link href={`${routes.domainOverview}?q=${r.query}`} className="text-rk-link hover:text-rk-link-hover">
                    {r.query}
                  </Link>
                ) : (
                  r.query
                )}
              </span>
              <span className="whitespace-nowrap tabular-nums">{r.time}</span>
              <span>{r.ip}</span>
              <span>{r.db}</span>
              <span className="mr-[10px] overflow-hidden whitespace-nowrap">{r.report}</span>
              <span>{r.historical}</span>
              {api && (
                <>
                  <span>{r.lines}</span>
                  <span>{r.units}</span>
                  <span />
                </>
              )}
            </div>
          ))}
          {shown.length === 0 && <div className="py-10 text-center text-[14px] text-rk-muted">No queries found</div>}
        </div>
        <div className="mt-4 flex items-center justify-end gap-1 text-[14px]">
          <PageLink href={cur > 1 ? `${base}?page=${cur - 1}` : undefined} label="Previous page">
            <ChevronLeft />
          </PageLink>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <Link key={n} href={`${base}?page=${n}`} className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 ${n === cur ? "bg-[#e0e2e1]" : "hover:bg-rk-hover"}`}>
              {n}
            </Link>
          ))}
          <PageLink href={cur < pages ? `${base}?page=${cur + 1}` : undefined} label="Next page">
            <ChevronRight />
          </PageLink>
        </div>
      </div>
    </AccountShell>
  );
}

function PageLink({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  const cls = "flex h-7 w-7 items-center justify-center rounded-md text-rk-muted";
  return href ? (
    <Link href={href} aria-label={label} className={`${cls} hover:bg-rk-hover`}>
      {children}
    </Link>
  ) : (
    <span aria-label={label} className={`${cls} opacity-40`}>
      {children}
    </span>
  );
}
