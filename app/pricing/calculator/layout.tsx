import type { Metadata } from "next";
import { SchemaOrg } from "@/components/shared/schema-org";

export const metadata: Metadata = {
  title: "Cloud Telephony & CRM Cost Calculator",
  description:
    "Interactive voice pulse and CRM seat cost calculator. Compare 15-second vs 60-second billing pulse models and calculate potential savings for your business.",
  alternates: {
    canonical: "https://hanva.in/pricing/calculator/",
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hanva Cloud Telephony & Pulse Cost Calculator",
  url: "https://hanva.in/pricing/calculator/",
  applicationCategory: "BusinessApplication",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  description: "Interactive voice pulse and CRM seat cost calculator for business telecalling estimation.",
  provider: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    telephone: "+91-8423711043",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SchemaOrg schema={calculatorSchema} />
      {children}
    </>
  );
}

