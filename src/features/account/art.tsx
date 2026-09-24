const Y = "#fde34f";
const K = "#1b1c22";

export function PeopleArt() {
  return (
    <svg viewBox="0 0 210 210" width={210} height={210} aria-hidden>
      <path
        d="M105 3c18 0 26 12 40 16 14 4 27 0 35 10 8 11 2 25 8 37 6 13 21 20 21 37 0 16-15 23-21 36-6 13 0 26-8 37-8 10-21 7-35 10-14 4-22 16-40 16s-26-12-40-16c-14-3-27 0-35-10-8-11-2-24-8-37C16 126 1 119 1 103c0-17 15-24 21-37 6-12 0-26 8-37 8-10 21-6 35-10 14-4 22-16 40-16z"
        fill={Y}
      />
      <path d="M22 146c4-10 14-17 26-20l24-4 10 70H24z" fill={K} />
      <path d="M40 62c-10 10-12 32-4 48 5 9 14 13 24 12l14-6-6-54c-10-7-20-6-28 0z" fill="#fff" stroke={K} strokeWidth={1.5} />
      <path d="M44 80c3 16 12 26 24 28l8-20-6-24c-12 0-20 6-26 16z" fill={Y} />
      <path d="M50 100c3 3 7 3 10 0" fill="none" stroke={K} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M150 58c14-4 28 2 30 16 1 10-4 20-10 26l-26-2z" fill={K} />
      <path d="M146 72c-4 16-1 32 8 40 10 6 22 2 26-10l-4-30c-10-6-22-6-30 0z" fill={Y} />
      <path d="M160 94c3 3 7 3 10 0" fill="none" stroke={K} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M140 120c14 2 30 8 42 22l-10 50h-40z" fill="#fff" stroke={K} strokeWidth={1.2} />
      <path d="M80 40c4-14 18-22 32-18 14 3 22 16 20 30l-2 18H84z" fill={K} />
      <path d="M84 56c-2 20 2 40 22 44 20-4 24-24 22-44-8-6-18-8-22-8s-14 2-22 8z" fill={Y} />
      <path d="M84 70c0 22 6 44 22 48 16-4 22-26 22-48-4 10-12 14-22 14s-18-4-22-14z" fill={K} />
      <path d="M100 84c4 3 8 3 12 0" fill="none" stroke={Y} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M112 32a5 5 0 1 0 6 6" fill="none" stroke={Y} strokeWidth={1.4} />
      <path d="M58 150c10-14 26-20 48-20s38 6 48 20l4 60H54z" fill={Y} stroke={K} strokeWidth={1.2} />
      <path d="M86 130c4 8 12 10 20 10s16-2 20-10" fill="none" stroke={K} strokeWidth={3} />
      <path d="M72 186v12M140 186v12" stroke={K} strokeWidth={1.2} />
    </svg>
  );
}

export function ApiKeyArt() {
  return (
    <svg viewBox="0 0 170 180" width={170} height={180} aria-hidden>
      <path d="M58 30 150 4l-6 120-100 20z" fill="#b5c3ff" />
      <path d="M64 12c-2-6 4-10 8-6l4 8M74 14c6 12 10 24 20 30M92 44c16 6 28 6 38-2M128 30c2-6 8-6 10 0l-2 12" fill="none" stroke={K} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M92 42c-8 6-10 18-4 30l32-4c4-10 2-20-6-26z" fill="#fff" stroke={K} strokeWidth={1.5} />
      <circle cx="86" cy="40" r="12" fill="#fff" stroke={K} strokeWidth={1.5} />
      <path d="M76 36c2-10 14-12 20-4-6 0-12 2-20 4z" fill={K} />
      <path d="M86 72c-6 10-6 24 0 34l-16 32 12 4 22-34 14 30 12-4-10-40c-4-12-18-18-34-22z" fill={K} />
      <path d="M62 136c-6 2-8 14 0 16 6 0 10-6 10-12zM112 144c-4 4 0 16 8 14 6-2 6-10 2-14z" fill="#b5c3ff" stroke={K} strokeWidth={1.4} />
      <g transform="rotate(-4 85 104)">
        <rect x="16" y="94" width="160" height="22" rx="3" fill="#fff" stroke={K} strokeWidth={1.4} />
        <rect x="128" y="97" width="44" height="16" rx="2" fill={K} />
        <text x="150" y="108" fontSize="6" fill="#fff" textAnchor="middle" fontWeight={700}>
          COPY
        </text>
        <text x="24" y="109" fontSize="8" fill={K}>
          *************8bec
        </text>
      </g>
    </svg>
  );
}

export function MagnifierArt() {
  return (
    <svg viewBox="0 0 84 84" width={84} height={84} aria-hidden>
      <rect x="12" y="10" width="58" height="62" rx="4" fill="#d6d8de" transform="rotate(-12 41 41)" />
      <rect x="10" y="14" width="58" height="60" rx="4" fill="#f3f4f7" stroke="#8a8e9b" strokeWidth={1.2} transform="rotate(-6 39 44)" />
      <circle cx="44" cy="34" r="16" fill="#fff" stroke="#6c6e79" strokeWidth={3} />
      <path d="M52 46 66 64" stroke="#6c6e79" strokeWidth={6} strokeLinecap="round" />
      <path d="M36 28c3-4 8-5 12-3" fill="none" stroke="#c4c7cf" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function AppsEmptyArt({ width = 346, height = 266 }: { width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 346 266" width={width} height={height} className="shrink-0" aria-hidden>
      <rect x="0.5" y="0.5" width="345" height="265" rx="8" fill="#fff" stroke="#d6d8e1" />
      <path d="M1 9a8 8 0 0 1 8-8h328a8 8 0 0 1 8 8v8H1z" fill="#e0e1e9" />
      <circle cx="322" cy="9" r="1.8" fill="#fff" />
      <circle cx="329" cy="9" r="1.8" fill="#fff" />
      <circle cx="336" cy="9" r="1.8" fill="#fff" />
      <rect x="16" y="36" width="128" height="10" rx="5" fill="#e0e1e9" />
      <path d="M1 65h344" stroke="#e0e1e9" />
      <rect x="16.5" y="80.5" width="310" height="161" rx="6" fill="#fff" stroke="#d6d8e1" />
      <circle cx="39" cy="103" r="11" fill="#e0e1e9" />
      <rect x="60" y="92" width="104" height="6" rx="3" fill="#e0e1e9" />
      <rect x="60" y="108" width="74" height="6" rx="3" fill="#e0e1e9" />
      <rect x="200" y="92" width="114" height="22" rx="4" fill="#8a8e9b" />
      <text x="257" y="107.5" textAnchor="middle" fontSize="13" fill="#fff">
        Revoke access
      </text>
      <path d="M17 126h310" stroke="#e0e1e9" />
      <rect x="28" y="150" width="208" height="6" rx="3" fill="#e0e1e9" />
      <rect x="28" y="166" width="171" height="6" rx="3" fill="#e0e1e9" />
      <rect x="28" y="182" width="287" height="38" rx="5" fill="#f3f4f7" />
      <path d="M17 262v-6a6 6 0 0 1 6-6h298a6 6 0 0 1 6 6v6" fill="none" stroke="#d6d8e1" />
    </svg>
  );
}
