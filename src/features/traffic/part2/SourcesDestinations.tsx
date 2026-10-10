"use client";

import { useState } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { DemoTag } from "../demo";
import type { TrafficLive } from "../ga4Live";
import { TrafficFrame, liveDomains, sampleDomains, withRange } from "../TrafficFrame";
import { categories, destinationRows, moreChannels, sourceChannels, sourceRows, type FlowRow } from "./data";
import { CardTabs, CatIcons, DomainLink, Pagination, SelectBox, ShareCell, SplitBar } from "./table";

const colors = sampleDomains.map((d) => d.color);

type Counts = { main: [string, string][]; more: [string, string][] };

function ChannelFilter({ value, onChange, counts = { main: sourceChannels, more: moreChannels } }: { value: string; onChange: (v: string) => void; counts?: Counts }) {
  const { main: sourceChannels, more: moreChannels } = counts;
  const [more, setMore] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(more, () => setMore(false));
  const all = [...sourceChannels, ...(moreChannels.some(([n]) => n === value) ? moreChannels.filter(([n]) => n === value) : [])];
  return (
    <div ref={ref} className="relative inline-flex h-7 items-stretch">
      {all.map(([n, c], i) => {
        const active = n === value;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`relative -ml-px flex items-center gap-[8px] border px-[8px] text-[14px] leading-5 whitespace-nowrap first:ml-0 ${i === 0 ? "rounded-l-[6px]" : ""} ${
              active ? "z-10 border-[#a3aabb] bg-[#f0f5ff]" : "border-[#d8dad9] bg-white hover:bg-rk-bg"
            }`}
          >
            <span className="text-rk-text">{n}</span>
            <span className="text-[#6a6c6a]">{c}</span>
          </button>
        );
      })}
      <button
        type="button"
        aria-label="More channels"
        onClick={() => setMore((m) => !m)}
        className="relative -ml-px flex w-[33px] items-center justify-center rounded-r-[6px] border border-[#d8dad9] bg-white hover:bg-rk-bg"
      >
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <circle cx="3" cy="8" r="1.6" fill="#1b1e1a" />
          <circle cx="8" cy="8" r="1.6" fill="#1b1e1a" />
          <circle cx="13" cy="8" r="1.6" fill="#1b1e1a" />
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
              <span className="text-[#6a6c6a]">{c}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FlowTable({ rows, sources, pages, base }: { rows: FlowRow[]; sources: boolean; pages: number; base?: string }) {
  const shares = rows.some((r) => r.share != null);
  const first = sources ? "w-[556px]" : "w-[726px]";
  return (
    <div>
      <div className="sticky top-[43px] z-20 flex h-[40px] items-center bg-[#f9f9f9] text-[12px] leading-4 text-rk-text-2">
        <div className={`${first} shrink-0 pl-[12px]`}>{sources ? "Source" : "Destination"}</div>
        <div className="w-[140px] shrink-0 pl-[12px]">Category</div>
        {sources && <div className="w-[170px] shrink-0 pl-[12px]">Channel</div>}
        <div className="w-[202px] shrink-0 pr-[12px] text-right">{shares ? "Traffic Share" : "Group Traffic Split"}</div>
      </div>
      {rows.map((r) => (
        <div key={`${r.domain}|${r.channel}`} className="flex h-[45px] items-center border-b border-[#f0f0f0] hover:bg-[#f9f9f9]">
          <div className={`${first} shrink-0 pl-[12px]`}>
            <DomainLink name={r.domain} extra={r.note} base={base} />
          </div>
          <div className="w-[140px] shrink-0 pl-[12px]">
            <CatIcons codes={r.cat} />
          </div>
          {sources && <div className="w-[170px] shrink-0 pl-[12px] text-[14px] text-rk-text">{r.channel}</div>}
          <div className="flex w-[202px] shrink-0 justify-end pr-[12px]">
            {r.share != null ? (
              <span className="w-[178px]">
                <ShareCell pct={r.share} label={r.share < 0.01 ? "< 0.01%" : `${+r.share.toFixed(2)}%`} />
              </span>
            ) : (
              <SplitBar split={r.split} colors={colors} />
            )}
          </div>
        </div>
      ))}
      <div className="px-5 pt-[20px] pb-[20px]">
        <Pagination pages={pages} />
      </div>
    </div>
  );
}

const fmtInt = (n: number) => n.toLocaleString("en-US");

function liveFlows(live: TrafficLive) {
  const rows: FlowRow[] = live.sources.map((r) => ({ domain: r.name, cat: "", channel: r.channel, split: [1], share: r.share }));
  const count = (c: string): [string, string] => [c, fmtInt(rows.filter((r) => r.channel === c).length)];
  const counts: Counts = {
    main: [["Total", fmtInt(rows.length)], ...["AI Traffic", "Referral", "Organic Search", "Google AI Mode", "Paid Search", "Organic Social"].map(count)],
    more: ["Paid Social", "Email", "Display Ads", "Direct"].map(count),
  };
  return { rows, counts };
}

export function SourcesDestinations({ live }: { live?: TrafficLive | null }) {
  const [tab, setTab] = useState<"Sources" | "Destinations">("Sources");
  const [channel, setChannel] = useState("Total");
  const lv = live ? liveFlows(live) : null;
  const all = lv?.rows ?? sourceRows;
  const rows = channel === "Total" ? all : all.filter((r) => r.channel === channel);
  const pageCount = (n: number) => Math.max(1, Math.ceil(n / 50));
  return (
    <TrafficFrame
      title="Sources & Destinations"
      filters={live ? withRange(["geo", "date", "device"], live.range.label) : ["geo", "date", "device"]}
      listView={!!live}
      demo={live ? false : undefined}
      domains={live ? liveDomains(live.domain) : undefined}
    >
      <section className="rounded-lg bg-white shadow-card">
        <CardTabs items={["Sources", "Destinations"] as const} value={tab} onChange={setTab} />
        <div className="flex items-center gap-[8px] px-5 pt-[21px] pb-[19px]">
          <SelectBox label="Category" options={categories} />
          {tab === "Sources" && <ChannelFilter value={channel} onChange={setChannel} counts={lv?.counts} />}
          {tab === "Destinations" && live && <DemoTag className="ml-[8px]" />}
        </div>
        {tab === "Sources" ? (
          lv ? (
            <FlowTable key={`sources-${channel}`} rows={rows.slice(0, 50)} sources pages={pageCount(rows.length)} base={live?.domain} />
          ) : (
            <FlowTable key={`sources-${channel}`} rows={rows} sources pages={channel === "Total" ? 95 : pageCount(rows.length)} />
          )
        ) : (
          <FlowTable key="destinations" rows={destinationRows} sources={false} pages={41} />
        )}
      </section>
    </TrafficFrame>
  );
}
