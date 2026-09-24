const card = "absolute rounded-lg border border-[#e3e4e8] bg-white shadow-[0_4px_14px_rgba(25,27,35,0.08)]";
const bar = "h-[3px] rounded-full bg-[#d9dbe0]";

export function SignupArt() {
  return (
    <div aria-hidden className="absolute top-[40px] left-[410px] h-[330px] w-[276px]">
      <div className={`${card} top-0 left-0 h-[148px] w-[210px] p-[10px]`}>
        <div className="text-[7px] font-semibold text-[#333]">Website Traffic by Country</div>
        <svg viewBox="0 0 190 70" width={190} height={70} className="mt-[6px]">
          <path d="M8 18c10-8 30-10 44-4s20 14 16 24-14 10-20 20-18 8-22-2S-2 26 8 18zM78 10c18-6 44-4 64 0s40 6 44 16-8 16-24 18-30 12-44 8-18-14-30-16-22-18-10-26z" fill="#dcdddf" />
          <path d="M20 28c6-4 16-4 22 2s0 12-8 12-18-8-14-14z" fill="#8fc4f2" />
        </svg>
      </div>
      <div className={`${card} top-[62px] left-[42px] h-[160px] w-[214px] p-[10px]`}>
        <div className="text-[7px] font-semibold text-[#333]">Top Organic Keywords</div>
        <div className="mt-[10px] flex h-[16px] items-center justify-between rounded bg-[#f4f5f9] px-[6px] text-[5px] text-[#8a8e9b]">
          <span>Keyword</span>
          <span className={`${bar} w-[70px]`} />
          <span>Traffic %</span>
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="mt-[10px] flex items-center gap-[8px]">
            <span className="h-[3px] w-[26px] rounded-full bg-[#1c9df0]" />
            <span className="rounded-[2px] bg-[#e7d9ff] px-[2px] text-[5px] text-[#8a3fcf]">N</span>
            {i > 0 && <span className="rounded-[2px] bg-[#d6f5e8] px-[2px] text-[5px] text-[#16876a]">T</span>}
            <span className={`${bar} w-[20px]`} />
            <span className={`${bar} w-[30px]`} />
          </div>
        ))}
      </div>
      <div className={`${card} top-[131px] left-[115px] h-[100px] w-[158px] p-[10px]`}>
        <div className="text-[7px] font-semibold text-[#333]">Backlinks and Referring Domains</div>
        <svg viewBox="0 0 140 64" width={140} height={64} className="mt-[4px]">
          <path d="M4 60 20 52 34 36 48 26 60 25V60Z" fill="#cfe6fb" />
          <path d="M4 60 20 52 34 36 48 26 60 25" fill="none" stroke="#7cc0f2" strokeWidth={1.2} />
          <path d="M82 60V40c4-18 10-26 16-10s10 12 16 4 14-2 16 14v12Z" fill="#fbd7a8" stroke="#f3b066" strokeWidth={1} />
          <path d="M8 12h14M84 12h12" stroke="#d9dbe0" strokeWidth={3} strokeLinecap="round" />
        </svg>
      </div>
      <div className={`${card} top-[195px] left-0 w-[186px] p-[10px]`}>
        <div className="text-[7px] font-semibold text-[#333]">Traffic and Visitor Engagement</div>
        <div className="mt-[6px] flex gap-[6px]">
          <div className="flex-1 rounded border border-[#eceef0] px-[6px] py-[4px]">
            <div className="flex items-center gap-[4px] text-[5px] text-[#8a8e9b]">
              Visits <span className="rounded bg-[#d6f5e8] px-[2px] text-[#16876a]">+73%</span>
            </div>
            <div className="text-[15px] font-bold">106.52B</div>
          </div>
          <div className="flex-1 rounded border border-[#eceef0] px-[6px] py-[4px]">
            <div className="text-[5px] text-[#8a8e9b]">Avg. Visit Duration</div>
            <div className="text-[15px] font-bold">20:59</div>
          </div>
        </div>
        <div className="mt-[6px] text-[4px] leading-[6px] text-[#8a8e9b]">Total Visits last 3 months</div>
        {[
          [98, "#1c9df0", "106.52B"],
          [92, "#9cccf5", "99.32B"],
          [96, "#9cccf5", "122.94B"],
        ].map(([wd, c, t]) => (
          <div key={t} className="mt-[4px] flex h-[8px] items-center gap-[6px] leading-none">
            <span className="h-[6px] rounded-sm" style={{ width: wd as number, background: c as string }} />
            <span className="text-[5px] text-[#1c9df0]">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
