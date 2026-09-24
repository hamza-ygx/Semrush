"use client";

import Link from "next/link";
import { useState, type ReactNode, type SVGProps } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { DotsIcon, ExportIcon, GlobeIcon, FlagSE, FlagUK, FlagUS, SearchIcon } from "@/components/ui/icons";
import { CountryFlag, allCountries, topCountries } from "./countries";
import type { Intent } from "./data";

export function Seg<T extends string>({
  items,
  value,
  onChange,
  className = "",
  itemClassName = "px-[9px]",
  render,
}: {
  items: readonly T[];
  value: T;
  onChange?: (v: T) => void;
  className?: string;
  itemClassName?: string;
  render?: (v: T) => ReactNode;
}) {
  return (
    <div className={`inline-flex h-7 ${className}`}>
      {items.map((it, i) => {
        const on = it === value;
        return (
          <button
            key={it}
            type="button"
            onClick={() => onChange?.(it)}
            className={`relative -ml-px flex items-center gap-[6px] border text-[14px] leading-5 first:ml-0 ${itemClassName} ${
              i === 0 ? "rounded-l-md" : ""
            } ${i === items.length - 1 ? "rounded-r-md" : ""} ${
              on ? "z-10 border-[#a3a8ea] bg-[#eef2fd] text-rk-text" : "border-[#d9dae0] bg-white text-rk-text hover:bg-rk-bg"
            }`}
          >
            {render ? render(it) : it}
          </button>
        );
      })}
    </div>
  );
}

export function Widget({
  title,
  count,
  right,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: ReactNode;
  count?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`flex flex-col rounded-lg bg-white shadow-card ${className}`}>
      <header className="flex h-[41px] shrink-0 items-center justify-between border-b border-rk-border px-5">
        <h3 className="flex items-center gap-[6px] text-[16px] leading-6 font-bold text-rk-text">
          {title}
          {count != null && <span className="font-normal text-rk-muted">{count}</span>}
        </h3>
        {right}
      </header>
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

export function DarkButton({ children, href, onClick, className = "" }: { children: ReactNode; href?: string; onClick?: () => void; className?: string }) {
  const cls = `inline-flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38] ${className}`;
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function ExportButton({ label = "Export", className = "" }: { label?: string; className?: string }) {
  return (
    <button
      type="button"
      className={`inline-flex h-7 items-center gap-[7px] rounded-md border border-[#d3d5db] bg-[#f7f8f9] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover ${className}`}
    >
      <ExportIcon width={16} height={16} />
      {label}
    </button>
  );
}

export const ExtIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M9 2.5h4.5V7M13.5 2.5 7.5 8.5M11.5 9.5v4h-9v-9h4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ExtLink({ href = "#", className = "" }: { href?: string; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Open in new tab" className={`inline-flex text-[#a9abb6] hover:text-rk-muted ${className}`}>
      <ExtIcon />
    </a>
  );
}

export const SerpIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="2.5" y="2.5" width="11" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <path d="M2.5 6.5h11M5 9.5h6" stroke="currentColor" strokeWidth={1.4} />
  </svg>
);

export const LocalPinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M8 14.5s5-4.2 5-8.2a5 5 0 0 0-10 0c0 4 5 8.2 5 8.2z" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <circle cx="8" cy="6.5" r="1.8" fill="currentColor" />
  </svg>
);

export const SortIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M2 3.5h12M2 7.5h8.5M2 11.5h5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

export const SparkleIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M6 3.5c.4 3 1.6 4.3 4.5 4.8C7.6 8.8 6.4 10 6 13c-.4-3-1.6-4.2-4.5-4.7C4.4 7.8 5.6 6.5 6 3.5z" fill="currentColor" />
    <path d="M12 1c.2 1.4.8 2 2.2 2.2-1.4.3-2 .9-2.2 2.3-.2-1.4-.8-2-2.2-2.3C11.2 3 11.8 2.4 12 1z" fill="currentColor" />
  </svg>
);

