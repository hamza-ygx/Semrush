"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import { ExtIcon } from "@/features/organic/ui";
import { deviationScores, losersRows, sensorFaq, volatility, winnerScores, winnersRows, type SiteRow } from "../data";
import { DeviationChart, HIGH, Legend, LOW, NORMAL, VERY_HIGH, monotonePath } from "./charts";
import { CategoryList, SensorCard, SensorControls, SensorFaq, SensorShell } from "./SensorShell";
import { scaleSeries } from "./SensorOverview";

function CardHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="h-[68px] border-b border-[#f0f0f0] px-5 pt-[9px]">
      <h2 className="text-[16px] leading-5 font-semibold text-rk-text">{title}</h2>
      <div className="mt-[10px] text-[14px] leading-5 text-rk-muted">{sub}</div>
    </div>
  );
}

export function SensorDeviations() {
  const [cat, setCat] = useState("All categories");
  const dev = deviationScores.find(([c]) => c === cat)![1];
  const series = useMemo(() => (cat === "All categories" ? volatility : scaleSeries(volatility, (1.7 + dev) / 2.2)), [cat, dev]);
  return (
    <SensorShell tab="deviations">
      <div className="flex gap-6 px-8 pt-[23px]">
        <CategoryList
          items={deviationScores}
          selected={cat}
          onSelect={setCat}
          render={(v) => (
            <span className="text-[12px] font-semibold text-[#12a33c]">
              {v >= 0 ? "+" : ""}
              {v.toFixed(1)}
            </span>
          )}
        />
        <div className="w-[779px] shrink-0">
          <SensorControls />
          <SensorCard className="relative mt-4 h-[439px]">
            <CardHead title={`${cat} deviation`} sub="from the average monthly volatility" />
            <div className="mt-[19px] ml-[21px]">
              <Legend
                items={[
                  { color: NORMAL, label: "Normal deviation" },
                  { color: HIGH, label: "Moderate deviation" },
                  { color: VERY_HIGH, label: "Critical deviation" },
                  { color: LOW, label: "Average", dash: true },
                ]}
              />
            </div>
            <DeviationChart data={series} />
          </SensorCard>
          <div className="mt-[17px]">
            <SensorFaq items={sensorFaq} />
          </div>
        </div>
      </div>
    </SensorShell>
  );
}

