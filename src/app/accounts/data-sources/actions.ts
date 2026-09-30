"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { hashPassword, passwordProblem } from "@/lib/auth/password";
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

async function requireAdmin() {
  const session = await getSession();
  if (!sql || !session) return null;
  const [me] = await sql<{ is_admin: boolean }[]>`select is_admin from users where id = ${session.uid}`;
  return me?.is_admin ? session : null;
}

export async function addUser(_prev: string | null, form: FormData): Promise<string | null> {
  const admin = await requireAdmin();
  if (!admin || !sql) return "Only administrators can add users.";
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const name = String(form.get("name") ?? "").trim().slice(0, 100);
  const temp = String(form.get("password") ?? "");
  if (!/^[^\s@]+@rkjh\.se$/.test(email)) return "Use an @rkjh.se email address.";
  const problem = passwordProblem(temp);
  if (problem) return `Temporary password: ${problem}`;
  const [row] = await sql`insert into users (email, name, password_hash, is_admin, must_change, created_by)
    values (${email}, ${name || email.split("@")[0]}, ${await hashPassword(temp)}, ${form.get("admin") === "on"}, true, ${admin.email})
    on conflict (email) do nothing returning id`;
  if (!row) return "That user already exists.";
  revalidatePath(accountRoutes.dataSources);
  return null;
}

export async function resetUserPassword(userId: string, temp: string): Promise<string | null> {
  const admin = await requireAdmin();
  if (!admin || !sql) return "Only administrators can reset passwords.";
  const problem = passwordProblem(temp);
  if (problem) return problem;
  await sql`update users set password_hash = ${await hashPassword(temp)}, must_change = true, failed_attempts = 0, locked_until = null, updated_at = now() where id = ${userId}`;
  revalidatePath(accountRoutes.dataSources);
  return null;
}

export async function removeUser(userId: string): Promise<string | null> {
  const admin = await requireAdmin();
  if (!admin || !sql) return "Only administrators can remove users.";
  if (userId === admin.uid) return "You can't remove your own account.";
  await sql`delete from users where id = ${userId}`;
  revalidatePath(accountRoutes.dataSources);
  return null;
}
