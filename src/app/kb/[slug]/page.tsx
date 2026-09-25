import { notFound } from "next/navigation";
import { KbArticlePage } from "@/features/kb/KbArticlePage";
import { kbArticles } from "@/features/kb/data";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!kbArticles.some((a) => a.slug === slug)) notFound();
  return <KbArticlePage slug={slug} />;
}
