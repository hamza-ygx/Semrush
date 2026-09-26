"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { periodRange, useTracking } from "./context";

const DAY = 864e5;
const today = Date.UTC(2026, 8, 25);
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const presets = [
  ["Past 2 days", 2],
  ["Past 7 days", 7],
  ["Past 30 days", 30],
  ["Past 60 days", 60],
  ["Past 90 days", 90],
  ["Previous month", 0],
  ["All time", 365],
] as const;

function presetRange(n: number) {
  if (n === 0) return [Date.UTC(2026, 7, 1), Date.UTC(2026, 8, 0)] as const;
  return [today - (n - 1) * DAY, today] as const;
}

function Month({ year, month, left, from, to, pick, mark }: { year: number; month: number; left: number; from: number; to: number; pick: (t: number) => void; mark?: number }) {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const count = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return (
    <div className="absolute top-0" style={{ left, width: 224 }}>
      <div className="absolute top-[26px] w-full text-center text-[14px] leading-5 text-rk-text">
        {monthNames[month]} {year}
      </div>
      {weekdays.map((w, i) => (
        <span key={w} style={{ left: i * 32 }} className="absolute top-[62px] w-8 text-center text-[14px] leading-5 text-rk-text-2">
          {w}
        </span>
      ))}
      {Array.from({ length: count }, (_, i) => {
        const t = Date.UTC(year, month, i + 1);
        const cell = first + i;
        const col = cell % 7;
        const row = Math.floor(cell / 7);
        const disabled = t > today;
        const edge = t === from || t === to;
        const inRange = t > from && t < to;
        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => pick(t)}
            style={{ left: col * 32, top: 93 + row * 36 }}
            className={`absolute flex h-8 w-8 items-center justify-center text-[14px] ${
              edge
                ? `bg-[#767fe8] font-semibold text-white ${t === from ? "rounded-l-[4px]" : ""} ${t === to ? "rounded-r-[4px]" : ""}`
                : inRange
                  ? "bg-[#ebf0ff] text-rk-text"
                  : disabled
                    ? "text-[#d6d8d7]"
                    : "rounded-[4px] text-rk-text hover:bg-rk-bg"
            } ${t === mark ? "rounded-[4px] !bg-white shadow-[inset_0_0_0_1px_#7c84a8]" : ""}`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

export function DatePickerPanel({ close }: { close: () => void }) {
  const { begin, end, setBegin, latest } = useTracking();
  const [a, b] = periodRange(begin, end);
  const [from, setFrom] = useState(a.getTime());
  const [to, setTo] = useState(b.getTime());
  const [pending, setPending] = useState(false);
  const [view, setView] = useState({ y: b.getUTCFullYear(), m: b.getUTCMonth() });
  const prev = view.m === 0 ? { y: view.y - 1, m: 11 } : { y: view.y, m: view.m - 1 };
  const pick = (t: number) => {
    if (!pending || t < from) {
      setFrom(t);
      setTo(t);
      setPending(true);
    } else {
      setTo(t);
      setPending(false);
    }
  };
  const shift = (d: number) => {
    const m = view.m + d;
    setView({ y: view.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 });
  };
  const apply = () => {
    const d = new Date(from);
    setBegin(`${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`);
    close();
  };
  return (
    <div className="flex h-[320px] w-[651px]">
      <div className="relative w-[496px]">
        <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className="absolute top-[26px] left-[27px] flex h-5 w-5 items-center justify-center text-rk-text-2 hover:text-rk-text">
          <ChevronLeft strokeWidth={2} />
        </button>
        <button type="button" aria-label="Next month" onClick={() => shift(1)} className="absolute top-[26px] left-[450px] flex h-5 w-5 items-center justify-center text-rk-text-2 hover:text-rk-text">
          <ChevronRight strokeWidth={2} />
        </button>
        <Month year={prev.y} month={prev.m} left={16} from={from} to={to} pick={pick} />
        <Month year={view.y} month={view.m} left={256} from={from} to={to} pick={pick} mark={latest && to === today ? today - DAY : undefined} />
      </div>
      <div className="relative flex-1 border-l border-rk-border pt-[15px]">
        {presets.map(([l, n]) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              const [f, t] = presetRange(n);
              setFrom(f);
              setTo(t);
              setPending(false);
            }}
            className={`mx-4 block h-7 w-[122px] rounded-[4px] pl-2 text-left text-[14px] hover:text-rk-text ${presetRange(n)[0] === from && presetRange(n)[1] === to ? "bg-rk-bg text-rk-text" : "text-rk-muted"}`}
          >
            {l}
          </button>
        ))}
        <div className="absolute top-[276px] left-4 flex items-center gap-[10px]">
          <button type="button" onClick={apply} className="h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
            Apply
          </button>
          <button
            type="button"
            onClick={() => {
              setFrom(a.getTime());
              setTo(b.getTime());
              setPending(false);
            }}
            className="text-[14px] text-rk-muted hover:text-rk-text"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
