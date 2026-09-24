"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type SVGProps } from "react";
import { ChevronDown, ChevronsLeft, ExportIcon, SearchIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";

type P = SVGProps<SVGSVGElement>;

export const ext = (u: string) => (u.startsWith("http") ? u : `https://${u}`);

export const ExtIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M9.5 2.5h4v4M13.3 2.7 8 8M11.5 9.5v3.2c0 .5-.3.8-.8.8H3.3c-.5 0-.8-.3-.8-.8V5.3c0-.5.3-.8.8-.8h3.2" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ExtLink({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a href={ext(href)} target="_blank" rel="noreferrer" aria-label="Open in new tab" className={`inline-flex shrink-0 align-[-3px] text-[#a9abb6] hover:text-rk-link ${className}`}>
      <ExtIcon />
    </a>
  );
}

export const BrokenIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" strokeWidth={1.3} />
    <path d="M3.8 12.2 12.2 3.8M6 9.8l1.2-1.2M8.8 7.2 10 6" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
  </svg>
);

export const SortIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M2.5 4h11M2.5 8h7.5M2.5 12h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const MegaphoneIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M2.5 6.5v3h2l5 3.5v-10l-5 3.5zM4.5 9.5l1 4h2l-1-3.5M12 6a2.5 2.5 0 0 1 0 4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export const Chevron = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="m4.5 6.2 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightSm = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
    <path d="m6.2 4.5 3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Card({ children, className = "", ...rest }: { children: ReactNode; className?: string; "data-testid"?: string }) {
  return (
    <section {...rest} className={`rounded-lg bg-white shadow-card ${className}`}>
      {children}
    </section>
  );
}

export function CardHead({ title, info, count, right, className = "" }: { title: ReactNode; info?: boolean; count?: ReactNode; right?: ReactNode; className?: string }) {
  return (
    <header className={`flex h-[44px] items-center justify-between border-b border-[#ecedf0] px-5 ${className}`}>
      <h2 className="flex items-center gap-[7px] text-[16px] leading-6 font-bold text-rk-text">
        {title}
        {count && <span className="-ml-[1px] font-normal text-[#a9abb6]">{count}</span>}
        {info && <Info className="ml-[2px]" />}
      </h2>
      {right}
    </header>
  );
}

