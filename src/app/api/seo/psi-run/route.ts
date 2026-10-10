import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, staffRequest } from "@/lib/seo/guard";
import { getProject } from "@/lib/seo/jobs";
import { runPsi } from "@/lib/seo/sourceJobs";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const ctx = await staffRequest(request);
  if (ctx instanceof NextResponse) return ctx;
  try {
    return NextResponse.json(await runPsi(ctx.db, await getProject(ctx.db, ctx.projectId), ctx.email, 3));
  } catch (e) {
    return errorResponse(e);
  }
}
