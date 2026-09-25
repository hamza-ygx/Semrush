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
    <button type="button" onClick={onClick} className={`inline-flex items-center justify-center gap-[9px] rounded-[6px] bg-[#a35eff] text-white hover:bg-[#9048f2] ${className}`}>
      {icon && <GbpStoreIcon size={18} />}
      Connect your business
    </button>
  );
}

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-start">
    <span className="flex h-[19px] w-[79px] shrink-0 items-center text-[8px] text-[#1f1f24]">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);
const Input = ({ v, w = 172 }: { v: string; w?: number }) => (
  <div className="flex h-[19px] items-center truncate rounded-[3px] border border-[#cacccb] px-[6px] text-[8px] text-[#1f1f24]" style={{ width: w }}>
    {v}
  </div>
);
const Check = ({ label }: { label: string }) => (
  <span className="flex h-[12px] items-center gap-[5px] text-[8px] text-[#1f1f24]">
    <svg viewBox="0 0 10 10" width={10} height={10}>
      <rect width="10" height="10" rx="2" fill="#2d7ff0" />
      <path d="m2.6 5.1 1.6 1.6 3.3-3.4" fill="none" stroke="#fff" strokeWidth={1.3} />
    </svg>
    {label}
  </span>
);
const Select = ({ v, w = 52 }: { v: string; w?: number }) => (
  <span className="flex h-[17px] shrink-0 items-center justify-between rounded-[3px] border border-[#cacccb] bg-white px-[5px] text-[7px] text-[#1f1f24]" style={{ width: w }}>
    {v}
    <svg viewBox="0 0 8 8" width={7} height={7}>
      <path d="m1.5 3 2.5 2.5L6.5 3" fill="none" stroke="#6b6c72" strokeWidth={1.1} />
    </svg>
  </span>
);
const Cal = () => (
  <svg viewBox="0 0 10 10" width={8} height={8}>
    <rect x="1" y="2" width="8" height="7" rx="1" fill="none" stroke="#6b6c72" />
    <path d="M1 4.5h8M3 1v2M7 1v2" stroke="#6b6c72" />
  </svg>
);
const DateBox = ({ v }: { v: string }) => (
  <span className="flex h-[18px] w-[68px] items-center gap-[4px] rounded-[3px] whitespace-nowrap border border-[#cacccb] bg-white px-[5px] text-[7px] text-[#1f1f24]">
    <Cal />
    {v}
  </span>
);

