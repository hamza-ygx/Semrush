"use client";

import { useState, type ReactNode } from "react";
import { ExternalIcon } from "@/components/ui/icons";

const st = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const catPaths: Record<string, ReactNode> = {
  C: <path d="M1.5 2.5h2l1.2 7.5h8l1.3-5.5H4.2M6 13.3h.1M11.5 13.3h.1" {...st} strokeWidth={1.6} />,
  B: (
    <>
      <path d="M3 6.5h10l-.6 7.5H3.6Z" {...st} />
      <path d="M5.5 6.5V5a2.5 2.5 0 0 1 5 0v1.5M3.3 10h9.4" {...st} />
    </>
  ),
  L: <path d="M3 3.5h10v7.5H3ZM1.5 13.5h13" {...st} />,
  D: <path d="M3 2.5h7l3 3v8H3ZM5.5 6h4M5.5 8.5h5M5.5 11h3M10 2.5v3h3" {...st} />,
  W: (
    <>
      <rect x="2" y="5" width="12" height="8.5" rx="1" {...st} />
      <path d="M5.8 5V3.2h4.4V5M2 9h12M7 9v1.5h2V9" {...st} />
    </>
  ),
  F: <path d="M2.5 13.5c2-5 5-7.5 10-9M3.5 12C2 7 6 2.5 13.5 2.5 14 9 10 13.5 4.5 12.5" {...st} />,
  P: (
    <>
      <rect x="2" y="3" width="12" height="10" rx="1" {...st} />
      <path d="M6.5 5.8v4.4L10 8Z" fill="currentColor" />
    </>
  ),
  S: (
    <>
      <rect x="5.5" y="2" width="5" height="4" {...st} />
      <rect x="1.5" y="10" width="5" height="4" {...st} />
      <rect x="9.5" y="10" width="5" height="4" {...st} />
      <path d="M8 6v2H4v2M8 8h4v2" {...st} />
    </>
  ),
  $: <path d="M11.5 4.5C10.8 3.5 9.6 3 8 3 6 3 4.8 4 4.8 5.4c0 3.3 6.7 1.8 6.7 5.1 0 1.5-1.4 2.5-3.5 2.5-1.7 0-3-.6-3.7-1.8M8 1.5v13" {...st} strokeWidth={1.6} />,
  H: <path d="M2.5 14V6h4V2.5h7V14M1.5 14h13M9 5h2M9 7.5h2M9 10h2M4 8.5h1M4 11h1" {...st} />,
  T: <path d="M1.5 4h8v7h-8ZM9.5 6.5h3l2 2.5v2h-5M4 12.5h.1M12 12.5h.1" {...st} strokeWidth={1.6} />,
  K: <path d="M3 2v4.5a1.5 1.5 0 0 0 3 0V2M4.5 2v12M11.5 14V2c-1.8 0-2.5 3-2.5 5.5h2.5" {...st} />,
  G: (
    <>
      <rect x="2.5" y="2.5" width="11" height="11" rx="5.5" {...st} />
      <path d="M2.5 6.5h11M2.5 9.5h11" {...st} />
    </>
  ),
  U: <path d="M4.5 4.5h7v9h-7ZM6.5 4.5v-2h3v2M6.5 7v4M9.5 7v4M5.5 13.5v1M10.5 13.5v1" {...st} />,
};

export function CatIcons({ codes }: { codes: string }) {
  if (!codes) return <span className="text-[14px] text-[#6a6c6a]">No category</span>;
  return (
    <span className="flex items-center gap-[4px] text-[#8b8d96]">
      {codes.split("").map((c, i) => (
        <svg key={i} viewBox="0 0 16 16" width={16} height={16}>
          {catPaths[c]}
        </svg>
      ))}
    </span>
  );
}

export function SplitBar({ split, colors, width = 178 }: { split: number[]; colors: string[]; width?: number }) {
  return (
    <span className="flex h-2 overflow-hidden rounded-[2px]" style={{ width }}>
      {split.map((v, i) => (v > 0 ? <span key={i} style={{ width: `${v * 100}%`, background: colors[i] }} /> : null))}
    </span>
  );
}

