import type { Metadata } from "next";
import { SchemaOrg } from "@/components/shared/schema-org";

export const metadata: Metadata = {
  title: "Contact Hanva Technologies — Sales & Support Desk",
  description:
    "Connect with Hanva Technologies sales and engineering teams. Book a live product demo, request pulse rate quotes, or visit our Bengaluru headquarters.",
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
    name: "Hanva Technologies Private Limited",
    telephone: "+91-8423711043",
    email: "contact@hanva.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 4, 1st Cross, Sampige Road, Malleshwaram",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560003",
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

