import { ConstructorPage } from "@/features/reports/ConstructorPage";

export default async function Page({ searchParams }: { searchParams: Promise<{ view?: string | string[] }> }) {
  const { view } = await searchParams;
  return <ConstructorPage key={String(view ?? "")} view={typeof view === "string" ? view : undefined} />;
}
