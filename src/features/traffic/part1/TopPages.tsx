"use client";

import { useMemo, useState } from "react";
import { ChevronRight, ExternalIcon, SearchIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";
import { TrendingCards, type TrendingPage } from "../charts";
import { LockedArea, Skel } from "../Paywall";
import { TrafficFrame, domainColors } from "../TrafficFrame";
import { SampleCard, SegTabs } from "../ui";

const filters = ["geo" as const, "date" as const, "device" as const];
const zaraOnly = [{ name: "zara.com", color: domainColors.zara }];

const trending: Record<string, TrendingPage[]> = {
  Growing: [
    { kind: "Spiked", pct: "641.3K%", url: "zara.com/tr/t...75422.html", value: "6.4K" },
    { kind: "Trending up", pct: "352.9K%", url: "zara.com/in/...72923.html", value: "7.1K" },
    { kind: "Trending up", pct: "227.5K%", url: "zara.com/ca/...27400.html", value: "2.3K" },
    { kind: "Trending up", pct: "199K%", url: "zara.com/es/e...l8831.html", value: "4K" },
    { kind: "Trending up", pct: "187.2K%", url: "zara.com/mx/...l1204.html", value: "3.1K" },
  ],
  Declining: [
    { kind: "Trending up", pct: "98.1%", url: "zara.com/us/en/...l1033.html", value: "1.2K" },
    { kind: "Trending up", pct: "91.6%", url: "zara.com/uk/en/...l1180.html", value: "874" },
    { kind: "Trending up", pct: "88.2%", url: "zara.com/fr/fr/...l1047.html", value: "652" },
    { kind: "Trending up", pct: "80.4%", url: "zara.com/de/de/...l1066.html", value: "610" },
    { kind: "Trending up", pct: "77.9%", url: "zara.com/it/it/...l1203.html", value: "585" },
  ],
  "Newly Detected": [
    { kind: "Spiked", pct: "100%", url: "zara.com/es/es/...l2201.html", value: "3.3K" },
    { kind: "Spiked", pct: "100%", url: "zara.com/pl/pl/...l2231.html", value: "2.8K" },
    { kind: "Spiked", pct: "100%", url: "zara.com/tr/en/...l1180.html", value: "1.9K" },
    { kind: "Spiked", pct: "100%", url: "zara.com/br/pt/...l7730.html", value: "1.1K" },
    { kind: "Spiked", pct: "100%", url: "zara.com/se/sv/...l1009.html", value: "902" },
  ],
};

type Row = { page: string; share: number; views: string; visitors: string; visits: string; dur: string };

const head: Row[] = [
  { page: "Home page", share: 11.71, views: "8.1M", visitors: "6.2M", visits: "7.5M", dur: "05:12" },
  { page: "/us", share: 2.03, views: "2.1M", visitors: "1.4M", visits: "1.3M", dur: "04:48" },
  { page: "account.zara.com/init-authorize", share: 1.89, views: "3.5M", visitors: "2.8M", visits: "1.2M", dur: "02:21" },
  { page: "/es", share: 1.62, views: "1.4M", visitors: "799.3K", visits: "1M", dur: "05:40" },
  { page: "/uk", share: 0.92, views: "792.3K", visitors: "527.2K", visits: "589.5K", dur: "04:02" },
  { page: "/pl", share: 0.9, views: "700.1K", visitors: "429.7K", visits: "581K", dur: "04:33" },
  { page: "/fr", share: 0.86, views: "694.7K", visitors: "459K", visits: "551.7K", dur: "03:58" },
  { page: "/ca", share: 0.75, views: "615.7K", visitors: "373.2K", visits: "482.4K", dur: "04:11" },
  { page: "/de", share: 0.71, views: "594.5K", visitors: "413.5K", visits: "455.9K", dur: "03:47" },
  { page: "/it", share: 0.7, views: "575.1K", visitors: "371.1K", visits: "447.3K", dur: "04:20" },
  { page: "/tr", share: 0.54, views: "426.5K", visitors: "240.8K", visits: "350K", dur: "03:36" },
  { page: "/us/en/shop/cart", share: 0.53, views: "1.1M", visitors: "476.1K", visits: "341.5K", dur: "06:02" },
  { page: "/br", share: 0.5, views: "420.7K", visitors: "250.1K", visits: "321.2K", dur: "03:29" },
  { page: "/es/es/zara-home-decoracion...", share: 0.42, views: "283.6K", visitors: "241K", visits: "267.9K", dur: "02:54" },
  { page: "news.zara.com/pub/acc", share: 0.4, views: "290.6K", visitors: "174.3K", visits: "257.3K", dur: "01:48" },
  { page: "/fr/fr/zara-home-salon-l1013.html", share: 0.39, views: "278K", visitors: "230.6K", visits: "253.7K", dur: "02:37" },
];

const mid = [
  "/mx", "/nl", "/pt", "/ro/en", "/jp", "/kr", "/at", "/ch", "/be", "/gr", "/in", "/ae", "/sa", "/ie", "/dk", "/no", "/fi", "/hu", "/sk", "/bg", "/hr", "/si", "/co", "/cl", "/pe", "/ar", "/au",
];

const tail: Row[] = [
  { page: "/cz", share: 0.15, views: "116.7K", visitors: "60.4K", visits: "99K", dur: "03:05" },
  { page: "/de/de/damen-neuware-l1180....", share: 0.15, views: "167.6K", visitors: "73.1K", visits: "93.3K", dur: "02:48" },
  { page: "/se", share: 0.14, views: "113.3K", visitors: "80.6K", visits: "90.1K", dur: "03:14" },
  { page: "/de/en", share: 0.13, views: "146.2K", visitors: "88.2K", visits: "86.2K", dur: "03:22" },
  { page: "/de/de/shop/cart", share: 0.13, views: "263.8K", visitors: "129.7K", visits: "85.6K", dur: "05:31" },
  { page: "/tracking-not-available", share: 0.13, views: "109.9K", visitors: "78.4K", visits: "83.1K", dur: "01:12" },
  { page: "/ro", share: 0.13, views: "113.3K", visitors: "75.9K", visits: "83.1K", dur: "03:09" },
];

const k = (v: number) => (v >= 1000 ? `${+(v / 1000).toFixed(1)}M` : `${+v.toFixed(1)}K`);

const rows: Row[] = [
  ...head,
  ...mid.map((p, i) => {
    const visits = 248 - i * 5.5;
    return { page: p, share: +(0.38 - i * 0.0078).toFixed(2), views: k(visits * 1.35), visitors: k(visits * 0.72), visits: k(visits), dur: `0${2 + (i % 4)}:${String(10 + ((i * 7) % 49)).padStart(2, "0")}` };
  }),
  ...tail,
];

function Spark({ seed }: { seed: number }) {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const v = 0.5 + 0.35 * Math.sin(i * 0.9 + seed) + 0.15 * Math.cos(i * 2.1 + seed * 1.7);
    return [i * (86 / 11), 20 - Math.max(0.05, Math.min(1, v)) * 18] as const;
  });
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  return (
    <svg width={86} height={21} className="block">
      <path d={`${d}L86 21L0 21Z`} fill="#e0e0f8" />
      <path d={d} fill="none" stroke="#7b80e8" strokeWidth={1} />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14}>
      <path d="M2.5 4h11M4.5 8h7M6.5 12h3" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </svg>
  );
}

