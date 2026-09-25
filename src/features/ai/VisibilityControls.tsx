"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Popover } from "@/components/ui/Popover";
import { ChevronDown, CloseIcon, FlagUK, FlagUS, SearchIcon } from "@/components/ui/icons";
import { voCountries, voCurrentDate, voHistory, voHowItWorks, voPlatforms, voTopCountries, type FlagBands } from "./data";

const thinScroll = "[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d5d7d7] [&::-webkit-scrollbar-track]:bg-transparent";
const activeRow = "border-[#191b23] bg-[#ebf1ff]";

export function FlagDE() {
  return (
    <svg viewBox="0 0 16 12" width={16} height={12} aria-hidden>
      <rect width="16" height="4" fill="#191b23" />
      <rect y="4" width="16" height="4" fill="#dd0000" />
      <rect y="8" width="16" height="4" fill="#ffce00" />
    </svg>
  );
}

function FlagFR() {
  return <BandFlag flag={{ dir: "v", colors: ["#002395", "#ffffff", "#ed2939"] }} />;
}

function BandFlag({ flag }: { flag: FlagBands }) {
  const n = flag.colors.length;
  return (
    <svg viewBox="0 0 16 12" width={16} height={12} aria-hidden className="shrink-0">
      {flag.colors.map((c, i) =>
        flag.dir === "v" ? <rect key={i} x={(16 / n) * i} width={16 / n} height={12} fill={c} /> : <rect key={i} y={(12 / n) * i} width={16} height={12 / n} fill={c} />,
      )}
      {flag.mark && <circle cx={8} cy={6} r={2.4} fill={flag.mark} />}
      <rect x={0.25} y={0.25} width={15.5} height={11.5} fill="none" stroke="rgba(25,27,35,0.08)" strokeWidth={0.5} />
    </svg>
  );
}

const topFlags: Record<string, ReactNode> = { us: <FlagUS />, uk: <FlagUK />, de: <FlagDE />, fr: <FlagFR /> };

function CountryRow({ flag, name, onClick }: { flag: ReactNode; name: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-8 w-full shrink-0 items-center gap-[7px] pl-[10px] text-left text-[14px] leading-5 text-rk-text hover:bg-rk-bg">
      {flag}
      {name}
    </button>
  );
}

export function MoreCountries() {
  const [q, setQ] = useState("");
  const match = (n: string) => n.toLowerCase().includes(q.trim().toLowerCase());
  return (
    <Popover
      offset={2}
      panelClassName="-left-px! w-[268px] overflow-hidden py-0!"
      trigger={({ toggle }) => (
        <button
          type="button"
          aria-label="More countries"
          onClick={toggle}
          className="flex h-[30px] items-center rounded-r-md border border-l-0 border-[#c4c7cf] bg-white pr-2 pl-[6px] text-rk-text-2 hover:bg-rk-bg"
        >
          <svg viewBox="0 0 16 4" width={16} height={4} aria-hidden>
            <path d="M2 2h.01M8 2h.01M14 2h.01" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
          </svg>
        </button>
      )}
    >
      {(close) => (
        <>
          <label className="flex h-[36px] items-center gap-[7px] rounded-md border border-[#8e8fe6] pl-[10px] shadow-[inset_0_0_0_1px_#b4b7ff]">
            <SearchIcon width={16} height={16} className="shrink-0 text-[#8a8e9b]" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search country" placeholder="Search" className="h-full min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#a9abb6]" />
          </label>
          <div className={`flex max-h-[245px] flex-col overflow-y-auto pt-[3px] pb-1 ${thinScroll}`}>
            {voTopCountries.filter((c) => match(c.name)).map((c) => (
              <CountryRow key={c.name} flag={topFlags[c.code]} name={c.name} onClick={close} />
            ))}
            {!q && <span className="my-1 h-px shrink-0 bg-[#e0e1e9]" />}
            {voCountries.filter((c) => match(c.name)).map((c) => (
              <CountryRow key={c.name} flag={<BandFlag flag={c.flag} />} name={c.name} onClick={close} />
            ))}
          </div>
        </>
      )}
    </Popover>
  );
}

export function PlatformSelect() {
  const [value, setValue] = useState<string>(voPlatforms[0]);
  return (
    <Popover
      offset={8}
      panelClassName="w-[138px] py-px!"
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className={`flex h-7 items-center gap-[6px] rounded-md border bg-white pr-[7px] pl-2 text-[14px] text-rk-text hover:bg-rk-bg ${open ? "border-[#8e8fe6]" : "border-[#c4c7cf]"}`}>
          {value}
          <ChevronDown width={16} height={16} />
        </button>
      )}
    >
      {(close) =>
        voPlatforms.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setValue(p);
              close();
            }}
            className={`flex h-8 w-full items-center border-l-2 pl-[7px] text-left text-[14px] text-rk-text ${p === value ? activeRow : "border-transparent hover:bg-rk-bg"}`}
          >
            {p}
          </button>
        ))
      }
    </Popover>
  );
}

export function DateSelect() {
  const [value, setValue] = useState(voCurrentDate);
  return (
    <Popover
      panelClassName="w-[164px] overflow-hidden py-0!"
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className={`flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover ${open ? "[&>span]:underline" : ""}`}>
          <span>{value}</span>
          <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {(close) => (
        <>
          <button
            type="button"
            onClick={() => {
              setValue(voCurrentDate);
              close();
            }}
            className={`flex h-14 w-full flex-col items-start border-l-2 pt-[7px] pl-[6px] text-left ${value === voCurrentDate ? activeRow : "border-transparent hover:bg-rk-bg"}`}
          >
            <span className="text-[14px] leading-5 text-rk-text">{voCurrentDate}</span>
            <span className="mt-[3px] text-[12px] leading-4 text-rk-muted">Actual state of AI Visibility</span>
          </button>
          <div className="flex h-8 items-center border-b border-[#e0e1e9] pl-2 text-[14px] font-semibold text-rk-text">Historical data</div>
          <div className={`max-h-[243px] overflow-y-auto pt-[3px] ${thinScroll}`}>
            {voHistory.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setValue(m);
                  close();
                }}
                className={`flex h-8 w-full items-center border-l-2 pl-[6px] text-left text-[14px] text-rk-text ${value === m ? activeRow : "border-transparent hover:bg-rk-bg"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </>
      )}
    </Popover>
  );
}

export function HowItWorksDrawer({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <aside role="dialog" aria-label="How it works" className="fixed top-0 right-0 bottom-0 z-[90] flex w-[380px] flex-col bg-white shadow-[-4px_0_16px_rgba(25,27,35,0.08)]">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#dadada] pr-[18px] pl-5">
        <h2 className="text-[16px] leading-6 font-semibold text-rk-text">How it works</h2>
        <button type="button" aria-label="Close" onClick={onClose} className="text-rk-text-2 hover:text-rk-text">
          <CloseIcon width={20} height={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pt-2">
        {voHowItWorks.map((it, i) => (
          <div key={it.q}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center py-3 pr-6 pl-[23px] text-left">
              <svg viewBox="0 0 16 16" width={12} height={12} className={`mr-[17px] shrink-0 text-rk-text-2 ${open === i ? "rotate-90" : ""}`} aria-hidden>
                <path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[16px] leading-6 font-semibold text-rk-text">{it.q}</span>
            </button>
            {open === i && <p className="pr-12 pb-6 pl-11 text-[14px] leading-5 text-rk-text-2">{it.a}</p>}
          </div>
        ))}
      </div>
    </aside>
  );
}
