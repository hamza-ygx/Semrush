import type { ReactNode } from "react";
import { SortIcon } from "./icons";
import { ExtLink, Panel } from "./ui";

export type DomainCol = { label: ReactNode; w: number; sorted?: boolean; value?: ReactNode; bar?: boolean; fill?: number };

export function DomainTable({ title, count, cols, domain = "www.rkjh.se", className = "" }: { title: string; count?: string; cols: DomainCol[]; domain?: string; className?: string }) {
  return (
    <Panel title={title} count={count} headerClassName="h-[40px]" divider={false} className={className}>
      <div className="flex h-[41px] border-y border-[#edefef] bg-[#f7f8f9] text-[12px] leading-4 text-rk-text">
        <div className="flex flex-1 items-center pl-5">Domain</div>
        {cols.map((c, i) => (
          <div
            key={i}
            style={{ width: c.w }}
            className={`flex shrink-0 items-center justify-end gap-[6px] whitespace-nowrap ${i === cols.length - 1 ? "pr-[19.5px]" : "pr-[7.5px]"} ${c.sorted ? "bg-[#e9ebeb]" : ""}`}
          >
            {c.label}
            {c.sorted && <SortIcon width={14} height={14} className="text-rk-muted" />}
          </div>
        ))}
      </div>
      <div className="flex h-[44px] text-[14px] leading-5 text-rk-text-2">
        <div className="flex flex-1 items-center pl-5">
          <ExtLink href={`https://${domain}`}>{domain}</ExtLink>
        </div>
        {cols.map((c, i) => (
          <div key={i} style={{ width: c.w }} className={`flex shrink-0 items-center justify-end gap-[16px] ${i === cols.length - 1 ? "pr-[19.5px]" : "pr-[7.5px]"}`}>
            {c.value ?? "0"}
            {c.bar && (
              <span className="h-[7px] w-[80px] shrink-0 overflow-hidden rounded-full bg-[#e0e2e1]">
                {!!c.fill && <span className="block h-full rounded-full bg-[#5c5fd6]" style={{ width: `${c.fill}%` }} />}
              </span>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}
