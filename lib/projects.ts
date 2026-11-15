export type MockVariant =
  | "resume-analyzer"
  | "resume-enhancer"
  | "ivr-outbound"
  | "voice-ai-agent"
  | "ingestion-dashboard"
  | "invoicing"
  | "seer-hive";

export type Project = {
  id: string;
  slug: string;
  index: string;
  name: string;
  shortName: string;
  category: "agent" | "core";
  /** Top-level product this belongs to, when it is a sub-product (see `products`). */
  parent?: "seervoiz" | "recruit-ai";
  /** Short label shown next to the project, e.g. "AI product". */
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
    id: "ivr-outbound",
    slug: "ivr-outbound",
    index: "01",
    name: "Intelligent Conversational IVR",
    shortName: "Intelligent Conversational IVR",
    category: "agent",
    parent: "seervoiz",
    kind: "SeerVoiz AI",
    accent: "azure",
    tagline: "Automated reminder and confirmation calls, at scale.",
    description:
      "Send reminder and confirmation calls to hundreds of people at once. Callers press 1 to confirm or 2 to reschedule, and you see every response in real time.",
    longDescription:
      "Intelligent Conversational IVR makes the reminder and confirmation calls your team should not have to dial by hand: interview confirmations, appointment reminders, payment due dates. You design a \"Press 1 to confirm, 2 to reschedule\" flow in a visual builder, add your contacts, choose a voice and decide when each call goes out, now, at a fixed time, or a set number of minutes before each person's own appointment. Afterwards you can see who confirmed, who declined and who needs a personal follow-up. It is the keypad product: it plays your message and records the key pressed. For open conversations that answer questions, see the AI Voice Agent.",
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
      { title: "Personalized at scale", detail: "Every call uses the person's own name, role, date, time or amount, and dates and times are spoken the way a person would say them." },
      { title: "Smart scheduling", detail: "Call everyone now, at a fixed time, or a set number of minutes before each person's own appointment, in the right time zone." },
      { title: "Natural voices", detail: "Choose a voice for each campaign and preview it first. You can also create a custom brand voice from recorded samples." },
      { title: "Mixed-language prompts", detail: "Mix Hindi or Tamil with English in one sentence, and each part is spoken in the right language voice." },
      { title: "Easy contact upload", detail: "Upload spreadsheets, text, Word or PDF files, type contacts in, or import scheduled interviews from SeerHive HRMS + ATS. Map your columns once." },
      { title: "Automatic retries", detail: "Unanswered, busy or failed calls are retried up to the number of attempts you set, with the gap you choose." },
      { title: "Do-Not-Call protection", detail: "Numbers on your Do-Not-Call list are blocked when the campaign is built and again just before dialing." },
      { title: "Campaign controls", detail: "Pause, resume or cancel a running campaign, cap how many calls run at once, and skip people whose call window has passed." },
      { title: "Live monitor and call log", detail: "Watch calls and responses as they arrive, then open any call to see what the agent said and which key was pressed, step by step." },
      { title: "Checked before launch", detail: "A preview confirms that every contact has the details the script needs, so a missing date is caught before any call is placed." },
      { title: "Dashboard and reports", detail: "See progress and outcomes at a glance, and download the results as a spreadsheet for follow-up." },
    ],
    steps: [
      { title: "Add your contacts", detail: "Upload a file, type them in, or import interviews from SeerHive HRMS + ATS, then map the columns." },
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
    index: "02",
    name: "AI-Powered Inbound & Outbound Voice Agents",
    shortName: "Voice Agents",
    category: "agent",
    parent: "seervoiz",
    kind: "SeerVoiz AI",
    accent: "aqua",
    tagline: "Human-like AI voice agents for inbound and outbound calls.",
    description:
      "Deploy human-like AI voice agents that handle inbound customer queries and outbound calls autonomously, from your knowledge base, in multiple languages, 24/7.",
    longDescription:
      "Your team answers the same questions on the phone all day: timings, documents, schedules, status. The AI Voice Agent takes those calls. Callers speak in their own words, can interrupt mid-sentence, and get answers drawn from your approved documents, not from guesswork. It also runs outbound campaigns from a contact list, retrying unanswered calls and skipping anyone who opted out. If it cannot find the answer, or the caller asks for a person, it stops guessing, collects their details and creates a callback request. Every call is logged with a transcript and a summary.",
    mock: "voice-ai-agent",
    evaluates: [
      { title: "Natural voice conversations", detail: "Callers speak normally and can interrupt mid-sentence, as they would with a person. There are no menus to navigate." },
      { title: "Answers from your knowledge base", detail: "Upload documents, web pages or notes. The agent answers from that content, so answers stay consistent with your policies." },
      { title: "Inbound call handling", detail: "Assign a business phone number to an agent and it picks up every call, day or night." },
      { title: "Outbound campaigns", detail: "Upload a contact list as CSV or Excel, choose an agent, and the platform dials it with your concurrency and call-length limits." },
      { title: "Retries and opt-outs", detail: "Unanswered or busy calls are retried on a schedule you set, and contacts who opted out are skipped automatically." },
      { title: "Smooth handoff to your team", detail: "When a caller asks for a person, or the agent cannot answer, it collects their details and sends a callback request, with the conversation, by email and in the console." },
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
      { label: "Handoff", value: "Callback request" },
    ],
    href: "/projects/voice-ai-agent",
  },
  {
    id: "resume-enhancer",
    slug: "resume-enhancer",
    index: "03",
    name: "AI Resume Enhancer",
    shortName: "Resume Enhancer",
    category: "agent",
    parent: "recruit-ai",
    kind: "SeerHive Recruit AI",
    accent: "aqua",
    tagline: "Transform resumes into professionally structured, ATS-friendly profiles.",
    description:
      "Analyzes existing resumes, improves content, highlights relevant skills and achievements, and optimizes them to align with targeted job requirements while keeping the candidate's authentic experience.",
    longDescription:
      "The AI Resume Enhancer analyzes an existing resume, improves its content, highlights relevant skills and achievements, and optimizes it to align with the targeted job requirements, while maintaining the candidate's authentic experience. It never adds experience or skills that the candidate does not have. Resume Studio is part of it: rebuild a resume in a sample's format, find the roles it fits, or start from one of 30+ templates, then edit it with an assistant and save every version.",
    mock: "resume-enhancer",
    screenshot: "/screens/resume-enhancer/2.png",
    detailScreenshot: "/screens/resume-enhancer/old-detail.png",
    detailRatio: 1.6,
    detailFocus: [0.3, 0.4],
    detailZoom: 2.2,
    detailCaption: "Upload a resume and a job description",
    screenshotFocus: [0.34, 0.38],
    evaluates: [
      { title: "AI content enhancement", detail: "Improves resume language, structure, formatting and professional presentation." },
      { title: "Smart skill highlighting", detail: "Identifies and emphasizes relevant skills, technologies and achievements." },
      { title: "JD-based optimization", detail: "Aligns resume content with targeted job descriptions and highlights relevant experience." },
      { title: "Match score before and after", detail: "See how well the resume fits the job description, and how much the match improved after enhancement." },
      { title: "Every change explained", detail: "Every change is explained section by section, so you always know what was edited and why." },
      { title: "Highlighted and clean versions", detail: "Download a Word file with rewritten text highlighted in yellow and new text in green, or a clean copy that is ready to send. Both come in a single-column or two-column layout." },
      { title: "Facts stay yours", detail: "It only rewords and reorders what is already in the resume. It does not add experience or skills." },
      { title: "Common file formats", detail: "Upload the resume as a PDF, DOCX or TXT file of up to 10 MB." },
      { title: "Tailored to the job", detail: "Paste or upload the job description that the resume should be matched to." },
      { title: "Resume Studio overview", detail: "Four ways to build a resume in one workspace, with a daily generations count and a guided tour on first use." },
      { title: "Resume → Resume", detail: "Give your resume and a sample resume. Your content is rebuilt in the sample's format, colours, logo and section order, and sections you lack are created." },
      { title: "Choose what to copy", detail: "Extract the sample's sections and tick the ones you want, or apply the look only. Your own employers, titles, dates, name and education are never changed by imported content." },
      { title: "Role Advisor", detail: "See the roles your experience fits, with the evidence and gaps behind each one and your technical versus management balance. Pick up to five and create a resume for each." },
      { title: "Sample or industry standard", detail: "Build each role's resume from a sample resume you provide, or from an industry-standard sample that you can personalise with your own resume later." },
      { title: "Template Library", detail: "Browse 30+ single-column, two-column and sidebar designs, each shown with sample content. Filter by style, layout and favourites, preview one, then use it." },
      { title: "Your own templates", detail: "Upload a DOCX or PDF as a template and it keeps its colours, layout and logo. Share templates, and restore any earlier version." },
      { title: "Editor with an assistant", detail: "Open any result in the editor. Click text to edit it, change colours, fonts and sections, upload a logo, and undo or redo. The assistant shows each change first and applies it only when you click Apply." },
      { title: "Verify before you send", detail: "Anything your resume does not support is marked Verify. Saving and downloading unlock once you have confirmed or removed every flag." },
      { title: "My Saved Resumes", detail: "Every save creates a new version. Reopen, rename, share, change the template or go back to an earlier version, or turn a good resume into a template." },
      { title: "Role Catalogue", detail: "Administrators keep the list of roles the Role Advisor suggests, with aliases, job family, seniority, years of experience and key skills. Add, edit or retire a role." },
      { title: "Print preview and downloads", detail: "Preview the exact PDF before you download it, then download as DOCX (plain or highlighted review copy) or PDF." },
    ],
    steps: [
      { title: "Upload the resume", detail: "PDF, DOCX or TXT." },
      { title: "Add the job description", detail: "Paste it or upload it." },
      { title: "Enhance", detail: "The resume is reworded and reordered to suit the role." },
      { title: "Review and download", detail: "Read the changes, then download the version you need." },
      { title: "Go further in Resume Studio", detail: "Rebuild it in a sample's format, find the roles it fits, or start from a template, then edit and save." },
    ],
    stats: [
      { label: "Match score", value: "Before & after" },
      { label: "Templates", value: "30+" },
      { label: "Download", value: "DOCX · PDF" },
    ],
    href: "/projects/resume-enhancer",
  },
  {
    id: "resume-analyzer",
    slug: "resume-analyzer",
    index: "04",
    name: "AI Resume Analyzer",
    shortName: "Resume Analyzer",
    category: "agent",
    parent: "recruit-ai",
    kind: "SeerHive Recruit AI",
    accent: "aqua",
    tagline: "Intelligent resume screening & matching.",
    description:
      "Accelerate recruitment with AI-powered resume parsing, intelligent JD matching and automated candidate evaluation. Discover best-fit candidates with weighted scorecards and detailed experience insights.",
    longDescription:
      "Screening a stack of resumes by hand is slow, and the results are often inconsistent. The Resume Analyzer lets you decide what matters for the role: technology and skills, domain experience, education and years of experience. It then scores every resume against the job description using those weights and explains how each score was calculated.",
    mock: "resume-analyzer",
    screenshot: "/screens/resume-analyser/5.png",
    detailScreenshot: "/screens/resume-analyser/old-detail.png",
    detailRatio: 1.6,
    detailFocus: [0.28, 0.36],
    detailZoom: 2.2,
    detailCaption: "Set the scoring weights",
    screenshotFocus: [0.85, 0.4],
    evaluates: [
      { title: "AI-powered JD matching", detail: "Searches and ranks resumes against job requirements using configurable, weighted scoring." },
      { title: "Experience intelligence", detail: "Analyzes technology-wise experience, relevant vs. irrelevant experience, career gaps and overlapping employment." },
      { title: "Candidate stability analysis", detail: "Evaluates employment history, average tenure and job changes to identify potential stability concerns." },
      { title: "Four scoring areas", detail: "Technology and skills, domain experience, education and years of experience, each measured against the job description." },
      { title: "Adjustable weights", detail: "Set the four weights yourself (they must total 100%), or start from a preset: Balanced, Skills first, Domain first or Experience first." },
      { title: "Transparent scoring", detail: "Each score comes with an explanation of how it was calculated, so you can explain the ranking to others." },
      { title: "Experience-fit verdict", detail: "States whether a candidate's experience fits the role, with the reasons it fits and the reasons it falls short." },
      { title: "Job stability and career gaps", detail: "Rates average tenure into bands you define and flags employment gaps above a threshold you set, so job-hopping is visible at a glance." },
      { title: "Accurate experience math", detail: "Years per technology are calculated with overlapping roles merged, so \"5 years of Java\" across three overlapping jobs is not counted as 15." },
      { title: "Custom filters in plain English", detail: "Write up to five requirements, such as \"has led a team\". Every candidate is tagged Matched, Not Matched or Not Enough Info with a reason, and nobody is silently removed." },
      { title: "An assistant for your pool", detail: "Ask in plain English: who has 5+ years of Java, compare the top two, why is a candidate ranked third. It answers from the analyzed candidates only." },
      { title: "Re-rank and export", detail: "Change weights, location or stability settings and re-rank the same results without re-uploading. Export one candidate or the whole shortlist to Excel." },
    ],
    steps: [
      { title: "Set the scoring weights", detail: "Choose how much each area counts towards the match score." },
      { title: "Add the job description", detail: "Paste or upload it. Every resume is measured against this." },
      { title: "Add resumes", detail: "Add the candidates you want to evaluate." },
      { title: "Review and analyze", detail: "Check your setup, run the analysis and read the results." },
    ],
    stats: [
      { label: "Scoring areas", value: "4" },
      { label: "Weight presets", value: "4" },
      { label: "Weights total", value: "100%" },
    ],
    href: "/projects/resume-analyzer",
  },
  {
    id: "ingestion-dashboard",
    slug: "ingestion-dashboard",
    index: "05",
    name: "Resume Data Pipeline",
    shortName: "Resume Pipeline",
    category: "agent",
    parent: "recruit-ai",
    kind: "SeerHive Recruit AI",
    accent: "azure",
    tagline: "Resumes from every source, straight into your HRMS.",
    description:
      "Automatically collects resumes from any email account, job portal or external source, uses AI to extract and organize candidate details, and loads them straight into your HRMS. No manual downloads, no duplicate entries.",
    longDescription:
      "Resumes arrive as email attachments and OneDrive files, from a few hundred a week to tens of thousands in a backfill. The SeerHive pipeline collects, de-duplicates, checks, classifies and stores them in the background. The Ingestion Dashboard is how people see and steer it: whether resumes are flowing, where any single file ended up, and what to do when something fails. No more chasing \"did that resume come through?\" messages.",
    mock: "ingestion-dashboard",
    screenshot: "/screens/ingestion-dashboard/overview.png",
    screenshotRatio: 2.29,
    evaluates: [
      { title: "Any-source intake", detail: "Connects to any email account, job portal or external source." },
      { title: "AI extraction", detail: "Pulls skills, experience, education and contact details from PDF and Word resumes." },
      { title: "No duplicates", detail: "Merges repeat applications into one standardized profile." },
      { title: "HRMS-ready", detail: "Loads candidates directly into your HRMS and ATS, ready to shortlist." },
      { title: "Pipeline health at a glance", detail: "Total, completed, failed, duplicate, non-resume and in-flight counts, an ingestion-volume chart for the range you pick, and a recent-activity feed. It refreshes every 30 seconds." },
      { title: "Follow any resume end to end", detail: "Search the whole dataset by file name or job ID. Filter by status, account, source, error stage and date range." },
      { title: "Failures in plain language", detail: "A technical failure becomes a title, an explanation and a suggested next step." },
      { title: "Control what gets scanned", detail: "See every connected mailbox and drive, and switch each one on or off." },
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
    id: "invoicing",
    slug: "invoicing",
    index: "06",
    name: "SeerHive Invoicing",
    shortName: "Invoicing",
    category: "agent",
    kind: "SeerHive Invoicing",
    accent: "azure",
    tagline: "AI-powered invoicing and automation",
    description:
      "Generate accurate client invoices with fully configurable templates, tax and rate rules and billing cycles, and use AI to extract, validate, approve and track incoming vendor invoices, all from one platform.",
    longDescription:
      "SeerHive Invoicing generates accurate client invoices with fully configurable templates, tax and rate rules and billing cycles, and uses AI to extract, validate, approve and track incoming vendor invoices, all from one platform.",
    mock: "invoicing",
    screenshot: "/screens/invoicing/templates.png",
    screenshotRatio: 2.31,
    evaluates: [
      { title: "Configurable billing", detail: "Templates, tax and rate rules and client-wise billing cycles, with no custom code." },
      { title: "AI invoice extraction", detail: "Pulls vendor details, line items, taxes and payment terms from incoming invoices." },
      { title: "Intelligent validation", detail: "Flags duplicates, discrepancies and missing information." },
      { title: "Approval workflows and tracking", detail: "Routes invoices to approvers by your rules and tracks every invoice in real time." },
    ],
    steps: [
      { title: "Create or capture the invoice", detail: "Generate client invoices from your templates, or extract incoming vendor invoices automatically." },
      { title: "Validate", detail: "Duplicates, discrepancies and gaps are flagged." },
      { title: "Approve", detail: "Routed to the right approver by your rules." },
      { title: "Track", detail: "Follow status, deadlines and history in real time." },
    ],
    stats: [
      { label: "Billing", value: "Configurable" },
      { label: "Extraction", value: "AI-driven" },
      { label: "Approvals", value: "Configurable" },
      { label: "Visibility", value: "Real time" },
    ],
    href: "/projects/invoicing",
  },
  {
    id: "data-ingestion",
    slug: "data-ingestion",
    index: "07",
    name: "SeerHive Data Ingestion Pipeline",
    shortName: "Data Ingestion",
    category: "agent",
    kind: "AI Data Solutions",
    accent: "aqua",
    tagline: "Any source. Any document. Straight into your system.",
    description:
      "Captures documents wherever they arrive, extracts the data that matters, and delivers clean, structured records into the system you already use. Proven in recruitment and configurable for any industry.",
    longDescription:
      "Our AI pipeline captures documents wherever they arrive, extracts the data that matters, and delivers clean, structured records into the system you already use. It is proven in recruitment and configurable for any industry.",
    mock: "ingestion-dashboard",
    evaluates: [
      { title: "Recruitment", detail: "Resumes from email and job portals, parsed and loaded into your HRMS and ATS." },
      { title: "Invoicing & Finance", detail: "Vendor invoices and purchase orders, with amounts, tax and line items extracted into your billing or accounting system." },
      { title: "Healthcare", detail: "Medical records, lab reports and referrals, structured and routed into patient management systems." },
      { title: "Leads & Sales", detail: "Inbound inquiries, forms and emails captured as qualified leads in your CRM." },
    ],
    steps: [
      { title: "Connect the source", detail: "Email, portals or any external source." },
      { title: "Extract with AI", detail: "The data that matters is pulled out of each document." },
      { title: "Structure and clean", detail: "Records are standardized and duplicates are merged." },
      { title: "Deliver", detail: "Records land in the system you already use." },
    ],
    stats: [
      { label: "Sources", value: "Any" },
      { label: "Documents", value: "Any" },
      { label: "Industries", value: "Configurable" },
    ],
    href: "/projects/data-ingestion",
  },
  {
    id: "seer-hive",
    slug: "seer-hive",
    index: "08",
    name: "SeerHive HRMS + ATS",
    shortName: "SeerHive HRMS + ATS",
    category: "core",
    kind: "SeerHive HRMS + ATS",
    accent: "azure",
    tagline: "Integrated HR and talent management platform",
    description:
      "An integrated HR and talent acquisition platform that automates the complete employee lifecycle: from recruitment and onboarding to employee management, timesheets, attendance, leave and payroll.",
    longDescription:
      "SeerHive HRMS + ATS is the HR system behind the platform. It is made for companies that hire for themselves and for staffing partners that place candidates with clients. One system tracks the candidate pipeline, the clients and jobs, interviews, timesheets and invoicing, and dashboards show where every hire stands.",
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
      { title: "Employee management", detail: "Manage the employee record from onboarding through the full employee lifecycle." },
      { title: "Leave management", detail: "Handle leave, balances and requests in the same system." },
      { title: "Payroll", detail: "Run payroll from the attendance and timesheet data you already hold." },
      { title: "HR analytics", detail: "Dashboards that show where every hire and employee stands, with attendance, leave and utilization." },
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
];

/**
 * The five top-level products. A product with `children` groups sub-products
 * (each its own page in `projects`); one without is a single product page.
 */
export type Product = {
  id: string;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  /** Slug whose icon / page represents the product. */
  iconSlug: string;
  /** Slugs of the sub-products, in order. A single-page product lists itself. */
  children: string[];
  href: string;
};

export const products: Product[] = [
  {
    id: "seervoiz",
    name: "SeerVoiz AI",
    shortName: "SeerVoiz AI",
    tag: "Voice intelligence powered by AI",
    description: "Intelligent Conversational IVR and AI voice agents for inbound and outbound calls.",
    iconSlug: "voice-ai-agent",
    children: ["ivr-outbound", "voice-ai-agent"],
    href: "/#agents",
  },
  {
    id: "recruit-ai",
    name: "SeerHive Recruit AI",
    shortName: "Recruit AI",
    tag: "End-to-end intelligent hiring automation",
    description: "AI Resume Enhancer, AI Resume Analyzer and the Resume Data Pipeline.",
    iconSlug: "resume-enhancer",
    children: ["resume-enhancer", "resume-analyzer", "ingestion-dashboard"],
    href: "/#agents",
  },
  {
    id: "invoicing",
    name: "SeerHive Invoicing",
    shortName: "Invoicing",
    tag: "AI-powered invoicing and automation",
    description: "Extraction, validation, approvals and tracking for every invoice.",
    iconSlug: "invoicing",
    children: ["invoicing"],
    href: "/projects/invoicing",
  },
  {
    id: "data-ingestion",
    name: "SeerHive Data Ingestion Pipeline",
    shortName: "Data Ingestion",
    tag: "Any source. Any document. Straight into your system.",
    description: "Captures documents from any source and delivers clean, structured records.",
    iconSlug: "data-ingestion",
    children: ["data-ingestion"],
    href: "/projects/data-ingestion",
  },
  {
    id: "seer-hive",
    name: "SeerHive HRMS + ATS",
    shortName: "SeerHive HRMS + ATS",
    tag: "Integrated HR and talent management platform",
    description: "Recruitment, employees, timesheets, leave, payroll and HR analytics in one system.",
    iconSlug: "seer-hive",
    children: ["seer-hive"],
    href: "/projects/seer-hive",
  },
];

/** Order used by the Products navigation (desktop dropdown and mobile menu). */
const NAV_ORDER = ["recruit-ai", "seervoiz", "data-ingestion", "seer-hive", "invoicing"];
export const navProducts: Product[] = NAV_ORDER.map((id) => products.find((p) => p.id === id)!);
export const navProjects: Project[] = [...projects].sort(
  (a, b) => NAV_ORDER.indexOf(productOf(a)?.id ?? "") - NAV_ORDER.indexOf(productOf(b)?.id ?? "")
);

/** Hand-picked "More from SeerHive" links per page (slugs). */
export const relatedSlugs: Record<string, string[]> = {
  "resume-enhancer": ["resume-analyzer", "ingestion-dashboard", "seer-hive"],
  "resume-analyzer": ["resume-enhancer", "ingestion-dashboard", "seer-hive"],
  "ingestion-dashboard": ["data-ingestion", "resume-analyzer", "seer-hive"],
  "data-ingestion": ["ingestion-dashboard", "invoicing", "seer-hive"],
  invoicing: ["seer-hive", "data-ingestion", "voice-ai-agent"],
  "seer-hive": ["resume-analyzer", "invoicing", "ivr-outbound"],
  "voice-ai-agent": ["ivr-outbound", "data-ingestion", "seer-hive"],
  "ivr-outbound": ["voice-ai-agent", "seer-hive", "resume-analyzer"],
};

export function productOf(p: Project): Product | undefined {
  return products.find((x) => x.children.includes(p.slug));
}

export const agents = projects.filter((p) => p.category === "agent");
export const coreSystem = projects.find((p) => p.category === "core")!;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
