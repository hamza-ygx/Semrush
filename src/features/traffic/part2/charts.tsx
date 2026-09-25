"use client";

import { Fragment, type ReactNode } from "react";

export type LineSeries = { name: string; color: string; data: (number | null)[] };

const charW: Record<string, number> = { M: 10.4, K: 8, ".": 3.3, "%": 9, " ": 3.4, "<": 7 };

export function labelWidth(s: string) {
  let w = 0;
  for (const c of s) w += charW[c] ?? 7.1;
  return w;
}

export function fmtAxis(v: number) {
  if (v === 0) return "0";
  if (v >= 1e6) return `${+(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${+(v / 1e3).toFixed(1)}K`;
  return `${v}`;
}

function fade(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c * a + 255 * (1 - a));
  return `rgb(${mix(n >> 16)},${mix((n >> 8) & 255)},${mix(n & 255)})`;
}

export function TrendLines({
  series,
  width,
  plotH = 176,
  ticks,
  labels,
  labelEvery = 1,
  fadeLast = true,
  format = fmtAxis,
  xLabelGap = 17,
  plotRight,
  dots = true,
}: {
  series: LineSeries[];
  width: number;
  plotH?: number;
  ticks: number[];
  labels: string[];
  labelEvery?: number;
  fadeLast?: boolean;
  format?: (v: number) => string;
  xLabelGap?: number;
  plotRight?: number;
  dots?: boolean;
}) {
  const top = 6;
  const tickLabels = ticks.map(format);
  const lw = Math.max(...tickLabels.map(labelWidth));
  const left = lw + 21;
  const right = plotRight ?? width - 10;
  const n = labels.length;
  const step = (right - left) / (n - 1);
  const max = ticks[ticks.length - 1];
  const x = (i: number) => left + i * step;
  const y = (v: number) => top + plotH - (v / max) * plotH;
  const h = top + plotH + xLabelGap + 8;
  return (
    <svg width={width} height={h} className="block overflow-visible">
      {ticks.map((t, i) => (
        <Fragment key={t}>
          <line x1={left} x2={width} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#d9dadd" : "#f0f0f1"} strokeWidth={1} />
          <text x={lw + 5} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
            {tickLabels[i]}
          </text>
        </Fragment>
      ))}
      {labels.map((l, i) =>
        i % labelEvery === 0 || i === n - 1 ? (
          <text key={l} x={x(i)} y={top + plotH + xLabelGap + 4} textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"} fontSize={12} fill="#6a6c6a">
            {l}
          </text>
        ) : null,
      )}
      {series.map((s) => {
        const pts = s.data.map((v, i) => (v == null ? null : ([x(i), y(v)] as const)));
        const solid = fadeLast ? pts.slice(0, -1) : pts;
        const segs: string[] = [];
        let cur = "";
        solid.forEach((p) => {
          if (!p) {
            if (cur) segs.push(cur);
            cur = "";
            return;
          }
          cur += `${cur ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
        });
        if (cur) segs.push(cur);
        const a = pts[n - 2];
        const b = pts[n - 1];
        const known = pts.map((p, i) => (p ? i : -1)).filter((i) => i >= 0);
        const gaps: string[] = [];
        if (known.length && known.length < n) {
          const f = pts[known[0]]!;
          const l = pts[known[known.length - 1]]!;
          if (known[0] > 0) gaps.push(`M${x(0)} ${f[1]}H${f[0]}`);
          known.slice(1).forEach((k, j) => {
            if (k - known[j] > 1) gaps.push(`M${pts[known[j]]![0]} ${pts[known[j]]![1]}L${pts[k]![0]} ${pts[k]![1]}`);
          });
          if (known[known.length - 1] < n - 1) gaps.push(`M${l[0]} ${l[1]}H${x(n - 1)}`);
        }
        return (
          <g key={s.name}>
            {gaps.map((d) => (
              <path key={d} d={d} fill="none" stroke="#cbd0d2" strokeWidth={2} strokeDasharray="3 3" />
            ))}
            {segs.map((d) => (
              <path key={d} d={d} fill="none" stroke={s.color} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
            ))}
            {fadeLast && a && b && <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={fade(s.color, 0.3)} strokeWidth={3} strokeLinecap="round" />}
            {dots &&
              pts.map((p, i) =>
                p ? <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill={fadeLast && i === n - 1 ? fade(s.color, 0.3) : s.color} stroke="#fff" strokeWidth={1} /> : null,
              )}
          </g>
        );
      })}
    </svg>
  );
}

export type SankeySource = { label: string; change: string; up: boolean; share: ReactNode; h: number };

export function Sankey({
  sources,
  target,
  width = 1196,
  labelRight = 231,
  barX = 244,
  barW = 8,
  gap = 11,
  targetX = 1004,
  targetTop,
  targetH = 45,
  flowEnd = 978,
  color = "#6167e6",
  flow = "#e0e0f8",
}: {
  sources: SankeySource[];
  target: ReactNode;
  width?: number;
  labelRight?: number;
  barX?: number;
  barW?: number;
  gap?: number;
  targetX?: number;
  targetTop?: number;
  targetH?: number;
  flowEnd?: number;
  color?: string;
  flow?: string;
}) {
  const total = sources.reduce((a, s) => a + s.h, 0) + gap * (sources.length - 1);
  const tTop = targetTop ?? Math.round(total / 2 - targetH / 2 + 16);
  const inner = targetH - 4;
  const sum = sources.reduce((a, s) => a + s.h, 0);
  const rows: (SankeySource & { y: number; ty: number; th: number })[] = [];
  for (let i = 0, yy = 0, ty = tTop + 2; i < sources.length; i++) {
    const s = sources[i];
    const th = (s.h / sum) * inner;
    rows.push({ ...s, y: yy, ty, th });
    yy += s.h + gap;
    ty += th;
  }
  const x0 = barX + barW;
  const mid = (x0 + flowEnd) / 2;
  return (
    <div className="relative" style={{ width, height: total }}>
      <svg width={width} height={total} className="absolute inset-0 block overflow-visible">
        {rows.map((r) => (
          <path
            key={r.label}
            d={`M${x0} ${r.y}C${mid} ${r.y} ${mid} ${r.ty} ${flowEnd} ${r.ty}L${flowEnd} ${r.ty + r.th}C${mid} ${r.ty + r.th} ${mid} ${r.y + r.h} ${x0} ${r.y + r.h}Z`}
            fill={flow}
          />
        ))}
        {rows.map((r) => (
          <rect key={r.label} x={barX} y={r.y} width={barW} height={r.h} fill={color} />
        ))}
        <path d={`M${targetX - 22} ${tTop + targetH / 2}h13m-5-5 5 5-5 5`} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {rows.map((r) => (
        <div key={r.label} className="absolute text-right" style={{ top: r.y - 1, right: width - labelRight }}>
          <div className="text-[12px] leading-[16px] whitespace-nowrap text-rk-text">{r.label}</div>
          <div className="mt-[3px] flex items-center justify-end gap-[6px] text-[14px] leading-[18px] whitespace-nowrap">
            <span className={r.up ? "text-[#009f81]" : "text-[#e0304a]"}>
              {r.up ? "↑" : "↓"}
              {r.change}
            </span>
            <span className="font-semibold text-rk-text">{r.share}</span>
          </div>
        </div>
      ))}
      <div
        className="absolute flex items-center rounded-[4px] pl-[28px] text-[14px] text-white"
        style={{ left: targetX, top: tTop, height: targetH, width: 200, background: color }}
      >
        {target}
      </div>
    </div>
  );
}
