import { routes } from "@/config/routes";
import { MultiloginPage } from "@/features/multilogin/MultiloginPage";

const ORIGIN = "http://local.invalid";

/** Only same-origin paths are allowed; anything the URL parser resolves elsewhere (`//x`, `/\x`, `/\t/x`) falls back to home. */
function safeRedirect(v: string | string[] | undefined) {
  if (typeof v !== "string" || !v.startsWith("/")) return routes.home;
  try {
    const u = new URL(v, ORIGIN);
    return u.origin === ORIGIN ? u.pathname + u.search + u.hash : routes.home;
  } catch {
    return routes.home;
  }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ redirect_to?: string | string[] }> }) {
  const { redirect_to } = await searchParams;
  return <MultiloginPage redirectTo={safeRedirect(redirect_to)} />;
}
