"use client";

import { useState, type ReactNode } from "react";
import { ExportIcon, InfoIcon } from "@/components/ui/icons";
import { CheckSmall } from "./icons";
import { DomainDot, sampleDomains, type TrafficDomain } from "./TrafficFrame";

export function SampleCard({
  title,
  info = false,
  link,
  extra,
  children,
  className = "",
  bodyClassName = "px-5 pt-5 pb-5",
  header = true,
}: {
  title?: ReactNode;
  info?: boolean;
  link?: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
  className?: string;
  bodyClassName?: string;
  header?: boolean;
}) {
  return (
    <section className={`rounded-lg bg-white shadow-card ${className}`}>
      {header && (
        <div className="flex h-[43px] items-center justify-between border-b border-[#f0f0f0] px-5">
          <div className="flex items-center gap-[8px]">
            <h2 className="text-[16px] leading-6 font-bold text-rk-text">{title}</h2>
            {info && <InfoIcon width={16} height={16} className="text-rk-faint" />}
            {link}
          </div>
          {extra}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function LegendCheck({ color, label, checked = true, onClick }: { color: string; label: ReactNode; checked?: boolean; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-[8px] text-[14px] leading-5 text-rk-text">
      <span
        className="flex h-4 w-4 items-center justify-center rounded-[4px] border text-white"
        style={checked ? { background: color, borderColor: color } : { background: "#fff", borderColor: "#c4c7cf" }}
      >
        {checked && <CheckSmall width={14} height={14} />}
      </span>
      {label}
    </button>
  );
}

export function DomainLegend({
  domains = sampleDomains,
  className = "",
  onChange,
}: {
  domains?: TrafficDomain[];
  className?: string;
  onChange?: (visible: Record<string, boolean>) => void;
}) {
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(domains.map((d) => [d.name, true])));
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {domains.map((d) => (
        <LegendCheck
          key={d.name}
          color={d.color}
          label={d.name}
          checked={on[d.name]}
          onClick={() => {
            const next = { ...on, [d.name]: !on[d.name] };
            setOn(next);
            onChange?.(next);
          }}
        />
      ))}
    </div>
  );
}

export function SegTabs<T extends string>({
  items,
  value,
  onChange,
  className = "",
  render,
}: {
  items: readonly T[];
  value?: T;
  onChange?: (v: T) => void;
  className?: string;
  render?: (v: T) => ReactNode;
}) {
  const [cur, setCur] = useState<T>(value ?? items[0]);
  return (
    <div className={`inline-flex h-7 items-stretch ${className}`}>
      {items.map((it, i) => {
        const active = it === cur;
        return (
          <button
            key={it}
            type="button"
            onClick={() => {
              setCur(it);
              onChange?.(it);
            }}
            className={`relative -ml-px flex items-center border px-[8px] text-[14px] leading-5 whitespace-nowrap text-rk-text first:ml-0 ${
              i === 0 ? "rounded-l-[6px]" : ""
            } ${i === items.length - 1 ? "rounded-r-[6px]" : ""} ${active ? "z-10 border-[#a3aabb] bg-[#f0f5ff]" : "border-[#d7d9de] bg-white hover:bg-rk-bg"}`}
          >
            {render ? render(it) : it}
          </button>
        );
      })}
    </div>
  );
}

export function DomainSwitch({ domains = sampleDomains, className = "", onChange }: { domains?: TrafficDomain[]; className?: string; onChange?: (d: string) => void }) {
  const byName = Object.fromEntries(domains.map((d) => [d.name, d]));
  return (
    <SegTabs
      className={className}
      items={domains.map((d) => d.name)}
      onChange={onChange}
      render={(n) => (
        <span className="-mr-px flex items-center gap-[10px]">
          <DomainDot color={byName[n].color} size={10} />
          {n}
        </span>
      )}
    />
  );
}

export function OutlineButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-7 items-center gap-[6px] rounded-[6px] border border-[#d7d9de] bg-[#f9fafa] px-[8px] text-[14px] leading-5 whitespace-nowrap text-rk-text-2 hover:bg-rk-hover ${className}`}
    >
      {children}
    </button>
  );
}

export function ExportButton({ label = "Export", className = "" }: { label?: string | null; className?: string }) {
  return (
    <OutlineButton className={className}>
      <ExportIcon width={16} height={16} />
      {label}
    </OutlineButton>
  );
}

export function Delta({ up, className = "" }: { up: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" width={12} height={12} className={`inline-block shrink-0 ${up ? "text-[#00a47e]" : "text-[#e0304a]"} ${className}`}>
      <path d={up ? "M6 10.5V1.8M2.5 5.2 6 1.7l3.5 3.5" : "M6 1.5v8.7M2.5 6.8 6 10.3l3.5-3.5"} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
