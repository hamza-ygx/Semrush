import { notFound } from "next/navigation";
import { EnterprisePricingPage } from "@/features/pricing/EnterprisePricingPage";
import { PricingPage } from "@/features/pricing/PricingPage";
import { toolkits, type ToolkitSlug } from "@/features/pricing/data";

export function generateStaticParams() {
  return [...Object.keys(toolkits).filter((k) => k !== "one"), "enterprise"].map((toolkit) => ({ toolkit }));
}

export default async function Page({ params }: { params: Promise<{ toolkit: string }> }) {
  const { toolkit } = await params;
  if (toolkit === "enterprise") return <EnterprisePricingPage />;
  if (toolkit === "one" || !(toolkit in toolkits)) notFound();
  return <PricingPage slug={toolkit as ToolkitSlug} />;
}
