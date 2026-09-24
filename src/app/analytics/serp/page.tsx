import { SerpSnapshot } from "@/features/serp/SerpSnapshot";

export default async function SerpPage({ searchParams }: { searchParams: Promise<{ phrase?: string; db?: string; domain?: string; position?: string }> }) {
  const { phrase = "redovisningsbyrå halmstad", db = "se", domain = "rkjh.se", position = "3" } = await searchParams;
  return <SerpSnapshot phrase={phrase} db={db} domain={domain} position={position} />;
}
