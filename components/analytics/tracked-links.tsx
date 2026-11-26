"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { trackConversionEvent, inferPageCategory } from "@/lib/analytics";

interface TrackedExternalProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ctaLocation: string;
  contextRef?: string;
}

export const TrackedWhatsAppLink = React.forwardRef<HTMLAnchorElement, TrackedExternalProps>(
  function TrackedWhatsAppLink(
    { ctaLocation, contextRef = "direct", onClick, children, ...props },
    ref
  ) {
    return (
      <a
        ref={ref}
        {...props}
        onClick={(e) => {
          trackConversionEvent("whatsapp_cta_click", {
            cta_location: ctaLocation,
            context_ref: contextRef,
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
          trackConversionEvent("phone_cta_click", {
            cta_location: ctaLocation,
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
          trackConversionEvent("demo_cta_click", {
            cta_location: ctaLocation,
            cta_label_key: ctaLabelKey,
            target_path: "/company/contact/",
          });
          if (category === "product" || productSlug) {
            trackConversionEvent("product_page_to_contact", {
              cta_location: ctaLocation,
              product_slug: productSlug || pathname.replace(/^\/products\/|\/$/g, "") || "products_hub",
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
