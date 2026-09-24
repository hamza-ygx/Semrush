"use client";

import { useState } from "react";
import { routes } from "@/config/routes";
import { HeaderLink, SendFeedback, PageHeader } from "@/components/shell/PageHeader";
import { Tabs } from "@/components/ui/primitives";
import { LinkSelect, MenuItem, Popover } from "@/components/ui/Popover";
import { DesktopIcon, ExportIcon, FlagSE, FlagUK, FlagUS, MobileIcon } from "@/components/ui/icons";
import { databases, domain, moreDatabases } from "./data";
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

const flags = { se: FlagSE, us: FlagUS, uk: FlagUK };

function UserManualIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="M1.5 3h4.3c1 0 1.7.7 2.2 1.5.5-.8 1.2-1.5 2.2-1.5h4.3v10H10c-.9 0-1.6.4-2 1-.4-.6-1.1-1-2-1H1.5z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M8 4.5V14M3.8 6h2M3.8 8.5h2M10.2 6h2M10.2 8.5h2" stroke="currentColor" strokeWidth={1.3} />
    </svg>
  );
}

function DbSwitcher() {
  const [db, setDb] = useState("SE");
  return (
    <div className="flex h-7 items-stretch rounded-md border border-rk-border-strong bg-white text-[14px]">
      {databases.map((d, i) => {
        const Flag = flags[d.flag];
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
            <Flag />
            <span className="text-rk-text">{d.code}</span>
            <span className="text-rk-muted">{d.count}</span>
          </button>
        );
      })}
      <Popover
        align="left"
        panelClassName="w-[220px]"
        trigger={({ toggle }) => (
          <button type="button" aria-label="More databases" onClick={toggle} className="flex h-full w-8 items-center justify-center rounded-r-md border-l border-rk-border-strong text-rk-text hover:bg-rk-bg">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <circle cx="3" cy="8" r="1.6" fill="currentColor" />
              <circle cx="8" cy="8" r="1.6" fill="currentColor" />
              <circle cx="13" cy="8" r="1.6" fill="currentColor" />
            </svg>
          </button>
        )}
      >
        {(close) =>
          moreDatabases.map((d) => (
            <MenuItem key={d.code} onClick={close} className="justify-between">
              <span>{d.name}</span>
              <span className="text-rk-muted">{d.count}</span>
            </MenuItem>
          ))
        }
      </Popover>
    </div>
  );
}

const devices = ["Desktop", "Mobile"] as const;

export function OrganicHeader({ tab, manual = true, pdf = true, date = true, currency = true }: { tab: OrganicTab; manual?: boolean; pdf?: boolean; date?: boolean; currency?: boolean }) {
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
          {manual && <HeaderLink icon={<UserManualIcon />}>User manual</HeaderLink>}
          <SendFeedback />
        </>
      }
      title={
        <>
          Organic Rankings:
          <span className="-ml-[3px] flex items-center gap-1 text-rk-muted">
            {domain}
            <a href={`https://${domain}`} target="_blank" rel="noreferrer" aria-label="Open rkjh.se" className="text-[#a9abb6] hover:text-rk-link">
              <ExtIcon />
            </a>
          </span>
        </>
      }
      actions={
        pdf ? (
          <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon />
            Export to PDF
          </button>
        ) : undefined
      }
      meta={
        <div className="flex items-center gap-[25px]">
          <DbSwitcher />
          <span className="flex items-center gap-1 text-rk-text-2">
            Device:
            <LinkSelect
              value="Desktop"
              options={devices}
              renderOption={(v) => (
                <span className="flex items-center gap-1">
                  {v === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
                  {v}
                </span>
              )}
            />
          </span>
          {date && (
            <span className="flex items-center gap-1 text-rk-text-2">
              Date:
              <LinkSelect value="Sep 23, 2026" options={["Sep 23, 2026", "Sep 22, 2026", "Sep 21, 2026", "Sep 15, 2026", "Sep 8, 2026", "Aug 15, 2026", "Jul 15, 2026"] as const} />
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
      tabs={<Tabs tabs={tabs} active={tab} />}
      className="bg-rk-bg"
    />
  );
}
