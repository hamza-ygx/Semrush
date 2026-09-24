"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChevronDown, ChevronRight, CloseIcon, ExportIcon, GearIcon, PlusIcon } from "@/components/ui/icons";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { monthLabels, positionRows, positionsTrend, summary, type PositionRow } from "./data";
import { Delta, KwSpark, TrafficSpark, useTrendChart } from "./OverviewView";
import { Checkbox, ExtLink, IntentBadge, Kd, KeywordLink, NotesMenu, Pagination, PinIcon, Segmented, SerpCell, SortIcon, TimeRange, ext } from "./ui";
import { FilterBar, useStuck } from "./FilterBar";

function Metric({ label, value, delta, children, className = "" }: { label: string; value: string; delta: string; children?: ReactNode; className?: string }) {
  return (
    <div className={`shrink-0 whitespace-nowrap ${className}`}>
      <div className="text-[14px] leading-5">{label}</div>
      <div className="mt-[1px] flex items-end">
        <span className="text-[24px] leading-8 font-bold">{value}</span>
        <span className="mb-[3px]">
          <Delta v={delta} />
        </span>
        {children}
      </div>
    </div>
  );
}

function SummaryCard() {
  const t = useTrendChart({
    data: positionsTrend,
    labels: monthLabels,
    ticks: [0, 100, 200],
    max: 250,
    height: 205,
    pad: { top: 10, right: 21, bottom: 36, left: 72 },
    barRatio: 0.6,
    inset: 10,
  });
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="relative flex h-[92px] border-b border-rk-border px-5 pt-[18px]">
        <Metric label="Keywords" {...summary.keywords} className="w-[259px]">
          <KwSpark className="mb-[5px] ml-[5px] h-[20px]" />
        </Metric>
        <div className="mx-6 mt-[2px] h-[51px] w-px shrink-0 bg-rk-border" />
        <Metric label="Traffic" {...summary.traffic} className="w-[241px]">
          <TrafficSpark className="mb-[5px] ml-[5px]" />
        </Metric>
        <div className="mx-6 mt-[2px] h-[51px] w-px shrink-0 bg-rk-border" />
        <Metric label="Traffic Cost" {...summary.cost} />
        <span className="absolute -bottom-[6px] left-[192px] h-[11px] w-[11px] rotate-45 border-t border-l border-rk-border bg-white" />
      </div>
      {open ? (
        <div className="px-5 pt-[20px] pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] leading-6 font-semibold">Organic Keywords Trend</h2>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="-mr-[2px] text-rk-muted hover:text-rk-text">
              <CloseIcon width={14} height={14} />
            </button>
          </div>
          <div className="mt-[22px] flex items-center justify-between">
            <div className="flex items-center">
              {t.legend}
              <span className="mx-4 hidden h-7 w-px bg-rk-border" />
              <span className="hidden">
                <NotesMenu />
              </span>
            </div>
            <TimeRange value="1M" />
          </div>
          <div className="-mx-5 mt-[19px]">{t.chart}</div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex h-12 w-full items-center justify-center gap-1 text-[14px] text-rk-link">
          Show Organic Keywords Trend <ChevronDown />
        </button>
      )}
    </div>
  );
}

