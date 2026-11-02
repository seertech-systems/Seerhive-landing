import OpenAppLink from "./OpenAppLink";
import { getLiveUrl } from "@/lib/links";
import ProjectVisual from "./ProjectVisual";
import { projects } from "@/lib/projects";

const seerHive = projects.find((p) => p.slug === "seer-hive")!;

const capabilities = [
  {
    title: "Candidate pipeline",
    detail:
      "Follow each candidate from selection to offer, acceptance and onboarding. Declined offers, rejections and drop-offs stay visible.",
  },
  {
    title: "Clients and jobs",
    detail:
      "Manage client accounts and open jobs together, whether you hire for your own company or place candidates with clients.",
  },
  {
    title: "Interviews and recruitment",
    detail:
      "Schedule and follow interviews, and keep recruiter activity next to the pipeline it belongs to.",
  },
  {
    title: "From hiring to invoicing",
    detail:
      "Record and approve timesheets, then raise client invoices in the same system that tracked the hire.",
  },
];

export default function SeerHiveShowcase() {
  return (
    <section id="seerhive" className="relative py-24 lg:py-32 border-t border-border/60 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] glow-azure blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div data-reveal-stagger="90">
          <span data-reveal className="label-mono text-[12px] text-azure-soft">SeerHive HRMS</span>
          <h2 data-reveal className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-paper">
            One system for every hire,
            <br className="hidden sm:block" /> from selection to onboarding.
          </h2>
          <p data-reveal className="mt-5 text-mist leading-relaxed max-w-lg">
            SeerHive is the HRMS behind the platform. It is made for companies
            that hire for themselves and for staffing partners that place
            candidates with clients. Dashboards show where every hire stands.
          </p>

          <ul data-reveal-stagger="80" className="mt-10 space-y-6">
            {capabilities.map((c) => (
              <li data-reveal key={c.title} className="flex gap-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-aqua" />
                <div>
                  <p className="font-display text-[16px] font-semibold text-paper">
                    {c.title}
                  </p>
                  <p className="mt-1 text-[16px] leading-relaxed text-mist">
                    {c.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal className="cta-row mt-10 flex flex-wrap items-center gap-4">
            {getLiveUrl("seer-hive") && (
              <OpenAppLink
                href={getLiveUrl("seer-hive")!}
                className="btn-wave inline-flex rounded-full bg-aqua px-6 py-3.5 text-[16px] font-bold text-ink transition-colors"
              >
                Open SeerHive ↗
              </OpenAppLink>
            )}
          <a
                        href="/projects/seer-hive"
            className="btn-wave btn-wave--outline inline-flex rounded-full border border-border px-6 py-3.5 text-[16px] font-semibold text-paper transition-colors"
          >
            See inside SeerHive
          </a>
          </div>
        </div>

        {/* HRMS screen */}
        <div data-reveal="right" className={`relative rounded-3xl ${seerHive.screenshot ? "" : "border border-border bg-surface/70 p-3 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]"}`}>
          <div className={seerHive.screenshot ? "" : "aspect-[4/3]"}>
            <ProjectVisual project={seerHive} />
          </div>
        </div>
      </div>
    </section>
  );
}
