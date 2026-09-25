"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { routes } from "@/config/routes";
import { HeaderLink, SendFeedback, PageHeader } from "@/components/shell/PageHeader";
import { Tabs } from "@/components/ui/primitives";
import { LinkSelect } from "@/components/ui/Popover";
import { DesktopIcon, ExportIcon, MobileIcon, SearchIcon } from "@/components/ui/icons";
import { databases, domain, latest } from "./data";
import { CountryFlag, organicCountries } from "./flags";
import { ExtIcon } from "./ui";

export type OrganicTab = "overview" | "positions" | "changes" | "competitors" | "topics" | "subdomains" | "pages";

const q = "?db=se&q=rkjh.se&searchType=domain";

const tabs = [
  { key: "overview", label: "Overview", href: routes.organic.overview + q },
  { key: "positions", label: "Positions", href: routes.organic.positions + q },
  { key: "changes", label: "Position Changes", href: `${routes.organic.changes}?sortField=traffic&${q.slice(1)}` },
  { key: "competitors", label: "Competitors", href: routes.organic.competitors + q },
  { key: "topics", label: "Topics", href: `${routes.organic.topics}${q}&subtopic=redovisningsbyr%C3%A5+halmstad` },
  { key: "subdomains", label: "Subdomains", href: routes.organic.subdomains + q },
];

function UserManualIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="M1 2.5h5.2c.8 0 1.4.4 1.8 1 .4-.6 1-1 1.8-1H15v11H9.8c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9H1z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M8 3.5v10.5M3.5 6H6M3.5 8.5H6M10 6h2.5M10 8.5h2.5" stroke="currentColor" strokeWidth={1.4} />
    </svg>
  );
}

function useOutside(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && close();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

const scroll = "[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d8d7]";

function DbSwitcher({ prev }: { prev?: boolean }) {
  const [db, setDb] = useState("SE");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);
  const ref = useOutside(open, close);
  const extra = databases.some((d) => d.code === db) ? null : organicCountries.find((c) => c.code === db);
  const shown = organicCountries.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <div ref={ref} className="relative flex h-7 items-stretch rounded-md border border-rk-border-strong bg-white text-[14px]">
      {[...databases, ...(extra ? [{ code: extra.code, count: extra.count ?? 0 }] : [])].map((d, i) => {
        const on = d.code === db;
        return (
          <button
            key={d.code}
            type="button"
            onClick={() => setDb(d.code)}
            className={`-my-px flex items-center gap-[7px] border pr-[5px] pl-[9px] ${i === 0 ? "-ml-px rounded-l-md" : "-ml-px"} ${on ? "z-10 border-[#8f9cea] bg-[#e8eefc]" : "border-transparent hover:bg-rk-bg"} ${
              i > 0 && !on ? "border-l-rk-border-strong" : ""
            }`}
          >
            <CountryFlag code={d.code} w={16} h={12} />
            <span className="text-rk-text">{d.code}</span>
            <span className="text-rk-muted">{d.code === "SE" && !prev ? latest.se : d.count}</span>
          </button>
        );
      })}
      <button
        type="button"
        aria-label="More databases"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        className="flex h-full w-8 items-center justify-center rounded-r-md border-l border-rk-border-strong text-rk-text hover:bg-rk-bg"
      >
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <circle cx="3" cy="8" r="1.6" fill="currentColor" />
          <circle cx="8" cy="8" r="1.6" fill="currentColor" />
          <circle cx="13" cy="8" r="1.6" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div data-testid="db-picker" className="absolute top-[calc(100%+5px)] right-[-225px] z-50 w-[260px] rounded-md bg-white shadow-popover">
          <div className="relative">
            <SearchIcon width={16} height={16} className="pointer-events-none absolute top-1/2 left-[10px] -translate-y-1/2 text-[#a9abaa]" />
            <input
              autoFocus
              aria-label="Search database"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-[36px] w-full rounded-md border-2 border-[#8890c3] pr-2 pl-[32px] text-[14px] text-rk-text outline-none"
            />
          </div>
          <div className={`mt-[2px] max-h-[286px] overflow-y-auto ${scroll}`}>
            {shown.map((c, i) => (
              <div key={c.code}>
                {i === 3 && !query && <div className="-mt-px border-t border-rk-border" />}
                <button
                  type="button"
                  onClick={() => {
                    setDb(c.code);
                    close();
                  }}
                  className={`flex h-8 w-full items-center gap-[6px] border-l-2 pl-[7px] text-left text-[14px] leading-5 text-rk-text ${c.code === db ? "border-[#323143] bg-[#ebf1ff]" : "border-transparent hover:bg-rk-bg"}`}
                >
                  <CountryFlag code={c.code} />
                  {c.name}
                  {c.count != null && <span className="text-[#a9abaa]">{c.code === "SE" && !prev ? latest.se : c.count}</span>}
                </button>
              </div>
            ))}
            {!shown.length && <div className="px-3 py-2 text-[14px] text-rk-muted">Nothing found</div>}
          </div>
        </div>
      )}
    </div>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const history = Array.from({ length: 36 }, (_, i) => {
  const m = 7 - i;
  return `${MONTHS[((m % 12) + 12) % 12]} ${2026 + Math.floor(m / 12)}`;
});

