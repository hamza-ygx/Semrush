import type { CSSProperties, ReactNode } from "react";

const Chev = ({ size = 10 }: { size?: number }) => (
  <svg viewBox="0 0 10 10" width={size} height={size} className="shrink-0">
    <path d="m2 3.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const shadow = "shadow-[0_6px_30px_rgba(25,27,35,0.10),0_0_1px_rgba(25,27,35,0.12)]";

function MiniPill({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className={`flex h-6 items-center rounded-[7px] border border-[#dcdde2] bg-white text-[10.5px] whitespace-nowrap text-[#484a49] ${className}`}
    >
      {children}
    </div>
  );
}

function FormMock({ big = false }: { big?: boolean }) {
  const g = big
    ? {
        card: 384,
        p1: 242,
        scope: 84,
        p2: 109,
        px: 12,
        pt: 11,
        gap: 8,
        you: 38,
      }
    : {
        card: 378,
        p1: 215,
        scope: 97,
        p2: 124,
        px: 16,
        pt: 16,
        gap: 9,
        you: 46,
      };
  const row = (first: boolean) => (
    <div className="flex" style={{ gap: g.gap }}>
      <MiniPill className="shrink-0" style={{ width: g.p1 }}>
        {first ? (
          <span className="ml-[3px] flex h-[18px] items-center justify-center rounded-full bg-[#e7e4fb] text-[#5a50c8]" style={{ width: g.you }}>
            You
          </span>
        ) : (
          <span className="ml-[8px] h-[11px] w-[11px] rounded-full bg-[#2ed9ae]" />
        )}
        <span className={`flex-1 truncate ${first ? "text-[#484a49]" : "text-[#d6d8d7]"}`} style={{ paddingLeft: first ? 8 : 10 }}>
          {first ? "asos.com" : "Add competitor"}
        </span>
        <span className="flex h-full shrink-0 items-center justify-center gap-[3px] border-l border-[#dcdde2]" style={{ width: g.scope }}>
          Root domain <Chev />
        </span>
      </MiniPill>
      <MiniPill className="shrink-0 justify-center gap-[3px]" style={{ width: g.p2 }}>
        Organic keywords <Chev />
      </MiniPill>
    </div>
  );
  return (
    <div
      className={`rounded-lg bg-white ${shadow}`}
      style={{
        width: g.card,
        padding: `${g.pt}px ${g.px}px ${big ? 10 : 16}px`,
      }}
    >
      {row(true)}
      <div style={{ marginTop: big ? 12 : 13 }}>{row(false)}</div>
      <div className="flex justify-end" style={{ marginTop: big ? 14 : 17 }}>
        <span className="flex h-[27px] items-center rounded-[5px] bg-[#191b1c] px-[9px] text-[14px] text-white">Compare</span>
      </div>
    </div>
  );
}

export function IllusCompareForm({ variant = "cd" }: { variant?: "cd" | "kg" }) {
  return (
    <div className="relative h-[280px] w-[423px]">
      <svg className="absolute top-0 left-0" width={423} height={280} viewBox="0 0 423 280">
        {variant === "cd" ? (
          <path
            d="M48 18 L190 2 Q200 1 206 9 L240 62 Q244 70 243 80 L240 200 Q239 210 230 216 L118 276 Q108 281 100 274 L4 188 Q-2 182 0 172 L34 30 Q37 20 48 18 Z"
            fill="#fdeef1"
          />
        ) : (
          <path
            d="M60 30 L150 5 Q160 2 168 8 L236 44 Q244 50 244 60 L244 210 Q244 220 236 226 L180 276 Q172 282 162 278 L40 246 Q30 243 28 233 L0 150 Q-2 140 4 132 L50 38 Q54 32 60 30 Z"
            fill="#fdeef1"
          />
        )}
      </svg>
      <div className={`absolute ${variant === "cd" ? "top-[70px] left-[23px]" : "top-[68px] left-[20px]"}`}>
        <FormMock big={variant === "kg"} />
      </div>
    </div>
  );
}

export function IllusOverlap() {
  return (
    <div className="relative h-[280px] w-[423px]">
      <svg className="absolute top-0 left-0" width={423} height={280} viewBox="0 0 423 280">
        <path d="M180 6 Q205 0 230 8 Q380 60 410 200 Q412 212 404 220 L340 278 L137 278 L137 120 Q137 60 180 6 Z" fill="#fdf1d9" />
      </svg>
      <div className={`absolute top-[28px] left-[26px] h-[203px] w-[314px] rounded-lg bg-white/95 ${shadow}`}>
        <div className="absolute top-[14px] left-[16px] text-[14px] font-semibold text-[#8a8b90]">Keyword Overlap</div>
        <svg className="absolute top-0 left-0" width={314} height={203}>
          <circle cx={63} cy={87} r={45} fill="#aef1dd" />
          <circle cx={97} cy={143} r={38} fill="#c2c1f1" stroke="#fff" strokeOpacity={0.6} strokeWidth={2} />
          <circle cx={127} cy={91} r={30} fill="#e6cdf7" fillOpacity={0.9} stroke="#fff" strokeOpacity={0.6} strokeWidth={2} />
          <path d="M97 105 a38 38 0 0 1 11 3" fill="none" />
        </svg>
        {[
          ["#8686df", "your domain"],
          ["#6ee6c4", "competitor"],
          ["#d2a8f3", "competitor"],
        ].map(([c, l], i) => (
          <div key={i} className="absolute left-[185px] flex items-center text-[10px] text-[#8a8b90]" style={{ top: 64 + i * 20 }}>
            <span className="mr-[8px] h-[11px] w-[11px] rounded-[3px]" style={{ background: c }} />
            <span className="w-[66px]">{l}</span>
            <span>1.06M</span>
          </div>
        ))}
      </div>
      <div className={`absolute top-[181px] left-[48px] flex h-[64px] w-[346px] items-center rounded-lg bg-white pl-[19px] ${shadow}`}>
        <div className="flex h-8 text-[12px] text-[#484a49]">
          <span className="flex items-center rounded-l-[5px] border border-[#98a6ee] bg-[#f0f3ff] px-2">Organic keywords</span>
          <span className="flex items-center border-y border-[#dcdde2] px-[9px]">Paid keywords</span>
          <span className="flex items-center rounded-r-[5px] border border-[#dcdde2] px-2">PLA keywords</span>
        </div>
      </div>
    </div>
  );
}

const Bar = ({ w = 64, c = "#e6e7eb" }: { w?: number; c?: string }) => <span className="block h-[6px] rounded-full" style={{ width: w, background: c }} />;
const Up = ({ down }: { down?: boolean }) => (
  <svg viewBox="0 0 12 12" width={12} height={12} className={down ? "rotate-180" : ""}>
    <path d="M6 10.5V2M2.5 5.5 6 2l3.5 3.5" fill="none" stroke="#00b98a" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function IllusTable() {
  const rows = [
    { k: "buy", v: "185.1M", a: false, b: true, down: false },
    { k: "movies", v: "134.5K", a: true, b: false, down: false },
    { k: "book", v: "23.4K", a: false, b: true, down: true },
  ];
  return (
    <div className="relative h-[280px] w-[423px]">
      <svg className="absolute top-0 left-0" width={423} height={280} viewBox="0 0 423 280">
        <path d="M167 17 H258 V4 H349 V100 H167 Z" fill="#f4f1fe" />
        <path d="M57 124 A154 154 0 0 0 365 124 Z" fill="#f4f1fe" />
      </svg>
      <div className={`absolute top-[68px] left-[37px] h-[146px] w-[350px] rounded-lg bg-white px-[11px] ${shadow}`}>
        <div className="flex h-[38px] items-end pb-[6px] text-[12px] text-[#6a6c6a]">
          <span className="w-[76px] pl-[10px]">Keyword</span>
          <span className="w-[59px] text-right">Volume</span>
          <span className="flex w-[86px] items-center justify-center gap-[5px]">
            <span className="h-[9px] w-[9px] rounded-full bg-[#6167e6]" />
            ebay.com
          </span>
          <span className="flex w-[100px] items-center justify-center gap-[5px]">
            <span className="h-[9px] w-[9px] rounded-full bg-[#2ed9ae]" />
            amazon.com
          </span>
        </div>
        {rows.map((r) => (
          <div key={r.k} className="flex h-[31.5px] items-center border-t border-[#ecedf0] text-[12px]">
            <span className="w-[76px] pl-[10px] text-[#235fe2]">{r.k}</span>
            <span className="w-[59px] text-right text-[#6a6c6a]">{r.v}</span>
            <span className={`ml-[10px] flex h-full w-[84px] items-center gap-[5px] pl-[8px] ${r.a ? "bg-[#e6fbf3]" : ""}`}>
              {r.a ? (
                <>
                  <Bar w={50} c="#00c78f" />
                  <Up />
                </>
              ) : (
                <Bar />
              )}
            </span>
            <span className={`flex h-full w-[101px] items-center gap-[5px] pl-[8px] ${r.b ? "bg-[#e6fbf3]" : "justify-center"}`}>
              {r.b ? (
                <>
                  <Bar w={66} c="#00c78f" />
                  <Up down={r.down} />
                </>
              ) : (
                <Bar w={70} />
              )}
            </span>
          </div>
        ))}
        <div className="border-t border-[#ecedf0]" />
      </div>
    </div>
  );
}

export function FeatureRow({ illus, title, text, reverse = false }: { illus: ReactNode; title: string; text: string; reverse?: boolean }) {
  const t = (
    <div className="w-[427px]">
      <h3 className="text-[24px] leading-8 font-bold text-rk-text">{title}</h3>
      <p className="mt-[10px] text-[16px] leading-6 text-rk-text">{text}</p>
    </div>
  );
  return (
    <div className="flex justify-between">
      {reverse ? [<div key="t">{t}</div>, <div key="i">{illus}</div>] : [<div key="i">{illus}</div>, <div key="t">{t}</div>]}
    </div>
  );
}
