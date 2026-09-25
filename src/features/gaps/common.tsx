"use client";

import { useState, type ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { brand } from "@/config/brand";
import { AppShell, type HeaderSearchConfig } from "@/components/shell/AppShell";
import { ChevronDownIcon, TranslateIcon } from "@/components/icons";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ChevronDown, CloseIcon } from "@/components/ui/icons";

export const D1 = "#6167e6";
export const D2 = "#2ed9ae";
export const PAGE_BG = "#f3f5f5";

export function CenteredFooter() {
  const link = "text-[16px] leading-6 text-[#6a6c6a] hover:text-rk-text";
  return (
    <>
      <div className="hidden pt-[34px] xl:block">
        <Footer />
      </div>
      <footer className="flex flex-col items-center pt-[136px] pb-[37px] xl:hidden">
        <Popover
          align="left"
          panelClassName="min-w-[140px] bottom-[calc(100%+4px)] top-auto!"
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className={`${link} flex items-center gap-[7px]`}>
              <TranslateIcon className="text-[#484a49]" />
              English
              <ChevronDownIcon width={14} height={14} className="text-[#a9abaa]" />
            </button>
          )}
        >
          {(close) =>
            ["English", "Español", "Deutsch", "Français", "Italiano", "Português", "Svenska"].map((l) => (
              <MenuItem key={l} active={l === "English"} onClick={close}>
                {l}
              </MenuItem>
            ))
          }
        </Popover>
        <div className="mt-6 flex gap-7">
          <button type="button" className={link}>
          Contact us
        </button>
          <button type="button" className={link}>
          Cookie settings
        </button>
        </div>
        <div className="mt-6 text-[16px] leading-6 text-[#6a6c6a]">© 2026 {brand.legalName}. All rights reserved.</div>
      </footer>
    </>
  );
}

export function GapShell({ search, children }: { search: HeaderSearchConfig; children: ReactNode }) {
  return (
    <AppShell section="seo" search={search} footer={false}>
      <style>{`html,body{background:${PAGE_BG}}`}</style>
      {children}
      <CenteredFooter />
    </AppShell>
  );
}

export const Dot = ({ color, size = 10, className = "" }: { color: string; size?: number; className?: string }) => (
  <span className={`inline-block shrink-0 rounded-full ${className}`} style={{ width: size, height: size, background: color }} />
);

export const YouTag = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex h-5 items-center rounded-full bg-[#e7e4fb] px-2 text-[12px] leading-4 text-[#5a50c8] ${className}`}>You</span>
);

const scopes = ["Root Domain", "Subdomain", "Subfolder", "Exact URL"] as const;

export const OPEN_BORDER = "border-[#b7b9e4]";

export function Opt({
  active,
  onClick,
  size = "m",
  className = "",
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  size?: "m" | "l";
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-2 text-left whitespace-nowrap text-rk-text ${size === "l" ? "h-10 px-3 text-[16px]" : "h-8 px-2 text-[14px]"} ${
        active ? "bg-[#e9effb] shadow-[inset_2px_0_0_#1b1e1a]" : "hover:bg-[#f2f4f8]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function Tip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute bottom-[calc(100%+11px)] left-1/2 z-50 hidden -translate-x-1/2 rounded-md bg-white px-3 text-left text-[14px] leading-5 font-normal whitespace-normal text-rk-text shadow-popover ${className}`}
    >
      {children}
      <span className="absolute top-full left-1/2 -mt-[5px] h-[10px] w-[10px] -translate-x-1/2 rotate-45 bg-white shadow-[2px_2px_2px_rgba(25,27,35,0.08)]" />
    </span>
  );
}

export function DomainPicker({ domains, testId, offset = 7 }: { domains: string[]; testId?: string; offset?: number }) {
  const [v, setV] = useState(domains[0]);
  const dotColors = [D1, D2, "#ff8e29", "#ff6b70", "#b58af2"];
  return (
    <Popover
      offset={offset}
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-testid={testId}
          onClick={toggle}
          className={`flex h-7 items-center gap-[6px] rounded-md border bg-white px-2 text-[14px] ${open ? OPEN_BORDER : "border-[#dfe2e2]"}`}
        >
          {v}
          <ChevronDown width={14} height={14} strokeWidth={2.4} />
        </button>
      )}
    >
      {(close) =>
        domains.map((d, i) => (
          <Opt
            key={d}
            active={d === v}
            onClick={() => {
              setV(d);
              close();
            }}
          >
            <Dot color={dotColors[i]} size={10} />
            {d}
          </Opt>
        ))
      }
    </Popover>
  );
}

export function ScopeSelect({
  label = "Root Domain",
  lower = false,
  options,
  className = "",
  testId,
}: {
  label?: string;
  lower?: boolean;
  options?: string[];
  className?: string;
  testId?: string;
}) {
  const [v, setV] = useState(label);
  const opts = options ?? scopes.map((s) => (lower ? s.charAt(0) + s.slice(1).toLowerCase() : s));
  return (
    <Popover
      className={className}
      offset={7}
      panelClassName="left-px! min-w-[102px]"
      trigger={({ toggle, open }) => (
        <button type="button" data-testid={testId} onClick={toggle} className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-text">
          <span className={open ? "underline decoration-[#8b8d8c] underline-offset-[5px]" : ""}>{v}</span>
          <ChevronDownIcon width={14} height={14} />
        </button>
      )}
    >
      {(close) =>
        opts.map((o) => (
          <Opt
            key={o}
            active={o === v}
            onClick={() => {
              setV(o);
              close();
            }}
          >
            {o}
          </Opt>
        ))
      }
    </Popover>
  );
}

