import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { C, issueCounts, issueId, type IssueGroup } from "./data";

export const Dot = ({
  color,
  size = 12,
  className = "",
}: {
  color: string;
  size?: number;
  className?: string;
}) => (
  <span
    className={`inline-block shrink-0 rounded-full ${className}`}
    style={{ width: size, height: size, background: color }}
  />
);

export function Ring({
  segments,
  size = 180,
  thickness = 28,
  children,
  sep = true,
}: {
  segments: { value: number; color: string }[];
  size?: number;
  thickness?: number;
  children?: ReactNode;
  sep?: boolean;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  const shown = segments.filter((s) => s.value > 0);
  const lens = shown.map((s) => (s.value / total) * c);
  const offsets = lens.map((_, i) =>
    lens.slice(0, i).reduce((a, b) => a + b, 0),
  );
  const cx = size / 2;
  return (
    <div
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {shown.map((s, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={thickness}
            strokeDasharray={`${lens[i]} ${c}`}
            strokeDashoffset={-offsets[i]}
          />
        ))}
        {sep &&
          shown.length > 1 &&
          offsets.map((o, i) => {
            const a = (o / c) * 2 * Math.PI;
            return (
              <line
                key={i}
                x1={cx + (r - thickness / 2) * Math.cos(a)}
                y1={cx + (r - thickness / 2) * Math.sin(a)}
                x2={cx + (r + thickness / 2) * Math.cos(a)}
                y2={cx + (r + thickness / 2) * Math.sin(a)}
                stroke="#fff"
                strokeWidth={1.5}
              />
            );
          })}
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  );
}

export function ScoreRing({
  value,
  size = 22,
  thickness = 4,
}: {
  value: number;
  size?: number;
  thickness?: number;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#e0e2e1"
        strokeWidth={thickness}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={C.blue}
        strokeWidth={thickness}
        strokeDasharray={`${(value / 100) * c} ${c}`}
      />
    </svg>
  );
}

export function BarChart({
  data,
  width,
  height,
  max,
  ticks,
  left = 48,
  bottom = 40,
  top = 8,
  right = 0,
  barGap = 3,
  yTitle = "Pages",
  xTitle,
  rotate = false,
  fontSize = 12,
  color = C.blue,
  tickGap = 15,
  titleGap = 45,
  labelGap = 22,
}: {
  data: { label: string; value: number }[];
  width: number;
  height: number;
  max: number;
  ticks: number[];
  left?: number;
  bottom?: number;
  top?: number;
  right?: number;
  barGap?: number;
  yTitle?: string;
  xTitle?: string;
  rotate?: boolean;
  fontSize?: number;
  color?: string;
  tickGap?: number;
  titleGap?: number;
  labelGap?: number;
}) {
  const W = width - left - right;
  const H = height - top - bottom;
  const bw = W / data.length;
  const y = (v: number) => top + H - (v / max) * H;
  return (
    <svg
      width={width}
      height={height}
      className="block overflow-visible"
      fontFamily="inherit"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={left}
            x2={left + W}
            y1={y(t)}
            y2={y(t)}
            stroke={t === 0 ? "#d6d8d7" : "#e0e2e1"}
          />
          <text
            x={left - tickGap}
            y={y(t) + 4}
            textAnchor="end"
            fontSize={fontSize}
            fill="#6a6c6a"
          >
            {t}
          </text>
        </g>
      ))}
      <text
        transform={`translate(${left - titleGap} ${top + H / 2}) rotate(-90)`}
        textAnchor="middle"
        fontSize={fontSize}
        fill="#6a6c6a"
      >
        {yTitle}
      </text>
      {data.map((d, i) => {
        const x = left + i * bw;
        return (
          <g key={d.label}>
            {d.value > 0 && (
              <rect
                x={x + barGap / 2}
                y={y(d.value)}
                width={bw - barGap}
                height={top + H - y(d.value)}
                fill={color}
              />
            )}
            {rotate ? (
              <text
                transform={`translate(${x + bw / 2 + 4} ${top + H + 14}) rotate(-45)`}
                textAnchor="end"
                fontSize={fontSize}
                fill="#6a6c6a"
              >
                {d.label}
              </text>
            ) : (
              <text
                x={x + bw / 2}
                y={top + H + labelGap}
                textAnchor="middle"
                fontSize={fontSize}
                fill="#6a6c6a"
              >
                {d.label}
              </text>
            )}
          </g>
        );
      })}
      {xTitle && (
        <text
          x={left + W / 2}
          y={height - 2}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#6a6c6a"
        >
          {xTitle}
        </text>
      )}
    </svg>
  );
}

