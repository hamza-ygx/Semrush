"use client";

import { useState, type ReactNode } from "react";
import { Info } from "@/components/ui/primitives";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { ArrowDown, ArrowUp, ExportIcon } from "@/components/ui/icons";
import type { AiNote, Insight, Opportunity, Timeframe } from "./data";

export function YouBadge() {
  return <span className="rounded-[9px] bg-[#e4e3fa] px-[8px] text-[12px] leading-[17px] font-normal text-[#5a50c8]">you</span>;
}

export function Dot({ color, size = 12, className = "" }: { color: string; size?: number; className?: string }) {
  return <span className={`inline-block shrink-0 rounded-full ${className}`} style={{ background: color, width: size, height: size }} />;
}

export function SparkleIcon() {
  return (
    <svg viewBox="0 0 16 16" width={18} height={18} aria-hidden className="shrink-0">
      <path d="M6 4.5c.5 3 1.7 4.4 5 5-3.3.6-4.5 2-5 5-.5-3-1.7-4.4-5-5 3.3-.6 4.5-2 5-5z" fill="#7a3fe0" />
      <path d="M12.6 .8c.3 1.7.9 2.4 2.8 2.8-1.9.4-2.5 1.1-2.8 2.8-.3-1.7-.9-2.4-2.8-2.8 1.9-.4 2.5-1.1 2.8-2.8z" fill="#7a3fe0" />
    </svg>
  );
}

export function AnswersIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" width={18} height={18} aria-hidden className={`shrink-0 ${className}`}>
      <path d="M13.6 9.6A5.3 5.3 0 1 1 9.4 4" fill="none" stroke="#235fe2" strokeWidth={1.7} strokeLinecap="round" />
      <path d="M4.6 13.6 3.3 15.6l2.7-.6" fill="none" stroke="#235fe2" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.4 2.2v3.4M11.7 3.9h3.4" stroke="#235fe2" strokeWidth={1.7} strokeLinecap="round" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden className="shrink-0">
      <path d="M8 1.8 13 3.6v4c0 3-2.1 5.4-5 6.6-2.9-1.2-5-3.6-5-6.6v-4z" fill="none" stroke="#1b1e1a" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="m5.6 7.9 1.7 1.7 3.2-3.2" fill="none" stroke="#1b1e1a" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BulbIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden className="shrink-0">
      <path d="M8 1.6a5 5 0 0 0-3 9c.6.5.9 1 .9 1.7h4.2c0-.7.3-1.2.9-1.7a5 5 0 0 0-3-9z" fill="none" stroke="#1b1e1a" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M6.2 14.6h3.6" stroke="#1b1e1a" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M8.6 4.6 6.9 7.4h2.2L7.4 10.2" fill="none" stroke="#1b1e1a" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WarnIcon() {
  return (
    <svg viewBox="0 0 16 16" width={18} height={18} aria-hidden className="shrink-0">
      <path d="M8 1.8 15 14H1z" fill="none" stroke="#484a49" strokeWidth={1.4} strokeLinejoin="round" />
      <path d="M8 6.2v3.6" stroke="#484a49" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="8" cy="11.8" r=".9" fill="#484a49" />
    </svg>
  );
}

