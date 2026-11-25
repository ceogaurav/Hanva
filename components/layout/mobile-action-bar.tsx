"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Calendar } from "lucide-react";

export function MobileActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden border-t border-slate-200/90 bg-white/95 backdrop-blur-md px-3 py-2 shadow-lg">
      <div className="grid grid-cols-3 gap-2">
        <a
          href="tel:+918423711043"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-900 text-white text-[11px] font-semibold touch-target active:bg-slate-800"
          aria-label="Call Hanva Sales Desk"
        >
          <Phone className="h-4 w-4 text-blue-400 mb-0.5" />
          <span>Call Sales</span>
        </a>

        <a
          href="https://wa.me/918423711043?text=Hello%20Hanva%20Team%2C%20I%20am%20exploring%20cloud%20telephony%20and%20CRM%20solutions%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#25D366] text-white text-[11px] font-semibold touch-target active:bg-[#20BD5A]"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="h-4 w-4 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/company/contact/"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-blue-600 text-white text-[11px] font-semibold touch-target active:bg-blue-700"
          aria-label="Book Demo Consultation"
        >
          <Calendar className="h-4 w-4 mb-0.5" />
          <span>Book Demo</span>
        </Link>
      </div>
    </div>
  );
}
