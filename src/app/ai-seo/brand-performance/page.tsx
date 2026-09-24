import { AppShell } from "@/components/shell/AppShell";
import { routes } from "@/config/routes";
import { AiSampleFrame } from "@/features/ai/AiSampleFrame";
import { BrandPerformanceLanding } from "@/features/ai/BrandPerformanceLanding";
import { BrandPerformanceSample } from "@/features/ai/BrandPerformanceSample";

export default async function BrandPerformancePage({ searchParams }: { searchParams: Promise<{ pid?: string }> }) {
  const { pid } = await searchParams;
  if (pid)
    return (
      <AppShell section="ai">
        <AiSampleFrame report="Brand Performance" llmTip backHref={routes.ai.brandPerformance}>
          <BrandPerformanceSample />
        </AiSampleFrame>
      </AppShell>
    );
  return (
    <AppShell section="ai" footer={false}>
      <BrandPerformanceLanding />
    </AppShell>
  );
}
