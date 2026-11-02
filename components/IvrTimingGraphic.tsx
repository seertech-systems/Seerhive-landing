"use client";

import { useEffect, useRef, useState } from "react";

type Person = {
  name: string;
  detail: string;
  /** Appointment time, in minutes after midnight. */
  at: number;
  /** What the sample contact did when called. */
  result: { label: string; tone: "ok" | "move" | "miss" };
};

// Sample contacts written for this page.
const people: Person[] = [
  { name: "Anita Rao", detail: "Interview, 9:30", at: 9 * 60 + 30, result: { label: "Pressed 1 · confirmed", tone: "ok" } },
  { name: "Imran Khan", detail: "Interview, 11:00", at: 11 * 60, result: { label: "Pressed 2 · reschedule", tone: "move" } },
  { name: "Divya Menon", detail: "Interview, 12:15", at: 12 * 60 + 15, result: { label: "No answer · retry queued", tone: "miss" } },
  { name: "Suresh Pillai", detail: "Interview, 14:00", at: 14 * 60, result: { label: "Pressed 1 · confirmed", tone: "ok" } },
];

const START = 7 * 60 + 30;
const END = 14 * 60 + 30;
const SPAN = END - START;
const LEADS = [15, 30, 60, 120];
const CYCLE_MS = 22000;

const pct = (m: number) => ((m - START) / SPAN) * 100;
const clock = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = Math.round(m % 60);
  return `${h}:${String(mm).padStart(2, "0")}`;
};

const TONE = {
  ok: "text-emerald-600 border-emerald-400/40 bg-emerald-400/10",
  move: "text-azure-soft border-azure/50 bg-azure/10",
  miss: "text-amber-600 border-amber-300/40 bg-amber-300/10",
} as const;

/**
 * "Call each person a set time before THEIR OWN appointment", drawn. A clock sweeps
 * across the morning; each contact has their own appointment marker, and their call
 * fires the chosen number of minutes ahead of it. Change the lead time and every call
 * moves with its appointment, which is exactly what a single fixed send time cannot do.
 */
