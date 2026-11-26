import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import { TrackedProductLink, TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG, buildSaasDemoWhatsAppUrl } from "@/lib/config";
import {
  Server,
  PhoneCall,
  Layers,
  Cpu,
  BarChart3,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Scissors,
  UtensilsCrossed,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "SaaS Products & Cloud Telephony Suite",
  description:
    "Explore Hanva's SaaS products (Hanva CRM, Hanva Salon Software, Hanva Restaurant POS) and enterprise telecom suite including Cloud Telephony, Smart IVR, Auto Dialers, and WhatsApp CRM.",
  alternates: {
    canonical: "https://www.hanva.in/products/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/products/",
    siteName: "Hanva Technologies",
    title: "SaaS Products & Cloud Telephony Suite",
    description:
      "Hanva CRM, Hanva Salon Software, Hanva Restaurant POS, plus Cloud Telephony, Smart IVR, Auto & Predictive Dialers, and WhatsApp CRM.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Hanva SaaS & Telecom Products" }],
  },
};

const productsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hanva Technologies SaaS & Telecom Products",
  url: "https://www.hanva.in/products/",
  description:
    "SaaS platforms (Hanva CRM, Hanva Salon Software, Hanva Restaurant POS) and enterprise cloud telephony, smart IVR, and automated dialer software.",
  provider: {
    "@type": "Organization",
    name: CONTACT_CONFIG.companyLegalName,
    telephone: "+91-8423711043",
  },
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-14 lg:gap-20 pb-20 bg-white">
      <SchemaOrg schema={productsSchema} />

      {/* Hero Header */}
      <section className="pt-12 lg:pt-16 pb-12 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-100">
        <Container className="text-center space-y-4">
          <Badge variant="default">Hanva Software Portfolio</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto">
            SaaS Products &amp; Enterprise Telecom Architecture
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Purpose-built SaaS applications for sales teams, salons, and restaurants alongside carrier-grade cloud telephony, IVR, and automated calling systems.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild variant="primary" size="lg">
              <Link href="/company/contact/">
                Request Product Consultation
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing/calculator/">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" aria-hidden="true" />
                Estimate Voice Costs
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 1: Flagship SaaS Products (3 Products) */}
      <section>
        <Container className="space-y-8">
          <div>
            <Badge variant="default" className="mb-2">SaaS Products</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Industry-Focused SaaS Platforms
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Contact us for pricing and a personalized product demonstration via WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hanva CRM */}
            <Card className="border-blue-200 hover:border-blue-400 transition-colors flex flex-col justify-between">
              <CardHeader className="pb-3 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                  <BarChart3 className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Hanva CRM</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Manage leads, sales conversations, calling operations, and customer communication from one CRM platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <ul className="text-slate-700 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Lead pipelines, bulk CSV import, scoring &amp; KYC vault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Built-in IVR, C2C calling, auto-dialing &amp; call recordings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>WhatsApp Business integration &amp; team attendance</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="primary" size="sm" className="w-full">
                    <TrackedProductLink href="/products/crm/" productName="hanva_crm" itemListName="Products Hub SaaS Grid" ctaLocation="product_section">
                      View Product Details &rarr;
                    </TrackedProductLink>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <TrackedWhatsAppLink
                      href={buildSaasDemoWhatsAppUrl("crm")}
                      target="_blank"
                      rel="noopener noreferrer"
                      ctaLocation="product_section"
                      productName="hanva_crm"
                      ctaType="product_demo_whatsapp"
                      contextRef="/products/crm/"
                    >
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span>Demo Enquiry on WhatsApp</span>
                      <ExternalLink className="ml-1.5 h-3 w-3" aria-hidden="true" />
                    </TrackedWhatsAppLink>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Hanva Salon Software */}
            <Card className="border-rose-200 hover:border-rose-400 transition-colors flex flex-col justify-between">
              <CardHeader className="pb-3 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                  <Scissors className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Hanva Salon Software</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Salon billing and management software to simplify appointments, billing, staff operations, and salon business management.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <ul className="text-slate-700 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>GST invoicing, split POS checkout &amp; cash Z-reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Appointments, waitlist &amp; online booking mini-website</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Staff commissions, payroll, inventory auto-consumption &amp; loyalty</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="primary" size="sm" className="w-full bg-rose-600 hover:bg-rose-700">
                    <TrackedProductLink href="/products/salon-software/" productName="hanva_salon_software" itemListName="Products Hub SaaS Grid" ctaLocation="product_section">
                      View Product Details &rarr;
                    </TrackedProductLink>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <TrackedWhatsAppLink
                      href={buildSaasDemoWhatsAppUrl("salon")}
                      target="_blank"
                      rel="noopener noreferrer"
                      ctaLocation="product_section"
                      productName="hanva_salon_software"
                      ctaType="product_demo_whatsapp"
                      contextRef="/products/salon-software/"
                    >
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span>Demo Enquiry on WhatsApp</span>
                      <ExternalLink className="ml-1.5 h-3 w-3" aria-hidden="true" />
                    </TrackedWhatsAppLink>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Hanva Restaurant POS */}
            <Card className="border-amber-200 hover:border-amber-400 transition-colors flex flex-col justify-between">
              <CardHeader className="pb-3 space-y-2">
                <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Hanva Restaurant POS</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Restaurant POS and billing software designed to simplify orders, billing, kitchen operations, and restaurant management.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <ul className="text-slate-700 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Dine-in, takeaway, delivery &amp; offline-resilient POS billing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>KOT, Kitchen Display System (KDS) &amp; table QR ordering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Recipe BOM inventory, India GST (CGST/SGST) &amp; UPI QR</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="primary" size="sm" className="w-full bg-amber-700 hover:bg-amber-800">
                    <TrackedProductLink href="/products/restaurant-pos/" productName="hanva_restaurant_pos" itemListName="Products Hub SaaS Grid" ctaLocation="product_section">
                      View Product Details &rarr;
                    </TrackedProductLink>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <TrackedWhatsAppLink
                      href={buildSaasDemoWhatsAppUrl("pos")}
                      target="_blank"
                      rel="noopener noreferrer"
                      ctaLocation="product_section"
                      productName="hanva_restaurant_pos"
                      ctaType="product_demo_whatsapp"
                      contextRef="/products/restaurant-pos/"
                    >
                      <MessageSquare className="mr-1.5 h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                      <span>Demo Enquiry on WhatsApp</span>
                      <ExternalLink className="ml-1.5 h-3 w-3" aria-hidden="true" />
                    </TrackedWhatsAppLink>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* SaaS Product Comparison Matrix */}
      <section className="py-10 bg-slate-50 border-y border-slate-100">
        <Container className="space-y-6">
          <div className="space-y-1">
            <Badge variant="secondary">Quick Comparison</Badge>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Compare Hanva&apos;s Three SaaS Platforms
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified capability comparison to help you choose the right platform for your business operations.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-900">
                  <th className="p-4 font-bold">Capability</th>
                  <th className="p-4 font-bold text-blue-700">Hanva CRM</th>
                  <th className="p-4 font-bold text-rose-700">Hanva Salon Software</th>
                  <th className="p-4 font-bold text-amber-800">Hanva Restaurant POS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Primary Business Fit</td>
                  <td className="p-4">Inside sales, real estate, BFSI, EdTech &amp; telecalling teams</td>
                  <td className="p-4">Single-outlet salons, spas, skin clinics &amp; grooming lounges</td>
                  <td className="p-4">Dine-in restaurants, cafes, QSRs &amp; cloud kitchens</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Core Daily Workflow</td>
                  <td className="p-4">Lead pipelines, C2C calling, IVR campaigns &amp; KYC vault</td>
                  <td className="p-4">Appointments, online booking mini-site, checkout &amp; commissions</td>
                  <td className="p-4">Order billing, KOT/KDS kitchen routing, QR ordering &amp; tables</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">GST &amp; Billing</td>
                  <td className="p-4">Contact us for custom CRM/billing integration</td>
                  <td className="p-4">Inclusive/exclusive GST, split POS checkout, PDF/HTML invoices</td>
                  <td className="p-4">India CGST/SGST split, multi-tender settlement &amp; UPI QR</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Inventory &amp; Stock</td>
                  <td className="p-4">Not applicable (sales &amp; calling CRM)</td>
                  <td className="p-4">Batches, expiry, vendors &amp; service auto-consumption</td>
                  <td className="p-4">Recipe BOM (FIFO/WAC), procurement &amp; waste tracking</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900">Pricing &amp; Demo</td>
                  <td className="p-4">Contact us for pricing (WhatsApp demo enquiry)</td>
                  <td className="p-4">Contact us for pricing (WhatsApp demo enquiry)</td>
                  <td className="p-4">Contact us for pricing (WhatsApp demo enquiry)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Section 2: Telecom & Voice Infrastructure */}
      <section>
        <Container className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Telecom &amp; Communication Products</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Telecom, Dialers &amp; Cloud Voice Infrastructure
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Carrier gateway delivery via CloudConnect Communications with dedicated Vi and Tata Teleservices DIDs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cloud Telephony */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Server className="h-4 w-4" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">Cloud Telephony &amp; Virtual PBX</CardTitle>
                <CardDescription className="text-xs">
                  Route, record, and monitor enterprise business calls across branches without PBX hardware.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Call forwarding to agent SIMs &amp; softphones</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Centralized call recording &amp; CDR logs</li>
                </ul>
                <div className="pt-2 flex items-center justify-between">
                  <Link href="/products/cloud-telephony/" className="font-semibold text-blue-600 hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link href="/company/contact/?product=cloud-telephony" className="font-semibold text-slate-700 hover:text-blue-600">
                    Request Demo
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Smart IVR */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">Smart IVR System</CardTitle>
                <CardDescription className="text-xs">
                  Multi-level voice menus, automated department routing, and 24/7 customer greetings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Customizable multi-level IVR trees</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Missed call capture &amp; alerts</li>
                </ul>
                <div className="pt-2 flex items-center justify-between">
                  <Link href="/products/ivr-system/" className="font-semibold text-blue-600 hover:underline">
                    IVR Overview &rarr;
                  </Link>
                  <Link href="/products/smart-ivr/" className="font-semibold text-slate-700 hover:text-blue-600">
                    Smart IVR &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Call Center Software */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">Call Center Software</CardTitle>
                <CardDescription className="text-xs">
                  Blended inbound/outbound ACD queues, supervisor monitoring, and SLA tracking.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Skill-based &amp; round-robin routing</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Disposition &amp; recording audit trails</li>
                </ul>
                <div className="pt-2 flex items-center justify-between">
                  <Link href="/products/call-center-software/" className="font-semibold text-blue-600 hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link href="/company/contact/?product=call-center-software" className="font-semibold text-slate-700 hover:text-blue-600">
                    Request Demo
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Auto & Predictive Dialers */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Cpu className="h-4 w-4" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">Auto &amp; Predictive Dialers</CardTitle>
                <CardDescription className="text-xs">
                  Automated outbound dialing and pacing algorithms for high-volume calling campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Progressive auto-dialing &amp; campaign queues</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Predictive pacing for large teams</li>
                </ul>
                <div className="pt-2 flex items-center justify-between">
                  <Link href="/products/auto-dialer/" className="font-semibold text-blue-600 hover:underline">
                    Auto Dialer &rarr;
                  </Link>
                  <Link href="/products/predictive-dialer/" className="font-semibold text-slate-700 hover:text-blue-600">
                    Predictive &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Telecalling CRM & WhatsApp CRM */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 mb-2">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">Telecalling CRM &amp; WhatsApp CRM</CardTitle>
                <CardDescription className="text-xs">
                  Voice-first telecaller workflows and official WhatsApp Business API lead engagement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Dedicated telecaller disposition console</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Official WABA messaging &amp; templates</li>
                </ul>
                <div className="pt-2 flex items-center justify-between">
                  <Link href="/products/telecalling-crm/" className="font-semibold text-blue-600 hover:underline">
                    Telecalling CRM &rarr;
                  </Link>
                  <Link href="/products/whatsapp-crm/" className="font-semibold text-slate-700 hover:text-blue-600">
                    WhatsApp CRM &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Virtual & Toll-Free Numbers */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg">Virtual &amp; 1800 Toll-Free Numbers</CardTitle>
                <CardDescription className="text-xs">
                  Regional virtual DID numbers and nationwide 1800 toll-free lines for customer trust.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> City-specific DIDs &amp; number masking</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> TRAI &amp; DoT KYC compliant provisioning</li>
                </ul>
                <div className="pt-2 flex items-center justify-between">
                  <Link href="/products/virtual-numbers/" className="font-semibold text-blue-600 hover:underline">
                    Virtual Numbers &rarr;
                  </Link>
                  <Link href="/products/toll-free-numbers/" className="font-semibold text-slate-700 hover:text-blue-600">
                    Toll-Free &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Bottom Trust Banner */}
      <section>
        <Container>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <div className="text-base font-bold text-slate-900">Need a Custom Software or Digital Marketing Solution?</div>
                <div className="text-xs sm:text-sm text-slate-600">
                  Explore our Custom Software Development and Digital Marketing services alongside our ready-made SaaS platforms.
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/software-development/">Software Development</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/digital-marketing/">Digital Marketing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
