"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { AppShell } from "@/components/shell/AppShell";
import { GoogleIcon } from "@/components/ui/icons";
import { CenteredFooter } from "@/features/gaps/common";
import { FinalCta, NAVY, PurpleButton, TryItCard } from "./AdLanding";
import { PricingModal } from "./PricingModal";

const Y = "#fbbf38";
const B = "#1eaaf1";
const G = "#58d8a8";

function LampPhoto() {
  return (
    <svg viewBox="0 0 253 253" width={253} height={253} aria-hidden>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6b4e" />
          <stop offset="0.45" stopColor="#c19a73" />
          <stop offset="1" stopColor="#7d5d40" />
        </linearGradient>
        <radialGradient id="glow" cx="0.3" cy="0.45" r="0.45">
          <stop offset="0" stopColor="#f3d9b5" stopOpacity={0.9} />
          <stop offset="1" stopColor="#f3d9b5" stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="253" height="253" fill="url(#wall)" />
      <rect width="253" height="253" fill="url(#glow)" />
      <rect y="210" width="253" height="43" fill="#a17c56" />
      <path d="M72 20c0-8 8-14 18-14h14c14 0 20 10 20 24v162" fill="none" stroke="#cfc6b4" strokeWidth={8} strokeLinecap="round" />
      <path d="M20 88c0-30 22-50 46-50s46 20 46 50z" fill="#9c9788" />
      <ellipse cx="66" cy="88" rx="46" ry="7" fill="#f8ecc9" />
      <ellipse cx="124" cy="206" rx="42" ry="10" fill="#cfc6b4" />
      <rect x="82" y="196" width="84" height="12" rx="6" fill="#d9d1bf" />
    </svg>
  );
}

function HeroArt() {
  return (
    <div className="relative h-[400px] w-[440px]">
      <div className="absolute top-[187px] left-[59px] h-[175px] w-[295px] rounded-md" style={{ background: Y }} />
      <div className="absolute top-0 left-0 w-[253px] overflow-hidden rounded-xl bg-white shadow-[0_6px_24px_rgba(0,0,0,0.2)]">
        <div className="flex h-[44px] items-center gap-2 px-3">
          <span className="relative flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#f0a24a]">
            <span className="h-[10px] w-[10px] rotate-45 rounded-[2px] border-2 border-white" />
          </span>
          <span>
            <div className="text-[11.5px] leading-[14px] font-medium">Lumos Living</div>
            <div className="text-[8px] leading-[10px] text-[#6c6e79]">Sevilla, Spain</div>
          </span>
        </div>
        <LampPhoto />
        <div className="flex h-[33px] items-center gap-[7px] px-[11px] text-[#484a54]">
          <svg viewBox="0 0 60 18" width={60} height={18} aria-hidden>
            <path d="M9 16S1 11 1 6a4 4 0 0 1 8-1.5A4 4 0 0 1 17 6c0 5-8 10-8 10z" fill="none" stroke="currentColor" strokeWidth={1.4} />
            <path d="M30 2a7 7 0 1 0 6.3 10l1.7 4-4-1.5A7 7 0 0 0 30 2z" fill="none" stroke="currentColor" strokeWidth={1.4} />
            <path d="M58 2 44 8l6 2 2 6z M50 10l8-8" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute top-[25px] left-[186px] w-[213px] rounded-xl bg-white pb-[10px] shadow-[0_6px_24px_rgba(0,0,0,0.2)]">
        <div className="border-b border-[#ececf0] px-[11px] pt-[9px] pb-[6px] text-[12.5px] text-[#484a54]">Placement per platform</div>
        <div className="flex gap-3 px-[11px] pt-[6px] text-[11px] text-[#484a54]">
          <span className="flex items-center gap-1">
            <span className="h-[5px] w-[5px] rounded-full" style={{ background: B }} />
            Reach
          </span>
          <span className="flex items-center gap-1">
            <span className="h-[5px] w-[5px] rounded-full" style={{ background: Y }} />
            Clicks
          </span>
        </div>
        <div className="mx-[11px] mt-[10px] flex h-[68px] items-end justify-around border-y border-[#f0f0f3] px-4">
          {[
            [40, 62],
            [52, 40],
            [68, 50],
          ].map(([a, b], i) => (
            <span key={i} className="flex items-end gap-[3px]">
              <span className="w-[11px]" style={{ height: a, background: B }} />
              <span className="w-[11px]" style={{ height: b, background: Y }} />
            </span>
          ))}
        </div>
        <div className="mt-[4px] flex justify-around text-[11px] text-[#484a54]">
          <span>Instagram</span>
          <span>Facebook</span>
          <span>Google</span>
        </div>
      </div>
      <div className="absolute top-[235px] left-[137px] w-[190px] rounded-xl bg-white pb-[10px] shadow-[0_6px_24px_rgba(0,0,0,0.2)]">
        <div className="border-b border-[#ececf0] px-[10px] pt-[7px] pb-[5px] text-[12.5px] text-[#484a54]">Distribution by Device</div>
        <div className="flex gap-2 px-[10px] pt-[5px] text-[11px] text-[#484a54]">
          {[
            ["Desktop", B],
            ["Tablet", Y],
            ["Mobile", G],
          ].map(([l, c]) => (
            <span key={l} className="flex items-center gap-1">
              <span className="h-[5px] w-[5px] rounded-full" style={{ background: c }} />
              {l}
            </span>
          ))}
        </div>
        <svg viewBox="0 0 150 76" width={150} height={76} className="mx-auto mt-[6px]" aria-hidden>
          <path d="M5 75a70 70 0 0 1 64-70v30a40 40 0 0 0-34 40z" fill="#0f8fe9" />
          <path d="M71 5a70 70 0 0 1 37 12L93 43a40 40 0 0 0-22-8z" fill={Y} />
          <path d="M110 18a70 70 0 0 1 35 57h-30a40 40 0 0 0-20-33z" fill={G} />
        </svg>
      </div>
    </div>
  );
}

