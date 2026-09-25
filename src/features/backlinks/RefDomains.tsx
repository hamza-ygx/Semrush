"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { HeaderLink, PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { routes } from "@/config/routes";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { ExportPdf, ReportTitle, UserManual } from "@/features/domain/DomainHeader";
import { NewLostChart } from "./charts";
import { asMetrics, domain, newLostRd, rdPages, rdRows, weekRanges, weeks, type RdRow } from "./data";
import { AddFilter, BrokenIcon, Card, CardHead, Chevron, ChevronRightSm, Chip, ExportBtn, ExtIcon, ExtLink, Flag, MegaphoneIcon, Pager, SearchBox, Seg, SortIcon, Th, ext } from "./ui";

const rdFilters = ["Authority Score", "Category", "IP address", "Zones (by TLD)", "Countries"];

const ItalicInfo = () => (
  <svg viewBox="0 0 10 16" width={10} height={16} className="ml-[6px] shrink-0 text-[#a9abb6]">
    <circle cx="6.5" cy="4.6" r="1.1" fill="currentColor" />
    <path d="M4 7.5h2l-1.3 5.2c-.1.5.3.8.7.5l.8-.6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RedirectIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="mr-[4px] inline-block shrink-0 align-[-3px] text-[#9e9e9e]">
    <path d="M1.8 7.2 5 10.5 12 3.5M7.5 3.5H12V8" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function UrlText({ url, className = "" }: { url: string; className?: string }) {
  return (
    <a href={ext(url)} target="_blank" rel="noreferrer" className={`group text-rk-link hover:text-rk-link-hover ${className}`}>
      {url.slice(0, -1)}
      <span className="whitespace-nowrap">
        {url.slice(-1)}
        <span className="ml-[4px] inline-flex align-[-3px] text-[#a9abb6] group-hover:text-rk-link">
          <ExtIcon />
        </span>
      </span>
    </a>
  );
}

function AsCell({ d, as }: { d: string; as: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  const m = asMetrics(d, as);
  const rows = [
    { l: "Backlinks", v: m.backlinks },
    { l: "Referring Domains", v: m.refDomains },
    { l: "Monthly Visits", v: m.visits },
    { l: "Organic Traffic", v: m.organic },
    { l: "Outbound Domains", v: m.outbound },
  ];
  return (
    <span ref={ref} className="relative inline-flex">
      <button type="button" aria-label={`Authority Score ${as}`} data-testid={`as-${d}`} onClick={() => setOpen(!open)} className="group inline-flex items-center gap-[2px] text-rk-link hover:text-rk-link-hover">
        <span className="group-hover:underline">{as}</span>
        <Chevron />
      </button>
      {open && (
        <span className="absolute top-[45px] -left-[2px] z-30 block w-[291px] rounded-md bg-white px-4 pt-4 pb-[11px] text-left text-[14px] leading-5 text-rk-text shadow-popover">
          <span className="block whitespace-nowrap">Authority Score is calculated based on:</span>
          <span className="mt-[11px] block">
            {rows.map((r) => (
              <span key={r.l} className="flex h-7 items-center">
                {r.l}
                <ItalicInfo />
                <span className={`ml-auto ${r.v === "n/a" ? "text-rk-muted" : "font-semibold"}`}>{r.v}</span>
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}

function RowBacklinks({ r, onHide }: { r: RdRow; onHide: () => void }) {
  const [shown, setShown] = useState(5);
  const pages = rdPages(r.d, r.bl);
  const starts = pages.map((_, i) => pages.slice(0, i).reduce((a, p) => a + p.links.length, 0));
  const visible = pages.filter((_, i) => starts[i] < shown);
  const more = Math.min(5, r.bl - Math.min(shown, r.bl));
  const th = "h-[45px] border-b border-[#f0f0f2] pb-[8px] pl-[8px] align-bottom text-[12px] leading-4 font-normal text-left";
  const td = "pt-[11px] pb-[13px] pl-[8px] align-top";
  return (
    <tr className="border-b border-[#f0f0f2]">
      <td colSpan={6} className="px-3 pb-[16px]">
        <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
          <colgroup>
            <col style={{ width: 95 }} />
            <col style={{ width: 317 }} />
            <col style={{ width: 80 }} />
            <col style={{ width: 79 }} />
            <col style={{ width: 248 }} />
            <col style={{ width: 110 }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th className={`${th} !pl-0 pr-[10px] !text-right`}>
                <span className="inline-flex items-center gap-[4px]">
                  Page AS
                  <SortIcon className="text-rk-text-2" />
                </span>
              </th>
              <th className={th}>Source page Title and URL</th>
              <th className={th}>Ext. Links</th>
              <th className={th}>Int. Links</th>
              <th className={th}>Anchor and Target URL</th>
              <th className={th}>First Seen</th>
              <th className={th}>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) =>
              p.links.map((l, k) => {
                const last = k === p.links.length - 1;
                const b = `border-b ${last ? "border-[#f0f0f2]" : "border-[#f5f5f5]"}`;
                return (
                  <tr key={`${p.url}-${k}`}>
                    {k === 0 && (
                      <>
                        <td rowSpan={p.links.length} className={`${td} border-b border-[#f0f0f2] !pl-0 pr-[10px] text-right`}>
                          {p.as}
                        </td>
                        <td rowSpan={p.links.length} className={`${td} border-b border-[#f0f0f2] pr-[13px]`}>
                          <div className="break-all">
                            <UrlText url={p.url} className="tracking-[0.1px]" />
                          </div>
                          {p.tag && <Chip className="mt-[3px]">{p.tag}</Chip>}
                        </td>
                        <td rowSpan={p.links.length} className={`${td} border-b border-[#f0f0f2]`}>
                          {p.ext}
                        </td>
                        <td rowSpan={p.links.length} className={`${td} border-b border-[#f0f0f2]`}>
                          {p.int}
                        </td>
                      </>
                    )}
                    <td className={`${td} ${b} pr-[8px]`}>
                      <div className="break-all">
                        {l.code && (
                          <>
                            <RedirectIcon />
                            <Chip className="mr-[5px] align-[1px] !px-[10px]">{l.code}</Chip>
                          </>
                        )}
                        {l.broken && <BrokenIcon className="mr-[5px] inline-block align-[-3px] text-[#a9abb6]" />}
                        <UrlText url={l.target} />
                      </div>
                      {l.lost && (
                        <Chip tone="red" className="mt-[3px]">
                          Lost: Page redirect
                        </Chip>
                      )}
                    </td>
                    <td className={`${td} ${b} whitespace-nowrap`}>{l.first}</td>
                    <td className={`${td} ${b} whitespace-nowrap ${l.lastLost ? "text-[#d1002f]" : ""}`}>{l.last}</td>
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>
        <div className="mt-[12px] flex items-center text-[14px] leading-5">
          <Link
            href={`${routes.backlinksToolkit.backlinks}?q=${domain}&searchType=domain`}
            className="inline-flex h-7 items-center rounded-md border border-[#c4c7cf] bg-[#f4f5f9] px-[8px] text-rk-text hover:bg-rk-hover"
          >
            View full report
          </Link>
          {more > 0 && (
            <button type="button" onClick={() => setShown(shown + 5)} className="ml-[16px] text-rk-muted underline decoration-[#c4c7cf] decoration-dashed underline-offset-[5px] hover:text-rk-text">
              Show {more} more
            </button>
          )}
          <span className="mx-[15px] h-5 w-px bg-[#d5d7dc]" />
          <button type="button" onClick={onHide} className="text-rk-muted underline decoration-[#c4c7cf] decoration-dashed underline-offset-[5px] hover:text-rk-text">
            Hide
          </button>
        </div>
      </td>
    </tr>
  );
}

function RefDomainsTable() {
  const [open, setOpen] = useState<string | null>(null);
  const widths = open ? [85, 150, 160, 150, 151] : [83, 148, 171, 148, 149];
  return (
    <Card className="mt-[17px]">
      <CardHead title="Referring Domains" count="1 - 100 (263)" right={<ExportBtn />} />
      <div className="flex h-[68px] items-center gap-[8px] px-5">
        <SearchBox placeholder="Filter by referring domain" width={260} />
        <Seg options={["All", "Active", "New", "Lost"]} />
        <Seg options={["All", "Follow", "Nofollow"]} />
        <div className="-ml-[2px]">
          <AddFilter options={rdFilters} width={119} />
        </div>
      </div>
      <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
        <colgroup>
          <col style={{ width: widths[0] }} />
          <col />
          {widths.slice(1).map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <Th align="right">AS</Th>
            <Th>Root Domain / Category</Th>
            <Th align="right" sorted>
              Backlinks
            </Th>
            <Th align="right">Country / IP</Th>
            <Th align="right">First Seen</Th>
            <Th align="right">Last Seen</Th>
          </tr>
        </thead>
        <tbody>
          {rdRows.map((r) => {
            const on = open === r.d;
            return (
              <Fragment key={r.d}>
                <tr className={`border-b border-[#f0f0f2] align-top ${on ? "bg-[#f9f9f9]" : "hover:bg-[#f9f9f9]"}`}>
                  <td className="px-3 pt-[11px] text-right">
                    <AsCell d={r.d} as={r.as} />
                  </td>
                  <td className="px-3 pt-[11px] pb-[12px]">
                    <div className="flex items-center gap-[4px]">
                      <a href={ext(r.d)} target="_blank" rel="noreferrer" className="text-rk-link hover:text-rk-link-hover">
                        {r.d}
                      </a>
                      <ExtLink href={r.d} />
                    </div>
                    {r.c && <div className="text-rk-text-2">{r.c}</div>}
                    {r.tags && (
                      <div className="mt-[5px] flex gap-[4px]">
                        {r.tags.map((t) => (
                          <Chip key={t.label} tone={t.tone}>
                            {t.label}
                          </Chip>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className={`px-3 pt-[11px] text-right ${on ? "bg-[#f3f5f5]" : ""}`}>
                    <button type="button" aria-label={`Backlinks from ${r.d}`} aria-expanded={on} data-testid={`bl-${r.d}`} onClick={() => setOpen(on ? null : r.d)} className="inline-flex items-center gap-[12px]">
                      <ChevronRightSm className={`text-rk-text-2 ${on ? "rotate-90" : ""}`} />
                      {r.bl}
                    </button>
                  </td>
                  <td className="px-3 pt-[11px] text-right">
                    <span className="inline-flex items-center gap-[4px] tabular-nums">
                      <Flag code={r.flag} />
                      {r.ip}
                    </span>
                  </td>
                  <td className={`px-3 pt-[11px] text-right ${r.firstNew ? "text-[#009f81]" : ""}`}>{r.first}</td>
                  <td className="px-3 pt-[11px] text-right">{r.last}</td>
                </tr>
                {on && <RowBacklinks r={r} onHide={() => setOpen(null)} />}
              </Fragment>
            );
          })}
        </tbody>
      </table>
      <Pager pages={3} />
    </Card>
  );
}

export function RefDomainsPage() {
  return (
    <AppShell section="seo" search={{ kind: "analyze", value: domain, scope: true }} footer={false}>
      <PageHeader
        crumbs={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Referring Domains" }]}
        links={
          <div className="flex items-center gap-5">
            <HeaderLink icon={<MegaphoneIcon />}>Link building ideas</HeaderLink>
            <UserManual />
            <SendFeedback />
          </div>
        }
        title={<ReportTitle label="Referring Domains" />}
        actions={<ExportPdf />}
        meta={<span>Category: Accounting &amp; Auditing</span>}
        border={false}
        className="border-b-2 border-[#cdcfd2] !pb-[23px]"
      />
      <div className="px-8 pt-4">
        <Card className="h-[307px]">
          <header className="flex h-[40px] items-center border-b border-[#ecedf0] px-5">
            <h2 className="text-[16px] leading-6 font-bold">New and Lost Referring Domains</h2>
          </header>
          <div className="relative px-5 pt-[20px]">
            <NewLostChart newV={newLostRd.newV} lostV={newLostRd.lostV} max={newLostRd.max} ticks={newLostRd.ticks} labels={weeks} every={2} left={93} right={44} zero={173} unit={101 / newLostRd.max} tips={weekRanges} />
          </div>
        </Card>
        <RefDomainsTable />
      </div>
      <AnalyticsFooter gap={234} />
    </AppShell>
  );
}
