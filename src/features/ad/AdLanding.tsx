"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/gaps/common";
import { HomeMock } from "./HomeMocks";
import { PricingModal } from "./PricingModal";
import { blocks, homeExamples } from "./homeData";

export const NAVY = "#2b2f62";
const PURPLE = "#a25eff";

export function PurpleButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex h-[55px] w-[184px] items-center justify-center rounded-md text-[16px] font-semibold text-white hover:brightness-110 ${className}`} style={{ background: PURPLE }}>
      {children}
    </button>
  );
}

export function HeroPattern() {
  const cards = [
    [60, -40],
    [330, -60],
    [640, -30],
    [900, 40],
    [-40, 130],
    [200, 170],
    [470, 110],
    [760, 170],
    [1000, 240],
    [80, 330],
    [360, 330],
  ];
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMin slice" viewBox="0 0 1127 600" aria-hidden>
      <g transform="rotate(-18 560 300)" opacity={0.55}>
        {cards.map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width={240} height={150} rx={18} fill="#3b3a7a" />
            <circle cx={x + 40} cy={y + 40} r={12} fill="#4a4690" />
            <rect x={x + 62} y={y + 32} width={90} height={8} rx={4} fill="#4a4690" />
            <path d={`M${x + 100} ${y + 110}c10-30 30-30 40 0z`} fill="#4a4690" />
          </g>
        ))}
      </g>
      <rect width="1127" height="600" fill="url(#heroFade)" />
      <defs>
        <radialGradient id="heroFade" cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor={NAVY} stopOpacity={0.9} />
          <stop offset="1" stopColor={NAVY} stopOpacity={0.2} />
        </radialGradient>
      </defs>
    </svg>
  );
}

function AdPreview() {
  const card = (cls: string, rot: string) => (
    <div className={`absolute rounded-[24px] bg-gradient-to-b from-[#b89af0] to-[#f3eafd] ${cls}`} style={{ transform: rot }}>
      <div className="flex items-center gap-3 px-5 pt-5">
        <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white/25">
          <svg viewBox="0 0 24 24" width={24} height={24}>
            <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z M4 7.5 12 12l8-4.5M12 12v9" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinejoin="round" />
          </svg>
        </span>
        <span>
          <div className="text-[16px] font-medium text-white">yourstore</div>
          <div className="text-[12px] font-medium text-white/90">Sponsored</div>
        </span>
      </div>
      <div className="mt-[22px] ml-[21px] h-[9px] w-[449px] rounded-full bg-white/50" />
      <div className="mt-[13px] ml-[21px] h-[9px] w-[304px] rounded-full bg-white/50" />
      <div className="mt-[13px] ml-[21px] h-[9px] w-[199px] rounded-full bg-white/50" />
    </div>
  );
  return (
    <div className="relative mx-auto mt-[55px] h-[216px] w-[655px] overflow-hidden">
      {card("left-0 top-[36px] h-[260px] w-[300px] opacity-80", "rotate(-4deg)")}
      {card("right-0 top-[36px] h-[260px] w-[300px] opacity-80", "rotate(4deg)")}
      {card("left-[75px] top-0 h-[260px] w-[507px] from-[#9f68ea] to-[#e9dcfb]", "none")}
      <div className="absolute right-0 bottom-0 left-0 h-[90px] bg-gradient-to-b from-transparent to-[#f8f2fe]" />
    </div>
  );
}

export function TryItCard({ title, children }: { title: string; children?: ReactNode }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const go = () => router.push(routes.ad.launchAssistant);
  return (
    <section className="relative mx-auto w-[1023px] overflow-hidden rounded-2xl bg-[#f8f2fe] pt-[63px] text-center">
      <div className="text-[14px] leading-5 tracking-[0.02em] text-[#a3389e]">TRY IT OUT</div>
      <h2 className="mt-[22px] text-[36px] leading-[44px] font-semibold">{title}</h2>
      <p className="mx-auto mt-[14px] w-[600px] text-[20px] leading-6">Enter your website URL to discover how your ads could look and explore competitor strategies.</p>
      <form
        className="mt-[74px] flex justify-center gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter any domain or URL"
          className="h-[55px] w-[417px] rounded-md border border-[#dcdde3] bg-white px-3 text-[16px] outline-none placeholder:text-[#8a8e9b] focus:border-[#a25eff]"
        />
        <button type="submit" className="h-[55px] w-[230px] rounded-md bg-[#191d1a] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
          Get insights
        </button>
      </form>
      <div className="mt-[23px] flex justify-center gap-4 text-[16px] leading-5">
        <span>Examples:</span>
        {[brand.domain, ...homeExamples].map((e) => (
          <button key={e} type="button" onClick={() => setQ(e)} className="text-[#2f63d7] hover:underline">
            {e}
          </button>
        ))}
      </div>
      {children ?? <AdPreview />}
    </section>
  );
}

