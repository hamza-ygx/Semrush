import type { Snap } from "../context";
import { TrackingPage } from "../TrackingPage";
import { FilterBar } from "../FilterBar";
import { DomainChip, Segmented, Select, SearchInput } from "../controls";
import { SortIcon } from "../icons";
import { NothingFound, Panel } from "../ui";
import { intentOptions, volumeOptions } from "./Overview";
import { latestKeywords, trackedKeywords } from "../data";
import { dayLabel, signed, signedInt, type LivePage, type TrackingLive } from "../live";

const diffCls = (v: number) => (v > 0 ? "text-rk-success" : v < 0 ? "text-rk-danger" : "text-rk-muted");
const meta = new Map([...trackedKeywords, ...latestKeywords].map((k) => [k.keyword, k]));
const intentColors: Record<string, string> = { I: "#3d47c8", N: "#8e92ec", C: "#ffb400", T: "#009f81", "n/a": "#d6d8d7" };

function LivePageRow({ p }: { p: LivePage }) {
  const vol = (ks: string[]) => ks.reduce((s, k) => s + (meta.get(k)?.volume ?? 0), 0);
  const volume = vol(p.kws);
  const intents = p.kws.map((k) => meta.get(k)?.intent ?? "n/a");
  const cells: [string, number, string][] = [
    [String(p.kws.length), p.kws.length - p.prevKws.length, signedInt(p.kws.length - p.prevKws.length)],
    [String(p.traffic), p.traffic - p.prevTraffic, signedInt(p.traffic - p.prevTraffic)],
    [p.avgPos.toFixed(1), p.prevKws.length ? p.prevAvgPos - p.avgPos : 0, signed(p.prevAvgPos - p.avgPos, 1)],
    [volume.toLocaleString("en-US"), volume - vol(p.prevKws), signedInt(volume - vol(p.prevKws))],
  ];
  return (
    <div className="flex h-[44px] border-b border-[#edefef] text-[14px] leading-5 text-rk-text">
      <div className="flex min-w-0 flex-1 items-center pr-2 pl-[52px]">
        <a href={p.url} target="_blank" rel="noreferrer" className="truncate text-rk-link hover:text-rk-link-hover">
          {p.url.replace(/^https?:\/\//, "")}
        </a>
      </div>
      {groups.map((g, gi) => {
        if (!g.sub)
          return (
            <div key={g.label} style={{ width: g.w }} className="flex shrink-0 items-center px-[16px]">
              <span className="flex h-[7px] w-full overflow-hidden rounded-full bg-[#e0e2e1]">
                {intents.map((it, i) => (
                  <span key={i} className="h-full flex-1" style={{ background: intentColors[it] }} />
                ))}
              </span>
            </div>
          );
        const [v, dv, dt] = cells[gi === 0 ? 0 : gi - 1];
        return (
          <div key={g.label} style={{ width: g.w }} className="flex shrink-0 items-center">
            <span className="flex-1 pr-[9px] text-right">{v}</span>
            <span className={`text-right text-[12px] ${diffCls(dv)} ${gi === groups.length - 1 ? "w-[48px] pr-[20px]" : "w-[36px] pr-[8px]"}`}>{dv ? dt : "0"}</span>
          </div>
        );
      })}
    </div>
  );
}

const groups = [
  { label: "Keywords count", w: 115.4, sub: true, sorted: true },
  { label: "Intent Rates", w: 112, sub: false },
  { label: "Estimated Traffic", w: 114.5, sub: true },
  { label: "Average position", w: 114.5, sub: true },
  { label: "Total volume", w: 131, sub: true },
];

function PagesTable({ day, live }: { day: string; live?: TrackingLive | null }) {
  const pages = live?.pages.filter((p) => p.kws.length) ?? [];
  return (
    <Panel title="Pages" count={`${pages.length} (${pages.length})`} headerClassName="h-[41px]" divider={false} className={`mt-[15px] ${pages.length ? "" : "h-[379px]"}`}>
      <div className="flex h-[82px] border-y border-[#edefef] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
        <div className="flex-1 pt-[12px] pl-[52px]">URL</div>
        {groups.map((g, gi) => (
          <div key={g.label} style={{ width: g.w }} className={`flex shrink-0 flex-col border-l border-[#edefef] ${g.sorted ? "bg-[#eceded]" : ""}`}>
            <div className="h-[41px] pt-[12px] text-center whitespace-nowrap">{g.label}</div>
            {g.sub && (
              <div className="flex h-[41px] items-center">
                <span className={`flex h-full flex-1 items-center justify-end gap-[4px] pr-[9px] ${g.sorted ? "bg-[#e3e5e5]" : ""}`}>
                  {day} {g.sorted && <SortIcon width={14} height={14} className="text-rk-muted" />}
                </span>
                <span className={`flex h-full items-center justify-end ${gi === groups.length - 1 ? "w-[48px] pr-[20px]" : "w-[36px] pr-[8px]"} ${g.sorted ? "bg-[#f7f8f9]" : ""}`}>Diff</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {pages.length ? pages.map((p) => <LivePageRow key={p.url} p={p} />) : <NothingFound className="pt-[32px]" />}
    </Panel>
  );
}

export function PagesView(snap: Snap) {
  const { live } = snap;
  const gained = live?.pages.filter((p) => p.kws.length && !p.prevKws.length).length ?? 0;
  const lost = live?.pages.filter((p) => !p.kws.length && p.prevKws.length).length ?? 0;
  return (
    <TrackingPage tab="pages" {...snap}>
      <div className="px-8 pt-[17px]">
        <FilterBar
          top={<DomainChip />}
          filters={
            <>
              <SearchInput placeholder="Filter by URL" width={187} />
              <Segmented
                items={["All URLs", "New", "Lost"] as const}
                value="All URLs"
                suffix={{ New: <span className="ml-[3px] text-rk-muted">{gained}</span>, Lost: <span className="ml-[3px] text-rk-muted">{lost}</span> }}
              />
              <Select label="Tags" options={["No tags"]} className="w-[72px]" />
              <Select label="Intent" options={intentOptions} className="w-[79px]" />
              <Select label="Volume" options={volumeOptions} className="w-[91px]" />
              <Select label="Advanced filters" options={["Include URL", "Exclude URL"]} className="w-[149px]" />
            </>
          }
        />
        <PagesTable day={live ? dayLabel(live.to) : snap.end === "20260925" ? "Sep 25" : "Sep 24"} live={live} />
      </div>
    </TrackingPage>
  );
}
