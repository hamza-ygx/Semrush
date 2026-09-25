export function monotonePath(pts: [number, number][]) {
  const n = pts.length;
  if (n < 2) return "";
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1][0] - pts[i][0]);
    m.push((pts[i + 1][1] - pts[i][1]) / dx[i]);
  }
  const t: number[] = [m[0]];
  for (let i = 1; i < n - 1; i++) {
    if (m[i - 1] * m[i] <= 0) t.push(0);
    else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      t.push((w1 + w2) / (w1 / m[i - 1] + w2 / m[i]));
    }
  }
  t.push(m[n - 2]);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${(pts[i][0] + h).toFixed(1)} ${(pts[i][1] + t[i] * h).toFixed(1)} ${(pts[i + 1][0] - h).toFixed(1)} ${(pts[i + 1][1] - t[i + 1] * h).toFixed(1)} ${pts[i + 1][0].toFixed(1)} ${pts[i + 1][1].toFixed(1)}`;
  }
  return d;
}

export function TrendChart({
  series,
  labels,
  ticks,
  width,
  height,
  plot,
  x0,
  x1,
  axis = "right",
  labelY,
  curve = "smooth",
  strokeWidth = 2.5,
  labelFont = 12,
  labelAt,
}: {
  series: { color: string; data: number[] }[];
  labels: string[];
  ticks: number[];
  width: number;
  height: number;
  plot: { left: number; right: number; top: number; bottom: number };
  x0: number;
  x1: number;
  axis?: "left" | "right";
  labelY: number;
  curve?: "smooth" | "linear";
  strokeWidth?: number;
  labelFont?: number;
  labelAt?: number[];
}) {
  const max = ticks[ticks.length - 1];
  const min = ticks[0];
  const y = (v: number) => plot.bottom - ((v - min) / (max - min)) * (plot.bottom - plot.top);
  const n = Math.max(...series.map((s) => s.data.length));
  const x = (i: number) => x0 + (i * (x1 - x0)) / (n - 1);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" className="block overflow-visible">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={plot.left} x2={plot.right} y1={y(t)} y2={y(t)} stroke={t === min ? "#d6d8d7" : "#e8e9ec"} />
          <text
            x={axis === "right" ? plot.right + 16 : plot.left - 12}
            y={y(t) + 4}
            textAnchor={axis === "right" ? "start" : "end"}
            fontSize={labelFont}
            fill="#6a6c6a"
          >
            {t}
          </text>
        </g>
      ))}
      {labels.map((l, i) =>
        l ? (
          <text key={i} x={labelAt ? labelAt[i] : x(i)} y={labelY} textAnchor="middle" fontSize={labelFont} fill="#6a6c6a">
            {l}
          </text>
        ) : null,
      )}
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => [x(i), y(v)] as [number, number]);
        const d = curve === "smooth" ? monotonePath(pts) : pts.map(([a, b], i) => `${i ? "L" : "M"}${a} ${b}`).join("");
        return <path key={si} d={d} fill="none" stroke={s.color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />;
      })}
    </svg>
  );
}
