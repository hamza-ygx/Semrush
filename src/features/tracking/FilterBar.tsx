"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
      const next = anchor < 8 ? { left: r.left - 32, width: r.width + 64 } : null;
      setBox((prev) => (prev && next && prev.left === next.left && prev.width === next.width ? prev : next));
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
          <div style={{ "--fmw": `${maxWidth[0]}px` } as CSSProperties} className="flex max-w-[var(--fmw)] flex-wrap items-center gap-2 xl:max-w-none">
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
            <div style={{ "--fmw": `${maxWidth[1]}px` } as CSSProperties} className="flex max-w-[var(--fmw)] flex-wrap items-center gap-2 xl:max-w-none">
              {filters ?? top}
            </div>
            <DateRange />
          </div>
        </div>
      )}
    </>
  );
}
