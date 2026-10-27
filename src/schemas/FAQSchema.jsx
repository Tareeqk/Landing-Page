// schemas/FAQSchema.jsx
// Reusable FAQ schema — inject on every page that has an FAQ section.
// Usage: <FAQSchema faqs={[ { question: "...", answer: "..." }, ... ]} />

import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function FAQSchema({ faqs = [] }) {
  if (!faqs.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
}