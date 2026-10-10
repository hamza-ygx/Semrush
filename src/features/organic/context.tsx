"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { OrganicLive } from "./live";

const Ctx = createContext<{ live: OrganicLive | null; demo: boolean }>({ live: null, demo: false });

export function OrganicLiveProvider({ live, demo, children }: { live: OrganicLive | null; demo: boolean; children: ReactNode }) {
  return <Ctx.Provider value={{ live, demo }}>{children}</Ctx.Provider>;
}

export const useOrganicLive = () => useContext(Ctx).live;
export const useOrganicDemo = () => useContext(Ctx).demo;

export function useOrganicMark() {
  const { live, demo } = useContext(Ctx);
  return !!live && !demo;
}

export function useOrganicQ() {
  const live = useContext(Ctx).live;
  return `?db=se&q=${live ? encodeURIComponent(live.domain) : "rkjh.se"}&searchType=domain`;
}
