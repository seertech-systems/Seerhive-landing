"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import ModuleIcon from "./ModuleIcon";

/**
 * Desktop nav item that reads "Projects" at rest and swaps to "AI Modules"
 * on hover/focus, opening a mega-dropdown of every SeerHive module.
 * Opens on hover or click; each card links straight to that module's page.
 */
export default function ModulesMenu() {
  const [open, setOpen] = useState(false);
  const featured = projects.find((p) => p.slug === "seer-hive");
  const others = projects.filter((p) => p.slug !== "seer-hive");
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const closeNow = () => {
    cancelClose();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        closeNow();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        className="flex items-center gap-1.5 label-mono font-semibold text-paper hover:text-aqua transition-colors"
      >
        <span>AI Modules</span>
        <svg
          width="9"
          height="9"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="AI Modules"
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 lg:fixed lg:top-[48px] lg:pt-6"
        >
          {/* normal-case/tracking-normal/font-body: the nav wrapper is label-mono, which this panel would otherwise inherit */}
          <div className="w-[min(92vw,720px)] lg:w-[min(94vw,1040px)] max-h-[calc(100vh-96px)] overflow-y-auto overscroll-contain scrollbar-none rounded-[28px] border border-border/60 bg-surface font-body whitespace-normal normal-case tracking-normal shadow-[0_40px_100px_-30px_rgba(15,40,90,0.4),0_2px_8px_rgba(15,40,90,0.08)] ring-1 ring-black/[0.04] animate-floatIn">
            <div className="grid lg:grid-cols-[320px_1fr]">
              {featured && (
                <a
                  href={featured.href}
                  role="menuitem"
                  onClick={closeNow}
                  className="group/feat relative hidden flex-col overflow-hidden bg-[#0078C8] p-6 text-white lg:flex"
                >
                  <span className="label-mono text-[12px] font-semibold text-white/75">Platform</span>
                  <span className="mt-2 font-display text-2xl font-semibold tracking-tight">{featured.name}</span>
                  <span className="mt-2 text-[14px] leading-relaxed text-white/85">{featured.tagline}</span>
                  {featured.screenshot && (
                    <span className="mt-5 block overflow-hidden rounded-xl border border-white/25 bg-white shadow-xl transition-transform duration-300 group-hover/feat:-translate-y-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={featured.screenshot} alt="" className="block aspect-[16/10] w-full object-cover object-top" />
                    </span>
                  )}
                  <span className="mt-auto pt-5 text-[14px] font-semibold">Explore SeerHive →</span>
                </a>
              )}

              <div className="flex flex-col">
                <div className="flex items-center justify-between px-6 pt-5 pb-2">
                  <span className="label-mono text-[12px] font-semibold text-mist">AI modules and automation</span>
                  <a
                    href="/#agents"
                    onClick={closeNow}
                    className="label-mono text-[12px] font-semibold text-azure-soft transition-colors hover:text-paper"
                  >
                    View all →
                  </a>
                </div>
                <div className="grid gap-1 p-3 sm:grid-cols-2">
                  {others.map((p) => (
                    <a
                      key={p.id}
                      href={p.href}
                      role="menuitem"
                      onClick={closeNow}
                      className="group/card relative flex items-center gap-3.5 rounded-2xl p-3.5 transition-colors duration-200 hover:bg-surface2"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-aqua/10 text-aqua transition-all duration-200 group-hover/card:brand-gradient group-hover/card:text-white">
                        <ModuleIcon slug={p.slug} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[16px] font-semibold leading-tight tracking-tight text-paper">{p.name}</span>
                        <span className="mt-1 block text-[14px] leading-snug text-mist">{p.tagline}</span>
                      </span>
                      <span className="text-aqua opacity-0 transition-all duration-200 -translate-x-1 group-hover/card:translate-x-0 group-hover/card:opacity-100">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
