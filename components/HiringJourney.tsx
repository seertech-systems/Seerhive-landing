"use client";

import { useState } from "react";
import ModuleIcon from "./ModuleIcon";

type Stop = { slug: string; step: string; name: string; text: string };

// One role, followed through the products. Every link below is a feature the
// product pages already describe; nothing here is a separate promise.
const stops: Stop[] = [
  { slug: "jd-preparation", step: "Write the role", name: "JD Generator", text: "Rough notes become a structured job description with a summary, responsibilities, skills and qualifications. Edit any line, then download it." },
  { slug: "resume-analyser", step: "Screen the resumes", name: "Resume Analyser", text: "Every resume is scored against that same description with the weights you set, and each ranking comes with the reasons for and against." },
  { slug: "ivr-outbound", step: "Confirm the interview", name: "IVR Outbound", text: "Scheduled interviews come in from SeerHive ATS and each candidate gets a reminder call before their own slot, pressing 1 to confirm or 2 to reschedule." },
  { slug: "interview-questions", step: "Prepare the panel", name: "Interview Questions", text: "Coding, theoretical and scenario questions with an expected answer for each, built from the job description or from the candidate's resume." },
  { slug: "voice-ai-agent", step: "Answer candidates", name: "AI Voice Agent", text: "Candidates ask about the role, the process and the documents they need, and get answers from your own material. Anything it cannot answer becomes a callback request." },
  { slug: "seer-hive", step: "Hire and manage", name: "SeerHive", text: "The candidate moves from offer to onboarding, then into timesheets, payroll and client invoicing, all on one record." },
];

const W = 600;
const H = 150;
const px = (i: number) => ((i + 0.5) / stops.length) * W;
const py = (i: number) => (i % 2 === 0 ? 48 : 104);

export default function HiringJourney() {
  const [active, setActive] = useState(1);
  const a = stops[active];

  return (
    <section id="journey" className="relative overflow-hidden border-t border-border/60 py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/3 top-10 h-[380px] w-[380px] glow-azure opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">One role, start to finish</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            One job description. One shortlist. <span className="brand-gradient-x bg-clip-text text-transparent">One hire</span>.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            Most tools start at the resume, but the work starts earlier and ends later. Follow a single vacancy through the
            products, from the first line of the description to the first invoice.
          </p>
        </div>

        {/* desktop: hexagons on a zig-zag path */}
        <div data-reveal className="relative mt-14 hidden lg:block" style={{ height: H }}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <polyline
              points={stops.map((_, i) => `${px(i)},${py(i)}`).join(" ")}
              fill="none"
              stroke="rgb(var(--aqua))"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              className="dash-flow"
            />
          </svg>
          {stops.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.slug}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                aria-label={`${s.step}: ${s.name}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{ left: `${(px(i) / W) * 100}%`, top: py(i) }}
              >
                <span
                  className={`relative grid h-[92px] w-[80px] place-items-center transition-transform duration-300 ${on ? "scale-110" : "group-hover:scale-105"} ${
                    on ? "hex brand-gradient text-white" : "hex-border bg-ink text-aqua"
                  }`}
                >
                  <ModuleIcon slug={s.slug} className="h-7 w-7" />
                </span>
                <span className="label-mono absolute left-1/2 top-[calc(100%+6px)] w-32 -translate-x-1/2 text-center text-[12px] text-mist">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div key={a.slug} className="shot-swap-text mt-14 hidden max-w-3xl border-l-2 border-aqua pl-6 lg:block">
          <span className="label-mono text-[12px] text-azure-soft">
            {String(active + 1).padStart(2, "0")} · {a.step}
          </span>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper">{a.name}</h3>
          <p className="mt-3 leading-relaxed text-mist">{a.text}</p>
          <a href={`/projects/${a.slug}`} className="mt-4 inline-flex text-[16px] font-semibold text-azure-soft transition-colors hover:text-aqua">
            See {a.name} ↗
          </a>
        </div>

        {/* mobile and tablet: the same path as a list */}
        <ol className="mt-10 space-y-4 lg:hidden">
          {stops.map((s, i) => (
            <li key={s.slug} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span className="hex-border grid h-[52px] w-[46px] shrink-0 place-items-center bg-ink text-aqua">
                  <ModuleIcon slug={s.slug} className="h-5 w-5" />
                </span>
                {i < stops.length - 1 && <span className="mt-1 w-px flex-1 border-l border-dashed border-aqua/50" />}
              </div>
              <div className="pb-4">
                <span className="label-mono text-[12px] text-azure-soft">
                  {String(i + 1).padStart(2, "0")} · {s.step}
                </span>
                <a href={`/projects/${s.slug}`} className="mt-1 block font-display text-[18px] font-semibold text-paper">
                  {s.name}
                </a>
                <p className="mt-1.5 text-[16px] leading-relaxed text-mist">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p data-reveal className="mt-10 max-w-3xl text-[16px] leading-relaxed text-mist">
          <span className="font-medium text-paper">And for the candidate:</span>{" "}
          <a href="/projects/resume-templates" className="font-medium text-azure-soft hover:text-aqua">Resume Template Builder</a> shapes a resume to
          the role and level, and <a href="/projects/resume-enhancer" className="font-medium text-azure-soft hover:text-aqua">Resume Enhancer</a>{" "}
          tailors an existing one to the job description, showing the match score before and after.
        </p>
      </div>
    </section>
  );
}
