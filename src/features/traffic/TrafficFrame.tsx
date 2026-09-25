"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { Popover, MenuItem, useOutsideClose } from "@/components/ui/Popover";
import { CloseIcon, PlusIcon } from "@/components/ui/icons";
import { DevicePanel, GeoPanel, GranularityPanel, MonthRangePanel } from "./part1/filterPanels";
import { BellOffIcon, CalendarIcon, DevicesIcon, DownloadIcon, GeoIcon, ManualIcon, SmallChevron, TrendIcon } from "./icons";

export type TrafficDomain = { name: string; color: string };

export const domainColors = { zara: "#5d62de", asos: "#2ee6b1", hm: "#bd87f9" };

export const sampleDomains: TrafficDomain[] = [
  { name: "zara.com", color: domainColors.zara },
  { name: "asos.com", color: domainColors.asos },
  { name: "hm.com", color: domainColors.hm },
];

export const lockedDomains: TrafficDomain[] = [{ name: "rkjh.se", color: domainColors.zara }];

export type TrafficFilterKey = "geo" | "date" | "granularity" | "device";

export type TrafficFilterSpec = {
  key: string;
  value: string;
  icon?: ReactNode;
  options?: string[];
  suffix?: ReactNode;
};

export type TrafficFilter = TrafficFilterKey | TrafficFilterSpec;

export type ChipsVariant = "dots" | "plain" | "select";

const builtin: Record<TrafficFilterKey, { icon: ReactNode; value: string; options: string[] }> = {
  geo: { icon: <GeoIcon />, value: "Worldwide", options: ["Worldwide", "United States", "United Kingdom", "Germany", "France", "Spain", "Sweden"] },
  date: { icon: <CalendarIcon />, value: "Aug 2026", options: ["Aug 2026", "Jul 2026", "Jun 2026", "May 2026", "Apr 2026", "Mar 2026"] },
  granularity: { icon: <TrendIcon />, value: "Monthly", options: ["Monthly", "Daily"] },
  device: { icon: <DevicesIcon />, value: "All devices", options: ["All devices", "Desktop", "Mobile"] },
};

const granularityOptions = ["Daily", "Weekly", "Monthly", "Quarterly"];
const deviceOptions = ["All devices", "Mobile", "Desktop"];

function resolve(f: TrafficFilter) {
  if (typeof f === "string") return { key: f, ...builtin[f], suffix: undefined as ReactNode };
  const b = builtin[f.key as TrafficFilterKey];
  return { key: f.key, icon: f.icon ?? b?.icon, value: f.value, options: f.options ?? b?.options ?? [f.value], suffix: f.suffix };
}

function FilterSelect({ f }: { f: TrafficFilter }) {
  const r = resolve(f);
  const [value, setValue] = useState(r.value);
  const [open, setOpen] = useState(false);
  const [ring, setRing] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const close = () => {
    setOpen(false);
    setRing(true);
    btn.current?.focus();
  };
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  const builtinKey = typeof f === "string" ? f : null;
  const pick = (v: string) => {
    setValue(v);
    close();
  };
  let body: ReactNode;
  if (r.key === "geo") body = <GeoPanel value={value} onApply={pick} />;
  else if (builtinKey === "date") body = <MonthRangePanel value={value} onApply={pick} />;
  else if (r.key === "granularity") body = <GranularityPanel options={builtinKey ? granularityOptions : r.options} value={value} onPick={pick} />;
  else if (r.key === "device") body = <DevicePanel options={deviceOptions} value={value} onPick={pick} />;
  else
    body = (
      <div className="absolute top-[36px] left-0 z-50 min-w-[180px] rounded-md bg-white py-1 shadow-popover">
        {r.options.map((o) => (
          <MenuItem key={o} active={o === value} onClick={() => pick(o)}>
            {o}
          </MenuItem>
        ))}
      </div>
    );
  return (
    <div className="flex items-center gap-[6px]">
      <div ref={ref} className="relative flex h-8 items-center">
        <button
          type="button"
          data-testid={`traffic-filter-${r.key}`}
          ref={btn}
          aria-expanded={open}
          onClick={() => (open ? close() : setOpen(true))}
          onBlur={() => setRing(false)}
          className={`group flex h-5 items-center text-[14px] leading-5 whitespace-nowrap text-rk-link outline-[#8b8fdd] hover:text-rk-link-hover focus-visible:outline-2 ${ring ? "outline-2" : "outline-none"}`}
        >
          {r.icon && <span className="mr-[4px] flex">{r.icon}</span>}
          <span className="decoration-1 underline-offset-[3px] group-hover:underline">{value}</span>
          <SmallChevron width={14} height={14} className="ml-[3px]" />
        </button>
        {open && body}
      </div>
      {r.suffix}
    </div>
  );
}

function FilterRow({ filters }: { filters: TrafficFilter[] }) {
  return (
    <div className="flex items-center gap-[26px]">
      {filters.map((f) => (
        <FilterSelect key={typeof f === "string" ? f : f.key} f={f} />
      ))}
    </div>
  );
}

export function DomainDot({ color, size = 10, className = "" }: { color: string; size?: number; className?: string }) {
  return <span className={`inline-block shrink-0 rounded-full ${className}`} style={{ width: size, height: size, background: color }} />;
}

