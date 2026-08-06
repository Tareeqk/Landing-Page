// schemas/ArticleSchema.jsx
// BlogPosting structured data for individual blog articles.
// Usage: <ArticleSchema title={...} description={...} image={...} datePublished={...} url={...} />

import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function ArticleSchema({ title, description, image, datePublished, url }) {
  if (!title) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image ? [image] : ["https://tareeqk.ae/new/Recovery_Van.webp"],
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Organization",
      "name": "Tareeqk",
      "url": "https://tareeqk.ae"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tareeqk",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tareeqk.ae/new/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
}
