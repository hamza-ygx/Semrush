"use client";

import { useState } from "react";
import { ExternalIcon } from "@/components/ui/icons";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { routes } from "@/config/routes";
import { GroupedBars, TrafficLineChart, TrendingCards, type TrendingPage } from "../charts";
import { RobotIcon, SparkleIcon } from "../icons";
import { LockedArea } from "../Paywall";
import { TrafficFrame, type TrafficFilter } from "../TrafficFrame";
import { DomainLegend, DomainSwitch, OutlineButton, SampleCard, SegTabs } from "../ui";
import { ser } from "./channelData";

const K = 1e3;
const aiSources = ["ChatGPT", "Gemini", "Claude", "Perplexity", "Grok"] as const;

const filtersFor = (value: string): TrafficFilter[] => [
  "geo",
  "date",
  "device",
  {
    key: "ai",
    value,
    icon: <RobotIcon />,
    options: [value, "ChatGPT", "Gemini", "Claude", "Perplexity", "Grok"].filter((v, i, a) => a.indexOf(v) === i),
    suffix: <SparkleIcon className="-ml-[1px] text-[#a24cf0]" />,
  },
];

const dist = ser([50, 8, 3, 3, 3], [195, 6, 3, 3, 3], [197, 4, 3, 3, 3], K);

const trend: Record<string, ReturnType<typeof ser>> = {
  ChatGPT: ser([17, 23, 31, 35, 50, 54, 52], [73, 40, 79, 67, 67, 192, 170], [48, 48, 67, 87, 98, 200, 158], K),
  Gemini: ser([3, 4, 5, 6, 7, 8, 8], [2, 3, 3, 4, 5, 6, 6], [2, 2, 3, 3, 4, 4, 4], K),
  Claude: ser([1, 1.5, 2, 2.4, 2.8, 3, 3.1], [1, 1.2, 1.8, 2.2, 2.6, 3, 3.2], [0.8, 1.1, 1.6, 2, 2.6, 3, 3], K),
  Perplexity: ser([2, 2.2, 2.5, 2.6, 2.8, 3, 3], [1.5, 1.9, 2.3, 2.6, 2.8, 3, 3.1], [1.6, 1.8, 2.1, 2.4, 2.9, 3, 3.2], K),
  Grok: ser([0.5, 0.8, 1.4, 2, 2.6, 3, 3.2], [0.4, 0.9, 1.3, 1.9, 2.4, 3, 3.1], [0.5, 0.7, 1.2, 1.8, 2.5, 3, 3.3], K),
};

const ticksFor = (s: string) => (s === "ChatGPT" ? [0, 100 * K, 200 * K, 300 * K] : s === "Gemini" ? [0, 5 * K, 10 * K] : [0, 2 * K, 4 * K]);

const growing: TrendingPage[] = [
  { kind: "Spiked", pct: "255.77%", url: "zara.com/nl/n...owtoreturn", value: "370" },
  { kind: "Trending up", pct: "128.78%", url: "zara.com/us", value: "318" },
  { kind: "Trending up", pct: "37.25%", url: "zara.com/pt", value: "70" },
  { kind: "Trending up", pct: "26.6%", url: "zara.com/tr/tr/k...l1114.html", value: "119" },
  { kind: "Trending up", pct: "21.4%", url: "zara.com/es/en", value: "96" },
];

const sources: { name: string; cat: "icon" | "none"; split: [number, number, number] }[] = [
  { name: "chatgpt.com", cat: "icon", split: [12, 44, 44] },
  { name: "gemini.google.com", cat: "icon", split: [44, 33, 23] },
  { name: "claude.ai", cat: "icon", split: [27, 29, 44] },
  { name: "perplexity.ai", cat: "none", split: [21, 17, 62] },
  { name: "grok.com", cat: "none", split: [47, 15, 38] },
  { name: "l.meta.ai", cat: "none", split: [0, 0, 100] },
  { name: "deepseek.com", cat: "icon", split: [100, 0, 0] },
  { name: "chat.deepseek.com", cat: "none", split: [100, 0, 0] },
  { name: "copilot.microsoft.com", cat: "none", split: [0, 52, 48] },
  { name: "poe.com", cat: "none", split: [100, 0, 0] },
];

function CatIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-faint">
      <path d="M5.5 2h5v4h-5ZM1.5 10h5v4h-5ZM9.5 10h5v4h-5ZM8 6v2M4 10V8h8v2" fill="none" stroke="currentColor" strokeWidth={1.3} />
    </svg>
  );
}

function hide(v: Record<string, boolean>) {
  return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, !x]));
}

function DistributionCard() {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  return (
    <SampleCard title="Traffic Distribution" bodyClassName="px-5 pt-[35px] pb-[21px]">
      <GroupedBars width={1196} plotLeft={81} plotHeight={152} ticks={[0, 100 * K, 200 * K, 300 * K, 400 * K]} groups={[...aiSources]} series={dist} hidden={hidden} barWidth={45} barGap={5} labelColor="#6c6e79" />
      <DomainLegend className="mt-[19px]" onChange={(v) => setHidden(hide(v))} />
      <OutlineButton className="mt-[20px]">View all sources</OutlineButton>
    </SampleCard>
  );
}

