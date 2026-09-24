"use client";

import { useState } from "react";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { Checkbox, Segmented } from "./controls";
import { ChevronBold, NoteIcon, SparkleIcon } from "./icons";
import { Info } from "./ui";
import { Tip } from "./Tip";
import { project } from "./data";

export type ChartMode = "ca" | "pg";

const metrics = ["Share of Voice", "Visibility", "Est. Traffic", "Avg. Position"] as const;
const pgMetrics = ["Visibility", "Est. Traffic", "Avg. Position"] as const;
const pastLabels = [
  { d: 1, l: "Aug 27" },
  { d: 5, l: "Aug 31" },
  { d: 9, l: "Sep 4" },
  { d: 13, l: "Sep 8" },
  { d: 17, l: "Sep 12" },
  { d: 21, l: "Sep 16" },
  { d: 25, l: "Sep 20" },
  { d: 28.4, l: "Sep 24" },
];
const currentLabels = ["Aug 28", "Aug 31", "Sep 3", "Sep 6", "Sep 9", "Sep 12", "Sep 15", "Sep 18", "Sep 21"].map((l, i) => ({ d: 1 + i * 3, l })).concat({ d: 27.3, l: "Sep 24" });
const pgLabels = ["Aug 28", "Sep 1", "Sep 5", "Sep 9", "Sep 13", "Sep 17", "Sep 21", "Sep 25"];

const seg = "relative -ml-px flex h-[27px] items-center gap-[6px] border px-[8px] text-[14px] whitespace-nowrap text-rk-text first:ml-0 first:rounded-l-md last:rounded-r-md";

function ModeSwitch({ mode, onMode }: { mode: ChartMode; onMode: (m: ChartMode) => void }) {
  const pg = mode === "pg";
  return (
    <div className="flex">
      <button
        type="button"
        data-testid="pt-mode-ca"
        onClick={() => onMode("ca")}
        className={`${seg} ${pg ? "border-rk-border-strong bg-white hover:bg-rk-bg" : "z-10 border-[#8e9ff0] bg-[#e9edfc]"}`}
      >
        Competitive Analysis
      </button>
      <Tip
        tip="Potential Growth shows how much your domain can grow in 3 months if you put work into the analyzed keywords."
        gap={11}
        focus={false}
        className="-ml-px"
        boxClassName="w-[226px] !py-3 !pr-5 !pl-[11px]"
      >
        <button
          type="button"
          data-testid="pt-mode-pg"
          onClick={() => onMode("pg")}
          className={`${seg} !ml-0 rounded-r-md ${pg ? "z-10 border-[#b98cf0] bg-[#f6ecff]" : "border-rk-border-strong bg-white hover:bg-rk-bg"}`}
        >
          <SparkleIcon width={18} height={18} />
          <span>Potential Growth</span>
        </button>
      </Tip>
    </div>
  );
}

function Notes() {
  return (
    <Popover
      align="right"
      panelClassName="w-[180px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex items-center gap-[4px] text-[14px] text-rk-text">
          <NoteIcon width={17} height={17} />
          Notes
          <ChevronBold width={16} height={16} />
        </button>
      )}
    >
      <MenuItem>Add note</MenuItem>
      <MenuItem>View all notes</MenuItem>
      <MenuItem>Hide notes</MenuItem>
    </Popover>
  );
}

function HowItWorks() {
  return (
    <button type="button" className="ml-auto flex items-center gap-[6px] text-[14px] text-rk-link hover:text-rk-link-hover">
      <svg viewBox="0 0 16 16" width={16} height={16}>
        <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth={1.5} />
        <path d="M6.1 6.2a1.95 1.95 0 0 1 3.8.5c0 1.3-1.9 1.5-1.9 2.8" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx="8" cy="11.6" r=".9" fill="currentColor" />
      </svg>
      How it works
    </button>
  );
}

