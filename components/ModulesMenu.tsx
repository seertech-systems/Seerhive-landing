"use client";

import { useEffect, useRef, useState } from "react";
import { projects, navProducts as products } from "@/lib/projects";
import ModuleIcon from "./ModuleIcon";

/**
 * Desktop nav item that reads "Projects" at rest and swaps to "Products"
 * on hover/focus, opening a mega-dropdown of every SeerHive module.
 * Opens on hover or click; each card links straight to that module's page.
 */
export default function ModulesMenu() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(products[0].id);
  const [hoveredId, setHoveredId] = useState<string | number | null>(null);
  const active = products.find((p) => p.id === activeId) ?? products[0];
  const kids = active.children
    .map((slug) => projects.find((x) => x.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const group = kids.length > 1;
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
    setHoveredId(null);
    setActiveId(products[0].id);
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
        <span>Products</span>
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
          aria-label="Products"
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 lg:fixed lg:top-[48px] lg:pt-6"
        >
          {/* normal-case/tracking-normal/font-body: the nav wrapper is label-mono, which this panel would otherwise inherit */}
          <div className="w-[min(92vw,720px)] lg:w-[min(94vw,1040px)] max-h-[calc(100vh-96px)] overflow-y-auto overscroll-contain scrollbar-none rounded-[28px] border border-border/60 bg-surface font-body whitespace-normal normal-case tracking-normal shadow-[0_40px_100px_-30px_rgba(15,40,90,0.4),0_2px_8px_rgba(15,40,90,0.08)] ring-1 ring-black/[0.04] animate-floatIn">
            <div className="grid lg:grid-cols-[300px_1fr]">
              {/* product list: hover or focus a product to see it on the right */}
              <div className="border-b border-border/60 bg-surface2 p-3 lg:border-b-0 lg:border-r lg:p-4">
                <p className="label-mono px-3 pb-2 pt-1 text-[12px] font-semibold text-mist">Products</p>
                <ul>
                  {products.map((prod) => {
                    const on = prod.id === activeId;
                    return (
                      <li key={prod.id}>
                        <a
                          href={prod.href}
                          role="menuitem"
                          onClick={closeNow}
                          onMouseEnter={() => { setActiveId(prod.id); setHoveredId(null); }}
                          onFocus={() => { setActiveId(prod.id); setHoveredId(null); }}
                          className={`relative flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${on ? "bg-surface shadow-sm" : "hover:bg-surface/60"}`}
                        >
                          <span className={`absolute left-0 top-2 h-[calc(100%-16px)] w-[3px] rounded-full transition-colors ${on ? "bg-[#0078C8]" : "bg-transparent"}`} />
                          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${on ? "bg-[#0078C8] text-white" : "bg-aqua/10 text-aqua"}`}>
                            <ModuleIcon slug={prod.iconSlug} className="h-[18px] w-[18px]" />
                          </span>
                          <span className="font-display text-[15px] font-semibold leading-tight text-paper">{prod.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="/#agents"
                  onClick={closeNow}
                  className="label-mono mt-2 block px-3 py-2 text-[12px] font-semibold text-azure-soft transition-colors hover:text-paper"
                >
                  View all products →
                </a>
              </div>

              {/* details of the active product */}
              <div key={active.id} className="animate-fadeIn p-6 lg:p-8">
                <div className="flex flex-col">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-paper">{active.name}</h3>
                  <span className="mt-1.5 block text-[15px] font-semibold text-azure-soft">{active.tag}</span>
                  <p className="mt-2 text-[15px] leading-relaxed text-mist">{active.description}</p>

                  {group ? (
                    <ul className="mt-5 space-y-1">
                      {kids.map((k) => (
                        <li key={k.id}>
                          <a
                            href={k.href}
                            role="menuitem"
                            onClick={closeNow}
                            onMouseEnter={() => setHoveredId(k.id)}
                            onFocus={() => setHoveredId(k.id)}
                            className="group/sub flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface2"
                          >
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-aqua/10 text-aqua transition-colors group-hover/sub:bg-[#0078C8] group-hover/sub:text-white">
                              <ModuleIcon slug={k.slug} className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1 font-display text-[15px] font-semibold leading-tight text-paper">{k.name}</span>
                            <span className="text-aqua opacity-0 transition-opacity group-hover/sub:opacity-100">→</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <a
                      href={active.href}
                      role="menuitem"
                      onClick={closeNow}
                      className="btn-wave mt-6 inline-flex w-fit rounded-full bg-[#0078C8] px-5 py-2.5 text-[14px] font-semibold text-white"
                    >
                      Explore {active.shortName} →
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
