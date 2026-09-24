"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export const currentBegin = "20260918";
const defaultBegin = "20260917";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseDay(v: string) {
  return new Date(Date.UTC(+v.slice(0, 4), +v.slice(4, 6) - 1, +v.slice(6, 8)));
}

export function periodRange(begin: string) {
  const a = parseDay(/^\d{8}$/.test(begin) ? begin : defaultBegin);
  const b = new Date(a.getTime() + 7 * 864e5);
  return [a, b] as const;
}

export function periodLabel(begin: string) {
  const [a, b] = periodRange(begin);
  const m = (d: Date) => months[d.getUTCMonth()];
  if (a.getUTCMonth() === b.getUTCMonth()) return `${m(a)} ${a.getUTCDate()}-${b.getUTCDate()}, ${b.getUTCFullYear()}`;
  return `${m(a)} ${a.getUTCDate()} - ${m(b)} ${b.getUTCDate()}, ${b.getUTCFullYear()}`;
}

type Ctx = { begin: string; setBegin: (v: string) => void; fresh: boolean };

const TrackingCtx = createContext<Ctx>({ begin: defaultBegin, setBegin: () => {}, fresh: false });

export function TrackingProvider({ begin, fresh = false, children }: { begin?: string; fresh?: boolean; children: ReactNode }) {
  const [cur, setCur] = useState(begin && /^\d{8}$/.test(begin) ? begin : defaultBegin);
  return <TrackingCtx.Provider value={{ begin: cur, setBegin: setCur, fresh }}>{children}</TrackingCtx.Provider>;
}

export const useTracking = () => useContext(TrackingCtx);

export type TrackingParams = Promise<{ date_begin?: string; date_end?: string; prediction?: string }>;
