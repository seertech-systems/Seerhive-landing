const points = [
  {
    title: "Use one or all",
    detail:
      "Every module works on its own. Start with the task that slows your team down the most, and connect the others through SeerHive when you are ready.",
    icon: (
      <>
        <path d="M12 3l7 4v8l-7 4-7-4V7z" />
        <path d="M12 8.5l3 1.7v3.6l-3 1.7-3-1.7v-3.6z" />
      </>
    ),
  },
  {
    title: "You set the criteria",
    detail:
      "Resumes are ranked against your job description using the weights you choose, so the ranking reflects how your team actually hires.",
    icon: (
      <>
        <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
        <circle cx="16" cy="7" r="2" />
        <circle cx="8" cy="17" r="2" />
      </>
    ),
  },
  {
    title: "Nothing invented",
    detail:
      "Enhanced resumes and generated descriptions stay true to what you give them. Nothing is added that is not already there.",
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
];

export default function WhySection() {
  return (
    <section id="why" className="relative overflow-hidden py-24 lg:py-32 border-t border-border/60">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 glow-aqua opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Why SeerHive</span>
          <h2 data-reveal className="mt-4 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-paper">
            Simple tools that fit the way you{" "}
            <span className="brand-gradient-x bg-clip-text text-transparent">hire</span>.
          </h2>
          <p data-reveal className="mt-5 text-mist leading-relaxed">
            Start with one module, or use them all together. You stay in control of the result.
          </p>
        </div>

        <div data-reveal-stagger="90" className="mt-14 grid gap-6 md:grid-cols-3">
          {points.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              className="card-wave group relative overflow-hidden rounded-[28px] border border-border/70 bg-surface p-8 shadow-[0_24px_60px_-34px_rgba(15,40,90,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(10,108,255,0.6)]"
            >
              <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-aqua/10 blur-2xl transition-opacity group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl brand-gradient shadow-lg shadow-[#0078C8]/30 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
                    {p.icon}
                  </svg>
                </span>
                <span className="font-display text-5xl font-semibold leading-none text-paper/[0.07]">
                  0{i + 1}
                </span>
              </div>

              <h3 className="relative mt-7 font-display text-xl font-semibold tracking-tight text-paper">{p.title}</h3>
              <p className="relative mt-3 text-[16px] leading-relaxed text-mist">{p.detail}</p>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="relative mt-14 overflow-hidden rounded-[28px] bg-[#0078C8] px-8 py-10 text-center sm:flex sm:items-center sm:justify-between sm:text-left"
        >
          <div className="absolute inset-0 bg-hex-grid opacity-20" />
          <div className="relative">
            <p className="font-display text-xl font-semibold text-white sm:text-2xl">Not sure where to start?</p>
            <p className="mt-1.5 text-[16px] text-white/85">Have a question about a module? We read every message.</p>
          </div>
          <a
            href="/contact"
            className="relative mt-6 inline-flex rounded-full bg-white px-7 py-3 text-[16px] font-semibold text-[#0078C8] shadow-lg transition-transform hover:scale-105 sm:mt-0"
          >
            Talk to the team →
          </a>
        </div>
      </div>
    </section>
  );
}
