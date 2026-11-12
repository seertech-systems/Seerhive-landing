"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isAdminUser } from "@/features/auth/tokenStorage";

/** Round user avatar in the navbar. Hover or click opens the account options. */
export default function UserMenu() {
  const { user, openAuth, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => () => cancelClose(), []);

  if (!user) return null;
  const label = user.name || user.email || "Account";
  const initial = label.trim().charAt(0).toUpperCase() || "U";

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
        aria-label="Account menu"
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full bg-[#0078C8] font-display text-[16px] font-bold text-white ring-2 ring-transparent transition-shadow hover:ring-[#0078C8]/30 focus-visible:ring-[#0078C8]/40"
      >
        {initial}
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 pt-2">
          <div className="w-60 overflow-hidden rounded-2xl border border-border/60 bg-surface font-body normal-case tracking-normal shadow-[0_24px_60px_-24px_rgba(15,40,90,0.4)] animate-floatIn">
            <div className="border-b border-border/60 px-4 py-3">
              <p className="truncate text-[15px] font-semibold text-paper">{label}</p>
              {user.email && user.email !== label && (
                <p className="truncate text-[13px] text-mist">{user.email}</p>
              )}
            </div>
            <div className="p-1.5">
              {isAdminUser(user) && (
                <a
                  href="/admin"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-paper transition-colors hover:bg-surface2"
                >
                  Admin dashboard
                </a>
              )}
              {isAdminUser(user) && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    openAuth("password");
                  }}
                  className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-paper transition-colors hover:bg-surface2"
                >
                  Change password
                </button>
              )}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-paper transition-colors hover:bg-surface2"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
