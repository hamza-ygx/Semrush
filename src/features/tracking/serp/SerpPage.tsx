import type { ReactNode } from "react";
import { DarkScrollbar } from "@/features/serp/client";
import { serpContent, serpTabs, type OrganicResult, type Source } from "./data";

const font = { fontFamily: "arial, sans-serif" };

const Icon = ({ children, size = 24, className = "" }: { children: ReactNode; size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
    {children}
  </svg>
);

function GoogleLogo() {
  const c = ["#4285f4", "#ea4335", "#fbbc05", "#4285f4", "#34a853", "#ea4335"];
  return (
    <span className="font-medium tracking-[-1.5px] select-none" style={{ fontSize: 30, lineHeight: 1, fontFamily: "'Product Sans', arial, sans-serif" }}>
      {"Google".split("").map((ch, i) => (
        <span key={i} style={{ color: c[i] }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function SearchBox({ phrase }: { phrase: string }) {
  return (
    <div className="absolute top-[26px] left-[179px] flex h-[51px] w-[861px] items-center rounded-full bg-white pr-[18px] pl-[21px] shadow-[0_1px_6px_rgba(32,33,36,0.2)]">
      <span className="flex-1 text-[16px] text-[#202124]">{phrase}</span>
      <Icon className="text-[#1f1f1f]">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </Icon>
      <span className="mx-[13px] h-[33px] w-px bg-[#dadce0]" />
      <Icon className="text-[#1f1f1f]">
        <path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" />
      </Icon>
      <Icon className="ml-[17px] text-[#1f1f1f]">
        <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.49 6-3.3 6-6.72h-1.7z" />
      </Icon>
      <Icon className="ml-[16px] text-[#1f1f1f]">
        <path d="M6 5h2V3H6a3 3 0 0 0-3 3v2h2V6a1 1 0 0 1 1-1zm12-2h-2v2h2a1 1 0 0 1 1 1v2h2V6a3 3 0 0 0-3-3zM5 16H3v2a3 3 0 0 0 3 3h2v-2H6a1 1 0 0 1-1-1v-2zm14 2a1 1 0 0 1-1 1h-2v2h2a3 3 0 0 0 3-3v-2h-2v2zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
      </Icon>
    </div>
  );
}

function SiteIcon({ size = 18 }: { size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full border border-[#dadce0] bg-white" style={{ width: size, height: size }}>
      <svg viewBox="0 0 20 20" width={size * 0.72} height={size * 0.72}>
        <path d="M10 2.5c-2.5 1.5-3.5 4-2.5 6.5M16.5 7c-1.5-2.5-4-3.5-6.5-2.5M15 15.5c1-2.8.2-5.3-2-6.8M7.5 17.5c2.8.5 5-.5 6.3-2.7M3 12c.7 2.8 2.7 4.4 5.3 4.6M4 5.5C2.4 7.8 2.4 10.4 3.8 12.6" fill="none" stroke="#6f7680" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.6" fill="#c9a23a" />
      </svg>
    </span>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="ml-[4px] inline-flex h-[20px] translate-y-[-1px] items-center gap-[5px] rounded-full bg-[#f1f3f4] pr-[8px] pl-[3px] align-middle text-[11px] leading-none text-[#474747]">
      <SiteIcon size={16} />
      {label}
    </span>
  );
}

function Kebab({ className = "" }: { className?: string }) {
  return (
    <Icon size={18} className={`text-[#474747] ${className}`}>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </Icon>
  );
}

function SourceCard({ sources }: { sources: Source[] }) {
  return (
    <div className="absolute top-[72px] left-[928px] h-[276px] w-[371px] overflow-hidden rounded-t-[16px] border border-b-0 border-[#dadce0] px-4">
      {sources.map((s, i) => (
        <div key={s.title} className={`pb-[10px] ${i ? "border-t border-[#e8e8e8] pt-[14px]" : "pt-[24px]"} ${i === 0 ? "h-[136px]" : "h-[109px]"}`}>
          <div className="flex items-center gap-[6px] text-[12px] text-[#1f1f1f]">
            <SiteIcon />
            <span className="flex-1">{s.site}</span>
            <Kebab className="-mr-[6px]" />
          </div>
          <div className="mt-[7px] text-[14px] leading-[18px] text-[#1f1f1f]">{s.title}</div>
          <div className="mt-[5px] text-[12px] leading-[17px] text-[#4d5156]">
            {s.snippet.map((l) => (
              <div key={l} className="truncate">
                {l}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64px] bg-gradient-to-b from-white/0 via-white/80 to-white" />
    </div>
  );
}

function Result({ r }: { r: OrganicResult }) {
  return (
    <div className="w-[652px]">
      <div className="flex items-center gap-3">
        <SiteIcon size={28} />
        <div className="leading-[20px]">
          <div className="text-[14px] text-[#202124]">{r.site}</div>
          <div className="flex items-center text-[12px] text-[#4d5156]">
            {r.url} {r.path}
            <Kebab className="ml-[10px]" />
          </div>
        </div>
      </div>
      <a href={r.url} target="_blank" rel="noreferrer" className="mt-[7px] block text-[20px] leading-[26px] text-[#1a0dab] hover:underline">
        {r.title}
      </a>
      <div className="mt-[4px] text-[14px] leading-[22px] text-[#4d5156]">{r.snippet}</div>
    </div>
  );
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function fullDate(v: string) {
  if (!/^\d{8}$/.test(v)) return "25 September, 2026";
  return `${+v.slice(6, 8)} ${months[+v.slice(4, 6) - 1]}, ${v.slice(0, 4)}`;
}

export function TrackingSerpPage({ keyword, date, domain, location, device }: { keyword: string; date: string; domain: string; location: string; device: string }) {
  const { overview, results } = serpContent(keyword);
  const meta: [string, ReactNode][] = [
    ["Phrase", keyword],
    ["Location", location],
    ["Device", device],
    ["Date", fullDate(date)],
    [
      "Mask",
      <a key="mask" href={`https://${domain}`} target="_blank" rel="noreferrer" className="underline">
        {domain} (—)
      </a>,
    ],
  ];
  return (
    <div className="relative min-h-screen bg-white text-[#1f1f1f]" style={font}>
      <DarkScrollbar />
      <div className="pointer-events-none absolute top-[153px] right-0 bottom-0 left-[1497px] bg-[#eeeeee]" />
      <div className="flex h-[115px] bg-[#5b5b5b] pt-[16px] text-[12px] leading-[17px]">
        <div className="w-[465px]">
          {meta.map(([k, v]) => (
            <div key={k} className="flex">
              <span className="w-[141px] text-right text-[#cfcfcf]">{k}:</span>
              <span className="ml-[12px] text-white">{v}</span>
            </div>
          ))}
        </div>
        <div className="text-[#d6d6d6]">
          <div>
            This is google&apos;s cache of search results for the term: <b className="text-white">{keyword}</b>
          </div>
          <div className="w-[545px]">It is a snapshot of the page as it appeared on the day of database collection. Please note, the current page may differ from the snapshot captured.</div>
        </div>
      </div>
      <div className="flex h-[38px] items-center bg-[#313131] text-[12px]">
        <span className="w-[141px] text-right text-[#cfcfcf]">SERP pages:</span>
        <span className="ml-[13px] flex h-[19px] w-[19px] items-center justify-center rounded-[2px] bg-[#e07a2b] text-white">1</span>
        <button type="button" className="ml-[9px] flex h-[19px] w-[19px] items-center justify-center rounded-[2px] bg-[#c8c8c8] text-[#333]">
          2
        </button>
      </div>
      <div className="relative h-[138px] border-b border-[#ebebeb]" style={{ width: 1497 }}>
        <span className="absolute top-[37px] left-[43px]">
          <GoogleLogo />
        </span>
        <SearchBox phrase={keyword} />
        <Icon className="absolute top-[41px] left-[1465px] text-[#444746]">
          <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3a2 2 0 0 1 2 2z" />
        </Icon>
        <div className="absolute top-[106px] left-[199px] flex text-[14px] text-[#70757a]">
          {serpTabs.map((t) => (
            <span key={t} className={`relative mr-[24px] ${t === "Allt" ? "text-[#1f1f1f]" : ""}`}>
              {t}
              {t === "Allt" && <span className="absolute -right-[1px] -bottom-[11px] -left-[1px] h-[3px] rounded-t bg-[#1f1f1f]" />}
            </span>
          ))}
          <span className="flex items-center gap-[6px]">
            Fler
            <svg viewBox="0 0 10 5" width={8} height={4}>
              <path d="M0 0l5 5 5-5z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
      <div className="relative pl-[199px]">
        <div className="flex items-center gap-[12px] pt-[33px] text-[13px] leading-5">
          <svg viewBox="0 0 24 24" width={18} height={18}>
            <path d="M12 1c.6 5.6 5.4 10.4 11 11-5.6.6-10.4 5.4-11 11-.6-5.6-5.4-10.4-11-11C6.6 11.4 11.4 6.6 12 1z" fill="#557be7" />
          </svg>
          AI-översikt
        </div>
        <div className="relative w-[652px]">
          <p className="mt-[20px] text-[16px] leading-6">
            {overview.intro}
            <Chip label={overview.introChip} />
          </p>
          <h2 className="mt-[25px] text-[20px] leading-[26px] font-bold text-[#0a1f44]">{overview.heading}</h2>
          <ul className="mt-[13px] h-[150px] overflow-hidden">
            {overview.bullets.map((b) => (
              <li key={b.lead} className="relative mb-[12px] pl-[22px] text-[16px] leading-6">
                <span className="absolute top-[10px] left-[6px] h-[5px] w-[5px] rounded-full bg-[#1f1f1f]" />
                <b>{b.lead}</b> {b.text.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="whitespace-nowrap">
                  {b.text.split(" ").slice(-1)}
                  <Chip label={b.chip} />
                </span>
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-[62px] bg-gradient-to-b from-white/40 to-white" />
        </div>
        <button type="button" className="mt-[10px] flex h-[49px] w-[652px] items-center justify-center gap-[10px] rounded-full border border-[#d2d8e3] text-[14px] text-[#1f1f1f] hover:bg-[#f8f9fa]">
          Visa fler
          <svg viewBox="0 0 24 24" width={18} height={18}>
            <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="#0b57d0" />
          </svg>
        </button>
        <SourceCard sources={overview.sources} />
        <div className="mt-[22px] w-[1100px] border-t border-[#e8e8e8]" />
        <div className="flex flex-col gap-[30px] pt-[35px] pb-[60px]">
          {results.map((r) => (
            <Result key={r.title} r={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
