"use server";

import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/auth/password";
import { getSession, startSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";

export async function changePassword(_prev: string | null, form: FormData): Promise<string | null> {
  const session = await getSession();
  if (!sql || !session) return "Your session expired. Log in again.";
  const current = String(form.get("current") ?? "");
  const next = String(form.get("password") ?? "");
  const confirm = String(form.get("confirm") ?? "");
  const problem = passwordProblem(next);
  if (problem) return problem;
  if (next !== confirm) return "The new passwords don't match.";
  if (next === current) return "Choose a password different from the current one.";
  const [user] = await sql<{ password_hash: string; name: string; is_admin: boolean }[]>`select password_hash, name, is_admin from users where id = ${session.uid}`;
  if (!user || !(await verifyPassword(current, user.password_hash))) return "Your current password is wrong.";
  await sql`update users set password_hash = ${await hashPassword(next)}, must_change = false, updated_at = now() where id = ${session.uid}`;
  await startSession({ uid: session.uid, email: session.email, name: user.name, admin: user.is_admin, mustChange: false });
  redirect(routes.home);
}
