"use client";

import OpenAppLink from "./OpenAppLink";
import { getLiveUrl } from "@/lib/links";
import { useEffect, useRef, useState } from "react";
import { agents } from "@/lib/projects";
import ModuleIcon from "./ModuleIcon";
import ProjectVisual from "./ProjectVisual";

const HEADING = "Focused tools. One job each.";

export default function ModuleGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [headingShown, setHeadingShown] = useState(false);
  const [shownRows, setShownRows] = useState<Set<number>>(new Set());

  // Reveal the heading when the section scrolls in.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reveal each row as it enters the viewport.
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!rows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = rows.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) {
              setShownRows((prev) => {
                if (prev.has(idx)) return prev;
                const next = new Set(prev);
                next.add(idx);
                return next;
              });
            }
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" }
    );
    rows.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const words = HEADING.split(" ");

  return (
    <section
      id="modules"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute -top-24 right-1/4 h-[360px] w-[360px] glow-aqua blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span
            className={`label-mono text-[12px] text-aqua transition-all duration-500 ${
              headingShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            The modules
          </span>

          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-paper">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block transition-transform duration-500 ease-out"
                  style={{
                    transform: headingShown ? "translateY(0)" : "translateY(110%)",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </h2>

          <p
            className={`mt-4 text-mist leading-relaxed transition-all duration-500 ${
              headingShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            Each module takes care of one part of the hiring process. These are
            the actual screens. Open any module to see what it covers.
          </p>
        </div>

        <div className="mt-16 space-y-24 lg:space-y-32">
          {agents.map((p, i) => {
            const flip = i % 2 === 1;
            const visible = shownRows.has(i);
            const accentText = p.accent === "aqua" ? "text-aqua" : "text-azure-soft";

            return (
              <div
                key={p.id}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image side */}
                <div
                  className={`${flip ? "lg:order-2" : ""} transition-all duration-700 ease-out`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translateX(0)"
                      : `translateX(${flip ? "44px" : "-44px"})`,
                  }}
                >
                  <div className={`rounded-3xl ${p.screenshot ? "" : "border border-border bg-surface/70 p-3 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]"}`}>
                    <div className={p.screenshot ? "" : "aspect-[4/3]"}>
                      <ProjectVisual project={p} />
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div
                  className={`${flip ? "lg:order-1" : ""} transition-all duration-700 ease-out`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translateX(0)"
                      : `translateX(${flip ? "-44px" : "44px"})`,
                    transitionDelay: "90ms",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="hex-border relative grid h-10 w-10 place-items-center hex bg-ink">
                      <ModuleIcon slug={p.slug} className="h-[18px] w-[18px] text-aqua" />
                    </span>
                    <span className="label-mono text-[12px] text-mist">
                      {`${p.kind} · SeerHive`}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-paper">
                    {p.name}
                  </h3>
                  <p className={`mt-2 text-[16px] font-medium ${accentText}`}>
                    {p.tagline}
                  </p>
                  <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-mist">
                    {p.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {p.evaluates.slice(0, 3).map((e) => (
                      <li key={e.title} className="flex gap-2.5 text-[14px] leading-relaxed text-mist">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            p.accent === "aqua" ? "bg-aqua" : "bg-azure"
                          }`}
                        />
                        <span>
                          <span className="text-paper">{e.title}.</span> {e.detail}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="cta-row mt-7 flex flex-wrap items-center gap-3">
                    {getLiveUrl(p.slug) && (
                      <OpenAppLink
                        href={getLiveUrl(p.slug)!}
                        className="btn-wave inline-flex items-center gap-1.5 rounded-full bg-aqua px-5 py-2.5 text-[14px] font-bold text-ink transition-colors"
                      >
                        Open app
                        <span aria-hidden="true">↗</span>
                      </OpenAppLink>
                    )}
                    <a
                      href={p.href}
                      className="btn-wave btn-wave--outline inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[14px] font-semibold text-paper transition-colors"
                    >
                      Explore {p.name}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
