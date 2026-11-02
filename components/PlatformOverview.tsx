import ModuleIcon from "./ModuleIcon";
import { agents, coreSystem } from "@/lib/projects";

const summary = [
  { label: "7", text: "products that work alone or together" },
  { label: "1", text: "system that tracks every hire to payroll and invoice" },
  { label: "0", text: "details added to a resume that were not already there" },
];

export default function PlatformOverview() {
  return (
    <section id="platform" className="relative overflow-hidden border-t border-border/60 py-24 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-10 h-[360px] w-[360px] glow-azure opacity-50 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">The platform</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-5xl">
            In short: focused tools on top,{" "}
            <span className="brand-gradient-x bg-clip-text text-transparent">one system</span> underneath.
          </h2>
          <p data-reveal className="mt-5 leading-relaxed text-mist">
            The AI modules, IVR Outbound and the AI Voice Agent each do one job well. SeerHive is the HRMS under them. It keeps the
            candidate, the client, the timesheet and the invoice in one record.
          </p>
        </div>

        <div data-reveal-stagger="80" className="mt-12 grid gap-4 sm:grid-cols-3">
          {summary.map((s) => (
            <div key={s.text} data-reveal className="rounded-2xl border border-border/70 bg-surface px-6 py-5 text-center">
              <p className="font-display text-4xl font-semibold brand-gradient-x bg-clip-text text-transparent">{s.label}</p>
              <p className="mt-2 text-[16px] leading-snug text-mist">{s.text}</p>
            </div>
          ))}
        </div>

        {/* layer 1: modules */}
        <div data-reveal className="mt-12">
          <p className="label-mono text-[12px] text-mist">Layer 1 · Task-focused products</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((p) => (
              <a
                key={p.slug}
                href={p.href}
                className="card-wave group flex items-start gap-4 rounded-2xl border border-border/70 bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(10,108,255,0.6)]"
              >
                <span className="hex-border hex relative grid h-12 w-[42px] shrink-0 place-items-center bg-ink">
                  <ModuleIcon slug={p.slug} className="h-5 w-5 text-aqua" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[16px] font-semibold text-paper">{p.name}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-mist">{p.tagline}</span>
                  <span className="mt-2 inline-block text-[14px] font-semibold text-aqua">Explore →</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* layer 2: platform */}
        <div data-reveal className="mt-8">
          <p className="label-mono text-[12px] text-mist">Layer 2 · The system underneath</p>
          <a
            href={coreSystem.href}
            className="card-wave group mt-4 flex flex-col gap-5 rounded-3xl border border-border/70 bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(10,108,255,0.6)] sm:flex-row sm:items-center"
          >
            <span className="hex-border hex relative grid h-16 w-14 shrink-0 place-items-center bg-ink">
              <ModuleIcon slug={coreSystem.slug} className="h-7 w-7 text-aqua" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-xl font-semibold text-paper">{coreSystem.name} HRMS</span>
              <span className="mt-1 block text-[16px] leading-relaxed text-mist">
                Candidates, clients, jobs, interviews, offers, onboarding, timesheets, leave, payroll and invoicing in one system.
              </span>
            </span>
            <span className="text-[14px] font-semibold text-aqua">See inside →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
