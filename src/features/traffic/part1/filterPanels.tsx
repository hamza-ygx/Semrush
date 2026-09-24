"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, SearchIcon } from "@/components/ui/icons";
import { ClockSmall, DevicesIcon, MonitorIcon, PhoneIcon, WorldFilledIcon } from "../icons";
import { Flag } from "./flags";

const countries: [string, string][] = [
  ["US", "United States"],
  ["UK", "United Kingdom"],
  ["IT", "Italy"],
  ["FR", "France"],
  ["DE", "Germany"],
  ["AF", "Afghanistan"],
  ["AL", "Albania"],
  ["DZ", "Algeria"],
  ["AR", "Argentina"],
  ["AM", "Armenia"],
  ["AU", "Australia"],
  ["AT", "Austria"],
  ["BD", "Bangladesh"],
  ["BE", "Belgium"],
  ["BR", "Brazil"],
  ["BG", "Bulgaria"],
  ["CA", "Canada"],
  ["CL", "Chile"],
  ["CN", "China"],
  ["CO", "Colombia"],
  ["HR", "Croatia"],
  ["CZ", "Czechia"],
  ["DK", "Denmark"],
  ["EG", "Egypt"],
  ["EE", "Estonia"],
  ["FI", "Finland"],
  ["GR", "Greece"],
  ["HU", "Hungary"],
  ["IN", "India"],
  ["ID", "Indonesia"],
  ["IE", "Ireland"],
  ["LT", "Lithuania"],
  ["MX", "Mexico"],
  ["NL", "Netherlands"],
  ["NG", "Nigeria"],
  ["PE", "Peru"],
  ["PL", "Poland"],
  ["RO", "Romania"],
  ["SE", "Sweden"],
  ["UA", "Ukraine"],
];

const regions = ["Africa", "Asia", "Europe", "Latin America", "Middle East", "North America", "Oceania", "European Union", "Nordics", "DACH"];

const panel = "absolute z-50 rounded-[6px] bg-white shadow-popover";
const itemBase = "flex h-8 w-full items-center text-left text-[14px] leading-5 text-rk-text";
const activeItem = "bg-[#ecf0ff] shadow-[inset_2px_0_0_#191b23]";