const intentTone: Record<Intent, string> = {
  C: "bg-[#ffd98a] text-[#a05a00]",
  I: "bg-[#d6e2fc] text-[#3e5bb8]",
  N: "bg-[#eadbff] text-[#8249c7]",
  T: "bg-[#c8f5e3] text-[#007c65]",
};

export function IntentBadge({ intent }: { intent: Intent }) {
  return <span className={`inline-flex h-5 w-5 items-center justify-center rounded text-[12px] leading-none font-semibold ${intentTone[intent]}`}>{intent}</span>;
}

export function Check({ color, label, checked = true, onToggle }: { color: string; label: ReactNode; checked?: boolean; onToggle?: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="flex items-center gap-[5px] text-[14px] leading-5 text-rk-text">
      <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border" style={{ background: checked ? color : "#fff", borderColor: checked ? color : "#c4c7cf" }}>
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

export function Dot({ color, size = 12 }: { color: string; size?: number }) {
  return <span className="inline-block shrink-0 rounded-full" style={{ background: color, width: size, height: size }} />;
}

const FlagAE = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <path d="M0 0h16v4H0z" fill="#00732f" />
    <path d="M0 4h16v4H0z" fill="#fff" />
    <path d="M0 8h16v4H0z" fill="#191b23" />
    <path d="M0 0h5v12H0z" fill="#e0262b" />
  </svg>
);
const FlagAF = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <path d="M0 0h5.4v12H0z" fill="#191b23" />
    <path d="M5.3 0h5.4v12H5.3z" fill="#be0000" />
    <path d="M10.6 0H16v12h-5.4z" fill="#007a36" />
    <circle cx="8" cy="6" r="1.9" fill="none" stroke="#fff" strokeWidth=".8" />
  </svg>
);
const FlagNO = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <rect width="16" height="12" fill="#ba0c2f" />
    <path d="M4 0h4v12H4zM0 4h16v4H0z" fill="#fff" />
    <path d="M5 0h2v12H5zM0 5h16v2H0z" fill="#00205b" />
  </svg>
);
const FlagIN = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <path d="M0 0h16v4H0z" fill="#ff9933" />
    <path d="M0 4h16v4H0z" fill="#fff" />
    <path d="M0 8h16v4H0z" fill="#138808" />
    <circle cx="8" cy="6" r="1.3" fill="none" stroke="#000080" strokeWidth=".6" />
  </svg>
);
const FlagVN = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <rect width="16" height="12" fill="#da251d" />
    <path d="m8 2.6 1 3h3.1l-2.5 1.8 1 3L8 8.5l-2.6 1.9 1-3L3.9 5.6H7z" fill="#ffcd00" />
  </svg>
);
const FlagNone = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <rect width="16" height="12" fill="#eceef1" />
    <path d="M3 10h10" stroke="#484a54" strokeWidth="1" />
  </svg>
);

const flags: Record<string, (p: SVGProps<SVGSVGElement>) => ReactNode> = {
  SE: FlagSE,
  US: FlagUS,
  UK: FlagUK,
  AE: FlagAE,
  AF: FlagAF,
  NO: FlagNO,
  IN: FlagIN,
  VN: FlagVN,
};

export function Flag({ code, className = "", width = 16, height = 12 }: { code: string | null; className?: string; width?: number; height?: number }) {
  const F = (code && flags[code]) || FlagNone;
  return <F className={`shrink-0 ${className}`} width={width} height={height} />;
}

const blob = "M35 0C44-1 50 4 52 8c12 0 24 6 25 22 4 8 4 20-1 30-6 12-20 17-34 17-16 0-30-5-36-15-6-4-7-14-4-22-1-10 4-22 14-26 8-4 12-12 19-14z";
const front = "M9.5 18.6 62 10.2a3 3 0 0 1 3.4 2.5L73 51.4a2 2 0 0 1-1.6 2.3L21.3 66.3a2 2 0 0 1-2.4-1.6L7.2 22a3 3 0 0 1 2.3-3.4z";

