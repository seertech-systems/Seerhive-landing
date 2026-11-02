"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; z: number; s: number; band: boolean };

// Palette taken from the logo: cyan at the front of the sphere, deep blue at the back.
const STOPS = ["#0224B0", "#0042D6", "#0066FF", "#14ADE6", "#3DEBFF"];

function makePoints(count: number, bandCount: number): P[] {
  const pts: P[] = [];
  // Fibonacci sphere: evenly spread points on the surface.
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, s: 0.7 + Math.random() * 0.8, band: false });
  }
  // A dense, thin cloud inside the sphere around its equator.
  for (let i = 0; i < bandCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const rad = 0.15 + Math.random() * 0.75;
    pts.push({
      x: Math.cos(a) * rad,
      y: (Math.random() - 0.5) * 0.12 * (1.1 - rad),
      z: Math.sin(a) * rad,
      s: 0.6 + Math.random() * 0.9,
      band: true,
    });
  }
  return pts;
}

/**
 * A slowly turning sphere of dots in the logo's blues, drawn on a canvas.
 * It leans a little towards the mouse, pauses when off screen, and shows a
 * still frame when the visitor prefers reduced motion.
 */
export default function ParticleGlobe({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = makePoints(2200, 700);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let spin = 0;
    let tiltX = 0.35;
    let tiltY = 0;
    let targetX = 0.35;
    let targetY = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.4;
      const cx = w / 2;
      const cy = h / 2;
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      for (const p of pts) {
        const ang = spin * (p.band ? 2.4 : 1);
        const cy2 = Math.cos(ang + tiltY);
        const sy2 = Math.sin(ang + tiltY);
        // rotate about the vertical axis, then tilt towards the viewer
        const x1 = p.x * cy2 + p.z * sy2;
        const z1 = -p.x * sy2 + p.z * cy2;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const persp = 1 / (1.6 - z2 * 0.5);
        const sx = cx + x1 * R * persp * 1.6;
        const sy = cy + y2 * R * persp * 1.6;
        const size = p.s * (0.5 + depth * 1.1);

        ctx.globalAlpha = 0.12 + depth * 0.78;
        ctx.fillStyle = STOPS[Math.min(STOPS.length - 1, Math.floor(depth * STOPS.length))];
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (visible) {
        spin += 0.0035;
        tiltX += (targetX - tiltX) * 0.05;
        tiltY += (targetY - tiltY) * 0.05;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      targetX = 0.35 + ny * 0.5;
      targetY = nx * 0.6;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(canvas);

    if (reduce) {
      draw();
    } else {
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(canvas);
      window.addEventListener("mousemove", onMove, { passive: true });
      raf = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("mousemove", onMove);
      };
    }
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
