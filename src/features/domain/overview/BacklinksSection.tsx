import Link from "next/link";
import { routes } from "@/config/routes";
import { anchors, backlinkRows, backlinkTypes, followSplit, indexedPages, refDomains } from "../data";
import { DarkButton, Dot, ExportButton, ExtLink, Flag, SortIcon, Widget, WorldIcon } from "../ui";

const th = "h-[33px] border-b border-rk-border text-[12px] font-normal text-rk-text-2";
const link = "text-rk-link hover:text-rk-link-hover";

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-muted">
    <path d="M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3" fill="none" stroke="currentColor" strokeWidth={1.4} />
  </svg>
);

function BacklinksTable() {
  return (
    <Widget title="Backlinks" right={<ExportButton className="-mr-[2px]" />} className="h-[479px]" bodyClassName="flex flex-col pt-[25px]">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className={th}>
            <th className="w-[284px] pl-5 text-left font-normal">Referring Page Title / Referring Page URL</th>
            <th className="text-left font-normal">Anchor Text / Link URL</th>
            <th className="w-[86px] text-left font-normal">Type</th>
          </tr>
        </thead>
        <tbody>
          {backlinkRows.map((r) => (
            <tr key={r.url} className="h-[61px] border-b border-rk-border">
              <td className="pr-4 pl-5">
                <div className="truncate">{r.title}</div>
                <a href={r.url} target="_blank" rel="noreferrer" className={`mt-[3px] block truncate ${link}`}>
                  {r.url}
                </a>
              </td>
              <td className="pr-4">
                <div className="truncate">{r.anchor}</div>
                <a href={r.target} target="_blank" rel="noreferrer" className={`mt-[3px] block truncate ${link}`}>
                  {r.target}
                </a>
              </td>
              <td>
                <span className="inline-flex h-[21px] items-center rounded-full bg-[#eceef1] px-[9px] text-[13px] text-rk-muted">{r.type}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[21px] px-5">
        <DarkButton href={routes.backlinks}>View details</DarkButton>
      </div>
    </Widget>
  );
}

function FollowCard() {
  const total = followSplit.follow + followSplit.nofollow;
  const r = 41;
  const c = 2 * Math.PI * r;
  return (
    <Widget title="Follow vs Nofollow" className="h-[175px]" bodyClassName="flex items-start px-5 pt-[23px]">
      <svg viewBox="0 0 90 90" width={90} height={90} className="-rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#e3d5fb" strokeWidth={8} />
        <circle cx="45" cy="45" r={r} fill="none" stroke="#a55ff2" strokeWidth={8} strokeDasharray={`${(followSplit.follow / total) * c} ${c}`} />
      </svg>
      <div className="ml-6 flex-1 pt-[1px]">
        <div className="flex h-7 items-center text-[14px]">
          <Dot color="#a55ff2" />
          <span className="ml-[6px] flex-1">Follow links</span>
          <Link href={routes.backlinks} className={link}>
            {followSplit.follow}
          </Link>
        </div>
        <div className="flex h-7 items-center text-[14px]">
          <Dot color="#e3d5fb" />
          <span className="ml-[6px] flex-1">Nofollow links</span>
          <Link href={routes.backlinks} className={link}>
            {followSplit.nofollow}
          </Link>
        </div>
        <DarkButton href={routes.backlinks} className="mt-[10px]">
          View details
        </DarkButton>
      </div>
    </Widget>
  );
}

function TypesCard() {
  return (
    <Widget title="Backlink Types" className="h-[287px]" bodyClassName="px-5 pt-[20px]">
      {backlinkTypes.map((t) => (
        <div key={t.label} className="flex h-[41.8px] items-center text-[14px] leading-5">
          <span className="w-[72px]">{t.label}</span>
          <span className="h-[15px] w-[166px] bg-[#e7d8fc]">
            <span className="block h-full bg-[#a55ff2]" style={{ width: `${t.pct}%` }} />
          </span>
          <span className="w-[57px] text-right text-rk-muted">{t.pct}%</span>
          <Link href={routes.backlinks} className={`flex-1 text-right ${link}`}>
            {t.count}
          </Link>
        </div>
      ))}
      <DarkButton href={routes.backlinks} className="mt-[14px]">
        View full report
      </DarkButton>
    </Widget>
  );
}

function AnchorsCard() {
  return (
    <Widget title="Top Anchors" right={<ExportButton />} className="h-[350px]" bodyClassName="flex flex-col pt-[18px]">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className={th}>
            <th className="pl-5 text-left font-normal">Anchor</th>
            <th className="w-[92px] text-right font-normal">Domains</th>
            <th className="w-[156px] pr-[8px] text-right font-normal">
              <span className="inline-flex items-center">
                Backlir
                <SortIcon className="-ml-[3px] text-rk-muted" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {anchors.map((a) => (
            <tr key={a.anchor} className="h-[37px] border-b border-rk-border">
              <td className={`pl-5 ${a.empty ? "text-rk-text-2 italic" : ""}`}>
                <span className="block max-w-[232px] truncate">{a.anchor}</span>
              </td>
              <td className="text-right">{a.domains}</td>
              <td className="pr-5 text-right">{a.backlinks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[23px] px-5">
        <DarkButton href={routes.backlinks}>View details</DarkButton>
      </div>
    </Widget>
  );
}

function RefDomainsCard() {
  return (
    <Widget title="Referring Domains" right={<ExportButton />} className="h-[350px]" bodyClassName="flex flex-col pt-[18px]">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className={th}>
            <th className="w-[223px] pl-5 text-left font-normal">Root Domain</th>
            <th className="text-left font-normal">Country/IP</th>
            <th className="w-[90px] pr-5 text-right font-normal">Backlinks</th>
          </tr>
        </thead>
        <tbody>
          {refDomains.map((d) => (
            <tr key={d.domain} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-1">
                  <Link href={routes.referringDomains} className={link}>
                    {d.domain}
                  </Link>
                  <ExtLink href={`https://${d.domain}`} />
                </span>
              </td>
              <td>
                <span className="flex items-center gap-[6px]">
                  <Flag code={d.flag} />
                  {d.ip}
                </span>
              </td>
              <td className="pr-5 text-right">{d.backlinks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[23px] px-5">
        <DarkButton href={routes.referringDomains}>View details</DarkButton>
      </div>
    </Widget>
  );
}

function IndexedPagesCard() {
  return (
    <Widget title="Indexed Pages" right={<ExportButton />} className="mt-4 h-[469px]" bodyClassName="flex flex-col pt-[18px]">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className={th}>
            <th className="pl-5 text-left font-normal">Title &amp; URL</th>
            <th className="w-[80px] text-right font-normal">
              <span className="inline-flex items-center">
                Doma
                <SortIcon className="-ml-[3px] text-rk-muted" />
              </span>
            </th>
            <th className="w-[155px] pr-5 text-right font-normal">Backlinks</th>
          </tr>
        </thead>
        <tbody>
          {indexedPages.map((p) => (
            <tr key={p.url} className="h-[61px] border-b border-rk-border align-top">
              <td className="pt-[8px] pl-5">
                <div className="truncate">{p.title}</div>
                <a href={p.url} target="_blank" rel="noreferrer" className={`mt-[4px] block truncate ${link}`}>
                  {p.url}
                </a>
              </td>
              <td className="pt-[8px] text-right">
                <Link href={routes.referringDomains} className={link}>
                  {p.domains}
                </Link>
              </td>
              <td className="pt-[8px] pr-5 text-right">
                <Link href={routes.backlinks} className={link}>
                  {p.backlinks}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[23px] px-5">
        <DarkButton href={routes.backlinks}>View details</DarkButton>
      </div>
    </Widget>
  );
}

export function BacklinksSection() {
  return (
    <>
      <div className="mt-[22px] flex items-center gap-[10px]">
        <h2 className="text-[20px] leading-7 font-semibold">Backlinks</h2>
        <span className="flex items-center gap-1 text-[13px] text-rk-text-2">
          <WorldIcon className="text-[#a9abb6]" />
          Worldwide
        </span>
        <span className="flex items-center gap-1 text-[14px] text-rk-text-2">
          <CalendarIcon />
          All time
        </span>
      </div>
      <div className="mt-[15px] grid grid-cols-[minmax(0,1fr)_399px] gap-4">
        <BacklinksTable />
        <div className="flex flex-col gap-4">
          <FollowCard />
          <TypesCard />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <AnchorsCard />
        <RefDomainsCard />
      </div>
      <IndexedPagesCard />
    </>
  );
}
