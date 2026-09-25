"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { overviewFaqs } from "./data";
import { LandingFooter, aiButton } from "./landing";
import { CompetitorCard, Ga4Card, GrowthArt, IssuesArt, PromptCard, RankGaugeArt, SiteHealthCard, SovCard, VisibilityCard } from "./overviewArt";

function At({ x, y, children, className = "" }: { x?: number; y: number; children: ReactNode; className?: string }) {
  return (
    <div className={`absolute ${className}`} style={{ top: y, left: x }}>
      {children}
    </div>
  );
}

function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-[36px] leading-10 font-semibold tracking-[-0.2px] text-rk-text ${className}`}>{children}</h2>;
}

function Bullets({ items, gap = 7, width = 492 }: { items: string[]; gap?: number; width?: number }) {
  return (
    <ul className="flex flex-col text-[18px] leading-7 text-[#2d2f38]" style={{ gap, width }}>
      {items.map((t) => (
        <li key={t} className="relative pl-[18px]">
          <span className="absolute top-0 left-[1px] text-[#8b8d8c]">•</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

function CtaButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`inline-flex h-14 items-center rounded-md px-3 text-[16px] font-semibold ${aiButton} ${className}`}>
      {children}
    </Link>
  );
}

function HeroRing() {
  return (
    <svg viewBox="0 0 1127 820" width={1127} height={820} className="absolute top-0 left-0" aria-hidden>
      <defs>
        <filter id="ov-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="ov-blur2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <linearGradient id="ov-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9e6fb" />
          <stop offset="0.35" stopColor="#f8b8ee" />
          <stop offset="0.7" stopColor="#f9c3ef" />
          <stop offset="1" stopColor="#f5b2ec" />
        </linearGradient>
      </defs>
      <ellipse cx={120} cy={120} rx={260} ry={200} fill="#e6f3fb" opacity={0.6} filter="url(#ov-blur2)" />
      <ellipse cx={40} cy={560} rx={220} ry={220} fill="#fdebe2" opacity={0.6} filter="url(#ov-blur2)" />
      <ellipse cx={1080} cy={420} rx={160} ry={260} fill="#eceffd" filter="url(#ov-blur2)" />
      <g filter="url(#ov-blur)" opacity={0.95}>
        <ellipse cx={575} cy={420} rx={372} ry={352} fill="none" stroke="url(#ov-ring)" strokeWidth={44} transform="rotate(-18 575 420)" />
        <ellipse cx={590} cy={400} rx={330} ry={330} fill="none" stroke="#f9c7f1" strokeWidth={22} opacity={0.7} transform="rotate(24 590 400)" />
        <path d="M740 90c120 40 190 120 210 230" fill="none" stroke="#cfe6fa" strokeWidth={40} />
      </g>
      <rect x="0" y="700" width="1127" height="120" fill="url(#ov-fade)" />
      <defs>
        <linearGradient id="ov-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CtaBackground() {
  return (
    <svg viewBox="0 0 1127 777" width={1127} height={777} preserveAspectRatio="none" className="absolute top-[5330px] left-0" aria-hidden>
      <defs>
        <filter id="ov-cta-blur" x="-20%" y="-30%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
        <linearGradient id="ov-cta-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ov-cta-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      <rect width="1127" height="777" fill="#f6f5fb" />
      <g filter="url(#ov-cta-blur)">
        <path d="M-60 250c160-40 260 60 420 60s260-90 420-80 260 80 400 40v140c-140 40-240-40-400-20s-260 110-420 110S100 400-60 440z" fill="#fbc9f0" />
        <path d="M-60 380c200 20 300-40 460-20s240 110 420 100 240-60 360-40v120c-160-10-260 60-420 50S500 500 340 500-60 540-60 540z" fill="#f7d5f3" />
        <path d="M600 180c160-20 300 30 580 10v140c-200 30-360-20-520-10z" fill="#d8ecfb" />
        <path d="M-60 560c140-20 240 40 360 60v160H-60z" fill="#fde6da" />
        <path d="M820 520c120 10 220 60 360 40v140c-140 10-240-40-360-60z" fill="#d7ebfa" />
      </g>
      <rect width="1127" height="200" fill="url(#ov-cta-top)" />
      <rect y="600" width="1127" height="177" fill="url(#ov-cta-bottom)" />
    </svg>
  );
}

function BrandLogos() {
  const c = "absolute top-0 flex h-10 -translate-x-1/2 items-center whitespace-nowrap text-[#8b8d8c]";
  return (
    <div className="relative h-10 w-[1127px]">
      <span className={`${c} font-mono text-[26px] tracking-[7px]`} style={{ left: 114 }}>
        TESLA
      </span>
      <span className={`${c} text-[23px] font-black tracking-[-1.2px]`} style={{ left: 308 }}>
        DECATHLON
      </span>
      <span className={`${c} font-serif text-[24px] font-bold italic`} style={{ left: 471 }}>
        P&amp;G
      </span>
      <span className={`${c} text-[22px] font-extrabold tracking-[3px]`} style={{ left: 638 }}>
        SAMSUNG
      </span>
      <span className={`${c} gap-1 text-[23px] font-bold`} style={{ left: 837 }}>
        LALIGA
        <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#8b8d8c] text-[8px] font-bold text-white">EA</span>
      </span>
      <span className={`${c} text-[26px] font-black tracking-[-1.5px]`} style={{ left: 1021 }}>
        Fed<span className="opacity-60">Ex</span>
        <span className="text-[10px]">.</span>
      </span>
    </div>
  );
}

function ScrollHint() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const on = () => setShow(window.scrollY < 4200);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label="Scroll down"
      onClick={() => window.scrollBy({ top: 750, behavior: "smooth" })}
      className="fixed bottom-[26px] left-1/2 z-20 flex h-[68px] w-[68px] -translate-x-1/2 flex-col items-center justify-center rounded-full bg-white shadow-[0_0_20px_rgba(181,138,242,0.12)] xl:left-[calc(50%+150px)]"
      style={{ marginLeft: -7 }}
    >
      <svg viewBox="0 0 24 40" width={24} height={40} aria-hidden>
        <rect x="2" y="1" width="20" height="28" rx="10" fill="none" stroke="#b58af2" strokeWidth={1.6} />
        <path d="M12 7v6" stroke="#b58af2" strokeWidth={2} strokeLinecap="round" />
        <path d="m6 33 6 5 6-5" fill="none" stroke="#c9a4fb" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function DomainForm({ placeholder, button, className = "", focus = false, buttonClass = "" }: { placeholder: string; button: string; className?: string; focus?: boolean; buttonClass?: string }) {
  const router = useRouter();
  const [v, setV] = useState("");
  return (
    <form
      className={`flex h-14 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`${routes.ai.overview}?q=${encodeURIComponent(v.trim() || brand.domain)}`);
      }}
    >
      <input
        autoFocus={focus}
        value={v}
        onChange={(e) => setV(e.target.value)}
        aria-label={placeholder}
        placeholder={placeholder}
        className={`min-w-0 flex-1 rounded-l-md bg-white text-[16px] text-rk-text outline-none placeholder:text-rk-muted ${
          focus ? "border-2 border-[#8f8ee6] px-3" : "border border-r-0 border-[#e3e3ea] px-3"
        }`}
      />
      <button type="submit" className={`rounded-r-md text-[16px] font-semibold ${aiButton} ${buttonClass}`}>
        {button}
      </button>
    </form>
  );
}

