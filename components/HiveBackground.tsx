"use client";

import { useEffect, useRef } from "react";

const R = 34; // hexagon radius in px
const W = Math.sqrt(3) * R; // cell width (pointy-top)
const ROW = 1.5 * R; // distance between rows
const REACH = 190; // how far the pointer lights up the hive
const MAX_PULSES = 9;
const PULSE_MS = 3200;
// the one-time shine: a bright band that crosses the hive left to right when the page loads
const SHINE_DELAY = 500;
const SHINE_MS = 2400;
const SHINE_STOPS: [number, number, number][] = [
  [61, 235, 255],
  [0, 102, 255],
  [2, 36, 176],
];

function shineColour(f: number): [number, number, number] {
  const t = Math.min(0.999, Math.max(0, f)) * (SHINE_STOPS.length - 1);
  const i = Math.floor(t);
  const k = t - i;
  const a = SHINE_STOPS[i];
  const b = SHINE_STOPS[i + 1];
  return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
}

type Pulse = { c: number; r: number; t0: number };

/** "205 221 245" (a theme token) -> [205, 221, 245] */
function token(name: string, fallback: [number, number, number]): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const p = raw.split(/\s+/).map(Number);
  return p.length === 3 && p.every((n) => Number.isFinite(n)) ? [p[0], p[1], p[2]] : fallback;
}

/**
 * A honeycomb drawn on a canvas instead of a repeating image. Cells near the pointer
 * light up and fade as it moves away, and a few random cells breathe on their own, so
 * the hive reads as alive rather than printed. Colours come from the theme tokens, so
 * light and dark both work. It sleeps off-screen, and with reduced motion it draws one
 * still frame.
 */
export default function HiveBackground({ fade = true, className = "" }: { fade?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let line: [number, number, number] = [28, 46, 92];
    let glow: [number, number, number] = [34, 211, 245];
    const pointer = { x: -9999, y: -9999 };
    const pulses: Pulse[] = [];
    let lastSpawn = 0;
    const mountedAt = performance.now();
    let raf = 0;
    let running = false;

    const readTheme = () => {
      line = token("--border", [28, 46, 92]);
      glow = token("--aqua", [34, 211, 245]);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / W) + 2;
      rows = Math.ceil(h / ROW) + 2;
      draw(performance.now());
    };

    const path = (cx: number, cy: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        const x = cx + R * Math.cos(a);
        const y = cy + R * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    function draw(now: number) {
      ctx!.clearRect(0, 0, w, h);

      // retire finished pulses, start a new one every so often
      for (let i = pulses.length - 1; i >= 0; i--) if (now - pulses[i].t0 > PULSE_MS) pulses.splice(i, 1);
      if (!reduce && now - lastSpawn > 380 && pulses.length < MAX_PULSES) {
        pulses.push({ c: Math.floor(Math.random() * cols), r: Math.floor(Math.random() * rows), t0: now });
        lastSpawn = now;
      }

      // where the shine band is right now, as a fraction of the width (-0.2 .. 1.2), or null once done
      const sp = (now - mountedAt - SHINE_DELAY) / SHINE_MS;
      const shineX = !reduce && sp >= 0 && sp <= 1 ? (-0.2 + 1.4 * (sp * sp * (3 - 2 * sp))) * w : null;
      const shineHalf = w * 0.17;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = c * W + (r % 2 ? W / 2 : 0) - W / 2;
          const cy = r * ROW - R / 2;

          let lit = 0;
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < REACH) lit = Math.pow(1 - d / REACH, 1.6);
          for (const p of pulses) {
            if (p.c === c && p.r === r) lit = Math.max(lit, Math.sin(((now - p.t0) / PULSE_MS) * Math.PI) * 0.85);
          }

          path(cx, cy);
          if (lit > 0.02) {
            ctx!.fillStyle = `rgba(${glow[0]},${glow[1]},${glow[2]},${lit * 0.2})`;
            ctx!.fill();
            ctx!.strokeStyle = `rgba(${glow[0]},${glow[1]},${glow[2]},${0.25 + lit * 0.75})`;
            ctx!.lineWidth = 1.2;
          } else {
            ctx!.strokeStyle = `rgba(${line[0]},${line[1]},${line[2]},0.55)`;
            ctx!.lineWidth = 1;
          }
          ctx!.stroke();

          if (shineX !== null) {
            const sh = 1 - Math.abs(cx - shineX) / shineHalf;
            if (sh > 0) {
              const col = shineColour(cx / w);
              path(cx, cy);
              ctx!.strokeStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${Math.min(1, sh * 1.1)})`;
              ctx!.lineWidth = 2.6;
              ctx!.stroke();
            }
          }
        }
      }
    }

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };

    readTheme();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    // the theme toggle flips a class on <html>; re-read the tokens when it does
    const mo = new MutationObserver(() => {
      readTheme();
      draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const mask = fade ? "linear-gradient(to bottom, #000 0%, #000 45%, transparent 100%)" : undefined;
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    />
  );
}
