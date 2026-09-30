import { cache } from "react";
import { liveRankHistory, liveSearch } from "@/lib/seo/live";
import { liveSemrush } from "@/lib/seo/semrush";
import { buildKwMetrics, metricFor, pickMetrics, type KwMetrics } from "@/features/keywords/live";
import { backendEnabled } from "@/lib/auth/config";
import { latestKeywords, project, trackedKeywords } from "./data";
import { buildTrackingLive, type TrackingLive } from "./live";

export type TrackingLiveProps = { live: TrackingLive | null; demo: boolean; metrics?: KwMetrics | null };

async function loadMetrics(keywords: string[]): Promise<KwMetrics | null> {
  try {
    const sem = await liveSemrush(project.domain);
    const m = sem ? pickMetrics(buildKwMetrics(sem), keywords) : null;
    return m && Object.keys(m).length ? m : null;
  } catch {
    return null;
  }
}

export const loadTrackingLive = cache(async (): Promise<TrackingLiveProps> => {
  if (!backendEnabled) return { live: null, demo: false };
  try {
    const tracked = trackedKeywords.map((k) => k.keyword);
    const extra = latestKeywords.map((k) => k.keyword).filter((k) => !tracked.includes(k));
    const [cur, wide, history, metrics] = await Promise.all([
      liveSearch(project.domain, 8),
      liveSearch(project.domain, 16),
      liveRankHistory([...tracked, ...extra], project.domain, 40),
      loadMetrics([...tracked, ...extra]),
    ]);
    if (!cur || !history) return { live: null, demo: true, metrics };
    const volumes = Object.fromEntries([...trackedKeywords, ...latestKeywords].map((k) => [k.keyword, metricFor(metrics, k.keyword)?.volume ?? k.volume]));
    return { live: buildTrackingLive({ tracked, extra, volumes, history, cur, wide }), demo: false, metrics };
  } catch {
    return { live: null, demo: true };
  }
});
