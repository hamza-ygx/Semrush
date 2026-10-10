import type { Sql } from "@/lib/db";
import { findProject, liveDb } from "./live";

export type SourceName = "ga4" | "psi" | "bing";

export async function storeSource(db: Sql, projectId: string, source: SourceName, datasets: Record<string, unknown[]>, by: string) {
  const now = new Date().toISOString();
  let count = 0;
  for (const [dataset, rows] of Object.entries(datasets)) {
    await db`insert into source_data (project_id, source, dataset, fetched_at, rows) values (${projectId}, ${source}, ${dataset}, ${now}, ${db.json(rows as never)}) on conflict do nothing`;
    count++;
  }
  await db`insert into source_syncs (project_id, source, datasets, synced_by) values (${projectId}, ${source}, ${count}, ${by})`;
  return count;
}

export async function logSourceError(db: Sql, projectId: string, source: SourceName, e: unknown, by: string) {
  const message = e instanceof Error ? e.message : `${source} sync failed`;
  await db`insert into source_syncs (project_id, source, error, synced_by) values (${projectId}, ${source}, ${message.slice(0, 500)}, ${by})`;
  return message;
}

export type LiveSource<T extends Record<string, unknown[]>> = { [K in keyof T]?: { fetchedAt: string; rows: T[K] } } & { domain: string };

export async function liveSource<T extends Record<string, unknown[]>>(source: SourceName, domain?: string | null): Promise<LiveSource<T> | null> {
  const db = await liveDb();
  const project = db && (await findProject(db, domain));
  if (!db || !project) return null;
  const rows = await db<{ dataset: string; fetched_at: string; rows: unknown[] }[]>`
    select distinct on (dataset) dataset, fetched_at::text as fetched_at, rows
    from source_data where project_id = ${project.id} and source = ${source}
    order by dataset, fetched_at desc`;
  if (!rows.length) return null;
  const out = { domain: project.domain } as LiveSource<T>;
  for (const r of rows) (out as Record<string, unknown>)[r.dataset] = { fetchedAt: r.fetched_at, rows: r.rows };
  return out;
}
