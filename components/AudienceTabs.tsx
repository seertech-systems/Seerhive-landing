"use client";

import { useState } from "react";

const audiences = [
  {
    id: "recruiters",
    label: "Recruiters",
    title: "Find, screen and follow candidates faster",
    text: "Score resumes against a job description, write the description itself, prepare interview questions, and call candidates with reminders, all before the interview starts.",
    features: ["Resume scoring", "Job descriptions", "Interview questions", "Automated calls"],
    image: "/screens/resume-analyser/old-main.png",
    alt: "Resume Analyser screen showing ranked candidates",
    href: "/projects/resume-analyser",
    cta: "See Resume Analyser",
  },
  {
    id: "hr",
    label: "HR and finance",
    title: "Run offers, payroll and invoicing from one record",
    text: "Move a candidate from offer to onboarding, then to payroll. Staffing teams can raise client invoices from approved timesheets in the same system.",
    features: ["Offer letters", "Onboarding", "Payroll", "Client invoicing"],
    image: "/screens/hrms/main.png",
    alt: "SeerHive dashboard",
    href: "/projects/seer-hive",
    cta: "See SeerHive",
  },
  {
    id: "employees",
    label: "Employees",
    title: "Log time and manage leave without chasing anyone",
    text: "Employees fill in weekly timesheets, apply for leave and check their own attendance and payslips. They see their own records only.",
    features: ["Weekly timesheets", "Leave requests", "Attendance", "Payslips"],
    image: "/screens/hrms/timesheet-main.png",
    alt: "SeerHive weekly timesheet screen",
    href: "/projects/seer-hive",
    cta: "See the timesheet",
  },
];

export default function AudienceTabs() {
  const [active, setActive] = useState(audiences[0].id);
  const a = audiences.find((x) => x.id === active)!;

  return (
    <section id="audiences" className="relative overflow-hidden border-t border-border/60 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Who it is for</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-5xl">
            One platform, <span className="brand-gradient-x bg-clip-text text-transparent">three kinds of users</span>.
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Choose a user type"
          data-reveal
          className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-full border border-border/70 bg-surface p-1.5"
        >
          {audiences.map((x) => (
            <button
              key={x.id}
              role="tab"
              type="button"
              aria-selected={x.id === active}
              onClick={() => setActive(x.id)}
              className={`rounded-full px-5 py-2.5 text-[16px] font-semibold transition-colors ${
                x.id === active ? "brand-gradient text-white shadow-md" : "text-mist hover:text-paper"
              }`}
            >
              {x.label}
            </button>
          ))}
        </div>

        <div key={a.id} role="tabpanel" className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">{a.title}</h3>
            <p className="mt-4 leading-relaxed text-mist">{a.text}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {a.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[16px] font-medium text-paper">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-aqua" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={a.href}
              className="btn-wave btn-wave--outline mt-8 inline-flex rounded-full border border-border px-6 py-3 text-[16px] font-semibold text-paper transition-colors"
            >
              {a.cta} →
            </a>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-surface p-2 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.image} alt={a.alt} className="aspect-[16/10] w-full rounded-2xl object-cover object-top" />
          </div>
        </div>
      </div>
    </section>
  );
}
