import { createHash, randomBytes } from "node:crypto";
import { entra } from "./config";

const b64 = (buf: Buffer) => buf.toString("base64url");

export function authorizeRequest(redirectUri: string) {
  if (!entra) throw new Error("Microsoft sign-in is not configured");
  const state = b64(randomBytes(24));
  const nonce = b64(randomBytes(24));
  const verifier = b64(randomBytes(48));
  const challenge = b64(createHash("sha256").update(verifier).digest());
  const url = new URL(`https://login.microsoftonline.com/${entra.tenantId}/oauth2/v2.0/authorize`);
  url.search = new URLSearchParams({
    client_id: entra.clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    response_mode: "query",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString();
  return { url: url.toString(), state, nonce, verifier };
}

type Claims = { iss?: string; aud?: string; tid?: string; nonce?: string; exp?: number; email?: string; preferred_username?: string; name?: string };

export async function exchangeCode(code: string, verifier: string, redirectUri: string, nonce: string) {
  if (!entra) throw new Error("Microsoft sign-in is not configured");
  const res = await fetch(`https://login.microsoftonline.com/${entra.tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: entra.clientId,
      client_secret: entra.clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier,
      scope: "openid email profile",
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Token request failed (${res.status})`);
  const { id_token } = (await res.json()) as { id_token?: string };
  const claims = JSON.parse(Buffer.from(id_token?.split(".")[1] ?? "", "base64url").toString("utf8") || "{}") as Claims;
  const now = Date.now() / 1000;
  if (claims.aud !== entra.clientId || claims.tid !== entra.tenantId || claims.iss !== `https://login.microsoftonline.com/${entra.tenantId}/v2.0` || claims.nonce !== nonce || !claims.exp || claims.exp < now)
    throw new Error("Invalid ID token");
  const email = (claims.email ?? claims.preferred_username ?? "").toLowerCase();
  return { email, name: claims.name ?? email };
}
