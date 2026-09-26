"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isStaffEmail } from "@/lib/supabase/env";
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
  const db = await createClient();
  if (!db) return "Backend is not configured";
  const { data } = await db.auth.getClaims();
  if (!isStaffEmail(data?.claims?.email)) return "Unauthorized";
  const { error } = await db.from("projects").insert({ domain, name: domain, gsc_property: property });
  if (error) return error.code === "23505" ? "That domain is already a project" : "Could not add the project";
  revalidatePath(accountRoutes.dataSources);
  return null;
}
