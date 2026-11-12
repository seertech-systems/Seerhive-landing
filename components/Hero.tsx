import HiveBackground from "@/components/HiveBackground";
import HiveDiagram from "./HiveDiagram";
import ModuleIcon from "./ModuleIcon";

const highlights = [
  { label: "Hire", name: "SeerHive Recruit AI", icon: "resume-enhancer", href: "#agents", isNew: false },
  { label: "Talk", name: "SeerVoiz AI", icon: "voice-ai-agent", href: "/projects/voice-ai-agent", isNew: true },
  { label: "Capture", name: "SeerHive Data Ingestion Pipeline", icon: "data-ingestion", href: "/projects/data-ingestion", isNew: false },
  { label: "Manage", name: "SeerHive HRMS + ATS", icon: "seer-hive", href: "/projects/seer-hive", isNew: false },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[72px]">
      {/* ambient hex grid + glows */}
      <HiveBackground />
      <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] glow-azure blur-3xl" />
      <div className="absolute top-10 right-0 h-[380px] w-[380px] glow-aqua blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 pt-10 pb-6 lg:pt-10 lg:pb-6 min-[1700px]:max-w-[1760px] min-[1700px]:px-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center min-[1700px]:gap-24">
          {/* Copy */}
          <div data-reveal-stagger="110" className="copy-blur">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-[clamp(2.25rem,calc(3.1vw_+_0.5rem),3.4rem)] min-[1700px]:text-[clamp(3.4rem,3.2vw,5rem)] leading-[1.08] font-semibold tracking-tight text-paper">
              One hive of <span className="whitespace-nowrap text-aqua">AI products</span>,
              <br />
              built for the way
              <br />
              your <span className="text-azure-soft">business works</span>.
            </h1>

            <p className="mt-4 max-w-xl text-[18px] leading-relaxed text-mist min-[1700px]:max-w-3xl min-[1700px]:text-[22px]">
              Ready-to-deploy AI products that automate customer conversations, hiring, HR
              operations, invoicing and data capture. Use one or use them all. Every product
              is built to work together and grow with your business.
            </p>

            <div className="cta-row mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#agents"
                className="btn-wave rounded-full bg-aqua px-6 py-3.5 text-[16px] font-semibold text-ink transition-colors"
              >
                Explore the products
              </a>
              <a
                href="/contact"
                className="btn-wave btn-wave--outline rounded-full border border-border px-6 py-3.5 text-[16px] font-semibold text-paper transition-colors"
              >
                Book a demo →
              </a>
            </div>

            <div data-reveal-stagger="80" className="mt-6 grid auto-rows-fr max-w-xl gap-3 sm:grid-cols-2 sm:justify-start min-[1700px]:max-w-3xl">
              {highlights.map((h) => (
                <a
                  key={h.name}
                  data-reveal
                  href={h.href}
                  className="card-wave group flex items-center gap-3 rounded-2xl border border-border bg-surface/80 py-2.5 pl-3.5 pr-5 shadow-[0_14px_36px_-26px_rgba(15,40,90,0.4)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-[0_18px_40px_-24px_rgba(10,108,255,0.6)]"
                >
                  <span className="hex-border hex relative grid h-11 w-[38px] shrink-0 place-items-center bg-ink">
                    <ModuleIcon slug={h.icon} className="h-[18px] w-[18px] text-aqua" />
                  </span>
                  <span className="min-w-0">
                    <span className="block label-mono text-[12px] whitespace-nowrap text-mist">{h.label}</span>
                    <span className="mt-0.5 block font-display text-[16px] font-semibold leading-tight text-paper transition-colors group-hover:text-aqua">
                      {h.name}
                      {h.isNew && (
                        <span className="label-mono ml-2 rounded-full bg-[#0078C8] px-2 py-0.5 align-middle text-[10px] text-white">New</span>
                      )}
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

        <p data-reveal className="label-mono mt-6 text-center text-[12px] text-mist">
          Trusted across Healthcare, Staffing, Recruitment, Call Centers and Marketing
        </p>
      </div>
    </section>
  );
}
