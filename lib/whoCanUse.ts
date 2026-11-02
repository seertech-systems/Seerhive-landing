export type IconKey = "agency" | "team" | "search" | "finance" | "manager" | "clock" | "person" | "phone" | "doc";

export type Audience = { icon: IconKey; title: string; detail: string };

/** Who each product is for, shown on its page. Keys are project slugs. */
export const whoCanUse: Record<string, { heading: string; intro: string; audiences: Audience[] }> = {
  "resume-enhancer": {
    heading: "Made for anyone sending a resume that counts",
    intro: "Anyone who sends a resume for a specific job, or who prepares resumes for other people.",
    audiences: [
      { icon: "person", title: "Job seekers", detail: "Fit your resume to each job you apply for, without adding anything that is not true." },
      { icon: "search", title: "Recruiters", detail: "Improve a candidate's resume before you submit it to a client." },
      { icon: "agency", title: "Staffing agencies", detail: "Send clients resumes that match the job description and read consistently." },
      { icon: "team", title: "Placement and career teams", detail: "Help many students or members improve their resumes in the same way." },
    ],
  },
  "ivr-outbound": {
    heading: "Made for teams that call people every day",
    intro: "Anyone who makes the same kind of call again and again.",
    audiences: [
      { icon: "team", title: "Operations heads", detail: "Take repetitive confirmation and reminder calls off your teams." },
      { icon: "phone", title: "Call-centre managers", detail: "Run high-volume reminder campaigns with retries and live monitoring." },
      { icon: "search", title: "HR and recruitment teams", detail: "Confirm interview attendance before the slot is wasted, with interviews pulled from SeerHive ATS." },
      { icon: "manager", title: "Hospitals and clinics", detail: "Confirm appointments a set time before the visit and reduce no-shows." },
      { icon: "finance", title: "BFSI service leads", detail: "Send due-date and document reminders with a confirmation step." },
      { icon: "doc", title: "Education, retail and support", detail: "Send fee and counselling reminders, or confirm orders, deliveries and pickups." },
    ],
  },
  "voice-ai-agent": {
    heading: "Made for phone lines that carry the same questions every day",
    intro: "Anyone whose callers ask what a well-informed agent could answer, and whose team should spend its time on the calls that need a person.",
    audiences: [
      { icon: "team", title: "Operations heads", detail: "Handle routine calls consistently without adding headcount." },
      { icon: "phone", title: "Call-centre managers", detail: "Cut queue load and focus your people on complex calls." },
      { icon: "search", title: "HR and recruitment heads", detail: "Run hiring-drive calls and an employee helpline that verifies the employee number first." },
      { icon: "manager", title: "Hospital and clinic administrators", detail: "Answer OPD timings and doctor schedules, and take appointment requests for the front desk." },
      { icon: "finance", title: "BFSI service leads", detail: "Answer product, eligibility, document and branch questions at scale." },
      { icon: "doc", title: "Admissions and retail teams", detail: "Handle course, fee and deadline enquiries, or store timings, delivery and returns." },
    ],
  },
  "ingestion-dashboard": {
    heading: "Made for the people who keep resumes flowing",
    intro: "Anyone who needs to know whether resumes arrived, why one did not, and what to do about it.",
    audiences: [
      { icon: "search", title: "Recruitment operations", detail: "Confirm a candidate's resume arrived, see why one did not, and keep mailboxes and drives scanning." },
      { icon: "clock", title: "Pipeline operators", detail: "Spot stalls, retry backlogs and failure spikes quickly, then act." },
      { icon: "phone", title: "Support and helpdesk", detail: "Answer \"where is this resume?\" in seconds with a shareable link." },
      { icon: "doc", title: "Engineering and QA", detail: "Debug a single job with its timeline, stage and technical detail." },
      { icon: "manager", title: "Team leads and managers", detail: "Check throughput and health without asking for a report." },
      { icon: "finance", title: "Data and compliance owners", detail: "See who resolved which failure, and trace duplicates to their originals." },
    ],
  },
  "seer-hive": {
    heading: "Made for everyone who works on a hire",
    intro: "Everyone who touches a hire, from the first call to the last invoice.",
    audiences: [
      { icon: "agency", title: "Staffing and recruitment agencies", detail: "Hire for several clients, track contract and permanent placements, and invoice each client." },
      { icon: "team", title: "Company HR teams", detail: "Hire for your own company, issue offers, onboard people and run payroll." },
      { icon: "finance", title: "Finance teams", detail: "Raise invoices with GST worked out and follow payments." },
      { icon: "manager", title: "Managers", detail: "Approve timesheets and see hours, utilisation and leave for your team." },
      { icon: "clock", title: "Employees", detail: "Log time, apply for leave, and check your own attendance and payslips." },
      { icon: "search", title: "Recruiters", detail: "Keep candidates, interviews and offers in one pipeline." },
    ],
  },
  "resume-analyser": {
    heading: "Made for teams that screen resumes",
    intro: "Anyone who has to choose between many resumes for one job.",
    audiences: [
      { icon: "search", title: "Recruiters", detail: "Rank a large pile of resumes against a job description in one go." },
      { icon: "manager", title: "Hiring managers", detail: "See why a candidate scored as they did, and set what matters for your role." },
      { icon: "agency", title: "Staffing agencies", detail: "Screen candidates for each client with weights that match that client's needs." },
      { icon: "team", title: "HR teams", detail: "Apply the same transparent scoring to every applicant." },
    ],
  },
  "resume-templates": {
    heading: "Made for anyone building a resume",
    intro: "Anyone who needs a clean, professional resume format to start from.",
    audiences: [
      { icon: "person", title: "Freshers and job seekers", detail: "Start from a template that suits your experience level and the role you want." },
      { icon: "search", title: "Recruiters", detail: "Give candidates a template shaped around the job description." },
      { icon: "team", title: "HR and training teams", detail: "Share one consistent resume format with a whole group." },
      { icon: "doc", title: "Career coaches", detail: "Create a starting layout for each person you advise, in single or two columns." },
    ],
  },
  "interview-questions": {
    heading: "Made for everyone who interviews",
    intro: "Anyone who interviews and wants good questions without hours of preparation.",
    audiences: [
      { icon: "manager", title: "Interviewers and hiring managers", detail: "Get questions that test what the job actually needs." },
      { icon: "search", title: "Recruiters", detail: "Prepare screening questions for a role or for one specific candidate." },
      { icon: "team", title: "HR teams", detail: "Keep interviews consistent across candidates and interviewers." },
      { icon: "doc", title: "Technical leads", detail: "Choose the mix of coding, theory and scenario questions for a round." },
    ],
  },
  "jd-preparation": {
    heading: "Made for anyone who writes job descriptions",
    intro: "Anyone who needs a clear job description and does not want to write it from scratch.",
    audiences: [
      { icon: "team", title: "HR teams", detail: "Turn a hiring manager's notes into a structured job description." },
      { icon: "search", title: "Recruiters", detail: "Draft a description for a new client role in minutes." },
      { icon: "manager", title: "Hiring managers", detail: "Describe the role in your own words and get a finished description." },
      { icon: "agency", title: "Small companies and startups", detail: "Post a professional job description without a dedicated HR team." },
    ],
  },
};
