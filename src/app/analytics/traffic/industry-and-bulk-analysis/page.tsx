import { IndustryBulk } from "@/features/traffic/part3/IndustryBulk";

export default async function Page({ searchParams }: { searchParams: Promise<{ sample?: string }> }) {
  const { sample } = await searchParams;
  return <IndustryBulk sample={sample !== undefined} />;
}
