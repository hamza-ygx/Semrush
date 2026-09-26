import { QueryLog } from "@/features/account/QueryLog";

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string | string[] }> }) {
  const { page } = await searchParams;
  return <QueryLog tab="api" page={Math.max(1, Number(page) || 1)} />;
}
