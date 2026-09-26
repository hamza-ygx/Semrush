"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChevronRight, PlusIcon } from "@/components/ui/icons";
import { Checkbox, Select, Segmented } from "./controls";
import { SortAscIcon, SortIcon, SparkleIcon } from "./icons";
import { GrayButton, Panel } from "./ui";
import { TipBox } from "./Tip";
import { ActionsMenu, PotMetricSelect, SfCount, TableSettingsMenu, type PotMetric } from "./RankingsMenus";
import { periodLabel, useTracking } from "./context";
import { kdColor, latestKeywords, onSerp, project, trackedKeywords, type TrackedKeyword } from "./data";

type Col = {
  key: string;
  w: number;
  label: ReactNode;
  align?: "left" | "right" | "center";
  sep?: boolean;
  head?: string;
};

const cols: Col[] = [
  { key: "intent", w: 50, label: "Intent" },
  { key: "sf", w: 53, label: "SF", align: "center" },
  { key: "kd", w: 60, label: "KD %", align: "right" },
  {
    key: "pt",
    w: 104,
    sep: true,
    head: "bg-[#f7f1fd]",
    align: "right",
    label: (
      <span className="flex w-full items-start justify-between">
        <SparkleIcon width={18} height={18} className="-mt-[3px]" />
        <span className="text-right">
          Your
          <br />
          Pot. Traffic
        </span>
      </span>
    ),
  },
  {
    key: "pg",
    w: 104,
    head: "bg-[#f7f1fd]",
    align: "right",
    label: (
      <span className="flex w-full items-start justify-between">
        <SparkleIcon width={18} height={18} className="-mt-[3px]" />
        <span className="text-right">
          Your
          <br />
          Pot. Growth
        </span>
      </span>
    ),
  },
  { key: "p17", w: 81, label: "Pos. Sep 17", align: "right", sep: true },
  {
    key: "p24",
    w: 105,
    head: "bg-[#e9ebeb]",
    align: "right",
    label: (
      <span className="flex items-center gap-[6px]">
        Pos. Sep 24 <SortAscIcon width={14} height={14} className="text-rk-muted" />
      </span>
    ),
  },
  { key: "d1", w: 51, label: "Diff", align: "right" },
  { key: "vis", w: 67, label: "Visibility", sep: true, align: "right" },
  { key: "d2", w: 46, label: "Diff", align: "right" },
  { key: "tr", w: 84, label: "Est. Traffic", sep: true, align: "right" },
  { key: "d3", w: 55, label: "Diff", align: "right" },
  { key: "vol", w: 80, label: "Volume", sep: true, align: "right" },
  { key: "cpc", w: 70, label: "CPC", align: "right" },
  { key: "url", w: 264, label: "URL", sep: true },
];

const potHead = (label: string, sorted?: boolean) => (
  <span className="flex w-full items-start justify-between">
    <SparkleIcon width={18} height={18} className="-mt-[3px]" />
    <span className="flex items-start gap-[6px] text-right">
      <span>
        Your
        <br />
        {label}
      </span>
      {sorted && <SortIcon width={16} height={16} className="mt-px text-rk-text-2" />}
    </span>
  </span>
);

const latestCols: Col[] = cols.map((c) => {
  if (c.key === "pt") return { ...c, w: 112, label: potHead("Pot. Visibility") };
  if (c.key === "pg")
    return {
      ...c,
      w: 126,
      head: "bg-[#e6d3fd]",
      label: potHead("Pot. Growth", true),
    };
  if (c.key === "p17") return { ...c, label: "Pos. Sep 19" };
  if (c.key === "p24") return { ...c, w: 83, head: "", label: "Pos. Sep 25" };
  if (c.key === "vis") return { ...c, w: 64 };
  if (c.key === "d2") return { ...c, w: 50 };
  return c;
});

const width = (cs: Col[]) => cs.reduce((a, c) => a + c.w, 0);

const serpPool = ["People also ask", "Site link", "Related searches", "AI Overview", "Reviews", "Video", "Image pack"];
const dash = <span className="text-[#d6d8d7]">—</span>;

