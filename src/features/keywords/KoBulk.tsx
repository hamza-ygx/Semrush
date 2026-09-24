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
        <div className="mt-[18px] w-[600px]">
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
          <div className="mt-2 flex h-[137px] rounded-md border-2 border-[#7f86ee] bg-white ring-2 ring-[#e3e5fc]">
            <div className="w-[28px] shrink-0 pt-[7px] pr-[5px] text-right text-[14px] leading-5 text-rk-faint">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}.</div>
              ))}
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 resize-none bg-transparent pt-[7px] pr-3 pl-[11px] text-[14px] leading-5 outline-none"
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
              className="h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]"
            >
              Analyze
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
