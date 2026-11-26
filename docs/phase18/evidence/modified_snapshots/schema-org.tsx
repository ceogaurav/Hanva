import * as React from "react";

export function buildBreadcrumbSchema(
  breadcrumbs: Array<{ label: string; href?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href
        ? {
            item: crumb.href.startsWith("http")
              ? crumb.href
              : `https://www.hanva.in${crumb.href.startsWith("/") ? crumb.href : `/${crumb.href}`}`,
          }
        : {}),
    })),
  };
}

export function SchemaOrg({
  schema,
  data,
}: {
  schema?: Record<string, unknown>;
  data?: Record<string, unknown>;
}) {
  const content = schema || data;
  if (!content) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(content).replace(/</g, "\\u003c") }}
    />
  );
}
