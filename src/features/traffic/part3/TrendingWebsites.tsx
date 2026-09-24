"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { brand, account } from "@/config/brand";
import { routes } from "@/config/routes";
import { LogoIcon } from "@/components/icons";
import { useOutsideClose } from "@/components/ui/Popover";
import { DesktopIcon, MobileIcon } from "@/components/ui/icons";
import { industries, regions, sites, type Site } from "./trendingData";
import { SignupArt } from "./trendingArt";

const orange = "bg-[#ff642d] hover:bg-[#f0541c]";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className={`shrink-0 ${className}`}>
      <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TopBar({ onSignup }: { onSignup: () => void }) {
  const [menu, setMenu] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(menu, () => setMenu(false));
  return (
    <div className="sticky top-0 z-40 flex h-[70px] items-center justify-between bg-white pr-[22px] pl-[18px]">
      <Link href={routes.home} className="flex items-center gap-[8px]" aria-label={brand.name}>
        <LogoIcon width={28} height={28} />
        <span className="flex flex-col leading-none">
          <span className="text-[15px] font-extrabold tracking-[-0.2px] text-[#191b23] uppercase">{brand.name}</span>
          <span className="mt-[3px] text-[10px] text-[#191b23]">Traffic &amp; Market</span>
        </span>
      </Link>
      <div ref={ref} className="relative flex items-center gap-[27px]">
        <button type="button" aria-label="Menu" onClick={() => setMenu(!menu)} className="flex h-9 w-6 items-center justify-center text-[#191b23]">
          <svg viewBox="0 0 16 12" width={14} height={11}>
            <path d="M1 2.5h14M1 9.5h14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
        <button type="button" aria-label="Account" onClick={() => setMenu(!menu)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#cda4f6] text-[16px] text-[#191b23]">
          {account.initial}
        </button>
        {menu && (
          <div className="absolute top-[44px] right-0 w-[240px] rounded-lg bg-white py-2 text-[14px] shadow-popover">
            <Link href={routes.traffic.overview} className="block px-4 py-2 hover:bg-[#f4f5f9]">
              Check a Website&apos;s Traffic
            </Link>
            <Link href={routes.traffic.trendingWebsites} className="block px-4 py-2 hover:bg-[#f4f5f9]">
              Top Websites
            </Link>
            <Link href={routes.traffic.home} className="block px-4 py-2 hover:bg-[#f4f5f9]">
              Traffic &amp; Market Toolkit
            </Link>
            <button type="button" onClick={onSignup} className="block w-full px-4 py-2 text-left hover:bg-[#f4f5f9]">
              Upgrade plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PromoPopover({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-label="Free account" className="absolute top-[181px] left-[631px] z-30 w-[448px] rounded-2xl bg-white shadow-[0_4px_28px_rgba(25,27,35,0.14)]">
      <span className="absolute -top-[8px] right-[56px] h-4 w-4 rotate-45 bg-white" />
      <button type="button" aria-label="Close" onClick={onClose} className="absolute top-[18px] right-[22px] text-[#6c6e79] hover:text-[#191b23]">
        <svg viewBox="0 0 12 12" width={12} height={12}>
          <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      </button>
      <div className="px-[24px] pt-[31px] pb-[16px]">
        <h3 className="w-[340px] text-[20px] leading-7 font-bold tracking-[-0.2px] text-[#191b23]">Uncover competitor traffic and market data with a Free Account!</h3>
        <ul className="mt-[12px] text-[14px] leading-[27px] text-[#333]">
          {["Get AI-powered alerts explaining every traffic shift", "Gauge market size and share to spot growth potential", "Find untapped opportunities before competitors do", "Uncover conversion, channel, and page-level trends"].map((t) => (
            <li key={t} className="flex items-center gap-[4px]">
              <Check className="text-[#191b23]" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[114px] rounded-b-2xl bg-[#fde6cc] px-[24px] pt-[17px] text-[16px] leading-6 text-[#333]">
        <div className="font-bold text-[#191b23]">Maximize your online visibility:</div>
        <div>Get insights into the performance of any website.</div>
        <div>Every detail, only a click away.</div>
      </div>
    </div>
  );
}

function Select({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="relative flex h-[56px] flex-1 items-center rounded-md bg-white px-[13px] text-[16px] text-[#191b23]">
      <span className="flex-1 truncate">{value}</span>
      <Chevron />
      <select value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0">
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Fav({ s }: { s: Site }) {
  const small = s.fav.t.length > 1;
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] font-bold" style={{ background: s.fav.bg, color: s.fav.fg, fontSize: small ? 8 : 11 }}>
      {s.fav.t}
    </span>
  );
}

function Delta({ v }: { v: number }) {
  return <span className={v < 0 ? "text-[#c8254a]" : "text-[#0e8a73]"}>{`${v < 0 ? "↓" : "↑"}${Math.abs(v)}%`}</span>;
}

const cw = [40, 169, 100, 99, 81, 99, 81, 99, 100, 0];

function Table({ onBlocked }: { onBlocked: () => void }) {
  return (
    <table className="w-full table-fixed border-collapse border border-[#e6e6e6] text-[14px] text-[#191b23]">
      <colgroup>
        {cw.map((x, i) => (
          <col key={i} style={{ width: x || undefined }} />
        ))}
      </colgroup>
      <thead className="bg-white">
        <tr className="h-[46px] border-b border-[#e6e6e6] text-[13px] text-[#6c6e79]">
          <th />
          <th className="pl-[11px] text-left font-normal">Website</th>
          <th className="text-right font-normal">Visits</th>
          <th colSpan={2} className="text-right font-normal">
            <span className="inline-flex items-center gap-[6px]">
              <DesktopIcon /> Desktop
            </span>
          </th>
          <th colSpan={2} className="text-right font-normal">
            <span className="inline-flex items-center gap-[6px]">
              <MobileIcon /> Mobile
            </span>
          </th>
          <th className="text-right font-normal">MoM</th>
          <th className="text-right font-normal">YoY</th>
          <th className="pl-[25px] text-left font-normal">Top channel</th>
        </tr>
      </thead>
      <tbody>
        {sites.map((s) => (
          <tr key={s.d} className="h-[45.5px] border-b border-[#e6e6e6] hover:bg-[#f0eff3]">
            <td className="text-center align-middle">
              <button type="button" aria-label={`Hide ${s.d}`} onClick={onBlocked} className="inline-flex align-middle text-[#c4c7cf] hover:text-[#6c6e79]">
                <svg viewBox="0 0 20 20" width={20} height={20}>
                  <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
                  <path d="M5 15 15 5" stroke="currentColor" strokeWidth={1.6} />
                </svg>
              </button>
            </td>
            <td>
              <Link href={`${routes.traffic.overview}?q=${s.d}&searchType=domain`} className="flex items-center gap-[8px] pl-[11px] text-[14px] text-[#2e6bd9] hover:underline">
                <Fav s={s} />
                <span className="truncate">{s.d}</span>
              </Link>
            </td>
            <td className="text-right">{s.v}</td>
            <td className="text-right text-[#8a8e9b]">{s.ds}</td>
            <td className="text-right">{s.dv}</td>
            <td className="text-right text-[#8a8e9b]">{s.ms}</td>
            <td className="text-right">{s.mv}</td>
            <td className="text-right">
              <Delta v={s.mom} />
            </td>
            <td className="text-right">
              <Delta v={s.yoy} />
            </td>
            <td className="pl-[25px]">{s.ch}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SignupModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(25,27,35,0.7)]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-label="Sign up" className="relative ml-[16px] flex h-[410px] w-[723px] rounded-2xl bg-white pt-[47px] pl-[40px]">
        <button type="button" aria-label="Close" onClick={onClose} className="absolute top-[16px] right-[18px] text-[#6c6e79] hover:text-[#191b23]">
          <svg viewBox="0 0 24 24" width={24} height={24}>
            <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          </svg>
        </button>
        <div className="w-[350px]">
          <h2 className="text-[31px] leading-[39px] font-semibold tracking-[-0.4px] text-[#191b23]">Don&apos;t Miss Out on Even More Competitor Insights!</h2>
          <ul className="mt-[18px] flex flex-col text-[16px] leading-[25px] text-[#333]">
            {["Which keywords they target", "Where their traffic comes from", "Their most important pages", "How they make money"].map((t) => (
              <li key={t} className="flex items-center gap-[8px]">
                <Check className="text-[#ff642d]" />
                {t}
              </li>
            ))}
          </ul>
          <Link href={routes.home} className={`mt-[21px] inline-flex h-[39px] items-center rounded-md px-[12px] text-[15px] font-medium text-white ${orange}`}>
            Get Started for Free →
          </Link>
          <p className="mt-[1px] text-[13px] text-[#6c6e79]">Enjoy 10 Free Daily Requests on Us When You Sign Up</p>
        </div>
        <SignupArt />
      </div>
    </div>
  );
}

function Wordmark() {
  return (
    <div
      className="relative h-[488px] overflow-hidden"
      style={{
        backgroundImage: "repeating-linear-gradient(90deg, rgba(25,27,35,0.14) 0 1px, transparent 1px 3px), linear-gradient(180deg, #ece7ff 0%, #d9d3fb 45%, #a6d9e6 80%, #66c8d3 100%)",
      }}
    >
      <svg viewBox="0 0 1065 160" width={1065} height={160} className="absolute bottom-[26px] left-[30px]" aria-label={brand.name}>
        <text x="0" y="152" fontSize="190" fontWeight="900" fill="#191b23" textLength="1065" lengthAdjust="spacingAndGlyphs">
          {brand.name.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}

export function TrendingWebsites() {
  const [pop, setPop] = useState(true);
  const [modal, setModal] = useState(false);
  const [seen, setSeen] = useState(false);
  const [industry, setIndustry] = useState(industries[0]);
  const [region, setRegion] = useState(regions[0]);
  const [q, setQ] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const el = bottom.current;
    if (!el || seen) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        setModal(true);
        setSeen(true);
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <div className="relative min-h-screen bg-white text-[#191b23]">
      <TopBar onSignup={() => setModal(true)} />
      <div className="relative z-20 flex h-[102px] items-center justify-between bg-white pr-[48px] pl-[48px] shadow-[0_10px_18px_rgba(25,27,35,0.06)]">
        <nav className="-mt-[6px] flex items-center gap-[24px] text-[20px] tracking-[-0.3px]">
          <Link href={routes.traffic.overview} className="hover:text-[#ff642d]">
            Check a Website&apos;s Traffic
          </Link>
          <Link href={routes.traffic.trendingWebsites} className="hover:text-[#ff642d]">
            Top Websites
          </Link>
        </nav>
        <div className="flex flex-col items-end self-start pt-[16px]">
          <button type="button" onClick={() => setModal(true)} className={`h-[45px] w-[199px] rounded-md text-[18px] font-medium text-white ${orange}`}>
            Try for free
          </button>
          <span className="mt-[5px] pr-[6px] text-[16px] text-[#6c6e79]">10x daily insights. Free!</span>
        </div>
      </div>
      {pop && <PromoPopover onClose={() => setPop(false)} />}

      <main className="mx-auto w-[1031px] pb-[120px]">
        <nav className="mt-[48px] flex items-center gap-[8px] text-[14px]">
          <Link href={routes.home} className="text-[#6c6e79] hover:text-[#191b23]">
            Main
          </Link>
          <span className="text-[#c4c7cf]">/</span>
          <span>Top Websites</span>
        </nav>
        <form
          className="mt-[49px] flex gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) router.push(`${routes.traffic.overview}?q=${encodeURIComponent(q.trim())}&searchType=domain`);
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter a domain to see detailed stats"
            className="h-[57px] w-[402px] rounded-md border border-[#d0d3da] px-[12px] text-[16px] outline-none placeholder:text-[#8a8e9b] focus:border-[#ff642d]"
          />
          <button type="submit" className={`h-[57px] w-[290px] rounded-md text-[18px] font-semibold text-white ${orange}`}>
            Check Traffic
          </button>
        </form>

        <section className="mt-[48px] rounded-2xl bg-[linear-gradient(135deg,#43188a_0%,#3a137a_60%,#2e0f63_100%)] px-[40px] pt-[36px] pb-[40px] text-white">
          <h1 className="text-[64px] leading-[72px] font-bold tracking-[-1.2px]">Top Websites in the World</h1>
          <p className="mt-[22px] text-[20px] leading-6">
            Based on data from the <b>{brand.name} Traffic Analytics tool</b>, this page reveals the most visited websites. We will be updating this list on a monthly basis, so you can keep track of all the market shifts and
            spot changes in user interest.
          </p>
          <div className="mt-[32px] flex gap-4">
            <Select value={industry} options={industries} onChange={setIndustry} />
            <Select value={region} options={regions} onChange={setRegion} />
          </div>
          <button type="button" className={`mt-[16px] h-[55px] w-full rounded-md text-[18px] text-white ${orange}`}>
            Find top websites
          </button>
        </section>

        <h2 className="mt-[64px] text-[36px] leading-[44px] font-bold tracking-[-0.5px]">
          Top {sites.length} Most Visited Websites{region === "World" ? " in the World" : ` in ${region}`}
        </h2>
        <p className="mt-[12px] text-[16px] leading-6 text-[#6c6e79]">
          {industry} · August 2026 · Monthly visits, desktop and mobile split, month-over-month and year-over-year change.
        </p>
        <div className="mt-[28px]">
          <Table onBlocked={() => setModal(true)} />
        </div>

        <section className="mt-[64px] flex items-center justify-between rounded-2xl bg-[#f6f3ff] px-[40px] py-[36px]">
          <div>
            <h2 className="text-[28px] leading-9 font-bold tracking-[-0.3px]">Want the full picture?</h2>
            <p className="mt-[8px] w-[560px] text-[16px] leading-6 text-[#484a54]">Analyze any website&apos;s traffic sources, audience and top pages with the {brand.name} Traffic &amp; Market toolkit.</p>
          </div>
          <Link href={routes.traffic.home} className={`inline-flex h-[48px] items-center rounded-md px-[20px] text-[16px] font-semibold text-white ${orange}`}>
            Explore Traffic &amp; Market
          </Link>
        </section>
      </main>

      <footer className="bg-white">
        <div className="flex h-[150px] items-end gap-[18px] pb-[14px] pl-[24px]">
          {(
            [
              ["in", "https://www.linkedin.com"],
              ["ig", "https://www.instagram.com"],
              ["tt", "https://www.tiktok.com"],
              ["yt", "https://www.youtube.com"],
              ["fb", "https://www.facebook.com"],
            ] as const
          ).map(([s, url]) => (
            <a key={s} href={url} target="_blank" rel="noreferrer" aria-label={s} className="flex h-[22px] w-[22px] items-center justify-center text-[#191b23] hover:text-[#ff642d]">
              <SocialGlyph k={s} />
            </a>
          ))}
        </div>
        <div className="flex h-[66px] items-start justify-between pt-[15px] pr-[26px] pl-[24px] text-[14px] leading-5 text-[#484a54]">
          <span className="flex items-center gap-[20px]">
            <LogoIcon width={24} height={24} />
            © 2026 {brand.legalName}. All rights reserved.
          </span>
          <button type="button" className="flex items-center gap-[4px] text-[15px] text-[#191b23]">
            English
            <svg viewBox="0 0 16 16" width={12} height={12}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.6} />
            </svg>
          </button>
        </div>
        <div ref={bottom}>
          <Wordmark />
        </div>
      </footer>
      {modal && <SignupModal onClose={() => setModal(false)} />}
    </div>
  );
}

function SocialGlyph({ k }: { k: string }) {
  switch (k) {
    case "in":
      return <span className="text-[20px] leading-none font-bold tracking-[-1px]">in</span>;
    case "ig":
      return (
        <svg viewBox="0 0 22 22" width={22} height={22}>
          <rect x="2" y="2" width="18" height="18" rx="5.5" fill="none" stroke="currentColor" strokeWidth={2} />
          <circle cx="11" cy="11" r="4" fill="none" stroke="currentColor" strokeWidth={2} />
          <circle cx="16" cy="6" r="1.2" fill="currentColor" />
        </svg>
      );
    case "tt":
      return (
        <svg viewBox="0 0 22 22" width={22} height={22}>
          <path d="M14 2c.4 2.6 2 4.1 4.6 4.3v3.1a8 8 0 0 1-4.6-1.5v7.3a6 6 0 1 1-6-6h.6v3.1H8a2.9 2.9 0 1 0 2.9 2.9V2z" fill="currentColor" />
        </svg>
      );
    case "yt":
      return (
        <svg viewBox="0 0 22 22" width={22} height={22}>
          <rect x="1" y="4" width="20" height="14" rx="4" fill="currentColor" />
          <path d="M9 8v6l5-3z" fill="#fff" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 22 22" width={22} height={22}>
          <path d="M12.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.4H6.6V13h2.7v8z" fill="currentColor" />
        </svg>
      );
  }
}
