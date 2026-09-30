export const staffDomain = "rkjh.se";

export const sessionCookie = "rk_session";
export const sessionHours = 12;

export const authSecret = process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32 ? process.env.AUTH_SECRET : null;

export const authEnabled = Boolean(authSecret && process.env.DATABASE_URL);
export const backendEnabled = authEnabled;

export function isStaffEmail(email: unknown): email is string {
  return typeof email === "string" && email.toLowerCase().endsWith(`@${staffDomain}`);
}
