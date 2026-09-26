"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/config/routes";
import { Modal } from "@/components/ui/Modal";
import { DesktopIcon, PlusIcon, SearchIcon } from "@/components/ui/icons";
import { Segmented } from "./controls";
import { SortAscIcon } from "./icons";
import { ProjectsDate } from "./ProjectsDate";
import { periodLabel } from "./context";
import { Info } from "./ui";
import { project } from "./data";
import { dayLabel, fmtPct, rangeLabel, signed, type TrackingLive } from "./live";

export type Target = "all" | "ai" | "seo";

const targets = [
  ["all", "All targets"],
  ["ai", "AI Search"],
  ["seo", "SEO"],
] as const;

const labelOf = (t: Target) => targets.find(([k]) => k === t)![1];

const liveValues = (l: TrackingLive) => [fmtPct(l.vis), signed(l.vis - l.prevVis), String(l.improved), String(l.declined), String(project.keywords)];

const numCols = [
  { label: "Visibility", ai: "Visibility", w: 132.1, value: "0", link: true },
  { label: "Diff", ai: "Diff", w: 72.9, value: "0", link: true },
  {
    label: "Improved keywords",
    ai: "Improved prompts",
    w: 117.1,
    value: "0",
    link: true,
    trunc: true,
  },
  {
    label: "Declined keywords",
    ai: "Declined prompts",
    w: 117.3,
    value: "0",
    link: true,
    trunc: true,
  },
  {
    label: "All keywords",
    ai: "All prompts",
    w: 82,
    value: String(project.keywords),
    trunc: true,
  },
];

const Spinner = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="animate-spin text-[#c4c7c5] [animation-duration:1.1s]">
    <path d="M2.5 9.5A5.8 5.8 0 0 0 13 11.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

function NoProjects() {
  return (
    <svg viewBox="0 0 84 78" width={84} height={78} className="block">
      <path d="M22 6 70 2l12 58-50 16L4 64z" fill="#e7e8f0" />
      <g transform="rotate(-18 42 42)">
        <rect x="8" y="24" width="68" height="40" rx="6" fill="#f4f5f6" stroke="#6a6c6a" strokeWidth="3" />
        <path d="M9.5 30a4.5 4.5 0 0 1 4.5-4.5h56a4.5 4.5 0 0 1 4.5 4.5v4h-65z" fill="#c9cbd2" />
        <circle cx="15" cy="30" r="1.8" fill="#6a6c6a" />
        <circle cx="21" cy="30" r="1.8" fill="#6a6c6a" />
        <path d="M16 46h24M16 52h18M48 50h20" stroke="#d9dbe0" strokeWidth="3" strokeLinecap="round" />
      </g>
      <path d="m44 42 12 20" stroke="#6a6c6a" strokeWidth="7" strokeLinecap="round" />
      <path d="m44 42 12 20" stroke="#c9cbd2" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="38" cy="26" r="15" fill="#eef0f4" stroke="#6a6c6a" strokeWidth="3" />
      <circle cx="38" cy="26" r="10.5" fill="none" stroke="#c9cbd2" strokeWidth="2.2" />
    </svg>
  );
}

function CreateProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const input = "w-full rounded-md border bg-white px-3 text-[16px] text-rk-text outline-none placeholder:text-[#a9abaa]";
  return (
    <Modal open={open} onClose={onClose} width={468} className="!pt-[38px]">
      <h2 className="text-[24px] leading-8 font-semibold text-rk-text">Create SEO project</h2>
      <div className="mt-[21px] flex items-center gap-[4px] text-[16px] leading-6 text-rk-text">
        Domain
        <Info />
      </div>
      <p className="text-[14px] leading-5 text-rk-text-2">Enter a domain or subdomain. Subfolders not supported.</p>
      <input autoFocus placeholder="domain.com" className={`${input} mt-[6px] h-[42px] border-rk-border-strong focus:border-[#8e9ff0] focus:shadow-[0_0_0_1px_#8e9ff0]`} />
      <div className="mt-[23px] flex items-center justify-between text-[16px] leading-6 text-rk-text">
        Name
        <span className="text-rk-muted">(optional)</span>
      </div>
      <input placeholder="Auto-generated if left blank" className={`${input} mt-2 h-10 border-rk-border-strong focus:border-[#8e9ff0]`} />
      <div className="mt-6 flex gap-2">
        <button type="button" onClick={onClose} className="h-10 rounded-md bg-[#03a979] px-3 text-[16px] font-semibold text-white hover:bg-[#008c65]">
          Create SEO project
        </button>
        <button type="button" onClick={onClose} className="h-10 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-3 text-[16px] text-rk-text-2 hover:bg-rk-hover">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export function ProjectsCard({ target: initial, begin, end, hours, live }: { target: Target; begin?: string; end?: string; hours?: number; live?: TrackingLive | null }) {
  const [target, setTarget] = useState<Target>(initial);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const load = () => {
    clearTimeout(timer.current);
    setLoading(true);
    timer.current = setTimeout(() => setLoading(false), 800);
  };

  const pick = (t: Target) => {
    setTarget(t);
    const qs = new URLSearchParams(window.location.search);
    if (t === "all") qs.delete("target");
    else qs.set("target", t);
    const s = qs.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${s ? `?${s}` : ""}`);
    if (t === "ai") setLoading(false);
    else load();
  };

  const q = query.trim().toLowerCase();
  const rows = target !== "ai" && (!q || project.domain.includes(q)) ? [project] : [];
  const ai = target === "ai";
  const values = live ? liveValues(live) : numCols.map((c) => c.value);

  return (
    <section className={`rounded-md border border-[#e5e6e6] bg-white shadow-[0_1px_2px_rgba(25,27,35,0.05)] ${rows.length ? "h-[259px]" : ""}`}>
      <div className="flex h-[68.5px] items-start px-5 pt-[18.5px]">
        <label className="relative flex h-7 w-[299.4px] items-center rounded-md border border-rk-border-strong bg-white">
          <SearchIcon width={16} height={16} className="absolute left-[9px] text-[#8b8d8c]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Project name or domain"
            className="h-full w-full rounded-md pr-2 pl-[32px] text-[14px] outline-none placeholder:text-[#8b8d8c]"
          />
        </label>
        <Segmented key={target} items={targets.map(([, l]) => l)} value={labelOf(target)} onChange={(l) => pick(targets.find(([, x]) => x === l)![0])} className="ml-[24.3px]" />
        <ProjectsDate label={live ? rangeLabel(live.from, live.to, " – ") : periodLabel(begin ?? "", " – ", end)} onPick={load} />
        <button
          type="button"
          onClick={() => setCreating(true)}
          data-testid="pt-create-project"
          className="ml-auto flex h-7 items-center gap-[9px] rounded-md bg-rk-btn-dark px-[8.5px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]"
        >
          <PlusIcon width={14} height={14} strokeWidth={2.2} />
          Create SEO project
        </button>
      </div>
      <div className="flex h-[40px] border-y border-[#edefef] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
        <div className="flex min-w-0 flex-[1_1_206.6px] items-center gap-[6px] bg-[#e9ebeb] pl-5">
          Project <SortAscIcon width={14} height={14} className="text-rk-muted" />
        </div>
        <div className="flex min-w-0 flex-[1_1_217px] items-center pl-[13px]">Device &amp; Location</div>
        {numCols.map((c) => (
          <div key={c.label} style={{ flex: `1 1 ${c.w}px` }} className={`min-w-0 flex items-center justify-end pr-[8px] ${c.trunc ? "pl-[16px]" : ""}`}>
            <span className="truncate">{ai ? c.ai : c.label}</span>
          </div>
        ))}
        <div className="flex min-w-0 flex-[1_1_116px] items-center pl-[17.5px]">Updated</div>
      </div>
      {rows.map((p) => (
        <div key={p.domain} className="flex h-[86px] border-b border-[#edefef] pt-[10.9px] text-[14px] leading-5 text-rk-text">
          <div className="min-w-0 flex-[1_1_206.6px] pl-5">
            <Link href={routes.tracking.landscape} className="font-semibold text-rk-link hover:text-rk-link-hover">
              {p.domain}
            </Link>
            <div className="text-rk-text-2">{p.domain}</div>
          </div>
          <div className="flex min-w-0 flex-[1_1_217px] gap-[5px] pl-[10.5px]">
            <DesktopIcon width={17} height={17} className="mt-[1px] text-rk-text" />
            <div>
              <Link href={routes.tracking.devicesLocations} className="text-rk-link hover:text-rk-link-hover">
                {p.location}
              </Link>
              <div className="text-rk-text-2">Google, Swedish</div>
              <div className="text-rk-text-2">{p.domain}</div>
            </div>
          </div>
          {numCols.map((c, ci) =>
            loading ? (
              <div key={c.label} style={{ flex: `1 1 ${c.w}px` }} className="min-w-0 -mt-[10.9px] flex items-center justify-end pr-[7px]">
                <Spinner />
              </div>
            ) : (
              <div key={c.label} style={{ flex: `1 1 ${c.w}px` }} className="min-w-0 pr-[8px] text-right">
                {c.link ? (
                  <Link href={routes.tracking.overview} className="text-rk-link hover:text-rk-link-hover">
                    {values[ci]}
                  </Link>
                ) : (
                  values[ci]
                )}
              </div>
            ),
          )}
          {loading ? (
            <div className="-mt-[10.9px] flex min-w-0 flex-[1_1_116px] items-center pl-[21px]">
              <Spinner />
            </div>
          ) : (
            <div className="min-w-0 flex-[1_1_116px] pl-[17.5px]">{live ? dayLabel(live.to) : hours !== undefined ? `${hours}h ago` : p.updated}</div>
          )}
        </div>
      ))}
      {!rows.length && (
        <div className="flex flex-col items-center pt-[62px] pb-[76px] text-center text-rk-muted">
          <NoProjects />
          <div className="mt-[14px] text-[16px] leading-6 font-semibold text-[#5c5e5d]">Nothing found</div>
          <p className="mt-[3px] w-[340px] text-[14px] leading-5">Your search «{query}» did not match any projects.Search by the project domain or try another name.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              pick("all");
            }}
            className="mt-[17px] h-7 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover"
          >
            Show all projects
          </button>
        </div>
      )}
      <div className="flex h-[63px] items-center gap-[4px] px-5 pb-[6px] text-[14px] text-rk-text">
        Page:
        <input defaultValue="" placeholder="1" className="h-7 w-[67px] rounded-md border border-rk-border-strong px-[9px] outline-none placeholder:text-[#a9abaa] focus:border-[#006dca]" />
        <span className="ml-[5px]">of 1</span>
      </div>
      <CreateProjectModal open={creating} onClose={() => setCreating(false)} />
    </section>
  );
}
