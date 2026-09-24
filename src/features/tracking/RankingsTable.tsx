"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChevronRight, GearIcon, PlusIcon } from "@/components/ui/icons";
import { Select, Segmented } from "./controls";
import { SortAscIcon, SparkleIcon } from "./icons";
import { GrayButton, Panel } from "./ui";
import { kdColor, project, trackedKeywords, type TrackedKeyword } from "./data";

type Col = { key: string; w: number; label: ReactNode; align?: "left" | "right" | "center"; sep?: boolean; head?: string };

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

const total = cols.reduce((a, c) => a + c.w, 0);
const dash = <span className="text-[#c4c7cf]">—</span>;

function cell(k: TrackedKeyword, key: string): ReactNode {
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
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#8a8e9b]">
            <path d="M2.5 13.5v-11h11v5M2.5 5.5h11" fill="none" stroke="currentColor" strokeWidth={1.5} />
            <circle cx="10" cy="10.5" r="2.5" fill="none" stroke="currentColor" strokeWidth={1.5} />
            <path d="m12 12.5 2 2" stroke="currentColor" strokeWidth={1.6} />
          </svg>
          <span className="h-[20px] border-l border-[#e0e1e9]" />
          <span className="dotted-underline text-rk-muted [text-underline-offset:3px]">{k.sf}</span>
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
      return k.potTraffic ? <span className="text-rk-text">{k.potTraffic.toFixed(2)}</span> : <span className="text-rk-muted">0</span>;
    case "pg":
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

function Row({ k }: { k: TrackedKeyword }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group flex hover:bg-[#f7f8f9]">
      <div className="relative flex w-[268px] shrink-0 pt-[14px] pr-[17px] pb-[13px]">
        <button type="button" aria-label="Expand" onClick={() => setOpen(!open)} className="absolute top-[15px] left-[20px] text-rk-muted">
          <ChevronRight width={16} height={16} strokeWidth={2} className={open ? "rotate-90" : ""} />
        </button>
        <span className="absolute top-[15px] left-[44px] h-[16px] w-[16px] rounded-[3px] border border-[#d6d8dd] bg-white" />
        <div className="ml-[75.6px] min-w-0">
          <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(k.keyword)}&db=se`} className="block text-[14px] leading-[16.5px] text-rk-link decoration-[#b3c5f5] underline-offset-[3px] hover:underline">
            {k.keyword}
          </Link>
          <button
            type="button"
            className="invisible mt-[7px] flex h-[19px] items-center gap-[4px] rounded-full border border-rk-border-strong bg-white px-[10px] text-[12px] text-rk-text-2 group-hover:visible hover:bg-rk-bg"
          >
            <PlusIcon width={11} height={11} strokeWidth={2} />
            add tag
          </button>
        </div>
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden border-t border-[#eceef2] group-first:border-t-0">
        <div className="flex h-full" style={{ width: total, transform: "translateX(calc(var(--sx) * -1px))" }}>
          {cols.map((c) => (
            <div key={c.key} style={{ width: c.w }} className={`flex shrink-0 items-start px-2 pt-[11.5px] text-[14px] leading-5 whitespace-nowrap ${alignCls(c.align)} ${c.sep ? "border-l border-[#eceef2]" : ""}`}>
              {cell(k, c.key)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScrollThumb({ sx, setSx, viewport }: { sx: number; setSx: (v: number) => void; viewport: number }) {
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
      style={{ left: sx * ratio, width: viewport * ratio }}
      className="absolute bottom-[1px] h-[7px] cursor-pointer rounded-full bg-[#c4c7cf] hover:bg-[#a9abb6]"
    />
  );
}

export function RankingsTable() {
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
  }, []);
  return (
    <Panel
      title="Rankings Overview"
      count={`1-${project.keywords} (${project.keywords})`}
      headerClassName="h-[44px] !pr-[20px]"
      className="mt-4"
      right={
        <GrayButton className="h-[27px] bg-white">
          <GearIcon />
          Table settings
        </GrayButton>
      }
    >
      <div className="flex items-center gap-[8px] px-5 pt-[20px] pb-[20px]">
        <button type="button" className="h-7 rounded-md bg-[#009f81] px-[9px] text-[14px] font-medium text-white hover:bg-[#007c65]">
          Buy more keywords
        </button>
        <GrayButton className="!gap-[8px] !bg-[#f4f5f9]">
          <PlusIcon width={14} height={14} />
          Add keywords
        </GrayButton>
        <GrayButton className="!bg-[#f4f5f9]">Actions</GrayButton>
        <Select
          label={
            <span className="flex items-center gap-[8px] text-rk-text">
              <SparkleIcon width={18} height={18} />
              Pot. Traffic
            </span>
          }
          options={["Pot. Traffic", "Pot. Growth"]}
          placeholder={false}
          className="ml-[6px] w-[134px]"
        />
        <Segmented className="ml-[6px]" items={["Positions", "Est. Traffic", "Visibility", `All for ${project.domain}`] as const} value={`All for ${project.domain}`} />
      </div>
      <div style={{ "--sx": sx } as CSSProperties} onWheel={(e) => (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) && setSx(Math.max(0, Math.min(total - viewport, sx + (e.deltaX || e.deltaY))))}>
        <div className="sticky top-[81px] z-20 flex h-[56px] bg-[#f7f8f9] text-[12px] leading-[18px] text-rk-text">
          <div className="relative w-[268px] shrink-0">
            <span className="absolute top-[18px] left-[44px] h-[16px] w-[16px] rounded-[3px] border border-[#d6d8dd] bg-white" />
            <div className="absolute inset-y-0 right-0 left-[68px] bg-[#e9ebeb] pt-[12px] pl-[8px]">Keyword</div>
          </div>
          <div ref={vpRef} className="relative min-w-0 flex-1 overflow-hidden">
            <div className="flex h-full" style={{ width: total, transform: "translateX(calc(var(--sx) * -1px))" }}>
              {cols.map((c) => (
                <div key={c.key} style={{ width: c.w }} className={`flex shrink-0 items-start px-2 pt-[12px] whitespace-nowrap ${alignCls(c.align)} ${c.head ?? ""} ${c.sep ? "border-l border-[#eceef2]" : ""}`}>
                  {c.label}
                </div>
              ))}
            </div>
            {viewport < total && <ScrollThumb sx={sx} setSx={setSx} viewport={viewport} />}
          </div>
        </div>
        {trackedKeywords.map((k) => (
          <Row key={k.keyword} k={k} />
        ))}
      </div>
      <div className="flex h-[66px] items-center gap-[8px] border-t border-[#eceef2] px-5 pb-[5px] text-[14px] text-rk-text">
        Page:
        <input defaultValue="1" className="-ml-[5px] h-[27px] w-[67px] rounded-md border border-rk-border-strong px-[9px] text-[14px] outline-none focus:border-[#006dca]" />
        <span className="mr-[10px]">of 1</span>
        <Select label="100" placeholder={false} options={["10", "20", "50", "100"]} className="w-[60px] !h-[27px]" />
      </div>
    </Panel>
  );
}
