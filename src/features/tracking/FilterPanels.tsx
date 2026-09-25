"use client";

import { useState } from "react";
import { CheckIcon, PlusIcon } from "@/components/ui/icons";
import { ChevronBold, DiamondIcon, HotelIcon, PinIcon } from "./icons";
import { SerpFeatureIcon } from "./serpIcons";
import { Info } from "./ui";
import { project, serpFeatureBars } from "./data";

export function Radio({ on }: { on: boolean }) {
  return on ? (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-rk-text">
      <span className="h-[6px] w-[6px] rounded-full bg-white" />
    </span>
  ) : (
    <span className="h-[18px] w-[18px] shrink-0 rounded-full border border-[#d6d8dd] bg-white" />
  );
}

export function Box({ on }: { on: boolean }) {
  return (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${on ? "border-rk-text bg-rk-text" : "border-[#c4c7cf] bg-white"}`}>
      {on && <CheckIcon width={12} height={12} strokeWidth={2.4} className="text-white" />}
    </span>
  );
}

const serpModes = ["Feature on SERP", "Feature not on SERP", `${project.domain} ranks`, `${project.domain} doesn't rank`];

const serpFeatureNames = [
  "Featured snippet",
  "Local pack",
  "Hotels",
  "Knowledge panel",
  "AI Overview",
  "Related searches",
  "Reviews",
  "Instant answer",
  "Site links",
  "Video",
  "Featured video",
  "Top stories",
  "Things to know",
  "People also ask",
  "Image pack",
  "Carousel",
  "FAQ",
  "Ads top",
  "Jobs",
  "Shopping ads",
  "Short videos",
  "Discussions and forums",
  "Recent posts",
  "Video carousel",
];
const serpCounts: Record<number, number> = { 1: 4, 4: 74, 5: 83, 6: 22 };

function FeatureIcon({ i }: { i: number }) {
  if (i === 1) return <PinIcon width={20} height={20} className="shrink-0" />;
  if (i === 2) return <HotelIcon width={20} height={20} className="shrink-0" />;
  if (i === 4) return <DiamondIcon width={20} height={20} className="shrink-0" />;
  return <SerpFeatureIcon index={i} className="h-5 w-5 shrink-0" />;
}

export function SerpFilterPanel({ close }: { close: () => void }) {
  const [mode, setMode] = useState(0);
  return (
    <div className="relative h-[374px] w-[228px] overflow-y-auto overscroll-contain py-[4px] [scrollbar-width:none]">
      <span className="pointer-events-none sticky top-[3px] float-right -mb-[93px] mr-[1px] h-[93px] w-[4px] rounded-full bg-[#c4c7cf]" />
      {serpModes.map((m, i) => (
        <button key={m} type="button" onClick={() => setMode(i)} className="flex h-8 w-full items-center gap-2 px-2 text-left whitespace-nowrap text-[14px] text-rk-text hover:bg-rk-bg">
          <Radio on={mode === i} />
          {m}
          <Info className="-mt-[6px] -ml-[2px]" />
        </button>
      ))}
      <div className="mt-[4px] mb-[4px] mr-[8px] border-t border-rk-border" />
      {serpFeatureBars.map((b, i) => {
        const n = serpCounts[i] ?? (i < 7 ? 0 : b.tracking + b.notTracking);
        return (
          <button
            key={i}
            type="button"
            disabled={!n}
            onClick={close}
            className={`flex h-8 w-full items-center gap-[8px] pr-[8px] pl-[6px] text-left text-[14px] ${n ? "text-rk-text hover:bg-rk-bg" : "text-[#c4c7cf]"}`}
          >
            <FeatureIcon i={i} />
            <span className="flex-1">{serpFeatureNames[i]}</span>
            <span className={n ? "text-rk-text-2" : ""}>{n}</span>
          </button>
        );
      })}
    </div>
  );
}

const intents = ["Informational", "Transactional", "Navigational", "Commercial"];

export function IntentPanel({ close }: { close: () => void }) {
  const [on, setOn] = useState<string[]>([]);
  return (
    <div className="w-[149px] px-2 pt-[3px] pb-[9px]">
      {intents.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setOn(on.includes(t) ? on.filter((v) => v !== t) : [...on, t])}
          className="flex h-[33.5px] w-full items-center gap-2 text-left text-[14px] text-rk-text"
        >
          <Box on={on.includes(t)} />
          {t}
          <Info className="-mt-[6px] -ml-[4px]" />
        </button>
      ))}
      <button type="button" onClick={close} className="mt-[11px] h-7 w-full rounded-md bg-rk-btn-dark text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
        Apply
      </button>
    </div>
  );
}

const volumes = ["10,001+", "1,001 – 10,000", "101 – 1,000", "11 – 100", "0 – 10"];

export function VolumePanel({ close }: { close: () => void }) {
  return (
    <div className="w-[180px] pt-[4px] pb-[9px]">
      {volumes.map((v) => (
        <button key={v} type="button" onClick={close} className="flex h-8 w-full items-center px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg">
          {v}
        </button>
      ))}
      <div className="mt-[4px] border-t border-rk-border" />
      <div className="mt-[9px] px-3 text-[14px] leading-5 font-semibold text-rk-text">Custom range</div>
      <div className="mt-[12px] flex px-3">
        <input placeholder="From" className="h-[27px] w-[78px] rounded-l-md border border-rk-border-strong px-2 text-[14px] outline-none placeholder:text-[#a9abb6] focus:border-[#8e9ff0]" />
        <input placeholder="To" className="-ml-px h-[27px] w-[79px] rounded-r-md border border-rk-border-strong px-2 text-[14px] outline-none placeholder:text-[#a9abb6] focus:border-[#8e9ff0]" />
      </div>
      <div className="px-3">
        <button type="button" onClick={close} className="mt-[8px] h-7 w-full rounded-md bg-rk-btn-dark text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          Apply
        </button>
      </div>
    </div>
  );
}

function FakeSelect({ label, w }: { label: string; w: number }) {
  return (
    <button type="button" style={{ width: w }} className="flex h-7 items-center justify-between rounded-md border border-rk-border-strong bg-white pr-[7px] pl-2 text-[14px] text-rk-text hover:bg-rk-bg">
      {label}
      <ChevronBold width={16} height={16} />
    </button>
  );
}

export function AdvancedPanel({ close }: { close: () => void }) {
  return (
    <div className="w-[642px]">
      <div className="flex gap-2 px-4 pt-4">
        <FakeSelect label="Exclude" w={137} />
        <FakeSelect label="Keyword" w={138} />
        <FakeSelect label="Containing" w={137} />
        <input className="ml-px h-7 w-[149px] rounded-md border border-rk-border-strong px-2 text-[14px] outline-none focus:border-[#8e9ff0]" />
      </div>
      <button type="button" className="mt-[20px] ml-[26px] flex items-center gap-[9px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
        <PlusIcon width={14} height={14} strokeWidth={2} />
        Add condition
      </button>
      <div className="mt-[19px] border-t border-rk-border" />
      <div className="px-4 pt-[17px] pb-[16px]">
        <button type="button" onClick={close} className="h-7 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          Apply
        </button>
      </div>
    </div>
  );
}
