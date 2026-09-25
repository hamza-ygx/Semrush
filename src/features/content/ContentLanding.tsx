"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { AppShell } from "@/components/shell/AppShell";
import { Modal } from "@/components/ui/Modal";
import { ChevronRight } from "@/components/ui/icons";
import { CenteredFooter } from "@/features/gaps/common";
import { FeatureArt } from "./FeatureArt";
import { BriefHero, DashboardHero, GeneratorHero, OptimizerHero, TopicHero } from "./Heroes";
import { faq, features, testimonials, tiles, tools, type Feature, type ToolKey } from "./data";

const GREEN = "#00a37f";
const card = "mx-auto rounded-lg bg-white shadow-card";

function TrialButton({ onClick, children = "Try it now for free", className = "" }: { onClick: () => void; children?: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex h-[39px] items-center rounded-md px-[13px] text-[16px] font-semibold text-white hover:brightness-95 ${className}`} style={{ background: GREEN }}>
      {children}
    </button>
  );
}

function TrialNote({ className = "" }: { className?: string }) {
  return <p className={`text-[16px] leading-6 text-[#6c6e79] ${className}`}>7-day free trial, then $60/month</p>;
}

function TrialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Start your free trial" width={520}>
      <p className="text-[16px] leading-6">Get full access to the {brand.name} Content Toolkit for 7 days. After the trial, the toolkit costs $60/month. Cancel anytime.</p>
      <div className="mt-6 flex gap-3">
        <TrialButton onClick={onClose}>Start free trial</TrialButton>
        <button type="button" onClick={onClose} className="h-[39px] rounded-md border border-rk-border-strong px-3 text-[16px] text-rk-text-2 hover:bg-rk-bg">
          Not now
        </button>
      </div>
    </Modal>
  );
}

