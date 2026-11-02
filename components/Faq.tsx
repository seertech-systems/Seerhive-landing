const faqs = [
  {
    q: "How do the AI modules, IVR Outbound, the AI Voice Agent and SeerHive fit together?",
    a: "SeerHive is the HRMS. It tracks candidates, clients, jobs, interviews, timesheets and invoicing. The AI modules (Resume Enhancer, Resume Analyser, Resume Template Builder, Interview Question Generator and JD Generator), IVR Outbound and the AI Voice Agent each handle one task in the hiring process. You can use them on their own or together with SeerHive.",
  },
  {
    q: "Can a staffing agency use SeerHive for multiple clients?",
    a: "Yes. SeerHive manages client companies and their jobs along with the roles you hire for directly. It also tracks contract and permanent placements separately.",
  },
  {
    q: "Can I use the AI modules without SeerHive?",
    a: "Yes. Each module works on its own. You can score resumes, generate job descriptions, prepare interview questions, build resume templates or enhance resumes without SeerHive. SeerHive is where a candidate is tracked once they enter your pipeline.",
  },
  {
    q: "What does IVR Outbound do?",
    a: "It makes personalised outbound calls from a call flow you build once, such as interview reminders, appointment confirmations or payment reminders. Each call can go out immediately, at a fixed time, or a set number of minutes before that person's own appointment. Unanswered calls are retried, Do-Not-Call numbers are skipped, and the key each contact pressed is saved. You can download the results of a campaign as a spreadsheet.",
  },
  {
    q: "What does the AI Voice Agent do, and how is it different from IVR Outbound?",
    a: "IVR Outbound plays your message and records a key press, which suits a fixed confirmation. The AI Voice Agent holds a spoken conversation: it answers inbound calls, answers questions from the documents you upload, runs outbound campaigns, and passes the caller to your team as a callback request when it cannot help. Every call is logged with a transcript and a summary.",
  },
  {
    q: "Will the AI Voice Agent make things up?",
    a: "It is designed to answer from the documents you provide and to stop guessing when it cannot find an answer. In that case, or when the caller asks for a person, it collects their details and sends your team a callback request with the conversation. You also set the topics it may discuss, and it keeps personal data such as phone and card numbers out of its spoken replies.",
  },
  {
    q: "What is the Ingestion Dashboard?",
    a: "It is the operator console for the SeerHive resume ingestion pipeline, which collects resumes from email mailboxes and OneDrive, removes duplicates, checks and classifies them, and stores them. The dashboard shows whether resumes are flowing, where any single file ended up, and what to do when something fails, in plain language. It does not process resumes itself and does not edit candidate records.",
  },
  {
    q: "What products does SeerHive offer?",
    a: "SeerHive offers an HRMS, a set of AI modules, IVR Outbound, the AI Voice Agent and the Ingestion Dashboard. Each product has its own page with a list of features.",
  },
  {
    q: "Can I see it live?",
    a: "Yes. Contact the team to arrange a walkthrough using your own resumes and job descriptions, either online or on-site.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on which products you use and how many people use them. Contact the team and we will send you a quote.",
  },
  {
    q: "Can I move my existing data into SeerHive?",
    a: "Yes. Past candidates, clients, employees and invoices can be imported from spreadsheets. Tell us what you have and we will explain how it is loaded.",
  },
  {
    q: "Who can see an employee's salary and attendance?",
    a: "Access depends on role. Employees see their own timesheets, leave, attendance and payslips. HR and finance see company-wide records, and managers see their direct reports.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <span data-reveal className="label-mono text-[12px] text-aqua">Questions</span>
        <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper">
          Frequently asked questions
        </h2>

        <div data-reveal-stagger="70" className="mt-10 divide-y divide-border/70 border-t border-border/70">
          {faqs.map((f) => (
            <details data-reveal key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-paper font-medium text-[16px]">
                {f.q}
                <span className="shrink-0 text-mist transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[16px] leading-relaxed text-mist">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
