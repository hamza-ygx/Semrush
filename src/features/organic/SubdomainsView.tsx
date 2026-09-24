import Link from "next/link";
import { routes } from "@/config/routes";
import { ExportIcon } from "@/components/ui/icons";
import { ExtLink, SortIcon } from "./ui";

export function SubdomainsView() {
  return (
    <div className="px-8 pt-4">
      <div className="rounded-lg bg-white shadow-card">
        <div className="flex h-[41px] items-center justify-between px-5">
          <h2 className="text-[16px] leading-6 font-semibold text-rk-text">
            Organic Subdomains <span className="font-normal text-rk-muted">1</span>
          </h2>
          <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
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
            <tr className="h-11 border-b border-rk-border">
              <td className="pl-5">
                <span className="inline-flex items-center gap-1">
                  <Link href={`${routes.organic.positions}?db=se&q=rkjh.se&searchType=domain`} className="text-rk-link hover:text-rk-link-hover">
                    rkjh.se
                  </Link>
                  <ExtLink href="rkjh.se" />
                </span>
              </td>
              <td className="pr-2 text-right">59</td>
              <td className="pr-4 text-right">100.00</td>
              <td className="pr-5 text-right">
                <Link href={`${routes.organic.positions}?db=se&q=rkjh.se&searchType=domain`} className="text-rk-link hover:text-rk-link-hover">
                  134
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="h-5" />
      </div>
    </div>
  );
}
