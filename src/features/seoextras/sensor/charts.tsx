"use client";

import { useId, useState } from "react";
import { sensorDates } from "../data";

export const LOW = "#6466e0";
export const NORMAL = "#00b327";
export const HIGH = "#f29300";
export const VERY_HIGH = "#fd3140";

export const bandColor = (v: number) => (v < 2 ? LOW : v < 5 ? NORMAL : v < 8 ? HIGH : VERY_HIGH);

const X0 = 62;
const DX = 23.14;
const xAt = (i: number) => X0 + i * DX;
const xDev = (i: number) => X0 - 3 + i * 23.31;

export function monotonePath(pts: [number, number][]) {
  const n = pts.length;
  if (n < 2) return "";
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1][0] - pts[i][0]);
    m.push((pts[i + 1][1] - pts[i][1]) / dx[i]);
  }
  const t: number[] = [m[0]];
  for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (3 * (dx[i - 1] + dx[i])) / ((2 * dx[i] + dx[i - 1]) / m[i - 1] + (dx[i] + 2 * dx[i - 1]) / m[i]));
  t.push(m[n - 2]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${pts[i][0] + h},${pts[i][1] + t[i] * h} ${pts[i + 1][0] - h},${pts[i + 1][1] - t[i + 1] * h} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
}

function XAxis({ y, at = xAt }: { y: number; at?: (i: number) => number }) {
  const last = sensorDates.length - 1;
  return (
    <g fontSize={12} fill="#6a6c6a">
      {sensorDates.map((d, i) =>
        i === last ? (
          <g key={d}>
            <rect x={at(i) - 22} y={y - 11} width={44} height={22} rx={3} fill="#5b5d5c" />
            <text x={at(i)} y={y + 4.5} textAnchor="middle" fill="white" fontWeight={500}>
              {d}
            </text>
          </g>
        ) : (i - 2) % 3 === 0 && i < last - 1 ? (
          <text key={d} x={at(i)} y={y + 4.5} textAnchor="middle">
            {d}
          </text>
        ) : null,
      )}
    </g>
  );
}

const longDate = (i: number) => new Date(Date.UTC(2026, 7, 26 + i)).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

function Tooltip({ i, x, y, label, value, color, valueColor }: { i: number; x: number; y: number; label: string; value: string; color: string; valueColor?: string }) {
  const left = x > 560;
  return (
    <foreignObject x={left ? x - 168 : x + 10} y={y - 21} width={158} height={67} className="pointer-events-none overflow-visible">
      <div className="h-[67px] rounded-md bg-white px-3 pt-[11px] shadow-popover">
        <div className="text-[12px] leading-4 whitespace-nowrap text-rk-muted">{longDate(i)}</div>
        <div className="mt-[7px] flex h-5 items-center gap-[8px] text-[13px] text-rk-text">
          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
          {label}
          <b className="ml-auto text-[14px] font-semibold" style={valueColor ? { color: valueColor } : undefined}>
            {value}
          </b>
        </div>
      </div>
    </foreignObject>
  );
}

const bandName = (v: number) => (v < 2 ? "Low" : v < 5 ? "Normal" : v < 8 ? "High" : "Very High");

