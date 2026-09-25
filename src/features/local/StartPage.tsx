"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { audiences, dashboardFaq, testimonials } from "./data";
import { AgentMockup, InsightsMockup, ListingMockup, MapRankMockup, ReviewMockup } from "./StartMockups";
import { AdvancedSearch, ChevronR, ExampleScans, Faq, FreeAuditSearch, HeroMap, MagnifierIcon, PrimaryButton } from "./ui";

type Feature = {
  tag: string;
  tagColor: string;
  bg: string;
  title: string;
  text: string;
  href: string;
  side: "left" | "right";
  h: number;
  bgTop: number;
  mock: { left: number; width: number; node: ReactNode };
  mt: number;
};

const features: Feature[] = [
  {
    tag: "GBP AI AGENT",
    tagColor: "#b8490f",
    bg: "#fefbf4",
    title: "Let AI run your profile",
    text: "Our AI agent takes over your Google Business Profile—updating info and photos, posting content, and replying to reviews. Stay visible and bring in more local customers, with zero manual work.",
    href: routes.local.gbpAgent,
    side: "left",
    h: 479,
    bgTop: 39,
    mock: { left: 416, width: 524, node: <AgentMockup /> },
    mt: 80,
  },
  {
    tag: "LISTING MANAGEMENT",
    tagColor: "#8e2f7a",
    bg: "#fffbfe",
    title: "Show up to more customers",
    text: "Keep your business listings—like Facebook and Bing—always up to date without manual updates. Drive new traffic from all types of directories and get your business noticed in local search.",
    href: routes.local.listings,
    side: "right",
    h: 513,
    bgTop: 58,
    mock: { left: 46, width: 467, node: <ListingMockup /> },
    mt: 72,
  },
  {
    tag: "REVIEW GENERATION & MANAGEMENT",
    tagColor: "#4c4e9a",
    bg: "#f5f9fe",
    title: "Strengthen your review strategy",
    text: "Use automation to collect more customer reviews and build strong social proof. Let AI handle the replies while you stay in control of your brand's reputation.",
    href: routes.local.reviews,
    side: "left",
    h: 481,
    bgTop: 40,
    mock: { left: 416, width: 524, node: <ReviewMockup /> },
    mt: 85,
  },
  {
    tag: "ADVANCED GBP MANAGEMENT",
    tagColor: "#0b7a5c",
    bg: "#f3fdf8",
    title: "More insights, more control",
    text: "Unlock GBP insights and simplify multi-location management with edits and bulk optimization. Keep your business information accurate and protected from unwanted changes through controlled updates and suggestions.",
    href: routes.local.gbpOptimization,
    side: "right",
    h: 481,
    bgTop: 40,
    mock: { left: 46, width: 524, node: <InsightsMockup /> },
    mt: 99,
  },
  {
    tag: "MAP RANK TRACKER",
    tagColor: "#b8490f",
    bg: "#fefbf4",
    title: "Zero in on local rankings",
    text: "See exactly how your local SEO is performing and how you compare against competitors. Uncover opportunities to grow your visibility in nearby areas and bring in more local customers.",
    href: routes.local.mapRankTracker,
    side: "left",
    h: 459,
    bgTop: 31,
    mock: { left: 421, width: 519, node: <MapRankMockup /> },
    mt: 89,
  },
];

function FeatureBlock({ f }: { f: Feature }) {
  return (
    <section className="relative mx-auto w-[976px]" style={{ height: f.h, marginTop: f.mt }} data-section={f.tag}>
      <div className="absolute inset-x-0 h-[400px] rounded-[16px]" style={{ top: f.bgTop, background: f.bg }} />
      <div className="absolute top-0" style={{ left: f.mock.left, width: f.mock.width, height: f.h }}>
        {f.mock.node}
      </div>
      <div className="absolute w-[330px]" style={{ top: f.bgTop, left: f.side === "left" ? 40 : 609 }}>
        <div className="mt-[39px] text-[14px] leading-5" style={{ color: f.tagColor }}>
          {f.tag}
        </div>
        <h3 className="mt-[40px] text-[24px] leading-8 font-semibold text-[#2b2a33]">{f.title}</h3>
        <p className="mt-[13px] w-[320px] text-[16px] leading-6 text-[#3f3e46]">{f.text}</p>
      </div>
      <div className="absolute flex items-center" style={{ top: f.bgTop + 320, left: f.side === "left" ? 40 : 609 }}>
        <PrimaryButton href={f.href} className="h-10 w-[148px] text-[16px]">
          Get started
        </PrimaryButton>
        <Link href={f.href} className="ml-[36px] flex items-center gap-[10px] text-[16px] text-[#6c6d73] hover:text-[#2b2a33]">
          Find out more
          <ChevronR />
        </Link>
      </div>
    </section>
  );
}

