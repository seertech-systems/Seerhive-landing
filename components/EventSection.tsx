const details = [
  { label: "Format", value: "Live, online or on-site" },
  { label: "Who's it for", value: "HR teams, recruiters, staffing partners" },
  { label: "Duration", value: "~45 minutes" },
  { label: "Availability", value: "Rolling — book anytime" },
];

export default function EventSection() {
  return (
    <section id="event" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div data-reveal="zoom" className="relative rounded-3xl border border-border bg-surface2/70 px-8 py-12 sm:px-14 sm:py-16 overflow-hidden text-center">
          <div className="absolute inset-0 bg-hex-grid opacity-[0.25]" />
          <div className="relative" data-reveal-stagger="80">
            <span data-reveal className="label-mono text-[12px] text-aqua">Live walkthrough</span>
            <h2 data-reveal className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-paper">
              See it run on your own data, live.
            </h2>
            <p data-reveal className="mt-4 max-w-xl mx-auto text-mist leading-relaxed">
              We'll walk you through the platform using your own resumes and
              job descriptions — the AI modules, IVR Outbound, the AI Voice Agent and SeerHive —
              online or on-site, wherever your team is.
            </p>

            <div data-reveal className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto text-left">
              {details.map((d) => (
                <div key={d.label} className="border-t border-border pt-3">
                  <p className="label-mono text-[12px] text-mist">{d.label}</p>
                  <p className="mt-1 text-[16px] font-medium text-paper">{d.value}</p>
                </div>
              ))}
            </div>

            <div data-reveal className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full sm:w-72 rounded-full border border-border bg-ink px-5 py-3 text-[16px] text-paper placeholder:text-mist/70 focus:outline-none focus:border-aqua"
              />
              <button className="btn-wave w-full sm:w-auto rounded-full bg-aqua px-6 py-3 text-[16px] font-semibold text-ink transition-colors">
                Request a walkthrough
              </button>
            </div>
            <p className="mt-3 text-[14px] text-mist">
              Or use the{" "}
              <a href="/contact" className="text-aqua hover:text-aqua-soft transition-colors">
                contact page
              </a>{" "}
              to reach the team directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
