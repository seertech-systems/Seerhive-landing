import HiveBackground from "@/components/HiveBackground";
import OpenAppLink from "@/components/OpenAppLink";
import { getLiveUrl } from "@/lib/links";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import ModuleIcon from "@/components/ModuleIcon";
import ProjectVisual from "@/components/ProjectVisual";
import SeerHiveFeatures from "@/components/SeerHiveFeatures";
import IvrFeatures from "@/components/IvrFeatures";
import IvrTimingGraphic from "@/components/IvrTimingGraphic";
import VoiceCallDemo from "@/components/VoiceCallDemo";
import VoiceTrust from "@/components/VoiceTrust";
import VoiceVsIvr from "@/components/VoiceVsIvr";
import IngestionFlow from "@/components/IngestionFlow";
import ModuleScreens from "@/components/ModuleScreens";
import { moduleScreens } from "@/lib/moduleScreens";
import WhoCanUse from "@/components/WhoCanUse";
import ScreenCollage from "@/components/ScreenCollage";
import { whoCanUse } from "@/lib/whoCanUse";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found — SeerHive" };
  return {
    title: `${project.name} — SeerHive`,
    description: project.description,
  };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.id !== project.id).slice(0, 3);
  const accentText = project.accent === "aqua" ? "text-aqua" : "text-azure-soft";
  const accentBg = project.accent === "aqua" ? "bg-aqua text-ink hover:bg-aqua-soft" : "bg-azure text-white hover:bg-azure-soft hover:text-ink";

  return (
    <main className="min-h-screen bg-ink">
      {/* Header */}
      <section className="relative overflow-hidden pt-[72px]">
        <HiveBackground />
        <div className="absolute -top-32 right-0 h-[380px] w-[380px] glow-azure blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-16 lg:pt-16 lg:pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div data-reveal-stagger="100" className="copy-blur">
            <div data-reveal className="flex items-center gap-3">
              <span className="hex-border relative h-11 w-11 hex bg-ink grid place-items-center">
                <ModuleIcon slug={project.slug} className="h-5 w-5 text-aqua" />
              </span>
              <span className="label-mono text-[12px] text-mist">
                {project.kind} · SeerHive
              </span>
            </div>

            <h1 data-reveal className="mt-6 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-paper leading-[1.08]">
              {project.name}
            </h1>
            <p data-reveal className={`mt-3 text-[16px] font-medium ${accentText}`}>{project.tagline}</p>
            <p data-reveal className="mt-5 max-w-lg text-mist leading-relaxed">{project.longDescription}</p>

            <div data-reveal className="cta-row mt-9 flex flex-wrap items-center gap-4">
              {getLiveUrl(project.slug) && (
                <OpenAppLink
                  href={getLiveUrl(project.slug)!}
                  className={`rounded-full px-6 py-3.5 text-[16px] font-semibold transition-colors ${accentBg}`}
                >
                  Open {project.name} ↗
                </OpenAppLink>
              )}
              <a
                href="/contact"
                className="btn-wave btn-wave--outline rounded-full border border-border px-6 py-3.5 text-[16px] font-semibold text-paper transition-colors"
              >
                Talk to SeerHive
              </a>
              <a
                href="/#agents"
                className="btn-wave btn-wave--outline rounded-full border border-border px-6 py-3.5 text-[16px] font-semibold text-paper transition-colors"
              >
                ← All products
              </a>
            </div>

            <dl data-reveal className="mt-10 grid gap-3 sm:grid-cols-3">
              {project.stats.map((s) => (
                <div
                  key={s.label}
                  className="group flex flex-col rounded-2xl border border-border/70 bg-surface/90 p-4 shadow-[0_18px_40px_-28px_rgba(0,120,200,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0078C8] hover:shadow-[0_22px_44px_-26px_rgba(0,120,200,0.7)]"
                >
                  <dt className="label-mono flex items-center gap-2 text-[12px] text-mist">
                    <span aria-hidden="true" className="hex h-3 w-[10px] shrink-0 bg-[#0078C8]" />
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-[18px] font-semibold leading-snug text-paper">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {moduleScreens[project.slug] && moduleScreens[project.slug].length >= 2 ? (
            <div data-reveal="right">
              <ScreenCollage
                name={project.name}
                shots={(() => {
                  const sc = moduleScreens[project.slug];
                  const pick = [sc[sc.length - 1], sc[0], sc[Math.min(1, sc.length - 1)]];
                  return pick.map((x) => ({ src: x.image, label: x.tab })) as [
                    { src: string; label: string },
                    { src: string; label: string },
                    { src: string; label: string },
                  ];
                })()}
              />
            </div>
          ) : (
            <div data-reveal="right" className={`rounded-3xl ${project.screenshot ? "" : "border border-border bg-surface/70 p-3 shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)]"}`}>
              <div className={project.screenshot ? "" : "aspect-[4/3]"}>
                <ProjectVisual project={project} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What it evaluates / covers */}
      <section className="relative py-20 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span data-reveal className="label-mono text-[12px] text-azure-soft">
            What {project.name} covers
          </span>
          <h2 data-reveal className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-paper max-w-2xl">
            What it does.
          </h2>
          <div data-reveal-stagger="70" className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 border-t border-border/70 pt-8">
            {project.evaluates.map((e) => (
              <div data-reveal key={e.title}>
                <p className="font-display text-[16px] font-semibold text-paper">{e.title}</p>
                <p className="mt-1.5 text-[16px] leading-relaxed text-mist">{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.slug === "seer-hive" && <SeerHiveFeatures />}
      {project.slug === "ivr-outbound" && (
        <>
          <IvrTimingGraphic />
          <IvrFeatures />
        </>
      )}
      {project.slug === "ingestion-dashboard" && (
        <IngestionFlow />
      )}
      {project.slug === "voice-ai-agent" && (
        <>
          <VoiceCallDemo />
          <VoiceTrust />
          <VoiceVsIvr />
        </>
      )}
      {moduleScreens[project.slug] && (
        <ModuleScreens name={project.name} screens={moduleScreens[project.slug]} />
      )}

      {/* How it works */}
      <section className="relative overflow-hidden py-20 lg:py-24 border-t border-border/60 bg-surface2/40">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 glow-azure opacity-40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span data-reveal className="label-mono text-[12px] text-aqua">How it works</span>
            <h2 data-reveal className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-paper">
              Up and running in {project.steps.length} steps
            </h2>
          </div>

          <ol data-reveal-stagger="90" className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {/* connecting line between the step badges (desktop) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px border-t border-dashed border-aqua/50 lg:block"
            />
            {project.steps.map((step, i) => (
              <li data-reveal key={step.title} className="group relative flex flex-col items-center text-center">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl brand-gradient font-display text-lg font-semibold text-white shadow-lg shadow-[#0078C8]/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                  {i + 1}
                </span>
                <div className="card-wave card-wave--group mt-6 w-full flex-1 rounded-3xl border border-border/70 bg-surface p-6 shadow-[0_20px_50px_-34px_rgba(15,40,90,0.4)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-aqua/50">
                  <p className="font-display text-[18px] font-semibold tracking-tight text-paper">
                    {step.title}
                  </p>
                  <p className="mt-2 text-[16px] leading-relaxed text-mist">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {whoCanUse[project.slug] && (
        <WhoCanUse heading={whoCanUse[project.slug].heading} intro={whoCanUse[project.slug].intro} audiences={whoCanUse[project.slug].audiences} />
      )}

      {/* Related projects */}
      <section className="relative py-20 border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <span data-reveal className="label-mono text-[12px] text-mist">More from SeerHive</span>
          <div data-reveal-stagger="80" className="mt-6 grid sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <a
                data-reveal
                key={p.id}
                href={p.href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#0078C8]/15 bg-surface2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0078C8]/40 hover:shadow-[0_24px_50px_-28px_rgba(0,120,200,0.55)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface text-[#0078C8] shadow-sm transition-all duration-300 group-hover:bg-[#0078C8] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#0078C8]/30">
                    <ModuleIcon slug={p.slug} className="h-[22px] w-[22px]" />
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[#0078C8]/20 bg-surface text-[#0078C8] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-[#0078C8] group-hover:bg-[#0078C8] group-hover:text-white">
                    →
                  </span>
                </div>
                <p className="mt-6 font-display text-[18px] font-semibold tracking-tight text-paper">{p.name}</p>
                <p className="mt-2 text-[16px] leading-relaxed text-mist">{p.tagline}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 border-t border-border/60">
        <div data-reveal-stagger="80" className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <h2 data-reveal className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-paper">
            See {project.name} in action.
          </h2>
          <p data-reveal className="mt-3 text-mist">
            Reach the SeerHive team directly and we will take it from there.
          </p>
          <a
            data-reveal
            href="/contact"
            className="btn-wave mt-8 inline-flex rounded-full bg-aqua px-7 py-3.5 text-[16px] font-semibold text-ink transition-colors"
          >
            Talk to us
          </a>
        </div>
      </section>
    </main>
  );
}
