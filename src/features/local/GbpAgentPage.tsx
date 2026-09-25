"use client";

import { useEffect, useRef, useState } from "react";
import { CafeScene, GbpProfileCard } from "./art";
import { ConnectModal } from "./GbpOptimizationPage";
import { AgentMockup } from "./StartMockups";

const grad = "bg-[linear-gradient(90deg,#a66cff_0%,#0a8ff5_100%)]";
const textGrad = "bg-[linear-gradient(90deg,#9f6bff_0%,#1e90f5_100%)] bg-clip-text text-transparent";

const Sparkle = () => (
  <svg viewBox="0 0 20 20" width={16} height={16}>
    <path d="M8 5c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5z" fill="#fff" />
    <path d="M15 1.5c.3 1.5 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5z" fill="#fff" />
  </svg>
);

function ActivateButton({ onClick, id }: { onClick: () => void; id?: string }) {
  return (
    <button type="button" id={id} onClick={onClick} className={`inline-flex h-10 w-[205px] items-center justify-center gap-[8px] rounded-[6px] text-[16px] font-semibold text-white hover:brightness-110 ${grad}`}>
      <Sparkle />
      Activate my AI agent
    </button>
  );
}

const stats = [
  ["+40%", "visibility", "Outperform stale GBPs in local search and get your business in front of more people."],
  ["5-minute", "setup", "Connect your Google Business Profile. AI handles the updates, posts and replies."],
  ["Minimum", "effort", "No expertise needed. Everything runs automatically in the background."],
];

const tasks = [
  ["Keeps your info up to date", "Hours, services and descriptions are checked and refreshed automatically."],
  ["Posts on your behalf", "Fresh posts and photos go live every week to keep your profile active."],
  ["Replies to every review", "Friendly, on-brand replies are published within hours, not days."],
];

