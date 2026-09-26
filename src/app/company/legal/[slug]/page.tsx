import { notFound } from "next/navigation";
import { LegalDocPage } from "@/features/marketing/LegalPages";
import { legalDocs } from "@/features/marketing/data";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!legalDocs.some((d) => d.slug === slug)) notFound();
  return <LegalDocPage slug={slug} />;
}
