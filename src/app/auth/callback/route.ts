import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeRedirect } from "@/lib/safeRedirect";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const next = safeRedirect(searchParams.get("next"));
  const supabase = await createClient();
  const fail = new URL("/login?error=link", request.url);
  if (!supabase) return NextResponse.redirect(new URL(next, request.url));
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const { error } = code
    ? await supabase.auth.exchangeCodeForSession(code)
    : tokenHash && type
      ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
      : { error: new Error("missing code") };
  return NextResponse.redirect(error ? fail : new URL(next, request.url));
}
