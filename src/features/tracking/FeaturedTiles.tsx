"use client";

import { useState } from "react";

const groups = [
  [
    { key: "Opportunities", w: 114.6, color: "text-[#8e92ec]", total: true },
    { key: "Already featured", w: 135.4, color: "text-[#59c79a]", total: true },
  ],
  [
    { key: "New", w: 54.7 },
    { key: "Lost", w: 53.8 },
    { key: "New on SERP", w: 115.6 },
    { key: "Lost from SERP", w: 128.3 },
    { key: "URL changed", w: 115.2 },
  ],
];

export function FeaturedTiles() {
  const [active, setActive] = useState("Opportunities");
  return (
    <div className="flex gap-[16.5px]">
      {groups.map((g, gi) => (
        <div key={gi} className="flex">
          {g.map((t, i) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                style={{ width: t.w }}
                className={`relative -ml-px flex h-[63.3px] flex-col items-start border px-[12px] pt-[8px] text-left first:ml-0 ${i === 0 ? "rounded-l-md" : ""} ${
                  i === g.length - 1 ? "rounded-r-md" : ""
                } ${on ? "z-10 border-[#8e9ff0] bg-[#f4f6fe]" : "border-rk-border-strong bg-white hover:bg-rk-bg"}`}
              >
                <span className="text-[14px] leading-5 whitespace-nowrap text-[#8b8d8c]">{t.key}</span>
                <span className="mt-[7px] text-[16px] leading-5 text-[#a9abaa]">
                  {"color" in t ? (
                    <>
                      <b className={`font-semibold ${t.color}`}>0</b>/0
                    </>
                  ) : (
                    "0"
                  )}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
