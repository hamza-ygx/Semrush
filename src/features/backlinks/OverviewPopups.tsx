"use client";

import { useState, type ReactNode } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { SearchIcon } from "@/components/ui/icons";
import { Plot, Stroke, VBW, linePath, type Pt } from "@/features/domain/charts";
import { authorityTrend, organicDbs, trendMonths } from "./data";
import { Chevron, Flag } from "./ui";

const scopes = ["Root Domain", "URL", "Subdomain", "Subfolder"] as const;

export function ScopeSelect({ testid }: { testid?: string }) {
  const [v, setV] = useState<string>("Root Domain");
  const [open, setOpen] = useState(false);
  const [ring, setRing] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        data-testid={testid}
        onClick={() => {
          setRing(open);
          setOpen(!open);
        }}
        onBlur={() => setRing(false)}
        className="group relative flex items-center gap-[4px] text-[14px] leading-5 text-rk-text outline-none"
      >
        <span className="group-hover:underline">{v}</span>
        <Chevron className="-mr-[2px]" />
        {ring && !open && <span className="absolute -inset-x-[3px] -top-[2px] -bottom-[1px] rounded-[2px] border-[1.5px] border-[#8f8dd4]" />}
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-[2px] z-50 w-[103px] rounded-md bg-white py-[4px] shadow-popover">
          {scopes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setV(s);
                setOpen(false);
              }}
              className={`relative block h-8 w-full px-[8px] text-left text-[14px] leading-5 text-rk-text ${s === v ? "bg-[#ebf1fe]" : "hover:bg-rk-bg"}`}
            >
              {s === v && <span className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#171d1f]" />}
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function OrganicDbSelect({ value }: { value: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const list = organicDbs.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div ref={ref} className="relative">
      <button type="button" data-testid="organic-traffic-db" onClick={() => setOpen(!open)} className="group block">
        {value}
      </button>
      {open && (
        <div className="absolute top-[calc(100%+3px)] left-0 z-50 w-[260px] rounded-md bg-white shadow-popover">
          <label className="flex h-[35px] items-center gap-[7px] rounded-md border-2 border-[#8f9cea] px-[8px]">
            <SearchIcon width={16} height={16} className="shrink-0 text-[#8a8d99]" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full bg-transparent text-[14px] text-rk-text outline-none placeholder:text-[#a9abaa]" />
          </label>
          <div className="max-h-[229px] overflow-y-auto py-[4px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d4d5d9]">
            {list.map((c) => (
              <button key={c.name} type="button" onClick={() => setOpen(false)} className="flex h-8 w-full items-center pr-[13px] pl-[9px] text-left text-[14px] leading-5 text-rk-text hover:bg-rk-bg">
                <span className="mr-[8px] inline-flex h-[10px] w-[14px] shrink-0 overflow-hidden bg-[#edefef]">
                  <Flag code={c.flag} className="!h-[10px] !w-[14px]" />
                </span>
                <span className="flex-1">{c.name}</span>
                <span className="text-rk-muted">{c.v}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SuspiciousBadge() {
  const [hover, setHover] = useState(false);
  return (
    <span className="relative z-10 inline-flex" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span data-testid="suspicious-badge" className={`inline-flex h-[21px] items-center rounded-full px-[9px] text-[12px] text-[#b04a00] ${hover ? "bg-[#fbd6ac]" : "bg-[#fde6cf]"}`}>
        Suspicious
      </span>
      {hover && (
        <span className="absolute bottom-[calc(100%+10px)] left-1/2 z-50 block w-[227px] -translate-x-1/2 rounded-md bg-white px-[12px] pt-[11px] pb-[12px] text-[14px] leading-5 text-rk-text shadow-popover">
          Backlink from this domain may harm your backlink profile.
          <span className="absolute -bottom-[4px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
        </span>
      )}
    </span>
  );
}

const H = 210;
const step = 0.0888;
const at = (i: number) => 0.02 + step * i;
const FLAG = 9;

export function AuthorityTrend() {
  const [hi, setHi] = useState<number | null>(null);
  const p: Pt[] = authorityTrend.map((v, i) => [at(i) * VBW, H - (v / 100) * H]);
  const last = p[p.length - 1];
  const hp = hi === null ? null : p[hi];
  return (
    <div className="px-5 pt-[18px]">
      <div className="text-right text-[14px] text-rk-text-2">Last 12 months</div>
      <Plot
        className="mt-[30px]"
        height={H}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        left={["0", "25", "50", "75", "100"]}
        leftW={40}
        rightW={20}
        gap={16}
        xGap={9}
        bottomH={26}
        baseColor="#e7e8e8"
        x={[
          { at: 0.02, label: "Oct 2025" },
          { at: 0.375, label: "Feb 2026" },
          { at: 0.725, label: "May 2026" },
        ]}
        labelClass="text-[12px] leading-4 text-rk-text-2"
        overlay={
          <>
            {hi === FLAG ? (
              <span className="absolute -bottom-[9px] flex h-[15px] w-[17px] -translate-x-[8px] items-center justify-center rounded-[2px] bg-[#ff4953] text-[11px] leading-none font-bold text-white" style={{ left: `${at(FLAG) * 100}%` }}>
                !
              </span>
            ) : (
              <svg viewBox="0 0 12 12" width={12} height={12} className="absolute -bottom-[9px]" style={{ left: `${at(FLAG) * 100}%` }}>
                <path d="M1 1h10v7H4l-3 3z" fill="#ff4953" />
              </svg>
            )}
            {hp && hi !== null && (
              <>
                <div className="pointer-events-none absolute top-0 bottom-0 w-px bg-[#d6d8d7]" style={{ left: `${at(hi) * 100}%` }} />
                <span className="pointer-events-none absolute h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white bg-[#6167e6]" style={{ left: `calc(${at(hi) * 100}% + 0.5px)`, top: hp[1] }} />
                <div
                  className="pointer-events-none absolute top-[178px] z-20 w-[173px] rounded-md bg-white px-[12px] pt-[11px] pb-[12px] text-[12px] leading-4 whitespace-nowrap shadow-popover"
                  style={at(hi) > 0.5 ? { right: `calc(${(1 - at(hi)) * 100}% + 9px)` } : { left: `calc(${at(hi) * 100}% + 9px)` }}
                >
                  <div className="text-[12px] leading-4 text-rk-text-2">{trendMonths[hi]}</div>
                  <div className="mt-[9px] flex items-center">
                    <span className="mr-[8px] h-[8px] w-[8px] rounded-full bg-[#6167e6]" />
                    <span className="flex-1">Authority Score</span>
                    <span className="font-bold">{authorityTrend[hi]}</span>
                    {hi > 0 && authorityTrend[hi] !== authorityTrend[hi - 1] && (
                      <span className={`ml-[8px] ${authorityTrend[hi] > authorityTrend[hi - 1] ? "text-rk-success" : "text-[#d1002f]"}`}>
                        {authorityTrend[hi] > authorityTrend[hi - 1] ? "+" : "−"}
                        {Math.abs(authorityTrend[hi] - authorityTrend[hi - 1])}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="absolute inset-x-0 top-0 -bottom-[14px]" onMouseLeave={() => setHi(null)}>
              {authorityTrend.map((_, i) => (
                <div
                  key={i}
                  data-testid={`as-trend-slot-${i}`}
                  onMouseEnter={() => setHi(i)}
                  className="absolute top-0 bottom-0"
                  style={{ left: `${(at(i) - step / 2) * 100}%`, width: `${step * 100}%` }}
                />
              ))}
            </div>
          </>
        }
      >
        <Stroke d={linePath(p)} color="#6167e6" width={2.5} />
        <Stroke d={linePath([last, [VBW * 0.98, last[1]]])} color="#6167e6" width={2.5} dash="4 4" />
      </Plot>
    </div>
  );
}
