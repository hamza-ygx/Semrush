"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { LogoIcon } from "@/components/icons";
import { ChevronRight, ExternalIcon, InfoIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { dashboardFeatures, dashboardHero, emailStats, exampleDomains, exampleMentions, heroTitleCls, journalists, viewing } from "./data";
import { DrawnAvatar } from "./illustrations";
import { FeatureList, PrHero } from "./Landing";

function WpLogo() {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#18a5e8] text-[7px] font-bold tracking-[-0.04em] text-white">WP</span>
  );
}

function AnalyzeForm() {
  const [value, setValue] = useState("");
  const router = useRouter();
  return (
    <form
      className="mt-[31px] flex w-[690px]"
      onSubmit={(e) => {
        e.preventDefault();
        const d = value.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
        if (d) router.push(`${routes.aipr.dashboard}?domain=${encodeURIComponent(d)}`);
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your website"
        aria-label="Enter your website"
        className="h-12 flex-1 rounded-l-md border border-r-0 border-[#dcdcdc] bg-white px-[13px] text-[16px] text-rk-text outline-none placeholder:text-[#8a8c96] focus:border-[#7a86f2]"
      />
      <button type="submit" className="h-12 w-[87px] rounded-r-md bg-[#1b1d1b] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
        Analyze
      </button>
    </form>
  );
}

export function PrDashboard({ domain }: { domain?: string }) {
  if (domain) return <PrExample domain={domain} />;
  return (
    <div className="pb-[155px]">
      <PrHero title={dashboardHero.title} subtitle={dashboardHero.subtitle} className="pt-[143px] pb-[144px]">
        <AnalyzeForm />
        <div className="mt-3 flex w-[690px] flex-col gap-3">
          {exampleDomains.map((d) => (
            <Link
              key={d.domain}
              href={`${routes.aipr.dashboard}?domain=${d.domain}`}
              className="flex h-[46px] items-center rounded-lg border border-[#4a5260] pr-[33px] pl-[32px] text-[15px] text-[#2d2f37] hover:bg-white/40"
            >
              {d.logo === "wp" ? <WpLogo /> : <LogoIcon width={16} height={16} />}
              <span className="ml-[9px] flex-1 text-left">{d.domain}</span>
              <ChevronRight width={14} height={14} strokeWidth={2.2} className="text-[#1b1e1a]" />
            </Link>
          ))}
        </div>
      </PrHero>
      <FeatureList features={dashboardFeatures} gap={56} />
    </div>
  );
}

function Section({ label, title, teal, children, className = "" }: { label: string; title: ReactNode; teal?: boolean; children: ReactNode; className?: string }) {
  return (
    <section className={`mx-5 rounded-lg px-8 pt-[55px] pb-14 ${teal ? "bg-[#dcebe7]" : ""} ${className}`}>
      <div className="text-[14px] leading-5 font-medium tracking-[0.01em] text-[#383838] uppercase">{label}</div>
      <h2 className="mt-[19px] max-w-[660px] text-[37px] leading-[40px] text-[#383838]">{title}</h2>
      <div className="mt-[34px]">{children}</div>
    </section>
  );
}

function TryIt({ text, href }: { text: string; href: string }) {
  return (
    <div className="flex flex-col items-center">
      <p className="mt-[33px] text-[16.5px] leading-5 text-[#484a49]">{text}</p>
      <Link href={href} className="mt-[43px] flex h-10 items-center rounded-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
        Try it now
      </Link>
    </div>
  );
}

function OutletLogo({ kind }: { kind: "pc" | "tc" | "fc" }) {
  if (kind === "pc")
    return (
      <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full bg-[#e5102d] leading-none font-black text-white">
        <span className="text-[19px] tracking-[-0.06em]">PC</span>
        <span className="text-[7px]">MAG</span>
      </span>
    );
  if (kind === "tc")
    return (
      <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-full bg-[#0a9e3c] leading-none font-black text-white">
        <span className="text-[13px] tracking-[-0.06em]">TC</span>
        <span className="text-[5.5px]">TechCrunch</span>
      </span>
    );
  return <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111] text-[15px] font-black text-white">FC</span>;
}

function Ext({ className = "" }: { className?: string }) {
  return <ExternalIcon width={16} height={16} className={`inline-block shrink-0 text-[#a9abaa] ${className}`} />;
}

function JournalistCard({ j }: { j: (typeof journalists)[number] }) {
  return (
    <div className="rounded-lg bg-white px-[21px] pt-[17px] pb-[17px] shadow-[0_0_0_1px_rgba(25,27,35,0.04)]">
      <div className="flex h-11 items-start">
        <div className="flex w-[442px] items-center gap-2">
          <DrawnAvatar size={44} tone={j.tone} hair="#4a3426" bg="#efe6dc" />
          <div className="leading-[22px]">
            <div className="flex items-center gap-[7px]">
              <Link href={routes.aipr.contactSearch} className="text-[16px] font-semibold text-rk-link hover:underline">
                {j.name}
              </Link>
              <button type="button" aria-label={`Add ${j.name} to list`} className="text-[#8a8c96] hover:text-rk-text">
                <svg viewBox="0 0 16 16" width={16} height={16}>
                  <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth={1.3} />
                  <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth={1.3} />
                </svg>
              </button>
            </div>
            <div className="text-[14px] text-rk-text">{j.role}</div>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2">
          <OutletLogo kind={j.logo} />
          <div className="leading-[21px]">
            <Link href={routes.aipr.aiCitedMedia} className="block text-[16px] font-semibold text-rk-link hover:underline">
              {j.outlet}
            </Link>
            <a href={`https://${j.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[14px] text-rk-link hover:underline">
              {j.domain}
              <Ext />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-[7px] text-[14px] leading-5 text-rk-text">
            AI authority
            <InfoIcon width={14} height={14} className="text-[#a9abaa]" />
          </div>
          <span className="mt-[5px] rounded-full bg-[#d0f2e7] px-[9px] text-[12.5px] leading-5 text-[#006f55]">High</span>
        </div>
      </div>
      <p className="mt-[14px] ml-[28px] text-[14px] leading-5 text-rk-text">{j.text}</p>
      <a href={`https://${j.domain}`} target="_blank" rel="noreferrer" className="mt-[11px] ml-[28px] flex w-fit items-center gap-[6px] text-[14px] leading-5 text-rk-link hover:underline">
        {j.article}
        <Ext />
      </a>
    </div>
  );
}

function MentionCard({ m }: { m: (typeof exampleMentions)[number] }) {
  return (
    <div className="h-[203px] rounded-lg bg-white px-5 pt-[20px]">
      <div className="text-[14px] leading-5 text-rk-text">{m.source}</div>
      <div className="mt-[6px] line-clamp-2 text-[16px] leading-6 font-semibold text-rk-text">{m.title}</div>
      <div className="mt-[4px] line-clamp-3 text-[14px] leading-5 text-[#484a49]">{m.text}</div>
      <div className="mt-[3px] flex items-center gap-2 text-[14px] leading-5 text-rk-text">
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <circle cx="8" cy="8" r="6.6" fill="none" stroke="#1b1e1a" strokeWidth={1.6} />
          <path d="M3.5 5.5c1.5.3 2.2 1 2 2.3-.2 1.2 1 1.6 1.2 2.6.2.9-.3 1.8-.3 2.7M9.5 2c-.3 1.2.3 2 1.4 2.2 1 .2 1.2 1 .7 1.8-.5.9.2 1.8 1.2 1.6.8-.2 1.5.2 1.9.9" fill="none" stroke="#1b1e1a" strokeWidth={1.3} />
        </svg>
        {m.date}
      </div>
    </div>
  );
}

function StatCard({ s }: { s: (typeof emailStats)[number] }) {
  return (
    <div className="rounded-lg bg-white px-6 pt-5 pb-5">
      <div className="text-[14px] leading-5 text-[#6a6c6a]">{s.label}</div>
      <div className="mt-1 text-[32px] leading-10 font-semibold text-rk-text">{s.value}</div>
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-3 h-[40px] w-full">
        <path d="M0 26 L15 22 L30 24 L45 14 L60 17 L75 8 L90 11 L100 4" fill="none" stroke="#8e92ec" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </svg>
      {s.rows.length > 0 && (
        <div className="mt-[14px] space-y-3 border-t border-[#edefef] pt-[14px]">
          {s.rows.map(([l, v]) => (
            <div key={l} className="flex items-center justify-between gap-2 text-[16px] leading-6 text-rk-text">
              <span className="max-w-[118px]">{l}</span>
              <span className="text-[#6a6c6a]">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PrExample({ domain }: { domain: string }) {
  const brandName = domain === "warbyparker.com" ? "Warby Parker Inc." : domain.replace(/\..*$/, "");
  return (
    <div className="pb-[114px]">
      <h1 className={`mt-[26px] text-center ${heroTitleCls}`}>{dashboardHero.title}</h1>
      <Section teal label="Journalists and outlets" title={`Journalists covering topic related to ${domain}`} className="mt-[30px]">
        <div className="space-y-[14px]">
          {journalists.slice(0, 2).map((j) => (
            <JournalistCard key={j.name} j={j} />
          ))}
        </div>
        <TryIt text="To see more journalists, start free trial." href={routes.aipr.contactSearch} />
      </Section>
      <Section label="Media monitoring" title={`Latest media mentions related to ${domain}`} className="mt-16">
        <div className="flex gap-[17px]">
          <div className="h-[426px] w-[391px] shrink-0 rounded-lg bg-[#e6d3fd] p-5">
            <div className="flex gap-4">
              {[
                ["~813", "mentions found"],
                ["~37", "AI-cited mentions"],
              ].map(([v, l]) => (
                <div key={l} className="flex h-[99px] flex-1 flex-col items-center rounded-lg bg-white pt-[12px]">
                  <div className="text-[52px] leading-[52px] font-medium tracking-[-0.02em] text-[#353535]">{v}</div>
                  <div className="mt-[3px] text-[14px] leading-5 text-[#353535]">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-white px-3 pt-[11px] pb-[12px] text-[14px] leading-5">
              <div className="text-[#6a6c6a]">Industry:</div>
              <div className="mt-2 text-rk-text">Eyewear retail</div>
              <div className="mt-[20px] text-[#6a6c6a]">Mentions containing:</div>
              <span className="mt-[8px] inline-block rounded-full bg-[#ececec] px-[9px] py-[4px] leading-[19px] text-[#484a49]">{brandName}</span>
              <div className="mt-[20px] text-[#6a6c6a]">Sources:</div>
              <div className="mt-2 text-rk-text">Online news, Blogs, Discussions</div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5">
            {exampleMentions.map((m) => (
              <MentionCard key={m.title} m={m} />
            ))}
          </div>
        </div>
        <TryIt text="To see more mentions, start free trial." href={routes.aipr.mediaMonitoring} />
      </Section>
      <Section teal label="Email analytics" title="Measure how journalists engage with your pitches" className="mt-16">
        <div className="rounded-lg bg-white px-6 py-5">
          <div className="text-[14px] leading-5 text-[#6a6c6a]">Pitch</div>
          <div className="mt-1 text-[18px] leading-6 font-semibold text-rk-text">68% of travelers report better sleep with earplugs</div>
          <div className="mt-1 text-[14px] leading-5 text-[#484a49]">Sent to 25 journalists covering {domain.replace(/\..*$/, "")}-related topics · Sep 24, 2026</div>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-3">
          {emailStats.map((s) => (
            <StatCard key={s.label} s={s} />
          ))}
        </div>
        <div className="mt-8 rounded-lg bg-white px-6 pt-5 pb-[21px]">
          <div className="text-[20px] leading-[24px] font-semibold text-rk-text">Pitch viewing time</div>
          <div className="mt-[14px] flex h-[52px] gap-[2px] overflow-hidden rounded-[3px]">
            {viewing.map((v) => (
              <div key={v.label} style={{ width: `${v.pct}%`, background: v.color }} />
            ))}
          </div>
          <div className="mt-[28px] flex gap-7 text-[16px] leading-5 text-rk-text">
            {viewing.map((v) => (
              <span key={v.label} className="flex items-center gap-2">
                <i className="h-4 w-4 rounded-full" style={{ background: v.color }} />
                {v.label}
                <span className="-ml-1 text-[#6a6c6a]">({v.pct}%)</span>
              </span>
            ))}
          </div>
        </div>
        <TryIt text="Send pitch to see email analytics." href={routes.aipr.yourEmails} />
      </Section>
    </div>
  );
}
