"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { routes } from "@/config/routes";
import { addProject } from "@/app/accounts/data-sources/actions";
import { AccountShell, PageTop } from "./AccountShell";

export type ProjectStatus = {
  id: string;
  domain: string;
  gsc_property: string | null;
  crawl_limit: number;
  crawl: { status: string; started_at: string; finished_at: string | null; pages_crawled: number; health: number | null; errors: number; warnings: number; notices: number; error: string | null } | null;
  sync: { synced_at: string; rows: number; error: string | null; start_date: string; end_date: string } | null;
};

const when = (iso: string | null | undefined) => (iso ? `${iso.slice(0, 16).replace("T", " ")} UTC` : "Never");
const card = "rounded-lg border border-rk-border bg-white p-6";
const btn = "h-8 rounded-md border border-rk-border-strong bg-white px-3 text-[14px] text-rk-text hover:bg-rk-bg disabled:opacity-50";

function ProjectRow({ p }: { p: ProjectStatus }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"crawl" | "sync" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const run = async (kind: "crawl" | "sync") => {
    setBusy(kind);
    setMsg(null);
    try {
      const res = await fetch(kind === "crawl" ? "/api/seo/crawl" : "/api/seo/gsc-sync", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ projectId: p.id }) });
      const json = await res.json().catch(() => ({}));
      setMsg(res.ok ? (kind === "crawl" ? `Crawled ${json.pages_crawled} pages, health ${json.health}%${json.truncated ? " (time limit reached, partial crawl)" : ""}` : `Synced ${json.rows} rows (${json.from} – ${json.to})`) : (json.error ?? `Failed (${res.status})`));
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
      <td className="py-3 text-right whitespace-nowrap">
        <div className="flex justify-end gap-2">
          <button type="button" disabled={!!busy} onClick={() => run("crawl")} className={btn}>
            {busy === "crawl" ? "Crawling…" : "Run crawl"}
          </button>
          <button type="button" disabled={!!busy} onClick={() => run("sync")} className={btn}>
            {busy === "sync" ? "Syncing…" : "Sync Search Console"}
          </button>
        </div>
        {msg && <div className="mt-2 max-w-[320px] text-left text-[13px] whitespace-normal text-rk-text-2" role="status">{msg}</div>}
      </td>
    </tr>
  );
}

export function DataSources({ email, gsc, projects }: { email: string | null; gsc: { configured: boolean; serviceAccount: string | null }; projects: ProjectStatus[] }) {
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
          <h2 className="text-[16px] font-semibold">Projects</h2>
          <p className="mt-1 text-rk-muted">Site Audit uses the latest crawl. Organic Rankings, Position Tracking and Domain Overview use Search Console data.</p>
          <table className="mt-4 w-full text-left">
            <thead className="text-[13px] text-rk-muted">
              <tr>
                <th className="pb-2 font-medium">Domain</th>
                <th className="pb-2 font-medium">Last crawl</th>
                <th className="pb-2 font-medium">Last Search Console sync</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <ProjectRow key={p.id} p={p} />
              ))}
              {!projects.length && (
                <tr>
                  <td colSpan={4} className="border-t border-rk-border py-6 text-center text-rk-muted">No projects yet</td>
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
        <form method="post" action={routes.signOut}>
          <button type="submit" className={btn}>Log out</button>
        </form>
      </div>
    </AccountShell>
  );
}
