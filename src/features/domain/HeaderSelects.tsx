"use client";

import { useState } from "react";
import { DesktopIcon, MobileIcon } from "@/components/ui/icons";
import { HeaderOption, HeaderSelect } from "./ui";

const deviceIcon = { Desktop: <DesktopIcon />, Mobile: <MobileIcon /> };

export function DeviceSelect() {
  const [v, setV] = useState<"Desktop" | "Mobile">("Desktop");
  return (
    <HeaderSelect id="device" label={v} icon={deviceIcon[v]} width={93}>
      {(close) =>
        (["Desktop", "Mobile"] as const).map((d) => (
          <HeaderOption
            key={d}
            active={d === v}
            onClick={() => {
              setV(d);
              close();
            }}
          >
            {deviceIcon[d]}
            {d}
          </HeaderOption>
        ))
      }
    </HeaderSelect>
  );
}

const latest = "Sep 23, 2026";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const history = Array.from({ length: 36 }, (_, i) => {
  const m = 7 - i;
  const y = 2026 + Math.floor(m / 12);
  return `${MONTHS[((m % 12) + 12) % 12]} ${y}`;
});

export function DateSelect({ current = latest, history: months = history }: { current?: string; history?: string[] }) {
  const [v, setV] = useState(current);
  return (
    <HeaderSelect id="date" label={v === current ? current : v} width={228}>
      {(close) => (
        <div className="-my-1">
          <HeaderOption
            active={v === current}
            onClick={() => {
              setV(current);
              close();
            }}
            className="h-[49px] flex-col !items-start justify-center !gap-0 rounded-t-md"
          >
            <span>{current}</span>
            <span className="text-[12px] leading-4 text-rk-muted">Actual state of Google Search engine</span>
          </HeaderOption>
          <div className="flex h-8 items-center border-b border-rk-border px-2 text-[14px] font-semibold">Historical data:</div>
          <div className="max-h-[240px] overflow-y-auto pt-[4px] pb-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d8d7]">
            {months.map((h) => (
              <HeaderOption
                key={h}
                active={h === v}
                onClick={() => {
                  setV(h);
                  close();
                }}
              >
                {h}
              </HeaderOption>
            ))}
          </div>
        </div>
      )}
    </HeaderSelect>
  );
}

const currencies = [
  { value: "USD", label: "USD, $" },
  { value: "SEK", label: "SEK" },
];

export function CurrencySelect() {
  const [v, setV] = useState("USD");
  return (
    <HeaderSelect id="currency" label={v} width={78}>
      {(close) =>
        currencies.map((c) => (
          <HeaderOption
            key={c.value}
            active={c.value === v}
            onClick={() => {
              setV(c.value);
              close();
            }}
          >
            {c.label}
          </HeaderOption>
        ))
      }
    </HeaderSelect>
  );
}