export function Venn({
  size = 200,
  big = 160,
  small = 124,
  offset = 72,
}: {
  size?: number;
  big?: number;
  small?: number;
  offset?: number;
}) {
  const R = big / 2;
  const r = small / 2;
  const cy = size / 2;
  const cx1 = R;
  const cx2 = R + offset;
  return (
    <svg width={cx2 + r + 2} height={size} className="block">
      <defs>
        <clipPath id={`venn-${size}`}>
          <circle cx={cx1} cy={cy} r={R} />
        </clipPath>
      </defs>
      <circle cx={cx1} cy={cy} r={R} fill={C.lavender} />
      <circle cx={cx2} cy={cy} r={r} fill={C.mint} />
      <circle
        cx={cx2}
        cy={cy}
        r={r}
        fill={C.overlap}
        clipPath={`url(#venn-${size})`}
      />
      <circle
        cx={cx2}
        cy={cy}
        r={r}
        fill="none"
        stroke="#fff"
        strokeWidth={1.5}
      />
      <path
        d={arcInside(cx1, R, cx2, r, cy)}
        fill="none"
        stroke="#fff"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function arcInside(cx1: number, R: number, cx2: number, r: number, cy: number) {
  const d = cx2 - cx1;
  const x = (d * d - r * r + R * R) / (2 * d);
  const h = Math.sqrt(Math.max(R * R - x * x, 0));
  return `M${cx1 + x} ${cy - h}A${R} ${R} 0 0 1 ${cx1 + x} ${cy + h}`;
}

export const LearnMore = ({
  children = "Learn more",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) => (
  <button
    type="button"
    className={`dotted-underline text-[14px] leading-5 text-rk-muted hover:text-rk-text ${className}`}
  >
    {children}
  </button>
);

const sevColor = { Errors: "#ff6b70", Warnings: "#ea8e0e", Notices: "#b0bbf5" };

export function IssuesCard({
  title,
  groups,
  info = false,
  className = "",
  counts,
  extra,
}: {
  title: string;
  groups: IssueGroup[];
  info?: boolean;
  className?: string;
  counts?: Record<string, number>;
  extra?: Record<string, { note: string; value: string }>;
}) {
  return (
    <div className={`rounded-md bg-white pb-3 shadow-card ${className}`}>
      <div className="flex h-10 items-center gap-2 border-b border-rk-border px-5">
        <h3 className="text-[16px] leading-5 font-semibold">{title}</h3>
        {info && <InfoI />}
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_136px_auto]">
        {groups.map((g, gi) => (
          <Fragment key={g.severity}>
            <div className={`col-span-3 px-5 pb-[9px] text-[14px] leading-5 font-semibold ${gi ? "pt-[17px]" : "pt-[7px]"}`}>{g.severity}</div>
            <div className="col-span-3 h-[3px]" style={{ background: sevColor[g.severity] }} />
            {g.items.map((name, i) => {
              const x = extra?.[name];
              const na = !!counts && !(name in counts);
              const n = (counts ?? issueCounts)[name] ?? 0;
              if (x)
                return (
                  <div key={name} className={`col-span-3 grid min-h-[45px] grid-cols-subgrid items-center px-5 py-[12px] ${i < g.items.length - 1 ? "border-b border-rk-border" : ""}`}>
                    <span className="min-w-0 pr-6 text-[14px] leading-5">{name}</span>
                    <span className="justify-self-start text-[14px] leading-5 whitespace-nowrap text-rk-muted">{x.note}</span>
                    <span className="text-right text-[14px] whitespace-nowrap text-rk-text-2">{x.value}</span>
                  </div>
                );
              return (
                <div key={name} className={`col-span-3 grid min-h-[45px] grid-cols-subgrid items-center px-5 py-[12px] ${i < g.items.length - 1 ? "border-b border-rk-border" : ""}`}>
                  <span className="min-w-0 pr-6 text-[14px] leading-5">{name}</span>
                  <LearnMore className="justify-self-start">{n ? "How to fix" : "Learn more"}</LearnMore>
                  <span className="-my-1 flex justify-end">
                    {na ? (
                      <span className="text-[14px] whitespace-nowrap text-rk-muted">n/a</span>
                    ) : n ? (
                      <Link
                        href={routes.siteAuditCampaign.issueDetail(issueId(name))}
                        className="flex h-7 items-center rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] whitespace-nowrap text-rk-text-2 hover:bg-rk-hover"
                      >
                        {n} {counts && n === 1 ? "issue" : "issues"}
                      </Link>
                    ) : (
                      <span className="text-[14px] whitespace-nowrap text-rk-success">No issues</span>
                    )}
                  </span>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export const InfoI = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`inline-block shrink-0 text-[#8b8d8c] ${className}`}>
    <circle cx="9.9" cy="3.4" r="1.25" fill="currentColor" />
    <path d="M7 6.6h2.1L7.5 13M6 13h3" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
