"use client";

import { useEffect, useRef, useState } from "react";
import HexWave, { type Speaker } from "./HexWave";

type Step =
  | { kind: "caller"; text: string }
  | { kind: "agent"; text: string }
  | { kind: "search"; source: string }
  | { kind: "verify"; text: string }
  | { kind: "skip"; text: string }
  | { kind: "capture"; field: string; value: string }
  | { kind: "handoff"; text: string };

type Scenario = {
  id: string;
  tab: string;
  blurb: string;
  direction: "Inbound" | "Outbound";
  sources: string[];
  outcome: "agent" | "person";
  steps: Step[];
};

// Everything below is sample data written for this page, not a recorded call.
const scenarios: Scenario[] = [
  {
    id: "answer",
    tab: "Answers a question",
    blurb: "A caller asks in their own words. The agent finds the answer in your documents and speaks it.",
    direction: "Inbound",
    sources: ["opd-timings.pdf", "doctor-schedule.pdf", "visiting-rules.txt"],
    outcome: "agent",
    steps: [
      { kind: "agent", text: "Thank you for calling Sunrise Clinic. How can I help you today?" },
      { kind: "caller", text: "What are your OPD timings on Saturday?" },
      { kind: "search", source: "opd-timings.pdf" },
      { kind: "agent", text: "On Saturdays the OPD is open from 9 in the morning to 1 in the afternoon." },
      { kind: "caller", text: "That's all I needed. Thanks." },
      { kind: "agent", text: "You're welcome. Have a good day." },
    ],
  },
  {
    id: "handoff",
    tab: "Hands off to your team",
    blurb: "When the agent cannot answer, or the caller wants a person, it stops guessing and passes the request on.",
    direction: "Inbound",
    sources: ["opd-timings.pdf", "doctor-schedule.pdf", "visiting-rules.txt"],
    outcome: "person",
    steps: [
      { kind: "caller", text: "I'd like to book an appointment with the cardiologist." },
      { kind: "agent", text: "I can take your details and the front desk will confirm a slot. May I have your name?" },
      { kind: "caller", text: "Meera Nair." },
      { kind: "capture", field: "Name", value: "Meera Nair" },
      { kind: "agent", text: "And which day suits you best?" },
      { kind: "caller", text: "Saturday morning, if possible." },
      { kind: "capture", field: "Preferred time", value: "Saturday morning" },
      { kind: "handoff", text: "Callback request created for the front desk, with the conversation attached" },
      { kind: "agent", text: "Thank you, Meera. Someone from the front desk will call you to confirm." },
    ],
  },
  {
    id: "outbound",
    tab: "Runs an outbound campaign",
    blurb: "Upload a list, pick an agent, and it dials. Opted-out numbers are skipped and unanswered calls are retried.",
    direction: "Outbound",
    sources: ["health-camp-details.txt", "venue-and-timings.pdf"],
    outcome: "agent",
    steps: [
      { kind: "skip", text: "2 contacts skipped, they opted out" },
      { kind: "agent", text: "Hello, this is Sunrise Clinic. We're inviting you to our free health camp this Sunday." },
      { kind: "caller", text: "Where is it being held?" },
      { kind: "search", source: "venue-and-timings.pdf" },
      { kind: "agent", text: "It is at the clinic's main hall, from 10 in the morning to 2 in the afternoon." },
      { kind: "caller", text: "Okay, I'll try to come." },
      { kind: "agent", text: "Wonderful. Thank you, and have a good day." },
    ],
  },
  {
    id: "helpline",
    tab: "Staff helpline",
    blurb: "For internal lines, the agent can confirm who is calling against your user directory before it helps.",
    direction: "Inbound",
    sources: ["leave-policy.pdf", "reimbursement-faq.pdf", "holiday-list.xlsx"],
    outcome: "agent",
    steps: [
      { kind: "agent", text: "HR helpline. Please tell me your employee number." },
      { kind: "caller", text: "It's 4 7 2 1 9." },
      { kind: "verify", text: "Employee number matched against your user directory" },
      { kind: "agent", text: "Thank you. How can I help?" },
      { kind: "caller", text: "How many casual leaves can I carry forward?" },
      { kind: "search", source: "leave-policy.pdf" },
      { kind: "agent", text: "The leave policy allows up to 5 casual leaves to be carried forward to the next year." },
    ],
  },
];

function speakerOf(step: Step | undefined): Speaker {
  if (!step) return "idle";
  return step.kind === "agent" ? "agent" : step.kind === "caller" ? "caller" : "idle";
}

