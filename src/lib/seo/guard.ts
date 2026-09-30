import { NextResponse, type NextRequest } from "next/server";
import { appOrigin } from "@/lib/auth/origin";
import { getSession } from "@/lib/auth/session";
import { sql, type Sql } from "@/lib/db";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function staffRequest(request: NextRequest): Promise<{ db: Sql; projectId: string; email: string } | NextResponse> {
  const origin = request.headers.get("origin");
  if (!origin || (origin !== request.nextUrl.origin && origin !== appOrigin(request))) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  if (!sql) return NextResponse.json({ error: "Backend is not configured" }, { status: 503 });
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { projectId?: unknown } | null;
  const projectId = body?.projectId;
  if (typeof projectId !== "string" || !uuid.test(projectId)) return NextResponse.json({ error: "Invalid projectId" }, { status: 400 });
  return { db: sql, projectId, email: session.email };
}

export function errorResponse(e: unknown) {
  const message = e instanceof Error ? e.message : "Request failed";
  return NextResponse.json({ error: message }, { status: /already running/.test(message) ? 409 : /not found/i.test(message) ? 404 : 500 });
}
