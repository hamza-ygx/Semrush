"use client";

import { Fragment, useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { HeaderLink, PageHeader, SendFeedback } from "@/components/shell/PageHeader";
import { routes } from "@/config/routes";
import { AnalyticsFooter } from "@/features/domain/AnalyticsFooter";
import { ExportPdf, ReportTitle, UserManual } from "@/features/domain/DomainHeader";
import { NewLostChart } from "./charts";
import { domain, newLostRd, rdRows, weeks } from "./data";
import { AddFilter, AsSelect, Card, CardHead, ChevronRightSm, Chip, ExportBtn, ExtLink, Flag, MegaphoneIcon, Pager, SearchBox, Seg, Th, ext } from "./ui";

function RefDomainsTable() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Card className="mt-[17px]">
      <CardHead title="Referring Domains" count="1 - 100 (263)" right={<ExportBtn />} />
      <div className="flex h-[68px] items-center gap-[8px] px-5">
        <SearchBox placeholder="Filter by referring domain" width={260} />
        <Seg options={["All", "Active", "New", "Lost"]} />
        <Seg options={["All", "Follow", "Nofollow"]} />
        <div className="ml-[4px]">
          <AddFilter />
        </div>
      </div>
      <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
        <colgroup>
          <col style={{ width: 83 }} />
          <col />
          <col style={{ width: 148 }} />
          <col style={{ width: 171 }} />
          <col style={{ width: 148 }} />
          <col style={{ width: 149 }} />
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
          {rdRows.map((r) => (
            <Fragment key={r.d}>
              <tr className="border-b border-[#f0f0f2] align-top hover:bg-[#fafafb]">
                <td className="px-3 pt-[11px] text-right">
                  <AsSelect value={r.as} />
                </td>
                <td className="px-3 pt-[11px] pb-[12px]">
                  <div className="flex items-center gap-[4px]">
                    <a href={ext(r.d)} target="_blank" rel="noreferrer" className="text-rk-link hover:text-rk-link-hover">
                      {r.d}
                    </a>
                    <ExtLink href={r.d} />
                  </div>
                  {r.c && <div className="text-rk-text-2">{r.c}</div>}
                  {r.tag && (
                    <Chip tone={r.tag.tone} className="mt-[5px]">
                      {r.tag.label}
                    </Chip>
                  )}
                </td>
                <td className="px-3 pt-[11px] text-right">
                  <button type="button" onClick={() => setOpen(open === r.d ? null : r.d)} className="inline-flex items-center gap-[8px] hover:text-rk-link">
                    <ChevronRightSm className={`text-rk-text-2 ${open === r.d ? "rotate-90" : ""}`} />
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
              {open === r.d && (
                <tr className="border-b border-[#f0f0f2] bg-[#fafafb]">
                  <td />
                  <td colSpan={5} className="px-3 py-[10px] text-[13px] text-rk-muted">
                    {r.bl} backlink{r.bl > 1 ? "s" : ""} from{" "}
                    <a href={ext(r.d)} className="text-rk-link">
                      {r.d}
                    </a>{" "}
                    to {domain}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
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
            <NewLostChart newV={newLostRd.newV} lostV={newLostRd.lostV} max={newLostRd.max} ticks={newLostRd.ticks} labels={weeks} every={2} left={93} right={44} zero={173} unit={101 / newLostRd.max} />
          </div>
        </Card>
        <RefDomainsTable />
      </div>
      <AnalyticsFooter gap={234} />
    </AppShell>
  );
}
