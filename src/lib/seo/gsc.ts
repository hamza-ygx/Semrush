import { createSign } from "node:crypto";

type ServiceAccount = { client_email: string; private_key: string };

function serviceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const json = JSON.parse(raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8"));
    return json.client_email && json.private_key ? { client_email: json.client_email, private_key: json.private_key } : null;
  } catch {
    return null;
  }
}

export const gscConfigured = () => serviceAccount() !== null;
export const gscAccountEmail = () => serviceAccount()?.client_email ?? null;

let cached: { token: string; exp: number } | null = null;

async function accessToken() {
  if (cached && cached.exp - 60 > Date.now() / 1000) return cached.token;
  const sa = serviceAccount();
  if (!sa) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not set");
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: sa.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Google token request failed (${res.status})`);
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cached = { token: json.access_token, exp: now + json.expires_in };
  return json.access_token;
}

async function gscFetch<T>(path: string, body?: object): Promise<T> {
  const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/${path}`, {
    method: body ? "POST" : "GET",
    headers: { authorization: `Bearer ${await accessToken()}`, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    const msg = ((await res.json().catch(() => null)) as { error?: { message?: string } } | null)?.error?.message;
    throw new Error(`Search Console ${res.status}: ${msg ?? res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function listSites() {
  const r = await gscFetch<{ siteEntry?: { siteUrl: string; permissionLevel: string }[] }>("sites");
  return r.siteEntry ?? [];
}

export type GscRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

export async function searchAnalytics(site: string, body: { startDate: string; endDate: string; dimensions: string[]; rowLimit?: number; startRow?: number; dataState?: "final" | "all" }) {
  const r = await gscFetch<{ rows?: GscRow[] }>(`sites/${encodeURIComponent(site)}/searchAnalytics/query`, body);
  return r.rows ?? [];
}

export async function searchAnalyticsAll(site: string, body: { startDate: string; endDate: string; dimensions: string[] }, maxRows = 200_000) {
  const rows: GscRow[] = [];
  for (let startRow = 0; startRow < maxRows; startRow += 25000) {
    const page = await searchAnalytics(site, { ...body, rowLimit: 25000, startRow });
    rows.push(...page);
    if (page.length < 25000) break;
  }
  return rows;
}
