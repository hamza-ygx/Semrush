import { cache } from "react";
import { findProject, liveAudit, liveDb } from "@/lib/seo/live";
import { liveSource } from "@/lib/seo/sources";
import { backendEnabled } from "@/lib/auth/config";
import { buildSiteAuditLive, type HeaderLive, type SiteAuditLive } from "./live";
import { buildPsiLive, type PsiLive, type PsiRun } from "./psiLive";

export const auditDomain = "www.rkjh.se";

export type SiteAuditCtx = { live: SiteAuditLive | null; demo: boolean; env: boolean; projectId: string | null; psi: PsiLive | null };

export type SiteAuditHead = { live?: HeaderLive | null; demo?: boolean; projectId?: string | null };

async function loadPsi(domain: string): Promise<PsiLive | null> {
  try {
    return buildPsiLive(await liveSource<{ runs: PsiRun[] }>("psi", domain));
  } catch {
    return null;
  }
}

export const loadSiteAudit = cache(async (): Promise<SiteAuditCtx> => {
  if (!backendEnabled) return { live: null, demo: false, env: false, projectId: null, psi: null };
  try {
    const db = await liveDb();
    const project = db && (await findProject(db, auditDomain));
    if (!db || !project) return { live: null, demo: true, env: true, projectId: null, psi: null };
    const [audit, psi] = await Promise.all([liveAudit(project.domain), loadPsi(project.domain)]);
    const limit = project.crawl_limit;
    const live = audit ? buildSiteAuditLive({ audit, domain: project.domain, limit }) : null;
    return { live, demo: !live, env: true, projectId: project.id, psi };
  } catch {
    return { live: null, demo: true, env: true, projectId: null, psi: null };
  }
});

export const headOf = (ctx: SiteAuditCtx, mock = false): SiteAuditHead => ({ live: ctx.live?.header ?? null, demo: ctx.demo || (mock && ctx.env), projectId: ctx.projectId });
