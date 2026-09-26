import type { Snap } from "../context";
import { TrackingPage } from "../TrackingPage";
import { OverviewBody } from "../OverviewBody";

export const serpOptions = ["Featured snippet", "Local pack", "Knowledge panel", "Image pack", "Video", "People also ask", "Reviews", "Sitelinks"];
export const volumeOptions = ["100,001+", "10,001-100,000", "1,001-10,000", "101-1,000", "11-100", "1-10"];
export const intentOptions = ["Informational", "Navigational", "Commercial", "Transactional"];
const kdOptions = ["Very hard 85-100%", "Hard 70-84%", "Difficult 50-69%", "Possible 30-49%", "Easy 15-29%", "Very easy 0-14%"];

export function OverviewView({ prediction = false, ...snap }: Snap & { prediction?: boolean }) {
  return (
    <TrackingPage tab="overview" {...snap}>
      <OverviewBody prediction={prediction} kdOptions={kdOptions} />
    </TrackingPage>
  );
}
