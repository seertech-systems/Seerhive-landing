import HiveBackground from "@/components/HiveBackground";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — SeerHive",
  description:
    "Talk to the SeerHive team about the HRMS, the AI modules, IVR Outbound or the AI Voice Agent.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ink">
      <section className="relative overflow-hidden pt-[72px]">
        <HiveBackground />
        <div className="absolute -top-32 left-1/3 h-[380px] w-[380px] glow-aqua blur-3xl" />

        <div data-reveal-stagger="90" className="copy-blur copy-blur--center relative mx-auto max-w-5xl px-6 lg:px-10 pt-16 pb-10 text-center">
          <span data-reveal className="label-mono text-[12px] text-aqua">Get in touch</span>
          <h1 data-reveal className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-paper">
            Talk to SeerHive
          </h1>
          <p data-reveal className="mt-4 max-w-xl mx-auto text-mist leading-relaxed">
            Have a question about SeerHive, the AI modules, IVR Outbound or the AI Voice Agent?
            Send us a message and the team will reply.
          </p>
        </div>
      </section>

      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <div data-reveal-stagger="80" className="space-y-4">
            <a
              data-reveal
              href="mailto:hello@seertechsystems.ai"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_-20px_rgba(15,40,90,0.35)] transition-all hover:-translate-y-0.5 hover:border-aqua/60"
            >
              <span className="hex-border hex relative grid h-12 w-[42px] shrink-0 place-items-center bg-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] text-aqua" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block label-mono text-[12px] text-mist">Email</span>
                <span className="mt-1 block truncate text-[16px] font-medium text-paper transition-colors group-hover:text-aqua">
                  hello@seertechsystems.ai
                </span>
              </span>
            </a>

            <div
              data-reveal
              className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_-20px_rgba(15,40,90,0.35)]"
            >
              <span className="hex-border hex relative grid h-12 w-[42px] shrink-0 place-items-center bg-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] text-aqua" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </span>
              <span>
                <span className="block label-mono text-[12px] text-mist">Response time</span>
                <span className="mt-1 block text-[16px] text-paper">Usually within one business day.</span>
              </span>
            </div>

            <a
              data-reveal
              href="/#agents"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_-20px_rgba(15,40,90,0.35)] transition-all hover:-translate-y-0.5 hover:border-aqua/60"
            >
              <span className="hex-border hex relative grid h-12 w-[42px] shrink-0 place-items-center bg-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] text-aqua" aria-hidden="true">
                  <path d="M12 3l7 4v8l-7 4-7-4V7z" />
                  <path d="M12 8.5l3 1.7v3.6l-3 1.7-3-1.7v-3.6z" />
                </svg>
              </span>
              <span>
                <span className="block label-mono text-[12px] text-mist">Still exploring?</span>
                <span className="mt-1 block text-[16px] font-medium text-azure-soft transition-colors group-hover:text-aqua">
                  Browse all SeerHive products →
                </span>
              </span>
            </a>
          </div>

          <div data-reveal="right">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
