"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import {
  inferPageCategory,
  inferSubjectFromContext,
  normalizeCtaLocation,
  trackAnalyticsEvent,
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
}

export const TrackedWhatsAppLink = React.forwardRef<HTMLAnchorElement, TrackedExternalProps>(
  function TrackedWhatsAppLink(
    { ctaLocation, contextRef = "direct", productName, ctaType, onClick, children, ...props },
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
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
}

export const TrackedDemoLink = React.forwardRef<HTMLAnchorElement, TrackedDemoLinkProps>(
  function TrackedDemoLink(
    { ctaLocation, ctaLabelKey = "request_demo", productSlug, onClick, children, ...props },
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

          trackAnalyticsEvent("demo_cta_click", {
            cta_location: normalizedLoc,
            cta_surface: ctaLocation,
            cta_label_key: ctaLabelKey,
            target_path: "/company/contact/",
          });

          if (category === "product" || productSlug) {
            trackAnalyticsEvent("select_item", {
              cta_location: normalizedLoc,
              product_name: inferSubjectFromContext(productSlug || pathname),
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