function Faq() {
  const faqs = overviewFaqs(brand.name);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex w-[899px] flex-col gap-[2px]">
      {faqs.map((f, i) => (
        <div key={f.q} className="rounded-[4px] bg-[#f7f7f7]">
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex h-12 w-full items-center gap-[10px] pl-[16px] text-left text-[20px] font-semibold text-[#5d5f68] hover:text-rk-text">
            <svg viewBox="0 0 16 16" width={14} height={14} className={open === i ? "rotate-90" : ""} aria-hidden>
              <path d="m6 3.5 4.5 4.5L6 12.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f.q}
          </button>
          {open === i && <p className="px-10 pb-4 text-[16px] leading-6 text-rk-text-2">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

const cols = [
  {
    art: <RankGaugeArt />,
    x: 110,
    y: 1070,
    title: (
      <>
        Track your brand&apos;s AI
        <br />
        visibility
      </>
    ),
    text: "See your overall visibility and share of voice across AI platforms, along with clear priorities for improvement.",
  },
  {
    art: <IssuesArt />,
    x: 460,
    y: 1075,
    title: (
      <>
        Get insights on
        <br />
        competitors
      </>
    ),
    text: "Spot the prompts, mentions, and sources where rivals appear but you don't, and find ways to close the gap.",
  },
  { art: <GrowthArt />, x: 812, y: 1093, title: <>Turn insights into growth</>, text: "Leverage content opportunities to strengthen your visibility and sentiment in both AI and traditional search." },
];

export function OverviewLanding() {
  return (
    <div className="overflow-x-hidden bg-white">
      <div className="relative mx-auto h-[6107px] w-[1127px]">
        <HeroRing />
        <CtaBackground />
        <At y={148} className="inset-x-0 text-center text-[18px] leading-6 text-rk-muted">
          AI Visibility
        </At>
        <At y={190} className="inset-x-0 text-center">
          <h1 className="text-[48px] leading-[56px] font-semibold tracking-[-0.4px] text-rk-text">
            Win Every Search
            <br />
            From Traditional SEO to AI Discovery
          </h1>
        </At>
        <At y={318} className="inset-x-0 text-center text-[18px] leading-7 text-[#2d2f38]">
          Track your brand visibility, fix gaps, and grow across Google and AI search—
          <br />
          all from one trusted platform.
        </At>
        <At x={233} y={414}>
          <DomainForm placeholder="Enter domain, subdomain or URL" button="Get started" className="w-[659px]" buttonClass="w-[157px]" focus />
        </At>
        <At x={338} y={526}>
          <div className="flex h-[68px] w-[450px] items-center justify-between rounded-xl bg-white/80 px-[26px] text-[18px] shadow-[0_2px_16px_rgba(25,27,35,0.06)]">
            <span className="text-rk-text-2">warbyparker.com</span>
            <Link href={`${routes.ai.brandPerformance}?pid=9`} className="text-rk-link hover:text-rk-link-hover">
              View free example →
            </Link>
          </div>
        </At>

        <At y={911} className="inset-x-0 text-center">
          <H2>
            See how you rank in AI search
            <br />
            and where to grow
          </H2>
        </At>
        {cols.map((c, i) => (
          <div key={i}>
            <At x={c.x} y={c.y}>
              {c.art}
            </At>
            <At x={37 + i * 352} y={1246} className="w-[350px] text-center">
              <h3 className="text-[24px] leading-7 font-semibold text-rk-text">{c.title}</h3>
              <p className="mx-auto mt-[15px] w-[318px] text-[18px] leading-7 text-[#2d2f38]">{c.text}</p>
            </At>
          </div>
        ))}

        <At x={57} y={1658}>
          <H2>
            Track any brand&apos;s visibility
            <br />
            in LLMs
          </H2>
        </At>
        <At x={57} y={1769}>
          <Bullets
            items={[
              "Monitor relevant mentions and citations, and filter by platform, source, or intent",
              "Check overall AI visibility scores and most relevant prompts for any brand",
              "Track daily visibility for priority prompts and get growth recommendations",
            ]}
          />
        </At>
        <VisibilityCard className="top-[1585px] left-[616px]" />

        <PromptCard className="top-[2116px] left-[88px]" />
        <At x={584} y={2144}>
          <H2>
            Discover the prompts
            <br />
            driving AI conversations
          </H2>
        </At>
        <At x={584} y={2253}>
          <Bullets
            width={478}
            gap={8}
            items={[
              "Explore relevant prompts from your audience across industries",
              "Analyze AI responses, including brand mentions and sources",
              "Uncover trending, high-value topics people ask AI to guide your content",
            ]}
          />
        </At>
        <At x={584} y={2469}>
          <CtaButton href={routes.ai.promptResearch}>Find hot topics</CtaButton>
        </At>

        <At x={57} y={2672}>
          <H2>
            Spot gaps and outperform
            <br />
            competitors
          </H2>
        </At>
        <At x={57} y={2783}>
          <Bullets
            items={[
              "See the prompts and sources where competitors are cited but your brand isn't",
              "Compare mentions, sources, and sentiment to see why they're cited more",
              "Get actionable steps to close the gap and capture share of voice",
            ]}
          />
        </At>
        <At x={56} y={2999}>
          <CtaButton href={routes.ai.competitorResearch}>Claim missed mentions</CtaButton>
        </At>
        <CompetitorCard className="top-[2643px] left-[616px]" />

        <SiteHealthCard className="top-[3174px] left-[88px]" />
        <At x={584} y={3243}>
          <H2>
            Prepare your content
            <br />
            for AI search
          </H2>
        </At>
        <At x={584} y={3354}>
          <Bullets
            width={478}
            gap={8}
            items={["Remove barriers to visibility", "Optimize content so AI can understand and cite it", "Position your site as the trusted source in AI results"]}
          />
        </At>
        <At x={584} y={3487}>
          <CtaButton href={routes.siteAudit}>Optimize for AI</CtaButton>
        </At>

        <At x={57} y={3730}>
          <H2>
            Own your AI brand
            <br />
            narrative
          </H2>
        </At>
        <At x={57} y={3841}>
          <Bullets
            items={[
              "Benchmark and track the positive and negative sentiment of your brand mentions",
              "Understand the current gaps and weaknesses in how each AI platform perceives you",
              "Collect strategic recommendations to cover your brand's blindspots",
            ]}
          />
        </At>
        <At x={56} y={4057}>
          <CtaButton href={routes.ai.brandPerformance}>Own your narrative</CtaButton>
        </At>
        <SovCard className="top-[3701px] left-[616px]" />

        <Ga4Card className="top-[4231px] left-[88px]" />
        <At x={584} y={4311}>
          <H2>Prove the ROI of AI visibility</H2>
        </At>
        <At x={584} y={4363}>
          <span className="inline-flex h-10 items-center rounded-full bg-[#ecedef] px-3 text-[18px] text-rk-text-2">Coming soon</span>
        </At>
        <At x={584} y={4434}>
          <Bullets
            width={478}
            gap={8}
            items={[
              "Generate AI visibility analysis reports in just one click",
              "Customize your reports and showcase AI visibility together with SEO and traffic metrics",
              "Connect Google Analytics to report how your efforts influence actual traffic and conversions via AI",
            ]}
          />
        </At>

        <At y={4775} className="inset-x-0 text-center">
          <H2>{brand.name} AI SEO Toolkit FAQs</H2>
        </At>
        <At x={114} y={4847}>
          <Faq />
        </At>

        <At y={5492} className="inset-x-0 text-center">
          <H2>
            Lead in AI Search while others
            <br />
            are still guessing
          </H2>
          <p className="mt-[17px] text-[18px] leading-7 text-[#2d2f38]">Be the brand AI recommends — and the one customers choose.</p>
        </At>
        <At x={232} y={5656}>
          <DomainForm placeholder="Enter a website" button="Check AI Visibility" className="w-[663px]" buttonClass="w-[164px]" />
        </At>
        <At y={5831} className="inset-x-0 text-center text-[18px] leading-7 text-[#2d2f38]">
          Trusted by the world&apos;s leading brands
        </At>
        <At x={0} y={5900}>
          <BrandLogos />
        </At>
      </div>
      <div className="bg-rk-bg">
        <LandingFooter gap={40} />
      </div>
      <ScrollHint />
    </div>
  );
}
