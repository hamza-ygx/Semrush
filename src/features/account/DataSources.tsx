"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { routes } from "@/config/routes";
import { addProject, addUser, removeUser, resetUserPassword } from "@/app/accounts/data-sources/actions";
import { AccountShell, PageTop } from "./AccountShell";

export type ProjectStatus = {
  id: string;
  domain: string;
  gsc_property: string | null;
  crawl_limit: number;
  crawl: { status: string; started_at: string; finished_at: string | null; pages_crawled: number; health: number | null; errors: number; warnings: number; notices: number; error: string | null } | null;
  sync: { synced_at: string; rows: number; error: string | null; start_date: string; end_date: string } | null;
  semrush: { fetched_at: string | null; source: string | null; error: string | null } | null;
  sources: { source: string; synced_at: string; error: string | null }[];
};

export type OtherSources = { ga4: boolean; bing: boolean; psiKey: boolean };

const sourceInfo = [
  { key: "ga4", label: "Google Analytics 4", route: "/api/seo/ga4-sync", button: "Sync Analytics" },
  { key: "psi", label: "PageSpeed / Core Web Vitals", route: "/api/seo/psi-run", button: "Run PageSpeed" },
  { key: "bing", label: "Bing Webmaster", route: "/api/seo/bing-sync", button: "Sync Bing" },
] as const;

function SourceRow({ p, info, enabled }: { p: ProjectStatus; info: (typeof sourceInfo)[number]; enabled: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const last = p.sources.find((s) => s.source === info.key);
  const run = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(info.route, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ projectId: p.id }) });
      const json = await res.json().catch(() => ({}));
      setMsg(res.ok ? `Updated ${json.datasets} datasets` : (json.error ?? `Failed (${res.status})`));
      router.refresh();
    } finally {
      setBusy(false);
    }
  };
  return (
    <tr className="border-t border-rk-border align-top">
      <td className="py-3 pr-4">
        <div className="font-medium">{info.label}</div>
        <div className="text-[13px] text-rk-muted">{p.domain}</div>
      </td>
      <td className="py-3 pr-4 text-[13px]">
        <div>{when(last?.synced_at)}</div>
        {last?.error ? <div className="text-rk-danger">{last.error}</div> : !enabled && <div className="text-rk-muted">Not connected</div>}
      </td>
      <td className="py-3 text-right">
        <button type="button" disabled={busy || !enabled} onClick={run} className={btn}>
          {busy ? "Working…" : info.button}
        </button>
        {msg && <div className="mt-2 text-left text-[13px] text-rk-text-2" role="status">{msg}</div>}
      </td>
    </tr>
  );
}

export type StaffUser = { id: string; email: string; name: string; is_admin: boolean; must_change: boolean; locked: boolean; last_login_at: string | null };

const when = (iso: string | null | undefined) => (iso ? `${iso.slice(0, 16).replace("T", " ")} UTC` : "Never");
const card = "rounded-lg border border-rk-border bg-white p-6";
const btn = "h-8 rounded-md border border-rk-border-strong bg-white px-3 text-[14px] text-rk-text hover:bg-rk-bg disabled:opacity-50";

