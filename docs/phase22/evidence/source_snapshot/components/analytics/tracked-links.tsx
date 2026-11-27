"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import {
  inferPageCategory,
  inferSubjectFromContext,
  normalizeCtaLocation,
  trackAnalyticsEvent,
  trackCtaClick,
  trackCtaView,
  trackProductSelect,
  trackWhatsAppClick,
  type AllowedSaasProductName,
  type TrackedSubjectName,
  type WhatsAppCtaType,
} from "@/lib/analytics";

interface TrackedExternalProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ctaLocation: string;
  contextRef?: string;
  productName?: TrackedSubjectName;
  ctaType?: WhatsAppCtaType;
  experimentId?: string;
  variantId?: string;
}

export const TrackedWhatsAppLink = React.forwardRef<HTMLAnchorElement, TrackedExternalProps>(
  function TrackedWhatsAppLink(
    {
      ctaLocation,
      contextRef = "direct",
      productName,
      ctaType,
      experimentId,
      variantId,
      onClick,
      children,
      ...props
    },
    ref
  ) {
    return (
      <a
        ref={ref}
        {...props}
        onClick={(e) => {
          trackWhatsAppClick({
            ctaLocation,
            contextRef,
            productName,
            ctaType,
          });
          trackCtaClick({
            ctaLocation,
            productName,
            ctaType: ctaType || "whatsapp_enquiry",
            experimentId,
            variantId,
          });
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }
);

export const TrackedPhoneLink = React.forwardRef<HTMLAnchorElement, TrackedExternalProps>(
  function TrackedPhoneLink({ ctaLocation, onClick, children, ...props }, ref) {
    return (
      <a
        ref={ref}
        {...props}
        onClick={(e) => {
          trackAnalyticsEvent("phone_click", {
            cta_location: normalizeCtaLocation(ctaLocation),
            cta_surface: ctaLocation,
            target_channel: "sales_desk",
          });
          onClick?.(e);
        }}
      >
        {children}
      </a>
    );
  }
);

interface TrackedDemoLinkProps extends LinkProps {
  ctaLocation: string;
  ctaLabelKey?: string;
  productSlug?: string;
  experimentId?: string;
  variantId?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
}

export const TrackedDemoLink = React.forwardRef<HTMLAnchorElement, TrackedDemoLinkProps>(
  function TrackedDemoLink(
    {
      ctaLocation,
      ctaLabelKey = "request_demo",
      productSlug,
      experimentId,
      variantId,
      onClick,
      children,
      ...props
    },
    ref
  ) {
    return (
      <Link
        ref={ref}
        {...props}
        onClick={(e) => {
          const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
          const category = inferPageCategory(pathname);
          const normalizedLoc = normalizeCtaLocation(ctaLocation);
          const subject = inferSubjectFromContext(productSlug || pathname);

          trackAnalyticsEvent("demo_cta_click", {
            cta_location: normalizedLoc,
            cta_surface: ctaLocation,
            cta_label_key: ctaLabelKey,
            product_name: subject,
            target_path: "/company/contact/",
          });
          trackCtaClick({
            ctaLocation,
            productName: subject,
            ctaType: ctaLabelKey,
            experimentId,
            variantId,
          });

          if (category === "product" || productSlug) {
            trackAnalyticsEvent("select_item", {
              cta_location: normalizedLoc,
              product_name: subject,
              target_path: "/company/contact/",
            });
          }
          onClick?.(e);
        }}
      >
        {children}
      </Link>
    );
  }
);

export function TrackedCtaObserver({
  ctaLocation,
  productName,
  ctaType = "conversion_banner",
  experimentId,
  variantId,
  className,
  children,
}: {
  ctaLocation: string;
  productName?: TrackedSubjectName;
  ctaType?: string;
  experimentId?: string;
  variantId?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const triggerIfVisible = () => {
      trackCtaView({
        ctaLocation,
        productName,
        ctaType,
        experimentId,
        variantId,
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            triggerIfVisible();
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);

    const onConsentChange = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        triggerIfVisible();
      }
    };
    window.addEventListener("hanva:consent-change", onConsentChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hanva:consent-change", onConsentChange);
    };
  }, [ctaLocation, productName, ctaType, experimentId, variantId]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface TrackedProductLinkProps extends LinkProps {
  productName: AllowedSaasProductName;
  itemListName?: string;
  ctaLocation?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const TrackedProductLink = React.forwardRef<HTMLAnchorElement, TrackedProductLinkProps>(
  function TrackedProductLink(
    {
      productName,
      itemListName = "Hanva SaaS Products",
      ctaLocation = "product_section",
      onClick,
      children,
      ...props
    },
    ref
  ) {
    return (
      <Link
        ref={ref}
        {...props}
        onClick={(e) => {
          trackProductSelect({
            productName,
            itemListName,
            ctaLocation,
          });
          onClick?.(e);
        }}
      >
        {children}
      </Link>
    );
  }
);
