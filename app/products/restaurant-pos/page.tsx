import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { ProductVisualPlaceholder, ProductStoryBand } from "@/components/shared/product-visual-placeholder";
import { RestaurantPosExplorer } from "@/components/interactive/restaurant-pos-explorer";
import { TrackedCtaObserver, TrackedDemoLink, TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildSaasDemoWhatsAppUrl } from "@/lib/config";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Phone,
  HelpCircle,
  ExternalLink,
  UtensilsCrossed,
} from "lucide-react";

export const metadata = {
  title: "Hanva Restaurant POS — Billing, KDS & QR Ordering",
  description:
    "Restaurant POS and GST billing software for dine-in, cafes & cloud kitchens: offline queue, KOT, Kitchen Display System (KDS), QR ordering, and recipe BOM.",
  alternates: {
    canonical: "https://www.hanva.in/products/restaurant-pos/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/products/restaurant-pos/",
    siteName: "Hanva Technologies",
    title: "Hanva Restaurant POS | Hanva Technologies",
    description:
      "Offline-resilient restaurant POS, KDS, QR menu ordering, India GST billing, and recipe BOM inventory software.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva Restaurant POS" }],
  },
};

const posFaqs: FAQItem[] = [
  {
    question: "Does Hanva Restaurant POS continue working if the internet goes down?",
    answer:
      "Yes. The POS frontend includes an IndexedDB offline order queue that syncs back to the backend once connectivity is restored, and supports both cloud and self-hosted local deployment.",
  },
  {
    question: "Does it support KOT, Kitchen Display System (KDS), and table QR ordering?",
    answer:
      "Yes. Orders route by kitchen station to KOT printing or the live KDS board with a duplicate-print guard, alongside rotating table QR self-ordering, a Captain PWA, Customer Display, and self-service Kiosk PWA.",
  },
  {
    question: "How are India GST and UPI payments handled?",
    answer:
      "The billing engine supports India GST (50/50 CGST/SGST split, inclusive or exclusive), multi-tender split payments (cash, card, UPI, wallet, gift card, store credit), and dynamic NPCI UPI QR code generation.",
  },
  {
    question: "Can Hanva Restaurant POS integrate with external ordering or delivery systems?",
    answer:
      "Yes. It provides a scoped Partner REST API and signed outbound webhooks so external aggregators or custom ordering platforms can integrate cleanly.",
  },
  {
    question: "How is Hanva Restaurant POS priced?",
    answer:
      "Contact us for pricing and a personalized product demonstration on WhatsApp (+91 8423711043).",
  },
];

const posSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Hanva Restaurant POS",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.hanva.in/products/restaurant-pos/",
      description:
        "Restaurant POS and billing software designed to simplify orders, GST billing, kitchen operations, QR ordering, and recipe inventory management.",
      publisher: {
        "@type": "Organization",
        name: CONTACT_CONFIG.companyLegalName,
        url: "https://www.hanva.in",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: posFaqs.map((f) => ({
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
  { label: "Hanva Restaurant POS" },
];

const verifiedFeatures = [
  {
    badge: "POS & Offline Queue",
    title: "Dine-In, Takeaway, Delivery & Captain PWA",
    description:
      "Handle dine-in, takeaway, delivery zones, scheduled orders, modifiers, half-price items, order merging, Customer Display, and an IndexedDB offline order queue.",
  },
  {
    badge: "Kitchen Operations",
    title: "KOT, KDS & Station Routing",
    description:
      "Route items to designated kitchen stations with live KDS status tracking, duplicate-KOT print protection, and print-bridge/receipt printing support.",
  },
  {
    badge: "Tables & QR",
    title: "Visual Table Layout, QR Ordering & Kiosk PWA",
    description:
      "Design floor plans, manage reservations and waitlists, accept waiter/bill requests, and offer table QR self-ordering and self-service Kiosk PWA.",
  },
  {
    badge: "GST & Payments",
    title: "India GST (CGST/SGST) & Dynamic UPI QR",
    description:
      "Automatic 50/50 CGST/SGST receipt split, split-tender settlement across cash/card/UPI/wallets/gift cards, refunds, and dynamic NPCI UPI QR codes.",
  },
  {
    badge: "Inventory & Recipes",
    title: "Recipe BOM, FIFO/WAC & Procurement",
    description:
      "Auto-deplete ingredient stock from recipes, manage purchase requisitions, POs, GRNs, supplier invoices, waste logs, and inter-branch stock transfers.",
  },
  {
    badge: "Security & Reports",
    title: "22 Reports, RBAC, 2FA & Partner REST API",
    description:
      "Access 22 operational/accounting reports (CSV/XLSX/PDF + scheduled email), Z-Reports, 105+ RBAC permissions, PIN + TOTP 2FA, and scoped Integration APIs & webhooks.",
  },
];

export default function HanvaRestaurantPosPage() {
  const whatsappUrl = buildSaasDemoWhatsAppUrl("pos");

  return (
    <div className="flex flex-col gap-12 lg:gap-16 pb-28 lg:pb-20 bg-white">
      <SchemaOrg schema={posSchema} />
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <section className="pt-10 lg:pt-16 pb-12 bg-gradient-to-b from-amber-50/50 via-white to-white border-b border-slate-100">
        <Container className="space-y-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="inline-flex items-center gap-2">
                  {idx > 0 && <span className="text-slate-400" aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-amber-800 transition-colors">
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
            <Badge className="bg-amber-100 text-amber-900 border-amber-200">
              <UtensilsCrossed className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
              Hospitality &amp; F&amp;B POS Platform
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Hanva Restaurant POS
            </h1>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed">
              Restaurant POS and billing software designed to simplify orders, billing, kitchen operations, and restaurant management.
            </p>
          </div>

          <TrackedCtaObserver ctaLocation="hero" productName="hanva_restaurant_pos" ctaType="pos_hero_cta">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800 text-white h-auto min-h-[48px] py-2.5 px-5 whitespace-normal text-center">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="hero"
                  productName="hanva_restaurant_pos"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/restaurant-pos/"
                  experimentId="EXP-22C"
                  variantId="request_demo_whatsapp"
                >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Request Demo on WhatsApp</span>
                  <ExternalLink className="ml-2 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-auto min-h-[48px] py-2.5 px-5 whitespace-normal text-center">
                <TrackedDemoLink href="/company/contact/?product=restaurant-pos" ctaLocation="pos_hero" productSlug="restaurant-pos">
                  <span>Contact Us for Pricing</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
            </div>
          </TrackedCtaObserver>

          <p className="text-xs text-slate-600">
            Clicking WhatsApp opens a chat with <span className="font-semibold">+91 8423711043</span> to initiate a guided demo enquiry (not an automated booking confirmation). Contact us for pricing.
          </p>

          <ProductVisualPlaceholder
            productName="Hanva Restaurant POS"
            accent="amber"
            plannedAsset="hanva-restaurant-pos.webp"
            caption="Dine-in/takeaway/delivery POS, KDS, QR ordering, India GST & recipe BOM inventory"
            workflowFlow={[
              "Table / QR / Counter Order",
              "Station KOT & Live KDS",
              "CGST/SGST Bill & UPI QR",
              "Recipe Stock Depletion & Z-Report",
            ]}
            modules={[
              { title: "POS, Captain PWA & QR Ordering", detail: "Table floor layout, QR self-ordering, kiosk mode, and offline order queue." },
              { title: "Kitchen Display & KOT Guard", detail: "Per-station routing, live prep statuses, and duplicate-print protection." },
              { title: "Recipe BOM & 22 Reports", detail: "FIFO/WAC ingredient depletion, procurement, food cost, and tax summaries." },
            ]}
          />
        </Container>
      </section>

      {/* Problem & Solution */}
      <section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">Operational Bottlenecks</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Slow order-to-kitchen handoffs, duplicate KOTs, internet outages halting billing, and unmeasured recipe ingredient wastage reduce restaurant margins every day.
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">The Hanva Restaurant POS Solution</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Unify counter POS, Captain PWA, QR self-ordering, KDS kitchen routing, India GST + UPI QR settlement, and recipe-level inventory in an offline-resilient platform.
            </p>
          </div>
        </Container>
      </section>

      {/* Verified Features */}
      <section>
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Verified Capabilities of Hanva Restaurant POS
            </h2>
            <p className="text-sm text-slate-600">
              Engineered for reliable service during peak dining hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedFeatures.map((item) => (
              <Card key={item.title} className="border-slate-200">
                <CardHeader className="pb-2">
                  <Badge variant="secondary" className="w-fit text-[11px] mb-2">{item.badge}</Badge>
                  <CardTitle className="text-base font-bold text-slate-900 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-amber-700 shrink-0 mt-1" aria-hidden="true" />
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

      {/* Interactive Demonstration Experience */}
      <section>
        <Container className="space-y-6">
          <div className="max-w-2xl space-y-1.5">
            <Badge className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
              Hands-On Simulation
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Interactive Product Demonstration: Restaurant Rush Hour Operations
            </h2>
            <p className="text-sm text-slate-600">
              Test how Hanva Restaurant POS handles rush hour: table QR orders, kitchen KOT routing, offline network failover, GST receipts with dynamic UPI QR, and ingredient cost deduction.
            </p>
          </div>
          <RestaurantPosExplorer />
        </Container>
      </section>

      {/* Restaurant POS Storytelling & Screenshot Slots */}
      <section className="py-12 bg-amber-50/30 border-y border-slate-100">
        <Container className="space-y-14">
          <ProductStoryBand
            eyebrow="01. Counter & Offline POS"
            title="Fast Dine-In, Takeaway & Delivery Billing with Offline Resilience"
            description="Keep orders moving even during Wi-Fi drops using the IndexedDB offline queue, multi-tender split payments (cash, card, UPI, wallets), dynamic NPCI UPI QR, and India CGST/SGST receipts."
            bullets={[
              "Modifiers, half-price items, combos, and order merging",
              "Captain PWA, Customer Display, and self-service Kiosk PWA",
              "Scoped Partner REST API and signed webhooks for integrations",
            ]}
            slotTitle="Hanva Restaurant POS — Billing & Order Screen"
            slotCaption="Genuine application screenshot awaiting local PostgreSQL 16 + Docker/Prisma seed environment."
            plannedFile="hanva-restaurant-pos.webp"
            accent="amber"
          />

          <ProductStoryBand
            eyebrow="02. Kitchen Display & KOT"
            title="Station-Routed KOTs & Live Kitchen Display System (KDS)"
            description="Send items straight to the right kitchen station with live prep status tracking, duplicate-KOT print protection, and print-bridge receipt support."
            bullets={[
              "Per-station KOT splitting and live status board",
              "Duplicate-print guard preventing accidental double preparation",
              "KDS prep performance and order-timing reports",
            ]}
            slotTitle="Hanva Restaurant POS — Kitchen Display System (KDS)"
            slotCaption="Genuine application screenshot awaiting local PostgreSQL 16 + Docker/Prisma seed environment."
            plannedFile="hanva-restaurant-kitchen-display.webp"
            accent="amber"
            reverse
          />

          <ProductStoryBand
            eyebrow="03. Tables, QR & Recipe Inventory"
            title="Visual Floor Designer, Table QR Ordering & Recipe BOM Stock"
            description="Manage table layouts, reservations, and rotating QR self-ordering while automatically depleting ingredient stock via FIFO/WAC recipes and tracking 22 operational reports."
            bullets={[
              "Visual floor/table designer with waiter/bill requests",
              "Procurement pipeline (PR, PO, GRN, supplier invoices) & waste logs",
              "22 built-in reports (CSV/XLSX/PDF), Z-Reports, and 105+ RBAC permissions",
            ]}
            slotTitle="Hanva Restaurant POS — Floor Layout & Inventory"
            slotCaption="Genuine application screenshot awaiting local PostgreSQL 16 + Docker/Prisma seed environment."
            plannedFile="hanva-restaurant-tables-inventory.webp"
            accent="amber"
          />

          {/* Mid-Page Conversion Banner */}
          <div className="rounded-2xl border border-amber-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-bold text-slate-900">See Hanva Restaurant POS in Action</div>
              <p className="text-xs sm:text-sm text-slate-600">
                Opens WhatsApp (+91 8423711043) to initiate a technical demo enquiry for your restaurant or cloud kitchen.
              </p>
            </div>
            <Button asChild size="default" className="bg-amber-700 hover:bg-amber-800 text-white shrink-0">
              <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="product_section"
                productName="hanva_restaurant_pos"
                ctaType="product_demo_whatsapp"
                contextRef="/products/restaurant-pos/"
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
          <h2 className="text-2xl font-bold text-slate-900">Suitable Food-Service Businesses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Dine-In Restaurants</div>
              <p className="text-slate-600">Floor designer, Captain PWA, reservations, and table QR ordering.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Cafes &amp; Bakeries</div>
              <p className="text-slate-600">Combos, modifiers, Happy Hour promos, and loyalty wallets.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">QSRs &amp; Food Courts</div>
              <p className="text-slate-600">Self-service Kiosk PWA, Customer Display, and fast UPI QR settlement.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Cloud Kitchens</div>
              <p className="text-slate-600">KDS prep tracking, recipe BOM depletion, and Partner API/webhooks.</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1">
              <div className="text-sm font-bold text-slate-900">Food Outlets</div>
              <p className="text-slate-600">Offline-resilient billing, GST tax summaries, and Z-Report closing.</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">Restaurant Billing, KDS, Inventory &amp; API Guides</div>
              <p className="text-xs text-slate-600">
                Explore technical guidance on India CGST/SGST billing, offline POS sync, kitchen routing, FIFO/WAC recipes, and Partner API webhooks.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 shrink-0 text-xs font-semibold">
              <Link href="/industry/restaurants-and-cafes/" className="inline-flex items-center text-amber-800 hover:underline">
                <span>Restaurants &amp; Cafes Industry Solution</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/resources/restaurant-pos-implementation-checklist/" className="inline-flex items-center text-amber-800 hover:underline">
                <span>Restaurant POS Implementation Checklist</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/resources/restaurant-pos-kot-inventory-guide/" className="inline-flex items-center text-amber-800 hover:underline">
                <span>POS, KOT &amp; Inventory Guide</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/resources/restaurant-billing-software-guide/" className="inline-flex items-center text-amber-800 hover:underline">
                <span>India GST &amp; Offline Billing Guide</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/resources/cloud-kitchen-management-guide/" className="inline-flex items-center text-amber-800 hover:underline">
                <span>Cloud Kitchen KDS &amp; BOM Guide</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link href="/software-development/api-integration-automation/" className="inline-flex items-center text-blue-700 hover:underline">
                <span>API Integration &amp; Workflows</span>
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Included vs Explicit Scope Clarifications */}
      <section>
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">What Is Included (Verified)</div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>Dine-in, takeaway, delivery &amp; scheduled POS with IndexedDB offline order sync</li>
              <li>Station KOT splitting, live KDS board w/ duplicate-print lock, Captain &amp; Kiosk PWAs</li>
              <li>50/50 CGST/SGST tax splits, multi-tender split payments &amp; dynamic NPCI UPI QR</li>
              <li>FIFO/WAC recipe BOM inventory, procurement (PR/PO/GRN), Partner API &amp; 22 reports</li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">Important Scope Boundaries</div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>No native Swiggy, Zomato, or UberEats adapters (use scoped Partner REST API &amp; webhooks)</li>
              <li>Multi-tender split payments supported; splitting 1 order into separate bills is not implemented</li>
              <li>Direct thermal printer / Windows print-bridge compatibility verified per hardware model</li>
              <li>Multi-branch staff permission enforcement &amp; self-service branch creation are partial</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section>
        <Container className="max-w-4xl space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-amber-700" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion items={posFaqs} />
        </Container>
      </section>

      {/* Final CTA */}
      <section>
        <Container>
          <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold">Contact Us for Pricing &amp; a Restaurant POS Demo</h2>
              <p className="text-sm text-slate-300">
                Initiate a WhatsApp demo enquiry to see dine-in billing, KDS, QR ordering, and recipe inventory in action.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button asChild size="lg" className="bg-[#25D366] text-slate-950 hover:bg-[#20BD5A] font-semibold">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="footer"
                  productName="hanva_restaurant_pos"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/restaurant-pos/"
                >
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>WhatsApp Demo Enquiry</span>
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
                <TrackedPhoneLink href={`tel:${CONTACT_CONFIG.phoneTel}`} ctaLocation="pos_bottom">
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
