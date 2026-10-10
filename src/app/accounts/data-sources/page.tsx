import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { DataSources, type ProjectStatus, type StaffUser } from "@/features/account/DataSources";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { gscAccountEmail, gscConfigured } from "@/lib/seo/gsc";
import { semrushConfigured } from "@/lib/seo/semrushApi";
import { bingConfigured } from "@/lib/seo/bing";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getSession();
  if (!sql || !session) redirect(routes.home);
  const [projects, crawls, syncs, semrush, sources] = await Promise.all([
    sql<Omit<ProjectStatus, "crawl" | "sync" | "semrush" | "sources">[]>`select id, domain, gsc_property, crawl_limit from projects order by created_at`,
    sql<(NonNullable<ProjectStatus["crawl"]> & { project_id: string })[]>`
      select distinct on (project_id) project_id, status, started_at::text as started_at, finished_at::text as finished_at, pages_crawled, health, errors, warnings, notices, error
      from crawls order by project_id, started_at desc`,
    sql<(NonNullable<ProjectStatus["sync"]> & { project_id: string })[]>`
      select distinct on (project_id) project_id, synced_at::text as synced_at, rows, error, start_date::text as start_date, end_date::text as end_date
      from gsc_syncs order by project_id, synced_at desc`,
    sql<{ project_id: string; fetched_at: string; source: string; error: string | null }[]>`
      select p.id as project_id, d.fetched_at::text as fetched_at, d.source, s.error
      from projects p
      left join lateral (select fetched_at, source from semrush_data where project_id = p.id order by fetched_at desc limit 1) d on true
      left join lateral (select error from semrush_syncs where project_id = p.id order by synced_at desc limit 1) s on true`,
    sql<{ project_id: string; source: string; synced_at: string; error: string | null }[]>`
      select distinct on (project_id, source) project_id, source, synced_at::text as synced_at, error
      from source_syncs order by project_id, source, synced_at desc`,
  ]);
  const users = session.admin
    ? await sql<StaffUser[]>`select id, email, name, is_admin, must_change, coalesce(locked_until > now(), false) as locked, last_login_at::text as last_login_at from users order by email`
    : null;
  const list: ProjectStatus[] = projects.map((p) => ({
    ...p,
    crawl: crawls.find((c) => c.project_id === p.id) ?? null,
    sync: syncs.find((s) => s.project_id === p.id) ?? null,
    semrush: semrush.find((s) => s.project_id === p.id && (s.fetched_at || s.error)) ?? null,
    sources: sources.filter((s) => s.project_id === p.id),
  }));
  return <DataSources email={session.email} gsc={{ configured: gscConfigured(), serviceAccount: gscAccountEmail() }} semrushApi={semrushConfigured()} other={{ ga4: gscConfigured() && Boolean(process.env.GA4_PROPERTY_ID), bing: bingConfigured(), psiKey: Boolean(process.env.PAGESPEED_API_KEY) }} projects={list} users={users} me={session.uid} />;
}