const G2Logo = () => (
  <svg viewBox="0 0 40 40" width={40} height={40}>
    <circle cx="20" cy="20" r="20" fill="#ef4a2b" />
    <path d="M26.5 14.5a8 8 0 1 0 1.3 9.5h-5.5M13.8 27.6l2.8-4.6" fill="none" stroke="#fff" strokeWidth={3.2} strokeLinecap="round" />
    <text x="24.5" y="13" fontSize="7" fontWeight="700" fill="#fff" fontFamily="Arial">
      2
    </text>
  </svg>
);

const Avatar = ({ hue }: { hue: string }) => (
  <svg viewBox="0 0 96 96" width={96} height={96} className="rounded-full border-[3px] border-white bg-white">
    <circle cx="48" cy="48" r="46" fill="#f6f1ec" />
    <path d="M14 96c2-20 16-30 34-30s32 10 34 30z" fill="#6b3fc4" />
    <path d="M30 96c4-14 12-22 18-22s14 8 18 22z" fill="#f2d24b" />
    <circle cx="48" cy="42" r="17" fill={hue} />
    <path d="M31 38c0-12 8-18 17-18s17 6 17 16c-6-4-12-6-17-6s-11 3-17 8z" fill="#caa37a" />
  </svg>
);

function Testimonials() {
  const [tab, setTab] = useState<(typeof audiences)[number]>("Small businesses");
  const [i, setI] = useState(0);
  const list = testimonials[tab];
  const t = list[i % list.length];
  return (
    <>
      <div className="mt-[41px] flex justify-center gap-[13px]">
        {audiences.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setTab(a);
              setI(0);
            }}
            className={`h-[49px] rounded-full px-[20px] text-[16px] ${a === tab ? "bg-[#3e1087] text-white" : "border border-[#d4d4d8] bg-white text-[#2b2a33] hover:border-[#a8a8b0]"}`}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-[33px] flex h-[439px] w-[976px] flex-col items-center rounded-[10px] bg-[#88f5da] pt-[40px]">
        <div className="flex items-center gap-[36px] text-[16px] font-semibold text-[#3a3b40]">
          <button type="button" aria-label="Previous testimonial" onClick={() => setI((i + list.length - 1) % list.length)} className="hover:text-black">
            <Arrow dir="l" />
          </button>
          <span className="w-[38px] text-center">
            {(i % list.length) + 1} / {list.length}
          </span>
          <button type="button" aria-label="Next testimonial" onClick={() => setI((i + 1) % list.length)} className="hover:text-black">
            <Arrow dir="r" />
          </button>
        </div>
        <p className="mt-[72px] h-[56px] w-[700px] text-center text-[24px] leading-[28px] font-semibold text-[#2b2a33]">{t.quote}</p>
        <div className="mt-[52px]">
          <Avatar hue={t.hue} />
        </div>
        <div className="mt-[12px] text-[16px] leading-6 font-semibold text-[#2b2a33]">{t.role}</div>
        <div className="text-[16px] leading-6 text-[#3a3b40]">{t.company}</div>
      </div>
    </>
  );
}