export function DomainLink({ name, extra }: { name: string; extra?: ReactNode }) {
  return (
    <span className="flex items-center text-[14px] leading-5 text-rk-text">
      {name}
      <a href={name.startsWith("/") ? `https://zara.com${name}` : `https://${name}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name}`} className="ml-[5px] text-[#a9abaa] hover:text-rk-link">
        <ExternalIcon width={16} height={16} />
      </a>
      {extra && <span className="text-[12px] text-[#6a6c6a]">{extra}</span>}
    </span>
  );
}

export function SortIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#6a6c6a]">
      <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export function Pagination({ pages, className = "" }: { pages: number; className?: string }) {
  const [page, setPage] = useState(1);
  const btn = "flex h-7 items-center justify-center rounded-[6px] text-[14px] leading-5";
  return (
    <div className={`flex items-center ${className}`}>
      <button type="button" aria-label="First page" disabled={page === 1} onClick={() => setPage(1)} className={`${btn} w-7 border border-[#e0e2e1] text-[#d6d8d7]`}>
        <svg viewBox="0 0 16 16" width={14} height={14}>
          <path d="m8 4-4 4 4 4M13 4 9 8l4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className={`${btn} ml-[8px] border px-[8px] ${page === 1 ? "border-[#e0e2e1] text-[#d6d8d7]" : "border-[#d8dad9] text-rk-text-2"}`}
      >
        Prev
      </button>
      <button type="button" onClick={() => setPage((p) => Math.min(pages, p + 1))} className={`${btn} ml-[4px] bg-rk-btn-dark px-[9px] font-semibold text-white`}>
        Next
      </button>
      <span className="ml-[16px] text-[14px] text-rk-text">Page:</span>
      <input
        aria-label="Page"
        value={page}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (v >= 1 && v <= pages) setPage(v);
        }}
        className="ml-[4px] h-7 w-[68px] rounded-[6px] border border-[#d6d8d7] px-[8px] text-[14px] outline-none focus:border-rk-link"
      />
      <span className="ml-[9px] text-[14px] text-rk-text">of</span>
      <span className="ml-[5px] text-[14px] text-rk-link">{pages}</span>
    </div>
  );
}

