"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type CSSProperties } from "react";
import { routes, tools } from "@/config/routes";
import { useOutsideClose } from "../ui/Popover";
import { ChevronDown, ClockIcon, CloseIcon, SearchIcon } from "../ui/icons";

const recents = [
  { label: "bokföring", href: routes.keywordOverview },
  { label: "www.rkjh.se", href: routes.domainOverview },
  { label: "rkjh.se", href: routes.domainOverview },
];

const recommended = ["Domain Overview", "Keyword Strategy Builder", "Position Tracking"];
const searchFirst = ["Keyword Overview", "Keyword Gap", "Keyword Magic Tool"];
const rank = (n: string) => (searchFirst.includes(n) ? searchFirst.indexOf(n) : searchFirst.length);

function ToolLine({ name, description, href, onClick }: { name: string; description: string; href: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="block truncate px-4 py-[6px] text-[14px] leading-5 hover:bg-rk-bg">
      <span className="text-rk-link">{name}</span>
      <span className="text-rk-muted"> — {description}</span>
    </Link>
  );
}

export function GoToTool({ compact = false, extra = 0 }: { compact?: boolean; extra?: number }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const matches = q ? tools.filter((t) => t.name.toLowerCase().includes(q.toLowerCase())).sort((a, b) => rank(a.name) - rank(b.name)).slice(0, 3) : [];
  const h = "h-[39px] xl:h-8";
  const close = () => {
    setOpen(false);
    setQ("");
  };

  return (
    <div ref={ref} className="relative">
      {open && (
        <div className="absolute -top-[10px] -right-[17px] -left-4 z-40 rounded-b-lg bg-white pt-[62px] pb-[3px] shadow-popover">
          {q ? (
            <>
              <div className="flex items-center justify-between px-4 pt-1 pb-3 text-[14px] leading-5">
                <span className="text-rk-muted">Toolkits and apps</span>
                <Link href={matches[0]?.href ?? routes.seoDashboard} onClick={close} className="text-rk-link hover:text-rk-link-hover">
                  See all results
                </Link>
              </div>
              {matches.map((t) => (
                <ToolLine key={t.name} {...t} onClick={close} />
              ))}
              {matches.length === 0 && <div className="px-4 py-[6px] text-rk-muted">No results found</div>}
            </>
          ) : (
            <div className="-mt-[8px]">
              {recents.map((r) => (
                <Link key={r.label} href={r.href} onClick={close} className="flex items-center gap-2 px-4 py-[6px] text-[14px] leading-5 hover:bg-rk-bg">
                  <ClockIcon className="text-rk-muted" />
                  {r.label}
                </Link>
              ))}
              <div className="mx-4 mt-[6px] mb-[10px] border-t border-rk-border" />
              <div className="px-4 pb-[6px] text-[14px] leading-5 text-rk-muted">Recommendations</div>
              {recommended.map((n) => {
                const t = tools.find((x) => x.name === n)!;
                return <ToolLine key={n} {...t} onClick={close} />;
              })}
            </div>
          )}
        </div>
      )}
      <form
        className="relative z-50 flex"
        onSubmit={(e) => {
          e.preventDefault();
          if (matches[0]) {
            router.push(matches[0].href);
            close();
          }
        }}
      >
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Go to tool..."
            style={compact ? ({ "--gw": `${316 + extra}px` } as CSSProperties) : undefined}
            className={`${h} ${compact ? "w-[var(--gw)] xl:w-[402px]" : "w-[388px] xl:w-[402px]"} rounded-l-md border bg-white pr-8 pl-3 text-[16px] xl:text-[14px] outline-none placeholder:text-rk-muted ${
              open ? "border-[#7a86f2] ring-2 ring-[#b7c0fa]" : "border-rk-border-strong"
            }`}
          />
          {q && (
            <button type="button" aria-label="Clear" onClick={() => setQ("")} className="absolute top-1/2 right-2 -translate-y-1/2 text-rk-text-2">
              <CloseIcon />
            </button>
          )}
        </div>
        <button type="submit" aria-label="Search" className={`${h} w-[41px] xl:w-[34px] flex items-center justify-center rounded-r-md border border-l-0 border-rk-border-strong bg-rk-bg text-rk-text-2 hover:bg-rk-hover`}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}

const scopes = ["Root Domain", "Exact URL", "Subdomain", "Subfolder"] as const;

export function AnalyzeSearch({
  value,
  scope,
  placeholder = "Enter domain, subfolder or URL",
  inputClassName,
  action,
}: {
  value: string;
  scope?: boolean;
  placeholder?: string;
  inputClassName?: string;
  action?: string;
}) {
  const [q, setQ] = useState(value);
  const [sc, setSc] = useState<(typeof scopes)[number]>("Root Domain");
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const [focusW, setFocusW] = useState(0);
  const formRef = useOutsideClose<HTMLFormElement>(focusW > 0, () => setFocusW(0));
  const router = useRouter();
  const path = usePathname();
  const h = "h-10 xl:h-8";
  return (
    <form
      ref={formRef}
      className="relative z-50 flex"
      onSubmit={(e) => {
        e.preventDefault();
        setFocusW(0);
        router.push(action ?? path);
      }}
    >
      {focusW > 0 && (
        <div className="absolute -top-[6px] -right-4 -bottom-[5px] -left-[17px] -z-10 rounded-b-lg bg-white shadow-popover">
          <button type="button" aria-label="Back" onClick={() => setFocusW(0)} className="absolute top-[14px] left-[21px] flex h-6 w-6 items-center justify-center text-rk-text-2 hover:text-rk-text">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M13 8H3m4-4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
      <div className={`relative ${open ? "ml-9 xl:ml-0" : ""}`}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={(e) => !scope && !focusW && setFocusW(e.currentTarget.offsetWidth)}
          style={focusW ? { marginLeft: 35, width: focusW - 35 } : undefined}
          placeholder={placeholder}
          className={`${h} ${inputClassName ?? (scope ? (open ? "w-[161px] xl:w-[345px]" : "w-[197px] xl:w-[345px]") : "w-[463px] xl:w-[480px]")} rounded-l-md border border-rk-border-strong bg-white pr-9 pl-3 text-[16px] outline-none focus:border-[#7a86f2] focus:ring-2 focus:ring-[#b7c0fa] xl:text-[14px]`}
        />
        {q && (
          <button type="button" aria-label="Clear" onClick={() => setQ("")} className="absolute top-1/2 right-3 -translate-y-1/2 text-rk-text-2">
            <CloseIcon />
          </button>
        )}
      </div>
      {scope && (
        <div ref={ref}>
          <button
            type="button"
            aria-label="Search type"
            onClick={() => setOpen((o) => !o)}
            className={`${h} flex w-[144px] items-center justify-between border border-l-0 border-rk-border-strong bg-white px-3 text-[16px] whitespace-nowrap text-rk-text xl:w-[133px] xl:text-[14px]`}
          >
            {sc}
            <ChevronDown className="text-rk-muted" />
          </button>
          {open && (
            <div className="absolute -top-[6px] -right-4 -left-4 -z-10 rounded-b-lg bg-white pt-[58px] pb-1 shadow-popover xl:top-[44px] xl:rounded-t-none xl:pt-0 xl:pb-0">
              <button type="button" aria-label="Back" onClick={() => setOpen(false)} className="absolute top-[14px] left-5 flex h-6 w-6 items-center justify-center text-rk-muted hover:text-rk-text xl:hidden">
                <svg viewBox="0 0 16 16" width={16} height={16}>
                  <path d="M13 8H3m4-4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {scopes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSc(s);
                    setOpen(false);
                  }}
                  className={`flex h-10 w-full items-center justify-between border-l-2 pr-4 pl-[14px] text-left text-[16px] xl:h-8 xl:text-[14px] ${s === sc ? "border-rk-text bg-[#ebf1ff]" : "border-transparent hover:bg-rk-bg"}`}
                >
                  <span className="text-rk-text">{q || value}</span>
                  <span className="text-[#6468b5]">{s}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <button type="submit" className={`${h} rounded-r-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38] xl:px-[8px] xl:text-[14px]`}>
        Analyze
      </button>
    </form>
  );
}
