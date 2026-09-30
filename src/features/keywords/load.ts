import { cache } from "react";
import { liveSemrush } from "@/lib/seo/semrush";
import { backendEnabled, staffDomain } from "@/lib/auth/config";
import { buildKwMetrics, type KwMetrics } from "./live";

export const loadKwMetrics = cache(async (): Promise<KwMetrics | null> => {
  if (!backendEnabled) return null;
  try {
    const sem = await liveSemrush(staffDomain);
    const metrics = sem ? buildKwMetrics(sem) : null;
    return metrics && Object.keys(metrics).length ? metrics : null;
  } catch {
    return null;
  }
});
