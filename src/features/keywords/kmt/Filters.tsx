"use client";

import { useState, type ReactNode } from "react";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { ApplyButton, Check, ChevronDownSm, Drop, ItalicInfo } from "./ui";
import { intentInfo, kdRanges, kmtLanguages, volumeRanges, type Currency } from "./data";

const inputCls = "h-7 w-full border border-rk-border-strong bg-white px-2 text-[14px] outline-none placeholder:text-rk-faint focus:border-[#7a86f2]";

function RangeInputs({ className = "w-[134px]" }: { className?: string }) {
  return (
    <div className={`flex ${className}`}>
      <input placeholder="From" className={`${inputCls} min-w-0 rounded-l-md`} />
      <input placeholder="To" className={`${inputCls} -ml-px min-w-0 rounded-r-md`} />
    </div>
  );
}

function FilterButton({ label, open, toggle }: { label: string; open: boolean; toggle: () => void }) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-expanded={open}
      className={`flex h-7 items-center gap-[7.5px] rounded-md border bg-white px-2 text-[14px] text-[#a0a2aa] ${open ? "border-[#9ea6f5]" : "border-rk-border hover:border-rk-border-strong"}`}
    >
      {label}
      <ChevronDownSm />
    </button>
  );
}

function FilterDrop({ label, width, children }: { label: string; width: number; children: (close: () => void) => ReactNode }) {
  return (
    <Drop panelStyle={{ top: "calc(100% + 4px)", left: 0, width }} trigger={({ open, toggle }) => <FilterButton label={label} open={open} toggle={toggle} />}>
      {children}
    </Drop>
  );
}

function CustomRange({ close, pad }: { close: () => void; pad: string }) {
  return (
    <div className={pad}>
      <div className="text-[14px] leading-5 font-semibold">Custom range</div>
      <RangeInputs className="mt-[10px] w-full" />
      <ApplyButton onClick={close} className="mt-2 w-full" />
    </div>
  );
}

function RangeFilter({ label, items }: { label: string; items: string[] }) {
  return (
    <FilterDrop label={label} width={193}>
      {(close) => (
        <>
          <div className="py-1">
            {items.map((i) => (
              <MenuItem key={i} onClick={close} className="px-[9px]">
                {i}
              </MenuItem>
            ))}
          </div>
          <div className="border-t border-rk-border">
            <CustomRange close={close} pad="px-[10px] pt-[10px] pb-2" />
          </div>
        </>
      )}
    </FilterDrop>
  );
}

function KdFilter() {
  return (
    <FilterDrop label="KD %" width={193}>
      {(close) => (
        <>
          <div className="py-1">
            {kdRanges.map((k) => (
              <MenuItem key={k.name} onClick={close} className="px-[9px]">
                <span className="flex w-full items-center">
                  {k.name}
                  <ItalicInfo className="ml-[6px] text-rk-faint" />
                  <span className="ml-auto text-rk-text-2">{k.range}</span>
                </span>
              </MenuItem>
            ))}
          </div>
          <div className="border-t border-rk-border">
            <CustomRange close={close} pad="px-[10px] pt-[10px] pb-2" />
          </div>
        </>
      )}
    </FilterDrop>
  );
}

function IntentFilter() {
  const [sel, setSel] = useState<string[]>([]);
  return (
    <FilterDrop label="Intent" width={203}>
      {(close) => (
        <>
          <div className="py-1">
            {Object.values(intentInfo).map((i) => (
              <label key={i.name} className="flex h-8 cursor-pointer items-center gap-2 px-2 text-[14px] hover:bg-rk-bg">
                <Check checked={sel.includes(i.name)} onChange={() => setSel((s) => (s.includes(i.name) ? s.filter((x) => x !== i.name) : [...s, i.name]))} label={i.name} />
                {i.name}
                <ItalicInfo />
              </label>
            ))}
          </div>
          <div className="px-[9px] pt-[5px] pb-[9px]">
            <ApplyButton onClick={close} className="w-full" />
          </div>
        </>
      )}
    </FilterDrop>
  );
}

