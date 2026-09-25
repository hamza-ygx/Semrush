"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "@/components/ui/icons";
import { useOutsideClose } from "@/components/ui/Popover";
import { databases } from "./data";
import { DbFlag } from "./flags";

const row = 40;
const view = 261;
const minThumb = 48;

export function DbSelect({ initial }: { initial: string }) {
  const [open, setOpen] = useState(false);
  const [db, setDb] = useState(initial);
  const [query, setQuery] = useState("");
  const [top, setTop] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const close = () => {
    setOpen(false);
    setQuery("");
  };
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  const q = query.trim().toLowerCase();
  const items = q ? databases.filter((d) => d.name.toLowerCase().includes(q) || d.code.toLowerCase().startsWith(q)) : databases;
  const total = items.length * row;
  const max = Math.max(0, total - view);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!open || !el) return;
    const i = databases.findIndex((d) => d.code === db);
    const t = Math.min(Math.max(0, (i + 1) * row - view), Math.max(0, databases.length * row - view));
    el.scrollTop = t;
    setTop(t);
  }, [open, db]);

  const pick = (code: string) => {
    setDb(code);
    close();
  };

  const thumbH = total > view ? Math.max(minThumb, (view / total) * view) : 0;
  const thumbY = max ? (top / max) * (view - thumbH) : 0;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Database"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        className={`flex h-10 w-[89px] items-center gap-2 rounded-md border border-rk-border-strong bg-white pl-3 text-[16px] ${open ? "" : "hover:bg-rk-bg"}`}
      >
        <DbFlag code={db} width={16} height={12} />
        {db}
        <ChevronDown strokeWidth={2.2} className="-ml-[2px]" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+3px)] right-0 z-40 w-[287px] rounded-md bg-white pb-1 text-left shadow-popover">
          <div className="absolute -top-[1px] -left-[1px] z-20 h-[45px] w-[290px] rounded-md border-2 border-[#8792e6] bg-white shadow-[0_0_0_1px_#d3d9ff]">
            <svg viewBox="0 0 16 16" width={16} height={16} className="absolute top-[12px] left-[13px] text-[#9a9da6]">
              <circle cx="6.6" cy="6.6" r="4.6" fill="none" stroke="currentColor" strokeWidth={1.8} />
              <path d="m10.2 10.2 3.8 3.8" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setTop(0);
                if (listRef.current) listRef.current.scrollTop = 0;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && items[0]) {
                  e.preventDefault();
                  pick(items[0].code);
                }
              }}
              aria-label="Search database"
              placeholder="Search"
              className="h-full w-full rounded-md bg-transparent pr-3 pl-[38px] text-[16px] outline-none placeholder:text-[#a9abaa]"
            />
          </div>
          <div className="relative mt-[44px]">
            <div
              ref={listRef}
              role="listbox"
              onScroll={(e) => setTop(e.currentTarget.scrollTop)}
              style={{ maxHeight: view }}
              className="overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((d) => (
                <button
                  key={d.code}
                  type="button"
                  role="option"
                  aria-selected={d.code === db}
                  onClick={() => pick(d.code)}
                  className={`relative flex h-10 w-full items-center gap-[10px] pl-[14px] text-[16px] ${d.code === db ? "bg-[#ebf1ff]" : "hover:bg-rk-bg"}`}
                >
                  {d.code === db && <span className="absolute top-0 left-[2px] h-[39px] w-[2px] bg-[linear-gradient(#1c1d24_0_78%,transparent)]" />}
                  <DbFlag code={d.code} />
                  {d.name}
                </button>
              ))}
              {!items.length && <div className="px-[14px] py-[10px] text-[14px] text-rk-muted">Nothing found</div>}
            </div>
            {top > 0 && <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-[linear-gradient(#fff_20%,rgba(255,255,255,0))]" />}
            {thumbH > 0 && <div className="pointer-events-none absolute right-[2px] w-[6px] rounded-full bg-[#d6d8d8]" style={{ top: thumbY, height: thumbH }} />}
          </div>
        </div>
      )}
    </div>
  );
}
