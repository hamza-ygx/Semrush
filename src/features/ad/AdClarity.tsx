"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { AppShell } from "@/components/shell/AppShell";
import { LogoIcon } from "@/components/icons";
import { CenteredFooter } from "@/features/gaps/common";

const AppMark = () => (
  <svg viewBox="0 0 32 24" width={32} height={24} aria-hidden>
    <path d="M6 9 15 17 26 8" fill="none" stroke="#693bd2" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5" cy="8" r="3.4" fill="#693bd2" />
    <circle cx="27" cy="7" r="3.4" fill="#8b5cf6" />
  </svg>
);

const features = [
  { title: "See every competitor ad", text: "Browse display, video, and social ads your rivals run across publishers and networks." },
  { title: "Estimate ad spend and impressions", text: "Understand how much competitors invest and which campaigns drive the most exposure." },
  { title: "Discover publishers and landing pages", text: "Find the websites and pages that bring your competitors the most traffic." },
];

function VideoPoster({ onPlay, playing }: { onPlay: () => void; playing: boolean }) {
  return (
    <div className="relative mt-[46px] h-[520px] overflow-hidden rounded-xl bg-[#3c2466]">
      <div className="absolute top-[45px] left-[662px] h-[500px] w-[460px] rounded-tl-md bg-[#553094]" />
      <div className="absolute top-[106px] left-[87px] flex items-center gap-3 text-[#c9c9cf]">
        <LogoIcon width={30} height={30} className="opacity-80" />
        <span className="text-[25px] leading-8 font-bold">{brand.name}</span>
      </div>
      <div className="absolute top-[180px] left-[87px] text-[70px] leading-[68px] font-semibold tracking-[-0.015em] text-[#c8c7cc]">
        Advertising
        <br />
        Intelligence
      </div>
      <div className="absolute top-[389px] left-[91px] h-[48px] w-[256px] rounded-md bg-[#b9532e]" />
      <div className="absolute top-[91px] left-[571px] h-[500px] w-[540px] bg-[#bcbcbc]">
        <div className="flex h-[45px] items-center gap-2 bg-[#0b0b0c] pl-[42px] text-[14px] font-bold text-[#c9c9cf]">
          <LogoIcon width={18} height={18} className="opacity-80" />
          <span>{brand.name}</span>
          <span className="-ml-[2px] font-normal text-[#b9532e]">AppCenter</span>
        </div>
        <div className="pl-[46px]">
          <div className="mt-[22px] text-[48px] leading-[64px] font-semibold tracking-[-0.01em] text-[#1e1e22]">AdClarity</div>
          <div className="mt-[18px] flex items-center gap-[80px]">
            <span className="text-[19px] font-medium text-[#222]">Top ads</span>
            <span className="flex h-[18px] w-[105px] items-center rounded border border-[#a4a4a4] px-2 text-[7px] text-[#777]">Sort by: impressions</span>
          </div>
          <div className="relative mt-[15px] flex gap-[23px]">
            <div className="h-[140px] w-[253px] rounded-md bg-[#adadad]">
              <svg viewBox="0 0 253 140" width={253} height={140} aria-hidden>
                <path d="M40 70c30-10 60-50 90-40 20 8 50 30 80 40 20 8 20 30 0 40-60 20-140 10-170-10-10-8-10-24 0-30z" fill="#dedede" />
                <path d="M40 70c20-20 40-44 60-44 20 0 10 30-10 44z" fill="#2b2b33" />
              </svg>
            </div>
            <div className="absolute top-[-6px] left-[141px] w-[105px] rounded bg-[#cfcfcf] px-[7px] py-[4px] text-[7px] leading-[17px] text-[#333] shadow">
              <div>newest</div>
              <div className="-mx-[4px] rounded bg-[#c2c2c2] px-[4px]">impressions</div>
              <div>duration</div>
            </div>
            <div>
              <div className="text-[17px] font-medium text-[#222]">Estimated expenditure</div>
              <div className="mt-[8px] flex gap-[25px]">
                <div>
                  <div className="text-[8px] text-[#8b8b8b]">Impressions</div>
                  <div className="text-[26px] leading-8 font-semibold text-[#1e1e22]">6.9B</div>
                  <div className="text-[9px] text-[#2e8a6c]">↑ 4.23%</div>
                </div>
                <div>
                  <div className="text-[8px] text-[#8b8b8b]">Spend</div>
                  <div className="text-[26px] leading-8 font-semibold text-[#1e1e22]">$40.7M</div>
                  <div className="text-[9px] text-[#2e8a6c]">↑ 7.35%</div>
                </div>
              </div>
              <div className="mt-[30px] text-[17px] font-medium text-[#222]">Ad buying methods</div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={onPlay}
        className="absolute top-[289px] left-[516px] flex h-[39px] w-[64px] items-center justify-center rounded-md bg-[#2d2f35]/90 hover:bg-[#ff0033]"
      >
        {playing ? (
          <span className="flex gap-[4px]">
            <span className="h-[16px] w-[5px] bg-white" />
            <span className="h-[16px] w-[5px] bg-white" />
          </span>
        ) : (
          <svg viewBox="0 0 16 16" width={18} height={18}>
            <path d="M4 2.5v11L13.5 8z" fill="#fff" />
          </svg>
        )}
      </button>
    </div>
  );
}

export function AdClarity() {
  const [tried, setTried] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <AppShell section="apps" search={{ kind: "analyze", value: "", placeholder: "Enter website or keyword", inputClassName: "w-[342px]" }} footer={false}>
      <style>{`html,body{background:#fff}`}</style>
      <div className="px-[15px] pt-[49px] pr-[14px]">
        <div className="ml-[5px]">
          <AppMark />
        </div>
        <h1 className="mt-[20px] text-[24px] leading-8 font-semibold">AdClarity - Advertising Intelligence</h1>
        <p className="mt-[2px] flex items-center gap-[6px] text-[14px] leading-5 text-[#6c6e79]">
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <path d="M8 14S1.5 10 1.5 5.5A3.3 3.3 0 0 1 8 4a3.3 3.3 0 0 1 6.5 1.5C14.5 10 8 14 8 14z" fill="#ff757c" />
          </svg>
          <span>
            15,5K users and <span className="dotted-underline">Deloitte</span> liked it
          </span>
        </p>
        <p className="mt-[22px] text-[16px] leading-6">Unwrap competitors&apos; digital ads, ad spend and impressions</p>
        <button type="button" onClick={() => setTried(true)} className="mt-[20px] flex h-10 w-[330px] items-center justify-center rounded-md bg-[#00a480] text-[16px] font-semibold text-white hover:bg-[#008a6c]">
          {tried ? "Trial activated" : "Try it free"}
        </button>
        <p className="mt-[11px] w-[330px] text-center text-[14px] leading-5 text-[#6c6e79]">
          You&apos;ll activate the <span className="dotted-underline">recommended plan</span>
        </p>
        <VideoPoster playing={playing} onPlay={() => setPlaying((p) => !p)} />
        <section className="mx-auto mt-14 max-w-[900px]">
          <h2 className="text-[24px] leading-8 font-semibold">About the app</h2>
          <p className="mt-3 text-[16px] leading-6 text-rk-text-2">
            AdClarity gives you a complete picture of your competitors&apos; digital advertising: which ads they run, where they appear, and how much they spend. Use it together with {brand.name} to plan campaigns that outperform the market.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-rk-border p-5">
                <h3 className="text-[16px] leading-6 font-semibold">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-5 text-rk-text-2">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <CenteredFooter />
    </AppShell>
  );
}
