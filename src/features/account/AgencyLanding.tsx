"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/gaps/common";
import { Info } from "@/components/ui/primitives";
import { ChevronDown } from "@/components/ui/icons";

const O = "#ff642d";

function Stars() {
  return (
    <span className="flex gap-[3px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 16 16" width={14} height={14}>
          <path d="m8 1.5 2 4.2 4.6.6-3.4 3.2.9 4.5L8 11.8l-4.1 2.2.9-4.5L1.4 6.3 6 5.7z" fill={i < 4 ? "#ffb400" : "none"} stroke="#ffb400" strokeWidth={1.2} strokeLinejoin="round" />
        </svg>
      ))}
    </span>
  );
}

function Ico({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} className="shrink-0 text-[#8b8d8c]">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AgencyArt() {
  const ghost = "absolute rounded-lg bg-[#f7f7f9] shadow-[0_1px_4px_rgba(0,0,0,0.05)]";
  const nav = [
    { t: "Dashboard", y: 1, d: "M2 13h12M3 11l3-4 3 2 4-5" },
    { t: "Page Optimization", y: 42, d: "M3 13l1-3 7-7 2 2-7 7zM9 5l2 2" },
    { t: "Messages", y: 88, d: "M2 4h12v8H2zM2 4l6 5 6-5" },
  ];
  return (
    <div className="mx-auto h-[276px] w-[672px] overflow-hidden rounded-xl border border-[#e7e8e8] bg-[#ededf1] text-left">
      <div className="relative h-[317px] w-[774px]" style={{ zoom: 1 / 1.1524 }}>
        {nav.map((n) => (
          <div key={n.t} style={{ top: n.y }} className={`${ghost} left-0 flex h-[40px] w-[133px] items-center gap-[10px] rounded-l-none pl-[2px] text-[11px] font-semibold text-[#b7b9c4]`}>
            <Ico d={n.d} />
            {n.t}
          </div>
        ))}
        <div className={`${ghost} -top-[8px] left-[158px] h-[22px] w-[454px]`} />
        <div className={`${ghost} top-[1px] left-[631px] h-[89px] w-[150px] px-[21px] pt-[12px] text-[11px] font-semibold text-[#9ea1ad]`}>
          Page Summary
          <svg viewBox="0 0 130 44" width={130} height={44} className="mt-[4px]">
            <path d="M0 42 14 22l10-6 10 10 14-6 12 12 16-26 8 14 14-4 12-20 10 12 10-4" fill="none" stroke="#7fb8f0" strokeWidth={1.4} />
          </svg>
        </div>
        <div className={`${ghost} top-[260px] left-[648px] h-[80px] w-[130px] px-[22px] pt-[10px] text-[11px] font-semibold whitespace-nowrap text-[#9ea1ad]`}>
          Leads Summary
          <div className="mt-[10px] ml-[6px] h-[64px] w-[64px] rounded-full border-[12px] border-[#d8c2f7] border-r-[#ffd66e] border-b-[#5ed2b0]" />
        </div>
        <div className="absolute top-[34px] left-[158px] h-[248px] w-[454px] rounded-xl bg-[#f2f2f5] shadow-[0_2px_10px_rgba(0,0,0,0.05)]" />
        <div className="absolute top-[40px] left-[166px] h-[234px] w-[440px] rounded-lg bg-white shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
          <div className="absolute top-[22px] left-[20px] flex h-[56px] w-[56px] items-center justify-center rounded-md bg-[#5b2bbd]">
            <span className="h-[30px] w-[30px] rounded-full bg-[#b58af2]" />
            <span className="-ml-[18px] h-[26px] w-[20px] -rotate-12 rounded-tl-full rounded-br-full bg-[#2fc28c]" />
          </div>
          <div className="absolute top-[18px] left-[92px] text-[21px] leading-[30px] font-semibold tracking-[-0.01em]">Your Agency</div>
          <div className="absolute top-[48px] left-[92px] text-[12px] text-[#8b8d8c]">Let’s Grow Together</div>
          <div className="absolute top-[18px] left-[363px] flex h-[56px] w-[56px] items-center justify-center rounded-full border-[5px] border-[#c9a4f7] text-[18px] font-bold">4.9</div>
          <span className="absolute top-[81px] left-[92px] flex h-[24px] items-center gap-1 rounded-full bg-[#a7ecd4] px-[8px] text-[10.5px] font-semibold text-[#1d4d3c]">
            <svg viewBox="0 0 12 12" width={11} height={11}>
              <path d="M6 1 2 2.5V6c0 2.5 2 4 4 5 2-1 4-2.5 4-5V2.5z" fill="none" stroke="#007c65" strokeWidth={1.2} />
            </svg>
            Proven track record
          </span>
          <span className="absolute top-[86px] left-[236px]">
            <Stars />
          </span>
          <span className="absolute top-[85px] left-[326px] text-[11px] text-[#484a49]">10 reviews</span>
          <div className="absolute top-[124px] left-[92px] h-[6px] w-[309px] rounded bg-[#ebebef]" />
          <div className="absolute top-[142px] left-[92px] h-[6px] w-[309px] rounded bg-[#ebebef]" />
          <div className="absolute top-[159px] left-[92px] h-[6px] w-[178px] rounded bg-[#ebebef]" />
          <div className="absolute top-[175px] left-[92px] grid grid-cols-[170px_1fr] gap-y-[5px] text-[12px] leading-[18px] whitespace-nowrap text-[#484a49]">
            <span className="flex items-center gap-[6px]">
              <Ico d="M8 14s-4.5-4-4.5-7.5a4.5 4.5 0 0 1 9 0C12.5 10 8 14 8 14zM8 8a1.5 1.5 0 1 0 0-3" />
              New York, United States
            </span>
            <span className="flex items-center gap-[6px]">
              <Ico d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" />
              Advertising, SEO <span className="text-[#a9abaa]">+10</span>
            </span>
            <span className="flex items-center gap-[6px]">
              <Ico d="M2 5h12v8H2zM6 5V3h4v2M2 9h12" />
              B2B Services, Ecommerce <span className="text-[#a9abaa]">+5</span>
            </span>
            <span className="flex items-center gap-[6px]">
              <Ico d="M5 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM9 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              $5,000+
            </span>
          </div>
        </div>
        <div className="absolute top-[106px] left-[591px] flex w-[157px] rotate-[1deg] flex-col whitespace-nowrap gap-[8px] rounded-lg bg-[#f2f2f5] px-[10px] pt-[8px] pb-[6px] text-[12.5px] font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
          <div className="flex h-[33px] items-center gap-[10px] rounded-md bg-white px-[20px]">
            <Ico d="M2.5 4h11v9.5h-11zM2.5 7h11M5.5 2.5v3M10.5 2.5v3" />
            Schedule call
          </div>
          <div className="flex h-[32px] items-center gap-[10px] rounded-md bg-white px-[12px]">
            <Ico d="M4.5 2.5h7v11L8 11l-3.5 2.5z" />
            Add to Favorites
          </div>
          <div className="flex h-[37px] items-center gap-[10px] rounded-md px-[12px] text-white" style={{ background: O }}>
            <svg viewBox="0 0 16 16" width={15} height={15}>
              <path d="M2 4h12v8H2zM2 4l6 5 6-5" fill="none" stroke="#fff" strokeWidth={1.4} strokeLinejoin="round" />
            </svg>
            Send message
          </div>
        </div>
        <div className="absolute top-[150px] -left-[6px] w-[222px] rotate-[-3deg] rounded-md border-[2px] border-dashed bg-[#fff8ec] p-[7px] pl-[10px]" style={{ borderColor: O }}>
          <div className="rounded bg-white px-[15px] pt-[16px] pb-[20px]">
            <div className="text-[14.5px] leading-5 font-semibold">You have a new lead</div>
            <div className="mt-[4px] text-[12.5px] leading-[19px]">“Hello, agency! I need help with SEO...”</div>
            <div className="mt-[10px] inline-flex h-[36px] items-center rounded-md px-[20px] text-[12.5px] font-semibold text-white" style={{ background: O }}>
              Accept and chat
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  { title: "Create your agency profile", text: "Showcase your services, industries, and budgets so the right clients can find you." },
  { title: "Get matched with leads", text: "Receive requests from business owners and executives looking for expert help." },
  { title: "Chat and close deals", text: "Answer leads directly in the platform and turn conversations into contracts." },
];

const faq = [
  { q: "Who can join Agency Partners?", a: "Any digital agency or freelancer offering marketing services can create a profile and start receiving leads." },
  { q: "How are leads matched with my agency?", a: "Leads are matched based on the services, industries, locations, and budgets listed in your profile." },
  { q: "Can I cancel Lead Generation anytime?", a: "Yes. You can remove the Lead Generation limit from your subscription at any time." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-8 flex flex-col gap-2">
      {faq.map((f, i) => (
        <div key={f.q} className="rounded-lg bg-[#f5f6f6]">
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left text-[16px] font-semibold">
            {f.q}
            <ChevronDown className={open === i ? "rotate-180" : ""} />
          </button>
          {open === i && <p className="px-5 pb-4 text-[14px] leading-5 text-rk-text-2">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

export function AgencyLanding() {
  const [got, setGot] = useState(false);
  const green = "inline-flex h-10 items-center rounded-md bg-[#009f81] px-[13px] text-[17px] font-medium text-white hover:bg-[#007c65]";
  return (
    <AppShell section="home" search={{ kind: "goto" }} footer={false}>
      <div className="mx-auto w-[722px] pt-6">
        <section className="rounded-lg border border-[#e7e8e8] bg-white px-4 pt-[35px] pb-[40px] text-center">
          <h1 className="text-[33px] leading-[40px] font-semibold tracking-[-0.025em]">
            Expand Your Brand Reach and Get Inbound Leads
            <br />
            for Your Digital Agency
          </h1>
          <p className="mx-auto mt-[27px] w-[540px] text-[16px] leading-6">
            Set up your agency profile and get matched with business owners and executives looking to hire expert help for their marketing projects.
          </p>
          <div className="mt-[24px] flex items-center justify-center gap-[26px]">
            <button type="button" onClick={() => setGot(true)} className={green}>
              {got ? "Lead Generation added" : "Get Lead Generation"}
            </button>
            <a href="#how" className="text-[17px] text-[#0067c7] hover:underline">
              Explore all features
            </a>
          </div>
          <p className="mx-auto mt-[12px] w-[520px] text-[14px] leading-5 text-rk-muted">
            By clicking “Get Lead Generation,” you agree that the additional limit will be added to your subscription for $90/month.
          </p>
          <p className="mt-[7px] flex items-center justify-center gap-[10px] text-[14px] leading-5 font-semibold">
            Today’s charge: $104.2 (incl. Tax)
            <Info />
          </p>
          <div className="mt-[42px]">
            <AgencyArt />
          </div>
        </section>
        <section id="how" className="mt-6 rounded-lg border border-[#e7e8e8] bg-white px-10 py-12">
          <h2 className="text-center text-[28px] leading-9 font-semibold">How Agency Partners works</h2>
          <div className="mt-8 grid grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-lg bg-[#f5f6f6] p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-bold text-white" style={{ background: O }}>
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[16px] leading-6 font-semibold">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-5 text-rk-text-2">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-6 rounded-lg border border-[#e7e8e8] bg-white px-10 py-12">
          <h2 className="text-center text-[28px] leading-9 font-semibold">Frequently asked questions</h2>
          <Faq />
        </section>
        <section className="mt-6 rounded-lg bg-[#2b2e38] px-10 py-12 text-center text-white">
          <h2 className="text-[28px] leading-9 font-semibold">Grow your agency with {brand.name}</h2>
          <p className="mt-3 text-[16px] leading-6 text-[#d6d8e1]">Join the agencies already receiving inbound leads every month.</p>
          <button type="button" onClick={() => setGot(true)} className={`${green} mt-6`}>
            {got ? "Lead Generation added" : "Get Lead Generation"}
          </button>
        </section>
      </div>
      <CenteredFooter />
    </AppShell>
  );
}
