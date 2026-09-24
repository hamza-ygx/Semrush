import type { ReactNode } from "react";
import { AiSampleFrame } from "../AiSampleFrame";

export function NoFilterFrame({ report, children }: { report: string; children: ReactNode }) {
  return (
    <AiSampleFrame report={report} filters={false}>
      {children}
    </AiSampleFrame>
  );
}
