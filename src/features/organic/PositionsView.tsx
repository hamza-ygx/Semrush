"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChevronDown, ChevronRight, CloseIcon, ExportIcon, GearIcon, PlusIcon } from "@/components/ui/icons";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { dayLabels, latest, positionRows, positionsTraffic, positionsTrend, type PositionRow } from "./data";
import { useWidth } from "./charts";
import { Delta, KwSpark, TrafficSpark, useTrendChart } from "./OverviewView";
import { Checkbox, ExtLink, HoverTip, IntentBadge, Kd, KeywordLink, NotesMenu, Pagination, PinIcon, Segmented, SerpCell, SortIcon, TimeRange, ext } from "./ui";
import { FilterBar, useStuck } from "./FilterBar";
import { AdvancedFilters, CheckFilter, ExportPopover, RangeFilter, SerpFeaturesFilter } from "./filters";
import { RankedUrls } from "./RankedUrls";
import { useDbLoading } from "./dbLoading";

function Metric({ label, value, delta, children }: { label: string; value: string; delta: string; children?: ReactNode }) {
  return (
    <div className="shrink-0 whitespace-nowrap">
      <div className="text-[14px] leading-5">{label}</div>
      <div className="mt-[2px] flex items-end">
        <span className="text-[24px] leading-8 font-bold">{value}</span>
        <span className="mb-[3px]">
          <Delta v={delta} />
        </span>
        {children}
      </div>
    </div>
  );
}

const DAY_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayTitle = (i: number) => {
  const d = new Date(Date.UTC(2026, 7, 25 + i));
  return `${DAY_MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, 2026`;
};

type TrendView = "keywords" | "traffic";

function SparkButton({ tip, active, onClick, testId, children }: { tip: string; active: boolean; onClick: () => void; testId: string; children: ReactNode }) {
  return (
    <span className="group/spark relative mb-[5px] ml-[5px] flex">
      <button type="button" data-testid={testId} aria-label={tip} onClick={onClick} className="flex cursor-pointer">
        {children}
      </button>
      <span
        role="tooltip"
        className="pointer-events-none invisible absolute bottom-[calc(100%+13px)] left-1/2 z-50 w-[226px] -translate-x-1/2 rounded-md bg-white px-3 py-[10px] text-[14px] leading-5 whitespace-normal text-rk-text opacity-0 shadow-popover transition-opacity delay-150 group-hover/spark:visible group-hover/spark:opacity-100"
      >
        {tip}
      </span>
      {active && <span className="absolute top-[calc(100%+22px)] left-1/2 h-[11px] w-[11px] -translate-x-1/2 rotate-45 border-t border-l border-rk-border bg-white" />}
    </span>
  );
}

