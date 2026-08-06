// schemas/BreadcrumbSchema.jsx
// BreadcrumbList structured data — gives search engines and AI crawlers the
// page's position in the site hierarchy (Home > Services > Car Recovery
// Dubai Marina), which is what powers the breadcrumb trail shown under a
// result in Google and helps AI answer engines cite the right page level.
// Usage: <BreadcrumbSchema items={[{ name: "Home", url: ".../en" }, { name: "Car Recovery Dubai Marina" }]} />
// The last item should omit `url` (it's the current page, per schema.org convention).

import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function BreadcrumbSchema({ items = [] }) {
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      ...(item.url ? { "item": item.url } : {}),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
}
