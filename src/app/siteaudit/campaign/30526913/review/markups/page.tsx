import { Markup } from "@/features/siteaudit/part2/Markup";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  return <Markup head={headOf(ctx)} demo={ctx.env} />;
}
