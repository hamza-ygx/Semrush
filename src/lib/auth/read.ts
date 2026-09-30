import { authSecret, isStaffEmail } from "./config";
import { verify } from "./token";

export type Session = { uid: string; email: string; name: string; admin: boolean; mustChange: boolean; exp: number };

export function readSession(value: string | undefined): Session | null {
  if (!authSecret) return null;
  const s = verify<Session>(value, authSecret);
  return s && typeof s.uid === "string" && isStaffEmail(s.email) ? s : null;
}
