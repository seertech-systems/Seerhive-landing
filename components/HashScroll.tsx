"use client";

import { useEffect } from "react";

const HEADER = 72; // height of the fixed header

/**
 * Makes "/#section" links land exactly on their section.
 *
 * A plain smooth scroll stops short on this page: images and animated blocks above the target
 * load while the page is still scrolling, so the target moves further down. This scrolls, waits
 * until the page has stopped moving, then corrects any remaining gap.
 */
function scrollToId(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  const targetTop = () => el.getBoundingClientRect().top + window.scrollY - HEADER;
  window.scrollTo({ top: targetTop(), behavior: smooth ? "smooth" : "auto" });

  let last = -1;
  let still = 0;
  let tries = 0;
  const timer = window.setInterval(() => {
    tries += 1;
    const y = window.scrollY;
    still = Math.abs(y - last) < 1 ? still + 1 : 0;
    last = y;
    if (still >= 2) {
      if (Math.abs(el.getBoundingClientRect().top - HEADER) > 4) {
        window.scrollTo({ top: targetTop(), behavior: "auto" });
        still = 0;
      } else {
        window.clearInterval(timer);
      }
    }
    if (tries > 40) window.clearInterval(timer); // give up after ~6s
  }, 150);
  // Any wheel / touch / key from the visitor wins over the correction.
  const stop = () => window.clearInterval(timer);
  window.addEventListener("wheel", stop, { once: true, passive: true });
  window.addEventListener("touchstart", stop, { once: true, passive: true });
}

export default function HashScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash || url.hash.length < 2) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!document.getElementById(id)) return;
      e.preventDefault();
      window.history.pushState(null, "", url.hash);
      scrollToId(id, !reduce);
    };
    document.addEventListener("click", onClick);

    // Arriving from another page with a hash (e.g. /contact -> /#faq).
    if (window.location.hash.length > 1) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const t = window.setTimeout(() => scrollToId(id, false), 300);
      return () => {
        window.clearTimeout(t);
        document.removeEventListener("click", onClick);
      };
    }
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
