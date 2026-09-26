import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isStaffEmail, supabaseEnv } from "@/lib/supabase/env";

const publicPaths = ["/login", "/auth/"];

export async function proxy(request: NextRequest) {
  if (!supabaseEnv) return NextResponse.next();
  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseEnv.url, supabaseEnv.key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
        for (const [k, v] of Object.entries(headers)) response.headers.set(k, v);
      },
    },
  });
  const { data } = await supabase.auth.getClaims();
  const { pathname, search } = request.nextUrl;
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p))) return response;
  if (isStaffEmail(data?.claims?.email)) return response;
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const login = request.nextUrl.clone();
  login.pathname = "/login";
  login.search = "";
  if (data?.claims) login.searchParams.set("error", "domain");
  else if (pathname !== "/") login.searchParams.set("next", pathname + search);
  const redirect = NextResponse.redirect(login);
  for (const c of response.cookies.getAll()) redirect.cookies.set(c);
  return redirect;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)"],
};
