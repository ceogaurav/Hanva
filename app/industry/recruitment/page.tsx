import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Staffing & Recruitment Telecalling CRM Software",
  description:
    "Pre-screen candidates faster with progressive auto-dialers, dispatch interview slots via WhatsApp, track recruiter talk-time KPIs, and record phone screens.",
  alternates: {
    canonical: "https://hanva.in/industry/recruitment/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanva.in/industry/recruitment/",
    siteName: "Hanva Technologies",
    title: "Staffing & Recruitment Telecalling CRM Software | Hanva Technologies",
    description:
      "Pre-screen candidates faster with progressive auto-dialers, dispatch interview slots via WhatsApp, track recruiter talk-time KPIs, and record phone screens.",
    images: [{ url: "https://hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Recruitment Telephony" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Staffing & Recruitment Telecalling CRM Software | Hanva Technologies",
    description:
      "Pre-screen candidates faster with progressive auto-dialers, dispatch interview slots via WhatsApp, track recruiter talk-time KPIs, and record phone screens.",
    images: ["https://hanva.in/og-image.png"],
  },
};

const recruitmentSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Recruitment & Staffing Telephony Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "High-velocity candidate pre-screening auto-dialers, WhatsApp job description delivery, interview scheduling, and recruiter productivity analytics in India.",
  areaServed: "IN",
};

export default function RecruitmentIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Recruitment, Staffing & HR Operations"
      title="Candidate Pre-Screening, Interview Scheduling & Recruiter Telecalling"
      subtitle="Accelerate placement turnaround times. Auto-dial job applicants across job portals, dispatch job descriptions via WhatsApp, and track recruiter talk-time productivity."
      executiveSummary="Staffing agencies, volume hiring recruiters, and HR consultancies process hundreds of candidate resumes daily from job boards like Naukri, LinkedIn, and Indeed. Recruiters spend hours listening to unanswered ringtones or copying phone numbers manually, resulting in delayed candidate engagement and lost placement mandates. Hanva provides progressive auto-dialers for resume pools, 2-click screening dispositions, automated WhatsApp JD delivery, and recruiter talk-time scorecards."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Recruitment" },
      ]}
      whatsappRef="/industry/recruitment/"
      challenges={[
        {
          challenge: "Recruiters waste over 50% of their workday manually dialing candidate phone numbers, waiting for ringtones, or reaching switched-off numbers.",
          solution: "Progressive auto-dialing skips invalid numbers and connects recruiters only when live job seekers answer, doubling daily screening conversations.",
        },
        {
          challenge: "Promising candidates agree to review job descriptions on phone calls, but recruiters forget to dispatch detailed briefs promptly.",
          solution: "Tagging a call disposition as 'Interested' immediately triggers an approved WhatsApp template with the detailed JD and salary range PDF.",
        },
        {
          challenge: "Up to 30% of scheduled candidate interview rounds result in candidate no-shows, frustrating corporate hiring clients and delaying mandates.",
          solution: "Automated WhatsApp and SMS interview reminders dispatched 24 hours and 2 hours prior to interview slots improve candidate attendance.",
        },
        {
          challenge: "Agency owners have no transparent visibility into whether recruiters are actually conducting thorough candidate pre-screens or hitting daily call quotas.",
          solution: "Real-time recruiter wallboards and centralized call audio recordings track daily talk time, connected screens, and candidate quality.",
        },
      ]}
      workflowTitle="The 4-Stage Candidate Placement & Hiring Cycle"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Applicant Pool Ingestion",
          description: "Candidate resumes from job boards, career sites, and campus drives upload into the CRM, categorized by skill tags, experience, and notice period.",
        },
        {
          step: "STAGE 02",
          title: "Progressive Pre-Screening",
          description: "The auto-dialer rings candidates in sequence across dedicated DIDs, connecting the recruiter to assess salary expectations and technical fit.",
        },
        {
          step: "STAGE 03",
          title: "WhatsApp JD & Slot Booking",
          description: "Upon wrap-up, an automated WhatsApp message delivers the official Job Description document, company profile, and calendar interview booking link.",
        },
        {
          step: "STAGE 04",
          title: "Interview Reminder & Placement",
          description: "The system delivers multi-stage automated interview reminders to the candidate, updating client hiring managers upon successful candidate onboard.",
        },
      ]}
      pillars={[
        {
          metric: "Doubled",
          metricLabel: "Candidate Screens",
          title: "Progressive Screening Dialer",
          description: "Recruiters spend their shift conducting active candidate interviews instead of hand-keying phone numbers and listening to busy tones.",
        },
        {
          metric: "Instant",
          metricLabel: "Brief Delivery",
          title: "Automated WhatsApp JDs",
          description: "Dispatch detailed role specifications, client company overviews, and salary structures via verified WhatsApp Business Platform templates in seconds.",
        },
        {
          metric: "Complete",
          metricLabel: "Activity Visibility",
          title: "Recruiter Talk-Time Scorecards",
          description: "Track consultant productivity with objective metrics: total talk time, connection ratios, screening outcomes, and interview conversions.",
        },
      ]}
      synergies={[
        {
          title: "Progressive Auto-Dialer",
          description: "Recycle candidate pools and accelerate volume hiring for call centers, retail, and tech.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Telecalling CRM Suite",
          description: "Manage candidate pipelines, log notice periods, and record salary expectations.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "WhatsApp Business CRM",
          description: "Automate interview slot reminders, address directions, and offer letter updates.",
          href: "/products/whatsapp-crm/",
        },
      ]}
      faqs={[
        {
          question: "Can recruiters use laptops and mobile phones interchangeably?",
          answer: "Yes. Recruiters can place pre-screening calls via our desktop browser softphone using headsets, or use our companion Android application (Hanva-Telecaller) to make calls from physical mobile SIM cards with unlimited calling plans while automatically syncing call logs and audio.",
        },
        {
          question: "How does the system prevent candidates from receiving calls for mismatched roles?",
          answer: "Candidates are tagged with skills, location, expected CTC, and notice periods. Recruiters filter specific candidate cohorts when initiating calling campaigns, ensuring candidates are only contacted for relevant openings.",
        },
        {
          question: "Can interview reminder messages include Google Maps links for physical interviews?",
          answer: "Yes. Automated WhatsApp confirmation templates can dynamically include client interview venue addresses, Google Maps navigation links, and interview coordinator contact details to minimize interview-day confusion.",
        },
      ]}
      schemaData={recruitmentSchema}
    />
  );
}
