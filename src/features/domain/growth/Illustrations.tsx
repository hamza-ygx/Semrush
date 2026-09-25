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
      <div className="flex h-[40px] items-center gap-6 border-b border-[#e6e7ec] px-3 text-[10px] text-[#a0a2ad]">
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
      <div className="absolute top-[72px] left-3 text-[11px] leading-[14px] text-rk-muted">Organic Traffic</div>
      <svg viewBox="0 -2 274 45" width={274} height={45} className="absolute top-[93px] left-3">
        <path d="M0 15h274" stroke="#e6e7ec" />
        <path d="M0 19C30 19 50 19 70 21 100 26 115 32 128 32 150 32 180 12 223 8 240 8 260 8 274 8V43H0z" fill="#fff1cc" />
        <path d="M0 19C30 19 50 19 70 21 100 26 115 32 128 32 150 32 180 12 223 8 240 8 260 8 274 8" fill="none" stroke="#ffc02e" strokeWidth={2.2} />
        <path d="M0 11C30 11 50 11 70 13 100 17 115 19.5 133 19.5 160 19.5 190 1 223 0.6 240 0.6 260 0.6 274 0.6" fill="none" stroke="#b77af5" strokeWidth={2.2} />
        <path d="M0 2.6C30 2.6 50 2.6 70 4 100 10 120 21 150 24 180 28 210 32 233 32 250 32 262 32 274 32" fill="none" stroke="#7f84e8" strokeWidth={2.2} />
      </svg>
      <div className="absolute top-[158px] left-3 text-[11px] leading-[14px] text-rk-muted">Organic Keywords</div>
      <svg viewBox="0 0 274 38" width={274} height={38} className="absolute top-[177px] left-3">
        <path d="M0 11h274" stroke="#e6e7ec" />
        <path d="M0 13.9C30 13.9 50 13.9 70 15 100 19 120 25.6 135 25.6 160 25.6 200 3 230 2 250 2 262 2 274 2V38H0z" fill="#fff1cc" />
        <path d="M0 13.9C30 13.9 50 13.9 70 15 100 19 120 25.6 135 25.6 160 25.6 200 3 230 2 250 2 262 2 274 2" fill="none" stroke="#ffc02e" strokeWidth={2.2} />
        {[
          [51, "#b77af5", 13],
          [57.6, "#7f84e8", 13],
          [131, "#b77af5", 13],
          [139, "#7f84e8", 5],
          [229, "#b77af5", 5],
          [237, "#7f84e8", 13],
        ].map(([x, c, t]) => (
          <rect key={`${x}`} x={x as number} y={t as number} width={5} height={38 - (t as number)} fill={c as string} />
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
      <div className="flex h-[40px] items-center border-b border-[#e6e7ec] px-3 text-[10px] text-rk-muted">
        <span className="h-[9px] w-[9px] rounded-full bg-[#6167e6]" />
        <FlagUS width={14} height={10} className="ml-[5px]" />
        <span className="ml-[6px]">
          <Bar w={26} />
        </span>
        <span className="ml-[23px] h-[9px] w-[9px] rounded-full bg-[#2cd4a5]" />
        <FlagUK width={14} height={10} className="ml-[6px]" />
        <span className="ml-[4px]">
          <Bar w={26} />
        </span>
        <span className="ml-[24px] h-[9px] w-[9px] rounded-full bg-[#c4c7cf]" />
        <span className="ml-[6px]">Add country</span>
      </div>
      {[
        [<Up key="a" />, <Down key="b" />, <Up key="c" />],
        [<Down key="a" />, <Up key="b" />, <Down key="c" />],
      ].map((arrows, r) => (
        <div key={r} className="flex h-[32px] items-center border-b border-[#e6e7ec] pl-[9px]">
          <Bar w={57} />
          {arrows.map((a, i) => (
            <span key={i} className={`flex items-center gap-[9px] ${i ? "ml-[20px]" : "ml-[18px]"}`}>
              <Bar w={34} />
              {a}
            </span>
          ))}
        </div>
      ))}
      <svg viewBox="0 0 275 100" width={275} height={100} className="ml-3">
        <path d="M0 26.5h275M0 60h275M0 93.5h275" stroke="#e6e7ec" />
        <polyline points="0.5,41.5 15.5,39 30.5,35 45.5,36.5 60.5,35 73,38 85.5,33 105.5,33 118,31.5 130.5,34 145.5,33 160.5,31.5 175.5,34 185.5,37 200.5,36 210.5,32.5 225.5,31.5 240.5,26.5 250.5,25 258,29 265.5,25 273,25.5" fill="none" stroke="#6167e6" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="0.5,54 8,52.5 20.5,58 30.5,53 40.5,58 55.5,63 65.5,64 75.5,69 90.5,69 100.5,64 118,62 130.5,64 150.5,61.5 160.5,66.5 175.5,64 190.5,64 200.5,71.5 208,66.5 218,73 230.5,66.5 240.5,69 255.5,76.5 263,73 273,76.5" fill="none" stroke="#2cd4a5" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Frame>
  );
}
