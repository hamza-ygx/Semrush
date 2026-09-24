"use client";

import { useState } from "react";
import { Checkbox } from "./ui";

const label = "absolute text-[12px] leading-4 whitespace-nowrap text-rk-text-2";

export function AreaChart({
  data,
  ticks,
  labels,
  base,
  ppu,
  left = 90,
  right = 40,
}: {
  data: number[];
  ticks: string[];
  labels: { at: number; label: string }[];
  base: number;
  ppu: number;
  left?: number;
  right?: number;
}) {
  const lo = +ticks[ticks.length - 1];
  const y = (v: number) => base - (v - lo) * ppu;
  const p = data.map((v, i) => [(i / (data.length - 1)) * 1000, y(v)]);
  const line = p.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)} ${b.toFixed(2)}`).join("");
  return (
    <div className="absolute inset-0">
      {ticks.map((t) => (
        <div key={t}>
          <div className="absolute border-t border-[#f2f2f4]" style={{ left: left - 1, right: right - 1, top: Math.round(y(+t)) }} />
          <span className={`${label} text-right`} style={{ right: `calc(100% - ${left - 16}px)`, top: Math.round(y(+t)) - 8 }}>
            {t}
          </span>
        </div>
      ))}
      <svg viewBox={`0 0 1000 ${base + 2}`} preserveAspectRatio="none" className="absolute top-0 overflow-visible" style={{ left, height: base + 2, width: `calc(100% - ${left + right}px)` }}>
        <path d={`${line}L1000 ${base + 2}L0 ${base + 2}Z`} fill="#6167e6" opacity={0.2} />
        <path d={line} fill="none" stroke="#6167e6" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {labels.map((l) => (
        <span key={l.label} className={`${label} -translate-x-1/2`} style={{ left: `calc(${left}px + (100% - ${left + right}px) * ${l.at})`, top: base + 10 }}>
          {l.label}
        </span>
      ))}
    </div>
  );
}

export function NewLostChart({
  newV,
  lostV,
  max,
  ticks,
  labels,
  every,
  left,
  right,
  zero,
  unit,
  tips,
}: {
  newV: number[];
  lostV: number[];
  max: number;
  ticks: string[];
  labels: string[];
  every: number;
  left: number;
  right: number;
  zero: number;
  unit: number;
  tips?: string[];
}) {
  const [hover, setHover] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(true);
  const [showLost, setShowLost] = useState(true);
  const n = newV.length;
  const step = (max / 3) * unit;
  const slot = `(100% - ${left + right}px) / ${n}`;
  return (
    <>
      <div className="flex h-5 items-center gap-[12px]">
        <Checkbox checked={showNew} onChange={() => setShowNew(!showNew)} color="#6167e6" label="New" />
        <Checkbox checked={showLost} onChange={() => setShowLost(!showLost)} color="#ff6b70" label="Lost" />
        <span className="ml-auto text-[14px] text-rk-muted">Last 6 months</span>
      </div>
      <div className="absolute inset-x-0 top-0">
        {hover !== null && <div className="absolute bg-[#f8f8f8]" style={{ left: `calc(${left}px + ${slot} * ${hover})`, width: `calc(${slot})`, top: Math.round(zero - 3 * step), height: Math.round(4 * step) }} />}
        {ticks.map((t, i) => {
          const y = zero - (3 - i) * step;
          return (
            <div key={t}>
              <div className="absolute border-t border-[#ededf0]" style={{ left: left - 4, right: right - 4, top: Math.round(y) }} />
              <span className={`${label} text-right`} style={{ right: `calc(100% - ${left - 16}px)`, top: Math.round(y) - 8 }}>
                {t}
              </span>
            </div>
          );
        })}
        {newV.map((v, i) => (
          <div key={i}>
            {showNew && v > 0 && (
              <span className="absolute rounded-t-[2px] bg-[#6167e6]" style={{ left: `calc(${left}px + ${slot} * ${i + 0.125})`, width: `calc(${slot} * 0.75)`, top: zero - v * unit + 1, height: v * unit - 1 }} />
            )}
            {showLost && lostV[i] > 0 && (
              <span className="absolute rounded-b-[2px] bg-[#ff6b70]" style={{ left: `calc(${left}px + ${slot} * ${i + 0.125})`, width: `calc(${slot} * 0.75)`, top: zero + 1, height: lostV[i] * unit }} />
            )}
          </div>
        ))}
        {labels.map((l, i) =>
          i % every === 0 ? (
            <span key={l} className={`${label} -translate-x-1/2`} style={{ left: `calc(${left}px + ${slot} * ${i + 0.5})`, top: zero + step + 10 }}>
              {l}
            </span>
          ) : null,
        )}
        {tips && (
          <div className="absolute" style={{ left, right, top: Math.round(zero - 3 * step), height: Math.round(4 * step) }} onMouseLeave={() => setHover(null)}>
            {tips.map((t, i) => (
              <div key={t} data-testid={`chart-slot-${i}`} className="absolute inset-y-0" style={{ left: `calc(100% / ${n} * ${i})`, width: `calc(100% / ${n})` }} onMouseEnter={() => setHover(i)} />
            ))}
          </div>
        )}
        {tips && hover !== null && (
          <div
            className="pointer-events-none absolute z-20 min-w-[116px] rounded-md bg-white px-[12px] pt-[12px] pb-[10px] whitespace-nowrap shadow-popover"
            style={hover >= n / 2 ? { right: `calc(100% - ${left}px - ${slot} * ${hover} + 8px)`, top: 65 } : { left: `calc(${left}px + ${slot} * ${hover + 1} + 8px)`, top: 65 }}
          >
            <div className="text-[12px] leading-4 text-rk-muted">{tips[hover]}</div>
            {[
              { l: "New", c: "#6167e6", v: newV[hover] },
              { l: "Lost", c: "#ff6b70", v: lostV[hover] },
            ].map((x, k) => (
              <div key={x.l} className={`flex h-5 items-center text-[13px] text-rk-text ${k ? "" : "mt-[6px]"}`}>
                <span className="h-2 w-2 rounded-full" style={{ background: x.c }} />
                <span className="ml-[7px]">{x.l}</span>
                <span className="ml-auto pl-4 font-semibold">{x.v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
