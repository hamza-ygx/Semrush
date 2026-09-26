import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const v4Blocked: [number, number][] = [
  [0x00000000, 8], [0x0a000000, 8], [0x64400000, 10], [0x7f000000, 8], [0xa9fe0000, 16], [0xac100000, 12],
  [0xc0000000, 24], [0xc0000200, 24], [0xc0a80000, 16], [0xc6120000, 15], [0xc6336400, 24], [0xcb007100, 24],
  [0xe0000000, 4], [0xf0000000, 4],
];

function v4ToInt(ip: string) {
  return ip.split(".").reduce((n, o) => (n << 8) + Number(o), 0) >>> 0;
}

export function isPublicAddress(ip: string): boolean {
  if (isIP(ip) === 4) {
    const n = v4ToInt(ip);
    return !v4Blocked.some(([base, bits]) => n >>> (32 - bits) === base >>> (32 - bits));
  }
  if (isIP(ip) !== 6) return false;
  const a = ip.toLowerCase();
  const mapped = a.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPublicAddress(mapped[1]);
  if (a.startsWith("::")) return false;
  return !/^(f[cd]|fe[89ab]|ff|2001:db8|64:ff9b|100::)/.test(a);
}

export async function assertPublicHost(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "");
  const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true, verbatim: true });
  if (!addrs.length || !addrs.every((a) => isPublicAddress(a.address))) throw new Error(`Blocked host ${hostname}`);
}

export type FetchResult = { url: string; status: number; location?: string; contentType: string; body: string; bytes: number; ms: number };

export async function safeFetch(url: string, { timeoutMs = 10000, maxBytes = 3_000_000, userAgent }: { timeoutMs?: number; maxBytes?: number; userAgent: string }): Promise<FetchResult> {
  const u = new URL(url);
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("Unsupported protocol");
  if (u.port && u.port !== "80" && u.port !== "443") throw new Error("Unsupported port");
  if (u.username || u.password) throw new Error("Credentials in URL");
  await assertPublicHost(u.hostname);
  const started = Date.now();
  const res = await fetch(u, {
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
    headers: { "user-agent": userAgent, accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5" },
  });
  const contentType = res.headers.get("content-type") ?? "";
  let body = "";
  let bytes = 0;
  if (res.body && /html|xml|text\/plain/.test(contentType)) {
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        await reader.cancel();
        break;
      }
      chunks.push(value);
    }
    body = new TextDecoder().decode(Buffer.concat(chunks));
  } else {
    bytes = Number(res.headers.get("content-length") ?? 0);
    await res.body?.cancel();
  }
  const location = res.headers.get("location");
  return { url: u.toString(), status: res.status, location: location ? new URL(location, u).toString() : undefined, contentType, body, bytes, ms: Date.now() - started };
}
