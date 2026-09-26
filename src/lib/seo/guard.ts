import { NextResponse, type NextRequest } from "next/server";
import { createClient, type Db } from "@/lib/supabase/server";
import { isStaffEmail } from "@/lib/supabase/env";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function staffRequest(request: NextRequest): Promise<{ db: Db; projectId: string } | NextResponse> {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  const db = await createClient();
  if (!db) return NextResponse.json({ error: "Backend is not configured" }, { status: 503 });
  const { data } = await db.auth.getClaims();
  if (!isStaffEmail(data?.claims?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => null)) as { projectId?: unknown } | null;
  const projectId = body?.projectId;
  if (typeof projectId !== "string" || !uuid.test(projectId)) return NextResponse.json({ error: "Invalid projectId" }, { status: 400 });
  return { db, projectId };
}

export function errorResponse(e: unknown) {
  const message = e instanceof Error ? e.message : "Request failed";
  return NextResponse.json({ error: message }, { status: /already running/.test(message) ? 409 : 500 });
}
