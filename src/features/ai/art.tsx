const K = "#1a1a1a";
const sw = { stroke: K, strokeWidth: 2.2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export function ArtBrowserStars({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d="M8 38 30 30 34 6 52 24 76 14 70 40 94 56 66 62 60 92 44 72 16 84 22 58z" fill="#8cc7f5" />
      <rect x="10" y="30" width="62" height="54" rx="3" transform="rotate(-14 40 57)" fill="#4f9ff0" {...sw} />
      <path d="M12 44 70 30" transform="rotate(0)" {...sw} />
      <circle cx="18" cy="38" r="1.6" fill="#fff" />
      <circle cx="24" cy="36.5" r="1.6" fill="#fff" />
      <circle cx="30" cy="35" r="1.6" fill="#fff" />
      <path d="m36 52 3 6 6 1-4.5 4 1 6.5-5.5-3-5.5 3 1-6.5-4.5-4 6-1z" fill="#fff" />
      <path d="m56 50 2.2 4.5 5 .7-3.6 3.4.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.4 5-.7z" fill="#fff" />
      <path d="m28 66 1.6 3.2 3.5.5-2.5 2.4.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.4 3.5-.5z" fill="#fff" />
      <path d="M52 8c6-2 14-1 22 0l16 4-6 14c-3 6-8 6-12 2l-4 12c-1 3-5 3-6 0L58 22c-4-2-7-8-6-14z" fill="#8cc7f5" {...sw} />
      <path d="M62 24v10M68 26v8" {...sw} />
    </svg>
  );
}

export function ArtBinoculars({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d="M22 44c8-10 30-12 44-6s22 18 18 34c-2 12-14 22-30 22S20 88 16 76c-4-12-2-24 6-32z" fill="#b1a4ec" />
      <path d="M52 20c4-6 14-8 20-4l6 6c3 1 6 3 8 6-6 0-14-1-20 0z" fill="#b1a4ec" {...sw} />
      <path d="M58 30c6 2 12 8 12 16l-6 8-12-2z" fill="#fff" {...sw} />
      <path d="M40 58c4 10 4 22 2 36M52 54l4 40M46 58l-6 12" {...sw} />
      <path d="M40 58c-10 6-16 18-14 34h40c2-14-2-28-12-36z" fill="#b1a4ec" {...sw} />
      <path d="M50 58l-2 36" stroke={K} strokeWidth={4} />
      <ellipse cx="22" cy="32" rx="11" ry="14" fill="#fff" {...sw} />
      <ellipse cx="42" cy="30" rx="11" ry="14" fill="#fff" {...sw} />
      <ellipse cx="22" cy="32" rx="7" ry="10" fill="#fff" {...sw} />
      <ellipse cx="42" cy="30" rx="7" ry="10" fill="#fff" {...sw} />
      <path d="M19 36v-4M22 36v-7M25 36v-9M39 34l3-6 2 3 3-6" {...sw} strokeWidth={1.6} />
      <path d="M30 22h4M50 34l8 4" {...sw} />
    </svg>
  );
}

export function ArtTargetPin({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d="M20 40c6-20 30-30 50-20 18 8 26 26 24 44-4 18-22 30-44 30C28 92 14 70 20 40z" fill="#c9a6f5" />
      <path d="M22 72 58 58l26 10-34 22z" fill="#fff" {...sw} />
      <path d="M36 74c6-2 8 4 14 2s6-6 12-6" {...sw} strokeDasharray="3 3" />
      <path d="M56 70C40 50 38 42 38 32a18 18 0 0 1 36 0c0 10-4 18-18 38z" fill="#c9a6f5" {...sw} />
      <circle cx="56" cy="32" r="12" fill="#fff" {...sw} />
      <circle cx="56" cy="32" r="7" fill={K} />
      <circle cx="56" cy="32" r="3.5" fill="#fff" />
      <path d="M22 22 54 31" {...sw} />
      <path d="m18 17 5 5-3 3M16 24l6-2" {...sw} />
    </svg>
  );
}

export function ArtShieldHand({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d="M8 34 86 30v34c0 20-18 32-38 32S8 82 8 60z" fill="#f4a7f0" />
      <path d="M10 22c4-8 14-14 24-12l12 8-4 26-26 2c-4-8-8-16-6-24z" fill="#fff" {...sw} />
      <path d="M14 18c6 4 10 10 12 18M34 10c6 4 8 10 6 16" {...sw} />
      <path d="M40 46c-2 6 0 14 6 20l10 10c6 6 16 4 20-2l2-12c0-4-4-6-8-4l-2-6c-2-4-8-4-10 0l-2-4c-2-4-8-4-10 0L40 30c-2-4-8-4-8 0z" fill="#f4a7f0" {...sw} />
      <path d="M42 80 56 92l14-6" fill={K} {...sw} />
      <path d="m78 34 7 4 7-2-2 8 4 6-8 1-4 6-3-7-7-2 6-5z" fill="#fff" {...sw} />
    </svg>
  );
}

export function ArtChartScreen({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <circle cx="46" cy="52" r="40" fill="#9eaaf5" />
      <path d="M40 12c10-4 22-2 30 4" stroke="#9eaaf5" strokeWidth={6} fill="none" />
      <rect x="4" y="30" width="26" height="40" rx="2" fill="#dfe6ff" {...sw} />
      <path d="M9 40h16M9 46h16M9 52h12" stroke="#9eaaf5" strokeWidth={3} />
      <rect x="18" y="24" width="64" height="58" rx="3" fill="#dfe6ff" {...sw} />
      <rect x="24" y="30" width="52" height="46" fill={K} />
      <path d="M30 70V58M38 70V54M46 70V50M54 70V46M62 70V40M70 70V38M30 70h42" stroke="#c6f28a" strokeWidth={1.6} fill="none" />
      <path d="M30 54c10 0 20-6 32-18l6-4M64 30h6v6" stroke="#c6f28a" strokeWidth={2} fill="none" />
      <rect x="82" y="10" width="10" height="84" rx="2" fill="#dfe6ff" {...sw} />
      <rect x="84" y="46" width="6" height="28" rx="3" fill="#fff" {...sw} />
    </svg>
  );
}

export function ArtStopwatchGear({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <circle cx="56" cy="50" r="38" fill="#5de8c3" />
      <path d="M50 8c-4 0-6 2-6 6v6h14v-6c0-4-2-6-6-6z" fill="#5de8c3" {...sw} />
      <path d="m50 14 12-6M72 22l8-6 4 6-8 6" {...sw} />
      <path d="M54 20 60 22 66 20 70 26 76 28 76 34 82 40 78 46 82 52 76 58 76 64 70 66 66 72 60 70 54 74 48 70 42 72 38 66 32 64 32 58 26 52 30 46 26 40 32 34 32 28 38 26 42 20 48 22z" fill="#5de8c3" {...sw} />
      <circle cx="54" cy="47" r="18" fill="#fff" {...sw} />
      <path d="M54 36v11l6 6" {...sw} />
      <path d="M22 40c-4 10-2 24 8 32M86 60c-2 14-12 26-26 30M38 92h8" {...sw} strokeDasharray="4 4" />
      <path d="m22 38 2-8 6 4" {...sw} />
    </svg>
  );
}

export function ArtVolume({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d="M34 4h58v70H34z" fill="#d6c2fb" />
      <path d="M20 14h48v48H20z" fill="#d6c2fb" />
      <rect x="4" y="18" width="70" height="56" rx="3" transform="rotate(-10 40 46)" fill="#fff" {...sw} />
      <path d="M6 32 72 20" transform="rotate(0)" {...sw} />
      <path d="M4 20 72 8l2 12L6 32z" fill={K} />
      <circle cx="12" cy="24" r="1.8" fill="#fff" />
      <circle cx="18" cy="23" r="1.8" fill="#fff" />
      <path d="M20 44 30 42 32 62 22 64z" fill="#fff" {...sw} />
      <path d="M22 50l8-2M22 56l8-2" {...sw} strokeWidth={1.6} />
      <path d="M38 38 48 36 52 58 42 60zM56 36 64 34 68 56 60 58z" fill="#e5d8fd" {...sw} />
      <circle cx="80" cy="66" r="16" fill="#e5d8fd" {...sw} />
      <path d="M72 74v-4M78 74v-8M84 74V60" {...sw} strokeWidth={3} />
    </svg>
  );
}

export function ArtDifficulty({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d="M26 8h44v20h26v44H70v20H26V72H4V28h22z" fill="#9eaaf5" />
      <path d="M30 96c0-8 8-14 18-14s18 6 18 14" fill="#fff" {...sw} />
      <path d="M48 80 38 60M58 58 72 44" stroke="#b9c3f7" strokeWidth={8} strokeLinecap="round" />
      <path d="M48 80 38 60M58 58 72 44" {...sw} />
      <circle cx="30" cy="30" r="18" fill="#dfe6ff" {...sw} />
      <circle cx="30" cy="30" r="12" fill="#b9c3f7" {...sw} />
      <path d="m42 44 16 14" stroke={K} strokeWidth={5} strokeLinecap="round" />
      <rect x="38" y="46" width="22" height="10" rx="3" transform="rotate(40 49 51)" fill="#fff" {...sw} />
      <circle cx="68" cy="36" r="7" fill={K} />
      <circle cx="70" cy="30" r="8" fill="#fff" {...sw} />
      <circle cx="80" cy="62" r="12" fill="#fff" {...sw} />
      <circle cx="80" cy="62" r="7" fill="#fff" {...sw} />
      <circle cx="64" cy="64" r="7" fill={K} />
    </svg>
  );
}

export function ArtIntent({ size = 100 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <path d="M50 6c26 0 46 20 46 46v44H30z" fill="#fca25e" />
      <rect x="6" y="10" width="66" height="84" rx="4" fill="#fca25e" {...sw} />
      <rect x="12" y="14" width="26" height="28" rx="2" fill="#fca25e" {...sw} />
      <rect x="42" y="12" width="26" height="30" rx="2" fill="#fca25e" {...sw} />
      <rect x="12" y="48" width="26" height="36" rx="2" fill="#fca25e" {...sw} />
      <path d="M18 36V26M24 36V22M30 36V28" stroke={K} strokeWidth={3} />
      <circle cx="54" cy="26" r="8" fill="#fff" {...sw} />
      <path d="M54 18v8h8" fill={K} />
      <path d="M25 60c-4 0-7 3-7 7 0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" fill="#fff" {...sw} />
      <circle cx="25" cy="67" r="2.2" fill={K} />
      <path d="M58 40c0-4 6-4 6 0v14l4-2c3-1 6 0 6 3v10c4 0 6 3 6 6l-2 10c-1 4-4 6-8 6H62c-4 0-6-2-8-5l-8-12c-2-3 2-6 5-4l7 6z" fill="#fca25e" {...sw} />
      <path d="M68 92 92 76l6 8-22 14z" fill={K} />
    </svg>
  );
}
