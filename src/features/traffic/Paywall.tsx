import Link from "next/link";
import type { ReactNode } from "react";
import { InfoIcon } from "@/components/ui/icons";

function BulbArt() {
  return (
    <svg viewBox="0 0 140 140" width={140} height={140} className="absolute -top-[23px] left-[549px]">
      <path d="M72 6c20 1 38 10 50 26 12 17 15 36 10 55-5 20-19 37-40 45-19 7-42 4-58-8C18 112 7 92 7 70 8 46 20 25 40 13c9-5 21-7 32-7Z" fill="#fbe38e" />
      <path d="M30 18c3-4 8-6 12-4M22 46l-9 4M36 106l-8 7M116 38l9-5M124 66h10M118 94l8 5" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      <path d="M22 30 58 5 94 37 74 76 52 85 37 70Z" fill="#fbe8a6" stroke="#1d1d1f" strokeWidth={2.2} strokeLinejoin="round" />
      <path d="M52 60c-4-9-10-17-9-24M66 55c2-9 8-16 7-24" fill="none" stroke="#1d1d1f" strokeWidth={1.8} strokeLinecap="round" />
      <circle cx="46" cy="32" r="5" fill="none" stroke="#1d1d1f" strokeWidth={1.8} />
      <circle cx="72" cy="28" r="5" fill="none" stroke="#1d1d1f" strokeWidth={1.8} />
      <path d="M50 70 76 62l3 7-26 9ZM53 79l26-8 2 6-25 8Z" fill="#fff" stroke="#1d1d1f" strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M58 88c2 8 10 12 17 9 6-3 7-10 11-16 4-6 9-11 10-18 1-5-3-6-5-2l-5 11M96 64c3-7 8-12 8-18 0-4-4-5-6-1M84 60c1-6 3-11 5-14" fill="none" stroke="#1d1d1f" strokeWidth={1.8} strokeLinecap="round" />
      <path d="M72 98c4 5 9 11 16 17l20 12 6-10-19-13" fill="#fff" stroke="#1d1d1f" strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M96 117l14 9 6-9-14-8Z" fill="#1d1d1f" />
    </svg>
  );
}

export function Paywall({ charge, sampleHref, top = 40 }: { charge: string; sampleHref: string; top?: number }) {
  const bullets = ["Traffic by channel (search, display, email, etc.)", "Market share by industry", "Daily trends and 7 years of historical data", "Top pages driving conversions", "Demographics breakdown", "190+ countries and regions"];
  return (
    <div className="absolute left-[308px] z-20 w-[620px] rounded-[12px] bg-white px-12 pt-[46px] pb-[47px] shadow-[0_2px_16px_rgba(25,27,35,0.12)]" style={{ top }} data-testid="traffic-paywall">
      <BulbArt />
      <h2 className="text-[24px] leading-[29px] font-semibold text-[#2b2e38]">
        Unlock competitor and audience
        <br />
        insights with <span className="text-[#009f81]">Traffic &amp; Market Toolkit Pro</span>
      </h2>
      <ul className="mt-[11px] flex flex-col">
        {bullets.map((b) => (
          <li key={b} className="relative h-8 pl-[17px] text-[16px] leading-8 text-rk-text-2 before:absolute before:top-[14px] before:left-[4px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-[#6c6e79]">
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-[21px] flex items-center gap-[37px]">
        <button type="button" className="h-[39px] rounded-[6px] bg-[#009f81] px-[13px] text-[16px] font-semibold text-white hover:bg-[#007c65]">
          Buy Traffic &amp; Market Pro
        </button>
        <Link href={sampleHref} className="text-[16px] font-medium text-rk-link hover:text-rk-link-hover">
          View sample
        </Link>
      </div>
      <div className="mt-[16px] border-t border-[#d7d9de] pt-[7px]">
        <div className="flex items-center gap-[8px] text-[14px] leading-6 font-medium text-rk-text">
          Today&apos;s charge: {charge} (incl. Tax)
          <InfoIcon width={16} height={16} className="text-rk-faint" />
        </div>
        <p className="mt-[5px] text-[14px] leading-[21px] text-rk-muted">
          By clicking &ldquo;Buy Traffic &amp; Market Pro&rdquo;, you agree to add the full Traffic &amp; Market toolkit to your current subscription for an{" "}
          <b className="font-semibold text-rk-text-2">additional $289/mo</b>.
        </p>
      </div>
    </div>
  );
}

export function LockedArea({ children, charge, sampleHref, top }: { children: ReactNode; charge: string; sampleHref: string; top?: number }) {
  return (
    <div className="relative">
      <div className="pointer-events-none opacity-[0.22] select-none" aria-hidden>
        {children}
      </div>
      <Paywall charge={charge} sampleHref={sampleHref} top={top} />
    </div>
  );
}

export function Skel({ w, h = 8, className = "" }: { w: number | string; h?: number; className?: string }) {
  return <span className={`block rounded-full bg-[#c9cbd1] ${className}`} style={{ width: w, height: h }} />;
}
