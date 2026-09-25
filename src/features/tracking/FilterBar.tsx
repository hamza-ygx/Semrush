"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DateRange } from "./controls";

export function FilterBar({
  top,
  filters,
  className = "",
  maxWidth = [2000, 2000],
}: {
  top?: ReactNode;
  filters?: ReactNode;
  className?: string;
  maxWidth?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const anchor = (filters ? el.lastElementChild : el.firstElementChild)?.getBoundingClientRect().top ?? r.top;
      setBox(anchor < 8 ? { left: r.left - 32, width: r.width + 64 } : null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [filters]);

  return (
    <>
      <div ref={ref} className={`flex flex-col gap-2 ${className}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">{top ?? filters}</div>
          <DateRange />
        </div>
        {top && filters && (
          <div style={{ maxWidth: maxWidth[0] }} className="flex flex-wrap items-center gap-2">
            {filters}
          </div>
        )}
      </div>
      {box && (
        <div
          style={{ left: box.left, width: box.width }}
          className="fixed top-0 z-40 bg-[#f5f6f6] px-8 py-[9px] shadow-[0_2px_4px_rgba(25,27,35,0.08),0_1px_0_rgba(25,27,35,0.04)]"
        >
          <div className="flex items-start justify-between gap-2">
            <div style={{ maxWidth: maxWidth[1] }} className="flex flex-wrap items-center gap-2">
              {filters ?? top}
            </div>
            <DateRange />
          </div>
        </div>
      )}
    </>
  );
}
