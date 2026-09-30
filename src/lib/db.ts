import postgres from "postgres";

const url = process.env.DATABASE_URL;
const local = url ? /@(localhost|127\.0\.0\.1)[:/]/.test(url) : false;

const globalDb = globalThis as unknown as { __rkSql?: postgres.Sql };

export const sql: postgres.Sql | null = url
  ? (globalDb.__rkSql ??= postgres(url, { max: 3, prepare: false, idle_timeout: 20, ssl: local ? false : "require", onnotice: () => {} }))
  : null;

export type Sql = postgres.Sql;