function CompetitiveChart({ metric, current }: { metric: (typeof metrics)[number]; current: boolean }) {
  const x = current ? (d: number) => 77.3 + d * 33.67 : (d: number) => 77 + d * 32.45;
  const right = current ? 1032 : x(29);
  const ticks = metric === "Avg. Position" ? ["0", "25", "50", "75", "100"] : metric === "Visibility" || metric === "Share of Voice" ? ["1%", "0.5%", "0%", "-0.5%", "-1%"] : ["1", "0.5", "0", "-0.5", "-1"];
  const y = (i: number) => 191.6 + i * 43.4;
  const labels = current ? currentLabels : pastLabels;
  return (
    <svg width="100%" height={418} className="pointer-events-none absolute top-0 left-0 overflow-visible">
      <rect x={x(22)} y={y(0)} width={right - x(22)} height={y(4) - y(0)} fill="#f0f1f2" />
      <line x1={x(22)} x2={x(22)} y1={y(0)} y2={y(4)} stroke="#c4c7cf" strokeDasharray="3 3" />
      {!current && <line x1={right} x2={right} y1={y(0)} y2={y(4)} stroke="#c4c7cf" strokeDasharray="3 3" />}
      <text transform={`translate(${x(22) - 7} ${y(2)}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#484a54">
        Last 8 days
      </text>
      {ticks.map((t, i) => (
        <g key={t}>
          <line x1={x(0)} x2={right} y1={y(i)} y2={y(i)} stroke={i === 4 ? "#c4c7cf" : "#e6e7ec"} />
          <text x={57} y={y(i) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
            {t}
          </text>
        </g>
      ))}
      {labels.map((l) => (
        <text key={l.l} x={x(l.d)} y={y(4) + 27} textAnchor="middle" fontSize={12} fill="#6c6e79">
          {l.l}
        </text>
      ))}
      {current ? (
        <>
          <line x1={x(0)} x2={963} y1={y(2)} y2={y(2)} stroke="#5c5fd6" strokeWidth={3} />
          <circle cx={x(0)} cy={y(2)} r={3.5} fill="#5c5fd6" />
          <circle cx={995} cy={y(2)} r={3.5} fill="#5c5fd6" />
        </>
      ) : (
        <>
          <line x1={x(0)} x2={x(16.8)} y1={y(2)} y2={y(2)} stroke="#5c5fd6" strokeWidth={3} />
          <circle cx={x(0)} cy={y(2)} r={3.5} fill="#5c5fd6" />
          <circle cx={x(16.8)} cy={y(2)} r={3.5} fill="#5c5fd6" />
        </>
      )}
    </svg>
  );
}

function GrowthChart() {
  const x = (d: number) => 78 + d * 16.25;
  const ticks = ["0.6%", "0.46%", "0.32%", "0.18%", "0.04%"];
  const y = (i: number) => 119 + i * 56.75;
  const base = 364;
  const curve = "M549 364C600 356 680 260 717 132";
  return (
    <svg width={740} height={418} className="pointer-events-none absolute top-0 left-0 overflow-visible">
      <defs>
        <linearGradient id="pt-pg-fill" x1="0" y1="132" x2="0" y2="364" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8c4cf0" />
          <stop offset="1" stopColor="#8c4cf0" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t, i) => (
        <g key={t}>
          <line x1={78} x2={717} y1={y(i)} y2={y(i)} stroke="#eef0f2" />
          <text x={57} y={y(i) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
            {t}
          </text>
        </g>
      ))}
      <line x1={78} x2={717} y1={base} y2={base} stroke="#e6e7ec" />
      <line x1={549} x2={549} y1={y(0)} y2={base} stroke="#e0e1e9" strokeDasharray="3 3" />
      {pgLabels.map((l, i) => (
        <text key={l} x={x(1 + i * 4)} y={base + 26} textAnchor="middle" fontSize={12} fill="#6c6e79">
          {l}
        </text>
      ))}
      <text x={667} y={base + 26} textAnchor="middle" fontSize={12} fill="#6c6e79">
        3-month potential
      </text>
      <path d={`${curve}V${base}Z`} fill="url(#pt-pg-fill)" />
      <line x1={78} x2={549} y1={base} y2={base} stroke="#5c5fd6" strokeWidth={3} />
      <path d={curve} fill="none" stroke="#6b55dd" strokeWidth={3} strokeDasharray="6 4" />
      <circle cx={78} cy={base} r={3.5} fill="#5c5fd6" />
      <circle cx={549} cy={base} r={4} fill="#5c5fd6" stroke="#fff" strokeWidth={1} />
      <circle cx={717} cy={132} r={9} fill="#e9d9fb" />
      <circle cx={717} cy={132} r={4} fill="#ad77f3" />
    </svg>
  );
}

function GrowthSide() {
  return (
    <div className="absolute top-[64px] left-[739px] w-[300px] text-[14px] leading-5 text-rk-text">
      <div className="flex">
        <div className="w-[160px]">
          <div className="flex items-center gap-[7px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#6167eb]" />
            {project.domain}
          </div>
          <div className="mt-[4px] text-[24px] leading-8 font-semibold">0%</div>
        </div>
        <div>
          <div className="flex items-center gap-[7px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#8a2be2]" />
            Pot. Visibility
            <Info />
          </div>
          <div className="mt-[4px] text-[24px] leading-8 font-semibold">0.57%</div>
        </div>
      </div>
      <div className="mt-[20px] flex items-center gap-[6px]">
        Potential Growth
        <Info />
      </div>
      <div className="mt-[1px] flex items-center">
        <span className="text-[24px] leading-8 font-semibold text-[#7a3ce6]">+0.57%</span>
        <span className="mt-[3px] ml-[9px] flex gap-[1px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-[6px] w-[16px] bg-[#a45fff] ${i === 0 ? "rounded-l-full" : ""} ${i === 2 ? "rounded-r-full" : ""}`} />
          ))}
        </span>
        <span className="mt-[3px] ml-[9px]">High</span>
      </div>
      <p className="mt-[12px] w-[300px] text-rk-text-2">These keywords can boost your traffic if you improve your content and focus on the top potential keywords.</p>
      <ul className="mt-[23px] flex flex-col gap-2 text-rk-muted">
        {["How it’s calculated", "How to reach potential"].map((t) => (
          <li key={t} className="flex items-center gap-[10px]">
            <span className="h-[4px] w-[4px] rounded-full bg-rk-muted" />
            <button type="button" className="underline decoration-[#6c6e79] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text">
              {t}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-[25px] h-7 rounded-md bg-gradient-to-r from-[#a153ff] to-[#6a62f0] px-[9px] font-semibold text-white hover:opacity-90">
        View top keywords
      </button>
    </div>
  );
}

export function OverviewChartCard({ mode = "ca", current = false, onMode }: { mode?: ChartMode; current?: boolean; onMode?: (m: ChartMode) => void }) {
  const [metric, setMetric] = useState<(typeof metrics)[number]>("Visibility");
  const pg = mode === "pg";
  return (
    <section className="relative mt-[15px] h-[418px] rounded-md border border-[#e4e5ea] bg-white shadow-[0_1px_2px_rgba(25,27,35,0.05)]">
      <div className="flex h-[45px] items-center gap-[16px] border-b-2 border-[#eceef2] px-5">
        <ModeSwitch mode={mode} onMode={(m) => onMode?.(m)} />
        {pg ? (
          <Segmented key="pg" items={pgMetrics} value="Visibility" className="[&>button]:h-[27px]" />
        ) : (
          <Segmented key="ca" items={metrics} value={metric} onChange={setMetric} className="[&>button]:h-[27px]" />
        )}
        {pg && <HowItWorks />}
      </div>
      {pg ? (
        <>
          <div className="absolute top-[64px] left-5 flex items-center">
            <Checkbox checked color="#191b23" label={<span className="text-[14px] text-rk-text">Smart zoom</span>} className="!gap-[8px]" />
            <span className="mx-[16px] h-[22px] border-l border-[#e0e1e9]" />
            <Notes />
          </div>
          <GrowthChart />
          <GrowthSide />
        </>
      ) : (
        <>
          <div className="absolute top-[64px] left-5 text-[14px] leading-5 text-rk-text">{project.domain}</div>
          <div className="absolute top-[86px] left-5 flex items-baseline gap-[8px]">
            <span className="text-[24px] leading-8 font-semibold text-[#6c6e79]">0</span>
            <span className="text-[12px] text-rk-muted">0</span>
          </div>
          <div className="absolute top-[136px] left-5">
            <Checkbox checked color="#5c5fd6" label={<span className="text-[14px] text-rk-text">{project.domain}</span>} className="!gap-[6px]" />
          </div>
          <div className="absolute top-[134px] right-5 flex items-center">
            <Checkbox checked color="#191b23" label={<span className="text-[14px] text-rk-text">Smart zoom</span>} className="!gap-[8px]" />
            <span className="mx-[16px] h-[22px] border-l border-[#e0e1e9]" />
            {!current && <Notes />}
          </div>
          <CompetitiveChart metric={metric} current={current} />
        </>
      )}
    </section>
  );
}
