import { cache } from "react";
import { liveRankHistory, liveSearch } from "@/lib/seo/live";
import { supabaseEnv } from "@/lib/supabase/env";
import { latestKeywords, project, trackedKeywords } from "./data";
import { buildTrackingLive, type TrackingLive } from "./live";

export type TrackingLiveProps = { live: TrackingLive | null; demo: boolean };

export const loadTrackingLive = cache(async (): Promise<TrackingLiveProps> => {
  if (!supabaseEnv) return { live: null, demo: false };
  try {
    const tracked = trackedKeywords.map((k) => k.keyword);
    const extra = latestKeywords.map((k) => k.keyword).filter((k) => !tracked.includes(k));
    const [cur, wide, history] = await Promise.all([
      liveSearch(project.domain, 8),
      liveSearch(project.domain, 16),
      liveRankHistory([...tracked, ...extra], project.domain, 40),
    ]);
    if (!cur || !history) return { live: null, demo: true };
    const volumes = Object.fromEntries([...trackedKeywords, ...latestKeywords].map((k) => [k.keyword, k.volume]));
    return { live: buildTrackingLive({ tracked, extra, volumes, history, cur, wide }), demo: false };
  } catch {
    return { live: null, demo: true };
  }
});
