import Link from "next/link";
import { InfoIcon } from "@/components/ui/icons";
import { BulbArt } from "../Paywall";
import { paywallBullets } from "./data";

export function Paywall({ sampleHref, className = "" }: { sampleHref: string; className?: string }) {
  return (
    <div role="dialog" aria-label="Unlock Traffic & Market Toolkit Pro" className={`w-[620px] rounded-lg bg-white px-12 pt-[47px] pb-[47px] shadow-[0_2px_20px_rgba(25,27,35,0.12)] ${className}`}>
      <BulbArt />
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
