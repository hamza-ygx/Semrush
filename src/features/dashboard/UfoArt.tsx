const P = "#b77ff9";
const K = "#191b23";

export function UfoArt() {
  return (
    <svg viewBox="0 0 235 260" width={235} height={260} aria-hidden="true">
      <g transform="translate(0 20)">
        <circle cx="117" cy="112" r="102" fill={P} />
        <rect x="6" y="122" width="14" height="6" fill={P} />
        <rect x="208" y="104" width="10" height="30" fill={P} />
      </g>
      <path d="M62 195 L70 250 L228 250 L190 180 Z" fill={P} />
      <g transform="translate(0 20)">
        <path d="M48 66 L64 205" stroke="#fff" strokeWidth="1.2" />
        <path d="M146 60 L188 168" stroke="#fff" strokeWidth="1.2" />
        <path d="M163 135 L195 182" stroke="#fff" strokeWidth="1.2" />
      </g>
      <ellipse
        cx="148"
        cy="245"
        rx="78"
        ry="9"
        fill="#fff"
        stroke={P}
        strokeWidth="1.5"
      />
      <path
        d="M92 247l3-6 3 5 2-4 3 5M137 245l3-4 3 4M183 242l3-5 3 4 3-4"
        fill="none"
        stroke={P}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <g>
        <circle cx="117" cy="95" r="6" fill="#fff" />
        <circle cx="129" cy="107" r="3.5" fill="#fff" />
        <circle cx="116" cy="80" r="2.5" fill="#fff" />
        <circle cx="77" cy="111" r="3" fill="#fff" />
        <circle cx="124" cy="129" r="2.5" fill="#fff" />
        <circle cx="81" cy="140" r="2" fill="#fff" />
        <circle cx="73" cy="153" r="1.6" fill="#fff" />
        <g transform="translate(0 -17) rotate(-14 80 58)">
          <path d="M52 44a28 24 0 0 1 56 0z" fill={K} />
          <path d="M60 40a20 17 0 0 1 22-15c-10 3-15 9-16 16z" fill={P} />
          <ellipse
            cx="80"
            cy="58"
            rx="66"
            ry="17"
            fill="#fff"
            stroke={K}
            strokeWidth="2"
          />
          <path
            d="M14 60a66 17 0 0 0 132 0"
            fill="none"
            stroke={K}
            strokeWidth="4"
          />
          <path d="M40 46h80v11c-20 5-60 5-80 0z" fill={P} />
          {[48, 62, 78, 94, 108].map((x) => (
            <circle
              key={x}
              cx={x}
              cy="51"
              r="2.6"
              fill="#fff"
              stroke={K}
              strokeWidth="0.8"
            />
          ))}
          <path
            d="M34 62l-6 4M52 66l-3 7M112 66l3 7M130 62l6 4"
            stroke={K}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g
        stroke={K}
        strokeWidth="1.1"
        strokeLinejoin="round"
        transform="translate(-24 -32) scale(1.2) rotate(-6 120 185)"
      >
        <path d="M172 146l6-10 5 3-7 11" fill={K} />
        <path
          d="M88 170c10-8 30-10 50-14 18-3 30-2 38 4 7 6 8 16 4 24l-5 12-4-2 1-11c-4 3-10 4-16 3l-4 13-5-1 1-12c-10 2-22 3-32 2l-4 20-6-1 1-19c-6 0-10-2-13-4l-3 14-5-1 2-16z"
          fill="#fff"
        />
        <path
          d="M110 164c10-3 22-4 30-3-2 8-10 12-20 11-6 0-10-4-10-8zM150 160c8-1 16 2 20 8-4 6-12 6-18 3zM99 180c6-2 10 4 8 12l-8 4c-4-4-4-12 0-16z"
          fill={K}
        />
        <path
          d="M60 170c4-6 14-10 24-8 8 2 10 10 6 16-3 5-10 7-16 6l-10 2c-6 1-9-5-4-10z"
          fill="#fff"
        />
        <circle cx="75" cy="172" r="2.8" fill={K} />
        <path d="M66 162l-4-6 6 2M82 160l3-6 3 5" fill="#fff" />
        <ellipse cx="60" cy="182" rx="7" ry="5" fill="#f5e7ff" />
      </g>
    </svg>
  );
}
