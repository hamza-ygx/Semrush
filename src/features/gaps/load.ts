import { cache } from "react";
import { liveSemrush, type LiveSemrush } from "@/lib/seo/semrush";
import { backendEnabled } from "@/lib/auth/config";
import { buildKwMetrics } from "@/features/keywords/live";
import { cdRows, kgOther, kgShared } from "./data";
import { buildCdLive, buildGapLive, type CdLive, type GapLive } from "./live";

const semFor = cache(async (domain: string): Promise<LiveSemrush | null> => liveSemrush(domain));

const mockRows = [...kgShared, ...Object.values(kgOther).flat()];

export async function loadKeywordGap(q: string, competitors: string[]): Promise<{ live: GapLive | null; demo: boolean }> {
  if (!backendEnabled) return { live: null, demo: false };
  try {
    const sem = await semFor(q);
    competitors = competitors.filter(Boolean);
    const live = sem ? buildGapLive({ gap: sem.gap, you: q, rivals: competitors, metrics: buildKwMetrics(sem), mockRows }) : null;
    return { live, demo: !live };
  } catch {
    return { live: null, demo: true };
  }
}

export async function loadCompareDomains(q: string, competitors: string[]): Promise<{ live: CdLive | null; demo: boolean }> {
  if (!backendEnabled) return { live: null, demo: false };
  try {
    const sem = await semFor(q);
    competitors = competitors.filter(Boolean);
    const live = sem ? buildCdLive({ sem, you: q, rivals: competitors, metrics: buildKwMetrics(sem), mockRows, mockCd: cdRows }) : null;
    return { live, demo: !live };
  } catch {
    return { live: null, demo: true };
  }
}
