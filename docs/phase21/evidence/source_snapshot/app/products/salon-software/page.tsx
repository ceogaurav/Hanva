import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { ProductVisualPlaceholder, ProductStoryBand } from "@/components/shared/product-visual-placeholder";
import { TrackedDemoLink, TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildSaasDemoWhatsAppUrl } from "@/lib/config";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  HelpCircle,
  ExternalLink,
  Scissors,
} from "lucide-react";

export const metadata = {
  title: "Hanva Salon Software — Billing, Booking & Staff",
  description:
    "Salon billing and management software for Indian salons & spas: GST invoicing, online booking mini-site, staff commissions, auto-consumption, and loyalty.",
  alternates: {
    canonical: "https://www.hanva.in/products/salon-software/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/products/salon-software/",
    siteName: "Hanva Technologies",
    title: "Hanva Salon Software | Hanva Technologies",
    description:
      "Salon billing and management software for Indian salons, spas, and grooming studios.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Salon Software" }],
  },
};

const salonFaqs: FAQItem[] = [
  {
    question: "Can clients book salon appointments online?",
    answer:
      "Yes. Hanva Salon Software includes a configurable public online booking mini-website so customers can view services, check availability, and book slots online alongside your front-desk calendar and waitlist.",
  },
  {
    question: "Does it support GST billing and digital invoices?",
    answer:
      "Yes. Checkout supports inclusive and exclusive GST billing, split POS payments, cash register Z-reports, and shareable digital/PDF invoices.",
  },
  {
    question: "How does inventory auto-consumption work for salon services?",
    answer:
      "You can configure service-to-product auto-consumption rules so back-bar consumables are automatically deducted from stock whenever a linked service is billed, alongside batch, expiry, and reorder tracking.",
  },
  {
    question: "How do staff commissions and payroll work?",
    answer:
      "Staff members have a dedicated Staff Portal with PIN login to view schedules, attendance, leaves, and earnings. Managers can configure tiered commissions, staff goals, and payroll.",
  },
  {
    question: "How is Hanva Salon Software priced?",
    answer:
      "Contact us for pricing and a personalized product demonstration on WhatsApp (+91 8423711043).",
  },
];

const salonSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Hanva Salon Software",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.hanva.in/products/salon-software/",
      description:
        "Salon billing and management software to simplify appointments, billing, staff operations, inventory auto-consumption, and salon business management.",
      publisher: {
        "@type": "Organization",
        name: CONTACT_CONFIG.companyLegalName,
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: salonFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/" },
  { label: "Hanva Salon Software" },
];

const verifiedFeatures = [
  {
    badge: "POS & GST Billing",
    title: "Salon Billing, GST Invoicing & Z-Reports",
    description:
      "Fast checkout with walk-in customer creation, split POS payments, inclusive/exclusive GST invoices, cash registers, expense tracking, and shareable digital/PDF receipts.",
  },
  {
    badge: "Appointments",
    title: "Appointment Calendar, Waitlist & Online Booking",
    description:
      "Manage bookings, chair/room resources, waitlists, and enquiries from one calendar—plus a public booking mini-website for direct customer appointments.",
  },
  {
    badge: "Staff Operations",
    title: "Staff Portal, Commissions & Payroll",
    description:
      "Dedicated Staff Portal with PIN login, shift availability, attendance, leave requests, tiered commission calculations, staff goals, and payroll tracking.",
  },
  {
    badge: "Inventory",
    title: "Product Stock & Service Auto-Consumption",
    description:
      "Track retail and back-bar stock with units, batches, expiry, reorder levels, vendor records, and automated deduction rules when services are completed.",
  },
  {
    badge: "Retention",
    title: "Customers, Wallet, Loyalty, Memberships & Packages",
    description:
      "Store client preferences, preferred stylists, wallet balances, loyalty point earn/redeem rules, freeze-capable memberships, session packages, coupons, gift cards, and referrals.",
  },
  {
    badge: "Insights & WhatsApp",
    title: "15 Business Reports & WhatsApp Automations",
    description:
      "Access revenue, booking, staff commission, and inventory reports with CSV exports alongside automated WhatsApp reminders and campaign workflows.",
  },
];

