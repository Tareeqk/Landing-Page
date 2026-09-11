// schemas/LocalBusinessSchema.jsx
// Inject this inside <Helmet> on the Homepage (LandingPage.jsx)
// Usage: <LocalBusinessSchema lang={lang} />
//
// Was a single hardcoded English object rendered identically on all
// three homepage languages (Home.jsx doesn't pass `lang` at all) -- the
// Arabic and Urdu homepages were shipping an English-only LocalBusiness
// schema, meaning the site's core keyword list (knowsAbout, description,
// service names) never showed a single Arabic or Urdu word to Google or
// an AI crawler on 2 of the 3 language versions of the homepage.

import React from 'react';
import { Helmet } from 'react-helmet-async';
import ratings from '../data/ratings.json';

// Must match SERVICE_PAGES in scripts/site-routes.mjs -- this list used
// to only cover 5 of the 8 real service pages (missing desert/bike
// recovery and roadside assistance entirely) and every url was missing
// both the /{lang}/ prefix and the trailing slash the real prerendered
// routes use (e.g. "https://tareeqk.ae/car-recovery-dubai" instead of
// ".../en/car-recovery-dubai/") -- neither matched an actual indexable
// URL on the site.
const SERVICE_SLUGS = [
  'car-recovery-dubai',
  'towing-service-dubai',
  'battery-service-dubai',
  'flat-tyre-repair-dubai',
  'accident-recovery-dubai',
  'desert-recovery-dubai',
  'bike-recovery-dubai',
  'roadside-assistance-dubai',
];

const TRANSLATIONS = {
  en: {
    alternateName: 'Tareeqk Roadside Assistance',
    description:
      '24/7 car recovery and towing service in Dubai. Fast response, licensed RTA operator. Services include towing, battery boost, flat tyre and accident recovery.',
    slogan: 'Beyond Reliable – 24/7 Car Recovery in Dubai',
    paymentAccepted: 'Cash, Credit Card, Online Payment',
    knowsAbout: [
      'Car Recovery', 'Towing Service', 'Roadside Assistance',
      'Battery Boost', 'Flat Tyre Repair', 'Accident Recovery', 'Desert Recovery',
    ],
    areaServed: {
      city: 'Dubai',
      country: 'United Arab Emirates',
      places: ['Dubai Marina', 'JVC', 'Business Bay', 'Deira', 'Al Quoz', 'Jumeirah'],
    },
    offerCatalogName: 'Roadside Assistance Services',
    services: {
      'car-recovery-dubai': 'Car Recovery Dubai',
      'towing-service-dubai': 'Towing Service Dubai',
      'battery-service-dubai': 'Battery Jump Start Dubai',
      'flat-tyre-repair-dubai': 'Flat Tyre Repair Dubai',
      'accident-recovery-dubai': 'Accident Recovery Dubai',
      'desert-recovery-dubai': 'Desert Recovery Dubai',
      'bike-recovery-dubai': 'Bike Recovery Dubai',
      'roadside-assistance-dubai': 'Roadside Assistance Dubai',
    },
  },
  ar: {
    alternateName: 'طريقك للمساعدة على الطريق',
    description:
      'خدمة إنقاذ وسحب السيارات على مدار الساعة طوال أيام الأسبوع في دبي. استجابة سريعة، ومشغل مرخّص من هيئة الطرق والمواصلات (RTA). تشمل خدماتنا السحب، وشحن البطارية، وإصلاح الإطارات المسطحة، وإنقاذ الحوادث.',
    slogan: 'أبعد من الموثوقية – إنقاذ سيارات على مدار الساعة في دبي',
    paymentAccepted: 'نقدًا، بطاقة ائتمان، أو دفع إلكتروني',
    knowsAbout: [
      'إنقاذ السيارات', 'خدمة السحب', 'المساعدة على الطريق',
      'شحن البطارية', 'إصلاح الإطارات المسطحة', 'إنقاذ الحوادث', 'إنقاذ الصحراء',
    ],
    areaServed: {
      city: 'دبي',
      country: 'الإمارات العربية المتحدة',
      // JVC kept as-is -- the abbreviation is what's actually searched
      // for in Arabic-market UAE usage too, not a translated form.
      places: ['دبي مارينا', 'JVC', 'الخليج التجاري', 'ديرة', 'القوز', 'جميرا'],
    },
    offerCatalogName: 'خدمات المساعدة على الطريق',
    services: {
      'car-recovery-dubai': 'إنقاذ السيارات في دبي',
      'towing-service-dubai': 'خدمة سحب السيارات في دبي',
      'battery-service-dubai': 'شحن البطارية في دبي',
      'flat-tyre-repair-dubai': 'إصلاح الإطارات المسطحة في دبي',
      'accident-recovery-dubai': 'إنقاذ الحوادث في دبي',
      'desert-recovery-dubai': 'إنقاذ الصحراء في دبي',
      'bike-recovery-dubai': 'إنقاذ الدراجات النارية في دبي',
      'roadside-assistance-dubai': 'المساعدة على الطريق في دبي',
    },
  },
  ur: {
    alternateName: 'طریقک روڈ سائیڈ اسسٹنس',
    description:
      'دبئی میں 24/7 کار ریکوری اور ٹوئنگ سروس۔ تیز رفتار ردعمل، لائسنس یافتہ RTA آپریٹر۔ ہماری خدمات میں ٹوئنگ، بیٹری بوسٹ، فلیٹ ٹائر، اور ایکسیڈنٹ ریکوری شامل ہیں۔',
    slogan: 'بھروسے سے بڑھ کر – دبئی میں 24/7 کار ریکوری',
    paymentAccepted: 'نقد، کریڈٹ کارڈ، یا آن لائن ادائیگی',
    knowsAbout: [
      'کار ریکوری', 'ٹوئنگ سروس', 'روڈ سائیڈ اسسٹنس',
      'بیٹری بوسٹ', 'فلیٹ ٹائر مرمت', 'ایکسیڈنٹ ریکوری', 'ڈیزرٹ ریکوری',
    ],
    areaServed: {
      city: 'دبئی',
      country: 'متحدہ عرب امارات',
      places: ['دبئی مرینا', 'JVC', 'بزنس بے', 'دیرہ', 'القوز', 'جمیرا'],
    },
    offerCatalogName: 'روڈ سائیڈ اسسٹنس خدمات',
    services: {
      'car-recovery-dubai': 'کار ریکوری دبئی',
      'towing-service-dubai': 'ٹوئنگ سروس دبئی',
      'battery-service-dubai': 'بیٹری جمپ اسٹارٹ دبئی',
      'flat-tyre-repair-dubai': 'فلیٹ ٹائر مرمت دبئی',
      'accident-recovery-dubai': 'ایکسیڈنٹ ریکوری دبئی',
      'desert-recovery-dubai': 'ڈیزرٹ ریکوری دبئی',
      'bike-recovery-dubai': 'بائیک ریکوری دبئی',
      'roadside-assistance-dubai': 'روڈ سائیڈ اسسٹنس دبئی',
    },
  },
};

