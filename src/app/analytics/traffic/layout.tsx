import type { ReactNode } from "react";
import { backendEnabled } from "@/lib/auth/config";
import { TrafficDemoProvider } from "@/features/traffic/demo";

export default function Layout({ children }: { children: ReactNode }) {
  return <TrafficDemoProvider demo={backendEnabled}>{children}</TrafficDemoProvider>;
}
