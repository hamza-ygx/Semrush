"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { ProjectGoTo } from "@/features/social/HeaderTools";
import { scanBusiness, scanDirectories } from "./data";
import { DarkButton, MagnifierIcon } from "./ui";

const link = "flex items-center gap-[6px] text-[14px] text-[#2d6fe0] hover:text-[#1b4fb0]";

function PinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size}>
      <path d="M10 18s6-5.3 6-10.2a6 6 0 1 0-12 0C4 12.7 10 18 10 18z" fill="none" stroke="currentColor" strokeWidth={1.8} />
      <circle cx="10" cy="7.8" r="2.1" fill="none" stroke="currentColor" strokeWidth={1.8} />
    </svg>
  );
}

function ScanHeader({ roomy = false }: { roomy?: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex h-[28px] items-center gap-[6px] rounded-full bg-[#e5e8fc] px-[9px] text-[14px] text-[#5a60c9]">
          Real time data
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
          100%
        </span>
        <div className="mr-[9px] flex items-center gap-[21px]">
          <button
            type="button"
            className={link}
            onClick={() => {
              try {
                navigator.clipboard?.writeText(window.location.href);
              } catch {}
              setCopied(true);
            }}
          >
            <svg viewBox="0 0 20 20" width={18} height={18}>
              <path d="M8 6.5H6a3.5 3.5 0 0 0 0 7h2M12 6.5h2a3.5 3.5 0 0 1 0 7h-2M7 10h6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
            </svg>
            {copied ? "Link copied" : "Copy link"}
          </button>
          <Link href={routes.local.start} className={link}>
            <MagnifierIcon size={17} sw={2.4} />
            Find another business
          </Link>
          <button type="button" className={link} onClick={() => window.print()}>
            <svg viewBox="0 0 20 20" width={18} height={18}>
              <path d="M10 13V3.5M6 7l4-4 4 4M3.5 12v4.5h13V12" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export to PDF
          </button>
        </div>
      </div>
      <div className={`${roomy ? "mt-[13px]" : "mt-[12px]"} flex items-center gap-[8px] text-[20px] leading-7 font-semibold text-[#1a1a1f]`}>
        <PinIcon />
        {scanBusiness.name}
      </div>
      <div className={`${roomy ? "mt-[2px]" : "mt-[-2px]"} text-[14px] leading-5 text-[#1f1f24]`}>{scanBusiness.address}</div>
    </>
  );
}

const InnerCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-[882px] rounded-[16px] bg-white px-[32px] pt-[27px] shadow-[0_4px_24px_rgba(24,27,40,0.1),0_0_1px_rgba(24,27,40,0.2)] ${className}`}>{children}</div>
);

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => <section className={`mx-auto mt-[13px] w-[979px] rounded-[8px] bg-white ${className}`}>{children}</section>;

function Stat({ label, sub, children, w }: { label: string; sub: string; children: ReactNode; w?: number }) {
  return (
    <div style={{ width: w }} className="border-r border-[#e0e1e6] last:border-0">
      <div className="text-[14px] leading-4 text-[#1f1f24]">{label}</div>
      <div className="mt-[2px] text-[12px] leading-4 text-[#76777d]">{sub}</div>
      <div className="mt-[7px] flex items-baseline text-[24px] leading-7 font-bold text-[#1a1a1f]">{children}</div>
    </div>
  );
}

const dirLogos: { c: string; el: ReactNode }[] = [
  { c: "alexa", el: <circle cx="12" cy="12" r="9" fill="none" stroke="#1ec2f3" strokeWidth={3.4} /> },
  {
    c: "apple",
    el: <path d="M16.5 12.8c0-2.3 1.9-3.4 2-3.5a4.3 4.3 0 0 0-3.4-1.8c-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8A4.5 4.5 0 0 0 4.9 10c-1.6 2.8-.4 7 1.2 9.2.8 1.1 1.7 2.3 2.8 2.3s1.6-.7 3-.7 1.8.7 3 .7 2-1.1 2.8-2.2a9.4 9.4 0 0 0 1.3-2.6 4 4 0 0 1-2.5-3.9zM14.2 6c.6-.8 1.1-1.9 1-3-1 .1-2.1.7-2.8 1.5a3.9 3.9 0 0 0-1 2.9c1 .1 2.1-.6 2.8-1.4z" fill="#111" />,
  },
  {
    c: "bing",
    el: (
      <>
        <circle cx="12" cy="12" r="11" fill="#138484" />
        <path d="M9 6.5v9.5l5.5-3-2-1-1-2.5 4.5 1.5v3L9.2 17.8 7 16.4V6z" fill="#fff" />
      </>
    ),
  },
  { c: "fb", el: <path d="M13.2 22v-8.5h2.9l.4-3.4h-3.3V8c0-1 .3-1.6 1.7-1.6H16.7v-3a24 24 0 0 0-2.6-.1c-2.5 0-4.3 1.6-4.3 4.4v2.4H7v3.4h2.8V22z" fill="#1877f2" /> },
  {
    c: "g",
    el: (
      <>
        <circle cx="12" cy="12" r="11" fill="#f1f3f4" />
        <path d="M16.6 12.2c0-.4 0-.7-.1-1H12v1.9h2.6a2.3 2.3 0 0 1-1 1.5v1.2h1.6a4.8 4.8 0 0 0 1.4-3.6z" fill="#4285f4" />
        <path d="M12 17c1.3 0 2.4-.4 3.2-1.2l-1.6-1.2a3 3 0 0 1-4.4-1.6H7.6v1.3A4.8 4.8 0 0 0 12 17z" fill="#34a853" />
        <path d="M9.2 13a2.9 2.9 0 0 1 0-1.9V9.8H7.6a4.8 4.8 0 0 0 0 4.4z" fill="#fbbc05" />
        <path d="M12 9a2.6 2.6 0 0 1 1.9.7l1.4-1.4A4.8 4.8 0 0 0 7.6 9.8l1.6 1.3A2.9 2.9 0 0 1 12 9z" fill="#ea4335" />
      </>
    ),
  },
  {
    c: "ig",
    el: (
      <>
        <defs>
          <linearGradient id="ig-g" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#fdb33b" />
            <stop offset="0.5" stopColor="#e5307a" />
            <stop offset="1" stopColor="#7a3fe4" />
          </linearGradient>
        </defs>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="url(#ig-g)" strokeWidth={2.2} />
        <circle cx="12" cy="12" r="4.3" fill="none" stroke="url(#ig-g)" strokeWidth={2.2} />
        <circle cx="17.3" cy="6.7" r="1.2" fill="#c236a8" />
      </>
    ),
  },
  {
    c: "yelp",
    el: (
      <g fill="none" stroke="#e8313d" strokeWidth={1.6}>
        <path d="M12 3c2 0 2.8 1.6 2.3 3.8L12 11 9.7 6.8C9.2 4.6 10 3 12 3zM12 11l4.5-1.6c2-.5 3.3.7 2.7 2.5s-2.2 2-3.8 1.2zM12 11l-4.5-1.6c-2-.5-3.3.7-2.7 2.5s2.2 2 3.8 1.2zM12 11l2.6 3.6c1.1 1.6.7 3.3-1.1 3.7s-2.6-1.1-2.3-2.9zM12 11l-2.6 3.6c-1.1 1.6-.7 3.3 1.1 3.7" />
      </g>
    ),
  },
];

function FeatureCols({ items, cols = 3 }: { items: [string, string][]; cols?: number }) {
  const widths = cols === 4 ? [230, 215, 214, 232] : [253, 239, 254];
  return (
    <div className="mt-[25px] flex justify-center">
      {items.map(([t, d], i) => (
        <div key={t} style={{ width: widths[i] }} className={`border-r border-[#d4d5da] pb-[9px] text-center last:border-0 ${cols === 4 ? ["px-[14px]", "px-[12px]", "px-[12px]", "px-[20px]"][i] : ["px-[14px]", "px-[19px]", "px-[13px]"][i]}`}>
          <div className="text-[14px] leading-5 font-semibold text-[#1a1a1f]">{t}</div>
          <div className="mt-[8px] text-[14px] leading-5 text-[#6a6c6a]">{d}</div>
        </div>
      ))}
    </div>
  );
}

