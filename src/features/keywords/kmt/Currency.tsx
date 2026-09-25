"use client";

import { Drop } from "./ui";
import { currencies, type Currency } from "./data";

export function CurrencySelect({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <span className="flex items-center gap-1">
      Currency:
      <Drop
        panelStyle={{ top: "calc(100% + 7px)", left: 0, width: 79 }}
        panelClassName="py-1"
        trigger={({ toggle }) => (
          <button type="button" data-currency onClick={toggle} className="group flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
            <span className="group-hover:underline">{value}</span>
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      >
        {(close) =>
          currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onChange(c.code);
                close();
              }}
              className={`flex h-8 w-full items-center px-[9px] text-left text-[14px] text-rk-text ${c.code === value ? "bg-[#eef1fb] shadow-[inset_2px_0_0_#191b23]" : "hover:bg-rk-bg"}`}
            >
              {c.label}
            </button>
          ))
        }
      </Drop>
    </span>
  );
}
