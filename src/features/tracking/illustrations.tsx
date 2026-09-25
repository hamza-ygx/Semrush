export function LineChartCard({ width = 254, height = 162, dots = true }: { width?: number; height?: number; dots?: boolean }) {
  return (
    <svg viewBox="0 0 254 162" width={width} height={height} className="block">
      <rect x="0.5" y="0.5" width="253" height="161" rx="3" fill="#fff" stroke="#e0e2e1" />
      <path d="M1 4a3 3 0 0 1 3-3h246a3 3 0 0 1 3 3v8H1z" fill="#e0e2e1" />
      <circle cx="232" cy="7" r="1.6" fill="#fff" />
      <circle cx="238" cy="7" r="1.6" fill="#fff" />
      <circle cx="244" cy="7" r="1.6" fill="#fff" />
      <rect x="12" y="32" width="47" height="8" rx="2" fill="#edefef" />
      <rect x="68" y="32" width="83" height="8" rx="2" fill="#edefef" />
      <rect x="158" y="32" width="84" height="8" rx="2" fill="#edefef" />
      <path d="M12 72h200M12 92h200M12 112h200" stroke="#f0f1f4" />
      <path d="M12 118l14-32 14 34 14-18 14 14 14-8 14-6" fill="none" stroke="#56adeb" strokeWidth="2" />
      <path d="M12 102l18-2 12 10 18-20 16 12 16-14 20 18 16-8" fill="none" stroke="#fdc23c" strokeWidth="2" />
      <path d="M12 106l22-12 14 10 18-22 16 18 18-22 18 10 20-18 18 4 20-12" fill="none" stroke="#3aa14a" strokeWidth="2" />
      {dots && (
        <>
          <circle cx="192" cy="72" r="3" fill="#3aa14a" />
          <rect x="196" y="60" width="44" height="6" rx="2" fill="#edefef" />
          <rect x="196" y="89" width="44" height="6" rx="2" fill="#edefef" />
        </>
      )}
    </svg>
  );
}

export function PositionsCard({ title = "Positions", width = 196, height = 138 }: { title?: string; width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 196 138" width={width} height={height} className="block">
      <rect x="0.5" y="0.5" width="195" height="137" rx="3" fill="#fff" stroke="#e0e2e1" />
      <path d="M1 4a3 3 0 0 1 3-3h188a3 3 0 0 1 3 3v6H1z" fill="#e0e2e1" />
      <circle cx="175" cy="6" r="1.5" fill="#fff" />
      <circle cx="181" cy="6" r="1.5" fill="#fff" />
      <circle cx="187" cy="6" r="1.5" fill="#fff" />
      <text x="11" y="34" fontSize="13" fontWeight="600" fill="#1b1e1a" fontFamily="Ubuntu, Inter, sans-serif">
        {title}
      </text>
      <rect x="11" y="47" width="175" height="8" rx="1" fill="#edefef" />
      {[68, 94, 118].map((y, i) => (
        <g key={y}>
          <rect x="20" y={y - 3} width="18" height="6" rx="2" fill="#edefef" />
          <rect x={i === 1 ? 96 : 80} y={y - 3} width="36" height="6" rx="2" fill="#edefef" />
          <rect x="155" y={y - 3} width="24" height="6" rx="2" fill="#edefef" />
          {i < 2 ? (
            <path d={`M${i === 1 ? 80 : 66} ${y + 5}v-10m-4 4 4-4 4 4`} fill="none" stroke="#3aa14a" strokeWidth="1.5" />
          ) : (
            <path d={`M66 ${y - 5}v10m-4-4 4 4 4-4`} fill="none" stroke="#e5231b" strokeWidth="1.5" />
          )}
          {i < 2 && <path d={`M11 ${y + 13}h175`} stroke="#edefef" />}
        </g>
      ))}
    </svg>
  );
}

