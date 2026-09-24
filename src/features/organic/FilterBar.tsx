"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FilterDropdown, SearchInput } from "./ui";

export function useStuck(offset = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => {
      const el = ref.current;
      if (!el) return;
      setStuck(el.getBoundingClientRect().top <= offset + 0.5 && window.scrollY > 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [offset]);
  return { ref, stuck };
}

export const positionFilters = [
  { label: "Positions", options: ["Top 3", "Top 10", "Top 20", "Top 50", "Top 100", "Custom range"] },
  { label: "Volume", options: ["100,001+", "10,001-100,000", "1,001-10,000", "101-1,000", "11-100", "1-10", "Custom range"] },
  { label: "KD", options: ["Very hard 85-100%", "Hard 70-84%", "Difficult 50-69%", "Possible 30-49%", "Easy 15-29%", "Very easy 0-14%", "Custom range"] },
  { label: "Intent", options: ["Informational", "Navigational", "Commercial", "Transactional"] },
  { label: "SERP Features", options: ["Local pack", "Sitelinks", "Reviews", "Video", "People also ask", "AI Overview", "Image pack"] },
  { label: "Advanced filters", options: ["Include keywords", "Exclude keywords", "CPC", "Competition", "Results", "Traffic", "URL"] },
];

export function FilterBar({ onFilter, filters = positionFilters, children }: { onFilter?: (v: string) => void; filters?: { label: string; options: string[] }[]; children?: ReactNode }) {
  const { ref, stuck } = useStuck(0);
  return (
    <div ref={ref} className={`sticky top-0 z-30 flex h-[59px] items-center gap-[8px] bg-[#f9f9fa] px-8 ${stuck ? "h-[60px] border-b border-rk-border shadow-[0_1px_2px_rgba(25,27,35,0.06)]" : ""}`}>
      <SearchInput placeholder="Filter by keyword" width="w-[196px]" onChange={onFilter} />
      {children ?? filters.map((f) => <FilterDropdown key={f.label} label={f.label} options={f.options} />)}
    </div>
  );
}
