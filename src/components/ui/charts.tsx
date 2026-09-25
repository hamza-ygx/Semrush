import type { ReactNode } from "react";

const pathFrom = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");

export function Sparkline({
  data,
  width = 120,
  height = 24,
  color = "#6167e6",
  fill = "#e2e4fb",
}: {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: string | null;
}) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const pts = data.map((v, i) => [(i / Math.max(data.length - 1, 1)) * width, height - 1 - ((v - min) / (max - min || 1)) * (height - 2)] as [number, number]);
  const line = pathFrom(pts);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      {fill && <path d={`${line}L${width} ${height}L0 ${height}Z`} fill={fill} />}
      <path d={line} fill="none" stroke={color} strokeWidth={1.2} />
    </svg>
  );
}

export type Series = { name: string; color: string; data: number[]; area?: boolean; dashed?: boolean; width?: number };

/** Generic line/area chart with y gridlines on the right or left and x labels. */
export function LineChart({
  series,
  labels,
  width = 700,
  height = 200,
  yTicks,
  yAxis = "right",
  max,
  padding = { top: 8, right: 40, bottom: 24, left: 8 },
  formatY = (v: number) => String(v),
  grid = true,
  children,
}: {
  series: Series[];
  labels?: string[];
  width?: number;
  height?: number;
  yTicks?: number[];
  yAxis?: "left" | "right" | "none";
  max?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  formatY?: (v: number) => string;
  grid?: boolean;
  children?: ReactNode;
}) {
  const n = Math.max(...series.map((s) => s.data.length));
  const hi = max ?? Math.max(...series.flatMap((s) => s.data), 1);
  const ticks = yTicks ?? [0, hi / 3, (2 * hi) / 3, hi].map((v) => Math.round(v));
  const top = Math.max(hi, ...ticks);
  const W = width - padding.left - padding.right;
  const H = height - padding.top - padding.bottom;
  const x = (i: number) => padding.left + (i / Math.max(n - 1, 1)) * W;
  const y = (v: number) => padding.top + H - (v / (top || 1)) * H;
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block overflow-visible" style={{ height }}>
      {grid &&
        ticks.map((t) => (
          <g key={t}>
            <line x1={padding.left} x2={padding.left + W} y1={y(t)} y2={y(t)} stroke="#e0e2e1" strokeDasharray={t === 0 ? undefined : "0"} />
            {yAxis !== "none" && (
              <text
                x={yAxis === "right" ? padding.left + W + 8 : padding.left - 8}
                y={y(t) + 4}
                textAnchor={yAxis === "right" ? "start" : "end"}
                fontSize="12"
                fill="#6a6c6a"
              >
                {formatY(t)}
              </text>
            )}
          </g>
        ))}
      {series.map((s) => {
        const pts = s.data.map((v, i) => [x(i), y(v)] as [number, number]);
        const d = pathFrom(pts);
        return (
          <g key={s.name}>
            {s.area && <path d={`${d}L${x(s.data.length - 1)} ${y(0)}L${x(0)} ${y(0)}Z`} fill={s.color} opacity={0.12} />}
            <path d={d} fill="none" stroke={s.color} strokeWidth={s.width ?? 2} strokeDasharray={s.dashed ? "4 3" : undefined} strokeLinejoin="round" />
          </g>
        );
      })}
      {labels?.map((l, i) =>
        l ? (
          <text key={i} x={x(i)} y={height - 6} textAnchor="middle" fontSize="12" fill="#6a6c6a">
            {l}
          </text>
        ) : null,
      )}
      {children}
    </svg>
  );
}

export function Donut({
  segments,
  size = 200,
  thickness = 32,
  children,
  gap = 0,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  children?: ReactNode;
  gap?: number;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const lens = segments.map((s) => (s.value / total) * c);
  const offsets = lens.map((_, i) => lens.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e0e2e1" strokeWidth={thickness} />
        {segments.map((s, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(lens[i] - gap, 0)} ${c}`}
              strokeDashoffset={-offsets[i]}
            />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}

/** Half-circle gauge (Site Health, AI Search Health, AI Visibility). value 0-100. */
export function SemiGauge({
  value,
  size = 176,
  thickness = 28,
  color = "#6167e6",
  track = "#e0e2e1",
  marker,
  children,
}: {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  track?: string;
  marker?: number;
  children?: ReactNode;
}) {
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const arc = (from: number, to: number) => {
    const a0 = Math.PI * (1 - from / 100);
    const a1 = Math.PI * (1 - to / 100);
    const p0 = [cx + r * Math.cos(a0), cy - r * Math.sin(a0)];
    const p1 = [cx + r * Math.cos(a1), cy - r * Math.sin(a1)];
    return `M${p0[0]} ${p0[1]}A${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`;
  };
  const h = size / 2 + 2;
  let mk: ReactNode = null;
  if (marker != null) {
    const a = Math.PI * (1 - marker / 100);
    const mx = cx + (r + thickness / 2 + 2) * Math.cos(a);
    const my = cy - (r + thickness / 2 + 2) * Math.sin(a);
    const deg = (-a * 180) / Math.PI + 90;
    mk = <path d="M-5 -7 L5 -7 L0 2 Z" transform={`translate(${mx} ${my}) rotate(${deg + 180})`} fill="#d1002f" />;
  }
  return (
    <div className="relative" style={{ width: size, height: h }}>
      <svg width={size} height={h} className="overflow-visible">
        <path d={arc(0, 100)} fill="none" stroke={track} strokeWidth={thickness} />
        {value > 0 && <path d={arc(0, value)} fill="none" stroke={color} strokeWidth={thickness} />}
        {mk}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">{children}</div>
    </div>
  );
}

/** Tiny AI-visibility style gauge: grey arc with a coloured dot at the start. */
export function MiniGauge({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 34 20" width={size} height={(size * 20) / 34}>
      <path d="M4 17a13 13 0 0 1 26 0" fill="none" stroke="#e0e2e1" strokeWidth={5} />
      <circle cx="4" cy="17" r="2.6" fill="#fdc23c" />
    </svg>
  );
}

export function HBar({ value, max = 100, color = "#6167e6", track = "#e0e2e1", height = 8, className = "" }: { value: number; max?: number; color?: string; track?: string; height?: number; className?: string }) {
  return (
    <div className={`w-full rounded-sm ${className}`} style={{ background: track, height }}>
      <div className="h-full rounded-sm" style={{ width: `${Math.min(100, (value / (max || 1)) * 100)}%`, background: color }} />
    </div>
  );
}

export function StackBar({ segments, height = 16, className = "" }: { segments: { value: number; color: string }[]; height?: number; className?: string }) {
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  return (
    <div className={`flex w-full gap-px overflow-hidden rounded-sm ${className}`} style={{ height }}>
      {segments.map((s, i) => (
        <div key={i} style={{ width: `${(s.value / total) * 100}%`, background: s.color }} />
      ))}
    </div>
  );
}
