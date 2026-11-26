import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FAQAccordion, type FAQItem } from "@/components/shared/faq-accordion";
import { SchemaOrg, buildBreadcrumbSchema } from "@/components/shared/schema-org";
import { TrackedDemoLink, TrackedWhatsAppLink, TrackedPhoneLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG } from "@/lib/config";
import {
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Phone,
  Layers,
  Building2,
  Server,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  Radio,
  ExternalLink,
} from "lucide-react";

export interface TelecomSpec {
  label: string;
  value: string;
  description: string;
}

export interface WorkflowStage {
  step: string;
  title: string;
  description: string;
}

export interface LocationLayoutProps {
  cityName: string;
  regionBadge: string;
  title: string;
  subtitle: string;
  isPhysicalHeadquarters?: boolean;
  officeDetails?: {
    address: string;
    cityStateZip: string;
    operatingHours: string;
    phone: string;
  };
  remoteDeliveryDetails?: {
    stdCode: string;
    didSeries: string;
    carrierPartners: string;
    deploymentTime: string;
  };
  marketContext: string;
  breadcrumbs: { label: string; href?: string }[];
  whatsappRef: string;
  challenges: { challenge: string; solution: string }[];
  telecomSpecs: TelecomSpec[];
  workflowTitle?: string;
  workflowStages: WorkflowStage[];
  synergies: { title: string; description: string; href: string }[];
  solutionsPortfolio?: { category: string; title: string; description: string; href: string }[];
  remoteEngagementNote?: string;
  relatedIndustries: { title: string; description: string; href: string }[];
  faqs: FAQItem[];
  schemaData?: Record<string, unknown>;
}