function TrafficArea() {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { top: 12, right: 36, bottom: 36, left: 70 };
  const height = 206;
  const n = positionsTraffic.length;
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;
  const x = (i: number) => pad.left + (W * i) / (n - 1);
  const y = (v: number) => pad.top + H - (v / 129.5) * H;
  const line = positionsTraffic.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  return (
    <div ref={ref} data-testid="traffic-trend" className="relative w-full" onMouseLeave={() => setHover(null)}>
      <svg width={width} height={height} className="block">
        {[0, 50, 100].map((t) => (
          <g key={t}>
            <line x1={pad.left - 8} x2={width - 20} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#d6d8d7" : "#e9eaea"} />
            <text x={pad.left - 16} y={y(t) + 4} textAnchor="end" fontSize="12" fill="#6a6c6a">
              {t}
            </text>
          </g>
        ))}
        <rect x={x(n - 1) - 6} y={pad.top} width={10} height={H} fill="#e0e2e1" opacity={0.8} />
        <path d={`${line}L${x(n - 1)} ${y(0)}L${x(0)} ${y(0)}Z`} fill="#e0e0f8" />
        <path d={line} fill="none" stroke="#6167e6" strokeWidth={2.5} strokeLinejoin="round" />
        {dayLabels.map((l, i) =>
          l ? (
            <text key={i} x={x(i)} y={height - pad.bottom + 22} textAnchor="middle" fontSize="12" fill="#6a6c6a">
              {l}
            </text>
          ) : null,
        )}
        {hover != null && (
          <>
            <line x1={x(hover)} x2={x(hover)} y1={pad.top} y2={y(0)} stroke="#a9abaa" />
            <circle cx={x(hover)} cy={y(positionsTraffic[hover])} r={4} fill="#6167e6" stroke="#fff" strokeWidth={2} />
          </>
        )}
        {positionsTraffic.map((_, i) => (
          <rect key={i} x={x(i) - W / (n - 1) / 2} y={pad.top} width={W / (n - 1)} height={H} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
      </svg>
      {hover != null && (
        <div
          className="pointer-events-none absolute top-3 z-30 w-[180px] rounded-md bg-white px-3 py-3 text-[12px] leading-[18px] shadow-popover"
          style={{
            left: x(hover) + 186 > width ? x(hover) - 186 : x(hover) + 6,
          }}
        >
          <div className="leading-4 text-rk-muted">{dayTitle(hover)}</div>
          <div className="mt-2 flex items-center">
            <span className="mr-[9px] h-2 w-2 rounded-full bg-[#6167e6]" />
            Traffic
            <b className="ml-auto font-semibold">{positionsTraffic[hover]}</b>
          </div>
        </div>
      )}
    </div>
  );
}

const skel = "bg-[#f2f2f2]";
const barSkel = [3, 9, 5, 2, 2, 9, 5, 2, 3, 9, 5, 2];

function MetricSkeleton({ label, spark }: { label: string; spark?: "bars" | "wave" }) {
  return (
    <div className="shrink-0">
      <div className="text-[14px] leading-5">{label}</div>
      <div className="mt-[2px] flex h-8 items-end pb-[3px]">
        <span className={`h-[27px] w-[77px] rounded-[4px] ${skel}`} />
        {spark === "bars" && (
          <span className="ml-[5px] flex h-[17px] w-[160px] items-end gap-[3.4px]">
            {barSkel.map((h, i) => (
              <span key={i} className={`w-[10px] ${skel}`} style={{ height: h * 1.6 }} />
            ))}
          </span>
        )}
        {spark === "wave" && (
          <svg width={160} height={18} className="ml-[5px] block">
            <path d="M0 18V14L40 4 80 12 120 4 160 12V18Z" fill="#f2f2f2" />
          </svg>
        )}
      </div>
    </div>
  );
}

function WaveSkeleton() {
  const [ref, width] = useWidth<HTMLDivElement>();
  const p = 176.6;
  let d = "M0 0";
  for (let x = 0; x < width + p; x += p) d += `C${x + p * 0.25} 0 ${x + p * 0.25} 46 ${x + p / 2} 46C${x + p * 0.75} 46 ${x + p * 0.75} 0 ${x + p} 0`;
  return (
    <div ref={ref} className="w-full overflow-hidden">
      <svg width={width} height={87} className="block">
        <path d={`${d}V87H0Z`} fill="#f3f3f5" />
      </svg>
    </div>
  );
}

const Sep = () => <div className="mx-6 mt-[2px] h-[51px] w-px shrink-0 bg-rk-border" />;

function SummarySkeleton({ view }: { view: TrendView }) {
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="relative flex h-[93px] border-b border-rk-border px-5 pt-[19px]">
        <MetricSkeleton label="Keywords" spark="bars" />
        <Sep />
        <MetricSkeleton label="Traffic" spark="wave" />
        <Sep />
        <MetricSkeleton label="Traffic Cost" />
        <span className="absolute top-[calc(100%-6px)] h-[11px] w-[11px] rotate-45 border-t border-l border-rk-border bg-white" style={{ left: view === "keywords" ? 177 : 467 }} />
      </div>
      <div className="px-5 pt-[20px] pb-[36px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] leading-6 font-semibold">{view === "keywords" ? "Organic Keywords Trend" : "Estimated Traffic Trend"}</h2>
          <span className="-mr-[2px] text-rk-muted">
            <CloseIcon width={14} height={14} />
          </span>
        </div>
        <div className="mt-[156px]">
          <WaveSkeleton />
        </div>
      </div>
    </div>
  );
}

function SummaryCard() {
  const t = useTrendChart({
    data: positionsTrend,
    labels: dayLabels,
    ticks: [0, 100, 200],
    max: 245,
    height: 206,
    palette: { "21-50": "#95a4f5", "51-100": "#afc0ff" },
    pad: { top: 12, right: 21, bottom: 36, left: 72 },
    barRatio: 0.62,
    inset: 10,
    tipTitle: dayTitle,
    tipTop: 21,
    marker: false,
    testId: "positions-trend",
  });
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<TrendView>("keywords");
  const loading = useDbLoading();
  const show = (v: TrendView) => {
    setView(v);
    setOpen(true);
  };
  if (loading && open) return <SummarySkeleton view={view} />;
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="relative flex h-[93px] border-b border-rk-border px-5 pt-[19px]">
        <Metric label="Keywords" {...latest.keywords}>
          <SparkButton
            testId="keywords-spark"
            active={open && view === "keywords"}
            onClick={() => show("keywords")}
            tip="This trend displays changes in the number of keywords over the last 12 months. Click it to view all changes."
          >
            <KwSpark className="h-[20px]" />
          </SparkButton>
        </Metric>
        <div className="mx-6 mt-[2px] h-[51px] w-px shrink-0 bg-rk-border" />
        <Metric label="Traffic" {...latest.traffic}>
          <SparkButton
            testId="traffic-spark"
            active={open && view === "traffic"}
            onClick={() => show("traffic")}
            tip="This trend displays changes in the amount of estimated traffic over the last 12 months. Click it to view all changes."
          >
            <TrafficSpark className="" />
          </SparkButton>
        </Metric>
        <div className="mx-6 mt-[2px] h-[51px] w-px shrink-0 bg-rk-border" />
        <Metric label="Traffic Cost" {...latest.cost} />
      </div>
      {open ? (
        <div className="px-5 pt-[20px] pb-[11px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] leading-6 font-semibold">{view === "keywords" ? "Organic Keywords Trend" : "Estimated Traffic Trend"}</h2>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="-mr-[2px] text-rk-muted hover:text-rk-text">
              <CloseIcon width={14} height={14} />
            </button>
          </div>
          <div className="mt-[22px] flex items-center justify-between">
            <div className="flex items-center">
              {view === "keywords" && (
                <>
                  {t.legend}
                  <span className="mx-4 -my-1 h-7 w-px bg-rk-border" />
                </>
              )}
              <span className={view === "traffic" ? "-mt-[6px]" : ""}>
                <NotesMenu />
              </span>
            </div>
            <TimeRange value="1M" />
          </div>
          <div className="-mx-5 mt-[19px]">{view === "keywords" ? t.chart : <TrafficArea />}</div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex h-12 w-full items-center justify-center gap-1 text-[14px] text-rk-link">
          Show {view === "keywords" ? "Organic Keywords Trend" : "Estimated Traffic Trend"} <ChevronDown />
        </button>
      )}
    </div>
  );
}

function TrackingBanner({ text = "Create a new project to see your positions.", cta = "Set up Tracking" }: { text?: string; cta?: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative flex h-[126px] items-end rounded-lg border border-[#c9cfdd] bg-[#ebf1ff] pb-5 pl-5 [@media(min-resolution:1.1dppx)]:h-[139px]">
      <div className="relative h-[106px] w-[118px] shrink-0 self-center">
        <svg width="118" height="106" viewBox="0 0 118 106" className="absolute inset-0 overflow-visible [@media(min-resolution:1.1dppx)]:scale-[1.155]">
          <path d="M62 1c14 0 22 5 32 12s19 18 20 32c2 13-2 24-9 36-8 12-22 24-43 24-15 0-27-7-37-18S10 63 10 51s5-25 15-35S47 1 62 1z" fill="#45dba7" />
          <g transform="rotate(-17 63.5 49)">
            <rect x="18.5" y="15.5" width="84" height="73" rx="3" fill="#1b1e1a" />
            <rect x="21.5" y="12.5" width="84" height="73" rx="3" fill="#45dba7" stroke="#1b1e1a" strokeWidth="1.4" />
            <path d="M21.5 23.5v-8a3 3 0 0 1 3-3h78a3 3 0 0 1 3 3v8z" fill="#1b1e1a" />
            <circle cx="27.5" cy="18" r="2.1" fill="#fff" />
            <circle cx="33.5" cy="18" r="2.1" fill="#fff" />
            <circle cx="39.5" cy="18" r="2.1" fill="#fff" />
            <g transform="translate(63.5 37)" fill="none" stroke="#1b1e1a" strokeWidth="1.5">
              {[0, 60, 120, 180, 240, 300].map((r) => (
                <ellipse key={r} cx="0" cy="-3.2" rx="3.4" ry="5.6" transform={`rotate(${r})`} />
              ))}
            </g>
            <rect x="27.5" y="52" width="70" height="7" rx="3.5" fill="#fff" />
            <path d="M31 55.5h26M60 55.5h14" stroke="#c6ede0" strokeWidth="1.2" />
            <rect x="27.5" y="64" width="22" height="16" rx="2" fill="#fff" />
            <rect x="52.5" y="64" width="22" height="16" rx="2" fill="#fff" />
            <rect x="77.5" y="64" width="20" height="16" rx="2" fill="#fff" />
            <text x="30.5" y="74" fontSize="8" fontWeight="700" fill="#45dba7">
              Aa
            </text>
            <path d="M31 77h14M57 76h14" stroke="#c6ede0" strokeWidth="1.2" />
            <circle cx="59" cy="71" r="3.3" fill="none" stroke="#45dba7" strokeWidth="1.3" />
            <path d="M64.5 69.5h7M64.5 72.5h7" stroke="#c6ede0" strokeWidth="1.2" />
            <path d="m86 67-4 7h4l-2 5 5-7h-4z" fill="#45dba7" />
          </g>
          <path d="M98 44v17l4-3.6 3.2 6.2 3-1.5-3.2-6h5.4z" fill="#fff" stroke="#1b1e1a" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="ml-[30px]">
        <div className="text-[16px] leading-6 font-semibold">Where do you rank on ChatGPT?</div>
        <div className="mt-[3px] text-[14px] leading-5">{text}</div>
        <Link href={routes.positionTracking} className="mt-[13px] inline-flex h-7 items-center rounded-md bg-[#009f81] px-[9px] text-[14px] font-semibold text-white hover:bg-[#007c65]">
          {cta}
        </Link>
      </div>
      <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute top-4 right-4 text-rk-text-2 hover:text-rk-text">
        <CloseIcon width={14} height={14} />
      </button>
    </div>
  );
}

type SortKey = "position" | "traffic" | "pct" | "volume" | "kd";

const num = (v: string) => {
  if (v.startsWith("<")) return 0.001;
  const m = parseFloat(v);
  return v.endsWith("K") ? m * 1000 : v.endsWith("M") ? m * 1e6 : m;
};

function Th({ children, k, sort, onSort, className = "" }: { children: ReactNode; k?: SortKey; sort: { key: SortKey; dir: 1 | -1 }; onSort: (k: SortKey) => void; className?: string }) {
  const on = k && sort.key === k;
  return (
    <th className={`text-[12px] font-normal whitespace-nowrap ${on ? "bg-[#ececf0]" : ""} ${className}`}>
      {k ? (
        <button type="button" onClick={() => onSort(k)} className="inline-flex max-w-full items-center gap-[2px] hover:text-rk-link">
          {children}
          {on && <SortIcon className={`text-rk-text-2 ${sort.dir === 1 ? "rotate-180" : ""}`} />}
        </button>
      ) : (
        children
      )}
    </th>
  );
}

function AddToList() {
  return (
    <Popover
      align="right"
      panelClassName="w-[220px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          <PlusIcon />
          Add to list
        </button>
      )}
    >
      {(close) => (
        <>
          <MenuItem onClick={close}>Create new list</MenuItem>
          <MenuItem onClick={close}>rkjh.se keywords</MenuItem>
        </>
      )}
    </Popover>
  );
}

