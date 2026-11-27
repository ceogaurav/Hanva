import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.hanva.in";
  const RELEASE_DATE_PHASE21 = new Date("2026-11-26T00:00:00.000Z");
  const RELEASE_DATE_PHASE14 = new Date("2026-11-26T00:00:00.000Z");
  const RELEASE_DATE_PHASE12 = new Date("2026-11-26T00:00:00.000Z");
  const RELEASE_DATE_PHASE10 = new Date("2026-11-25T00:00:00.000Z");
  const RELEASE_DATE_CORE = new Date("2026-11-24T00:00:00.000Z");

  // All 79 canonical routes for Hanva Technologies (Phase 21)
  const routes = [
    // 1. Core Homepage & Commercial Gateways (4)
    "/",
    "/pricing/",
    "/pricing/calculator/",
    "/company/contact/",

    // 2. Product Category Directory Hub (1)
    "/products/",

    // 3. Core Telecom Infrastructure (5)
    "/products/cloud-telephony/",
    "/products/ivr-system/",
    "/products/smart-ivr/",
    "/products/virtual-numbers/",
    "/products/toll-free-numbers/",

    // 4. Contact Center & Automated Dialers (3)
    "/products/call-center-software/",
    "/products/auto-dialer/",
    "/products/predictive-dialer/",

    // 5. Flagship SaaS Products & Omnichannel Messaging (5)
    "/products/crm/",
    "/products/salon-software/",
    "/products/restaurant-pos/",
    "/products/telecalling-crm/",
    "/products/whatsapp-crm/",

    // 5.5. Digital Marketing Services (4)
    "/digital-marketing/",
    "/digital-marketing/seo-services/",
    "/digital-marketing/performance-marketing/",
    "/digital-marketing/social-media-marketing/",

    // 5.6. Software Development Services (7)
    "/software-development/",
    "/software-development/custom-crm-development/",
    "/software-development/web-application-development/",
    "/software-development/mobile-app-development/",
    "/software-development/saas-product-development/",
    "/software-development/api-integration-automation/",
    "/software-development/ecommerce-development/",

    // 6. Solutions Suite (4)
    "/solutions/",
    "/solutions/sales-automation/",
    "/solutions/customer-support/",
    "/solutions/enterprise/",

    // 7. Industry Verticals (9)
    "/industry/",
    "/industry/real-estate/",
    "/industry/healthcare/",
    "/industry/education/",
    "/industry/financial-services/",
    "/industry/insurance/",
    "/industry/automobile/",
    "/industry/logistics/",
    "/industry/recruitment/",

    // 7.5. Regional Location Hubs (7)
    "/locations/",
    "/locations/bengaluru/",
    "/locations/mumbai/",
    "/locations/delhi-ncr/",
    "/locations/hyderabad/",
    "/locations/pune/",
    "/locations/chennai/",

    // 8. Competitor Alternative Comparisons (3)
    "/compare/exotel-alternative/",
    "/compare/knowlarity-alternative/",
    "/compare/telecmi-alternative/",

    // 9. Knowledge Hub & Topical Resource Guides (22)
    "/resources/",
    "/resources/salon-management-software-guide/",
    "/resources/salon-billing-software-guide/",
    "/resources/salon-appointment-management-guide/",
    "/resources/restaurant-pos-kot-inventory-guide/",
    "/resources/restaurant-billing-software-guide/",
    "/resources/cloud-kitchen-management-guide/",
    "/resources/crm-with-ivr-vs-telecalling-crm/",
    "/resources/ivr-crm-for-businesses/",
    "/resources/lead-management-process-guide/",
    "/resources/saas-vs-custom-crm-erp-guide/",
    "/resources/custom-crm-development-guide/",
    "/resources/software-development-cost-factors/",
    "/resources/local-seo-guide-for-businesses/",
    "/resources/seo-vs-google-ads-for-smbs/",
    "/resources/what-is-cloud-telephony/",
    "/resources/how-ivr-systems-work/",
    "/resources/auto-dialer-vs-predictive-dialer/",
    "/resources/telecalling-crm-guide/",
    "/resources/whatsapp-business-api-guide/",
    "/resources/cloud-telephony-pricing-guide/",
    "/resources/dlt-compliance-guide/",

    // 10. Corporate Governance, Careers & Trust (5)
    "/company/about/",
    "/company/careers/",
    "/company/security-and-trust/",
    "/company/privacy-policy/",
    "/company/terms-of-service/",
  ];

  return routes.map((route) => {
    let priority = 0.8;
    let changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" = "weekly";

    if (route === "/" || route === "") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (route === "/pricing/" || route === "/pricing/calculator/" || route === "/company/contact/") {
      priority = 0.95;
      changeFrequency = "daily";
    } else if (
      route.startsWith("/products/") ||
      route.startsWith("/digital-marketing/") ||
      route.startsWith("/software-development/")
    ) {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (route.startsWith("/solutions/") || route.startsWith("/industry/") || route.startsWith("/locations/")) {
      priority = 0.85;
      changeFrequency = "weekly";
    } else if (route.startsWith("/compare/")) {
      priority = 0.8;
      changeFrequency = "weekly";
    } else if (route === "/resources/") {
      priority = 0.8;
      changeFrequency = "weekly";
    } else if (route.startsWith("/resources/")) {
      priority = 0.75;
      changeFrequency = "monthly";
    } else if (route.startsWith("/company/")) {
      priority = 0.7;
      changeFrequency = "monthly";
    }

    let lastModified = RELEASE_DATE_PHASE12;
    if (
      route === "/resources/ivr-crm-for-businesses/" ||
      route === "/resources/lead-management-process-guide/" ||
      route === "/resources/salon-billing-software-guide/" ||
      route === "/resources/salon-appointment-management-guide/" ||
      route === "/resources/restaurant-billing-software-guide/" ||
      route === "/resources/cloud-kitchen-management-guide/" ||
      route === "/resources/local-seo-guide-for-businesses/" ||
      route === "/resources/seo-vs-google-ads-for-smbs/" ||
      route === "/resources/custom-crm-development-guide/" ||
      route === "/resources/software-development-cost-factors/"
    ) {
      lastModified = RELEASE_DATE_PHASE21;
    } else if (
      route === "/products/salon-software/" ||
      route === "/products/restaurant-pos/" ||
      route.startsWith("/digital-marketing/") ||
      route.startsWith("/software-development/") ||
      route === "/resources/" ||
      route === "/resources/salon-management-software-guide/" ||
      route === "/resources/restaurant-pos-kot-inventory-guide/" ||
      route === "/resources/crm-with-ivr-vs-telecalling-crm/" ||
      route === "/resources/saas-vs-custom-crm-erp-guide/" ||
      route.startsWith("/locations/")
    ) {
      lastModified = RELEASE_DATE_PHASE14;
    } else if (route.startsWith("/resources/")) {
      lastModified = RELEASE_DATE_PHASE10;
    } else if (route.startsWith("/company/") && route !== "/company/contact/") {
      lastModified = RELEASE_DATE_CORE;
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency,
      priority,
    };
  });
}
