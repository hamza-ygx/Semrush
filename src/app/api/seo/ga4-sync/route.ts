import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, staffRequest } from "@/lib/seo/guard";
import { getProject } from "@/lib/seo/jobs";
import { syncGa4 } from "@/lib/seo/sourceJobs";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const ctx = await staffRequest(request);
  if (ctx instanceof NextResponse) return ctx;
  try {
    return NextResponse.json(await syncGa4(ctx.db, await getProject(ctx.db, ctx.projectId), ctx.email));
  } catch (e) {
    return errorResponse(e);
  }
}
