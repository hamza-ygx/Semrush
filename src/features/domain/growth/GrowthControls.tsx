"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown } from "@/components/ui/icons";
import { periods } from "../data";

const periodType: Record<(typeof periods)[number], string> = {
  "Past 3 Months": "past_months_3",
  "Past 6 Months": "past_months_6",
  "Season over Season": "season",
  "Quarter over Quarter": "quarter",
  "Year over Year": "year",
};

export function GrowthControls({ active }: { active?: string }) {
  const router = useRouter();
  const initial = periods.find((p) => periodType[p] === active) ?? "Past 6 Months";
  const [value, setValue] = useState<(typeof periods)[number]>(initial);
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const go = (p: (typeof periods)[number]) => router.push(`${routes.domainGrowthReport}?periodType=${periodType[p]}`);
  return (
    <div className="flex items-center gap-[8px]">
      <div ref={ref} className="relative">
        <button
          type="button"
          data-testid="growth-period"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`flex h-7 w-[179px] items-center justify-between rounded-md border pr-[10px] pl-[8px] text-[14px] text-rk-text ${open ? "border-[#a9b8ea] bg-[#f8faff]" : "border-[#d3d5db] bg-white"}`}
        >
          {value}
          <ChevronDown width={18} height={18} className="-mr-[2px] text-rk-text [&_path]:stroke-[2]" />
        </button>
        {open && (
          <div role="listbox" className="absolute top-[calc(100%+5px)] left-0 z-50 w-[179px] rounded-md bg-white py-1 shadow-popover">
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setValue(p);
                  setOpen(false);
                  go(p);
                }}
                role="option"
                aria-selected={p === value}
                className={`block h-8 w-full border-l-2 pl-[7px] text-left text-[14px] leading-5 text-rk-text ${p === value ? "border-rk-text bg-[#ecf0fd]" : "border-transparent hover:bg-rk-bg"}`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
      <button type="button" onClick={() => go(value)} className="h-7 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
        Compare
      </button>
      <button
        type="button"
        onClick={() => active && router.push(routes.domainGrowthReport)}
        className={`h-7 rounded-md border border-[#d3d5db] bg-[#eceef0] px-[7.5px] text-[14px] ${active ? "text-rk-text-2 hover:bg-rk-hover" : "cursor-default text-rk-muted"}`}
      >
        Cancel
      </button>
    </div>
  );
}
