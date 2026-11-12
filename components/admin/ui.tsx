"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/services/apiClient";

export const input =
  "w-full rounded-xl border border-border bg-ink px-3.5 py-2 text-[14px] text-paper placeholder:text-mist/60 focus:outline-none focus:border-[#0078C8]";
export const select =
  "w-auto cursor-pointer rounded-xl border border-border bg-surface px-3.5 py-2 text-[14px] text-paper focus:border-[#0078C8] focus:outline-none";
export const btn =
  "rounded-full border border-border px-4 py-1.5 text-[13px] font-semibold text-paper transition-colors hover:bg-surface2 disabled:opacity-50";
export const btnPrimary =
  "rounded-full bg-[#0078C8] px-5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50";

export const messageOf = (e: unknown) => (e instanceof ApiError ? e.message : "Something went wrong. Please try again.");

export const fmtDate = (v?: string) => {
  if (!v) return "–";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? v : d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};


export function Icon({ children, size = 22 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      {children}
    </svg>
  );
}


export function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[150] grid place-items-center bg-black/50 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className={`max-h-[calc(100dvh-2rem)] w-full ${wide ? "max-w-3xl" : "max-w-md"} overflow-y-auto rounded-3xl border border-border bg-surface p-7 shadow-2xl sm:p-9`}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-paper">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-mist hover:text-paper">✕</button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}


export function ConfirmDialog({ title, body, confirmLabel, danger, disabled, onClose, onConfirm }: {
  title: string; body: string; confirmLabel: string; danger?: boolean; disabled?: boolean;
  onClose: () => void; onConfirm: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <Modal title={title} onClose={onClose}>
      <p className="break-words text-[15px] text-mist [overflow-wrap:anywhere]">{body}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onClose} className={btn}>Cancel</button>
        <button
          type="button"
          disabled={busy || disabled}
          onClick={async () => { setBusy(true); await onConfirm(); setBusy(false); }}
          className={`rounded-full px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-50 ${danger ? "bg-red-600 hover:bg-red-700" : "bg-[#0078C8] hover:opacity-90"}`}
        >
          {busy ? "Please wait…" : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
