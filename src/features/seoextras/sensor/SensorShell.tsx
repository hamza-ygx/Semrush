"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { SendFeedback } from "@/components/shell/PageHeader";
import { Modal } from "@/components/ui/Modal";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { DesktopIcon, FlagUK, FlagUS, MobileIcon } from "@/components/ui/icons";
import { NoHelpButton } from "../landing";

export type SensorTab = "overview" | "personal" | "deviations" | "winners";

const tabs: { key: SensorTab; label: string; href: string }[] = [
  { key: "overview", label: "Overview", href: routes.sensor },
  { key: "personal", label: "Personal Score", href: routes.sensorPages.personal },
  { key: "deviations", label: "Deviations", href: routes.sensorPages.deviations },
  { key: "winners", label: "Winners & Losers", href: routes.sensorPages.winners },
];

const BellIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M4 11.5V7a4 4 0 0 1 8 0v4.5l1 1H3zM6.5 14h3" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

function SubscribeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <Modal
      open={open}
      onClose={() => {
        setDone(false);
        onClose();
      }}
      width={480}
      title="Subscribe to notifications"
    >
      {done ? (
        <p className="text-[14px] leading-5 text-rk-text-2">You’re subscribed. We’ll email you when SERP volatility reaches a high level.</p>
      ) : (
        <>
          <p className="text-[14px] leading-5 text-rk-text-2">Get an email when SERP volatility in the selected category reaches a high level.</p>
          <label className="mt-4 flex items-center gap-2 text-[14px]">
            <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#008ff8]" />
            All categories · United States · Desktop
          </label>
          <button type="button" onClick={() => setDone(true)} className="mt-6 h-8 rounded-md bg-[#009f81] px-3 text-[14px] font-medium text-white hover:bg-[#008a70]">
            Subscribe
          </button>
        </>
      )}
    </Modal>
  );
}

export function SensorShell({ tab, children }: { tab: SensorTab; children: ReactNode }) {
  const [sub, setSub] = useState(false);
  return (
    <div>
      <NoHelpButton />
      <div className="border-b border-rk-border px-8 pt-[17px]">
        <div className="flex h-7 items-center justify-between">
          <h1 className="text-[20px] leading-7 font-semibold text-rk-text">{brand.name} Sensor</h1>
          <div className="flex items-center gap-6">
            <SendFeedback />
            <button type="button" onClick={() => setSub(true)} className="flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark pr-[8px] pl-[6px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
              <BellIcon />
              Subscribe to notifications
            </button>
          </div>
        </div>
        <nav className="mt-[25px] flex gap-4">
          {tabs.map((t) => (
            <Link key={t.key} href={t.href} className="relative pb-1 text-[16px] leading-6 whitespace-nowrap text-rk-text hover:text-rk-link">
              {t.label}
              {t.key === tab && <span className="absolute right-0 -bottom-px left-0 h-[3px] rounded-t-sm bg-rk-tab" />}
            </Link>
          ))}
        </nav>
      </div>
      {children}
      <SubscribeModal open={sub} onClose={() => setSub(false)} />
    </div>
  );
}

const countries = [
  { name: "United States", flag: <FlagUS width={16} height={12} /> },
  { name: "United Kingdom", flag: <FlagUK width={16} height={12} /> },
];

export function SensorControls({ extra }: { extra?: ReactNode }) {
  const [country, setCountry] = useState(countries[0]);
  const [device, setDevice] = useState<"Desktop" | "Mobile">("Desktop");
  return (
    <div className="flex h-7 items-center">
      <Popover
        panelClassName="w-[180px]"
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} className="flex h-7 items-center gap-[7px] rounded-md border border-rk-border bg-white pr-[7px] pl-[8px] text-[14px] text-rk-text hover:bg-rk-bg">
            {country.flag}
            {country.name}
            <svg viewBox="0 0 16 16" width={14} height={14}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      >
        {(close) =>
          countries.map((c) => (
            <MenuItem
              key={c.name}
              active={c.name === country.name}
              onClick={() => {
                setCountry(c);
                close();
              }}
            >
              {c.flag}
              {c.name}
            </MenuItem>
          ))
        }
      </Popover>
      <div className="ml-[8px] flex h-7 text-[14px] text-rk-text">
        {(["Desktop", "Mobile"] as const).map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => setDevice(d)}
            className={`flex items-center gap-[7px] border px-[8px] ${i === 0 ? "rounded-l-md" : "-ml-px rounded-r-md"} ${
              device === d ? "z-10 border-[#8f9cea] bg-[#e8eefc]" : "border-rk-border bg-white hover:bg-rk-bg"
            }`}
          >
            {d === "Desktop" ? <DesktopIcon /> : <MobileIcon />}
            {d}
          </button>
        ))}
      </div>
      {extra}
    </div>
  );
}

export function CategoryList({
  items,
  selected,
  onSelect,
  render,
}: {
  items: [string, number][];
  selected: string;
  onSelect: (c: string) => void;
  render: (v: number) => ReactNode;
}) {
  return (
    <div className="w-[260px] shrink-0 self-start rounded-md bg-white p-[4px] shadow-[0_1px_2px_rgba(25,27,35,0.12)]">
      {items.map(([name, v]) => (
        <button
          key={name}
          type="button"
          onClick={() => onSelect(name)}
          className={`flex h-[33px] w-full items-center justify-between rounded-[4px] pr-2 pl-7 text-left text-[14px] text-rk-text ${name === selected ? "bg-[#d5edfd]" : "hover:bg-[#f4f5f9]"}`}
        >
          {name}
          {render(v)}
        </button>
      ))}
    </div>
  );
}

export function SensorCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.12)] ${className}`}>{children}</div>;
}

export function SensorFaq({ items }: { items: string[][] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SensorCard>
      <div className="flex h-[40px] items-center border-b border-rk-border px-5 text-[16px] font-semibold text-rk-text">FAQs for Sensor</div>
      <div className="px-5 pt-[16px] pb-[20px]">
        {items.map(([q, a], i) => (
          <div key={q}>
            <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex h-8 w-full items-center gap-[17px] text-left text-[16px] font-semibold text-rk-text hover:text-rk-link">
              <svg viewBox="0 0 16 16" width={14} height={14} className={`mt-[3px] ml-[1px] shrink-0 text-rk-text-2 ${open === i ? "rotate-90" : ""}`}>
                <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {q}
            </button>
            {open === i && <p className="pb-2 pl-8 text-[14px] leading-5 text-rk-text-2">{a}</p>}
          </div>
        ))}
        <p className="mt-[20px] text-[16px] leading-6 text-rk-text">
          For more information, see{" "}
          <button type="button" className="text-rk-link hover:text-rk-link-hover">
            User manual
          </button>
        </p>
      </div>
    </SensorCard>
  );
}