/** How long the page waits before showing a step: longer lines take longer to "say". */
function pauseBefore(step: Step) {
  if (step.kind === "agent" || step.kind === "caller") return Math.min(3600, 900 + step.text.length * 24);
  return 800;
}

const EVENT_STYLE: Record<string, { label: string; tone: string; path: React.ReactNode }> = {
  search: {
    label: "Searching your knowledge",
    tone: "border-aqua/40 bg-aqua/10 text-aqua-soft",
    path: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.2-4.2" />
      </>
    ),
  },
  verify: {
    label: "Caller verified",
    tone: "border-aqua/40 bg-aqua/10 text-aqua-soft",
    path: <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6zM9 12l2 2 4-4" />,
  },
  skip: {
    label: "Do not call",
    tone: "border-border bg-surface text-mist",
    path: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M6.5 6.5l11 11" />
      </>
    ),
  },
  capture: {
    label: "Captured",
    tone: "border-azure/50 bg-azure/10 text-azure-soft",
    path: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h4" />,
  },
  handoff: {
    label: "Passed to your team",
    tone: "border-amber-400/50 bg-amber-400/10 text-amber-600",
    path: <path d="M5 12h12M13 6l6 6-6 6" />,
  },
};

function EventRow({ step }: { step: Exclude<Step, { kind: "caller" | "agent" }> }) {
  const s = EVENT_STYLE[step.kind];
  const text =
    step.kind === "search"
      ? `Found in ${step.source}`
      : step.kind === "capture"
        ? `${step.field}: ${step.value}`
        : step.text;
  return (
    <div className={`animate-fadeIn flex items-start gap-2.5 rounded-lg border px-3 py-2 ${s.tone}`}>
      <svg viewBox="0 0 24 24" className="mt-[1px] h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {s.path}
      </svg>
      <p className="text-[14px] leading-snug">
        <span className="label-mono mr-2 text-[12px] opacity-80">{s.label}</span>
        {text}
      </p>
    </div>
  );
}