export function IconBtn({ children, label, onClick }: { children: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-rk-border-strong bg-[#f5f6f6] text-rk-text-2 hover:bg-rk-hover"
    >
      {children}
    </button>
  );
}

const allColumns = [
  "Keyword",
  "Intent",
  "Prev. position",
  "Position",
  "SERP Features",
  "Traffic",
  "Traffic %",
  "Volume",
  "KD %",
  "CPC",
  "URL",
  "Costs",
  "Competitive Density",
  "Results",
  "Last Update",
];
const lockedColumns = ["Keyword", "Position"];
const defaultColumns = ["Keyword", "Intent", "Position", "SERP Features", "Traffic", "Traffic %", "Volume", "KD %", "URL", "Last Update"];

function DarkCheck({ checked, disabled }: { checked: boolean; disabled?: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
        checked ? (disabled ? "border-[#b4b6bd] bg-[#b4b6bd]" : "border-rk-btn-dark bg-rk-btn-dark") : "border-rk-border-strong bg-white"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 16 16" width={12} height={12}>
          <path d="m3.5 8.5 3 3 6-6.5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

function ColumnsMenu({ shown, onChange }: { shown: Set<string>; onChange: (s: Set<string>) => void }) {
  const isDefault = defaultColumns.length === shown.size && defaultColumns.every((c) => shown.has(c));
  return (
    <Popover
      align="right"
      offset={7}
      panelClassName="w-[178px] !pb-0 !pt-0"
      trigger={({ toggle, open }) => (
        <HoverTip label="Manage columns">
          <button
            type="button"
            aria-label="Manage columns"
            onClick={toggle}
            className={`flex h-7 w-7 items-center justify-center rounded-md border text-rk-text-2 ${open ? "border-[#9aa2ea] bg-[#eef0fb]" : "border-rk-border-strong bg-[#f5f6f6] hover:bg-rk-hover"}`}
          >
            <GearIcon width={18} height={18} />
          </button>
        </HoverTip>
      )}
    >
      {() => (
        <div>
          <div className="px-2 pt-[7px] text-[14px] leading-5 font-medium">Show table columns</div>
          <button
            type="button"
            disabled={isDefault}
            onClick={() => onChange(new Set(defaultColumns))}
            className={`mt-[7px] px-2 text-[14px] leading-5 ${isDefault ? "text-[#a8c1f5]" : "text-rk-link hover:text-rk-link-hover"}`}
          >
            Reset to default
          </button>
          <div className="mt-[6px]">
            {allColumns.map((c) => {
              const locked = lockedColumns.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    const n = new Set(shown);
                    if (n.has(c)) n.delete(c);
                    else n.add(c);
                    onChange(n);
                  }}
                  className={`flex h-8 w-full items-center gap-[10px] px-2 text-left text-[14px] leading-5 whitespace-nowrap ${locked ? "text-[#a9abaa]" : "text-rk-text hover:bg-rk-bg"}`}
                >
                  <DarkCheck checked={shown.has(c)} disabled={locked} />
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Popover>
  );
}

export function ExportMenu() {
  return (
    <Popover
      align="right"
      panelClassName="w-[180px]"
      trigger={({ toggle }) => (
        <IconBtn label="Export" onClick={toggle}>
          <ExportIcon width={18} height={18} />
        </IconBtn>
      )}
    >
      {(close) =>
        ["Excel", "CSV", "CSV Semicolon"].map((c) => (
          <MenuItem key={c} onClick={close}>
            {c}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

const serpHref = (r: PositionRow) =>
  `${routes.serp}?phrase=${encodeURIComponent(r.keyword).replace(/%20/g, "+")}&domain=rkjh.se&db=se&position=${r.local ? 1 : r.position}&type=${r.local ? "local" : "organic"}`;

type Vis = (c: string) => boolean;

const sfList = [
  { icon: "paa", label: "People also ask" },
  { icon: "pin", label: "Local pack" },
  { icon: "related", label: "Related searches" },
  { icon: "spark", label: "AI Overview" },
  { icon: "star", label: "Reviews" },
  { icon: "link", label: "Sitelinks" },
  { icon: "imagePack", label: "Image pack" },
  { icon: "play", label: "Video" },
];

function Row({ r, checked, toggle, vis }: { r: PositionRow; checked: boolean; toggle: () => void; vis: Vis }) {
  const [open, setOpen] = useState(false);
  const cell = "pt-[14px] pb-[13.5px] align-top";
  const line = "flex h-5 items-center";
  const span = 2 + allColumns.filter((c) => vis(c) && colDefs[c]).length;
  return (
    <>
      <tr className={`border-b border-rk-border ${open ? "bg-rk-bg" : "hover:bg-[#fafafb]"}`}>
        <td className={`${cell} pl-[19px]`}>
          <button type="button" aria-label="Expand" aria-expanded={open} onClick={() => setOpen((o) => !o)} className={`${line} text-rk-text-2 hover:text-rk-text`}>
            <ChevronRight className={open ? "rotate-90" : ""} />
          </button>
        </td>
        <td className={cell}>
          <span className={line}>
            <Checkbox checked={checked} onChange={toggle} />
          </span>
        </td>
        <td className={`${cell} pr-4 leading-[18px]`}>
          <KeywordLink keyword={r.keyword} plus />
        </td>
        {vis("Intent") && (
          <td className={cell}>
            <span className={`${line} justify-center`}>
              <IntentBadge intent={r.intent} />
            </span>
          </td>
        )}
        <td className={cell}>
          <span className={`${line} justify-end`}>{r.local ? <PinIcon className="text-rk-link" /> : r.position}</span>
        </td>
        {vis("SERP Features") && (
          <td className={`${cell} pl-4`}>
            <span className={line}>
              <SerpCell count={r.sf} href={serpHref(r)} features={sfList.slice(0, r.sf)} />
            </span>
          </td>
        )}
        {vis("Traffic") && (
          <td className={`${cell} pr-2`}>
            <span className={`${line} justify-end`}>{r.traffic}</span>
          </td>
        )}
        {vis("Traffic %") && (
          <td className={`${cell} pr-2`}>
            <span className={`${line} justify-end`}>{r.pct}</span>
          </td>
        )}
        {vis("Volume") && (
          <td className={cell}>
            <span className={`${line} justify-end`}>{r.volume}</span>
          </td>
        )}
        {vis("KD %") && (
          <td className={cell}>
            <span className={`${line} justify-end`}>
              <Kd kd={r.kd} />
            </span>
          </td>
        )}
        {vis("URL") && (
          <td className="pt-4 pr-[9.5px] pb-[9.5px] pl-[17px] align-top">
            <span className="flex items-start gap-[6px]">
              <a href={ext(r.url)} target="_blank" rel="noreferrer" className="leading-[16.5px] break-all text-rk-link tabular-nums hover:text-rk-link-hover">
                {r.url}
              </a>
              <ExtLink href={r.url} className="-mt-[1px]" />
            </span>
          </td>
        )}
        {vis("Last Update") && (
          <td className={`${cell} pr-5`}>
            <span className={`${line} justify-end whitespace-nowrap`}>{r.updated}</span>
          </td>
        )}
      </tr>
      {open && (
        <tr className="border-b border-rk-border bg-rk-bg">
          <td colSpan={span} className="px-5 pt-5 pb-5">
            <RankedUrls r={r} />
          </td>
        </tr>
      )}
    </>
  );
}

const colDefs: Record<string, { w?: string }> = {
  Keyword: {},
  Intent: { w: "w-[48px]" },
  Position: { w: "w-[46px]" },
  "SERP Features": { w: "w-[64px]" },
  Traffic: { w: "w-[55px]" },
  "Traffic %": { w: "w-[68px]" },
  Volume: { w: "w-[50px]" },
  "KD %": { w: "w-[53px]" },
  URL: { w: "w-[271px]" },
  "Last Update": { w: "w-[73px]" },
};

type PositionFilters = {
  pos: string | null;
  vol: string | null;
  kd: string | null;
  intent: string[];
  serp: string | null;
  adv: { mode: string; field: string; op: string; text: string }[];
};

const kdRanges: Record<string, string> = {
  "Very hard": "85-100%",
  Hard: "70-84%",
  Difficult: "50-69%",
  Possible: "30-49%",
  Easy: "15-29%",
  "Very easy": "0-14%",
};

function range(v: string): [number, number] {
  if (kdRanges[v]) return range(kdRanges[v]);
  const t = v.replace(/[#,%\s]/g, "").replace("–", "-");
  if (t.startsWith("Top")) return [1, +t.slice(3)];
  if (t.endsWith("+")) return [+t.slice(0, -1), Infinity];
  const [a, b] = t.split("-");
  return [+a || 0, b == null ? +a : b === "∞" ? Infinity : +b];
}

const inRange = (n: number, v: string | null) => {
  if (!v) return true;
  const [a, b] = range(v);
  return n >= a && n <= b;
};

const intentCode: Record<string, string> = {
  Informational: "I",
  Navigational: "N",
  Commercial: "C",
  Transactional: "T",
};

function matches(r: PositionRow, f: PositionFilters) {
  if (!inRange(r.local ? 1 : r.position, f.pos)) return false;
  if (!inRange(num(r.volume), f.vol)) return false;
  if (!inRange(r.kd, f.kd)) return false;
  if (f.intent.length && !f.intent.some((i) => intentCode[i] === r.intent)) return false;
  for (const c of f.adv) {
    const hay = (c.field === "URL" ? r.url : r.keyword).toLowerCase();
    const needle = c.text.toLowerCase();
    const hit = c.op === "Begins with" ? hay.startsWith(needle) : c.op === "Ends with" ? hay.endsWith(needle) : c.op === "Exact match" ? hay === needle : hay.includes(needle);
    const want = c.op === "Not containing" ? !hit : hit;
    if (c.mode === "Include" ? !want : want) return false;
  }
  return true;
}

const noFilters: PositionFilters = {
  pos: null,
  vol: null,
  kd: null,
  intent: [],
  serp: null,
  adv: [],
};

const loadingCols: [string, string][] = [
  ["Keyword", "pl-2 text-left"],
  ["Intent", "pl-[34px] text-left"],
  ["Position", "pr-2 text-right"],
  ["SF", "pl-2 text-left"],
  ["Traffic", "pr-2 text-right"],
  ["Traffic %", "bg-[#ececf0] pl-[21px] text-left"],
  ["Volume", "pr-2 text-right"],
  ["KD %", "pr-2 text-right"],
  ["URL", "pl-2 text-left"],
  ["Updated", "pr-5 text-right"],
];

function LoadingTable() {
  return (
    <table className="w-full table-fixed text-[14px]">
      <colgroup>
        <col className="w-[44px]" />
        {loadingCols.map(([l], i) => (
          <col key={l} className={i < 9 ? "w-[100.6px]" : ""} />
        ))}
      </colgroup>
      <thead>
        <tr className="h-[41px] border-y border-rk-border bg-[#f8f8fa]">
          <th className="pl-5 text-left font-normal">
            <Checkbox checked={false} onChange={() => {}} />
          </th>
          {loadingCols.map(([l, c]) => (
            <th key={l} className={`text-[12px] font-normal whitespace-nowrap ${c}`}>
              {l === "Traffic %" ? (
                <span className="inline-flex items-center gap-[2px]">
                  {l}
                  <SortIcon className="text-rk-text-2" />
                </span>
              ) : (
                l
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }, (_, i) => (
          <tr key={i} className="h-[45px] border-b border-rk-border">
            <td />
            {loadingCols.map(([l]) => (
              <td key={l} className="pt-[13px] pl-2 align-top">
                <span className="block h-2 w-[84.6px] rounded-full bg-[#eceeee]" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PositionsTable({ tab, filter, filters }: { tab: string; filter: string; filters: PositionFilters }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "pct",
    dir: -1,
  });
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [page, setPage] = useState({ n: 1, pages: 0 });
  const [shown, setShown] = useState(() => new Set(defaultColumns));
  const vis: Vis = (c) => shown.has(c);
  const rows = useMemo(() => {
    let list = positionRows.map((r, i) => ({ r, i }));
    if (tab === "SERP Features") list = list.filter(({ r }) => r.local);
    if (tab === "Organic") list = list.filter(({ r }) => !r.local);
    if (filter) list = list.filter(({ r }) => r.keyword.includes(filter.toLowerCase()));
    list = list.filter(({ r }) => matches(r, filters));
    if (sort.key !== "pct" || sort.dir !== -1) {
      const val = (r: PositionRow) => (sort.key === "position" ? r.position : sort.key === "traffic" ? r.traffic : sort.key === "pct" ? num(r.pct) : sort.key === "volume" ? num(r.volume) : r.kd);
      list = [...list].sort((a, b) => (val(a.r) - val(b.r)) * sort.dir);
    }
    return list;
  }, [tab, filter, filters, sort]);
  const filtered = !!(filter || filters.pos || filters.vol || filters.kd || filters.intent.length || filters.serp || filters.adv.length);
  const total = tab === "SERP Features" ? 1 : filtered ? rows.length : latest.se;
  const pages = Math.max(1, Math.ceil(total / 100));
  const cur = page.pages === pages ? Math.min(page.n, pages) : 1;
  const onSort = (k: SortKey) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: -1 }));
  const all = rows.length > 0 && rows.every(({ i }) => sel.has(i));
  const { ref: stuckRef, stuck } = useStuck(60);
  const loading = useDbLoading();
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div
        ref={stuckRef}
        className={`sticky top-[60px] z-20 flex h-[43px] focus-within:z-[31] hover:z-[31] items-center justify-between rounded-t-lg bg-white px-5 ${stuck ? "border-b border-rk-border" : ""}`}
      >
        <div className="text-[14px]">Organic Search Positions: {loading ? <span className="ml-[3px] inline-block h-2 w-12 rounded-full bg-[#eceeee] align-middle" /> : <b>{total}</b>}</div>
        <div className="flex items-center gap-2">
          <AddToList />
          <ColumnsMenu shown={shown} onChange={setShown} />
          <ExportPopover
            total={total}
            selected={sel.size}
            first={Math.min(100, total)}
            trigger={(open, toggle) => (
              <button
                type="button"
                aria-label="Export"
                onClick={toggle}
                className={`flex h-7 w-7 items-center justify-center rounded-md border text-rk-text-2 ${open ? "border-[#9aa2ea] bg-[#eef0fb]" : "border-rk-border-strong bg-[#f5f6f6] hover:bg-rk-hover"}`}
              >
                <ExportIcon width={18} height={18} />
              </button>
            )}
          />
        </div>
      </div>
      {loading ? (
        <LoadingTable />
      ) : (
        <table className="w-full table-fixed text-[14px]">
          <colgroup>
            <col className="w-[42px]" />
            <col className="w-[31px]" />
            {allColumns
              .filter((c) => vis(c) && colDefs[c])
              .map((c) => (
                <col key={c} className={colDefs[c].w} />
              ))}
          </colgroup>
          <thead>
            <tr className="h-[41px] border-y border-rk-border bg-[#f8f8fa] text-left">
              <th className="pl-5" />
              <th className="font-normal">
                <Checkbox checked={all} onChange={() => setSel(all ? new Set() : new Set(rows.map(({ i }) => i)))} />
              </th>
              <Th sort={sort} onSort={onSort} className="text-left">
                Keyword
              </Th>
              {vis("Intent") && (
                <Th sort={sort} onSort={onSort} className="text-left">
                  Intent
                </Th>
              )}
              <Th k="position" sort={sort} onSort={onSort} className="text-right">
                Position
              </Th>
              {vis("SERP Features") && (
                <Th sort={sort} onSort={onSort} className="pl-4 text-left">
                  SF
                </Th>
              )}
              {vis("Traffic") && (
                <Th k="traffic" sort={sort} onSort={onSort} className="pr-2 text-right">
                  Traffic
                </Th>
              )}
              {vis("Traffic %") && (
                <Th k="pct" sort={sort} onSort={onSort} className="pl-2 text-left">
                  <span className="w-[37px] truncate">Traffic %</span>
                </Th>
              )}
              {vis("Volume") && (
                <Th k="volume" sort={sort} onSort={onSort} className="text-right">
                  Volume
                </Th>
              )}
              {vis("KD %") && (
                <Th k="kd" sort={sort} onSort={onSort} className="text-right">
                  KD %
                </Th>
              )}
              {vis("URL") && (
                <Th sort={sort} onSort={onSort} className="pl-[17px] text-left">
                  URL
                </Th>
              )}
              {vis("Last Update") && (
                <Th sort={sort} onSort={onSort} className="pr-5 text-right">
                  Updated
                </Th>
              )}
            </tr>
          </thead>
            <tbody>
              {rows.slice((cur - 1) * 100, cur * 100).map(({ r, i }) => (
                <Row
                  key={i}
                  r={r}
                  vis={vis}
                  checked={sel.has(i)}
                  toggle={() =>
                    setSel((s) => {
                      const n = new Set(s);
                      if (n.has(i)) n.delete(i);
                      else n.add(i);
                      return n;
                    })
                  }
                />
              ))}
            </tbody>
        </table>
      )}
      {loading ? (
        <div className="h-5" />
      ) : (
        <div className="px-5 pt-[21px] pb-5">
          <Pagination key={pages} pages={pages} page={cur} onPage={(n) => setPage({ n, pages })} />
        </div>
      )}
    </div>
  );
}

const advFields = ["Keyword", "Keyword type", "CPC", "URL", "Traffic", "Traffic %", "Costs", "Competition", "Results", "Volume", "KD %", "Position", "Previous position", "SERP Features", "Intent"];

const intentOptions = ["Informational", "Navigational", "Commercial", "Transactional"];

export function PositionsView() {
  const [tab, setTab] = useState<"All Positions" | "Organic" | "SERP Features">("All Positions");
  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState<PositionFilters>(noFilters);
  const set = (p: Partial<PositionFilters>) => setFilters((f) => ({ ...f, ...p }));
  return (
    <div>
      <div className="px-8 pt-[14px]">
        <Segmented options={["All Positions", "Organic", "SERP Features"] as const} value={tab} onChange={setTab} size="s" />
      </div>
      <FilterBar onFilter={setFilter}>
        <RangeFilter
          label="Positions"
          compact
          value={filters.pos}
          onChange={(v) => set({ pos: v })}
          groups={[
            ["Top 50", "Top 20", "Top 10", "Top 3"],
            ["#1", "#4-10", "#11-20", "#21-50", "#51-100"],
          ]}
        />
        <RangeFilter label="Volume" value={filters.vol} onChange={(v) => set({ vol: v })} groups={[["100,001+", "10,001–100,000", "1,001–10,000", "101–1,000", "11–100", "1–10"]]} />
        <RangeFilter label="KD" value={filters.kd} onChange={(v) => set({ kd: v })} groups={[Object.keys(kdRanges)]} right={kdRanges} />
        <CheckFilter label="Intent" options={intentOptions} value={filters.intent} onChange={(v) => set({ intent: v })} info />
        <SerpFeaturesFilter value={filters.serp} onChange={(v) => set({ serp: v })} />
        <AdvancedFilters fields={advFields} onApply={(adv) => set({ adv })} />
      </FilterBar>
      <div className="flex flex-col gap-4 px-8 pt-px">
        <SummaryCard />
        <TrackingBanner />
        <PositionsTable tab={tab} filter={filter} filters={filters} />
      </div>
    </div>
  );
}
