export function Flag({ code }: { code: string }) {
  const box = "block h-[11px] w-[16px] shrink-0 overflow-hidden rounded-[1px]";
  if (code === "US")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#fff" />
        {[0, 2, 4, 6, 8, 10].map((y) => (
          <rect key={y} y={y * 0.85 + 0.1} width="16" height="0.85" fill="#d22f3c" />
        ))}
        <rect width="7" height="6" fill="#3c3b6e" />
      </svg>
    );
  if (code === "ES")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#c60b1e" />
        <rect y="2.75" width="16" height="5.5" fill="#ffc400" />
      </svg>
    );
  if (code === "UK")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#012169" />
        <path d="M0 0l16 11M16 0 0 11" stroke="#fff" strokeWidth="2.2" />
        <path d="M0 0l16 11M16 0 0 11" stroke="#c8102e" strokeWidth="0.8" />
        <path d="M8 0v11M0 5.5h16" stroke="#fff" strokeWidth="3.2" />
        <path d="M8 0v11M0 5.5h16" stroke="#c8102e" strokeWidth="1.8" />
      </svg>
    );
  if (code === "FR")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="11" fill="#fff" />
        <rect width="5.3" height="11" fill="#1f3fa8" />
        <rect x="10.7" width="5.3" height="11" fill="#e1242f" />
      </svg>
    );
  if (code === "DE")
    return (
      <svg viewBox="0 0 16 11" className={box}>
        <rect width="16" height="3.7" fill="#111" />
        <rect y="3.7" width="16" height="3.7" fill="#dd1c1c" />
        <rect y="7.3" width="16" height="3.7" fill="#ffce00" />
      </svg>
    );
  const t = tricolors[code];
  if (t)
    return (
      <svg viewBox="0 0 16 11" className={box}>
        {t.c.map((c, i) => (t.v ? <rect key={i} x={(16 / 3) * i} width={16 / 3 + 0.1} height="11" fill={c} /> : <rect key={i} y={(11 / 3) * i} width="16" height={11 / 3 + 0.1} fill={c} />))}
      </svg>
    );
  return <span className={`${box} bg-rk-border`} />;
}

const tricolors: Record<string, { v: boolean; c: string[] }> = {
  IT: { v: true, c: ["#1a9146", "#fff", "#d52b1e"] },
  AF: { v: true, c: ["#111", "#c8102e", "#118c3f"] },
  IE: { v: true, c: ["#169b62", "#fff", "#ff883e"] },
  BE: { v: true, c: ["#111", "#fdda24", "#ef3340"] },
  RO: { v: true, c: ["#002b7f", "#fcd116", "#ce1126"] },
  NG: { v: true, c: ["#008751", "#fff", "#008751"] },
  MX: { v: true, c: ["#006847", "#fff", "#ce1126"] },
  PE: { v: true, c: ["#d91023", "#fff", "#d91023"] },
  NL: { v: false, c: ["#ae1c28", "#fff", "#21468b"] },
  AT: { v: false, c: ["#ed2939", "#fff", "#ed2939"] },
  RU: { v: false, c: ["#fff", "#0039a6", "#d52b1e"] },
  HU: { v: false, c: ["#ce2939", "#fff", "#477050"] },
  BG: { v: false, c: ["#fff", "#00966e", "#d62612"] },
  LT: { v: false, c: ["#fdb913", "#006a44", "#c1272d"] },
  EE: { v: false, c: ["#0072ce", "#111", "#fff"] },
  AM: { v: false, c: ["#d90012", "#0033a0", "#f2a800"] },
  CO: { v: false, c: ["#fcd116", "#003893", "#ce1126"] },
  AR: { v: false, c: ["#74acdf", "#fff", "#74acdf"] },
  UA: { v: false, c: ["#0057b7", "#ffd700", "#ffd700"] },
  PL: { v: false, c: ["#fff", "#fff", "#dc143c"] },
  ID: { v: false, c: ["#ce1126", "#fff", "#fff"] },
};
