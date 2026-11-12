const users = [
  {
    title: "Staffing and recruitment agencies",
    detail: "Hire for multiple clients, manage contract and permanent placements separately, and invoice each client accurately, all from one place.",
    icon: <path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6M9 10h.01M15 10h.01" />,
  },
  {
    title: "Recruiters",
    detail: "Capture resumes from every source, score candidates against your job description with weighted scorecards, and turn shortlisted resumes into polished, client-ready profiles.",
    icon: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.2-4.2" />
      </>
    ),
  },
  {
    title: "In-house HR teams",
    detail: "Manage the complete employee lifecycle, from recruitment and onboarding to attendance, leave and payroll, with clear HR analytics.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 100-6M21 20c0-2.4-1.5-4.4-3.6-5.3" />
      </>
    ),
  },
  {
    title: "Finance teams",
    detail: "Generate GST-ready invoices with configurable billing rules, automate approvals and track every invoice and payment in real time.",
    icon: <path d="M6 5h12M6 10h12M9 5c5 0 6 5 0 5l6 9" />,
  },
  {
    title: "Call centers and customer support",
    detail: "Let AI voice agents handle routine queries 24/7 in multiple languages, send reminder calls with Intelligent Conversational IVR, and pass complex calls to your team with the context intact.",
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0116 0v2" />
        <rect x="3" y="14" width="4" height="6" rx="1.5" />
        <rect x="17" y="14" width="4" height="6" rx="1.5" />
        <path d="M19 20c0 1.5-2 2-5 2" />
      </>
    ),
  },
  {
    title: "Healthcare providers",
    detail: "Automate appointment reminders and patient queries with SeerVoiz AI, and turn medical records, lab reports and referrals into structured data.",
    icon: <path d="M12 21s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.4-7 10-7 10zM12 9v5M9.5 11.5h5" />,
  },
  {
    title: "Sales and marketing teams",
    detail: "Capture inquiries, forms and emails as qualified CRM leads, and run personalized outbound follow-up calls at scale.",
    icon: <path d="M4 18l5-5 3 3 7-8M15 8h4v4" />,
  },
  {
    title: "Managers and employees",
    detail: "Managers approve timesheets and leave and track team hours. Employees log time, apply for leave and view attendance and payslips.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
  },
];

export default function WhatIsSection() {
  return (
    <section id="what-is" className="relative overflow-hidden border-t border-border/60 py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-20 h-[380px] w-[380px] glow-aqua opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:gap-16">
          {/* what is it */}
          <div data-reveal-stagger="90" className="max-w-3xl">
            <span data-reveal className="label-mono text-[12px] text-aqua">What is SeerHive?</span>
            <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              <span className="brand-gradient-x bg-clip-text text-transparent">Intelligent products</span>, powering business growth.
            </h2>
            <p data-reveal className="mt-5 leading-relaxed text-mist">
              SeerHive is the product division of SeerTech Systems. It brings together AI agents, automation and AI-native
              applications in one connected platform. Our ready-to-deploy products automate customer conversations, hiring,
              HR operations, invoicing and data capture, so your teams spend less time on repetitive work and more time on
              decisions that move the business forward.
            </p>
            <p data-reveal className="mt-4 leading-relaxed text-mist">
              Each product is built around real business workflows, shaped by SeerTech Systems&apos; experience across
              Healthcare, Call Centers, HRMS, Staffing, Recruitment and Marketing. The result is AI that fits the way your
              business already works, rather than forcing you to change it.
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
            <span data-reveal className="label-mono text-[12px] text-azure-soft">Who it’s for</span>
            <h3 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Built for every team that hires, manages and serves.
            </h3>
            <p data-reveal className="mt-4 leading-relaxed text-mist">
              From recruiters screening hundreds of resumes to call centers handling thousands of calls, SeerHive gives each team the AI it needs, on one connected platform.
            </p>
            <div data-reveal-stagger="70" className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
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
            <p data-reveal className="mt-8 text-[16px] text-mist">
              Don&apos;t see your team or industry? Our configurable AI agents are built for your domain.{" "}
              <a href="/contact" className="font-semibold text-azure-soft transition-colors hover:text-aqua">Book a demo →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
