import type { Metadata } from "next";
import { SchemaOrg } from "@/components/shared/schema-org";

import { CONTACT_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Hanva Technologies — Sales & Support Desk",
  description:
    "Connect with Hanva Technologies sales and engineering teams. Book a live product demo, request pulse rate quotes, or reach our Bengaluru operations team.",
  alternates: {
    canonical: "https://hanva.in/company/contact/",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Hanva Technologies",
  url: "https://hanva.in/company/contact/",
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

