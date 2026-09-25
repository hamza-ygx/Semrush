"use client";

import { useState } from "react";
import { mindMapHeadlines, mindMapQuestions, mindMapTopics } from "./data";

const CX = 382;
const CY = 402;
const R0 = 182;
const LX = 385;
const LY = 403;
const STEP = 360 / mindMapTopics.length;

const toneColor: Record<string, string> = { green: "#00b882", blue: "#2a6ed8", light: "#58b8f0" };

export function MindMap() {
  const [sel, setSel] = useState(7);
  const angleOf = (i: number) => 90 + (8 - i) * STEP;
  return (
    <div className="mx-[31px] mt-4 flex h-[820px] rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.15)]">
      <svg width={760} height={820} className="shrink-0">
        {mindMapTopics.map((t, i) => {
          const a = angleOf(i);
          const rad = (a * Math.PI) / 180;
          const left = Math.cos(rad) < -0.01;
          const x = LX + R0 * Math.cos(rad);
          const y = LY - R0 * Math.sin(rad);
          const rot = left ? 180 - a : -a;
          return (
            <text
              key={t}
              x={x}
              y={y}
              transform={`rotate(${rot} ${x} ${y})`}
              textAnchor={left ? "end" : "start"}
              dominantBaseline="middle"
              fontSize={14}
              fill="#006dca"
              className="cursor-pointer hover:underline"
              onClick={() => setSel(i)}
            >
              {t}
            </text>
          );
        })}
        {mindMapTopics.map((t, i) => {
          const rad = (angleOf(i) * Math.PI) / 180;
          const c = Math.cos(rad);
          const s = Math.sin(rad);
          const on = i === sel;
          const r1 = on ? 82 : 78;
          return (
            <g key={t} className="cursor-pointer" onClick={() => setSel(i)}>
              <line x1={CX + 64 * c} y1={CY - 64 * s} x2={CX + (r1 - 3) * c} y2={CY - (r1 - 3) * s} stroke="#006dca" strokeWidth={1.5} />
              <circle cx={CX + r1 * c} cy={CY - r1 * s} r={on ? 8 : 4.5} fill="#006dca" />
              {on && <path d={`M${CX + r1 * c - 4} ${CY - r1 * s}h8`} stroke="#fff" strokeWidth={1.6} />}
            </g>
          );
        })}
        <text x={CX} y={CY + 2} textAnchor="middle" dominantBaseline="middle" fontSize={24} fill="#1b1e1a">
          accounting
        </text>
      </svg>
      <div className="min-w-0 flex-1 pt-[34px] pr-[6px] pl-[6px]">
        <div className="text-[16px] leading-5 font-bold">Headlines</div>
        <div className="mt-[9px]">
          {mindMapHeadlines.map((h) => (
            <a key={h.text} href={`https://www.google.com/search?q=${encodeURIComponent(h.text)}`} target="_blank" rel="noreferrer" className="flex gap-[6px] border-b border-[#d7dbe0] py-[5px] text-[14px] leading-[19px] last:border-0 hover:text-[#006dca]">
              <svg viewBox="0 0 16 16" width={14} height={14} className="mt-[2px] shrink-0">
                <path d="M2 5.5h3.5L12 2v12L5.5 10.5H2z" fill={toneColor[h.tone]} />
                <path d="M4 10.5 5 14h2l-.8-3.5" fill={toneColor[h.tone]} />
              </svg>
              {h.text}
            </a>
          ))}
        </div>
        <div className="mt-[31px] text-[16px] leading-5 font-bold">Questions</div>
        <div className="mt-[10px]">
          {mindMapQuestions.map((q) => (
            <div key={q} className="border-b border-[#d7dbe0] py-[7px] text-[13px] leading-[19px] last:border-0">
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
