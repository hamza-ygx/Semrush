import { cache } from "react";
import { findProject, liveAudit, liveDb } from "@/lib/seo/live";
import { backendEnabled } from "@/lib/auth/config";
import { buildSiteAuditLive, type HeaderLive, type SiteAuditLive } from "./live";

export const auditDomain = "www.rkjh.se";

export type SiteAuditCtx = { live: SiteAuditLive | null; demo: boolean; env: boolean; projectId: string | null };

export type SiteAuditHead = { live?: HeaderLive | null; demo?: boolean; projectId?: string | null };

export const loadSiteAudit = cache(async (): Promise<SiteAuditCtx> => {
  if (!backendEnabled) return { live: null, demo: false, env: false, projectId: null };
  try {
    const db = await liveDb();
    const project = db && (await findProject(db, auditDomain));
    if (!db || !project) return { live: null, demo: true, env: true, projectId: null };
    const audit = await liveAudit(project.domain);
    const limit = project.crawl_limit;
    const live = audit ? buildSiteAuditLive({ audit, domain: project.domain, limit }) : null;
    return { live, demo: !live, env: true, projectId: project.id };
  } catch {
    return { live: null, demo: true, env: true, projectId: null };
  }
});

export const headOf = (ctx: SiteAuditCtx, mock = false): SiteAuditHead => ({ live: ctx.live?.header ?? null, demo: ctx.demo || (mock && ctx.env), projectId: ctx.projectId });