export function TiltedWindow({ children, extra }: { children?: ReactNode; extra?: ReactNode }) {
  return (
    <svg viewBox="-2 -2 84 82" width={84} height={82} className="block">
      <path d={blob} fill="#e4e5ea" />
      <path d={front} transform="translate(-2.6 3.6)" fill="#fff" stroke="#6c6e79" strokeWidth="1.3" strokeLinejoin="round" />
      <path d={front} fill="#fff" stroke="#6c6e79" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9.5 18.6 62 10.2a3 3 0 0 1 3.4 2.5l1.1 6.3-56.3 11.2-3-8.2a3 3 0 0 1 2.3-3.4z" fill="#6c6e79" />
      <circle cx="15.4" cy="24" r="1.8" fill="#fff" />
      <circle cx="21.6" cy="22.6" r="1.8" fill="#fff" />
      {children}
      {extra}
    </svg>
  );
}

function IllustrationTable() {
  return (
    <TiltedWindow>
      <path d="M30.4 30.4 38.3 57.9M48.5 26.4 55.7 53.5M20.2 47.4 65.1 36.4" stroke="#6c6e79" strokeWidth="1.2" />
    </TiltedWindow>
  );
}

function IllustrationChart() {
  return (
    <TiltedWindow>
      <path d="M26 34.5 31.5 58.5 69 50.6" fill="none" stroke="#6c6e79" strokeWidth="1" />
      <circle cx="57" cy="31" r="7.2" fill="#d9dae0" stroke="#6c6e79" strokeWidth="1.5" />
      <circle cx="46" cy="47" r="5.6" fill="#d9dae0" stroke="#6c6e79" strokeWidth="1.5" />
      <path d="m42.6 50.2 6.8-6.6" stroke="#6c6e79" strokeWidth="1.3" />
      <circle cx="31.5" cy="42.5" r="2.1" fill="#6c6e79" />
    </TiltedWindow>
  );
}

function IllustrationSearch() {
  return (
    <TiltedWindow
      extra={
        <>
          <circle cx="44" cy="33" r="10" fill="#eef0f3" fillOpacity=".85" stroke="#6c6e79" strokeWidth="2.2" />
          <path d="m50.5 41 6.5 9.5" stroke="#6c6e79" strokeWidth="3.4" strokeLinecap="round" />
        </>
      }
    >
      <path d="M17 38.5l14-2.8M18.5 44.5l20-4M20 50.5l12-2.4M44 50.5l20-4M45.5 56l12-2.4" stroke="#d3d5db" strokeWidth="2" />
    </TiltedWindow>
  );
}

export function NothingFound({ kind, className = "" }: { kind?: "table" | "chart" | "search"; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {kind === "table" && <IllustrationTable />}
      {kind === "chart" && <IllustrationChart />}
      {kind === "search" && <IllustrationSearch />}
      <div className={`${kind ? "mt-[13px]" : ""} text-[16px] leading-6 font-semibold text-rk-muted`}>Nothing found</div>
      <div className="mt-[2px] text-[14px] leading-5 text-rk-muted">Try changing your filters.</div>
    </div>
  );
}

export const GoogleG = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width={14} height={14} {...p}>
    <circle cx="8" cy="8" r="8" fill="#fff" />
    <path d="M13.6 8.1c0-.4 0-.8-.1-1.2H8v2.3h3.2a2.7 2.7 0 0 1-1.2 1.8v1.5h1.9c1.1-1 1.7-2.5 1.7-4.4z" fill="#4285f4" />
    <path d="M8 13.8c1.6 0 2.9-.5 3.9-1.4L10 10.9c-.5.4-1.2.6-2 .6-1.6 0-2.9-1-3.3-2.5h-2v1.6A5.9 5.9 0 0 0 8 13.8z" fill="#34a853" />
    <path d="M4.7 9a3.5 3.5 0 0 1 0-2.2V5.2h-2a5.9 5.9 0 0 0 0 5.4z" fill="#fbbc04" />
    <path d="M8 4.5c.9 0 1.7.3 2.3.9L12 3.7A5.9 5.9 0 0 0 2.7 5.2l2 1.6C5.1 5.5 6.4 4.5 8 4.5z" fill="#ea4335" />
  </svg>
);

