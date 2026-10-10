"use client";

import { createContext, useContext, type ReactNode } from "react";

const DemoContext = createContext(false);

export function TrafficDemoProvider({ demo, children }: { demo: boolean; children: ReactNode }) {
  return <DemoContext.Provider value={demo}>{children}</DemoContext.Provider>;
}

export const useTrafficDemo = () => useContext(DemoContext);

export function DemoTag({ className = "" }: { className?: string }) {
  return <span className={`inline-flex h-5 items-center rounded-[4px] bg-[#f0f1f1] px-[6px] text-[12px] leading-4 font-normal text-rk-muted ${className}`}>Demo data</span>;
}
