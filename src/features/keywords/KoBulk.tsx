"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { CloseIcon } from "@/components/ui/icons";
import { DomainInput, KoHeader } from "./KoReport";

const examples = ["loans", "movies", "how to buy audible books"];

export function KoBulk({ q }: { q: string }) {
  const router = useRouter();
  const [text, setText] = useState(q);
  const lines = text.split("\n");
  const count = lines.filter((l) => l.trim()).length;
  return (
    <>
      <KoHeader q={q} active="bulk" />
      <div className="px-8 pt-4">
        <DomainInput />
        <div className="mt-5 w-[600px] focus-within:mt-[18px]">
          <div className="flex h-5 items-center justify-between pr-[10px] text-[14px]">
            <span className="flex items-center gap-1">
              <span className="text-rk-text-2 underline decoration-dotted decoration-2 underline-offset-[5px]">Keywords</span>
              <span className="rounded-full border border-rk-border-strong px-[5px] text-[13px] leading-[18px] text-rk-text-2">{count}/100</span>
            </span>
            <button type="button" onClick={() => setText("")} className="flex items-center gap-2 text-rk-text-2 hover:text-rk-text">
              <CloseIcon width={14} height={14} />
              Clear all
            </button>
          </div>
          <div className="group mt-[7px] flex h-[134px] rounded-md focus-within:h-[138px] border border-[#dcdede] bg-white focus-within:border-2 focus-within:border-[#8d95ec] focus-within:ring-2 focus-within:ring-[#8d95ec]">
            <div className="w-[29px] shrink-0 pt-[6px] pr-[5px] group-focus-within:w-[28px] group-focus-within:pt-[7px] text-right text-[14px] leading-5 text-rk-faint">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}.</div>
              ))}
            </div>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 resize-none bg-transparent pt-[6px] pr-3 pl-[11px] text-[14px] leading-5 outline-none focus:pt-[7px]"
            />
          </div>
          <div className="mt-[10px] flex items-center justify-between text-[14px]">
            <span className="flex gap-5">
              <span className="text-rk-muted">Examples:</span>
              <span className="text-rk-link">
                {examples.map((ex, i) => (
                  <span key={ex}>
                    <button type="button" onClick={() => setText(ex)} className="hover:text-rk-link-hover">
                      {ex}
                    </button>
                    {i < examples.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </span>
            <button
              type="button"
              onClick={() => router.push(`${routes.keywordOverview}?q=${encodeURIComponent(lines.find((l) => l.trim()) ?? q)}&db=se`)}
              className="h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-medium text-white hover:bg-[#2b2e38]"
            >
              Analyze
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
