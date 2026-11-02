const rows = [
  { feature: "Resume scoring, job descriptions and interview questions", seerhive: "Built in", separate: "Different tools", sheets: "Manual" },
  { feature: "One candidate record from selection to payroll", seerhive: "Yes", separate: "Copied between tools", sheets: "Copied by hand" },
  { feature: "Offer letters made from the record", seerhive: "Yes", separate: "Sometimes", sheets: "Written by hand", separatePartial: true },
  { feature: "Timesheets approved before payroll and invoices", seerhive: "Yes", separate: "Separate system", sheets: "Manual checks" },
  { feature: "Contract and permanent placements tracked apart", seerhive: "Yes", separate: "Varies", sheets: "Extra sheets", separatePartial: true },
  { feature: "Start with one tool and add more later", seerhive: "Yes", separate: "Yes", sheets: "Not applicable", separateOk: true },
];

function Check() {
  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0078C8] text-white shadow-sm shadow-[#0078C8]/30">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
    </span>
  );
}

function Muted({ kind }: { kind: "ok" | "partial" | "no" }) {
  const cls =
    kind === "ok"
      ? "bg-[#0078C8]/15 text-[#0078C8]"
      : kind === "partial"
        ? "bg-amber-500/15 text-amber-600"
        : "bg-mist/15 text-mist";
  return (
    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${cls}`}>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {kind === "ok" ? <path d="M3.5 8.5l3 3 6-7" /> : kind === "partial" ? <path d="M4 8h8" /> : <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />}
      </svg>
    </span>
  );
}

const cell = "px-5 py-4 align-middle";

export default function ComparisonTable() {
  return (
    <section id="compare" className="relative border-t border-border/60 py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Compared</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            SeerHive next to the usual ways of working
          </h2>
          <p data-reveal className="mt-4 text-mist">
            Most teams use several separate tools or a set of spreadsheets. This is how that compares.
          </p>
        </div>

        <div data-reveal className="mt-12 overflow-x-auto rounded-3xl border border-border/70 bg-surface shadow-[0_30px_70px_-40px_rgba(0,120,200,0.35)]">
          <table className="w-full min-w-[720px] border-collapse text-left text-[16px]">
            <thead>
              <tr>
                <th className="px-5 py-5 font-medium text-mist">What you need</th>
                <th className="whitespace-nowrap bg-[#0078C8] px-5 py-5 font-display text-[16px] font-semibold text-white">
                  SeerHive
                  <span className="ml-2 hidden rounded-full bg-white/20 lg:inline-block px-2 py-0.5 align-middle label-mono text-[12px] font-semibold">All in one</span>
                </th>
                <th className="px-5 py-5 font-medium text-mist">Separate tools</th>
                <th className="px-5 py-5 font-medium text-mist">Spreadsheets</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature} className="border-t border-border/50 transition-colors hover:bg-[#0078C8]/[0.03]">
                  <td className={`${cell} font-medium text-paper`}>{r.feature}</td>
                  <td className={`${cell} bg-[#0078C8]/[0.07]`}>
                    <span className="flex items-center gap-2.5 font-semibold text-[#0078C8]">
                      <Check />
                      {r.seerhive}
                    </span>
                  </td>
                  <td className={`${cell} text-mist`}>
                    <span className="flex items-center gap-2.5">
                      <Muted kind={r.separateOk ? "ok" : r.separatePartial ? "partial" : "no"} />
                      {r.separate}
                    </span>
                  </td>
                  <td className={`${cell} text-mist`}>
                    <span className="flex items-center gap-2.5">
                      <Muted kind="no" />
                      {r.sheets}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
