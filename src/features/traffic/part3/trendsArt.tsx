import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function HeroArt() {
  const line = "M660 147 L668 144 L678 142 L688 145 L698 147 L706 143 L712 139 L720 145 L728 124 L734 146 L744 148 L756 147 L766 150 L774 153 L782 151 L792 139 L800 136";
  return (
    <svg viewBox="0 0 980 279" width={980} height={279} className="pointer-events-none absolute inset-0" aria-hidden>
      <path d="M535 0H721L956 138L706 279H535L598 138Z" fill="#dafde9" />
      <g filter="url(#tsh)">
        <rect x="632" y="81" width="228" height="135" rx="7" fill="#fff" />
      </g>
      <text x="643" y="107" fontSize="14" fontWeight="600" fill="#6a6c6a">Traffic</text>
      {[125, 145, 165, 185].map((y, i) => (
        <g key={y}>
          <line x1="660" x2="846" y1={y} y2={y} stroke="#eef0f3" />
          <text x="643" y={y + 2} fontSize="5" fill="#9ea0a8">{["15M", "10M", "5M", "0"][i]}</text>
        </g>
      ))}
      <path d={line} fill="none" stroke="#11b98a" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M660 174 C672 173 680 176 690 175 S700 170 706 172 S716 176 726 175 S740 171 750 173 S780 175 800 175 H846" fill="none" stroke="#b58af2" strokeWidth="2.4" />
      <path d="M800 175 H846" stroke="#e7d7fb" strokeWidth="2.4" />
      <circle cx="728" cy="124" r="4" fill="#11b98a" />
      <rect x="712" y="96" width="36" height="20" rx="3" fill="#7ddcbc" />
      <path d="M726 116 L730 116 L728 119Z" fill="#7ddcbc" />
      <text x="730" y="110" fontSize="10" fontWeight="600" fill="#fff" textAnchor="middle">+15%</text>
      <circle cx="661" cy="199" r="2.2" fill="#11b98a" />
      <text x="668" y="201" fontSize="6" fill="#6a6c6a">Competitor 1</text>
      <circle cx="715" cy="199" r="2.2" fill="#b58af2" />
      <text x="722" y="201" fontSize="6" fill="#6a6c6a">Competitor 2</text>
      <g filter="url(#tsh)">
        <rect x="780" y="64" width="119" height="84" rx="4" fill="#06c192" />
      </g>
      <text x="795" y="84" fontSize="12" fontWeight="600" fill="#fff">Market Share</text>
      <circle cx="814" cy="114" r="17" fill="none" stroke="#9ce9d4" strokeWidth="10" />
      <path d="M814 97 A17 17 0 1 1 797.4 117.7" fill="none" stroke="#c7f5e8" strokeWidth="10" />
      <circle cx="814" cy="114" r="12" fill="#06c192" />
      <text x="840" y="114" fontSize="22" fontWeight="600" fill="#fff">+2M</text>
      <text x="866" y="132" fontSize="8" fill="#e1fbf2">↑1.35</text>
      <defs>
        <filter id="tsh" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1b1e1a" floodOpacity="0.12" />
        </filter>
      </defs>
    </svg>
  );
}

const grey = "#707272";

export const logos = [
  {
    key: "tesla",
    w: 128,
    el: (
      <svg viewBox="0 0 128 18" width={128} height={18}>
        <g fill={grey}>
          <path d="M0 0h20v3H11.5v15h-3V3H0z" />
          <path d="M28 0h20v3H28zM28 7.5h20v3H28zM28 15h20v3H28z" />
          <path d="M56 0h20v3H59v4.5h17v10.5H56v-3h17V10.5H56z" />
          <path d="M84 0h3v15h17v3H84z" />
          <path d="M108 0h20v3h-20zM108 5.5h20V18h-3v-6.5h-14V18h-3z" />
        </g>
      </svg>
    ),
  },
  {
    key: "decathlon",
    w: 110,
    el: <span className="text-[20px] font-extrabold tracking-[-1.5px] text-[#707272]" style={{ fontStretch: "condensed" }}>DECATHLON</span>,
  },
  { key: "pg", w: 44, el: <span className="font-serif text-[23px] font-bold text-[#707272] italic">P&amp;G</span> },
  { key: "samsung", w: 120, el: <span className="text-[20px] font-extrabold tracking-[2px] text-[#707272]">SAMSUNG</span> },
  {
    key: "microsoft",
    w: 112,
    el: (
      <span className="flex items-center gap-[4px] text-[20px] tracking-[-0.6px] text-[#707272]">
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path fill={grey} d="M0 0h11.4v11.4H0zM12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zM12.6 12.6H24V24H12.6z" />
        </svg>
        Microsof
      </span>
    ),
  },
  {
    key: "laliga",
    w: 120,
    el: (
      <span className="flex items-center gap-[2px] text-[23px] font-bold tracking-[-0.6px] text-[#707272]">
        <svg viewBox="0 0 40 40" width={38} height={38}>
          <circle cx="20" cy="20" r="18" fill={grey} />
          <circle cx="20" cy="20" r="7" fill="#f3f5f5" />
          <circle cx="20" cy="20" r="4" fill={grey} />
          <path d="M20 2v8M20 30v8M2 20h8M30 20h8M7 7l6 6M27 27l6 6M33 7l-6 6M13 27l-6 6" stroke="#f3f5f5" strokeWidth="2.4" />
        </svg>
        LaLiga
      </span>
    ),
  },
  {
    key: "amazon",
    w: 92,
    el: (
      <span className="relative -mt-2 text-[25px] font-bold tracking-[-0.8px] text-[#707272]">
        amazon
        <svg viewBox="0 0 70 12" width={62} height={10} className="absolute -bottom-[6px] left-[10px]">
          <path d="M2 2c18 10 44 10 62 1" fill="none" stroke={grey} strokeWidth="3" strokeLinecap="round" />
          <path d="M58 0l7 3-4 6" fill="none" stroke={grey} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </span>
    ),
  },
];

