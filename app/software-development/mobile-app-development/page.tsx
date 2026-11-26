import { ServiceLayout } from "@/components/shared/service-layout";

export const metadata = {
  title: "Mobile App Development Services",
  description:
    "Custom mobile application development for Android and cross-platform business workflows, field teams, and customer-facing apps.",
  alternates: {
    canonical: "https://www.hanva.in/software-development/mobile-app-development/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/software-development/mobile-app-development/",
    siteName: "Hanva Technologies",
    title: "Mobile App Development | Hanva Technologies",
    description: "Android and cross-platform mobile applications for business operations.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Mobile App Development" }],
  },
};

export default function MobileAppDevelopmentPage() {
  return (
    <ServiceLayout
      categoryBadge="Software Development • Mobile Apps"
      title="Mobile App Development"
      subtitle="Build reliable Android and cross-platform mobile applications for customer engagement, field operations, and internal business teams."
      problemStatement="Field sales, delivery, and service teams cannot rely on desktop-only tools, while poorly built mobile apps suffer from crashes, offline failures, and low adoption."
      solutionOverview="Hanva builds practical, workflow-driven mobile applications designed for real-world connectivity, clear usability, and clean backend synchronization."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Software Development", href: "/software-development/" },
        { label: "Mobile App Development" },
      ]}
      whatsappMessage="Hello Hanva Team, I would like to enquire about Mobile App Development services."
      contextRef="/software-development/mobile-app-development/"
      serviceType="Mobile Application Development"
      canonicalUrl="https://www.hanva.in/software-development/mobile-app-development/"
      deliverables={[
        { tag: "Business Apps", title: "Customer & Booking Mobile Apps", description: "Clean mobile interfaces for appointments, orders, enquiries, and status updates." },
        { tag: "Field Operations", title: "Staff, Telecaller & Field-Team Apps", description: "Mobile workflows for attendance, task updates, and on-the-go customer records." },
        { tag: "Offline Resilience", title: "Local Caching & Sync Readiness", description: "Design mobile state handling to tolerate intermittent mobile network drops." },
        { tag: "Backend Sync", title: "Secure API & Notification Integration", description: "Connect mobile apps cleanly to your central backend and push notification flows." },
        { tag: "Usability", title: "Mobile-First UI & Touch Ergonomics", description: "Clear navigation, accessible contrast, and fast screen transitions." },
        { tag: "Release Prep", title: "Testing & Store Readiness Support", description: "Structured QA across screen sizes and release packaging guidance." },
      ]}
      stages={[
        { step: "01. DISCOVERY", title: "User Flow & Platform Scope", description: "Define target users, core screens, and offline/online requirements." },
        { step: "02. PROTOTYPE", title: "Screen & API Architecture", description: "Align mobile navigation and backend API contracts." },
        { step: "03. BUILD", title: "App & Backend Engineering", description: "Develop screens, state management, and API integrations." },
        { step: "04. QA & LAUNCH", title: "Device Testing & Rollout", description: "Verify performance, permissions, and deployment readiness." },
      ]}
      suitableCustomers={[
        { audience: "Field & Sales Teams", title: "On-the-Move Operations", description: "Businesses equipping field staff with dedicated mobile tools." },
        { audience: "Consumer Services", title: "Customer Companion Apps", description: "Brands offering mobile booking, loyalty, or order tracking." },
        { audience: "SaaS Founders", title: "Mobile Extensions", description: "Extending existing web platforms with companion mobile apps." },
      ]}
      relatedLinks={[
        { title: "Web Application Development", description: "Build companion web portals and admin dashboards.", href: "/software-development/web-application-development/" },
        { title: "API Integration & Automation", description: "Connect mobile apps with external services and workflows.", href: "/software-development/api-integration-automation/" },
        { title: "Hanva CRM", description: "Explore our existing CRM & telecalling platform.", href: "/products/crm/" },
      ]}
      faqs={[
        {
          question: "Can you integrate a new mobile app with our existing web backend?",
          answer: "Yes. We can connect mobile apps to existing REST APIs or design a clean backend layer alongside the app.",
        },
        {
          question: "How is mobile app development priced?",
          answer: "Contact us for pricing based on platform scope, screen complexity, and backend integration requirements.",
        },
      ]}
    />
  );
}
