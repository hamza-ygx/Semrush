"use client";

import { useState } from "react";
import { TrafficFrame, sampleDomains } from "../TrafficFrame";
import { subdomainRows, subfolderRows } from "./data";
import { CardTabs, DomainLink, MetricTable, Pagination, SearchInput, ShareCell, Toggle } from "./table";

export function SubfoldersSubdomains() {
  const [tab, setTab] = useState<"Subfolders" | "Subdomains">("Subfolders");
  return (
    <TrafficFrame title="Subfolders & Subdomains" filters={["geo", "date", "device"]} chips="select" domains={sampleDomains}>
      <section className="overflow-clip rounded-lg bg-white shadow-card">
        <CardTabs items={["Subfolders", "Subdomains"] as const} value={tab} onChange={setTab} />
        <div className="flex items-center gap-[8px] px-5 pt-[20px] pb-[20px]">
          <SearchInput placeholder={tab === "Subfolders" ? "Filter by subfolder" : "Filter by subdomain"} />
          {tab === "Subfolders" && <Toggle label="Include subdomains" />}
        </div>
        {tab === "Subfolders" ? (
          <MetricTable
            first={{ label: "Subfolder", width: 290 }}
            cols={[
              { label: "Traffic Share", width: 180, sorted: true, pl: 12, pr: 17 },
              { label: "Unique Pageviews", width: 150 },
              { label: "Unique Visitors", width: 150 },
              { label: "Visits", width: 150 },
              { label: "Pages / Visit", width: 149 },
              { label: "Avg. Visit Duration", width: 170 },
              { label: "Bounce Rate", width: 150 },
            ]}
            thumb={[290, 332]}
            rows={subfolderRows.map((r) => ({
              key: r.path,
              first: <DomainLink name={r.path} />,
              cells: [<ShareCell key="s" left pct={r.share} label={`${r.share}%`} />, r.pv, r.uv, r.visits, r.ppv, r.dur, r.bounce],
              children: [
                { key: `${r.path}a`, first: `${r.path}woman/`, cells: ["", "", "", "", "", "", ""] },
                { key: `${r.path}b`, first: `${r.path}man/`, cells: ["", "", "", "", "", "", ""] },
              ],
            }))}
            footer={
              <div className="px-5 pt-[20px] pb-[20px]">
                <Pagination pages={53} />
              </div>
            }
          />
        ) : (
          <MetricTable
            expandable={false}
            first={{ label: "Subdomain", width: 826 }}
            cols={[
              { label: "Visits", width: 170, sorted: true },
              { label: "Desktop", width: 120 },
              { label: "Mobile", width: 120 },
              { label: "Pages / Visit", width: 130 },
              { label: "Avg. Visit Duration", width: 160 },
            ]}
            rows={subdomainRows.map((r) => ({ key: r.name, first: <DomainLink name={r.name} />, cells: [r.visits, r.desktop, r.mobile, r.ppv, r.dur] }))}
            footer={<div className="h-[20px]" />}
          />
        )}
      </section>
    </TrafficFrame>
  );
}
