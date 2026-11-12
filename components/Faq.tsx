const faqs = [
  {
    q: "How do SeerHive Recruit AI, SeerVoiz AI, SeerHive Invoicing and the HRMS fit together?",
    a: "SeerHive HRMS + ATS is the integrated HR and talent management platform. It covers recruitment, employee management, timesheets, leave, payroll and HR analytics. SeerHive Recruit AI (AI Resume Enhancer, AI Resume Analyzer and the Resume Data Pipeline) automates hiring, SeerVoiz AI adds voice intelligence, and SeerHive Invoicing automates invoice processing. You can use each on its own or together.",
  },
  {
    q: "Can a staffing agency use SeerHive for multiple clients?",
    a: "Yes. SeerHive manages client companies and their jobs along with the roles you hire for directly. It also tracks contract and permanent placements separately.",
  },
  {
    q: "Can I use the AI products without the HRMS?",
    a: "Yes. Each product works on its own. You can analyze and enhance resumes, run voice agents or process invoices without the HRMS. The HRMS is where a candidate or employee is tracked once they enter your pipeline.",
  },
  {
    q: "What is Intelligent Conversational IVR?",
    a: "It is the SeerVoiz AI product for keypad reminder and confirmation calls at scale. You design a Press 1 / Press 2 call flow, add your contacts, and callers press 1 to confirm or 2 to reschedule. You see every response in real time. For open conversations that answer questions, see the AI Voice Agent.",
  },
  {
    q: "What does SeerVoiz AI do?",
    a: "SeerVoiz AI (voice intelligence powered by AI) deploys human-like AI voice agents that handle inbound customer queries and outbound calls autonomously: customer support, reminders and follow-ups, with answers from your knowledge base, in multilingual, context-aware conversations available 24/7. Intelligent Conversational IVR is part of it.",
  },
  {
    q: "Will the voice agent make things up?",
    a: "It is designed to answer from the documents you provide and to stop guessing when it cannot find an answer. In that case, or when the caller asks for a person, it collects their details and sends your team a callback request with the conversation. You also set the topics it may discuss, and it keeps personal data such as phone and card numbers out of its spoken replies.",
  },
  {
    q: "What are the Resume Data Pipeline and the SeerHive Data Ingestion Pipeline?",
    a: "The Resume Data Pipeline collects resumes from any email account, job portal or external source, uses AI to extract and organize candidate details, merges duplicates and loads them straight into your HRMS. The SeerHive AI Data Ingestion Pipeline applies the same idea to any document: it is proven in recruitment and configurable for invoicing and finance, healthcare, and leads and sales.",
  },
  {
    q: "What products does SeerHive offer?",
    a: "SeerVoiz AI, SeerHive Recruit AI, SeerHive Data Ingestion Pipeline, SeerHive HRMS + ATS and SeerHive Invoicing. We also offer AI solutions, custom software development and staffing and talent solutions. Each product has its own page with a list of features.",
  },
  {
    q: "Can I see it live?",
    a: "Yes. Book a demo to arrange a walkthrough using your own resumes and job descriptions, either online or on-site.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on which products you use and how many people use them. Get in touch and we will send you a quote.",
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

// The home page shows only these questions, in this order. Every other entry stays in `faqs` for a future FAQ page.
const HOME_FAQ = [
  "What products does SeerHive offer?",
  "How do SeerHive Recruit AI, SeerVoiz AI, SeerHive Invoicing and the HRMS fit together?",
  "Can I use the AI products without the HRMS?",
  "Will the voice agent make things up?",
  "Can I move my existing data into SeerHive?",
  "Can I see it live?",
];
const homeFaqs = HOME_FAQ.map((q) => faqs.find((f) => f.q === q)!);

export default function Faq() {
  return (
    <section id="faq" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <span data-reveal className="label-mono text-[12px] text-aqua">Questions</span>
        <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper">
          Frequently asked questions
        </h2>

        <div data-reveal-stagger="70" className="mt-10 divide-y divide-border/70 border-t border-border/70">
          {homeFaqs.map((f) => (
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
