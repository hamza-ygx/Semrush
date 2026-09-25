"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export function useWidth<T extends HTMLElement>(initial = 800) {
  const ref = useRef<T>(null);
  const [w, setW] = useState(initial);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export type Pad = { top: number; right: number; bottom: number; left: number };

export function StackedBars({
  data,
  colors,
  height,
  max,
  ticks,
  labels,
  pad,
  barRatio = 0.6,
  highlightLast = false,
  formatTick = (v: number) => String(v),
  overlay,
  tickX = -12,
  inset = 0,
  tip,
  testId,
  labelY = 22,
}: {
  data: number[][];
  colors: string[];
  height: number;
  max: number;
  ticks: number[];
  labels: string[];
  pad: Pad;
  barRatio?: number;
  highlightLast?: boolean;
  formatTick?: (v: number) => string;
  overlay?: (g: { x: (i: number) => number; y: (v: number) => number; step: number; w: number }) => ReactNode;
  tickX?: number;
  inset?: number;
  tip?: { render: (i: number) => ReactNode; width: number; top: number; marker?: (x: number, y: number) => ReactNode };
  testId?: string;
  labelY?: number;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const n = data.length;
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;
  const step = (W - 2 * inset) / n;
  const bw = Math.max(1, step * barRatio);
  const x = (i: number) => pad.left + inset + step * i + step / 2;
  const y = (v: number) => pad.top + H - (v / max) * H;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div ref={ref} data-testid={testId} className="relative w-full" onMouseLeave={() => setHover(null)}>
      <svg width={width} height={height} className="block">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={pad.left + W} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#c4c7cf" : "#e8e9ee"} />
            <text x={pad.left + tickX} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#6c6e79">
              {formatTick(t)}
            </text>
          </g>
        ))}
        {highlightLast && <rect x={x(n - 1) - Math.min(step, 11) / 2} y={pad.top} width={Math.min(step, 11)} height={H} fill="#e0e1e9" opacity={0.8} />}
        {hover != null && !tip && <rect x={x(hover) - step / 2} y={pad.top - 12} width={step} height={H + 12} fill="#e0e1e9" opacity={0.6} />}
        {hover != null && tip && <line x1={x(hover) + 0.5} x2={x(hover) + 0.5} y1={0} y2={y(0)} stroke="#e0e0e0" />}
        {data.map((d, i) => {
          let acc = 0;
          return (
            <g key={i} data-col={i} onMouseEnter={() => setHover(i)}>
              <rect x={x(i) - step / 2} y={pad.top} width={step} height={H} fill="transparent" />
              {d.map((v, k) => {
                if (!v) return null;
                const y0 = y(acc);
                acc += v;
                const y1 = y(acc);
                return <rect key={k} x={x(i) - bw / 2} y={y1} width={bw} height={Math.max(0, y0 - y1)} fill={colors[k]} />;
              })}
            </g>
          );
        })}
        {labels.map((l, i) =>
          l ? (
            <text key={i} x={x(i)} y={height - pad.bottom + labelY} textAnchor="middle" fontSize="12" fill="#6c6e79">
              {l}
            </text>
          ) : null,
        )}
        {overlay?.({ x, y, step, w: width })}
        {hover != null && tip?.marker?.(x(hover), y(0))}
      </svg>
      {hover != null && tip && (
        <div className="pointer-events-none absolute z-30 rounded-md bg-white shadow-popover" style={{ top: tip.top, width: tip.width, left: x(hover) + 6 + tip.width > width + 40 ? x(hover) - 6 - tip.width : x(hover) + 6 }}>
          {tip.render(hover)}
        </div>
      )}
      {hover != null && !tip && (
        <div className="pointer-events-none absolute top-2 z-20 rounded-md bg-white px-3 py-2 text-[12px] shadow-popover" style={{ left: Math.min(x(hover) + 12, width - 150) }}>
          <div className="font-semibold">{labels[hover] || `#${hover + 1}`}</div>
          <div>Total: {data[hover].reduce((a, b) => a + b, 0)}</div>
        </div>
      )}
    </div>
  );
}