function ProjectRow({ p, semrushApi }: { p: ProjectStatus; semrushApi: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"crawl" | "sync" | "semrush" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const run = async (kind: "crawl" | "sync" | "semrush") => {
    setBusy(kind);
    setMsg(null);
    try {
      const res = await fetch(kind === "crawl" ? "/api/seo/crawl" : kind === "sync" ? "/api/seo/gsc-sync" : "/api/seo/semrush-sync", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ projectId: p.id }) });
      const json = await res.json().catch(() => ({}));
      setMsg(
        res.ok
          ? kind === "crawl"
            ? `Crawled ${json.pages_crawled} pages, health ${json.health}%${json.truncated ? " (time limit reached, partial crawl)" : ""}`
            : kind === "sync"
              ? `Synced ${json.rows} rows (${json.from} – ${json.to})`
              : `Updated ${json.datasets} Semrush datasets (${json.keywords} keywords, ${json.backlinks} backlinks)`
          : (json.error ?? `Failed (${res.status})`),
      );
      router.refresh();
    } finally {
      setBusy(null);
    }
  };
  const c = p.crawl;
  return (
    <tr className="border-t border-rk-border align-top">
      <td className="py-3 pr-4">
        <div className="font-medium">{p.domain}</div>
        <div className="text-[13px] text-rk-muted">{p.gsc_property ?? "—"}</div>
      </td>
      <td className="py-3 pr-4 text-[13px]">
        <div>{when(c?.finished_at ?? c?.started_at)}</div>
        {c && (c.error ? <div className="text-rk-danger">{c.error}</div> : c.status === "running" ? <div className="text-rk-muted">Running…</div> : (
          <div className="text-rk-muted">
            Health {c.health}% · {c.pages_crawled} pages · <span className="text-rk-danger">{c.errors} errors</span> · <span className="text-rk-warning">{c.warnings} warnings</span> · {c.notices} notices
          </div>
        ))}
      </td>
      <td className="py-3 pr-4 text-[13px]">
        <div>{when(p.sync?.synced_at)}</div>
        {p.sync && (p.sync.error ? <div className="text-rk-danger">{p.sync.error}</div> : <div className="text-rk-muted">{p.sync.rows} rows · {p.sync.start_date} – {p.sync.end_date}</div>)}
      </td>
      <td className="py-3 pr-4 text-[13px]">
        <div>{when(p.semrush?.fetched_at)}</div>
        {p.semrush?.error ? <div className="text-rk-danger">{p.semrush.error}</div> : p.semrush?.source && <div className="text-rk-muted">{p.semrush.source === "semrush-api" ? "Semrush API" : "Imported snapshot"}</div>}
      </td>
      <td className="py-3 text-right whitespace-nowrap">
        <div className="flex flex-wrap justify-end gap-2">
          <button type="button" disabled={!!busy} onClick={() => run("crawl")} className={btn}>
            {busy === "crawl" ? "Crawling…" : "Run crawl"}
          </button>
          <button type="button" disabled={!!busy} onClick={() => run("sync")} className={btn}>
            {busy === "sync" ? "Syncing…" : "Sync Search Console"}
          </button>
          {semrushApi && (
            <button type="button" disabled={!!busy} onClick={() => window.confirm("A Semrush sync uses roughly 20,000–30,000 API units. Continue?") && run("semrush")} className={btn}>
              {busy === "semrush" ? "Syncing…" : "Sync Semrush"}
            </button>
          )}
        </div>
        {msg && <div className="mt-2 max-w-[320px] text-left text-[13px] whitespace-normal text-rk-text-2" role="status">{msg}</div>}
      </td>
    </tr>
  );
}

const field = "h-8 rounded-md border border-rk-border-strong px-3 text-[14px] text-rk-text outline-none focus:border-rk-accent";