export default function VoiceCallDemo() {
  const [sid, setSid] = useState(scenarios[0].id);
  const [shown, setShown] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const sc = scenarios.find((s) => s.id === sid)!;
  const done = shown >= sc.steps.length;

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reveal one step at a time, then rest on the finished call before replaying it.
  useEffect(() => {
    if (reduce) {
      setShown(sc.steps.length);
      return;
    }
    if (!playing || !visible) return;
    const t = setTimeout(
      () => setShown((n) => (n >= sc.steps.length ? 0 : n + 1)),
      done ? 4800 : shown === 0 ? 700 : pauseBefore(sc.steps[shown]),
    );
    return () => clearTimeout(t);
  }, [reduce, playing, visible, shown, done, sc]);

  // Keep the newest line in view inside the log, without scrolling the page itself.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [shown, reduce]);

  const pick = (id: string) => {
    setSid(id);
    setShown(0);
    setPlaying(true);
  };

  const current = shown > 0 ? sc.steps[shown - 1] : undefined;
  const who = done && !reduce ? "idle" : speakerOf(current);
  const cited = new Set(sc.steps.slice(0, shown).flatMap((s) => (s.kind === "search" ? [s.source] : [])));
  const captured = sc.steps.slice(0, shown).filter((s): s is Extract<Step, { kind: "capture" }> => s.kind === "capture");
  const status = done ? "Call ended" : who === "agent" ? "Agent speaking" : who === "caller" ? "Caller speaking" : shown === 0 ? "Ringing" : "Working";

  return (
    <section id="call-demo" className="relative overflow-hidden border-t border-border/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] glow-azure opacity-40 blur-3xl" />
      <div ref={rootRef} className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Anatomy of a call</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Hear how it <span className="brand-gradient-x bg-clip-text text-transparent">decides what to do</span>.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            Pick a call. The hexagon shows who is speaking, the log shows what the agent did at each step, and the strip
            underneath shows where the answer came from and who ended up owning the call.
          </p>
        </div>

        <div role="tablist" aria-label="Choose a sample call" data-reveal className="mt-10 flex flex-wrap gap-2">
          {scenarios.map((s) => {
            const on = s.id === sid;
            return (
              <button
                key={s.id}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => pick(s.id)}
                className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-all duration-200 ${
                  on ? "border-transparent brand-gradient text-white shadow-lg shadow-[#0078C8]/25" : "card-wave border-border/70 bg-surface text-paper hover:border-aqua/50"
                }`}
              >
                {s.tab}
              </button>
            );
          })}
        </div>
        <p data-reveal className="mt-4 max-w-2xl text-[16px] text-mist">{sc.blurb}</p>

        {/* The call itself always stays dark, like a product screen. */}
        <div data-reveal className="mt-8 overflow-hidden rounded-3xl border border-border bg-surface2 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="hex h-4 w-4 bg-[#0078C8]" />
              <span className="label-mono text-[12px] text-mist">AI Voice Agent · {sc.direction} call</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="label-mono rounded-full border border-border px-2.5 py-1 text-[12px] text-mist">Sample data</span>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                disabled={reduce}
                aria-pressed={!playing}
                className="label-mono rounded-full border border-border px-3 py-1 text-[12px] text-paper transition-colors hover:border-aqua/60 disabled:opacity-40"
              >
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {/* hexagon meter */}
            <div className="flex flex-col items-center justify-center border-b border-border px-6 py-8 lg:border-b-0 lg:border-r">
              <HexWave who={who} themed className="w-full max-w-[320px]" />
              <p className={`label-mono mt-2 text-[12px] ${who === "agent" ? "text-aqua" : who === "caller" ? "text-azure-soft" : "text-mist"}`} aria-live="off">
                {status}
              </p>

              <div className="mt-6 w-full max-w-[360px]">
                <p className="label-mono text-[12px] text-mist">Knowledge it can answer from</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {sc.sources.map((src) => {
                    const hit = cited.has(src);
                    return (
                      <li
                        key={src}
                        className={`rounded-md border px-2.5 py-1 font-mono text-[12px] transition-all duration-500 ${
                          hit ? "border-aqua bg-aqua/15 text-aqua-soft shadow-[0_0_18px_-4px_rgba(34,211,245,0.7)]" : "border-border text-mist"
                        }`}
                      >
                        {src}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* transcript and actions */}
            <div className="flex min-w-0 flex-col">
              <div
                ref={logRef}
                role="log"
                aria-label={`Sample ${sc.tab.toLowerCase()} call`}
                className="scrollbar-none h-[360px] space-y-2.5 overflow-y-auto px-5 py-5"
              >
                {sc.steps.slice(0, shown).map((s, i) =>
                  s.kind === "agent" || s.kind === "caller" ? (
                    <div key={`${sc.id}-${i}`} className={`animate-fadeIn flex ${s.kind === "agent" ? "justify-start" : "justify-end"}`}>
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[14px] leading-snug ${
                          s.kind === "agent"
                            ? "rounded-tl-sm border border-aqua/30 bg-aqua/10 text-paper"
                            : "rounded-tr-sm border border-azure/40 bg-azure/15 text-paper"
                        }`}
                      >
                        <span className={`label-mono mb-0.5 block text-[12px] ${s.kind === "agent" ? "text-aqua-soft" : "text-azure-soft"}`}>
                          {s.kind === "agent" ? "Agent" : "Caller"}
                        </span>
                        {s.text}
                      </div>
                    </div>
                  ) : (
                    <EventRow key={`${sc.id}-${i}`} step={s} />
                  ),
                )}
                {shown === 0 && <p className="text-[14px] text-mist">Waiting for the call to connect…</p>}
              </div>

              {/* outcome strip */}
              <div className="border-t border-border bg-surface/60 px-5 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  {(
                    [
                      ["agent", "Handled by the agent"],
                      ["person", "Passed to a person"],
                    ] as const
                  ).map(([k, label]) => {
                    const on = done && sc.outcome === k;
                    return (
                      <span
                        key={k}
                        className={`label-mono rounded-full border px-3 py-1.5 text-[12px] transition-all duration-500 ${
                          on
                            ? k === "agent"
                              ? "border-aqua bg-aqua/15 text-aqua-soft"
                              : "border-amber-400/60 bg-amber-400/15 text-amber-600"
                            : "border-border text-mist/70"
                        }`}
                      >
                        {label}
                      </span>
                    );
                  })}
                  {captured.map((c) => (
                    <span key={c.field} className="animate-fadeIn rounded-full border border-azure/40 bg-azure/10 px-3 py-1.5 text-[12px] text-azure-soft">
                      {c.field}: {c.value}
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 text-[12px] text-mist">
                  Every call is saved with its transcript and a short summary, so a supervisor can review it later.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[14px] text-mist">
          An illustration with made-up sample data, not a recording of a real call.
        </p>
      </div>
    </section>
  );
}
