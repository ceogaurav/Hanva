"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/config";
import { trackConversionEvent } from "@/lib/analytics";

export function MobileActionBar() {
  const pathname = usePathname();
  const isContactPage = pathname?.startsWith("/company/contact");

  const whatsappUrl = `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    `Hello Hanva Team, I am browsing ${pathname || "/"} and would like to enquire about your solutions.`
  )}`;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg w-full max-w-full"
      aria-label="Mobile Quick Conversion Bar"
    >
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 max-w-md mx-auto w-full">
        <a
          href={`tel:${CONTACT_CONFIG.phoneTel}`}
          onClick={() =>
            trackConversionEvent("phone_cta_click", {
              cta_location: "mobile_action_bar",
              target_channel: "sales_desk",
            })
          }
          className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-slate-900 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
          aria-label="Call Hanva Sales Desk"
        >
          <Phone className="h-4 w-4 text-blue-400 mb-0.5 shrink-0" aria-hidden="true" />
          <span className="truncate">Call Sales</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackConversionEvent("whatsapp_cta_click", {
              cta_location: "mobile_action_bar",
              context_ref: pathname || "/",
            })
          }
          className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-[#25D366] text-slate-950 text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-[#20BD5A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-1"
          aria-label="Open WhatsApp Chat (press Send manually)"
        >
          <MessageSquare className="h-4 w-4 mb-0.5 shrink-0" aria-hidden="true" />
          <span className="truncate">WhatsApp</span>
        </a>

        {isContactPage ? (
          <Link
            href="/pricing/calculator/"
            onClick={() =>
              trackConversionEvent("demo_cta_click", {
                cta_location: "mobile_action_bar",
                cta_label_key: "pulse_calculator",
                target_path: "/pricing/calculator/",
              })
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-blue-600 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
            aria-label="Estimate Voice Costs in Calculator"
          >
            <Sparkles className="h-4 w-4 mb-0.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Calculator</span>
          </Link>
        ) : (
          <Link
            href="/company/contact/"
            onClick={() =>
              trackConversionEvent("demo_cta_click", {
                cta_location: "mobile_action_bar",
                cta_label_key: "book_demo",
                target_path: "/company/contact/",
              })
            }
            className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-blue-600 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1"
            aria-label="Book Demo Consultation"
          >
            <Calendar className="h-4 w-4 mb-0.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Book Demo</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
