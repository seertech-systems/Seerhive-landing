"use client";

import { useState } from "react";
import type { ModuleScreen } from "@/lib/moduleScreens";

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

/** Tabbed screenshot walkthrough: hover or click a tab to see that screen and what it does. */
export default function ModuleScreens({
  name,
  screens,
  highlight = "explained",
}: {
  name: string;
  screens: ModuleScreen[];
  highlight?: string;
}) {
  const [active, setActive] = useState(screens[0].id);
  const f = screens.find((x) => x.id === active) ?? screens[0];
  const index = screens.findIndex((x) => x.id === f.id);
  const count = NUMBER_WORDS[screens.length] ?? String(screens.length);

  return (
    <section id="features" className="relative overflow-hidden border-t border-border/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[520px] glow-azure opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Inside {name}</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            {count} {screens.length === 1 ? "screen" : "screens"},{" "}
            <span className="brand-gradient-x bg-clip-text text-transparent">{highlight}</span>.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            Choose a screen to see it as it appears in the product, and what it does.
          </p>
        </div>

        <div data-reveal className="mt-12 grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-10">
          <div
            role="tablist"
            aria-label={`${name} screens`}
            className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {screens.map((x, i) => {
              const on = x.id === f.id;
              return (
                <button
                  key={x.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={(e) => {
                    setActive(x.id);
                    e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                  }}
                  onMouseEnter={() => setActive(x.id)}
                  onFocus={() => setActive(x.id)}
                  className={`group flex shrink-0 snap-start items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left sm:gap-3 sm:px-4 sm:py-3 transition-all duration-200 lg:shrink ${
                    on
                      ? "border-transparent brand-gradient text-white shadow-lg shadow-[#0078C8]/25"
                      : "card-wave border-border/70 bg-surface text-paper hover:-translate-y-0.5 hover:border-aqua/50"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg sm:h-8 sm:w-8 font-display text-[14px] font-semibold ${
                      on ? "bg-white/20 text-white" : "bg-aqua/10 text-aqua"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="whitespace-nowrap font-display text-[16px] font-semibold lg:whitespace-normal">{x.tab}</span>
                </button>
              );
            })}
          </div>

          <div key={f.id} role="tabpanel" className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-[#0078C8] bg-[#0078C8] px-4 py-2.5">
                <span className="ml-3 label-mono text-[12px] text-white">{name} · {f.tab}</span>
              </div>
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="scrollbar-none overflow-x-auto overscroll-x-contain sm:overflow-visible">
                  <img src={f.image} alt={f.alt} className="block w-[820px] max-w-none sm:w-full sm:max-w-full" />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-14 bg-gradient-to-t from-surface to-transparent sm:block" />
              </div>
              <p className="border-t border-border/60 px-4 py-2 text-[12px] text-mist sm:hidden">Swipe the screen sideways to see all of it</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <span className="label-mono text-[12px] text-azure-soft">
                  {String(index + 1).padStart(2, "0")} · {f.tab}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{f.text}</p>
              </div>
              <ul className="space-y-3 md:pt-6">
                {f.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[16px] text-paper">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
