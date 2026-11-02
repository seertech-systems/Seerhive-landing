import type { MockVariant } from "@/lib/projects";
import HexWave from "./HexWave";

function Chrome({
  label,
  children,
  compact,
}: {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-chromeBorder bg-chromeInk overflow-hidden h-full flex flex-col">
      <div
        className={`flex items-center justify-between border-b border-chromeBorder ${
          compact ? "px-3 py-2" : "px-5 py-3.5"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="hex h-4 w-4 bg-gradient-to-br from-chromeAqua to-chromeAzure" />
          {!compact && (
            <span className="font-mono text-[12px] tracking-[0.18em] uppercase text-chromeMist">
              {label}
            </span>
          )}
        </div>
        <span className="h-1.5 w-1.5 rounded-full bg-chromeAqua animate-pulseGlow" />
      </div>
      <div className={`flex-1 ${compact ? "p-2.5 space-y-1.5" : "p-5 space-y-3"}`}>
        {children}
      </div>
    </div>
  );
}

function Row({
  compact,
  children,
}: {
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border border-chromeBorder/70 bg-chrome/70 ${
        compact ? "px-2.5 py-1.5" : "px-4 py-3"
      }`}
    >
      {children}
    </div>
  );
}

export default function MockPanel({
  variant,
  compact = false,
}: {
  variant: MockVariant;
  compact?: boolean;
}) {
  const t = compact
    ? { title: "text-[12px]", sub: "text-[12px]", pill: "text-[12px] px-1.5 py-0.5" }
    : { title: "text-[16px]", sub: "text-[12px]", pill: "text-[12px] px-2 py-1" };

  switch (variant) {
    case "resume-analyser":
      return (
        <Chrome label="seerhive / resume-analyser" compact={compact}>
          {[
            { name: "P. Iyer", role: "Sr Backend Eng.", score: 94 },
            { name: "A. Khan", role: "Sr Backend Eng.", score: 88 },
            { name: "R. Mehta", role: "Sr Backend Eng.", score: 71 },
          ].map((c) => (
            <Row key={c.name} compact={compact}>
              <div>
                <p className={`${t.title} font-medium text-chromeText`}>{c.name}</p>
                {!compact && <p className={`${t.sub} text-chromeMist mt-0.5`}>{c.role}</p>}
              </div>
              <span className="font-display text-chromeAqua text-sm">{c.score}%</span>
            </Row>
          ))}
        </Chrome>
      );

    case "jd-preparation":
      return (
        <Chrome label="seerhive / jd-preparation" compact={compact}>
          <Row compact={compact}>
            <p className={`${t.title} text-chromeText`}>Senior Backend Engineer</p>
            <span className={`label-mono ${t.pill} rounded-full border border-chromeBorder text-chromeMist`}>
              Draft
            </span>
          </Row>
          {!compact && (
            <div className="rounded-xl border border-dashed border-chromeBorder/80 px-4 py-3 space-y-1.5">
              <p className="text-[12px] text-chromeMist">Must-have</p>
              <p className="text-[14px] text-chromeText">Go · Distributed systems · 5+ yrs</p>
            </div>
          )}
          <Row compact={compact}>
            <span className={`${t.sub} text-chromeMist`}>Bias check</span>
            <span className="text-chromeAqua text-[12px]">18/18 clear</span>
          </Row>
        </Chrome>
      );

    case "interview-questions":
      return (
        <Chrome label="seerhive / interview-questions" compact={compact}>
          {[
            "Walk me through the sharding change you shipped.",
            "How did you validate the migration was safe?",
          ].map((q, i) => (
            <Row key={i} compact={compact}>
              <p className={`${t.sub} text-chromeText leading-snug`}>{q}</p>
            </Row>
          ))}
          {!compact && (
            <div className="rounded-xl border border-chromeBorder/70 bg-chrome/70 px-4 py-3">
              <p className="text-[12px] text-chromeMist">Panel-ready kit</p>
              <p className="text-[14px] text-chromeAqua mt-0.5">18 questions · 3 rounds</p>
            </div>
          )}
        </Chrome>
      );

    case "resume-templates":
      return (
        <Chrome label="seerhive / resume-templates" compact={compact}>
          <div className={`grid grid-cols-3 ${compact ? "gap-1.5" : "gap-3"}`}>
            {["Technical", "Leadership", "Creative"].map((name) => (
              <div
                key={name}
                className="rounded-lg border border-chromeBorder/70 bg-chrome/70 p-2 flex flex-col gap-1"
              >
                <div className="h-1 w-2/3 rounded-full bg-chromeAzureSoft/60" />
                <div className="h-1 w-full rounded-full bg-chromeBorder" />
                <div className="h-1 w-full rounded-full bg-chromeBorder" />
                {!compact && <p className="mt-1 text-[12px] text-chromeMist">{name}</p>}
              </div>
            ))}
          </div>
          {!compact && (
            <Row>
              <span className="text-[12px] text-chromeMist">Export</span>
              <span className="text-chromeAqua text-[12px]">PDF · DOCX</span>
            </Row>
          )}
        </Chrome>
      );

    case "resume-enhancer":
      return (
        <Chrome label="seerhive / resume-enhancer" compact={compact}>
          <div className="rounded-xl border border-chromeBorder/70 bg-chrome/70 px-4 py-3">
            <p className="text-[12px] text-chromeMist line-through decoration-chromeMist/60">
              Responsible for backend services
            </p>
            {!compact && (
              <p className="mt-1.5 text-[14px] text-chromeText">
                Rebuilt backend services, cutting p95 latency 38%
              </p>
            )}
          </div>
          {!compact && (
            <Row>
              <span className="text-[12px] text-chromeMist">Fabricated claims</span>
              <span className="text-chromeAqua text-[12px]">0</span>
            </Row>
          )}
        </Chrome>
      );

    case "ivr-outbound":
      return (
        <Chrome label="seerhive / ivr-outbound" compact={compact}>
          {[
            { name: "P. Iyer", status: "Booked", hot: true },
            { name: "A. Khan", status: "Calling…", hot: false },
            { name: "R. Mehta", status: "Voicemail", hot: false },
          ].map((c) => (
            <Row key={c.name} compact={compact}>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-chromeAqua animate-pulseGlow" />
                <p className={`${t.title} font-medium text-chromeText`}>{c.name}</p>
              </div>
              <span
                className={`label-mono ${t.pill} rounded-full border border-chromeBorder ${
                  c.hot ? "text-chromeAqua" : "text-chromeMist"
                }`}
              >
                {c.status}
              </span>
            </Row>
          ))}
          {!compact && (
            <div className="rounded-xl border border-dashed border-chromeBorder/80 px-4 py-3">
              <p className="text-[12px] text-chromeMist">Transcript · P. Iyer</p>
              <p className="mt-1 text-[14px] text-chromeText">
                “I can start in 30 days, open to hybrid in Pune.”
              </p>
              <p className="mt-1.5 text-[12px] text-chromeAqua">
                Interview booked · Thu 3:00 PM
              </p>
            </div>
          )}
        </Chrome>
      );

    case "voice-ai-agent":
      return (
        <Chrome label="seerhive / voice-agent" compact={compact}>
          <div className="flex items-center justify-center">
            <HexWave who="agent" className={compact ? "h-24 w-24" : "h-36 w-36 sm:h-40 sm:w-40"} label="Voice agent speaking" />
          </div>
          {!compact && (
            <>
              <div className="rounded-xl border border-chromeAqua/30 bg-chromeAqua/10 px-4 py-2.5">
                <p className="label-mono text-[12px] text-chromeAquaSoft">Agent</p>
                <p className="mt-0.5 text-[14px] leading-snug text-chromeText">
                  On Saturdays the OPD is open from 9 in the morning to 1 in the afternoon.
                </p>
              </div>
              <Row>
                <span className="text-[12px] text-chromeMist">Answered from</span>
                <span className="font-mono text-[12px] text-chromeAqua">opd-timings.pdf</span>
              </Row>
              <p className="text-center text-[12px] text-chromeMist">Sample data</p>
            </>
          )}
        </Chrome>
      );

    case "ingestion-dashboard":
      return (
        <Chrome label="seerhive / ingestion" compact={compact}>
          <div className={`grid grid-cols-3 ${compact ? "gap-1.5" : "gap-3"}`}>
            {[
              ["Completed", "348"],
              ["Duplicates", "600"],
              ["Failed", "12"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-chromeBorder/70 bg-chrome/70 p-2">
                <p className="font-display text-[16px] text-chromeText">{v}</p>
                {!compact && <p className="text-[12px] text-chromeMist">{k}</p>}
              </div>
            ))}
          </div>
          {!compact && (
            <>
              <div className="flex h-16 items-end gap-1.5 rounded-xl border border-chromeBorder/70 bg-chrome/70 px-3 pb-2">
                {[30, 44, 38, 62, 50, 74, 58, 82, 66, 90].map((h, i) => (
                  <span key={i} className="flex-1 rounded-sm bg-chromeAqua/70" style={{ height: `${h}%` }} />
                ))}
              </div>
              <Row>
                <span className="text-[12px] text-chromeMist">Failure</span>
                <span className="text-[12px] text-chromeAqua">Retry · Resolve</span>
              </Row>
              <p className="text-center text-[12px] text-chromeMist">Sample data</p>
            </>
          )}
        </Chrome>
      );

    case "seer-hive":
    default:
      return (
        <Chrome label="seerhive / pipeline" compact={compact}>
          {[
            { role: "Sr Backend Engineer", client: "Acme Corp", stage: "Interview" },
            { role: "Product Designer", client: "TalentBridge → Nimbus", stage: "Screening" },
          ].map((row) => (
            <Row key={row.role} compact={compact}>
              <div>
                <p className={`${t.title} font-medium text-chromeText`}>{row.role}</p>
                {!compact && <p className={`${t.sub} text-chromeMist mt-0.5`}>{row.client}</p>}
              </div>
              <span className={`label-mono ${t.pill} text-chromeMist border border-chromeBorder rounded-full`}>
                {row.stage}
              </span>
            </Row>
          ))}
          {!compact && (
            <div className="flex items-center justify-between rounded-xl border border-dashed border-chromeBorder/80 px-4 py-3">
              <span className="text-[14px] text-chromeMist">214 candidates scored today</span>
              <span className="h-1.5 w-1.5 rounded-full bg-chromeAqua animate-pulseGlow" />
            </div>
          )}
        </Chrome>
      );
  }
}
