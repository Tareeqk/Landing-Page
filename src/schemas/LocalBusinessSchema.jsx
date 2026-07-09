// schemas/LocalBusinessSchema.jsx
// Inject this inside <Helmet> on the Homepage (LandingPage.jsx)
// Usage: <LocalBusinessSchema />

import React from 'react';
import { Helmet } from 'react-helmet-async';

const schema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TowingService"],
  "@id": "https://www.tareeqk.ae/#business",
  "name": "Tareeqk",
  "alternateName": "Tareeqk Roadside Assistance",
  "description": "24/7 car recovery and towing service in Dubai. Fast response, licensed RTA operator. Services include towing, battery boost, flat tyre, fuel delivery and accident recovery.",
  "url": "https://www.tareeqk.ae",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.tareeqk.ae/new/logo.webp",
    "width": 200,
    "height": 60
  },
  "image": [
    "https://www.tareeqk.ae/new/Recovery_Van.webp",
    "https://www.tareeqk.ae/new/NewBGG.webp"
  ],
  "telephone": "+97142232269",
  "email": "support@tareeqk.ae",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dubai",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "00000",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2048,
    "longitude": 55.2708
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Dubai"
    },
    {
      "@type": "Country",
      "name": "United Arab Emirates"
    },
    {
      "@type": "Place",
      "name": "Dubai Marina"
    },
    {
      "@type": "Place",
      "name": "JVC"
    },
    {
      "@type": "Place",
      "name": "Business Bay"
    },
    {
      "@type": "Place",
      "name": "Deira"
    },
    {
      "@type": "Place",
      "name": "Al Quoz"
    },
    {
      "@type": "Place",
      "name": "Jumeirah"
    }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday",
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Roadside Assistance Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Car Recovery Dubai",
          "url": "https://www.tareeqk.ae/car-recovery-dubai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Towing Service Dubai",
          "url": "https://www.tareeqk.ae/towing-service-dubai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Battery Jump Start Dubai",
          "url": "https://www.tareeqk.ae/battery-service-dubai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Flat Tyre Repair Dubai",
          "url": "https://www.tareeqk.ae/flat-tyre-repair-dubai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fuel Delivery Dubai",
          "url": "https://www.tareeqk.ae/fuel-delivery-dubai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Accident Recovery Dubai",
          "url": "https://www.tareeqk.ae/accident-recovery-dubai"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/tareeqk",
    "https://www.facebook.com/tareeqk",
    "https://www.tiktok.com/@tareeqk"
  ],
  "priceRange": "$$",
  "paymentAccepted": "Cash, Credit Card, Online Payment",
  "currenciesAccepted": "AED",
  "slogan": "Beyond Reliable – 24/7 Car Recovery in Dubai",
  "foundingDate": "2024",
  "knowsAbout": [
    "Car Recovery", "Towing Service", "Roadside Assistance",
    "Battery Boost", "Flat Tyre Repair", "Fuel Delivery",
    "Accident Recovery", "Desert Recovery"
  ]
};

export default function LocalBusinessSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
}