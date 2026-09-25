import { worldCountries, worldOutline } from "../part2/geo";

const card = "absolute rounded-lg border border-[#e3e4e8] bg-white shadow-[0_4px_14px_rgba(25,27,35,0.08)]";
const bar = "absolute h-[3px] rounded-full bg-[#dcdde2]";
const blue = ["United States of America", "Japan"];

function KeywordRow({ top, t, n }: { top: number; t: boolean; n?: boolean }) {
  return (
    <>
      <span className="absolute left-[20px] h-[3px] w-[27px] rounded-full bg-[#1c9df0]" style={{ top: top - 1 }} />
      <span className="absolute left-[55px] flex h-[8px] w-[8px] items-center justify-center rounded-[2px] bg-[#e7d9ff] text-[4px] text-[#8a3fcf]" style={{ top: top - 4 }}>
        N
      </span>
      {t && (
        <span className="absolute left-[67px] flex h-[8px] w-[7px] items-center justify-center rounded-[2px] bg-[#d6f5e8] text-[4px] text-[#16876a]" style={{ top: top - 4 }}>
          T
        </span>
      )}
      {n && (
        <span className="absolute left-[84px] text-[5px] leading-none text-[#484a54]" style={{ top: top - 3 }}>
          1
        </span>
      )}
      <span className={`${bar} left-[100px] w-[15px]`} style={{ top: top - 1 }} />
      <span className={`${bar} left-[140px] w-[10px]`} style={{ top: top - 1 }} />
      <span className={`${bar} left-[172px] w-[15px]`} style={{ top: top - 1 }} />
    </>
  );
}

export function SignupArt() {
  return (
    <div aria-hidden className="absolute top-[40px] left-[410px] h-[330px] w-[276px]">
      <div className={`${card} top-0 left-0 h-[148px] w-[210px] overflow-hidden p-[10px]`}>
        <div className="text-[7px] leading-[9px] font-semibold text-[#333]">Website Traffic by Country</div>
        <svg width={210} height={148} className="absolute top-0 left-0">
          <clipPath id="signup-map-clip">
            <path d={worldOutline} />
          </clipPath>
          <g transform="translate(-36.6 -43.6) scale(0.272)" clipPath="url(#signup-map-clip)">
            {worldCountries.map((c) => (
              <path key={c.name} d={c.d} fill={blue.includes(c.name) ? "#b9e9fe" : "#d3d5dc"} stroke="#fff" strokeWidth={2} />
            ))}
          </g>
        </svg>
      </div>
      <div className={`${card} top-[61px] left-[41px] h-[160px] w-[214px]`}>
        <div className="absolute top-[11px] left-[10px] text-[7px] leading-[9px] font-semibold text-[#333]">Top Organic Keywords</div>
        <div className="absolute top-[34px] left-[12px] h-[19px] w-[189px] rounded bg-[#f4f5f9] text-[5px] leading-[19px] text-[#8a8e9b]">
          <span className="absolute left-[8px]">Keyword</span>
          <span className={`${bar} top-[8px] left-[43px] w-[21px]`} />
          <span className={`${bar} top-[8px] left-[70px] w-[13px]`} />
          <span className={`${bar} top-[8px] left-[88px] w-[23px]`} />
          <span className={`${bar} top-[8px] left-[118px] w-[30px]`} />
          <span className="absolute right-[6px]">Traffic %</span>
        </div>
        <KeywordRow top={66} t={false} n />
        <KeywordRow top={90} t />
        <KeywordRow top={114} t />
      </div>
      <div className={`${card} top-[131px] left-[115px] h-[100px] w-[158px] p-[10px]`}>
        <div className="text-[7px] font-semibold text-[#333]">Backlinks and Referring Domains</div>
        <svg width={158} height={100} className="absolute top-0 left-0">
          <path d="M25 85 40 72 55 55 62 43 72 41V85Z" fill="#cfe6fb" />
          <path d="M25 85 40 72 55 55 62 43 72 41" fill="none" stroke="#7cc0f2" strokeWidth={1.2} />
          <path d="M85 85V58C87 47 90 41 94 41S106 68 114 68 124 53 129 53 145 70 145 80V85Z" fill="#fbd7a8" stroke="#f3b066" strokeWidth={1} />
          <path d="M12 34h20M85 34h15" stroke="#d9dbe0" strokeWidth={3} strokeLinecap="round" />
        </svg>
      </div>
      <div className={`${card} top-[194px] -left-px h-[136px] w-[186px]`}>
        <div className="absolute top-[11px] left-[12px] text-[7px] leading-[9px] font-semibold text-[#333]">Traffic and Visitor Engagement</div>
        {(
          [
            [11, 79, "Visits", "106.52B"],
            [97, 77, "Avg. Visit Duration", "20:59"],
          ] as const
        ).map(([l, w, label, v]) => (
          <div key={label} className="absolute top-[26px] h-[41px] rounded border border-[#eceef0]" style={{ left: l, width: w }}>
            <div className="absolute top-[7px] left-[7px] flex items-center gap-[4px] text-[5px] leading-[6px] text-[#8a8e9b]">
              {label}
              {label === "Visits" && <span className="rounded-[2px] bg-[#d6f5e8] px-[2px] text-[#16876a]">+73%</span>}
            </div>
            <div className="absolute top-[18px] left-[7px] text-[15px] leading-[16px] font-bold text-[#191b23]">{v}</div>
          </div>
        ))}
        <div className="absolute top-[74px] left-[12px] text-[4px] leading-[6px] text-[#8a8e9b]">Total Visits last 3 months</div>
        {(
          [
            [89, 97, "#1c9df0", "106.52B"],
            [101.5, 92, "#9cccf5", "99.32B"],
            [114, 104, "#9cccf5", "122.94B"],
          ] as const
        ).map(([y, wd, c, t]) => (
          <div key={t} className="absolute left-[12px] flex h-[6px] items-center gap-[5px] leading-none" style={{ top: y - 3 }}>
            <span className="h-[5px] rounded-sm" style={{ width: wd, background: c }} />
            <span className="text-[5px] text-[#1c9df0]">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