function TrendCard() {
  const [tab, setTab] = useState<string>("ChatGPT");
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  return (
    <SampleCard title="Traffic Trend" bodyClassName="px-5 pt-[22px] pb-[21px]">
      <SegTabs items={aiSources} onChange={setTab} />
      <div className="mt-[16px]">
        <TrafficLineChart width={1196} plotLeft={50} plotHeight={156} ticks={ticksFor(tab)} series={trend[tab]} hidden={hidden} />
      </div>
      <DomainLegend className="mt-[10px]" onChange={(v) => setHidden(hide(v))} />
    </SampleCard>
  );
}

function CategorySelect() {
  return (
    <Popover
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className="flex h-7 items-center gap-[8px] rounded-[6px] border border-[#d7d9de] bg-white px-[8px] text-[14px] text-rk-muted hover:bg-rk-bg">
          Category
          <svg viewBox="0 0 16 16" width={14} height={14} className={`text-rk-text ${open ? "rotate-180" : ""}`}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      panelClassName="min-w-[180px]"
    >
      {(close) =>
        ["AI Assistants", "AI Search", "No category"].map((c) => (
          <MenuItem key={c} onClick={close}>
            {c}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function AllSources() {
  const colors = ["#5d62de", "#2ee6b1", "#bd87f9"];
  return (
    <SampleCard title="All Sources" bodyClassName="pt-[21px] pb-[20px]">
      <div className="px-5">
        <CategorySelect />
      </div>
      <div className="mt-[20px] overflow-x-clip">
        <table className="w-[1088px] table-fixed text-[14px] leading-5">
          <colgroup>
            <col />
            <col className="w-[106px]" />
            <col className="w-[210px]" />
          </colgroup>
          <thead className="sticky top-[43px] z-20">
            <tr className="h-[40px] bg-[#f9f9f9] text-[12px] text-rk-text">
              <th className="pl-3 text-left font-normal">Source</th>
              <th className="pl-3 text-left font-normal">Category</th>
              <th className="pr-3 text-right font-normal whitespace-nowrap">Group Traffic Split</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.name} className="h-[45px] border-b border-[#eef0f2]">
                <td className="pl-3">
                  <span className="flex items-center gap-[6px] text-rk-text">
                    {s.name}
                    <ExternalIcon width={15} height={15} className="text-rk-faint" />
                  </span>
                </td>
                <td className="pl-3 text-rk-muted">{s.cat === "icon" ? <CatIcon /> : "No category"}</td>
                <td className="pl-3">
                  <span className="flex h-[8px] w-[186px] overflow-hidden rounded-[2px]">
                    {s.split.map((w, i) => (w ? <span key={i} style={{ width: `${w}%`, background: colors[i] }} /> : null))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SampleCard>
  );
}

export function AiTrafficSample() {
  const [src, setSrc] = useState<string>("ChatGPT");
  return (
    <TrafficFrame title="AI Traffic" filters={filtersFor("ChatGPT, Gemini, Claude, Perplexity, Grok")}>
      <div className="flex w-[1236px] flex-col gap-4">
        <DistributionCard />
        <TrendCard />
        <SampleCard title="Top Growing Pages" info bodyClassName="px-5 pt-[21px] pb-[21px]">
          <div className="flex items-center gap-[20px]">
            <SegTabs items={aiSources} onChange={setSrc} />
            <DomainSwitch />
          </div>
          <div className="mt-[21px]" data-source={src}>
            <TrendingCards pages={growing} />
          </div>
        </SampleCard>
        <AllSources />
      </div>
    </TrafficFrame>
  );
}

export function AiTrafficLocked() {
  return (
    <TrafficFrame title="AI Traffic" filters={filtersFor("n/a")} locked bottomGap={116}>
      <div className="w-[1236px]">
        <LockedArea charge="$335.29" sampleHref={routes.traffic.aiTraffic}>
          <div className="flex flex-col gap-4">
            <SampleCard title="Traffic Distribution" bodyClassName="px-5 pt-[140px] pb-[30px]">
              <div className="flex items-end gap-[18px] pl-[10px]">
                {Array.from({ length: 36 }).map((_, i) => (
                  <span key={i} className="w-[12px] bg-[#d7d9de]" style={{ height: [70, 110, 60, 90, 100, 80, 66, 110, 70][i % 9] }} />
                ))}
              </div>
            </SampleCard>
            <SampleCard title="Traffic Trend" bodyClassName="h-[300px]" />
            <SampleCard title="Top Growing Pages" bodyClassName="h-[220px]" />
          </div>
        </LockedArea>
      </div>
    </TrafficFrame>
  );
}
