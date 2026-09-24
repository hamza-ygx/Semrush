"use client";

import { useState, type ReactNode } from "react";
import { ExternalIcon } from "@/components/ui/icons";
import { Delta } from "./ui";

export type TrafficSeries = { name: string; color: string; data: number[] };

const CH: Record<string, number> = { M: 10.4, K: 8, B: 8, ".": 3.3, "%": 10, " ": 3.3, "-": 4.5 };
export const textW = (s: string, size = 12) => [...s].reduce((a, c) => a + (CH[c] ?? (/[0-9]/.test(c) ? 7.1 : 7)), 0) * (size / 12);

export const shortMonths = ["Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026"];

export function fmtNum(v: number) {
  if (v === 0) return "0";
  if (v >= 1e9) return `${+(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${+(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${+(v / 1e3).toFixed(1)}K`;
  return `${v}`;
}

export function TrafficLineChart({
  series,
  ticks,
  width,
  plotHeight = 176,
  months = shortMonths,
  labelEvery = 1,
  fmt = fmtNum,
  partialLast = true,
  hidden = {},
  rightInset = 10,
  labelGap = 16,
  plotLeft,
  tooltip,
  hoverId = "chart-hover",
}: {
  series: TrafficSeries[];
  ticks: number[];
  width: number;
  plotHeight?: number;
  months?: string[];
  labelEvery?: number;
  fmt?: (v: number) => string;
  partialLast?: boolean;
  hidden?: Record<string, boolean>;
  rightInset?: number;
  labelGap?: number;
  plotLeft?: number;
  tooltip?: (i: number) => ReactNode;
  hoverId?: string;
}) {
  const [hi, setHi] = useState<number | null>(null);
  const labels = ticks.map(fmt);
  const lw = Math.max(...labels.map((l) => textW(l)));
  const x0 = plotLeft ?? Math.round(lw * 0.7 + labelGap + 10);
  const x1 = width - rightInset;
  const top = 8;
  const max = ticks[ticks.length - 1];
  const n = months.length;
  const X = (i: number) => x0 + ((x1 - x0) * i) / (n - 1);
  const Y = (v: number) => top + plotHeight - (v / max) * plotHeight;
  const h = top + plotHeight + 30;
  const vis = series.filter((s) => !hidden[s.name]);
  const svg = (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className="block overflow-visible">
      {ticks.map((t, i) => (
        <g key={t}>
          <line x1={x0 - 2} x2={x1 + 8} y1={Y(t)} y2={Y(t)} stroke={i === 0 ? "#e0e1e5" : "#f0f0f2"} strokeWidth={1} />
          <text x={x0 - 15} y={Y(t) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
            {labels[i]}
          </text>
        </g>
      ))}
      {months.map((m, i) =>
        i % labelEvery === 0 || i === n - 1 ? (
          <text key={m} x={X(i)} y={top + plotHeight + 22} fontSize={12} fill="#6c6e79" textAnchor={i === 0 ? "start" : i === n - 1 && labelEvery > 1 ? "end" : "middle"}>
            {m}
          </text>
        ) : null,
      )}
      {series
        .filter((s) => !hidden[s.name])
        .map((s) => {
          const pts = s.data.map((v, i) => [X(i), Y(v)] as const);
          const solid = partialLast ? pts.slice(0, -1) : pts;
          const tail = partialLast ? pts.slice(-2) : [];
          return (
            <g key={s.name}>
              <path d={solid.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("")} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" />
              {tail.length === 2 && <path d={`M${tail[0][0]} ${tail[0][1]}L${tail[1][0]} ${tail[1][1]}`} fill="none" stroke={s.color} strokeOpacity={0.25} strokeWidth={2.5} />}
              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={3.5} fill={s.color} fillOpacity={partialLast && i === pts.length - 1 ? 0.3 : 1} />
              ))}
            </g>
          );
        })}
      {tooltip && hi !== null && (
        <g pointerEvents="none">
          <line x1={X(hi) + 0.5} x2={X(hi) + 0.5} y1={top} y2={top + plotHeight} stroke="#c4c7cf" strokeWidth={1} />
          {vis.map((s) => (
            <circle key={s.name} cx={X(hi)} cy={Y(s.data[hi])} r={4.5} fill={s.color} stroke="#fff" strokeWidth={1.5} />
          ))}
        </g>
      )}
      {tooltip &&
        months.map((m, i) => {
          const a = i === 0 ? x0 : (X(i - 1) + X(i)) / 2;
          const w = (i === n - 1 ? x1 : (X(i) + X(i + 1)) / 2) - a;
          const cut = Math.round(plotHeight * 0.55);
          return (
            <g key={m} onMouseEnter={() => setHi(i)} fill="transparent">
              <rect data-testid={`${hoverId}-${i}`} x={a} width={w} y={top} height={cut} />
              <rect x={a} width={w} y={top + cut} height={plotHeight - cut} />
            </g>
          );
        })}
    </svg>
  );
  if (!tooltip) return svg;
  const left = hi !== null && X(hi) > 240;
  return (
    <div className="relative" style={{ width }} onMouseLeave={() => setHi(null)}>
      {svg}
      {hi !== null && (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-20 rounded-[6px] bg-white px-3 pt-[12px] pb-[8px] whitespace-nowrap shadow-popover"
          style={left ? { right: width - X(hi) + 9, top: 1 } : { left: X(hi) + 12, top: 1 }}
        >
          {tooltip(hi)}
        </div>
      )}
    </div>
  );
}

