"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * A link to a deployed module. Clicking checks the login (JWT cookie) first:
 * logged in -> go straight to the app; otherwise the login / sign-up form opens.
 * The real href stays on the anchor so it still reads as a link.
 */
export default function OpenAppLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { openApp } = useAuth();
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        // let ctrl/cmd/middle-click through untouched
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openApp(href);
      }}
    >
      {children}
    </a>
  );
}
