"use client";

import { useState } from "react";
import { fmtCount, fmtDur, fmtPpv, fmtRate, type TrafficLive } from "../ga4Live";
import { TrafficFrame, liveDomains, sampleDomains, withRange } from "../TrafficFrame";
import { subdomainRows, subfolderRows } from "./data";
import { CardTabs, DomainLink, MetricTable, Pagination, SearchInput, ShareCell, Toggle } from "./table";

type Folder = { path: string; share: number; pv: string; uv: string; visits: string; ppv: string; dur: string; bounce: string; children?: string[] };

function liveRows(live: TrafficLive) {
  const folders: Folder[] = live.folders.map((f) => ({
    path: f.path,
    share: f.share,
    pv: fmtCount(f.views),
    uv: fmtCount(f.users),
    visits: fmtCount(f.visits),
    ppv: fmtPpv(f.ppv),
    dur: fmtDur(f.dur),
    bounce: fmtRate(f.bounce),
    children: f.children,
  }));
  const pct = (v: number) => `${+(v * 100).toFixed(2)}%`;
  const subs = [{ name: live.domain, visits: fmtCount(live.totals.sessions), desktop: pct(live.device.desktop), mobile: pct(live.device.mobile), ppv: fmtPpv(live.totals.ppv), dur: fmtDur(live.totals.dur) }];
  return { folders, subs };
}

export function SubfoldersSubdomains({ live }: { live?: TrafficLive | null }) {
  const [tab, setTab] = useState<"Subfolders" | "Subdomains">("Subfolders");
  const lv = live ? liveRows(live) : null;
  const folders: Folder[] = lv?.folders ?? subfolderRows;
  const subs = lv?.subs ?? subdomainRows;
  const childRows = (r: Folder) => (r.children ?? [`${r.path}woman/`, `${r.path}man/`]).map((c, i) => ({ key: `${r.path}${"ab"[i] ?? i}`, first: c, cells: ["", "", "", "", "", "", ""] }));
  return (
    <TrafficFrame
      title="Subfolders & Subdomains"
      filters={live ? withRange(["geo", "date", "device"], live.range.label) : ["geo", "date", "device"]}
      chips="select"
      domains={live ? liveDomains(live.domain) : sampleDomains}
      listView={!!live}
      demo={live ? false : undefined}
    >
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
            rows={(lv ? folders.slice(0, 50) : folders).map((r) => ({
              key: r.path,
              first: <DomainLink name={r.path} base={live?.domain} />,
              cells: [<ShareCell key="s" left pct={r.share} label={`${r.share}%`} />, r.pv, r.uv, r.visits, r.ppv, r.dur, r.bounce],
              children: childRows(r),
            }))}
            footer={
              <div className="px-5 pt-[20px] pb-[20px]">
                <Pagination pages={lv ? Math.max(1, Math.ceil(folders.length / 50)) : 53} />
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
            rows={subs.map((r) => ({ key: r.name, first: <DomainLink name={r.name} />, cells: [r.visits, r.desktop, r.mobile, r.ppv, r.dur] }))}
            footer={<div className="h-[20px]" />}
          />
        )}
      </section>
    </TrafficFrame>
  );
}
