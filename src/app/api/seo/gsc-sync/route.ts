import { NextResponse, type NextRequest } from "next/server";
import { gscConfigured } from "@/lib/seo/gsc";
import { syncSearchConsole } from "@/lib/seo/jobs";
import { errorResponse, staffRequest } from "@/lib/seo/guard";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const ctx = await staffRequest(request);
  if (ctx instanceof NextResponse) return ctx;
  if (!gscConfigured()) return NextResponse.json({ error: "Google Search Console is not connected (GOOGLE_SERVICE_ACCOUNT_JSON missing)" }, { status: 503 });
  try {
    return NextResponse.json(await syncSearchConsole(ctx.db, ctx.projectId, ctx.email));
  } catch (e) {
    return errorResponse(e);
  }
}
