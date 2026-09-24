import { TopPagesLocked, TopPagesSample } from "@/features/traffic/part1/TopPages";

export default async function Page({ searchParams }: { searchParams: Promise<{ lid?: string }> }) {
  const { lid } = await searchParams;
  return lid ? <TopPagesLocked /> : <TopPagesSample />;
}
