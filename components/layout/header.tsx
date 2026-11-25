"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  Server,
  Layers,
  Cpu,
  BarChart3,
  Bot,
  Building2,
  Stethoscope,
  GraduationCap,
  Sparkles,
} from "lucide-react";

export function Header({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => setActiveDropdown(null);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Utility Bar for Direct Sales Inquiries */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-slate-300 font-medium">Enterprise Cloud Telephony & Built-in CRM</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Carrier Gateway Delivery via Vi & Tata DIDs</span>
          </div>
          <div className="flex items-center space-x-5">
            <a
              href="tel:+918423711043"
              className="flex items-center space-x-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-blue-400" />
              <span>+91 8423711043</span>
            </a>
            <a
              href="https://wa.me/918423711043?text=Hello%20Hanva%20Team%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20telecom%20and%20CRM%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="h-3 w-3" />
              <span>WhatsApp Sales Desk</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-3">
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg p-1"
            onClick={closeDropdown}
            aria-label="Hanva Technologies Home"
          >
            <Logo size="md" priority />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={activeDropdown === "products"}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeDropdown === "products" || pathname.startsWith("/products")
                    ? "text-blue-600 bg-blue-50/60"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
                onClick={() => toggleDropdown("products")}
                onMouseEnter={() => setActiveDropdown("products")}
              >
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "products" && (
                <div
                  className="absolute left-0 mt-1 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={closeDropdown}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                    Telecom & Software Suite
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/products/cloud-telephony/"
                      className="flex items-start space-x-3 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Server className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Cloud Telephony</div>
                        <div className="text-xs text-slate-500">Virtual PBX & routing</div>
                      </div>
                    </Link>
                    <Link
                      href="/products/ivr-system/"
                      className="flex items-start space-x-3 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <PhoneCall className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Smart IVR System</div>
                        <div className="text-xs text-slate-500">Multi-level call trees</div>
                      </div>
                    </Link>
                    <Link
                      href="/products/call-center-software/"
                      className="flex items-start space-x-3 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Layers className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Call Center Suite</div>
                        <div className="text-xs text-slate-500">Blended ACD & live wallboard</div>
                      </div>
                    </Link>
                    <Link
                      href="/products/auto-dialer/"
                      className="flex items-start space-x-3 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Cpu className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Auto & Predictive Dialers</div>
                        <div className="text-xs text-slate-500">High-volume outbound calling</div>
                      </div>
                    </Link>
                    <Link
                      href="/products/telecalling-crm/"
                      className="flex items-start space-x-3 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Telecalling & Sales CRM</div>
                        <div className="text-xs text-slate-500">Lead management & call logging</div>
                      </div>
                    </Link>
                    <Link
                      href="/products/whatsapp-crm/"
                      className="flex items-start space-x-3 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <MessageSquare className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">WhatsApp CRM</div>
                        <div className="text-xs text-slate-500">Official API & chat drip journeys</div>
                      </div>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2 px-3">
                    <Link
                      href="/products/"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between"
                      onClick={closeDropdown}
                    >
                      <span>View All 9 Products</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={activeDropdown === "solutions"}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeDropdown === "solutions" || pathname.startsWith("/solutions")
                    ? "text-blue-600 bg-blue-50/60"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
                onClick={() => toggleDropdown("solutions")}
                onMouseEnter={() => setActiveDropdown("solutions")}
              >
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "solutions" && (
                <div
                  className="absolute left-0 mt-1 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={closeDropdown}
                >
                  <div className="space-y-1">
                    <Link
                      href="/solutions/sales-automation/"
                      className="block rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <div className="text-sm font-semibold text-slate-900">Sales Call Automation</div>
                      <div className="text-xs text-slate-500">Accelerate outbound lead conversion</div>
                    </Link>
                    <Link
                      href="/solutions/customer-support/"
                      className="block rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <div className="text-sm font-semibold text-slate-900">Customer Support Routing</div>
                      <div className="text-xs text-slate-500">Resolve customer queries faster</div>
                    </Link>
                    <Link
                      href="/solutions/enterprise/"
                      className="block rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <div className="text-sm font-semibold text-slate-900">Enterprise Voice Trunking</div>
                      <div className="text-xs text-slate-500">Dedicated capacity & custom SLAs</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industry Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={activeDropdown === "industry"}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeDropdown === "industry" || pathname.startsWith("/industry")
                    ? "text-blue-600 bg-blue-50/60"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
                onClick={() => toggleDropdown("industry")}
                onMouseEnter={() => setActiveDropdown("industry")}
              >
                <span>Industries</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "industry" && (
                <div
                  className="absolute left-0 mt-1 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={closeDropdown}
                >
                  <div className="space-y-1">
                    <Link
                      href="/industry/real-estate/"
                      className="flex items-center space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-900">Real Estate</span>
                    </Link>
                    <Link
                      href="/industry/healthcare/"
                      className="flex items-center space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Stethoscope className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-900">Healthcare & Clinics</span>
                    </Link>
                    <Link
                      href="/industry/education/"
                      className="flex items-center space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-900">EdTech & Education</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/pricing/"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/pricing/"
                  ? "text-blue-600 bg-blue-50/60"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
              onClick={closeDropdown}
            >
              Pricing
            </Link>

            <Link
              href="/pricing/calculator/"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center space-x-1 text-emerald-700 hover:bg-emerald-50 ${
                pathname === "/pricing/calculator/" ? "bg-emerald-100/70" : ""
              }`}
              onClick={closeDropdown}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Cost Calculator</span>
            </Link>

            <Link
              href="/company/about/"
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === "/company/about/"
                  ? "text-blue-600 bg-blue-50/60"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
              onClick={closeDropdown}
            >
              About
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <Link href="/company/contact/" className="hidden sm:inline-flex">
              <Button variant="primary" size="default">
                Book Live Demo
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 touch-target focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={onMobileMenuOpen}
              aria-label="Open Mobile Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </div>
    </header>
  );
}
