"use client";

import { useState, type ReactNode } from "react";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { CheckIcon, SearchIcon } from "@/components/ui/icons";
import { CalendarIcon, ChevronBold, XBoldIcon } from "./icons";

export function Select({
  label,
  options = [],
  className = "",
  align = "left",
  panel,
  placeholder = true,
}: {
  label: ReactNode;
  options?: readonly string[];
  className?: string;
  align?: "left" | "right";
  panel?: (close: () => void) => ReactNode;
  placeholder?: boolean;
}) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Popover
      align={align}
      panelClassName="min-w-[180px]"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex h-7 items-center gap-[6px] rounded-md border border-rk-border-strong bg-white pr-[7px] pl-[9px] text-[14px] whitespace-nowrap hover:bg-rk-bg ${
            placeholder && !value ? "text-[#8a8e9b]" : "text-rk-text"
          } ${open ? "border-[#006dca]" : ""} ${className}`}
        >
          <span className="flex-1 text-left">{value ?? label}</span>
          <ChevronBold className="shrink-0 text-rk-text" width={16} height={16} />
        </button>
      )}
    >
      {(close) =>
        panel
          ? panel(close)
          : options.map((o) => (
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
            ))
      }
    </Popover>
  );
}

export function SearchInput({ placeholder, width = 214, className = "" }: { placeholder: string; width?: number; className?: string }) {
  return (
    <div className={`flex h-7 ${className}`} style={{ width }}>
      <input
        placeholder={placeholder}
        className="h-7 min-w-0 flex-1 rounded-l-md border border-r-0 border-rk-border-strong bg-white px-[9px] text-[14px] text-rk-text outline-none placeholder:text-[#8a8e9b] focus:border-[#006dca]"
      />
      <button type="button" aria-label="Search" className="flex h-7 w-[27px] items-center justify-center rounded-r-md border border-rk-border-strong bg-[#f0f0f3] text-rk-text-2 hover:bg-rk-hover">
        <SearchIcon width={16} height={16} />
      </button>
    </div>
  );
}

export function Segmented<T extends string>({
  items,
  value,
  onChange,
  size = "m",
  className = "",
  render,
  suffix,
}: {
  suffix?: Partial<Record<T, ReactNode>>;
  items: readonly T[];
  value: T;
  onChange?: (v: T) => void;
  size?: "m" | "l";
  className?: string;
  render?: (v: T) => ReactNode;
}) {
  const [cur, setCur] = useState(value);
  return (
    <div className={`flex ${className}`}>
      {items.map((it, i) => {
        const on = it === cur;
        return (
          <button
            key={it}
            type="button"
            onClick={() => {
              setCur(it);
              onChange?.(it);
            }}
            className={`relative -ml-px flex items-center gap-[6px] border px-[8px] whitespace-nowrap first:ml-0 ${size === "l" ? "h-[29px] text-[14px]" : "h-7 text-[14px]"} ${
              i === 0 ? "rounded-l-md" : ""
            } ${i === items.length - 1 ? "rounded-r-md" : ""} ${
              on ? "z-10 border-[#8e9ff0] bg-[#e9edfc] text-rk-text" : "border-rk-border-strong bg-white text-rk-text hover:bg-rk-bg"
            }`}
          >
            {render ? render(it) : it}
            {suffix?.[it]}
          </button>
        );
      })}
    </div>
  );
}

export function DomainChip({ domain = "www.rkjh.se", size = "m" }: { domain?: string; size?: "m" | "s" }) {
  return (
    <div className={`flex ${size === "s" ? "h-[25px]" : "h-7"} items-stretch rounded-md border border-[#8e9ff0] bg-[#e9edfc] text-[14px] text-rk-text`}>
      <span className="flex items-center px-[8px]">{domain}</span>
      <button type="button" aria-label="Remove" className="flex w-[26px] items-center justify-center border-l border-[#8e9ff0] text-rk-text hover:bg-[#d6ddfa]">
        <XBoldIcon width={14} height={14} />
      </button>
    </div>
  );
}

const periods = ["Last 7 days", "Last 30 days", "Last 3 months", "Last 12 months", "Custom range"] as const;

export function DateRange({ label = "Sep 17-24, 2026", className = "" }: { label?: string; className?: string }) {
  const [p, setP] = useState<string>("Last 7 days");
  return (
    <Popover
      align="right"
      className={className}
      panelClassName="min-w-[200px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex h-7 items-center gap-[8px] rounded-md border border-rk-border-strong bg-white pr-[9px] pl-[10px] text-[14px] text-rk-text hover:bg-rk-bg">
          <CalendarIcon width={16} height={16} />
          {label}
        </button>
      )}
    >
      {(close) =>
        periods.map((o) => (
          <MenuItem
            key={o}
            active={o === p}
            onClick={() => {
              setP(o);
              close();
            }}
          >
            {o}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

export function Checkbox({
  checked: initial = false,
  color = "#191b23",
  label,
  className = "",
  size = 16,
}: {
  checked?: boolean;
  color?: string;
  label?: ReactNode;
  className?: string;
  size?: number;
}) {
  const [on, setOn] = useState(initial);
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 select-none ${className}`}>
      <span
        onClick={() => setOn(!on)}
        style={{ width: size, height: size, background: on ? color : "#fff", borderColor: on ? color : "#a9abb6" }}
        className="flex shrink-0 items-center justify-center rounded-[3px] border"
      >
        {on && <CheckIcon width={size - 4} height={size - 4} className="text-white" strokeWidth={2.4} />}
      </span>
      {label}
    </label>
  );
}

export function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={`relative h-[12px] w-[21px] rounded-full transition-colors ${on ? "bg-[#009f81]" : "bg-[#e0e1e9]"}`}
    >
      <span className={`absolute top-[1px] h-[10px] w-[10px] rounded-full bg-white shadow transition-all ${on ? "left-[10px]" : "left-[1px]"}`} />
    </button>
  );
}
