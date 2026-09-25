"use client";

import { routes } from "@/config/routes";
import { reviewFaq } from "./data";
import { InsightsMockup, ReviewMockup } from "./StartMockups";
import { ExampleScans, Faq, FreeAuditSearch, HeroMap, PrimaryButton } from "./ui";

const Star = ({ s = 24 }: { s?: number }) => (
  <svg viewBox="0 0 20 20" width={s} height={s}>
    <path d="m10 1.5 2.6 5.5 6 .7-4.5 4.1 1.3 5.9L10 14.7l-5.3 3 1.3-5.9L1.5 7.7l6-.7z" fill="#fbbc05" />
  </svg>
);

const places = [
  { n: "Pizzeria Portofino", r: "4.8", c: "(9,470)", a: "Pizza · 317 N Clark St", d: "Handmade pies by the river", o: "Closes 9 pm" },
  { n: "Giordano's", r: "4.5", c: "(3,491)", a: "Pizza · 130 E Randolph St", d: "Chicago-style pizza chain", o: "Closes 10:30 pm" },
  { n: "Lou Malnati's Pizzeria", r: "4.6", c: "(1,085)", a: "Pizza · 805 S State St", d: "Deep-dish pies with a signature crust", o: "Closes 10:30 pm" },
];

const Arrow = () => (
  <svg viewBox="0 0 40 30" width={40} height={30}>
    <path d="M36 3 6 24M6 24l3-10M6 24l10-2" fill="none" stroke="#f0304d" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Pizza = ({ v }: { v: number }) => (
  <svg viewBox="0 0 52 44" width={53} height={53} preserveAspectRatio="xMidYMid slice" className="rounded-[4px]">
    <rect width="52" height="44" fill={["#efe7dc", "#5a3a2a", "#e8e0d4"][v]} />
    <circle cx="26" cy="22" r="19" fill="#d9822b" />
    <circle cx="26" cy="22" r="15" fill="#e8b04a" />
    {[
      [20, 16],
      [31, 15],
      [24, 27],
      [33, 25],
      [17, 24],
    ].map(([x, y]) => (
      <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="#b3261e" />
    ))}
  </svg>
);

function MapsMockup() {
  const pins: [number, number, string, number, number][] = [
    [53, -9, "Jet's Pizza", 20, 17],
    [129, 90, "Lou Malnati's Pizzer", 60, 111],
    [50, 161, "Bob's Pizza", 14, 179],
    [136, 188, "Giordano's", 103, 207],
    [65, 308, "Pizzeria Portofino", 10, 327],
    [182, 262, "Papa Jo", 137, 287],
  ];
  return (
    <div className="relative h-[520px] w-[480px]">
      <svg viewBox="0 0 260 270" width={260} height={270} className="absolute top-0 left-[-33px]">
        <path d="M30 40c10-30 150-40 200-20 10-10 14-18 16-26 6 16 4 30-4 40 30 40 20 160-40 200S20 250 20 150 20 70 30 40z" fill="#e8f7fe" />
      </svg>
      <div className="absolute top-[80px] left-0 flex h-[410px] w-[438px] overflow-hidden rounded-[6px] bg-white shadow-[0_4px_20px_rgba(20,30,50,0.15)]">
        <div className="relative w-[253px] shrink-0 border-r-[3px] border-[#9a9ba0] pt-[6px]">
          <div className="mx-[6px] flex h-[32px] items-center gap-[12px] rounded-full border border-[#dadce0] px-[12px] text-[11px] text-[#1f1f24] shadow-sm">
            <span className="text-[14px] text-[#5f6368]">≡</span>
            <span className="flex-1">pizza</span>
            <span className="text-[#5f6368]">⌕</span>
            <span className="text-[#5f6368]">✕</span>
          </div>
          <div className="mt-[14px] px-[10px] text-[12px] text-[#1f1f24]">Results ⓘ</div>
          {places.map((p, i) => (
            <div key={p.n} className="relative h-[110px] border-b border-[#e8eaed] px-[10px] pt-[12px] text-[11px] leading-[17px] text-[#5f6368]">
              <div className="text-[14px] leading-5 font-semibold text-[#1f1f24]">{p.n}</div>
              <div>
                {p.r} <span className="text-[#fbbc05]">★★★★★</span> {p.c}
              </div>
              <div>{p.a}</div>
              <div>{p.d}</div>
              <div>
                <span className="text-[#188038]">Open</span> · {p.o}
              </div>
              <div className="absolute top-[14px] right-[12px]">
                <Pizza v={i} />
              </div>
              <div className="absolute top-[4px] left-[128px]" style={{ top: i === 2 ? 30 : 4, left: i === 2 ? 132 : 128 }}>
                <Arrow />
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex-1 overflow-hidden bg-[#f3eee2]">
          <svg viewBox="0 0 185 410" width={185} height={410} className="absolute inset-0">
            <rect x="0" y="342" width="185" height="68" fill="#9dd4e6" />
            <g stroke="#c3cbd8" strokeWidth={8}>
              <path d="M31 0v410M98 0v410M160 0v410M0 52h185M0 136h185M0 241h185M0 276h185M0 361h185" />
            </g>
            <g stroke="#e4e8ef" strokeWidth={4}>
              <path d="M31 0v410M98 0v410M160 0v410M0 52h185M0 136h185M0 241h185M0 276h185M0 361h185" />
            </g>
                      </svg>
          {pins.map(([x, y, l, lx, ly]) => (
            <div key={l}>
              <span className="absolute flex h-[22px] w-[22px] items-center justify-center rounded-full rounded-br-none bg-[#e8453c] shadow-[0_1px_2px_rgba(0,0,0,0.3)]" style={{ left: x - 11, top: y - 12, transform: "rotate(45deg)" }}>
                <svg viewBox="0 0 12 12" width={11} height={11} style={{ transform: "rotate(-45deg)" }}>
                  <path d="M3.5 1v4a1.5 1.5 0 0 0 3 0V1M5 1v10M8.5 1c1.5 1 1.5 4 0 5v5" fill="none" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
                </svg>
              </span>
              <span className="absolute text-[13px] leading-4 whitespace-nowrap text-[#3c4043] [text-shadow:0_0_2px_#fff,0_0_2px_#fff]" style={{ left: lx, top: ly }}>
                {l}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-[502px] left-[38px] text-[14px] text-[#6a6c6a]">If you are strategic about reviews, you are more visible</div>
    </div>
  );
}

const points = [
  ["Reviews get you into AI search", "50% of AI-generated suggestions in Google include GBP and reviews information. Reviews improve AI search visibility."],
  ["Businesses with an inflow of reviews rank higher", "Reviews influence your search visibility. They are responsible for up to 16% of the weight in Google rankings."],
  ["Customers decide based on reviews and replies", "70% of customers trust reviews, and even more (85%) care about how business responds to them."],
];

const features = [
  {
    t: "Get more reviews on autopilot",
    d: "Send review requests by email and SMS to your customers and watch your review count and rating grow.",
    m: <ReviewMockup />,
  },
  {
    t: "Understand what customers say",
    d: "Track rating dynamics, review volume and sentiment for every location and compare them with competitors.",
    m: <InsightsMockup />,
  },
];

export function ReviewsPage() {
  return (
    <div className="pb-[99px]">
      <section className="relative h-[666px] overflow-hidden bg-[#410f7c] text-center">
        <HeroMap variant={1} />
        <div className="relative flex justify-center gap-[12px] pt-[65px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} />
          ))}
        </div>
        <h1 className="relative mt-[52px] text-[48px] leading-[56px] font-bold tracking-[-0.2px] text-white">
          Fuel your growth with reviews that
          <br />
          build trust and drive local reach
        </h1>
        <div className="relative mt-[32px] text-[20px] leading-6 font-bold text-white">Check review stats and local listings for free</div>
        <FreeAuditSearch placeholder="Your business name, website or phone" className="relative mx-auto mt-[16px] w-[875px] text-left" />
        <ExampleScans className="relative mt-[20px]" />
      </section>
      <div className="bg-white pb-[100px]">
        <h2 className="pt-[72px] text-center text-[32px] leading-10 font-bold text-[#1a1a1f]">
          Reviews drive search and AI visibility,
          <br />
          plus customers’ trust and loyalty
        </h2>
        <div className="mx-auto mt-[45px] flex w-[900px]">
          <div className="ml-[3px]">
            <MapsMockup />
          </div>
          <div className="pt-[125px] pl-[21px]">
            {points.map(([t, d], i) => (
              <div key={t} className={i ? "mt-[25px]" : ""}>
                <div className="text-[16px] leading-6 font-bold text-[#1a1a1f]">{t}</div>
                <div className="mt-[3px] w-[400px] text-[14px] leading-5 text-[#3a3b40]">{d}</div>
              </div>
            ))}
            <PrimaryButton href={routes.local.scan} className="mt-[40px] h-10 w-[256px] text-[16px]">
              Boost your reviews now
            </PrimaryButton>
          </div>
        </div>
        {features.map((f, i) => (
          <div key={f.t} className={`mx-auto mt-[100px] flex w-[900px] items-center gap-[60px] ${i % 2 ? "flex-row-reverse" : ""}`}>
            <div className="h-[481px] w-[524px] shrink-0">{f.m}</div>
            <div>
              <h3 className="text-[24px] leading-8 font-semibold text-[#1a1a1f]">{f.t}</h3>
              <p className="mt-[12px] text-[16px] leading-6 text-[#3a3b40]">{f.d}</p>
            </div>
          </div>
        ))}
      </div>
      <section className="rounded-b-[16px] bg-[#410f7c] px-[126px] pt-[64px] pb-[72px] text-center">
        <h2 className="text-[32px] leading-10 font-bold text-white">Start turning reviews into customers</h2>
        <div className="mt-[16px] text-[16px] leading-6 text-white">Check review stats and local listings for free</div>
        <FreeAuditSearch placeholder="Your business name, website or phone" className="mt-[24px] text-left" />
      </section>
      <h2 className="mt-[82px] text-center text-[24px] leading-8 text-[#1a1a1f]">Frequently asked questions</h2>
      <Faq
        items={reviewFaq}
        className="mx-auto mt-[29px] flex w-[1031px] flex-col gap-[13px]"
        itemClass="rounded-[8px] bg-white shadow-[0_1px_3px_rgba(24,27,40,0.1),0_0_1px_rgba(24,27,40,0.12)]"
        textClass="h-[51px] pl-[20px] text-[14px] text-[#1f1f24] [&>span]:-ml-[2px]"
      />
    </div>
  );
}
