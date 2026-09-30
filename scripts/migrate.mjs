import { randomBytes, scryptSync } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.log("migrate: DATABASE_URL not set, skipping");
  process.exit(0);
}
const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
const sql = postgres(url, { max: 1, prepare: false, ssl: local ? false : "require", onnotice: () => {} });
try {
  await sql.unsafe(readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8"));
  console.log("migrate: schema up to date");
  const seed = new URL("../db/seed/semrush.json", import.meta.url);
  if (existsSync(seed)) {
    const s = JSON.parse(readFileSync(seed, "utf8"));
    const [project] = await sql`select id from projects where domain = ${s.domain}`;
    if (project) {
      let added = 0;
      for (const [dataset, d] of Object.entries(s.datasets)) {
        const r = await sql`insert into semrush_data (project_id, dataset, database, fetched_at, source, rows)
          values (${project.id}, ${dataset}, ${s.database}, ${d.fetched_at}, ${s.source}, ${sql.json(d.rows)})
          on conflict do nothing returning dataset`;
        added += r.length;
      }
      console.log(`migrate: semrush seed ${added} new datasets`);
    }
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  if (email && password) {
    if (!email.endsWith("@rkjh.se") || password.length < 12) {
      console.log("migrate: ADMIN_EMAIL must be @rkjh.se and ADMIN_INITIAL_PASSWORD at least 12 characters, skipping admin");
    } else {
      const salt = randomBytes(16);
      const hash = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
      const stored = `scrypt$16384$8$1$${salt.toString("base64")}$${hash.toString("base64")}`;
      const rows = await sql`insert into users (email, name, password_hash, is_admin, must_change, created_by) values (${email}, ${email.split("@")[0]}, ${stored}, true, true, 'bootstrap') on conflict (email) do nothing returning id`;
      console.log(rows.length ? `migrate: created admin ${email}` : `migrate: admin ${email} already exists`);
    }
  }
} finally {
  await sql.end();
}
