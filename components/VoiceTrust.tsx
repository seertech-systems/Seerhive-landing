/**
 * "Knows its limits": the three promises behind the hand-off and guardrails, drawn as a
 * decision path. Only behaviour that is built and running today appears here.
 */
const branches = [
  {
    when: "The answer is in your documents",
    then: "It answers, in the caller's language",
    tone: "text-aqua border-aqua/40",
    icon: <path d="M5 12l4 4 10-10" />,
  },
  {
    when: "It cannot find the answer, or the caller asks for a person",
    then: "It stops guessing, collects their details and sends a callback request with the conversation",
    tone: "text-amber-500 border-amber-500/40",
    icon: <path d="M5 12h12M13 6l6 6-6 6" />,
  },
  {
    when: "The caller goes off topic, turns abusive or tries to manipulate it",
    then: "It redirects politely, and ends the call after the limit you set",
    tone: "text-azure-soft border-azure/40",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M6.5 6.5l11 11" />
      </>
    ),
  },
];

const guardrails = [
  { title: "Stays inside your topics", detail: "You define what the agent may discuss and what it must avoid." },
  { title: "Personal data stays out of its voice", detail: "Phone numbers and card numbers are hidden from its spoken replies." },
  { title: "Verifies staff before helping", detail: "On internal lines it can match an employee number, name or department to your user directory." },
  { title: "Approved before it goes live", detail: "Agents are versioned and approved before deployment, and you can test one in your browser first." },
];

export default function VoiceTrust() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-surface2/40 py-20 lg:py-24">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Knows its limits</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            Helpful on the easy calls. Honest about the hard ones.
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">
            A voice agent speaking to your customers has to know when to step aside. Every call follows one of these paths.
          </p>
        </div>

        <ol data-reveal-stagger="90" className="mt-12 grid gap-5 lg:grid-cols-3">
          {branches.map((b, i) => (
            <li data-reveal key={b.when} className="card-wave relative rounded-3xl border border-border/70 bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className={`grid h-11 w-11 place-items-center rounded-2xl border bg-ink ${b.tone}`}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {b.icon}
                  </svg>
                </span>
                <span className="label-mono text-[12px] text-mist">Path {i + 1}</span>
              </div>
              <p className="label-mono mt-5 text-[12px] text-mist">If</p>
              <p className="font-display text-[16px] font-semibold leading-snug text-paper">{b.when}</p>
              <p className="label-mono mt-4 text-[12px] text-mist">Then</p>
              <p className="text-[16px] leading-relaxed text-mist">{b.then}</p>
            </li>
          ))}
        </ol>

        <div data-reveal-stagger="70" className="mt-10 grid gap-x-8 gap-y-6 border-t border-border/70 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {guardrails.map((g) => (
            <div data-reveal key={g.title}>
              <p className="font-display text-[16px] font-semibold text-paper">{g.title}</p>
              <p className="mt-1.5 text-[16px] leading-relaxed text-mist">{g.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
