"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { accountRoutes } from "@/features/account/data";

const hostPattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;

export async function addProject(_prev: string | null, form: FormData): Promise<string | null> {
  const raw = String(form.get("domain") ?? "").trim().toLowerCase();
  let domain = raw;
  try {
    domain = new URL(raw.includes("://") ? raw : `https://${raw}`).hostname;
  } catch {}
  if (!hostPattern.test(domain)) return "Enter a domain like www.example.se";
  const property = String(form.get("gsc") ?? "").trim() || `sc-domain:${domain.replace(/^www\./, "")}`;
  if (!/^(sc-domain:[a-z0-9.-]+|https?:\/\/[^\s]+\/)$/.test(property)) return "Search Console property must look like sc-domain:example.se or https://www.example.se/";
  if (!sql) return "Backend is not configured";
  const session = await getSession();
  if (!session) return "Unauthorized";
  const [row] = await sql`insert into projects (domain, name, gsc_property, created_by) values (${domain}, ${domain}, ${property}, ${session.email}) on conflict (domain) do nothing returning id`;
  if (!row) return "That domain is already a project";
  revalidatePath(accountRoutes.dataSources);
  return null;
}
