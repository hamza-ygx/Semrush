"use client";

import { useEffect, useState } from "react";
import { questions } from "./data";

export function DarkScrollbar() {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.colorScheme;
    root.style.colorScheme = "dark";
    return () => {
      root.style.colorScheme = prev;
    };
  }, []);
  return null;
}

export function PeopleAlsoAsk() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <h2 className="text-[20px] leading-[26px]">Andra frågar också</h2>
      <div className="mt-[14px]">
        {questions.map((q, i) => (
          <div key={q} className="border-b border-[#dadce0]">
            <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex h-[48px] w-full items-center justify-between text-left text-[16px] text-[#202124]">
              {q}
              <svg viewBox="0 0 24 24" width={24} height={24} className={`text-[#5f6368] ${open === i ? "rotate-180" : ""}`}>
                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="currentColor" />
              </svg>
            </button>
            {open === i && (
              <div className="pb-4 text-[14px] leading-[22px] text-[#4d5156]">
                Priset varierar beroende på företagets storlek och antal verifikationer. Många byråer i Halmstad erbjuder fasta månadspriser för löpande bokföring, moms och bokslut.
              </div>
            )}
          </div>
        ))}
        <div className="mt-[10px] text-right text-[12px] text-[#70757a]">Feedback</div>
      </div>
    </div>
  );
}
