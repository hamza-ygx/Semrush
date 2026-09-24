"use client";

import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { Modal } from "@/components/ui/Modal";
import { routes } from "@/config/routes";
import { CafeScene, GbpProfileCard } from "./art";
import { MapRankMockup } from "./StartMockups";
import { GbpStoreIcon, HeroMap, PrimaryButton } from "./ui";

const hl = (t: string) => <span className="bg-[#f3e9fd]">{t}</span>;

export function ConnectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Connect your Google Business Profile" width={520}>
      <p className="text-[14px] leading-5 text-rk-text-2">Sign in with the Google account that manages your business to import your locations.</p>
      <div className="mt-6 flex gap-3">
        <PrimaryButton href={routes.local.scan} className="h-10 px-5 text-[14px]">
          Continue with Google
        </PrimaryButton>
        <button type="button" onClick={onClose} className="h-10 rounded-[6px] border border-rk-border-strong px-5 text-[14px] hover:bg-rk-bg">
          Cancel
        </button>
      </div>
    </Modal>
  );
}

function ConnectButton({ className = "", onClick, icon = true }: { className?: string; onClick: () => void; icon?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex items-center justify-center gap-[9px] rounded-[6px] bg-[#a35eff] font-semibold text-white hover:bg-[#9048f2] ${className}`}>
      {icon && <GbpStoreIcon size={18} />}
      Connect your business
    </button>
  );
}

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-start">
    <span className="w-[79px] shrink-0 pt-[4px] text-[7.5px] text-[#1f1f24]">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);
const Input = ({ v, w = 172 }: { v: string; w?: number }) => (
  <div className="flex h-[19px] items-center truncate rounded-[3px] border border-[#c9cacf] px-[5px] text-[7.5px] text-[#1f1f24]" style={{ width: w }}>
    {v}
  </div>
);

function HoursMockup() {
  return (
    <div className="relative h-[423px] w-[440px]">
      <div className="absolute top-[40px] left-[-95px] h-[343px] w-[360px] rounded-full bg-[#e8f4fe]" />
      <div className="absolute top-0 left-0 h-[255px] w-[290px] overflow-hidden rounded-[10px] bg-white px-[12px] pt-[14px] shadow-[0_4px_20px_rgba(20,30,50,0.12)]">
        <div className="text-[9px] font-semibold text-[#1f1f24]">Business hours</div>
        <div className="mt-[6px] h-[120px] rounded-[4px] bg-[#f4f5f7] px-[10px] pt-[8px] text-[7px] text-[#5f6068]">
          <div className="flex gap-[18px] text-[#2d6fe0]">
            <span>Edit all days</span>
            <span>Edit Mon-Fri</span>
            <span>Edit Sat-Sun</span>
          </div>
          {["Monday", "Tuesday", "Wednesday"].map((d, i) => (
            <div key={d} className="mt-[8px] flex items-center gap-[20px]">
              <span className="w-[30px]">{d}</span>
              <span className="rounded-[3px] border border-[#c9cacf] bg-white px-[6px] py-[2px]">{i ? "Open ⌄" : "24 hours ⌄"}</span>
            </div>
          ))}
        </div>
        <div className="mt-[8px] text-[9px] font-semibold text-[#1f1f24]">Holiday hours</div>
        <div className="mt-[6px] rounded-[4px] bg-[#f4f5f7] px-[10px] py-[8px] text-[7px] text-[#5f6068]">
          <span className="rounded-[3px] border border-[#c9cacf] bg-white px-[6px] py-[2px]">Jan 18, 2024</span>
          <div className="mt-[8px] flex gap-[6px]">
            <span className="rounded-[3px] border border-[#c9cacf] bg-white px-[6px] py-[2px]">Open ⌄</span>
            <span className="rounded-[3px] border border-[#c9cacf] bg-white px-[6px] py-[2px]">09:00</span>
          </div>
        </div>
      </div>
      <div className="absolute top-[70px] left-[143px] h-[311px] w-[290px] rounded-[10px] bg-white px-[19px] pt-[12px] shadow-[0_4px_24px_rgba(20,30,50,0.16)]">
        <div className="text-center text-[14px] font-semibold text-[#1f1f24]">Business details</div>
        <div className="mt-[2px] text-center text-[7.5px] text-[#3a3b40]">Collected from your Google account.</div>
        <div className="mt-[10px] flex gap-[14px] border-b border-[#e0e1e6] text-[7.5px] text-[#1f1f24]">
          <span className="border-b-2 border-[#2d6fe0] pb-[5px]">General Info</span>
          <span>Business Categories</span>
          <span>Description</span>
          <span>Hours</span>
        </div>
        <div className="mt-[8px] flex flex-col gap-[6px]">
          <Field label="Business name">
            <Input v={brand.name} />
          </Field>
          <Field label="Address">
            <Input v="Kungsgatan 12, Stockholm" />
          </Field>
          <Field label="Service area">
            <div className="flex flex-col gap-[4px] text-[7.5px] text-[#1f1f24]">
              <span>☑ Hide our address</span>
              <span>☑ We deliver to local customers</span>
              <Input v="City, country, region, postal code, etc." w={148} />
              <span className="w-fit rounded-full border border-[#c9cacf] px-[5px] text-[6.5px]">New Westminster, BC, Canada ✕</span>
            </div>
          </Field>
          <Field label="Phone number">
            <Input v="+46 8 000 00 00" w={98} />
          </Field>
          <Field label="Website">
            <Input v={`https://www.${brand.domain}/listings-manag...`} />
          </Field>
        </div>
      </div>
    </div>
  );
}

