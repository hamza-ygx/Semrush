import type { ReactNode } from "react";
import { FlagUK, FlagUS } from "@/components/ui/icons";

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[229px] w-[299px] shrink-0 overflow-hidden rounded-md border border-[#d9dae0] bg-white">
      <div className="flex h-4 items-center justify-end gap-[3px] bg-[#e4e5ea] pr-[6px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[4px] w-[4px] rounded-full bg-white" />
        ))}
      </div>
      {children}
    </div>
  );
}

export function PeriodsIllustration() {
  return (
    <Frame>
      <div className="flex h-[36px] items-center gap-4 border-b border-[#e6e7ec] px-3 text-[10px] text-rk-muted">
        {[
          ["#b77af5", "Summer"],
          ["#7f84e8", "Autumn"],
          ["#ffc02e", "Growth"],
        ].map(([c, l]) => (
          <span key={l} className="flex items-center gap-[6px]">
            <span className="h-[9px] w-[9px] rounded-full" style={{ background: c }} />
            {l}
          </span>
        ))}
      </div>
      <div className="px-3 pt-[14px] text-[11px] text-rk-muted">Organic Traffic</div>
      <svg viewBox="0 0 275 70" width={275} height={70} className="ml-3">
        <path d="M0 45h275" stroke="#e6e7ec" />
        <path d="M0 36C30 36 50 40 70 42 110 46 125 56 140 55 170 50 190 38 220 37 240 36 260 36 275 36V70H0z" fill="#fff1cc" />
        <path d="M0 36C30 36 50 40 70 42 110 46 125 56 140 55 170 50 190 38 220 37 240 36 260 36 275 36" fill="none" stroke="#ffc02e" strokeWidth={2.5} />
        <path d="M0 22C40 22 60 22 90 28 120 34 130 36 160 36 200 36 240 20 275 20" fill="none" stroke="#b77af5" strokeWidth={2.5} />
        <path d="M0 16C50 16 80 16 110 26 140 36 170 40 200 43 230 46 250 46 275 46" fill="none" stroke="#7f84e8" strokeWidth={2.5} />
      </svg>
      <div className="px-3 pt-[6px] text-[11px] text-rk-muted">Organic Keywords</div>
      <svg viewBox="0 0 275 50" width={275} height={50} className="ml-3">
        <path d="M0 22h275" stroke="#e6e7ec" />
        <path d="M0 22C30 22 60 22 90 26 120 32 140 40 160 38 200 30 230 14 275 14V50H0z" fill="#fff1cc" />
        <path d="M0 22C30 22 60 22 90 26 120 32 140 40 160 38 200 30 230 14 275 14" fill="none" stroke="#ffc02e" strokeWidth={2.5} />
        {[
          [60, "#b77af5", 26],
          [66, "#7f84e8", 26],
          [153, "#b77af5", 20],
          [160, "#7f84e8", 36],
          [242, "#b77af5", 38],
          [249, "#7f84e8", 24],
        ].map(([x, c, h]) => (
          <rect key={`${x}`} x={x as number} y={50 - (h as number)} width={5} height={h as number} fill={c as string} />
        ))}
      </svg>
    </Frame>
  );
}

const Up = () => (
  <svg viewBox="0 0 12 16" width={11} height={14}>
    <path d="M6 14V2M1.5 6.5 6 2l4.5 4.5" fill="none" stroke="#2cd4a5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Down = () => (
  <svg viewBox="0 0 12 16" width={11} height={14}>
    <path d="M6 2v12M1.5 9.5 6 14l4.5-4.5" fill="none" stroke="#e8313d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Bar = ({ w }: { w: number }) => <span className="block h-[5px] rounded-full bg-[#e4e5ea]" style={{ width: w }} />;

export function CountriesIllustration() {
  return (
    <Frame>
      <div className="flex h-[36px] items-center gap-[18px] border-b border-[#e6e7ec] px-3 text-[10px] text-rk-muted">
        <span className="flex items-center gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#6167e6]" />
          <FlagUS width={14} height={10} />
          <Bar w={28} />
        </span>
        <span className="flex items-center gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#2cd4a5]" />
          <FlagUK width={14} height={10} />
          <Bar w={28} />
        </span>
        <span className="flex items-center gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#c4c7cf]" />
          Add country
        </span>
      </div>
      {[
        [<Up key="a" />, <Down key="b" />, <Up key="c" />],
        [<Down key="a" />, <Up key="b" />, <Down key="c" />],
      ].map((arrows, r) => (
        <div key={r} className="flex h-[31px] items-center gap-[10px] border-b border-[#e6e7ec] px-[9px]">
          <Bar w={68} />
          <span className="flex items-center gap-[4px]">
            <Bar w={38} />
            {arrows[0]}
          </span>
          <span className="flex items-center gap-[4px]">
            <Bar w={38} />
            {arrows[1]}
          </span>
          <span className="flex items-center gap-[4px]">
            <Bar w={38} />
            {arrows[2]}
          </span>
        </div>
      ))}
      <svg viewBox="0 0 275 100" width={275} height={100} className="mt-[4px] ml-3">
        <path d="M0 30h275M0 66h275M0 102h275" stroke="#e6e7ec" />
        <path d="M2 43c8-4 14-2 22-6s14 2 20 2 10-6 18-6 12 4 18 2 12-6 20-4 10 6 18 2 12-4 20-4 12 6 20 4 16-6 24-6 12 6 20 4 14-6 22-8 14 2 20 0 12-4 20-2" fill="none" stroke="#6167e6" strokeWidth={3} strokeLinecap="round" />
        <path d="M2 57c8 0 12 4 20 2s12-2 16 4 12 8 20 8 10-4 16-4 12 6 20 2 10-6 18-2 12 6 20 4 14-8 20-4 10 8 18 6 12-8 20-4 14 8 22 4 10-6 16-2 14 6 22 2" fill="none" stroke="#2cd4a5" strokeWidth={3} strokeLinecap="round" />
      </svg>
    </Frame>
  );
}
