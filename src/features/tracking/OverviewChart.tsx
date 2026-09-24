"use client";

import { useState } from "react";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { Checkbox, Segmented } from "./controls";
import { ChevronBold, NoteIcon, SparkleIcon } from "./icons";
import { project } from "./data";

const metrics = ["Share of Voice", "Visibility", "Est. Traffic", "Avg. Position"] as const;
const xLabels = [
  { d: 1, l: "Aug 27" },
  { d: 5, l: "Aug 31" },
  { d: 9, l: "Sep 4" },
  { d: 13, l: "Sep 8" },
  { d: 17, l: "Sep 12" },
  { d: 21, l: "Sep 16" },
  { d: 25, l: "Sep 20" },
  { d: 28.4, l: "Sep 24" },
];

export function OverviewChartCard() {
  const [metric, setMetric] = useState<(typeof metrics)[number]>("Visibility");
  const x = (d: number) => 77 + d * 32.45;
  const ticks = metric === "Avg. Position" ? ["0", "25", "50", "75", "100"] : metric === "Visibility" || metric === "Share of Voice" ? ["1%", "0.5%", "0%", "-0.5%", "-1%"] : ["1", "0.5", "0", "-0.5", "-1"];
  const y = (i: number) => 191.6 + i * 43.4;
  return (
    <section className="relative mt-[15px] h-[418px] rounded-md border border-[#e4e5ea] bg-white shadow-[0_1px_2px_rgba(25,27,35,0.05)]">
      <div className="flex h-[45px] items-center gap-[16px] border-b-2 border-[#eceef2] px-5">
        <Segmented
          items={["Competitive Analysis", "Potential Growth"] as const}
          value="Competitive Analysis"
          render={(v) =>
            v === "Potential Growth" ? (
              <>
                <SparkleIcon width={18} height={18} />
                <span>{v}</span>
              </>
            ) : (
              v
            )
          }
          className="[&>button]:h-[27px]"
        />
        <Segmented items={metrics} value={metric} onChange={setMetric} className="[&>button]:h-[27px]" />
      </div>
      <div className="absolute top-[64px] left-5 text-[14px] leading-5 text-rk-text">{project.domain}</div>
      <div className="absolute top-[86px] left-5 flex items-baseline gap-[8px]">
        <span className="text-[24px] leading-8 font-semibold text-[#6c6e79]">0</span>
        <span className="text-[12px] text-rk-muted">0</span>
      </div>
      <div className="absolute top-[136px] left-5">
        <Checkbox checked color="#5c5fd6" label={<span className="text-[14px] text-rk-text">{project.domain}</span>} className="!gap-[6px]" />
      </div>
      <div className="absolute top-[134px] right-5 flex items-center">
        <Checkbox checked color="#191b23" label={<span className="text-[14px] text-rk-text">Smart zoom</span>} className="!gap-[10px]" />
        <span className="mx-[16px] h-[22px] border-l border-[#e0e1e9]" />
        <Popover
          align="right"
          panelClassName="w-[180px]"
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="flex items-center gap-[6px] text-[14px] text-rk-text">
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
      </div>
      <svg width="100%" height={418} className="pointer-events-none absolute top-0 left-0 overflow-visible">
        <rect x={x(22)} y={y(0)} width={x(29) - x(22)} height={y(4) - y(0)} fill="#f0f1f2" />
        <line x1={x(22)} x2={x(22)} y1={y(0)} y2={y(4)} stroke="#c4c7cf" strokeDasharray="3 3" />
        <line x1={x(29)} x2={x(29)} y1={y(0)} y2={y(4)} stroke="#c4c7cf" strokeDasharray="3 3" />
        <text transform={`translate(${x(22) - 7} ${y(2)}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#484a54">
          Last 8 days
        </text>
        {ticks.map((t, i) => (
          <g key={t}>
            <line x1={x(0)} x2={x(29)} y1={y(i)} y2={y(i)} stroke={i === 4 ? "#c4c7cf" : "#e6e7ec"} />
            <text x={57} y={y(i) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
              {t}
            </text>
          </g>
        ))}
        {xLabels.map((l) => (
          <text key={l.l} x={x(l.d)} y={y(4) + 27} textAnchor="middle" fontSize={12} fill="#6c6e79">
            {l.l}
          </text>
        ))}
        <line x1={x(0)} x2={x(16.8)} y1={y(2)} y2={y(2)} stroke="#5c5fd6" strokeWidth={3} />
        <circle cx={x(0)} cy={y(2)} r={3.5} fill="#5c5fd6" />
        <circle cx={x(16.8)} cy={y(2)} r={3.5} fill="#5c5fd6" />
      </svg>
    </section>
  );
}
