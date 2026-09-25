"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { ChevronRight } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { PricingModal } from "./PricingModal";

const P = "#6f4bfc";

const tiles = [
  { title: "Keywords", text: "Show my top-performing keywords across active campaigns" },
  { title: "Metrics", text: "Create a report for my most recent campaign" },
  { title: "Campaigns", text: "Analyze my account and suggest what I should optimize" },
];

const Sparkle = () => (
  <svg viewBox="0 0 44 44" width={44} height={44} aria-hidden>
    <path d="M16 12c1.5 7 4 9.5 11 11-7 1.5-9.5 4-11 11-1.5-7-4-9.5-11-11 7-1.5 9.5-4 11-11z" fill="#dcccf6" />
    <path d="M32 3c.8 3.6 2 4.8 5.6 5.6-3.6.8-4.8 2-5.6 5.6-.8-3.6-2-4.8-5.6-5.6 3.6-.8 4.8-2 5.6-5.6z" fill="#cdb6f5" />
  </svg>
);

export function AdsAiAgent() {
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <AppShell section="ad" project projectWidth={146} search={{ kind: "goto" }} footer={false} enterprise={false} help="none">
      <style>{`html,body{background:#f3f5f8}`}</style>
      <div className="px-8 pt-4">
        <nav className="flex items-center gap-[9px] text-[14px] leading-5">
          <Link href={routes.home} className="text-rk-muted hover:text-rk-link">
            Home
          </Link>
          <ChevronRight className="text-rk-muted" width={14} height={14} />
          <Link href={routes.ad.home} className="text-rk-muted hover:text-rk-link">
            Advertising
          </Link>
          <ChevronRight className="text-rk-muted" width={14} height={14} />
          <span>Ads AI Agent</span>
        </nav>
        <h1 className="mt-[9px] text-[20px] leading-7 font-medium">
          Ads AI Agent: <span className="text-[#6a6c6a]">Google account not connected</span>
        </h1>
        <div className="relative mt-[19px] h-[498px] rounded-lg bg-white px-8 pt-8 shadow-card">
          <div className="rounded-lg border border-[#f6dede] bg-[#ffefee] px-6 pt-[18px] pb-[18px] text-[14px] leading-5">
            <div className="flex items-center gap-2 font-medium">
              <svg viewBox="0 0 20 20" width={20} height={20} className="text-[#e5484d]">
                <path d="M10 2.5 18 17H2z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
                <path d="M10 8v4M10 14.2v.3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
              </svg>
              Advertising Toolkit subscription required
            </div>
            <p className="mt-[9px]">
              To use all Ads AI Agent features,{" "}
              <button type="button" onClick={() => setModal(true)} className="hover:underline" style={{ color: "#8b6cf5" }}>
                get a subscription
              </button>
              .
            </p>
          </div>
          <div className="mt-[31px] flex items-center justify-center gap-3 pr-[12px]">
            <Sparkle />
            <h2 className="text-[28px] leading-9 font-medium">Welcome to Ads AI Agent</h2>
          </div>
          <p className="mt-[16px] text-center text-[14px] leading-5 text-[#6a6c6a]">To get started, connect your Google account.</p>
          <div className="mt-[17px] flex justify-center">
            <button type="button" onClick={() => setModal(true)} className="h-[34px] rounded-md px-[9px] text-[16px] font-semibold text-white hover:brightness-110" style={{ background: P }}>
              Connect
            </button>
          </div>
          <p className="mt-[82px] text-center text-[16px] leading-6">What can AI Agent help you with?</p>
          <div className="mt-[13px] grid grid-cols-3 gap-[13px]">
            {tiles.map((t) => (
              <button
                key={t.title}
                type="button"
                onClick={() => setMsg(t.text)}
                className="flex h-[131px] flex-col items-center rounded-lg border border-[#e3e4ea] bg-white/60 px-6 pt-[24px] text-center hover:border-[#c9bdfb]"
              >
                <span className="text-[20px] leading-7 text-[#7070d8]">{t.title}</span>
                <span className="mt-[12px] text-[14px] leading-5">{t.text}</span>
              </button>
            ))}
          </div>
        </div>
        <form
          className="sticky bottom-[17px] mx-8 mt-[57px] flex h-[65px] items-center rounded-lg border border-[#b9a8f6] bg-white pr-4 pl-4"
          onSubmit={(e) => {
            e.preventDefault();
            setModal(true);
          }}
        >
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Describe what you need" aria-label="Message" className="h-full flex-1 bg-transparent text-[16px] outline-none placeholder:text-[#8b8d8c]" />
          <button type="submit" aria-label="Send" className="text-[#aea1cc] hover:text-[#6f4bfc]">
            <svg viewBox="0 0 20 20" width={20} height={20}>
              <path d="M3 9.5 17 3l-5 14-2.5-5.5zM9.5 11.5 17 3" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
            </svg>
          </button>
        </form>
        <div className="h-[140px]" />
      </div>
      <PricingModal open={modal} onClose={() => setModal(false)} />
    </AppShell>
  );
}
