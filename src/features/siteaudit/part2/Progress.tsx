"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { AppShell } from "@/components/shell/AppShell";
import { Popover } from "@/components/ui/Popover";
import { CloseIcon, GearIcon, PlusIcon } from "@/components/ui/icons";
import { SiteAuditHeader } from "../SiteAuditHeader";
import { DateSelect } from "./DateSelect";
import { InfoI } from "./ui";
import { errorsList, noticesList, warningsList } from "./data";
import type { SiteAuditHead } from "../load";

export type ProgressLive = { health: number; time: string; date: string };

const general = ["Pages crawled", "Site Health", "Total issues", "Total errors", "Total warnings", "Total notices"];

const groups = [
  { title: "General:", color: "#ababab", items: general },
  { title: "Errors:", color: "#f87474", items: errorsList },
  { title: "Warnings:", color: "#ec9403", items: warningsList },
  { title: "Notices:", color: "#b6c1f8", items: noticesList },
];

const NoteIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M2.5 2.5h11v8.5H6l-3.5 3z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

const HelpCircle = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#8b8d8c]">
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <path d="M6.2 6.3a1.9 1.9 0 1 1 2.6 1.7c-.5.3-.8.6-.8 1.2v.3" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    <circle cx="8" cy="11.4" r=".8" fill="currentColor" />
  </svg>
);

function Check({ label }: { label: string }) {
  const [on, setOn] = useState(true);
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[14px] leading-5">
      <input type="checkbox" checked={on} onChange={() => setOn(!on)} className="sr-only" />
      <span className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${on ? "border-[#1b1e1a] bg-[#1b1e1a]" : "border-rk-border-strong bg-white"}`}>
        {on && (
          <svg viewBox="0 0 16 16" width={12} height={12}>
            <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

function Chart({ show, health = 82, time = "16:11:34" }: { show: boolean; health?: number; time?: string }) {
  const W = 1128;
  const top = 35;
  const H = 355;
  const left = 30;
  const plotW = 1007;
  const y = (v: number) => top + H - (v / 100) * H;
  const cx = left + plotW / 2;
  return (
    <svg width="100%" height={437} viewBox={`0 0 ${W} 437`} className="block">
      {[0, 20, 40, 60, 80, 100].map((t) => (
        <g key={t}>
          <line x1={left} x2={left + plotW} y1={y(t)} y2={y(t)} stroke={t ? "#f0f0f2" : "#cecece"} />
          <text x={left + plotW + 15} y={y(t) + 4} fontSize={12} fill="#6a6c6a">
            {t}
          </text>
        </g>
      ))}
      <line x1={cx} x2={cx} y1={y(100)} y2={y(0)} stroke="#e0e2e1" strokeDasharray="3 3" />
      {show && <circle cx={cx} cy={y(health)} r={1.5} fill="#1b1e1a" />}
      <text x={cx} y={y(0) + 19} textAnchor="middle" fontSize={12} fill="#6a6c6a">
        {time}
      </text>
      <text transform={`translate(${left + plotW + 48} ${top + H / 2}) rotate(90)`} textAnchor="middle" fontSize={12} fill="#6a6c6a">
        Site Health (%)
      </text>
    </svg>
  );
}

export function Progress({ head, live }: { head?: SiteAuditHead; live?: ProgressLive | null }) {
  const [sel, setSel] = useState<string[]>(["Site Health"]);
  const toggle = (k: string) => setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  const btn = "flex h-[30px] items-center gap-1 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-[9px] text-[14px] hover:bg-rk-hover";
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="progress" looker={false} pdf={false} exportBtn={false} head={head} />
      <div className="px-8 pt-[16px] pb-[147px]">
        <div className="rounded-md bg-white px-5 pt-[16px] pb-[25px] shadow-card">
          <div className="flex items-center">
            <span className="text-[14px] font-semibold tracking-[0.01em] uppercase">Historical chart for audits</span>
            <span className="mr-[9px] ml-[6px] text-[14px] text-rk-muted uppercase">From:</span>
            <DateSelect label={live?.date} />
            <span className="mr-[6px] ml-[9px] text-[14px] text-rk-muted uppercase">To:</span>
            <DateSelect label={live?.date} />
            <InfoI className="ml-2" />
            <div className="ml-auto flex items-center gap-2">
              <span className="mr-[1px] flex items-center gap-[6px] text-[14px]">
                <NoteIcon />
                Notes:
              </span>
              <button type="button" className={`${btn} text-rk-muted`}>
                <PlusIcon width={14} height={14} />
                Add
              </button>
              <button type="button" className={`${btn} text-rk-muted`}>
                View all
              </button>
              <button type="button" aria-label="Show notes" className={`${btn} w-[34px] justify-center px-0 text-rk-text-2`}>
                <EyeIcon />
              </button>
              <Popover
                align="right"
                offset={6}
                panelClassName="min-w-[186px] whitespace-nowrap px-4 pt-[14px] pb-[19px]"
                trigger={({ toggle: t, open }) => (
                  <button type="button" aria-label="Notes settings" onClick={t} className={`${btn} w-[34px] justify-center px-0 text-rk-text-2 ${open ? "bg-rk-hover" : ""}`}>
                    <GearIcon width={18} height={18} />
                  </button>
                )}
              >
                <div className="text-[16px] leading-6 font-semibold">Notes management</div>
                <div className="mt-[17px] space-y-4">
                  <Check label="My notes" />
                  <Check label={brand.name} />
                </div>
              </Popover>
            </div>
          </div>
          <div className="mt-[20px] rounded-md border border-[#ececec] pb-[13px]">
            <Chart show={sel.includes("Site Health")} health={live?.health} time={live?.time} />
            <div className="mt-[3px] flex flex-wrap items-center gap-2 px-5">
              <HelpCircle />
              <span className="text-[14px] text-rk-muted uppercase">Legend:</span>
              {sel.map((k) => (
                <span key={k} className="flex h-[28px] items-center gap-[6px] rounded-full border border-[#c8c7e5] bg-[#e3e2fd] pr-2 pl-[9px] text-[14px] text-[#5a58ad]">
                  <span className="h-3 w-3 rounded-full bg-[#5a5d66]" />
                  {k}
                  <button type="button" aria-label={`Remove ${k}`} onClick={() => toggle(k)} className="ml-1 text-[#5a58ad] hover:text-rk-text">
                    <CloseIcon width={14} height={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[30px] grid grid-cols-4 gap-5">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="text-[20px] leading-7 font-medium">{g.title}</h3>
                <div className="mt-[10px] h-1" style={{ background: g.color }} />
                <div className="mt-[20px] flex flex-wrap gap-x-[9px] gap-y-[5px]">
                  {g.items.map((k) => {
                    const on = sel.includes(k);
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => toggle(k)}
                        className={`flex max-w-[263px] items-center gap-[6px] rounded-[14px] border py-[2px] pr-[16px] pl-[9px] text-left text-[14px] leading-[16.5px] ${
                          on ? "border-[#c8c7e5] bg-[#e3e2fd] text-[#5a58ad]" : "border-rk-border-strong bg-white text-rk-text-2 hover:bg-rk-bg"
                        }`}
                      >
                        <span className={`h-[11px] w-[11px] shrink-0 rounded-full border ${on ? "border-[#5a5d66] bg-[#5a5d66]" : "border-[#737373] border-[1.5px]"}`} />
                        <span className="py-[2.25px]">{k}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
