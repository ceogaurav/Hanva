"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/config";

export function MobileActionBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-lg w-full max-w-full"
      role="navigation"
      aria-label="Mobile Quick Conversion Bar"
    >
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 max-w-md mx-auto w-full">
        <a
          href={`tel:${CONTACT_CONFIG.phoneTel}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-slate-900 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-slate-800 transition-colors"
          aria-label="Call Hanva Sales Desk"
        >
          <Phone className="h-4 w-4 text-blue-400 mb-0.5 shrink-0" />
          <span className="truncate">Call Sales</span>
        </a>

        <a
          href={CONTACT_CONFIG.whatsappBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-[#25D366] text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-[#20BD5A] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="h-4 w-4 mb-0.5 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        <Link
          href="/company/contact/"
          className="flex flex-col items-center justify-center py-1.5 px-1 sm:px-2 rounded-lg bg-blue-600 text-white text-[10px] sm:text-[11px] font-semibold min-h-[44px] touch-target active:bg-blue-700 transition-colors"
          aria-label="Book Demo Consultation"
        >
          <Calendar className="h-4 w-4 mb-0.5 shrink-0" />
          <span className="truncate">Book Demo</span>
        </Link>
      </div>
    </div>
  );
}
