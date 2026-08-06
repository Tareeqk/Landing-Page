// scripts/site-routes.mjs
//
// Single source of truth for every crawlable URL on the site — consumed by
// both scripts/generate-sitemap.mjs and scripts/prerender.mjs so the
// sitemap and the prerendered HTML never drift apart.
//
// IMPORTANT: keep this in sync with the routes actually registered in
// src/App.jsx (static <Route> paths, the service page routes, and
// LOCATION_SLUGS) and with src/data/blogs.js. If you add a route in
// App.jsx, add its slug here too.

export const DOMAIN = 'https://tareeqk.ae';
export const LANGS = ['en', 'ar', 'ur'];

// slug: null means the language's index route (/en, /ar, /ur).
export const STATIC_PAGES = [
  { slug: null, priority: '1.0' },
  { slug: 'about', priority: '0.8' },
  { slug: 'service', priority: '0.8' },
  { slug: 'blogs', priority: '0.7' },
  { slug: 'faq', priority: '0.7' },
  { slug: 'terms', priority: '0.6' },
  { slug: 'privacy-policy', priority: '0.6' },
];

// Must match the lazy-loaded routes in src/App.jsx.
export const SERVICE_PAGES = [
  'car-recovery-dubai',
  'battery-service-dubai',
  'flat-tyre-repair-dubai',
  'fuel-delivery-dubai',
  'accident-recovery-dubai',
  'towing-service-dubai',
  'desert-recovery-dubai',
  'bike-recovery-dubai',
];

// Must match LOCATION_SLUGS in src/App.jsx.
export const LOCATION_PAGES = [
  'car-recovery-dubai-marina',
  'car-recovery-business-bay',
  'car-recovery-downtown-dubai',
  'car-recovery-deira',
  'car-recovery-bur-dubai',
  'car-recovery-al-barsha',
  'car-recovery-jumeirah',
  'car-recovery-jvc',
  'car-recovery-jlt',
  'car-recovery-dubai-silicon-oasis',
  'car-recovery-international-city',
  'car-recovery-dubai-investment-park',
  'car-recovery-dubai-sports-city',
  'car-recovery-motor-city',
  'car-recovery-mirdif',
  'car-recovery-al-qusais',
  'car-recovery-al-quoz',
  'car-recovery-jebel-ali',
  'car-recovery-palm-jumeirah',
];

// Must match the slugs in src/data/blogs.js.
export const BLOG_POST_SLUGS = [
  'how-to-choose-a-trusted-car-recovery-service-in-dubai',
];

function urlFor(lang, slug) {
  return slug ? `${DOMAIN}/${lang}/${slug}` : `${DOMAIN}/${lang}`;
}

// Every renderable page as { path, priority } where `path` is the
// app-relative route (what React Router matches), e.g. "/en/about".
// Includes bare "/" once, pointed at the English homepage content, since
// that's what a non-JS crawler hitting the root domain will see.
export function getAllPages() {
  const pages = [{ path: '/', priority: '1.0' }];

  for (const { slug, priority } of STATIC_PAGES) {
    for (const lang of LANGS) {
      pages.push({ path: slug ? `/${lang}/${slug}` : `/${lang}`, priority });
    }
  }
  for (const slug of SERVICE_PAGES) {
    for (const lang of LANGS) {
      pages.push({ path: `/${lang}/${slug}`, priority: '0.8' });
    }
  }
  for (const slug of LOCATION_PAGES) {
    for (const lang of LANGS) {
      pages.push({ path: `/${lang}/${slug}`, priority: '0.8' });
    }
  }
  for (const slug of BLOG_POST_SLUGS) {
    for (const lang of LANGS) {
      pages.push({ path: `/${lang}/page/${slug}`, priority: '0.6' });
    }
  }
  return pages;
}

export { urlFor };
