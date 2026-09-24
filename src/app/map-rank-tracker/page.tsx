import { MapRankTrackerPage } from "@/features/local/MapRankTrackerPage";
import { LocalShell } from "@/features/local/ui";

export default function Page() {
  return (
    <LocalShell help={false}>
      <MapRankTrackerPage />
    </LocalShell>
  );
}
