import { cache } from "react";
import { backendEnabled } from "@/lib/auth/config";
import { liveSource } from "@/lib/seo/sources";
import { buildTrafficLive, type Ga4Sets, type TrafficLive } from "./ga4Live";
import { rkjhList } from "./part8/lists";

export type TrafficParams = { q?: string; lid?: string };

export function trafficDomain({ q, lid }: TrafficParams) {
  const d = q
    ?.trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
  if (d) return d;
  return lid === rkjhList.id ? rkjhList.domains[0] : null;
}

export const loadTrafficLive = cache(async (domain: string | null): Promise<TrafficLive | null> => {
  if (!backendEnabled || !domain) return null;
  try {
    return buildTrafficLive(await liveSource<Ga4Sets>("ga4", domain));
  } catch {
    return null;
  }
});

export const trafficLiveFor = (p: TrafficParams) => loadTrafficLive(trafficDomain(p));
