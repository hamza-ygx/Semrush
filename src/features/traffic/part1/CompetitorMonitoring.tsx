"use client";

import { useState } from "react";
import { InfoIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { LockedArea, Skel } from "../Paywall";
import { TrafficFrame, domainColors, type TrafficFilter } from "../TrafficFrame";
import { SampleCard } from "../ui";

const filters: TrafficFilter[] = [
  "geo",
  { key: "date", value: "Aug 19 – Sep 23, 2026", options: ["Aug 19 – Sep 23, 2026", "Last 7 days", "Last 30 days", "Last 90 days"] },
  "granularity",
];
const zaraOnly = [{ name: "zara.com", color: domainColors.zara }];

const cats = [
  { label: "Google Search Ads", n: 10 },
  { label: "Blog Posts", n: 0 },
  { label: "New Pages", n: 0 },
  { label: "Social Media", n: 72 },
];

type Post = { date: string; text: string; likes: string; comments: string };

const posts: { group: string; items: Post[] }[] = [
  {
    group: "Sep 1 – 23",
    items: [
      { date: "Sep 23", text: "TRF collection Thank you to our models #zara #zarawoman", likes: "2.1K", comments: "39" },
      { date: "Sep 18", text: "Autumn/Winter Collection #zara #zaraman", likes: "6.4K", comments: "88" },
      { date: "Sep 12", text: "Studio Collection. Discover it now in selected stores and at zara.com #zara", likes: "12.7K", comments: "204" },
      { date: "Sep 5", text: "Back to basics. The essential knitwear edit #zara #zarawoman", likes: "8.2K", comments: "117" },
    ],
  },
  {
    group: "Aug 19 – 31",
    items: [
      { date: "Aug 31", text: "Zara Home new arrivals #zarahome", likes: "3.9K", comments: "61" },
      { date: "Aug 31", text: "Leather jackets and more #zara #zaraman #zaranewin", likes: "7.3K", comments: "95" },
      { date: "Aug 30", text: "Kids Collection. The new season starts now #zarakids", likes: "4.6K", comments: "52" },
      { date: "Aug 30", text: "TRF Collection Thank you to our models #zara #zarawoman #zaranewin", likes: "9.8K", comments: "145" },
      { date: "Aug 30", text: "The air heeled ballet flats isopresso_balloon #zara", likes: "11.1K", comments: "83" },
      { date: "Aug 29", text: "ZW Collection Thank you to our models #zara #zarawoman #zaranewin", likes: "9.4K", comments: "163" },
    ],
  },
];

function MiniArea({ kind }: { kind: "flat-purple" | "flat-green" | "flat-blue" | "rise" }) {
  const w = 308;
  if (kind === "rise")
    return (
      <svg width={w} height={28} className="block">
        <path d={`M0 27 L${w} 1 L${w} 28 L0 28Z`} fill="#fdefc6" />
        <path d={`M0 27 L${w} 1`} fill="none" stroke="#f5b400" strokeWidth={1.2} />
      </svg>
    );
  const color = kind === "flat-purple" ? "#c69be8" : kind === "flat-green" ? "#2fcf9f" : "#6167e6";
  return (
    <svg width={w} height={28} className="block">
      {kind === "flat-purple" && <rect x={0} y={14} width={w} height={14} fill="#f3e6fb" />}
      <path d={`M0 ${kind === "flat-purple" ? 14 : 27} H${w}`} stroke={color} strokeWidth={1.2} />
    </svg>
  );
}

function Stat({ label, value, info, chart }: { label: string; value: string; info?: boolean; chart: "flat-purple" | "flat-green" | "flat-blue" | "rise" }) {
  return (
    <div className="w-[334px]">
      <div className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-text">
        {label}
        {info && <InfoIcon width={16} height={16} className="text-rk-faint" />}
      </div>
      <div className="mt-[4px] text-[24px] leading-7 font-bold text-[#5c5cc4]">{value}</div>
      <div className="mt-[5px] pl-[2px]">
        <MiniArea kind={chart} />
      </div>
    </div>
  );
}

function Like() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="M1.5 7h2.5v7H1.5ZM4 13.5h6.8c.8 0 1.4-.5 1.6-1.2l1.3-4.3c.3-.9-.4-1.8-1.3-1.8H9l.6-2.6c.2-.9-.5-1.7-1.4-1.7L5 6.8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
    </svg>
  );
}

function Comment() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="M2 2.5h12v8.5H6L2.5 14V11H2Z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
    </svg>
  );
}

