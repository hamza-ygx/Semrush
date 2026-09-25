"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/config/routes";
import { PlusIcon, RefreshIcon, SearchIcon, WarningIcon } from "@/components/ui/icons";
import { auditSettings, projectColumns, projectRow } from "./data";
import { Checkbox, CogIcon, PageSize, SortAscIcon, SparkleIcon, thinScroll, useToggle, XIcon } from "./ui";

const TRACK = 851;
const THUMB = 481;
const CONTENT = projectColumns.reduce((a, c) => a + c.w, 0) + 7;

function Thumb({ left, top, onDrag }: { left: number; top: number; onDrag: (dx: number) => void }) {
  const start = (e: React.MouseEvent) => {
    e.preventDefault();
    let x = e.clientX;
    const move = (ev: MouseEvent) => {
      onDrag(ev.clientX - x);
      x = ev.clientX;
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };
  return (
    <div style={{ top }} className="pointer-events-none absolute right-[7px] left-0 h-1">
      <div onMouseDown={start} style={{ left, width: THUMB }} className="pointer-events-auto absolute top-0 h-1 cursor-pointer rounded-full bg-[#d3d4d9] hover:bg-[#c4c7cf]" />
    </div>
  );
}

export function AuditSettingsPanel({
  onClose,
  className = "absolute top-[22px] left-0 z-50 w-[294px]",
  roomy = false,
}: {
  onClose?: () => void;
  className?: string;
  roomy?: boolean;
}) {
  const [email, setEmail] = useState(false);
  const [stuck, setStuck] = useState(false);
  const h = roomy ? "h-[32px]" : "h-[31px]";
  const dis = `flex ${h} w-full items-center gap-2 px-2 text-[14px] text-[#a9abb6]`;
  return (
    <div className={`rounded-md bg-white shadow-popover ${className}`}>
      <div className={roomy ? "pt-[2px] pb-[4px]" : "pt-[4px] pb-[5px]"}>
        <button type="button" className={`flex ${h} w-full items-center gap-2 px-2 text-[14px] text-rk-text hover:bg-rk-bg`} onClick={onClose}>
          <RefreshIcon strokeWidth={2} />
          Rerun campaign
        </button>
        <div className={dis}>
          <span className="mx-[2px] h-3 w-3 bg-[#a9abb6]" />
          Stop and save results
        </div>
        <div className={dis}>
          <XIcon size={16} className="text-[#a9abb6]" />
          Cancel crawling
        </div>
      </div>
      <div
        onScroll={(e) => setStuck(e.currentTarget.scrollTop > 0)}
        className={`relative ${roomy ? "h-[240px]" : "h-[236px]"} overflow-y-auto border-t border-rk-border [&::-webkit-scrollbar-track]:mt-[40px] ${thinScroll}`}
        data-settings
      >
        <div className={`sticky top-0 z-10 bg-white px-2 ${roomy ? "pt-[14px] pb-[6px]" : "pt-[13px] pb-[7px]"} text-[14px] font-semibold text-rk-text ${stuck ? "mb-[10px] border-b border-rk-border" : ""}`}>
          Audit settings
        </div>
        {auditSettings.map((s) => (
          <button key={s} type="button" className={`flex ${roomy ? "h-[32px]" : "h-[31.5px]"} w-full items-center px-2 text-left text-[14px] text-rk-text hover:bg-rk-bg`}>
            {s}
          </button>
        ))}
        <div className="mt-[3px] flex gap-2 border-t border-rk-border px-2 pt-[10px] pb-[20px]">
          <Checkbox checked={email} onChange={() => setEmail(!email)} className="mt-[2px]" />
          <span className="text-[14px] leading-5 text-rk-text">Send an email once an audit is complete</span>
        </div>
      </div>
    </div>
  );
}

function GearMenu() {
  const { open, setOpen, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative mt-[5px] inline-flex">
      <button type="button" aria-label="Project settings" onClick={toggle} className="text-[#8a8e9b] hover:text-rk-text-2" data-gear>
        <CogIcon />
      </button>
      {open && <AuditSettingsPanel onClose={() => setOpen(false)} />}
    </div>
  );
}

export function ProjectsList() {
  const ref = useRef<HTMLDivElement>(null);
  const [sl, setSl] = useState(0);
  const [track, setTrack] = useState(TRACK);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTrack(el.clientWidth - 7));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const max = CONTENT - track - 7;
  const thumbLeft = max > 0 ? (sl / max) * (track - THUMB) : 0;
  const drag = (dx: number) => {
    if (ref.current) ref.current.scrollLeft += (dx * max) / (track - THUMB);
  };

  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="flex items-center justify-between px-5 pt-5 pb-[19px]">
        <label className="flex h-7 w-[294px] items-center gap-[6px] rounded-md border border-rk-border-strong px-2 focus-within:border-[#8e92ec]">
          <SearchIcon width={15} height={15} className="text-[#8a8e9b]" />
          <input placeholder="Project name or domain" className="flex-1 text-[14px] outline-none placeholder:text-rk-muted" />
        </label>
        <button type="button" className="flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark pr-2 pl-[10px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          <PlusIcon strokeWidth={2} />
          Create SEO project
        </button>
      </div>

      <div className="flex">
        <div className={`relative z-10 w-[295px] shrink-0 bg-white ${sl > 0 ? "shadow-[3px_0_4px_-2px_rgba(25,27,35,0.18)]" : ""}`}>
          <div className="flex h-[43px] items-center border-b border-rk-border bg-[#f7f7f8] pl-5 text-[13px] text-rk-text-2">Project</div>
          <div className="h-[89px] border-b border-rk-border pt-[11px] pl-5">
            <Link href={routes.siteAuditCampaign.overview} className="block text-[14px] leading-5 font-semibold text-rk-link hover:text-rk-link-hover">
              www.rkjh.se
            </Link>
            <div className="text-[14px] leading-5 text-rk-muted">www.rkjh.se</div>
            <GearMenu />
          </div>
        </div>
        <div className="relative min-w-0 flex-1">
          <div ref={ref} onScroll={(e) => setSl(e.currentTarget.scrollLeft)} className="no-scrollbar overflow-x-auto" data-hscroll>
            <div style={{ width: CONTENT }} className="relative">
              <div className="relative flex h-[43px] border-b border-rk-border bg-[#f7f7f8] text-[13px] text-rk-text-2">
                {projectColumns.map((c) => (
                  <div
                    key={c.key}
                    style={{ width: c.w }}
                    className={`flex shrink-0 items-center gap-1 px-3 whitespace-nowrap ${c.align === "left" ? "" : "justify-end"} ${c.key === "update" ? "bg-[#e9eaee]" : ""}`}
                  >
                    {c.ai && <SparkleIcon className="mr-[2px]" />}
                    {c.label}
                    {c.key === "update" && <SortAscIcon className="text-rk-text-2" />}
                  </div>
                ))}
              </div>
              <div className="relative flex h-[89px] border-b border-rk-border pt-[11px] text-[14px] leading-5">
                {projectColumns.map((c) => (
                  <div key={c.key} style={{ width: c.w }} className={`shrink-0 px-3 whitespace-nowrap ${c.align === "left" ? "" : "text-right"}`}>
                    {c.key === "update" ? (
                      "9w ago"
                    ) : c.key === "crawled" ? (
                      <span className="flex items-center gap-[6px]">
                        <WarningIcon width={17} height={17} />
                        <span>
                          100<span className="text-rk-muted">/100</span>
                        </span>
                      </span>
                    ) : (
                      <>
                        <Link href={routes.siteAuditCampaign.overview} className="text-rk-link hover:text-rk-link-hover">
                          {projectRow[c.key][0]}
                        </Link>
                        <div className="text-rk-muted">{projectRow[c.key][1]}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Thumb left={thumbLeft} top={34} onDrag={drag} />
          <Thumb left={thumbLeft} top={124} onDrag={drag} />
        </div>
      </div>

      <div className="flex h-[63px] items-center gap-2 px-5 pb-[6px] text-[14px]">
        <span>Page:</span>
        <input defaultValue="" placeholder="1" className="h-7 w-[66px] rounded-md border border-rk-border px-2 outline-none placeholder:text-[#a9abb6]" />
        <span className="ml-[2px]">of 1</span>
        <div className="ml-[6px]">
          <PageSize value={10} />
        </div>
      </div>
    </div>
  );
}
