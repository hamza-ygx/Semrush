import { brand } from "@/config/brand";
import { ResearchLanding } from "@/features/ad/ResearchLanding";
import { databases } from "@/features/ad/data";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; db?: string }> }) {
  const { q, db } = await searchParams;
  const code = (db ?? "se").toUpperCase();
  return <ResearchLanding key={`${q}-${code}`} kind="pla" domain={q ?? brand.domain} db={databases.some((d) => d.code === code) ? code : "SE"} />;
}
