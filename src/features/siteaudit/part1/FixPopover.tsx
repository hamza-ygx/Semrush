"use client";

import { useToggle } from "./ui";

export const dashedCls =
  "text-[14px] text-rk-muted underline decoration-[#a9abb6] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text";

export type FixInfo = { about: string; fix: string };

export function FixPopover({ issue, className = "right-[-63px]" }: { issue: FixInfo; className?: string }) {
  const { open, ref, toggle } = useToggle();
  return (
    <span ref={ref} className="relative inline-block">
      <button type="button" onClick={toggle} data-testid="sa-howto" className={dashedCls}>
        How to fix
      </button>
      {open && (
        <div className={`absolute top-[calc(100%+6px)] z-40 flex w-[600px] overflow-hidden rounded-md bg-white text-left text-[14px] leading-5 font-normal text-rk-text shadow-popover ${className}`}>
          <div className="w-[300px] shrink-0 px-4 pt-[16px] pb-[16px]">
            <div className="text-[16px] leading-6 font-semibold">About the issue</div>
            <p className="mt-[4px] whitespace-pre-line">{issue.about}</p>
          </div>
          <div className="flex-1 bg-[#e4fffa] px-4 pt-[16px] pb-[16px]">
            <div className="text-[16px] leading-6 font-semibold">How to fix</div>
            <p className="mt-[4px] whitespace-pre-line">{issue.fix}</p>
          </div>
        </div>
      )}
    </span>
  );
}
