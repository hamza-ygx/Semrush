"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { AppShell } from "@/components/shell/AppShell";
import { ChevronRight, ExternalIcon } from "@/components/ui/icons";
import { CenteredFooter } from "@/features/gaps/common";
import { BrowserLogo, FeatureArt, HeroArt, StepArt } from "./art";
import { browsers, faq, features, steps, type Feature } from "./data";

const GREEN = "#00a37f";
const card = "mx-auto w-[959px] rounded-lg bg-white shadow-card";
const chrome = browsers[0];

function scrollToInstall() {
  document.getElementById("seoquake-install")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Hero() {
  return (
    <section className={`${card} px-12 pt-[45px]`}>
      <div className="text-center">
        <div className="text-[20px] leading-7 text-[#6a6c6a]">Free browser extension by {brand.name}</div>
        <h1 className="mt-[10px] text-[40px] leading-[48px] font-semibold tracking-[-0.02em]">SEOquake: instant SEO metrics for any page</h1>
        <p className="mx-auto mt-[12px] w-[700px] text-[16px] leading-6">
          Check any website or search results page without leaving your browser. Audit on-page SEO, analyze keyword density and links, and compare competitors in seconds.
        </p>
        <div className="mt-[33px] flex justify-center gap-3">
          <a
            href={chrome.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[39px] items-center gap-2 rounded-md px-[13px] text-[16px] font-semibold text-white hover:brightness-95"
            style={{ background: GREEN }}
          >
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white">
              <BrowserLogo kind="chrome" size={18} />
            </span>
            Add to Chrome — it’s free
          </a>
          <button type="button" onClick={scrollToInstall} className="h-[39px] rounded-md border border-rk-border-strong bg-white px-[13px] text-[16px] font-medium text-rk-text-2 hover:bg-rk-bg">
            Other browsers
          </button>
        </div>
        <div className="mt-[14px] flex items-center justify-center gap-2 text-[16px] leading-6 text-[#6a6c6a]">
          Available for
          {browsers.map((b) => (
            <span key={b.key} title={b.name} className="flex">
              <BrowserLogo kind={b.key} size={18} />
            </span>
          ))}
        </div>
      </div>
      <div className="mt-[44px] -mx-[1px]">
        <HeroArt />
      </div>
    </section>
  );
}

function FeatureCard({ f }: { f: Feature }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-lg border border-rk-border ${f.wide ? "col-span-2" : ""}`}>
      <div className="h-[168px] px-4 pt-3" style={{ background: f.bg }}>
        <FeatureArt kind={f.key} />
      </div>
      <div className="px-5 pt-[16px] pb-[20px]">
        <h3 className="text-[18px] leading-6 font-semibold">{f.title}</h3>
        <p className="mt-[6px] text-[14px] leading-5 text-rk-text-2">{f.text}</p>
      </div>
    </div>
  );
}

function Features() {
  return (
    <div className="pt-[88px] pb-[48px]">
      <h2 className="mx-auto w-[720px] text-center text-[32px] leading-10 font-semibold">Everything you need for a quick SEO check</h2>
      <p className="mx-auto mt-4 w-[600px] text-center text-[16px] leading-6 text-rk-text-2">SEOquake puts the most useful SEO parameters right where you work—on the page and in the search results.</p>
      <div className="mt-[40px] grid grid-cols-3 gap-[17px]">
        {features.map((f) => (
          <FeatureCard key={f.key} f={f} />
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className={`${card} px-12 pt-[47px] pb-[48px]`}>
      <h2 className="text-center text-[24px] leading-7 font-semibold">How it works</h2>
      <p className="mt-[16px] text-center text-[16px] leading-6 text-rk-text-2">Start analyzing pages in three simple steps.</p>
      <ol className="mt-[33px] grid grid-cols-3 gap-[17px]">
        {steps.map((s, i) => (
          <li key={s.key} className="relative rounded-lg bg-[#f3f5f5] px-6 pt-[24px] pb-[24px]">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8efff] text-[16px] font-semibold text-[#2a5bd7]">{i + 1}</span>
              <StepArt kind={s.key} />
            </div>
            <h3 className="mt-[12px] text-[16px] leading-6 font-semibold">{s.title}</h3>
            <p className="mt-[6px] text-[16px] leading-6 text-rk-text-2">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Install() {
  return (
    <section id="seoquake-install" className="mx-auto w-[959px] scroll-mt-4 rounded-lg bg-[#dfe8ff] px-12 pt-[47px] pb-[48px] text-center shadow-card">
      <h2 className="text-[24px] leading-7 font-semibold">Install SEOquake for free</h2>
      <p className="mt-[16px] text-[16px] leading-6">Choose your browser to open the official extension store.</p>
      <div className="mt-[33px] grid grid-cols-4 gap-[17px]">
        {browsers.map((b) => (
          <a
            key={b.key}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Get SEOquake for ${b.name} (opens ${b.store} in a new tab)`}
            className="group relative flex h-[148px] flex-col items-center justify-center rounded-lg bg-white px-4 shadow-[0_1px_2px_rgba(25,27,35,0.12)] transition-shadow hover:shadow-[0_3px_12px_rgba(37,50,92,0.18)]"
          >
            <BrowserLogo kind={b.key} size={40} />
            <span className="mt-[12px] text-[16px] leading-6 font-semibold text-rk-text group-hover:text-rk-link">Add to {b.name}</span>
            <span className="mt-[2px] text-[14px] leading-5 text-[#6a6c6a]">{b.store}</span>
            <ExternalIcon width={14} height={14} className="absolute top-3 right-3 text-[#a9abaa] group-hover:text-rk-link" />
          </a>
        ))}
      </div>
      <p className="mt-[20px] text-[14px] leading-5 text-[#6a6c6a]">Free to use. Links open in a new tab.</p>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={`${card} px-12 pt-[47px] pb-[52px]`}>
      <h2 className="text-center text-[24px] leading-7 font-semibold">Frequently asked questions</h2>
      <div className="mt-[33px] flex flex-col gap-1">
        {faq(brand.name).map((f, i) => (
          <div key={f.q} className="rounded-sm bg-[#f3f5f5]">
            <button
              type="button"
              aria-expanded={open === i}
              aria-controls={`seoquake-faq-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
              className="flex h-[56px] w-full items-center gap-[7px] pl-[19px] text-left text-[16px] font-semibold text-[#484a49] hover:text-rk-text"
            >
              <ChevronRight width={14} height={14} strokeWidth={2} className={`shrink-0 transition-transform ${open === i ? "rotate-90" : ""}`} />
              {f.q}
            </button>
            {open === i && (
              <p id={`seoquake-faq-${i}`} className="-mt-2 pr-6 pb-4 pl-[43px] text-[16px] leading-6 text-rk-text-2">
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SeoquakeLanding() {
  return (
    <AppShell section="seo" search={{ kind: "goto" }} footer={false}>
      <div className="pt-[17px]">
        <Hero />
        <section className={`${card} mt-[18px] px-12`}>
          <Features />
        </section>
        <div className="mt-[25px] flex flex-col gap-[25px]">
          <HowItWorks />
          <Install />
          <Faq />
        </div>
      </div>
      <CenteredFooter />
    </AppShell>
  );
}
