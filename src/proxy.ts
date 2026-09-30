import { NextResponse, type NextRequest } from "next/server";
import { entra, sessionCookie } from "@/lib/auth/config";
import { readSession } from "@/lib/auth/read";

const publicPaths = ["/login", "/auth/"];

export function proxy(request: NextRequest) {
  if (!entra) return NextResponse.next();
  const { pathname, search } = request.nextUrl;
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p))) return NextResponse.next();
  if (readSession(request.cookies.get(sessionCookie)?.value)) return NextResponse.next();
  if (pathname.startsWith("/api/")) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const login = request.nextUrl.clone();
  login.pathname = "/login";
  login.search = "";
  if (pathname !== "/") login.searchParams.set("next", pathname + search);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)"],
};
