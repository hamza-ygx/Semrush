import type { ReactNode, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const V = "#7038e0";
const pink = "#f06f8f";
const green = "#3fcf9f";
const orange = "#f4a35a";
const teal = "#5ad3e8";
const line = { fill: "none", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const icons: Record<string, ReactNode> = {
  start: (
    <>
      <path d="M28 8.5A15 15 0 1 0 34.5 19" stroke={V} {...line} />
      <path d="M13 17.5c.8-1.3 2.6-1.3 3.4 0M21.5 17.5c.8-1.3 2.6-1.3 3.4 0M13.5 23.5c2.8 3 8 3 10.8 0" stroke={V} {...line} />
      <path d="M32 11.5c-2.5-1.8-5-3.4-5-5.7 0-1.6 1.2-2.6 2.5-2.6 1 0 1.8.5 2.5 1.4.7-.9 1.5-1.4 2.5-1.4 1.3 0 2.5 1 2.5 2.6 0 2.3-2.5 3.9-5 5.7z" stroke={pink} {...line} />
    </>
  ),
  howto: (
    <>
      <circle cx="7" cy="7" r="2.6" stroke={V} {...line} />
      <path d="M7 9.6V30M7 30h6M16 24V10a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v12" stroke={V} {...line} />
      <circle cx="16" cy="18" r="2.6" stroke={V} {...line} />
      <path d="M16 20.6V27a3 3 0 0 1-3 3" stroke={V} {...line} />
      <path d="m25.5 29 3 3 6-6.5" stroke={green} {...line} />
    </>
  ),
  billing: (
    <>
      <path d="M26 6H5v20h26v-6" stroke={V} {...line} />
      <path d="M9.5 11h9M9.5 15.5h6M9.5 20h9M18 26v6M12 33h12" stroke={V} {...line} />
      <circle cx="30" cy="9" r="3" stroke={orange} {...line} />
      <path d="M24.5 18.5c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" stroke={orange} {...line} />
    </>
  ),
  seo: (
    <>
      <path d="m23 3.5 2.3 3.2 3.8-.8.6 3.9 3.6 1.4-1.4 3.6 2.6 2.9-3.2 2.3.8 3.8-3.9.6-1.4 3.6" stroke={V} {...line} />
      <path d="M16.5 10.5 17 7l3.7.3" stroke={V} {...line} />
      <circle cx="13" cy="21" r="7.2" stroke={teal} {...line} />
      <path d="m18.2 26.2 5.3 5.3M9.5 21a3.5 3.5 0 0 1 3.5-3.5" stroke={teal} {...line} />
    </>
  ),
  ai: (
    <>
      <path d="M24 6H5v20h26v-5" stroke={V} {...line} />
      <path d="M9.5 11h10M9.5 15.5h7M9.5 20h9M18 26v6M12 33h12" stroke={V} {...line} />
      <path d="M29 10c.4 2.8 1.6 4 4.4 4.4-2.8.4-4 1.6-4.4 4.4-.4-2.8-1.6-4-4.4-4.4 2.8-.4 4-1.6 4.4-4.4zM34.5 3.5c.2 1.3.8 1.9 2.1 2.1-1.3.2-1.9.8-2.1 2.1-.2-1.3-.8-1.9-2.1-2.1 1.3-.2 1.9-.8 2.1-2.1z" stroke={teal} {...line} strokeWidth={1.8} />
    </>
  ),
  local: (
    <>
      <path d="M19 35.5S6 25.5 6 15.5a13 13 0 0 1 26 0c0 10-13 20-13 20z" stroke={V} {...line} />
      <circle cx="18" cy="14.5" r="6" stroke={green} {...line} />
      <path d="m22.5 19 4.5 4.5" stroke={green} {...line} />
    </>
  ),
  traffic: (
    <>
      <path d="M14 5H6v29h24v-6" stroke={V} {...line} />
      <path d="m10 25 4.5-4 3.5 2.5 4.5-4" stroke={V} {...line} />
      <circle cx="25" cy="10" r="6" stroke={teal} {...line} />
      <path d="m29.5 14.5 5 5M22 10a3 3 0 0 1 3-3" stroke={teal} {...line} />
    </>
  ),
  ad: (
    <>
      <path d="M31.5 12A15 15 0 1 0 22 33.2" stroke={V} {...line} />
      <path d="M22.2 12.5c-1-1.5-2.6-2-4.2-2-2.3 0-4 1.2-4 3 0 4.4 8.5 2.5 8.5 7 0 2-1.8 3.3-4.3 3.3-1.9 0-3.6-.8-4.5-2.3M18 8v2.5M18 23.8v2.7" stroke={V} {...line} />
      <path d="m23 17 13 4.8-5.6 1.8 4.6 4.6-2.2 2.2-4.6-4.6-1.8 5.6z" stroke={V} {...line} />
    </>
  ),
  content: (
    <>
      <path d="M26 6H6v28h22V22" stroke={V} {...line} />
      <path d="M11 12h10M11 17h6" stroke={V} {...line} />
      <path d="M32.5 5.5 36 9 22 23l-5 1.5 1.5-5z" stroke={V} {...line} />
      <path d="M11 24h4" stroke={V} {...line} />
    </>
  ),
  social: (
    <>
      <path d="M17 8H5v20h7v6l6-6h16V21" stroke={V} {...line} />
      <path d="M9.5 14.5h6M9.5 19h9M9.5 23.5h6" stroke={V} {...line} />
      <path d="M22.5 13.5v8h9.3c1 0 1.7-.6 1.9-1.5l1.1-5c.2-1.2-.7-2.2-1.9-2.2H29l.6-4.3c.2-1.8-1-3.2-2.7-3.4l-3.4 7.4zM22.5 13.5h-1.5" stroke={green} {...line} />
    </>
  ),
  team: (
    <>
      <path d="M15.5 30.5v-3.2c0-2-1-3.3-2.2-4.6A10.3 10.3 0 1 1 30 18" stroke={V} {...line} />
      <path d="M15.5 34.5h7M15.5 30.5h7M5 6.5l2.5 2M12 2v3M2.5 13.5h3" stroke={V} {...line} />
      <circle cx="29" cy="21" r="3" stroke={orange} {...line} />
      <path d="M23.5 30.5c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" stroke={orange} {...line} />
    </>
  ),
  apps: (
    <>
      <path d="M22 34H5V5h29v17" stroke={V} {...line} />
      <path d="M10 10h7v7h-7zM22 10h7v7h-7zM10 22h7v7h-7z" stroke={V} {...line} />
      <path d="m28.5 21.5 6 6-6 6-6-6z" stroke={green} {...line} />
    </>
  ),
};

export function KbIcon({ name, ...p }: P & { name: string }) {
  return (
    <svg viewBox="0 0 38 38" width={42} height={42} aria-hidden {...p}>
      {icons[name]}
    </svg>
  );
}

const ink = "#0f0f0f";
const stroke = { fill: "none", stroke: ink, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function TrainingArt(p: P) {
  return (
    <svg viewBox="0 0 250 215" width={250} height={215} aria-hidden {...p}>
      <path d="M22 60c0-12 8-20 22-20h124l22-18v18c26 2 44 18 44 44v131H22z" fill="#fde94a" />
      <path d="M58 40h118a8 8 0 0 1 8 8v170H50V48a8 8 0 0 1 8-8z" {...stroke} fill="#fff" />
      <path d="M184 58v160" {...stroke} strokeWidth={6} />
      <circle cx="64" cy="50" r="4" {...stroke} strokeWidth={2.2} />
      <circle cx="76" cy="50" r="4" {...stroke} strokeWidth={2.2} />
      <path d="M68 215c0-40 18-60 58-62 40 2 58 22 58 62z" {...stroke} fill="#fff" />
      <path d="M104 150c-6-12-8-28-6-46l30-4c2 16 4 32 12 50" {...stroke} fill="#fde94a" />
      <path d="M92 116c-10-30-4-66 24-72 28-6 46 14 44 44-2 22 4 38 12 48-18 6-32-6-36-20" {...stroke} fill="#fff" />
      <path d="M92 116c8-10 12-30 10-52 14 6 26 6 34 2" {...stroke} />
      <path d="M104 118c4 4 10 6 16 4" {...stroke} strokeWidth={2.4} />
      <path d="M86 106h-4" {...stroke} />
      <path d="M126 152c0 16 0 24 0 30" {...stroke} strokeWidth={2.2} />
      <circle cx="104" cy="186" r="11" {...stroke} fill="#fde94a" strokeWidth={2.4} />
      <circle cx="104" cy="186" r="4" {...stroke} fill="#fff" strokeWidth={2} />
      <path d="M8 72h52a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H22l-8 8v-8H8a4 4 0 0 1-4-4V76a4 4 0 0 1 4-4z" {...stroke} fill="#fff" strokeWidth={2.6} />
      <circle cx="18" cy="88" r="4" fill={ink} />
      <circle cx="32" cy="88" r="4" fill={ink} />
      <circle cx="46" cy="88" r="4" fill={ink} />
      <circle cx="190" cy="118" r="15" {...stroke} fill="#fff" strokeWidth={2.6} />
      <path d="M190 126c-5-3-8-6-8-9 0-2 1.5-3.5 3.5-3.5 2 0 3.5 1.5 4.5 3 1-1.5 2.5-3 4.5-3s3.5 1.5 3.5 3.5c0 3-3 6-8 9z" fill={ink} />
      <circle cx="184" cy="156" r="13" {...stroke} fill="#fff" strokeWidth={2.6} />
      <path d="M184 163c-4-2.5-7-5-7-7.5 0-1.8 1.3-3 3-3 1.7 0 3 1.3 4 2.5 1-1.2 2.3-2.5 4-2.5s3 1.2 3 3c0 2.5-3 5-7 7.5z" fill={ink} />
    </svg>
  );
}

export function KnowledgeArt(p: P) {
  return (
    <svg viewBox="0 0 100 100" width={100} height={100} aria-hidden {...p}>
      <path d="M22 4l14 8 16-8 12 10 18-2 2 18 12 14-8 14 6 18-18 6-8 16-16-6-16 8-10-14-18-2 2-18L2 52l10-12-4-18 18-2z" fill="#b07cf3" />
      <rect x="12" y="24" width="56" height="50" rx="10" fill={ink} />
      <rect x="18" y="20" width="56" height="50" rx="10" {...stroke} fill="#fff" strokeWidth={2.4} />
      <path d="M38 34v20l16-10z" {...stroke} fill="#b07cf3" strokeWidth={2.2} />
      <path d="M50 48 72 26M50 48 62 62M50 48 40 70" {...stroke} strokeWidth={1.8} />
      <circle cx="72" cy="26" r="3" {...stroke} fill="#fff" strokeWidth={1.8} />
      <rect x="37" y="68" width="6" height="6" {...stroke} fill="#fff" strokeWidth={1.6} />
      <path d="M58 58l14 14 10 12-8 6-10-14z" fill={ink} />
    </svg>
  );
}

export function BlogArt(p: P) {
  return (
    <svg viewBox="0 0 100 100" width={100} height={100} aria-hidden {...p}>
      <path d="M30 8c10-6 24 0 32 4 12-4 26 4 26 18 10 8 12 22 4 32 2 14-10 24-22 22-8 12-26 12-34 2-14 2-26-8-24-22C2 54 2 38 12 32 10 20 18 10 30 8z" fill="#b8f36a" />
      <path d="M8 22 60 14l6 42-50 8z" {...stroke} fill="#fff" strokeWidth={2} />
      <path d="M14 26 66 18l6 42-50 8z" {...stroke} fill="#fff" strokeWidth={2} />
      <path d="M20 30 76 22l8 44-56 8z" {...stroke} fill="#fff" strokeWidth={2.2} />
      <path d="M21 38 77 30" {...stroke} strokeWidth={2} />
      <circle cx="27" cy="34" r="2" {...stroke} strokeWidth={1.6} />
      <path d="M36 44 66 40l3 20-30 4z" {...stroke} fill="#b8f36a" strokeWidth={1.8} />
      <path d="M42 60l8-10 5 6 4-4 7 8z" fill={ink} />
      <circle cx="44" cy="49" r="2.6" fill={ink} />
      <path d="M14 96c10-12 22-18 34-16 8-4 18-6 26-6 4 0 4 4 0 6-6 4-14 8-22 10-10 4-22 6-38 6z" {...stroke} fill="#fff" strokeWidth={2} />
      <path d="M14 96c8-10 18-14 30-14l-6 14z" fill={ink} />
    </svg>
  );
}

export function AcademyArt(p: P) {
  return (
    <svg viewBox="0 0 104 92" width={104} height={92} aria-hidden {...p}>
      <path d="M20 12h82v44c0 20-16 36-40 36S20 76 20 56z" fill="#6fd4fb" />
      <path d="M40 4 90 12 76 46 22 34z" {...stroke} fill="#fff" strokeWidth={2.2} />
      <path d="M22 34 18 36M76 46l-2 3" {...stroke} strokeWidth={2} />
      <path d="M40 40c0 10 6 16 18 18l16-10" fill={ink} />
      <path d="M22 36v28" {...stroke} strokeWidth={1.8} />
      <path d="M22 64c-2 3-2 6 0 8 2-2 2-5 0-8z" fill={ink} />
      <path d="M66 50c6-4 10-2 12 2l4 14c6 0 12 4 20 12l-8 12c-8-6-16-10-22-14-4-2-6-8-6-16z" {...stroke} fill="#fff" strokeWidth={2} />
      <path d="M70 62h8M70 68h8M72 74h7" {...stroke} strokeWidth={1.6} />
      <path d="M94 90l10-12v14z" fill={ink} />
    </svg>
  );
}

export function SupportArt(p: P) {
  return (
    <svg viewBox="0 0 330 330" width={330} height={330} aria-hidden {...p}>
      <circle cx="170" cy="190" r="140" fill="#fde94a" />
      <path d="M36 150c0-16 6-24 22-24" {...stroke} />
      <circle cx="70" cy="58" r="22" {...stroke} fill="#fde94a" />
      <path d="M58 70c2-10 22-10 24 0v6H58z" fill={ink} />
      <circle cx="70" cy="54" r="7" {...stroke} fill="#fff" strokeWidth={2.4} />
      <circle cx="268" cy="54" r="22" {...stroke} fill="#fde94a" />
      <path d="M256 66c2-10 22-10 24 0v6h-24z" {...stroke} fill="#fff" strokeWidth={2.4} />
      <circle cx="268" cy="50" r="7" {...stroke} fill="#fff" strokeWidth={2.4} />
      <ellipse cx="30" cy="100" rx="12" ry="8" {...stroke} fill="#fff" strokeWidth={2.4} transform="rotate(-30 30 100)" />
      <ellipse cx="300" cy="104" rx="14" ry="11" {...stroke} fill="#fff" strokeWidth={2.4} />
      <circle cx="168" cy="16" r="18" fill={ink} />
      <path d="M118 90c0-40 22-62 50-62s50 22 50 62" {...stroke} fill="#fde94a" />
      <path d="M118 70h100v22H118z" fill={ink} />
      <path d="M124 84c8-8 30-12 44-12s36 4 44 12" {...stroke} fill="#fff" strokeWidth={2.4} />
      <path d="M130 100c0 40 16 62 38 62s38-22 38-62" {...stroke} fill="#fde94a" />
      <path d="M150 130c6 4 14 4 20 0" {...stroke} strokeWidth={2.4} />
      <ellipse cx="170" cy="142" rx="8" ry="6" fill={ink} />
      <path d="M130 120c10 10 20 16 30 16" {...stroke} strokeWidth={2.4} />
      <path d="M138 160 128 176h80l-10-16z" {...stroke} fill="#fff" strokeWidth={2.4} />
      <path d="M150 166h36v120h-36z" fill={ink} />
      <path d="M70 150c-10-30-8-60 6-64 8-2 10 10 12 22l6-30c2-8 12-6 12 2l-2 34 8-36c2-8 12-6 12 2l-4 38 10-26c4-6 12-2 10 6l-14 48c10 8 18 20 22 30" {...stroke} fill="#fde94a" />
      <path d="M270 150c10-30 8-60-6-64-8-2-10 10-12 22l-6-30c-2-8-12-6-12 2l2 34-8-36c-2-8-12-6-12 2l4 38-10-26c-4-6-12-2-10 6l14 48c-10 8-18 20-22 30" {...stroke} fill="#fde94a" />
      <path d="M66 180c-10 24-6 70 6 90h36c10-22 14-60 6-94 0-14 2-24 24-26" {...stroke} fill="#fff" />
      <path d="M274 180c10 24 6 70-6 90h-36c-10-22-14-60-6-94 0-14-2-24-24-26" {...stroke} fill="#fff" />
      <path d="M62 188c14 6 36 6 50-2M278 188c-14 6-36 6-50-2" {...stroke} strokeWidth={2.4} />
      <path d="M86 268 70 300h200l-16-32z" {...stroke} fill="#fde94a" />
      <rect x="138" y="274" width="64" height="14" rx="3" {...stroke} fill="#fde94a" strokeWidth={2.4} />
      <path d="M44 300h252v10H44z" {...stroke} fill="#fde94a" />
      <path d="M44 310h252l-24 20H68z" fill={ink} />
    </svg>
  );
}

export function FollowIcon({ name, ...p }: P & { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden {...p}>
      {name === "x" && <path d="M3 3h5.2l4.3 6 5.2-6h2.1l-6.4 7.4L20.9 21h-5.2l-4.6-6.4L5.5 21H3.4l6.8-7.8zm3 1.5 10.4 15h1.6L7.6 4.5z" />}
      {name === "facebook" && <path d="M13.5 22v-8.5h2.8l.4-3.3h-3.2V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.6a23 23 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22z" />}
      {name === "instagram" && (
        <path
          fillRule="evenodd"
          d="M7.5 2.5h9a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3zM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM17.3 5.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
        />
      )}
      {name === "youtube" && <path fillRule="evenodd" d="M2.2 7.4c.2-1.5 1.3-2.6 2.8-2.7C7.2 4.5 9.6 4.4 12 4.4s4.8.1 7 .3c1.5.1 2.6 1.2 2.8 2.7.2 1.5.3 3 .3 4.6s-.1 3.1-.3 4.6c-.2 1.5-1.3 2.6-2.8 2.7-2.2.2-4.6.3-7 .3s-4.8-.1-7-.3c-1.5-.1-2.6-1.2-2.8-2.7C2 15.1 2 13.6 2 12s0-3.1.2-4.6zM10 8.7v6.6l5.6-3.3z" />}
    </svg>
  );
}