const Arrow = ({ dir }: { dir: "l" | "r" }) => (
  <svg viewBox="0 0 24 24" width={24} height={24}>
    <path d={dir === "l" ? "M20 12H4m6-6-6 6 6 6" : "M4 12h16m-6-6 6 6-6 6"} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function BottomCta() {
  const router = useRouter();
  const [adv, setAdv] = useState(false);
  const go = () => router.push(routes.local.scan);
  return (
    <section className="mx-auto mt-[137px] w-[976px] rounded-[16px] bg-[#410f7c] px-[52px] pt-[63px] pb-[67px] text-center">
      <h2 className="text-[32px] leading-10 font-semibold text-white">
        Control your GBP, reviews, and listings,
        <br />
        and get deep insights into local SEO
      </h2>
      <p className="mt-[15px] text-[16px] leading-6 text-white">Get started with a free audit of your online presence in local listings</p>
      <form
        className="mt-[41px]"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <label className="flex h-[56px] items-center rounded-[6px] bg-white pl-[10px] text-[#8f8f94]">
          <MagnifierIcon size={26} sw={1.6} />
          <input placeholder="Enter your business name" aria-label="Enter your business name" className="ml-[9px] h-full flex-1 bg-transparent text-[16px] text-[#191b23] outline-none placeholder:text-[#8f8f94]" />
        </label>
        <button type="submit" className="mt-[11px] h-[56px] w-full rounded-[6px] bg-[#a35eff] text-[18px] font-medium text-white hover:bg-[#9048f2]">
          Get started
        </button>
      </form>
      <AdvancedSearch open={adv} onToggle={() => setAdv((v) => !v)} onSubmit={go} />
    </section>
  );
}

export function StartPage() {
  return (
    <div className="pb-[99px]">
    <div className="bg-white pb-[80px]">
      <section className="relative h-[724px] overflow-hidden bg-[#410f7c] text-center">
        <HeroMap pins={[{ x: 345, y: 38, s: 1, o: 0.4 }, { x: 563, y: 98, s: 1.05, o: 0.6 }, { x: 747, y: 51, s: 1, o: 0.4 }]} />
        <div className="relative pt-[26px] text-[16px] leading-5 font-medium text-[#f7e6ff]">Local Dashboard</div>
        <h1 className="relative mt-[123px] text-[48px] leading-[56px] font-bold tracking-[-0.2px] text-white">Automate your local growth</h1>
        <p className="relative mx-auto mt-[16px] w-[850px] text-[20px] leading-6 text-white">
          From Google to AI search—show up everywhere local customers search, with optimized Google Business Profile, listings, reviews, and rankings.
        </p>
        <FreeAuditSearch placeholder="Put your business name or address to get a free local audit" className="relative mx-auto mt-[64px] w-[860px] text-left" />
        <ExampleScans className="relative mt-[20px]" />
      </section>
      <h2 className="mx-auto mt-[63px] w-[760px] text-center text-[36px] leading-10 font-bold text-[#2b2a33]">All the tools you need to be the go-to local business in your area</h2>
      {features.map((f) => (
        <FeatureBlock key={f.tag} f={f} />
      ))}
      <h2 className="mx-auto mt-[83px] w-[976px] text-center text-[36px] leading-10 font-bold text-[#2b2a33]">
        Join thousands of business owners and
        <br />
        agencies who thrive with {brand.name} Local
      </h2>
      <div className="mx-auto mt-[35px] flex w-fit max-w-[600px] items-center gap-4 rounded-[8px] bg-[#f3f4f6] py-4 pr-[34px] pl-[24px] text-[14px] leading-5 text-[#3a3b40]">
        <G2Logo />
        <span>
          See why {brand.name} is #1 for local SEO on review sites like G2, with 4.5 out of 5 stars from 2,086 users
        </span>
      </div>
      <Testimonials />
      <h2 className="mt-[111px] text-center text-[24px] leading-8 font-semibold text-[#2b2a33]">Frequently asked questions</h2>
      <Faq
        items={dashboardFaq}
        className="mx-auto mt-[41px] flex w-[976px] flex-col gap-[12.5px]"
        itemClass="rounded-[8px] bg-white shadow-[0_1px_3px_rgba(24,27,40,0.1),0_0_1px_rgba(24,27,40,0.12)]"
        textClass="h-[51px] pl-[20px] [&>span]:ml-[2px] text-[14px] text-[#2b2a33]"
      />
      <BottomCta />
    </div>
    </div>
  );
}
