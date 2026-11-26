"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { ConsentBanner } from "@/components/analytics/consent-banner";

const MobileDrawer = dynamic(
  () => import("@/components/layout/mobile-drawer").then((mod) => mod.MobileDrawer),
  { ssr: false }
);

export function LayoutShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      <AnalyticsProvider />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      <Header onMobileMenuOpen={() => setMobileMenuOpen(true)} />
      {mobileMenuOpen ? (
        <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      ) : null}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">{children}</main>
      {footer}
      <ConsentBanner />
      <MobileActionBar />
    </div>
  );
}
