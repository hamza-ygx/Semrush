import type { ReactNode } from "react";
import { KeywordAnalyze } from "./HeaderTools";
import { influencerFeatures } from "./data";

function IaLogo() {
  return (
    <svg viewBox="0 0 30 22" width={30} height={22}>
      <circle cx="4" cy="3.5" r="3" fill="#6a5cff" />
      <rect x="1.2" y="8" width="5.6" height="13" rx="1" fill="#2a2530" />
      <path d="M19 7a7.5 7.5 0 1 0 0 15 7 7 0 0 0 4.2-1.4V21.5h5.6V14.5A7.5 7.5 0 0 0 19 7zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" fill="#2a2530" />
    </svg>
  );
}

function Tab({ c, label, count, icon }: { c: string; label: string; count: string; icon: ReactNode }) {
  return (
    <span className="flex items-center gap-[5px] text-[8.5px] text-[#9a9ca8]">
      <span className="flex h-[14px] items-center justify-center rounded-[3px] px-[3px] text-white" style={{ background: c }}>
        {icon}
      </span>
      <span className={c === "#ff0000" ? "text-[#191b23]" : ""}>{label}</span>
      <span className="text-[6px]">{count}</span>
    </span>
  );
}

function DiscoveryMock() {
  return (
    <div className="relative mx-auto h-[520px] w-[825px] overflow-hidden rounded-t-[14px] border-[3px] border-b-0 border-[#e8e9ee] bg-[#f5f7fb]">
      <div className="flex h-[33px] items-center justify-center gap-[10px] bg-white text-[7px] text-[#484a54]">
        {["Home", "Influencer Discovery ⌄", "Campaign Management", "Search by keywords ⌄", "Competitor Analysis ⌄", "Lists", "Tops ⌄"].map((l) => (
          <span key={l}>{l}</span>
        ))}
        <span className="ml-2 text-[10px] text-[#6a5cff]">⌕</span>
        <span className="text-[6px] text-[#b2b4bc]">◉ 320 tokens</span>
      </div>
      <div className="px-[73px] pt-[14px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#191b23]">Influencers</span>
          <span className="flex gap-[18px]">
            <Tab c="#ff0000" label="Youtube" count="16.38M" icon="▶" />
            <Tab c="#9146ff" label="Twitch" count="927.45k" icon="▣" />
            <Tab c="#e1306c" label="Instagram" count="" icon="◎" />
            <Tab c="#111" label="TikTok" count="6.58M" icon="♪" />
          </span>
        </div>
        <div className="mt-[11px] flex h-[30px] items-center justify-center rounded-[5px] border border-[#cfd0f5] bg-[#e7e6fb] text-[7px] text-[#6a5cff]">✦ Use AI-powered search</div>
        <div className="mt-[14px] grid grid-cols-4 gap-[8px]">
          {[
            ["Create lists", "Construct detailed Influencer Lists with 20+ data fields containing content metrics, contact info, recent activity and more!"],
            ["Competitor Analysis", "Track and monitor influencer marketing strategy of any app, website, game. Identify mentions of a brand, game, or app."],
            ["Control ad campaigns", "Plan, organize, and make advertising campaigns on social media more effective"],
            ["Search by keywords", "Mix up to 100 words and phrases with advanced filtering options to find exactly what you need!"],
          ].map(([t, d]) => (
            <div key={t} className="h-[60px] rounded-[5px] bg-white px-[8px] pt-[8px]">
              <div className="text-[8.5px] font-medium text-[#191b23]">{t} ⟶</div>
              <div className="mt-[3px] text-[5.5px] leading-[9px] text-[#b2b4bc]">{d}</div>
            </div>
          ))}
        </div>
        <div className="mt-[8px] flex h-[35px] items-center gap-2 rounded-[5px] bg-white px-[7px] text-[6.5px] text-[#b2b4bc]">
          <span className="flex h-[21px] flex-1 items-center rounded-[4px] bg-[#f3f4f7] px-2">⌕ Find the influencer you need by name, username or link</span>
          <span>0 / 290</span>
          <span className="text-[#6a5cff]">Add influencer</span>
        </div>
        <div className="mt-[8px] space-y-[6px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex h-[48px] items-center gap-3 rounded-[5px] bg-white px-3">
              <span className="h-7 w-7 rounded-full bg-[#dfe3f0]" />
              <span className="h-[6px] w-[90px] rounded-full bg-[#e3e5ec]" />
              <span className="ml-auto h-[6px] w-[40px] rounded-full bg-[#e3e5ec]" />
              <span className="h-[6px] w-[40px] rounded-full bg-[#e3e5ec]" />
              <span className="h-[6px] w-[40px] rounded-full bg-[#e3e5ec]" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-[168px] left-[520px] h-[120px] w-[100px] rounded-[5px] bg-white px-2 pt-2 text-[6px] text-[#484a54] shadow-[0_2px_10px_rgba(25,27,35,0.1)]">
        Influencers
        <div className="mt-2 rounded-[3px] border border-[#e8e9ee] px-[5px] py-[4px]">Last published ⌄</div>
        <div className="mt-1 rounded-[3px] border border-[#e8e9ee] px-[5px] py-[4px]">Price, $ ⌄</div>
      </div>
      <div className="absolute -right-[60px] top-[180px] h-[300px] w-[160px] rounded-full bg-[#c9b8f7] opacity-60 blur-2xl" />
    </div>
  );
}

function FeatureCard({ word, title, children }: { word: string; title: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-[#e8e8e8] bg-[linear-gradient(180deg,#ffffff_0%,#f4f7fa_40%,#eceef6_100%)]">
      <div className="pointer-events-none -mt-[20px] text-center text-[108px] leading-[100px] font-black tracking-[-0.01em] whitespace-nowrap text-[#dde8f1]">{word}</div>
      <h2 className="mx-auto mt-[18px] max-w-[790px] text-center text-[23.8px] leading-[27px] font-bold text-[#191b23]">{title}</h2>
      <div className="mt-[18px]">{children}</div>
    </section>
  );
}

export function InfluencerAnalytics() {
  return (
    <div className="relative min-h-full bg-white px-[15px] pt-[50px] pb-[60px]">
      <KeywordAnalyze />
      <div className="pl-[5px]">
        <IaLogo />
      </div>
      <h1 className="mt-[23px] text-[24px] leading-7 font-semibold text-[#191b23]">Influencer Analytics</h1>
      <div className="mt-[6px] flex items-center gap-[5px] text-[14px] leading-5 text-[#6c6e79]">
        <svg viewBox="0 0 16 16" width={15} height={15}>
          <path d="M8 14s-5.5-3.3-5.5-7.3A3 3 0 0 1 8 4.5a3 3 0 0 1 5.5 2.2C13.5 10.7 8 14 8 14z" fill="#f37c80" />
        </svg>
        6,9K users liked it
      </div>
      <p className="mt-[15px] text-[16px] leading-6 text-[#191b23]">Improve your influencer marketing campaign’s performance. From discovery to clicks.</p>
      <button type="button" className="mt-[25px] h-10 w-[330px] rounded-md bg-[#00a380] text-[16px] font-medium text-white hover:bg-[#008c6e]">
        Try it free
      </button>
      <p className="mt-[12px] w-[330px] text-center text-[14px] leading-5 text-[#6c6e79]">Free 7 - day trial. Unsubscribe anytime</p>
      <div className="mt-[36px] space-y-6">
        <FeatureCard word="Influencer discovery" title="Use multiple ways to identify the perfect ambassadors for your brand: search within 30+M database, filtering, keyword search, etc.">
          <DiscoveryMock />
        </FeatureCard>
        {influencerFeatures.map((f) => (
          <FeatureCard key={f.word} word={f.word} title={f.title}>
            <div className="mx-auto h-[420px] w-[825px] rounded-t-[14px] border-[3px] border-b-0 border-[#e8e9ee] bg-[#f5f7fb] p-6">
              <div className="grid grid-cols-3 gap-4">
                {["Budget", "Clicks", "ROI"].map((l, i) => (
                  <div key={l} className="rounded-[6px] bg-white p-4">
                    <div className="text-[12px] text-[#6c6e79]">{l}</div>
                    <div className="text-[22px] font-bold text-[#191b23]">{["$12,400", "38.2K", "312%"][i]}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-[230px] rounded-[6px] bg-white p-4">
                <svg viewBox="0 0 700 180" className="h-full w-full" preserveAspectRatio="none">
                  <path d="M0 150 C 80 140 120 90 200 100 S 330 40 420 60 S 560 20 700 30" fill="none" stroke="#6a5cff" strokeWidth={3} />
                  <path d="M0 170 C 90 160 140 140 220 130 S 360 110 440 100 S 580 90 700 70" fill="none" stroke="#00c78f" strokeWidth={3} />
                </svg>
              </div>
            </div>
          </FeatureCard>
        ))}
      </div>
    </div>
  );
}
