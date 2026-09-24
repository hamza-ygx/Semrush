"use client";

import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { AppShell, type HeaderSearchConfig } from "@/components/shell/AppShell";
import { ChevronDownIcon, TranslateIcon } from "@/components/icons";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ChevronDown, CloseIcon } from "@/components/ui/icons";

export const D1 = "#6167e6";
export const D2 = "#2ed9ae";
export const PAGE_BG = "#f3f5f5";

export function CenteredFooter() {
  const link = "text-[16px] leading-6 text-[#6c6e79] hover:text-rk-text";
  return (
    <footer className="flex flex-col items-center pt-[136px] pb-[37px]">
      <Popover
        align="left"
        panelClassName="min-w-[140px] bottom-[calc(100%+4px)] top-auto!"
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} className={`${link} flex items-center gap-[7px]`}>
            <TranslateIcon className="text-[#484a54]" />
            English
            <ChevronDownIcon width={14} height={14} className="text-[#a9abb6]" />
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
        <a href="#" className={link}>
          Contact us
        </a>
        <a href="#" className={link}>
          Cookie settings
        </a>
      </div>
      <div className="mt-6 text-[16px] leading-6 text-[#6c6e79]">© 2026 {brand.legalName}. All rights reserved.</div>
    </footer>
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

export function ScopeSelect({ label = "Root Domain", lower = false, className = "" }: { label?: string; lower?: boolean; className?: string }) {
  const [v, setV] = useState(label);
  const opts = scopes.map((s) => (lower ? s.charAt(0) + s.slice(1).toLowerCase() : s));
  return (
    <Popover
      className={className}
      panelClassName="min-w-[150px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-text">
          {v}
          <ChevronDownIcon width={14} height={14} />
        </button>
      )}
    >
      {(close) =>
        opts.map((o) => (
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
    <div
      className={`relative flex h-8 items-center rounded-md border bg-white pr-2 pl-2 ${focus ? "border-[#7a86f2]" : "border-[#dfe2e2]"} ${className}`}
    >
      {you ? (
        <YouTag className={`shrink-0 ${wide ? "mr-4 px-[9px]!" : "mr-2"}`} />
      ) : (
        <Dot color={value ? color ?? "#c4c7cf" : "#c4c7cf"} size={12} className={wide ? "mr-[14px] ml-[3px]" : "mr-[9px] ml-[3px]"} />
      )}
      <input
        value={shown}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[14px] text-rk-text outline-none placeholder:text-[#8a8e9b]"
      />
      {value && (
        <button type="button" aria-label="Clear" onClick={() => onChange("")} className="ml-1 shrink-0 text-[#6c6e79] hover:text-rk-text">
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
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex w-full items-center justify-between gap-2 rounded-md border border-[#dfe2e2] bg-white ${
            size === "l" ? "h-10 px-3 text-[16px]" : "h-7 px-2 text-[14px]"
          } ${muted && v === value ? "text-[#8a8e9b]" : "text-rk-text"}`}
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
}: {
  items: { key: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  size?: "s" | "m";
  className?: string;
}) {
  return (
    <div className={`inline-flex ${className}`}>
      {items.map((it, i) => {
        const on = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={`relative flex items-center gap-[6px] border px-2 whitespace-nowrap ${size === "s" ? "h-7 text-[14px]" : "h-7 text-[14px]"} ${
              i === 0 ? "rounded-l-md" : "-ml-px"
            } ${i === items.length - 1 ? "rounded-r-md" : ""} ${
              on ? "z-10 border-[#8ea4f5] bg-[#eef3ff] text-rk-text" : "border-[#dfe2e2] bg-white text-rk-text hover:bg-rk-bg"
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

export function Checkbox({ color, checked, onChange, label }: { color: string; checked: boolean; onChange: () => void; label: ReactNode }) {
  return (
    <button type="button" onClick={onChange} className="flex items-center gap-2 text-[14px] leading-5 text-rk-text">
      <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border" style={checked ? { background: color, borderColor: color } : { borderColor: "#c4c7cf", background: "#fff" }}>
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
  <svg viewBox="0 0 16 16" width={16} height={16} className={`inline-block shrink-0 text-[#a9abb6] ${className}`}>
    <path d="M2.5 3h11v10h-11zM2.5 7h11" fill="none" stroke="currentColor" strokeWidth={1.4} />
  </svg>
);