export function GbpAgentPage() {
  const [modal, setModal] = useState(false);
  const [bar, setBar] = useState(false);
  const heroBtn = useRef<HTMLDivElement>(null);
  const ctaBtn = useRef<HTMLDivElement>(null);
  const open = () => setModal(true);

  useEffect(() => {
    const vis = { hero: true, cta: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroBtn.current) vis.hero = e.isIntersecting || e.boundingClientRect.top > 0;
        if (e.target === ctaBtn.current) vis.cta = e.isIntersecting || e.boundingClientRect.top < 0;
      }
      setBar(!vis.hero && !vis.cta);
    });
    if (heroBtn.current) io.observe(heroBtn.current);
    if (ctaBtn.current) io.observe(ctaBtn.current);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative pb-[100px]">
      <div aria-hidden className="pointer-events-none absolute top-0 left-0 h-px w-[1153px]" />
      <section className="relative h-[646px] overflow-hidden rounded-b-[40px] bg-[linear-gradient(90deg,#f1e7fe_0%,#e4e9fd_50%,#d6ebfd_100%)]">
        <div className="pt-[24px] text-center text-[16px] leading-6 text-[#6c6e79]">GBP AI Agent</div>
        <h1 className="mt-[121px] pl-[52px] text-[36px] leading-10 font-semibold text-[#2b2a33]">
          The AI agent that grows your
          <br />
          Google Business Profile
          <br />
          <span className={`mt-[-2px] inline-block h-[50px] rounded-full px-[14px] leading-[48px] text-white bg-[linear-gradient(90deg,#b58df9_0%,#6fb0f7_100%)]`}>automatically</span>
        </h1>
        <p className="mt-[18px] w-[419px] pl-[52px] text-[16px] leading-6 text-[#6c6e79]">
          The GBP AI agent updates, posts, and replies, so you show up in Google and AI assistants and win more local customers without lifting a finger.
        </p>
        <div ref={heroBtn} className="mt-[40px] pl-[52px]">
          <ActivateButton onClick={open} />
        </div>
        <p className="mt-[16px] pl-[52px] text-[12px] leading-4 text-[#6c6e79]">
          Your data is secure and encrypted.
          <br />
          We only access the information needed for optimization.
        </p>
        <div className="absolute top-[388px] left-[636px] h-[174px] w-[335px] bg-[#eed8fb] [transform:skewY(3deg)]" />
        <div className="absolute top-[123px] left-[593px] h-[275px] w-[341px] overflow-hidden rounded-[4px] [clip-path:polygon(0_0,100%_23px,100%_calc(100%-14px),0_100%)]">
          <CafeScene variant={1} />
        </div>
        <div className="absolute top-[330px] left-[564px] flex items-end gap-[4px]">
          {[22, 64, 83, 105, 142, 120, 152, 185].map((h, i) => (
            <span key={i} className="w-[27px] rounded-t-[4px] bg-[#28b2fe]" style={{ height: h, marginTop: 185 - h }} />
          ))}
        </div>
        <div className="absolute top-[192px] left-[792px]">
          <GbpProfileCard name="Vibe Coffee" food={[3, 2, 4]} scale={0.975} />
        </div>
      </section>
      <div className="bg-white">
        <h2 className="pt-[57px] text-center text-[32px] leading-10 font-semibold text-[#2b2a33]">AI does the work, you get the customers</h2>
        <div className="mx-auto mt-[32px] flex w-[1023px] gap-[16px]">
          {stats.map(([a, b, d]) => (
            <div key={a} className="h-[253px] flex-1 rounded-[12px] border border-[#ececef] px-[34px] pt-[31px] text-center">
              <div className={`text-[48px] leading-[56px] font-bold ${textGrad}`}>
                {a}
                <br />
                {b}
              </div>
              <div className="mt-[14px] text-[14px] leading-5 font-semibold text-[#1a1a1f]">{d}</div>
            </div>
          ))}
        </div>
        <div className="relative mx-auto mt-[119px] flex w-[900px] justify-between">
          <svg viewBox="0 0 260 320" width={260} height={320} className="absolute top-[-120px] left-[-70px]" aria-hidden>
            <rect x="40" y="30" width="110" height="230" rx="30" transform="rotate(40 95 145)" fill="#f5efff" />
            <rect x="80" y="70" width="40" height="80" rx="6" transform="rotate(40 100 110)" fill="#fff" />
            <path d="M130 190c6 30 20 44 50 50-30 6-44 20-50 50-6-30-20-44-50-50 30-6 44-20 50-50z" fill="#f5efff" />
          </svg>
          <h3 className="relative w-[370px] text-[24px] leading-7 font-semibold text-[#2b2a33]">Profiles that stay active get recommended more by Google and AI assistants</h3>
          <p className="relative mt-[1px] w-[390px] text-[16px] leading-6 text-[#3a3b40]">
            Most businesses set up their Google Business Profile once and forget it, but staying active is what gets results. Regular posts and replies tell Google and AI bots your business is open and trustworthy, making it more likely you’ll show up when customers search.
          </p>
        </div>
        <div className="mx-auto mt-[159px] flex w-[900px] items-center justify-between pb-[116px]">
          <div className="w-[380px]">
            <h3 className="text-[24px] leading-7 font-semibold text-[#2b2a33]">Your always-on profile manager</h3>
            {tasks.map(([t, d]) => (
              <div key={t} className="mt-[24px]">
                <div className="text-[16px] leading-6 font-semibold text-[#1a1a1f]">{t}</div>
                <div className="mt-[4px] text-[16px] leading-6 text-[#3a3b40]">{d}</div>
              </div>
            ))}
          </div>
          <div className="h-[479px] w-[440px]">
            <AgentMockup />
          </div>
        </div>
      </div>
      <section className="h-[355px] bg-[linear-gradient(90deg,#f1e7fe_0%,#e4e9fd_50%,#d6ebfd_100%)] pt-[80px] text-center">
        <h2 className="text-[32px] leading-10 font-semibold text-[#2b2a33]">Let AI grow your local business</h2>
        <p className="mt-[13px] text-[16px] leading-6 text-[#6c6e79]">Activate your AI Agent today and watch calls, bookings, and walk-ins roll in.</p>
        <div ref={ctaBtn} className="mt-[39px]">
          <ActivateButton onClick={open} />
        </div>
        <p className="mt-[16px] text-[16px] leading-6 text-[#6c6e79]">5-minute setup • Cancel anytime</p>
      </section>
      <div
        className={`fixed right-0 bottom-0 left-0 z-40 flex h-[88px] items-center justify-center bg-white shadow-[0_-4px_16px_rgba(24,27,40,0.08)] ${bar ? "opacity-100" : "pointer-events-none opacity-0"}`}
        data-testid="agent-sticky"
      >
        <ActivateButton onClick={open} />
      </div>
      <ConnectModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
