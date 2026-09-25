"use client";

import { useState } from "react";
import { datePresets, today, type Range } from "./dates";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthName = (y: number, m: number) => new Date(y, m, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
const same = (a: Date | null, b: Date) => !!a && a.getTime() === b.getTime();

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d={dir === "l" ? "m10 3.5-4.5 4.5 4.5 4.5" : "m6 3.5 4.5 4.5L6 12.5"} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Month({ y, m, from, to, onPick }: { y: number; m: number; from: Date; to: Date | null; onPick: (d: Date) => void }) {
  const lead = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array.from({ length: lead }, () => null), ...Array.from({ length: days }, (_, i) => new Date(y, m, i + 1))];
  const end = to ?? from;
  return (
    <div className="w-[224px]">
      <div className="grid grid-cols-7 text-center text-[14px] leading-5 text-rk-muted">
        {weekdays.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="mt-[9px] grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <span key={`e${i}`} />;
          const start = same(from, d);
          const stop = same(end, d);
          const inRange = d > from && d < end;
          const isToday = same(today, d);
          const edge = start || stop;
          return (
            <button
              key={d.getDate()}
              type="button"
              onClick={() => onPick(d)}
              className={`h-8 text-[14px] leading-5 ${
                edge
                  ? `bg-[#7580e3] font-semibold text-white ${start ? "rounded-l-md" : ""} ${stop ? "rounded-r-md" : ""}`
                  : inRange
                    ? "bg-[#ebf0fe] text-rk-text"
                    : isToday
                      ? "rounded-md border border-[#a6a8ad] text-rk-text hover:bg-rk-bg"
                      : "rounded-md text-rk-text hover:bg-rk-bg"
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DatePicker({ value, onApply, className = "" }: { value: Range; onApply: (r: Range) => void; className?: string }) {
  const [from, setFrom] = useState(value.from);
  const [to, setTo] = useState<Date | null>(value.to);
  const [preset, setPreset] = useState<string | null>(datePresets.find((p) => same(p.range.from, value.from) && same(p.range.to, value.to))?.label ?? null);
  const [view, setView] = useState({ y: value.from.getFullYear(), m: value.from.getMonth() });
  const next = new Date(view.y, view.m + 1, 1);
  const shift = (n: number) => {
    const d = new Date(view.y, view.m + n, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const pick = (d: Date) => {
    setPreset(null);
    if (to || d < from) {
      setFrom(d);
      setTo(null);
    } else setTo(d);
  };

  return (
    <div role="dialog" aria-label="Select period" className={`absolute z-30 flex h-[321px] w-[703px] rounded-md bg-white shadow-[0_1px_12px_rgba(25,27,35,0.13)] ${className}`}>
      <div className="relative w-[496px] shrink-0 border-r border-[#d7d7d7] px-4 pt-[25px]">
        <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className="absolute top-[27px] left-[27px] text-rk-text-2 hover:text-rk-text">
          <Arrow dir="l" />
        </button>
        <button type="button" aria-label="Next month" onClick={() => shift(1)} className="absolute top-[27px] right-[27px] text-rk-text-2 hover:text-rk-text">
          <Arrow dir="r" />
        </button>
        <div className="flex gap-4">
          {[{ y: view.y, m: view.m }, { y: next.getFullYear(), m: next.getMonth() }].map((mm) => (
            <div key={`${mm.y}-${mm.m}`}>
              <div className="mb-4 text-center text-[14px] leading-[22px] text-rk-text">{monthName(mm.y, mm.m)}</div>
              <Month y={mm.y} m={mm.m} from={from} to={to} onPick={pick} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-4 pt-[15px]">
        <div className="relative h-[242px] overflow-hidden">
          <div className="no-scrollbar h-full overflow-y-auto">
            {datePresets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setPreset(p.label);
                  setFrom(p.range.from);
                  setTo(p.range.to);
                  setView({ y: p.range.from.getFullYear(), m: p.range.from.getMonth() });
                }}
                className={`flex h-7 w-full items-center rounded-md px-[9px] text-left text-[14px] whitespace-nowrap ${p.label === preset ? "bg-[#e7e9e9] text-rk-text" : "text-rk-muted hover:bg-rk-bg"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-b from-transparent to-white/80" />
        </div>
        <button
          type="button"
          disabled={!to}
          onClick={() => to && onApply({ from, to })}
          className="mt-[21px] h-7 w-fit rounded-md bg-[#1a1d1a] px-[9px] text-[14px] font-medium text-white hover:bg-[#2b2e38] disabled:opacity-50"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
