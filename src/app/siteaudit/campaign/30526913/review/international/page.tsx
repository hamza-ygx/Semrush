import { International } from "@/features/siteaudit/part2/International";
import { headOf, loadSiteAudit } from "@/features/siteaudit/load";

export const dynamic = "force-dynamic";

export default async function Page() {
  const ctx = await loadSiteAudit();
  return <International head={headOf(ctx)} demo={ctx.env} />;
}
