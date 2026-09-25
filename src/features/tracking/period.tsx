"use client";

import { periodRange, useTracking } from "./context";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const full = (d: Date) => `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;

export function SummaryPeriod() {
  const { begin } = useTracking();
  const [a, b] = periodRange(begin);
  return <>{`${full(a)} - ${full(b)}`}</>;
}

export function CompetitorGrowth() {
  const { latest } = useTracking();
  return <>{latest ? "6.82%" : "12.94%"}</>;
}
