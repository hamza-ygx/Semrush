export const supabaseEnv =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    ? { url: process.env.NEXT_PUBLIC_SUPABASE_URL, key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }
    : null;

export const staffDomain = "rkjh.se";

export function isStaffEmail(email: unknown): email is string {
  return typeof email === "string" && email.toLowerCase().endsWith(`@${staffDomain}`);
}
