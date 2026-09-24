"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ChevronDown, ChevronsLeft, SearchIcon } from "@/components/ui/icons";
import type { Intent } from "./data";

export const kwHref = (q: string) =>
  `${routes.keywordOverview}?q=${encodeURIComponent(q)}&db=se`;
export const domainHref = (q: string) =>
  `${routes.domainOverview}?q=${encodeURIComponent(q)}&db=se&searchType=domain`;
export const ext = (u: string) => (u.startsWith("http") ? u : `https://${u}`);

export function ExtIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={`inline-block shrink-0 ${className}`}
    >
      <path
        d="M9.5 2.5h4v4M13.3 2.7 8 8M11.5 9.5v3.2c0 .5-.3.8-.8.8H3.3c-.5 0-.8-.3-.8-.8V5.3c0-.5.3-.8.8-.8h3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExtLink({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={ext(href)}
      target="_blank"
      rel="noreferrer"
      aria-label="Open in new tab"
      className={`inline-flex text-[#a9abb6] hover:text-rk-link ${className}`}
    >
      <ExtIcon />
    </a>
  );
}

export function SnapshotIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={`inline-block shrink-0 text-[#8a8d99] ${className}`}
    >
      <rect
        x="2.5"
        y="3"
        width="11"
        height="10"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path d="M2.5 7h11" stroke="currentColor" strokeWidth={1.5} />
      <path d="M3 3.5h10v3.5H3z" fill="currentColor" opacity=".35" />
    </svg>
  );
}

export function PlusCircle() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className="shrink-0 text-[#8a8d99]"
    >
      <circle
        cx="8"
        cy="8"
        r="6.8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      />
      <path
        d="M8 4.8v6.4M4.8 8h6.4"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function KeywordLink({
  keyword,
  snapshot = true,
  plus = false,
  anywhere = false,
  className = "",
}: {
  keyword: string;
  snapshot?: boolean;
  plus?: boolean;
  anywhere?: boolean;
  className?: string;
}) {
  const cut = keyword.lastIndexOf(" ") + 1;
  const head = keyword.slice(0, cut);
  const tail = keyword.slice(cut);
  return (
    <span
      className={`flex items-start ${plus ? "gap-1" : "gap-[6px]"} ${className}`}
    >
      {plus && (
        <button
          type="button"
          aria-label="Add to list"
          className="mt-[1px] hover:opacity-70"
        >
          <PlusCircle />
        </button>
      )}
      <span>
        <Link
          href={kwHref(keyword)}
          className="text-rk-link hover:text-rk-link-hover"
        >
          {head}
          <span
            className={
              anywhere ? "[overflow-wrap:anywhere]" : "whitespace-nowrap"
            }
          >
            {anywhere ? tail.slice(0, -1) : tail}
            <span className="whitespace-nowrap">
              {anywhere && tail.slice(-1)}
              {snapshot && (
                <button
                  type="button"
                  aria-label="View SERP"
                  className={`${anywhere ? "ml-1" : "ml-[6px]"} inline-flex align-[-3px] hover:opacity-70`}
                  onClick={(e) => e.preventDefault()}
                >
                  <SnapshotIcon />
                </button>
              )}
            </span>
          </span>
        </Link>
      </span>
    </span>
  );
}

const intentStyle: Record<Intent, string> = {
  C: "bg-[#ffdd5c] text-[#8c5a00]",
  I: "bg-[#cfdcfd] text-[#3656c2]",
  N: "bg-[#ecd0f8] text-[#8c30c7]",
  T: "bg-[#c4f4df] text-[#007c65]",
};
const intentName: Record<Intent, string> = {
  C: "Commercial",
  I: "Informational",
  N: "Navigational",
  T: "Transactional",
};

export function IntentBadge({ intent }: { intent: Intent }) {
  return (
    <span
      title={intentName[intent]}
      className={`inline-flex h-[17px] w-4 items-center justify-center rounded-[3px] text-[11px] leading-none font-semibold ${intentStyle[intent]}`}
    >
      {intent}
    </span>
  );
}

export const kdColor = (kd: number) =>
  kd < 15
    ? "#00a878"
    : kd < 30
      ? "#3edfb5"
      : kd < 50
        ? "#fdc23c"
        : kd < 70
          ? "#ff8c43"
          : kd < 85
            ? "#ff4953"
            : "#c3180f";

export function Kd({ kd }: { kd: number }) {
  return (
    <span className="inline-flex items-center justify-end gap-[6px]">
      {kd}
      <span
        className="h-3 w-3 rounded-full"
        style={{ background: kdColor(kd) }}
      />
    </span>
  );
}

