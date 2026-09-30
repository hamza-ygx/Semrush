import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { DataSources, type ProjectStatus, type StaffUser } from "@/features/account/DataSources";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { gscAccountEmail, gscConfigured } from "@/lib/seo/gsc";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getSession();
  if (!sql || !session) redirect(routes.home);
  const [projects, crawls, syncs] = await Promise.all([
    sql<Omit<ProjectStatus, "crawl" | "sync">[]>`select id, domain, gsc_property, crawl_limit from projects order by created_at`,
    sql<(NonNullable<ProjectStatus["crawl"]> & { project_id: string })[]>`
      select distinct on (project_id) project_id, status, started_at::text as started_at, finished_at::text as finished_at, pages_crawled, health, errors, warnings, notices, error
      from crawls order by project_id, started_at desc`,
    sql<(NonNullable<ProjectStatus["sync"]> & { project_id: string })[]>`
      select distinct on (project_id) project_id, synced_at::text as synced_at, rows, error, start_date::text as start_date, end_date::text as end_date
      from gsc_syncs order by project_id, synced_at desc`,
  ]);
  const users = session.admin
    ? await sql<StaffUser[]>`select id, email, name, is_admin, must_change, coalesce(locked_until > now(), false) as locked, last_login_at::text as last_login_at from users order by email`
    : null;
  const list: ProjectStatus[] = projects.map((p) => ({
    ...p,
    crawl: crawls.find((c) => c.project_id === p.id) ?? null,
    sync: syncs.find((s) => s.project_id === p.id) ?? null,
  }));
  return <DataSources email={session.email} gsc={{ configured: gscConfigured(), serviceAccount: gscAccountEmail() }} projects={list} users={users} me={session.uid} />;
}
