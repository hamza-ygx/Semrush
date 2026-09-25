"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { HeaderLink, SendFeedback } from "@/components/shell/PageHeader";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { Modal } from "@/components/ui/Modal";
import { CheckIcon, ChevronRight, DesktopIcon, ExportIcon, GearIcon, PlusIcon, ShareIcon } from "@/components/ui/icons";
import { Checkbox, Toggle } from "./controls";
import { BellIcon, ChevronBold, DiamondIcon, HotelIcon, JobIcon, LookerIcon, ManualIcon, PinIcon } from "./icons";
import { project, trackingTabs, type TrackingTab } from "./data";
import { useTracking } from "./context";
import { Tip, useScrollLock } from "./Tip";
import { Radio } from "./FilterPanels";
import { Info } from "./ui";

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
  if (kind === "export") return <ExportMenu />;
  return (
    <button type="button" className={btn}>
      <ShareIcon />
      Share
    </button>
  );
}

function ExportMenu() {
  const [type, setType] = useState(0);
  const item = "flex h-8 w-full items-center px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg";
  return (
    <Popover
      align="right"
      offset={5}
      className="[&>div:last-child]:right-[2px]"
      panelClassName="w-[126px] !pt-[4px] !pb-[5px]"
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} data-testid="pt-export" className={`${btn} ${open ? "!bg-rk-hover" : ""}`}>
          <ExportIcon />
          Export
        </button>
      )}
    >
      {(close) => (
        <>
          {["Standard", "Extended"].map((t, i) => (
            <button key={t} type="button" onClick={() => setType(i)} className="flex h-[31px] w-full items-center gap-[6px] px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg">
              <Radio on={type === i} />
              {t}
              <Info className="-mt-[6px] ml-[4px]" />
            </button>
          ))}
          <div className="my-[5px] border-t border-rk-border" />
          {["Excel", "CSV", "CSV Semicolon", "Google Sheets"].map((t) => (
            <button key={t} type="button" onClick={close} className={item}>
              {t}
            </button>
          ))}
          <div className="mt-[5px] border-t border-rk-border" />
          <button type="button" onClick={close} className="mt-[8px] block px-2 text-[12px] leading-4 text-rk-link hover:text-rk-link-hover">
            Schedule export
          </button>
        </>
      )}
    </Popover>
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
      offset={4}
      className="-ml-px"
      panelClassName="w-[228px] !pt-[11px] !pb-[9px]"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          data-testid="pt-target"
          className="ml-px flex items-center gap-[5px] text-rk-link hover:text-rk-link-hover [&:hover>span]:underline [&:hover>span]:underline-offset-[3px]"
        >
          <DesktopIcon width={16} height={16} />
          <span>Sweden (Google) • Swedish</span>
          <ChevronBold width={17} height={17} className="-ml-[2px]" />
        </button>
      )}
    >
      {(close) => (
        <div className="text-[14px] leading-5">
          <div className="px-[10px] font-semibold text-rk-text">Targets (1/10)</div>
          <button type="button" onClick={close} className="mt-[6px] flex h-[31px] w-full items-center gap-[5px] border-l-2 border-[#484a54] bg-[#ebf0ff] pl-[8px] text-rk-text">
            <DesktopIcon width={16} height={16} />
            Sweden (Google) • Swedish
          </button>
          <div className="mt-[5px] border-t border-rk-border" />
          <div className="mt-[9px] px-[10px] font-semibold text-rk-text">Actions with targets</div>
          <Link href={routes.positionTracking} className="mt-[11px] block px-[10px] text-rk-link hover:text-rk-link-hover">
            Move to project...
          </Link>
          <Link
            href={routes.tracking.devicesLocations}
            className="mx-[10px] mt-5 flex h-7 items-center justify-center gap-[10px] rounded-md bg-[#03a979] font-semibold text-white hover:bg-[#008c65]"
          >
            <PlusIcon width={14} height={14} strokeWidth={2} />
            Add new target
          </Link>
        </div>
      )}
    </Popover>
  );
}

const serpFeatureList = [
  { label: "Local pack", Icon: PinIcon },
  { label: "Hotels", Icon: HotelIcon },
  { label: "AI Overview", Icon: DiamondIcon },
  { label: "Jobs", Icon: JobIcon },
];

