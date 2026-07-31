// schemas/ServiceSchema.jsx
// Reusable schema for every service page.
// Usage: <ServiceSchema service={serviceConfig} />

import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * @param {Object} props.service
 * @param {string} props.service.name         - "Car Recovery Dubai"
 * @param {string} props.service.url          - "https://tareeqk.ae/car-recovery-dubai"
 * @param {string} props.service.description  - Short description
 * @param {string} props.service.image        - Absolute image URL
 * @param {string[]} props.service.areas      - ["Dubai Marina", "JVC", ...]
 */
export default function ServiceSchema({ service }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "url": service.url,
    "description": service.description,
    "image": service.image || "https://tareeqk.ae/new/Recovery_Van.webp",
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://tareeqk.ae/#business",
      "name": "Tareeqk",
      "telephone": "+97142232269",
      "url": "https://tareeqk.ae"
    },
    "areaServed": (service.areas || ["Dubai"]).map(area => ({
      "@type": "Place",
      "name": area
    })),
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": service.url,
      "servicePhone": "+97142232269",
      "availableLanguage": ["English", "Arabic", "Urdu"]
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday","Tuesday","Wednesday","Thursday",
        "Friday","Saturday","Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "serviceType": service.serviceType || "Roadside Assistance",
    "termsOfService": "https://tareeqk.ae/terms",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "availability": "https://schema.org/InStock",
      "availableAtOrFrom": {
        "@type": "Place",
        "name": "Dubai, UAE"
      }
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