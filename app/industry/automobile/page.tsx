import * as React from "react";
import { SolutionLayout } from "@/components/shared/solution-layout";

export const metadata = {
  title: "Automobile Dealership Telephony & Showroom CRM",
  description:
    "Drive showroom test-drive bookings, automate periodic vehicle service reminders, route Sales and Service calls via IVR, and equip reps with mobile SIM calling.",
  alternates: {
    canonical: "https://www.hanva.in/industry/automobile/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/industry/automobile/",
    siteName: "Hanva Technologies",
    title: "Automobile Dealership Telephony & Showroom CRM | Hanva Technologies",
    description:
      "Drive showroom test-drive bookings, automate periodic vehicle service reminders, route Sales and Service calls via IVR, and equip reps with mobile SIM calling.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Automobile Telephony" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automobile Dealership Telephony & Showroom CRM | Hanva Technologies",
    description:
      "Drive showroom test-drive bookings, automate periodic vehicle service reminders, route Sales and Service calls via IVR, and equip reps with mobile SIM calling.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const automobileSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hanva Automobile Dealership Telephony Solution",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
  },
  description:
    "Integrated automotive showroom telephony, test-drive scheduling, workshop service reminder auto-dialing, and WhatsApp location sharing for car dealerships in India.",
  areaServed: "IN",
};

export default function AutomobileIndustryPage() {
  return (
    <SolutionLayout
      categoryBadge="Automobile Dealerships & Service Centers"
      title="Automotive Showroom Inquiries, Test Drives & Workshop Telephony"
      subtitle="Turn online vehicle inquiries into showroom visits. Automate test-drive scheduling, route Sales versus Service callers via IVR, and trigger periodic vehicle maintenance reminders."
      executiveSummary="Multi-brand car and two-wheeler dealerships lose high-margin vehicle sales and after-sales service revenue when online portal inquiries sit uncontacted or service booking phone lines ring busy. Hanva connects digital marketing inquiries directly to showroom floor executives, routes inbound callers to Sales or Workshop desks via smart IVR trees, dispatches showroom Google Maps pins and vehicle brochures over WhatsApp, and automates 10,000 km periodic maintenance reminder calls."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industry/" },
        { label: "Automobile" },
      ]}
      whatsappRef="/industry/automobile/"
      challenges={[
        {
          challenge: "Prospective car buyers submitting online test-drive inquiries on CarDekho, CarWale, or Meta Ads are called hours later, after visiting a competing showroom.",
          solution: "Automated webhook ingestion triggers prompt telecaller dial-out within minutes of customer form submission.",
        },
        {
          challenge: "Inbound callers calling the main dealership landline are frequently misrouted between vehicle sales reps, spare parts, and workshop mechanics.",
          solution: "Smart multi-level IVR greets customers professionally and immediately routes callers to Sales, Service Booking, Insurance Renewal, or Bodyshop.",
        },
        {
          challenge: "Dealerships lose steady workshop revenue when vehicle owners forget scheduled 6-month or 10,000 km periodic maintenance service intervals.",
          solution: "Automated auto-dialer campaigns contact vehicle owners with due service dates, allowing one-click workshop slot booking.",
        },
        {
          challenge: "Floor sales consultants calling prospects from personal phones fail to log customer model preferences, budget, or exchange car details.",
          solution: "Our companion Android calling workflow enables reps to log mobile SIM calls, test-drive dates, and price quotes alongside centralized cloud telephony recordings.",
        },
      ]}
      workflowTitle="The 4-Stage Showroom & Workshop Engagement Journey"
      workflowStages={[
        {
          step: "STAGE 01",
          title: "Vehicle Inquiry Capture",
          description: "Online test-drive inquiries from manufacturer websites, Google Ads, or social media ingest into the CRM with vehicle model and trim preferences.",
        },
        {
          step: "STAGE 02",
          title: "Prompt Sales Consultation",
          description: "The dialing engine connects the showroom sales consultant to qualify customer requirements, budget, financing intent, and existing vehicle trade-in.",
        },
        {
          step: "STAGE 03",
          title: "WhatsApp Brochure & Showroom Pin",
          description: "Upon marking 'Test Drive Scheduled', an automated WhatsApp message delivers the vehicle brochure, on-road price breakdown, and showroom GPS location.",
        },
        {
          step: "STAGE 04",
          title: "Service Lifecycle Retention",
          description: "Post-vehicle purchase, the CRM triggers automated service reminder calls and WhatsApp alerts at 6-month intervals to maintain workshop retention.",
        },
      ]}
      pillars={[
        {
          metric: "Instant",
          metricLabel: "Showroom Routing",
          title: "Sales vs. Service IVR Routing",
          description: "Ensure test-drive buyers reach vehicle sales consultants and maintenance inquiries reach service advisors without front-desk delays.",
        },
        {
          metric: "Automated",
          metricLabel: "Location Drops",
          title: "WhatsApp Showroom Navigation",
          description: "Deliver showroom Google Maps location pins, model brochures, and test-drive confirmations directly to customer WhatsApp chats.",
        },
        {
          metric: "Proactive",
          metricLabel: "Workshop Recall",
          title: "Periodic Service Auto-Dialer",
          description: "Run automated outbound reminder campaigns targeting vehicle owners approaching scheduled service intervals to keep service bays full.",
        },
      ]}
      synergies={[
        {
          title: "Smart IVR System",
          description: "Configure multi-department call trees for Sales, Service, Insurance, and Accessories.",
          href: "/products/smart-ivr/",
        },
        {
          title: "Telecalling CRM",
          description: "Manage test-drive calendars, track sales consultant talk time, and log vehicle trade-in details.",
          href: "/products/telecalling-crm/",
        },
        {
          title: "Virtual Phone Numbers",
          description: "Assign unique trackable phone numbers to marketing billboards, newspaper ads, and online campaigns.",
          href: "/products/virtual-numbers/",
        },
      ]}
      faqs={[
        {
          question: "Can our floor sales consultants use their mobile phones to place customer calls?",
          answer: "Yes. With the Hanva companion Android app, sales consultants place calls using company mobile SIM cards with unlimited calling packages. The app automatically tracks call durations, timestamps, and 2-click dispositions ('Test Drive Booked', 'Follow Up', 'Price Sent') back to management.",
        },
        {
          question: "Can the system track which ad campaign generated each dealership call?",
          answer: "Yes. By provisioning distinct virtual phone numbers for Google Ads, print banners, and social campaigns, Hanva provides detailed attribution on which marketing channels generate the highest volume of qualified test drives.",
        },
        {
          question: "How does the workshop service booking workflow operate?",
          answer: "Customer service history and due dates are uploaded into calling campaigns. Telecallers dial owners approaching service milestones, offer available workshop pickup slots, and trigger automated WhatsApp confirmation messages with service advisor contact details.",
        },
      ]}
      schemaData={automobileSchema}
    />
  );
}