export function ExportBtn({ label = "Export", className = "", menu = true }: { label?: string; className?: string; menu?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => menu && setOpen(!open)}
        className={`inline-flex h-7 items-center gap-[7px] rounded-md border border-[#c4c7cf] px-[8px] text-[14px] text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : "bg-[#f4f5f9]"} ${className}`}
      >
        <ExportIcon width={16} height={16} />
        {label}
      </button>
      {open && (
        <div className="absolute top-[33px] right-0 z-40 w-[83px] rounded-md bg-white py-[4px] shadow-popover">
          {["Excel", "CSV"].map((o) => (
            <button key={o} type="button" onClick={() => setOpen(false)} className="block h-8 w-full px-[8px] text-left text-[14px] text-rk-text hover:bg-rk-bg">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function DarkBtn({ children, href, onClick, className = "" }: { children: ReactNode; href?: string; onClick?: () => void; className?: string }) {
  const cls = `inline-flex h-7 items-center rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38] ${className}`;
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

export type Tone = "gray" | "orange" | "red" | "green" | "404";

const tones: Record<Tone, string> = {
  gray: "bg-[#ededed] text-[#6c6e79]",
  orange: "bg-[#fbdcc6] text-[#c24800]",
  red: "bg-[#ffd0d5] text-[#d1002f]",
  green: "bg-[#c9f5e5] text-[#007c65]",
  "404": "bg-[#fedcc9] text-[#8a3a00]",
};

export function Chip({ children, tone = "gray", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return <span className={`inline-flex h-5 items-center rounded-full px-[8px] text-[13px] leading-5 whitespace-nowrap ${tones[tone]} ${className}`}>{children}</span>;
}

export function Checkbox({ checked, onChange, color, label, className = "" }: { checked?: boolean; onChange?: () => void; color?: string; label?: ReactNode; className?: string }) {
  return (
    <button type="button" role="checkbox" aria-checked={!!checked} onClick={onChange} className={`flex items-center gap-[8px] text-[14px] leading-5 text-rk-text ${className}`}>
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${checked ? "border-transparent" : "border-[#c4c7cf] bg-white"}`}
        style={checked ? { background: color ?? "#2b6ee6" } : undefined}
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

export function SearchBox({ placeholder, width = 260 }: { placeholder: string; width?: number }) {
  const [v, setV] = useState("");
  return (
    <form className="flex" onSubmit={(e) => e.preventDefault()}>
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder={placeholder}
        style={{ width }}
        className="h-7 rounded-l-md border border-[#c4c7cf] bg-white px-[8px] text-[14px] outline-none placeholder:text-[#8a8d99] focus:border-[#7a86f2]"
      />
      <button type="submit" aria-label="Search" className="-ml-px flex h-7 w-[27px] items-center justify-center rounded-r-md border border-[#c4c7cf] bg-white text-rk-text-2 hover:bg-rk-bg">
        <SearchIcon width={16} height={16} />
      </button>
    </form>
  );
}

export function Seg<T extends string>({ options, initial }: { options: readonly T[]; initial?: T }) {
  const [v, setV] = useState<T>(initial ?? options[0]);
  return (
    <div className="inline-flex">
      {options.map((o, i) => {
        const on = o === v;
        return (
          <button
            key={o}
            type="button"
            onClick={() => setV(o)}
            className={`relative h-7 border px-[8px] text-[14px] whitespace-nowrap ${i === 0 ? "rounded-l-md" : "-ml-px"} ${i === options.length - 1 ? "rounded-r-md" : ""} ${
              on ? "z-10 border-[#8f9cea] bg-[#eef2fd] text-rk-text" : "border-[#c4c7cf] bg-white text-rk-text hover:bg-rk-bg"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function SelectBtn({ label, options, width = 200 }: { label: string; options: string[]; width?: number }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState<string | null>(null);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex h-7 items-center gap-[6px] rounded-md border pr-[6px] pl-[8px] text-[14px] whitespace-nowrap ${val ? "text-rk-text" : "text-rk-muted"} ${open ? "border-[#8f9cea] bg-[#eef2fd]" : "border-[#c4c7cf] bg-white hover:bg-rk-bg"}`}
      >
        {val ? `${label}: ${val}` : label}
        <Chevron className={`text-rk-text ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-[32px] left-0 z-40 rounded-md bg-white py-1 shadow-popover" style={{ minWidth: width }}>
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setVal(o === val ? null : o);
                setOpen(false);
              }}
              className={`block w-full px-3 py-[6px] text-left text-[14px] hover:bg-rk-bg ${o === val ? "bg-[#e9f7ff]" : ""}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const filterOptions = ["Links per ref. domain", "Lost issues", "Link placement", "Ref. page platform", "Ref. page language", "Mobile optimization", "Referring domain", "Authority Score", "Country", "Anchor", "Link type", "Target URL", "Zone"];

export function AddFilter({ onPick, options = filterOptions, width = 168 }: { onPick?: (o: string) => void; options?: string[]; width?: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex h-7 items-center gap-[8px] rounded-md px-[9px] text-[14px] font-medium text-rk-link hover:text-rk-link-hover ${open ? "bg-[#e6ecfb]" : ""}`}
      >
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
        Add filter
      </button>
      {open && (
        <div className="absolute top-[33px] left-0 z-40 rounded-md bg-white py-[4px] shadow-popover" style={{ width }}>
          <div className="max-h-[237px] overflow-y-auto [scrollbar-color:#c4c7cf_transparent] [scrollbar-width:thin]">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setOpen(false);
                  onPick?.(o);
                }}
                className="block h-8 w-full px-[8px] text-left text-[14px] whitespace-nowrap text-rk-text hover:bg-rk-bg"
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterSelect({ label, options, defaultOpen = false }: { label: string; options: string[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [val, setVal] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex h-7 w-[142px] items-center justify-between rounded-md border pr-[6px] pl-[8px] text-[14px] whitespace-nowrap ${val ? "text-rk-text" : "text-rk-muted"} ${open ? "border-[#8f9cea] bg-white" : "border-[#c4c7cf] bg-white hover:bg-rk-bg"}`}
      >
        {val ?? label}
        <Chevron className="text-rk-text" />
      </button>
      {open && (
        <div className="absolute top-[33px] left-0 z-40 w-[231px] rounded-md bg-white py-[4px] shadow-popover">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setVal(o);
                setOpen(false);
              }}
              className={`block h-8 w-full px-[8px] text-left text-[14px] text-rk-text hover:bg-rk-bg ${o === val ? "bg-[#e9f7ff]" : ""}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Pager({ pages }: { pages: number }) {
  const [p, setP] = useState(1);
  const go = (n: number) => setP(Math.min(Math.max(1, n), pages));
  const single = pages === 1;
  const dis = "border border-[#e4e5e9] bg-[#f7f7f8] text-[#b9bbc4]";
  return (
    <div className="flex items-center gap-[8px] px-5 pt-[15px] pb-[21px] text-[14px]">
      <button type="button" aria-label="First page" onClick={() => go(1)} disabled={p === 1} className={`flex h-7 w-7 items-center justify-center rounded-md ${p === 1 ? dis : "border border-[#c4c7cf] bg-white text-rk-text-2"}`}>
        <ChevronsLeft width={16} height={16} />
      </button>
      <button type="button" onClick={() => go(p - 1)} disabled={p === 1} className={`h-7 rounded-md px-[7px] ${p === 1 ? dis : "border border-[#c4c7cf] bg-white text-rk-text-2"}`}>
        Prev
      </button>
      <button
        type="button"
        onClick={() => go(p + 1)}
        disabled={p === pages}
        className={`h-7 rounded-md px-[9px] font-semibold text-white ${p === pages ? "bg-[#a9abb6]" : "bg-rk-btn-dark hover:bg-[#2b2e38]"}`}
      >
        Next
      </button>
      <span className="ml-[8px]">Page:</span>
      <input
        value={p}
        disabled={single}
        onChange={(e) => go(+e.target.value || 1)}
        className={`-ml-[2px] h-7 w-[68px] rounded-md border px-[8px] outline-none ${single ? "border-[#e4e5e9] bg-white text-[#b9bbc4]" : "border-[#c4c7cf] text-rk-text"}`}
      />
      <span>
        of{" "}
        {single ? (
          pages
        ) : (
          <button type="button" onClick={() => go(pages)} className="text-rk-link hover:text-rk-link-hover">
            {pages}
          </button>
        )}
      </span>
    </div>
  );
}

export function Th({ children, align = "left", sorted, className = "", style }: { children?: ReactNode; align?: "left" | "right"; sorted?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <th
      style={style}
      className={`sticky top-0 z-10 h-10 border-b border-[#e1e3e5] px-3 text-[12px] leading-4 font-normal text-rk-text ${sorted ? "bg-[#ebecee]" : "bg-[#f9f9f9]"} ${align === "right" ? "text-right" : "text-left"} ${className}`}
    >
      {sorted ? (
        <span className={`inline-flex items-center gap-[4px] ${align === "right" ? "justify-end" : ""}`}>
          {children}
          <SortIcon className="text-rk-text-2" />
        </span>
      ) : (
        children
      )}
    </th>
  );
}

export function AsSelect({ value }: { value: number }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center gap-[2px] text-rk-link hover:text-rk-link-hover">
        {value}
        <Chevron />
      </button>
      {open && (
        <span className="absolute top-6 right-0 z-30 w-[230px] rounded-md bg-white p-4 text-left text-[13px] leading-5 text-rk-text shadow-popover">
          <span className="block font-semibold">Authority Score {value}</span>
          <span className="mt-1 block text-rk-muted">Compound metric based on backlink data, organic search data and website traffic.</span>
        </span>
      )}
    </span>
  );
}

const flagPaths: Record<string, ReactNode> = {
  SG: (
    <>
      <rect width="16" height="6" fill="#ee2536" />
      <rect y="6" width="16" height="6" fill="#fff" />
      <circle cx="3.6" cy="3" r="1.8" fill="#fff" />
      <circle cx="4.3" cy="3" r="1.7" fill="#ee2536" />
    </>
  ),
  US: (
    <>
      <rect width="16" height="12" fill="#fff" />
      {[0, 2, 4, 6, 8, 10].map((y) => (
        <rect key={y} y={y * 0.925} width="16" height="0.92" fill="#b22234" />
      ))}
      <rect width="7" height="6.5" fill="#3c3b6e" />
    </>
  ),
  MD: (
    <>
      <rect width="5.4" height="12" fill="#0046ae" />
      <rect x="5.3" width="5.4" height="12" fill="#ffd200" />
      <rect x="10.6" width="5.4" height="12" fill="#cc092f" />
      <rect x="6.9" y="4.2" width="2.2" height="3.6" fill="#b07e3c" />
    </>
  ),
  SE: (
    <>
      <rect width="16" height="12" fill="#006aa7" />
      <path d="M5 0h2.2v12H5zM0 4.9h16v2.2H0z" fill="#fecc00" />
    </>
  ),
  DK: (
    <>
      <rect width="16" height="12" fill="#c8102e" />
      <path d="M5 0h2v12H5zM0 5h16v2H0z" fill="#fff" />
    </>
  ),
  NO: (
    <>
      <rect width="16" height="12" fill="#ba0c2f" />
      <path d="M4 0h4v12H4zM0 4h16v4H0z" fill="#fff" />
      <path d="M5 0h2v12H5zM0 5h16v2H0z" fill="#00205b" />
    </>
  ),
  DE: (
    <>
      <rect width="16" height="4" fill="#000" />
      <rect y="4" width="16" height="4" fill="#dd0000" />
      <rect y="8" width="16" height="4" fill="#ffce00" />
    </>
  ),
  NL: (
    <>
      <rect width="16" height="4" fill="#ae1c28" />
      <rect y="4" width="16" height="4" fill="#fff" />
      <rect y="8" width="16" height="4" fill="#21468b" />
    </>
  ),
  FR: (
    <>
      <rect width="5.4" height="12" fill="#002395" />
      <rect x="5.3" width="5.4" height="12" fill="#fff" />
      <rect x="10.6" width="5.4" height="12" fill="#ed2939" />
    </>
  ),
  GB: (
    <>
      <rect width="16" height="12" fill="#012169" />
      <path d="M0 0l16 12M16 0 0 12" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 0l16 12M16 0 0 12" stroke="#c8102e" strokeWidth="0.8" />
      <path d="M6.5 0h3v12h-3zM0 4.5h16v3H0z" fill="#fff" />
      <path d="M7.2 0h1.6v12H7.2zM0 5.2h16v1.6H0z" fill="#c8102e" />
    </>
  ),
};

export function Flag({ code, className = "" }: { code?: string; className?: string }) {
  if (!code || !flagPaths[code]) return null;
  return (
    <svg viewBox="0 0 16 12" width={16} height={11} preserveAspectRatio="none" className={`inline-block shrink-0 ${className}`}>
      {flagPaths[code]}
    </svg>
  );
}

export function Dropdown({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" className={`flex items-center gap-1 text-[14px] leading-5 text-rk-text ${className}`}>
      {label}
      <ChevronDown width={14} height={14} />
    </button>
  );
}
