import { MediaMonitoring } from "@/features/aipr/MediaMonitoring";
import { PrShell } from "@/features/aipr/PrShell";

export default function Page() {
  return (
    <PrShell>
      <MediaMonitoring />
    </PrShell>
  );
}
