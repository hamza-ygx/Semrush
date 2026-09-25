"use client";

import { useRef, type ReactNode } from "react";

export function ScrollTable({ header, children, width, stickyTop = 73 }: { header: ReactNode; children: ReactNode; width: number; stickyTop?: number }) {
  const head = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div ref={head} className="sticky z-20 overflow-hidden bg-white" style={{ top: stickyTop }}>
        <div style={{ width }}>{header}</div>
      </div>
      <div
        data-testid="scroll-body"
        onScroll={(e) => {
          if (head.current) head.current.scrollLeft = e.currentTarget.scrollLeft;
        }}
        className="overflow-x-auto [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d4d6d6]"
      >
        <div style={{ width }}>{children}</div>
      </div>
    </div>
  );
}

export function SortIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden className="shrink-0">
      <path d="M2.5 4h11M2.5 8h7.5M2.5 12h4" stroke="#484a54" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

export function Chevron({ open }: { open?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} aria-hidden className={`shrink-0 text-rk-text-2 transition-transform ${open ? "rotate-90" : ""}`}>
      <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
