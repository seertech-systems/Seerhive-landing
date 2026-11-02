export type MockVariant =
  | "resume-analyser"
  | "jd-preparation"
  | "interview-questions"
  | "resume-templates"
  | "resume-enhancer"
  | "ivr-outbound"
  | "voice-ai-agent"
  | "ingestion-dashboard"
  | "seer-hive";

export type Project = {
  id: string;
  slug: string;
  index: string;
  name: string;
  shortName: string;
  category: "agent" | "core";
  /** Short label shown next to the project, e.g. "AI module". */
  kind: string;
  accent: "aqua" | "azure";
  tagline: string;
  description: string;
  longDescription: string;
  mock: MockVariant;
  /** Real product screenshot (public/); falls back to the mock panel when absent. */
  screenshot?: string;
  /** Point of interest (0-1, x then y) that the pop-out magnifier zooms into. */
  screenshotFocus?: [number, number];
  /** Width / height of the screenshot; defaults to 2112/1600. */
  screenshotRatio?: number;
  /** Optional second screen shown in the pop-out magnifier instead of a close-up of the main one. */
  detailScreenshot?: string;
  /** Point of interest (0-1, x then y) of `detailScreenshot` that the pop-out zooms into. */
  detailFocus?: [number, number];
  /** How far the pop-out magnifies `detailScreenshot` (default 3.4). Lower shows a wider area. */
  detailZoom?: number;
  /** Width / height of `detailScreenshot`; defaults to the main screenshot's ratio. */
  detailRatio?: number;
  /** Short line naming what the pop-out screen does, shown as a label on it. */
  detailCaption?: string;
  evaluates: { title: string; detail: string }[];
  steps: { title: string; detail: string }[];
  stats: { label: string; value: string }[];
  href: string;
};