export const ExcelIcon = (p: P) => (
  <svg viewBox="0 0 44 44" width={44} height={44} {...p}>
    <rect x="12" y="2" width="30" height="40" rx="3" fill="#21a366" />
    <path d="M27 2h12a3 3 0 0 1 3 3v9H27z" fill="#33c481" />
    <path d="M12 22h30v11H12z" fill="#107c41" />
    <path d="M27 14h15v8H27z" fill="#21a366" />
    <path d="M12 33h30v6a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3z" fill="#185c37" />
    <rect x="2" y="11" width="22" height="22" rx="2.5" fill="#107c41" />
    <path d="M8 16h3.2l2 4 2.1-4h3l-3.4 6 3.5 6h-3.2l-2.1-4.1-2.1 4.1H7.8l3.5-6z" fill="#fff" />
  </svg>
);

export const SheetsIcon = (p: P) => (
  <svg viewBox="0 0 32 44" width={32} height={44} {...p}>
    <path d="M3 0h19l10 10v31a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" fill="#23a566" />
    <path d="M22 0l10 10h-7a3 3 0 0 1-3-3z" fill="#8ed1b1" />
    <path d="M8 20h16v14H8z" fill="#fff" />
    <path d="M10 22.5h5v3h-5zM17 22.5h5v3h-5zM10 27.5h5v4h-5zM17 27.5h5v4h-5z" fill="#23a566" />
  </svg>
);

export const SalesforceIcon = (p: P) => (
  <svg viewBox="0 0 58 40" width={56} height={40} {...p}>
    <path
      d="M24 5c2.2-2.3 5.3-3.7 8.7-3.7 4.5 0 8.4 2.5 10.5 6.2 1.8-.8 3.8-1.3 6-1.3 8 0 14.5 6.6 14.5 14.6S57.2 35.5 49.2 35.5c-1 0-1.9-.1-2.9-.3-1.8 3.2-5.3 5.4-9.2 5.4-1.7 0-3.2-.4-4.6-1.1-1.9 4.4-6.2 7.4-11.3 7.4-5.3 0-9.8-3.4-11.5-8.1-.7.2-1.5.2-2.3.2C1.2 39 -4 33.7 -4 27.2c0-4.4 2.3-8.2 5.8-10.2-.7-1.7-1.1-3.5-1.1-5.4C.7 4.3 6.6-1.6 14-1.6c4.2 0 8 2 10 5z"
      transform="translate(3 3) scale(.83)"
      fill="#00a1e0"
    />
    <text x="29" y="24" fontSize="8.5" fill="#fff" textAnchor="middle" fontStyle="italic">salesforce</text>
  </svg>
);

export const MsSquaresIcon = (p: P) => (
  <svg viewBox="0 0 38 38" width={38} height={38} {...p}>
    <path d="M0 0h18v18H0z" fill="#f25022" />
    <path d="M20 0h18v18H20z" fill="#7fba00" />
    <path d="M0 20h18v18H0z" fill="#00a4ef" />
    <path d="M20 20h18v18H20z" fill="#ffb900" />
  </svg>
);

export const TableauIcon = (p: P) => (
  <svg viewBox="0 0 40 40" width={40} height={40} {...p}>
    <g strokeWidth="2.6" strokeLinecap="square">
      <path d="M20 12v16M12 20h16" stroke="#e8762d" />
      <path d="M20 3v8M16 7h8" stroke="#c72037" />
      <path d="M20 30v8M16 34h8" stroke="#5b6591" />
      <path d="M6 16v8M2 20h8" stroke="#59879b" />
      <path d="M34 16v8M30 20h8" stroke="#1f457e" />
      <path d="M9 5v6M6 8h6M31 5v6M28 8h6M9 29v6M6 32h6M31 29v6M28 32h6" stroke="#7199a6" strokeWidth="1.8" />
    </g>
  </svg>
);

export const PowerBiIcon = (p: P) => (
  <svg viewBox="0 0 40 40" width={40} height={40} {...p}>
    <path d="M8 18h5v18H8zM15 12h5v24h-5zM22 8h5v28h-5z" fill="#1b1e1a" />
    <path d="M29 4h3a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H12" fill="none" stroke="#1b1e1a" strokeWidth="2" />
  </svg>
);

