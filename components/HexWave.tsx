"use client";

import { useEffect, useId, useMemo, useRef } from "react";

export type Speaker = "agent" | "caller" | "idle";

const SIDES = 6;
const PER_SIDE = 9;
const CX = 150;
const CY = 150;
const R = 78; // hexagon the bars stand on
const MAX_LEN = 46;
const MIN_LEN = 4;

const COLOR: Record<Speaker, string> = {
  agent: "#22d3f5",
  caller: "#6fb0ff",
  idle: "#2a407a",
};

// On a themed (light or dark) surface the meter reads the site's own colour tokens instead.
const THEMED: Record<Speaker, string> = {
  agent: "rgb(var(--aqua))",
  caller: "rgb(var(--azure-soft))",
  idle: "rgb(var(--border))",
};

function hexPoints(r: number) {
  return Array.from({ length: SIDES }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
  });
}

/**
 * The brand hexagon drawn as a voice meter: 54 bars stand on its edges and grow
 * outward with the voice. Cyan is the agent, blue is the caller, dim is silence.
 * Animation is driven by one requestAnimationFrame loop that writes straight to
 * the DOM, so a talking agent never re-renders React. With `animate` off (or the
 * visitor asking for reduced motion) it draws one calm frame instead.
 */
export default function HexWave({
  who,
  animate = true,
  themed = false,
  className = "",
  label,
}: {
  who: Speaker;
  animate?: boolean;
  themed?: boolean;
  className?: string;
  label?: string;
}) {
  const bars = useMemo(() => {
    const v = hexPoints(R);
    const out: { x: number; y: number; nx: number; ny: number; phase: number }[] = [];
    for (let e = 0; e < SIDES; e++) {
      const [x0, y0] = v[e];
      const [x1, y1] = v[(e + 1) % SIDES];
      // an edge's outward normal points halfway between the angles of its two vertices
      const na = (Math.PI / 3) * e - Math.PI / 2 + Math.PI / 6;
      const nx = Math.cos(na);
      const ny = Math.sin(na);
      for (let k = 0; k < PER_SIDE; k++) {
        const t = (k + 0.5) / PER_SIDE;
        out.push({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, nx, ny, phase: e * 1.7 + k * 0.62 });
      }
    }
    return out;
  }, []);

  // two waves on one page must not share gradient ids (the first would win for both)
  const uid = useId().replace(/:/g, "");
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const targetRef = useRef(0);
  const levelRef = useRef(0);
  const reduceRef = useRef(false);

  targetRef.current = who === "idle" ? 0 : 1;

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (time: number) => {
      const lvl = levelRef.current;
      for (let i = 0; i < bars.length; i++) {
        const el = lineRefs.current[i];
        if (!el) continue;
        const b = bars[i];
        // two out-of-step waves so the meter ripples around the hexagon instead of pulsing as one
        const wave = 0.5 + 0.5 * Math.sin(time * 0.008 + b.phase) * Math.cos(time * 0.0031 + b.phase * 0.7);
        const len = MIN_LEN + lvl * MAX_LEN * (0.18 + 0.82 * Math.abs(wave));
        el.setAttribute("x2", String(b.x + b.nx * len));
        el.setAttribute("y2", String(b.y + b.ny * len));
      }
    };

    if (!animate || reduceRef.current) {
      levelRef.current = who === "idle" ? 0 : 0.55;
      paint(1200);
      return;
    }

    let raf = 0;
    let running = true;
    const tick = (time: number) => {
      if (!running) return;
      // ease toward the target so the meter swells and settles rather than snapping
      levelRef.current += (targetRef.current - levelRef.current) * 0.08;
      paint(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // no point burning frames while the tab is hidden
    const onVis = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [animate, bars, who]);

  const tone = (themed ? THEMED : COLOR)[who];
  const ring = themed ? "rgb(var(--border))" : "#1C2E5C";
  const outer = hexPoints(R - 10)
    .map((p) => p.join(","))
    .join(" ");
  const inner = hexPoints(46)
    .map((p) => p.join(","))
    .join(" ");

  return (
    <svg
      viewBox="0 0 300 300"
      role="img"
      aria-label={label ?? (who === "idle" ? "Voice meter, listening" : `Voice meter, ${who} speaking`)}
      className={className}
    >
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: tone }} stopOpacity="0.28" />
          <stop offset="100%" style={{ stopColor: tone }} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-core`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14ade6" />
          <stop offset="55%" stopColor="#0066ff" />
          <stop offset="100%" stopColor="#0224b0" />
        </linearGradient>
      </defs>

      <circle cx={CX} cy={CY} r={148} fill={`url(#${uid}-glow)`} />
      <polygon points={outer} fill="none" stroke={ring} strokeWidth="1" strokeDasharray="2 6" />

      <g style={{ color: tone, transition: "color .35s ease" }}>
        {bars.map((b, i) => (
          <line
            key={i}
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            x1={b.x}
            y1={b.y}
            x2={b.x + b.nx * MIN_LEN}
            y2={b.y + b.ny * MIN_LEN}
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
      </g>

      <polygon points={inner} fill={`url(#${uid}-core)`} stroke="#a0f4ff" strokeOpacity="0.7" strokeWidth="1.5" />
      {/* microphone, centred on the hexagon */}
      <g transform="translate(138 132)" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="0" width="12" height="20" rx="6" />
        <path d="M2 14a10 10 0 0020 0M12 24v6M7 30h10" />
      </g>
    </svg>
  );
}
