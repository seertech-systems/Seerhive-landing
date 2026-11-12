/**
 * Live app links: the one place to edit when a module moves.
 * Keys are the project slugs from lib/projects.ts.
 */
export const LIVE_LINKS: Record<string, string> = {
  "resume-enhancer": "https://recruit.seerhive.com/",
  "resume-analyzer": "https://recruit.seerhive.com/",
  "ivr-outbound": "https://ivr.seerhive.com/",
  "voice-ai-agent": "https://voiz.seerhive.com/",
  "ingestion-dashboard": "https://pipeline.seerhive.com/", // Resume Data Pipeline
  "seer-hive": "https://app.seerhive.com/",
};

/** Company contact details: the one place to edit them. */
export const CONTACT = {
  // TODO confirm final email/website domain
  email: "sales@seertechsystems.in",
  phone: "+91 90435 71075",
  phoneHref: "tel:+919043571075",
  linkedin: "https://www.linkedin.com/company/seertechsystems",
  addressLines: ["SeerTech Systems,", "Prince Info City I, 1, Rajiv Gandhi Salai,", "Nehru Nagar, Perungudi,", "Chennai, Tamil Nadu 600096"],
};

/** Live URL for a project slug, or undefined when none is set. */
export function getLiveUrl(slug: string): string | undefined {
  return LIVE_LINKS[slug];
}
