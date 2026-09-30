import { NextResponse, type NextRequest } from "next/server";
import { entra, oidcCookie } from "@/lib/auth/config";
import { authorizeRequest } from "@/lib/auth/entra";
import { appOrigin } from "@/lib/auth/origin";
import { sign } from "@/lib/auth/token";
import { safeRedirect } from "@/lib/safeRedirect";

export async function GET(request: NextRequest) {
  const origin = appOrigin(request);
  if (!entra) return NextResponse.redirect(new URL("/", origin));
  const next = safeRedirect(request.nextUrl.searchParams.get("next"));
  const { url, state, nonce, verifier } = authorizeRequest(`${origin}/auth/callback`);
  const res = NextResponse.redirect(url);
  res.cookies.set(oidcCookie, sign({ state, nonce, verifier, next, exp: Math.floor(Date.now() / 1000) + 600 }, entra.secret), {
    httpOnly: true,
    secure: origin.startsWith("https:"),
    sameSite: "lax",
    path: "/auth/callback",
    maxAge: 600,
  });
  return res;
}
