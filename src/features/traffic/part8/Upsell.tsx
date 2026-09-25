import type { ReactNode } from "react";
import { InfoIcon } from "@/components/ui/icons";

function BuyProButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={`h-7 shrink-0 rounded-[6px] bg-[#00a47e] px-[9px] text-[14px] leading-5 font-semibold whitespace-nowrap text-white hover:bg-[#008f6d] ${className}`}>
      Buy Traffic &amp; Market Pro
    </button>
  );
}

function Charge({ className = "" }: { className?: string }) {
  return (
    <div className={`text-[14px] leading-5 font-medium text-rk-text ${className}`}>
      Today&apos;s charge: $328.1 (incl. Tax)
      <InfoIcon width={14} height={14} className="ml-[7px] inline-block -translate-y-px align-middle text-rk-faint" />
    </div>
  );
}

function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-rk-muted ${className}`}>
      By clicking &ldquo;Buy Traffic&nbsp;&amp;&nbsp;Market&nbsp;Pro&rdquo;, you agree to add the full Traffic &amp; Market toolkit to your current subscription for an{" "}
      <b className="font-semibold whitespace-nowrap text-rk-text-2">additional $289/mo</b>.
    </p>
  );
}

export function PickerUpsell({ wide = false, className = "" }: { wide?: boolean; className?: string }) {
  return (
    <div data-testid="traffic-picker-upsell" className={`border-t border-[#b9e9dc] bg-[#c5fdf1] pt-[12px] pb-[11px] pl-[9px] text-left ${wide ? "pr-[62px]" : "pr-[16px]"} ${className}`}>
      <p className="text-[14px] leading-5 text-rk-text">
        Access this data with <b className={`font-semibold ${wide ? "" : "block"}`}>Traffic &amp; Market Toolkit Pro</b>
      </p>
      <BuyProButton className="mt-[17px]" />
      <Charge className="mt-[7px]" />
      <Disclaimer className="mt-[8px] text-[14px] leading-5" />
    </div>
  );
}

export function SettingsUpsell({ lead, inline = false }: { lead: ReactNode; inline?: boolean }) {
  return (
    <div className={`rounded-[6px] border border-[#9fe9d6] bg-[#c5fdf1] px-[17px] pb-[16px] ${inline ? "pt-[17px]" : "pt-[15px]"}`}>
      {inline ? (
        <div className="flex items-center gap-[16px]">
          <p className="text-[16px] leading-6 text-rk-text">{lead}</p>
          <BuyProButton className="h-10 px-[13px] text-[16px]" />
        </div>
      ) : (
        <>
          <p className="text-[16px] leading-6 text-rk-text">{lead}</p>
          <BuyProButton className="mt-[10px] h-10 px-[13px] text-[16px]" />
        </>
      )}
      <Charge className={inline ? "mt-[6px]" : "mt-[7px]"} />
      <Disclaimer className="mt-[8px] text-[14px] leading-5" />
    </div>
  );
}
