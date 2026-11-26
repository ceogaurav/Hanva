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
  Landmark,
  ShieldCheck,
  Car,
  Truck,
  Users,
  Sparkles,
  TrendingUp,
  Code2,
  Scissors,
  UtensilsCrossed,
  Globe,
  Smartphone,
  Workflow,
  ShoppingBag,
} from "lucide-react";

import { CONTACT_CONFIG } from "@/lib/config";
import { trackAnalyticsEvent, trackWhatsAppClick } from "@/lib/analytics";

export function Header({ onMobileMenuOpen }: { onMobileMenuOpen: () => void }) {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const hoverOpenedAtRef = React.useRef<number>(0);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => {
      if (prev === name && Date.now() - hoverOpenedAtRef.current < 400) {
        return name;
      }
      return prev === name ? null : name;
    });
  };

  const openDropdownOnHover = (name: string) => {
    if (activeDropdown !== name) {
      hoverOpenedAtRef.current = Date.now();
    }
    setActiveDropdown(name);
  };

  const closeDropdown = React.useCallback(() => setActiveDropdown(null), []);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      closeDropdown();
    }
  };

  return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [closeDropdown]);

  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      closeDropdown();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top Utility Bar for Direct Sales Inquiries (Desktop only so tablet stays clean) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden lg:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-slate-300 font-medium">IT Solutions, SaaS Products, Digital Marketing &amp; Cloud Telephony</span>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <span className="text-slate-400">India &amp; International Delivery</span>
          </div>
          <div className="flex items-center space-x-5">
            <a
              href={`tel:${CONTACT_CONFIG.phoneTel}`}
              onClick={() =>
                trackAnalyticsEvent("phone_click", {
                  cta_location: "header",
                  cta_surface: "header_top",
                  target_channel: "sales_desk",
                })
              }
              className="flex items-center space-x-1 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-blue-400" aria-hidden="true" />
              <span>{CONTACT_CONFIG.phoneDisplay}</span>
            </a>
            <a
              href={`${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
                "Hello Hanva Team, I would like to enquire about your software products and IT solutions."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  ctaLocation: "header",
                  productName: "general_enquiry",
                  ctaType: "general_whatsapp",
                  contextRef: pathname || "/",
                })
              }
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Opens WhatsApp — press Send to chat with sales"
            >
              <MessageSquare className="h-3 w-3" aria-hidden="true" />
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
          <nav ref={navRef} className="hidden xl:flex items-center space-x-1">
            {/* Products Dropdown */}
            <div className="relative" onMouseLeave={closeDropdown} onBlur={handleDropdownBlur}>
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
                onMouseEnter={() => openDropdownOnHover("products")}
              >
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "products" && (
                <div
                  className="absolute left-0 mt-1 w-[460px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={closeDropdown}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 px-2 py-1 mb-1">
                        SaaS Products
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/products/crm/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <BarChart3 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Hanva CRM</div>
                            <div className="text-xs text-slate-500">Leads, IVR &amp; WhatsApp CRM</div>
                          </div>
                        </Link>
                        <Link
                          href="/products/salon-software/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <Scissors className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Hanva Salon Software</div>
                            <div className="text-xs text-slate-500">Booking, billing &amp; staff</div>
                          </div>
                        </Link>
                        <Link
                          href="/products/restaurant-pos/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <UtensilsCrossed className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Hanva Restaurant POS</div>
                            <div className="text-xs text-slate-500">POS, KDS, QR &amp; inventory</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 px-2 py-1 mb-1">
                        Telecom &amp; Voice
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/products/cloud-telephony/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <Server className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Cloud Telephony</div>
                            <div className="text-xs text-slate-500">Virtual PBX &amp; DIDs</div>
                          </div>
                        </Link>
                        <Link
                          href="/products/ivr-system/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <PhoneCall className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Smart IVR</div>
                            <div className="text-xs text-slate-500">Multi-level call routing</div>
                          </div>
                        </Link>
                        <Link
                          href="/products/auto-dialer/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <Cpu className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Auto &amp; Predictive Dialers</div>
                            <div className="text-xs text-slate-500">Outbound calling suite</div>
                          </div>
                        </Link>
                        <Link
                          href="/products/telecalling-crm/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <Layers className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Telecalling CRM</div>
                            <div className="text-xs text-slate-500">Voice-first dialer console</div>
                          </div>
                        </Link>
                        <Link
                          href="/products/whatsapp-crm/"
                          className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                          onClick={closeDropdown}
                        >
                          <MessageSquare className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">WhatsApp CRM</div>
                            <div className="text-xs text-slate-500">Official WABA messaging</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 mt-3 pt-2 px-2">
                    <Link
                      href="/products/"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between"
                      onClick={closeDropdown}
                    >
                      <span>View All SaaS &amp; Telecom Products</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Digital Marketing Dropdown */}
            <div className="relative" onMouseLeave={closeDropdown} onBlur={handleDropdownBlur}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={activeDropdown === "marketing"}
                className={`flex items-center space-x-1 px-2.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeDropdown === "marketing" || pathname.startsWith("/digital-marketing")
                    ? "text-blue-600 bg-blue-50/60"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
                onClick={() => toggleDropdown("marketing")}
                onMouseEnter={() => openDropdownOnHover("marketing")}
              >
                <span>Digital Marketing</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "marketing" && (
                <div
                  className="absolute left-0 mt-1 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={closeDropdown}
                >
                  <div className="space-y-1">
                    <Link
                      href="/digital-marketing/"
                      className="flex items-start space-x-2.5 rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Digital Marketing Hub</div>
                        <div className="text-xs text-slate-500">Full-funnel growth campaigns</div>
                      </div>
                    </Link>
                    <Link
                      href="/digital-marketing/seo-services/"
                      className="block rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <div className="text-sm font-semibold text-slate-900">SEO Services</div>
                      <div className="text-xs text-slate-500">Technical, local &amp; organic SEO</div>
                    </Link>
                    <Link
                      href="/digital-marketing/performance-marketing/"
                      className="block rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <div className="text-sm font-semibold text-slate-900">Google Ads &amp; Performance</div>
                      <div className="text-xs text-slate-500">Search &amp; lead generation ads</div>
                    </Link>
                    <Link
                      href="/digital-marketing/social-media-marketing/"
                      className="block rounded-lg p-2.5 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <div className="text-sm font-semibold text-slate-900">Social Media Marketing</div>
                      <div className="text-xs text-slate-500">Brand presence &amp; campaign creatives</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Software Development Dropdown */}
            <div className="relative" onMouseLeave={closeDropdown} onBlur={handleDropdownBlur}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={activeDropdown === "software"}
                className={`flex items-center space-x-1 px-2.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeDropdown === "software" || pathname.startsWith("/software-development")
                    ? "text-blue-600 bg-blue-50/60"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
                onClick={() => toggleDropdown("software")}
                onMouseEnter={() => openDropdownOnHover("software")}
              >
                <span>Software Dev</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "software" && (
                <div
                  className="absolute left-0 mt-1 w-80 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={closeDropdown}
                >
                  <div className="space-y-1">
                    <Link
                      href="/software-development/"
                      className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Code2 className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Software Development Hub</div>
                        <div className="text-xs text-slate-500">Custom engineering &amp; AI solutions</div>
                      </div>
                    </Link>
                    <Link
                      href="/software-development/custom-crm-development/"
                      className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Layers className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Custom CRM &amp; ERP</div>
                        <div className="text-xs text-slate-500">Bespoke workflows &amp; portals</div>
                      </div>
                    </Link>
                    <Link
                      href="/software-development/web-application-development/"
                      className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Globe className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Web Application Development</div>
                        <div className="text-xs text-slate-500">Business websites &amp; web apps</div>
                      </div>
                    </Link>
                    <Link
                      href="/software-development/mobile-app-development/"
                      className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Smartphone className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Mobile App Development</div>
                        <div className="text-xs text-slate-500">Android &amp; cross-platform apps</div>
                      </div>
                    </Link>
                    <Link
                      href="/software-development/saas-product-development/"
                      className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Server className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">SaaS Product Development</div>
                        <div className="text-xs text-slate-500">Multi-tenant platforms &amp; MVPs</div>
                      </div>
                    </Link>
                    <Link
                      href="/software-development/api-integration-automation/"
                      className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Workflow className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">API Integration &amp; Automation</div>
                        <div className="text-xs text-slate-500">System bridges &amp; AI workflows</div>
                      </div>
                    </Link>
                    <Link
                      href="/software-development/ecommerce-development/"
                      className="flex items-start space-x-2.5 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <ShoppingBag className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">E-commerce Development</div>
                        <div className="text-xs text-slate-500">Online storefronts &amp; ordering</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industry Dropdown */}
            <div className="relative" onMouseLeave={closeDropdown} onBlur={handleDropdownBlur}>
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
                onMouseEnter={() => openDropdownOnHover("industry")}
              >
                <span>Industries</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {activeDropdown === "industry" && (
                <div
                  className="absolute left-0 mt-1 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={closeDropdown}
                >
                  <div className="grid grid-cols-2 gap-1">
                    <Link
                      href="/industry/real-estate/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Building2 className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">Real Estate</span>
                    </Link>
                    <Link
                      href="/industry/healthcare/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Stethoscope className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">Healthcare</span>
                    </Link>
                    <Link
                      href="/industry/education/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <GraduationCap className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">EdTech & Admissions</span>
                    </Link>
                    <Link
                      href="/industry/financial-services/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Landmark className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">BFSI & Lending</span>
                    </Link>
                    <Link
                      href="/industry/insurance/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">Insurance</span>
                    </Link>
                    <Link
                      href="/industry/automobile/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Car className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">Automobile</span>
                    </Link>
                    <Link
                      href="/industry/logistics/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Truck className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">Logistics & Privacy</span>
                    </Link>
                    <Link
                      href="/industry/recruitment/"
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      onClick={closeDropdown}
                    >
                      <Users className="h-4 w-4 text-blue-600 shrink-0" />
                      <span className="text-xs font-medium text-slate-900 truncate">Recruitment</span>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <Link
                      href="/industry/"
                      className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-700 py-1 hover:bg-blue-50/50 rounded-lg transition-colors"
                      onClick={closeDropdown}
                    >
                      View All 8 Industry Blueprints &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/pricing/"
              className={`px-2.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                pathname === "/pricing/"
                  ? "text-blue-600 bg-blue-50/60"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
              onClick={closeDropdown}
            >
              Pricing
            </Link>

            <Link
              href="/resources/"
              className={`px-2.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                pathname.startsWith("/resources")
                  ? "text-blue-600 bg-blue-50/60"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
              onClick={closeDropdown}
            >
              Resources
            </Link>

            <Link
              href="/company/about/"
              className={`px-2.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
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
            <Button asChild variant="primary" size="default" className="hidden lg:inline-flex">
              <Link
              href="/company/contact/"
              onClick={() =>
                trackAnalyticsEvent("demo_cta_click", {
                  cta_location: "header",
                  cta_surface: "header_main",
                  cta_label_key: "request_demo_enquiry",
                  target_path: "/company/contact/",
                })
              }
            >
                Request Demo
              </Link>
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 touch-target focus:outline-none focus:ring-2 focus:ring-blue-600"
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