export const CsvIcon = (p: P) => (
  <svg viewBox="0 0 32 40" width={32} height={40} {...p}>
    <path d="M2 0h21l9 9v29a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="#eeeff1" />
    <path d="M23 0l9 9h-7a2 2 0 0 1-2-2z" fill="#d5d7dc" />
    <path d="M9 9h14v12H9z" fill="#1d8f4e" />
    <path d="M11 11h3v2h-3zM15 11h3v2h-3zM19 11h2v2h-2zM11 14.5h3v2h-3zM15 14.5h3v2h-3zM19 14.5h2v2h-2zM11 18h3v1.5h-3zM15 18h3v1.5h-3z" fill="#fff" />
    <text x="16" y="32" fontSize="7" fill="#9ea0a8" textAnchor="middle">CSV</text>
  </svg>
);

export const VsCodeIcon = (p: P) => (
  <svg viewBox="0 0 36 36" width={36} height={36} {...p}>
    <path d="M26 2l8 4v24l-8 4L11 20l-6 5-3-1.5V12.5L5 11l6 5z" fill="#1f8ad2" />
    <path d="M26 2v32L11 20l-6 5V11l6 5z" fill="#0065a9" opacity=".25" />
    <path d="M26 10 15 18l11 8z" fill="#fff" />
  </svg>
);

export function ClaudeMark(p: P) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30 + (i % 2 ? 6 : 0));
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} {...p}>
      <g stroke="#d97757" strokeWidth="4" strokeLinecap="round">
        {rays.map((a) => {
          const r = (a * Math.PI) / 180;
          const l = a % 60 === 0 ? 21 : 18;
          return <line key={a} x1={(24 + Math.cos(r) * 4).toFixed(2)} y1={(24 + Math.sin(r) * 4).toFixed(2)} x2={(24 + Math.cos(r) * l).toFixed(2)} y2={(24 + Math.sin(r) * l).toFixed(2)} />;
        })}
      </g>
    </svg>
  );
}

export const CursorMark = (p: P) => (
  <svg viewBox="0 0 40 40" width={40} height={40} {...p}>
    <path d="M20 4 34 12v16L20 36 6 28V12z" fill="#6f7072" />
    <path d="M20 4 34 12 20 20 6 12z" fill="#e8e9ea" />
    <path d="M20 20 34 12v16L20 36z" fill="#3c3d3f" />
    <path d="M20 20 34 12 20 36z" fill="#b5b6b8" />
  </svg>
);

export const Heart = () => (
  <svg viewBox="0 0 70 64" width={70} height={64}>
    <path d="M35 64C14 48 0 36 0 18 0 7 8 0 18 0c8 0 13 4 17 10 4-6 9-10 17-10 10 0 18 7 18 18 0 18-14 30-35 46z" fill="#fed7de" />
  </svg>
);

export const Diamond = () => (
  <svg viewBox="0 0 70 62" width={70} height={62}>
    <path d="M14 0h42l14 18-35 44L0 18z" fill="#9df1c9" />
  </svg>
);

export const Star = () => (
  <svg viewBox="0 0 70 68" width={70} height={68}>
    <path d="M35 0l11 22 24 4-17 17 5 25-23-11-23 11 5-25L0 26l24-4z" fill="#c3e3fd" strokeLinejoin="round" stroke="#c3e3fd" strokeWidth="6" />
  </svg>
);

export const Blob = () => (
  <svg viewBox="0 0 64 66" width={64} height={66}>
    <path d="M26 0c20 2 38 16 38 38v28H4V20C4 8 14-1 26 0z" fill="#ebd7fe" />
  </svg>
);

export const LaLigaWhite = () => (
  <span className="flex items-center gap-[4px] text-[31px] font-bold tracking-[-0.5px] text-white">
    LaLiga
    <svg viewBox="0 0 40 40" width={40} height={40}>
      <circle cx="20" cy="20" r="18" fill="#fff" />
      <circle cx="20" cy="20" r="7" fill="#40107c" />
      <circle cx="20" cy="20" r="4" fill="#fff" />
      <path d="M20 2v8M20 30v8M2 20h8M30 20h8M7 7l6 6M27 27l6 6M33 7l-6 6M13 27l-6 6" stroke="#40107c" strokeWidth="2.4" />
    </svg>
  </span>
);

export const SynapticMark = () => (
  <span className="flex items-center gap-[12px] text-[31px] tracking-[0.3px] text-white">
    <svg viewBox="0 0 34 40" width={34} height={40}>
      <g stroke="#22d3ee" strokeWidth="4" strokeLinecap="round">
        <path d="M3 14v10M12 6v26M21 10v26M30 14v10" />
      </g>
    </svg>
    Synaptic
  </span>
);

export const EsomarMark = () => (
  <svg viewBox="0 0 96 22" width={96} height={22}>
    <text x="0" y="19" fontSize="22" fontWeight="800" fill="#ec662e" letterSpacing="-0.3">ESOMAR</text>
  </svg>
);