function GbpInsightsMockup() {
  return (
    <div className="relative h-[300px] w-[440px]">
      <div className="absolute top-[-110px] left-[295px] h-[260px] w-[240px] rounded-[48%] bg-[#fde8f1]" />
      <div className="absolute inset-0 rounded-[12px] bg-white px-[16px] pt-[22px] shadow-[0_4px_24px_rgba(20,30,50,0.12)]">
        <div className="text-[18px] font-semibold text-[#6b6c72]">Google Business Profile Insights</div>
        <div className="mt-[14px] flex h-[53px] items-center rounded-[8px] border border-[#e3e4e8] text-[13px]">
          {[
            ["Views", "55.1K", "+28%", "#0f8a5f"],
            ["Actions", "345", "-2.5%", "#d1273b"],
            ["Average Rating", "4.8", "↑0.3", "#0f8a5f"],
          ].map(([l, v, d, c], i) => (
            <div key={l} className={`flex-1 pl-[18px] ${i ? "border-l border-[#e3e4e8]" : ""}`}>
              <div className="text-[#6b6c72]">{l}</div>
              <div className="font-semibold text-[#1f1f24]">
                {v} <span style={{ color: c }} className="font-normal">{d}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[14px] flex gap-[13px]">
          {[
            ["Google Search Views", "+26%"],
            ["Google Maps Views", "+40%"],
          ].map(([t, u]) => (
            <div key={t} className="h-[140px] flex-1 rounded-[8px] border border-[#e3e4e8] px-[10px] pt-[8px] text-[12px]">
              <div className="border-b border-[#e3e4e8] pb-[6px] font-semibold text-[#6b6c72]">{t}</div>
              <div className="mt-[6px] text-[11px] text-[#76777d]">
                <span className="text-[#2bb0f0]">●</span> 2024 <span className="text-[#c9cacf]">●</span> 2023 <span className="font-semibold text-[#0f8a5f]">{u}</span>
              </div>
              <svg viewBox="0 0 180 50" className="mt-[10px] w-full">
                <path d="M0 40 15 34 30 38 45 26 60 30 75 22 90 28 105 20 120 26 135 16 150 22 165 10 180 14" fill="none" stroke="#2bb0f0" strokeWidth={2} />
                <path d="M0 46 20 44 40 46 60 42 80 46 100 44 120 46 140 42 160 44 180 42" fill="none" stroke="#c9cacf" strokeWidth={2} />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PostsMockup() {
  return (
    <div className="h-[300px] w-[440px] rounded-[12px] bg-white p-[20px] shadow-[0_4px_24px_rgba(20,30,50,0.12)]">
      <div className="text-[18px] font-semibold text-[#6b6c72]">Scheduled posts</div>
      {["Weekend brunch is back!", "New seasonal menu", "Happy hour 4–6 pm"].map((t, i) => (
        <div key={t} className="mt-[14px] flex items-center gap-[12px] rounded-[8px] border border-[#e3e4e8] p-[10px]">
          <span className="h-[44px] w-[44px] rounded-[6px]" style={{ background: ["#e5a83b", "#6aa84f", "#c0492b"][i] }} />
          <div className="flex-1">
            <div className="text-[14px] font-semibold text-[#1f1f24]">{t}</div>
            <div className="text-[12px] text-[#76777d]">{["Fri, 09:00", "Mon, 10:30", "Wed, 16:00"][i]}</div>
          </div>
          <span className="rounded-full bg-[#e5f3fd] px-[8px] text-[12px] text-[#2d6fe0]">Scheduled</span>
        </div>
      ))}
    </div>
  );
}

export function GbpOptimizationPage() {
  const [modal, setModal] = useState(false);
  const open = () => setModal(true);
  const sections = [
    {
      t: <>Get unique insights into your business’s local search presence</>,
      b: [
        <>{hl("Track your profile appearances in local search results and on Google Maps")}, with data segmented by desktop and mobile</>,
        <>Analyze performance by day, week, or month, and compare year-to-year results with {hl("over 24 months of historical data access")} (four times more than GBP’s own performance report)</>,
        <>{hl("Monitor key engagement metrics")} such as site visits, calls, direction requests, and bookings</>,
      ],
      m: <GbpInsightsMockup />,
    },
    {
      t: <>Publish posts and reply to reviews in a few clicks</>,
      b: [<>{hl("Create posts with AI")} and schedule them for weeks ahead</>, <>Reply to reviews from one place and {hl("never miss a new review")}</>],
      m: <PostsMockup />,
    },
    {
      t: <>See how you rank on the map against competitors</>,
      b: [<>{hl("Track your rankings")} for every keyword across a grid of locations</>, <>Find out who outranks you and {hl("where you can win")}</>],
      m: (
        <div className="h-[459px] w-[440px]">
          <MapRankMockup />
        </div>
      ),
    },
  ];
  return (
    <div className="pb-[155px]">
      <section className="relative h-[504px] overflow-hidden bg-[#410f7c]">
        <HeroMap variant={1} />
        <div className="relative pt-[33px] text-center text-[16px] leading-6 text-[#f7e6ff]">GBP Optimization</div>
        <h1 className="relative mt-[35px] pl-[52px] text-[48px] leading-[56px] font-bold tracking-[-0.2px] text-white">
          <span className="text-[#44e5c4]">Level up</span> your
          <br />
          Google Business Profile
          <br />
          and lead in local search
        </h1>
        <p className="relative mt-[26px] w-[620px] pl-[52px] text-[20px] leading-6 text-white">
          Insights, reviews, posts, precise ranking on maps against competitors. With {brand.name} Local, getting to the top is easy for local businesses
        </p>
        <ConnectButton onClick={open} className="relative mt-[40px] ml-[52px] h-[55px] w-[280px] text-[18px]" />
        <div className="absolute top-[58px] left-[694px] h-[245px] w-[310px] overflow-hidden rounded-[4px] [transform:perspective(900px)_rotateY(-8deg)]">
          <CafeScene />
        </div>
        <div className="absolute top-[278px] left-[735px] h-[125px] w-[120px] bg-[#5cdcae] [transform:skewY(4deg)]" />
        <div className="absolute top-[162px] left-[849px]">
          <GbpProfileCard name="Happy Cups" />
        </div>
      </section>
      <div className="bg-white pb-[100px]">
        <h2 className="pt-[63px] text-center text-[36px] leading-[44px] font-semibold text-[#3e1087]">Elevate your GBP to the next level—the simple way</h2>
        <div className="relative mx-auto mt-[69px] flex w-[900px]">
          <div className="-ml-[0px]">
            <HoursMockup />
          </div>
          <div className="pt-[29px] pl-[58px]">
            <h3 className="text-[24px] leading-7 font-semibold text-[#2b2a33]">Manage your Google Business Profile(s) effortlessly</h3>
            <ul className="mt-[22px] list-disc pl-[17px] text-[17px] leading-6 text-[#3a3b40] marker:text-[#8a8b90]">
              <li>
                {hl("Seamlessly connect")} your GBP to {brand.name} Local and manage all your business information from one central location
              </li>
              <li className="mt-[8px]">Receive {hl("custom recommendations")} for your business to enhance your local search visibility and attract more customers</li>
            </ul>
            <ConnectButton onClick={open} icon={false} className="mt-[40px] h-10 w-[235px] text-[18px]" />
          </div>
        </div>
        {sections.map((s, i) => (
          <div key={i} className={`mx-auto mt-[120px] flex w-[900px] items-start justify-between ${i % 2 ? "flex-row-reverse" : ""}`}>
            <div className="w-[380px] pt-[4px]">
              <h3 className="text-[24px] leading-7 font-semibold text-[#2b2a33]">{s.t}</h3>
              <ul className="mt-[20px] list-disc pl-[17px] text-[16px] leading-6 text-[#3a3b40] marker:text-[#8a8b90]">
                {s.b.map((b, k) => (
                  <li key={k} className={k ? "mt-[8px]" : ""}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className={i ? "" : "pt-[21px]"}>{s.m}</div>
          </div>
        ))}
      </div>
      <section className="mt-[87px] rounded-[16px] bg-[#410f7c] pt-[64px] pb-[64px] text-center">
        <h2 className="text-[32px] leading-10 font-bold text-white">
          Ready to take your Google Business Profile
          <br />
          to new heights?
        </h2>
        <p className="mt-[15px] text-[16px] leading-6 text-white">Help your business reach its full potential today.</p>
        <ConnectButton onClick={open} className="mt-[40px] h-[55px] w-[280px] text-[16px]" />
      </section>
      <ConnectModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
