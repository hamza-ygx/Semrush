"use client";

import { TrafficFrame } from "../TrafficFrame";
import { channelReports } from "./data";
import { GrowingPagesCard, TopSourcesCard, TrendCard } from "./ui";

export function ChannelReport({ kind }: { kind: keyof typeof channelReports }) {
  const r = channelReports[kind];
  return (
    <TrafficFrame title={r.title}>
      <div className="flex flex-col gap-4">
        <TrendCard title="Traffic Trend" data={r.total.data} ticks={r.total.ticks} width={1196} />
        <div className="grid grid-cols-2 gap-4">
          <TrendCard title="Desktop Trend" data={r.desktop.data} ticks={r.desktop.ticks} width={570} labelEvery={2} exportBtn />
          <TrendCard title="Mobile Trend" data={r.mobile.data} ticks={r.mobile.ticks} width={570} labelEvery={2} exportBtn />
        </div>
        <GrowingPagesCard pages={r.growing} />
        {r.sources && <TopSourcesCard sources={r.sources} />}
      </div>
    </TrafficFrame>
  );
}
