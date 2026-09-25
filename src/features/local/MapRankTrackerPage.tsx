"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { mapRankBusinesses, mapRankExamples, mapRankFaq } from "./data";
import { MapMini } from "./StartMockups";
import { ChevronR, MagnifierIcon } from "./ui";

function SearchBox({ value, onChange, className = "", onFocus, active }: { value: string; onChange: (v: string) => void; className?: string; onFocus?: () => void; active?: boolean }) {
  const router = useRouter();
  return (
    <form
      className={`relative h-10 w-[480px] ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(routes.local.scan);
      }}
    >
      <MagnifierIcon size={17} sw={2.2} className="absolute top-[11px] left-[15px] text-[#8a8b90]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        aria-label="Company name"
        placeholder="Enter company name (and location if necessary)"
        className={`h-full w-full rounded-[6px] border bg-white pr-3 pl-[44px] text-[16px] text-[#1f1f24] outline-none placeholder:text-[#8a8b90] ${
          active ? "border-[#7f83d4] ring-1 ring-[#7f83d4]" : "border-[#d4d5da] focus:border-[#a35eff]"
        }`}
      />
    </form>
  );
}

const Star = ({ fill }: { fill: boolean }) => (
  <svg viewBox="0 0 16 16" width={17} height={17} className="text-[#9a9ba0]">
    <path d="M8 1.6l1.9 4.1 4.5.5-3.4 3 1 4.4L8 11.3l-3.9 2.3 1-4.4-3.4-3 4.5-.5z" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
  </svg>
);

function BusinessSuggestions({ q }: { q: string }) {
  const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const hits = mapRankBusinesses.filter((b) => words.some((w) => `${b.name} ${b.address}`.toLowerCase().includes(w)));
  return (
    <div className="absolute top-[52px] left-[1px] w-[483px] text-left">
      {hits.map((b) => (
        <Link key={b.name} href={routes.local.scan} className="block h-[81px] rounded-[6px] bg-white pt-[10px] pl-[13px] shadow-[0_1px_4px_rgba(24,27,40,0.12)] hover:bg-[#f7f7fb]">
          <div className="flex items-center gap-[8px] text-[13px] leading-5 font-medium text-[#1f1f24]">
            <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#9a9ba0]">
              <path d="M9.5 2.5h4v4M13.5 2.5 8 8M11.5 9.5v4h-9v-9h4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {b.name}
          </div>
          <div className="text-[13px] leading-5 text-[#6a6c6a]">{b.address}</div>
          <div className="flex items-center gap-[3px] text-[13px] leading-5 text-[#6a6c6a]">
            {b.rating}
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} fill={i < Math.floor(b.rating)} />
            ))}
            <span className="ml-[2px]">({b.reviews})</span>
          </div>
        </Link>
      ))}
      <div className="mt-[9px] h-[86px] rounded-[8px] border border-[#d6dcf5] bg-[#ecf0ff] pt-[18px] pl-[15px] text-[#1f1f24]">
        <div className="flex items-center gap-[8px] text-[16px] leading-6 font-bold">
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#6a6c6a]">
            <path d="M5.8 11.5h4.4M6.3 13.8h3.4M8 1.8a4.4 4.4 0 0 0-2.6 8c.4.3.5.7.5 1.2h4.2c0-.5.1-.9.5-1.2A4.4 4.4 0 0 0 8 1.8z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Can&apos;t find your business?
        </div>
        <p className="mt-[2px] pl-[24px] text-[14px] leading-6 text-[#3a3b40]">Try adding country, state or street name to your search.</p>
      </div>
    </div>
  );
}

const Info = () => <i className="ml-[6px] font-serif text-[14px] text-[#9a9ba0]">i</i>;

const Donut = ({ p, c }: { p: number; c: string }) => (
  <svg viewBox="0 0 20 20" width={21} height={21} className="ml-[5px]">
    <circle cx="10" cy="10" r="7.5" fill="none" stroke="#d9dadd" strokeWidth={3} />
    <circle cx="10" cy="10" r="7.5" fill="none" stroke={c} strokeWidth={3} strokeDasharray={`${p * 47.1} 47.1`} transform="rotate(-90 10 10)" />
  </svg>
);

function Dashboard() {
  const grid = [
    [18, 10, 10, 13, 12, 10, 13],
    [15, 4, 5, 3, 5, 5, 10],
    [12, 3, 1, 1, 2, 4, 12],
    [14, 6, 2, 1, 2, 4, 14],
    [16, 5, 3, 1, 1, 3, 8],
    [19, 9, 5, 2, 3, 7, 10],
    [21, 18, 15, 5, 13, 10, 13],
  ];
  const marks: [number, number, string][] = [
    [0, 0, "new"],
    [3, 0, "down"],
    [0, 1, "up"],
    [0, 2, "up"],
    [5, 4, "up"],
    [6, 4, "up"],
    [2, 5, "up"],
    [0, 6, "lost"],
    [3, 6, "down"],
  ];
  const tone = (v: number) => (v > 20 ? ["#e4e5e5", "#b9bac0"] : v <= 3 ? ["#1fc28e", "#11a070"] : v <= 10 ? ["#fbb62b", "#e39a0b"] : ["#f23d4f", "#cf2436"]);
  const comps = [
    ["Sizzle Slice Pizzeria", "3.5", "(4)", "3.2"],
    ["Crusty Heaven", "3.9", "(470)", "3.4"],
    ["Sereno's Pizza", "4.2", "(4)", "3.0"],
    ["Pizza Palace", "4.6", "(4)", "4.1"],
  ];
  return (
    <div className="mx-auto h-[378px] w-[753px] bg-[#eef0f2] px-[12px] pt-[10px]">
      <div className="flex h-[81px] items-center rounded-[4px] bg-white px-[17px] pt-[3px]">
        {[
          ["Avg. Rank", "2.32", null],
          ["Share of Voice", "26.26%", null],
          ["Good", "65%", [0.65, "#1fc28e"]],
          ["Average", "20%", [0.2, "#fbb62b"]],
          ["Poor", "10%", [0.1, "#ff6fd8"]],
          ["Out of Top 20", "10%", [0.1, "#8a8b90"]],
        ].map(([l, v, d], i) => (
          <div key={l as string} style={{ width: [98, 148, 115, 116, 113, 120][i] }} className={`shrink-0 ${i ? "border-l border-[#e4e5e5] pl-[21px]" : ""}`}>
            <div className="flex items-center text-[13px] text-[#3a3b40]">
              {l as string}
              <Info />
            </div>
            <div className="mt-[2px] flex items-center text-[22px] leading-7 font-semibold text-[#1f1f24]">
              {v as string}
              {d && <Donut p={(d as [number, string])[0]} c={(d as [number, string])[1]} />}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[8px] flex h-[269px] overflow-hidden">
        <div className="w-[285px] shrink-0 bg-white">
          {comps.map(([n, r, c, ar], i) => (
            <div key={n} className={`relative h-[65px] border-b border-[#e4e5e5] pt-[11px] pr-[18px] pl-[17px] ${i === 1 ? "bg-[#e8eefc]" : ""}`}>
              {i === 1 && <span className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#1f1f24]" />}
              <div className="flex justify-between text-[13px] text-[#1f1f24]">
                {n}
                {i === 1 && <span className="rounded-[4px] bg-[#d5f5e3] px-[6px] text-[12px] text-[#0f8a5f]">You</span>}
              </div>
              <div className="mt-[6px] flex items-center justify-between text-[13px] text-[#6a6c6a]">
                <span>
                  {r} <span className="text-[17px] tracking-[1px] text-[#8a8b90]">★★★★☆</span> {c}
                </span>
                <span className="rounded-[4px] bg-[#eeeff1] px-[6px] text-[11px] font-semibold">AR: {ar}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden">
          <MapMini className="absolute inset-0 h-full w-full" />
          {grid.map((row, y) =>
            row.map((v, x) => {
              const [bg, bd] = tone(v);
              return (
                <span
                  key={`${x}-${y}`}
                  className="absolute flex h-[26px] w-[26px] items-center justify-center rounded-full border text-[11px] text-[#1f1f24]"
                  style={{ left: 102 + x * 37.5, top: 11 + y * 37, background: bg, borderColor: bd }}
                >
                  {v > 20 ? "20+" : v}
                </span>
              );
            }),
          )}
          {marks.map(([x, y, k]) =>
            k === "new" || k === "lost" ? (
              <span
                key={`${x}-${y}`}
                className={`absolute flex h-[12px] items-center rounded-full px-[4px] text-[8px] leading-none text-white ${k === "new" ? "bg-[#0f8a5f]" : "bg-[#d1273b]"}`}
                style={{ left: 102 + x * 37.5 + 3, top: 11 + y * 37 - 9 }}
              >
                {k}
              </span>
            ) : (
              <span
                key={`${x}-${y}`}
                className={`absolute flex h-[12px] w-[12px] items-center justify-center rounded-full text-[9px] leading-none font-bold text-white ${k === "up" ? "bg-[#0f8a5f]" : "bg-[#d1273b]"}`}
                style={{ left: 102 + x * 37.5 + 18, top: 11 + y * 37 - 5 }}
              >
                {k === "up" ? "↑" : "↓"}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

const Callout = ({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) => (
  <div className={`absolute w-[385px] rounded-[8px] bg-white px-[21px] shadow-[0_2px_10px_rgba(24,27,40,0.1),0_0_1px_rgba(24,27,40,0.15)] ${className}`}>
    {title && <div className="pt-[18px] text-[18px] leading-6 font-medium text-[#6c2bd9]">{title}</div>}
    <div className={`text-[16px] leading-6 text-[#3a3b40] ${title ? "mt-[6px] pb-[16px]" : "py-[16px]"}`}>{children}</div>
  </div>
);

const Curve = ({ d, className }: { d: string; className: string }) => (
  <svg viewBox="0 0 60 70" width={60} height={70} className={`absolute ${className}`} aria-hidden>
    <path d={d} fill="none" stroke="#7b72e8" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function MapRankTrackerPage() {
  const [q, setQ] = useState("");
  const [sticky, setSticky] = useState(false);
  const [active, setActive] = useState(false);
  const heroSearch = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (heroSearch.current) io.observe(heroSearch.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
  return (
    <div className="pb-[199px]">
      {active && <div aria-hidden data-testid="search-overlay" onClick={() => setActive(false)} className="fixed inset-0 z-[115] bg-white/85" />}
      {sticky && (
        <div className="fixed top-0 right-0 left-0 z-40 flex h-[71px] items-center justify-center bg-[#f9f9f9] shadow-[0_4px_16px_rgba(24,27,40,0.1)]" data-testid="sticky-search">
          <SearchBox value={q} onChange={setQ} className="-ml-[15px]" />
        </div>
      )}
      <section className="h-[501px] bg-[#410f7c] text-center">
        <div className="pt-[25px] text-[14px] leading-5 text-[#d3c6e6]">Map Rank Tracker</div>
        <h1 className="mt-[61px] text-[48px] leading-[56px] font-bold text-white">
          Monitor your local rankings
          <br />
          with pinpoint accuracy
        </h1>
        <div ref={heroSearch} className="mt-[39px] flex justify-center">
          <div className={`relative ${active ? "z-[120]" : ""}`}>
            <SearchBox value={q} onChange={setQ} onFocus={() => setActive(true)} active={active} />
            {active && q.trim() && <BusinessSuggestions q={q} />}
          </div>
        </div>
        <div className="mt-[46px] flex items-center justify-center gap-[7px] text-[14px] text-white">
          <span className="mr-[1px]">Examples:</span>
          {mapRankExamples.map((e) => (
            <button key={e} type="button" onClick={() => setQ(e)} className="h-[30px] rounded-full bg-white/[0.17] px-[8px] font-medium hover:bg-white/30">
              {e}
            </button>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-[5px] w-[1019px] rounded-[8px] bg-white pt-[38px] pb-[40px] text-center">
        <h2 className="mx-auto w-[800px] text-[24px] leading-7 font-semibold text-[#1f1f24]">See where your business stands on Google Maps by area, against competitors, and over time</h2>
        <p className="mx-auto mt-[30px] w-[660px] text-[16px] leading-6 text-[#3a3b40]">
          98% of consumers look for local goods and services online. What they see can vary widely depending on their location. Uncover what they’re seeing keyword by keyword across your service area.
        </p>
        <div className="relative mt-[74px] h-[622px] text-left">
          <Callout className="top-0 left-[58px]">Get feedback on your local efforts by seeing ranking changes for a selected date range.</Callout>
          <Callout className="top-0 right-[60px]">View your search positions by keyword and location, with AI help to simplify your search.</Callout>
          <Curve d="M8 2c-2 30 6 44 26 56M34 58l-12 0M34 58l-3-12" className="top-[80px] left-[112px]" />
          <Curve d="M52 2c2 30-6 44-26 56M26 58l12 0M26 58l3-12" className="top-[80px] right-[112px]" />
          <div className="absolute top-[97px] right-0 left-0">
            <Dashboard />
          </div>
          <Curve d="M4 66c10-10 20-30 22-58M26 8l-8 10M26 8l6 10" className="top-[440px] left-[290px]" />
          <Curve d="M10 66c-4-20-2-40 4-60M14 6l-8 8M14 6l8 8" className="top-[440px] left-[590px]" />
          <Callout title="Gather competitive intel" className="top-[498px] left-[58px]">
            See your list of top competitors and a heatmap of their rankings in the area.
          </Callout>
          <Callout title="Set your map size" className="top-[498px] right-[60px]">
            Zoom in or out and set your pins to customize your map grid.
          </Callout>
        </div>
        <Link href={routes.account.subscription} className="mt-[34px] inline-flex h-[55px] w-[245px] items-center justify-center rounded-[6px] bg-[#1a1a1a] text-[16px] font-semibold text-white hover:bg-[#33353a]">
          Buy Map Rank Tracker
        </Link>
        <h2 className="mt-[80px] text-[24px] leading-7 font-semibold text-[#1f1f24]">Frequently asked questions</h2>
        <MapFaq />
      </section>
    </div>
  );
}

function MapFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mx-auto mt-[32px] flex w-[733px] flex-col gap-px text-left">
      {mapRankFaq.map((f, i) => (
        <div key={f.q} className="bg-[#f7f7f8]">
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex min-h-[41px] w-full items-center py-[8px] pr-[20px] pl-[13px] text-left text-[16px] leading-6 font-bold text-[#3a3b40]">
            <ChevronR className={`mr-[7px] shrink-0 transition-transform ${open === i ? "rotate-90" : ""}`} />
            {f.q}
          </button>
          {open === i && <p className="pr-[20px] pb-[14px] pl-[36px] text-[14px] leading-[22px] text-[#484a49]">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