export function SerpCell({ count }: { count?: number }) {
  return (
    <span className="inline-flex items-center">
      <svg
        viewBox="0 0 16 16"
        width={18}
        height={18}
        className="text-[#8a8d99]"
      >
        <path
          d="M2.5 12.5v-9h11v4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <circle
          cx="10"
          cy="10.5"
          r="2.3"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <path
          d="m11.8 12.3 1.9 1.9"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      </svg>
      <span className="mx-2 h-5 w-px bg-rk-border" />
      {count == null ? (
        <span className="text-[#c4c7cf]">·</span>
      ) : (
        <button
          type="button"
          className="text-rk-text-2 underline decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-link"
        >
          {count}
        </button>
      )}
    </span>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={18} height={18} className={className}>
      <path
        d="M8 14.8s-5-4.4-5-8.3a5 5 0 0 1 10 0c0 3.9-5 8.3-5 8.3z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <circle cx="8" cy="6.5" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function SortIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={`inline-block shrink-0 ${className}`}
    >
      <path
        d="M2.5 4h11M2.5 8h7M2.5 12h3.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Checkbox({
  checked,
  onChange,
  className = "",
}: {
  checked?: boolean;
  onChange?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={!!checked}
      onClick={onChange}
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${checked ? "border-[#2b6ee6] bg-[#2b6ee6]" : "border-[#c4c7cf] bg-white"} ${className}`}
    >
      {checked && (
        <svg viewBox="0 0 16 16" width={12} height={12}>
          <path
            d="m3.5 8.5 3 3 6-6.5"
            fill="none"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = "m",
  className = "",
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  size?: "s" | "m";
  className?: string;
}) {
  const h = size === "s" ? "h-7 px-2 text-[14px]" : "h-8 px-[10px] text-[16px]";
  return (
    <div className={`inline-flex ${className}`}>
      {options.map((o, i) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`relative ${h} border whitespace-nowrap ${i === 0 ? "rounded-l-md" : "-ml-px"} ${i === options.length - 1 ? "rounded-r-md" : ""} ${
              on
                ? "z-10 border-[#8f9cea] bg-[#eaeefc] text-rk-text"
                : "border-rk-border-strong bg-white text-rk-text hover:bg-rk-bg"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function FilterDropdown({
  label,
  options,
  width = "min-w-[200px]",
}: {
  label: string;
  options?: string[];
  width?: string;
}) {
  const opts = options ?? ["Any"];
  const [val, setVal] = useState<string | null>(null);
  return (
    <Popover
      panelClassName={`${width} p-1`}
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex h-7 items-center gap-[6px] rounded-md border pr-[6px] pl-[10px] text-[14px] whitespace-nowrap ${val ? "text-rk-text" : "text-rk-muted"} ${open ? "border-[#8f9cea] bg-[#eaeefc]" : "border-rk-border-strong bg-white hover:bg-rk-bg"}`}
        >
          {val ? `${label}: ${val}` : label}
          <ChevronDown className={`text-rk-text ${open ? "rotate-180" : ""}`} />
        </button>
      )}
    >
      {(close) => (
        <>
          {opts.map((o) => (
            <MenuItem
              key={o}
              active={o === val}
              onClick={() => {
                setVal(o === val ? null : o);
                close();
              }}
            >
              {o}
            </MenuItem>
          ))}
          {val && (
            <MenuItem
              onClick={() => {
                setVal(null);
                close();
              }}
              className="text-rk-link"
            >
              Clear filter
            </MenuItem>
          )}
        </>
      )}
    </Popover>
  );
}

export function SearchInput({
  placeholder,
  width = "w-[224px]",
  onChange,
}: {
  placeholder: string;
  width?: string;
  onChange?: (v: string) => void;
}) {
  const [v, setV] = useState("");
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        onChange?.(v);
      }}
    >
      <input
        value={v}
        onChange={(e) => {
          setV(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder={placeholder}
        className={`h-7 ${width} rounded-l-md border border-rk-border-strong bg-white px-[9px] text-[14px] outline-none placeholder:text-[#8a8d99] focus:border-[#7a86f2]`}
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex h-7 w-[32px] items-center justify-center rounded-r-md border border-l-0 border-rk-border-strong bg-[#f4f5f9] text-rk-text-2 hover:bg-rk-hover"
      >
        <SearchIcon />
      </button>
    </form>
  );
}

export function Pagination({
  pages,
  page = 1,
  onPage,
}: {
  pages: number;
  page?: number;
  onPage?: (p: number) => void;
}) {
  const [p, setP] = useState(page);
  const go = (n: number) => {
    const v = Math.min(Math.max(1, n), pages);
    setP(v);
    onPage?.(v);
  };
  const dis = "border border-[#ebecf0] bg-[#f7f7f9] text-[#b9bbc4]";
  return (
    <div className="flex items-center gap-2 text-[14px]">
      <button
        type="button"
        onClick={() => go(1)}
        disabled={p === 1}
        className={`flex h-7 w-7 items-center justify-center rounded-md ${p === 1 ? dis : "border border-rk-border-strong bg-white text-rk-text-2 hover:bg-rk-bg"}`}
      >
        <ChevronsLeft />
      </button>
      <button
        type="button"
        onClick={() => go(p - 1)}
        disabled={p === 1}
        className={`h-7 rounded-md px-2 text-[14px] ${p === 1 ? `${dis}` : "border border-rk-border-strong bg-white text-rk-text-2 hover:bg-rk-bg"}`}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => go(p + 1)}
        className="h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]"
      >
        Next
      </button>
      <span className="ml-[9px] text-[14px] text-rk-text">Page:</span>
      <input
        value={p}
        onChange={(e) => go(+e.target.value || 1)}
        className="h-7 w-[67px] rounded-md border border-rk-border-strong px-2 text-[14px] outline-none"
      />
      <span className="text-[14px] text-rk-text">
        of{" "}
        <button
          type="button"
          onClick={() => go(pages)}
          className="text-rk-link hover:text-rk-link-hover"
        >
          {pages}
        </button>
      </span>
    </div>
  );
}

export function CardTitle({
  children,
  right,
  className = "",
}: {
  children: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-10 items-center justify-between border-b border-rk-border px-5 ${className}`}
    >
      <h2 className="text-[16px] leading-6 font-semibold text-rk-text">
        {children}
      </h2>
      {right}
    </div>
  );
}

export function DarkButton({
  children,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `inline-flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38] ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function TimeRange({
  options = ["1M", "6M", "1Y", "2Y", "All time"],
  value,
}: {
  options?: string[];
  value: string;
}) {
  const [v, setV] = useState(value);
  return (
    <div className="flex items-center gap-[16px] text-[14px]">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => setV(o)}
          className="relative pb-[3px] text-rk-text hover:text-rk-link"
        >
          {o}
          {o === v && (
            <span className="absolute right-0 -bottom-[3px] left-0 h-[3px] rounded-sm bg-rk-tab" />
          )}
        </button>
      ))}
    </div>
  );
}

export function LegendCheck({
  color,
  label,
  checked,
  onChange,
}: {
  color: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-2 text-[14px] text-rk-text"
    >
      <span
        className="flex h-4 w-4 items-center justify-center rounded-[3px] border"
        style={
          checked
            ? { background: color, borderColor: color }
            : { borderColor: "#c4c7cf", background: "#fff" }
        }
      >
        {checked && (
          <svg viewBox="0 0 16 16" width={12} height={12}>
            <path
              d="m3.5 8.5 3 3 6-6.5"
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

export function NotesMenu() {
  return (
    <Popover
      align="right"
      panelClassName="w-[200px]"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-[6px] text-[14px] text-rk-text"
        >
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path
              d="M2.5 2.5h11v8.5H6l-3.5 3z"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </svg>
          Notes
          <ChevronDown />
        </button>
      )}
    >
      {(close) => (
        <>
          <MenuItem onClick={close}>Add note</MenuItem>
          <MenuItem onClick={close}>Show {brand.name} notes</MenuItem>
          <MenuItem onClick={close}>Show my notes</MenuItem>
        </>
      )}
    </Popover>
  );
}

export function SimpleFooter() {
  return (
    <>
      <div className="hidden pt-[34px] xl:block">
        <Footer />
      </div>
    <footer className="flex flex-col items-center pt-[135px] pb-[37px] text-[16px] leading-6 text-rk-text-2 xl:hidden">
      <Popover
        panelClassName="w-[160px]"
        trigger={({ toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-[6px] hover:text-rk-text"
          >
            <svg viewBox="0 0 16 16" width={18} height={18}>
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1.5 3.5h7M5 2v1.5M3 3.5c.6 2.4 2.3 4.2 4.5 5M7 3.5C6.5 6 4.6 8 2 9" />
                <path d="m8 14.5 3-7 3 7M9 12.2h4" />
              </g>
            </svg>
            English
            <ChevronDown className="text-[#a9abb6]" />
          </button>
        )}
      >
        {(close) =>
          [
            "English",
            "Deutsch",
            "Español",
            "Français",
            "Italiano",
            "Svenska",
          ].map((l) => (
            <MenuItem key={l} onClick={close}>
              {l}
            </MenuItem>
          ))
        }
      </Popover>
      <div className="mt-[25px] flex gap-7">
        <a href="#" className="hover:text-rk-text">
          Contact us
        </a>
        <a href="#" className="hover:text-rk-text">
          Cookie settings
        </a>
      </div>
      <p className="mt-6">© 2026 {brand.legalName}. All rights reserved.</p>
    </footer>
    </>
  );
}