export function GoogleG({ x, y, size = 12 }: { x: number; y: number; size?: number }) {
  const r = size / 2;
  return (
    <g transform={`translate(${x - r} ${y - r}) scale(${size / 16})`}>
      <circle cx="8" cy="8" r="8" fill="#fff" />
      <path d="M15.5 8.2c0-.6-.1-1.1-.2-1.6H8v3h4.2a3.6 3.6 0 0 1-1.6 2.4v2h2.6c1.5-1.4 2.3-3.4 2.3-5.8z" fill="#4285f4" />
      <path d="M8 16c2.2 0 4-.7 5.3-2l-2.6-2c-.7.5-1.6.8-2.7.8-2.1 0-3.9-1.4-4.5-3.3H.8v2.1A8 8 0 0 0 8 16z" fill="#34a853" />
      <path d="M3.5 9.5a4.8 4.8 0 0 1 0-3V4.4H.8a8 8 0 0 0 0 7.2z" fill="#fbbc04" />
      <path d="M8 3.2c1.2 0 2.2.4 3 1.2l2.3-2.3A8 8 0 0 0 .8 4.4l2.7 2.1C4.1 4.6 5.9 3.2 8 3.2z" fill="#ea4335" />
    </g>
  );
}

export function BubbleMap({
  items,
  height = 260,
  pad = { top: 16, right: 20, bottom: 50, left: 72 },
  xMax = 145,
  yMax = 500,
  xTicks = [0, 50, 100],
  yTicks = [0, 200, 400],
  tickGap = 18,
  labelGap = 44,
}: {
  items: { domain: string; color: string; keywords: number; traffic: number; r: number }[];
  height?: number;
  pad?: Pad;
  xMax?: number;
  yMax?: number;
  xTicks?: number[];
  yTicks?: number[];
  tickGap?: number;
  labelGap?: number;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;
  const x = (v: number) => pad.left + (v / xMax) * W;
  const y = (v: number) => pad.top + H - (v / yMax) * H;
  const h = items.find((i) => i.domain === hover);
  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} className="block overflow-visible">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={pad.left + W} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#c4c7cf" : "#e8e9ee"} />
            <text x={pad.left - tickGap} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#6c6e79">
              {t}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={t} x={x(t)} y={pad.top + H + 22} textAnchor="middle" fontSize="12" fill="#6c6e79">
            {t}
          </text>
        ))}
        <text x={pad.left + W / 2} y={height - 6} textAnchor="middle" fontSize="12" fill="#6c6e79">
          Number of Keywords
        </text>
        <text transform={`translate(${pad.left - labelGap} ${pad.top + H / 2}) rotate(-90)`} textAnchor="middle" fontSize="12" fill="#6c6e79">
          Organic Search Traffic (N)
        </text>
        {items.map((it) => (
          <g key={it.domain} data-bubble={it.domain} onMouseEnter={() => setHover(it.domain)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
            <circle cx={x(it.keywords)} cy={y(it.traffic)} r={it.r} fill={it.color} opacity={0.5} stroke="#fff" strokeWidth={1} />
            <path d={`M${x(it.keywords) - 3} ${y(it.traffic)}h6M${x(it.keywords)} ${y(it.traffic) - 3}v6`} stroke={it.color} strokeWidth={1.4} />
          </g>
        ))}
      </svg>
      {h && (
        <div className="pointer-events-none absolute z-20 min-w-[110px] rounded-md bg-white px-3 pt-[12px] pb-[12px] text-[12px] leading-4 shadow-popover" style={{ left: Math.min(x(h.keywords) + 8, width - 180), top: Math.max(0, y(h.traffic) - 40) }}>
          <div className="text-rk-muted">{h.domain}</div>
          <div className="mt-2 flex justify-between gap-3">
            Keywords<b className="font-semibold">{h.keywords}</b>
          </div>
          <div className="flex justify-between gap-3">
            Traffic<b className="font-semibold">{h.traffic}</b>
          </div>
        </div>
      )}
    </div>
  );
}
