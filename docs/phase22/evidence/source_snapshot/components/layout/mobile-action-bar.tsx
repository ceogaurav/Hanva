"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, Calendar, Layers } from "lucide-react";
import { CONTACT_CONFIG, resolveRouteContext } from "@/lib/config";
import { inferSubjectFromContext, trackAnalyticsEvent, trackCtaClick, trackWhatsAppClick } from "@/lib/analytics";

export function MobileActionBar() {
  const pathname = usePathname();
  const isContactPage = pathname?.startsWith("/company/contact");
  const routeCtx = resolveRouteContext(pathname);
  const subjectName = inferSubjectFromContext(pathname || "/");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg w-full max-w-full"
      aria-label="Mobile Quick Conversion Bar"
    >
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 max-w-md mx-auto w-full">
        <a
          href={`tel:${CONTACT_CONFIG.phoneTel}`}
          onClick={() => {
            trackAnalyticsEvent("phone_click", {
              cta_location: "floating_button",
              cta_surface: "mobile_action_bar",
              product_name: subjectName,
              target_channel: "sales_desk",
            });
            trackCtaClick({
              ctaLocation: "floating_button",
              productName: subjectName,
              ctaType: "phone_call",
            });
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-slate-900 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
          aria-label="Call Hanva Sales Desk"
        >
          <Phone className="h-4 w-4 text-blue-400 mb-0.5 shrink-0" aria-hidden="true" />
          <span className="truncate">Call Sales</span>
        </a>

        <a
          href={routeCtx.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackWhatsAppClick({
              ctaLocation: "floating_button",
              productName: subjectName,
              contextRef: pathname || "/",
            });
            trackCtaClick({
              ctaLocation: "floating_button",
              productName: subjectName,
              ctaType: routeCtx.isSaasProduct ? "product_demo_whatsapp" : "mobile_bar_whatsapp",
            });
          }}
          className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-[#25D366] text-slate-950 text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-[#20BD5A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1"
          aria-label={`Open WhatsApp Chat for ${routeCtx.subjectLabel} (press Send manually)`}
        >
          <MessageSquare className="h-4 w-4 mb-0.5 shrink-0" aria-hidden="true" />
          <span className="truncate">WhatsApp</span>
        </a>

        {isContactPage ? (
          <Link
            href="/products/"
            onClick={() =>
              trackCtaClick({
                ctaLocation: "floating_button",
                productName: subjectName,
                ctaType: "saas_portfolio_browse",
              })
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-blue-600 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
            aria-label="Browse SaaS Products"
          >
            <Layers className="h-4 w-4 mb-0.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Products</span>
          </Link>
        ) : (
          <Link
            href={routeCtx.contactHref}
            onClick={() => {
              trackAnalyticsEvent("demo_cta_click", {
                cta_location: "floating_button",
                cta_surface: "mobile_action_bar",
                cta_label_key: "book_demo",
                product_name: subjectName,
                target_path: "/company/contact/",
              });
              trackCtaClick({
                ctaLocation: "floating_button",
                productName: subjectName,
                ctaType: "request_demo_form",
              });
            }}
            className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-blue-600 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
            aria-label={`Request Demo for ${routeCtx.subjectLabel}`}
          >
            <Calendar className="h-4 w-4 mb-0.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Request Demo</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
