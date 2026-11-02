/** One outline icon per module, keyed by project slug. Drawn on a 24x24 grid. */
export function ModuleIconPaths({ slug }: { slug: string }) {
  switch (slug) {
    case "resume-enhancer":
      return (
        <>
          <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z" />
          <path d="M19 15v5M16.5 17.5h5" />
        </>
      );
    case "ivr-outbound":
      return (
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
      );
    case "voice-ai-agent":
      return (
        <>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0014 0M12 18v3M8 21h8" />
        </>
      );
    case "ingestion-dashboard":
      return (
        <>
          <path d="M3 5h18l-7 8v6l-4 2v-8z" />
        </>
      );
    case "seer-hive":
      return (
        <>
          <path d="M12 3l7 4v8l-7 4-7-4V7z" />
          <path d="M12 8.5l3 1.7v3.6l-3 1.7-3-1.7v-3.6z" />
        </>
      );
    case "resume-analyser":
      return (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l5 5" />
          <path d="M8.5 13v-2M11 13V9M13.5 13v-3" />
        </>
      );
    case "resume-templates":
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M9 9v11" />
        </>
      );
    case "interview-questions":
      return (
        <>
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M10 9.5a2 2 0 114 0c0 1.5-2 1.6-2 3M12 14.5v.01" />
        </>
      );
    case "jd-preparation":
      return (
        <>
          <path d="M6 3h8l4 4v14H6z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
        </>
      );
    default:
      return <circle cx="12" cy="12" r="5" />;
  }
}

export default function ModuleIcon({
  slug,
  className = "h-4 w-4",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <ModuleIconPaths slug={slug} />
    </svg>
  );
}
