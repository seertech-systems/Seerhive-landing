const rows = [
  { label: "How callers interact", ivr: "Listen to a menu, press keys", agent: "Speak naturally, in their own words" },
  { label: "Answering questions", ivr: "Plays fixed recordings", agent: "Answers the actual question from your documents" },
  { label: "Changing the content", ivr: "Re-record prompts, rebuild menus", agent: "Update a document and the agent's answers follow" },
  { label: "When it can't help", ivr: "Caller ends up in a queue or a dead end", agent: "Collects details and creates a callback request for your team" },
  { label: "Outbound calling", ivr: "A separate dialler, often a recorded message", agent: "The same agent holds a two-way conversation on outbound campaigns" },
  { label: "Insight after the call", ivr: "Key presses and call duration", agent: "Full transcript, summary, and the information the caller gave" },
  { label: "Languages", ivr: "One recording per language per menu", agent: "An agent set to the language your callers speak" },
];

export default function VoiceVsIvr() {
  return (
    <section className="relative border-t border-border/60 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Compared</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            A menu asks callers to fit in. An agent lets them <span className="brand-gradient-x bg-clip-text text-transparent">just ask</span>.
          </h2>
        </div>

        <div data-reveal className="mt-12 overflow-x-auto rounded-3xl border border-border/70 bg-surface shadow-[0_30px_70px_-40px_rgba(0,120,200,0.35)]">
          <table className="w-full min-w-[680px] border-collapse text-left text-[16px]">
            <thead>
              <tr>
                <th className="px-5 py-5 font-medium text-mist"> </th>
                <th className="px-5 py-5 font-medium text-mist">Traditional IVR</th>
                <th className="whitespace-nowrap bg-[#0078C8] px-5 py-5 font-display text-[16px] font-semibold text-white">AI Voice Agent</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-border/50 transition-colors hover:bg-[#0078C8]/[0.03]">
                  <td className="px-5 py-4 align-top font-medium text-paper">{r.label}</td>
                  <td className="px-5 py-4 align-top text-mist">{r.ivr}</td>
                  <td className="bg-[#0078C8]/[0.07] px-5 py-4 align-top font-medium text-[#0078C8]">{r.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p data-reveal className="mx-auto mt-6 max-w-2xl text-center text-[16px] leading-relaxed text-mist">
          Both have a place. For a fixed message with a key press, such as confirming an interview slot, use{" "}
          <a href="/projects/ivr-outbound" className="font-medium text-azure-soft hover:text-aqua">IVR Outbound</a>. For callers who ask
          questions in their own words, use the AI Voice Agent.
        </p>
      </div>
    </section>
  );
}
