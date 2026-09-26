import { notFound } from "next/navigation";
import { AppDetailPage } from "@/features/apps/AppDetailPage";
import { findAppDetail } from "@/features/apps/data";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = findAppDetail(slug);
  if (!detail) notFound();
  return <AppDetailPage detail={detail} />;
}