export function GeoPanel({ value, onApply }: { value: string; onApply: (v: string) => void }) {
  const [tab, setTab] = useState<"Countries" | "Regions">("Countries");
  const [q, setQ] = useState("");
  const [multi, setMulti] = useState(true);
  const [picked, setPicked] = useState<string[]>([]);
  const [single, setSingle] = useState(value);
  const names = tab === "Countries" ? countries : regions.map((r) => ["", r] as [string, string]);
  const shown = names.filter(([, n]) => n.toLowerCase().includes(q.trim().toLowerCase()));
  const toggle = (n: string) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const apply = () => onApply(multi && picked.length ? (picked.length === 1 ? picked[0] : `${picked.length} locations`) : single);
  return (
    <div data-testid="traffic-geo-panel" className={`${panel} top-[28px] left-0 w-[320px]`}>
      <label className="flex h-9 items-center gap-[8px] rounded-[6px] border-2 border-[#8b8fdd] bg-white pr-2 pl-[8px]">
        <SearchIcon width={16} height={16} className="shrink-0 text-[#a1a3aa]" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tab === "Countries" ? "Enter country" : "Enter region"}
          className="w-full bg-transparent text-[14px] leading-5 text-rk-text outline-none placeholder:text-[#a1a3aa]"
        />
      </label>
      <div className="mx-[2px] flex h-[35px]">
        {(["Countries", "Regions"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex flex-1 justify-center pt-[9px] text-[14px] leading-5 font-medium text-rk-text ${t === tab ? "shadow-[inset_0_-2px_0_#8e94d8]" : "shadow-[inset_0_-1px_0_#e5e7e8]"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-[4px] mb-[8px] ml-px h-[258px] overflow-y-auto [&::-webkit-scrollbar]:w-[9px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-y-0 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-[#c5cbd5] [&::-webkit-scrollbar-thumb]:bg-clip-padding">
        {!q && (
          <button
            type="button"
            onClick={() => {
              setSingle("Worldwide");
              setPicked([]);
            }}
            className={`${itemBase} gap-[7px] border-b border-[#e3e8ef] pl-[9px] ${single === "Worldwide" && !picked.length ? activeItem : "hover:bg-rk-bg"}`}
          >
            <WorldFilledIcon className="text-[#191b23]" />
            Worldwide
          </button>
        )}
        {tab === "Countries" && !q && (
          <button type="button" onClick={() => setMulti((m) => !m)} className="flex h-8 w-full items-center gap-[8px] pl-[8px] text-[12px] leading-4 text-rk-text">
            <span className={`relative h-3 w-5 rounded-full ${multi ? "bg-[#00a47e]" : "bg-[#c4c7cf]"}`}>
              <span className={`absolute top-[2px] h-2 w-2 rounded-full bg-white ${multi ? "left-[10px]" : "left-[2px]"}`} />
            </span>
            Select multiple
          </button>
        )}
        {shown.map(([code, n]) => {
          const on = multi ? picked.includes(n) : single === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => (multi ? toggle(n) : setSingle(n))}
              className={`${itemBase} gap-[12px] pl-[8px] ${!multi && on ? activeItem : "hover:bg-rk-bg"}`}
            >
              {multi && (
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border ${on ? "border-[#2359d6] bg-[#2359d6]" : "border-[#dcdede] bg-white"}`}>
                  {on && (
                    <svg viewBox="0 0 16 16" width={12} height={12}>
                      <path d="m3.5 8.3 3 3 6-6.3" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              )}
              {code && <Flag code={code} />}
              <span className="-ml-[4px] truncate">{n}</span>
            </button>
          );
        })}
        {!shown.length && <div className="px-[8px] py-[6px] text-[14px] leading-5 text-rk-muted">Nothing found</div>}
      </div>
      <div className="border-t-2 border-[#f0f0f0] px-[8px] pt-[12px] pb-[11px]">
        <button type="button" onClick={apply} className="h-7 w-full rounded-[6px] bg-rk-btn-dark text-[14px] leading-5 font-semibold text-white hover:bg-black">
          Apply
        </button>
      </div>
    </div>
  );
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const presets = ["Last 1 month", "Last 3 months", "Last 6 months", "Current year", "Last 1 year", "Last 2 years"];
const LAST = { y: 2026, m: 7 };

function MonthGrid({ year, sel, onPick }: { year: number; sel: { y: number; m: number }; onPick: (m: number) => void }) {
  return (
    <div className="grid w-[180px] grid-cols-3 gap-y-[12px]">
      {monthNames.map((n, m) => {
        const after = year > LAST.y || (year === LAST.y && m > LAST.m);
        const partial = year === LAST.y && m === LAST.m + 1;
        const active = sel.y === year && sel.m === m;
        if (partial)
          return (
            <span key={n} className="flex h-8 items-center justify-center gap-[5px] rounded-[6px] border border-[#ececec] text-[14px] leading-5 text-[#b7b8bd]">
              {n}
              <ClockSmall width={15} height={15} className="text-[#c4c5ca]" />
            </span>
          );
        return (
          <button
            key={n}
            type="button"
            disabled={after}
            onClick={() => onPick(m)}
            className={`flex h-8 items-center justify-center rounded-[6px] text-[14px] leading-5 ${active ? "bg-[#767fe8] text-white" : after ? "text-[#b7b8bd]" : "text-rk-text hover:bg-rk-bg"}`}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

export function MonthRangePanel({ value, onApply }: { value: string; onApply: (v: string) => void }) {
  const init = (() => {
    const [mn, yr] = value.split(" ");
    const m = monthNames.indexOf(mn);
    return m >= 0 && +yr ? { y: +yr, m } : LAST;
  })();
  const [sel, setSel] = useState(init);
  const [preset, setPreset] = useState<string | null>("Last 1 month");
  const [base, setBase] = useState(LAST.y - 1);
  return (
    <div data-testid="traffic-date-panel" className={`${panel} top-[30px] left-px flex w-[560px]`}>
      <div className="w-[408px] px-4 pt-[20px] pb-[27px]">
        <div className="flex h-8 items-center">
          <button type="button" aria-label="Previous year" onClick={() => setBase((b) => b - 1)} className="flex w-[40px] justify-center text-[#6c6e79] hover:text-rk-text">
            <ChevronLeft width={16} height={16} />
          </button>
          <span className="w-[140px] text-center text-[14px] leading-5 text-rk-text">{base}</span>
          <span className="ml-[16px] w-[140px] text-center text-[14px] leading-5 text-rk-text">{base + 1}</span>
          <button
            type="button"
            aria-label="Next year"
            disabled={base + 1 >= LAST.y}
            onClick={() => setBase((b) => b + 1)}
            className="flex w-[40px] justify-center text-[#6c6e79] hover:text-rk-text"
          >
            <ChevronRight width={16} height={16} />
          </button>
        </div>
        <div className="mt-[8px] flex gap-[16px]">
          {[base, base + 1].map((y) => (
            <MonthGrid
              key={y}
              year={y}
              sel={sel}
              onPick={(m) => {
                setSel({ y, m });
                setPreset(null);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex w-[152px] flex-col border-l border-[#e0e0e0] px-4 pt-[17px] pb-4">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setPreset(p);
              setSel(LAST);
            }}
            className={`flex h-7 items-center rounded-[6px] px-[9px] text-left text-[14px] leading-5 ${p === preset ? "bg-[#e9ebeb] font-semibold text-rk-text" : "text-[#6c6e79] hover:bg-rk-bg"}`}
          >
            {p}
          </button>
        ))}
        <div className="mt-auto flex items-center gap-[18px]">
          <button
            type="button"
            onClick={() => onApply(preset && preset !== "Last 1 month" ? preset : `${monthNames[sel.m]} ${sel.y}`)}
            className="h-7 rounded-[6px] bg-rk-btn-dark px-[9px] text-[14px] leading-5 font-semibold text-white hover:bg-black"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              setSel(LAST);
              setPreset("Last 1 month");
            }}
            className="text-[14px] leading-5 text-[#6c6e79] hover:text-rk-text"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export function GranularityPanel({ options, value, onPick }: { options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div data-testid="traffic-granularity-panel" className={`${panel} top-[30px] left-px w-[130px] overflow-hidden`}>
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onPick(o)} className={`${itemBase} px-[8px] ${o === value ? activeItem : "hover:bg-rk-bg"}`}>
          {o}
        </button>
      ))}
      <div className="border-t border-[#f0f0f0] bg-[#fafafa] px-4 py-4 text-[14px] leading-5 text-rk-text">Applies to line charts only.</div>
    </div>
  );
}

const deviceIcons: Record<string, ReactNode> = {
  "All devices": <DevicesIcon width={16} height={16} />,
  Mobile: <PhoneIcon width={16} height={16} />,
  Desktop: <MonitorIcon width={16} height={16} />,
};

export function DevicePanel({ options, value, onPick }: { options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div data-testid="traffic-device-panel" className={`${panel} top-[30px] left-px w-[110px] overflow-hidden`}>
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onPick(o)} className={`${itemBase} gap-[4px] px-[8px] ${o === value ? activeItem : "hover:bg-rk-bg"}`}>
          {deviceIcons[o]}
          {o}
        </button>
      ))}
    </div>
  );
}
