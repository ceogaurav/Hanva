import type { Metadata } from "next";
import "./globals.css";
import { LayoutShell } from "@/components/layout/layout-shell";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hanva.in"),
  title: {
    default: "Hanva Technologies — Cloud Telephony, Smart IVR & Telecalling CRM",
    template: "%s | Hanva Technologies",
  },
  description:
    "Enterprise cloud telephony, multi-level smart IVR, automated dialers, and sales telecalling CRM for Indian businesses. Transparent pulse billing with carrier gateway delivery.",
  keywords: [
    "cloud telephony india",
    "ivr service provider",
    "smart ivr system",
    "telecalling crm software",
    "auto dialer software",
    "whatsapp crm",
    "virtual number india",
  ],
  authors: [{ name: "Hanva Technologies Private Limited" }],
  creator: "Hanva Technologies",
  publisher: "Hanva Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hanva.in",
    siteName: "Hanva Technologies",
    title: "Hanva Technologies — Cloud Telephony, Smart IVR & Telecalling CRM",
    description:
      "Enterprise cloud telephony, multi-level smart IVR, automated dialers, and sales telecalling CRM for Indian businesses.",
    images: [
      {
        url: "https://www.hanva.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hanva Technologies Logo and Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanva Technologies — Cloud Telephony, Smart IVR & Telecalling CRM",
    description:
      "Enterprise cloud telephony, multi-level smart IVR, automated dialers, and sales telecalling CRM for Indian businesses.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Pre-Hydration Client Script for Legacy Hash Navigation Migration */}
        <script
          id="legacy-hash-migration"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window !== 'undefined' && window.location.pathname === '/' && window.location.hash) {
                    var hash = window.location.hash.toLowerCase();
                    var mapping = {
                      '#pricing': '/pricing/',
                      '#contact': '/company/contact/',
                      '#services': '/products/',
                      '#features': '/products/cloud-telephony/',
                      '#about': '/company/about/',
                      '#ivr': '/products/ivr-system/',
                      '#crm': '/products/crm/'
                    };
                    if (mapping[hash]) {
                      window.location.replace(mapping[hash]);
                    }
                  }
                } catch (e) {
                  // Fail open to standard render
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <LayoutShell footer={<Footer />}>{children}</LayoutShell>
      </body>
    </html>
  );
}
