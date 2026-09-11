// schemas/HowToSchema.jsx
// HowTo structured data for a blog post whose content is a real
// sequential procedure (not every post -- see src/data/blogs.js, only
// posts with a `howToSteps` array get this). Renders nothing if no
// steps are given, so it's safe to include unconditionally.
// Usage: <HowToSchema name={...} description={...} steps={[{ name, text }]} />

import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function HowToSchema({ name, description, steps = [] }) {
  if (!name || !steps.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map(({ name: stepName, text }) => ({
      '@type': 'HowToStep',
      name: stepName,
      text,
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
