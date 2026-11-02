"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import ModulesMenu from "./ModulesMenu";
import { projects } from "@/lib/projects";
import ModuleIcon from "./ModuleIcon";

const links = [
  { href: "/#seerhive", label: "SeerHive HRMS" },
  { href: "/#why", label: "Why SeerHive" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const { user, openAuth, logout } = useAuth();

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 xl:px-10 h-[72px] flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 group shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className="h-10 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-display font-extrabold tracking-tight text-paper text-[22px]">
              Seer<span className="text-aqua">Hive</span>
            </span>
            <span className="label-mono hidden whitespace-nowrap text-[12px] font-semibold text-mist mt-1 lg:block xl:text-[12px]">
              One Hive, Infinite Solutions
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-4 whitespace-nowrap label-mono text-[12px] font-semibold text-paper xl:gap-8 xl:text-[14px]">
          <ModulesMenu />
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-aqua transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 whitespace-nowrap">
          <ThemeToggle />
          {user ? (
            <>
              <span className="max-w-[140px] truncate text-[14px] font-semibold text-paper" title={user.email}>
                {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="btn-wave btn-wave--outline rounded-full border border-border px-4 py-2 text-[14px] font-semibold text-paper transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="btn-wave btn-wave--outline rounded-full border border-border px-4 py-2 text-[14px] font-semibold text-paper transition-colors"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => openAuth("signup")}
                className="btn-wave rounded-full bg-aqua px-4 py-2 text-[16px] font-bold text-ink transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center sm:h-9 sm:w-9 rounded-full border border-border text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain scrollbar-none border-t border-border/60 bg-ink px-6 py-5 flex flex-col gap-4">
          {/* AI Modules — expandable */}
          <div className="flex flex-col">
            <button
              type="button"
              aria-expanded={modulesOpen}
              onClick={() => setModulesOpen((v) => !v)}
              className="flex items-center justify-between label-mono text-[14px] text-mist hover:text-paper transition-colors"
            >
              <span>AI Modules</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-200 ${modulesOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {modulesOpen && (
              <div className="mt-3 flex flex-col gap-1 border-l border-border/70 pl-3">
                {projects.map((p) => (
                  <a
                    key={p.id}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-surface2/60 transition-colors"
                  >
                    <span className="hex-border relative grid h-7 w-7 shrink-0 place-items-center hex bg-ink">
                      <ModuleIcon slug={p.slug} className="h-3.5 w-3.5 text-aqua" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[14px] font-semibold text-paper">
                        {p.name}
                      </span>
                      <span className="block text-[12px] leading-snug text-mist">
                        {p.tagline}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="label-mono text-[14px] text-mist hover:text-paper transition-colors"
            >
              {l.label}
            </a>
          ))}
          {user ? (
            <button
              type="button"
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="btn-wave btn-wave--outline mt-1 rounded-full border border-border px-4 py-2.5 text-center text-[14px] font-semibold text-paper"
            >
              Log out ({user.name || user.email})
            </button>
          ) : (
            <div className="mt-1 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  openAuth("login");
                  setOpen(false);
                }}
                className="btn-wave btn-wave--outline rounded-full border border-border px-4 py-2.5 text-center text-[14px] font-semibold text-paper"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => {
                  openAuth("signup");
                  setOpen(false);
                }}
                className="btn-wave rounded-full bg-aqua px-4 py-2.5 text-center text-[14px] font-bold text-ink"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