export function TrackingBanner({ text = "Create a new project to see your positions.", cta = "Set up Tracking" }: { text?: string; cta?: string }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative flex h-[139px] items-center rounded-lg border border-[#c9d3fb] bg-[#eaf0ff] pl-5">
      <svg width="118" height="104" viewBox="0 0 118 104" className="shrink-0">
        <circle cx="60" cy="56" r="46" fill="#3ddab4" opacity=".9" />
        <g transform="rotate(-14 58 50)">
          <rect x="8" y="14" width="96" height="66" rx="6" fill="#fff" stroke="#191b23" strokeWidth="2.4" />
          <rect x="8" y="14" width="96" height="14" rx="6" fill="#3ddab4" stroke="#191b23" strokeWidth="2.4" />
          <circle cx="58" cy="21" r="7" fill="#fff" stroke="#191b23" strokeWidth="1.8" />
          <rect x="16" y="36" width="24" height="18" rx="2" fill="#3ddab4" stroke="#191b23" strokeWidth="1.4" />
          <text x="19" y="49" fontSize="9" fill="#191b23">Aa</text>
          <rect x="46" y="36" width="24" height="18" rx="2" fill="#fff" stroke="#191b23" strokeWidth="1.4" />
          <text x="50" y="49" fontSize="9" fill="#191b23">@</text>
          <rect x="76" y="36" width="22" height="18" rx="2" fill="#3ddab4" stroke="#191b23" strokeWidth="1.4" />
          <path d="M16 62h60M16 70h40" stroke="#191b23" strokeWidth="1.6" />
        </g>
        <path d="M100 18 112 30l-6 1 4 7-3 2-4-7-4 4z" fill="#fff" stroke="#191b23" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      <div className="ml-[30px] pt-[7px]">
        <div className="text-[16px] leading-6 font-semibold">Track your rankings every day</div>
        <div className="mt-[3px] text-[16px] leading-6">{text}</div>
        <Link href={routes.positionTracking} className="mt-[10px] inline-flex h-7 items-center rounded-md bg-[#009f81] px-[9px] text-[14px] font-semibold text-white hover:bg-[#007c65]">
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
    <th className={`text-[13px] font-normal whitespace-nowrap ${on ? "bg-[#ececf0]" : ""} ${className}`}>
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
    <button type="button" aria-label={label} onClick={onClick} className="flex h-7 w-7 items-center justify-center rounded-md border border-rk-border-strong bg-[#f4f5f9] text-rk-text-2 hover:bg-rk-hover">
      {children}
    </button>
  );
}

function ColumnsMenu() {
  return (
    <Popover
      align="right"
      panelClassName="w-[200px]"
      trigger={({ toggle }) => (
        <IconBtn label="Table settings" onClick={toggle}>
          <GearIcon width={18} height={18} />
        </IconBtn>
      )}
    >
      {(close) =>
        ["Intent", "Position", "SERP Features", "Traffic", "Traffic %", "Volume", "KD %", "URL", "Updated", "CPC", "Com.", "Results"].map((c, i) => (
          <MenuItem key={c} onClick={close}>
            <Checkbox checked={i < 9} />
            {c}
          </MenuItem>
        ))
      }
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
      {(close) => ["Excel", "CSV", "CSV Semicolon"].map((c) => <MenuItem key={c} onClick={close}>{c}</MenuItem>)}
    </Popover>
  );
}

