"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isStaffEmail, staffDomain } from "@/lib/supabase/env";
import { safeRedirect } from "@/lib/safeRedirect";

export type LoginState = { step: "email" | "code"; email?: string; error?: string; next: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendLink(prev: LoginState, form: FormData): Promise<LoginState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const next = safeRedirect(prev.next);
  if (!emailPattern.test(email)) return { step: "email", email, next, error: "Enter a valid email address." };
  if (!isStaffEmail(email)) return { step: "email", email, next, error: `Only @${staffDomain} accounts can log in.` };
  const supabase = await createClient();
  if (!supabase) return { step: "email", email, next, error: "Login is not configured on this server." };
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("x-forwarded-host") ?? h.get("host")}`;
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true, emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) return { step: "email", email, next, error: error.status === 429 ? "Too many attempts. Wait a minute and try again." : "Could not send the login email. Try again." };
  return { step: "code", email, next };
}

export async function verifyCode(prev: LoginState, form: FormData): Promise<LoginState> {
  const token = String(form.get("code") ?? "").replace(/\s/g, "");
  const email = prev.email ?? "";
  const next = safeRedirect(prev.next);
  if (!/^\d{6,10}$/.test(token) || !isStaffEmail(email)) return { ...prev, error: "Enter the code from the email." };
  const supabase = await createClient();
  if (!supabase) return { ...prev, error: "Login is not configured on this server." };
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) return { ...prev, error: "That code is invalid or has expired." };
  redirect(next);
}
