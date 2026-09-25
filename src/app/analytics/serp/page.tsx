import { SerpSnapshot } from "@/features/serp/SerpSnapshot";

type Param = string | string[] | undefined;
const one = (v: Param, fallback: string) => (Array.isArray(v) ? v[0] : v) || fallback;

export default async function SerpPage({ searchParams }: { searchParams: Promise<{ phrase?: Param; db?: Param; domain?: Param; position?: Param }> }) {
  const sp = await searchParams;
  return <SerpSnapshot phrase={one(sp.phrase, "redovisningsbyrå halmstad")} db={one(sp.db, "se")} domain={one(sp.domain, "rkjh.se")} position={one(sp.position, "3")} />;
}
