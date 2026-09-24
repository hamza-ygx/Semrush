"use client";

import Link from "next/link";
import { routes } from "@/config/routes";
import { DesktopIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/primitives";
import { periods, ptWidget } from "./data";
import { CloseX, Label, LinkDropdown, WidgetCard, WTitle } from "./ui";

function Ring() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="none" stroke="#c4c7cf" strokeWidth="3" />
    </svg>
  );
}

function Bucket({ label }: { label: string }) {
  return (
    <div>
      <div className="text-[13px] leading-4">{label}</div>
      <Link href={routes.tracking.rankingsDistribution} className="mt-[6px] flex h-7 items-center gap-[9px]">
        <Ring />
        <span className="text-[20px] leading-7 font-semibold text-rk-number">0</span>
      </Link>
      <div className="mt-[4px] grid grid-cols-[35px_1fr] text-[13px] leading-5">
        <span>new</span>
        <span className="text-rk-muted">0</span>
        <span>lost</span>
        <span className="text-rk-muted">0</span>
      </div>
      <div className="mt-[26px] h-px w-full bg-[#c9c7f5]" />
    </div>
  );
}

export function PositionTrackingWidget({ onClose }: { onClose: () => void }) {
  return (
    <WidgetCard className="h-[458px]">
      <div className="h-[71px] border-b border-rk-border px-5 pt-2">
        <div className="flex items-center justify-between">
          <WTitle href={routes.tracking.overview}>Position Tracking</WTitle>
          <div className="flex items-center text-[14px] leading-5 text-rk-muted">
            <span>{ptWidget.updated}</span>
            <span className="mx-2 h-4 w-px bg-rk-border" />
            <span>{ptWidget.range}</span>
            <span className="ml-3">
              <LinkDropdown id="pt-period" value="last 7 days" options={periods} panelClassName="w-[98px]" panelTop={3} />
            </span>
            <CloseX onClick={onClose} className="ml-[18px]" />
          </div>
        </div>
        <div className="mt-2">
          <LinkDropdown
            id="pt-location"
            value={ptWidget.location}
            options={[ptWidget.location]}
            render={(v) => (
              <>
                <DesktopIcon />
                {v}
              </>
            )}
            renderOption={(v) => (
              <>
                <DesktopIcon className="text-rk-text-2" />
                {v}
              </>
            )}
            panelClassName="w-[229px]"
            panelTop={11}
          />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-x-10 px-5 pt-[19px]">
        <div className="flex flex-col">
          <Label>Visibility</Label>
          <Link href={routes.tracking.overview} className="mt-[3px] text-[22px] leading-7 font-semibold text-rk-number hover:opacity-80">
            {ptWidget.visibility}
          </Link>
          <Link href={routes.tracking.overview} className="mt-auto mb-[1px] ml-[1px] block h-[3px] w-[336px] max-w-full rounded-full bg-[#6167e6]" aria-label="Visibility trend" />
          <div className="mt-[20px] mb-[21px]">
            <Button href={routes.tracking.overview} variant="tertiary" className="h-[27px] px-2 text-[14px]">
              View full report
            </Button>
          </div>
        </div>
        <div>
          <Label>Keywords</Label>
          <div className="mt-[15px] grid grid-cols-2 gap-x-5 gap-y-[20px]">
            {ptWidget.buckets.map((b) => (
              <Bucket key={b} label={b} />
            ))}
          </div>
        </div>
        <div>
          <Label>Top Keywords</Label>
          <table className="mt-[7px] w-full table-fixed text-[14px] leading-5">
            <thead>
              <tr className="border-b border-rk-border text-[13px] text-rk-text">
                <th className="h-[34px] pl-2 text-left font-normal">Keywords</th>
                <th className="w-[54px] text-center font-normal">Position</th>
                <th className="w-[80px] pr-2 text-right font-normal">Visibility</th>
              </tr>
            </thead>
            <tbody>
              {ptWidget.keywords.map((k) => (
                <tr key={k} className="h-[37px] border-b border-rk-border">
                  <td className="pr-[15px] pl-2">
                    <Link href={routes.keywordOverview} title={k} className="block truncate text-rk-link hover:text-rk-link-hover">
                      {k}
                    </Link>
                  </td>
                  <td className="text-center">–</td>
                  <td className="pr-2 text-right">0%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WidgetCard>
  );
}
