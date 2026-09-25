import type { ReactNode } from "react";
import { PricingShell } from "@/features/pricing/PricingShell";

export default function Layout({ children }: { children: ReactNode }) {
  return <PricingShell>{children}</PricingShell>;
}
