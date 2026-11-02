"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

const items = projects.filter((p) => p.screenshot);
const N = items.length;

/** Shortest signed distance from `active` to `i` on a loop of N items. */
function offsetOf(i: number, active: number) {
  let d = i - active;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

/**
 * A 3D carousel of the product screens: the chosen screen faces you and the others
 * fan out behind it. Hover a tile on the right, click a side screen, use the arrows
 * or the keyboard to change it. It advances by itself until the visitor interacts.
 */
export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const go = useCallback((d: number) => setActive((a) => (a + d + N) % N), []);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !visible) return;
    const id = window.setInterval(() => go(1), 3800);
    return () => window.clearInterval(id);
  }, [reduce, paused, visible, go]);

  const current = items[active];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border/60 py-24 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">See it in action</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Every product, <span className="brand-gradient-x bg-clip-text text-transparent">one look</span>.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            These are the real screens of our products. Choose one to bring it to the front and see what it does.
          </p>
        </div>

        <div
          data-reveal
          className="mt-12 grid grid-cols-1 overflow-hidden rounded-3xl border border-border/70 bg-surface lg:grid-cols-[1.45fr_1fr]"
        >
          {/* 3D carousel */}
          <div
            className="relative flex min-w-0 flex-col bg-surface2/50 outline-none"
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Product screens"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
          >
            <div className="relative h-[340px] overflow-hidden sm:h-[460px] lg:h-[540px]" style={{ perspective: "1300px" }}>
              {items.map((p, i) => {
                const d = offsetOf(i, active);
                const abs = Math.abs(d);
                if (abs > 3) return null;
                const sign = Math.sign(d);
                const style: React.CSSProperties = {
                  transform: `translate(calc(-50% + ${d * 21}%), -50%) translateZ(${-abs * 130}px) rotateY(${-sign * Math.min(abs, 1) * 38}deg) scale(${1 - abs * 0.07})`,
                  opacity: abs === 0 ? 1 : Math.max(0.15, 0.78 - abs * 0.22),
                  zIndex: 10 - abs,
                  filter: abs === 0 ? "none" : `brightness(${1 - abs * 0.08})`,
                };
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${p.name}`}
                    aria-current={d === 0}
                    tabIndex={-1}
                    className="absolute left-1/2 top-1/2 w-[82%] overflow-hidden rounded-xl border border-border/70 bg-surface text-left shadow-[0_30px_70px_-30px_rgba(10,40,120,0.5)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[68%]"
                    style={style}
                  >
                    <div className="flex items-center gap-2 border-b border-[#0078C8] bg-[#0078C8] px-3 py-2">
                      <span className="label-mono ml-1 truncate text-[12px] text-white">{p.name}</span>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.screenshot}
                      alt={d === 0 ? `${p.name} screen` : ""}
                      draggable={false}
                      loading="lazy"
                      className="block aspect-[16/10] w-full bg-white object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>

            <div className="relative z-20 mt-auto flex flex-col gap-4 border-t border-border/60 bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 sm:flex-1" aria-live="polite">
                <p className="font-display text-[18px] font-semibold text-paper">{current.name}</p>
                <p className="mt-1 text-[14px] leading-snug text-mist">{current.tagline}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous product"
                  className="card-wave grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-paper transition-colors hover:border-aqua/60"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next product"
                  className="card-wave grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-paper transition-colors hover:border-aqua/60"
                >
                  →
                </button>
                <a
                  href={current.href}
                  className="btn-wave ml-auto inline-flex rounded-full bg-aqua px-5 py-2.5 text-[14px] font-bold text-ink transition-colors sm:ml-1"
                >
                  Explore →
                </a>
              </div>
            </div>
          </div>

          {/* tiles */}
          <div className="min-w-0 border-t border-border/60 p-4 sm:p-5 lg:border-l lg:border-t-0">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-3">
              {items.map((p, i) => {
                const on = i === active;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className={`group overflow-hidden rounded-xl border text-left transition-all duration-200 ${
                      on
                        ? "border-aqua/70 shadow-[0_14px_30px_-18px_rgba(10,108,255,0.7)]"
                        : "card-wave border-border/70 bg-surface hover:-translate-y-0.5"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.screenshot}
                      alt=""
                      draggable={false}
                      loading="lazy"
                      className={`block aspect-[16/10] w-full object-cover object-top transition-opacity ${on ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                    />
                    <span className={`block px-2.5 py-1.5 font-display text-[12px] font-semibold ${on ? "bg-aqua/10 text-paper" : "text-paper"}`}>
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
