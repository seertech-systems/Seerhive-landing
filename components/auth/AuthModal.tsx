"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeAuthModal, setAuthError, setAuthMode } from "@/features/auth/authSlice";
import { loginUser, signupUser } from "@/features/auth/authThunks";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const field =
  "mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper placeholder:text-mist/60 focus:outline-none focus:border-aqua normal-case tracking-normal font-body";

/** Login / sign-up form. Open/closed, mode and errors all live in the Redux auth slice. */
export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { modal, status, error } = useAppSelector((s) => s.auth);
  const { open, mode } = modal;
  const busy = status === "loading";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const close = () => dispatch(closeAuthModal());

  // Escape closes; the page behind stays still while the form is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dispatch(closeAuthModal());
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, dispatch]);

  // Start each opening with an empty password.
  useEffect(() => {
    if (open) setPassword("");
  }, [open, mode]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fail = (msg: string) => dispatch(setAuthError(msg));

    if (mode === "signup" && name.trim().length < 2) return fail("Enter your name.");
    if (!EMAIL_RE.test(email.trim())) return fail("Enter a valid email address.");
    if (mode === "signup" && password.length < 8) return fail("Password must be at least 8 characters.");
    if (mode === "login" && !password) return fail("Enter your password.");

    if (mode === "login") {
      dispatch(loginUser({ email: email.trim(), password }));
    } else {
      dispatch(signupUser({ name: name.trim(), email: email.trim(), password }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-[150] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={mode === "login" ? "Log in" : "Create account"}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto overscroll-contain scrollbar-none rounded-3xl border border-border bg-surface p-8 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.5)] animate-floatIn"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-border text-mist hover:text-paper"
        >
          ✕
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" className="h-12 w-auto" />
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-paper">
          {mode === "login" ? "Log in to SeerHive" : "Create your account"}
        </h2>
        <p className="mt-1.5 text-[16px] text-mist">
          {mode === "login"
            ? "Log in once to use every SeerHive module."
            : "Sign up once to use every SeerHive module."}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          {mode === "signup" && (
            <label className="block label-mono text-[12px] text-mist">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Your full name"
                className={field}
              />
            </label>
          )}
          <label className="block label-mono text-[12px] text-mist">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@company.com"
              className={field}
            />
          </label>
          <label className="block label-mono text-[12px] text-mist">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
              className={field}
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-3.5 py-2.5 text-[14px] text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-wave w-full rounded-full bg-aqua px-6 py-3.5 text-[16px] font-bold text-ink transition-colors disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <p className="mt-5 text-center text-[14px] text-mist">
          {mode === "login" ? "New to SeerHive?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => dispatch(setAuthMode(mode === "login" ? "signup" : "login"))}
            className="font-semibold text-aqua hover:text-aqua-soft"
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
