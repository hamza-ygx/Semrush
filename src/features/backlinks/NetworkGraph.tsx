"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { SearchIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { routes } from "@/config/routes";
import { asMetrics, categoryAll, categoryRows, graphDomains, nodeInfo, suspicionSignals } from "./data";
import { GraphSvg } from "./Graph";
import { graphNodes } from "./graphData";
import { Card, Chevron, ChevronRightSm, ExportBtn, ExtLink, ItalicInfo, SortIcon, ext } from "./ui";

const HelpCircle = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M6.2 6.3a1.9 1.9 0 1 1 2.5 1.8c-.5.2-.7.5-.7 1v.4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    <circle cx="8" cy="11.4" r=".9" fill="currentColor" />
  </svg>
);

const zoomBtn = "flex h-7 w-7 items-center justify-center rounded-md border border-[#d6d8d7] bg-white text-rk-text-2 hover:bg-rk-bg";

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

const Collapse = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M13 3 9.5 6.5M9.5 3.5v3h3M3 13l3.5-3.5M3.5 9.5h3v3" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseX = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size}>
    <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

function CategorySelect() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [val, setVal] = useState<string | null>(null);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const list = categoryAll.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex h-7 items-center gap-[8px] rounded-md border border-[#d6d8de] bg-white pr-[8px] pl-[8px] text-[14px] whitespace-nowrap ${val ? "text-rk-text" : "text-[#999ba5]"}`}
      >
        {val ?? "Category"}
        <Chevron className="text-rk-text" />
      </button>
      {open && (
        <div className="absolute top-[30px] left-0 z-40 w-[302px] rounded-md bg-white shadow-popover">
          <label className="flex h-[35px] items-center gap-[7px] rounded-md border-2 border-[#8f9cea] px-[8px]">
            <SearchIcon width={16} height={16} className="shrink-0 text-[#8a8d99]" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full bg-transparent text-[14px] text-rk-text outline-none placeholder:text-[#a9abaa]" />
          </label>
          <div className="max-h-[229px] overflow-y-auto py-[4px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d4d5d9]">
            {list.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => {
                  setVal(c.label === val ? null : c.label);
                  setOpen(false);
                }}
                className={`flex h-8 w-full items-center pr-[4px] pl-[10px] text-left text-[14px] leading-5 text-rk-text hover:bg-rk-bg ${c.label === val ? "bg-[#ebf1fe]" : ""}`}
              >
                <span className="flex-1 truncate">{c.label}</span>
                <span className="ml-[8px] text-rk-muted">{c.pct}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const faq = [
  {
    q: "What is Network Graph for?",
    a: "Network Graph visualizes how the domains linking to you are connected with each other. It helps you spot unnatural link patterns, such as groups of sites that only link to each other.",
  },
  {
    q: "What do the green dots mean?",
    a: "Green dots mark signals of a healthy backlink profile: most of your referring domains are categorized and none of them form link farms.",
  },
  {
    q: "What do the red dots mean?",
    a: "Red dots mark signals that may look suspicious to search engines, for example uncategorized domains or no referring domains from your own category.",
  },
  {
    q: "What makes a good backlink profile on Network Graph?",
    a: "A good profile has links from many different, well-categorized domains that are relevant to your niche and are not tightly interlinked with each other.",
  },
];

function HowItWorks({ onClose }: { onClose: () => void }) {
  const [openQ, setOpenQ] = useState<number | null>(null);
  const ref = useOutsideClose<HTMLDivElement>(true, onClose);
  return (
    <div ref={ref} className="fixed top-0 right-0 bottom-0 z-[60] w-[380px] bg-white shadow-[-4px_0_16px_rgba(25,27,35,0.12)]" role="dialog" aria-label="How it works">
      <header className="flex h-[49px] items-center justify-between border-b border-[#e0e2e1] pr-[18px] pl-5">
        <h2 className="text-[16px] leading-6 font-bold text-rk-text">How it works</h2>
        <button type="button" aria-label="Close" onClick={onClose} className="text-rk-text-2 hover:text-rk-text">
          <CloseX size={18} />
        </button>
      </header>
      <div className="px-5 pt-[7px]">
        {faq.map((f, i) => (
          <div key={f.q}>
            <button type="button" onClick={() => setOpenQ(openQ === i ? null : i)} className="flex w-full items-start gap-[8px] py-[12px] text-left text-[14px] leading-5 font-bold text-rk-text">
              <ChevronRightSm className={`mt-[2px] text-rk-text-2 ${openQ === i ? "rotate-90" : ""}`} />
              {f.q}
            </button>
            {openQ === i && <p className="-mt-[4px] pb-[8px] pl-6 text-[14px] leading-5 text-rk-text">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AsBreakdown({ d, as }: { d: string; as: number }) {
  const [open, setOpen] = useState(false);
  const [ring, setRing] = useState(false);
  const ref = useOutsideClose<HTMLSpanElement>(open, () => setOpen(false));
  const m = asMetrics(d, as);
  const rows = [
    { l: "Backlinks", v: m.backlinks },
    { l: "Referring Domains", v: m.refDomains },
    { l: "Monthly Visits", v: m.visits },
    { l: "Organic Traffic", v: m.organic },
    { l: "Outbound Domains", v: m.outbound },
  ];
  return (
    <span ref={ref} className="relative inline-flex">
      <button
        type="button"
        data-testid={`as-${d}`}
        aria-label={`Authority Score ${as}`}
        onClick={() => {
          setRing(open);
          setOpen(!open);
        }}
        onBlur={() => setRing(false)}
        className="group relative inline-flex items-center gap-[4px] text-rk-link outline-none hover:text-rk-link-hover"
      >
        <span className="group-hover:underline">{as}</span>
        <Chevron />
        {ring && !open && <span className="absolute -inset-x-[3px] -inset-y-[3px] rounded-[3px] border-[1.5px] border-[#8f8dd4]" />}
      </button>
      {open && (
        <span className="absolute top-[25px] right-[2px] z-30 block w-[291px] rounded-md bg-white px-4 pt-4 pb-[12px] text-left text-[14px] leading-5 text-rk-text shadow-popover">
          <span className="block whitespace-nowrap">Authority Score is calculated based on:</span>
          <span className="mt-[11px] block">
            {rows.map((r) => (
              <span key={r.l} className="flex h-7 items-center">
                {r.l}
                <ItalicInfo />
                <span className={`ml-auto ${r.v === "n/a" ? "text-rk-muted" : "font-semibold"}`}>{r.v}</span>
              </span>
            ))}
          </span>
        </span>
      )}
    </span>
  );
}

function NodeTip({ i, x, y, onEnter, onLeave }: { i: number; x: number; y: number; onEnter: () => void; onLeave: () => void }) {
  const n = nodeInfo(i);
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute z-20 w-[300px] -translate-y-full rounded-md bg-white pt-[11px] pr-[13px] pb-[12px] pl-[14px] text-[14px] leading-5 shadow-popover"
      style={{ left: x, top: y }}
    >
      <div className="flex items-center">
        <span className="mr-[7px] h-3 w-3 shrink-0 rounded-full bg-[#c4c4c4]" />
        <a href={ext(n.d)} target="_blank" rel="noreferrer" className="text-rk-text hover:text-rk-link">
          {n.d}
        </a>
        <ExtLink href={n.d} className="ml-[4px]" />
        <span className="ml-auto text-rk-text-2">AS: {n.as}</span>
      </div>
      <div className="pl-[19px] text-rk-text-2">{n.c}</div>
      <Link href={routes.referringDomains} className="mt-[12px] ml-[19px] inline-block border-b border-dashed border-[#8a8d99] leading-[19px] text-rk-text-2 hover:text-rk-text">
        View details
      </Link>
    </div>
  );
}

function GraphPane({ full, onToggleFull }: { full?: boolean; onToggleFull: () => void }) {
  const [zoom, setZoom] = useState(1);
  const [hover, setHover] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const gx = full ? 110 : 78;
  const gy = full ? 143 : 49;
  const ox = full ? 352 : 320;
  const oy = full ? 395 : 300;
  const hoverNode = (i: number | null) => {
    if (timer.current) clearTimeout(timer.current);
    if (i === null) timer.current = setTimeout(() => setHover(null), 250);
    else setHover(i);
  };
  const tip = hover === null ? null : { x: ox + (gx + graphNodes[hover][0] - ox) * zoom, y: oy + (gy + graphNodes[hover][1] - oy) * zoom, r: graphNodes[hover][2] * zoom };
  return (
    <div className={`relative overflow-hidden ${full ? "flex-1" : "flex-1 rounded-bl-lg"}`}>
      <div className="absolute inset-0 transition-transform" style={{ transform: `scale(${zoom})`, transformOrigin: `${ox}px ${oy}px` }}>
        <GraphSvg x={gx} y={gy} label={13} hover={hover} onHover={hoverNode} />
      </div>
      {tip && hover !== null && (
        <NodeTip
          i={hover}
          x={tip.x + 7}
          y={tip.y - 8}
          onEnter={() => timer.current && clearTimeout(timer.current)}
          onLeave={() => hoverNode(null)}
        />
      )}
      {!full && (
        <div className="absolute top-[13px] left-5 z-10">
          <CategorySelect />
        </div>
      )}
      <div className={`absolute right-[12px] flex flex-col ${full ? "top-1/2 -translate-y-1/2" : "top-[29px]"}`}>
        <button type="button" aria-label="Zoom in" className={zoomBtn} onClick={() => setZoom(Math.min(zoom + 0.25, 3))}>
          <ZoomIn />
        </button>
        <button type="button" aria-label="Zoom out" className={`${zoomBtn} mt-[8px]`} onClick={() => setZoom(Math.max(zoom - 0.25, 0.5))}>
          <ZoomOut />
        </button>
        <button type="button" aria-label="Center" className={`${zoomBtn} mt-[20px]`} onClick={() => setZoom(1)}>
          <Center />
        </button>
        <button type="button" aria-label={full ? "Exit full screen" : "Full screen"} className={`${zoomBtn} ${full ? "mt-[8px]" : "mt-[7px]"}`} onClick={onToggleFull}>
          {full ? <Collapse /> : <Expand />}
        </button>
      </div>
    </div>
  );
}

function FullScreen({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-white" role="dialog" aria-label="Network Graph">
      <header className="flex h-[77px] shrink-0 items-center justify-between border-b border-[#cbcbcb] pr-[36px] pl-8">
        <h2 className="text-[24px] leading-8 font-bold text-rk-text">Network Graph</h2>
        <button type="button" aria-label="Close full screen" onClick={onClose} className="text-[#a9abaa] hover:text-rk-text">
          <CloseX />
        </button>
      </header>
      <GraphPane full onToggleFull={onClose} />
    </div>
  );
}

export function NetworkGraphReport() {
  const [how, setHow] = useState(false);
  const [full, setFull] = useState(false);
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
            <button type="button" onClick={() => setHow(true)} className="flex items-center gap-[4px] text-[14px] text-rk-link hover:text-rk-link-hover">
              <HelpCircle />
              How it works
            </button>
            <ExportBtn />
          </div>
        </header>
        <div className="flex h-[680px]">
          <GraphPane onToggleFull={() => setFull(true)} />
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
                <div key={d.d} className="flex h-[64.7px] border-b border-[#eeeff1] pt-[11px] pr-[10px] pl-[22px] hover:bg-[#f9f9f9]">
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
                    <AsBreakdown d={d.d} as={d.as} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      {how && <HowItWorks onClose={() => setHow(false)} />}
      {full && <FullScreen onClose={() => setFull(false)} />}
    </>
  );
}
