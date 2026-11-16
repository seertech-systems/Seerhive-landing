"use client";

import { useEffect, useId, useRef, useState } from "react";

export type SelectOption = { value: string; label: string };

/**
 * A themed dropdown that replaces the browser's native select list (which cannot be styled).
 * It still submits like a normal field: a hidden input carries `name` and the chosen value.
 * Keyboard: Enter / Space / arrows open it, arrows move, Enter picks, Escape closes.
 */
export default function FormSelect({
  name,
  options,
  placeholder,
  value,
  onChange,
  invalid,
  className = "",
  listClassName = "",
}: {
  name: string;
  options: SelectOption[];
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  className?: string;
  /** Extra classes for the open list, e.g. "max-h-64" to make a long list scroll. By default every option is shown. */
  listClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrap = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };
  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div ref={wrap} className={`relative mt-2 ${className}`}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === "Escape") return setOpen(false);
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) return openList();
            setActive((i) => (e.key === "ArrowDown" ? Math.min(options.length - 1, i + 1) : Math.max(0, i - 1)));
          } else if (e.key === "Home" && open) {
            e.preventDefault();
            setActive(0);
          } else if (e.key === "End" && open) {
            e.preventDefault();
            setActive(options.length - 1);
          } else if ((e.key === "Enter" || e.key === " ") && open && active >= 0) {
            e.preventDefault();
            pick(options[active].value);
          }
        }}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-ink px-4 py-2.5 text-left text-[16px] transition-shadow focus:outline-none focus:border-aqua focus:ring-4 focus:ring-aqua/15 ${
          invalid ? "border-red-500" : "border-border"
        } ${selected && selected.value ? "text-paper" : "text-mist/70"}`}
      >
        <span className="truncate">{selected && selected.value ? selected.label : placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`shrink-0 text-mist transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className={`absolute left-0 right-0 z-30 mt-2 overflow-y-auto rounded-2xl ${listClassName} border border-border bg-surface p-1.5 shadow-[0_24px_60px_-24px_rgba(15,40,90,0.45)] animate-fadeIn`}
        >
          {options.map((o, i) => {
            const on = o.value === value;
            return (
              <li
                key={o.value || "__none"}
                role="option"
                aria-selected={on}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  // The list sits inside a <label>; without this the click is forwarded to the button and reopens the list.
                  e.preventDefault();
                  e.stopPropagation();
                  pick(o.value);
                }}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors ${
                  i === active ? "bg-[#0078C8]/10 text-paper" : "text-paper"
                } ${on ? "font-semibold" : ""}`}
              >
                <span>{o.label}</span>
                {on && o.value && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-[#0078C8]">
                    <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
