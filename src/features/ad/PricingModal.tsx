"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckIcon } from "@/components/ui/icons";
import { useScrollLock } from "@/components/ui/Modal";
import { basePlan, proPlan } from "./data";

function Feature({ children, off }: { children: React.ReactNode; off?: boolean }) {
  return (
    <li className={`flex gap-[10px] text-[14px] leading-5 ${off ? "text-[#8b8d8c]" : ""}`}>
      {off ? <span className="mt-[9px] h-[1.5px] w-[10px] shrink-0 bg-[#a9abaa] ml-[2px] mr-[2px]" /> : <CheckIcon className="mt-[2px] shrink-0 text-[#009f81]" strokeWidth={2} width={14} height={14} />}
      <span>{children}</span>
    </li>
  );
}

const trial = "mt-auto flex h-10 w-full items-center justify-center rounded-md bg-[#009f81] text-[16px] font-semibold text-white hover:bg-[#007c65]";

export function PricingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open, onClose]);
  useScrollLock(open);
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(0,4,4,0.333)] pt-10 pb-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Get full access to the Advertising Toolkit" className="relative w-[850px] shrink-0 rounded-xl bg-white px-10 pt-[37px] pb-[43px]">
        <button
          type="button"
          aria-label="Close"
          autoFocus
          onClick={onClose}
          className="absolute top-[5px] right-[5px] flex h-[45px] w-[45px] items-center justify-center rounded-md text-rk-text-2 outline-none hover:bg-rk-bg focus-visible:ring-0 focus:border-2 focus:border-[#7d8ce0] focus:shadow-[0_0_0_2px_#d4dcfa]"
        >
          <svg viewBox="0 0 20 20" width={20} height={20}>
            <path d="M3 3l14 14M17 3 3 17" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="text-center text-[24px] leading-8 font-semibold">Get full access to the Advertising Toolkit</h2>
        <p className="mt-[13px] text-center text-[16px] leading-6">Choose the plan that best suits your needs and enjoy a 7-day free trial</p>
        <div className="mt-[22px] grid grid-cols-2 gap-4">
          <div className="flex h-[492px] flex-col rounded-xl border border-[#d6d8e1] px-6 pt-[23px] pb-[24px]">
            <div className="text-[20px] leading-7 font-semibold text-rk-text-2">{basePlan.name}</div>
            <div className="mt-[9px] flex items-baseline">
              <span className="text-[32px] leading-10 font-bold">{basePlan.price}</span>
              <span className="text-[14px] text-rk-text-2">/mo</span>
            </div>
            <ul className="mt-[10px] flex flex-col gap-2">
              {basePlan.features.map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
              <Feature off>AdClarity</Feature>
            </ul>
            <button type="button" className={trial}>
              Get 7 days free trial
            </button>
          </div>
          <div className="relative flex h-[492px] flex-col rounded-xl border border-[#c7d3f2] bg-[#f0f5ff] px-6 pt-[23px] pb-[24px]">
            <span className="absolute top-[28px] right-6 rounded-md bg-[#dd5a08] px-[5px] text-[11px] leading-[15px] font-semibold text-white">best choice</span>
            <div className="text-[20px] leading-7 font-semibold text-rk-text-2">{proPlan.name}</div>
            <div className="mt-[9px] flex items-baseline">
              <span className="text-[32px] leading-10 font-bold">{proPlan.price}</span>
              <span className="text-[14px] text-rk-text-2">/mo</span>
            </div>
            <p className="mt-[10px] text-[14px] leading-5">
              Get everything in the <span className="font-medium">Base Plan</span>, plus all <span className="font-medium">AdClarity</span> features:
            </p>
            <ul className="mt-[12px] flex flex-col gap-2">
              {proPlan.features.map((f) => (
                <Feature key={f}>{f}</Feature>
              ))}
            </ul>
            <button type="button" className={trial}>
              Get 7 days free trial
            </button>
          </div>
        </div>
        <p className="mx-auto mt-[19px] flex w-[590px] gap-2 text-center text-[14px] leading-5 text-[#a9abaa]">
          <svg viewBox="0 0 16 16" width={16} height={16} className="mt-[2px] shrink-0">
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth={1.3} />
            <path d="M6.2 6.3a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.4M8 11.3v.2" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
          </svg>
          <span>In the next billing period, you will be charged the full cost of the Advertising Toolkit subscription. The free trial will only cover the Advertising Toolkit.</span>
        </p>
      </div>
    </div>,
    document.body,
  );
}