function Timeline({ filter }: { filter: string }) {
  const [more, setMore] = useState(false);
  const show = filter === "All updates" || filter === "Social Media";
  return (
    <SampleCard title="Timeline" bodyClassName="px-5 pt-[14px] pb-[21px]">
      {show ? (
        <>
          {posts.map((g) => (
            <div key={g.group}>
              <div className="relative flex h-[26px] items-center justify-center">
                <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#e6e7ea]" />
                <span className="relative rounded-full border border-[#e6e7ea] bg-white px-[8px] text-[12px] leading-[22px] text-rk-muted">{g.group}</span>
              </div>
              {(more ? [...g.items, ...g.items] : g.items).map((p, i) => (
                <div key={p.text + i} className="mt-[12px] h-[128px]">
                  <span className="inline-flex h-[22px] items-center rounded-full bg-[#fde3c8] px-[9px] text-[12px] text-[#a0561f]">Social Media</span>
                  <a href="https://www.instagram.com/zara/" target="_blank" rel="noreferrer" className="mt-[3px] block w-fit text-[16px] leading-6 font-bold text-rk-link hover:text-rk-link-hover">
                    Instagram post
                  </a>
                  <div className="mt-[3px] text-[14px] leading-5 text-rk-muted">{p.date}</div>
                  <div className="mt-[4px] text-[14px] leading-5 text-rk-text">{p.text}</div>
                  <div className="mt-[8px] flex items-center gap-[14px] text-[14px] text-rk-muted">
                    <span className="flex items-center gap-[4px]">
                      <Like />
                      {p.likes}
                    </span>
                    <span className="flex items-center gap-[4px]">
                      <Comment />
                      {p.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {!more && (
            <button type="button" onClick={() => setMore(true)} className="mt-[12px] border-b border-dashed border-rk-muted text-[14px] leading-5 text-rk-text-2 hover:text-rk-text">
              Show 10 more of 23
            </button>
          )}
        </>
      ) : (
        <div className="py-10 text-center text-[14px] text-rk-muted">No updates for the selected period</div>
      )}
    </SampleCard>
  );
}

function Sidebar({ active, onChange }: { active: string; onChange?: (v: string) => void }) {
  return (
    <aside className="w-[200px] shrink-0 self-start overflow-hidden rounded-lg bg-white pb-[4px] shadow-card">
      <button
        type="button"
        onClick={() => onChange?.("All updates")}
        className={`flex h-[43px] w-full items-center border-l-2 pl-[10px] text-[14px] font-medium text-rk-text ${active === "All updates" ? "border-rk-text bg-[#eaeefd]" : "border-transparent"}`}
      >
        All updates
      </button>
      <div className="mt-[2px] border-t border-[#eef0f2] pt-[3px]">
        {cats.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => onChange?.(c.label)}
            className={`flex h-9 w-full items-center justify-between border-l-2 pr-[12px] pl-[10px] text-[14px] font-medium ${active === c.label ? "border-rk-text bg-[#eaeefd]" : "border-transparent"} text-rk-text`}
          >
            {c.label}
            <span className="font-normal text-rk-muted">{c.n}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function Summary() {
  return (
    <section className="h-[239px] rounded-lg bg-white px-5 pt-[19px] shadow-card">
      <div className="flex">
        <Stat label="Google Search Ads" value="10" chart="flat-purple" />
        <Stat label="Blog Posts" value="0" chart="flat-green" />
        <Stat label="New Pages" value="0" info chart="flat-blue" />
      </div>
      <div className="mt-[26px] flex">
        <Stat label="Social Media Posts" value="72" chart="rise" />
        <Stat label="Social Media Engagement" value="433.6K" info chart="rise" />
      </div>
    </section>
  );
}

export function CompetitorMonitoringSample() {
  const [filter, setFilter] = useState("All updates");
  return (
    <TrafficFrame title="Competitor Monitoring" filters={filters} chips="select" domains={zaraOnly}>
      <div className="flex w-[1236px] gap-4">
        <Sidebar active={filter} onChange={setFilter} />
        <div className="flex flex-1 flex-col gap-4">
          <Summary />
          <Timeline filter={filter} />
        </div>
      </div>
    </TrafficFrame>
  );
}

export function CompetitorMonitoringLocked() {
  return (
    <TrafficFrame title="Competitor Monitoring" filters={filters} chips="select" locked bottomGap={116}>
      <div className="w-[1236px]">
        <LockedArea charge="$335.3" sampleHref={routes.traffic.competitorMonitoring}>
          <div className="flex gap-4">
            <Sidebar active="All updates" />
            <div className="flex flex-1 flex-col gap-4">
              <section className="h-[272px] rounded-lg bg-white px-5 pt-[20px] shadow-card">
                <div className="grid grid-cols-3 gap-y-[60px] text-[14px] text-rk-muted">
                  <span>Google Search Ads</span>
                  <span>Blog Posts</span>
                  <span>New Pages ⓘ</span>
                  <span>Social Media Posts</span>
                </div>
              </section>
              <SampleCard title="Timeline" bodyClassName="px-5 pt-[60px] pb-[60px]">
                <Skel w="100%" h={8} />
                <Skel w="100%" h={8} className="mt-[12px]" />
                <Skel w="100%" h={8} className="mt-[12px]" />
              </SampleCard>
            </div>
          </div>
        </LockedArea>
      </div>
    </TrafficFrame>
  );
}
