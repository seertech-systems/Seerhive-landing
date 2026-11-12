const groups = [
  {
    title: "AI Solutions",
    icon: <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3zM4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5" />,
    text: "We design, build and deploy AI-driven solutions, from AI-native apps to autonomous agents, that automate operations, raise productivity and open up new business value.",
    items: [
      "AI-Native Application Development",
      "AI Automation",
      "AI Agents & Agentic Workflows",
      "Custom AI Models & Integrations",
      "AI Transformation & Adoption",
    ],
  },
  {
    title: "Custom Software Development",
    icon: <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
    text: "Scalable, secure software engineered around your business goals, taken from concept to deployment, plus modernization of the legacy systems you already rely on.",
    items: [
      "Product Engineering",
      "Web Application Development",
      "Mobile Application Development",
      "UI/UX Design",
      "Legacy Modernization",
    ],
  },
  {
    title: "Staffing & Talent Solutions",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 100-6M21 20c0-2.4-1.5-4.4-3.6-5.3" />
      </>
    ),
    text: "Skilled engineers and specialist recruiting that extend your team's capacity, so you can accelerate delivery and growth without long hiring cycles.",
    items: ["Staff Augmentation", "US IT Staffing (C2C / W2)", "Specialist & Leadership Hiring"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative border-t border-border/60 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div data-reveal-stagger="80" className="max-w-2xl">
          <span data-reveal className="label-mono text-[12px] text-aqua">Services</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Beyond the products, a team that builds with you.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            Alongside the SeerHive products, SeerTech Systems offers AI solutions, custom software development and staffing and talent solutions.
          </p>
        </div>

        <div data-reveal-stagger="90" className="mt-12 grid gap-5 md:grid-cols-3">
          {groups.map((g, i) => (
            <div
              key={g.title}
              data-reveal
              className="group relative overflow-hidden rounded-3xl border border-[#0078C8]/15 bg-surface2 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0078C8]/40 hover:shadow-[0_24px_50px_-28px_rgba(0,120,200,0.55)]"
            >
              <span aria-hidden="true" className="pointer-events-none absolute right-6 top-4 font-display text-6xl font-semibold leading-none text-[#0078C8]/[0.07] transition-colors duration-300 group-hover:text-[#0078C8]/[0.14]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0078C8] text-white shadow-lg shadow-[#0078C8]/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
                  {g.icon}
                </svg>
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-paper">{g.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-mist">{g.text}</p>
              <ul className="mt-5 space-y-3 border-t border-[#0078C8]/15 pt-5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16px] font-medium text-paper">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-[#0078C8]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a
          href="/contact"
          className="btn-wave btn-wave--outline mt-10 inline-flex rounded-full border border-border px-6 py-3 text-[16px] font-semibold text-paper transition-colors"
        >
          Book a demo →
        </a>
      </div>
    </section>
  );
}