function TopPagesTable() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const list = useMemo(() => rows.filter((r) => r.page.toLowerCase().includes(q.toLowerCase())), [q]);
  const th = "text-[12px] font-normal text-rk-text";
  return (
    <SampleCard title="Top Pages" bodyClassName="pt-[21px]">
      <label className="mx-5 flex h-[27px] w-[224px] items-center gap-[8px] rounded-[6px] border border-[#d7d9de] bg-white px-[8px]">
        <SearchIcon width={16} height={16} className="text-rk-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by page" className="w-full bg-transparent text-[14px] text-rk-text outline-none placeholder:text-[#8a8c96]" />
      </label>
      <div className="mt-[20px] overflow-x-clip rounded-b-lg">
        <table className="w-[1500px] table-fixed text-[14px] leading-5">
          <colgroup>
            <col className="w-[290px]" />
            <col className="w-[180px]" />
            <col className="w-[98px]" />
            <col className="w-[150px]" />
            <col className="w-[150px]" />
            <col className="w-[150px]" />
            <col className="w-[160px]" />
            <col />
          </colgroup>
          <thead className="sticky top-[43px] z-20">
            <tr className="relative h-[40px] bg-[#f9f9f9]">
              <th className={`${th} pl-3 text-left`}>Page</th>
              <th className={`${th} bg-[#e8e9e9] pr-[18px]`}>
                <span className="flex items-center justify-end gap-[6px]">
                  Traffic Share
                  <SortIcon />
                </span>
              </th>
              <th className={`${th} text-right`}>1Y Trend</th>
              <th className={`${th} text-right`}>Unique Pageviews</th>
              <th className={`${th} text-right`}>Unique Visitors</th>
              <th className={`${th} text-right`}>Visits</th>
              <th className={`${th} text-right whitespace-nowrap`}>Avg. Visit Duration</th>
              <th className={`${th} pl-8 text-left`}>Bounce Rate</th>
            </tr>
            <tr>
              <th colSpan={8} className="relative h-0 p-0">
                <span className="absolute -top-[8px] left-[290px] h-[5px] w-[358px] rounded-full bg-[#c4c5c8]" />
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((r, i) => (
              <tr key={r.page} className="h-[45px] border-b border-[#eef0f2]">
                <td className="pl-3">
                  <span className="flex items-center gap-[10px] text-rk-text">
                    <button type="button" aria-label="Expand" onClick={() => setOpen({ ...open, [r.page]: !open[r.page] })} className="text-rk-text-2">
                      <ChevronRight width={16} height={16} className={open[r.page] ? "rotate-90" : ""} />
                    </button>
                    <span className="truncate">{r.page}</span>
                    <ExternalIcon width={15} height={15} className="shrink-0 text-rk-faint" />
                  </span>
                </td>
                <td className="pr-[26px] pl-3">
                  <span className="flex items-center justify-between">
                    <span className="h-[7px] w-[90px] rounded-[1px] bg-[#ececee]">
                      <span className="block h-[7px] rounded-[1px] bg-[#6268e7]" style={{ width: Math.max(1, (r.share / 11.71) * 11) }} />
                    </span>
                    <span className="text-rk-muted">{r.share}%</span>
                  </span>
                </td>
                <td className="pl-3">
                  <Spark seed={i * 1.37} />
                </td>
                <td className="text-right text-rk-text">{r.views}</td>
                <td className="text-right text-rk-text">{r.visitors}</td>
                <td className="text-right text-rk-text">{r.visits}</td>
                <td className="text-right text-rk-text">{r.dur}</td>
                <td className="pl-8 text-rk-text">{(38 + ((i * 13) % 20)).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="relative h-0">
          <span className="absolute -top-[6px] left-[290px] h-[5px] w-[358px] rounded-full bg-[#c4c5c8]" />
        </div>
      </div>
      <div className="flex h-[71px] items-center gap-[8px] px-5 pt-[3px] text-[14px] text-rk-text">
        <button type="button" disabled className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#e0e1e5] text-rk-faint">
          «
        </button>
        <button type="button" disabled className="h-7 rounded-[6px] border border-[#e0e1e5] px-[8px] text-rk-faint">
          Prev
        </button>
        <button type="button" className="h-7 rounded-[6px] bg-rk-btn-dark px-[8px] font-medium text-white">
          Next
        </button>
        <span className="ml-[8px]">Page:</span>
        <input defaultValue="1" className="h-7 w-[68px] rounded-[6px] border border-[#d7d9de] px-[8px] outline-none" />
        <span className="ml-[1px]">
          of <span className="text-rk-link">941</span>
        </span>
      </div>
    </SampleCard>
  );
}

export function TopPagesSample() {
  return (
    <TrafficFrame title="Top Pages" filters={filters} chips="select" domains={zaraOnly}>
      <div className="flex w-[1236px] flex-col gap-4">
        <SampleCard title="Trending Pages" info bodyClassName="px-5 pt-[21px] pb-[21px]">
          <TrendingTabs />
        </SampleCard>
        <TopPagesTable />
      </div>
    </TrafficFrame>
  );
}

function TrendingTabs() {
  const [tab, setTab] = useState("Growing");
  return (
    <>
      <SegTabs items={["Growing", "Declining", "Newly Detected"]} onChange={setTab} />
      <div className="mt-[22px]">
        <TrendingCards pages={trending[tab]} color="#00b386" fill="#c8f5ea" />
      </div>
    </>
  );
}

export function TopPagesLocked() {
  return (
    <TrafficFrame title="Top Pages" filters={filters} chips="select" locked bottomGap={116}>
      <div className="w-[1236px]">
        <LockedArea charge="$335.32" sampleHref={routes.traffic.topPages}>
          <div className="flex flex-col gap-4">
            <SampleCard title="Trending Pages" info bodyClassName="px-5 pt-[21px] pb-[21px]">
              <SegTabs items={["Growing", "Declining", "Newly Detected"]} />
              <div className="mt-[22px] flex gap-[15px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[145px] w-[251px] rounded-[6px] border border-[#dcdde2] p-4">
                    <Skel w={105} h={7} />
                    <Skel w={105} h={7} className="mt-[6px]" />
                    <span className="mt-[16px] block h-[26px] w-[77px] bg-[#c9cbd1]" />
                    <svg width={218} height={30} className="mt-[14px]">
                      <path d="M0 30 L0 20 L30 12 L60 22 L90 10 L120 20 L150 8 L180 18 L218 10 L218 30Z" fill="#c9cbd1" />
                    </svg>
                  </div>
                ))}
              </div>
            </SampleCard>
            <SampleCard title="Top Pages" bodyClassName="pt-[21px] pb-[40px]">
              <div className="mx-5 flex h-[27px] w-[224px] items-center gap-[8px] rounded-[6px] border border-[#d7d9de] px-[8px] text-[14px] text-rk-muted">
                <SearchIcon width={16} height={16} />
                Filter by page
              </div>
              <div className="mt-[20px] flex h-[40px] items-center bg-[#f9f9f9] pl-3 text-[12px] text-rk-muted">Page</div>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex h-[45px] items-center gap-[20px] border-b border-[#eef0f2] px-3">
                  <Skel w={260} h={7} />
                  <Skel w={160} h={7} />
                  <Skel w={90} h={7} />
                  <Skel w={130} h={7} />
                </div>
              ))}
            </SampleCard>
          </div>
        </LockedArea>
      </div>
    </TrafficFrame>
  );
}