export const WorldIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <path d="M4.2 3.6c1.6.8 2.4 2 2.1 3.3-.3 1.4 1.1 1.8 1 3.3-.1 1.3.4 2.2 1.1 2.9M10.6 2.3c-.7 1.2-.2 2.3 1.1 2.6 1.3.3 1.7 1.4 1.3 2.7M9.8 10c.9.1 2.2.5 3.3 1.4" fill="none" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

export function DatabaseSelector<T extends string>({
  items,
  initial,
}: {
  items: readonly T[];
  initial: T;
  more?: string[];
}) {
  const [value, setValue] = useState<string>(initial);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const extra = !items.includes(value as T);
  const cell = "relative -ml-px flex h-7 items-center gap-2 border px-[8px] text-[14px] leading-5 text-rk-text first:ml-0 first:rounded-l-md";
  const on = "z-10 border-[#a3a8ea] bg-[#eef2fd]";
  const off = "border-[#d9dae0] bg-white hover:bg-rk-bg";
  const match = (c: { name: string }) => c.name.toLowerCase().includes(q.trim().toLowerCase());
  const pick = (code: string) => {
    setValue(code);
    setOpen(false);
    setQ("");
  };
  const row = (c: { code: string; name: string }) => (
    <button
      key={c.code}
      type="button"
      onClick={() => pick(c.code)}
      className={`flex h-8 w-full items-center gap-[6px] border-l-2 pl-[7px] text-left text-[14px] leading-5 text-rk-text ${c.code === value ? "border-rk-text bg-[#eef0fb]" : "border-transparent hover:bg-rk-bg"}`}
    >
      <CountryFlag code={c.code} />
      {c.name}
    </button>
  );
  return (
    <div ref={ref} className="relative inline-flex">
      {items.map((it) => (
        <button key={it} type="button" onClick={() => setValue(it)} className={`${cell} ${it === value ? on : off}`}>
          {it === "Worldwide" ? <GlobeIcon /> : <Flag code={it} width={15} height={11} />}
          {it}
        </button>
      ))}
      {extra && (
        <span className={`${cell} ${on}`}>
          <CountryFlag code={value} />
          {value}
        </span>
      )}
      <span className="relative -ml-px inline-flex">
        <button type="button" aria-label="More databases" onClick={() => setOpen((o) => !o)} className={`${cell} !ml-0 rounded-r-md !px-[7px] ${open ? "bg-rk-hover" : ""} border-[#d9dae0] bg-white hover:bg-rk-bg`}>
          <DotsIcon width={18} height={18} />
        </button>
        {open && (
          <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-[259px] rounded-md bg-white shadow-popover">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-[10px] -translate-y-1/2 text-[#a9abb6]" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by country"
                className="h-[36px] w-full rounded-md border-2 border-[#8f9cea] pr-2 pl-[32px] text-[14px] outline-none placeholder:text-[#a9abb6]"
              />
            </div>
            <div className="mt-[2px] max-h-[284px] overflow-y-auto pb-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c4c7cf]">
              {topCountries.filter(match).map((c) => row({ ...c, code: c.code }))}
              <div className="border-t border-rk-border" />
              {allCountries.filter(match).map(row)}
            </div>
          </div>
        )}
      </span>
    </div>
  );
}

export function HeaderSelect({
  id,
  label,
  icon,
  width,
  children,
}: {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  width: number;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  return (
    <div ref={ref} className="relative inline-flex">
      <button type="button" data-select={id} onClick={() => setOpen((o) => !o)} className="group flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
        {icon}
        <span className="underline-offset-[3px] group-hover:underline">{label}</span>
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ width }} className="absolute top-[calc(100%+6px)] left-0 z-50 rounded-md bg-white py-1 shadow-popover">
          {children(close)}
        </div>
      )}
    </div>
  );
}

export function HeaderOption({ active, onClick, children, className = "" }: { active?: boolean; onClick: () => void; children: ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-8 w-full items-center gap-[6px] border-l-2 pr-2 pl-[6px] text-left text-[14px] leading-5 text-rk-text ${active ? "border-rk-text bg-[#eef0fb]" : "border-transparent hover:bg-rk-bg"} ${className}`}
    >
      {children}
    </button>
  );
}