export function CardTabs<T extends string>({ items, value, onChange }: { items: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex h-[44px] items-stretch gap-[16px] border-b border-[#f0f0f0] px-5">
      {items.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={`relative flex items-center pt-[2px] text-[16px] leading-6 ${t === value ? "font-semibold text-rk-text" : "text-rk-text hover:text-rk-link"}`}
        >
          {t}
          {t === value && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-[#8e92ec]" />}
        </button>
      ))}
    </div>
  );
}

export function SelectBox({ label, options, className = "" }: { label: string; options: string[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState<string | null>(null);
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-7 items-center gap-[8px] rounded-[6px] border border-[#d8dad9] bg-white pr-[7px] pl-[8px] text-[14px] leading-5"
      >
        <span className={val ? "text-rk-text" : "text-[#8b8d96]"}>{val ?? label}</span>
        <svg viewBox="0 0 16 16" width={16} height={16} className={open ? "rotate-180" : ""}>
          <path d="m4 6 4 4 4-4" fill="none" stroke="#1b1e1a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[32px] left-0 z-40 min-w-[200px] rounded-md bg-white py-1 shadow-popover">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setVal(o === val ? null : o);
                setOpen(false);
              }}
              className={`block w-full px-2 py-[6px] text-left text-[14px] hover:bg-rk-bg ${o === val ? "bg-[#e9f7ff]" : ""}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type MetricCol = { label: string; width: number; sorted?: boolean; pl?: number; pr?: number };

export type MetricRow = { key: string; first: ReactNode; cells: ReactNode[]; children?: MetricRow[] };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 text-rk-text-2 transition-transform ${open ? "rotate-90" : ""}`}>
      <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShareCell({ pct, label, left = false }: { pct: number; label: string; left?: boolean }) {
  return (
    <span className={`flex items-center ${left ? "gap-[8px]" : "justify-between"}`}>
      <span className="relative h-[6px] w-[90px] shrink-0 rounded-[1px] bg-[#f1f3f3]">
        <span className="absolute inset-y-0 left-0 rounded-[1px] bg-[#6567ec]" style={{ width: Math.max(1, (pct / 100) * 90) }} />
      </span>
      <span className="text-right text-[14px] text-[#6a6c6a]">{label}</span>
    </span>
  );
}

export function MetricTable({
  first,
  cols,
  rows,
  thumb,
  expandable = true,
  footer,
}: {
  first: MetricCol;
  cols: MetricCol[];
  rows: MetricRow[];
  thumb?: [number, number];
  expandable?: boolean;
  footer?: ReactNode;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const bar = thumb ? <span className="absolute h-[4px] rounded-full bg-[#c1c3c3]" style={{ left: thumb[0], width: thumb[1] }} /> : null;
  const renderRow = (r: MetricRow, depth: number) => (
    <div key={r.key}>
      <div className="flex h-[45px] items-center border-b border-[#f0f0f0] text-[14px] leading-5 text-rk-text hover:bg-[#f9f9f9]">
        <div className="flex shrink-0 items-center gap-[10px] pl-[12px]" style={{ width: first.width }}>
          {expandable &&
            (depth === 0 ? (
              <button type="button" aria-label="Expand row" onClick={() => setOpen((o) => ({ ...o, [r.key]: !o[r.key] }))} className="flex h-5 w-4 items-center">
                <Chevron open={!!open[r.key]} />
              </button>
            ) : (
              <span className="w-4" />
            ))}
          <span className={depth ? "pl-[16px] text-rk-text-2" : ""}>{r.first}</span>
        </div>
        {cols.map((c, i) => (
          <div key={c.label} className="shrink-0 pr-[12px] text-right whitespace-nowrap" style={{ width: c.width, paddingLeft: c.pl, paddingRight: c.pr }}>
            {r.cells[i]}
          </div>
        ))}
      </div>
      {open[r.key] && r.children?.map((c) => renderRow(c, 1))}
    </div>
  );
  return (
    <div className="overflow-x-clip">
      <div className="sticky top-[43px] z-20">
        <div className="relative flex h-[40px] items-center bg-[#f9f9f9] text-[12px] leading-4 whitespace-nowrap text-rk-text-2">
          <div className="shrink-0 pl-[12px]" style={{ width: first.width }}>
            {first.label}
          </div>
          {cols.map((c) => (
            <div
              key={c.label}
              className={`flex h-full shrink-0 items-center justify-end gap-[6px] pr-[12px] ${c.sorted ? "bg-[#e9ebeb]" : ""}`}
              style={{ width: c.width, paddingRight: c.sorted ? 12 : undefined }}
            >
              {c.label}
              {c.sorted && <SortIcon />}
            </div>
          ))}
          {thumb && <div className="absolute top-[33px] left-0 h-[4px] w-full">{bar}</div>}
        </div>
      </div>
      <div className="relative">
        {rows.map((r) => renderRow(r, 0))}
        {thumb && <div className="absolute bottom-[3px] left-0 h-[4px] w-full">{bar}</div>}
      </div>
      {footer}
    </div>
  );
}

export function SearchInput({ placeholder, className = "" }: { placeholder: string; className?: string }) {
  return (
    <label className={`flex h-7 w-[224px] items-center gap-[8px] rounded-[6px] border border-[#d8dad9] bg-white px-[9px] ${className}`}>
      <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-[#8b8d96]">
        <circle cx="6.8" cy="6.8" r="4.3" fill="none" stroke="currentColor" strokeWidth={1.8} />
        <path d="m10 10 3.5 3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <input placeholder={placeholder} className="w-full bg-transparent text-[14px] text-rk-text outline-none placeholder:text-[#8b8d96]" />
    </label>
  );
}

export function Toggle({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button type="button" onClick={() => setOn((v) => !v)} className="flex items-center gap-[8px] text-[12px] leading-4 text-rk-text">
      <span className={`relative h-[12px] w-[20px] rounded-full ${on ? "bg-[#1b1e1a]" : "bg-[#d6d8d7]"}`}>
        <span className={`absolute top-[2px] h-[8px] w-[8px] rounded-full bg-white ${on ? "left-[10px]" : "left-[2px]"}`} />
      </span>
      {label}
    </button>
  );
}
