/**
 * Live app links: the one place to edit when a module moves.
 * Keys are the project slugs from lib/projects.ts.
 */
export const LIVE_LINKS: Record<string, string> = {
  "resume-enhancer": "http://8.234.83.185:3004",
  "ivr-outbound": "http://8.234.83.185:8000",
  // "voice-ai-agent": no public app URL yet. Add it here and the "Open app" buttons appear.
  "seer-hive": "http://8.234.83.185:3006",
  "resume-analyser": "http://8.234.83.185:3001",
  "resume-templates": "http://8.234.83.185:3005",
  "interview-questions": "http://8.234.83.185:3002",
  "jd-preparation": "http://8.234.83.185:3003",
};

/** Live URL for a project slug, or undefined when none is set. */
export function getLiveUrl(slug: string): string | undefined {
  return LIVE_LINKS[slug];
}
