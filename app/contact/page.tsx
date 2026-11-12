import HiveBackground from "@/components/HiveBackground";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { CONTACT } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact — SeerHive",
  description:
    "Talk to the SeerHive team about the HRMS + ATS, SeerHive Recruit AI, SeerVoiz AI, SeerHive Invoicing, AI solutions, software development or staffing.",
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
            Book a demo
          </h1>
          <p data-reveal className="mt-4 max-w-xl mx-auto text-mist leading-relaxed">
            Want to see SeerVoiz AI, SeerHive Recruit AI, SeerHive Data Ingestion Pipeline, SeerHive HRMS + ATS
            or SeerHive Invoicing in action? Tell us which product interests you and the team will arrange a demo.
          </p>
        </div>
      </section>

      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-12">
          <div data-reveal-stagger="80" className="space-y-4">
            <a
              data-reveal
              href={`mailto:${CONTACT.email}`}
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
                  {CONTACT.email}
                </span>
              </span>
            </a>

            <a
              data-reveal
              href={CONTACT.phoneHref}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_-20px_rgba(15,40,90,0.35)] transition-all hover:-translate-y-0.5 hover:border-aqua/60"
            >
              <span className="hex-border hex relative grid h-12 w-[42px] shrink-0 place-items-center bg-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] text-aqua" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block label-mono text-[12px] text-mist">Phone</span>
                <span className="mt-1 block text-[16px] font-medium text-paper transition-colors group-hover:text-aqua">{CONTACT.phone}</span>
              </span>
            </a>

            <div
              data-reveal
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_-20px_rgba(15,40,90,0.35)]"
            >
              <span className="hex-border hex relative grid h-12 w-[42px] shrink-0 place-items-center bg-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] text-aqua" aria-hidden="true">
                  <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span>
                <span className="block label-mono text-[12px] text-mist">Head Office</span>
                <span className="mt-1 block text-[16px] leading-relaxed text-paper">
                  {CONTACT.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </span>
              </span>
            </div>

            <a
              data-reveal
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[0_10px_30px_-20px_rgba(15,40,90,0.35)] transition-all hover:-translate-y-0.5 hover:border-aqua/60"
            >
              <span className="hex-border hex relative grid h-12 w-[42px] shrink-0 place-items-center bg-ink">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] text-aqua" aria-hidden="true">
                  <path d="M4.5 9h3v10.5h-3zM6 4.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM10 9h2.9v1.4c.5-.9 1.6-1.7 3.2-1.7 3.100 0 3.900 2 3.900 4.700v6.100h-3v-5.400c0-1.300 0-2.900-1.800-2.900s-2.100 1.400-2.100 2.800v5.500h-3z" />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block label-mono text-[12px] text-mist">LinkedIn</span>
                <span className="mt-1 block truncate text-[16px] font-medium text-paper transition-colors group-hover:text-aqua">linkedin.com/company/seertechsystems</span>
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
