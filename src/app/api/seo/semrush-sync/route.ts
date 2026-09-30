import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, staffRequest } from "@/lib/seo/guard";
import { getProject } from "@/lib/seo/jobs";
import { semrushConfigured, syncSemrush } from "@/lib/seo/semrushApi";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const ctx = await staffRequest(request);
  if (ctx instanceof NextResponse) return ctx;
  if (!semrushConfigured()) return NextResponse.json({ error: "Semrush is not connected (SEMRUSH_API_KEY missing)" }, { status: 503 });
  try {
    return NextResponse.json(await syncSemrush(ctx.db, await getProject(ctx.db, ctx.projectId), ctx.email));
  } catch (e) {
    return errorResponse(e);
  }
}
