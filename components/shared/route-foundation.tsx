import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Phone, Sparkles } from "lucide-react";

export interface RouteFoundationProps {
  category: string;
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  highlights: { title: string; description: string }[];
  primaryCtaText?: string;
  primaryCtaHref?: string;
  relatedLinks?: { label: string; href: string }[];
}

export function RouteFoundation({
  category,
  title,
  description,
  breadcrumbs,
  highlights,
  primaryCtaText = "Request Consultation & Pricing",
  primaryCtaHref = "/company/contact/",
  relatedLinks,
}: RouteFoundationProps) {
  return (
    <div className="py-12 lg:py-16 bg-white min-h-[70vh]">
      <Container className="space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-300">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-800 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Hero Header */}
        <div className="space-y-4">
          <Badge variant="default" className="text-xs">
            {category}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={primaryCtaHref}>
              <Button variant="primary" size="default">
                {primaryCtaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing/calculator/">
              <Button variant="outline" size="default">
                <Sparkles className="mr-2 h-4 w-4 text-emerald-600" />
                Calculate Voice Pulse Costs
              </Button>
            </Link>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="pt-6 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Key Architecture & Functional Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <Card key={idx} className="border-slate-200">
                <CardHeader className="p-5">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <CardTitle className="text-base font-semibold text-slate-900">{item.title}</CardTitle>
                      <CardDescription className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Related Links Navigation */}
        {relatedLinks && relatedLinks.length > 0 && (
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Explore Related Solutions
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Contact Callout */}
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">Need specific telecom numbers or customized pricing?</div>
            <div className="text-xs text-slate-500 mt-0.5">Direct sales desk: +91 8423711043 | Vi & Tata carrier DIDs</div>
          </div>
          <Link href="/company/contact/">
            <Button variant="secondary" size="sm">
              Contact Sales
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
