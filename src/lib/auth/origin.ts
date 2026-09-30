import type { NextRequest } from "next/server";

export const appOrigin = (request: NextRequest) => process.env.AUTH_URL?.replace(/\/$/, "") ?? request.nextUrl.origin;