export function EmptyTable({ size = 92 }: { size?: number }) {
  return (
    <svg viewBox="0 0 92 92" width={size} height={size} className="block">
      <circle cx="46" cy="48" r="44" fill="#e0e2e1" />
      <g transform="rotate(8 46 46)">
        <rect x="16" y="20" width="62" height="52" rx="5" fill="#fff" stroke="#1b1e1a" strokeWidth="2" />
        <path d="M17 25a4 4 0 0 1 4-4h52a4 4 0 0 1 4 4v8H17z" fill="#6a6c6a" />
        <circle cx="23" cy="27" r="2" fill="#fff" />
        <circle cx="29" cy="27" r="2" fill="#fff" />
        <path d="M22 52h50M46 40v28" stroke="#1b1e1a" strokeWidth="1.6" />
      </g>
      <path d="M12 60c4 10 14 18 26 20" fill="none" stroke="#d6d8d7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function WorldMapCard({ size = 76 }: { size?: number }) {
  return (
    <svg viewBox="0 0 76 76" width={size} height={size} className="block">
      <circle cx="38" cy="36" r="36" fill="#e0e2e1" />
      <path d="M38 70l-8-6h16z" fill="#e0e2e1" />
      <g transform="rotate(-8 38 38)">
        <rect x="9" y="16" width="58" height="42" rx="4" fill="#fff" stroke="#1b1e1a" strokeWidth="1.8" />
        <path d="M10 20a3 3 0 0 1 3-3h50a3 3 0 0 1 3 3v6H10z" fill="#6a6c6a" />
        <circle cx="15" cy="22" r="1.5" fill="#fff" />
        <circle cx="20" cy="22" r="1.5" fill="#fff" />
        <path d="M16 34l6-3 5 2 1 5-4 3-2 6-3-2-1-6zM32 32l6-1 3 3-2 3 4 2-1 5-4 2-3-4-3-1zM46 33l10-2 6 3-2 5-5 1-2 5-4-3-2-4z" fill="#6a6c6a" />
      </g>
    </svg>
  );
}

export function LooksGood({ size = 92 }: { size?: number }) {
  return (
    <svg viewBox="0 0 92 92" width={size} height={size} className="block">
      <circle cx="46" cy="48" r="44" fill="#e0e2e1" />
      <g transform="rotate(-8 44 44)">
        <rect x="12" y="16" width="64" height="58" rx="5" fill="#fff" stroke="#1b1e1a" strokeWidth="2" />
        <path d="M13 21a4 4 0 0 1 4-4h54a4 4 0 0 1 4 4v8H13z" fill="#6a6c6a" />
        <circle cx="19" cy="23" r="2" fill="#fff" />
        <circle cx="25" cy="23" r="2" fill="#fff" />
        <rect x="22" y="44" width="20" height="22" fill="#e0e2e1" stroke="#6a6c6a" strokeWidth="1.2" />
        <rect x="40" y="34" width="20" height="32" fill="#fff" stroke="#6a6c6a" strokeWidth="1.2" />
        <path d="M50 38l1.6 3.2 3.4.5-2.5 2.4.6 3.4-3.1-1.6-3.1 1.6.6-3.4-2.5-2.4 3.4-.5z" fill="#1b1e1a" />
      </g>
      <circle cx="74" cy="58" r="14" fill="#fff" stroke="#6a6c6a" strokeWidth="1.6" />
      <circle cx="69.5" cy="55" r="1.4" fill="#1b1e1a" />
      <circle cx="78.5" cy="55" r="1.4" fill="#1b1e1a" />
      <path d="M68.5 61c3 3 8 3 11 0" fill="none" stroke="#1b1e1a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TagsOverview() {
  return (
    <div className="relative h-[210px] w-[280px]">
      <div className="absolute top-0 left-0">
        <svg viewBox="0 0 254 162" width={220} height={140} className="block">
          <rect x="0.5" y="0.5" width="253" height="161" rx="3" fill="#f7f8fa" stroke="#e0e2e1" />
          <path d="M1 4a3 3 0 0 1 3-3h246a3 3 0 0 1 3 3v10H1z" fill="#e0e2e1" />
          <circle cx="232" cy="8" r="1.8" fill="#fff" />
          <circle cx="238" cy="8" r="1.8" fill="#fff" />
          <circle cx="244" cy="8" r="1.8" fill="#fff" />
          <rect x="15" y="37" width="52" height="9" rx="3" fill="#e0e2e1" />
          <rect x="79" y="37" width="82" height="9" rx="3" fill="#e0e2e1" />
          <rect x="182" y="37" width="62" height="9" rx="3" fill="#e0e2e1" />
          <path d="M15 116l16-38 16 38 12-16 15 14 14-8 14-6" fill="none" stroke="#56adeb" strokeWidth="2" />
          <path d="M15 110l18-4 12 12 18-22 16 12 16-16 20 20 16-10" fill="none" stroke="#fdc23c" strokeWidth="2" />
          <path d="M15 112l22-14 14 10 18-24 16 18 18-16 18 12 20-18 18 2 20-12" fill="none" stroke="#3aa14a" strokeWidth="2" />
          <circle cx="222" cy="84" r="4" fill="#3aa14a" />
          <rect x="228" y="68" width="22" height="6" rx="2" fill="#e0e2e1" />
          <rect x="228" y="98" width="22" height="6" rx="2" fill="#e0e2e1" />
        </svg>
      </div>
      <div className="absolute top-[82px] left-[62px] h-[97px] w-[178px] rounded-[3px] border border-rk-border bg-white px-[12px] pt-[10px] shadow-[0_1px_3px_rgba(25,27,35,0.1)]">
        <div className="text-[13px] leading-4 font-semibold tracking-[0.2px] text-rk-text" style={{ fontFamily: "Ubuntu, Inter, sans-serif" }}>
          Tags overview
        </div>
        <svg viewBox="0 0 154 64" width={154} height={64} className="mt-[4px] block">
          <rect x="0" y="0" width="154" height="8" rx="1" fill="#e0e2e1" />
          {[16, 34, 52].map((y, i) => (
            <g key={y}>
              <rect x="0" y={y - 2} width="32" height="4" rx="2" fill="#e0e2e1" />
              <rect x="76" y={y - 2} width="42" height="4" rx="2" fill="#e0e2e1" />
              <rect x="136" y={y - 2} width="18" height="4" rx="2" fill="#e0e2e1" />
              {i < 2 ? (
                <path d={`M${i ? 72 : 55} ${y + 4}v-8m-3 3 3-3 3 3`} fill="none" stroke="#3aa14a" strokeWidth="1.3" />
              ) : (
                <path d={`M62 ${y - 4}v8m-3-3 3 3 3-3`} fill="none" stroke="#e5231b" strokeWidth="1.3" />
              )}
              {i < 2 && <path d={`M0 ${y + 8}h154`} stroke="#edefef" />}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
