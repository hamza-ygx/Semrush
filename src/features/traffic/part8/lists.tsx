import { routes } from "@/config/routes";

export type SavedList = { id: string; name: string; domains: string[]; shown: number; href: string };

export const rkjhList: SavedList = {
  id: "1304085",
  name: "Untitled list",
  domains: ["rkjh.se"],
  shown: 1,
  href: `${routes.traffic.overview}?q=rkjh.se&searchType=domain&lid=1304085`,
};

export const peersList: SavedList = {
  id: "1298817",
  name: "Untitled list",
  domains: ["bdo.se", "ludvig.se", "aspia.se", "grantthornton.se", "kpmg.se"],
  shown: 3,
  href: `${routes.traffic.overview}?q=rkjh.se&searchType=domain&lid=1304085`,
};

export const listsFor = (withRkjh: boolean) => (withRkjh ? [rkjhList, peersList] : [peersList]);

export const competitorColors = ["#6168ea", "#27e8b3", "#c28bfd", "#ffa726", "#ff6f71"];

export function Favicon({ domain, size = 29 }: { domain: string; size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-[6px] border border-[#e6e7ea] bg-white" style={{ width: size, height: size }}>
      {domain === "rkjh.se" && (
        <span className="flex h-[14px] w-[16px] flex-col overflow-hidden rounded-[3px]">
          <span className="h-1/2 bg-[#ee2233]" />
          <span className="h-1/2 bg-[#111]" />
        </span>
      )}
      {domain === "bdo.se" && <span className="text-[6.5px] font-bold tracking-[-0.2px] text-[#7a4dd8]">BDO</span>}
      {domain === "ludvig.se" && (
        <span className="flex h-[16px] w-[16px] flex-col items-center justify-center rounded-[3px] bg-[#1d2536] text-[5.5px] leading-[6px] font-bold text-white">
          <span>LE</span>
          <span>CO</span>
        </span>
      )}
      {domain === "aspia.se" && (
        <svg viewBox="0 0 16 16" width={15} height={15}>
          <path d="M9 1.5 3 6.5v5l6 3 4-2.5V6Z" fill="#8a4fe0" />
          <path d="M9 1.5 13 6v6.5l-4 2.5Z" fill="#ff4d6d" />
          <path d="M6.5 6.5h3v4h-3Z" fill="#fff" />
        </svg>
      )}
      {!["rkjh.se", "bdo.se", "ludvig.se", "aspia.se"].includes(domain) && <span className="text-[11px] font-bold text-rk-muted uppercase">{domain[0]}</span>}
    </span>
  );
}

export function ListDomains({ list, gap = 9, text = "text-[15px] text-rk-text-2" }: { list: SavedList; gap?: number; text?: string }) {
  const extra = list.domains.length - list.shown;
  return (
    <div className="flex items-center">
      {list.domains.slice(0, list.shown).map((d) => (
        <span key={d} className={`flex items-center gap-[8px] leading-5 ${text}`} style={{ marginRight: gap }}>
          <Favicon domain={d} />
          {d}
        </span>
      ))}
      {extra > 0 && <span className="-ml-[1px] text-[14px] text-rk-muted">+ {extra} more</span>}
    </div>
  );
}
