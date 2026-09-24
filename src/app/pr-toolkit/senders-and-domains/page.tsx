import { landings } from "@/features/aipr/data";
import { PrLanding } from "@/features/aipr/Landing";
import { PrShell } from "@/features/aipr/PrShell";

export default function Page() {
  return (
    <PrShell>
      <PrLanding page={landings.senders} />
    </PrShell>
  );
}
