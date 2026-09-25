"use client";

import { useState } from "react";
import { Info } from "@/components/ui/primitives";
import { categoryRows, graphDomains, suspicionSignals } from "./data";
import { GraphSvg } from "./Graph";
import { AsSelect, Card, ExportBtn, ExtLink, SelectBtn, SortIcon, ext } from "./ui";

const HelpCircle = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M6.2 6.3a1.9 1.9 0 1 1 2.5 1.8c-.5.2-.7.5-.7 1v.4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <circle cx="8" cy="11.4" r=".9" fill="currentColor" />
  </svg>
);

const zoomBtn = "flex h-7 w-7 items-center justify-center rounded-md border border-[#c4c7cf] bg-white text-rk-text-2 hover:bg-rk-bg";

const ZoomIn = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="7" cy="7" r="4.8" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="m10.5 10.5 3 3M5 7h4M7 5v4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);
const ZoomOut = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="7" cy="7" r="4.8" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="m10.5 10.5 3 3M5 7h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);
const Center = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeDasharray="1.5 1.5" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);
const Expand = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M9.5 3h3.5v3.5M13 3 9 7M6.5 13H3V9.5M3 13l4-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function NetworkGraphReport() {
  const [zoom, setZoom] = useState(1);
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Card className="h-[257px] overflow-hidden">
          <div className="h-[68px] border-b-[1.5px] border-[#e8b35a] bg-[#fff4d5] px-5 pt-[7px]">
            <div className="text-[16px] leading-6 font-bold text-[#b05f00]">Suspicious</div>
            <div className="mt-[2px] text-[14px] leading-5 text-rk-text">Backlink from this domain may harm your backlink profile.</div>
          </div>
          <ul className="px-5 pt-[10px]">
            {suspicionSignals.map((s) => (
              <li key={s.label} className="flex h-[31.7px] items-center gap-[12px] text-[14px] text-rk-text">
                <span className={`ml-[1px] h-[8px] w-[8px] rounded-full ${s.ok ? "bg-[#009f81]" : "bg-[#e5283a]"}`} />
                <span className="flex items-center gap-[8px]">
                  {s.label}
                  <Info />
                </span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="h-[257px]">
          <header className="flex h-[39px] items-center gap-[8px] border-b border-[#ecedf0] px-5">
            <h2 className="text-[16px] leading-6 font-bold">Top Categories</h2>
            <Info />
          </header>
          <table className="w-full text-[14px]">
            <thead>
              <tr className="h-[31px] border-b border-[#e1e3e5] text-[12px]">
                <th className="pl-5 text-left font-normal">Category</th>
                <th className="pr-5 text-right font-normal" colSpan={2}>
                  Referring Domains
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryRows.map((c) => (
                <tr key={c.label} className="h-[37px] border-b border-[#eeeff1] last:border-0">
                  <td className="pl-5">{c.label}</td>
                  <td className="w-[88px]">
                    <div className="h-[8px] rounded-[2px] bg-[#f0f0f2]">
                      <div className="h-full rounded-[2px] bg-[#6167e6]" style={{ width: `${Math.max(c.w, 4)}%` }} />
                    </div>
                  </td>
                  <td className="w-[81px] pr-5 text-right text-rk-muted">{c.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
      <Card className="mt-4" data-testid="graph-card">
        <header className="flex h-[44px] items-center justify-between border-b border-[#ecedf0] px-5">
          <h2 className="text-[16px] leading-6 font-bold">Network Graph</h2>
          <div className="flex items-center gap-[16px]">
            <button type="button" className="flex items-center gap-[4px] text-[14px] text-rk-link hover:text-rk-link-hover">
              <HelpCircle />
              How it works
            </button>
            <ExportBtn />
          </div>
        </header>
        <div className="flex h-[680px]">
          <div className="relative flex-1 overflow-hidden rounded-bl-lg">
            <div className="absolute inset-0 origin-[320px_300px] transition-transform" style={{ transform: `scale(${zoom})` }}>
              <GraphSvg x={78} y={49} label={13} />
            </div>
            <div className="absolute top-[13px] left-5 z-10">
              <SelectBtn label="Category" options={categoryRows.map((c) => c.label)} />
            </div>
            <div className="absolute top-[29px] right-[12px] flex flex-col">
              <button type="button" aria-label="Zoom in" className={zoomBtn} onClick={() => setZoom(Math.min(zoom + 0.25, 3))}>
                <ZoomIn />
              </button>
              <button type="button" aria-label="Zoom out" className={`${zoomBtn} mt-[8px]`} onClick={() => setZoom(Math.max(zoom - 0.25, 0.5))}>
                <ZoomOut />
              </button>
              <button type="button" aria-label="Center" className={`${zoomBtn} mt-[20px]`} onClick={() => setZoom(1)}>
                <Center />
              </button>
              <button type="button" aria-label="Full screen" className={`${zoomBtn} mt-[7px]`}>
                <Expand />
              </button>
            </div>
          </div>
          <div className="flex w-[361px] flex-col border-l border-[#e2e2e2]">
            <div className="flex h-[33px] shrink-0 items-center justify-between border-b border-[#e1e3e5] pr-5 pl-5 text-[12px]">
              Root Domain / Category
              <span className="flex items-center gap-[4px]">
                AS
                <SortIcon className="text-rk-text-2" />
              </span>
            </div>
            <div className="flex-1 overflow-y-auto [scrollbar-color:#c4c7cf_transparent] [scrollbar-width:thin]" data-testid="graph-list">
              {graphDomains.map((d) => (
                <div key={d.d} className="flex h-[64.7px] border-b border-[#eeeff1] pt-[11px] pr-[10px] pl-[22px]">
                  <span className="mt-[4px] h-3 w-3 shrink-0 rounded-full bg-[#c4c4c4]" />
                  <div className="ml-[6px] flex-1">
                    <div className="flex items-center gap-[4px] text-[14px] leading-5">
                      <a href={ext(d.d)} target="_blank" rel="noreferrer" className="text-rk-text hover:text-rk-link">
                        {d.d}
                      </a>
                      <ExtLink href={d.d} />
                    </div>
                    <div className="text-[14px] leading-5 text-rk-text-2">{d.c}</div>
                  </div>
                  <span className="text-[14px] leading-5">
                    <AsSelect value={d.as} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
