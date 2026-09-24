"use client";

import { LogoIcon } from "@/components/icons";
import { brand } from "@/config/brand";
import { CalendarIcon, WarnIcon } from "./ConstructorIcons";
import { ScrollArea } from "./ScrollArea";

function DateRange({ from, to }: { from: string; to: string }) {
  return (
    <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border bg-white px-2 text-[15px] text-rk-text hover:border-rk-border-strong">
      <CalendarIcon className="text-rk-text-2" />
      <span className="ml-[1px]">{from}</span>
      <span className="mx-[9px]">&ndash;</span>
      <span>{to}</span>
    </button>
  );
}

function DropArt() {
  return (
    <svg viewBox="0 0 190 180" width={190} height={180} aria-hidden>
      <path d="M40 22c30-18 90-20 120 4s32 70 20 100-50 50-90 48S12 150 8 110 10 40 40 22z" fill="#e8e9ee" />
      <g stroke="#3a3d46" strokeWidth={2} strokeLinejoin="round" fill="#fff">
        <rect x="20" y="38" width="118" height="92" rx="6" />
        <path d="M20 44a6 6 0 0 1 6-6h106a6 6 0 0 1 6 6v8H20z" fill="#6c6e79" />
        <rect x="30" y="66" width="30" height="24" rx="3" />
        <rect x="30" y="98" width="30" height="24" rx="3" />
        <rect x="104" y="92" width="62" height="58" rx="5" transform="rotate(-8 135 121)" fill="#6c6e79" />
        <rect x="108" y="96" width="54" height="50" rx="4" transform="rotate(-8 135 121)" />
      </g>
      <circle cx="30" cy="45" r="2.2" fill="#fff" />
      <circle cx="38" cy="45" r="2.2" fill="#fff" />
      <path d="M34 84l7-8 5 5 8-9" fill="none" stroke="#3a3d46" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 118v-8M42 118v-12M48 118v-6" stroke="#3a3d46" strokeWidth={2} />
      <path d="M68 66h58v48H68z" fill="none" stroke="#3a3d46" strokeWidth={1.4} strokeDasharray="4 3" />
      <circle cx="136" cy="122" r="15" fill="#fff" stroke="#3a3d46" strokeWidth={2} />
      <path d="M136 107v15h15a15 15 0 0 0-15-15z" fill="#6c6e79" stroke="#3a3d46" strokeWidth={2} strokeLinejoin="round" />
      <path
        d="M96 80c-3-6 3-10 7-6l2 3c-1-6 5-8 8-3 1-5 7-5 9 0 2-3 7-2 7 3v10c0 8-5 14-13 14h-6c-6 0-9-4-11-9z"
        fill="#fff"
        stroke="#3a3d46"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M96 140c-4 2-8 1-10-3m0 0 5 1m-5-1 1-5" fill="none" stroke="#3a3d46" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  );
}

export function ReportCanvas({ onChooseTemplate }: { onChooseTemplate: () => void }) {
  return (
    <ScrollArea
      className="h-full bg-[#f9f9f9]"
      initial={{ top: 1286, left: 95 }}
      vInset={{ right: 22, top: 0, bottom: 0 }}
      hInset={{ bottom: 3, left: 0, right: 0 }}
    >
      <div className="relative h-[2720px] w-[1037px]">
        <div className="sticky top-0 z-10 flex h-12 items-center bg-[#f9f9f9] pl-[166px] text-[15px] text-rk-text">
          <WarnIcon className="mr-2 -ml-[1px]" />
          Period
          <span className="ml-2">
            <DateRange from="Sep 17, 2026" to="Sep 23, 2026" />
          </span>
          <span className="ml-[17px]">Compare to</span>
          <span className="ml-2">
            <DateRange from="Sep 10, 2026" to="Sep 16, 2026" />
          </span>
        </div>
        <div className="absolute top-[72px] left-[167px] w-[794px] bg-white">
          <div className="relative h-[1404px]">
            <div className="absolute top-[40px] left-10 flex items-center gap-2 text-[16px] font-bold text-rk-text">
              <LogoIcon width={28} height={28} />
              {brand.name}
            </div>
            <div className="absolute top-[520px] w-full text-center text-[40px] leading-[48px] font-bold text-rk-text">Untitled report</div>
            <div className="absolute top-[1347px] w-full text-center text-[15px] leading-5 text-[#8a8e9b]">Generated on September 24, 2026</div>
          </div>
          <div className="relative flex h-0 items-center justify-center border-t border-dashed border-[#c4c7cf]">
            <span className="bg-white px-3 text-[14px] leading-5 text-rk-text-2">page break</span>
          </div>
          <div className="relative h-[1180px]">
            <div className="mt-[18px] flex h-[54px] border-y border-[#dedede]">
              <div className="flex w-[237px] items-center justify-center border-r border-[#dedede]">
                <div className="flex items-center gap-2 text-[15px] leading-5 font-bold text-rk-text">
                  <LogoIcon width={26} height={26} />
                  <span className="leading-[15px]">
                    RK
                    <br />
                    <span className="text-[11px] font-semibold">{brand.name}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-[30px] ml-[37px] flex h-[400px] w-[720px] flex-col items-center rounded border border-dashed border-[#c4c7cf] pt-[62px]">
              <DropArt />
              <p className="mt-4 text-[14px] leading-[21px] text-rk-muted">
                Drag and drop a widget from the left sidebar
                <br />
                <span className="block text-center">or</span>
              </p>
              <button type="button" onClick={onChooseTemplate} className="mt-[5px] h-7 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
                Choose template
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
