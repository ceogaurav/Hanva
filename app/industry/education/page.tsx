import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Education & EdTech Telephony CRM Solutions",
  description:
    "Scale student admission counseling with progressive auto-dialers, lead campaign tracking, automated fee structure drops on WhatsApp, and call audits.",
  alternates: {
    canonical: "https://hanva.in/industry/education/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hanva.in/industry/education/",
    siteName: "Hanva Technologies",
    title: "Education & EdTech Telephony CRM Solutions | Hanva Technologies",
    description:
      "Scale student admission counseling with progressive auto-dialers, lead campaign tracking, automated fee structure drops on WhatsApp, and call audits.",
    images: [{ url: "https://hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Education Telephony" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education & EdTech Telephony CRM Solutions | Hanva Technologies",
    description:
      "Scale student admission counseling with progressive auto-dialers, lead campaign tracking, automated fee structure drops on WhatsApp, and call audits.",
    images: ["https://hanva.in/og-image.png"],
  },
};

const educationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Education & EdTech Telephony Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "High-velocity student admission counseling, entrance exam inquiry auto-dialing, WhatsApp syllabus delivery, and counselor productivity tracking in India.",
  areaServed: "IN",
};

export default function EducationIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Education & EdTech Admissions"
      title="Student Admissions Counseling & Outreach Architecture"
      subtitle="Maximize admissions enrollment velocity. Auto-dial entrance exam and webinar inquiries, share syllabus PDFs via WhatsApp, and track counselor calling performance."
      executiveSummary="During competitive academic admission cycles, EdTech platforms, universities, and coaching institutes receive massive volumes of prospective student leads. If admissions counselors fail to connect promptly, students enroll elsewhere. Hanva integrates high-throughput auto-dialing, automated entrance exam lead ingestion, automated WhatsApp brochure and syllabus dispatch, and counselor talk-time monitoring to maximize enrollment conversion rates."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Education" },
      ]}
      whatsappRef="/industry/education/"
      challenges={[
        {
          challenge: "Webinar, scholarship test, and portal leads take days to contact due to manual dialing, resulting in low answer rates and lost enrollments.",
          solution: "Progressive auto-dialing connects academic counselors automatically when live student leads answer, multiplying daily counseling calls.",
        },
        {
          challenge: "Students and parents request course curriculum PDFs, faculty profiles, and fee schedules on calls, but counselors forget to follow up.",
          solution: "Tagging a call disposition as 'Interested' immediately triggers an approved WhatsApp template with course brochures and scholarship test links.",
        },
        {
          challenge: "Admission directors have no objective visibility into whether counselors are effectively handling parent queries or pitching courses properly.",
          solution: "Centralized audio recordings and agent performance scorecards enable comprehensive QA compliance and counselor coaching audits.",
        },
        {
          challenge: "During peak admission announcement windows, standard office phone lines experience severe congestion and high call drop rates.",
          solution: "Dedicated high-concurrency Tata and Vi carrier trunks scale smoothly to handle seasonal admission call surges without busy tones.",
        },
      ]}
      workflowTitle="The 4-Stage Student Enrollment Journey"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Admissions Lead Ingestion",
          description: "Student inquiries from website application forms, entrance tests, or Google Ads ingest into the CRM with course and city tags.",
        },
        {
          step: "STAGE 02",
          title: "Counselor Auto-Dialing",
          description: "The dialing engine initiates calls across dedicated carrier DIDs, connecting the admission counselor within minutes of lead capture.",
        },
        {
          step: "STAGE 03",
          title: "WhatsApp Syllabus Drop",
          description: "Upon call wrap-up, an automated WhatsApp message delivers the course syllabus, scholarship test details, and fee structure PDF.",
        },
        {
          step: "STAGE 04",
          title: "Counseling Follow-Up & Fee",
          description: "The counselor schedules an entrance counseling interview or webinar slot. The student receives automated confirmation reminders.",
        },
      ]}
      pillars={[
        {
          metric: "Sequential",
          metricLabel: "Outbound Dialing",
          title: "Progressive Admissions Dialer",
          description: "Counselors spend their shift speaking to prospective students and parents instead of manually dialing numbers and listening to ringtones.",
        },
        {
          metric: "Automated",
          metricLabel: "Syllabus Delivery",
          title: "Automated WhatsApp Collateral",
          description: "Deliver detailed course curriculum PDFs, fee structures, and scholarship registration links via authorized BSP gateways upon request.",
        },
        {
          metric: "Systematic",
          metricLabel: "Counselor QA Auditing",
          title: "Audio Archival & Scorecards",
          description: "Every counseling call is recorded and linked to the student profile for management evaluation and admission policy compliance.",
        },
      ]}
      synergies={[
        {
          title: "Progressive Auto-Dialer",
          description: "Explore auto-dialer algorithms and campaign lead recycling rules.",
          href: "/products/auto-dialer/",
        },
        {
          title: "Telecalling CRM Suite",
          description: "Track daily counselor talk time, disposition tags, and target enrollments.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Cloud Telephony Virtual PBX",
          description: "Assign dedicated departmental virtual numbers for Admissions, Accounts, and Academic Support.",
          href: "/products/cloud-telephony/",
        },
      ]}
      faqs={[
        {
          question: "Can we run separate calling campaigns for different courses?",
          answer: "Yes. Admission managers can create dedicated campaigns for specific academic programs (e.g., Engineering, MBA, NEET/JEE coaching), assigning specialized counselor pools and tailored call scripts to each campaign.",
        },
        {
          question: "How does the system prevent student leads from being called multiple times?",
          answer: "Hanva features automated duplicate lead detection and cross-campaign deduplication based on phone numbers and email addresses, ensuring students are not bombarded with conflicting calls.",
        },
        {
          question: "Can counselors place calls through mobile SIM cards or laptops?",
          answer: "Yes. Counselors can use our browser-based WebRTC softphone on desktop computers with headsets, or place calls via our companion Android app using mobile SIM cards while centrally syncing recordings to the CRM.",
        },
      ]}
      schemaData={educationSchema}
    />
  );
}
