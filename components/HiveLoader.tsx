"use client";

import { useEffect, useState, type CSSProperties } from "react";

// Same seven-cube geometry as public/logo.svg. The centre cube arrives first;
// the other six fly out of it. (dx, dy) is the cube's offset from the centre.
const CENTRE = { x: 994, y: 936 };
const CUBES = [
  { x: 994, y: 936, solo: true },
  { x: 994, y: 583 },
  { x: 1299, y: 760 },
  { x: 1299, y: 1112 },
  { x: 994, y: 1288 },
  { x: 689, y: 1112 },
  { x: 689, y: 760 },
];

// Silhouette of one cube (the full hexagon), used to clip the shine to the mark.
function hexPoints(x: number, y: number) {
  const P = (dx: number, dy: number) => `${x + dx},${y + dy}`;
  return [P(-95, -164), P(95, -164), P(190, 0), P(95, 164), P(-95, 164), P(-190, 0)].join(" ");
}

// Sparkles that twinkle once the shine has passed over the mark.
const SPARKLES = [
  { x: 1190, y: 560, s: 1, d: 3.15 },
  { x: 800, y: 1130, s: 0.75, d: 3.35 },
  { x: 1330, y: 1160, s: 0.9, d: 3.55 },
  { x: 700, y: 700, s: 0.6, d: 3.45 },
];

function Cube({ x, y }: { x: number; y: number }) {
  const P = (dx: number, dy: number) => `${x + dx},${y + dy}`;
  return (
    <>
      <polygon fill="url(#lc-l)" points={`${P(-95, -164)} ${P(0, 0)} ${P(-95, 164)} ${P(-190, 0)}`} />
      <polygon fill="url(#lc-t)" points={`${P(-95, -164)} ${P(95, -164)} ${P(190, 0)} ${P(0, 0)}`} />
      <polygon fill="url(#lc-b)" points={`${P(0, 0)} ${P(190, 0)} ${P(95, 164)} ${P(-95, 164)}`} />
    </>
  );
}

export default function HiveLoader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Plays only on the first visit of a browser session: refreshes and later
    // page loads skip it (layout.tsx also hides it before paint).
    try {
      if (sessionStorage.getItem("seerhive-loader-seen")) {
        setGone(true);
        return;
      }
    } catch {}

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MIN = reduce ? 400 : 4400; // let the whole sequence play
    const start = performance.now();
    let outTimer: ReturnType<typeof setTimeout>;
    let waitTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const wait = Math.max(0, MIN - (performance.now() - start));
      waitTimer = setTimeout(() => {
        setDone(true);
        // Mark as seen only once it has actually played (Strict Mode runs effects twice in dev).
        try {
          sessionStorage.setItem("seerhive-loader-seen", "1");
        } catch {}
        outTimer = setTimeout(() => setGone(true), 750);
      }, wait);
    };

    let safety: ReturnType<typeof setTimeout>;
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      safety = setTimeout(finish, 7000); // never hang
    }

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(outTimer);
      clearTimeout(waitTimer);
      clearTimeout(safety);
    };
  }, []);

  // Hold the page still while the loader is up.
  useEffect(() => {
    const el = document.documentElement;
    el.style.overflow = !gone && !done ? "hidden" : "";
    return () => {
      el.style.overflow = "";
    };
  }, [done, gone]);

  if (gone) return null;

  return (
    <div
      id="hive-loader"
      className={done ? "hive-loader--done" : undefined}
      role="status"
      aria-label="Loading SeerHive"
      aria-hidden={done}
    >
      <div className="hive-loader__backdrop" />
      <div className="hive-loader__glow" />
      <div className="hive-loader__pulse" />
      <div className="hive-loader__pulse hive-loader__pulse--2" />
      <div className="hive-loader__pulse hive-loader__pulse--3" />

      <div className="hive-loader__stage">
        <svg className="hive-loader__mark" viewBox="489 409 1010 1054" aria-hidden="true">
          <defs>
            <linearGradient id="lc-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3DEBFF" />
              <stop offset="1" stopColor="#0066FF" />
            </linearGradient>
            <linearGradient id="lc-t" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C8FDFF" />
              <stop offset="1" stopColor="#14ADE6" />
            </linearGradient>
            <linearGradient id="lc-b" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#0224B0" />
              <stop offset="1" stopColor="#1388E3" />
            </linearGradient>
            <linearGradient id="lc-shine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="lc-clip">
              {CUBES.map((c, i) => (
                <polygon key={i} points={hexPoints(c.x, c.y)} />
              ))}
            </clipPath>
          </defs>
          {CUBES.map((c, i) => (
            <g
              key={i}
              className={`hive-cube ${c.solo ? "hive-cube--solo" : "hive-cube--fly"}`}
              style={
                {
                  "--i": i,
                  "--dx": c.x - CENTRE.x,
                  "--dy": c.y - CENTRE.y,
                } as CSSProperties
              }
            >
              <g className="hive-cube-wave">
                <Cube x={c.x} y={c.y} />
              </g>
            </g>
          ))}

          {/* diagonal light sweep, clipped to the mark */}
          <g clipPath="url(#lc-clip)">
            <polygon
              className="hive-shine"
              fill="url(#lc-shine)"
              points="300,409 560,409 180,1463 -80,1463"
            />
          </g>

          {SPARKLES.map((sp, i) => (
            <g key={i} transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`}>
              <path
                className="hive-sparkle"
                style={{ animationDelay: `${sp.d}s` }}
                d="M0,-46 L9,-9 L46,0 L9,9 L0,46 L-9,9 L-46,0 L-9,-9Z"
                fill="#fff"
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="hive-loader__word">
        <span className="hive-loader__title">
          Seer<b>Hive</b>
        </span>
        <span className="hive-loader__sub">One hive. Every hire.</span>
      </div>

      <div className="hive-loader__bar">
        <span />
      </div>
    </div>
  );
}
