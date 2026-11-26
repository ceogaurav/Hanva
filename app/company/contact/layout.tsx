import type { Metadata } from "next";
import { SchemaOrg } from "@/components/shared/schema-org";

import { CONTACT_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Hanva Technologies — Sales & Support Desk",
  description:
    "Connect with Hanva Technologies sales and engineering teams. Book a live product demo, request pulse rate quotes, or reach our Bengaluru operations team.",
  alternates: {
    canonical: "https://www.hanva.in/company/contact/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in/company/contact/",
    siteName: "Hanva Technologies",
    title: "Contact Hanva Technologies — Sales & Support Desk | Hanva Technologies",
    description: "Connect with Hanva Technologies sales and engineering teams. Book a live product demo, request pulse rate quotes, or reach our Bengaluru operations team.",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "Contact Hanva Technologies — Sales & Support Desk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hanva Technologies — Sales & Support Desk | Hanva Technologies",
    description: "Connect with Hanva Technologies sales and engineering teams. Book a live product demo, request pulse rate quotes, or reach our Bengaluru operations team.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Hanva Technologies",
  url: "https://www.hanva.in/company/contact/",
  description: "Connect with Hanva Technologies sales and engineering teams in Bengaluru.",
  mainEntity: {
    "@type": "Organization",
    name: CONTACT_CONFIG.companyLegalName,
    telephone: "+91-8423711043",
    email: CONTACT_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Raj Arcade, 7th Main, Near Hosur Main Road, Garvebhavi Palya",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560068",
      addressCountry: "IN",
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SchemaOrg schema={contactSchema} />
      {children}
    </>
  );
}

