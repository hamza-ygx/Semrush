import { GapShell } from "@/features/gaps/common";
import { SwaLanding } from "@/features/swa/SwaLanding";

export default function SeoWritingAssistantPage() {
  return (
    <GapShell search={{ kind: "goto" }}>
      <SwaLanding />
    </GapShell>
  );
}