export default function IvrTimingGraphic() {
  const [lead, setLead] = useState(30);
  const [now, setNow] = useState(START);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) {
      setNow(END);
      return;
    }
    if (!playing || !visible) {
      startedAt.current = null;
      return;
    }
    let raf = 0;
    const base = ((now - START) / SPAN) * CYCLE_MS; // resume from where the clock is
    const tick = (t: number) => {
      if (startedAt.current === null) startedAt.current = t - base;
      const e = (t - startedAt.current) % (CYCLE_MS + 2500);
      setNow(e >= CYCLE_MS ? END : START + (e / CYCLE_MS) * SPAN);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // `now` is read once per (re)start only, to resume; it must not restart the loop each frame
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, visible, reduce]);

  return (
    <section className="relative overflow-hidden border-t border-border/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-10 h-[380px] w-[380px] glow-aqua opacity-40 blur-3xl" />
      <div ref={rootRef} className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Smart scheduling</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Every call lands <span className="brand-gradient-x bg-clip-text text-transparent">before their own slot</span>.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            A reminder is only useful if it arrives at the right moment for that person. Choose how long before each
            appointment the call should go, and every contact is dialled on their own clock, in the right time zone.
          </p>
        </div>

        <div data-reveal className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface2 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="hex h-4 w-4 bg-[#0078C8]" />
              <span className="label-mono text-[12px] text-mist">IVR Outbound · Campaign timing</span>
            </div>
            <span className="label-mono rounded-full border border-border px-2.5 py-1 text-[12px] text-mist">Sample data</span>
          </div>

          <div className="px-5 py-6 sm:px-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="text-[14px] font-medium text-paper">Call each person</span>
              <div role="radiogroup" aria-label="Minutes before the appointment" className="flex gap-2">
                {LEADS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="radio"
                    aria-checked={lead === m}
                    onClick={() => setLead(m)}
                    className={`rounded-full border px-3.5 py-1.5 text-[14px] font-semibold transition-colors ${
                      lead === m ? "border-transparent brand-gradient text-white" : "border-border text-mist hover:border-aqua/60 hover:text-paper"
                    }`}
                  >
                    {m < 60 ? `${m} min` : `${m / 60} hr`}
                  </button>
                ))}
              </div>
              <span className="text-[14px] font-medium text-paper">before their own appointment</span>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                disabled={reduce}
                aria-pressed={!playing}
                className="label-mono ml-auto rounded-full border border-border px-3 py-1 text-[12px] text-paper transition-colors hover:border-aqua/60 disabled:opacity-40"
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>

            <ul className="mt-8 space-y-4">
              {people.map((p) => {
                const callAt = Math.max(START, p.at - lead);
                const early = p.at - lead < START;
                // the ring lasts a little while on the clock, but never longer than the lead itself
                const ring = Math.min(20, lead * 0.7);
                const answered = now >= callAt + ring;
                const state = answered ? "done" : now >= callAt ? "calling" : "waiting";
                return (
                  <li key={p.name} className="grid items-center gap-x-5 gap-y-2 md:grid-cols-[170px_minmax(0,1fr)_190px]">
                    <div>
                      <p className="text-[14px] font-semibold text-paper">{p.name}</p>
                      <p className="text-[12px] text-mist">{p.detail}</p>
                    </div>

                    {/* this person's own timeline */}
                    <div className="relative h-9" aria-hidden="true">
                      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
                      <div
                        className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#0078C8]"
                        style={{ left: `${pct(callAt)}%`, width: `${pct(p.at) - pct(callAt)}%`, transition: "left .45s ease, width .45s ease" }}
                      />
                      {/* call marker */}
                      <span
                        className="absolute top-1/2 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-aqua bg-surface text-aqua"
                        style={{ left: `${pct(callAt)}%`, transition: "left .45s ease" }}
                      >
                        {state === "calling" && <span className="absolute inset-0 animate-ping rounded-full bg-aqua/40" />}
                        <svg viewBox="0 0 24 24" className="relative h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                        </svg>
                      </span>
                      {/* appointment marker */}
                      <span
                        className="hex absolute top-1/2 h-4 w-[14px] -translate-x-1/2 -translate-y-1/2 bg-azure-soft"
                        style={{ left: `${pct(p.at)}%` }}
                      />
                    </div>

                    <div className="flex min-h-[28px] items-center">
                      {answered ? (
                        <span className={`animate-fadeIn rounded-full border px-3 py-1 text-[12px] font-medium ${TONE[p.result.tone]}`}>{p.result.label}</span>
                      ) : state === "calling" ? (
                        <span className="animate-pulseGlow text-[12px] font-medium text-aqua">Calling now…</span>
                      ) : (
                        <span className="text-[12px] text-mist">
                          Call at {clock(callAt)}
                          {early ? " (earliest slot)" : ""}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* shared clock */}
            <div className="mt-6 grid gap-x-5 md:grid-cols-[170px_minmax(0,1fr)_190px]">
              <span className="label-mono self-center text-[12px] text-mist">Clock · {clock(now)}</span>
              <div className="relative h-6" aria-hidden="true">
                <div className="absolute inset-x-0 top-0 h-px bg-border" />
                {[8, 9, 10, 11, 12, 13, 14].map((h) => (
                  <span key={h} className="absolute top-0 -translate-x-1/2 text-center" style={{ left: `${pct(h * 60)}%` }}>
                    <span className="mx-auto block h-1.5 w-px bg-border" />
                    <span className="label-mono text-[12px] text-mist">{h}:00</span>
                  </span>
                ))}
                <span className="absolute -top-[2px] bottom-0 w-px bg-aqua" style={{ left: `${pct(now)}%` }}>
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aqua shadow-[0_0_10px_2px_rgba(34,211,245,0.8)]" />
                </span>
              </div>
              <span />
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-[12px] text-mist">
              <span className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-full border border-aqua text-aqua"><span className="h-1 w-1 rounded-full bg-aqua" /></span>Call placed</span>
              <span className="flex items-center gap-2"><span className="hex h-3.5 w-3 bg-azure-soft" />Appointment</span>
              <span>Unanswered calls are retried automatically, with the attempts and gap you set.</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[14px] text-mist">
          An illustration with made-up sample data. Calls can also go out immediately or at one fixed time.
        </p>
      </div>
    </section>
  );
}
