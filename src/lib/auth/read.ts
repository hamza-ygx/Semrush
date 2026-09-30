import { entra, isStaffEmail } from "./config";
import { verify } from "./token";

export type Session = { email: string; name: string; exp: number };

export function readSession(value: string | undefined): Session | null {
  if (!entra) return null;
  const s = verify<Session>(value, entra.secret);
  return s && isStaffEmail(s.email) ? s : null;
}
