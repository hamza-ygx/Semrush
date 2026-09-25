import type { ReactNode } from "react";

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

/** Tiny AI-visibility style gauge: grey arc with a coloured dot at the start. */
export function MiniGauge({ size = 34 }: { size?: number }) {
  return (
    <svg viewBox="0 0 34 20" width={size} height={(size * 20) / 34}>
      <path d="M4 17a13 13 0 0 1 26 0" fill="none" stroke="#e0e2e1" strokeWidth={5} />
      <circle cx="4" cy="17" r="2.6" fill="#fdc23c" />
    </svg>
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
