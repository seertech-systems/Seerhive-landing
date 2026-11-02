
const features = [
  {
    tag: "Candidates",
    title: "One record for every candidate",
    text: "Keep every candidate in one searchable list. Find a person by name, email, phone, company, designation or tech role, and switch between a card view and a table.",
    points: ["Search across all contact and work fields", "Grid and table views", "Import people from recruitment data", "Add a candidate in one form"],
    image: "/screens/hrms/candidates.png",
    alt: "SeerHive candidate list shown as cards",
  },
  {
    tag: "Jobs",
    title: "Jobs for your company and your clients",
    text: "Record each job with its salary, experience range, locations and type. Permanent, contract and client permanent jobs are kept apart, so each follows its own rules.",
    points: ["Job type shown on every card", "Salary, experience and locations at a glance", "Active status for each job", "Open the full job in one click"],
    image: "/screens/hrms/jobs.png",
    alt: "SeerHive job list with salary, experience and job type",
  },
  {
    tag: "Interviews",
    title: "Interviews and rounds, by client",
    text: "See every interview with its status, the candidate's experience and CTC, and the date. Filter by client, then open the rounds for any candidate.",
    points: ["Filter all interviews by client", "Status, experience and CTC on each card", "View the rounds for a candidate", "Shortlist candidates for a job"],
    image: "/screens/hrms/interviews.png",
    alt: "SeerHive interview list filtered by client",
  },
  {
    tag: "Onboarding",
    title: "See every hire's stage, from selection to employee",
    text: "Each candidate has a progress line that runs from selection, negotiation and offer to onboarding and employee creation. You can see the current stage at a glance, then open the profile, the offer or the employee record.",
    points: ["Stage tracker on every candidate", "Hiring type shown beside the stage", "Filter by name and joining date", "Jump to the profile, offer or employee record"],
    image: "/screens/hrms/onboarding.png",
    alt: "SeerHive onboarding list with a stage tracker for each candidate",
  },
  {
    tag: "Billable assignments",
    title: "Deployments with their rates",
    text: "Once a candidate joins a client, the assignment holds the project, work type, work model, monthly rate and dates. An invoice can be generated from the same card.",
    points: ["Project, location and work type per person", "Monthly rate and billing basis", "Start and end dates", "Generate Invoice from the assignment"],
    image: "/screens/hrms/billable.png",
    alt: "SeerHive billable assignments with rates and dates",
  },
  {
    tag: "Invoicing",
    title: "Invoices with the tax already worked out",
    text: "Project and permanent invoices, proformas and rate cards sit under one screen. Each invoice shows the amount before tax, the GST and the total payable, with its invoice and due dates.",
    points: ["Pending, overdue, paid and rejected filters", "Amount before tax, GST and total payable", "View or download each invoice", "Standard and project rate cards in the same place"],
    image: "/screens/hrms/invoicing.png",
    alt: "SeerHive invoice list with total payable and GST",
  },
  {
    tag: "Timesheets",
    title: "Weekly timesheets that employees fill in themselves",
    text: "Each employee logs work against their projects, internal modules and general tasks in a weekly grid. Daily and weekly totals add up as they type, and the finished timesheet is sent to the manager for approval.",
    points: ["Week, month and full log views", "Hours grouped by project, internal and general work", "Daily and weekly totals", "Submit for manager approval"],
    image: "/screens/hrms/timesheet.png",
    alt: "SeerHive weekly timesheet with hours logged against a project module",
  },
  {
    tag: "Team overview",
    title: "Hours, utilisation and leave for each person",
    text: "Managers and HR see, for any month, the modules each employee works on, billable and non-billable hours, utilisation, attendance and leave balance.",
    points: ["Choose the month, year and module", "Billable and non-billable hours", "Utilisation shown as a bar", "Attendance and leave balance on the same row"],
    image: "/screens/hrms/team.png",
    alt: "SeerHive team overview with hours, utilisation and leave",
  },
];

export default function SeerHiveFeatures() {
  return (
    <section id="features" className="relative overflow-hidden border-t border-border/60 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 glow-azure opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Inside SeerHive</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Every screen, <span className="brand-gradient-x bg-clip-text text-transparent">explained</span>.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            These are real screens from SeerHive, shown with sample data. Here is what each one does.
          </p>
        </div>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {features.map((f, i) => (
            <div
              key={f.tag}
              className={`grid items-center gap-10 lg:gap-14 ${i % 2 ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.2fr]"}`}
            >
              <div data-reveal className={i % 2 ? "lg:order-2" : ""}>
                <span className="label-mono text-[12px] text-azure-soft">
                  {String(i + 1).padStart(2, "0")} · {f.tag}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">{f.title}</h3>
                <p className="mt-4 leading-relaxed text-mist">{f.text}</p>
                <ul className="mt-6 space-y-3">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[16px] text-paper">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal={i % 2 ? "left" : "right"} className={i % 2 ? "lg:order-1" : ""}>
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]">
                  <div className="flex items-center gap-1.5 border-b border-[#0078C8] bg-[#0078C8] px-4 py-2.5">
                    <span className="ml-3 label-mono text-[12px] text-white">{f.tag}</span>
                  </div>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <div className="scrollbar-none overflow-x-auto overscroll-x-contain sm:overflow-visible">
                      <img src={f.image} alt={f.alt} loading="lazy" className="block w-[820px] max-w-none sm:w-full sm:max-w-full" />
                    </div>
                    {/* soft fade where the screen is cropped */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 bg-gradient-to-t from-surface to-transparent sm:block" />
                  </div>
                  <p className="border-t border-border/60 px-4 py-2 text-[12px] text-mist sm:hidden">Swipe the screen sideways to see all of it</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