function HoursMockup() {
  return (
    <div className="relative h-[423px] w-[440px]">
      <div className="absolute top-[40px] left-[-95px] h-[343px] w-[360px] rounded-full bg-[#e8f4fe]" />
      <div className="absolute top-0 left-0 h-[254px] w-[290px] overflow-hidden rounded-[10px] bg-white px-[12px] pt-[14px] shadow-[0_4px_20px_rgba(20,30,50,0.12)]">
        <div className="text-[9px] leading-[12px] font-semibold text-[#1f1f24]">Business hours</div>
        <div className="relative mt-[6px] h-[93px] overflow-hidden rounded-[4px] bg-[#f4f5f7] px-[11px] pt-[7px] text-[7px] text-[#5f6068]">
          <div className="flex h-[9px] items-center gap-[18px] text-[#2d6fe0]">
            <span>Edit all days</span>
            <span>Edit Mon-Fri</span>
            <span>Edit Sat-Sun</span>
          </div>
          {["Monday", "Tuesday", "Wednesday"].map((d, i) => (
            <div key={d} className={`${i ? "mt-[8px]" : "mt-[12px]"} flex items-center`}>
              <span className="w-[48px] shrink-0 text-[#1f1f24]">{d}</span>
              <Select v={i ? "Open" : "24 hours"} />
              {i > 0 && (
                <span className="ml-[3px]">
                  <Select v="09:00" />
                </span>
              )}
            </div>
          ))}
          <div className="absolute right-0 bottom-0 left-0 h-[22px] bg-gradient-to-b from-[#f4f5f7]/0 to-[#f4f5f7]" />
        </div>
        <div className="mt-[6px] text-[9px] leading-[12px] font-semibold text-[#1f1f24]">Holiday hours</div>
        <div className="mt-[9px] h-[55px] rounded-[4px] bg-[#f4f5f7] px-[11px] pt-[9px]">
          <DateBox v="Jan 18, 2024" />
          <div className="mt-[5px] flex items-center gap-[4px] text-[7px] text-[#1f1f24]">
            <Select v="Open" />
            <span className="flex h-[17px] w-[52px] items-center rounded-[3px] border border-[#cacccb] bg-white px-[5px]">09:00</span>
            <span>–</span>
          </div>
        </div>
        <div className="mt-[7px] h-[60px] rounded-[4px] bg-[#f4f5f7] px-[11px] pt-[10px]">
          <DateBox v="Feb 28, 2024" />
        </div>
      </div>
      <div className="absolute top-[67px] left-[142px] h-[311px] w-[290px] rounded-[10px] bg-white px-[19px] pt-[12px] shadow-[0_4px_24px_rgba(20,30,50,0.16)]">
        <div className="text-center text-[15px] leading-[20px] font-semibold text-[#1f1f24]">Business details</div>
        <div className="mt-[7px] text-center text-[8px] leading-[10px] text-[#3a3b40]">Collected from your Google account.</div>
        <div className="mt-[18px] flex gap-[16px] border-b border-[#e0e1e6] text-[8px] leading-[10px] text-[#1f1f24]">
          <span className="border-b-2 border-[#2d6fe0] pb-[4px]">General Info</span>
          <span>Business Categories</span>
          <span>Description</span>
          <span>Hours</span>
        </div>
        <div className="mt-[13px] flex flex-col gap-[9px]">
          <Field label="Business name">
            <Input v={brand.name} />
          </Field>
          <Field label="Address">
            <Input v="Kungsgatan 12, Stockholm" />
          </Field>
          <div className="flex items-start">
            <span className="flex h-[12px] w-[79px] shrink-0 items-center text-[8px] text-[#1f1f24]">Service area</span>
            <div className="flex flex-col">
              <Check label="Hide our address" />
              <span className="mt-[8px]">
                <Check label="We deliver to local customers" />
              </span>
              <div className="mt-[4px] ml-[12px] flex h-[19px] w-[148px] items-center gap-[4px] rounded-[3px] border border-[#7cc0f7] px-[5px] text-[#b4b6bc] shadow-[0_0_0_1px_#d6ecfd] whitespace-nowrap overflow-hidden text-[6.5px]">
                <svg viewBox="0 0 10 10" width={8} height={8}>
                  <circle cx="4.2" cy="4.2" r="3" fill="none" stroke="#1f1f24" strokeWidth={1.2} />
                  <path d="m6.5 6.5 2.5 2.5" stroke="#1f1f24" strokeWidth={1.2} />
                </svg>
                <span className="h-[10px] w-px bg-[#1f1f24]" />
                City, country, region, postal code, etc.
              </div>
              <span className="mt-[5px] ml-[12px] flex h-[14px] w-fit items-center gap-[4px] rounded-full border border-[#cacccb] px-[5px] text-[6.5px] text-[#1f1f24]">
                New Westminster, BC, Canada <span className="text-[8px] leading-none">×</span>
              </span>
            </div>
          </div>
          <Field label="Phone number">
            <Input v="+46 8 000 00 00" w={97} />
          </Field>
          <Field label="Website">
            <Input v={`https://www.${brand.domain}/listings-manag...`} />
          </Field>
        </div>
      </div>
    </div>
  );
}

const insightLines = [
  ["M0 38 7 34 14 36 21 30 28 33 35 27 42 31 49 24 56 29 63 26 70 30 77 22 84 27 91 20 98 25 105 23 112 28 119 18 126 24 133 16 140 21 147 12 154 17 161 9 168 14 175 8 180 10", "M0 47 10 45 20 47 30 44 40 46 50 43 60 46 70 44 80 47 90 43 100 45 110 42 120 46 130 43 140 45 150 42 160 45 170 43 180 44"],
  ["M0 36 7 30 14 38 21 28 28 34 35 24 42 30 49 26 56 32 63 22 70 28 77 25 84 30 91 21 98 27 105 24 112 29 119 17 126 23 133 19 140 26 147 13 154 20 161 10 168 16 175 7 180 9", "M0 45 10 43 20 46 30 42 40 45 50 41 60 44 70 42 80 46 90 41 100 44 110 40 120 45 130 42 140 44 150 40 160 43 170 42 180 43"],
];