const serpHref = (kw: string) =>
  `${routes.tracking.serp(kw)}?source_type=tracking&campaign_id=30526913_5175527&date_begin=20260925&domain=${project.domain}&location=Sweden%252C%2520desktop&type=organic&device_group=desktop`;

type Kw = TrackedKeyword & { potVis?: number };

function cell(k: Kw, key: string): ReactNode {
  switch (key) {
    case "intent":
      return k.intent === "n/a" ? (
        <span className="text-rk-muted">n/a</span>
      ) : (
        <span className="mt-[2px] inline-flex h-[16px] w-[16px] items-center justify-center rounded-[3px] bg-[#dbe2fe] text-[11px] font-semibold text-[#3d47c8]">{k.intent}</span>
      );
    case "sf":
      return (
        <span className="-mx-1 flex items-center justify-center gap-[6px] whitespace-nowrap">
          <a href={serpHref(k.keyword)} target="_blank" rel="noreferrer" aria-label={`SERP snapshot for ${k.keyword}`} data-testid="pt-serp-link" className="text-[#8b8d8c] hover:text-rk-link">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M2.5 13.5v-11h11v5M2.5 5.5h11" fill="none" stroke="currentColor" strokeWidth={1.5} />
              <circle cx="10" cy="10.5" r="2.5" fill="none" stroke="currentColor" strokeWidth={1.5} />
              <path d="m12 12.5 2 2" stroke="currentColor" strokeWidth={1.6} />
            </svg>
          </a>
          <span className="h-[20px] border-l border-[#e0e2e1]" />
          <SfCount n={k.sf} features={onSerp[k.keyword] ?? serpPool.slice(0, k.sf)} />
        </span>
      );
    case "kd":
      return (
        <span className="flex items-center justify-end gap-[4px] text-rk-text">
          {k.kd}
          <span className="h-[10px] w-[10px] rounded-full" style={{ background: kdColor(k.kd) }} />
        </span>
      );
    case "pt":
      if (k.potVis !== undefined) return <span className="text-rk-text">{k.potVis}%</span>;
      return k.potTraffic ? <span className="text-rk-text">{k.potTraffic.toFixed(2)}</span> : <span className="text-rk-muted">0</span>;
    case "pg":
      if (k.potVis !== undefined) return <span className="text-[#8a3fcf]">+{k.potVis}</span>;
      return k.potTraffic ? <span className="text-[#8a3fcf]">+{k.potTraffic.toFixed(2)}</span> : <span className="text-rk-muted">0</span>;
    case "p17":
    case "p24":
    case "d1":
      return dash;
    case "vol":
      return <span className="text-rk-text">{k.volume.toLocaleString("en-US")}</span>;
    case "cpc":
      return <span className="text-rk-muted">0.00</span>;
    case "url":
      return dash;
    default:
      return <span className="text-rk-muted">0</span>;
  }
}

const alignCls = (a?: string) => (a === "right" ? "justify-end text-right" : a === "center" ? "justify-center text-center" : "");

function PositionsChart({ period }: { period: string }) {
  const ticks = ["99", "99.5", "100", "100.5", "101"];
  const days = ["Sep 19", "Sep 20", "Sep 21", "Sep 22", "Sep 23", "Sep 24", "Sep 25"];
  const y = (i: number) => 66 + i * 46.5;
  return (
    <div className="relative h-[342px] bg-white text-rk-text">
      <div className="absolute top-[17px] left-[47px] flex items-baseline gap-[9px] text-[16px] leading-6">
        <span className="font-semibold">Positions</span>
        <span className="text-[14px] text-rk-muted">{period}</span>
      </div>
      <div className="absolute top-[17px] right-[48px]">
        <Checkbox checked color="#1b1e1a" label={<span className="text-[14px] text-rk-text">Smart zoom</span>} className="!gap-[8px]" />
      </div>
      {ticks.map((t, i) => (
        <span key={t} style={{ top: y(i) - 9 }} className="absolute right-[calc(100%-90px)] text-[12px] leading-[18px] text-rk-muted">
          {t}
        </span>
      ))}
      <div className="absolute top-0 right-[74px] bottom-0 left-[106px]">
        {ticks.map((t, i) => (
          <span key={t} style={{ top: y(i) }} className={`absolute right-0 left-0 border-t ${i === 4 ? "border-[#e0e2e1]" : "border-[#eef0f2]"}`} />
        ))}
        <span style={{ top: y(2) - 1.5 }} className="absolute right-0 left-0 h-[3px] bg-[#5c5fd6]" />
        {[0, 100].map((l) => (
          <span key={l} style={{ top: y(2) - 3.5, left: `calc(${l}% - 3.5px)` }} className="absolute h-[7px] w-[7px] rounded-full bg-[#5c5fd6]" />
        ))}
        {days.map((d, i) => (
          <span key={d} style={{ left: `${(i * 100) / 6}%`, top: 261 }} className="absolute -translate-x-1/2 text-[12px] leading-[18px] whitespace-nowrap text-rk-muted">
            {d}
          </span>
        ))}
      </div>
      <div className="absolute top-[302px] left-[51px] flex items-center text-[14px] leading-5">
        <Checkbox checked color="#5c5fd6" label={project.domain} className="!gap-[4px]" />
        <span className="ml-[32px] text-rk-muted">100</span>
        <span className="mx-[6px] text-rk-muted">→</span>
        <span>100</span>
      </div>
    </div>
  );
}

