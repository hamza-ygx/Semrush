"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { GearIcon, PlusIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { BellOffIcon } from "../icons";
import { DomainDot } from "../TrafficFrame";
import { ListSettings } from "../part8/ListSettings";
import { competitorColors, ListDomains, listsFor, type SavedList } from "../part8/lists";

const inputCls = "h-10 w-[500px] rounded-[6px] border border-[#d8dad9] bg-white text-[16px] text-rk-text outline-none placeholder:text-[#a0a2ab]";

function Hero({ tag, title, subtitle, subtitleClass = "", withList = false }: { tag: string; title: ReactNode; subtitle: ReactNode; subtitleClass?: string; withList?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [competitors, setCompetitors] = useState<string[] | null>(null);
  const [suggest, setSuggest] = useState(false);
  const go = () => {
    const qs = [value, ...(competitors ?? [])].map((v) => v.trim()).filter(Boolean);
    router.push(`${routes.traffic.overview}?q=${encodeURIComponent(qs.join(",") || "rkjh.se")}&searchType=domain&lid=1304085`);
  };
  const suggestions = withList ? listsFor(true).filter((l) => l.domains.length === 1) : [];
  const analyze = (
    <button type="submit" className="h-10 shrink-0 rounded-[6px] bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
      Analyze
    </button>
  );
  const main = (
    <div className="relative">
      {competitors && <DomainDot color={competitorColors[0]} className="absolute top-[15px] left-[11px]" />}
      <input
        value={value}
        data-testid="traffic-home-domain"
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setSuggest(true)}
        onBlur={() => setSuggest(false)}
        placeholder="Enter domain, subdomain or subfolder"
        className={`${inputCls} ${competitors ? "pl-[29px] focus:border-[#8b8fdd] focus:shadow-[0_0_0_1px_#8b8fdd]" : "px-[17px] focus:border-rk-link"}`}
      />
      {suggest && !value && suggestions.length > 0 && (
        <div data-testid="traffic-list-suggest" className="absolute top-[45px] left-px z-30 w-[490px] overflow-hidden rounded-[6px] bg-white shadow-popover">
          {suggestions.map((l) => (
            <Link key={l.id} href={l.href} onMouseDown={(e) => e.preventDefault()} className="block h-[80px] px-[16px] pt-[11px] hover:bg-[#f9f9f9]">
              <div className="text-[14px] leading-5 font-medium text-rk-muted">{l.name}</div>
              <div className="mt-[7px]">
                <ListDomains list={l} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
  return (
    <section className={`rounded-lg bg-white pt-5 shadow-card ${competitors ? "pb-8" : "pb-10"}`}>
      <span className="inline-flex h-[26px] items-center rounded-r-[6px] bg-[#f5eefb] pr-[11px] pl-[25px] text-[14px] leading-5 text-[#8a3fcf]">{tag}</span>
      <div className="px-[25px]">
        <h1 className="mt-[9px] max-w-[660px] text-[36px] leading-[39px] font-semibold tracking-[-0.1px] text-rk-text">{title}</h1>
        <p className={`mt-[13px] text-[16px] leading-6 text-rk-text ${subtitleClass}`}>{subtitle}</p>
        <form
          className="mt-[32px] flex flex-col gap-[12px]"
          onSubmit={(e) => {
            e.preventDefault();
            go();
          }}
        >
          {competitors ? (
            <>
              {main}
              {competitors.map((c, i) => (
                <div key={i} className="flex items-center gap-[12px]">
                  <div className="relative">
                    <DomainDot color={competitorColors[i + 1]} className="absolute top-[15px] left-[11px]" />
                    <input
                      value={c}
                      onChange={(e) => setCompetitors(competitors.map((x, j) => (j === i ? e.target.value : x)))}
                      placeholder="Enter competitor domain, subdomain or subfolder"
                      className={`${inputCls} pl-[29px] focus:border-[#8b8fdd] focus:shadow-[0_0_0_1px_#8b8fdd]`}
                    />
                  </div>
                  {i === competitors.length - 1 && analyze}
                </div>
              ))}
            </>
          ) : (
            <div className="flex items-center gap-[13px]">
              {main}
              {analyze}
            </div>
          )}
        </form>
        {!competitors && (
          <button
            type="button"
            data-testid="traffic-add-competitors"
            onClick={() => setCompetitors(["", "", "", ""])}
            className="mt-[16px] ml-[14px] text-[16px] leading-6 font-medium text-rk-link hover:text-rk-link-hover"
          >
            + Add competitors
          </button>
        )}
      </div>
    </section>
  );
}

function SavedLists({ withList = false }: { withList?: boolean }) {
  const [settings, setSettings] = useState<SavedList | null>(null);
  return (
    <>
      <div className="mt-[38px] flex items-center justify-between">
        <h2 className="text-[20px] leading-7 font-semibold text-rk-text">Saved lists</h2>
        <Link href={`${routes.traffic.home}?lid=1304085`} className="mr-[9px] flex items-center gap-[10px] text-[14px] leading-5 text-rk-muted hover:text-rk-text">
          <PlusIcon width={14} height={14} />
          Create new list
        </Link>
      </div>
      <div className="mt-[18px] flex flex-col gap-[8px]">
        {listsFor(withList).map((l) => (
          <div key={l.id} data-testid={`traffic-saved-list-${l.id}`} className="relative flex h-[92px] items-start justify-between rounded-lg bg-white px-5 pt-[21px] shadow-card hover:shadow-[0_1px_8px_rgba(0,0,0,0.12)]">
            <Link href={l.href} aria-label={`Open ${l.name} (${l.domains[0]})`} className="absolute inset-0 rounded-lg" />
            <div className="pointer-events-none relative">
              <div className="text-[14px] leading-5 font-semibold text-rk-text">{l.name}</div>
              <div className="mt-[6px]">
                <ListDomains list={l} />
              </div>
            </div>
            <div className="relative mt-[3px] flex items-center gap-[20px] pr-[7px] text-rk-muted">
              <button type="button" aria-label="Notifications off" className="hover:text-rk-text">
                <BellOffIcon width={18} height={18} />
              </button>
              <button type="button" aria-label="List settings" onClick={() => setSettings(l)} className="hover:text-rk-text">
                <GearIcon width={18} height={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {settings && <ListSettings list={settings} onClose={() => setSettings(null)} />}
    </>
  );
}

const exploreIcons: Record<string, ReactNode> = {
  bars: <path d="M3 3v10h10M5.5 11V7.5M8 11V5M10.5 11V8" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />,
  pie: (
    <>
      <path d="M7 3.2A5 5 0 1 0 12.8 9H7Z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M9 1.5A5 5 0 0 1 14.5 7H9Z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    </>
  ),
  people: (
    <>
      <circle cx="6" cy="5.5" r="2.3" fill="none" stroke="currentColor" strokeWidth={1.5} />
      <path d="M1.8 13c.4-2.4 2-3.6 4.2-3.6s3.8 1.2 4.2 3.6M10.5 3.5a2.2 2.2 0 0 1 0 4.2M12 9.6c1.3.5 2 1.6 2.2 3.4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </>
  ),
  eye: (
    <>
      <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" fill="none" stroke="currentColor" strokeWidth={1.5} />
      <circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth={1.5} />
    </>
  ),
};

const explore = [
  {
    icon: "bars",
    title: "Traffic Sources & Engagement",
    text: "See where competitors get their traffic, how visitors engage, and which channels drive the most visits.",
    href: routes.traffic.overview,
  },
  {
    icon: "pie",
    title: "Market & Industry Benchmarking",
    text: "Size up your market, compare traffic share with key players, and spot who is gaining ground.",
    href: routes.traffic.marketOverview,
  },
  {
    icon: "people",
    title: "Audience Insights",
    text: "Explore audience demographics, behavior, income, and interests to refine targeting and discover new opportunities.",
    href: routes.traffic.demographics,
  },
  {
    icon: "eye",
    title: "Competitor Monitoring",
    text: "Get automated alerts on competitor campaigns, content, and shifts—so you can react first.",
    href: routes.traffic.competitorMonitoring,
  },
];

function ApiIllustration() {
  return (
    <svg viewBox="0 0 330 300" width={330} height={300} className="absolute top-0 right-[20px]">
      <defs>
        <linearGradient id="tri" x1="0" x2="1">
          <stop offset="0" stopColor="#f3e8fe" />
          <stop offset="1" stopColor="#f9f3fe" />
        </linearGradient>
        <filter id="apish" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#6b4fa8" floodOpacity="0.12" />
        </filter>
      </defs>
      <path d="M8 2 L322 147 L8 295 Z" fill="url(#tri)" />
      <g filter="url(#apish)">
        <rect x="32" y="84" width="227" height="136" rx="6" fill="#fff" />
      </g>
      <text x="43" y="112" fontSize="13" fontWeight="600" fill="#5e5c6c">Traffic</text>
      <g stroke="#f0eef4">
        <line x1="60" x2="250" y1="130" y2="130" />
        <line x1="60" x2="250" y1="149" y2="149" />
        <line x1="60" x2="250" y1="168" y2="168" />
        <line x1="60" x2="250" y1="187" y2="187" />
      </g>
      <g fontSize="4.5" fill="#9b98a6">
        <text x="43" y="132">15M</text>
        <text x="43" y="151">10M</text>
        <text x="43" y="170">5M</text>
        <text x="43" y="189">0</text>
      </g>
      <path d="M58 150 C66 144 72 146 80 149 S96 144 104 144 S112 154 119 149 S125 116 128 128 S134 158 142 158 S160 157 168 157 S176 162 182 162 S188 152 196 150" fill="none" stroke="#a45ff4" strokeWidth="2.2" />
      <path d="M58 178 C70 177 80 180 90 177 S104 180 114 178 S130 175 142 178 S170 178 250 178" fill="none" stroke="#d6b5fb" strokeWidth="2" />
      <circle cx="129" cy="127" r="3.4" fill="#a45ff4" />
      <rect x="112" y="99" width="37" height="18" rx="2" fill="#c89cf7" />
      <text x="130.5" y="112" fontSize="10.5" fontWeight="600" fill="#fff" textAnchor="middle">
        +15%
      </text>
      <circle cx="61" cy="204" r="2.3" fill="#a45ff4" />
      <text x="67" y="206" fontSize="6.5" fill="#6a6c6a">Competitor 1</text>
      <circle cx="114" cy="204" r="2.3" fill="#d6b5fb" />
      <text x="120" y="206" fontSize="6.5" fill="#6a6c6a">Competitor 2</text>
      <g filter="url(#apish)">
        <rect x="179" y="68" width="119" height="84" rx="4" fill="#b366fb" />
      </g>
      <text x="194" y="87" fontSize="11" fontWeight="500" fill="#fff">
        Market Share
      </text>
      <circle cx="213" cy="117" r="17" fill="none" stroke="#d9b5fd" strokeWidth="8" />
      <path d="M213 100a17 17 0 0 1 17 17" fill="none" stroke="#f2e6ff" strokeWidth="8" />
      <circle cx="213" cy="117" r="11" fill="#b366fb" />
      <text x="236" y="125" fontSize="22" fontWeight="600" fill="#fff">
        +2M
      </text>
      <text x="265" y="137" fontSize="8" fill="#f2e6ff">
        ↑1.35
      </text>
    </svg>
  );
}

function ApiCard() {
  return (
    <section className="relative mt-[17px] h-[300px] overflow-hidden rounded-lg bg-white shadow-card">
      <ApiIllustration />
      <div className="relative w-[478px] pt-[32px] pl-[32px]">
        <h2 className="text-[24px] leading-[28px] font-semibold text-rk-text">Traffic &amp; Market Data — Use It Your Way: API or AI</h2>
        <p className="mt-[10px] text-[16px] leading-6 text-rk-text">From classic API integrations to instant AI conversations — get insights from Traffic &amp; Market data any way you prefer.</p>
        <button
          type="button"
          className="mt-[24px] flex h-10 w-[446px] items-center justify-center gap-[8px] rounded-[6px] bg-gradient-to-r from-[#a45ffb] to-[#6b6de2] text-[16px] font-medium text-white hover:opacity-90"
        >
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M6 4 7 7.2l3.2 1L7 9.2 6 12.4 5 9.2 1.8 8.2 5 7.2ZM12 1.5l.5 1.6 1.6.5-1.6.5-.5 1.6-.5-1.6-1.6-.5 1.6-.5Z" fill="#fff" />
          </svg>
          Connect now
        </button>
        <Link
          href={routes.traffic.trendsApi}
          className="mt-[16px] flex h-10 w-[446px] items-center justify-center rounded-[6px] border border-[#d6d8d7] bg-[#f5f6f6] text-[16px] text-rk-text-2 hover:bg-rk-hover"
        >
          Learn more about API
        </Link>
      </div>
    </section>
  );
}

export function TrafficHome({ withList = false }: { withList?: boolean }) {
  return (
    <AppShell section="traffic" search={{ kind: "none" }} footerPb={37}>
      <div className="mx-auto w-[922px] pt-[25px] pb-[102px]">
        <Hero tag="Get Started" title="Traffic & Market insights that deliver results" subtitle="Instantly reveal what’s working for your competitors and how to grow faster." withList={withList} />
        <SavedLists withList={withList} />
        <h2 className="mt-[46px] text-center text-[24px] leading-8 font-semibold text-[#2b2e38]">Explore in One Click</h2>
        <div className="mt-[22px] grid grid-cols-2 gap-[20px]">
          {explore.map((e) => (
            <div key={e.title} className="flex h-[247px] flex-col rounded-lg bg-white px-[24px] pt-[24px] pb-[25px] shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f0fb] text-[#8a4fd6]">
                <svg viewBox="0 0 16 16" width={17} height={17}>
                  {exploreIcons[e.icon]}
                </svg>
              </span>
              <h3 className="mt-[12px] text-[16px] leading-6 font-bold text-rk-text">{e.title}</h3>
              <p className="mt-[12px] text-[16px] leading-6 text-rk-muted">{e.text}</p>
              <Link href={e.href} className="mt-auto flex items-center gap-[6px] text-[16px] leading-6 text-rk-link hover:text-rk-link-hover">
                Start now
                <svg viewBox="0 0 16 16" width={16} height={16}>
                  <path d="M2.5 8h10.5M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        <ApiCard />
      </div>
    </AppShell>
  );
}

function GrowthIllustration() {
  return (
    <svg viewBox="-1 0 400 180" width={400} height={180} className="absolute top-0 right-0">
      <path d="M140 0H400V180H80V110Z" fill="#e6f3fd" />
      <g filter="url(#gsh)">
        <rect x="52" y="74" width="314" height="140" rx="8" fill="#fff" />
      </g>
      <defs>
        <filter id="gsh" x="-10%" y="-20%" width="120%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#2a4d80" floodOpacity="0.1" />
        </filter>
      </defs>
      <text x="70" y="103" fontSize="15" fontWeight="600" fill="#1b1e1a">
        Traffic Trend
      </text>
      <line x1="70" x2="350" y1="128" y2="128" stroke="#eef0f3" />
      <line x1="70" x2="350" y1="152" y2="152" stroke="#eef0f3" />
      <path d="M70 165c10-5 18-6 28-2s20 2 30-2 18 3 26 2c8-1 12-30 15-30s6 30 12 31 20 0 28 0 14 5 20 4c8-2 12-10 16-12" fill="none" stroke="#2ea8f2" strokeWidth="2.6" />
      <circle cx="170" cy="135" r="4" fill="#2ea8f2" />
      <rect x="238" y="72" width="140" height="98" rx="6" fill="#cfeafc" />
      <path d="M257 90a3 3 0 1 1 0 6h-2M253 88v10M259 92h5a2.5 2.5 0 0 1 0 5h-5ZM259 97h5a2.5 2.5 0 0 1 0 5h-5Z" fill="none" stroke="#1b1e1a" strokeWidth="1.4" />
      <text x="252" y="126" fontSize="10.5" fontWeight="500" fill="#1b1e1a">
        Purchase Conversion
      </text>
      <text x="251" y="154" fontSize="25" fill="#1b1e1a">
        4.35%
      </text>
      <text x="324" y="153" fontSize="10.5" fill="#484a49">
        ↑5.57
      </text>
    </svg>
  );
}

export function TrafficLanding() {
  const features = [
    {
      title: "Spot new growth opportunities",
      bullets: ["Monitor traffic changes, growth spikes, and data patterns over time", "Benchmark multiple domains by visit volume, bounce rate, and engagement", "Compare desktop and mobile performance side by side"],
    },
    {
      title: "Understand where traffic comes from",
      bullets: ["Break down visits by channel: search, referral, social, email, and ads", "Find the top referring sites and campaigns behind competitor growth", "See how AI assistants are starting to send traffic"],
    },
    {
      title: "Learn what keeps audiences engaged",
      bullets: ["Identify top pages and subfolders that drive conversions", "Map audience geography across 190+ countries and regions", "Analyze demographics and socioeconomic profiles of visitors"],
    },
  ];
  return (
    <AppShell section="traffic" search={{ kind: "none" }} footerPb={37}>
      <div className="mx-auto w-[922px] pt-[25px] pb-[102px]">
        <Hero
          tag="Traffic Analytics"
          title="Analyze Competitor Traffic"
          subtitle="Get an overview of any website’s traffic to uncover how competitors attract and engage audiences."
          subtitleClass="max-w-[670px]"
        />
        <SavedLists />
        <div className="mt-[48px] flex flex-col gap-[20px]">
          {features.map((f, i) => (
            <section key={f.title} className="relative h-[250px] overflow-hidden rounded-lg bg-white shadow-card">
              {i === 0 && <GrowthIllustration />}
              {i > 0 && (
                <svg viewBox="0 0 360 250" width={360} height={250} className="absolute top-0 right-0">
                  <path d="M140 0H360V250H80V140Z" fill={i === 1 ? "#f2ecfd" : "#e8f8f1"} />
                  <rect x="60" y="60" width="270" height="140" rx="8" fill="#fff" />
                  {[0, 1, 2, 3].map((k) => (
                    <g key={k}>
                      <rect x="80" y={84 + k * 28} width={60 + ((k * 53) % 90)} height="10" rx="3" fill={i === 1 ? "#c9b3f7" : "#8fdcbc"} />
                      <rect x="250" y={84 + k * 28} width="60" height="10" rx="3" fill="#edefef" />
                    </g>
                  ))}
                </svg>
              )}
              <div className="relative w-[540px] pt-[31px] pl-[32px]">
                <h2 className="text-[24px] leading-8 font-semibold text-rk-text">{f.title}</h2>
                <ul className="mt-[13px] flex flex-col gap-[8px] pl-[16px] text-[16px] leading-6 text-rk-text-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="relative before:absolute before:top-[10px] before:-left-[13px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-rk-text-2">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
