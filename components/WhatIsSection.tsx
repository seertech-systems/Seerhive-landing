const users = [
  {
    title: "Staffing and recruitment agencies",
    detail: "Hire for several clients, track contract and permanent placements apart, and invoice each client.",
    icon: <path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6M9 10h.01M15 10h.01" />,
  },
  {
    title: "Company HR teams",
    detail: "Hire for your own company, issue offers, onboard people and run payroll in one place.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 100-6M21 20c0-2.4-1.5-4.4-3.6-5.3" />
      </>
    ),
  },
  {
    title: "Recruiters",
    detail: "Score resumes, write job descriptions, prepare interview questions, and call candidates with reminders and answers.",
    icon: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.2-4.2" />
      </>
    ),
  },
  {
    title: "Finance teams",
    detail: "Raise invoices with GST worked out, follow payments and process monthly payroll.",
    icon: <path d="M6 5h12M6 10h12M9 5c5 0 6 5 0 5l6 9" />,
  },
  {
    title: "Managers",
    detail: "Approve timesheets and see hours, utilisation and leave for the people who report to you.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
  },
  {
    title: "Employees",
    detail: "Log time, apply for leave, and check your own attendance and payslips.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

export default function WhatIsSection() {
  return (
    <section id="what-is" className="relative overflow-hidden border-t border-border/60 py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-20 h-[380px] w-[380px] glow-aqua opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* what is it */}
          <div data-reveal-stagger="90" className="lg:sticky lg:top-28 lg:self-start">
            <span data-reveal className="label-mono text-[12px] text-aqua">What is SeerHive?</span>
            <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              A hiring and workforce platform, made of{" "}
              <span className="brand-gradient-x bg-clip-text text-transparent">small, focused tools</span>.
            </h2>
            <p data-reveal className="mt-5 leading-relaxed text-mist">
              SeerHive helps a team find people, hire them and manage them afterwards. It has these products:
              five AI modules for resumes, job descriptions and interview questions, IVR Outbound for
              personalised reminder calls, an AI Voice Agent that answers and makes calls from your own
              documents, an Ingestion Dashboard that shows where every resume went, and the SeerHive HRMS that keeps every candidate, client, timesheet and invoice
              in one record.
            </p>
            <p data-reveal className="mt-4 leading-relaxed text-mist">
              You do not have to adopt everything. Use one tool on its own, and connect the others when you need them.
            </p>
            <a
              data-reveal
              href="#agents"
              className="btn-wave btn-wave--outline mt-8 inline-flex rounded-full border border-border px-6 py-3 text-[16px] font-semibold text-paper transition-colors"
            >
              See the products →
            </a>
          </div>

          {/* who can use it */}
          <div>
            <span data-reveal className="label-mono text-[12px] text-azure-soft">Who can use it</span>
            <h3 data-reveal className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Built for everyone in the hiring process.
            </h3>
            <div data-reveal-stagger="70" className="mt-8 grid gap-5 sm:grid-cols-2">
              {users.map((u, i) => (
          <div
            key={u.title}
            data-reveal
            className="group relative overflow-hidden rounded-3xl border border-[#0078C8]/15 bg-surface2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0078C8]/40 hover:shadow-[0_24px_50px_-28px_rgba(0,120,200,0.55)]"
          >
            <span aria-hidden="true" className="pointer-events-none absolute right-5 top-4 font-display text-5xl font-semibold leading-none text-[#0078C8]/[0.07] transition-colors duration-300 group-hover:text-[#0078C8]/[0.14]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-[#0078C8] shadow-sm transition-all duration-300 group-hover:bg-[#0078C8] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#0078C8]/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
                {u.icon}
              </svg>
            </span>
            <p className="mt-5 font-display text-[18px] font-semibold tracking-tight text-paper">{u.title}</p>
            <p className="mt-2 text-[16px] leading-relaxed text-mist">{u.detail}</p>
          </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
