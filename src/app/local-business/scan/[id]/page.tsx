import { ScanPage } from "@/features/local/ScanPage";
import { LocalShell } from "@/features/local/ui";

export default function Page() {
  return (
    <LocalShell enterprise={false}>
      <ScanPage />
    </LocalShell>
  );
}
