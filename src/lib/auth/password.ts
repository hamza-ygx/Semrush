import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const params = { N: 16384, r: 8, p: 1 };

function derive(password: string, salt: Buffer, N: number, r: number, p: number) {
  return new Promise<Buffer>((resolve, reject) => scrypt(password, salt, 64, { N, r, p, maxmem: 64 * 1024 * 1024 }, (e, key) => (e ? reject(e) : resolve(key))));
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await derive(password, salt, params.N, params.r, params.p);
  return `scrypt$${params.N}$${params.r}$${params.p}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

const dummy = `scrypt$16384$8$1$${Buffer.alloc(16).toString("base64")}$${Buffer.alloc(64).toString("base64")}`;

export async function verifyPassword(password: string, stored: string | null) {
  const [algo, n, r, p, salt, hash] = (stored ?? dummy).split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  const actual = await derive(password, Buffer.from(salt, "base64"), Number(n), Number(r), Number(p));
  return actual.length === expected.length && timingSafeEqual(actual, expected) && stored !== null;
}

export function passwordProblem(password: string) {
  if (password.length < 12) return "Use at least 12 characters.";
  if (password.length > 200) return "That password is too long.";
  return null;
}
