import { NextResponse, type NextRequest } from "next/server";
import { sessionCookie } from "@/lib/auth/config";
import { appOrigin } from "@/lib/auth/origin";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin && origin !== appOrigin(request)) return new NextResponse(null, { status: 403 });
  const res = NextResponse.redirect(new URL("/login", appOrigin(request)), { status: 303 });
  res.cookies.delete(sessionCookie);
  return res;
}
