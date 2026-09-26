import { AppShell } from "@/components/shell/AppShell";
import { SocialDashboard } from "@/features/social/SocialDashboard";
import { socialTools, type SocialTool } from "@/features/social/data";

export default async function Page({ searchParams }: { searchParams: Promise<{ tool?: string | string[] }> }) {
  const { tool } = await searchParams;
  const active = socialTools.find((t) => t === tool) as SocialTool | undefined;
  return (
    <AppShell section="social" search={{ kind: "none" }} enterprise={false} help="question" footerPb={37}>
      <SocialDashboard key={active ?? "dashboard"} tool={active} />
    </AppShell>
  );
}
