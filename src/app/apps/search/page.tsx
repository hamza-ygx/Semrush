import { AppsSearchPage } from "@/features/apps/AppsSearchPage";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  return <AppsSearchPage key={String(q ?? "")} query={typeof q === "string" ? q : ""} />;
}
