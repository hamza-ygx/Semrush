import { PagesView } from "@/features/tracking/views/Pages";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <PagesView {...snapFrom(await searchParams)} />;
}
