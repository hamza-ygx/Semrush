"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { HeaderLink, SendFeedback } from "@/components/shell/PageHeader";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { BookIcon, ChevronRight, DesktopIcon, ExportIcon, GearIcon, ShareIcon } from "@/components/ui/icons";
import { Checkbox, Toggle } from "./controls";
import { BellIcon, ChevronBold, DiamondIcon, HotelIcon, JobIcon, LookerIcon, PinIcon } from "./icons";
import { project, trackingTabs, type TrackingTab } from "./data";

type Action = "looker" | "pdf" | "export" | "share";

const actionsByTab: Record<TrackingTab, Action[]> = {
  landscape: ["looker", "pdf", "share"],
  overview: ["looker", "pdf", "export", "share"],
  rankingsDistribution: ["looker", "export", "share"],
  tags: ["looker", "pdf", "share"],
  pages: ["looker", "export", "share"],
  cannibalization: ["looker", "share"],
  competitorsDiscovery: ["looker", "pdf", "export", "share"],
  devicesLocations: ["looker", "pdf", "export", "share"],
  featuredSnippets: ["looker", "export", "share"],
};

const btn = "flex h-7 items-center gap-[7px] rounded-md border border-rk-border-strong bg-[#f0f0f3] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover";

function ActionButton({ kind }: { kind: Action }) {
  if (kind === "looker")
    return (
      <button type="button" className={btn}>
        <LookerIcon />
        Looker Studio
      </button>
    );
  if (kind === "pdf")
    return (
      <button type="button" className={`${btn} !px-[7px]`}>
        PDF
      </button>
    );
  if (kind === "export")
    return (
      <button type="button" className={btn}>
        <ExportIcon />
        Export
      </button>
    );
  return (
    <button type="button" className={btn}>
      <ShareIcon />
      Share
    </button>
  );
}

function SettingsMenu() {
  const [type, setType] = useState<"organic" | "ads">("organic");
  const row = "flex h-[32px] w-full items-center px-2 text-[14px] whitespace-nowrap";
  return (
    <Popover
      align="right"
      offset={5}
      panelClassName="w-[231px] !pt-[2px] !pb-[6px]"
      trigger={({ toggle, open }) => (
        <button type="button" aria-label="Settings" data-testid="pt-settings" onClick={toggle} className={`${btn} w-[33px] justify-center !px-0 ${open ? "bg-rk-hover" : ""}`}>
          <GearIcon width={18} height={18} />
        </button>
      )}
    >
      <Link href={routes.positionTracking} className={`${row} !h-[34.5px] pt-[2px] text-rk-text hover:bg-rk-bg`}>
        Tracking {project.domain}
      </Link>
      <Link href={routes.tracking.overview} className={`${row} text-rk-text hover:bg-rk-bg`}>
        Tracked keywords: {project.keywords}
      </Link>
      <button type="button" className={`${row} text-rk-text hover:bg-rk-bg`}>
        Added competitors: 0
      </button>
      <button type="button" className={`${row} text-rk-text hover:bg-rk-bg`}>
        Triggers: 0
      </button>
      <div className={`${row} mt-[3.5px] font-semibold text-rk-text`}>Type</div>
      {(
        [
          ["organic", "Organic"],
          ["ads", "Google Ads"],
        ] as const
      ).map(([k, l]) => (
        <button key={k} type="button" onClick={() => setType(k)} className={`${row} gap-2 text-rk-text hover:bg-rk-bg`}>
          <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border ${type === k ? "border-rk-text bg-rk-text" : "border-rk-border-strong bg-white"}`}>
            {type === k && <span className="h-[8px] w-[8px] rounded-full bg-white" />}
          </span>
          {l}
        </button>
      ))}
      <div className="mt-[8px] mb-[4px] border-t border-rk-border" />
      <div className={`${row} text-rk-text`}>
        <Checkbox checked size={18} label={<span className="text-[14px]">Get weekly updates by email</span>} />
      </div>
      {["Location: Sweden", "Device: Desktop", "Search engine: Google"].map((t) => (
        <div key={t} className={`${row} text-[#a9abb6]`}>
          {t}
        </div>
      ))}
    </Popover>
  );
}

function ProjectDropdown() {
  return (
    <Popover
      offset={6}
      panelClassName="w-[260px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="ml-[10px] flex items-center gap-[6px] text-rk-link hover:text-rk-link-hover">
          {project.domain}
          <ChevronBold width={16} height={16} className="mt-[2px]" />
        </button>
      )}
    >
      <div className="px-2 pt-1 pb-[6px] text-[12px] text-rk-muted">Projects</div>
      <MenuItem href={routes.tracking.landscape} active>
        {project.domain}
      </MenuItem>
      <div className="my-1 border-t border-rk-border" />
      <MenuItem href={routes.positionTracking}>All projects</MenuItem>
    </Popover>
  );
}

