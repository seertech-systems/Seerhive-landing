import type { Audience, IconKey } from "@/lib/whoCanUse";

const icons: Record<IconKey, React.ReactNode> = {
  agency: <path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6M9 10h.01M15 10h.01" />,
  team: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 100-6M21 20c0-2.4-1.5-4.4-3.6-5.3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  finance: <path d="M6 5h12M6 10h12M9 5c5 0 6 5 0 5l6 9" />,
  manager: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
};

export default function WhoCanUse({
  heading,
  intro,
  audiences,
}: {
  heading: string;
  intro: string;
  audiences: Audience[];
}) {
  return (
    <section id="who" className="relative overflow-hidden border-t border-border/60 py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-[340px] w-[340px] glow-aqua opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center" data-reveal-stagger="80">
          <span data-reveal className="label-mono text-[12px] text-aqua">Who can use it</span>
          <h2 data-reveal className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            {heading}
          </h2>
          <p data-reveal className="mt-4 leading-relaxed text-mist">{intro}</p>
        </div>

        <div data-reveal-stagger="70" className="mt-12 flex flex-wrap justify-center gap-5">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              data-reveal
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.4px)] group relative overflow-hidden rounded-3xl border border-[#0078C8]/15 bg-surface2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0078C8]/40 hover:shadow-[0_24px_50px_-28px_rgba(0,120,200,0.55)]"
            >
              <span aria-hidden="true" className="pointer-events-none absolute right-5 top-4 font-display text-5xl font-semibold leading-none text-[#0078C8]/[0.07] transition-colors duration-300 group-hover:text-[#0078C8]/[0.14]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-[#0078C8] shadow-sm transition-all duration-300 group-hover:bg-[#0078C8] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#0078C8]/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
                  {icons[a.icon]}
                </svg>
              </span>
              <p className="mt-5 font-display text-[18px] font-semibold tracking-tight text-paper">{a.title}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-mist">{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
