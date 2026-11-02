"use client";

import { useState } from "react";

type Stage = {
  id: string;
  name: string;
  count: string;
  icon: React.ReactNode;
  does: string;
  onScreen: string;
  branch?: { label: string; note: string; tone: "normal" | "warn" };
};

// Sample figures written for this page. The 60% duplicate share is the rough rate
// the product description quotes; everything else is illustrative.
const stages: Stage[] = [
  {
    id: "collect",
    name: "Collect",
    count: "1,000 files",
    icon: <path d="M4 13l2-8h12l2 8M4 13v6h16v-6M4 13h5l1 2h4l1-2h5" />,
    does: "Resumes are picked up from recruiter mailboxes and OneDrive folders as they arrive, or in bulk during a historical backfill.",
    onScreen: "Accounts shows every mailbox and drive being scanned, with its true lifecycle phase.",
  },
  {
    id: "dedupe",
    name: "De-duplicate",
    count: "400 new",
    icon: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
      </>
    ),
    does: "Files that match a resume already held are set aside. Around 60% of incoming files are copies, so this is the biggest exit in the pipeline.",
    onScreen: "Jobs shows each duplicate as a normal outcome and links it back to the original document.",
    branch: { label: "About 60% duplicates", note: "Normal, linked to the original", tone: "normal" },
  },
  {
    id: "check",
    name: "Check",
    count: "360 resumes",
    icon: (
      <>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5M9.5 15l2 2 3.5-4" />
      </>
    ),
    does: "Each remaining file is checked to see whether it really is a resume. Signatures, images and other attachments stop here.",
    onScreen: "Jobs shows a non-resume as a normal outcome, not a red error.",
    branch: { label: "Not a resume", note: "Normal outcome", tone: "normal" },
  },
  {
    id: "classify",
    name: "Classify",
    count: "348 classified",
    icon: <path d="M3 12l9-9h8v8l-9 9zM16 8h.01" />,
    does: "Resumes are classified by calling the classification service. If that call keeps failing, the job lands in the failure queue.",
    onScreen: "Failures explains what broke in plain language and offers retry or resolve.",
    branch: { label: "Failures", note: "Retry or resolve", tone: "warn" },
  },
  {
    id: "store",
    name: "Store",
    count: "348 stored",
    icon: (
      <>
        <path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),
    does: "Classified resumes are stored for the HR application, which is where recruiters work with candidates.",
    onScreen: "Overview counts them as completed, and Activity shows them arriving live.",
  },
];

type Example = {
  id: string;
  tab: string;
  raw: string;
  title: string;
  why: string;
  next: string;
  canRetry: boolean;
  resolveAs: string;
};

// Illustrative examples written for this page, in the shape the dashboard describes.
const examples: Example[] = [
  {
    id: "retry",
    tab: "A failure worth retrying",
    raw: 'Spring Boot /analyze endpoint returned 503 Service Unavailable after 3 retries.',
    title: "The classification service had a problem",
    why: "The resume was read correctly, but the service that classifies it returned an error on every attempt.",
    next: "Retry it. If it keeps failing, tell engineering the classification service is erroring.",
    canRetry: true,
    resolveAs: "Resolved",
  },
  {
    id: "resolve",
    tab: "A failure no retry can fix",
    raw: "Could not extract meaningful text (got 0 chars). File may be corrupted, password-protected or an image-only scan.",
    title: "This file has no readable text",
    why: "It looks like a scan, with no text for the pipeline to read. It will fail the same way however many times it is retried.",
    next: "Resolve it as Unprocessable. Your name is recorded against the decision.",
    canRetry: false,
    resolveAs: "Unprocessable",
  },
];