function TargetDropdown() {
  return (
    <Popover
      panelClassName="w-[280px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex items-center gap-[5px] text-rk-link hover:text-rk-link-hover">
          <DesktopIcon width={16} height={16} />
          <span>Sweden (Google) • Swedish</span>
          <ChevronBold width={17} height={17} className="-ml-[2px]" />
        </button>
      )}
    >
      {(close) => (
        <>
          <MenuItem active onClick={close}>
            <DesktopIcon /> Sweden (Google) • Swedish
          </MenuItem>
          <div className="my-1 border-t border-rk-border" />
          <MenuItem href={routes.tracking.devicesLocations}>+ Add new target</MenuItem>
        </>
      )}
    </Popover>
  );
}

const serpFeatureList = ["Local pack", "Hotels pack", "Knowledge panel", "Jobs", "Featured snippet", "Image pack", "Video", "People also ask", "Reviews"];

function SerpFeatures() {
  return (
    <Popover
      panelClassName="w-[220px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex items-center gap-[4px] text-rk-text">
          SERP features
          <span className="-ml-[3px] flex items-center gap-[3px] text-[#2d6bf0]">
            <PinIcon width={17} height={17} />
            <HotelIcon width={17} height={17} />
            <DiamondIcon width={17} height={17} />
            <JobIcon width={17} height={17} />
          </span>
          <ChevronBold width={16} height={16} className="ml-[2px] text-rk-link" />
        </button>
      )}
    >
      {serpFeatureList.map((f) => (
        <MenuItem key={f}>{f}</MenuItem>
      ))}
    </Popover>
  );
}

export function TrackingCrumbs() {
  return (
    <nav className="flex items-center gap-[9px] text-[14px] leading-5">
      <Link href={routes.home} className="text-rk-muted hover:text-rk-link">
        Home
      </Link>
      <ChevronRight className="text-rk-muted" width={15} height={15} />
      <Link href={routes.seoDashboard} className="text-rk-muted hover:text-rk-link">
        SEO
      </Link>
      <ChevronRight className="text-rk-muted" width={15} height={15} />
      <Link href={routes.positionTracking} className="text-rk-text hover:text-rk-link">
        Position Tracking
      </Link>
    </nav>
  );
}

export function TrackingHeader({ tab }: { tab: TrackingTab }) {
  return (
    <div className="border-b border-rk-border px-8 pt-4">
      <div className="flex items-center justify-between">
        <TrackingCrumbs />
        <div className="flex items-center gap-6">
          <HeaderLink icon={<BookIcon />}>User manual</HeaderLink>
          <SendFeedback />
        </div>
      </div>
      <div className="mt-[17px] flex items-center justify-between">
        <h1 className="flex items-center text-[20px] leading-7 font-semibold">
          Position Tracking:
          <ProjectDropdown />
        </h1>
        <div className="flex items-center gap-2">
          {actionsByTab[tab].map((a) => (
            <ActionButton key={a} kind={a} />
          ))}
          <button type="button" aria-label="Notifications" className={`${btn} relative w-[33px] justify-center !px-0`}>
            <BellIcon width={17} height={17} />
            <span className="absolute -top-[4px] -right-[4px] h-[11px] w-[11px] rounded-full bg-[#ff7a0f]" />
          </button>
          <SettingsMenu />
        </div>
      </div>
      <div className="mt-[7px] flex items-center gap-[25px] text-[14px] leading-5">
        <TargetDropdown />
        <span>Updated: 17 hours ago</span>
        <span>
          Keywords:{" "}
          <Link href={routes.tracking.overview} className="text-rk-link hover:text-rk-link-hover">
            {project.keywords}
          </Link>
        </span>
        <span>
          Competitors:{" "}
          <button type="button" className="text-rk-link hover:text-rk-link-hover">
            Add
          </button>
        </span>
        <SerpFeatures />
        <span className="flex items-center gap-[10px]">
          Share of Voice
          <Toggle />
        </span>
      </div>
      <div className="mt-[29px] flex gap-[17px]">
        {trackingTabs.map((t) => {
          const on = t.key === tab;
          return (
            <Link key={t.key} href={t.href} className="relative pb-[4px] text-[14px] leading-5 whitespace-nowrap text-rk-text hover:text-rk-link">
              {t.label}
              {on && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-rk-tab" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
