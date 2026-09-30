import { cache } from "react";
import { backendEnabled } from "@/lib/auth/config";
import { liveSemrush } from "@/lib/seo/semrush";
import { buildBacklinksLive, forView, type BacklinksLive, type BacklinksView } from "./live";

export type BacklinksLiveProps = { live: BacklinksLive | null; demo: boolean; name?: string };

export const loadBacklinksLive = cache(async (q: string | null): Promise<{ live: BacklinksLive | null; demo: boolean }> => {
  if (!backendEnabled) return { live: null, demo: false };
  try {
    const sem = await liveSemrush(q);
    const live = sem && buildBacklinksLive(sem);
    return live ? { live, demo: false } : { live: null, demo: true };
  } catch {
    return { live: null, demo: true };
  }
});

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const qOf = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || null;

const sectionOf: Record<BacklinksView, keyof BacklinksLive | null> = { overview: "overview", backlinks: "table", refdomains: "refdomains", anchors: "anchors", pages: "pages", bulk: "bulk", header: null };

export async function backlinksProps(searchParams: SearchParams, view: BacklinksView, mockOnly = false): Promise<BacklinksLiveProps> {
  const q = qOf((await searchParams).q);
  const { live, demo } = await loadBacklinksLive(q);
  if (!backendEnabled) return { live: null, demo: false };
  const key = sectionOf[view];
  const missing = !!key && !live?.[key];
  return { live: live && forView(live, view), demo: demo || mockOnly || missing, name: (live?.domain ?? q ?? "").replace(/^https?:\/\//, "").replace(/^www\./, "") || undefined };
}
