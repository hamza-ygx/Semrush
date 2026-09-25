"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { ExportIcon } from "@/components/ui/icons";
import { allPages } from "./data";
import { ExtLink, Pagination, SearchInput, SortIcon } from "./ui";

const Q = "?db=se&q=rkjh.se&searchType=domain";

export function PagesView() {
  const [filter, setFilter] = useState("");
  const rows = allPages.filter((p) => p.url.includes(filter));
  return (
    <div className="px-8 pt-4">
      <div className="mb-4">
        <SearchInput placeholder="Filter by URL" width="w-[240px]" onChange={setFilter} />
      </div>
      <div className="rounded-lg bg-white shadow-card">
        <div className="flex h-[43px] items-center justify-between px-5">
          <h2 className="text-[16px] leading-6 font-semibold">
            Organic Pages <span className="font-normal text-rk-muted">45</span>
          </h2>
          <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon />
            Export
          </button>
        </div>
        <table className="w-full table-fixed text-[14px]">
          <colgroup>
            <col />
            <col className="w-[140px]" />
            <col className="w-[132px]" />
            <col className="w-[140px]" />
          </colgroup>
          <thead>
            <tr className="h-[41px] border-y border-rk-border bg-[#f8f8fa] text-left text-[13px]">
              <th className="pl-5 font-normal">URL</th>
              <th className="bg-[#ececf0] pr-4 text-right font-normal">
                <span className="inline-flex items-center gap-1">
                  Traffic <SortIcon className="text-rk-text-2" />
                </span>
              </th>
              <th className="pr-4 text-right font-normal">Traffic %</th>
              <th className="pr-5 text-right font-normal">Keywords</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.url} className="h-11 border-b border-rk-border hover:bg-[#fafafb]">
                <td className="pl-5">
                  <span className="flex items-center gap-1">
                    <Link href={`${routes.organic.positions}${Q}&url=${encodeURIComponent(p.url)}`} className="truncate text-rk-link hover:text-rk-link-hover">
                      {p.url}
                    </Link>
                    <ExtLink href={p.url} />
                  </span>
                </td>
                <td className="pr-4 text-right">{p.traffic}</td>
                <td className="pr-4 text-right">{p.pct}</td>
                <td className="pr-5 text-right">
                  <Link href={`${routes.organic.positions}${Q}&url=${encodeURIComponent(p.url)}`} className="text-rk-link hover:text-rk-link-hover">
                    {p.keywords}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 pt-5 pb-5">
          <Pagination pages={3} />
        </div>
      </div>
    </div>
  );
}