function FeatureBlock({ b, flip, onCta }: { b: (typeof blocks)[number]; flip: boolean; onCta: () => void }) {
  return (
    <div className="relative mx-auto h-[410px] w-[974px] rounded-[20px]" style={{ background: b.tone.band }}>
      <div className={`absolute -top-[16px] ${flip ? "left-[417px]" : "left-[40px]"}`}>
        <HomeMock kind={b.mock} />
      </div>
      <div className={`absolute top-[40px] w-[320px] ${flip ? "left-[40px]" : "left-[609px]"}`}>
        <div className="flex items-center gap-2 text-[14px] leading-5 tracking-[0.01em]" style={{ color: b.tone.tag }}>
          {b.tag}
          {b.isNew && <span className="rounded bg-[#03a77a] px-[5px] text-[11px] leading-4 font-semibold text-white">New</span>}
        </div>
        <h3 className="mt-[24px] text-[24px] leading-7 font-semibold">{b.title}</h3>
        <ul className="mt-[16px] list-disc pl-5 text-[16px] leading-6">
          {b.bullets.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <button type="button" onClick={onCta} className="mt-[30px] h-[39px] rounded-md bg-[#191d1a] px-[30px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
          {b.cta}
        </button>
      </div>
    </div>
  );
}

export function FinalCta({ onClick }: { onClick: () => void }) {
  return (
    <section className="mx-auto w-[975px] rounded-2xl pt-[65px] pb-[64px] text-center text-white" style={{ background: NAVY }}>
      <h2 className="text-[31.5px] leading-10 font-bold">Attract the right customers with more targeted ads</h2>
      <p className="mt-[16px] text-[16px] leading-6">Surpass competitors and maximize ROI using AI-enhanced multi-platform ads with exclusive intel.</p>
      <PurpleButton onClick={onClick} className="mt-[40px]">
        Try it now
      </PurpleButton>
    </section>
  );
}

export function AdHome() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const cta = (i: number) => (i === 0 ? router.push(routes.ad.aiAgent) : i === 2 || i === 3 || i === 4 ? router.push(routes.ad.launchAssistant) : i === 1 ? router.push(routes.ad.research) : setModal(true));
  return (
    <AppShell section="ad" project search={{ kind: "goto" }} footer={false} enterprise={false}>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden" style={{ background: NAVY }}>
          <HeroPattern />
        </div>
        <div className="relative pt-[188px] text-center text-white">
          <h1 className="text-[47px] leading-[56px] font-bold">Run more effective ad campaigns</h1>
          <p className="mx-auto mt-[16px] w-[640px] text-[20px] leading-6 text-[#e9e3ff]">Competitive research, campaign planning, and Google + Meta ad execution—all in one toolkit.</p>
          <PurpleButton onClick={() => router.push(routes.ad.launchAssistant)} className="mt-[48px]">
            Try it now
          </PurpleButton>
        </div>
        <div className="relative mt-[85px]">
          <TryItCard title="See the Advertising Toolkit in action" />
        </div>
      </div>
      <h2 className="mx-auto mt-[102px] w-[640px] text-center text-[36px] leading-10 font-semibold">End-to-end campaigns constantly optimized to grow your ROI</h2>
      <div className="mt-[80px] flex flex-col gap-[110px]">
        {blocks.map((b, i) => (
          <FeatureBlock key={b.tag} b={b} flip={i % 2 === 1} onCta={() => cta(i)} />
        ))}
      </div>
      <div className="mt-[110px] pb-[120px]">
        <FinalCta onClick={() => router.push(routes.ad.launchAssistant)} />
      </div>
      <CenteredFooter />
      <PricingModal open={modal} onClose={() => setModal(false)} />
    </AppShell>
  );
}
