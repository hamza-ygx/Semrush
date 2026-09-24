"use client";

import { useState } from "react";
import { TrafficFrame, sampleDomains } from "../TrafficFrame";
import { categories, destinationRows, moreChannels, sourceChannels, sourceRows, type FlowRow } from "./data";
import { CardTabs, CatIcons, DomainLink, Pagination, SelectBox, SplitBar } from "./table";

const colors = sampleDomains.map((d) => d.color);

function ChannelFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [more, setMore] = useState(false);
  const all = [...sourceChannels, ...(moreChannels.some(([n]) => n === value) ? moreChannels.filter(([n]) => n === value) : [])];
  return (
    <div className="relative inline-flex h-7 items-stretch">
      {all.map(([n, c], i) => {
        const active = n === value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`relative -ml-px flex items-center gap-[8px] border px-[8px] text-[14px] leading-5 whitespace-nowrap first:ml-0 ${i === 0 ? "rounded-l-[6px]" : ""} ${
              active ? "z-10 border-[#a3aabb] bg-[#f0f5ff]" : "border-[#d7d9de] bg-white hover:bg-rk-bg"
            }`}
          >
            <span className="text-rk-text">{n}</span>
            <span className="text-[#6c6e79]">{c}</span>
          </button>
        );
      })}
      <button
        type="button"
        aria-label="More channels"
        onClick={() => setMore((m) => !m)}
        className="relative -ml-px flex w-[33px] items-center justify-center rounded-r-[6px] border border-[#d7d9de] bg-white hover:bg-rk-bg"
      >
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <circle cx="3" cy="8" r="1.6" fill="#191b23" />
          <circle cx="8" cy="8" r="1.6" fill="#191b23" />
          <circle cx="13" cy="8" r="1.6" fill="#191b23" />
        </svg>
      </button>
      {more && (
        <div className="absolute top-[32px] right-0 z-40 min-w-[180px] rounded-md bg-white py-1 shadow-popover">
          {moreChannels.map(([n, c]) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                onChange(n);
                setMore(false);
              }}
              className="flex w-full items-center justify-between gap-4 px-2 py-[6px] text-left text-[14px] hover:bg-rk-bg"
            >
              {n}
              <span className="text-[#6c6e79]">{c}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FlowTable({ rows, sources, pages }: { rows: FlowRow[]; sources: boolean; pages: number }) {
  const first = sources ? "w-[556px]" : "w-[726px]";
  return (
    <div>
      <div className="sticky top-[43px] z-20 flex h-[40px] items-center bg-[#f9f9f9] text-[12px] leading-4 text-rk-text-2">
        <div className={`${first} shrink-0 pl-[12px]`}>{sources ? "Source" : "Destination"}</div>
        <div className="w-[140px] shrink-0 pl-[12px]">Category</div>
        {sources && <div className="w-[170px] shrink-0 pl-[12px]">Channel</div>}
        <div className="w-[202px] shrink-0 pr-[12px] text-right">Group Traffic Split</div>
      </div>
      {rows.map((r, i) => (
        <div key={`${r.domain}${i}`} className="flex h-[45px] items-center border-b border-[#f0f0f0] hover:bg-[#f9f9f9]">
          <div className={`${first} shrink-0 pl-[12px]`}>
            <DomainLink name={r.domain} extra={r.note} />
          </div>
          <div className="w-[140px] shrink-0 pl-[12px]">
            <CatIcons codes={r.cat} />
          </div>
          {sources && <div className="w-[170px] shrink-0 pl-[12px] text-[14px] text-rk-text">{r.channel}</div>}
          <div className="flex w-[202px] shrink-0 justify-end pr-[12px]">
            <SplitBar split={r.split} colors={colors} />
          </div>
        </div>
      ))}
      <div className="px-5 pt-[20px] pb-[20px]">
        <Pagination pages={pages} />
      </div>
    </div>
  );
}

export function SourcesDestinations() {
  const [tab, setTab] = useState<"Sources" | "Destinations">("Sources");
  const [channel, setChannel] = useState("Total");
  const rows = channel === "Total" ? sourceRows : sourceRows.filter((r) => r.channel === channel);
  return (
    <TrafficFrame title="Sources & Destinations" filters={["geo", "date", "device"]}>
      <section className="rounded-lg bg-white shadow-card">
        <CardTabs items={["Sources", "Destinations"] as const} value={tab} onChange={setTab} />
        <div className="flex items-center gap-[8px] px-5 pt-[21px] pb-[19px]">
          <SelectBox label="Category" options={categories} />
          {tab === "Sources" && <ChannelFilter value={channel} onChange={setChannel} />}
        </div>
        {tab === "Sources" ? <FlowTable rows={rows} sources pages={channel === "Total" ? 95 : Math.max(1, Math.ceil(rows.length / 50))} /> : <FlowTable rows={destinationRows} sources={false} pages={41} />}
      </section>
    </TrafficFrame>
  );
}
