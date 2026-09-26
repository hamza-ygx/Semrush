import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { DataSources, type ProjectStatus } from "@/features/account/DataSources";
import { createClient } from "@/lib/supabase/server";
import { gscAccountEmail, gscConfigured } from "@/lib/seo/gsc";

export const dynamic = "force-dynamic";

export default async function Page() {
  const db = await createClient();
  if (!db) redirect(routes.home);
  const [{ data: claims }, { data: projects }, { data: crawls }, { data: syncs }] = await Promise.all([
    db.auth.getClaims(),
    db.from("projects").select("id, domain, gsc_property, crawl_limit").order("created_at"),
    db.from("crawls").select("project_id, status, started_at, finished_at, pages_crawled, health, errors, warnings, notices, error").order("started_at", { ascending: false }).limit(50),
    db.from("gsc_syncs").select("project_id, synced_at, rows, error, start_date, end_date").order("synced_at", { ascending: false }).limit(50),
  ]);
  const list: ProjectStatus[] = (projects ?? []).map((p) => ({
    ...p,
    crawl: crawls?.find((c) => c.project_id === p.id) ?? null,
    sync: syncs?.find((s) => s.project_id === p.id) ?? null,
  }));
  return <DataSources email={(claims?.claims?.email as string | undefined) ?? null} gsc={{ configured: gscConfigured(), serviceAccount: gscAccountEmail() }} projects={list} />;
}
