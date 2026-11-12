"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeAuthModal, setAuthError, setAuthMode } from "@/features/auth/authSlice";
import { changePassword, loginUser, signupUser } from "@/features/auth/authThunks";

const MIN_PASSWORD = 8;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Any failed login, whatever the cause, shows this one message. */
const LOGIN_ERROR = "Email or password is incorrect.";

const field =
  "mt-2 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-[16px] text-paper placeholder:text-mist/60 focus:outline-none focus:border-aqua normal-case tracking-normal font-body";

/** Password input with an eye button that shows or hides what was typed. */
function PasswordField({ value, onChange, autoComplete, placeholder }: {
  value: string; onChange: (v: string) => void; autoComplete: string; placeholder: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${field} pr-12`}
      />
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
        className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-mist transition-colors hover:text-paper"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {visible ? (
            <>
              <path d="M3 3l18 18" />
              <path d="M10.6 6.2A9.9 9.9 0 0112 6c5 0 8.5 3.6 10 6-.6 1-1.5 2.1-2.7 3.1M6.5 7.6C4.4 8.9 2.9 10.7 2 12c1.5 2.4 5 6 10 6 1.6 0 3-.4 4.3-1" />
              <path d="M9.9 9.9a3 3 0 004.2 4.2" />
            </>
          ) : (
            <>
              <path d="M2 12c1.5-2.4 5-6 10-6s8.5 3.6 10 6c-1.5 2.4-5 6-10 6s-8.5-3.6-10-6z" />
              <circle cx="12" cy="12" r="3" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}

/** Login / sign-up form. Open/closed, mode and errors all live in the Redux auth slice. */
export default function AuthModal() {
  const dispatch = useAppDispatch();
  const { modal, status, error } = useAppSelector((s) => s.auth);
  const { open, mode } = modal;
  const busy = status === "loading";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [admin, setAdmin] = useState(false);

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
    if (open) {
      setPassword("");
      setNewPassword("");
    }
  }, [open, mode]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fail = (msg: string) => dispatch(setAuthError(msg));

    if (mode === "password") {
      if (!password) return fail("Enter your current password.");
      if (newPassword.length < MIN_PASSWORD) return fail(`New password must be at least ${MIN_PASSWORD} characters.`);
      if (newPassword === password) return fail("Choose a new password that is different from the current one.");
      dispatch(changePassword({ currentPassword: password, newPassword }));
      return;
    }

    if (mode === "signup" && name.trim().length < 2) return fail("Enter your name.");
    if (mode === "login" && !email.trim()) return fail("Enter your email or username.");
    if (mode === "signup" && !EMAIL_RE.test(email.trim())) return fail("Enter a valid email address.");
    if (mode === "signup" && password.length < MIN_PASSWORD) return fail(`Password must be at least ${MIN_PASSWORD} characters.`);
    if (mode === "login" && !password) return fail("Enter your password.");

    if (mode === "login") {
      dispatch(loginUser({ login: email.trim(), password, admin }));
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
        aria-label={mode === "login" ? "Log in" : mode === "password" ? "Change password" : "Sign up"}
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
          {mode === "login" ? (admin ? "Admin log in" : "Log in to SeerHive") : mode === "password" ? "Change password" : "Sign up to SeerHive"}
        </h2>
        <p className="mt-1.5 text-[16px] text-mist">
          {mode === "login"
            ? admin
              ? "For SeerHive administrator accounts only."
              : "Log in once to use every SeerHive product."
            : mode === "password"
              ? "Enter your current password, then choose a new one."
              : "Sign up once to use every SeerHive product."}
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
          {mode !== "password" && (
            <label className="block label-mono text-[12px] text-mist">
              {mode === "login" ? "Email or username" : "Email"}
              <input
                type={mode === "login" ? "text" : "email"}
                value={email}
                onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
                autoComplete={mode === "login" ? "username" : "email"}
                placeholder={mode === "login" ? "you@company.com or username" : "you@company.com"}
                className={field}
              />
            </label>
          )}
          <label className="block label-mono text-[12px] text-mist">
            {mode === "password" ? "Current password" : "Password"}
            <PasswordField
              value={password}
              onChange={(v) => setPassword(v.replace(/\s/g, ""))}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
            />
          </label>

          {mode === "password" && (
            <label className="block label-mono text-[12px] text-mist">
              New password
              <PasswordField
                value={newPassword}
                onChange={(v) => setNewPassword(v.replace(/\s/g, ""))}
                autoComplete="new-password"
                placeholder={`At least ${MIN_PASSWORD} characters`}
              />
            </label>
          )}

          {error && (
            <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-3.5 py-2.5 text-[14px] text-red-500">
              {error || LOGIN_ERROR}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="btn-wave w-full rounded-full bg-aqua px-6 py-3.5 text-[16px] font-bold text-ink transition-colors disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "login" ? "Log in" : mode === "password" ? "Update password" : "Sign up"}
          </button>
        </form>

        {mode === "login" && (
          <p className="mt-5 text-center text-[14px] text-mist">
            <button
              type="button"
              onClick={() => {
                setAdmin((v) => !v);
                dispatch(setAuthError(null));
              }}
              className="font-semibold text-aqua hover:text-aqua-soft"
            >
              {admin ? "Back to user log in" : "Admin log in"}
            </button>
          </p>
        )}

        {/* Create-an-account link hidden for now
        <p className="mt-5 text-center text-[14px] text-mist">
          {mode === "login" ? "New to SeerHive?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => dispatch(setAuthMode(mode === "login" ? "signup" : "login"))}
            className="font-semibold text-aqua hover:text-aqua-soft"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
        */}
      </div>
    </div>
  );
}
