import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, staffRequest } from "@/lib/seo/guard";
import { getProject } from "@/lib/seo/jobs";
import { syncBing } from "@/lib/seo/sourceJobs";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const ctx = await staffRequest(request);
  if (ctx instanceof NextResponse) return ctx;
  try {
    return NextResponse.json(await syncBing(ctx.db, await getProject(ctx.db, ctx.projectId), ctx.email));
  } catch (e) {
    return errorResponse(e);
  }
}