const STROKE = "currentColor";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke={STROKE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export default function IngestionFlow() {
  const [stageId, setStageId] = useState("dedupe");
  const [exId, setExId] = useState(examples[0].id);
  const [plain, setPlain] = useState(true);

  const stage = stages.find((s) => s.id === stageId)!;
  const ex = examples.find((e) => e.id === exId)!;

  return (
    <>
      <section id="pipeline" className="relative overflow-hidden border-t border-border/60 py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] glow-azure opacity-40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl" data-reveal-stagger="80">
            <span data-reveal className="label-mono text-[12px] text-aqua">Where did it go?</span>
            <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Follow a thousand files through the pipeline, <span className="brand-gradient-x bg-clip-text text-transparent">and see every exit</span>.
            </h2>
            <p data-reveal className="mt-4 leading-relaxed text-mist">
              Most files never reach the end, and that is normal. Choose a stage to see what happens there, what leaves, and which
              dashboard screen shows it.
            </p>
          </div>

          <div data-reveal className="mt-10 overflow-hidden rounded-3xl border border-border bg-surface2 shadow-[0_40px_100px_-40px_rgba(0,120,200,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="hex h-4 w-4 bg-[#0078C8]" />
                <span className="label-mono text-[12px] text-mist">Ingestion pipeline · one thousand files</span>
              </div>
              <span className="label-mono rounded-full border border-border px-2.5 py-1 text-[12px] text-mist">Sample data</span>
            </div>

            <div className="px-5 py-8 sm:px-8">
              <div className="relative">
                {/* the line the files travel along (desktop) */}
                <svg className="pointer-events-none absolute left-[10%] top-[38px] hidden h-2 w-[80%] md:block" aria-hidden="true">
                  <line x1="0" y1="4" x2="100%" y2="4" stroke="rgb(var(--aqua))" strokeOpacity="0.6" strokeWidth="2" className="dash-flow" />
                </svg>

                <ol className="relative grid gap-6 md:grid-cols-5 md:gap-2">
                  {stages.map((s, i) => {
                    const on = s.id === stageId;
                    return (
                      <li key={s.id} className="flex flex-row items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center">
                        <button
                          type="button"
                          onMouseEnter={() => setStageId(s.id)}
                          onFocus={() => setStageId(s.id)}
                          onClick={() => setStageId(s.id)}
                          aria-pressed={on}
                          aria-label={`${s.name}: ${s.count}`}
                          className="group relative shrink-0 outline-none"
                        >
                          <span
                            className={`hex relative grid h-[84px] w-[74px] place-items-center transition-all duration-300 ${
                              on ? "scale-110 bg-[#0078C8] text-white" : "bg-surface text-[#0078C8] group-hover:scale-105"
                            }`}
                          >
                            <Icon>{s.icon}</Icon>
                          </span>
                          <span className="label-mono absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#0078C8] text-[12px] text-white">
                            {i + 1}
                          </span>
                        </button>

                        <div className="md:mt-4">
                          <p className="font-display text-[16px] font-semibold text-paper">{s.name}</p>
                          <p className="text-[14px] text-mist">{s.count}</p>
                          {s.branch && (
                            <p
                              className={`mt-2 inline-flex flex-col rounded-xl border px-3 py-1.5 text-left text-[12px] leading-snug md:text-center ${
                                s.branch.tone === "warn"
                                  ? "border-amber-500/50 bg-amber-500/10 text-amber-600"
                                  : "border-border bg-surface text-mist"
                              }`}
                            >
                              <span className="font-semibold">↓ {s.branch.label}</span>
                              <span>{s.branch.note}</span>
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div key={stage.id} className="shot-swap-text mt-8 grid gap-4 border-t border-border pt-6 md:grid-cols-[1.3fr_1fr]">
                <div>
                  <p className="label-mono text-[12px] text-azure-soft">{stage.name}</p>
                  <p className="mt-2 text-[16px] leading-relaxed text-paper">{stage.does}</p>
                </div>
                <div className="rounded-2xl border border-border bg-surface px-4 py-3">
                  <p className="label-mono text-[12px] text-mist">On the dashboard</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-paper">{stage.onScreen}</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-mist">An illustration with made-up sample figures, not a live pipeline.</p>
        </div>
      </section>

      <section id="plain-language" className="relative overflow-hidden border-t border-border/60 bg-surface2/40 py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl" data-reveal-stagger="80">
            <span data-reveal className="label-mono text-[12px] text-aqua">Translate, don&apos;t dump</span>
            <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              The same failure, <span className="brand-gradient-x bg-clip-text text-transparent">said so a recruiter can act on it</span>.
            </h2>
            <p data-reveal className="mt-4 leading-relaxed text-mist">
              A failure arrives as four layers of jargon around one useful sentence. The dashboard keeps the sentence and tucks the jargon
              away. Flip the switch to compare.
            </p>
          </div>

          <div role="tablist" aria-label="Choose an example" data-reveal className="mt-10 flex flex-wrap gap-2">
            {examples.map((e) => {
              const on = e.id === exId;
              return (
                <button
                  key={e.id}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  onClick={() => setExId(e.id)}
                  className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-all ${
                    on ? "border-transparent brand-gradient text-white shadow-lg shadow-[#0078C8]/25" : "card-wave border-border/70 bg-surface text-paper hover:border-aqua/50"
                  }`}
                >
                  {e.tab}
                </button>
              );
            })}
          </div>

          <div data-reveal className="mt-8 overflow-hidden rounded-3xl border border-border bg-surface2 shadow-[0_40px_100px_-40px_rgba(0,120,200,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
              <span className="label-mono text-[12px] text-mist">Failures · one dead-letter item</span>
              <div className="flex items-center gap-3">
                <span className="label-mono rounded-full border border-border px-2.5 py-1 text-[12px] text-mist">Illustrative</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={plain}
                  onClick={() => setPlain((p) => !p)}
                  className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[14px] font-semibold text-paper"
                >
                  <span className={`relative h-5 w-9 rounded-full transition-colors ${plain ? "bg-[#0078C8]" : "bg-mist/40"}`}>
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${plain ? "left-[18px]" : "left-0.5"}`} />
                  </span>
                  {plain ? "Plain language" : "Raw log"}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2">
              <div className={`border-b border-border p-6 transition-opacity duration-300 lg:border-b-0 lg:border-r ${plain ? "opacity-50" : "opacity-100"}`}>
                <p className="label-mono text-[12px] text-mist">What the log says</p>
                <pre className="mt-3 whitespace-pre-wrap break-words rounded-xl border border-border bg-ink p-4 font-mono text-[14px] leading-relaxed text-mist">
                  {ex.raw}
                </pre>
              </div>

              <div key={ex.id + String(plain)} className={`p-6 transition-opacity duration-300 ${plain ? "animate-fadeIn opacity-100" : "opacity-40"}`}>
                <p className="label-mono text-[12px] text-aqua">What the dashboard says</p>
                <p className="mt-3 font-display text-[18px] font-semibold text-paper">{ex.title}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-mist">{ex.why}</p>
                <p className="mt-3 rounded-xl border border-aqua/30 bg-aqua/10 px-4 py-3 text-[16px] leading-relaxed text-paper">
                  <span className="label-mono mr-2 text-[12px] text-aqua">Next step</span>
                  {ex.next}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {ex.canRetry ? (
                    <span className="rounded-full bg-[#0078C8] px-5 py-2 text-[14px] font-semibold text-white">Retry</span>
                  ) : (
                    <span className="rounded-full border border-dashed border-border px-5 py-2 text-[14px] text-mist">Retry not offered, it cannot help</span>
                  )}
                  <span className="rounded-full border border-border bg-surface px-5 py-2 text-[14px] font-semibold text-paper">
                    Resolve as {ex.resolveAs}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[14px] text-mist">The log text mirrors the reasons shown on the Failures screen. The plain-language wording is an illustration of the idea.</p>
        </div>
      </section>
    </>
  );
}
