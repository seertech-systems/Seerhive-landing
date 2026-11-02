import HiveBackground from "@/components/HiveBackground";
import HiveDiagram from "./HiveDiagram";
import ModuleIcon from "./ModuleIcon";

const highlights = [
  { label: "Create", name: "AI modules", icon: "resume-enhancer", href: "#agents" },
  { label: "Remind", name: "IVR Outbound", icon: "ivr-outbound", href: "/projects/ivr-outbound" },
  { label: "New · Talk", name: "AI Voice Agent", icon: "voice-ai-agent", href: "/projects/voice-ai-agent" },
  { label: "Manage", name: "SeerHive", icon: "seer-hive", href: "/projects/seer-hive" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* ambient hex grid + glows */}
      <HiveBackground />
      <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] glow-azure blur-3xl" />
      <div className="absolute top-10 right-0 h-[380px] w-[380px] glow-aqua blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-10 lg:pt-12 lg:pb-12">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          {/* Copy */}
          <div data-reveal-stagger="110" className="copy-blur">
            <h1 data-reveal className="font-display text-5xl sm:text-6xl lg:text-[clamp(2.25rem,calc(3.1vw_+_0.5rem),3.4rem)] leading-[1.08] font-semibold tracking-tight text-paper">
              One hive of <span className="whitespace-nowrap text-aqua">AI modules</span>,
              <br />
              built for every kind
              <br />
              of <span className="text-azure-soft">work</span>.
            </h1>

            <p data-reveal className="mt-6 max-w-xl text-[18px] leading-relaxed text-mist">
              <span className="text-paper font-medium">SeerHive</span> brings
              focused AI modules together in one place. Use them to rank resumes,
              write job descriptions, prepare interview questions, build resume
              templates, send reminder calls with{" "}
              <span className="text-paper font-medium">IVR Outbound</span> and answer callers with the{" "}
              <span className="text-paper font-medium">AI Voice Agent</span>. You can use one
              module on its own, or connect them all through SeerHive to manage
              people, clients, timesheets and invoicing in the same system.
            </p>

            <div data-reveal className="cta-row mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#agents"
                className="btn-wave rounded-full bg-aqua px-6 py-3.5 text-[16px] font-semibold text-ink transition-colors"
              >
                Explore the platform
              </a>
              <a
                href="/contact"
                className="btn-wave btn-wave--outline rounded-full border border-border px-6 py-3.5 text-[16px] font-semibold text-paper transition-colors"
              >
                Talk to SeerHive →
              </a>
            </div>

            <div data-reveal-stagger="80" className="mt-12 grid max-w-xl gap-3 sm:grid-cols-2 sm:justify-start">
              {highlights.map((h) => (
                <a
                  key={h.name}
                  data-reveal
                  href={h.href}
                  className="card-wave group flex items-center gap-3 rounded-2xl border border-border bg-surface/80 py-3.5 pl-3.5 pr-5 shadow-[0_14px_36px_-26px_rgba(15,40,90,0.4)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_18px_40px_-24px_rgba(10,108,255,0.6)]"
                >
                  <span className="hex-border hex relative grid h-11 w-[38px] shrink-0 place-items-center bg-ink">
                    <ModuleIcon slug={h.icon} className="h-[18px] w-[18px] text-aqua" />
                  </span>
                  <span className="min-w-0">
                    <span className="block label-mono text-[12px] whitespace-nowrap text-mist">{h.label}</span>
                    <span className="mt-0.5 block font-display text-[16px] font-semibold leading-tight text-paper whitespace-nowrap transition-colors group-hover:text-aqua">
                      {h.name}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Signature hive diagram */}
          <div data-reveal="right">
            <HiveDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
