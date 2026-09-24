"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown, ExportIcon, PlusIcon } from "@/components/ui/icons";

function useMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  return { open, setOpen, close, ref };
}

function DarkBox({ checked }: { checked: boolean }) {
  return (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${checked ? "border-rk-btn-dark bg-rk-btn-dark" : "border-rk-border-strong bg-white"}`}>
      {checked && (
        <svg viewBox="0 0 16 16" width={12} height={12}>
          <path d="m3.5 8.5 3 3 6-6.5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

const noteKinds = ["Google Updates (organic)", "Google Updates (paid)", "Google Updates (unconfirmed)", "Sensor", brand.name, "My notes"];

export function NotesMenu() {
  const { open, setOpen, close, ref } = useMenu();
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(noteKinds.map((k) => [k, k !== "Google Updates (unconfirmed)"])));
  const [visible, setVisible] = useState(true);
  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        data-testid="traffic-notes"
        onClick={() => setOpen(!open)}
        className="group -mx-1 flex h-5 items-center gap-[6px] rounded px-1 text-[14px] leading-5 text-rk-text outline-none focus-visible:ring-2 focus-visible:ring-[#8f9cea] focus-visible:ring-offset-[1px]"
      >
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <path d="M2.5 2.5h11v8.5H6l-3.5 3z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
        <span className="underline-offset-[5px] group-hover:underline">Notes</span>
        <ChevronDown className="-ml-[1px]" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+7px)] right-0 z-50 w-[305px] rounded-md bg-white px-4 pt-[15px] pb-[18px] shadow-popover">
          <div className="text-[16px] leading-6 font-semibold">Notes management</div>
          <div className="mt-[9px]">
            {noteKinds.map((k) => (
              <button key={k} type="button" onClick={() => setOn({ ...on, [k]: !on[k] })} className="flex h-8 w-full items-center gap-2 text-left text-[14px] leading-5 text-rk-text">
                <DarkBox checked={on[k]} />
                {k}
              </button>
            ))}
          </div>
          <div className="mt-[9px] flex items-center">
            <button type="button" onClick={close} className="flex h-7 shrink-0 items-center gap-2 rounded-md bg-rk-btn-dark px-[10px] whitespace-nowrap text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
              <PlusIcon />
              Compose note
            </button>
            <button type="button" disabled className="ml-[25px] h-7 shrink-0 rounded-md border whitespace-nowrap border-[#e0e1e9] bg-[#f7f7f9] px-[8px] text-[14px] text-[#a9abb6]">
              View all
            </button>
            <button
              type="button"
              aria-label={visible ? "Hide notes" : "Show notes"}
              onClick={() => setVisible(!visible)}
              className="ml-[9px] flex h-7 w-[33px] items-center justify-center rounded-md border border-rk-border-strong bg-[#f4f5f9] text-rk-text-2 hover:bg-rk-hover"
            >
              <svg viewBox="0 0 16 16" width={16} height={16}>
                <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" fill="none" stroke="currentColor" strokeWidth={1.4} />
                <circle cx="8" cy="8" r="2" fill={visible ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.4} />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ExportDropdown() {
  const { open, setOpen, close, ref } = useMenu();
  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        data-testid="trends-export"
        onClick={() => setOpen(!open)}
        className={`inline-flex h-7 items-center gap-[7px] rounded-md border border-[#d3d5db] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : "bg-[#f7f8f9]"}`}
      >
        <ExportIcon width={16} height={16} />
        Export
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] right-0 z-50 w-[119px] rounded-md bg-white py-1 shadow-popover">
          {["Excel", "CSV", "CSV Semicolon"].map((f) => (
            <button key={f} type="button" onClick={close} className="flex h-8 w-full items-center px-2 text-left text-[14px] leading-5 whitespace-nowrap text-rk-text hover:bg-rk-bg">
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