function Chips({ domains, variant, locked }: { domains: TrafficDomain[]; variant: ChipsVariant; locked: boolean }) {
  const chip = "flex h-[28px] items-center rounded-full border border-[#dcdede] bg-white text-[14px] leading-5 font-medium text-rk-muted";
  if (variant === "plain")
    return (
      <div className="flex items-center gap-[4px]">
        {domains.map((d) => (
          <span key={d.name} className={`${chip} px-[8px]`}>
            {d.name}
          </span>
        ))}
        {locked && (
          <button type="button" className="ml-[4px] text-[14px] text-rk-muted hover:text-rk-link">
            Edit
          </button>
        )}
      </div>
    );
  if (variant === "select") {
    const d = domains[0];
    return (
      <Popover
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} className={`${chip} gap-[9px] pr-[12px] pl-[7px]`}>
            <DomainDot color={d.color} />
            {d.name}
            <SmallChevron width={14} height={14} className="-ml-[5px] text-rk-muted" />
          </button>
        )}
        panelClassName="min-w-[160px]"
      >
        {(close) =>
          domains.map((x) => (
            <MenuItem key={x.name} onClick={close} active={x.name === d.name}>
              <DomainDot color={x.color} />
              {x.name}
            </MenuItem>
          ))
        }
      </Popover>
    );
  }
  return (
    <div className="flex items-center gap-[3px]">
      {domains.map((d) => (
        <span key={d.name} className={`${chip} gap-[10px] pr-[9px] pl-[7px]`}>
          <DomainDot color={d.color} />
          {d.name}
          {locked && <CloseIcon width={12} height={12} className="-ml-[4px] text-rk-muted" />}
        </span>
      ))}
      {locked && (
        <button type="button" aria-label="Add competitor" className="ml-[5px] flex h-[28px] w-[28px] items-center justify-center rounded-full bg-rk-btn-dark text-white">
          <PlusIcon width={14} height={14} strokeWidth={2.4} />
        </button>
      )}
    </div>
  );
}

function ListHeader() {
  return (
    <div className="flex items-center gap-[14px] pl-[30px]">
      <Popover
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} className="flex items-center gap-[4px] text-[16px] leading-6 text-rk-text">
            Untitled list
            <SmallChevron width={16} height={16} />
          </button>
        )}
        panelClassName="min-w-[180px]"
      >
        {(close) => (
          <>
            <MenuItem onClick={close} active>
              Untitled list
            </MenuItem>
            <MenuItem onClick={close}>+ Create new list</MenuItem>
          </>
        )}
      </Popover>
      <button type="button" aria-label="Notifications off" className="text-rk-muted hover:text-rk-text">
        <BellOffIcon />
      </button>
    </div>
  );
}

export function SampleBanner() {
  return (
    <div className="sticky top-0 z-30 flex h-[48px] items-center gap-[12px] border-b border-[#aedbd0] bg-[#c5fdf1] pl-8">
      <button type="button" className="flex h-7 items-center rounded-[6px] bg-[#00a47e] px-[9px] text-[14px] leading-5 font-semibold text-white hover:bg-[#008f6d]">
        Buy for $289/mo
      </button>
      <span className="text-[14px] leading-5 text-rk-text">You are viewing a sample data</span>
    </div>
  );
}

function StickyLockedBar({ filters }: { filters: TrafficFilter[] }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 209);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed top-0 right-0 left-0 z-30 flex h-[45px] items-center gap-[30px] border-b border-[#e6e8e8] bg-rk-bg pl-[37px]">
      <BellOffIcon className="text-rk-muted" />
      <FilterRow filters={filters} />
    </div>
  );
}

export function TrafficFrame({
  title,
  pdf = false,
  filters = ["geo", "date", "granularity", "device"],
  chips = "dots",
  domains,
  locked = false,
  minWidth = 1300,
  bottomGap = 100,
  titleExtra,
  children,
}: {
  title: ReactNode;
  pdf?: boolean;
  filters?: TrafficFilter[];
  chips?: ChipsVariant;
  domains?: TrafficDomain[];
  locked?: boolean;
  minWidth?: number;
  bottomGap?: number;
  titleExtra?: ReactNode;
  children: ReactNode;
}) {
  const ds = domains ?? (locked ? lockedDomains : sampleDomains);
  return (
    <div style={{ minWidth }}>
      <AppShell section="traffic" search={{ kind: "none" }}>
        <div className="relative">
          {locked ? (
            <>
              <StickyLockedBar filters={filters} />
              <div className="border-b border-[#e6e8e8] pt-[18px] pb-[20px]">
                <ListHeader />
                <div className="mt-[15px] pl-[28px]">
                  <Chips domains={ds} variant={chips} locked />
                </div>
              </div>
            </>
          ) : (
            <>
              <SampleBanner />
              <div className="h-[66px] border-b border-[#e6e8e8] pt-[16px] pl-[28px]">
                <Chips domains={ds} variant={chips} locked={false} />
              </div>
            </>
          )}
          <div className="flex h-[52px] items-center border-b border-[#e6e8e8] pl-8">
            <FilterRow filters={filters} />
          </div>
          <div className="px-8" style={{ paddingBottom: bottomGap }}>
            <div className="flex max-w-[calc(100vw-51px)] items-center justify-between pt-[23px] pb-[14px]">
              <div className="flex items-center gap-[16px]">
                <h1 className="text-[20px] leading-7 font-semibold text-rk-text">{title}</h1>
                {pdf && (
                  <button type="button" className="flex h-8 items-center gap-[10px] text-[14px] text-rk-muted hover:text-rk-text">
                    <DownloadIcon />
                    PDF
                  </button>
                )}
                {titleExtra}
              </div>
              <button type="button" className="flex items-center gap-[5px] text-[14px] leading-5 text-rk-muted hover:text-rk-link">
                <ManualIcon />
                User manual
              </button>
            </div>
            {children}
          </div>
        </div>
      </AppShell>
    </div>
  );
}