export function ReportCard({
  title,
  subtitle,
  action,
  children,
  testid,
  className = "",
  info = true,
}: {
  title: ReactNode;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  testid?: string;
  className?: string;
  info?: boolean;
}) {
  return (
    <section data-testid={testid} className={`mt-6 rounded-lg bg-white shadow-card first:mt-0 ${className}`}>
      <div className={`border-b border-[#f0f0f0] px-5 ${action ? "pt-[11px]" : subtitle ? "pt-[10px]" : "pt-[9px]"} ${subtitle ? "pb-[7px]" : action ? "pb-[11px]" : "pb-[10px]"}`}>
        <div className="flex h-5 items-center justify-between">
          <h2 className="flex items-center gap-[6px] text-[16px] leading-5 font-semibold text-rk-text">
            {title}
            {info && <Info className="-mt-[6px]" />}
          </h2>
          {action}
        </div>
        {subtitle && <p className="mt-[10px] text-[14px] leading-5 text-rk-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export function ExportButton() {
  return (
    <button
      type="button"
      className="-mr-[1px] flex h-7 items-center gap-[7px] rounded-[6px] border border-[#c9cbd1] bg-[#f4f5f5] px-[8px] text-[14px] text-rk-text-2 hover:bg-rk-hover"
    >
      <ExportIcon width={16} height={16} />
      Export
    </button>
  );
}

export function AiNotePanel({ note }: { note: AiNote }) {
  return (
    <div className="border-b border-[#ebe9f3] bg-[linear-gradient(90deg,#faf8fe_0%,#f6f6fd_55%,#f1f6ff_100%)] px-5 pt-4 pb-[21px]">
      <div className="flex items-center gap-2">
        <span className="-mt-[6px]">
          <SparkleIcon />
        </span>
        <span className="text-[16px] leading-6 font-semibold text-[#7a45dd]">{note.title}</span>
      </div>
      <p className="mt-1 max-w-[744px] pl-6 text-[16px] leading-6 text-rk-text">{note.text}</p>
    </div>
  );
}

export function InsightsCard({ items }: { items: Insight[] }) {
  return (
    <ReportCard title="Insights" info={false} testid="insights">
      <div className="px-5 pt-5 pb-5">
        <p className="text-[14px] leading-5 text-rk-muted">AI-generated strategy based on the latest data update.</p>
        {items.map((it) => (
          <div key={it.title} className="mt-5">
            <div className="flex items-center gap-2">
              <Dot color="#7d5ff0" />
              <span className="text-[16px] leading-6 font-semibold text-rk-text">{it.title}</span>
            </div>
            <p className="mt-1 pl-5 text-[14px] leading-5 text-rk-text">{it.text}</p>
          </div>
        ))}
      </div>
    </ReportCard>
  );
}

export function SectionLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <div id={id} data-testid={id} className="mt-6 mb-6 flex items-center gap-[6px] text-[16px] leading-6 text-rk-muted">
      {children}
      <ArrowDown width={16} height={16} />
    </div>
  );
}

