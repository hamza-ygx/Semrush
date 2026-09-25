"use client";

import type { ReactNode } from "react";
import { directoryGroups, listingFaq } from "./data";
import { ExampleScans, Faq, FreeAuditSearch, HeroMap } from "./ui";
import { IsoArt, StepArt } from "./art";

const txt = (t: string, c = "#fff", size = 7) => (
  <text x="12" y="12.5" textAnchor="middle" dominantBaseline="middle" fontSize={size} fontWeight={700} fill={c} fontFamily="Arial, sans-serif">
    {t}
  </text>
);

const dirIcons: Record<string, ReactNode> = {
  Google: (
    <g transform="translate(2 2) scale(1.25)">
      <path d="M15.5 8.2c0-.6-.1-1.1-.2-1.6H8v3h4.2a3.6 3.6 0 0 1-1.6 2.4v2h2.6c1.5-1.4 2.3-3.4 2.3-5.8z" fill="#4285f4" />
      <path d="M8 16c2.2 0 4-.7 5.3-2l-2.6-2c-.7.5-1.6.8-2.7.8-2.1 0-3.9-1.4-4.5-3.3H.8v2.1A8 8 0 0 0 8 16z" fill="#34a853" />
      <path d="M3.5 9.5a4.8 4.8 0 0 1 0-3V4.4H.8a8 8 0 0 0 0 7.2z" fill="#fbbc04" />
      <path d="M8 3.2c1.2 0 2.2.4 3 1.2l2.3-2.3A8 8 0 0 0 .8 4.4l2.7 2.1C4.1 4.6 5.9 3.2 8 3.2z" fill="#ea4335" />
    </g>
  ),
  Apple: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#5f6368" />
      <path d="M14.6 12.4c0-1.4 1.1-2 1.2-2.1-.7-1-1.7-1.1-2-1.1-.9-.1-1.7.5-2.1.5-.5 0-1.1-.5-1.8-.5-.9 0-1.8.6-2.3 1.4-1 1.7-.3 4.2.7 5.6.5.7 1 1.4 1.7 1.4s.9-.4 1.8-.4.1 0 1.8.4c.7 0 1.2-.7 1.6-1.4.5-.8.7-1.5.7-1.6 0 0-1.3-.5-1.3-2.2zM13.3 8.3c.4-.5.6-1.1.6-1.8-.6 0-1.2.4-1.6.9-.4.4-.7 1.1-.6 1.7.6 0 1.2-.3 1.6-.8z" fill="#fff" />
    </g>
  ),
  Instagram: (
    <g>
      <defs>
        <linearGradient id="dir-ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#fdc75c" />
          <stop offset="0.45" stopColor="#e5335d" />
          <stop offset="1" stopColor="#8a3ab9" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#dir-ig)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth={1.6} />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth={1.6} />
      <circle cx="16" cy="8" r="0.9" fill="#fff" />
    </g>
  ),
  Facebook: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#1877f2" />
      <path d="M13.3 23v-7.6h2.5l.4-2.9h-2.9v-1.8c0-.8.3-1.4 1.4-1.4h1.6V6.7c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H7.9v2.9h2.5V23z" fill="#fff" />
    </g>
  ),
  Foursquare: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#f94877" />
      <path d="M8.5 6h7.3l-.4 2H11v2h3.9l-.4 2H11v5.5L8.5 19z" fill="none" stroke="#fff" strokeWidth={1.4} strokeLinejoin="round" />
    </g>
  ),
  Tripadvisor: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#34e0a1" />
      <circle cx="8.6" cy="13" r="3" fill="#fff" stroke="#000" strokeWidth={1.3} />
      <circle cx="15.4" cy="13" r="3" fill="#fff" stroke="#000" strokeWidth={1.3} />
      <circle cx="8.6" cy="13" r="1.1" fill="#000" />
      <circle cx="15.4" cy="13" r="1.1" fill="#000" />
      <path d="M5.5 9.6c3.8-2.2 9.2-2.2 13 0" fill="none" stroke="#000" strokeWidth={1.3} />
    </g>
  ),
  "Google Maps": (
    <g>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z" fill="#34a853" />
      <path d="M12 2a7 7 0 0 0-5.3 2.4l5.3 4.6 5.3-4.6A7 7 0 0 0 12 2z" fill="#1a73e8" />
      <path d="M5 9c0 1.7.6 3.5 1.5 5.2L12 9 6.7 4.4A7 7 0 0 0 5 9z" fill="#ea4335" />
      <path d="M17.3 4.4 12 9l-5.5 5.2c1.9 3.8 5.5 7.8 5.5 7.8s7-7.8 7-13a7 7 0 0 0-1.7-4.6z" fill="#fbbc04" opacity={0.9} />
      <circle cx="12" cy="9" r="2.6" fill="#fff" />
    </g>
  ),
  NDrive: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#141414" />
      {txt("N", "#e53935", 12)}
    </g>
  ),
  Waze: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#33ccff" />
      <path d="M6.5 13.5c0-3.3 2.4-6 5.6-6s5.4 2.4 5.4 5.3c0 2.2-1.4 3.6-3.3 4.2H9.8c-.9 0-1.8-.4-2.4-1-.4.3-1 .3-1.4 0 .4-.7.5-1.6.5-2.5z" fill="#fff" stroke="#1f1f24" strokeWidth={1} />
      <circle cx="10.7" cy="11.7" r="0.8" fill="#1f1f24" />
      <circle cx="14.2" cy="11.7" r="0.8" fill="#1f1f24" />
      <path d="M10.4 14c1 .9 2.8.9 3.8 0" fill="none" stroke="#1f1f24" strokeWidth={0.9} />
    </g>
  ),
  Assistant: (
    <g>
      <circle cx="8" cy="9" r="5.5" fill="#4285f4" />
      <circle cx="17" cy="14" r="2.2" fill="#ea4335" />
      <circle cx="14.5" cy="19.5" r="2.4" fill="#fbbc04" />
      <circle cx="19.5" cy="6.5" r="1.8" fill="#34a853" />
    </g>
  ),
  Alexa: <circle cx="12" cy="12" r="9" fill="none" stroke="#1ec2f3" strokeWidth={3} />,
  Siri: (
    <g>
      <defs>
        <radialGradient id="dir-siri" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.35" stopColor="#e14fd2" />
          <stop offset="0.7" stopColor="#3b5ce6" />
          <stop offset="1" stopColor="#1a1a2e" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#dir-siri)" />
    </g>
  ),
  RatingsMD: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#4db6ac" />
      {txt(".MD", "#fff", 7.5)}
    </g>
  ),
  DocSpot: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#1aa3e0" />
      {txt("docspot", "#fff", 4.6)}
    </g>
  ),
  WebMD: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#1167b1" />
      {txt("WebMD", "#fff", 5)}
    </g>
  ),
  Vitals: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#4a2366" />
      {txt("vitals", "#fff", 5.6)}
    </g>
  ),
  "Wellness.com": (
    <g>
      <circle cx="12" cy="12" r="11" fill="#fff" />
      <path d="M3.5 6 7.6 18 12 8.5 16.4 18 20.5 6" fill="none" stroke="#8bc34a" strokeWidth={2.4} strokeLinejoin="round" />
    </g>
  ),
  Bing: (
    <g>
      <circle cx="12" cy="12" r="11" fill="#138484" />
      <path d="M9 5.5v11.5l3.8-2.2 3.2-1.9-2.9-1.4-1.2-2.9" fill="none" stroke="#fff" strokeWidth={1.7} strokeLinejoin="round" />
    </g>
  ),
  "Yahoo!": (
    <g>
      <circle cx="12" cy="12" r="11" fill="#5f01d1" />
      {txt("yahoo!", "#fff", 5.2)}
    </g>
  ),
};

function DirIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} className="shrink-0" aria-hidden>
      {dirIcons[name] ?? <circle cx="12" cy="12" r="11" fill="#ccc" />}
    </svg>
  );
}

const steps = [
  { t: "Enter business name", d: "Run a scan of your local business visibility in a few seconds" },
  { t: "Get a free report", d: "See which directories your business needs to be fixed or listed in" },
  { t: "Access opportunities and take action", d: "See how much you can improve to own the top spot in local search" },
];

const benefits = [
  ["Automatic NAP Management", "Distribute accurate business name, address and phone number to every directory at once."],
  ["Duplicate suppression", "Find and remove duplicate listings that confuse customers and search engines."],
  ["Voice search ready", "Show up in answers from Siri, Alexa and Google Assistant."],
  ["Google Business Profile sync", "Connect your profile once and keep all your listings in sync."],
];

export function ListingsHero({ label = "Listing Management" }: { label?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#410f7c] pb-[23px] text-center">
      <HeroMap variant={1} pins={[{ x: 563, y: 60, s: 1.05, o: 0.45 }]} />
      <div className="relative pt-[26px] text-[16px] leading-5 font-medium text-[#f7e6ff]">{label}</div>
      <h1 className="relative mt-[112px] text-[48px] leading-[56px] font-bold tracking-[-0.2px] text-white">Grow your Local businesses</h1>
      <p className="relative mt-[16px] text-[20px] leading-6 text-white">Listings, data, and AI-powered reviews — all in one platform.</p>
      <div className="relative mt-[63px] text-[16px] leading-6 font-bold text-white">Check your local listings for free</div>
      <FreeAuditSearch placeholder="Your business name, website or phone" className="relative mx-auto mt-[17px] w-[872px] text-left" />
      <ExampleScans className="relative mt-[20px]" />
      <div className="relative mx-auto mt-[82px] flex w-[979px] gap-[24px] text-left">
        {steps.map((s, i) => (
          <div key={s.t} className="flex h-[116px] flex-1 gap-[10px] rounded-[8px] bg-white/[0.07] pt-[17px] pr-[16px] pl-[14px]">
            <StepArt n={i} />
            <div>
              <div className="text-[16px] leading-6 font-bold text-white">{s.t}</div>
              <div className="mt-[2px] text-[12px] leading-4 text-white/90">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ListingsPage() {
  return (
    <div className="pb-[207px]">
      <ListingsHero />
      <section className="mx-auto mt-[13px] w-[979px] rounded-[8px] bg-white pt-[39px] pb-[48px]">
        <h2 className="text-center text-[24px] leading-8 font-bold text-[#1a1a1f]">Stay visible with business listings in top directories</h2>
        <p className="mt-[8px] text-center text-[14px] leading-5 text-[#1f1f24]">Automatic NAP Management | Google Business Profile Integration.</p>
        <div className="relative mt-[40px] flex">
          <div className="relative h-[560px] w-[500px] shrink-0">
            <IsoArt />
          </div>
          <div className="pt-[18px] pl-[2px]">
            <div className="text-[16px] leading-6 font-bold text-[#1a1a1f]">150+ globally supported directories</div>
            {directoryGroups.map((g, gi) => (
              <div key={g.title} className={gi ? "mt-[20px]" : "mt-[18px]"}>
                <div className="text-[13px] leading-5 text-[#5f6068]">{g.title}</div>
                <div className="mt-[12px] grid w-[441px] grid-cols-3 gap-y-[11px]">
                  {g.items.map((n) => (
                    <span key={n} className="flex h-6 items-center gap-[8px] text-[14px] text-[#1f1f24]">
                      <DirIcon name={n} />
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto mt-[24px] w-[979px] rounded-[8px] bg-white px-[48px] pt-[39px] pb-[48px] text-center">
        <h2 className="text-[24px] leading-8 font-bold text-[#1a1a1f]">Everything you need to manage your listings</h2>
        <div className="mt-[32px] grid grid-cols-4 gap-[24px] text-left">
          {benefits.map(([t, d]) => (
            <div key={t} className="rounded-[8px] border border-[#e0e2e1] p-[16px]">
              <div className="text-[14px] leading-5 font-semibold text-[#1a1a1f]">{t}</div>
              <div className="mt-[8px] text-[14px] leading-5 text-[#6a6c6a]">{d}</div>
            </div>
          ))}
        </div>
      </section>
      <h2 className="mt-[56px] text-center text-[24px] leading-8 font-semibold text-[#1a1a1f]">Frequently asked questions</h2>
      <Faq
        items={listingFaq}
        className="mx-auto mt-[24px] flex w-[882px] flex-col gap-[13px]"
        itemClass="rounded-[8px] bg-white shadow-[0_1px_3px_rgba(24,27,40,0.1),0_0_1px_rgba(24,27,40,0.12)]"
        textClass="h-[51px] pl-[20px] text-[14px] text-[#1f1f24] [&>span]:ml-[1px]"
      />
      <section className="mx-auto mt-[36px] w-[979px] rounded-[8px] bg-white px-[54px] pt-[41px] pb-[43px] text-center" data-cta>
        <h2 className="text-[24px] leading-7 font-bold text-[#1a1a1f]">
          Grow your business with listings, data, and reviews.
          <br />
          All in one platform
        </h2>
        <div className="mt-[31px] text-[16px] leading-6 font-bold text-[#1a1a1f]">Check your local listings for free</div>
        <FreeAuditSearch placeholder="Your business name, website or phone" variant="light" className="mt-[16px] text-left" />
      </section>
    </div>
  );
}

