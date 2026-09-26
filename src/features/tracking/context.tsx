"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export const currentBegin = "20260918";
const latestBegin = "20260919";
const defaultBegin = "20260917";
const lastDay = Date.UTC(2026, 8, 25);
const maxDay = Date.UTC(2026, 8, 26);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDay(v: string) {
  return new Date(Date.UTC(+v.slice(0, 4), +v.slice(4, 6) - 1, +v.slice(6, 8)));
}

export function periodRange(begin: string, end?: string) {
  const a = parseDay(/^\d{8}$/.test(begin) ? begin : defaultBegin);
  if (end && /^\d{8}$/.test(end)) {
    const e = parseDay(end).getTime();
    if (e >= a.getTime()) return [a, new Date(Math.min(e, maxDay))] as const;
  }
  const b = new Date(Math.max(a.getTime(), Math.min(a.getTime() + 7 * 864e5, lastDay)));
  return [a, b] as const;
}

export function periodLabel(begin: string, dash = "-", end?: string) {
  const [a, b] = periodRange(begin, end);
  const m = (d: Date) => months[d.getUTCMonth()];
  if (a.getUTCMonth() === b.getUTCMonth()) return `${m(a)} ${a.getUTCDate()}${dash}${b.getUTCDate()}, ${b.getUTCFullYear()}`;
  return `${m(a)} ${a.getUTCDate()} - ${m(b)} ${b.getUTCDate()}, ${b.getUTCFullYear()}`;
}

type Ctx = { begin: string; end?: string; setBegin: (v: string) => void; fresh: boolean; latest: boolean; hours?: number };

const TrackingCtx = createContext<Ctx>({ begin: defaultBegin, setBegin: () => {}, fresh: false, latest: false });

export type Snap = { begin?: string; end?: string; fresh?: boolean; hours?: number };

export function TrackingProvider({ begin, end, fresh = false, hours, children }: Snap & { children: ReactNode }) {
  const [cur, setCur] = useState({ begin: begin === "latest" ? latestBegin : begin && /^\d{8}$/.test(begin) ? begin : defaultBegin, end });
  const setBegin = (v: string) => setCur({ begin: v, end: undefined });
  return (
    <TrackingCtx.Provider value={{ begin: cur.begin, end: cur.end, setBegin, fresh, hours, latest: cur.begin === latestBegin }}>{children}</TrackingCtx.Provider>
  );
}

export const useTracking = () => useContext(TrackingCtx);
