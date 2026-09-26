import { CannibalizationView } from "@/features/tracking/views/Cannibalization";
import { snapFrom, type TrackingSearch } from "@/features/tracking/params";

export default async function Page({ searchParams }: { searchParams: TrackingSearch }) {
  return <CannibalizationView {...snapFrom(await searchParams)} />;
}
