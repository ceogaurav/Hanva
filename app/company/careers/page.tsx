import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SchemaOrg } from "@/components/shared/schema-org";
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Code2,
  Headphones,
  TrendingUp,
  Cpu,
} from "lucide-react";

export const metadata = {
  title: "Careers at Hanva Technologies — Telecom & Software Engineering Roles",
  description:
    "Join Hanva Technologies in Bengaluru. We are hiring full-stack Next.js engineers, VoIP telephony architects, and enterprise B2B sales professionals.",
  alternates: {
    canonical: "https://www.hanva.in/company/careers/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/company/careers/",
    siteName: "Hanva Technologies",
    title: "Careers at Hanva Technologies — Telecom & Software Engineering Roles | Hanva Technologies",
    description: "Join Hanva Technologies in Bengaluru. We are hiring full-stack Next.js engineers, VoIP telephony architects, and enterprise B2B sales professionals.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Careers at Hanva Technologies — Telecom & Software Engineering Roles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Hanva Technologies — Telecom & Software Engineering Roles | Hanva Technologies",
    description: "Join Hanva Technologies in Bengaluru. We are hiring full-stack Next.js engineers, VoIP telephony architects, and enterprise B2B sales professionals.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const careersSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers at Hanva Technologies Private Limited",
  description:
    "Job openings in software engineering, cloud telephony, and business development at Hanva Technologies Bengaluru.",
  url: "https://www.hanva.in/company/careers/",
};

const openRoles = [
  {
    icon: Code2,
    title: "Senior Full-Stack Engineer (Next.js / Node.js)",
    department: "Product Engineering",
    location: "Bengaluru (Garvebhavi Palya / On-site)",
    type: "Full-Time",
    experience: "3–6 Years",
    description:
      "Architect and scale responsive WebRTC browser softphones, real-time lead pipelines, and webhook integration services on Next.js, TypeScript, and Postgres.",
  },
  {
    icon: Cpu,
    title: "Cloud Telephony & VoIP Systems Specialist",
    department: "Telecom Infrastructure",
    location: "Bengaluru (Garvebhavi Palya / On-site)",
    type: "Full-Time",
    experience: "2–5 Years",
    description:
      "Manage SIP trunk allocations, carrier interconnects with Vodafone Idea and Tata Teleservices, FreeSWITCH routing logic, and audio media proxies.",
  },
  {
    icon: TrendingUp,
    title: "Enterprise B2B Telephony Sales Executive",
    department: "Commercial Operations",
    location: "Bengaluru (Hybrid)",
    type: "Full-Time",
    experience: "2–4 Years",
    description:
      "Engage Indian mid-market and enterprise leadership in Real Estate, Healthcare, and EdTech to propose custom cloud telephony and CRM solutions.",
  },
];

export default function CareersPage() {
  return (
    <div className="py-10 lg:py-16 bg-white min-h-screen">
      <SchemaOrg data={careersSchema} />

      <Container className="space-y-12">
        {/* Breadcrumb Hierarchy */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">Company</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Careers</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center space-y-3">
          <Badge variant="default">Join Our Team</Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Build the Future of Enterprise Telephony & CRM
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            At Hanva Technologies, we build practical, carrier-integrated cloud telephony, IVR, and CRM software tailored for Indian sales and operations teams.
          </p>
        </div>

        {/* Culture & Engineering Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Code2 className="h-4 w-4" />
              </div>
              <CardTitle as="h2" className="text-base text-slate-900">Engineering Autonomy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe in small, empowered teams that take full ownership from architectural design to production deployment and monitoring.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Sparkles className="h-4 w-4" />
              </div>
              <CardTitle as="h2" className="text-base text-slate-900">Real Customer Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your code directly improves lead response workflows, call reliability, and transparent telecom billing for Indian sales teams.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="pb-2">
              <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <MapPin className="h-4 w-4" />
              </div>
              <CardTitle as="h2" className="text-base text-slate-900">Bengaluru Tech Hub</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work out of our office at Raj Arcade near Hosur Main Road, Garvebhavi Palya, in the heart of Bengaluru&apos;s tech corridor.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Job Openings */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Current Open Positions</h2>
            <p className="text-xs text-slate-500 mt-1">Explore opportunities to join our engineering and commercial teams.</p>
          </div>

          <div className="space-y-4">
            {openRoles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <Card key={idx} className="border-slate-200 bg-white hover:border-blue-300 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <CardTitle className="text-base text-slate-900">{role.title}</CardTitle>
                          <div className="text-xs text-slate-500">{role.department}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-fit text-[11px]">
                        {role.experience}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 mr-1" />
                        {role.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 text-slate-400 mr-1" />
                        {role.type}
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button asChild variant="outline" size="sm" className="text-xs">
                        <a href="mailto:careers@hanva.in?subject=Application%3A%20" className="inline-block">
                          Apply via Email (careers@hanva.in) &rarr;
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* General Application Callout */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 text-center space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Don&apos;t See Your Role Listed?</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            We are always eager to talk to exceptional backend systems engineers, WebRTC specialists, and enterprise SaaS customer success champions.
          </p>
          <div className="pt-2">
            <Button asChild variant="primary">
              <a href="mailto:careers@hanva.in">Send Open Application</a>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