function Row({ k, cs, period }: { k: Kw; cs: Col[]; period: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={`group flex ${open ? "bg-[#f3f5f5]" : "hover:bg-[#f7f8f9]"}`}>
        <div className="relative flex w-[268px] shrink-0 pt-[14px] pr-[17px] pb-[13px]">
          <button type="button" aria-label="Expand" onClick={() => setOpen(!open)} className="absolute top-[15px] left-[20px] text-rk-muted">
            <ChevronRight width={16} height={16} strokeWidth={2} className={open ? "rotate-90" : ""} />
          </button>
          <span className="absolute top-[15px] left-[44px] h-[16px] w-[16px] rounded-[3px] border border-[#d6d8dd] bg-white" />
          <div className="ml-[75.6px] min-w-0">
            <Link
              href={`${routes.keywordOverview}?q=${encodeURIComponent(k.keyword)}&db=se`}
              className="block text-[14px] leading-[16.5px] text-rk-link decoration-[#b3c5f5] underline-offset-[3px] hover:underline"
            >
              {k.keyword}
            </Link>
            <button
              type="button"
              className={`mt-[7px] flex h-[19px] items-center gap-[4px] rounded-full border border-rk-border-strong bg-white px-[10px] text-[12px] text-rk-text-2 group-hover:visible hover:bg-rk-bg ${open ? "visible" : "invisible"}`}
            >
              <PlusIcon width={11} height={11} strokeWidth={2} />
              add tag
            </button>
          </div>
        </div>
        <div className="relative min-w-0 flex-1 overflow-x-clip border-t border-[#edefef] group-first:border-t-0 has-[[data-open]]:z-30">
          <div
            className="flex h-full"
            style={{
              width: width(cs),
              transform: "translateX(calc(var(--sx) * -1px))",
            }}
          >
            {cs.map((c) => (
              <div
                key={c.key}
                style={{ width: c.w }}
                className={`flex shrink-0 items-start px-2 pt-[11.5px] text-[14px] leading-5 whitespace-nowrap ${alignCls(c.align)} ${c.sep ? "border-l border-[#edefef]" : ""}`}
              >
                {cell(k, c.key)}
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && <PositionsChart period={period} />}
    </>
  );
}

function ScrollThumb({ sx, setSx, viewport, total }: { sx: number; setSx: (v: number) => void; viewport: number; total: number }) {
  const start = useRef<{ x: number; sx: number } | null>(null);
  const ratio = viewport / total;
  const max = total - viewport;
  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    start.current = { x: e.clientX, sx };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    setSx(Math.max(0, Math.min(max, start.current.sx + (e.clientX - start.current.x) / ratio)));
  };
  return (
    <div
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={() => (start.current = null)}
      onLostPointerCapture={() => (start.current = null)}
      style={{ left: sx * ratio, width: viewport * ratio }}
      className="absolute bottom-[1px] h-[7px] cursor-pointer rounded-full bg-[#d6d8d7] hover:bg-[#a9abaa]"
    />
  );
}

function KeywordHead({ shaded }: { shaded: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      data-testid="pt-kw-head"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`absolute inset-y-0 right-0 left-[68px] pt-[12px] pl-[8px] ${shaded || hover ? "bg-[#e9ebeb]" : ""}`}
    >
      <span className="flex items-center gap-[6px]">
        Keyword
        {hover && <SortIcon width={16} height={16} className="text-rk-muted" />}
      </span>
      {hover && (
        <TipBox gap={8} className="w-[225px] !py-[10px] !pr-4 !pl-[13px]">
          A search term from the current tracking campaign
        </TipBox>
      )}
    </div>
  );
}