function UserRow({ u, me }: { u: StaffUser; me: string }) {
  const router = useRouter();
  const [reset, setReset] = useState(false);
  const [temp, setTemp] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const act = async (fn: () => Promise<string | null>, done: string) => {
    setBusy(true);
    const err = await fn();
    setBusy(false);
    setMsg(err ?? done);
    if (!err) {
      setReset(false);
      setTemp("");
      router.refresh();
    }
  };
  return (
    <tr className="border-t border-rk-border align-top">
      <td className="py-3 pr-4">
        <div className="font-medium">{u.name}</div>
        <div className="text-[13px] text-rk-muted">{u.email}</div>
      </td>
      <td className="py-3 pr-4 text-[13px] text-rk-text-2">
        {u.is_admin ? "Administrator" : "Staff"}
        {u.must_change && <div className="text-rk-muted">Must change password</div>}
        {u.locked && <div className="text-rk-danger">Locked (too many attempts)</div>}
      </td>
      <td className="py-3 pr-4 text-[13px] text-rk-text-2">{when(u.last_login_at)}</td>
      <td className="py-3 text-right">
        {reset ? (
          <div className="flex justify-end gap-2">
            <input type="text" value={temp} onChange={(e) => setTemp(e.target.value)} placeholder="Temporary password" autoComplete="off" className={`${field} w-[200px]`} />
            <button type="button" disabled={busy} onClick={() => act(() => resetUserPassword(u.id, temp), "Password reset. Share it with the user securely.")} className={btn}>
              Save
            </button>
            <button type="button" onClick={() => setReset(false)} className={btn}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setReset(true)} className={btn}>
              Reset password
            </button>
            {u.id !== me && (
              <button
                type="button"
                disabled={busy}
                onClick={() => window.confirm(`Remove ${u.email}? They will no longer be able to log in.`) && act(() => removeUser(u.id), "User removed.")}
                className={`${btn} text-rk-danger`}
              >
                Remove
              </button>
            )}
          </div>
        )}
        {msg && <div className="mt-2 text-left text-[13px] text-rk-text-2" role="status">{msg}</div>}
      </td>
    </tr>
  );
}

function UsersSection({ users, me }: { users: StaffUser[]; me: string }) {
  const [error, action, pending] = useActionState(addUser, null);
  return (
    <section className={card}>
      <h2 className="text-[16px] font-semibold">Users</h2>
      <p className="mt-1 text-rk-muted">Only @rkjh.se addresses. New users get a temporary password and must choose their own at first login.</p>
      <table className="mt-4 w-full text-left">
        <thead className="text-[13px] text-rk-muted">
          <tr>
            <th className="pb-2 font-medium">User</th>
            <th className="pb-2 font-medium">Role</th>
            <th className="pb-2 font-medium">Last login</th>
            <th className="pb-2" />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u.id} u={u} me={me} />
          ))}
        </tbody>
      </table>
      <form action={action} className="mt-5 flex flex-wrap items-end gap-3 border-t border-rk-border pt-5">
        <label className="flex flex-col gap-1 text-[13px] text-rk-text-2">
          Email
          <input name="email" type="email" required placeholder="name@rkjh.se" className={`${field} w-[220px]`} />
        </label>
        <label className="flex flex-col gap-1 text-[13px] text-rk-text-2">
          Name
          <input name="name" placeholder="Full name" className={`${field} w-[180px]`} />
        </label>
        <label className="flex flex-col gap-1 text-[13px] text-rk-text-2">
          Temporary password
          <input name="password" type="text" required minLength={12} autoComplete="off" className={`${field} w-[200px]`} />
        </label>
        <label className="flex h-8 items-center gap-2 text-[13px] text-rk-text-2">
          <input name="admin" type="checkbox" /> Administrator
        </label>
        <button type="submit" disabled={pending} className="h-8 rounded-md bg-rk-btn-dark px-3 text-[14px] font-medium text-white disabled:opacity-60">
          {pending ? "Adding…" : "Add user"}
        </button>
        {error && <span role="alert" className="text-[13px] text-rk-danger">{error}</span>}
      </form>
    </section>
  );
}

