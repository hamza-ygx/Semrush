import { routes } from "@/config/routes";

const ORIGIN = "http://local.invalid";

export function safeRedirect(v: unknown, fallback: string = routes.home) {
  if (typeof v !== "string" || !v.startsWith("/")) return fallback;
  try {
    const u = new URL(v, ORIGIN);
    return u.origin === ORIGIN ? u.pathname + u.search + u.hash : fallback;
  } catch {
    return fallback;
  }
}