function buildSchema(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TowingService'],
    // Deliberately NOT language-specific -- this @id represents the one
    // real-world business entity across all three homepage languages,
    // not a separate node per locale. Other schema blocks (ArticleSchema,
    // etc.) could reference this same @id regardless of what language
    // page they're on.
    '@id': 'https://tareeqk.ae/#business',
    name: 'Tareeqk',
    alternateName: t.alternateName,
    description: t.description,
    // Matches the current page's own self-referencing canonical
    // (https://tareeqk.ae/{lang}/) instead of the bare domain, which
    // itself just 301s to /en/ -- a schema field pointing at a redirect
    // rather than the actual canonical URL is exactly the kind of
    // mismatch Google's structured data validation flags.
    url: `https://tareeqk.ae/${lang}/`,
    logo: {
      '@type': 'ImageObject',
      url: 'https://tareeqk.ae/new/LogoW.webp',
      width: 200,
      height: 60,
    },
    image: [
      'https://tareeqk.ae/new/Recovery_Van.webp',
      'https://tareeqk.ae/new/NewBGG.webp',
    ],
    telephone: '+97142232269',
    email: 'support@tareeqk.ae',
    address: {
      '@type': 'PostalAddress',
      // Kept in English across all three languages deliberately -- this
      // is the formal registered address (matches Google Business
      // Profile / trade license), not marketing copy. Transliterating it
      // without the actual official Arabic/Urdu rendering on file risks
      // an address that looks plausible but doesn't match what's
      // registered elsewhere, which hurts local-SEO NAP consistency
      // more than an English string on an Arabic page does.
      streetAddress: 'Tareeqk Office #126, Ras Al Khor',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1857,
      longitude: 55.3312,
    },
    areaServed: [
      { '@type': 'City', name: t.areaServed.city },
      { '@type': 'Country', name: t.areaServed.country },
      ...t.areaServed.places.map((name) => ({ '@type': 'Place', name })),
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      // schema.org's DayOfWeek enumeration expects these literal English
      // tokens (or their schema.org/Monday-style URLs) regardless of
      // page language -- not free text, so this never gets translated.
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '00:00',
      closes: '23:59',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.offerCatalogName,
      itemListElement: SERVICE_SLUGS.map((slug) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: t.services[slug],
          url: `https://tareeqk.ae/${lang}/${slug}/`,
        },
      })),
    },
    sameAs: [
      'https://www.instagram.com/tareeqk',
      'https://www.facebook.com/share/1Dv6SMaQx1/?mibextid=wwXIfr',
      'https://www.tiktok.com/@tareeqk',
    ],
    priceRange: '$$',
    paymentAccepted: t.paymentAccepted,
    currenciesAccepted: 'AED',
    slogan: t.slogan,
    foundingDate: '2024',
    knowsAbout: t.knowsAbout,
  };

  // AggregateRating is only added when there's a real synced value (see
  // scripts/fetch-ratings.mjs) -- Google's structured data guidelines
  // require review/rating markup to reflect genuine third-party data with
  // a matching visible rating somewhere on the page (see the trust stat in
  // LandingPage.jsx), not a placeholder. reviewCount must be > 0 or Google
  // ignores the whole block anyway. Language-independent -- a rating is
  // the same number regardless of which language page it's declared on.
  const google = ratings?.google;
  if (google?.rating && google?.review_count > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: google.rating,
      reviewCount: google.review_count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export default function LocalBusinessSchema({ lang = 'en' }) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(buildSchema(lang), null, 2)}
      </script>
    </Helmet>
  );
}
