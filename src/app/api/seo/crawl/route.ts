import { NextResponse, type NextRequest } from "next/server";
import { runCrawl } from "@/lib/seo/jobs";
import { errorResponse, staffRequest } from "@/lib/seo/guard";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const ctx = await staffRequest(request);
  if (ctx instanceof NextResponse) return ctx;
  try {
    return NextResponse.json(await runCrawl(ctx.db, ctx.projectId, 45_000, ctx.email));
  } catch (e) {
    return errorResponse(e);
  }
}
