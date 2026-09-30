import Link from "next/link";
import { routes } from "@/config/routes";
import { competitors as mockCompetitors, domain, intents as mockIntents, positionDistribution as mockDistribution, selfPoint as mockSelf, topKeywords } from "../data";
import { Plot, VBW } from "../charts";
import { DarkButton, Dot, ExtLink, IntentBadge, LocalPinIcon, SerpIcon, SortIcon, SparkleIcon, Widget } from "../ui";
import type { DomainLive } from "../live";

const th = "h-[33px] border-b border-rk-border text-[12px] font-normal text-rk-text-2";
const row = "h-[37px] border-b border-rk-border";

function TopKeywords({ live }: { live: DomainLive | null }) {
  const rows = live ? live.topKeywords : topKeywords;
  return (
    <Widget title="Top Organic Keywords" count={live ? live.keywords.toLocaleString("en-US") : "133"} className="h-[359px]" bodyClassName="flex flex-col pt-[18px]">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className={th}>
            <th className="w-[184px] pl-5 text-left font-normal">Keyword</th>
            <th className="w-[60px] text-left font-normal">Intent</th>
            <th className="w-[31px] text-right font-normal">Pos.</th>
            <th className="w-[80px] text-right font-normal">Volume</th>
            <th className="w-[72px] text-right font-normal whitespace-nowrap">CPC (U...</th>
            <th className="pr-5 text-right font-normal">
              <span className="inline-flex items-center gap-0">
                Traffic
                <SortIcon className="-ml-[2px] text-rk-muted" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((k, i) => (
            <tr key={`${k.keyword}-${i}`} className={`${row} last:border-b`}>
              <td className="pl-5">
                <span className="flex items-center gap-[6px]">
                  <Link href={routes.keywordOverview} className={`${i ? "max-w-[121px]" : "max-w-[146px]"} truncate text-rk-link hover:text-rk-link-hover`}>
                    {k.keyword}
                  </Link>
                  {i > 0 && <SerpIcon className="shrink-0 text-[#a9abaa]" />}
                </span>
              </td>
              <td className="pl-5">
                <IntentBadge intent={k.intent} />
              </td>
              <td className="text-right">{k.pos === "local" ? <LocalPinIcon className="ml-auto text-[#235fe2]" /> : k.pos}</td>
              <td className="text-right">{k.volume}</td>
              <td className="text-right">{k.cpc}</td>
              <td className="pr-5 text-right">{k.traffic}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[21px] px-5">
        <DarkButton href={routes.organic.positions}>View details</DarkButton>
      </div>
    </Widget>
  );
}

function KeyTopics({ name = domain }: { name?: string }) {
  const blur = (w: number) => <span className="block h-[10px] rounded bg-[#c9cde6] blur-[2px]" style={{ width: w }} />;
  return (
    <Widget
      title={
        <>
          <SparkleIcon className="text-[#8a3fcf]" />
          Key Topics
        </>
      }
      className="h-[359px]"
      bodyClassName="px-5 pt-[19px]"
    >
      <div className="relative h-[279px] overflow-hidden rounded-md bg-gradient-to-r from-[#dfe8fc] to-[#efe6fd]">
        <div className="absolute inset-0 grid grid-cols-2 gap-3 p-3 opacity-80">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-md bg-white/40 p-3">
              {blur(120)}
              <div className="mt-2">{blur(70)}</div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-[8px]">
          <div className="text-[16px] leading-6">
            View <b>{name}</b> key topics
          </div>
          <Link href={routes.organic.topics} className="mt-[12px] flex h-7 items-center rounded-md bg-[#8f44e8] px-[9px] text-[14px] font-semibold text-white hover:bg-[#7a32d4]">
            Get topics
          </Link>
        </div>
      </div>
    </Widget>
  );
}

function KeywordsByIntent({ live }: { live: DomainLive | null }) {
  const intents = live?.intents ?? mockIntents;
  return (
    <Widget title="Keywords by Intent" className="h-[353px]" bodyClassName="flex flex-col pt-[17px]">
      <div className="flex h-[14px] gap-[2px] px-5">
        {intents.map((i) => (
          <div key={i.label} className="h-full first:rounded-l-sm last:rounded-r-sm" style={{ width: `${i.share}%`, background: i.color }} />
        ))}
      </div>
      <table className="mt-[12px] w-full text-[14px] leading-5">
        <thead>
          <tr className={th}>
            <th className="pl-5 text-left font-normal">Intent</th>
            <th />
            <th className="w-[101px] text-right font-normal">Keywords</th>
            <th className="w-[116px] pr-5 text-right font-normal">Traffic</th>
          </tr>
        </thead>
        <tbody>
          {intents.map((i) => (
            <tr key={i.label} className={row}>
              <td className="pl-5">
                <span className="flex items-center gap-[6px]">
                  <Dot color={i.color} />
                  {i.label}
                </span>
              </td>
              <td className="text-right">
                <Link href={routes.organic.positions} className="text-rk-link hover:text-rk-link-hover">
                  {i.pct}
                </Link>
              </td>
              <td className="text-right">{i.keywords}</td>
              <td className="pr-5 text-right">{i.traffic}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[20px] px-5">
        <DarkButton href={routes.organic.positions}>View details</DarkButton>
      </div>
    </Widget>
  );
}

function PositionDistribution({ live }: { live: DomainLive | null }) {
  const H = 192;
  const positionDistribution = live ? live.distribution : mockDistribution;
  const n = positionDistribution.length;
  const w = VBW / n;
  return (
    <Widget title="Organic Position Distribution" className="h-[353px]" bodyClassName="pt-[31px] pr-5 pl-[68px]">
      <Plot
        height={H}
        ticks={[0, 0.5, 1]}
        left={["0%", "50%", "100%"]}
        gap={16}
        xGap={11}
        bottomH={60}
        x={positionDistribution.map((p, i) => ({ at: (i + 0.5) / n, label: p.label }))}
        labelClass="text-[13px] leading-4 text-rk-muted"
        baseColor="#d6d8d7"
      >
        {positionDistribution.map((p, i) => (
          <rect key={p.label} x={i * w + 1} width={w - 2} y={H - (p.value / 100) * H} height={(p.value / 100) * H} fill="#6167e6" />
        ))}
      </Plot>
      <div className="-mt-[22px] text-center text-[13px] leading-4 text-rk-muted">Positions on Google SERP</div>
    </Widget>
  );
}

function Competitors({ live }: { live: DomainLive | null }) {
  const competitors = live?.competitors?.rows ?? mockCompetitors;
  return (
    <Widget title="Main Organic Competitors" count={live?.competitors ? String(live.competitors.total) : "249"} className="h-[344px]" bodyClassName="flex flex-col pt-[18px]">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className={th}>
            <th className="w-[192px] pl-5 text-left font-normal">Competitor</th>
            <th className="w-[110px] text-left font-normal">
              <span className="inline-flex items-center gap-1">
                Com. Level
                <SortIcon className="text-rk-muted" />
              </span>
            </th>
            <th className="text-right font-normal">Com. Keywords</th>
            <th className="w-[128px] pr-5 text-right font-normal">SE Keywords</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((c) => (
            <tr key={c.domain} className={row}>
              <td className="pl-5">
                <span className="flex items-center gap-1">
                  <Link href={routes.organic.competitors} className="max-w-[134px] truncate text-rk-link hover:text-rk-link-hover">
                    {c.domain}
                  </Link>
                  <ExtLink href={`https://${c.domain}`} />
                </span>
              </td>
              <td>
                <span className="block h-[7px] w-[80px] overflow-hidden rounded-full bg-[#eceef1]">
                  <span className="block h-full rounded-full bg-[#6167e6]" style={{ width: `${c.level}%` }} />
                </span>
              </td>
              <td className="text-right">
                <Link href={routes.keywordGap} className="text-rk-link hover:text-rk-link-hover">
                  {c.common}
                </Link>
              </td>
              <td className="pr-5 text-right">
                <Link href={routes.organic.positions} className="text-rk-link hover:text-rk-link-hover">
                  {c.keywords}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[17px] px-5">
        <DarkButton href={routes.organic.competitors}>View details</DarkButton>
      </div>
    </Widget>
  );
}

const Cross = ({ color }: { color: string }) => (
  <svg viewBox="0 0 10 10" width={8} height={8} opacity={0.85}>
    <path d="M3.5 0h3v3.5H10v3H6.5V10h-3V6.5H0v-3h3.5z" fill={color} />
  </svg>
);

const trimNum = (v: number) => String(+v.toFixed(1));

function PositioningMap({ live }: { live: DomainLive | null }) {
  const H = 139;
  const lc = live?.competitors ?? null;
  const competitors = lc ? lc.rows : mockCompetitors;
  const selfPoint = lc ? lc.self : mockSelf;
  const maxX = lc ? lc.maxX : 160;
  const maxY = lc ? lc.maxY : 424.6;
  const all = [...competitors.map((c) => ({ ...c, short: c.domain.length > 16 ? `${c.domain.slice(0, 12)}...` : c.domain })), { ...selfPoint, short: selfPoint.domain }];
  return (
    <Widget title="Competitive Positioning Map" className="h-[344px]" bodyClassName="px-5 pt-[20px]">
      <div className="flex flex-wrap gap-x-[20px] gap-y-[7px] text-[14px] leading-5">
        {all.map((c) => (
          <span key={c.domain} className="flex items-center gap-[6px]">
            <Dot color={c.color} />
            {c.short}
          </span>
        ))}
      </div>
      <div className="relative mt-[23px] pl-[80px]">
        <span className="absolute top-[70px] left-[18px] origin-center -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[12px] whitespace-nowrap text-rk-muted" style={{ left: 5 }}>
          Organic Search Traffic
        </span>
        <Plot
          height={H}
          ticks={[0, 1 / 3, 2 / 3, 1]}
          left={lc ? [0, 1, 2, 3].map((i) => trimNum((maxY * i) / 3)) : ["0", "141.5", "283.1", "424.6"]}
          gap={14}
          bottomH={52}
          xGap={10}
          x={[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (maxX * i) / 8).map((v) => ({ at: v / maxX, label: trimNum(v) }))}
          labelClass="text-[12px] leading-4 text-rk-muted"
          baseColor="#d6d8d7"
          overlay={
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (maxX * i) / 8).map((v) => (
                <div key={v} className="absolute top-0 bottom-0 border-l border-[#e7e8e8]" style={{ left: `${(v / maxX) * 100}%` }} />
              ))}
              {all.map((c) => (
                <span
                  key={c.domain}
                  title={`${c.domain}: ${c.keywords} keywords, ${c.traffic} traffic`}
                  className="absolute -translate-x-1/2 translate-y-1/2"
                  style={{ left: `${(c.keywords / maxX) * 100}%`, bottom: `${(c.traffic / maxY) * 100}%` }}
                >
                  <Cross color={c.color} />
                </span>
              ))}
            </>
          }
        />
        <div className="-mt-[16px] text-center text-[12px] leading-4 text-rk-muted">Organic Keywords</div>
      </div>
    </Widget>
  );
}

export function OrganicResearch({ live = null }: { live?: DomainLive | null }) {
  return (
    <>
      <h2 className="mt-[22px] text-[20px] leading-7 font-semibold">Organic Research</h2>
      <div className="mt-[15px] grid grid-cols-2 gap-4">
        <TopKeywords live={live} />
        <KeyTopics name={live?.domain} />
        <KeywordsByIntent live={live} />
        <PositionDistribution live={live} />
        <Competitors live={live} />
        <PositioningMap live={live} />
      </div>
    </>
  );
}
