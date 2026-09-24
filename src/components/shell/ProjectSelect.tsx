"use client";

import { useState } from "react";
import { RkjhFavicon, RkjhFaviconSquare } from "../icons";
import { CheckIcon, ChevronDown, PlusIcon } from "../ui/icons";
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
        className="flex h-10 items-center gap-2 rounded-md border border-rk-border bg-white pr-[9px] pl-[11px] text-[16px] text-rk-text hover:bg-rk-bg xl:h-8 xl:text-[14px]"
      >
        <RkjhFaviconSquare className="shrink-0" />
        <span className="min-w-0 truncate">{current}</span>
        <ChevronDown width={16} height={16} className={`-ml-[2px] shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-[240px] rounded-md bg-white py-1 shadow-popover">
          <div className="px-3 pt-1 pb-[6px] text-[12px] leading-4 text-rk-muted">Folders</div>
          {folders.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setCurrent(f);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-[6px] text-left text-[14px] leading-5 hover:bg-rk-bg ${f === current ? "bg-[#e9f7ff]" : ""}`}
            >
              <RkjhFavicon className="shrink-0" />
              <span className="flex-1 truncate">{f}</span>
              {f === current && <CheckIcon className="text-rk-link" />}
            </button>
          ))}
          <div className="my-1 border-t border-rk-border" />
          <button type="button" onClick={() => setOpen(false)} className="flex w-full items-center gap-2 px-3 py-[6px] text-left text-[14px] leading-5 text-rk-text-2 hover:bg-rk-bg">
            <PlusIcon />
            Create folder
          </button>
        </div>
      )}
    </div>
  );
}
