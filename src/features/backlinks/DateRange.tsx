"use client";

import { useState } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronRightSm } from "./ui";

const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const presets = ["Last 7 days", "Last 14 days", "Last 28 days", "Last 2 months", "Last 4 months", "Last 6 months"];
const today = new Date(2026, 8, 25);

const CalIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <rect x="2.5" y="3" width="11" height="10.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M2.5 6.5h11M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

const fmt = (d: Date) => `${monthNames[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
const same = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function Month({ y, m, sel, onPick, max = today }: { y: number; m: number; sel: Date; onPick: (d: Date) => void; max?: Date }) {
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className="w-[224px]">
      <div className="grid grid-cols-7 text-center text-[14px] leading-5 text-[#6a6c6a]">
        {wd.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="mt-[10px] grid grid-cols-7 gap-y-[4px] text-center text-[14px]">
        {cells.map((d, i) => {
          if (d === null) return <span key={i} />;
          const date = new Date(y, m, d);
          const future = date > max;
          const on = same(date, sel);
          return (
            <button
              key={i}
              type="button"
              disabled={future}
              onClick={() => onPick(date)}
              className={`mx-auto h-8 w-8 rounded-md leading-8 ${on ? "bg-[#7a7ee8] text-white" : future ? "text-[#a9abaa]" : "text-rk-text hover:bg-rk-bg"}`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function DateChip({ onClear, day, onApply }: { onClear?: () => void; day?: string; onApply?: (iso: string) => void }) {
  const base = day ? new Date(+day.slice(0, 4), +day.slice(5, 7) - 1, +day.slice(8, 10)) : today;
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(base);
  const [view, setView] = useState(new Date(base.getFullYear(), base.getMonth(), 1));
  const [applied, setApplied] = useState(base);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const next = new Date(view.getFullYear(), view.getMonth() + 1, 1);
  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        data-testid="date-chip"
        onClick={() => setOpen(!open)}
        className="z-10 flex h-7 items-center gap-[8px] rounded-l-md border border-[#8f9cea] bg-[#eef2fd] pr-[8px] pl-[9px] text-[14px] whitespace-nowrap text-rk-text"
      >
        <CalIcon />
        {fmt(applied)}
      </button>
      <button type="button" aria-label="Clear date" onClick={onClear} className="-ml-px flex h-7 w-[26px] items-center justify-center rounded-r-md border border-[#8f9cea] bg-[#eef2fd] text-rk-text">
        <svg viewBox="0 0 16 16" width={14} height={14}>
          <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[33px] -left-[61px] z-50 flex h-[284px] w-[649px] rounded-md bg-white shadow-popover">
          <div className="relative flex gap-[16px] px-[16px] pt-[26px]">
            <button type="button" aria-label="Previous month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} className="absolute top-[26px] left-[25px] flex h-5 w-5 items-center justify-center text-rk-text-2">
              <ChevronRightSm className="rotate-180" />
            </button>
            <button type="button" aria-label="Next month" onClick={() => setView(next)} className="absolute top-[26px] right-[25px] flex h-5 w-5 items-center justify-center text-rk-text-2">
              <ChevronRightSm />
            </button>
            {[view, next].map((d) => (
              <div key={d.getMonth()}>
                <div className="mb-[16px] text-center text-[14px] leading-5 text-rk-text">
                  {monthNames[d.getMonth()]} {d.getFullYear()}
                </div>
                <Month y={d.getFullYear()} m={d.getMonth()} sel={sel} onPick={setSel} max={base} />
              </div>
            ))}
          </div>
          <div className="relative ml-auto w-[153px] border-l border-[#dfdfdf] pt-[16px] pl-[26px]">
            {presets.map((p) => (
              <button key={p} type="button" onClick={() => setSel(base)} className="block h-7 text-left text-[14px] leading-5 text-[#6a6c6a] hover:text-rk-text">
                {p}
              </button>
            ))}
            <div className="absolute bottom-[16px] left-[16px] flex items-center gap-[16px]">
              <button
                type="button"
                onClick={() => {
                  setApplied(sel);
                  setOpen(false);
                  onApply?.(isoDay(sel));
                }}
                className="h-7 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => {
                  setSel(base);
                  setView(new Date(base.getFullYear(), base.getMonth(), 1));
                }}
                className="text-[14px] text-[#6a6c6a] hover:text-rk-text"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