export function CheckBox({ color, on, onClick, label, bold, you, muted, testid }: { color: string; on: boolean; onClick?: () => void; label: ReactNode; bold?: boolean; you?: boolean; muted?: boolean; testid?: string }) {
  return (
    <button type="button" data-testid={testid} onClick={onClick} className="flex items-center gap-2 text-[14px] leading-5 whitespace-nowrap">
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border"
        style={on ? { background: color, borderColor: color } : { background: "#fff", borderColor: "#e0e2e1" }}
      >
        {on && (
          <svg viewBox="0 0 16 16" width={12} height={12} aria-hidden>
            <path d="m3.5 8.3 2.8 2.8 6-6" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={`${bold ? "font-semibold" : ""} ${muted ? "text-rk-faint" : "text-rk-text"}`}>{label}</span>
      {you && <YouBadge />}
    </button>
  );
}

export function TimeTabs() {
  const [v, setV] = useState<"1M" | "All time">("All time");
  return (
    <div className="flex justify-end gap-4 text-[14px] leading-5">
      {(["1M", "All time"] as const).map((t) => (
        <button key={t} type="button" onClick={() => setV(t)} className={`relative pb-[3px] ${v === t ? "text-rk-text" : "text-rk-text hover:text-rk-link"}`}>
          {t === "1M" ? "1 M" : t}
          {v === t && <span className="absolute right-0 -bottom-[1px] left-0 h-[2px] rounded bg-[#8e92ec]" />}
        </button>
      ))}
    </div>
  );
}

export type Line = { name: string; color: string; data: number[]; bold?: boolean };

export function TrendChart({
  lines,
  max,
  ticks,
  format,
  ticksX,
  width = 1023,
  height = 183,
}: {
  lines: Line[];
  max: number;
  ticks: number[];
  format: (v: number) => string;
  ticksX: { label: string; at: number }[];
  width?: number;
  height?: number;
}) {
  const L = 46;
  const R = 10;
  const top = 17;
  const H = 130;
  const W = width - L - R;
  const n = Math.max(...lines.map((l) => l.data.length), 2);
  const x = (i: number) => L + (i / (n - 1)) * W;
  const y = (v: number) => top + H - (v / max) * H;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" className="block overflow-visible" aria-hidden>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={L + W} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#e0e2e1" : "#f0f1f1"} />
          <text x={L - 17} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#6a6c6a">
            {format(t)}
          </text>
        </g>
      ))}
      {ticksX.map((t) => (
        <text key={t.label} x={L + t.at * W} y={top + H + 22} textAnchor="middle" fontSize="12" fill="#6a6c6a">
          {t.label}
        </text>
      ))}
      {lines.map((l) => (
        <g key={l.name}>
          <path
            d={l.data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("")}
            fill="none"
            stroke={l.color}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
          {l.data.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r={4} fill={l.color} stroke="#fff" strokeWidth={1.2} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function PlatformBars({
  rows,
  max,
  ticks,
  enabled,
  other,
}: {
  rows: { name: string; color: string; you?: boolean; values: number[] }[];
  max: number;
  ticks: number[];
  enabled: boolean[];
  other?: boolean;
}) {
  const colors = ["#bcb0ec", "#cfdbff", "#5b5bc5", "#a5a8e6"];
  const all = other ? [...rows, { name: "Other", color: "#c4c4c4", values: [0.05, 0.05, 0.05, 0] }] : rows;
  const plotH = 340;
  const P = (plotH - 5) / all.length;
  const gap = all.length > 5 ? 1 : 2;
  const bar = all.length > 5 ? 11 : 13;
  const PW = 878;
  return (
    <div className="relative mt-[25px] ml-[129px]" style={{ height: plotH + 38 }}>
      <div className="absolute inset-x-0 top-0 border-b border-[#e2e2e2]" style={{ height: plotH }}>
        {ticks.map((t) => (
          <div key={t} className="absolute top-0 bottom-0 w-px bg-[#f0f1f1]" style={{ left: (t / max) * PW }} />
        ))}
        {all.map((r, i) => {
          const blockH = 4 * bar + 3 * gap;
          const topY = P * i + (P - blockH) / 2 + 4;
          return (
            <div key={r.name}>
              <div className="absolute flex items-center justify-end gap-2 text-[14px] leading-5 whitespace-nowrap text-rk-text" style={{ right: `calc(100% + 15px)`, top: topY + blockH / 2 - 10 }}>
                <Dot color={r.color} size={10} />
                <span className={"you" in r && r.you ? "font-semibold" : ""}>{r.name}</span>
                {r.name === "Other" && (
                  <span className="ml-[1px] inline-flex h-[11px] w-[20px] items-center rounded-full border border-[#d6d8d7] bg-[#e0e2e1] px-[1px]">
                    <span className="h-[7px] w-[7px] rounded-full bg-white" />
                  </span>
                )}
              </div>
              {r.values.map((v, k) =>
                enabled[k] || k === 3 ? (
                  <div
                    key={k}
                    className="absolute left-[1px]"
                    style={{ top: topY + k * (bar + gap), height: bar, width: Math.max(2, (v / max) * PW), background: k === 3 ? "#a5a8e6" : colors[k] }}
                  />
                ) : null,
              )}
            </div>
          );
        })}
      </div>
      {ticks.map((t) => (
        <span key={t} className="absolute text-[12px] leading-4 text-rk-muted" style={{ left: (t / max) * PW, top: plotH + 10, transform: "translateX(-50%)" }}>
          {t}%
        </span>
      ))}
    </div>
  );
}

export function PlatformLegend({ enabled, setEnabled }: { enabled: boolean[]; setEnabled: (v: boolean[]) => void }) {
  const items = [
    { label: "Google AI Mode", color: "#bcb0ec" },
    { label: "ChatGPT", color: "#cfdbff" },
    { label: "Gemini", color: "#5b5bc5" },
  ];
  return (
    <div className="flex items-center gap-4">
      {items.map((it, i) => (
        <CheckBox key={it.label} color={it.color} on={enabled[i]} label={it.label} onClick={() => setEnabled(enabled.map((e, k) => (k === i ? !e : e)))} />
      ))}
      <span className="flex items-center gap-2 text-[14px] leading-5 text-rk-faint">
        <span className="h-4 w-4 rounded-[4px] border border-[#edefef] bg-white" />
        Perplexity
        <span className="-ml-[6px]">
          <WarnIcon />
        </span>
      </span>
    </div>
  );
}

export function TrendArrow({ dir }: { dir: "up" | "down" }) {
  return dir === "up" ? <ArrowUp width={12} height={12} className="text-[#009f81]" /> : <ArrowDown width={12} height={12} className="text-[#d1002f]" />;
}

export function Segments({ score, tone }: { score: number; tone: "good" | "bad" }) {
  const on = tone === "good" ? "#00c795" : "#f09a0b";
  const off = tone === "good" ? "#80f5d8" : "#fcdc6c";
  return (
    <span className="flex h-2 w-[90px] shrink-0 gap-px overflow-hidden rounded-full">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="flex-1" style={{ background: i < score ? on : off }} />
      ))}
    </span>
  );
}

export function SentimentPill({ value }: { value: number }) {
  const tone =
    value >= 95
      ? { bg: "#c9f5e7", dot: "#006b4c", text: "#12745b" }
      : value >= 60
        ? { bg: "#d2f8ec", dot: "#00b389", text: "#12745b" }
        : value >= 40
          ? { bg: "#fff3c2", dot: "#fdd35b", text: "#8a6a00" }
          : { bg: "#ffe3cc", dot: "#ff8a1f", text: "#c05b00" };
  return (
    <span className="inline-flex h-5 items-center gap-[5px] rounded-full pr-[9px] pl-[5px] text-[12px] leading-5 font-medium" style={{ background: tone.bg, color: tone.text }}>
      <span className="h-[11px] w-[11px] rounded-full" style={{ background: tone.dot }} />
      {value}%
    </span>
  );
}

export function NoData() {
  return <span className="inline-block h-[3px] w-[3px] rounded-full bg-[#a9abaa] align-middle" />;
}

const tf: Record<Timeframe, string> = {
  short: "bg-[#c9f2e3] text-[#0e7a5f]",
  medium: "bg-[#ffe3cb] text-[#a3601c]",
  urgent: "bg-[#ffd6d6] text-[#c01f2f]",
};

export function StrategyCard({ items }: { items: Opportunity[] }) {
  return (
    <ReportCard title="AI Strategic Opportunities" testid="strategy">
      <div className="px-5 pt-5 pb-5">
        <p className="text-[14px] leading-5 text-rk-muted">Based on the LLM’s output about your brand from the latest update.</p>
        {items.map((o, i) => (
          <article key={i} data-testid={`opportunity-${i}`} className="mt-4 rounded-lg bg-rk-bg first-of-type:mt-5">
            <div className="flex justify-end">
              <span className={`rounded-full px-[9px] text-[12px] leading-5 ${tf[o.timeframe]}`}>{o.timeframe} timeframe</span>
            </div>
            <div className="px-3 pb-[17px]">
              <h3 className="mt-[3px] text-[14px] leading-5 font-semibold text-rk-text">{o.title}</h3>
              <p className="mt-4 text-[14px] leading-5 text-rk-text">{o.body}</p>
            </div>
            <div className="border-t border-[#e3e5e5] pt-[17px] pr-[10px] pb-[27px] pl-3">
              <div className="text-[12px] leading-4 font-semibold text-rk-text">Recommendations:</div>
              <ul className="mt-[7px] space-y-2">
                {o.recs.map((r) => (
                  <li key={r} className="relative pl-[17px] text-[12px] leading-4 text-rk-text before:absolute before:top-[6px] before:left-[4px] before:h-[3px] before:w-[3px] before:rounded-full before:bg-rk-text-2">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </ReportCard>
  );
}


export function RankRow({
  name,
  color,
  you,
  fill,
  barColor,
  pct,
  right,
  nameW = 604,
  barW = 90,
  pctGap = 17,
}: {
  name: string;
  color: string;
  you?: boolean;
  fill: number;
  barColor: string;
  pct: string;
  right: ReactNode;
  nameW?: number;
  barW?: number;
  pctGap?: number;
}) {
  return (
    <div className="flex h-[31.6px] items-center text-[14px] leading-5">
      <div className="flex shrink-0 items-center gap-2" style={{ width: nameW }}>
        <Dot color={color} />
        <span className={you ? "font-semibold text-rk-text" : "text-rk-text"}>{name}</span>
        {you && <YouBadge />}
      </div>
      <span className="h-4 shrink-0 overflow-hidden rounded-[4px] bg-[#f0f0f0]" style={{ width: barW }}>
        <span className="block h-full rounded-[4px]" style={{ width: `${Math.min(100, fill * 100)}%`, background: barColor }} />
      </span>
      <span className="text-rk-muted" style={{ marginLeft: pctGap }}>
        {pct}
      </span>
      <span className="ml-auto flex items-center">{right}</span>
    </div>
  );
}

export function FilterSelect({ label, options, testid }: { label: string; options: string[]; testid?: string }) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Popover
      panelClassName="min-w-[180px]"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-testid={testid}
          onClick={toggle}
          className={`flex h-[26px] items-center gap-[11px] rounded-[4px] border bg-white pr-[7px] pl-2 text-[14px] leading-5 ${open ? "border-[#8e92ec]" : "border-[#dcdde3]"} ${value ? "text-rk-text" : "text-[#a3a5ad]"}`}
        >
          {value ?? label}
          <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden className={open ? "rotate-180" : ""}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="#1b1e1a" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {(close) => (
        <>
          {options.map((o) => (
            <MenuItem
              key={o}
              active={o === value}
              onClick={() => {
                setValue(o === value ? null : o);
                close();
              }}
            >
              {o}
            </MenuItem>
          ))}
        </>
      )}
    </Popover>
  );
}
