"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import ModuleIcon from "./ModuleIcon";
import ProjectVisual from "./ProjectVisual";

export default function ProjectSpotlight() {
  const [active, setActive] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeProject = projects[active];

  // Track desktop vs mobile/tablet so scroll-sync only drives the
  // floating preview below lg — on desktop, hover/click drives it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Show the floating mobile/tablet preview only while this section
  // is actually in view; hide it once it scrolls out of frame.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On mobile/tablet, sync the active project to whichever row is
  // nearest the center of the viewport as the user scrolls.
  useEffect(() => {
    if (isDesktop) return;
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!rows.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = rows.indexOf(visible.target as HTMLDivElement);
          if (idx !== -1) setActive(idx);
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    rows.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <section
      id="agents"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-border/60"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="label-mono text-[12px] text-aqua">The platform</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-paper">
            Each product does one job.
          </h2>
          <p className="mt-4 text-mist leading-relaxed">
            Resume screening, job descriptions, interview questions, resume
            templates, resume enhancement, reminder calls and spoken answers
            for callers each have their own tool. The HRMS tracks the candidates, clients and billing
            around them. All of it is part of{" "}
            <span className="text-paper font-medium">SeerHive</span>.
            Hover over or tap a product to see its screen.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          {/* Project list */}
          <div className="divide-y divide-border/70 border-y border-border/70">
            {projects.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onMouseEnter={() => isDesktop && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                tabIndex={0}
                role="button"
                aria-pressed={active === i}
                className={`group relative cursor-pointer py-6 pl-5 pr-4 transition-colors outline-none ${
                  active === i ? "bg-surface/60" : "hover:bg-surface/30"
                }`}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-[3px] transition-colors ${
                    active === i
                      ? p.accent === "aqua"
                        ? "bg-aqua"
                        : "bg-azure"
                      : "bg-transparent"
                  }`}
                />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="hex-border relative h-10 w-10 shrink-0 hex bg-ink grid place-items-center">
                      <ModuleIcon slug={p.slug} className="h-[18px] w-[18px] text-aqua" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-[16px] font-semibold text-paper">
                          {p.name}
                        </h3>
                        {p.category === "core" && (
                          <span className="label-mono text-[12px] text-azure-soft border border-azure-dim/60 rounded-full px-2 py-0.5">
                            Core system
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[14px] text-aqua-soft/90 font-medium">
                        {p.tagline}
                      </p>
                      <p
                        className={`mt-2 text-[16px] leading-relaxed text-mist transition-all overflow-hidden ${
                          active === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0 lg:max-h-24 lg:opacity-100"
                        }`}
                      >
                        {p.description}
                      </p>
                      <a
                        href={p.href}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-azure-soft hover:text-aqua transition-colors"
                      >
                        View details ↗
                      </a>
                    </div>
                  </div>
                </div>
                {/* Inline preview only shows on mobile/tablet: the real screen, full width, right where you're reading */}
                {active === i && (
                  <div className="mt-5 lg:hidden shot-swap">
                    <ProjectVisual project={p} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sticky preview panel — desktop / large tablet only */}
          <div className="hidden lg:block lg:sticky lg:top-24">
            <div key={activeProject.id}>
              <div className={`shot-swap rounded-3xl ${activeProject.screenshot ? "" : "aspect-[4/3] border border-border bg-surface/70 p-3 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]"}`}>
                <ProjectVisual project={activeProject} />
              </div>
              <div className="shot-swap-text mt-5 flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-paper">{activeProject.name}</p>
                  <p className="text-[14px] text-mist mt-0.5">{activeProject.tagline}</p>
                </div>
                <a
                  href={activeProject.href}
                  className="shrink-0 rounded-full border border-border px-4 py-2 text-[14px] font-semibold text-paper hover:border-aqua/50 hover:text-aqua transition-colors"
                >
                  Open ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic feature grid — always reflects whichever project is active */}
        <div key={`${activeProject.id}-features`} className="mt-20 animate-fadeIn">
          <p className="label-mono text-[12px] text-azure-soft">
            What {activeProject.name} covers
          </p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 border-t border-border/70 pt-6">
            {activeProject.evaluates.map((e) => (
              <div key={e.title}>
                <p className="font-display text-[16px] font-semibold text-paper">{e.title}</p>
                <p className="mt-1.5 text-[16px] leading-relaxed text-mist">{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
