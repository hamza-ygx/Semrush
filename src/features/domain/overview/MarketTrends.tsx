"use client";

import { useState } from "react";
import { CloseIcon } from "@/components/ui/icons";
import { marketChannels } from "../data";
import { DarkButton, ExtIcon, SparkleIcon } from "../ui";

const BarsIcon = () => (
  <svg viewBox="0 0 20 20" width={20} height={20}>
    <rect width="20" height="20" rx="4" fill="#fff" />
    <path d="M5 9h2.3v6H5zM8.9 5h2.3v10H8.9zM12.8 7.5h2.3V15h-2.3z" fill="#6167e6" />
  </svg>
);

export function MarketTrends() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <section className="mt-4 h-[189px] overflow-hidden rounded-lg border border-[#c9d4f4] bg-white">
      <header className="flex h-[44px] items-center justify-between bg-[#e9effd] pr-[26px] pl-5">
        <div className="flex items-center gap-2 text-[16px] leading-6">
          <BarsIcon />
          <span className="ml-[3px] font-bold">Market Trends and Channels</span>
          <span className="h-5 border-l border-[#a9abb6]" />
          <span className="text-rk-muted">Top market player:</span>
          <span className="blur-[3px] select-none text-rk-muted">search</span>
        </div>
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="text-rk-text-2 hover:text-rk-text">
          <CloseIcon width={14} height={14} />
        </button>
      </header>
      <div className="flex gap-[17px] px-5 pt-[13px]">
        {marketChannels.map((c) => (
          <div key={c.label} className="w-[116px]">
            <div className="flex items-center gap-[3px] text-[13px] leading-4 whitespace-nowrap">
              {c.label}
              {c.ai && <SparkleIcon width={16} height={16} className="text-[#a55ff2]" />}
            </div>
            <div className="flex justify-between text-[13px] leading-4">
              <span className="font-bold">{c.pct}</span>
              <span className="text-rk-muted">{c.value}</span>
            </div>
            <div className="relative mt-[8px] h-10 bg-[#f0f0f1]">
              <div className="absolute inset-x-0 bottom-0" style={{ height: c.height, background: c.color }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[13px] px-5">
        <DarkButton>
          Get insights
          <ExtIcon />
        </DarkButton>
      </div>
    </section>
  );
}
