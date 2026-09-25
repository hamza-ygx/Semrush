const bar = "rounded-full bg-[#e7e8e8]";

function Window({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-md bg-white shadow-[0_2px_12px_rgba(25,27,35,0.08)] ${className}`}>
      <div className="flex h-[22px] items-center justify-end gap-[3px] bg-[#e4e5e5] pr-[8px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[5px] w-[5px] rounded-full bg-white" />
        ))}
      </div>
      <div className="px-[11px] pt-[11px] text-[14px] leading-5 font-medium text-[#6a6c6a]">{title}</div>
      <div className="px-[11px]">{children}</div>
    </div>
  );
}

function PaidArt() {
  return (
    <div className="relative h-[290px] w-[440px]">
      <div className="absolute top-[8px] left-[235px] h-[280px] w-[188px] rounded-t-[12px] rounded-b-[140px] bg-[#f4f0fd]" />
      <div className="absolute top-[8px] left-[330px] h-[12px] w-[93px] rounded-t-md bg-[#efeafd]" />
      <Window title="Paid Search Positions" className="top-[29px] left-[68px] w-[323px]">
        <div className="mt-[11px] text-[14px] text-[#6a6c6a]">
          <div className="flex h-[36px] items-center border-y border-[#ececf0]">
            <span className={`${bar} ml-2 h-[8px] w-[104px]`} />
            <span className={`${bar} ml-[45px] h-[8px] w-[58px]`} />
            <span className="ml-auto flex h-full w-[74px] items-center justify-end bg-[#f0f0f2] pr-2">Costs</span>
          </div>
          {[
            ["1", "$100.56"],
            ["10", "$98.4"],
            ["17", "$88.5"],
          ].map(([p, c], i) => (
            <div key={p} className="flex h-[36px] items-center border-b border-[#ececf0] last:border-b-0">
              {i === 0 && <span className={`${bar} ml-2 h-[7px] w-[84px]`} />}
              <span className="ml-auto flex items-center gap-[6px]">
                <span className="h-[10px] w-[10px] rounded-full bg-[#d6d8d7]" />
                <span className="text-[16px]">→</span>
                <span className="w-[20px]">{p}</span>
              </span>
              <span className="w-[80px] pr-2 text-right">{c}</span>
            </div>
          ))}
        </div>
      </Window>
      <div className="absolute top-[168px] left-[22px] w-[179px] rounded-md bg-white px-4 pt-[14px] pb-[16px] shadow-[0_4px_16px_rgba(25,27,35,0.1)]">
        <div className="text-[13px] leading-4 font-semibold text-[#5c5cc4]">Ad Headline</div>
        <div className="mt-[9px] h-[7px] w-[80px] rounded-full bg-[#6167e6]" />
        <div className={`${bar} mt-[7px] h-[7px] w-[140px]`} />
        <div className={`${bar} mt-[7px] h-[7px] w-[48px]`} />
      </div>
    </div>
  );
}

function PlaArt() {
  return (
    <div className="relative h-[290px] w-[450px]">
      <svg className="absolute top-[8px] left-[160px]" viewBox="0 0 280 280" width={280} height={280} aria-hidden>
        <path d="M60 10 190 0l80 150-60 130H60L30 150z" fill="#fff6e3" />
      </svg>
      <Window title="PLA Competitors" className="top-[29px] left-[88px] w-[322px]">
        <div className="mt-[11px] text-[14px] text-[#6a6c6a]">
          <div className="flex h-[36px] items-center border-y border-[#ececf0]">
            <span className={`${bar} ml-2 h-[8px] w-[90px]`} />
            <span className="ml-[24px] flex h-full w-[106px] items-center justify-center bg-[#f0f0f2] text-[15px]">Comp. Level</span>
            <span className={`${bar} ml-auto mr-2 h-[8px] w-[56px]`} />
          </div>
          {["56%", "32%", "24%"].map((v, i) => (
            <div key={v} className="flex h-[36px] items-center border-b border-[#ececf0] last:border-b-0">
              <span className="ml-[123px] h-[8px] w-[45px] rounded-full bg-[#e7e8e8]">
                <span className="block h-[8px] rounded-full bg-[#7d79e0]" style={{ width: [24, 17, 11][i] }} />
              </span>
              <span className="ml-[9px] text-[16px]">{v}</span>
              <span className={`${bar} ml-auto mr-2 h-[8px] w-[56px]`} />
            </div>
          ))}
        </div>
      </Window>
      <div className="absolute top-[133px] left-[38px] w-[200px] overflow-hidden rounded-md bg-white text-[13px] shadow-[0_4px_16px_rgba(25,27,35,0.1)]">
        <div className="flex h-[33px] items-center border-b-2 border-[#e0e2e1] px-2 text-[13px] font-semibold text-[#484a49]">Common keywords</div>
        {[
          ["77.6K", 42],
          ["55.2K", 64],
          ["37.3K", 56],
        ].map(([k, w]) => (
          <div key={k} className="flex h-[31px] items-center justify-between border-b border-[#ececf0] px-2 text-[#484a49] last:border-b-0">
            {k}
            <span className={`${bar} h-[7px]`} style={{ width: w as number }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function KeywordsArt() {
  return (
    <div className="relative h-[290px] w-[440px]">
      <div className="absolute top-[18px] left-[40px] h-[250px] w-[250px] rounded-full bg-[#eef6ff]" />
      <Window title="Paid Keywords" className="top-[40px] left-[60px] w-[320px]">
        <div className="mt-[11px] text-[14px] text-[#6a6c6a]">
          {["buy sofa", "garden furniture", "kitchen ideas", "office chair"].map((k, i) => (
            <div key={k} className="flex h-[36px] items-center border-b border-[#ececf0] last:border-b-0">
              <span className="w-[150px]">{k}</span>
              <span className="text-[#5c5cc4]">{[3, 1, 5, 2][i]}</span>
              <span className={`${bar} ml-auto h-[8px] w-[70px]`} />
            </div>
          ))}
        </div>
      </Window>
    </div>
  );
}

function HistoryArt() {
  return (
    <div className="relative h-[290px] w-[440px]">
      <div className="absolute top-[20px] left-[180px] h-[240px] w-[220px] rounded-[40px] bg-[#effaf5]" />
      <Window title="Ads History" className="top-[40px] left-[70px] w-[320px]">
        <div className="mt-[12px] grid grid-cols-6 gap-[6px] pb-[14px]">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className={`h-[22px] rounded ${[1, 4, 6, 9, 13, 14, 19, 22].includes(i) ? "bg-[#8e92ec]" : "bg-[#edefef]"}`} />
          ))}
        </div>
      </Window>
    </div>
  );
}

function EcommerceArt() {
  return (
    <div className="relative h-[290px] w-[440px]">
      <div className="absolute top-[20px] left-[40px] h-[250px] w-[260px] rounded-[60px] bg-[#fff6e3]" />
      <Window title="Product Listing Ads" className="top-[40px] left-[60px] w-[330px]">
        <div className="mt-[12px] flex gap-[10px] pb-[14px]">
          {["$129", "$89", "$249"].map((p) => (
            <div key={p} className="flex-1 rounded-md border border-[#ececf0] p-2">
              <div className="h-[60px] rounded bg-[#f3f4f7]" />
              <div className={`${bar} mt-2 h-[6px] w-full`} />
              <div className="mt-2 text-[13px] font-semibold text-rk-text">{p}</div>
            </div>
          ))}
        </div>
      </Window>
    </div>
  );
}

export function ResearchArt({ kind }: { kind: "paid" | "keywords" | "history" | "pla" | "ecommerce" }) {
  if (kind === "paid") return <PaidArt />;
  if (kind === "pla") return <PlaArt />;
  if (kind === "keywords") return <KeywordsArt />;
  if (kind === "history") return <HistoryArt />;
  return <EcommerceArt />;
}
