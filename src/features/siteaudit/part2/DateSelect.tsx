"use client";

import { Popover } from "@/components/ui/Popover";
import { ChevronDown } from "@/components/ui/icons";
import { crawlDate } from "./data";

export function DateSelect({ className = "", label = crawlDate }: { className?: string; label?: string }) {
  return (
    <Popover
      offset={5}
      panelClassName="w-[176px] py-0! overflow-hidden"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex h-[30px] items-center gap-2 rounded-md border pr-[7px] pl-2 text-[14px] text-rk-text ${
            open ? "border-[#8fa6f2] bg-white" : "border-rk-border-strong bg-white hover:bg-rk-bg"
          } ${className}`}
        >
          {label}
          <ChevronDown width={16} height={16} className="text-rk-text" />
        </button>
      )}
    >
      {(close) => (
        <button
          type="button"
          onClick={close}
          className="flex h-8 w-full items-center border-l-2 border-[#3f444c] bg-[#e9effa] pl-[6px] text-left text-[14px] text-rk-text"
        >
          {label}
        </button>
      )}
    </Popover>
  );
}
