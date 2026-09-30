import { cookies } from "next/headers";
import { sessionCookie } from "./config";
import { readSession } from "./read";

export type { Session } from "./read";

export async function getSession() {
  return readSession((await cookies()).get(sessionCookie)?.value);
}
