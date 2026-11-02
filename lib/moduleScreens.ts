export type ModuleScreen = {
  id: string;
  tab: string;
  title: string;
  text: string;
  points: string[];
  image: string;
  alt: string;
};

/**
 * Real screens of the five AI modules, shown on each module's page. Keys are project slugs.
 * Captured from the current build with sample data: an input screen, then the real output.
 */
export const moduleScreens: Record<string, ModuleScreen[]> = {
  "resume-enhancer": [
    {
      id: "input",
      tab: "Upload and describe",
      title: "Add a resume and the job it is for",
      text: "Upload the resume you want to improve, then paste the job description or upload it as a file. Pick a single-column or two-column layout and start the enhancement.",
      points: ["Resume as PDF, DOCX or TXT, up to 10 MB", "Job description pasted or uploaded", "Single-column or two-column layout", "A checklist of details the resume should contain"],
      image: "/screens/resume-enhancer/1.png",
      alt: "Resume Enhancer with a resume uploaded and a job description pasted",
    },
    {
      id: "score",
      tab: "Match score",
      title: "See how much closer the resume is to the job",
      text: "The result shows the match with the job before and after, and counts the skills and keywords that were added. The summary explains what changed in plain words.",
      points: ["Match score before and after", "Skills, keywords and roles changed", "What is already strong and what is missing", "A written summary of every change"],
      image: "/screens/resume-enhancer/2.png",
      alt: "Resume Enhancer results with the score rising from 43 to 62",
    },
    {
      id: "resume",
      tab: "Improved resume",
      title: "Read the improved resume, with changes highlighted",
      text: "The improved resume sits beside the explanation. Highlights separate rewritten lines from added ones, and you can switch to a clean copy, compare with the original, or download it.",
      points: ["Highlighted and clean versions", "Compare with the original resume", "Download as a Word file", "Facts stay the candidate's own"],
      image: "/screens/resume-enhancer/3.png",
      alt: "Resume Enhancer showing the improved resume with highlighted changes",
    },
  ],
  "resume-analyser": [
    {
      id: "weights",
      tab: "Scoring weights",
      title: "Decide what matters most for the role",
      text: "Start from a preset or set the four weights yourself. Technology and skills, domain experience, education and experience must total 100%.",
      points: ["Presets: Balanced, Skills first, Domain first, Experience first", "Sliders for each of the four areas", "Weights must total 100%", "A plain explanation of how the score works"],
      image: "/screens/resume-analyser/1.png",
      alt: "Resume Analyzer scoring weights with the Skills first preset",
    },
    {
      id: "jd",
      tab: "Job description",
      title: "Add the job the resumes are scored against",
      text: "Paste the job description or upload it as a PDF, DOCX or TXT file. Every resume you add next is compared with it.",
      points: ["Paste text or upload a file", "At least 50 characters, up to 40,000", "Hints on what to mention", "Your setup summarised on the right"],
      image: "/screens/resume-analyser/2.png",
      alt: "Resume Analyzer with a job description added",
    },
    {
      id: "resumes",
      tab: "Add resumes",
      title: "Drop in the resumes to compare",
      text: "Add several resumes in one go. You can review the list before running the analysis.",
      points: ["PDF, DOCX or TXT resumes", "Several files at once", "Check the list, then analyse", "Back to change any earlier step"],
      image: "/screens/resume-analyser/3.png",
      alt: "Resume Analyzer with three resumes added",
    },
    {
      id: "ranking",
      tab: "Ranking",
      title: "See every candidate ranked by score",
      text: "Candidates are ranked by weighted score with a match status, experience, stability, location and career gap. Sort any column, filter the list or download the full report.",
      points: ["Top score, average score and strong matches", "Match status from Good to Perfect", "Sort and filter the table", "Download the complete analysis report"],
      image: "/screens/resume-analyser/4.png",
      alt: "Resume Analyzer ranking three candidates by match score",
    },
    {
      id: "profile",
      tab: "Candidate profile",
      title: "Open a candidate to see why they scored as they did",
      text: "Each candidate has a profile summary, key strengths and areas of concern, with tabs for scoring, experience match, stability and profile.",
      points: ["Score ring and match status", "Experience, average tenure and stability", "Key strengths and areas of concern", "Download the analysis for that person"],
      image: "/screens/resume-analyser/5.png",
      alt: "Resume Analyzer candidate profile with strengths and concerns",
    },
  ],
  "resume-templates": [
    {
      id: "profile",
      tab: "Choose a level",
      title: "Start from experience level and target role",
      text: "Pick how much experience the person has, then optionally a target role and domain. The level decides what the template shows first.",
      points: ["Fresher to Executive levels", "Optional target role and domain", "Quick suggestions to tap", "Single-column or two-column layout"],
      image: "/screens/resume-templates/1.png",
      alt: "Resume Template Builder with Mid-level, Backend Developer and SaaS chosen",
    },
    {
      id: "result",
      tab: "Generated template",
      title: "Get a ready-to-edit resume template",
      text: "The builder writes a complete template with placeholders for personal details. Download it as a Word document, or generate the other layout to compare.",
      points: ["Summary, skills, experience, projects and education", "Placeholders where your details go", "Download as a Word document", "Generate the two-column version too"],
      image: "/screens/resume-templates/2.png",
      alt: "Resume Template Builder showing a generated single-column template",
    },
  ],
  "interview-questions": [
    {
      id: "input",
      tab: "Job description and types",
      title: "Describe the role, then choose the questions",
      text: "Paste a job description, pick coding, theoretical or scenario questions, and set how many you need.",
      points: ["Questions for a role or for a candidate", "Coding, theoretical and scenario types", "Between 5 and 40 questions", "A summary of your question set"],
      image: "/screens/interview-questions/1.png",
      alt: "Interview Question Generator with a job description and question types chosen",
    },
    {
      id: "output",
      tab: "Questions and answers",
      title: "Get questions with an expected answer for each",
      text: "Every question comes with an expected answer you can show or hide. Search the set, copy a question, or download everything as a PDF or Excel file.",
      points: ["Expected answer on demand", "Search questions and answers", "Download as PDF or Excel", "Generate a fresh set from the same input"],
      image: "/screens/interview-questions/2.png",
      alt: "Interview Question Generator showing ten questions with an expected answer open",
    },
  ],
  "ingestion-dashboard": [
    {
      id: "overview",
      tab: "Overview",
      title: "See whether resumes are flowing",
      text: "Six counts answer the first question every morning: how many jobs in total, how many completed, how many are active now, how many failed, how many were duplicates and how many are waiting for a retry. A strip below shows the last 24 hours and a bar shows how all jobs split by status.",
      points: ["Total, completed, active, failed, duplicate and retry-pending counts", "Success rate and a last-24-hours summary", "Click the failed count to go to the failures", "Run Sync Now picks up new email and OneDrive items only, not a re-scan of history"],
      image: "/screens/ingestion-dashboard/overview.png",
      alt: "Ingestion Dashboard overview with six job counts and a Run Sync Now button",
    },
    {
      id: "jobs",
      tab: "Jobs",
      title: "Find any resume file",
      text: "Every file the pipeline has touched is a row. Search by file name across the whole dataset, then narrow by status, source, account or error. Retry all failed jobs from the same screen.",
      points: ["Filters for status, source, account and error", "Search across all file names, not just the page you are on", "Email and OneDrive sources marked on each row", "Retry all failed in one click"],
      image: "/screens/ingestion-dashboard/jobs.png",
      alt: "Ingestion Dashboard jobs list with filters and status badges",
    },
    {
      id: "detail",
      tab: "Job detail",
      title: "See exactly where a file got to",
      text: "Open a job to see its status timeline from discovered through queued, processing, downloaded, classified, parsed and stored to completed, followed by its source, account, file size and when it was received. The job's own address can be shared with a colleague.",
      points: ["A stage-by-stage status timeline", "Source, account, file size and time received", "The job ID in the address, ready to share", "Opens over the list so you keep your place"],
      image: "/screens/ingestion-dashboard/job-detail.png",
      alt: "Ingestion Dashboard job detail panel with a status timeline",
    },
    {
      id: "accounts",
      tab: "Accounts",
      title: "Control what gets scanned",
      text: "Each connected mailbox has its own card showing whether it is active, with switches for Active, Delta Sync and Backfill, its priority and the date it is scanned from. The header counts how many are active and lets you add a recruiter.",
      points: ["A card for every connected account", "Active, Delta Sync and Backfill switches", "Priority and scan-from date on each card", "Count of active accounts, and an Add recruiter button"],
      image: "/screens/ingestion-dashboard/accounts.png",
      alt: "Ingestion Dashboard accounts with Active, Delta Sync and Backfill switches",
    },
    {
      id: "failures",
      tab: "Failures",
      title: "See what broke, and where",
      text: "Failed documents are grouped by the stage where they stopped: text extraction, download, classification or SharePoint upload. Each row shows the reason and whether it is pending, retrying or already handled, and you can retry everything pending at once.",
      points: ["Counts by stage, shown as filter chips", "The reason for each failure", "Pending and Retrying status on each row", "Retry all pending, and a filter for items awaiting review"],
      image: "/screens/ingestion-dashboard/failures.png",
      alt: "Ingestion Dashboard failures grouped by stage with their reasons",
    },
    {
      id: "activity",
      tab: "Activity",
      title: "Watch it happen",
      text: "A live feed of jobs with the time, job ID, file name, status, source and account. It checks for new activity every 10 seconds, and you can pause it when you want to read.",
      points: ["Refreshes every 10 seconds", "Pause while you read", "Statuses including Completed, Failed, Retry Pending, Duplicate and Not A Resume", "Time, job ID, source and account on every line"],
      image: "/screens/ingestion-dashboard/activity.png",
      alt: "Ingestion Dashboard live activity feed with a Pause button",
    },
  ],
  "jd-preparation": [
    {
      id: "input",
      tab: "Describe the role",
      title: "Write about the role in your own words",
      text: "Type rough notes about the role. The generator turns them into a structured job description.",
      points: ["Plain language is fine, up to 10,000 characters", "Paste text or upload a file", "A checklist of what to include", "Ctrl + Enter to generate"],
      image: "/screens/jd-preparation/1.png",
      alt: "Job Description Generator with rough notes typed in",
    },
    {
      id: "output",
      tab: "Finished description",
      title: "Get a complete job description",
      text: "The result has the role, company, location, experience and employment type, then a summary, responsibilities, skills and qualifications. Edit any line, then download or copy it.",
      points: ["Structured sections ready to post", "Edit any line before you export", "Download as PDF or Word", "Generate again for a different version"],
      image: "/screens/jd-preparation/2.png",
      alt: "Job Description Generator showing a finished Backend Developer description",
    },
  ],
};
