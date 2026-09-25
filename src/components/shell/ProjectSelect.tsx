"use client";

import { useState } from "react";
import { RkjhFaviconSquare } from "../icons";
import { ChevronDown, PlusIcon } from "../ui/icons";
import { useOutsideClose } from "../ui/Popover";

const folders = ["www.rkjh.se"];

export function ProjectSelect({ width = 162 }: { width?: number }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(folders[0]);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative mr-[5px]">
      <button
        type="button"
        aria-label="Select folder"
        onClick={() => setOpen((o) => !o)}
        style={{ width }}
        className={`flex h-10 items-center gap-2 rounded-md border bg-white pr-[9px] pl-[11px] text-[16px] text-rk-text hover:bg-rk-bg xl:h-8 xl:text-[14px] ${open ? "border-[#7f8bc4]" : "border-rk-border"}`}
      >
        <RkjhFaviconSquare className="shrink-0" />
        <span className="min-w-0 truncate">{current}</span>
        <ChevronDown width={16} height={16} className="-ml-[2px] shrink-0" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-[1px] z-50 w-[318px] rounded-md bg-white pt-[5px] shadow-popover">
          {folders.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setCurrent(f);
                setOpen(false);
              }}
              className={`flex h-[61px] w-full flex-col justify-center border-l-2 pl-[11px] text-left text-[16px] leading-5 xl:h-[52px] xl:text-[14px] ${f === current ? "border-rk-text bg-[#ebf1ff]" : "border-transparent hover:bg-rk-bg"}`}
            >
              <span className="flex items-center gap-[7px] text-rk-text">
                <RkjhFaviconSquare className="shrink-0" />
                <span className="truncate">{f}</span>
              </span>
              <span className="mt-[6px] truncate pl-[20px] text-rk-muted xl:mt-[2px]">{f}</span>
            </button>
          ))}
          <div className="mt-[5px] border-t border-rk-border" />
          <button type="button" onClick={() => setOpen(false)} className="flex h-[52px] w-full items-center gap-2 pt-[4px] pl-[18px] text-left text-[16px] leading-5 text-rk-link hover:text-rk-link-hover xl:h-10 xl:text-[14px]">
            <PlusIcon width={13} height={13} strokeWidth={2.2} />
            Create folder
          </button>
        </div>
      )}
    </div>
  );
}
