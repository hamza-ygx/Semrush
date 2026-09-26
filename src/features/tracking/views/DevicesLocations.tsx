import type { Snap } from "../context";
import type { ReactNode } from "react";
import { PlusIcon } from "@/components/ui/icons";
import { TrackingPage } from "../TrackingPage";

function CardFrame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 169 119" width={169} height={119} className="block">
      <rect x="0.5" y="0.5" width="168" height="118" rx="3" fill="#f3f5f5" stroke="#e1e4e4" />
      <path d="M1 4a3 3 0 0 1 3-3h161a3 3 0 0 1 3 3v7H1z" fill="#dde3e3" />
      {[151, 156.5, 162].map((cx) => (
        <circle key={cx} cx={cx} cy="5.6" r="1.3" fill="#fff" />
      ))}
      {children}
    </svg>
  );
}

function MultiLineCard() {
  return (
    <CardFrame>
      <rect x="5.6" y="22" width="49" height="4.5" rx="2" fill="#eceeee" />
      <rect x="59" y="22" width="47" height="4.5" rx="2" fill="#eceeee" />
      <rect x="112" y="22" width="48" height="4.5" rx="2" fill="#eceeee" />
      <path d="M7 60h120M7 82h120M7 103h120" stroke="#eceeee" />
      <path d="M7.8 53 25 48.7 44 72.6 64 67.4 78 82.6 96 63 107.4 77.8 120 72.6" fill="none" stroke="#fdc93f" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.8 95 24.3 58.7 44 97 63 83.5 75.7 97 94.8 85.6 104 91.7 120 91.7" fill="none" stroke="#5bb1ec" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.8 90 24 72.6 44 86 64 56 78 70.4 94.8 47.4 107 53.5 120 47" fill="none" stroke="#45a646" strokeWidth="1.6" strokeLinejoin="round" />
      {[
        [51, "#45a646"],
        [72.6, "#fdc93f"],
        [95, "#5bb1ec"],
      ].map(([cy, c]) => (
        <g key={c}>
          <circle cx="134.8" cy={cy} r="1.8" fill={c as string} />
          <rect x="138" y={(cy as number) - 8} width="22" height="3" rx="1.5" fill="#eceeee" />
          <rect x="138" y={(cy as number) - 1.5} width="14" height="3" rx="1.5" fill="#eceeee" />
        </g>
      ))}
    </CardFrame>
  );
}

function MultiPositionsCard() {
  return (
    <CardFrame>
      <text x="9.6" y="29" fontSize="13" fontWeight="600" fill="#3d3f3f">
        Positions
      </text>
      <rect x="8.3" y="42" width="152" height="7.5" rx="3" fill="#eceeee" />
      {[
        [59.6, 58.7, 71, 137, true],
        [81.7, 70.4, 84, 130, true],
        [103.5, 58.7, 71, 137, false],
      ].map(([y, ax, bx, rx, up], i) => (
        <g key={i}>
          <rect x="18" y={(y as number) - 2.2} width="15.5" height="4.4" rx="2" fill="#eceeee" />
          <rect x={bx as number} y={(y as number) - 2.2} width={109 - (bx as number)} height="4.4" rx="2" fill="#eceeee" />
          <rect x={rx as number} y={(y as number) - 2.2} width={155 - (rx as number)} height="4.4" rx="2" fill="#eceeee" />
          {up ? (
            <path d={`M${ax} ${(y as number) + 4}v-8m-3.2 3.2 3.2-3.2 3.2 3.2`} fill="none" stroke="#45a646" strokeWidth="1.3" />
          ) : (
            <path d={`M${ax} ${(y as number) - 4}v8m-3.2-3.2 3.2 3.2 3.2-3.2`} fill="none" stroke="#e5231b" strokeWidth="1.3" />
          )}
          {i < 2 && <path d={`M8.3 ${(y as number) + 11.4}h152`} stroke="#e8eaea" />}
        </g>
      ))}
    </CardFrame>
  );
}

export function DevicesLocationsView(snap: Snap) {
  return (
    <TrackingPage tab="devicesLocations" {...snap}>
      <div className="flex flex-col items-center px-8 pt-[26px] pb-[14px] text-center">
        <h2 className="text-[24px] leading-8 font-medium text-rk-text">Try the Multitargeting feature in the Position Tracking tool</h2>
        <p className="mt-[14px] text-[16px] leading-6 text-rk-text">Track your domain rankings in multiple locations and languages, and on multiple devices.</p>
        <div className="mt-[40px] mr-[20px] flex gap-[55px]">
          <div className="flex w-[240px] flex-col items-center">
            <MultiLineCard />
            <p className="mt-[16px] text-[16px] leading-6 text-rk-text">Track the dynamics of the most essential metrics</p>
          </div>
          <div className="flex w-[200px] flex-col items-center">
            <MultiPositionsCard />
            <p className="mt-[16px] text-[16px] leading-6 text-rk-text">Compare your positions</p>
          </div>
        </div>
        <button type="button" className="mt-[39px] flex h-10 items-center gap-2 rounded-md bg-rk-btn-dark px-4 text-[16px] font-medium text-white hover:bg-[#2b2e38]">
          <PlusIcon width={18} height={18} />
          Add new target
        </button>
      </div>
    </TrackingPage>
  );
}
