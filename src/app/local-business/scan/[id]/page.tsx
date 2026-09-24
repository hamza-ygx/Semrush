import { ScanPage } from "@/features/local/ScanPage";
import { LocalShell } from "@/features/local/ui";

export default function Page() {
  return (
    <LocalShell search={{ kind: "goto" }} enterprise={false}>
      <ScanPage />
    </LocalShell>
  );
}
