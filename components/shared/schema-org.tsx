import * as React from "react";

export function SchemaOrg({
  schema,
  data,
}: {
  schema?: Record<string, any>;
  data?: Record<string, any>;
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