export function RankingsTable() {
  const { latest, begin, end } = useTracking();
  const [pot, setPot] = useState<PotMetric>(latest ? "Potential Visibility" : "Potential Traffic");
  const cs = latest ? latestCols : cols;
  const total = width(cs);
  const rows: Kw[] = latest ? latestKeywords : trackedKeywords;
  const period = periodLabel(begin, "–", end);
  const [sx, setSx] = useState(0);
  const [viewport, setViewport] = useState(794);
  const vpRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setViewport(w);
      setSx((v) => Math.max(0, Math.min(v, total - w)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [total]);
  return (
    <Panel title="Rankings Overview" count={`1-${project.keywords} (${project.keywords})`} headerClassName="h-[44px] !pr-[20px]" className="mt-4" right={<TableSettingsMenu />}>
      <div className="flex items-center gap-[8px] px-5 pt-[20px] pb-[20px]">
        <button type="button" className="h-7 rounded-md bg-[#009f81] px-[9px] text-[14px] font-medium text-white hover:bg-[#007c65]">
          Buy more keywords
        </button>
        <GrayButton className="!gap-[8px] !bg-[#f5f6f6]">
          <PlusIcon width={14} height={14} />
          Add keywords
        </GrayButton>
        <ActionsMenu />
        <PotMetricSelect value={pot} onChange={setPot} className="ml-[6px]" />
        <Segmented className="ml-[6px]" items={["Positions", "Est. Traffic", "Visibility", `All for ${project.domain}`] as const} value={`All for ${project.domain}`} />
      </div>
      <div
        style={{ "--sx": sx } as CSSProperties}
        onWheel={(e) => (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) && setSx(Math.max(0, Math.min(total - viewport, sx + (e.deltaX || e.deltaY))))}
      >
        <div className="sticky top-[81px] z-20 flex h-[56px] bg-[#f7f8f9] text-[12px] leading-[18px] text-rk-text">
          <div className="relative w-[268px] shrink-0">
            <span className="absolute top-[18px] left-[44px] h-[16px] w-[16px] rounded-[3px] border border-[#d6d8dd] bg-white" />
            <KeywordHead shaded={!latest} />
          </div>
          <div ref={vpRef} className="relative min-w-0 flex-1 overflow-hidden">
            <div
              className="flex h-full"
              style={{
                width: total,
                transform: "translateX(calc(var(--sx) * -1px))",
              }}
            >
              {cs.map((c) => (
                <div
                  key={c.key}
                  style={{ width: c.w }}
                  className={`flex shrink-0 items-start px-2 pt-[12px] whitespace-nowrap ${alignCls(c.align)} ${c.head ?? ""} ${c.sep ? "border-l border-[#edefef]" : ""}`}
                >
                  {c.label}
                </div>
              ))}
            </div>
            {viewport < total && <ScrollThumb sx={sx} setSx={setSx} viewport={viewport} total={total} />}
          </div>
        </div>
        {rows.map((k) => (
          <Row key={k.keyword} k={k} cs={cs} period={period} />
        ))}
      </div>
      <div className="flex h-[66px] items-center gap-[8px] border-t border-[#edefef] px-5 pb-[5px] text-[14px] text-rk-text">
        Page:
        <input defaultValue="1" className="-ml-[5px] h-[27px] w-[67px] rounded-md border border-rk-border-strong px-[9px] text-[14px] outline-none focus:border-[#006dca]" />
        <span className="mr-[10px]">of 1</span>
        <Select label="100" placeholder={false} options={["10", "20", "50", "100"]} className="w-[60px] !h-[27px]" />
      </div>
    </Panel>
  );
}
