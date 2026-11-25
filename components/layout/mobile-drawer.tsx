"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, MessageSquare, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <Link href="/" onClick={onClose} aria-label="Hanva Technologies Home">
              <Logo size="sm" />
            </Link>
            <button
              type="button"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 touch-target focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={onClose}
              aria-label="Close Mobile Navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="p-4 space-y-4">
            {/* Quick CTAs */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+918423711043"
                className="flex items-center justify-center space-x-1.5 p-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold touch-target"
              >
                <Phone className="h-3.5 w-3.5 text-blue-400" />
                <span>Call Sales</span>
              </a>
              <a
                href="https://wa.me/918423711043?text=Hello%20Hanva%20Team%2C%20I%20would%20like%20to%20enquire%20about%20your%20cloud%20telephony%20and%20CRM."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 p-2.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold touch-target"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Core Links */}
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Products
              </div>
              <Link
                href="/products/cloud-telephony/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>Cloud Telephony & PBX</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/products/ivr-system/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>Smart Multi-Level IVR</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/products/call-center-software/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>Call Center Software</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/products/auto-dialer/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>Auto & Predictive Dialers</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/products/telecalling-crm/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>Telecalling Sales CRM</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/products/whatsapp-crm/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>WhatsApp CRM</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Pricing & Tools */}
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Commercial
              </div>
              <Link
                href="/pricing/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>Pricing Plans</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/pricing/calculator/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 touch-target"
                onClick={onClose}
              >
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>Cost & Pulse Calculator</span>
                </span>
                <ChevronRight className="h-4 w-4 text-emerald-600" />
              </Link>
            </div>

            {/* Corporate & Trust */}
            <div className="space-y-1 border-t border-slate-100 pt-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Company
              </div>
              <Link
                href="/company/about/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>About Hanva</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
              <Link
                href="/company/contact/"
                className="flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 touch-target"
                onClick={onClose}
              >
                <span>Contact Us</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Booking Button */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <Link href="/company/contact/" onClick={onClose} className="block w-full">
            <Button variant="primary" className="w-full text-center">
              Book Consultation & Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