function DirectoryTable() {
  const [all, setAll] = useState(false);
  const rows = all ? scanDirectories : scanDirectories.slice(0, 12);
  const tone = { warn: "text-[#c4501b]", bad: "text-[#d1273b]", ok: "text-[#0f8a5f]" } as const;
  return (
    <>
      <table className="mt-[31px] w-[calc(100%-10px)] text-left text-[14px] leading-5">
        <thead>
          <tr className="h-[26px] border-b border-[#dedede] text-[13px] text-[#3a3b40]">
            <th className="w-[206px] pl-[7px] align-top font-normal">Directory</th>
            <th className="w-[190px] align-top font-normal">Status</th>
            <th className="align-top font-normal">Details</th>
          </tr>
        </thead>
        <tbody className={all ? "" : "[&>tr:nth-child(10)]:opacity-60 [&>tr:nth-child(11)]:opacity-40 [&>tr:nth-child(12)]:opacity-20"}>
          {rows.map((r) => (
            <tr key={r.name} className="h-[37.5px] border-b border-[#ececee] last:border-0 hover:bg-[#f6f6f7]">
              <td className="pl-[7px] text-[#1f1f24]">
                <span className="flex items-center gap-[4px]">
                  {r.crown && (
                    <svg viewBox="0 0 16 16" width={16} height={16}>
                      <path d="M2.5 6.5 5.5 9 8 3.5 10.5 9l3-2.5-1.3 5.5H3.8zM3.5 14h9" fill="none" stroke="#1f1f24" strokeWidth={1.4} strokeLinejoin="round" />
                    </svg>
                  )}
                  {r.name}
                </span>
              </td>
              <td className={tone[r.tone]}>{r.status}</td>
              <td className="text-[#1f1f24]">
                {r.tone === "bad" ? (
                  <span className="flex items-center">
                    Missed opportunity.
                    {r.details !== "-" && (
                      <>
                        <span className="ml-[6px] text-[#8a8b90]">Directory&apos;s monthly visits</span>
                        <svg viewBox="0 0 16 16" width={16} height={16} className="mx-[10px] text-[#9a9ba0]">
                          <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.4} />
                        </svg>
                        <span className="rounded-full bg-[#ececee] px-[9px] py-[1px] text-[12px] text-[#5a5b60]">{r.details}</span>
                      </>
                    )}
                  </span>
                ) : (
                  r.details
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[9px] flex justify-center pb-[40px]">
        <button type="button" onClick={() => setAll((v) => !v)} className="flex h-10 items-center gap-[8px] rounded-[6px] border border-[#cfd1d6] bg-[#f7f7f8] px-[8px] text-[16px] text-[#3a3b40] hover:bg-[#ececee]">
          {all ? "Show less" : "Show all directories"}
          <span className="rounded-full border border-[#d9dadd] bg-white px-[7px] text-[14px]">{scanDirectories.length}</span>
        </button>
      </div>
    </>
  );
}

const Legend = ({ up }: { up: string }) => (
  <div className="flex items-center gap-[10px] text-[14px] text-[#76777d]">
    <span className="flex items-center gap-1">
      <i className="h-[6px] w-[6px] rounded-full bg-[#2bb0f0]" />
      2024
    </span>
    <span className="flex items-center gap-1">
      <i className="h-[6px] w-[6px] rounded-full bg-[#cacccb]" />
      2023
    </span>
    <span className="font-medium text-[#0f8a5f]">{up}</span>
  </div>
);

const chartA = "M0 58 12 52 24 60 36 44 48 42 60 38 72 42 84 34 96 36 108 40 120 30 132 38 144 34 156 26 168 34 180 30 192 18 204 34 216 22 228 28 240 16 252 24 264 10 276 18 286 14";
const chartC = "M0 62 12 60 24 62 36 58 48 60 60 58 72 60 84 56 96 58 108 60 120 56 132 58 144 56 156 60 168 58 180 56 192 60 204 56 216 52 228 54 240 44 252 36 264 44 276 34 286 36";
const chartB = "M0 70 12 66 24 72 36 68 48 72 60 66 72 70 84 64 96 68 108 72 120 66 132 70 144 64 156 70 168 66 180 72 192 64 204 68 216 70 228 64 240 68 252 62 264 66 276 60 286 64";

function GbpSlide({ n }: { n: number }) {
  if (n > 0)
    return (
      <div className="flex h-full flex-col items-center justify-center text-[#6a6c6a]">
        <div className="text-[20px] font-semibold text-[#1a1a1f]">{n === 1 ? "AI-generated posts" : "Review insights"}</div>
        <div className="mt-2 text-[14px]">{n === 1 ? "Plan and schedule GBP posts for weeks ahead." : "See how your rating changes month to month."}</div>
      </div>
    );
  return (
    <div className="px-[66px] pt-[81px]">
      <div className="flex h-[79px] items-center rounded-[12px] border border-[#e4e5e5]">
        {[
          ["Views", "55.1K", "+28%", "text-[#0f8a5f]"],
          ["Actions", "345", "-2.5%", "text-[#d1273b]"],
          ["Average Rating", "4.8", "↑0.3", "text-[#0f8a5f]"],
        ].map(([l, v, d, c], i) => (
          <div key={l} className={`flex-1 pl-[28px] ${i ? "border-l border-[#e4e5e5]" : ""} ${i === 2 ? "pl-[53px]" : ""}`}>
            <div className="text-[18px] leading-6 text-[#1f1f24]">{l}</div>
            <div className="text-[18px] leading-6 font-bold text-[#1f1f24]">
              {v} <span className={`font-normal ${c}`}>{d}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[17px] flex gap-[17px]">
        {[
          ["Search Views", "+26%"],
          ["Maps Views", "+40%"],
        ].map(([t, u], i) => (
          <div key={t} className="h-[290px] flex-1 rounded-[12px] border border-[#e4e5e5] px-[15px] pt-[14px]">
            <div className="border-b border-[#e4e5e5] pb-[10px] text-[17px] font-semibold text-[#1f1f24]">{t}</div>
            <div className="mt-[10px]">
              <Legend up={u} />
            </div>
            <div className="mt-[14px] border-t border-[#ececee]" />
            <svg viewBox="0 0 286 90" className="mt-[2px] w-full">
              <path d={chartB} fill="none" stroke="#cacccb" strokeWidth={2} />
              <path d={i ? chartC : chartA} fill="none" stroke="#2bb0f0" strokeWidth={2.4} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function Carousel({ slides, h, arrows = true, dotsTop = 27 }: { slides: number; h: number; arrows?: boolean; dotsTop?: number }) {
  const [i, setI] = useState(0);
  return (
    <>
      <div className="relative">
        {arrows && (
          <button type="button" aria-label="Previous slide" onClick={() => setI((i + slides - 1) % slides)} className="absolute top-1/2 left-[52px] -translate-y-1/2 text-[#3a3b40] hover:text-black">
            <svg viewBox="0 0 16 16" width={20} height={20}>
              <path d="m10.5 2.5-5 5.5 5 5.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
            </svg>
          </button>
        )}
        <div className="mx-auto w-[779px] overflow-hidden rounded-[16px] border border-[#d9d9dc] text-left" style={{ height: h }} data-slide={i}>
          {slides === 3 ? <GbpSlide n={i} /> : <ReviewSlide n={i} />}
        </div>
        {arrows && (
          <button type="button" aria-label="Next slide" onClick={() => setI((i + 1) % slides)} className="absolute top-1/2 right-[52px] -translate-y-1/2 text-[#3a3b40] hover:text-black">
            <svg viewBox="0 0 16 16" width={20} height={20}>
              <path d="m5.5 2.5 5 5.5-5 5.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
            </svg>
          </button>
        )}
      </div>
      <div className="flex justify-center gap-[14px]" style={{ marginTop: dotsTop - 5 }}>
        {Array.from({ length: slides }, (_, k) => (
          <button key={k} type="button" aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className={`h-[10px] w-[10px] rounded-full ${k === i ? "bg-[#6a6c6a]" : "bg-[#d4d5da]"}`} />
        ))}
      </div>
    </>
  );
}

function ReviewSlide({ n }: { n: number }) {
  const r = n
    ? { who: "Sophia", text: "Friendly staff and the coffee is always great. Will be back!", reply: "Thanks, Sophia! See you soon." }
    : { who: "William", text: "Simply the best pizza in my neighbourhood! Can't go wrong with this place.", reply: "Thank you, William! We couldn't have said it better.\nHave you tried our new flavour of the month? So. Good. |" };
  return (
    <div className="px-[36px] pt-[32px]">
      <div className="rounded-[14px] bg-[#f1f2f4] px-[40px] pt-[18px] pb-[14px]">
        <div className="flex items-center gap-[10px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8e6bd8] text-[16px] font-semibold text-white">{r.who[0]}</span>
          <div>
            <div className="text-[14px] font-semibold text-[#1f1f24]">{r.who}</div>
            <div className="text-[13px] tracking-[1px] text-[#fbbc05]">★★★★★</div>
          </div>
        </div>
        <div className="mt-[10px] text-[13px] text-[#1f1f24]">{r.text}</div>
      </div>
      <div className="relative ml-[58px] flex items-start gap-[14px] pt-[23px]">
        <span className="absolute top-0 -left-[22px] h-[46px] w-[22px] rounded-bl-[14px] border-b-2 border-l-2 border-[#e4e5e5]" />
        <div className="h-[54px] w-[526px] rounded-[6px] border-2 border-[#3ab0f5] px-[6px] pt-[8px] text-[13px] leading-[18px] whitespace-pre-line text-[#1f1f24]">{r.reply}</div>
        <span className="flex h-9 w-[82px] items-center justify-center gap-[8px] rounded-[6px] bg-[#0f8cf0] text-[16px] text-white">
          Reply
          <svg viewBox="0 0 16 16" width={15} height={15}>
            <path d="M14 2 2 7l5 2 2 5zM7 9l3-3" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function MapDashboard() {
  const grid = [
    [18, 10, 10, 13, 12, 10, 13],
    [15, 4, 5, 3, 5, 5, 10],
    [12, 3, 1, 1, 2, 4, 12],
    [14, 6, 2, 1, 2, 4, 14],
  ];
  const tone = (v: number) => (v <= 3 ? ["#3fcf98", "#159a68"] : v <= 10 ? ["#fbbf24", "#d19304"] : ["#f25a5a", "#c83232"]);
  return (
    <div className="px-[31px] pt-[31px]">
      <div className="flex gap-[9px]">
        <span className="flex h-[27px] items-center gap-[8px] rounded-[4px] border border-[#cacccb] px-[8px] text-[14px] text-[#1f1f24]">
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M2.5 3.5h11v10h-11zM2.5 6.5h11M5 2v3M11 2v3" fill="none" stroke="currentColor" strokeWidth={1.4} />
          </svg>
          June 21, 2023
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} />
          </svg>
        </span>
        <span className="flex h-[27px] items-center gap-[8px] rounded-[4px] border border-[#cacccb] px-[8px] text-[14px] text-[#1f1f24]">
          Keyword: hair care
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} />
          </svg>
        </span>
      </div>
      <div className="mt-[9px] flex gap-[9px]">
        <div className="h-[152px] w-[309px] rounded-[4px] border border-[#cacccb] px-[19px]">
          {[
            ["Avg. Rank", "8.22", "↓0.22", "text-[#d1273b]"],
            ["Share of Voice", "7.39%", "↑0.19", "text-[#0f8a5f]"],
          ].map(([l, v, d, c], i) => (
            <div key={l} className={`relative h-[76px] pt-[12px] ${i ? "border-t border-[#cacccb]" : ""}`}>
              <div className="text-[14px] text-[#1f1f24]">{l}</div>
              <div className="flex items-baseline gap-[4px] text-[24px] leading-8 font-semibold text-[#1f1f24]">
                {v} <span className={`text-[12px] font-normal ${c}`}>{d}</span>
              </div>
              <svg viewBox="0 0 120 24" width={120} height={24} className="absolute right-0 bottom-[10px]">
                <path d="M0 22 10 16 20 10 30 14 40 8 50 12 60 10 70 14 80 8 90 12 100 6 110 12 120 20V24H0z" fill="#d7ecfb" />
                <path d="M0 22 10 16 20 10 30 14 40 8 50 12 60 10 70 14 80 8 90 12 100 6 110 12 120 20" fill="none" stroke="#2bb0f0" strokeWidth={1.2} />
              </svg>
            </div>
          ))}
        </div>
        <div className="h-[152px] flex-1 rounded-[4px] border border-[#cacccb]">
          <div className="mb-[13px] border-b border-[#cacccb] px-[19px] py-[9px] text-[16px] font-semibold text-[#1f1f24]">Rank decomposition</div>
          {[
            ["Good:", "28.57%", 29, "#1fc28e"],
            ["Average:", "38.78%", 39, "#fbbf24"],
            ["Poor:", "30.61%", 31, "#fb8c3c"],
            ["Out Top 20:", "2.04%", 11, "#f25a5a"],
          ].map(([l, v, w, c]) => (
            <div key={l as string} className="mb-[7px] flex h-[17px] items-center px-[19px] text-[14px] text-[#1f1f24]">
              <span className="w-[80px]">{l}</span>
              <span className="w-[74px] text-right">{v}</span>
              <span className="ml-[16px] h-[15px] flex-1 bg-[#e4e5e5]">
                <span className="block h-full" style={{ width: `${w}%`, background: c as string }} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[10px] flex h-[298px] overflow-hidden rounded-[4px] border border-[#cacccb]">
        <div className="w-[305px] shrink-0 border-r-[3px] border-[#cacccb]">
          {["Crystal Cuts Studio", "Hair & Soul", "Salon Lumière", "The Cutting Room", "Urban Mane"].map((n, i) => (
            <div key={n} className={`flex h-[58px] items-center gap-[10px] border-b border-[#e4e5e5] px-[12px] text-[14px] ${i === 1 ? "bg-[#e5f3fd]" : ""}`}>
              <span className="rounded-full bg-[#eeeff1] px-[6px] text-[12px] text-[#76777d]">{[2.4, 3.1, 4.8, 6.2, 8.9][i]}</span>
              {n}
            </div>
          ))}
        </div>
        <div className="relative flex-1 bg-[#eef0f1]">
          <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d="M0 80 400 0M0 200 400 110M60 300 400 190" stroke="#fff" strokeWidth={4} />
            <path d="M0 150c40 20 60 90 30 150H0z" fill="#b6ddb9" />
            <path d="M400 60c-40 30-80 50-60 110s-60 80-90 130" fill="none" stroke="#8ec2f2" strokeWidth={8} />
          </svg>
          {grid.map((row, y) =>
            row.map((v, x) => {
              const [bg, bd] = tone(v);
              return (
                <span
                  key={`${x}-${y}`}
                  className="absolute flex h-[26px] w-[26px] items-center justify-center rounded-full border text-[12px] text-[#1f1f24]"
                  style={{ left: 88 + x * 38, top: 12 + y * 37, background: bg, borderColor: bd }}
                >
                  {v}
                </span>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}

export function ScanPage() {
  return (
    <div className="relative pt-[7px] pb-[131px]">
      <ProjectGoTo />
      <Card className="h-[536px] pt-[40px] text-center">
        <div className="text-[16px] leading-6 text-[#1f1f24]">{brand.name} Local</div>
        <h1 className="mt-[12px] text-[36px] leading-[41px] font-bold tracking-[-0.3px] text-[#1a1a1f]">
          Grow your business with listings, data,
          <br />
          and reviews. All in one platform
        </h1>
        <InnerCard className="mt-[30px] h-[236px] text-left">
          <div className="pt-[2px]">
            <ScanHeader roomy />
          </div>
          <div className="mt-[21px] flex">
            <Stat label="Online presence" sub="Overall assessment" w={196}>
              <span className="mt-[-2px] ml-[7px] flex items-center gap-[6px] text-[#e8680d]">
                <svg viewBox="0 0 46 22" width={46} height={22}>
                  <path d="M0 22V14l12-4v12zM16 22V9l12-4v17z" fill="#c63c0a" />
                  <path d="M32 22V4l12-4v22z" fill="#cacccb" />
                </svg>
                Medium
              </span>
            </Stat>
            <div className="pl-[32px]">
              <Stat label="Listings to fix" sub="Upon subscription" w={137}>
                11<span className="ml-[4px] text-[16px]">/ 37</span>
              </Stat>
            </div>
            <div className="pl-[32px]">
              <Stat label="Average star rating" sub="Customers love high ratings" w={191}>
                4.5<span className="ml-[4px] text-[16px]">/ 5.0</span>
              </Stat>
            </div>
            <div className="pl-[32px]">
              <Stat label="Total reviews" sub="Reviews build trust">
                1.3k
              </Stat>
            </div>
          </div>
        </InnerCard>
        <DarkButton href={routes.local.listings} className="mt-[34px]">
          Try it now
        </DarkButton>
      </Card>
      <Card className="pt-[18px] pb-[40px] text-center">
        <div className="text-[20px] leading-7 font-semibold text-[#1a1a1f]">Get listed in all top directories:</div>
        <div className="mt-[20px] flex justify-center gap-[44px]">
          {dirLogos.map((d) => (
            <svg key={d.c} viewBox="0 0 24 24" width={24} height={24}>
              {d.el}
            </svg>
          ))}
        </div>
        <h2 className="mt-[40px] text-[36px] leading-[44px] font-bold text-[#1a1a1f]">Fix these to improve and expand your coverage</h2>
        <InnerCard className="mt-[30px] text-left">
          <ScanHeader />
          <DirectoryTable />
        </InnerCard>
        <div className="mt-[45px] text-[20px] leading-7 font-semibold text-[#1a1a1f]">Let your local visibility soar</div>
        <FeatureCols
          items={[
            ["Automatic NAP Management", "Update business name, address, and phone number across all listings from one place."],
            ["Google Business Profile Integration", "Connection to Google Business Profile to sync your data with Facebook and local directories."],
            ["Duplicate deletion", "Eliminate errors with duplicates for all your locations in one place."],
          ]}
        />
        <DarkButton href={routes.local.listings} className="mt-[35px]">
          Enhance listings now
        </DarkButton>
      </Card>
      <Card className="mt-[24px] pt-[43px] pb-[40px] text-center">
        <h2 className="text-[24px] leading-7 font-bold text-[#1a1a1f]">Power up your Google Business Profile</h2>
        <div className="mt-[8px] text-[14px] leading-5 text-[#1f1f24]">GBP post scheduling | Advanced insights | AI recommendations</div>
        <div className="mt-[30px]">
          <Carousel slides={3} h={622} />
        </div>
        <div className="mt-[33px] text-[20px] leading-7 font-semibold text-[#1a1a1f]">Take charge of your GBP and lead the pack in local search</div>
        <FeatureCols
          items={[
            ["Boost engagement", "Generate engaging content in seconds with AI. Plan and schedule posts for weeks."],
            ["Go deeper", "Learn from 24 months of local search and Google Maps performance data."],
            ["Single dashboard", "Streamline GBP management from one user-friendly interface."],
          ]}
        />
        <DarkButton href={routes.local.gbpOptimization} className="mt-[35px]">
          Power up your GBP
        </DarkButton>
      </Card>
      <Card className="mt-[24px] pt-[40px] pb-[40px] text-center">
        <h2 className="text-[24px] leading-7 font-bold text-[#1a1a1f]">Monitor your Google Maps rankings with pinpoint accuracy</h2>
        <div className="mt-[11px] text-[14px] leading-5 text-[#1f1f24]">with Map Rank Tracker</div>
        <div className="mx-auto mt-[34px] h-[560px] w-[779px] overflow-hidden rounded-[16px] border border-[#d9d9dc] text-left">
          <MapDashboard />
        </div>
        <div className="mt-[62px] text-[20px] leading-7 font-semibold text-[#1a1a1f]">Stay ahead of competitors on Google Maps</div>
        <FeatureCols
          items={[
            ["Grid view", "See your rankings pin by pin across your whole service area."],
            ["Competitor insights", "Find out who outranks you and where they win."],
            ["Progress tracking", "Compare results over time to measure your local SEO."],
          ]}
        />
        <DarkButton href={routes.local.mapRankTracker} className="mt-[35px]">
          Track your rankings
        </DarkButton>
      </Card>
      <Card className="mt-[24px] pt-[40px] pb-[40px] text-center">
        <div className="text-[24px] leading-7 font-bold text-[#1a1a1f]">Reply to reviews without switching tabs</div>
        <div className="mt-[8px] text-[14px] leading-5 text-[#1f1f24]">Review alerts | Quick replies | Competitor tracking</div>
        <div className="mt-[20px]">
          <Carousel slides={2} h={278} arrows={false} dotsTop={49} />
        </div>
        <div className="mt-[33px] text-[20px] leading-7 font-semibold text-[#1a1a1f]">Manage reviews effectively from one place</div>
        <FeatureCols
          items={[
            ["Manage your reputation", "Monitor new reviews for all your locations and get fast low-star review alerts."],
            ["Reply to reviews", "Respond quickly to reviews in Google from a single interface."],
            ["Track your competitors", "See competitors' review base, reply rate and progress."],
          ]}
        />
        <DarkButton href={routes.local.reviews} className="mt-[35px]">
          Manage reviews now
        </DarkButton>
      </Card>
      <Card className="mt-[24px] pt-[40px] pb-[39px] text-center">
        <h2 className="text-[24px] leading-7 font-bold text-[#1a1a1f]">Spotlight your business locally</h2>
        <div className="mt-[12px] text-[14px] leading-5 text-[#1f1f24]">Improve your local online presence and get found by local customers.</div>
        <div className="mt-[40px]">
          <FeatureCols
            cols={4}
            items={[
              ["Improve your visibility", "Place your business info quickly and accurately in 70+ online directories."],
              ["Connect with customers", "Monitor and respond to customer reviews."],
              ["Access Maps analytics", "Track your position by keywords and spy on your competitors."],
              ["Get competitor insights", "See what customers are saying about your competitors."],
            ]}
          />
        </div>
        <DarkButton href={routes.local.listings} className="mt-[35px]">
          Try it now
        </DarkButton>
        <Link
          href={routes.local.start}
          className="mx-auto mt-[12px] flex h-10 w-[217px] items-center justify-center gap-[8px] rounded-[6px] border border-[#cfd1d6] bg-[#f7f7f8] text-[16px] text-[#3a3b40] hover:bg-[#ececee]"
        >
          <MagnifierIcon size={17} sw={2.4} />
          Find another business
        </Link>
      </Card>
    </div>
  );
}
