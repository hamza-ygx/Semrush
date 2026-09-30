"use server";

import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { isStaffEmail } from "@/lib/auth/config";
import { verifyPassword } from "@/lib/auth/password";
import { startSession } from "@/lib/auth/session";
import { sql } from "@/lib/db";
import { safeRedirect } from "@/lib/safeRedirect";

type UserRow = { id: string; email: string; name: string; password_hash: string; is_admin: boolean; must_change: boolean; failed_attempts: number; locked: boolean };

const wrong = "Wrong email or password.";

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const next = safeRedirect(form.get("next"));
  if (!sql) return "Login is not configured on this server.";
  if (!isStaffEmail(email) || !password || password.length > 200) {
    await verifyPassword(password || "x", null);
    return wrong;
  }
  const [user] = await sql<UserRow[]>`
    select id, email, name, password_hash, is_admin, must_change, failed_attempts, coalesce(locked_until > now(), false) as locked
    from users where email = ${email}`;
  const ok = await verifyPassword(password, user?.password_hash ?? null);
  if (user?.locked) return "Too many failed attempts. Try again in 15 minutes.";
  if (!user || !ok) {
    if (user)
      await sql`update users set failed_attempts = failed_attempts + 1,
        locked_until = case when failed_attempts + 1 >= 5 then now() + interval '15 minutes' else locked_until end,
        updated_at = now() where id = ${user.id}`;
    return wrong;
  }
  await sql`update users set failed_attempts = 0, locked_until = null, last_login_at = now() where id = ${user.id}`;
  await startSession({ uid: user.id, email: user.email, name: user.name, admin: user.is_admin, mustChange: user.must_change });
  redirect(user.must_change ? routes.changePassword : next);
}
