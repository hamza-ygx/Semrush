"use client";

import { useState } from "react";
import { ChevronUpDownIcon } from "@/components/icons";
import { FlagSE, FlagUK, FlagUS, GlobeIcon } from "@/components/ui/icons";
import { useOutsideClose } from "@/components/ui/Popover";
import { monitoringCountries } from "./data";

const flag = (c: string) => (c === "US" ? <FlagUS /> : c === "UK" ? <FlagUK /> : c === "SE" ? <FlagSE /> : <GlobeIcon />);

function CollapseIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="m5 2.5 3 3 3-3M5 13.5l3-3 3 3" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spark({ x, y, color, d }: { x: number; y: number; color: string; d: string }) {
  return <path transform={`translate(${x} ${y})`} d={d} fill={color} opacity={0.55} />;
}

const w1 = "M0 14 L0 9 L6 11 L11 5 L16 9 L21 2 L27 8 L33 6 L36 14Z";
const w2 = "M0 14 L0 11 L7 8 L13 12 L19 4 L25 9 L31 3 L36 14Z";
const w3 = "M0 14 L0 7 L9 7 L9 4 L18 4 L18 8 L27 8 L27 5 L36 5 L36 14Z";

function Illustration() {
  return (
    <svg viewBox="0 0 300 240" width={300} height={240} className="shrink-0" aria-hidden>
      <defs>
        <filter id="rk-mon-sh" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#1b1e1a" floodOpacity="0.1" />
        </filter>
      </defs>
      <rect width="300" height="240" fill="#f3f4f4" />
      <rect x="69" y="0" width="231" height="192" fill="#fcfcfc" />
      <text x="79" y="23" fontSize="11" fontWeight="600" fill="#7c7e87" fontFamily="Inter, sans-serif">
        My competitors
      </text>
      {[
        [79, 70],
        [151, 44],
        [198, 44],
        [245, 44],
      ].map(([x, w]) => (
        <rect key={x} x={x} y="38" width={w} height="19" fill="#f0f1f2" />
      ))}
      <rect x="79" y="70" width="48" height="7" rx="2" fill="#f1f1f1" />
      <rect x="151" y="68" width="16" height="5" rx="1" fill="#e2f2b4" />
      <rect x="198" y="68" width="16" height="5" rx="1" fill="#fcd9de" />
      <rect x="245" y="68" width="16" height="5" rx="1" fill="#e2f2b4" />
      <Spark x={151} y={75} color="#b6b8f2" d={w1} />
      <path transform="translate(198 75)" d={w3} fill="#f0c8a4" />
      <Spark x={245} y={75} color="#d7d8fb" d={w2} />
      <rect x="151" y="108" width="16" height="5" rx="1" fill="#b6efe1" />
      <rect x="198" y="108" width="16" height="5" rx="1" fill="#e2f2b4" />
      <rect x="245" y="108" width="16" height="5" rx="1" fill="#fcd9de" />
      <Spark x={198} y={115} color="#c9cbf5" d={w2} />
      <path transform="translate(245 115)" d="M0 14 L0 11 L10 11 L12 6 L15 11 L26 11 L29 4 L32 11 L36 11 L36 14Z" fill="#efcca8" />
      <rect x="198" y="148" width="16" height="5" rx="1" fill="#e2f2b4" />
      <rect x="245" y="148" width="16" height="5" rx="1" fill="#e2f2b4" />
      <Spark x={198} y={155} color="#dcdcfb" d={w1} />
      <Spark x={245} y={155} color="#c3c5f4" d={w2} />
      <g filter="url(#rk-mon-sh)">
        <rect x="16" y="118" width="189" height="96" rx="4" fill="#fff" />
      </g>
      <rect x="26" y="130" width="82" height="19" fill="#f0f1f2" />
      <rect x="110" y="130" width="85" height="19" fill="#f0f1f2" />
      <text x="26" y="170" fontSize="10.5" fontWeight="600" fill="#5b5d66" fontFamily="Inter, sans-serif">
        domain.com
      </text>
      <text x="110" y="171" fontSize="15" fontWeight="700" fill="#2d61e0" fontFamily="Inter, sans-serif">
        50.5M
      </text>
      <rect x="160" y="166" width="29" height="5" rx="1" fill="#e2f2b4" />
      <path d="M110 204 L117 191 L124 197 L131 184 L138 192 L144 191 L151 191 L158 184 L162 191 L170 179 L175 192 L182 185 L186 204Z" fill="#d8d6f7" stroke="#8a86e0" strokeWidth={0.8} />
    </svg>
  );
}

export function DomainsMonitoring() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<(typeof monitoringCountries)[number]>("US");
  const [pick, setPick] = useState(false);
  const [value, setValue] = useState("");
  const ref = useOutsideClose<HTMLDivElement>(pick, () => setPick(false));
  return (
    <section className="mt-6 rounded-lg bg-white shadow-card">
      <div className={`flex h-11 items-center justify-between px-5 ${open ? "border-b border-rk-border" : ""}`}>
        <h2 className="text-[16px] font-bold">Domains for monitoring</h2>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mr-[6px] flex items-center gap-2 px-1 text-[14px] text-rk-text-2 hover:text-rk-text"
        >
          {open ? "Close" : "Open"}
          {open ? <CollapseIcon /> : <ChevronUpDownIcon />}
        </button>
      </div>
      {open && (
        <div className="flex gap-10 px-5 pt-5 pb-5">
          <Illustration />
          <div>
            <p className="max-w-[500px] text-[14px] leading-5 text-rk-text">
              Quickly see changes in key organic and paid traffic metrics and track the Authority Score of your competitors.
            </p>
            <form
              className="mt-[18px] flex items-center"
              onSubmit={(e) => {
                e.preventDefault();
                setValue("");
              }}
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter domain"
                className="h-7 w-[200px] rounded-l-md border border-rk-border-strong bg-white px-2 text-[14px] outline-none placeholder:text-rk-muted focus:border-[#8e92ec]"
              />
              <div ref={ref} className="relative">
                <button
                  type="button"
                  onClick={() => setPick((p) => !p)}
                  className="flex h-7 w-20 items-center gap-2 rounded-r-md border border-l-0 border-rk-border-strong bg-white px-2 text-[14px] text-rk-text hover:bg-rk-bg"
                >
                  {flag(country)}
                  {country}
                  <svg viewBox="0 0 16 16" width={16} height={16} className="ml-auto">
                    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {pick && (
                  <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-[120px] rounded-md bg-white py-1 shadow-popover">
                    {monitoringCountries.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCountry(c);
                          setPick(false);
                        }}
                        className={`flex w-full items-center gap-2 px-2 py-[6px] text-left text-[14px] leading-5 hover:bg-rk-bg ${c === country ? "bg-[#e9f7ff]" : ""}`}
                      >
                        {flag(c)}
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="ml-3 flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark pr-3 pl-[10px] text-[14px] font-medium text-white hover:bg-[#2b2e38]">
                <svg viewBox="0 0 16 16" width={16} height={16}>
                  <path d="M8 2.5v11M2.5 8h11" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
                </svg>
                Add domain
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
