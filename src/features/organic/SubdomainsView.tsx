"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { ExportIcon } from "@/components/ui/icons";
import { ExtLink, SortIcon } from "./ui";
import { useOrganicLive, useOrganicQ } from "./context";

export function SubdomainsView() {
  const live = useOrganicLive();
  const q = useOrganicQ();
  const subs = live ? live.subdomains : [{ host: "rkjh.se", traffic: 59, pct: "100.00", keywords: 134 }];
  return (
    <div className="px-8 pt-4">
      <div className="rounded-lg bg-white shadow-card">
        <div className="flex h-[41px] items-center justify-between px-5">
          <h2 className="text-[16px] leading-6 font-semibold text-rk-text">
            Organic Subdomains <span className="font-normal text-rk-muted">{subs.length}</span>
          </h2>
          <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon />
            Export
          </button>
        </div>
        <table className="w-full text-[14px]">
          <thead>
            <tr className="h-[41px] border-y border-rk-border bg-[#f7f7f9] text-left text-[12px] text-rk-text">
              <th className="pl-5 font-normal">Subdomain</th>
              <th className="w-[140px] bg-[#ececf0] pr-4 text-right font-normal">
                <span className="inline-flex items-center gap-1">
                  Traffic <SortIcon className="text-rk-text-2" />
                </span>
              </th>
              <th className="w-[148px] pr-4 text-right font-normal">Traffic %</th>
              <th className="w-[132px] pr-5 text-right font-normal">Keywords</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.host} className="h-11 border-b border-rk-border">
                <td className="pl-5">
                  <span className="inline-flex items-center gap-1">
                    <Link href={`${routes.organic.positions}${q}`} className="text-rk-link hover:text-rk-link-hover">
                      {s.host}
                    </Link>
                    <ExtLink href={s.host} />
                  </span>
                </td>
                <td className="pr-2 text-right">{s.traffic}</td>
                <td className="pr-4 text-right">{s.pct}</td>
                <td className="pr-5 text-right">
                  <Link href={`${routes.organic.positions}${q}`} className="text-rk-link hover:text-rk-link-hover">
                    {s.keywords}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-5" />
      </div>
    </div>
  );
}
