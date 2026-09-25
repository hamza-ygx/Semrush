"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export const currentBegin = "20260918";
const latestBegin = "20260919";
const defaultBegin = "20260917";
const lastDay = Date.UTC(2026, 8, 25);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDay(v: string) {
  return new Date(Date.UTC(+v.slice(0, 4), +v.slice(4, 6) - 1, +v.slice(6, 8)));
}

export function periodRange(begin: string) {
  const a = parseDay(/^\d{8}$/.test(begin) ? begin : defaultBegin);
  const b = new Date(Math.max(a.getTime(), Math.min(a.getTime() + 7 * 864e5, lastDay)));
  return [a, b] as const;
}

export function periodLabel(begin: string, dash = "-") {
  const [a, b] = periodRange(begin);
  const m = (d: Date) => months[d.getUTCMonth()];
  if (a.getUTCMonth() === b.getUTCMonth()) return `${m(a)} ${a.getUTCDate()}${dash}${b.getUTCDate()}, ${b.getUTCFullYear()}`;
  return `${m(a)} ${a.getUTCDate()} - ${m(b)} ${b.getUTCDate()}, ${b.getUTCFullYear()}`;
}

type Ctx = { begin: string; setBegin: (v: string) => void; fresh: boolean; latest: boolean };

const TrackingCtx = createContext<Ctx>({ begin: defaultBegin, setBegin: () => {}, fresh: false, latest: false });

export function TrackingProvider({ begin, fresh = false, children }: { begin?: string; fresh?: boolean; children: ReactNode }) {
  const [cur, setCur] = useState(begin === "latest" ? latestBegin : begin && /^\d{8}$/.test(begin) ? begin : defaultBegin);
  return <TrackingCtx.Provider value={{ begin: cur, setBegin: setCur, fresh, latest: cur === latestBegin }}>{children}</TrackingCtx.Provider>;
}

export const useTracking = () => useContext(TrackingCtx);

export type TrackingParams = Promise<{ date_begin?: string; date_end?: string; prediction?: string }>;