export function DataSources({ email, gsc, semrushApi, other, projects, users, me }: { email: string | null; gsc: { configured: boolean; serviceAccount: string | null }; semrushApi: boolean; other: OtherSources; projects: ProjectStatus[]; users: StaffUser[] | null; me: string }) {
  const [error, action, pending] = useActionState(addProject, null);
  return (
    <AccountShell active="dataSources" search>
      <PageTop crumb="Data sources" title="Data sources" meta={email ? <>Signed in as {email}</> : undefined} />
      <div className="max-w-[1080px] space-y-6 px-8 py-6 text-[14px] leading-5 text-rk-text">
        <section className={card}>
          <h2 className="text-[16px] font-semibold">Google Search Console</h2>
          {gsc.configured ? (
            <p className="mt-2 text-rk-text-2">
              Connected with service account <b className="font-semibold break-all text-rk-text">{gsc.serviceAccount}</b>. In Search Console, open Settings → Users and permissions for each property and add this address with Restricted access.
            </p>
          ) : (
            <p className="mt-2 text-rk-text-2">Not connected. Add the service account key as the <code className="rounded bg-rk-bg px-1">GOOGLE_SERVICE_ACCOUNT_JSON</code> environment variable in Vercel, then redeploy.</p>
          )}
        </section>
        <section className={card}>
          <h2 className="text-[16px] font-semibold">Semrush</h2>
          <p className="mt-2 text-rk-text-2">
            {semrushApi
              ? "Connected with an API key. Use Sync Semrush on a project to refresh keywords, backlinks and competitors (uses your Semrush API units)."
              : "Showing the imported snapshot. To refresh it, add your Semrush API key as the SEMRUSH_API_KEY environment variable in Vercel and redeploy."}
          </p>
        </section>
        <section className={card}>
          <h2 className="text-[16px] font-semibold">Projects</h2>
          <p className="mt-1 text-rk-muted">Site Audit uses the latest crawl. Organic Rankings, Position Tracking and Domain Overview use Search Console data.</p>
          <table className="mt-4 w-full text-left">
            <thead className="text-[13px] text-rk-muted">
              <tr>
                <th className="pb-2 font-medium">Domain</th>
                <th className="pb-2 font-medium">Last crawl</th>
                <th className="pb-2 font-medium">Last Search Console sync</th>
                <th className="pb-2 font-medium">Semrush data</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <ProjectRow key={p.id} p={p} semrushApi={semrushApi} />
              ))}
              {!projects.length && (
                <tr>
                  <td colSpan={5} className="border-t border-rk-border py-6 text-center text-rk-muted">No projects yet</td>
                </tr>
              )}
            </tbody>
          </table>
          <form action={action} className="mt-5 flex flex-wrap items-end gap-3 border-t border-rk-border pt-5">
            <label className="flex flex-col gap-1 text-[13px] text-rk-text-2">
              Domain
              <input name="domain" required placeholder="www.example.se" className="h-8 w-[240px] rounded-md border border-rk-border-strong px-3 text-[14px] text-rk-text outline-none focus:border-rk-accent" />
            </label>
            <label className="flex flex-col gap-1 text-[13px] text-rk-text-2">
              Search Console property (optional)
              <input name="gsc" placeholder="sc-domain:example.se" className="h-8 w-[240px] rounded-md border border-rk-border-strong px-3 text-[14px] text-rk-text outline-none focus:border-rk-accent" />
            </label>
            <button type="submit" disabled={pending} className="h-8 rounded-md bg-rk-btn-dark px-3 text-[14px] font-medium text-white disabled:opacity-60">
              {pending ? "Adding…" : "Add project"}
            </button>
            {error && <span role="alert" className="text-[13px] text-rk-danger">{error}</span>}
          </form>
        </section>
        <section className={card}>
          <h2 className="text-[16px] font-semibold">Free data sources</h2>
          <p className="mt-1 text-rk-muted">
            Google Analytics needs GA4_PROPERTY_ID and the Google service account added as a Viewer in GA4. Bing needs BING_WEBMASTER_API_KEY. PageSpeed works without a key{other.psiKey ? " (API key set)" : "; add PAGESPEED_API_KEY for a higher quota"}. All three also run in the daily job (Bing on Mondays).
          </p>
          <table className="mt-4 w-full text-left">
            <tbody>
              {projects.flatMap((p) => sourceInfo.map((info) => <SourceRow key={`${p.id}-${info.key}`} p={p} info={info} enabled={info.key === "psi" ? true : other[info.key]} />))}
            </tbody>
          </table>
        </section>
        {users && <UsersSection users={users} me={me} />}
        <div className="flex gap-2">
          <a href={routes.changePassword} className={`${btn} inline-flex items-center`}>
            Change password
          </a>
          <form method="post" action={routes.signOut}>
            <button type="submit" className={btn}>
              Log out
            </button>
          </form>
        </div>
      </div>
    </AccountShell>
  );
}
