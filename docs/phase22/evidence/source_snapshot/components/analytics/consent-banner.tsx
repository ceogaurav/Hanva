"use client";

import * as React from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  subscribeConsentChange,
  type AnalyticsConsentState,
} from "@/lib/analytics";

type SnapshotState = AnalyticsConsentState | "server";

function getClientSnapshot(): SnapshotState {
  return getAnalyticsConsent();
}

function getServerSnapshot(): SnapshotState {
  return "server";
}

export function ConsentBanner() {
  const consent = React.useSyncExternalStore(
    subscribeConsentChange,
    getClientSnapshot,
    getServerSnapshot
  );
  const [manuallyOpened, setManuallyOpened] = React.useState(false);

  React.useEffect(() => {
    const onOpen = () => setManuallyOpened(true);
    window.addEventListener("hanva:consent-open", onOpen);
    return () => window.removeEventListener("hanva:consent-open", onOpen);
  }, []);

  if (consent === "server") return null;
  if (consent !== "unset" && !manuallyOpened) return null;

  const handleChoice = (choice: "granted" | "denied") => {
    setAnalyticsConsent(choice);
    setManuallyOpened(false);
  };

  return (
    <aside
      role="region"
      aria-label="Analytics and Cookie Preferences"
      className="fixed bottom-[68px] lg:bottom-4 right-3 left-3 sm:left-auto sm:max-w-md z-40 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-md p-3 sm:p-4 shadow-xl text-xs text-slate-700"
    >
      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
        <div className="flex items-start gap-2 sm:gap-2.5">
          <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="font-semibold text-slate-900">Privacy &amp; Analytics</p>
            <p className="text-[11px] leading-snug sm:leading-relaxed text-slate-600">
              Non-PII analytics remain paused unless accepted.{" "}
              <Link href="/company/privacy-policy/" className="text-blue-600 underline hover:text-blue-700">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        {manuallyOpened && (
          <button
            type="button"
            onClick={() => setManuallyOpened(false)}
            aria-label="Close analytics preferences"
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 shrink-0"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="mt-2.5 sm:mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => handleChoice("denied")}
          data-consent-action="decline"
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 font-semibold text-xs min-h-[36px] transition-colors cursor-pointer"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => handleChoice("granted")}
          data-consent-action="accept"
          className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold text-xs min-h-[36px] transition-colors cursor-pointer"
        >
          Accept Analytics
        </button>
      </div>
    </aside>
  );
}

export function FooterConsentButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("hanva:consent-open"));
        }
      }}
      className="hover:text-slate-200 transition-colors cursor-pointer text-left"
    >
      Analytics Preferences
    </button>
  );
}
