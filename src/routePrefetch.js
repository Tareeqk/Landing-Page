// routePrefetch.js
//
// Every route below is lazy-loaded in App.jsx (React.lazy + dynamic
// import()), which is great for initial bundle size but means the first
// click on a nav link/card used to trigger a network fetch + parse *after*
// the click -- a visible beat of nothing happening before the new page
// shows up. Calling the same import() specifier on hover (mouseenter fires
// well before the click on any deliberate pointer movement) lets Vite/the
// browser start that fetch early, so by the time the click lands the chunk
// is usually already cached and the route change is instant.
//
// Slugs duplicated here rather than imported from a shared module --
// matches this codebase's existing convention (see App.jsx, site-routes.mjs,
// Pages/locations/index.jsx, Pages/services/ServicePageTemplate.jsx, all of
// which keep their own literal copy of the same lists).
const STATIC_IMPORTS = {
  faq: () => import('./Pages/FAQs'),
  about: () => import('./Pages/About'),
  blogs: () => import('./Pages/Blogs'),
  service: () => import('./Pages/Service'),
  terms: () => import('./Pages/TermsAndConditions'),
  'privacy-policy': () => import('./Pages/PrivacyAndPolicy'),
  'become-a-partner': () => import('./Pages/BecomePartner'),
  areas: () => import('./Pages/AllAreas'),
  'car-recovery-dubai': () => import('./Pages/services/CarRecoveryDubai'),
  'battery-service-dubai': () => import('./Pages/services/BatteryServiceDubai'),
  'flat-tyre-repair-dubai': () => import('./Pages/services/FlatTyreRepairDubai'),
  'accident-recovery-dubai': () => import('./Pages/services/AccidentRecoveryDubai'),
  'towing-service-dubai': () => import('./Pages/services/Towingservicedubai'),
  'desert-recovery-dubai': () => import('./Pages/services/DesertRecoveryDubai'),
  'bike-recovery-dubai': () => import('./Pages/services/BikeRecoveryDubai'),
  'roadside-assistance-dubai': () => import('./Pages/services/RoadsideAssistanceDubai'),
};

const LOCATION_SLUGS = new Set([
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
  'car-recovery-difc',
  'car-recovery-dubai-hills-estate',
  'car-recovery-discovery-gardens',
  'car-recovery-al-nahda',
  'car-recovery-barsha-heights',
]);

// Every distinct chunk gets fetched at most once per session, regardless of
// how many different cards/links point at it (e.g. 24 location cards all
// share one chunk -- see the LOCATION_SLUGS branch below).
const done = new Set();

export function prefetchRoute(path) {
  if (!path || typeof path !== 'string') return;
  const segments = path.split('?')[0].split('#')[0].split('/').filter(Boolean);
  const slug = segments[1]; // segments[0] is the /:lang prefix
  if (!slug) return; // homepage -- Home is a static (non-lazy) import already

  if (slug === 'page') {
    if (done.has('page')) return;
    done.add('page');
    import('./Pages/BlogPage');
    return;
  }

  if (LOCATION_SLUGS.has(slug)) {
    if (done.has('__locations__')) return;
    done.add('__locations__');
    import('./Pages/locations');
    return;
  }

  const importFn = STATIC_IMPORTS[slug];
  if (importFn && !done.has(slug)) {
    done.add(slug);
    importFn();
  }
}