export function VolatilityChart({ data, top = 145, bottom = 373 }: { data: (number | null)[]; top?: number; bottom?: number }) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const k = (bottom - top) / 10;
  const y = (v: number) => bottom - v * k;
  const pts = data.map((v, i) => (v == null ? null : ([xAt(i), y(v)] as [number, number]))).filter((p): p is [number, number] => !!p);
  const line = monotonePath(pts);
  const area = `${line}L${pts[pts.length - 1][0]},${bottom}L${pts[0][0]},${bottom}Z`;
  const bands = [
    { id: "l", y0: y(2), y1: bottom + 4, stroke: LOW, fill: "#dcdcf7" },
    { id: "n", y0: y(5), y1: y(2), stroke: "#12a83a", fill: "#cdeed5" },
    { id: "h", y0: y(8), y1: y(5), stroke: HIGH, fill: "#fbe3c2" },
    { id: "v", y0: top - 10, y1: y(8), stroke: VERY_HIGH, fill: "#fdd3d6" },
  ];
  const lastX = xAt(data.length - 1);
  return (
    <svg viewBox={`0 0 779 ${bottom + 60}`} width={779} height={bottom + 60} className="pointer-events-none absolute top-0 left-0 overflow-visible" onMouseLeave={() => setHover(null)}>
      <defs>
        {bands.map((b) => (
          <clipPath key={b.id} id={`${uid}${b.id}`}>
            <rect x={0} y={b.y0} width={779} height={b.y1 - b.y0} />
          </clipPath>
        ))}
      </defs>
      {[10, 8, 5, 2, 0].map((v) => (
        <g key={v}>
          <text x={46} y={y(v) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
            {v}
          </text>
          <line x1={60} x2={759} y1={y(v)} y2={y(v)} stroke="#eeeff2" />
        </g>
      ))}
      {bands.map((b) => (
        <g key={b.id} clipPath={`url(#${uid}${b.id})`}>
          <path d={area} fill={b.fill} />
          <path d={line} fill="none" stroke={b.stroke} strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
      <line x1={lastX} x2={lastX} y1={top} y2={bottom} stroke="#8b8d8c" strokeDasharray="4 3" />
      {hover != null && data[hover] != null && <rect x={xAt(hover) - 5.5} y={top} width={12} height={bottom - top} fill="#b9bbbb" opacity={0.7} />}
      {data.map((v, i) => (v == null ? null : <circle key={i} cx={xAt(i)} cy={y(v)} r={hover === i ? 5 : 4} fill={bandColor(v)} stroke={hover === i ? "#fff" : "none"} strokeOpacity={0.5} />))}
      <XAxis y={bottom + 39} />
      {data.map((v, i) =>
        v == null ? null : <rect key={`h${i}`} data-testid={`vol-hit-${i}`} x={xAt(i) - DX / 2} y={top} width={DX} height={bottom - top} fill="transparent" pointerEvents="all" onMouseEnter={() => setHover(i)} />,
      )}
      {hover != null && data[hover] != null && <Tooltip i={hover} x={xAt(hover)} y={y(data[hover]!)} label={bandName(data[hover]!)} value={data[hover]!.toFixed(1)} color={bandColor(data[hover]!)} valueColor={bandColor(data[hover]!)} />}
    </svg>
  );
}

const devColor = (v: number) => (v >= 5.7 ? VERY_HIGH : v >= 4.2 ? HIGH : NORMAL);

export function DeviationChart({ data, avg = 1.7, top = 138, bottom = 370 }: { data: (number | null)[]; avg?: number; top?: number; bottom?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const k = (bottom - top) / 10;
  const y = (v: number) => bottom - v * k;
  const lastX = xDev(data.length - 1);
  return (
    <svg viewBox={`0 0 779 ${bottom + 60}`} width={779} height={bottom + 60} className="pointer-events-none absolute top-0 left-0 overflow-visible" onMouseLeave={() => setHover(null)}>
      {[10, 5.7, 4.2, avg, 0].map((v) => (
        <g key={v}>
          <text x={43} y={y(v) + 4} textAnchor="end" fontSize={12} fill="#6a6c6a">
            {v}
          </text>
          <line x1={57} x2={759} y1={y(v)} y2={y(v)} stroke="#eeeff2" />
        </g>
      ))}
      <line x1={lastX} x2={lastX} y1={top} y2={bottom} stroke="#8b8d8c" strokeDasharray="4 3" />
      {data.map((v, i) => (v == null ? null : <line key={i} x1={xDev(i)} x2={xDev(i)} y1={y(avg)} y2={y(v)} stroke={devColor(v)} strokeWidth={1.4} />))}
      <line x1={xDev(0)} x2={lastX} y1={y(avg)} y2={y(avg)} stroke="#8b8d8c" strokeWidth={3} />
      {data.map((v, i) => (v == null ? null : <circle key={`c${i}`} cx={xDev(i)} cy={y(v)} r={hover === i ? 5.5 : 4} fill={devColor(v)} />))}
      <XAxis y={bottom + 36} at={xDev} />
      {data.map((v, i) =>
        v == null ? null : <rect key={`h${i}`} x={xDev(i) - DX / 2} y={top} width={DX} height={bottom - top} fill="transparent" pointerEvents="all" onMouseEnter={() => setHover(i)} />,
      )}
      {hover != null && data[hover] != null && (
        <Tooltip i={hover} x={xDev(hover)} y={y(data[hover]!)} label="Deviation" value={`${data[hover]! >= avg ? "+" : ""}${(data[hover]! - avg).toFixed(1)}`} color={devColor(data[hover]!)} />
      )}
    </svg>
  );
}

export function Legend({ items }: { items: { color: string; label: string; dash?: boolean }[] }) {
  return (
    <div className="flex items-center gap-4 text-[14px] leading-5 text-rk-text">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-[4px]">
          {it.dash ? <span className="mx-[3px] h-[2px] w-[9px] bg-[#8b8d8c]" /> : <span className="h-3 w-3 rounded-full" style={{ background: it.color }} />}
          {it.label}
        </span>
      ))}
    </div>
  );
}