const steps = [
  { title: "Tell us about your business", text: "Enter your website and goals. We analyze your market and competitors automatically." },
  { title: "Review AI-generated campaigns", text: "Get ready-to-launch Google and Meta campaigns with keywords, ads, and budgets." },
  { title: "Launch and optimize", text: "Publish in one click and let AI keep improving performance over time." },
];

export function LaunchAssistant() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  return (
    <AppShell section="ad" project projectWidth={146} search={{ kind: "goto" }} footer={false} enterprise={false}>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[673px]" style={{ background: NAVY }} />
        <div className="relative flex px-[102px] pt-[81px]">
          <div className="w-[420px] shrink-0 text-white">
            <span className="inline-flex h-[28px] items-center gap-[6px] rounded-full border border-[#6e6f9e] px-[8px] text-[14px] font-medium">
              <GoogleIcon width={16} height={16} />
              Google Premier Partner 2025
            </span>
            <h1 className="mt-[41px] text-[47px] leading-[56px] font-bold">
              Get better
              <br />
              campaign
              <br />
              results with AI
            </h1>
            <p className="mt-[15px] text-[20px] leading-6 whitespace-nowrap text-[#e9e3ff]">
              Create, launch, and optimize campaigns
              <br />
              across Google and Meta.
            </p>
            <PurpleButton onClick={() => setModal(true)} className="mt-[48px]">
              Try it now
            </PurpleButton>
          </div>
          <div className="ml-[104px] pt-[10px]">
            <HeroArt />
          </div>
        </div>
        <div className="relative mt-[75px]">
          <TryItCard title="See Ads Launch Assistant in action" />
        </div>
      </div>
      <section className="mx-auto mt-[100px] w-[975px]">
        <h2 className="text-center text-[36px] leading-10 font-semibold">How it works</h2>
        <div className="mt-10 grid grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl bg-white p-6 shadow-card">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3ebff] text-[16px] font-bold text-[#a25eff]">{i + 1}</span>
              <h3 className="mt-4 text-[20px] leading-7 font-semibold">{s.title}</h3>
              <p className="mt-2 text-[16px] leading-6 text-rk-text-2">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-[110px] pb-[120px]">
        <FinalCta onClick={() => router.push(routes.ad.home)} />
      </div>
      <CenteredFooter />
      <PricingModal open={modal} onClose={() => setModal(false)} />
    </AppShell>
  );
}
