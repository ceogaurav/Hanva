import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
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
} from "lucide-react";

export const metadata = {
  title: "Cloud Telephony, IVR & CRM Products Suite — Hanva Technologies",
  description:
    "Explore Hanva's integrated software suite: Cloud Telephony, Smart IVR, Virtual Numbers, Auto & Predictive Dialers, Telecalling CRM, and WhatsApp Business API.",
  alternates: {
    canonical: "https://hanva.in/products/",
  },
};

const productsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Hanva Technologies Products Suite",
  url: "https://hanva.in/products/",
  description: "Enterprise cloud telephony, smart IVR, automated dialers, and sales telecalling CRM software.",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
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
          <Badge variant="default">Integrated Software Suite</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto">
            Integrated Telecom & Sales Software Architecture
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Eliminate disconnected tools. Hanva delivers carrier voice trunking, automated dialing algorithms, and customer relationship management in one synchronized platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/company/contact/">
              <Button variant="primary" size="lg">
                Request Product Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing/calculator/">
              <Button variant="outline" size="lg">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                Estimate Voice Costs
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Section 1: Telecom & Voice Infrastructure (6 Products) */}
      <section>
        <Container className="space-y-8">
          <div>
            <Badge variant="secondary" className="mb-2">Voice & PBX Layer</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Telecom & Cloud Voice Infrastructure
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Carrier gateway delivery via CloudConnect Communications with dedicated Vi and Tata Teleservices DIDs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Cloud Telephony */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Server className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Cloud Telephony & Virtual PBX</CardTitle>
                <CardDescription className="text-xs">
                  Route, record, and monitor enterprise business calls across nationwide branches without PBX hardware.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Intelligent call forwarding to agent SIMs & softphones</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Centralized encrypted call recording & CDR logs</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/cloud-telephony/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    View Specifications &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 2. Smart IVR System */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Interactive Voice Response (IVR)</CardTitle>
                <CardDescription className="text-xs">
                  Multi-level voice menus, automated department routing, and 24/7 customer call greetings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Press-1, Press-2 customizable IVR trees</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Automated missed call capture with WhatsApp alerts</li>
                </ul>
                <div className="pt-2 flex items-center space-x-4">
                  <Link href="/products/ivr-system/" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    IVR Overview &rarr;
                  </Link>
                  <Link href="/products/smart-ivr/" className="text-xs font-semibold text-slate-600 hover:text-blue-600">
                    Flow Builder &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 3. Virtual Numbers */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Phone className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Virtual Mobile Numbers & DIDs</CardTitle>
                <CardDescription className="text-xs">
                  Dedicated 10-digit mobile virtual numbers with high concurrency channels for sales and customer care.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> 10-digit mobile numbering that prospects answer</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Two-way call masking protecting personal numbers</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/virtual-numbers/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    View Virtual Numbers &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 4. Toll-Free Numbers */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">1800 Enterprise Toll-Free Numbers</CardTitle>
                <CardDescription className="text-xs">
                  Build brand authority across India. Remove financial barriers for your callers with 1800 numbers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Free calling for prospects on all Indian networks</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Paired with smart IVR and agent queue management</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/toll-free-numbers/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    Explore Toll-Free &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 5. Call Center Software */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Layers className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Call Center Operations Suite</CardTitle>
                <CardDescription className="text-xs">
                  Live supervisor wallboards, automatic call distribution (ACD), agent activity monitoring, and QA scorecards.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Live supervisor wallboard & agent status</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Agent performance tracking & call recording audits</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/call-center-software/" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center">
                    Explore Call Center Suite &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 6. Auto & Predictive Dialers */}
            <Card className="hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Cpu className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Progressive & Predictive Dialers</CardTitle>
                <CardDescription className="text-xs">
                  Automate outbound calling campaigns. Skip unanswered rings and connect telecallers only to live prospects.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Progressive and algorithmic predictive pacing</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> 15-second OBD pulse billing option</li>
                </ul>
                <div className="pt-2 flex items-center space-x-4">
                  <Link href="/products/auto-dialer/" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Auto-Dialer &rarr;
                  </Link>
                  <Link href="/products/predictive-dialer/" className="text-xs font-semibold text-slate-600 hover:text-blue-600">
                    Predictive Dialer &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Section 2: CRM & Messaging Suite (3 Products) */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <Container className="space-y-8">
          <div>
            <Badge variant="default" className="mb-2">Software & Messaging Layer</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              CRM & WhatsApp Messaging Suite
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Purpose-built lead pipelines, call disposition tracking, and WhatsApp Business API messaging automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 7. Platform CRM */}
            <Card className="bg-white hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Platform Sales CRM</CardTitle>
                <CardDescription className="text-xs">
                  Unified deal pipelines, contact timelines, and native click-to-call telephony.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Visual drag-and-drop deal stages</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Automated lead assignment rules</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/crm/" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Explore Platform CRM &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 8. Telecalling CRM */}
            <Card className="bg-white hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">Telecalling CRM</CardTitle>
                <CardDescription className="text-xs">
                  Tailored for telecallers with streamlined call disposition tracking, follow-ups, and SIM/Cloud modes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Daily call target & talk-time KPIs</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> 2-Click call disposition logging</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/telecalling-crm/" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Explore Telecalling CRM &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* 9. WhatsApp CRM */}
            <Card className="bg-white hover:border-emerald-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">WhatsApp Business CRM</CardTitle>
                <CardDescription className="text-xs">
                  WhatsApp Business API messaging, automated post-call brochure drops, and shared team inbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <ul className="text-slate-600 space-y-1.5">
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Shared multi-agent WhatsApp desk</li>
                  <li className="flex items-center"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-2 shrink-0" /> Automated brochure sharing on call disconnect</li>
                </ul>
                <div className="pt-2">
                  <Link href="/products/whatsapp-crm/" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                    Explore WhatsApp CRM &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Conversion Banner */}
      <section>
        <Container>
          <div className="p-8 sm:p-10 rounded-2xl border border-blue-200 bg-blue-50/70 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Need a Custom Telephony & Software Bundle?
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Our Bengaluru sales engineers will design a package tailored to your agent seats, monthly call volume, and CRM integration requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/company/contact/">
                <Button variant="primary" size="lg">
                  Request Custom Quotation
                </Button>
              </Link>
              <Link href="/pricing/calculator/">
                <Button variant="outline" size="lg" className="border-slate-300">
                  <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                  Estimate Pulse Savings
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
