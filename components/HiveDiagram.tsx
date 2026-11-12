import { products } from "@/lib/projects";
import { ModuleIconPaths } from "./ModuleIcon";
import ParticleGlobe from "./ParticleGlobe";

// All five top-level products around the SeerHive core, with their full names (lib/projects).
// Lines are broken by hand so every name fits inside its hexagon.
const LINES: Record<string, string[]> = {
  seervoiz: ["SeerVoiz AI"],
  "recruit-ai": ["SeerHive", "Recruit AI"],
  invoicing: ["SeerHive", "Invoicing"],
  "data-ingestion": ["SeerHive", "Data Ingestion", "Pipeline"],
  "seer-hive": ["SeerHive", "HRMS + ATS"],
};
const modules = products.map((p) => ({ slug: p.iconSlug, lines: LINES[p.id] ?? [p.name] }));

const CX = 260;
const CY = 250;
const R = 190;

// Evenly spaced ring: node 0 at the top, going clockwise. Spacing follows the
// module count, so adding a product never stacks two nodes on the same spot.
const nodes = modules.map((m, i) => {
  const ang = ((2 * Math.PI) / modules.length) * i - Math.PI / 2;
  return {
    ...m,
    x: CX + R * Math.cos(ang),
    y: CY + R * Math.sin(ang),
  };
});

function Hex({
  x,
  y,
  size,
  fill,
  stroke,
}: {
  x: number;
  y: number;
  size: number;
  fill: string;
  stroke: string;
}) {
  const pts = [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const ang = (Math.PI / 3) * i - Math.PI / 2;
      return `${x + size * Math.cos(ang)},${y + size * Math.sin(ang)}`;
    })
    .join(" ");
  return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={1.5} />;
}

export default function HiveDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-square lg:-mt-[40px]">
      {/* Turning sphere of dots, centred on the diagram so it sits behind the SeerHive core. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[118%] opacity-80"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <ParticleGlobe />
      </div>
      <svg
        viewBox="0 -34 520 540"
        className="relative w-full h-full drop-shadow-[0_0_60px_rgba(10,108,255,0.15)]"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3f5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3f5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nodeFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0078C8" />
            <stop offset="100%" stopColor="#0078C8" />
          </linearGradient>
          <linearGradient id="coreFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0078C8" />
            <stop offset="55%" stopColor="#0078C8" />
            <stop offset="100%" stopColor="#0078C8" />
          </linearGradient>
        </defs>

        <circle cx={CX} cy={CY} r={230} fill="url(#coreGlow)" />

        {/* slow orbits around the hive */}
        <circle cx={CX} cy={CY} r={R + 52} fill="none" stroke="#22d3f5" strokeOpacity="0.28" strokeWidth={1} strokeDasharray="2 10" strokeLinecap="round" className="hd-orbit" />
        <circle cx={CX} cy={CY} r={R - 62} fill="none" stroke="#0a6cff" strokeOpacity="0.3" strokeWidth={1} strokeDasharray="4 12" strokeLinecap="round" className="hd-orbit hd-orbit--rev" />

        {/* connection lines from each module into the core */}
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={CX}
            y2={CY}
            stroke="#0230b5"
            strokeWidth={1.5}
            className="dash-flow"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}

        {/* module nodes */}
        {nodes.map((n, i) => {
          const LH = 14;
          const block = 18 + 4 + n.lines.length * LH;
          const top = n.y - block / 2;
          return (
            <g key={i} className="hd-node" style={{ animationDelay: `${i * 0.5}s` }}>
              <Hex x={n.x} y={n.y} size={64} fill="url(#nodeFill)" stroke="#22d3f5" />
              <svg
                x={n.x - 9}
                y={top}
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a0f4ff"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ModuleIconPaths slug={n.slug} />
              </svg>
              {n.lines.map((w, wi) => (
                <text
                  key={wi}
                  x={n.x}
                  y={top + 22 + wi * LH + 10}
                  textAnchor="middle"
                  fill="#ffffff"
                  style={{ font: "600 12px var(--font-body), sans-serif" }}
                >
                  {w}
                </text>
              ))}
            </g>
          );
        })}

        {/* core: SeerHive. White hexagon with the logo, set in a logo-blue frame */}
        <g className="hd-halo">
          <Hex x={CX} y={CY} size={86} fill="none" stroke="#22d3f5" />
        </g>
        <Hex x={CX} y={CY} size={80} fill="url(#coreFill)" stroke="#a0f4ff" />
        <Hex x={CX} y={CY} size={68} fill="#ffffff" stroke="none" />
        <image href="/logo.svg" x={CX - 19} y={CY - 40} width={38} height={40} />
        <text x={CX} y={CY + 27} textAnchor="middle" style={{ font: "800 18px var(--font-display), sans-serif", letterSpacing: "-0.01em" }}>
          <tspan fill="#08142e">Seer</tspan>
          <tspan fill="#0078C8">Hive</tspan>
        </text>
      </svg>
    </div>
  );
}
