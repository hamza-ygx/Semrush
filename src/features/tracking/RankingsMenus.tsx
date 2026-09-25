"use client";

import { useState, type ReactNode } from "react";
import { Popover } from "@/components/ui/Popover";
import { GearIcon } from "@/components/ui/icons";
import { Box, Radio } from "./FilterPanels";
import { ChevronBold, DiamondIcon, SparkleIcon } from "./icons";
import { GrayButton } from "./ui";

const item = "flex h-8 w-full items-center px-2 text-left text-[14px] whitespace-nowrap text-rk-text hover:bg-rk-bg";

export function ActionsMenu() {
  return (
    <Popover
      offset={4}
      className="[&>div:last-child]:-left-px"
      panelClassName="w-[229px] !py-0 overflow-hidden"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          data-testid="pt-actions"
          className={`inline-flex h-7 items-center rounded-md border border-rk-border-strong px-[9px] text-[14px] whitespace-nowrap text-rk-text-2 hover:bg-rk-hover ${open ? "bg-[#e6e7ec]" : "bg-[#f4f5f9]"}`}
        >
          Actions
        </button>
      )}
    >
      <div className="border-b border-[#f1e6c4] bg-[#fff8e2] px-2 pt-[12px] pb-[13px] text-[14px] leading-5 text-rk-text">
        <div className="font-semibold">No keywords selected</div>
        <div className="mt-[4px]">Select keywords from the table below to perform actions.</div>
      </div>
      <div className="pt-[2px] pb-[4px]">
        {["Remove keywords", "Add tag"].map((t) => (
          <button key={t} type="button" disabled className={`${item} !text-[#a9abb6] hover:!bg-transparent`}>
            {t}
          </button>
        ))}
      </div>
    </Popover>
  );
}

const potOptions = ["Potential Traffic", "Potential Position", "Potential Visibility"] as const;
export type PotMetric = (typeof potOptions)[number] | "Hide";
export const potShort: Record<PotMetric, string> = {
  "Potential Traffic": "Pot. Traffic",
  "Potential Position": "Pot. Position",
  "Potential Visibility": "Pot. Visibility",
  Hide: "Show Potential",
};

export function PotMetricSelect({ value, onChange, className = "" }: { value: PotMetric; onChange: (v: PotMetric) => void; className?: string }) {
  return (
    <Popover
      offset={5}
      className={`[&>div:last-child]:left-px ${className}`}
      panelClassName="w-[146px] !pt-[4px] !pb-[4px]"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          data-testid="pt-pot-metric"
          className={`flex h-7 items-center gap-[6px] rounded-md border bg-white pr-[7px] pl-[8px] text-[14px] whitespace-nowrap text-rk-text hover:bg-rk-bg ${open ? "border-[#8e9ff0]" : "border-rk-border-strong"}`}
        >
          <SparkleIcon width={18} height={18} />
          <span className="flex-1 text-left">{potShort[value]}</span>
          <ChevronBold width={16} height={16} />
        </button>
      )}
    >
      {(close) => (
        <>
          {potOptions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                close();
              }}
              className={`${item} border-l-2 !pl-[6px] ${o === value ? "border-[#484a54] bg-[#ebf0ff]" : "border-transparent"}`}
            >
              {o}
            </button>
          ))}
          <div className="my-1 border-t border-rk-border" />
          <button
            type="button"
            onClick={() => {
              onChange("Hide");
              close();
            }}
            className={item}
          >
            Hide Potential
          </button>
        </>
      )}
    </Popover>
  );
}

function Section({ title, children, first }: { title: string; children: ReactNode; first?: boolean }) {
  return (
    <div className={first ? "" : "mt-[4px] border-t border-rk-border pt-[4px]"}>
      <div className="flex h-8 items-center px-2 text-[14px] font-semibold text-rk-text">{title}</div>
      {children}
    </div>
  );
}

function CheckRow({ label }: { label: string }) {
  const [on, setOn] = useState(true);
  return (
    <button type="button" onClick={() => setOn(!on)} className={`${item} gap-2`}>
      <Box on={on} />
      {label}
    </button>
  );
}

export function TableSettingsMenu() {
  const [height, setHeight] = useState<"Normal" | "Compact">("Normal");
  return (
    <Popover
      align="right"
      offset={7}
      panelClassName="w-[222px] !pt-[3px] !pb-[12px]"
      trigger={({ toggle, open }) => (
        <span data-testid="pt-table-settings" onClick={toggle} className="inline-flex">
          <GrayButton className={`h-[27px] ${open ? "!bg-[#e6e7ec]" : "bg-white"}`}>
            <GearIcon />
            Table settings
          </GrayButton>
        </span>
      )}
    >
      {(close) => (
        <>
          <Section title="Columns" first>
            {["Intent", "SERP", "SERP features", "KD %", "Position on the start date", "Volume", "CPC"].map((t) => (
              <CheckRow key={t} label={t} />
            ))}
          </Section>
          <Section title="Additional">
            {["Show tags in keywords", "SERP feature icons in ranks"].map((t) => (
              <CheckRow key={t} label={t} />
            ))}
          </Section>
          <Section title="Positions Chart">
            <CheckRow label="Smart zoom" />
          </Section>
          <Section title="Row height">
            {(["Normal", "Compact"] as const).map((h) => (
              <button key={h} type="button" onClick={() => setHeight(h)} className={`${item} gap-2`}>
                <Radio on={height === h} />
                {h}
              </button>
            ))}
          </Section>
          <button type="button" onClick={close} className="mt-[12px] ml-2 h-7 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-medium text-white hover:bg-[#2b2e38]">
            Apply to all projects
          </button>
        </>
      )}
    </Popover>
  );
}

const onSerpIcons: Record<string, ReactNode> = {
  "People also ask": (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="M2.5 2.5h11v8.5H6l-3.5 3z" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M6.6 5.4a1.4 1.4 0 1 1 1.9 1.3c-.4.2-.5.4-.5.8" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
      <circle cx="8" cy="9.3" r=".8" fill="currentColor" />
    </svg>
  ),
  "Site link": (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="M6.5 5H5a3 3 0 0 0 0 6h1.5M9.5 5H11a3 3 0 0 1 0 6H9.5M5.5 8h5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  ),
  "Related searches": (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="M1.5 3h3M1.5 6.3h3M1.5 9.7h3M1.5 13h3M6.5 3h8M6.5 6.3h8M6.5 9.7h8M6.5 13h8" fill="none" stroke="currentColor" strokeWidth={1.6} />
    </svg>
  ),
  "AI Overview": <DiamondIcon width={16} height={16} />,
};

export function SfCount({ n, features }: { n: number; features: string[] }) {
  return (
    <Popover
      offset={7}
      className="[&>div:last-child]:-left-[8px]"
      panelClassName="w-[154px] !pt-[8px] !pb-[4px]"
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} data-testid="pt-sf-count" data-open={open || undefined} className="dotted-underline text-rk-muted [text-underline-offset:3px] hover:text-rk-text">
          {n}
        </button>
      )}
    >
      <div className="flex h-6 items-center px-2 text-[14px] font-semibold text-rk-text">On SERP</div>
      <div className="mt-[4px]">
        {features.map((f) => (
          <div key={f} className="flex h-8 items-center gap-2 px-2 text-[14px] whitespace-nowrap text-rk-text">
            <span className="text-rk-text-2">{onSerpIcons[f] ?? <DiamondIcon width={16} height={16} />}</span>
            {f}
          </div>
        ))}
      </div>
    </Popover>
  );
}
