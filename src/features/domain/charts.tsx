import type { CSSProperties, ReactNode } from "react";

export type Pt = [number, number];

export const VBW = 1000;

export function pts(data: number[], max: number, h: number, from = 0, to = 1, min = 0): Pt[] {
  const n = data.length;
  return data.map((v, i) => [(from + ((to - from) * i) / Math.max(n - 1, 1)) * VBW, h - ((v - min) / (max - min || 1)) * h]);
}

export const linePath = (p: Pt[]) => p.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");

export const stepPath = (p: Pt[]) =>
  p.map(([x, y], i) => (i ? `H${x.toFixed(1)}V${y.toFixed(1)}` : `M${x.toFixed(1)} ${y.toFixed(1)}`)).join("");

export function smoothPath(p: Pt[]) {
  const n = p.length;
  if (n < 3) return linePath(p);
  const dx = p.slice(1).map((q, i) => q[0] - p[i][0]);
  const s = p.slice(1).map((q, i) => (q[1] - p[i][1]) / dx[i]);
  const m = p.map((_, i) => (i === 0 ? s[0] : i === n - 1 ? s[n - 2] : s[i - 1] * s[i] <= 0 ? 0 : (s[i - 1] + s[i]) / 2));
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / s[i];
    const b = m[i + 1] / s[i];
    const h = a * a + b * b;
    if (h > 9) {
      const t = 3 / Math.sqrt(h);
      m[i] = t * a * s[i];
      m[i + 1] = t * b * s[i];
    }
  }
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${(p[i][0] + h).toFixed(1)} ${(p[i][1] + m[i] * h).toFixed(1)} ${(p[i + 1][0] - h).toFixed(1)} ${(p[i + 1][1] - m[i + 1] * h).toFixed(1)} ${p[i + 1][0].toFixed(1)} ${p[i + 1][1].toFixed(1)}`;
  }
  return d;
}

export const areaUnder = (d: Pt[], path: string, h: number) => `${path}L${d[d.length - 1][0].toFixed(1)} ${h}L${d[0][0].toFixed(1)} ${h}Z`;

export function Stroke({ d, color, width = 2, dash, style }: { d: string; color: string; width?: number; dash?: string; style?: CSSProperties }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={style} />;
}

/**
 * Chart frame: horizontal gridlines at `ticks` (fractions from the bottom), optional left/right tick labels,
 * x labels at fractions of the plot width, and an SVG child layer in a 1000×height viewBox.
 */
export function Plot({
  height,
  ticks,
  left,
  right,
  x,
  leftW = 0,
  rightW = 0,
  bottomH = 24,
  gap = 8,
  xGap = 6,
  children,
  overlay,
  labelClass = "text-[12px] leading-4 text-rk-muted",
  gridColor = "#e7e8e8",
  baseColor = "#d6d8d7",
  className = "",
}: {
  height: number;
  ticks: number[];
  left?: string[];
  right?: string[];
  x?: { at: number; label: string }[];
  leftW?: number;
  rightW?: number;
  bottomH?: number;
  gap?: number;
  xGap?: number;
  children?: ReactNode;
  overlay?: ReactNode;
  labelClass?: string;
  gridColor?: string;
  baseColor?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ height: height + bottomH, paddingLeft: leftW, paddingRight: rightW }}>
      <div className="relative" style={{ height }}>
        {ticks.map((t, i) => (
          <div key={i} className="absolute right-0 left-0 border-t" style={{ bottom: `${t * 100}%`, borderColor: t === 0 ? baseColor : gridColor }} />
        ))}
        {left?.map((l, i) => (
          <span key={i} className={`absolute text-right whitespace-nowrap ${labelClass}`} style={{ bottom: `calc(${ticks[i] * 100}% - 8px)`, right: `calc(100% + ${gap}px)` }}>
            {l}
          </span>
        ))}
        {right?.map((l, i) => (
          <span key={i} className={`absolute whitespace-nowrap ${labelClass}`} style={{ bottom: `calc(${ticks[i] * 100}% - 8px)`, left: `calc(100% + ${gap}px)` }}>
            {l}
          </span>
        ))}
        <svg viewBox={`0 0 ${VBW} ${height}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {children}
        </svg>
        {overlay}
      </div>
      {x?.map((l) => (
        <span key={l.label + l.at} className={`absolute -translate-x-1/2 whitespace-nowrap ${labelClass}`} style={{ left: `calc(${leftW}px + (100% - ${leftW + rightW}px) * ${l.at})`, top: height + xGap }}>
          {l.label}
        </span>
      ))}
    </div>
  );
}
