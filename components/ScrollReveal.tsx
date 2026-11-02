"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll reveal. Mounted once in the root layout.
 *
 * Any element with a `data-reveal` attribute starts hidden + offset and
 * animates into place when it scrolls into view. Put `data-reveal-stagger`
 * (optionally `="90"` ms) on a parent to cascade its direct `data-reveal`
 * children. Re-scans on every client-side route change.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    // Apply per-child delays for staggered groups.
    document
      .querySelectorAll<HTMLElement>("[data-reveal-stagger]")
      .forEach((parent) => {
        const step = Number(parent.dataset.revealStagger) || 80;
        parent
          .querySelectorAll<HTMLElement>(":scope > [data-reveal]")
          .forEach((child, i) => {
            child.style.setProperty("--reveal-d", `${i * step}ms`);
          });
      });

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
    );

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
