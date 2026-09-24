import { domain } from "./data";
import { graphCenter, graphEdges, graphH, graphNodes, graphW } from "./graphData";

export function GraphSvg({ scale = 1, x, y, label = 13, className = "" }: { scale?: number; x: number; y: number; label?: number; className?: string }) {
  const c = graphNodes[graphCenter];
  return (
    <svg width={graphW * scale} height={graphH * scale} viewBox={`0 0 ${graphW} ${graphH}`} className={`absolute ${className}`} style={{ left: x, top: y }}>
      <defs>
        <radialGradient id={`glow${scale}`}>
          <stop offset="0" stopColor="#8f9cff" stopOpacity={0.9} />
          <stop offset="1" stopColor="#8f9cff" stopOpacity={0} />
        </radialGradient>
      </defs>
      {graphEdges.map(([a, b], i) => (
        <line key={i} x1={graphNodes[a][0]} y1={graphNodes[a][1]} x2={graphNodes[b][0]} y2={graphNodes[b][1]} stroke="#dcdcdc" strokeWidth={1 / Math.max(scale, 0.6)} />
      ))}
      {graphNodes.map((n, i) => (i === graphCenter ? null : <circle key={i} cx={n[0]} cy={n[1]} r={n[2]} fill="#c4c4c4" />))}
      <circle cx={c[0]} cy={c[1]} r={9} fill={`url(#glow${scale})`} />
      <circle cx={c[0]} cy={c[1]} r={3.2} fill="#8591ff" />
      <text x={c[0]} y={c[1] - 11} textAnchor="middle" fontSize={label / scale} fontWeight={700} fill="#6167e6" stroke="#fff" strokeWidth={3 / scale} paintOrder="stroke" fontFamily="inherit">
        {domain}
      </text>
    </svg>
  );
}