function KeywordsFilter({ label, include }: { label: string; include?: boolean }) {
  const [mode, setMode] = useState<"all" | "any">("all");
  const [text, setText] = useState("");
  return (
    <FilterDrop label={label} width={344}>
      {(close) => (
        <div className="px-4 pt-[17px] pb-4">
          <p className="text-[14px] leading-5 text-rk-text">
            Enter keywords separated by commas or one per line. For exact matches, enter your keyword with square brackets around it.
          </p>
          {include && (
            <div className="mt-4 flex h-5 items-center gap-4 text-[14px]">
              {(["all", "any"] as const).map((m) => (
                <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)} className="flex items-center gap-2">
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${mode === m ? "border-rk-btn-dark bg-rk-btn-dark" : "border-[#d1d3da] bg-white"}`}>
                    {mode === m && <span className="h-[6px] w-[6px] rounded-full bg-white" />}
                  </span>
                  {m === "all" ? "All keywords" : "Any keywords"}
                </button>
              ))}
            </div>
          )}
          <div className={`relative ${include ? "mt-[14px]" : "mt-3"}`}>
            {!text && <span className="pointer-events-none absolute top-[7px] left-[10px] text-[14px] leading-5 text-[#c4c7cf]">1.</span>}
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Keyword - Broad match\n[Keyword] - Exact match"}
              className="block h-[104px] w-full resize-none rounded-md border border-rk-border-strong py-[7px] pr-2 pl-[25px] text-[14px] leading-5 outline-none placeholder:text-[#c4c7cf] focus:border-[#8e97de] focus:shadow-[inset_0_0_0_2px_rgba(142,151,222,0.7)]"
            />
          </div>
          <div className="mt-5 flex gap-2">
            <ApplyButton onClick={close} />
            <button
              type="button"
              disabled={!text}
              onClick={() => setText("")}
              className="h-7 rounded-md border border-[#d6d7db] bg-[#f9f9fa] px-2 text-[14px] text-[#85878f] enabled:text-rk-text-2 enabled:hover:bg-rk-hover"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </FilterDrop>
  );
}

function AdvancedFilters() {
  return (
    <Popover
      align="right"
      offset={6}
      panelClassName="w-[592px] px-4 pt-4 pb-[18px]"
      trigger={({ open, toggle }) => <FilterButton label="Advanced filters" open={open} toggle={toggle} />}
    >
      {(close) => (
        <>
          <div className="flex gap-2">
            {["Word count", "Competitive Density"].map((l) => (
              <div key={l}>
                <div className="text-[14px] leading-5">{l}</div>
                <RangeInputs className="mt-[6px] w-[134px]" />
              </div>
            ))}
            <div>
              <div className="text-[14px] leading-5">SERP Features</div>
              <button type="button" className="mt-[6px] flex h-7 w-[134px] items-center justify-between rounded-md border border-rk-border-strong bg-white px-2 text-[14px] text-rk-faint">
                Any
                <ChevronDownSm />
              </button>
            </div>
            <div>
              <div className="text-[14px] leading-5">Results in SERP</div>
              <RangeInputs className="mt-[6px] w-[134px]" />
            </div>
          </div>
          <div className="mt-[10px] flex gap-2">
            <button type="button" onClick={close} className="h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
              Apply
            </button>
            <button type="button" onClick={close} className="h-7 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
              Clear all fields
            </button>
          </div>
        </>
      )}
    </Popover>
  );
}

export function Filters({ currency = "USD" }: { currency?: Currency }) {
  return (
    <div className="flex items-center gap-2">
      <RangeFilter label="Volume" items={volumeRanges} />
      <KdFilter />
      <IntentFilter />
      <FilterDrop label={`CPC (${currency})`} width={192}>
        {(close) => <CustomRange close={close} pad="px-[9px] pt-[6px] pb-2" />}
      </FilterDrop>
      <KeywordsFilter label="Include keywords" include />
      <KeywordsFilter label="Exclude keywords" />
      <AdvancedFilters />
    </div>
  );
}

export function LangSelect() {
  const [sel, setSel] = useState<string[]>([]);
  return (
    <FilterDrop label="Languages" width={199}>
      {(close) => (
        <>
          <div className="relative">
            <div className="max-h-[212px] overflow-y-auto pt-[5px] [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:[border-width:0_2px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-[#cfd1d6] [&::-webkit-scrollbar-thumb]:bg-clip-padding">
              {kmtLanguages.map((l) => (
                <label key={l} className="flex h-8 cursor-pointer items-center gap-2 px-2 text-[14px] hover:bg-rk-bg">
                  <Check checked={sel.includes(l)} onChange={() => setSel((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))} label={l} />
                  {l}
                </label>
              ))}
            </div>
            <span className="pointer-events-none absolute right-2 bottom-0 left-0 h-6 bg-gradient-to-t from-white to-white/0" />
          </div>
          <div className="px-[9px] pt-[16px] pb-[8px]">
            <ApplyButton onClick={close} className="w-full" />
          </div>
        </>
      )}
    </FilterDrop>
  );
}
