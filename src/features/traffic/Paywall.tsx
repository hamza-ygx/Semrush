import Link from "next/link";
import type { ReactNode } from "react";
import { InfoIcon } from "@/components/ui/icons";

export function BulbArt() {
  return (
    <svg viewBox="0 0 140 140" width={140} height={140} className="absolute -top-[23px] left-[549px]">
      <path d="M72 6c20 1 38 10 50 26 12 17 15 36 10 55-5 20-19 37-40 45-19 7-42 4-58-8C18 112 7 92 7 70 8 46 20 25 40 13c9-5 21-7 32-7Z" fill="#f9e690" />
      <path d="M30 18c3-4 8-6 12-4M22 46l-9 4M36 106l-8 7M116 38l9-5M124 66h10M118 94l8 5" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      <path d="M28.5 3.5 81 12 88.5 61 46 86 8.5 49.8Z" fill="#fce691" stroke="#1d1d1f" strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M34 10 75 16M82 22l4 30" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
      <circle cx="36" cy="44.8" r="5.3" fill="none" stroke="#1d1d1f" strokeWidth={1.5} />
      <circle cx="61.8" cy="30.5" r="5.3" fill="none" stroke="#1d1d1f" strokeWidth={1.5} />
      <path d="M41.3 45.5 56.5 46 61.8 35.8M51 48.5l8.8 25M62.3 35.8l6 36.5" fill="none" stroke="#1d1d1f" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M58 72.5 80 67.5c3 3 4 8 3 13l-19 7c-4-3-6-9-6-15Z" fill="#fff" stroke="#1d1d1f" strokeWidth={1.6} strokeLinejoin="round" />
      <path d="M60 78.5 81 73M62 84l19-6" stroke="#1d1d1f" strokeWidth={1.3} />
      <path d="M66 122C63 112 60 104 62 96c2-6 8-8 13-6 3-6 7-10 11-10l8-6c2-6 6-12 10-18 2-2 4 0 3 3l-6 13c4-4 9-8 13-8 3 0 3 3 1 6l-8 12c-3 12-5 24-6 36" fill="none" stroke="#1d1d1f" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75 90c-3-6-1-12 5-14 6-2 10 2 10 6M94 74c3-5 7-9 11-11" fill="none" stroke="#1d1d1f" strokeWidth={1.6} strokeLinecap="round" />
      <path d="M66 122 101 118.5 106 131 71 137Z" fill="#1d1d1f" />
      <circle cx="96" cy="127" r="1.6" fill="#fff" />
    </svg>
  );
}

function Paywall({ charge, sampleHref, top = 40 }: { charge: string; sampleHref: string; top?: number }) {
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
          <li key={b} className="relative h-8 pl-[17px] text-[16px] leading-8 text-rk-text-2 before:absolute before:top-[14px] before:left-[4px] before:h-[4px] before:w-[4px] before:rounded-full before:bg-[#6a6c6a]">
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-[20px] flex items-center gap-[37px]">
        <button type="button" className="h-[41px] rounded-[6px] bg-[#009f81] px-[13px] text-[16px] font-semibold text-white hover:bg-[#007c65]">
          Buy Traffic &amp; Market Pro
        </button>
        <Link href={sampleHref} className="text-[16px] font-medium text-rk-link hover:text-rk-link-hover">
          View sample
        </Link>
      </div>
      <div className="mt-[13px] border-t border-[#d8dad9] pt-[7px]">
        <div className="flex items-center gap-[8px] text-[14px] leading-6 font-medium text-rk-text">
          Today&apos;s charge: {charge} (incl. Tax)
          <InfoIcon width={16} height={16} className="text-rk-faint" />
        </div>
        <p className="mt-[7px] text-[14px] leading-[21px] text-rk-muted">
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
