"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChevronDown, ChevronRight, CloseIcon, ExportIcon, GearIcon, PlusIcon } from "@/components/ui/icons";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { monthLabels, positionRows, positionsTrend, summary, type PositionRow } from "./data";
import { Delta, KwSpark, TrafficSpark, useTrendChart } from "./OverviewView";
import { Checkbox, ExtLink, HoverTip, IntentBadge, Kd, KeywordLink, NotesMenu, Pagination, PinIcon, Segmented, SerpCell, SortIcon, TimeRange, ext } from "./ui";
import { FilterBar, useStuck } from "./FilterBar";
import { AdvancedFilters, CheckFilter, ExportPopover, RangeFilter, SerpFeaturesFilter } from "./filters";
import { RankedUrls } from "./RankedUrls";

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
    height: 207,
    pad: { top: 12, right: 21, bottom: 36, left: 72 },
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
        <div className="px-5 pt-[20px] pb-[13px]">
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
        <div className="text-[16px] leading-6 font-semibold">Where do you rank on ChatGPT?</div>
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
    <button type="button" aria-label={label} onClick={onClick} className="flex h-7 w-7 items-center justify-center rounded-md border border-rk-border-strong bg-[#f4f5f9] text-rk-text-2 hover:bg-rk-hover">
      {children}
    </button>
  );
}

const allColumns = ["Keyword", "Intent", "Prev. position", "Position", "SERP Features", "Traffic", "Traffic %", "Volume", "KD %", "CPC", "URL", "Costs", "Competitive Density", "Results", "Last Update"];
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
            className={`flex h-7 w-7 items-center justify-center rounded-md border text-rk-text-2 ${open ? "border-[#9aa2ea] bg-[#eef0fb]" : "border-rk-border-strong bg-[#f4f5f9] hover:bg-rk-hover"}`}
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
                  className={`flex h-8 w-full items-center gap-[10px] px-2 text-left text-[14px] leading-5 whitespace-nowrap ${locked ? "text-[#a9abb6]" : "text-rk-text hover:bg-rk-bg"}`}
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
      {(close) => ["Excel", "CSV", "CSV Semicolon"].map((c) => <MenuItem key={c} onClick={close}>{c}</MenuItem>)}
    </Popover>
  );
}

const serpHref = (r: PositionRow) =>
  `${routes.serp}?phrase=${encodeURIComponent(r.keyword).replace(/%20/g, "+")}&domain=rkjh.se&db=se&position=${r.local ? 1 : r.position}&type=${r.local ? "local" : "organic"}`;

type Vis = (c: string) => boolean;

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
              <SerpCell count={r.sf} href={serpHref(r)} />
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

export type PositionFilters = {
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

const intentCode: Record<string, string> = { Informational: "I", Navigational: "N", Commercial: "C", Transactional: "T" };

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

export const noFilters: PositionFilters = { pos: null, vol: null, kd: null, intent: [], serp: null, adv: [] };

function PositionsTable({ tab, filter, filters }: { tab: string; filter: string; filters: PositionFilters }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "pct", dir: -1 });
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
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
  const filtered = filters !== noFilters || !!filter;
  const total = tab === "SERP Features" ? 1 : filtered ? rows.length : 134;
  const onSort = (k: SortKey) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: -1 }));
  const all = rows.length > 0 && rows.every(({ i }) => sel.has(i));
  const { ref: stuckRef, stuck } = useStuck(60);
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div ref={stuckRef} className={`sticky top-[60px] z-20 flex h-[43px] focus-within:z-[31] hover:z-[31] items-center justify-between rounded-t-lg bg-white px-5 ${stuck ? "border-b border-rk-border" : ""}`}>
        <div className="text-[14px]">
          Organic Search Positions: <b>{total}</b>
        </div>
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
                className={`flex h-7 w-7 items-center justify-center rounded-md border text-rk-text-2 ${open ? "border-[#9aa2ea] bg-[#eef0fb]" : "border-rk-border-strong bg-[#f4f5f9] hover:bg-rk-hover"}`}
              >
                <ExportIcon width={18} height={18} />
              </button>
            )}
          />
        </div>
      </div>
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
          {rows.slice((page - 1) * 100, page * 100).map(({ r, i }) => (
            <Row key={i} r={r} vis={vis} checked={sel.has(i)} toggle={() => setSel((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; })} />
          ))}
        </tbody>
      </table>
      <div className="px-5 pt-[21px] pb-5">
        <Pagination pages={Math.max(1, Math.ceil(total / 100))} onPage={setPage} />
      </div>
    </div>
  );
}

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
        <RangeFilter label="Positions" compact value={filters.pos} onChange={(v) => set({ pos: v })} groups={[["Top 50", "Top 20", "Top 10", "Top 3"], ["#1", "#4-10", "#11-20", "#21-50", "#51-100"]]} />
        <RangeFilter label="Volume" value={filters.vol} onChange={(v) => set({ vol: v })} groups={[["100,001+", "10,001–100,000", "1,001–10,000", "101–1,000", "11–100", "1–10"]]} />
        <RangeFilter label="KD" value={filters.kd} onChange={(v) => set({ kd: v })} groups={[Object.keys(kdRanges)]} right={kdRanges} />
        <CheckFilter label="Intent" options={intentOptions} value={filters.intent} onChange={(v) => set({ intent: v })} info />
        <SerpFeaturesFilter value={filters.serp} onChange={(v) => set({ serp: v })} />
        <AdvancedFilters fields={["Keyword", "URL"]} onApply={(adv) => set({ adv })} />
      </FilterBar>
      <div className="flex flex-col gap-4 px-8">
        <SummaryCard />
        <TrackingBanner />
        <PositionsTable tab={tab} filter={filter} filters={filters} />
      </div>
    </div>
  );
}
