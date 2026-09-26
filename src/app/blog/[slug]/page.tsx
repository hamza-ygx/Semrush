import { notFound } from "next/navigation";
import { BlogPostPage } from "@/features/marketing/BlogPage";
import { blogPosts } from "@/features/marketing/data";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!blogPosts.some((p) => p.slug === slug)) notFound();
  return <BlogPostPage slug={slug} />;
}
