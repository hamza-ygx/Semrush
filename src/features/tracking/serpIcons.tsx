import type { CSSProperties } from "react";

const paths: string[] = [
  "M2.5 12.5h11M3 11l-1-6 3.5 2.5L8 3l2.5 4.5L14 5l-1 6z",
  "M8 14s-4.5-4.3-4.5-7.5a4.5 4.5 0 0 1 9 0C12.5 9.7 8 14 8 14zM8 8.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z",
  "M3.5 14V5h9v9M6 14v-3h4v3M5.5 7h1M7.5 7h1M9.5 7h1M5.5 9h1M7.5 9h1M9.5 9h1M6 2v2M10 2v2M2 14h12",
  "M1.5 6.5 8 3.5l6.5 3L8 9.5zM4.5 8v3.5c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5V8M14.5 6.5v4",
  "M8 1.5 14.5 8 8 14.5 1.5 8zM8 5 11 8 8 11 5 8z",
  "M2.5 3.5h3M2.5 6.5h3M2.5 9.5h3M2.5 12.5h3M8 3.5h5.5M8 6.5h5.5M8 9.5h5.5M8 12.5h5.5",
  "M8 2l1.8 3.8 4.2.5-3.1 2.9.8 4.1L8 11.3l-3.7 2 .8-4.1L2 6.3l4.2-.5z",
  "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM8.8 4 5.5 8.8h2.7L7.2 12l3.3-4.8H7.8z",
  "M6.5 9.5l3-3M7 4.5l1.3-1.3a2.8 2.8 0 0 1 4 4L11 8.5M9 11.5l-1.3 1.3a2.8 2.8 0 0 1-4-4L5 7.5",
  "M2.5 3.5h11v9h-11zM6.8 6v4l3.2-2z",
  "M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM6.8 5.8v4.4L10.2 8z",
  "M3.5 2.5h7l2 2v9h-9zM5.5 6h3M5.5 8.5h5M5.5 11h5",
  "M2.5 3.5h11v4h-11zM2.5 10h11M2.5 12.5h7",
  "M2.5 2.5h11v8.5H6l-3.5 3zM8 4.5v3M8 9h0",
  "M2.5 2.5h11v11h-11zM2.5 10.5l3-3 3 3 2-2 3 3M10 5.5h.1",
  "M3 3l10 10M13 3 3 13",
  "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM6.3 6.2a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.5-.7 1v.6M8 11.3h0",
  "M14 2 2 7l5 2 2 5zM7 9l3.5-3.5",
  "M5.5 4.5v-2h5v2M2 4.5h12v9H2zM2 8h12",
  "M1.5 2.5h2l1.5 8h8l1.5-6H4M6 13.5h.1M12 13.5h.1",
  "M2 3h12v8H2zM6 14h4M8 11v3M5 5.5l1.5 3 1.5-3M9.5 5.5v3h1.5",
  "M2 3h12v8H2zM5 13.5h6M4.5 9l1.5-4 1.5 4M5 7.8h2M9.5 5v4h1.2a2 2 0 0 0 0-4z",
  "M2.5 4.5h7M2.5 8h5M2.5 11.5h4M11.5 8.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM11.5 10v1.5l1 .5",
  "M2.5 4.5h11v8h-11zM5.5 2l2.5 2.5L10.5 2M7 7v3.5l3-1.8z",
];

export function SerpFeatureIcon({ index, className = "", style }: { index: number; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} className={className} style={style}>
      <path d={paths[index % paths.length]} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