function GbpInsightsMockup() {
  return (
    <div className="relative h-[300px] w-[440px]">
      <div className="absolute top-[-110px] left-[295px] h-[260px] w-[240px] rounded-[48%] bg-[#fde8f1]" />
      <div className="absolute inset-0 rounded-[12px] bg-white px-[16px] pt-[24px] shadow-[0_4px_24px_rgba(20,30,50,0.12)]">
        <div className="text-[18px] leading-6 font-semibold text-[#66646b]">Google Business Profile Insights</div>
        <div className="relative mt-[14px] h-[53px] rounded-[8px] border border-[#e4e5e5] text-[13px] leading-[18px]">
          {[
            ["Views", "55.1K", "+28%", "#0f8a5f", 18],
            ["Actions", "345", "-2.5%", "#d6336c", 157],
            ["Average Rating", "4.8", "↑0.3", "#0f8a5f", 285],
          ].map(([l, v, d, c, x]) => (
            <div key={l} className="absolute top-[8px]" style={{ left: x }}>
              <div className="text-[#6b6c72]">{l}</div>
              <div className="text-[14px] font-semibold text-[#1f1f24]">
                {v} <span style={{ color: c as string }} className="text-[13px] font-normal">{d}</span>
              </div>
            </div>
          ))}
          <span className="absolute top-[9px] left-[128px] h-[34px] w-px bg-[#e4e5e5]" />
          <span className="absolute top-[9px] left-[255px] h-[34px] w-px bg-[#e4e5e5]" />
        </div>
        <div className="mt-[12px] flex gap-[13px]">
          {[
            ["Google Search Views", "+26%"],
            ["Google Maps Views", "+40%"],
          ].map(([t, u], k) => (
            <div key={t} className="h-[140px] flex-1 rounded-[8px] border border-[#e4e5e5] px-[10px] pt-[6px] text-[12px]">
              <div className="border-b border-[#e4e5e5] pb-[6px] font-semibold text-[#6b6c72]">{t}</div>
              <div className="mt-[4px] flex items-center gap-[4px] text-[11px] text-[#76777d]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#2bb0f0]" /> 2024 <span className="ml-[4px] h-[6px] w-[6px] rounded-full bg-[#cacccb]" /> 2023 <span className="ml-[8px] font-semibold text-[#0f8a5f]">{u}</span>
              </div>
              <svg viewBox="0 0 180 50" className="mt-[10px] w-full">
                <path d="M0 5h180M0 20h180M0 35h180" stroke="#f0f1f3" strokeWidth={1} />
                <path d={insightLines[k][1]} fill="none" stroke="#cacccb" strokeWidth={1.6} />
                <path d={insightLines[k][0]} fill="none" stroke="#2bb0f0" strokeWidth={1.6} />
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
        <div key={t} className="mt-[14px] flex items-center gap-[12px] rounded-[8px] border border-[#e4e5e5] p-[10px]">
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
        <h1 className="relative mt-[32px] pl-[52px] text-[48px] leading-[56px] font-bold tracking-[-0.2px] text-white">
          <span className="text-[#44e5c4]">Level up</span> your
          <br />
          Google Business Profile
          <br />
          and lead in local search
        </h1>
        <p className="relative mt-[24px] w-[620px] pl-[52px] text-[20px] leading-6 text-white">
          Insights, reviews, posts, precise ranking on maps against competitors. With {brand.name} Local, getting to the top is easy for local businesses
        </p>
        <ConnectButton onClick={open} className="relative mt-[41px] ml-[52px] h-[55px] w-[280px] text-[16px] font-medium" />
        <div className="absolute top-[60px] left-[694px] h-[243px] w-[311px] overflow-hidden rounded-[4px] [clip-path:polygon(0_0,100%_22px,100%_calc(100%-14px),0_100%)]">
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
            <ul className="mt-[22px] list-disc pl-[17px] text-[16px] leading-6 text-[#3a3b40] marker:text-[#8a8b90]">
              <li>
                {hl("Seamlessly connect")} your GBP to {brand.name} Local and manage all your business information from one central location
              </li>
              <li className="mt-[8px]">Receive {hl("custom recommendations")} for your business to enhance your local search visibility and attract more customers</li>
            </ul>
            <ConnectButton onClick={open} icon={false} className="mt-[40px] h-[41px] w-[236px] text-[16px] font-semibold" />
          </div>
        </div>
        {sections.map((s, i) => (
          <div key={i} className={`mx-auto mt-[120px] flex w-[900px] items-start justify-between ${i % 2 ? "flex-row-reverse" : ""}`}>
            <div className="w-[393px] pt-[4px]">
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
        <ConnectButton onClick={open} className="mt-[40px] h-[55px] w-[280px] text-[16px] font-semibold" />
      </section>
      <ConnectModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