function Row({ r, checked, toggle }: { r: PositionRow; checked: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  const cell = "py-[14px] align-top";
  const line = "flex h-5 items-center";
  return (
    <>
      <tr className="border-b border-rk-border hover:bg-[#fafafb]">
        <td className={`${cell} pl-[19px]`}>
          <button type="button" aria-label="Expand" onClick={() => setOpen((o) => !o)} className={`${line} text-rk-text-2 hover:text-rk-text`}>
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
        <td className={cell}>
          <span className={`${line} justify-center`}>
            <IntentBadge intent={r.intent} />
          </span>
        </td>
        <td className={cell}>
          <span className={`${line} justify-end`}>{r.local ? <PinIcon className="text-rk-link" /> : r.position}</span>
        </td>
        <td className={`${cell} pl-4`}>
          <span className={line}>
            <SerpCell count={r.sf} />
          </span>
        </td>
        <td className={`${cell} pr-2`}>
          <span className={`${line} justify-end`}>{r.traffic}</span>
        </td>
        <td className={`${cell} pr-2`}>
          <span className={`${line} justify-end`}>{r.pct}</span>
        </td>
        <td className={cell}>
          <span className={`${line} justify-end`}>{r.volume}</span>
        </td>
        <td className={cell}>
          <span className={`${line} justify-end`}>
            <Kd kd={r.kd} />
          </span>
        </td>
        <td className="pt-4 pr-[12px] pb-3 pl-[17px] align-top">
          <span className="flex items-start gap-[6px]">
            <a href={ext(r.url)} target="_blank" rel="noreferrer" className="leading-4 tracking-[0.25px] break-all text-rk-link hover:text-rk-link-hover">
              {r.url}
            </a>
            <ExtLink href={r.url} className="-mt-[1px]" />
          </span>
        </td>
        <td className={`${cell} pr-5`}>
          <span className={`${line} justify-end whitespace-nowrap`}>{r.updated}</span>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-rk-border bg-[#f7f7f9]">
          <td colSpan={12} className="py-4 pr-5 pl-[93px] text-[14px] text-rk-text-2">
            <div className="flex gap-10">
              <span>
                Position history: <b className="text-rk-text">{r.local ? "Local pack" : `#${r.position}`}</b>
              </span>
              <span>
                SERP Features: <b className="text-rk-text">{r.sf}</b>
              </span>
              <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(r.keyword)}&db=se`} className="text-rk-link">
                Open in Keyword Overview
              </Link>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function PositionsTable({ tab, filter }: { tab: string; filter: string }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "pct", dir: -1 });
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const rows = useMemo(() => {
    let list = positionRows.map((r, i) => ({ r, i }));
    if (tab === "SERP Features") list = list.filter(({ r }) => r.local);
    if (tab === "Organic") list = list.filter(({ r }) => !r.local);
    if (filter) list = list.filter(({ r }) => r.keyword.includes(filter.toLowerCase()));
    if (sort.key !== "pct" || sort.dir !== -1) {
      const val = (r: PositionRow) => (sort.key === "position" ? r.position : sort.key === "traffic" ? r.traffic : sort.key === "pct" ? num(r.pct) : sort.key === "volume" ? num(r.volume) : r.kd);
      list = [...list].sort((a, b) => (val(a.r) - val(b.r)) * sort.dir);
    }
    return list;
  }, [tab, filter, sort]);
  const onSort = (k: SortKey) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: -1 }));
  const all = rows.length > 0 && rows.every(({ i }) => sel.has(i));
  const { ref: stuckRef, stuck } = useStuck(60);
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div ref={stuckRef} className={`sticky top-[60px] z-20 flex h-[43px] items-center justify-between rounded-t-lg bg-white px-5 ${stuck ? "border-b border-rk-border" : ""}`}>
        <div className="text-[14px]">
          Organic Search Positions: <b>{tab === "SERP Features" ? 1 : 134}</b>
        </div>
        <div className="flex items-center gap-2">
          <AddToList />
          <ColumnsMenu />
          <ExportMenu />
        </div>
      </div>
      <table className="w-full table-fixed text-[14px]">
        <colgroup>
          <col className="w-[42px]" />
          <col className="w-[31px]" />
          <col />
          <col className="w-[48px]" />
          <col className="w-[46px]" />
          <col className="w-[64px]" />
          <col className="w-[55px]" />
          <col className="w-[68px]" />
          <col className="w-[50px]" />
          <col className="w-[53px]" />
          <col className="w-[271px]" />
          <col className="w-[73px]" />
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
            <Th sort={sort} onSort={onSort} className="text-left">
              Intent
            </Th>
            <Th k="position" sort={sort} onSort={onSort} className="text-right">
              Position
            </Th>
            <Th sort={sort} onSort={onSort} className="pl-4 text-left">
              SF
            </Th>
            <Th k="traffic" sort={sort} onSort={onSort} className="pr-2 text-right">
              Traffic
            </Th>
            <Th k="pct" sort={sort} onSort={onSort} className="pl-2 text-left">
              <span className="w-[37px] truncate">Traffic %</span>
            </Th>
            <Th k="volume" sort={sort} onSort={onSort} className="text-right">
              Volume
            </Th>
            <Th k="kd" sort={sort} onSort={onSort} className="text-right">
              KD %
            </Th>
            <Th sort={sort} onSort={onSort} className="pl-[17px] text-left">
              URL
            </Th>
            <Th sort={sort} onSort={onSort} className="pr-5 text-right">
              Updated
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.slice((page - 1) * 100, page * 100).map(({ r, i }) => (
            <Row key={i} r={r} checked={sel.has(i)} toggle={() => setSel((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; })} />
          ))}
        </tbody>
      </table>
      <div className="px-5 pt-[21px] pb-5">
        <Pagination pages={2} onPage={setPage} />
      </div>
    </div>
  );
}

export function PositionsView() {
  const [tab, setTab] = useState<"All Positions" | "Organic" | "SERP Features">("All Positions");
  const [filter, setFilter] = useState("");
  return (
    <div>
      <div className="px-8 pt-[14px]">
        <Segmented options={["All Positions", "Organic", "SERP Features"] as const} value={tab} onChange={setTab} size="s" />
      </div>
      <FilterBar onFilter={setFilter} />
      <div className="flex flex-col gap-4 px-8">
        <SummaryCard />
        <TrackingBanner />
        <PositionsTable tab={tab} filter={filter} />
      </div>
    </div>
  );
}