export default function HanvaSalonSoftwarePage() {
  const whatsappUrl = buildSaasDemoWhatsAppUrl("salon");

  return (
    <div className="flex flex-col gap-12 lg:gap-16 pb-28 lg:pb-20 bg-white">
      <SchemaOrg schema={salonSchema} />
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <section className="pt-10 lg:pt-16 pb-12 bg-gradient-to-b from-rose-50/50 via-white to-white border-b border-slate-100">
        <Container className="space-y-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="inline-flex items-center gap-2">
                  {idx > 0 && <span className="text-slate-400" aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-rose-700 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-900 font-medium" aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge className="bg-rose-100 text-rose-800 border-rose-200">
              <Scissors className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Salon &amp; Spa SaaS Platform
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Hanva Salon Software
            </h1>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
              Salon billing and management software to simplify appointments, billing, staff operations, and salon business management.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white h-auto min-h-[48px] py-2.5 px-5 whitespace-normal text-center">
              <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="hero"
                productName="hanva_salon_software"
                ctaType="product_demo_whatsapp"
                contextRef="/products/salon-software/"
              >
                <MessageSquare className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Request Demo on WhatsApp</span>
                <ExternalLink className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </TrackedWhatsAppLink>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-auto min-h-[48px] py-2.5 px-5 whitespace-normal text-center">
              <TrackedDemoLink href="/company/contact/?product=salon-software" ctaLocation="salon_hero" productSlug="salon-software">
                <span>Contact Us for Pricing</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
              </TrackedDemoLink>
            </Button>
          </div>

          <p className="text-xs text-slate-600">
            Clicking WhatsApp opens a chat with <span className="font-semibold">+91 8423711043</span> to initiate a guided demo enquiry (not an automated booking confirmation). Contact us for pricing.
          </p>

          <ProductVisualPlaceholder
            productName="Hanva Salon Software"
            accent="rose"
            plannedAsset="hanva-salon-dashboard.webp"
            caption="Appointments, GST checkout, staff commissions, inventory auto-consumption & online booking"
            workflowFlow={[
              "Online / Desk Booking",
              "Service & Stylist Assignment",
              "GST Billing & Split Checkout",
              "Auto Stock & Commission Sync",
            ]}
            modules={[
              { title: "Online Booking Mini-Website", detail: "Shareable booking page with real-time slot availability and waitlist management." },
              { title: "Front-Desk POS & Digital Invoices", detail: "Fast checkout with memberships, packages, loyalty points, and PDF/HTML bills." },
              { title: "Staff Portal & Back-Bar Stock", detail: "PIN-based staff schedules, tiered commissions, and service auto-consumption." },
            ]}
          />
        </Container>
      </section>

      {/* Problem & Solution */}
      <section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">Common Salon Challenges</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Paper appointment registers, manual staff commission spreadsheets, untracked back-bar product usage, and inconsistent billing slow down salon owners and cause revenue leakage.
            </p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-700">How Hanva Salon Software Helps</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Bring appointments, online booking, GST invoicing, staff payroll/commissions, inventory auto-consumption, and client loyalty into a single browser-based platform with offline queue resilience.
            </p>
          </div>
        </Container>
      </section>

      {/* Verified Features */}
      <section>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Verified Capabilities for Salons &amp; Spas
            </h2>
            <p className="text-sm text-slate-600">
              Built for single-outlet salons, beauty studios, spas, and grooming lounges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedFeatures.map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit text-[11px] mb-2">{item.badge}</Badge>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-rose-600 shrink-0 mt-1" aria-hidden="true" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Salon Storytelling & Screenshot Slots */}
      <section className="py-12 bg-rose-50/30 border-y border-slate-100">
        <Container className="space-y-14">
          <ProductStoryBand
            eyebrow="01. Front-Desk Billing"
            title="GST Invoicing, Split POS Payments & Shareable Digital Bills"
            description="Complete checkouts quickly with walk-in auto-customer creation, inclusive/exclusive GST calculations, loyalty/gift-card redemptions, and shareable PDF/HTML invoices."
            bullets={[
              "Idempotent checkout with cash register & Z-report closing",
              "Memberships, session-deducting packages, and referral tracking",
              "Offline-capable browser queue for uninterrupted billing",
            ]}
            slotTitle="Hanva Salon Software — POS Billing & Invoice Screen"
            slotCaption="Genuine application screenshot awaiting isolated Neon PostgreSQL + Clerk dev sandbox capture."
            plannedFile="hanva-salon-billing.webp"
            accent="rose"
          />

          <ProductStoryBand
            eyebrow="02. Appointments & Booking"
            title="Appointment Calendar, Waitlist & Online Booking Mini-Website"
            description="Coordinate stylists, rooms, and chair resources on a unified calendar while letting customers book slots directly via your salon's public booking mini-website."
            bullets={[
              "Real-time slot availability and waitlist management",
              "Public booking link and client appointment reminders",
              "Customer visit history, tags, and preferred stylist notes",
            ]}
            slotTitle="Hanva Salon Software — Appointment Calendar"
            slotCaption="Genuine application screenshot awaiting isolated Neon PostgreSQL + Clerk dev sandbox capture."
            plannedFile="hanva-salon-appointments.webp"
            accent="rose"
            reverse
          />

          <ProductStoryBand
            eyebrow="03. Staff & Inventory"
            title="Staff Portal, Tiered Commissions & Service Auto-Consumption"
            description="Eliminate manual commission math and back-bar stock guesswork with PIN-authenticated staff portals, payroll tracking, and automatic product deduction per service."
            bullets={[
              "Dedicated Staff Portal with PIN login, shifts, attendance & goals",
              "Service-to-product auto-consumption and batch/expiry tracking",
              "15 built-in business reports with CSV exports",
            ]}
            slotTitle="Hanva Salon Software — Staff Commissions & Inventory"
            slotCaption="Genuine application screenshot awaiting isolated Neon PostgreSQL + Clerk dev sandbox capture."
            plannedFile="hanva-salon-staff-inventory.webp"
            accent="rose"
          />

          {/* Mid-Page Conversion Banner */}
          <div className="rounded-2xl border border-rose-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-bold text-slate-900">Evaluate Hanva Salon Software for Your Salon</div>
              <p className="text-xs sm:text-sm text-slate-600">
                Opens WhatsApp (+91 8423711043) to initiate a guided demo enquiry covering billing, booking, and commissions.
              </p>
            </div>
            <Button asChild size="default" className="bg-rose-600 hover:bg-rose-700 text-white shrink-0">
              <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="product_section"
                productName="hanva_salon_software"
                ctaType="product_demo_whatsapp"
                contextRef="/products/salon-software/"
              >
                <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Demo Enquiry</span>
              </TrackedWhatsAppLink>
            </Button>
          </div>
        </Container>
      </section>

      {/* Suitable Business Types */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <Container className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Suitable Business Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Unisex &amp; Hair Salons</div>
              <p className="text-slate-600">Fast service billing, stylist commissions, and repeat booking reminders.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Spas &amp; Wellness Studios</div>
              <p className="text-slate-600">Room/resource scheduling, therapy packages, and membership tracking.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Skin &amp; Aesthetic Clinics</div>
              <p className="text-slate-600">Session-deducting packages, GST invoices, and inventory batch tracking.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Nail, Lash &amp; Grooming Lounges</div>
              <p className="text-slate-600">Online booking mini-site, loyalty wallets, and gift cards.</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">Salon Software Evaluation &amp; Operational Guides</div>
              <p className="text-xs text-slate-600">
                Explore India SAC/HSN GST billing mechanics, online booking workflows, commission checklists, and local salon visibility guides.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0 text-xs font-semibold">
              <Link href="/resources/salon-management-software-guide/" className="inline-flex items-center text-rose-700 hover:underline">
                <span>Salon Software Buyer Guide</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/resources/salon-billing-software-guide/" className="inline-flex items-center text-rose-700 hover:underline">
                <span>Salon GST Billing Guide</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/resources/salon-appointment-management-guide/" className="inline-flex items-center text-rose-700 hover:underline">
                <span>Appointments &amp; Online Booking Guide</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/digital-marketing/" className="inline-flex items-center text-blue-700 hover:underline">
                <span>Salon Digital Marketing</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section>
        <Container className="max-w-4xl space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-600" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={salonFaqs} />
        </Container>
      </section>

      {/* Final CTA */}
      <section>
        <Container>
          <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold">Contact Us for Pricing &amp; a Salon Software Demo</h2>
              <p className="text-sm text-slate-300">
                Initiate a WhatsApp demo enquiry for a guided walkthrough of billing, online booking, commissions, and inventory.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button asChild size="lg" className="bg-[#25D366] text-slate-950 hover:bg-[#20BD5A] font-semibold">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="footer"
                  productName="hanva_salon_software"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/salon-software/"
                >
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp Demo Enquiry</span>
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                <TrackedPhoneLink href={`tel:${CONTACT_CONFIG.phoneTel}`} ctaLocation="salon_bottom">
                  <Phone className="mr-2 h-4 w-4 text-blue-400" aria-hidden="true" />
                  <span>{CONTACT_CONFIG.phoneDisplay}</span>
                </TrackedPhoneLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