export function GroupedBars({
  groups,
  series,
  ticks,
  width,
  plotHeight,
  fmt = fmtNum,
  barWidth = 23,
  barGap = 2,
  labelClass,
  labelGap = 16,
  hidden = {},
  labelColor = "#2359d6",
  firstLabelColor,
  plotLeft,
}: {
  groups: string[];
  series: TrafficSeries[];
  ticks: number[];
  width: number;
  plotHeight: number;
  fmt?: (v: number) => string;
  barWidth?: number;
  barGap?: number;
  labelClass?: string;
  labelGap?: number;
  hidden?: Record<string, boolean>;
  labelColor?: string;
  firstLabelColor?: string;
  plotLeft?: number;
}) {
  const labels = ticks.map(fmt);
  const lw = Math.max(...labels.map((l) => textW(l)));
  const x0 = plotLeft ?? Math.round(lw + labelGap);
  const top = 8;
  const max = ticks[ticks.length - 1];
  const gw = (width - x0) / groups.length;
  const Y = (v: number) => top + plotHeight - (v / max) * plotHeight;
  const h = top + plotHeight + 26;
  const vis = series.filter((s) => !hidden[s.name]);
  const total = vis.length * barWidth + (vis.length - 1) * barGap;
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} className={`block overflow-visible ${labelClass ?? ""}`}>
      {ticks.map((t, i) => (
        <g key={t}>
          <line x1={x0} x2={width} y1={Y(t)} y2={Y(t)} stroke={i === 0 ? "#e0e1e5" : "#f0f0f2"} />
          <text x={x0 - 15} y={Y(t) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
            {labels[i]}
          </text>
        </g>
      ))}
      {groups.map((g, gi) => {
        const cx = x0 + gw * gi + gw / 2;
        return (
          <g key={g}>
            {vis.map((s, si) => {
              const v = s.data[gi];
              const bh = Math.max(2, (v / max) * plotHeight);
              return <rect key={s.name} x={cx - total / 2 + si * (barWidth + barGap)} y={top + plotHeight - bh} width={barWidth} height={bh} rx={1.5} fill={s.color} />;
            })}
            <text x={cx} y={top + plotHeight + 20} textAnchor="middle" fontSize={12} fill={gi === 0 && firstLabelColor ? firstLabelColor : labelColor}>
              {g}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export type TrendingPage = { kind: "Spiked" | "Trending up"; pct: string; url: string; value: string };

export function TrendIconSpike() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#007c65]">
      <path d="m1.5 12 4.5-5 3 3 5.5-6M10 4h4.5v4.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrendIconUp() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#007c65]">
      <path d="M8 14V2.5M3.5 7 8 2.5 12.5 7" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrendingCards({ pages, color = "#6167e6", fill = "#e3e3fa", cardWidth = 251 }: { pages: TrendingPage[]; color?: string; fill?: string; cardWidth?: number }) {
  return (
    <div className="-mr-5 flex gap-[15px] overflow-hidden pr-5">
      {pages.map((p) => (
        <div key={p.url + p.pct} className="h-[145px] shrink-0 rounded-[6px] border border-[#dcdde2] bg-white px-4 pt-[17px]" style={{ width: cardWidth }}>
          <div className="flex h-4 items-center gap-[5px] text-[12px] leading-4">
            {p.kind === "Spiked" ? <TrendIconSpike /> : <TrendIconUp />}
            <span className="-ml-[1px] font-semibold text-rk-text">{p.kind}</span>
            <span className="font-medium text-[#007c65]">{p.pct}</span>
          </div>
          <div
            className={`mt-[10px] h-[28px] items-center rounded-full bg-[#e8e8ea] pr-[6px] pl-[9px] text-[14px] leading-5 text-rk-muted ${p.url.includes("...") ? "flex w-full justify-between gap-[4px]" : "inline-flex gap-[5px]"}`}
          >
            <span className="truncate">{p.url}</span>
            <ExternalIcon width={15} height={15} className="shrink-0" />
          </div>
          <div className="mt-[2px] flex items-center gap-[7px]">
            <span className="text-[24px] leading-8 font-semibold text-rk-text">{p.value}</span>
            <Delta up className="mt-[4px]" />
          </div>
          <svg width={cardWidth - 33} height={20} className="mt-[3px] block">
            <path d={`M0 19.5 L${cardWidth - 33} 1 L${cardWidth - 33} 20 L0 20Z`} fill={fill} />
            <path d={`M0 19.5 L${(cardWidth - 33) * 0.5} 11.5 L${cardWidth - 33} 1`} fill="none" stroke={color} strokeWidth={1} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export type FlowSource = { name: string; delta: string; up: boolean; share: string; h: number };

export function SourcesFlow({
  sources,
  target,
  width,
  labelRight = 231,
  boxX,
  boxW = 120,
  targetColor = "#6167e6",
  band = "#e0e0f8",
  after,
}: {
  sources: FlowSource[];
  target: string;
  width: number;
  labelRight?: number;
  boxX: number;
  boxW?: number;
  targetColor?: string;
  band?: string;
  after?: ReactNode;
}) {
  const gap = 11;
  const H = 249;
  const rows = sources.map((s, i) => ({ ...s, y: sources.slice(0, i).reduce((acc, q) => acc + q.h + gap, 0) }));
  const y = sources.reduce((acc, q) => acc + q.h + gap, 0);
  const barX = labelRight + 13;
  const boxY = 117;
  const boxH = 46;
  const endX = boxX - 2;
  const tSpan = boxH - 8;
  const starts = rows.map((_, i) => boxY + 4 + rows.slice(0, i).reduce((acc, q) => acc + (tSpan * q.h) / (y - gap), 0));
  return (
    <div className="relative" style={{ width, height: H }}>
      <svg width={width} height={H} className="absolute top-0 left-0">
        {rows.map((r, i) => {
          const th = (tSpan * r.h) / (y - gap);
          const a = starts[i];
          const sx = barX + 8;
          const mx = (sx + endX) / 2;
          return <path key={r.name} d={`M${sx} ${r.y}C${mx} ${r.y} ${mx} ${a} ${endX} ${a}L${endX} ${a + th}C${mx} ${a + th} ${mx} ${r.y + r.h} ${sx} ${r.y + r.h}Z`} fill={band} />;
        })}
        {rows.map((r) => (
          <rect key={r.name} x={barX} y={r.y} width={8} height={r.h} fill={targetColor} />
        ))}
      </svg>
      {rows.map((r) => (
        <div key={r.name} className="absolute text-right" style={{ right: width - labelRight, top: r.y }}>
          <div className="text-[12px] leading-[14px] whitespace-nowrap text-rk-text">{r.name}</div>
          <div className="mt-[3px] flex items-center justify-end gap-[6px] text-[14px] leading-5 whitespace-nowrap">
            <span className={`flex items-center ${r.up ? "text-[#008a66]" : "text-[#d1002f]"}`}>
              <Delta up={r.up} className="mr-[1px]" />
              {r.delta}
            </span>
            <span className="font-semibold text-rk-text">{r.share}</span>
          </div>
        </div>
      ))}
      <svg width={14} height={14} viewBox="0 0 14 14" className="absolute text-[#6167e6]" style={{ left: boxX - 24, top: boxY + 16 }}>
        <path d="M1.5 7h11M8.5 3l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="absolute flex items-center justify-center rounded-[3px] text-[14px] text-white" style={{ left: boxX, top: boxY, width: boxW, height: boxH, background: targetColor }}>
        {target}
      </div>
      {after}
    </div>
  );
}

export type CloudWord = { text: string; size: number; color: string; x: number; y: number };

export function WordCloud({ words, height = 250 }: { words: CloudWord[]; height?: number }) {
  return (
    <div className="relative overflow-visible" style={{ height }}>
      {words.map((w) => (
        <span key={w.text} className="absolute leading-none whitespace-nowrap" style={{ left: w.x, top: w.y, fontSize: w.size, color: w.color }}>
          {w.text}
        </span>
      ))}
    </div>
  );
}
