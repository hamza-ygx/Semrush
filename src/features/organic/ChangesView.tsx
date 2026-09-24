"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, CloseIcon, GearIcon, PlusIcon } from "@/components/ui/icons";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { useWidth } from "./charts";
import { changeRows, changesTrend, pageChanges, type ChangeRow } from "./data";
import { useStuck } from "./FilterBar";
import { ExportMenu, IconBtn } from "./PositionsView";
import { CardTitle, Checkbox, DarkButton, ExtLink, IntentBadge, Kd, KeywordLink, NotesMenu, SearchInput, Segmented, SerpCell, SortIcon, ext } from "./ui";

const Q = "?db=se&q=rkjh.se&searchType=domain";

function Dot({ color }: { color: string }) {
  return <span className="h-3 w-3 rounded-full" style={{ background: color }} />;
}

function TrendChart() {
  const [ref, width] = useWidth<HTMLDivElement>(524);
  const [hover, setHover] = useState<number | null>(null);
  const n = changesTrend.traffic.length;
  const left = 80;
  const right = width - 33;
  const x = (i: number) => left + 2 + ((right - left - 2) * i) / (n - 1);
  const ya = (v: number) => 107 - (v / 75) * 67;
  const yb = (v: number) => 220 - (v / 3) * 82;
  const line = changesTrend.traffic.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${ya(v).toFixed(1)}`).join("");
  return (
    <div ref={ref} className="relative" onMouseLeave={() => setHover(null)}>
      <svg width={width} height={260} className="block">
        {[75, 50, 25, 0].map((t) => (
          <text key={t} x={56} y={ya(t) + 4} textAnchor="end" fontSize="12" fill="#6c6e79">
            {t}
          </text>
        ))}
        <path d={`${line}L${x(n - 1)} ${ya(0)}L${x(0)} ${ya(0)}Z`} fill="#dcdcf8" opacity={0.75} />
        <path d={line} fill="none" stroke="#6167e6" strokeWidth={2.5} />
        {[3, 2, 1, 0].map((t) => (
          <g key={t}>
            <line x1={left} x2={right + 8} y1={yb(t)} y2={yb(t)} stroke={t === 0 ? "#c4c7cf" : "#eceef2"} />
            <text x={56} y={yb(t) + 4} textAnchor="end" fontSize="12" fill="#6c6e79">
              {t}
            </text>
          </g>
        ))}
        {changesTrend.declined.map((v, i) => (v ? <rect key={`d${i}`} x={x(i) - 2} y={yb(v)} width={4} height={yb(0) - yb(v)} rx={1.5} fill="#ff6b70" /> : null))}
        {changesTrend.improved.map((v, i) => (v ? <rect key={`i${i}`} x={x(i) - 2} y={yb(v)} width={4} height={yb(0) - yb(v)} rx={1.5} fill="#1dc99b" /> : null))}
        {changesTrend.labels.map((l, i) =>
          l ? (
            <text key={i} x={x(i)} y={yb(0) + 23} textAnchor="middle" fontSize="12" fill="#6c6e79">
              {l}
            </text>
          ) : null,
        )}
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={30} y2={yb(0)} stroke="#a9abb6" />}
        {changesTrend.traffic.map((_, i) => (
          <rect key={i} x={x(i) - 7} y={30} width={14} height={yb(0) - 30} fill="transparent" onMouseEnter={() => setHover(i)} />
        ))}
      </svg>
      {hover != null && (
        <div className="pointer-events-none absolute top-10 z-10 rounded-md bg-white px-3 py-2 text-[12px] shadow-popover" style={{ left: Math.min(x(hover) + 10, width - 140) }}>
          <div>Traffic: {changesTrend.traffic[hover]}</div>
          <div>Improved: {changesTrend.improved[hover]}</div>
          <div>Declined: {changesTrend.declined[hover]}</div>
        </div>
      )}
    </div>
  );
}

function TrendCard() {
  const [mode, setMode] = useState("Daily");
  return (
    <div className="h-[341px] rounded-lg bg-white shadow-card">
      <CardTitle className="h-[38px] pb-[2px]">Position Changes Trend</CardTitle>
      <div className="flex items-center justify-between px-5 pt-[21px]">
        <div className="flex items-center gap-4 text-[14px] leading-5">
          <span className="flex items-center gap-[6px]">
            <Dot color="#6167e6" /> Traffic
          </span>
          <span className="flex items-center gap-[6px]">
            <Dot color="#1dc99b" /> Improved
          </span>
          <span className="flex items-center gap-[6px]">
            <Dot color="#ff6b70" /> Declined
          </span>
          <NotesMenu />
        </div>
        <div className="flex gap-4 text-[14px]">
          {["Daily", "Monthly"].map((m) => (
            <button key={m} type="button" onClick={() => setMode(m)} className="relative hover:text-rk-link">
              {m}
              {m === mode && <span className="absolute right-0 -bottom-[6px] left-0 h-[3px] rounded-sm bg-rk-tab" />}
            </button>
          ))}
        </div>
      </div>
      <div className="-mt-[7px]">
        <TrendChart />
      </div>
    </div>
  );
}

function PageChangesCard() {
  return (
    <div className="relative h-[341px] rounded-lg bg-white shadow-card">
      <CardTitle className="h-[38px] pb-[2px]" right={<span className="text-[14px] text-rk-muted">Last 28 days</span>}>
        Top Page Changes
      </CardTitle>
      <table className="mt-[14px] w-full table-fixed text-[14px]">
        <colgroup>
          <col />
          <col className="w-[70px]" />
          <col className="w-[99px]" />
          <col className="w-[53px]" />
        </colgroup>
        <thead>
          <tr className="h-[33px] border-b border-rk-border text-[12px]">
            <th className="pl-5 text-left font-normal">URL</th>
            <th className="text-right font-normal">Traffic</th>
            <th className="text-right font-normal">
              <span className="inline-flex items-center gap-1">
                Traffic Diff. <SortIcon className="text-rk-text-2" />
              </span>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {pageChanges.map((p) => (
            <tr key={p.url} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-1">
                  <Link href={`${routes.organic.positions}${Q}&url=${encodeURIComponent(p.url)}`} className="truncate text-rk-link hover:text-rk-link-hover">
                    {p.short}
                  </Link>
                  <ExtLink href={p.url} />
                </span>
              </td>
              <td className="text-right">{p.traffic}</td>
              <td className="pr-[2px] text-right">{p.diff < 0 ? `-${Math.abs(p.diff)}` : p.diff}</td>
              <td className="text-center">
                <button type="button" aria-label="Filter by this page" className="text-[#a9abb6] hover:text-rk-link">
                  <svg viewBox="0 0 16 16" width={16} height={16}>
                    <path d="M2.5 3h11L9.5 8v5l-3-1.5V8z" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute bottom-[21px] left-5">
        <DarkButton href={`${routes.topPages}${Q}`}>View full report</DarkButton>
      </div>
    </div>
  );
}

function Stopwatch() {
  const ink = "#191b23";
  const glove = "#c5d0fb";
  return (
    <svg width="120" height="134" viewBox="0 0 120 134" className="absolute -top-[18px] left-[18px]">
      <path d="M3 35h18v40a28 28 0 0 0 56 0V14h37v51a55.5 55.5 0 0 1-111 0z" fill="#b6c5fd" />
      <path d="M4 76c3-3 5 3 8 0s4-7 7-4 3 4 5 2" fill="none" stroke={ink} strokeWidth="1.1" />
      <path d="M60 76 81 64l26 42-19 13z" fill="#fff" stroke={ink} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M95 99l12 7-19 13-8-11z" fill={ink} />
      <circle cx="51" cy="57" r="31" fill={glove} stroke={ink} strokeWidth="1.8" />
      <rect x="11" y="31" width="22" height="11" rx="5.5" transform="rotate(-20 22 36)" fill={glove} stroke={ink} strokeWidth="1.6" />
      <rect x="9" y="43" width="20" height="11" rx="5.5" transform="rotate(-10 19 48)" fill={glove} stroke={ink} strokeWidth="1.6" />
      <rect x="10" y="55" width="19" height="11" rx="5.5" fill={glove} stroke={ink} strokeWidth="1.6" />
      <rect x="56.5" y="16" width="5" height="10" rx="1" fill={glove} stroke={ink} strokeWidth="1.4" />
      <circle cx="59" cy="8" r="8.5" fill="none" stroke={ink} strokeWidth="2.4" />
      <circle cx="59" cy="8" r="8.5" fill="none" stroke="#c1cdfa" strokeWidth="0.9" />
      <circle cx="49" cy="56" r="26" fill="#c1cdfa" stroke={ink} strokeWidth="1.8" />
      <circle cx="49" cy="56" r="20.5" fill="#fff" stroke={ink} strokeWidth="1.2" />
      <path d="M49 38l4 14 14 4-14 4-4 14-4-14-14-4 14-4z" transform="rotate(20 49 56)" fill={glove} />
      <circle cx="49" cy="56" r="3.4" fill="#fff" stroke={ink} strokeWidth="1.4" />
      <circle cx="34" cy="68" r="2" fill="#fff" stroke={ink} strokeWidth="1.2" />
      <path d="M34 68l-4 6" stroke={ink} strokeWidth="1.2" />
      <path d="M59 31c5-7 20-8 28-1 4 4 1 10-5 9l-9-3" fill={glove} stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PtBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative mt-8 h-[123px] rounded-lg border border-[#c9d3fb] bg-[#eaf0ff]">
      <Stopwatch />
      <div className="absolute top-[18px] left-[170px] w-[800px] text-[14px] leading-5">
        Track positions for your specific keywords on a daily basis. Target different devices and locations. Monitor how your competitors are ranking for your target keywords.
      </div>
      <Link href={routes.positionTracking} className="absolute top-[69px] left-[170px] inline-flex h-[26px] items-center rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
        Set up the Position Tracking tool
      </Link>
      <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute top-[17px] right-[19px] text-rk-text-2 hover:text-rk-text">
        <CloseIcon width={14} height={14} />
      </button>
    </div>
  );
}

function DateRange() {
  return (
    <Popover
      align="right"
      panelClassName="w-[220px]"
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-white px-2 text-[14px] text-rk-text hover:bg-rk-bg">
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3" fill="none" stroke="currentColor" strokeWidth={1.6} />
          </svg>
          Sep 22 – 23, 2026
          <ChevronDown className={open ? "rotate-180" : ""} />
        </button>
      )}
    >
      {(close) =>
        ["Last day", "Last 7 days", "Last 28 days", "Last 3 months", "Custom range"].map((o) => (
          <MenuItem key={o} onClick={close}>
            {o}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

const segs = [
  { key: "all", title: "All Changes", sub: "View all position changes", count: 5, icon: null as ReactNode },
  { key: "improved", title: "Improved", sub: "Grown traffic positions", count: 0, icon: <ArrowUp className="text-[#009f81]" /> },
  { key: "declined", title: "Declined", sub: "Decreased traffic positions", count: 0, icon: <ArrowDown className="text-[#ff642d]" /> },
  { key: "serp", title: "Changes on SERP", sub: "Significant SERP changes", count: 0, icon: null },
];

function ChangeTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-4 flex h-[71px]">
      {segs.map((s, i) => {
        const on = s.key === value;
        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onChange(s.key)}
            className={`relative flex-1 border px-[18px] text-left ${i === 0 ? "rounded-l-md" : "-ml-px"} ${i === segs.length - 1 ? "rounded-r-md" : ""} ${on ? "z-10 border-[#8f9cea] bg-[#eaeefc]" : "border-rk-border bg-white hover:bg-rk-bg"}`}
          >
            <span className="flex items-center justify-between text-[16px] leading-6">
              <span className="flex items-center gap-[6px]">
                {s.icon}
                {s.title}
              </span>
              <span className="text-rk-muted">{s.count}</span>
            </span>
            <span className="mt-[2px] block text-[14px] leading-5 text-rk-muted">{s.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

function ChangesFilterBar({ tab, onTab }: { tab: "All Positions" | "Organic" | "SERP Features"; onTab: (v: "All Positions" | "Organic" | "SERP Features") => void }) {
  const { ref, stuck } = useStuck(0);
  return (
    <div ref={ref} className={`sticky top-0 z-30 flex h-[62px] items-center gap-[9px] bg-[#f9f9fa] px-8 ${stuck ? "border-b border-rk-border" : ""}`}>
      <Segmented options={["All Positions", "Organic", "SERP Features"] as const} value={tab} onChange={onTab} size="s" className="[&>button]:h-[27px] [&>button]:px-[8px]" />
      <SearchInput placeholder="Filter by keyword" width="w-[154px]" />
      <SearchInput placeholder="Filter by URL" width="w-[154px]" />
      <Popover
        panelClassName="w-[200px]"
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} className="ml-2 flex items-center gap-2 text-[14px] text-rk-link hover:text-rk-link-hover">
            <PlusIcon />
            Add filter
          </button>
        )}
      >
        {(close) =>
          ["Intent", "Position", "Traffic", "Volume", "KD %", "CPC", "SERP Features"].map((o) => (
            <MenuItem key={o} onClick={close}>
              {o}
            </MenuItem>
          ))
        }
      </Popover>
    </div>
  );
}