export function DomainField({
  value,
  onChange,
  color,
  you,
  placeholder = "Add competitor",
  className = "",
  truncate,
  wide,
}: {
  value: string;
  onChange: (v: string) => void;
  color?: string;
  you?: boolean;
  placeholder?: string;
  className?: string;
  truncate?: number;
  wide?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const shown = !focus && truncate && value.length > truncate ? value.slice(0, truncate) + "...." : value;
  return (
    <div className={`relative flex h-8 items-center rounded-md border bg-white pr-2 pl-2 ${focus ? "border-[#7a86f2]" : "border-[#dfe2e2]"} ${className}`}>
      {you ? (
        <YouTag className={`shrink-0 ${wide ? "mr-4 px-[9px]!" : "mr-[4px] px-[9px]!"}`} />
      ) : (
        <Dot color={value ? (color ?? "#d6d8d7") : "#d6d8d7"} size={wide ? 12 : 10} className={wide ? "mr-[14px] ml-[3px]" : "mr-[8px]"} />
      )}
      <input
        value={shown}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent text-[14px] text-rk-text outline-none ${wide ? "placeholder:text-[#8b8d8c]" : "placeholder:text-[#a4a7b0]"}`}
      />
      {value && (
        <button type="button" aria-label="Clear" onClick={() => onChange("")} className="ml-1 shrink-0 text-[#6a6c6a] hover:text-rk-text">
          <CloseIcon width={14} height={14} />
        </button>
      )}
    </div>
  );
}

export function SelectButton({
  value,
  options,
  className = "",
  muted = true,
  size = "m",
}: {
  value: string;
  options: string[];
  className?: string;
  muted?: boolean;
  size?: "m" | "l";
}) {
  const [v, setV] = useState(value);
  return (
    <Popover
      className={className}
      panelClassName="min-w-full"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex w-full items-center justify-between gap-2 rounded-md border bg-white ${open ? OPEN_BORDER : "border-[#dfe2e2]"} ${
            size === "l" ? "h-10 px-3 text-[16px]" : "h-7 px-2 text-[14px]"
          } ${muted && v === value ? "text-[#8b8d8c]" : "text-rk-text"}`}
        >
          <span className="truncate">{v}</span>
          <ChevronDown width={14} height={14} className="shrink-0 text-rk-text" strokeWidth={2.4} />
        </button>
      )}
    >
      {(close) =>
        options.map((o) => (
          <MenuItem
            key={o}
            active={o === v}
            onClick={() => {
              setV(o);
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

export function Segmented<T extends string>({
  items,
  value,
  onChange,
  size = "m",
  className = "",
  testId,
  tipClassName = "",
}: {
  items: { key: T; label: ReactNode; tip?: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  size?: "s" | "m";
  className?: string;
  testId?: string;
  tipClassName?: string;
}) {
  return (
    <div className={`inline-flex ${className}`}>
      {items.map((it, i) => {
        const on = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            data-testid={testId ? `${testId}-${it.key}` : undefined}
            onClick={() => onChange(it.key)}
            className={`group/seg relative flex items-center gap-[6px] border px-2 whitespace-nowrap ${size === "s" ? "h-7 text-[14px]" : "h-7 text-[14px]"} ${
              i === 0 ? "rounded-l-md" : "-ml-px"
            } ${i === items.length - 1 ? "rounded-r-md" : ""} ${
              on ? "z-10 border-[#8ea4f5] bg-[#eef3ff] text-rk-text" : "border-[#dfe2e2] bg-white text-rk-text hover:bg-rk-bg"
            }`}
          >
            {it.label}
            {it.tip && <Tip className={`group-hover/seg:block ${tipClassName}`}>{it.tip}</Tip>}
          </button>
        );
      })}
    </div>
  );
}

export function Checkbox({ color, checked, onChange, label }: { color: string; checked: boolean; onChange: () => void; label: ReactNode }) {
  return (
    <button type="button" onClick={onChange} className="flex items-center gap-2 text-[14px] leading-5 text-rk-text">
      <span
        className="flex h-4 w-4 items-center justify-center rounded-[4px] border"
        style={checked ? { background: color, borderColor: color } : { borderColor: "#d6d8d7", background: "#fff" }}
      >
        {checked && (
          <svg viewBox="0 0 16 16" width={12} height={12}>
            <path d="m3.5 8.5 3 3 6-6.5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

export const SerpIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`inline-block shrink-0 text-[#a9abaa] ${className}`}>
    <path d="M2.5 3h11v10h-11zM2.5 7h11" fill="none" stroke="currentColor" strokeWidth={1.4} />
  </svg>
);
