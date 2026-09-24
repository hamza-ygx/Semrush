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
  "Past Quarter": "past_quarter",
  "Past Season": "past_season",
  "Past Year": "past_year",
};

export function GrowthControls({ active }: { active?: string }) {
  const router = useRouter();
  const initial = periods.find((p) => periodType[p] === active) ?? "Past 6 Months";
  const [value, setValue] = useState<(typeof periods)[number]>(initial);
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const go = (p: (typeof periods)[number]) => router.push(`${routes.domainGrowthReport}?periodType=${periodType[p]}`);
  return (
    <div className="flex items-center gap-[9px]">
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`flex h-7 w-[179px] items-center justify-between rounded-md border bg-white pr-[10px] pl-[9px] text-[14px] text-rk-text ${
            open ? "border-[#7a86f2] ring-2 ring-[#d7dcfc]" : "border-[#d3d5db]"
          }`}
        >
          {value}
          <ChevronDown width={14} height={14} className="text-rk-text" />
        </button>
        {open && (
          <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-[179px] rounded-md bg-white py-1 shadow-popover">
            {periods.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setValue(p);
                  setOpen(false);
                  go(p);
                }}
                className={`block w-full px-[9px] py-[6px] text-left text-[14px] leading-5 hover:bg-rk-bg ${p === value ? "bg-[#eef2fd]" : ""}`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
      <button type="button" onClick={() => go(value)} className="h-7 rounded-md bg-rk-btn-dark px-[10px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
        Compare
      </button>
      <button
        type="button"
        onClick={() => active && router.push(routes.domainGrowthReport)}
        className={`h-7 rounded-md border border-[#d3d5db] bg-[#eceef0] px-[9px] text-[14px] ${active ? "text-rk-text-2 hover:bg-rk-hover" : "cursor-default text-rk-muted"}`}
      >
        Cancel
      </button>
    </div>
  );
}