function FeatureRow({ f, flip }: { f: Feature; flip: boolean }) {
  const text = (
    <div className={flip ? "ml-[56px] w-[407px]" : "w-[415px]"}>
      <h2 className="max-w-[380px] text-[24px] leading-7 font-medium">{f.title}</h2>
      <ul className="mt-[17px] flex flex-col gap-2">
        {f.bullets.map((b) => (
          <li key={b} className="flex text-[16px] leading-6">
            <span className="mr-[3px] ml-[5px]">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link href={f.href} className="mt-[24px] inline-flex h-[39px] items-center rounded-md px-[12px] text-[16px] font-medium text-white hover:brightness-95" style={{ background: GREEN }}>
        {f.cta}
      </Link>
    </div>
  );
  return (
    <div className="flex h-[345px]">
      {flip ? (
        <>
          <FeatureArt kind={f.art} />
          {text}
        </>
      ) : (
        <>
          {text}
          <div className="ml-auto">
            <FeatureArt kind={f.art} />
          </div>
        </>
      )}
    </div>
  );
}

function Tiles() {
  return (
    <div className="pt-[40px] pb-[49px]">
      <h2 className="text-center text-[28px] leading-9 font-semibold">Everything you need to scale your content</h2>
      <p className="mt-3 text-center text-[16px] leading-6 text-rk-text-2">Built on {brand.name} data and connected to the tools your team already uses.</p>
      <div className="mt-[40px] grid grid-cols-3 gap-x-[17px] gap-y-[17px]">
        {tiles.map((t) => (
          <div key={t.title} className="flex h-[240px] flex-col justify-end rounded-lg px-4 pb-[16px] text-[16px] leading-6 font-semibold whitespace-pre-line" style={{ background: t.bg }}>
            {t.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function JoinCard({ onTrial }: { onTrial: () => void }) {
  return (
    <section className="mx-auto w-[959px] rounded-lg bg-[#e6d3fd] pt-[47px] pb-[48px] text-center shadow-card">
      <h2 className="text-[24px] leading-7 font-semibold">Join the {brand.name} Content Toolkit</h2>
      <p className="mt-[16px] text-[16px] leading-6">Create, repurpose, and publish content that ranks—on Google and AI search.</p>
      <TrialButton onClick={onTrial} className="mt-[33px]" />
      <TrialNote className="mt-[12px]" />
    </section>
  );
}

function Avatar({ hue }: { hue: string }) {
  return (
    <svg viewBox="0 0 72 72" width={72} height={72} className="shrink-0" aria-hidden>
      <circle cx="36" cy="36" r="36" fill="#e6e7ec" />
      <circle cx="36" cy="29" r="13" fill={hue} />
      <path d="M12 64c4-13 13-19 24-19s20 6 24 19a36 36 0 0 1-48 0z" fill={hue} opacity={0.8} />
    </svg>
  );
}

function Testimonials() {
  const cols = [testimonials.filter((_, i) => i % 2 === 0), testimonials.filter((_, i) => i % 2 === 1)];
  return (
    <section className={`${card} w-[959px] px-12 pt-[47px] pb-[48px]`}>
      <h2 className="text-center text-[24px] leading-7 font-semibold">What Content Toolkit users love:</h2>
      <div className="mt-[33px] grid grid-cols-2 gap-[17px]">
        {cols.map((c, ci) => (
          <div key={ci} className="flex flex-col gap-[17px]">
            {c.map((t) => (
              <figure key={t.role} className="rounded-lg bg-[#f3f5f5] px-6 pt-[24px] pb-[24px]">
                <blockquote className="text-[16px] leading-6 text-[#3a3c45]">{t.quote}</blockquote>
                <figcaption className="mt-[36px] flex items-center gap-3">
                  <Avatar hue={t.hue} />
                  <span>
                    <span className="block text-[16px] leading-6 font-semibold">{t.role}</span>
                    <span className="block text-[14px] leading-5 text-[#8a8e9b]">{t.company}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function Integrations() {
  const apps = ["WordPress", "Google Docs", "Canva", "Mailchimp", "Facebook", "Instagram", "LinkedIn", "X"];
  return (
    <section className={`${card} w-[959px] px-12 pt-[47px] pb-[48px] text-center`}>
      <h2 className="text-[24px] leading-7 font-semibold">Publish anywhere your audience is</h2>
      <p className="mt-[16px] text-[16px] leading-6 text-rk-text-2">Send finished content to your favorite platforms without copy-pasting.</p>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {apps.map((a) => (
          <div key={a} className="flex h-[72px] items-center justify-center rounded-lg border border-rk-border text-[16px] font-medium text-rk-text-2">
            {a}
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={`${card} w-[959px] px-12 pt-[47px] pb-[52px]`}>
      <h2 className="text-center text-[24px] leading-7 font-semibold">Frequently asked questions</h2>
      <div className="mt-[33px] flex flex-col gap-1">
        {faq(brand.name).map((f, i) => (
          <div key={f.q} className="rounded-sm bg-[#f3f5f5]">
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex h-[56px] w-full items-center gap-[7px] pl-[19px] text-left text-[16px] font-semibold text-[#484a54]">
              <ChevronRight width={14} height={14} strokeWidth={2} className={`transition-transform ${open === i ? "rotate-90" : ""}`} />
              {f.q}
            </button>
            {open === i && <p className="-mt-2 pr-6 pb-4 pl-[43px] text-[16px] leading-6 text-rk-text-2">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Shell({ children, help = true }: { children: ReactNode; help?: boolean }) {
  return (
    <AppShell section="content" project search={{ kind: "goto" }} footer={false} enterprise={false} help={help ? "chat" : "none"}>
      {children}
      <CenteredFooter />
    </AppShell>
  );
}

function BottomSections({ onTrial }: { onTrial: () => void }) {
  return (
    <div className="mt-6 flex flex-col gap-[25px]">
      <JoinCard onTrial={onTrial} />
      <Testimonials />
      <Integrations />
      <Faq />
    </div>
  );
}

export function ContentDashboard() {
  const [trial, setTrial] = useState(false);
  return (
    <Shell>
      <div className="pt-[17px]">
        <section className={`${card} w-[959px] px-12 pt-[45px]`}>
          <div className="text-center">
            <div className="text-[20px] leading-7 text-[#6c6e79]">The {brand.name} Content Toolkit</div>
            <h1 className="mt-[10px] text-[40px] leading-[48px] font-semibold tracking-[-0.02em] whitespace-nowrap">Your content, anywhere your audience searches</h1>
            <p className="mt-[12px] text-[16px] leading-6">
              Create, optimize, and repurpose content that performs—across SEO, AI search, social, and even email.
              <br />
              All powered by {brand.name} data.
            </p>
            <TrialButton onClick={() => setTrial(true)} className="mt-[33px]" />
            <TrialNote className="mt-[12px]" />
          </div>
          <div className="mt-[50px] -mx-[1px]">
            <DashboardHero />
          </div>
          <div className="pt-[96px] pb-[70px] text-center">
            <h2 className="mx-auto w-[620px] text-[32px] leading-10 font-semibold">One toolkit for every step of your content workflow</h2>
            <p className="mx-auto mt-4 w-[600px] text-[16px] leading-6 text-rk-text-2">Research topics, write, optimize for Google and AI search, and repurpose for every channel—without switching tools.</p>
            <div className="mt-8 flex justify-center gap-3">
              {["Research", "Write", "Optimize", "Repurpose", "Publish"].map((s, i) => (
                <span key={s} className="flex h-9 items-center gap-2 rounded-full bg-[#f4f0fe] px-4 text-[14px] font-medium text-[#6f4bfc]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[12px]">{i + 1}</span>
                  {s}
                </span>
              ))}
            </div>
          </div>
          {features.map((f, i) => (
            <FeatureRow key={f.title} f={f} flip={i % 2 === 0} />
          ))}
          <Tiles />
        </section>
        <BottomSections onTrial={() => setTrial(true)} />
      </div>
      <TrialModal open={trial} onClose={() => setTrial(false)} />
    </Shell>
  );
}

const heroes: Record<ToolKey, () => React.ReactElement> = { generator: GeneratorHero, optimizer: OptimizerHero, topics: TopicHero, brief: BriefHero };

export function ContentTool({ tool }: { tool: ToolKey }) {
  const [trial, setTrial] = useState(false);
  const t = tools[tool];
  const Hero = heroes[tool];
  const wide = tool === "topics";
  return (
    <Shell help={!wide}>
      <div className={wide ? "pt-[25px]" : "pt-[17px]"}>
        <section className={`${card} ${wide ? "w-[980px] px-[49px]" : "w-[959px] px-12"} pt-[43px] pb-[50px] text-center`}>
          <h1 className="text-[37px] leading-[48px] font-semibold tracking-[-0.01em] whitespace-nowrap">{t.title}</h1>
          <p className="mt-[12px] text-[16px] leading-6">{t.subtitle}</p>
          <TrialButton onClick={() => setTrial(true)} className="mt-[33px]" />
          <TrialNote className="mt-[12px]" />
          <div className="mt-[50px] -mx-[1px] text-left">
            <Hero />
          </div>
        </section>
        <section className={`${card} mt-[18px] w-[959px] px-12 pt-[48px]`}>
          {t.featureIdx.map((idx, i) => (
            <FeatureRow key={idx} f={features[idx]} flip={i % 2 === 1} />
          ))}
        </section>
        <BottomSections onTrial={() => setTrial(true)} />
      </div>
      <TrialModal open={trial} onClose={() => setTrial(false)} />
    </Shell>
  );
}
