"use client";

import { useEffect, useRef, useState } from "react";
import HexWave, { type Speaker } from "./HexWave";

// A short sample exchange, written for this page. It is not a recorded call.
const lines: { who: "caller" | "agent"; text: string }[] = [
  { who: "caller", text: "What are your OPD timings on Saturday?" },
  { who: "agent", text: "On Saturdays the OPD is open from 9 in the morning to 1 in the afternoon." },
  { who: "caller", text: "Can I book the cardiologist?" },
  { who: "agent", text: "I'll note your details and the front desk will call you to confirm a slot." },
];

const chips = ["Natural voice", "Answers from your documents", "Inbound and outbound", "Hands off to your team", "English and Indian languages"];

/**
 * A banner straight under the hero that puts the newest product first: a live hexagon
 * voice meter beside a short looping exchange, with one clear way into the full page.
 */
export default function VoiceSpotlight() {
  const [shown, setShown] = useState(1);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) {
      setShown(lines.length);
      return;
    }
    if (!visible) return;
    const t = setTimeout(() => setShown((n) => (n >= lines.length ? 1 : n + 1)), shown >= lines.length ? 3600 : 2600);
    return () => clearTimeout(t);
  }, [visible, reduce, shown]);

  const current = lines[shown - 1];
  const who: Speaker = current.who;

  return (
    <section ref={ref} id="voice-agent-spotlight" className="relative px-4 pb-4 pt-2 sm:px-6 lg:px-10">
      <div data-reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-border bg-surface2 shadow-[0_40px_100px_-50px_rgba(0,120,200,0.55)]">
        <div className="pointer-events-none absolute -left-20 -top-24 h-[360px] w-[360px] glow-aqua opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[380px] glow-azure opacity-50 blur-3xl" />

        <div className="relative grid items-center gap-10 p-5 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label-mono inline-flex items-center gap-2 rounded-full bg-[#0078C8] px-3 py-1.5 text-[12px] text-white">
                <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-white" />
                New
              </span>
              <span className="label-mono text-[12px] text-mist">SeerHive AI Voice Agent</span>
            </div>

            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-4xl lg:text-[2.6rem]">
              An AI agent that answers your calls, <span className="brand-gradient-x bg-clip-text text-transparent">from your own knowledge</span>.
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-mist">
              Callers speak in their own words and get answers from the documents you upload. When someone needs a person, it takes
              their details and sends your team a callback request. It also runs outbound campaigns from a contact list.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <li key={c} className="rounded-full border border-border bg-surface px-3 py-1.5 text-[14px] font-medium leading-tight text-paper sm:px-3.5">
                  {c}
                </li>
              ))}
            </ul>

            <div className="cta-row mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="/projects/voice-ai-agent" className="btn-wave rounded-full bg-aqua px-6 py-3.5 text-[16px] font-bold text-ink transition-colors">
                Meet the AI Voice Agent →
              </a>
              <a
                href="/projects/voice-ai-agent#call-demo"
                className="btn-wave btn-wave--outline rounded-full border border-border bg-surface px-6 py-3.5 text-[16px] font-semibold text-paper transition-colors"
              >
                See a sample call
              </a>
            </div>
          </div>

          {/* live meter and a short exchange */}
          <div className="mx-auto w-full max-w-[460px] rounded-3xl border border-border bg-surface/80 p-4 backdrop-blur sm:p-5">
            <div className="flex items-center justify-between">
              <span className="label-mono text-[12px] text-mist">Sample call</span>
              <span className="label-mono rounded-full border border-border px-2.5 py-1 text-[12px] text-mist">Sample data</span>
            </div>
            <HexWave who={who} themed className="mx-auto mt-1 h-[160px] w-[160px] sm:h-[200px] sm:w-[200px]" />
            <div className="mt-1 min-h-[150px] space-y-2">
              {lines.slice(Math.max(0, shown - 2), shown).map((l, i, arr) => (
                <div
                  key={`${shown}-${i}`}
                  className={`flex ${l.who === "agent" ? "justify-start" : "justify-end"} ${i === arr.length - 1 ? "animate-fadeIn" : "opacity-60"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug text-paper ${
                      l.who === "agent" ? "rounded-tl-sm border border-aqua/30 bg-aqua/10" : "rounded-tr-sm border border-azure/30 bg-azure/10"
                    }`}
                  >
                    <span className={`label-mono mb-0.5 block text-[12px] ${l.who === "agent" ? "text-aqua" : "text-azure-soft"}`}>
                      {l.who === "agent" ? "Agent" : "Caller"}
                    </span>
                    {l.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
