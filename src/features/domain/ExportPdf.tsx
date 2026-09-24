"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/primitives";
import { ExportIcon } from "@/components/ui/icons";

const Gem = () => (
  <svg viewBox="0 0 16 16" width={13} height={13} className="ml-[6px] inline-block align-[-1px]">
    <path d="M4 2.5h8l3 3.6L8 14 1 6.1z" fill="#26aaff" />
    <path d="M1 6.1h14M4 2.5l2.2 3.6L8 14l1.8-7.9L12 2.5M6.2 6.1h3.6" fill="none" stroke="#9ddcff" strokeWidth=".8" />
  </svg>
);

function Toggle({ label }: { label: ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className="flex h-10 items-center gap-2 text-[16px] leading-6 text-rk-text">
      <span className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-[#009f81]" : "bg-[#dfe1e5]"}`}>
        <span className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-all ${on ? "left-[23px]" : "left-[3px]"}`} />
      </span>
      {label}
    </button>
  );
}

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width={24} height={24} className="text-rk-text">
    <path d={d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const actions = [
  { icon: "M12 4v11M7 10.5l5 5 5-5M5 20h14", label: ["Download", "PDF"] },
  { icon: "M3.5 5.5h17v13h-17zM3.5 6l8.5 7 8.5-7", label: ["Send to my", "email"] },
  { icon: "M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20c.5-3.5 3.2-6 6.5-6 1.6 0 3 .5 4 1.4M15 5.5a3 3 0 0 1 0 5.5M16.5 14.5l2 5 1-2 2-1z", label: ["Share", "via email"] },
  { icon: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1", label: ["Create online", "dashboard"], gem: true },
];

function ExportModal({ onClose }: { onClose: () => void }) {
  const [agree, setAgree] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return createPortal(
    <div className="fixed top-0 left-0 z-[100] h-screen w-screen overflow-y-auto bg-[rgba(25,27,35,0.38)] py-10" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Export settings" className="relative mx-auto w-[720px] overflow-hidden rounded-xl bg-white shadow-popover">
        <button type="button" aria-label="Close" onClick={onClose} className="absolute top-[16px] right-[17px] flex h-6 w-6 items-center justify-center rounded text-rk-text-2 hover:bg-rk-hover">
          <svg viewBox="0 0 16 16" width={18} height={18}>
            <path d="M2 2l12 12M14 2 2 14" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
          </svg>
        </button>
        <div className="h-[236px] bg-rk-bg px-10 pt-[38px]">
          <h2 className="text-[24px] leading-8 font-semibold">Export settings</h2>
          <div className="mt-[14px]">
            <Toggle label="Schedule" />
            <Toggle
              label={
                <span>
                  No {brand.name} mentions
                  <Gem />
                </span>
              }
            />
            <Toggle label="AI Summary" />
          </div>
        </div>
        <div className="px-10 pt-10 pb-[20px]">
          <label className="flex items-center gap-4 text-[14px] leading-5 text-rk-text">
            <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} className="h-4 w-4 shrink-0 appearance-none rounded-[3px] border border-[#d3d5db] bg-white checked:border-rk-link checked:bg-rk-link" />
            <span>
              I have read{" "}
              <span className="text-rk-link hover:text-rk-link-hover">Privacy Policy</span>{" "}
              and agreed with its terms. I acknowledge that I am responsible for receiving consent if I provide an email address on behalf of another person.
            </span>
          </label>
          <div className="mt-[29px] grid grid-cols-4 gap-4">
            {actions.map((a) => (
              <button
                key={a.label[0]}
                type="button"
                disabled={!agree}
                onClick={onClose}
                className="flex h-[151px] flex-col items-center rounded-md border border-[#c4c7cf] pt-[35px] text-[16px] leading-6 text-rk-text enabled:hover:bg-rk-bg"
              >
                <I d={a.icon} />
                <span className="mt-[8px]">{a.label[0]}</span>
                <span>
                  {a.label[1]}
                  {a.gem && <Gem />}
                </span>
              </button>
            ))}
          </div>
          <button type="button" disabled={!agree} className="mt-[17px] flex h-[57px] w-full items-center justify-center gap-2 rounded-md border border-[#c4c7cf] text-[16px] text-rk-text enabled:hover:bg-rk-bg">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M5.5 4 1.5 8l4 4M10.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              Embed via iFrame
              <Gem />
            </span>
          </button>
          <div className="mt-[31px] text-center">
            <button type="button" className="text-[14px] leading-5 text-rk-muted underline decoration-dashed underline-offset-[4px] hover:text-rk-text">
              View report balance
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function ExportPdf() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="tertiary" onClick={() => setOpen(true)} className="h-7 border-[#d3d5db] !bg-[#eceeee] px-[9px] !text-rk-muted">
        <ExportIcon />
        Export to PDF
      </Button>
      {open && <ExportModal onClose={() => setOpen(false)} />}
    </>
  );
}
