import type { Project } from "@/lib/projects";
import MockPanel from "./MockPanel";

/**
 * Real product screenshot when the project has one, otherwise the illustrative
 * mock. The screenshot sits in a browser-style window (three small hexagons in
 * the logo's blues) and is always shown in full, never cropped or zoomed.
 */
export default function ProjectVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  if (!project.screenshot || compact) {
    return <MockPanel variant={project.mock} compact={compact} />;
  }

  return (
    <div className="flex h-full w-full items-center">
      <div className="shot-frame group w-full overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_40px_100px_-40px_rgba(10,108,255,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_50px_110px_-40px_rgba(10,108,255,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-[#0078C8] bg-[#0078C8] px-4 py-2.5">
          <span className="ml-3 label-mono text-[12px] text-white">{project.name}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.screenshot}
          alt={`${project.name} screen`}
          loading="lazy"
          draggable={false}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