const cols = [44, 24, 145, 50, 42, 75, 49, 82, 64, 137, 46, 64, 67, 215, 90, 90, 91];
const fixedW = cols[0] + cols[1] + cols[2];
const totalW = cols.reduce((a, b) => a + b, 0);

function ChangeRowView({ r, checked, toggle }: { r: ChangeRow; checked: boolean; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  const td = "py-3 align-top";
  const line = "flex h-5 items-center";
  const stick = "sticky z-[1] bg-white group-hover:bg-[#fafafb]";
  return (
    <>
      <tr className="group border-b border-rk-border hover:bg-[#fafafb]">
        <td className={`${td} ${stick} left-0 pl-[25px]`}>
          <button type="button" aria-label="Expand" onClick={() => setOpen((o) => !o)} className={`${line} text-rk-text-2`}>
            <ChevronRight className={open ? "rotate-90" : ""} />
          </button>
        </td>
        <td className={`${td} ${stick} left-[44px]`}>
          <span className={line}>
            <Checkbox checked={checked} onChange={toggle} />
          </span>
        </td>
        <td className={`${td} ${stick} left-[68px] pr-[17px] pl-[10px] leading-5`}>
          <KeywordLink keyword={r.keyword} plus anywhere />
        </td>
        <td className={`${td} pl-[25px]`}>
          <span className={line}>
            <IntentBadge intent={r.intent} />
          </span>
        </td>
        <td className={`${td} pr-1`}>
          <span className={`${line} justify-end ${r.previous == null ? "pr-2 text-[#a9abb6]" : ""}`}>{r.previous ?? "·"}</span>
        </td>
        <td className={`${td} pr-[19px]`}>
          <span className={`${line} justify-end ${r.current == null ? "pr-2 text-[#a9abb6]" : ""}`}>{r.current ?? "·"}</span>
        </td>
        <td className={`${td} pl-[15px]`}>
          <span className={`${line} ${r.diff === "lost" ? "text-rk-danger" : "text-rk-success"}`}>{r.diff}</span>
        </td>
        <td className={`${td} pr-[9px]`}>
          <span className={`${line} justify-end`}>{r.traffic}</span>
        </td>
        <td className={`${td} pr-[6px]`}>
          <span className={`${line} justify-end`}>{r.pct}</span>
        </td>
        <td className={`${td} pl-9`}>
          <span className={line}>
            <SerpCell />
          </span>
        </td>
        <td className={td}>
          <span className={`${line} justify-end`}>{r.volume}</span>
        </td>
        <td className={td}>
          <span className={`${line} justify-end`}>
            <Kd kd={r.kd} />
          </span>
        </td>
        <td className={td}>
          <span className={`${line} justify-end`}>{r.cpc}</span>
        </td>
        <td className="pt-[14px] pr-[34px] pb-[13px] pl-[17px] align-top">
          <a href={ext(r.url)} target="_blank" rel="noreferrer" className="block leading-4 break-all text-rk-link tabular-nums hover:text-rk-link-hover">
            {r.url}
          </a>
        </td>
        <td className={`${td} pr-5`}>
          <span className={`${line} justify-end`}>Sep 23</span>
        </td>
        <td className={`${td} pr-5`}>
          <span className={`${line} justify-end`}>{r.volume === "30" ? "1.2M" : "4.6M"}</span>
        </td>
        <td className={`${td} pr-5`}>
          <span className={`${line} justify-end`}>0.0{r.kd % 9}</span>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-rk-border bg-[#f7f7f9]">
          <td colSpan={cols.length} className="py-4 pl-[100px] text-[14px] text-rk-text-2">
            {r.diff === "lost" ? `Lost position ${r.previous}` : `New at position ${r.current}`} ·{" "}
            <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(r.keyword)}&db=se`} className="text-rk-link">
              Open in Keyword Overview
            </Link>
          </td>
        </tr>
      )}
    </>
  );
}

function ChangesTable({ tab, filter }: { tab: string; filter: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: 0, ratio: 0.71 });
  const [sel, setSel] = useState<Set<number>>(new Set());
  const rows = changeRows
    .map((r, i) => ({ r, i }))
    .filter(() => tab !== "SERP Features" && filter === "all");
  const all = rows.length > 0 && rows.every(({ i }) => sel.has(i));
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPos({ left: max ? el.scrollLeft / max : 0, ratio: (el.clientWidth - fixedW) / (el.scrollWidth - fixedW + 32) });
  };
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setPos((p) => ({ ...p, ratio: (el.clientWidth - fixedW) / (el.scrollWidth - fixedW + 32) })));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const th = "text-[12px] font-normal whitespace-nowrap";
  const stickTh = "sticky z-[1] bg-[#f8f8fa]";
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="flex h-[42px] items-center justify-between px-5">
        <div className="text-[14px]">
          All Position Changes: <b>{rows.length}</b>
        </div>
        <div className="flex items-center gap-2">
          <Popover
            align="right"
            panelClassName="w-[200px]"
            trigger={({ toggle }) => (
              <button type="button" onClick={toggle} className="flex h-[26px] items-center gap-2 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
                <PlusIcon />
                Add to list
              </button>
            )}
          >
            {(close) => <MenuItem onClick={close}>Create new list</MenuItem>}
          </Popover>
          <IconBtn label="Table settings">
            <GearIcon />
          </IconBtn>
          <ExportMenu />
        </div>
      </div>
      <div className="relative pb-[20px]">
        <div ref={scroller} onScroll={onScroll} className="no-scrollbar overflow-x-auto">
          <table className="table-fixed text-[14px]" style={{ width: totalW, minWidth: "100%" }}>
            <colgroup>
              {cols.map((w, i) => (
                <col key={i} style={{ width: w }} />
              ))}
            </colgroup>
            <thead>
              <tr className="h-[41px] border-y border-rk-border bg-[#f8f8fa] text-left">
                <th className={`${stickTh} left-0`} />
                <th className={`${stickTh} left-[44px]`}>
                  <Checkbox checked={all} onChange={() => setSel(all ? new Set() : new Set(rows.map(({ i }) => i)))} />
                </th>
                <th className={`${th} ${stickTh} left-[68px] pl-[12px]`}>Keyword</th>
                <th className={`${th} pl-2`}>Intent</th>
                <th className={`${th} pl-2`}>
                  <span className="block w-[40px] truncate">Previous</span>
                </th>
                <th className={`${th} pl-[26px]`}>Current</th>
                <th className={`${th} pl-[15px]`}>Diff.</th>
                <th className={`${th} bg-[#ececf0] pl-[10px]`}>
                  <span className="flex items-center gap-1">
                    <span className="w-[50px] truncate">Traffic %</span>
                    <SortIcon className="text-rk-text-2" />
                  </span>
                </th>
                <th className={`${th} pl-2`}>
                  <span className="block w-[52px] truncate">Traffic Change</span>
                </th>
                <th className={`${th} pl-[11px]`}>Changes on SERP</th>
                <th className={`${th} text-right`}>Volume</th>
                <th className={`${th} text-right`}>KD %</th>
                <th className={`${th} text-right`}>CPC</th>
                <th className={`${th} pl-[17px]`}>URL</th>
                <th className={`${th} pr-5 text-right`}>Updated</th>
                <th className={`${th} pr-5 text-right`}>Results</th>
                <th className={`${th} pr-5 text-right`}>Com.</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ r, i }) => (
                <ChangeRowView key={i} r={r} checked={sel.has(i)} toggle={() => setSel((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; })} />
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <div className="py-10 text-center text-[14px] text-rk-muted">No changes found for the selected period</div>}
        </div>
        {pos.ratio < 1 && (
          <div className="absolute right-[2px] bottom-[23.5px]" style={{ left: fixedW - 2 }}>
            <div
              className="h-[5px] cursor-pointer rounded-full bg-[#c4c7cf]"
              style={{ width: `${pos.ratio * 100}%`, marginLeft: `${pos.left * (1 - pos.ratio) * 100}%` }}
              onMouseDown={(e) => {
                const el = scroller.current;
                if (!el) return;
                const x0 = e.clientX;
                const s0 = el.scrollLeft;
                const track = (e.currentTarget.parentElement?.clientWidth ?? 1) * (1 - pos.ratio);
                const max = el.scrollWidth - el.clientWidth;
                const move = (ev: MouseEvent) => (el.scrollLeft = s0 + ((ev.clientX - x0) / track) * max);
                const up = () => {
                  document.removeEventListener("mousemove", move);
                  document.removeEventListener("mouseup", up);
                };
                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", up);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function ChangesView() {
  const [seg, setSeg] = useState("all");
  const [tab, setTab] = useState<"All Positions" | "Organic" | "SERP Features">("All Positions");
  return (
    <div>
      <div className="px-8 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <TrendCard />
          <PageChangesCard />
        </div>
        <PtBanner />
        <div className="mt-4 flex justify-end">
          <DateRange />
        </div>
        <ChangeTabs value={seg} onChange={setSeg} />
      </div>
      <ChangesFilterBar tab={tab} onTab={setTab} />
      <div className="px-8">
        <ChangesTable tab={tab} filter={seg} />
      </div>
    </div>
  );
}