function SerpFeatures() {
  const [on, setOn] = useState(serpFeatureList.map(() => true));
  const names = serpFeatureList.filter((_, i) => on[i]).map((f) => f.label);
  return (
    <span className="flex items-center gap-[4px] text-rk-text">
      SERP features
      <Popover
        offset={7}
        className="-ml-[3px]"
        panelClassName="w-[138px] !pt-[3px] !pb-[1px] left-[3px]"
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} data-testid="pt-serp" className="flex items-center">
            <Tip tip={names.length ? names.join(", ") : "No SERP features"} gap={11} style={{ marginLeft: 12 }} boxClassName="w-[248px] !py-[11px]">
              <span data-testid="pt-serp-icons" className="flex items-center gap-[3px] text-[#2d6bf0]">
                {serpFeatureList.map(({ label, Icon }) => (
                  <Icon key={label} width={17} height={17} />
                ))}
              </span>
            </Tip>
            <ChevronBold width={16} height={16} className="ml-[5px] text-rk-link" />
          </button>
        )}
      >
        {serpFeatureList.map(({ label, Icon }, i) => (
          <label key={label} className={`flex h-8 cursor-pointer items-center border-l-2 pl-[5px] text-[14px] text-rk-text ${on[i] ? "border-[#484a54] bg-[#ebf0ff]" : "border-transparent hover:bg-rk-bg"}`}>
            <input type="checkbox" className="sr-only" checked={on[i]} onChange={() => setOn(on.map((v, j) => (j === i ? !v : v)))} />
            <span className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${on[i] ? "border-rk-text bg-rk-text" : "border-rk-border-strong bg-white"}`}>
              {on[i] && <CheckIcon width={12} height={12} strokeWidth={2.4} className="text-white" />}
            </span>
            <Icon width={16} height={16} className="mr-[4px] ml-2" />
            {label}
          </label>
        ))}
      </Popover>
    </span>
  );
}

function AlertsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useScrollLock(open);
  return (
    <Modal open={open} onClose={onClose} width={540} className="!pt-[37px]">
      <AlertBell />
      <h2 className="text-[24px] leading-8 font-semibold text-rk-text">Set up in-app alerts and emails</h2>
      <p className="mt-[15px] text-[14px] leading-5 text-rk-text">Notify me when positions for any keyword for</p>
      <button type="button" className="flex items-center gap-[5px] text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
        {project.domain}
        <ChevronBold width={14} height={14} />
      </button>
      <div className="mt-[17px] flex gap-2">
        <button type="button" className="flex h-7 w-[218px] items-center justify-between rounded-md border border-rk-border-strong bg-white pr-[7px] pl-2 text-[14px] text-rk-text">
          Enter the top
          <ChevronBold width={16} height={16} />
        </button>
        <input defaultValue="10" className="h-7 w-[80px] rounded-md border border-rk-border-strong px-2 text-[14px] text-rk-text outline-none focus:border-[#8e92ec]" />
      </div>
      <div className="mt-[72px] flex gap-2">
        <button type="button" onClick={onClose} className="h-10 rounded-md bg-[#03a979] px-3 text-[16px] font-semibold text-white hover:bg-[#008c65]">
          Set up alert
        </button>
        <button type="button" onClick={onClose} className="h-10 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

function AlertBell() {
  return (
    <svg viewBox="0 0 132 124" width={132} height={124} className="absolute top-[88px] right-[40px]">
      <path d="M44 14c14-8 30 6 44 2s28-6 32 8 12 22 10 36-14 16-18 30-14 28-30 22-26-4-38-10S12 76 8 62s6-24 12-32 10-10 24-16z" fill="#b97fff" />
      <g transform="rotate(40 66 60)">
        <path d="M48 34c0-11 8-18 18-18s18 7 18 18v22c0 8 4 12 10 18H38c6-6 10-10 10-18z" fill="#b97fff" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="66" cy="76" rx="30" ry="9" fill="#191b23" stroke="#fff" strokeWidth="3" />
        <path d="M58 86a8 8 0 0 0 16 0" fill="#fff" />
        <circle cx="66" cy="13" r="4" fill="none" stroke="#fff" strokeWidth="3" />
        <path d="M56 32c1-6 4-9 9-10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path d="M20 40c4-4 9-6 14-6M110 96c-3 4-8 7-13 8" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function BellButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" aria-label="Notifications" onClick={() => setOpen(true)} className={`${btn} relative w-[33px] justify-center !px-0`}>
        <BellIcon width={17} height={17} />
        <span className="absolute -top-[4px] -right-[4px] h-[11px] w-[11px] rounded-full bg-[#ff7a0f]" />
      </button>
      <AlertsModal open={open} onClose={() => setOpen(false)} />
    </>
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
  const { fresh, latest } = useTracking();
  return (
    <div className="border-b border-rk-border px-8 pt-4">
      <div className="flex items-center justify-between">
        <TrackingCrumbs />
        <div className="flex items-center gap-5">
          <HeaderLink icon={<ManualIcon />}>User manual</HeaderLink>
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
          <BellButton />
          <SettingsMenu />
        </div>
      </div>
      <div className="mt-[7px] flex items-center gap-[24px] text-[14px] leading-5">
        <TargetDropdown />
        <span>Updated: {fresh ? "0 hours ago" : latest ? "2 hours ago" : "17 hours ago"}</span>
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
