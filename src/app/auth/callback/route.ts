import { NextResponse, type NextRequest } from "next/server";
import { entra, isStaffEmail, oidcCookie, sessionCookie, sessionHours } from "@/lib/auth/config";
import { exchangeCode } from "@/lib/auth/entra";
import { appOrigin } from "@/lib/auth/origin";
import { sign, verify } from "@/lib/auth/token";
import { safeRedirect } from "@/lib/safeRedirect";

type Pending = { state: string; nonce: string; verifier: string; next: string; exp: number };

export async function GET(request: NextRequest) {
  const origin = appOrigin(request);
  const fail = (reason: string) => {
    const res = NextResponse.redirect(new URL(`/login?error=${reason}`, origin));
    res.cookies.delete({ name: oidcCookie, path: "/auth/callback" });
    return res;
  };
  if (!entra) return NextResponse.redirect(new URL("/", origin));
  const params = request.nextUrl.searchParams;
  const pending = verify<Pending>(request.cookies.get(oidcCookie)?.value, entra.secret);
  const code = params.get("code");
  if (!pending || !code || params.get("state") !== pending.state) return fail("link");
  try {
    const user = await exchangeCode(code, pending.verifier, `${origin}/auth/callback`, pending.nonce);
    if (!isStaffEmail(user.email)) return fail("domain");
    const res = NextResponse.redirect(new URL(safeRedirect(pending.next), origin));
    res.cookies.delete({ name: oidcCookie, path: "/auth/callback" });
    res.cookies.set(sessionCookie, sign({ email: user.email, name: user.name, exp: Math.floor(Date.now() / 1000) + sessionHours * 3600 }, entra.secret), {
      httpOnly: true,
      secure: origin.startsWith("https:"),
      sameSite: "lax",
      path: "/",
      maxAge: sessionHours * 3600,
    });
    return res;
  } catch {
    return fail("link");
  }
}
