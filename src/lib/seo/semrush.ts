import type { SemrushDataset, SemrushDatasets } from "./semrushNormalize";
import { findProject, liveDb } from "./live";

export type LiveSemrush = { [K in SemrushDataset]?: { fetchedAt: string; source: string; rows: SemrushDatasets[K] } } & { domain: string };

export async function liveSemrush(domain?: string | null, database = "se"): Promise<LiveSemrush | null> {
  const db = await liveDb();
  const project = db && (await findProject(db, domain));
  if (!db || !project) return null;
  const rows = await db<{ dataset: SemrushDataset; fetched_at: string; source: string; rows: unknown }[]>`
    select distinct on (dataset) dataset, fetched_at::text as fetched_at, source, rows
    from semrush_data where project_id = ${project.id} and database = ${database}
    order by dataset, fetched_at desc`;
  if (!rows.length) return null;
  const out: LiveSemrush = { domain: project.domain };
  for (const r of rows) (out as Record<string, unknown>)[r.dataset] = { fetchedAt: r.fetched_at, source: r.source, rows: r.rows };
  return out;
}
