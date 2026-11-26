"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getAnalyticsConsent,
  getConfiguredAnalyticsIds,
  hasAnalyticsConsent,
  resetPageViewDeduplication,
  trackAnalyticsEvent,
  trackRouteViewEvents,
} from "@/lib/analytics";
import { stageLandingUtmInMemory } from "@/lib/utm";

const SCROLL_THRESHOLDS = [50, 75, 90] as const;

function AnalyticsTrackerCore() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const [consentTick, setConsentTick] = React.useState(0);
  const loadedScriptRef = React.useRef<"none" | "gtm" | "ga4">("none");

  const searchKey = searchParams?.toString() || "";

  React.useEffect(() => {
    const onConsentChange = () => {
      if (hasAnalyticsConsent()) {
        resetPageViewDeduplication();
      }
      setConsentTick((n) => n + 1);
    };
    window.addEventListener("hanva:consent-change", onConsentChange);
    return () => window.removeEventListener("hanva:consent-change", onConsentChange);
  }, []);

  // Dynamically load owner-configured GTM or GA4 only after explicit analytics consent
  React.useEffect(() => {
    if (!hasAnalyticsConsent()) return;
    if (loadedScriptRef.current !== "none") return;

    const { gtmId, gaId, activeProvider } = getConfiguredAnalyticsIds();
    if (activeProvider === "unconfigured") return;

    try {
      if (activeProvider === "gtm" && gtmId) {
        loadedScriptRef.current = "gtm";
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
        document.head.appendChild(script);
      } else if (activeProvider === "ga4" && gaId) {
        loadedScriptRef.current = "ga4";
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtagFallback(...args: unknown[]) {
          window.dataLayer?.push(args as unknown as Record<string, unknown>);
        };
        window.gtag("consent", "default", {
          analytics_storage: "granted",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
        window.gtag("js", new Date());
        window.gtag("config", gaId, { send_page_view: false });

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
        document.head.appendChild(script);
      }
    } catch {
      // Safe no-op if script injection is blocked
    }
  }, [consentTick]);

  // Track route page views & contextual product/list/contact events
  React.useEffect(() => {
    if (getAnalyticsConsent() === "unset") {
      stageLandingUtmInMemory(pathname);
      return;
    }
    if (!hasAnalyticsConsent()) return;
    trackRouteViewEvents(pathname, consentTick > 0);
  }, [pathname, searchKey, consentTick]);

  // Track 50%, 75%, 90% scroll depth once per threshold per route
  React.useEffect(() => {
    if (!hasAnalyticsConsent()) return;
    const fired = new Set<number>();
    let rafId: number | null = null;

    const evaluateScroll = () => {
      rafId = null;
      if (!hasAnalyticsConsent()) return;
      const docEl = document.documentElement;
      const maxScrollable = docEl.scrollHeight - window.innerHeight;
      if (maxScrollable <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / maxScrollable) * 100));

      for (const threshold of SCROLL_THRESHOLDS) {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackAnalyticsEvent("scroll_depth", {
            percent_scrolled: threshold,
          });
        }
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(evaluateScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname, consentTick]);

  return null;
}

export function AnalyticsProvider() {
  return (
    <React.Suspense fallback={null}>
      <AnalyticsTrackerCore />
    </React.Suspense>
  );
}
