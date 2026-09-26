"use client";

import { useEffect, useRef, useState } from "react";
import { Checkbox, Segmented } from "./controls";
import { Info, Panel } from "./ui";
import { competitors, lateCompetitors } from "./data";
import { useTracking } from "./context";

const diffCls = (d: string) => (d.startsWith("-") ? "text-rk-danger" : "text-rk-success");

export function CompetitionMap() {
  const { end } = useTracking();
  const list = end === "20260925" ? lateCompetitors : competitors;
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const wide = w > 1100;
  const plotRight = wide ? w - 444 : 625;
  const x10 = wide ? 94 : 102.5;
  const step = wide ? (plotRight - x10) / 50 : 10.19;
  const x = (v: number) => x10 + (v - 10) * step;
  const y = (v: number) => 177.8 + v * 1.222;
  const gridLeft = wide ? 82 : 80.8;
  const ticks = wide ? [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60] : [10, 20, 30, 40, 50, 60];
  return (
    <div ref={ref}>
      <Panel title="Competition Map" className="relative h-[433px]" headerClassName="h-[42px]">
        <div className="absolute top-[67px] left-5">
          <Checkbox label={<span className="text-[14px] text-rk-text">Smart zoom</span>} className="!gap-[8px]" />
        </div>
        <div className="absolute top-[62px] right-[19px] flex items-center gap-[9px]">
          <Info />
          <Segmented items={["Competitors", "Winners & Losers"] as const} value="Competitors" className="[&>button]:h-[27px]" />
        </div>
        <svg width={plotRight + 20} height={431} className="absolute top-0 left-0 overflow-visible">
          {ticks.map((v) => (
            <g key={v}>
              <line x1={x(v)} x2={x(v)} y1={129} y2={348.8} stroke="#e7e8e8" />
              <text x={x(v)} y={370} textAnchor="middle" fontSize={12} fill="#6a6c6a">
                {v}
              </text>
            </g>
          ))}
          {[0, 50, 100].map((v) => (
            <g key={v}>
              <line x1={gridLeft} x2={plotRight} y1={y(v)} y2={y(v)} stroke="#e7e8e8" />
              <text x={63.5} y={y(v) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
                {v}
              </text>
            </g>
          ))}
          <line x1={gridLeft} x2={plotRight} y1={348.8} y2={348.8} stroke="#d6d8d7" />
          <text x={wide ? (x10 + plotRight) / 2 - 6 : 352} y={387.5} textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Number of Keywords
          </text>
          <text transform="translate(33 239) rotate(-90)" textAnchor="middle" fontSize={12} fill="#6a6c6a">
            Average Position
          </text>
          {list.map((c) => (
            <path key={c.domain} d={`M${x(c.x) - 4} ${y(c.y)}h8M${x(c.x)} ${y(c.y) - 4}v8`} stroke={c.color} strokeWidth={2} />
          ))}
        </svg>
        <div className={`absolute top-[119px] w-[367px] ${wide ? "right-[25px]" : "left-[671px]"}`}>
          <div className="flex h-[27px] items-start border-b border-[#e0e2e1] pt-[3px] text-[12px] leading-4 text-rk-text">
            <span className="flex-1 pl-[8px]">Competitor</span>
            <span className="w-[137px] pl-[24px]">Visibility</span>
          </div>
          <div className="no-scrollbar relative h-[262px] overflow-y-auto">
            {list.map((c) => (
              <div key={c.domain} className="flex h-[37.3px] items-center border-b border-[#edefef] text-[14px] text-rk-text">
                <span className="ml-[15.5px]">
                  <Checkbox checked color={c.color} size={16} />
                </span>
                <span className="ml-[8px] flex-1">{c.domain}</span>
                <span className="w-[50px] text-right">{c.visNum}</span>
                <span className={`mr-[25px] w-[73px] pl-[17px] ${diffCls(c.legendDiff)}`}>{c.legendDiff}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-[34px] right-[5px] h-[173px] w-[4px] rounded-full bg-[#d6d8d7]" />
        </div>
      </Panel>
    </div>
  );
}