export const projects: Project[] = [
  {
    id: "resume-enhancer",
    slug: "resume-enhancer",
    index: "01",
    name: "Resume Enhancer",
    shortName: "Enhancer",
    category: "agent",
    kind: "AI module",
    accent: "aqua",
    tagline: "Fit a resume to a job description without adding anything false.",
    description:
      "Upload a resume and a job description to get an improved version of the resume. You see the match score before and after, and each change is explained.",
    longDescription:
      "A good resume is written for a specific job. The Resume Enhancer rewords and reorders what is already in a resume so that it suits the job description. It never adds experience or skills that the candidate does not have.",
    mock: "resume-enhancer",
    screenshot: "/screens/resume-enhancer/2.png",
    detailScreenshot: "/screens/resume-enhancer/old-detail.png",
    detailRatio: 1.6,
    detailFocus: [0.3, 0.4],
    detailZoom: 2.2,
    detailCaption: "Upload a resume and a job description",
    screenshotFocus: [0.34, 0.38],
    evaluates: [
      { title: "Match score before and after", detail: "See how well the resume fits the job description, and how much the match improved after enhancement." },
      { title: "Every change explained", detail: "Every change is explained section by section, so you always know what was edited and why." },
      { title: "Highlighted and clean versions", detail: "Download a Word file with rewritten text highlighted in yellow and new text in green, or a clean copy that is ready to send. Both come in a single-column or two-column layout." },
      { title: "Facts stay yours", detail: "It only rewords and reorders what is already in the resume. It does not add experience or skills." },
      { title: "Common file formats", detail: "Upload the resume as a PDF, DOCX or TXT file of up to 10 MB." },
      { title: "Tailored to the job", detail: "Paste or upload the job description that the resume should be matched to." },
    ],
    steps: [
      { title: "Upload the resume", detail: "PDF, DOCX or TXT." },
      { title: "Add the job description", detail: "Paste it or upload it." },
      { title: "Enhance", detail: "The resume is reworded and reordered to suit the role." },
      { title: "Review and download", detail: "Read the changes, then download the version you need." },
    ],
    stats: [
      { label: "Match score", value: "Before & after" },
      { label: "Download", value: "Word" },
      { label: "File size", value: "Up to 10 MB" },
    ],
    href: "/projects/resume-enhancer",
  },
  {
    id: "ivr-outbound",
    slug: "ivr-outbound",
    index: "02",
    name: "IVR Outbound",
    shortName: "IVR Outbound",
    category: "agent",
    kind: "Voice automation",
    accent: "azure",
    tagline: "Personalised reminder calls, timed to each person, answered with one key press.",
    description:
      "Build a call flow once, then call every contact in a natural voice with their own name, date and time. Missed calls are retried, Do-Not-Call numbers are skipped, and every keypad response is saved.",
    longDescription:
      "IVR Outbound makes the reminder and confirmation calls your team should not have to dial by hand: interview confirmations, appointment reminders, payment due dates. You design a \"Press 1 to confirm, 2 to reschedule\" flow in a visual builder, add your contacts, choose a voice and decide when each call goes out, now, at a fixed time, or a set number of minutes before each person's own appointment. Afterwards you can see who confirmed, who declined and who needs a personal follow-up. It is the keypad module: it plays your message and records the key pressed. For open conversations that answer questions, see the AI Voice Agent.",
    mock: "ivr-outbound",
    screenshot: "/screens/ivr-outbound/main.png",
    detailScreenshot: "/screens/ivr-outbound/detail.png",
    detailRatio: 1.6,
    detailFocus: [0.47, 0.76],
    detailZoom: 1.9,
    detailCaption: "Reusable call flows with variables",
    screenshotRatio: 1.6,
    screenshotFocus: [0.36, 0.7],
    evaluates: [
      { title: "Visual call-flow builder", detail: "Design \"Press 1 / Press 2\" flows on screen with no coding. The builder flags mistakes before a single call goes out." },
      { title: "Personalised at scale", detail: "Every call uses the person's own name, role, date, time or amount, and dates and times are spoken the way a person would say them." },
      { title: "Smart scheduling", detail: "Call everyone now, at a fixed time, or a set number of minutes before each person's own appointment, in the right time zone." },
      { title: "Natural voices", detail: "Choose a voice for each campaign and preview it first. You can also create a custom brand voice from recorded samples." },
      { title: "Mixed-language prompts", detail: "Mix Hindi or Tamil with English in one sentence, and each part is spoken in the right language voice." },
      { title: "Easy contact upload", detail: "Upload spreadsheets, text, Word or PDF files, type contacts in, or import scheduled interviews from SeerHive ATS. Map your columns once." },
      { title: "Automatic retries", detail: "Unanswered, busy or failed calls are retried up to the number of attempts you set, with the gap you choose." },
      { title: "Do-Not-Call protection", detail: "Numbers on your Do-Not-Call list are blocked when the campaign is built and again just before dialling." },
      { title: "Campaign controls", detail: "Pause, resume or cancel a running campaign, cap how many calls run at once, and skip people whose call window has passed." },
      { title: "Live monitor and call log", detail: "Watch calls and responses as they arrive, then open any call to see what the agent said and which key was pressed, step by step." },
      { title: "Checked before launch", detail: "A preview confirms that every contact has the details the script needs, so a missing date is caught before any call is placed." },
      { title: "Dashboard and reports", detail: "See progress and outcomes at a glance, and download the results as a spreadsheet for follow-up." },
    ],
    steps: [
      { title: "Add your contacts", detail: "Upload a file, type them in, or import interviews from SeerHive ATS, then map the columns." },
      { title: "Build the call script", detail: "Write what the agent says and what happens on 1, 2 or 3, or start from a template." },
      { title: "Set up the campaign", detail: "Pick the script, the list and the voice, then choose when to call." },
      { title: "Launch and follow up", detail: "Watch it live, open any call, and act on declines and unreachable contacts from the report." },
    ],
    stats: [
      { label: "Timing", value: "Per person" },
      { label: "Failed calls", value: "Auto-retry" },
      { label: "Languages", value: "Hindi · Tamil · English" },
    ],
    href: "/projects/ivr-outbound",
  },
  {
    id: "voice-ai-agent",
    slug: "voice-ai-agent",
    index: "03",
    name: "AI Voice Agent",
    shortName: "Voice Agent",
    category: "agent",
    kind: "Voice AI",
    accent: "aqua",
    tagline: "An AI agent that answers and makes your business calls, from your own knowledge.",
    description:
      "It picks up inbound calls, holds a natural conversation, and answers from the documents you upload. When a caller needs a person, it takes their details and sends a callback request to your team.",
    longDescription:
      "Your team answers the same questions on the phone all day: timings, documents, schedules, status. The AI Voice Agent takes those calls. Callers speak in their own words, can interrupt mid-sentence, and get answers drawn from your approved documents, not from guesswork. It also runs outbound campaigns from a contact list, retrying unanswered calls and skipping anyone who opted out. If it cannot find the answer, or the caller asks for a person, it stops guessing, collects their details and creates a callback request. Every call is logged with a transcript and a summary.",
    mock: "voice-ai-agent",
    evaluates: [
      { title: "Natural voice conversations", detail: "Callers speak normally and can interrupt mid-sentence, as they would with a person. There are no menus to navigate." },
      { title: "Answers from your knowledge", detail: "Upload documents, web pages or notes. The agent answers from that content, so answers stay consistent with your policies." },
      { title: "Inbound call handling", detail: "Assign a business phone number to an agent and it picks up every call, day or night." },
      { title: "Outbound campaigns", detail: "Upload a contact list as CSV or Excel, choose an agent, and the platform dials it with your concurrency and call-length limits." },
      { title: "Retries and opt-outs", detail: "Unanswered or busy calls are retried on a schedule you set, and contacts who opted out are skipped automatically." },
      { title: "Hand-off to your team", detail: "When a caller asks for a person, or the agent cannot answer, it collects their details and sends a callback request, with the conversation, by email and in the console." },
      { title: "Stays on topic", detail: "You define what the agent may discuss. It politely redirects off-topic or abusive callers and ends the call after a limit you set." },
      { title: "Built-in guardrails", detail: "Blocks attempts to manipulate the agent, avoids topics you forbid, and keeps personal data such as phone and card numbers out of its spoken replies." },
      { title: "Caller verification", detail: "For staff helplines, the agent can confirm an employee number, name or department against your user directory before it helps." },
      { title: "Information capture", detail: "Define the fields you need, such as a preferred date or reason for calling, and the platform pulls the answers out of each conversation." },
      { title: "Transcripts and summaries", detail: "Every call is logged with its full transcript and a short summary, so supervisors can review any conversation." },
      { title: "Languages, voice and tone", detail: "English and major Indian languages, including Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati and Punjabi. Pick a voice, including a cloned one, and a tone." },
      { title: "Reports and dashboard", detail: "See calls handled by the agent against calls passed to a person, results per agent and usage costs. Export reports to CSV or Excel." },
      { title: "Controlled go-live", detail: "Agents are versioned and approved before they are deployed, and you can test one by talking to it in the browser first." },
    ],
    steps: [
      { title: "Create your agent", detail: "Name it, describe its job in plain words, and choose its language, voice and tone." },
      { title: "Give it your knowledge", detail: "Upload documents, add web pages or paste text for it to answer from." },
      { title: "Set the safety net", detail: "Choose who receives callback requests, what details to collect and which guardrails apply." },
      { title: "Test, approve and go live", detail: "Talk to it in your browser, approve the version, then connect a number or launch a campaign." },
    ],
    stats: [
      { label: "Calls", value: "Inbound + outbound" },
      { label: "Answers from", value: "Your documents" },
      { label: "Hand-off", value: "Callback request" },
    ],
    href: "/projects/voice-ai-agent",
  },
  {
    id: "ingestion-dashboard",
    slug: "ingestion-dashboard",
    index: "04",
    name: "Ingestion Dashboard",
    shortName: "Ingestion Dashboard",
    category: "agent",
    kind: "Pipeline operations",
    accent: "azure",
    tagline: "See every resume. Fix every failure.",
    description:
      "The operator dashboard that shows where every resume went and what to do when one gets stuck, in plain language, without reading a log.",
    longDescription:
      "Resumes arrive as email attachments and OneDrive files, from a few hundred a week to tens of thousands in a backfill. The SeerHive pipeline collects, de-duplicates, checks, classifies and stores them in the background. The Ingestion Dashboard is how people see and steer it: whether resumes are flowing, where any single file ended up, and what to do when something fails. It replaces database queries, server-log digging and \"can someone check if that resume came through?\" messages.",
    mock: "ingestion-dashboard",
    screenshot: "/screens/ingestion-dashboard/overview.png",
    screenshotRatio: 2.17,
    evaluates: [
      { title: "Pipeline health at a glance", detail: "Total, completed, failed, duplicate, non-resume and in-flight counts, an ingestion-volume chart for the range you pick, and a recent-activity feed. It refreshes every 30 seconds." },
      { title: "Follow any resume end to end", detail: "Search the whole dataset on the server by file name or job ID, not just the page you happen to be on. Filter by status, account, source, error stage and date range." },
      { title: "A timeline for every job", detail: "Open a job to see a stage-by-stage timeline, its outcome, the error explanation and where it came from. Share a link such as /jobs?job=<id> to hand a colleague the exact record." },
      { title: "Duplicates traced to their original", detail: "Around 60% of incoming files are copies of resumes already held. They are shown as a normal outcome, not a red error, and each links back to the original document." },
      { title: "Failures in plain language", detail: "A technical failure becomes a title, an explanation and a suggested next step. The raw detail stays available, tucked away, for engineers." },
      { title: "Retry only where it can work", detail: "If retrying provably cannot help, the screen offers resolution instead of a retry that would fail the same way." },
      { title: "Resolve with a record", detail: "Resolve a failure as Not a resume, Unprocessable or Resolved. The name of whoever resolved it is recorded for audit." },
      { title: "Bulk actions that stay safe", detail: "Retry all pending failures in one go. Bulk resolve takes explicit IDs, never a blanket filter, and reports exactly which succeeded and which did not." },
      { title: "Control what gets scanned", detail: "A card for every connected mailbox and OneDrive account with its true lifecycle phase, including Draining. Switch accounts on and off with automatic roll-back if the server refuses." },
      { title: "Honest feedback on syncs", detail: "Trigger a sync and be told it started, not that it finished. Anything that runs for minutes or hours sits behind a confirmation that names the cost." },
      { title: "A live activity feed", detail: "A log stream that refreshes every 10 seconds and can be paused while you read, with charts of recent throughput and outcomes." },
      { title: "Numbers you can trust", detail: "A connection banner tells you when the backend is unreachable. In production it shows empty data rather than invented figures, and demo data is clearly labelled." },
      { title: "Local times and clean formatting", detail: "Timestamps are converted from UTC for display, and missing values show a dash instead of \"undefined\"." },
      { title: "Dark and light themes", detail: "Dark by default, with toast notifications for the result of every action." },
    ],
    steps: [
      { title: "Check the overview", detail: "See whether resumes are flowing and what the pipeline has done overall." },
      { title: "Find the resume", detail: "Search by file name or job ID, then open the job for its timeline." },
      { title: "Read what happened", detail: "Get the outcome in a sentence, and the original behind any duplicate." },
      { title: "Act on it", detail: "Retry, resolve, trigger a sync or switch an account on or off." },
    ],
    stats: [
      { label: "Screens", value: "5" },
      { label: "Sources", value: "Email · OneDrive" },
      { label: "Refresh", value: "10 to 30 seconds" },
    ],
    href: "/projects/ingestion-dashboard",
  },
  {
    id: "seer-hive",
    slug: "seer-hive",
    index: "05",
    name: "SeerHive",
    shortName: "SeerHive",
    category: "core",
    kind: "HRMS",
    accent: "azure",
    tagline: "The HRMS that connects hiring, clients and billing.",
    description:
      "Track candidates from selection to onboarding, manage clients and jobs, schedule interviews, and take each hire through timesheets and invoicing, all in one system.",
    longDescription:
      "SeerHive is the HRMS behind the platform. It is made for companies that hire for themselves and for staffing partners that place candidates with clients. One system tracks the candidate pipeline, the clients and jobs, interviews, timesheets and invoicing, and dashboards show where every hire stands.",
    mock: "seer-hive",
    screenshot: "/screens/hrms/main.png",
    detailScreenshot: "/screens/hrms/timesheet-main.png",
    detailFocus: [0.35, 0.55],
    detailZoom: 3,
    detailRatio: 1.6,
    detailCaption: "Weekly timesheets for every employee",
    screenshotRatio: 1.6,
    screenshotFocus: [0.62, 0.42],
    evaluates: [
      { title: "Candidate pipeline", detail: "Follow each candidate from selection to offer, acceptance and onboarding. Declined offers, rejections and drop-offs stay visible." },
      { title: "Clients and jobs", detail: "Manage client accounts and open jobs together, whether you hire for your own company or place candidates with clients." },
      { title: "Interviews and recruitment", detail: "Schedule and follow interviews, and keep recruitment activity next to the pipeline." },
      { title: "Search", detail: "Find candidates quickly among everyone already in your database." },
      { title: "Timesheets", detail: "Record and approve the working hours of the people you have placed." },
      { title: "Invoicing", detail: "Raise client invoices from the same system, using templates that you control." },
    ],
    steps: [
      { title: "Set up clients and jobs", detail: "For client accounts or for your own company." },
      { title: "Add and track candidates", detail: "Move them through the pipeline one stage at a time." },
      { title: "Interview and offer", detail: "Schedule interviews and follow each offer until it is accepted." },
      { title: "Onboard, record time and invoice", detail: "Move the hire into timesheets and client billing." },
    ],
    stats: [
      { label: "Pipeline stages", value: "5" },
      { label: "Hiring models", value: "Contract + permanent" },
      { label: "Invoicing", value: "Built in" },
    ],
    href: "/projects/seer-hive",
  },
  {
    id: "resume-analyser",
    slug: "resume-analyser",
    index: "06",
    name: "Resume Analyser",
    shortName: "Analyser",
    category: "agent",
    kind: "AI module",
    accent: "aqua",
    tagline: "Rank resumes against a job description, using the criteria you set.",
    description:
      "Decide how much skills, domain experience, education and experience should count. Then add a job description and a batch of resumes, and every candidate is scored against the role.",
    longDescription:
      "Screening a stack of resumes by hand is slow, and the results are often inconsistent. The Resume Analyser lets you decide what matters for the role: technology and skills, domain experience, education and years of experience. It then scores every resume against the job description using those weights and explains how each score was calculated.",
    mock: "resume-analyser",
    screenshot: "/screens/resume-analyser/5.png",
    detailScreenshot: "/screens/resume-analyser/old-detail.png",
    detailRatio: 1.6,
    detailFocus: [0.28, 0.36],
    detailZoom: 2.2,
    detailCaption: "Set the scoring weights",
    screenshotFocus: [0.85, 0.4],
    evaluates: [
      { title: "Technology and skills", detail: "How closely the candidate's technical skills match what the role requires." },
      { title: "Domain experience", detail: "Industry and domain knowledge that is relevant to the role." },
      { title: "Education", detail: "Educational qualifications compared with the requirement." },
      { title: "Experience", detail: "Work experience compared with the level that the role asks for." },
      { title: "Adjustable weights", detail: "Set the four weights yourself (they must total 100%), or start from a preset: Balanced, Skills first, Domain first or Experience first." },
      { title: "Transparent scoring", detail: "Each score comes with an explanation of how it was calculated, so you can explain the ranking to others." },
      { title: "Experience-fit verdict", detail: "States whether a candidate's experience fits the role, with the reasons it fits and the reasons it falls short." },
      { title: "Job stability and career gaps", detail: "Rates average tenure into bands you define and flags employment gaps above a threshold you set, so job-hopping is visible at a glance." },
      { title: "Honest experience maths", detail: "Years per technology are worked out with overlapping roles merged, so \"5 years of Java\" across three overlapping jobs is not counted as 15." },
      { title: "Custom filters in plain English", detail: "Write up to five requirements, such as \"has led a team\". Every candidate is tagged Matched, Not Matched or Not Enough Info with a reason, and nobody is silently removed." },
      { title: "An assistant for your pool", detail: "Ask in plain English: who has 5+ years of Java, compare the top two, why is a candidate ranked third. It answers from the analysed candidates only." },
      { title: "Re-rank and export", detail: "Change weights, location or stability settings and re-rank the same results without re-uploading. Export one candidate or the whole shortlist to Excel." },
    ],
    steps: [
      { title: "Set the scoring weights", detail: "Choose how much each area counts towards the match score." },
      { title: "Add the job description", detail: "Paste or upload it. Every resume is measured against this." },
      { title: "Add resumes", detail: "Add the candidates you want to evaluate." },
      { title: "Review and analyse", detail: "Check your setup, run the analysis and read the results." },
    ],
    stats: [
      { label: "Scoring areas", value: "4" },
      { label: "Weight presets", value: "4" },
      { label: "Weights total", value: "100%" },
    ],
    href: "/projects/resume-analyser",
  },
  {
    id: "resume-templates",
    slug: "resume-templates",
    index: "07",
    name: "Resume Template Builder",
    shortName: "Templates",
    category: "agent",
    kind: "AI module",
    accent: "azure",
    tagline: "A professionally formatted resume template in a few steps.",
    description:
      "Start from a profile or a job description, choose the experience level, target role and layout, and generate a suitable resume template.",
    longDescription:
      "A well-structured resume takes time to create. The Resume Template Builder generates a professionally formatted template from a short profile (experience level, target role and domain) or from a job description, so that the template suits the job. Choose a single-column or two-column layout and generate it.",
    mock: "resume-templates",
    screenshot: "/screens/resume-templates/2.png",
    detailScreenshot: "/screens/resume-templates/old-detail.png",
    detailRatio: 1.6,
    detailFocus: [0.3, 0.4],
    detailZoom: 2.2,
    detailCaption: "Choose a method, level and layout",
    screenshotFocus: [0.37, 0.5],
    evaluates: [
      { title: "Start from a profile", detail: "Tell us about your experience and the kind of role you want. You can also add a target role and domain." },
      { title: "Start from a job description", detail: "Paste or upload a job description so that the template suits that job." },
      { title: "Experience levels", detail: "Fresher, Mid-level, Senior, Lead, Manager and Executive. The level decides what the template shows first." },
      { title: "Target role and domain", detail: "Optional quick choices, such as Software Engineer or Data Analyst for the role, and FinTech or Healthcare for the domain." },
      { title: "Layout choice", detail: "Single-column or two-column. You can generate the other layout afterwards." },
      { title: "Quick to generate", detail: "The builder tells you when the template is ready. It usually takes about a minute." },
    ],
    steps: [
      { title: "Pick a starting point", detail: "A profile or a job description." },
      { title: "Choose the experience level", detail: "From fresher to executive." },
      { title: "Set role, domain and layout", detail: "An optional target role and domain, and one or two columns." },
      { title: "Generate the template", detail: "Review it, and generate the other layout if you want to compare the two." },
    ],
    stats: [
      { label: "Experience levels", value: "6" },
      { label: "Layouts", value: "2" },
      { label: "Starts from", value: "Profile or JD" },
    ],
    href: "/projects/resume-templates",
  },
  {
    id: "interview-questions",
    slug: "interview-questions",
    index: "08",
    name: "Interview Question Generator",
    shortName: "Interview Qs",
    category: "agent",
    kind: "AI module",
    accent: "aqua",
    tagline: "Interview questions made for the role or the candidate.",
    description:
      "Generate a set of questions from a job description or from a candidate's resume. Choose the types (coding, theoretical or scenario-based) and how many questions you need.",
    longDescription:
      "Generic question banks tell you very little about a candidate. The Interview Question Generator builds a set from a job description, so the questions test what the job needs, or from a candidate's resume, so the questions explore that person's background. Pick the types and the number of questions, and give your interview panel a consistent set.",
    mock: "interview-questions",
    screenshot: "/screens/interview-questions/2.png",
    detailScreenshot: "/screens/interview-questions/old-detail.png",
    detailRatio: 1.6,
    detailFocus: [0.3, 0.33],
    detailZoom: 2.2,
    detailCaption: "Questions for a role or a candidate",
    screenshotFocus: [0.86, 0.52],
    evaluates: [
      { title: "For a role", detail: "Questions built from a job description, which test what the job needs." },
      { title: "For a candidate", detail: "Questions built from a resume, which explore that person's background." },
      { title: "Question types", detail: "Coding, theoretical and scenario-based. Choose any combination." },
      { title: "Set size", detail: "Choose how many questions you need, from 5 to 40. The default is ten." },
      { title: "Expected answer for each", detail: "Every question comes with a model answer to guide the interviewer, with code shown in code formatting. Show or hide it as you go." },
      { title: "Export for the panel", detail: "Save the whole set as a PDF or Excel file, so every panellist works from the same questions." },
      { title: "Paste or upload", detail: "Provide the job description or resume as pasted text, or upload it as a TXT, DOCX or PDF file." },
      { title: "Guidance for better results", detail: "Tips on what a job description should mention, such as the company, role, experience and skills, so that the questions are more relevant." },
    ],
    steps: [
      { title: "Choose role or candidate", detail: "Generate questions from a job description or from a resume." },
      { title: "Add the source", detail: "Paste the text or upload the file." },
      { title: "Pick types and count", detail: "Choose coding, theoretical or scenario-based questions, and how many." },
      { title: "Generate the questions", detail: "Get a set of questions that is ready for the interview panel." },
    ],
    stats: [
      { label: "Question types", value: "3" },
      { label: "Built from", value: "JD or resume" },
      { label: "Default set", value: "10 questions" },
    ],
    href: "/projects/interview-questions",
  },
  {
    id: "jd-preparation",
    slug: "jd-preparation",
    index: "09",
    name: "JD Generator",
    shortName: "JD Generator",
    category: "agent",
    kind: "AI module",
    accent: "azure",
    tagline: "Turn rough notes into a well-structured job description.",
    description:
      "Describe the role in your own words, or upload a file, and get a complete job description that you can edit line by line and download.",
    longDescription:
      "Hiring managers rarely have time to write a polished job description. The JD Generator takes rough notes, or an uploaded TXT, DOCX or PDF file, and turns them into a well-structured job description. Mention the company, role, location, experience, qualifications and skills, and the generator will do the rest.",
    mock: "jd-preparation",
    screenshot: "/screens/jd-preparation/2.png",
    detailScreenshot: "/screens/jd-preparation/old-detail.png",
    detailRatio: 1.6,
    detailFocus: [0.3, 0.36],
    detailZoom: 2.2,
    detailCaption: "Paste notes to get a job description",
    screenshotFocus: [0.85, 0.3],
    evaluates: [
      { title: "Paste notes or upload a file", detail: "Write about the role in your own words, or upload your notes as a TXT, DOCX or PDF file." },
      { title: "Structured output", detail: "The role, company, location, experience and employment type, followed by a summary, responsibilities, skills and qualifications." },
      { title: "Edit any line", detail: "Review the draft and change any line before you use it." },
      { title: "Download or copy", detail: "Export it as a PDF or Word file, or copy the text straight into your job board." },
      { title: "Guidance on what to include", detail: "A short checklist (company, role, location, experience, qualifications and skills) tells you what to give the generator." },
      { title: "Try an example", detail: "Start from a built-in example to see what good input looks like." },
      { title: "Input checks", detail: "Spots input that is too short, too long or not about a job before it generates, so you are not left with a poor result." },
    ],
    steps: [
      { title: "Describe the role", detail: "Rough notes are enough, or you can upload a file." },
      { title: "Generate", detail: "Your notes are turned into a structured job description." },
      { title: "Edit", detail: "Change any line until it reads the way you want." },
      { title: "Download or copy", detail: "Take it as a PDF, a Word file or plain text." },
    ],
    stats: [
      { label: "Input", value: "Text or file" },
      { label: "Output", value: "PDF · Word" },
      { label: "Editing", value: "Line by line" },
    ],
    href: "/projects/jd-preparation",
  },
];

export const agents = projects.filter((p) => p.category === "agent");
export const coreSystem = projects.find((p) => p.category === "core")!;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