export function LocationLayout({
  cityName,
  regionBadge,
  title,
  subtitle,
  isPhysicalHeadquarters = false,
  officeDetails,
  remoteDeliveryDetails,
  marketContext,
  breadcrumbs,
  whatsappRef,
  challenges,
  telecomSpecs,
  workflowTitle = "Local Operational Architecture",
  workflowStages,
  synergies,
  solutionsPortfolio,
  remoteEngagementNote,
  relatedIndustries,
  faqs,
  schemaData,
}: LocationLayoutProps) {
  const whatsappUrl = `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    `Hello Hanva Team, I would like to enquire about Hanva SaaS products, IT services, and cloud solutions in ${cityName}. Reference: ${whatsappRef}`
  )}`;
  const contactHref = `/company/contact/?city=${encodeURIComponent(cityName)}&product=cloud-telephony`;

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <div className="pt-10 pb-28 lg:py-14 bg-white min-h-screen">
      {schemaData && <SchemaOrg data={schemaData} />}
      {faqSchema && <SchemaOrg data={faqSchema} />}
      <SchemaOrg data={buildBreadcrumbSchema(breadcrumbs)} />

      <Container className="space-y-12">
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="inline-flex items-center gap-2">
                {idx > 0 && <span className="text-slate-400" aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-medium" aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* 2. Hero Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" className="text-xs">
              {regionBadge}
            </Badge>
            {isPhysicalHeadquarters ? (
              <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1">
                <Building2 className="h-3 w-3" aria-hidden="true" />
                Commercial Operational Office
              </Badge>
            ) : (
              <Badge variant="outline" className="border-blue-300 bg-blue-50 text-blue-800 text-xs flex items-center gap-1">
                <Radio className="h-3 w-3" aria-hidden="true" />
                Cloud Telephony Delivery Hub
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <TrackedDemoLink
                href={contactHref}
                ctaLocation="location_hero"
                ctaLabelKey="consult_city_team"
               
              >
                  <span>Consult {cityName} Team</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                </TrackedDemoLink>
              </Button>
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <TrackedWhatsAppLink
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaLocation="location_hero"
                contextRef={whatsappRef}
               
              >
                  <MessageSquare className="mr-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                  <span>WhatsApp Consultation</span>
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0 inline" aria-hidden="true" />
                </TrackedWhatsAppLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
                <Link href="/pricing/calculator/">
                  <Sparkles className="mr-2 h-4 w-4 text-emerald-600 shrink-0 inline" aria-hidden="true" />
                  <span>Estimate Pricing</span>
                </Link>
              </Button>
            </div>
            <p className="text-[11px] text-slate-600">
              WhatsApp Consultation opens WhatsApp with your {cityName} enquiry pre-filled — press Send to chat.
            </p>
          </div>
        </div>

        {/* 3. Physical Office vs Remote Provisioning Transparency Notice */}
        {isPhysicalHeadquarters && officeDetails ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              <span>Bengaluru Commercial Operational Office</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1">
                <div className="text-xs text-slate-600 font-medium">Operational Facility Address</div>
                <div className="text-sm font-semibold text-slate-900">{officeDetails.address}</div>
                <div className="text-xs text-slate-600">{officeDetails.cityStateZip}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-600 font-medium">Business Hours</div>
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-600" aria-hidden="true" />
                  <span>{officeDetails.operatingHours}</span>
                </div>
                <div className="text-xs text-slate-600">On-site technical consultations by appointment</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-600 font-medium">Direct Telephone</div>
                <TrackedPhoneLink
                  href={`tel:${CONTACT_CONFIG.phoneTel}`}
                  ctaLocation="location_office_card"
                  className="text-sm font-semibold text-blue-700 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="h-4 w-4 text-blue-600" aria-hidden="true" />
                  <span>{CONTACT_CONFIG.phoneDisplay}</span>
                </TrackedPhoneLink>
                <div className="text-xs text-slate-600">Carrier interconnect: 080 Virtual PRI / Tata Trunks</div>
              </div>
            </div>
          </div>
        ) : remoteDeliveryDetails ? (
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-blue-800 uppercase tracking-wider">
              <Server className="h-4 w-4" aria-hidden="true" />
              <span>Cloud Telephony Infrastructure &amp; Remote Carrier Interconnect</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Hanva provides enterprise cloud telephony services across <strong>{cityName}</strong> through 
              interconnected telecom infrastructure (Tata Teleservices and Vodafone Idea PRI/SIP trunks). 
              Local organizations receive genuine {remoteDeliveryDetails.stdCode} virtual numbers without needing physical PBX hardware, 
              managed remotely with redundant trunk routing and centralized billing from our Bengaluru operations desk.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-blue-200/60 pt-4">
              <div>
                <span className="text-slate-500 block">Virtual STD Code:</span>
                <span className="font-semibold text-slate-900">{remoteDeliveryDetails.stdCode}</span>
              </div>
              <div>
                <span className="text-slate-500 block">DID Allocation:</span>
                <span className="font-semibold text-slate-900">{remoteDeliveryDetails.didSeries}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Carrier Partners:</span>
                <span className="font-semibold text-slate-900">{remoteDeliveryDetails.carrierPartners}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Activation SLA:</span>
                <span className="font-semibold text-slate-900">{remoteDeliveryDetails.deploymentTime}</span>
              </div>
            </div>
          </div>
        ) : null}

        {/* 4. Local Market Context */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            <Layers className="h-4 w-4" />
            <span>Market Context & Business Communication Dynamics</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {marketContext}
          </p>
        </div>

        {/* 5. Telecom Infrastructure & DID Specifications */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Telecom Infrastructure Specifications ({cityName})</h2>
            <p className="text-xs text-slate-500 mt-1">
              Compliant, low-latency telecommunication architecture delivering transparent 15-second billing and carrier redundancy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {telecomSpecs.map((spec, i) => (
              <Card key={i} className="border-slate-200 bg-white">
                <CardContent className="p-5 space-y-2">
                  <div className="text-xs text-slate-500 font-medium">{spec.label}</div>
                  <div className="text-lg font-bold text-blue-700">{spec.value}</div>
                  <p className="text-xs text-slate-600 leading-normal">{spec.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 6. Operational Challenges vs. Hanva Resolution */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Local Operational Challenges & Strategic Resolutions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Addressing localized calling bottlenecks, data leaks, and customer outreach challenges in {cityName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((c, i) => (
              <Card key={i} className="border-slate-200 bg-white">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      ✕
                    </span>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-rose-700 uppercase tracking-wide">Operational Friction</div>
                      <p className="text-sm text-slate-700">{c.challenge}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      ✓
                    </span>
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Hanva Implementation</div>
                      <p className="text-sm text-slate-700">{c.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 7. Operational Calling Workflow */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{workflowTitle}</h2>
            <p className="text-xs text-slate-500 mt-1">
              End-to-end telemetry: from inbound contact or campaign trigger to call recording and CRM synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowStages.map((stage, i) => (
              <Card key={i} className="border-slate-200 bg-white">
                <CardContent className="p-5 space-y-2">
                  <div className="text-xs font-mono font-semibold text-blue-600">{stage.step}</div>
                  <h3 className="text-base font-bold text-slate-900">{stage.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 8. Relevant Industry Solutions in this Market */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Key Industry Deployments in {cityName}</h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore specialized workflows tailored to dominant commercial sectors in this regional hub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedIndustries.map((ind, i) => (
              <Link key={i} href={ind.href} className="group">
                <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      <span>{ind.title}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-slate-600 leading-relaxed">{ind.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* 9. Core Product Capabilities */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Supported Telephony & CRM Products</h2>
            <p className="text-xs text-slate-500 mt-1">
              Combine modular telecommunications capabilities into a unified customer interaction stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {synergies.map((s, i) => (
              <Link key={i} href={s.href} className="group">
                <Card className="h-full border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      <span>{s.title}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* 9.5. Full SaaS & Digital IT Solutions Availability */}
        {solutionsPortfolio && solutionsPortfolio.length > 0 && (
          <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
            <div className="space-y-1">
              <Badge variant="secondary" className="text-xs">
                {isPhysicalHeadquarters ? "Bengaluru HQ Full Portfolio" : `Remote Onboarding & Delivery for ${cityName}`}
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                SaaS Products, Digital Marketing &amp; Custom Software in {cityName}
              </h2>
              {remoteEngagementNote && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {remoteEngagementNote}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {solutionsPortfolio.map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <Card className="h-full border-slate-200 bg-white hover:border-blue-300 transition-all">
                    <CardHeader className="p-4 pb-1.5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                        {item.category}
                      </div>
                      <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 flex items-center justify-between">
                        <span>{item.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600" aria-hidden="true" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 10. City-Specific FAQ Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions — {cityName}</h2>
            <p className="text-xs text-slate-500 mt-1">
              Common questions regarding telecom provisioning, STD numbering, regulatory adherence, and billing.
            </p>
          </div>
          <FAQAccordion items={faqs} />
        </div>

        {/* 11. Final Action Banner */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white space-y-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Upgrade Business Telephony in {cityName}?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Speak with a Hanva communication consultant to review local STD DID numbers, carrier trunking, 
              and telecalling CRM integration for your team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
              <TrackedDemoLink
              href={contactHref}
              ctaLocation="location_bottom"
              ctaLabelKey="schedule_consultation"
             
            >
                <span>Schedule Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
              </TrackedDemoLink>
            </Button>
            <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto whitespace-normal h-auto min-h-[48px] py-2.5 px-5">
              <TrackedWhatsAppLink
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              ctaLocation="location_bottom"
              contextRef={whatsappRef}
             
            >
                <MessageSquare className="mr-2 h-4 w-4 shrink-0 inline" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
                <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0 inline" aria-hidden="true" />
              </TrackedWhatsAppLink>
            </Button>
          </div>
          <p className="text-[11px] text-slate-300">
            WhatsApp opens a prepared enquiry message — review and press Send in WhatsApp.
          </p>
        </div>
      </Container>
    </div>
  );
}