const Up = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 12 16" width={11} height={15} className={className}>
    <path d="M6 14.5V2M1.5 6.5 6 2l4.5 4.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function SitesTable({ rows, losers }: { rows: SiteRow[]; losers: boolean }) {
  return (
    <div className="mt-[28px] text-[14px] text-rk-text">
      <div className="flex h-[60px] items-start bg-[#f9f9f9] pt-[11px] text-[12px] leading-5 text-rk-text-2">
        <span className="w-[52px]" />
        <span className="w-[259px]">Source Domain</span>
        <span className="w-[80px]">
          {losers ? "Pos. Drop" : "Pos. Rise"}
          <br />
          <span className="text-rk-muted">(Sep 24)</span>
        </span>
        <span className="w-[160px]">
          Position Trend
          <br />
          <span className="text-rk-muted">(Sep 18 – 24)</span>
        </span>
        <span className="w-[80px]">Keywords</span>
        <span>New Keywords</span>
      </div>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-[511px] w-[16px] bg-[#e5f6fb]" />
        {rows.map((r, i) => (
          <div key={r.url} className={`relative flex items-center border-b border-[#edefef] ${i === 0 ? "h-[65px]" : "h-[53px]"}`}>
            <span className="w-[52px] pl-3">{i + 1}</span>
            <span className="mr-[11px] w-[248px] overflow-hidden leading-5">
              <a href={r.url} target="_blank" rel="noreferrer" className="text-rk-link hover:text-rk-link-hover">
                {r.url}
              </a>{" "}
              <ExtIcon className="relative top-[2px] text-[#a9abaa]" />
            </span>
            <span className="w-[80px]">
              <span className={`inline-flex h-[28px] items-center gap-[3px] rounded-full px-[9px] text-[15px] font-semibold ${losers ? "bg-[#ffdde2] text-[#d1002f]" : "bg-[#b9f0dc] text-[#007c65]"}`}>
                <Up className={losers ? "rotate-180" : ""} />
                {Math.abs(r.rise)}
              </span>
            </span>
            <span className="flex w-[160px] items-center">
              <span className="flex w-[123px] justify-between pr-[7px] pl-[3px]">
                {Array.from({ length: 6 }).map((_, k) => (
                  <span key={k} className="h-[1.5px] w-[9px] bg-[#8b8d8c]" />
                ))}
              </span>
              <Up className={`${losers ? "rotate-180 text-[#d1002f]" : "text-[#007c65]"}`} />
            </span>
            <span className="w-[80px]">{r.keywords}</span>
            <span>{r.fresh}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SensorWinners() {
  const [cat, setCat] = useState("All categories");
  const [mode, setMode] = useState<"Winners" | "Losers">("Winners");
  const rows = mode === "Winners" ? winnersRows : losersRows;
  return (
    <SensorShell tab="winners">
      <div className="flex gap-6 px-8 pt-[23px]">
        <CategoryList
          items={winnerScores}
          selected={cat}
          onSelect={setCat}
          render={(v) => (
            <span className="flex items-center gap-[2px] text-[12px] font-semibold text-[#007c65]">
              <Up className="h-[15px] w-[10px]" />
              {v.toFixed(1)}
            </span>
          )}
        />
        <div className="w-[779px] shrink-0">
          <SensorControls />
          <SensorCard className="mt-4 pb-5">
            <CardHead title={`Top sites in ${cat}`} sub="Thursday, September 24" />
            <div className="px-5">
              <div className="mt-[20px] flex h-7 text-[14px]">
                {(["Winners", "Losers"] as const).map((m, i) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`border px-2 ${i === 0 ? "rounded-l-md" : "-ml-px rounded-r-md"} ${mode === m ? "z-10 border-[#8f9cea] bg-[#e8eefc]" : "border-rk-border bg-white hover:bg-rk-bg"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <SitesTable rows={rows} losers={mode === "Losers"} />
            </div>
          </SensorCard>
          <div className="mt-[17px]">
            <SensorFaq items={sensorFaq} />
          </div>
        </div>
      </div>
    </SensorShell>
  );
}

const miniPts: [number, number][] = [
  [0, 22], [9, 21], [14, 28.5], [20.5, 51], [29, 38.5], [34, 43.5], [49, 66], [64, 71], [76.5, 88.5], [91.5, 88.5], [104, 70], [119, 62], [129, 71], [146.5, 70], [156.5, 62],
  [164, 81], [174, 68.5], [189, 68.5], [201.5, 98.5], [211.5, 81], [220, 101], [234, 78.5], [244, 83.5], [256.5, 111], [268, 96], [275.5, 111],
];

function MiniVolatility() {
  const d = monotonePath(miniPts);
  const bands = [
    { id: "pv-high", y: -10, h: 57, stroke: "#fb8a4c", fill: "#fde4d6" },
    { id: "pv-normal", y: 47, h: 46, stroke: "#3aa62f", fill: "#dcf0d6" },
    { id: "pv-low", y: 93, h: 50, stroke: "#1e8ef0", fill: "#d6ebfb" },
  ];
  return (
    <svg viewBox="0 0 276 140" width={276} height={140} className="overflow-visible">
      <defs>
        {bands.map((b) => (
          <clipPath key={b.id} id={b.id}>
            <rect x={-2} y={b.y} width={280} height={b.h} />
          </clipPath>
        ))}
      </defs>
      <line x1={0} x2={276} y1={47} y2={47} stroke="#e7e8e8" />
      <rect x={0} y={93} width={276} height={46} fill="#d6ebfb" />
      {bands.map((b) => (
        <g key={b.id} clipPath={`url(#${b.id})`}>
          <path d={`${d}L276,139L0,139Z`} fill={b.fill} />
          <path d={d} fill="none" stroke={b.stroke} strokeWidth={2.5} strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

export function SensorPersonal() {
  return (
    <SensorShell tab="personal">
      <div className="flex gap-10 px-16 pt-10 pb-[530px]">
        <div className="h-[230px] w-[300px] shrink-0 rounded-md bg-white px-3 pt-[13px] shadow-[0_2px_12px_rgba(25,27,35,0.10)]">
          <div className="flex items-center gap-[9px] text-[14px] font-semibold text-[#6a6c6a]">
            SERP volatility
            <span className="h-[7px] w-[32px] rounded-full bg-[#e7e8e8]" />
          </div>
          <div className="mt-[9px] mb-px border-t border-[#e7e8e8]" />
          <MiniVolatility />
          <div className="mt-[9px] flex gap-[10px] text-[12px] text-rk-text-2">
            {[
              ["#1e8ef0", "Low"],
              ["#3aa62f", "Normal"],
              ["#fb8a4c", "High"],
              ["#d1002f", "Very High"],
            ].map(([c, l]) => (
              <span key={l} className="flex items-center gap-[4px]">
                <span className="h-3 w-3 rounded-full" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="w-[475px] pt-[1px] text-[14px] leading-5 text-rk-text-2">
          <h2 className="text-[16px] leading-5 font-semibold text-rk-text">Monitor the Personal Score for your projects</h2>
          <p className="mt-[14px]">
            Personal score allows you to calculate Sensor volatility score for the keyword sets that you have set up in Position Tracking. The results are more precise if you have more keywords in these campaigns.
          </p>
          <p className="mt-5">
            Get score for your <b className="font-semibold text-rk-text">www.rkjh.se</b> project
          </p>
          <div className="mt-[11px] flex items-center gap-[6px]">
            <Link href={routes.tracking.overview} className="flex h-7 items-center rounded-md bg-[#009f81] px-2 text-[14px] font-medium text-white hover:bg-[#008a70]">
              Get score
            </Link>
            or
            <Link href={routes.positionTracking} className="text-rk-link hover:text-rk-link-hover">
              Create a new project
            </Link>
          </div>
        </div>
      </div>
    </SensorShell>
  );
}
