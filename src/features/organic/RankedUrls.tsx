"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { SerpIcon } from "./serpIcons";
import type { PositionRow } from "./data";
import { ExtLink, ext, kwHref } from "./ui";

const months = ["Sep 25", "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26"];
const ticks = [1, 20, 40, 60, 80, 100];
const labelAt = (i: number) => 0.052 + i * 0.07434;

function historyPath(pos: number) {
  if (pos === 3)
    return [
      [0.1715, 100],
      [0.1715, 3],
      [0.4597, 3],
      [0.4597, 6.4],
      [0.5353, 6.4],
      [0.5353, 1.5],
      [0.6844, 1.5],
      [0.6844, 3],
      [1, 3],
    ];
  const start = 0.1715 + ((pos * 7) % 5) * 0.07;
  const prev = Math.min(100, pos + 4);
  return [
    [start, 100],
    [start, prev],
    [0.6, prev],
    [0.6, pos],
    [1, pos],
  ];
}

const features: Record<string, { icon: string; label: string }[]> = {
  default: [
    { icon: "paa", label: "People also ask" },
    { icon: "pin", label: "Local pack" },
    { icon: "related", label: "Related searches" },
  ],
};

export function RankedUrls({ r }: { r: PositionRow }) {
  const [on, setOn] = useState(true);
  const H = 203;
  const pts = historyPath(r.local ? 1 : r.position);
  const d = pts.map(([x, v], i) => `${i ? "L" : "M"}${x * 1000} ${(v * H) / 100}`).join("");
  return (
    <div className="h-[459px] rounded-lg border border-rk-border bg-white">
      <div className="flex h-[39px] items-center justify-between border-b border-rk-border px-5">
        <div className="text-[16px] leading-6 font-semibold">Ranked URLs (month by month)</div>
        <div className="text-[14px] text-rk-muted">
          Filter by:{" "}
          <Link href={kwHref(r.keyword)} className="text-rk-link hover:text-rk-link-hover">
            {r.keyword}
          </Link>
        </div>
      </div>
      <div className="relative h-[355px]">
        {ticks.map((t) => (
          <span key={t} className="absolute left-0 w-[71.5px] -translate-y-1/2 text-right text-[12px] leading-4 text-rk-muted" style={{ top: 43.5 + (t * H) / 100 }}>
            {t}
          </span>
        ))}
        <div className="absolute top-[43.5px] right-[26px] left-[84.5px]" style={{ height: H }}>
          <div className="absolute top-0 bottom-0 bg-[#eaeeee]" style={{ left: "91%", width: "7.31%" }} />
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 1000 ${H}`} preserveAspectRatio="none">
            {ticks.map((t) => (
              <path key={t} d={`M0 ${(t * H) / 100}H1000`} stroke={t === 100 ? "#d6d8d7" : "#e9eaea"} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            ))}
            {on && <path d={d} fill="none" stroke="#6167e6" strokeWidth={1.6} vectorEffect="non-scaling-stroke" />}
          </svg>
          {months.map((m, i) => (
            <span
              key={m}
              className={`absolute top-[213.5px] flex h-[25px] -translate-x-1/2 items-center rounded-sm px-[6px] whitespace-nowrap text-[13px] text-rk-muted ${i === months.length - 1 ? "bg-[#f3f5f5]" : ""}`}
              style={{ left: `${labelAt(i) * 100}%` }}
            >
              {m}
            </span>
          ))}
        </div>
        <div className="absolute top-[305px] left-[34px] flex items-center text-[14px] leading-5">
          <span className="text-rk-muted">{r.local ? 1 : r.position}</span>
          <ArrowRight className="ml-[17px] text-rk-muted" />
          <span className="ml-[16px]">{r.local ? 1 : r.position}</span>
          <button
            type="button"
            role="checkbox"
            aria-checked={on}
            onClick={() => setOn(!on)}
            className={`ml-[18px] flex h-4 w-4 items-center justify-center rounded-[4px] border ${on ? "border-[#6167e6] bg-[#6167e6]" : "border-rk-border-strong bg-white"}`}
          >
            {on && (
              <svg viewBox="0 0 16 16" width={12} height={12}>
                <path d="m3.5 8.5 3 3 6-6.5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <a href={ext(`https://${r.url}`)} target="_blank" rel="noreferrer" className="ml-[7px] text-rk-link hover:text-rk-link-hover">
            https://{r.url}
          </a>
          <ExtLink href={r.url} className="ml-1" />
        </div>
      </div>
      <div className="mx-5 flex h-[63px] items-center border-t pt-[11px] border-rk-border text-[14px] leading-5 text-rk-text-2">
        SERP Features on SERP:
        {features.default.map((f, i) => (
          <span key={f.label} className={`flex items-center gap-1 text-rk-text ${i ? "ml-[10px]" : "ml-[17px]"}`}>
            <span className="text-[#8a8d99]">
              <SerpIcon name={f.icon} />
            </span>
            {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}
