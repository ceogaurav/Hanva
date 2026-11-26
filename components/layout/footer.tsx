import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { TrackedPhoneLink } from "@/components/analytics/tracked-links";
import { CONTACT_CONFIG } from "@/lib/config";
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 pt-16 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] lg:pb-12 text-sm">
      <Container>
        {/* Brand Header */}
        <div className="pb-10 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link href="/" className="inline-block" aria-label="Hanva Technologies Home">
            <Logo size="lg" inverted />
          </Link>
          <p className="text-xs text-slate-400 max-w-md">
            Enterprise cloud telephony infrastructure, multi-level smart IVR, automated telecalling dialers, and integrated sales CRM for Indian businesses.
          </p>
        </div>

        {/* Main Grid: 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 py-12 border-b border-slate-800">
          {/* Column 1: Telecom Products */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Telecom & Voice
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/cloud-telephony/" className="hover:text-white transition-colors">
                  Cloud Telephony & PBX
                </Link>
              </li>
              <li>
                <Link href="/products/ivr-system/" className="hover:text-white transition-colors">
                  IVR Service Provider
                </Link>
              </li>
              <li>
                <Link href="/products/smart-ivr/" className="hover:text-white transition-colors">
                  Smart Multi-Level IVR
                </Link>
              </li>
              <li>
                <Link href="/products/virtual-numbers/" className="hover:text-white transition-colors">
                  Virtual Mobile Numbers
                </Link>
              </li>
              <li>
                <Link href="/products/toll-free-numbers/" className="hover:text-white transition-colors">
                  1800 Toll-Free Numbers
                </Link>
              </li>
              <li>
                <Link href="/products/call-center-software/" className="hover:text-white transition-colors">
                  Call Center Software
                </Link>
              </li>
              <li>
                <Link href="/products/auto-dialer/" className="hover:text-white transition-colors">
                  Auto Dialer Software
                </Link>
              </li>
              <li>
                <Link href="/products/predictive-dialer/" className="hover:text-white transition-colors">
                  Predictive Dialer
                </Link>
              </li>
              <li>
                <Link href="/products/" className="text-blue-400 hover:text-blue-300 font-medium">
                  All Products Overview &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: CRM & Messaging */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              CRM & Messaging
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/products/crm/" className="hover:text-white transition-colors">
                  Platform Sales CRM
                </Link>
              </li>
              <li>
                <Link href="/products/telecalling-crm/" className="hover:text-white transition-colors">
                  Telecalling CRM Suite
                </Link>
              </li>
              <li>
                <Link href="/products/whatsapp-crm/" className="hover:text-white transition-colors">
                  WhatsApp CRM & API
                </Link>
              </li>
              <li className="pt-2">
                <div className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  Commercial
                </div>
              </li>
              <li>
                <Link href="/pricing/" className="hover:text-white transition-colors">
                  Pricing & Plan Tiers
                </Link>
              </li>
              <li>
                <Link href="/pricing/calculator/" className="text-emerald-400 hover:text-emerald-300 font-medium">
                  Pulse Savings Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Industries */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Solutions & Use Cases
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/solutions/sales-automation/" className="hover:text-white transition-colors">
                  Sales Call Automation
                </Link>
              </li>
              <li>
                <Link href="/solutions/customer-support/" className="hover:text-white transition-colors">
                  Customer Support Routing
                </Link>
              </li>
              <li>
                <Link href="/solutions/enterprise/" className="hover:text-white transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions/" className="text-blue-400 hover:text-blue-300">
                  Solutions Directory
                </Link>
              </li>
              <li className="pt-2">
                <div className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  Industries
                </div>
              </li>
              <li>
                <Link href="/industry/real-estate/" className="hover:text-white transition-colors">
                  Real Estate CRM & Calling
                </Link>
              </li>
              <li>
                <Link href="/industry/healthcare/" className="hover:text-white transition-colors">
                  Healthcare & Clinics
                </Link>
              </li>
              <li>
                <Link href="/industry/education/" className="hover:text-white transition-colors">
                  EdTech & Admissions
                </Link>
              </li>
              <li>
                <Link href="/industry/financial-services/" className="hover:text-white transition-colors">
                  BFSI & Lending Telecalling
                </Link>
              </li>
              <li>
                <Link href="/industry/insurance/" className="hover:text-white transition-colors">
                  Insurance Renewals & Claims
                </Link>
              </li>
              <li>
                <Link href="/industry/automobile/" className="hover:text-white transition-colors">
                  Automobile Dealerships
                </Link>
              </li>
              <li>
                <Link href="/industry/logistics/" className="hover:text-white transition-colors">
                  Logistics & Number Masking
                </Link>
              </li>
              <li>
                <Link href="/industry/recruitment/" className="hover:text-white transition-colors">
                  Recruitment & Staffing
                </Link>
              </li>
              <li>
                <Link href="/industry/" className="text-blue-400 hover:text-blue-300">
                  All 8 Industries Directory &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Comparisons & Resources */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Compare & Learn
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/compare/exotel-alternative/" className="hover:text-white transition-colors">
                  Exotel Alternative
                </Link>
              </li>
              <li>
                <Link href="/compare/knowlarity-alternative/" className="hover:text-white transition-colors">
                  Knowlarity Alternative
                </Link>
              </li>
              <li>
                <Link href="/compare/telecmi-alternative/" className="hover:text-white transition-colors">
                  TeleCMI Alternative
                </Link>
              </li>
              <li className="pt-2">
                <div className="text-[11px] font-semibold text-white uppercase tracking-wider">
                  Knowledge Hub & Guides
                </div>
              </li>
              <li>
                <Link href="/resources/" className="text-blue-400 hover:text-blue-300 font-semibold">
                  All Guides & Resources &rarr;
                </Link>
              </li>
              <li>
                <Link href="/resources/what-is-cloud-telephony/" className="hover:text-white transition-colors">
                  What Is Cloud Telephony?
                </Link>
              </li>
              <li>
                <Link href="/resources/how-ivr-systems-work/" className="hover:text-white transition-colors">
                  How IVR Systems Work
                </Link>
              </li>
              <li>
                <Link href="/resources/auto-dialer-vs-predictive-dialer/" className="hover:text-white transition-colors">
                  Auto vs Predictive Dialer
                </Link>
              </li>
              <li>
                <Link href="/resources/telecalling-crm-guide/" className="hover:text-white transition-colors">
                  Telecalling CRM Guide
                </Link>
              </li>
              <li>
                <Link href="/resources/whatsapp-business-api-guide/" className="hover:text-white transition-colors">
                  WhatsApp Business API vs App
                </Link>
              </li>
              <li>
                <Link href="/resources/cloud-telephony-pricing-guide/" className="hover:text-white transition-colors">
                  Cloud Telephony Pricing Guide
                </Link>
              </li>
              <li>
                <Link href="/resources/dlt-compliance-guide/" className="hover:text-white transition-colors">
                  TRAI DLT Registration Guide
                </Link>
              </li>
              <li>
                <Link href="/company/security-and-trust/" className="hover:text-white transition-colors">
                  Security, Encryption & Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Direct Contact */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Company & Contact
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/company/about/" className="hover:text-white transition-colors">
                  About Hanva Technologies
                </Link>
              </li>
              <li>
                <Link href="/company/contact/" className="hover:text-white transition-colors">
                  Contact Sales & Support
                </Link>
              </li>
              <li>
                <Link href="/company/careers/" className="hover:text-white transition-colors">
                  Careers at Hanva
                </Link>
              </li>
              <li className="pt-3">
                <TrackedPhoneLink
                  href={`tel:${CONTACT_CONFIG.phoneTel}`}
                  ctaLocation="footer"
                  className="flex items-center space-x-2 text-slate-200 hover:text-white transition-colors py-1"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                  <span>{CONTACT_CONFIG.phoneDisplay}</span>
                </TrackedPhoneLink>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_CONFIG.email}`}
                  className="flex items-center space-x-2 text-slate-200 hover:text-white transition-colors py-1"
                >
                  <Mail className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                  <span>{CONTACT_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 text-slate-400 text-[11px] leading-tight pt-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{CONTACT_CONFIG.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regional Locations Strip */}
        <div className="py-6 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-white font-semibold text-xs uppercase tracking-wider">
              <MapPin className="h-4 w-4 text-blue-400" aria-hidden="true" />
              <span>Regional Telecom Hubs:</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <Link href="/locations/bengaluru/" className="hover:text-white transition-colors py-0.5">
                Bengaluru (Office • 080)
              </Link>
              <span className="text-slate-700" aria-hidden="true">•</span>
              <Link href="/locations/mumbai/" className="hover:text-white transition-colors py-0.5">
                Mumbai (022)
              </Link>
              <span className="text-slate-700" aria-hidden="true">•</span>
              <Link href="/locations/delhi-ncr/" className="hover:text-white transition-colors py-0.5">
                Delhi NCR (011)
              </Link>
              <span className="text-slate-700" aria-hidden="true">•</span>
              <Link href="/locations/hyderabad/" className="hover:text-white transition-colors py-0.5">
                Hyderabad (040)
              </Link>
              <span className="text-slate-700" aria-hidden="true">•</span>
              <Link href="/locations/pune/" className="hover:text-white transition-colors py-0.5">
                Pune (020)
              </Link>
              <span className="text-slate-700" aria-hidden="true">•</span>
              <Link href="/locations/chennai/" className="hover:text-white transition-colors py-0.5">
                Chennai (044)
              </Link>
              <span className="text-slate-700" aria-hidden="true">•</span>
              <Link href="/locations/" className="text-blue-400 hover:text-blue-300 font-medium py-0.5">
                All Locations &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Corporate Disclosure & Compliance Bar */}
        <div className="py-8 border-b border-slate-800 text-xs text-slate-400 space-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px]">
            <span><strong className="text-slate-200">Legal Entity:</strong> HANVA TECHNOLOGIES PRIVATE LIMITED</span>
            <span><strong className="text-slate-200">CIN:</strong> U78100KA2025PTC205168</span>
            <span><strong className="text-slate-200">GSTIN:</strong> 29AAICH0526K1ZF</span>
            <span><strong className="text-slate-200">PAN:</strong> AAICH0526K</span>
            <span><strong className="text-slate-200">TAN:</strong> BLRH18237C</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Telecom carrier gateway delivery facilitated via CloudConnect Communications gateway with dedicated enterprise DID trunk allocations across Vodafone Idea (Vi Business) and Tata Teleservices (TTBS). Voice and SMS services are provisioned in strict accordance with Department of Telecommunications (DoT) and Telecom Regulatory Authority of India (TRAI) statutory KYC and DLT directives.
          </p>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Hanva Technologies Private Limited. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/company/privacy-policy/" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/company/terms-of-service/" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="/company/security-and-trust/" className="hover:text-slate-200 transition-colors">
              Security & Trust
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
