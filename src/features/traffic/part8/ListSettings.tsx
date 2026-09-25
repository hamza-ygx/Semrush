"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { PlusIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { GeoIcon, SmallChevron } from "../icons";
import type { SavedList } from "./lists";
import { SettingsUpsell } from "./Upsell";

type Section = "competitors" | "pages" | "social" | "notifications";

const pill = "inline-flex h-[18px] items-center rounded-full px-[6px] text-[12px] leading-4";

function Nav({ list, section, onPick }: { list: SavedList; section: Section; onPick: (s: Section) => void }) {
  const items: { key: Section; label: ReactNode; sub?: string }[] = [
    {
      key: "competitors",
      label: (
        <>
          Competitors <span className={`${pill} ml-[4px] border border-[#dcdede] bg-white text-rk-muted`}>{list.domains.length}/100</span>
        </>
      ),
    },
    { key: "pages", label: "Page groups" },
    { key: "social", label: "Social media accounts", sub: "Competitor Monitoring" },
    {
      key: "notifications",
      label: (
        <>
          Notifications <span className="ml-[6px] inline-flex h-[14px] items-center rounded-full bg-[#8a8c94] px-[4px] text-[10px] leading-3 font-semibold text-white">Off</span>
        </>
      ),
    },
  ];
  return (
    <nav className="mt-[21px] flex flex-col gap-[4px] px-[28px]">
      {items.map((it) => (
        <button
          key={it.key}
          type="button"
          onClick={() => onPick(it.key)}
          className={`flex min-h-[42px] flex-col justify-center rounded-[6px] px-[13px] py-[9px] text-left ${section === it.key ? "bg-[#e5ebf9]" : "hover:bg-[#eef0f2]"}`}
        >
          <span className="flex items-center text-[16px] leading-6 text-rk-text">{it.label}</span>
          {it.sub && <span className="text-[14px] leading-5 text-rk-muted">{it.sub}</span>}
        </button>
      ))}
    </nav>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="flex h-[38px] items-center gap-[8px] text-[20px] leading-7 font-semibold text-rk-text">{children}</h3>;
}

const row = "flex h-[48px] items-center rounded-[6px] bg-white px-[28px] text-[16px] leading-6 shadow-[0_0_1px_rgba(25,27,35,0.18),0_1px_2px_rgba(25,27,35,0.06)]";

function Competitors({ list }: { list: SavedList }) {
  const [adding, setAdding] = useState(false);
  return (
    <>
      <Heading>
        Competitors <span className="inline-flex h-5 items-center rounded-full bg-[#757afe] px-[6px] text-[12px] leading-4 text-white">{list.domains.length}/100</span>
      </Heading>
      <div className="mt-[14px] flex flex-col gap-[8px]">
        {adding ? (
          <input
            autoFocus
            placeholder="Enter domain, subdomain or subfolder"
            className={`${row} border border-[#8b8fdd] text-rk-text outline-none placeholder:text-[#a0a2ab]`}
            onBlur={() => setAdding(false)}
          />
        ) : (
          <button type="button" onClick={() => setAdding(true)} className={`${row} gap-[9px] text-[#8f9097] hover:text-rk-text`}>
            <PlusIcon width={14} height={14} strokeWidth={2} className="text-rk-muted" />
            Add competitor
          </button>
        )}
        {list.domains.map((d) => (
          <div key={d} className={`${row} text-rk-text`}>
            {d}
          </div>
        ))}
      </div>
    </>
  );
}

const toolkitPro = <b className="font-semibold">Traffic &amp; Market Toolkit Pro</b>;

function PageGroups() {
  const [tab, setTab] = useState<"Custom" | "Auto-detected">("Custom");
  return (
    <>
      <Heading>Page groups</Heading>
      <div className="mt-[13px] flex h-[40px] gap-[16px] border-b border-[#dcdede]">
        {(["Custom", "Auto-detected"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-0 text-[16px] leading-6 text-rk-text ${t === tab ? "border-[#8e92ec]" : "border-transparent hover:border-[#d6d8d7]"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-[16px]">
        <SettingsUpsell
          inline
          lead={
            <>
              {tab === "Custom" ? "Create or edit page groups" : "View auto-detected page groups"} with {toolkitPro}
            </>
          }
        />
      </div>
      <section className="mt-[22px] rounded-[6px] bg-white px-[20px] pt-[18px] pb-[23px] shadow-[0_0_1px_rgba(25,27,35,0.18),0_1px_2px_rgba(25,27,35,0.06)]">
        <h4 className="text-[20px] leading-7 font-semibold text-rk-text">How to use page groups</h4>
        <p className="mt-[16px] text-[16px] leading-6 text-rk-text-2">
          Instead of analyzing an entire domain, the Page Groups dashboard lets you focus on traffic and engagement for the product pages that matter most to you.
        </p>
        <ul className="mt-[5px] flex flex-col pl-[21px] text-[16px] leading-[28px] text-rk-text-2">
          {["Track the performance of specific product lines", "Analyze the impact of content categories", "Measure the results of marketing campaigns"].map((b) => (
            <li key={b} className="relative before:absolute before:top-[12px] before:-left-[12px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-rk-text-2">
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-[8px] text-[16px] leading-6 text-rk-text-2">
          Try this{" "}
          <a href={routes.traffic.pageGroups} className="text-rk-link hover:text-rk-link-hover">
            pre-made example
          </a>{" "}
          to see how the Page Groups dashboard works.
        </p>
        <button type="button" className="mt-[21px] border-b border-dashed border-[#a9abaa] text-[16px] leading-5 text-rk-muted hover:text-rk-text">
          Show more
        </button>
      </section>
    </>
  );
}

const FacebookGlyph = () => (
  <svg viewBox="0 0 20 20" width={20} height={20}>
    <circle cx="10" cy="10" r="9" fill="currentColor" />
    <path d="M11 19v-6.5h2.2l.3-2.5H11V8.6c0-.7.3-1.2 1.3-1.2h1.3V5.2a17 17 0 0 0-1.9-.1c-1.9 0-3.1 1.1-3.1 3.2V10H6.5v2.5h2.1V19Z" fill="#fff" />
  </svg>
);

const InstagramGlyph = () => (
  <svg viewBox="0 0 20 20" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="2.5" y="2.5" width="15" height="15" rx="4" />
    <circle cx="10" cy="10" r="3.3" />
    <circle cx="14.4" cy="5.7" r=".6" fill="currentColor" />
  </svg>
);

function Social({ list }: { list: SavedList }) {
  return (
    <>
      <Heading>Social media accounts</Heading>
      <div className="mt-[13px]">
        <SettingsUpsell lead={<>Add competitor social media accounts with {toolkitPro}</>} />
      </div>
      <div className="mt-[8px] flex flex-col gap-[8px]">
        {list.domains.map((d) => (
          <div key={d} className="rounded-[6px] bg-white shadow-[0_0_1px_rgba(25,27,35,0.18),0_1px_2px_rgba(25,27,35,0.06)]">
            <div className="flex h-[48px] items-center px-[20px] text-[16px] leading-6 font-semibold text-rk-text">{d}</div>
            {[
              ["Facebook", <FacebookGlyph key="f" />],
              ["Instagram", <InstagramGlyph key="i" />],
            ].map(([n, icon]) => (
              <div key={n as string} className="flex h-[48px] items-center gap-[10px] border-t border-[#f0f1f3] px-[18px] text-[16px] leading-6 text-[#c4c6cc]">
                <span className="text-[#d3d5da]">{icon}</span>
                <span className="border-b border-dotted border-[#d3d5da] leading-5">{n}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Notifications() {
  const [on, setOn] = useState(false);
  return (
    <>
      <Heading>Notifications</Heading>
      <div className={`${row} mt-[14px] justify-between px-[20px]`}>
        <span className="text-rk-text">Email me when competitors&apos; traffic changes significantly</span>
        <button type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className={`relative h-5 w-9 rounded-full ${on ? "bg-[#00a47e]" : "bg-[#d6d8d7]"}`}>
          <span className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-[left] ${on ? "left-[18px]" : "left-[2px]"}`} />
        </button>
      </div>
    </>
  );
}

const regions = ["Worldwide", "United States", "United Kingdom", "Germany", "France", "Sweden"];

export function ListSettings({ list, initial = "competitors", onClose }: { list: SavedList; initial?: Section; onClose: () => void }) {
  const [section, setSection] = useState<Section>(initial);
  const [region, setRegion] = useState("Worldwide");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="List settings" data-testid="traffic-list-settings" className="fixed inset-0 z-[120] flex bg-[#f9f9f9]">
      <aside className="w-[292px] shrink-0 border-r border-[#d6d6d6] pt-[38px]">
        <h2 className="pl-[40px] text-[20px] leading-7 font-semibold text-rk-text">{list.name}</h2>
        <Popover
          className="mt-[12px] ml-[40px]"
          panelClassName="min-w-[180px]"
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="flex items-center gap-[4px] text-[16px] leading-6 text-rk-link hover:text-rk-link-hover">
              <GeoIcon />
              {region}
              <SmallChevron width={14} height={14} />
            </button>
          )}
        >
          {(close) =>
            regions.map((r) => (
              <MenuItem
                key={r}
                active={r === region}
                onClick={() => {
                  setRegion(r);
                  close();
                }}
              >
                {r}
              </MenuItem>
            ))
          }
        </Popover>
        <Nav list={list} section={section} onPick={setSection} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="relative flex-1 overflow-y-auto pt-[33px] pr-[40px] pl-[32px]">
          <button type="button" aria-label="Close settings" onClick={onClose} className="absolute top-[18px] right-[19px] flex h-5 w-5 items-center justify-center text-[#7d7d7d] hover:text-rk-text">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="m2 2 12 12M14 2 2 14" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
            </svg>
          </button>
          {section === "competitors" && <Competitors list={list} />}
          {section === "pages" && <PageGroups />}
          {section === "social" && <Social list={list} />}
          {section === "notifications" && <Notifications />}
        </div>
        <footer className="relative flex h-[100px] shrink-0 items-start gap-[12px] border-t border-[#d7d7d7] pt-[19px] pr-[53px] pl-[32px]">
          <button type="button" onClick={onClose} className="h-10 rounded-[6px] bg-rk-btn-dark px-[12px] text-[16px] leading-6 font-semibold text-white hover:bg-black">
            Save changes
          </button>
          <button type="button" onClick={onClose} className="h-10 rounded-[6px] border border-[#d8dad9] bg-[#f0f0f0] px-[12px] text-[16px] leading-6 text-rk-muted hover:bg-[#e6e6e6]">
            Cancel
          </button>
          <button type="button" onClick={onClose} className="ml-auto flex h-10 items-center gap-[8px] text-[16px] leading-6 text-rk-muted hover:text-rk-danger">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.6 9.5h6.8L12 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
            </svg>
            Delete
          </button>
          <button
            type="button"
            aria-label="Help"
            onClick={() => {
              onClose();
              document.querySelector<HTMLButtonElement>("[data-testid='help-toggle']")?.click();
            }}
            className="absolute -top-[63px] right-[21px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-rk-help text-[28px] font-bold text-rk-text shadow-card hover:brightness-95"
          >
            ?
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