function DateSelect({ prev }: { prev?: boolean }) {
  const currentDate = prev ? "Sep 23, 2026" : latest.date;
  const [v, setV] = useState(currentDate);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useOutside(open, close);
  const pick = (d: string) => {
    setV(d);
    close();
  };
  const row = "flex w-full border-l-2 pr-2 pl-[6px] text-left text-[14px] leading-5 whitespace-nowrap text-rk-text";
  return (
    <div ref={ref} className="relative inline-flex">
      <button type="button" data-select="date" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="group flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
        <span className="underline-offset-[3px] group-hover:underline">{v}</span>
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+5px)] left-0 z-50 w-[228px] rounded-md bg-white shadow-popover">
          <button type="button" onClick={() => pick(currentDate)} className={`${row} h-[48px] flex-col justify-center rounded-t-md ${v === currentDate ? "border-[#323143] bg-[#eef2ff]" : "border-transparent hover:bg-rk-bg"}`}>
            <span>{currentDate}</span>
            <span className="text-[12px] leading-4 text-rk-muted">Actual state of Google Search engine</span>
          </button>
          <div className="h-[34px] border-b border-rk-border px-2 pt-[5px] text-[14px] leading-5 font-semibold text-rk-text">Historical Data:</div>
          <div className="relative">
            <div className={`max-h-[246px] overflow-y-auto pt-[2px] pb-1 ${scroll}`}>
              {history.map((h) => (
                <button key={h} type="button" onClick={() => pick(h)} className={`${row} h-8 items-center ${h === v ? "border-[#323143] bg-[#eef2ff]" : "border-transparent hover:bg-rk-bg"}`}>
                  {h}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute right-2 bottom-0 left-0 h-7 rounded-b-md bg-gradient-to-t from-white to-white/0" />
          </div>
        </div>
      )}
    </div>
  );
}

const devices = ["Desktop", "Mobile"] as const;

function DeviceSelect() {
  const [v, setV] = useState<(typeof devices)[number]>("Desktop");
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useOutside(open, close);
  return (
    <div ref={ref} data-select="device" className="relative inline-flex">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="group flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
        {v === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
        <span className="underline-offset-[3px] group-hover:underline">{v}</span>
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-[94px] rounded-md bg-white py-[3px] shadow-popover">
          {devices.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                setV(d);
                close();
              }}
              className={`flex h-8 w-full items-center gap-1 border-l-2 pl-[6px] text-left text-[14px] leading-5 text-rk-text ${d === v ? "border-[#323143] bg-[#eef2ff]" : "border-transparent hover:bg-rk-bg"}`}
            >
              {d === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
              {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrganicHeader({ tab, manual = true, pdf = true, date = true, currency = true, prev = false }: { tab: OrganicTab; manual?: boolean; pdf?: boolean; date?: boolean; currency?: boolean; prev?: boolean }) {
  return (
    <PageHeader
      crumbs={[
        { label: "Home", href: routes.home },
        { label: "SEO", href: routes.seoDashboard },
        { label: "Domain Overview", href: `${routes.domainOverview}${q}` },
        { label: "Organic Rankings" },
      ]}
      links={
        <>
          {manual && (
            <span className="-mr-[7px] flex">
              <HeaderLink icon={<UserManualIcon />}>User manual</HeaderLink>
            </span>
          )}
          <SendFeedback />
        </>
      }
      title={
        <>
          Organic Rankings:
          <span className="-ml-[3px] flex items-center gap-1 text-rk-muted">
            {domain}
            <a href={`https://${domain}`} target="_blank" rel="noreferrer" aria-label="Open rkjh.se" className="text-[#a9abaa] hover:text-rk-link">
              <ExtIcon />
            </a>
          </span>
        </>
      }
      actions={
        pdf ? (
          <button type="button" className="mr-[9px] flex h-7 items-center gap-[7px] rounded-md border border-[#d6d8d8] bg-[#e9ebeb] px-2 text-[14px] text-rk-text-2 hover:bg-[#dfe1e1]">
            <ExportIcon />
            Export to PDF
          </button>
        ) : undefined
      }
      meta={
        <div className="flex items-center gap-[24px]">
          <DbSwitcher prev={prev} />
          <span className="flex items-center gap-1 text-rk-text-2">
            Device:
            <DeviceSelect />
          </span>
          {date && (
            <span className="flex items-center gap-1 text-rk-text-2">
              Date:
              <DateSelect prev={prev} />
            </span>
          )}
          {currency && (
            <span className="flex items-center gap-1 text-rk-text-2">
              Currency:
              <LinkSelect value="USD" options={["USD", "EUR", "SEK", "GBP"] as const} panelClassName="min-w-[100px]" />
            </span>
          )}
        </div>
      }
      tabs={<Tabs tabs={tabs} active={tab} className="[&>a]:tracking-[0.1px]" />}
      className="bg-rk-bg"
    />
  );
}
