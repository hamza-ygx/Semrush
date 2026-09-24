import Link from "next/link";
import { InfoIcon } from "@/components/ui/icons";
import { paywallBullets } from "./data";

function BulbHand() {
  return (
    <svg viewBox="0 0 140 140" width={138} height={138} aria-hidden>
      <path d="M70 6c14 0 18 6 30 10s22 14 26 26 8 16 6 30-4 22-12 32-18 20-34 22-22-2-34-8-22-14-26-28-6-22-2-36 10-22 20-30S56 6 70 6z" fill="#fbe39a" />
      <path d="M96 30l8-6M104 42l10-2M100 56l10 4M34 66l-10 2M38 80l-10 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 44 56 8l26 20 4 30-20 26-34-10z" fill="#fde9a8" stroke="#191b23" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="44" cy="44" r="6" fill="none" stroke="#191b23" strokeWidth="1.6" />
      <circle cx="62" cy="30" r="6" fill="none" stroke="#191b23" strokeWidth="1.6" />
      <path d="M48 49l14 22M62 36l8 30M50 42l12-6" fill="none" stroke="#191b23" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M56 72c4-6 18-12 26-10l4 10c-8 2-18 8-24 12z" fill="#fff" stroke="#191b23" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M60 80c-2 10 4 22 14 30l12 12 22-14-6-18c-2-12 0-22 6-34 2-6-4-8-8-2l-8 16c0-10 4-18 8-26 3-6-3-9-7-3-5 8-8 16-9 24" fill="#fbe39a" stroke="#191b23" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M86 122l22-14 6 8-22 16z" fill="#191b23" />
      <circle cx="104" cy="116" r="1.6" fill="#fff" />
    </svg>
  );
}

export function Paywall({ sampleHref, className = "" }: { sampleHref: string; className?: string }) {
  return (
    <div role="dialog" aria-label="Unlock Traffic & Market Toolkit Pro" className={`w-[620px] rounded-lg bg-white px-12 pt-[47px] pb-[47px] shadow-[0_2px_20px_rgba(25,27,35,0.12)] ${className}`}>
      <div className="absolute -top-[21px] right-[-66px]">
        <BulbHand />
      </div>
      <h2 className="text-[24px] leading-[29px] font-semibold text-rk-text">
        Unlock competitor and audience
        <br />
        insights with <span className="text-[#009f81]">Traffic &amp; Market Toolkit Pro</span>
      </h2>
      <ul className="mt-[11px] flex flex-col text-[16px] leading-8 text-rk-text-2">
        {paywallBullets.map((b) => (
          <li key={b} className="flex items-center gap-[10px] pl-[3px]">
            <span className="h-[4px] w-[4px] rounded-full bg-rk-muted" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-[21px] flex items-center gap-[37px]">
        <button type="button" className="h-10 rounded-md bg-[#009f81] px-[13px] text-[16px] font-medium text-white hover:bg-[#007c65]">
          Buy Traffic &amp; Market Pro
        </button>
        <Link href={sampleHref} className="text-[16px] text-rk-link hover:text-rk-link-hover">
          View sample
        </Link>
      </div>
      <div className="mt-[15px] border-t border-[#e0e1e9] pt-[8px]">
        <div className="flex items-center gap-[8px] text-[14px] leading-5 font-medium text-rk-text">
          Today&apos;s charge: $335.13 (incl. Tax)
          <InfoIcon width={16} height={16} className="text-rk-faint" />
        </div>
        <p className="mt-[8px] text-[14px] leading-[21px] text-rk-muted">
          By clicking “Buy Traffic &amp; Market Pro”, you agree to add the full Traffic &amp; Market toolkit to your current subscription for an{" "}
          <b className="font-semibold text-rk-text-2">additional $289/mo</b>.
        </p>
      </div>
    </div>
  );
}
