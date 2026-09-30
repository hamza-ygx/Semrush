import { cookies } from "next/headers";
import { authSecret, sessionCookie, sessionHours } from "./config";
import { readSession, type Session } from "./read";
import { sign } from "./token";

export type { Session } from "./read";

export async function getSession() {
  return readSession((await cookies()).get(sessionCookie)?.value);
}

export async function startSession(user: Omit<Session, "exp">) {
  if (!authSecret) throw new Error("AUTH_SECRET is not set");
  const store = await cookies();
  store.set(sessionCookie, sign({ ...user, exp: Math.floor(Date.now() / 1000) + sessionHours * 3600 }, authSecret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionHours * 3600,
  });
}
