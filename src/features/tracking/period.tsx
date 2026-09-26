"use client";

import { periodRange, useTracking } from "./context";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const full = (d: Date) => `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;

export function SummaryPeriod() {
  const { begin, end } = useTracking();
  const [a, b] = periodRange(begin, end);
  return <>{`${full(a)} - ${full(b)}`}</>;
}

export function CompetitorGrowth() {
  const { latest, begin } = useTracking();
  return <>{latest ? "6.82%" : begin === "20260920" ? "4.21%" : "12.94%"}</>;
}
