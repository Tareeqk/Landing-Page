import { useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

// Existing Components & Layout
import MainLayout from './Components/MainLayout';
import usePageViews from './hooks/usePageViews';

// Existing Pages
// Home stays a static import — it's the entry route on first load, and
// lazy-loading it would add an extra async round-trip before the
// homepage itself can render, which is the opposite of what we want.
// Every other page was previously static too, which meant a first-time
// visitor's homepage load downloaded About/FAQs/Blogs/Terms/Privacy/
// NotFound/Service *and* all 19 location pages' JS before React could
// paint anything — none of that is needed until the visitor actually
// navigates there. Matches the lazy pattern already used for the SEO
// service pages below.
import Home from './Pages/Home';
const Service           = lazy(() => import('./Pages/Service'));
const About              = lazy(() => import('./Pages/About'));
const FAQs               = lazy(() => import('./Pages/FAQs'));
const TermsAndConditions = lazy(() => import('./Pages/TermsAndConditions'));
const PrivacyAndPolicy   = lazy(() => import('./Pages/PrivacyAndPolicy'));
const Blogs              = lazy(() => import('./Pages/Blogs'));
const BlogPage           = lazy(() => import('./Pages/BlogPage'));
const BecomePartner      = lazy(() => import('./Pages/BecomePartner'));
const AllAreas            = lazy(() => import('./Pages/AllAreas'));
const NotFound           = lazy(() => import('./Pages/NotFound'));

// ── SEO SERVICE PAGES (Lazy Loaded) ──────────────────────────────
const CarRecoveryDubai      = lazy(() => import('./Pages/services/CarRecoveryDubai'));
const BatteryServiceDubai   = lazy(() => import('./Pages/services/BatteryServiceDubai'));
const FlatTyreRepairDubai   = lazy(() => import('./Pages/services/FlatTyreRepairDubai'));
const FuelDeliveryDubai     = lazy(() => import('./Pages/services/FuelDeliveryDubai'));
const AccidentRecoveryDubai = lazy(() => import('./Pages/services/AccidentRecoveryDubai'));
const TowingServiceDubai    = lazy(() => import('./Pages/services/Towingservicedubai'));
const DesertRecoveryDubai   = lazy(() => import('./Pages/services/DesertRecoveryDubai'));
const BikeRecoveryDubai     = lazy(() => import('./Pages/services/BikeRecoveryDubai'));
const RoadsideAssistanceDubai = lazy(() => import('./Pages/services/RoadsideAssistanceDubai'));

// ── LOCATION PAGES ────────────────────────────────────────────────
// All 19 location pages render the same heavy LocationPageTemplate and
// only differ by which common.json slug they read, so this was
// previously one static import pulling all 19 (plus the template) into
// the main bundle. Every `import('./Pages/locations')` below points at
// the same module specifier, so the bundler dedupes them into a single
// shared chunk — loaded once, on first location-page visit, instead of
// on every homepage load.

// Slugs must match the top-level keys in common.json and the route
// paths already in use. Order doesn't matter.
const LOCATION_SLUGS = [
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
];

function slugToComponentName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// One lazy component per slug, all pointing at the same dynamic import
// specifier — see the LOCATION PAGES comment above for why that collapses
// into a single shared chunk rather than 19 separate ones. Built once at
// module scope (not inside App()) since React.lazy requires a stable
// component reference across renders.
const locationLazyComponents = Object.fromEntries(
  LOCATION_SLUGS.map(slug => [
    slug,
    lazy(() =>
      import('./Pages/locations').then(mod => ({
        default: mod.default[slugToComponentName(slug)],
      })),
    ),
  ]),
);

// Loading Fallback
const PageLoader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" />
  </div>
);

function App() {
  usePageViews();

  useEffect(() => {
    // A flat duration with no easing curve made every AOS reveal across the
    // app feel identical and mechanical regardless of section. `easing`
    // gives entrances a premium deceleration instead of a linear pop, and
    // `once` stops re-triggering on re-scroll. Individual elements still
    // vary their own delay via `data-aos-delay` (see the per-item stagger
    // added across the marketing sections) — this just sets the baseline
    // feel, not a uniform one.
    AOS.init({ duration: 1100, easing: 'ease-out-cubic', once: true, offset: 80 });
    setTimeout(() => { AOS.refresh(); }, 100);
  }, []);

  // Fade in lazy-loaded images instead of letting them hard-pop the
  // instant their bytes arrive. Deliberately scoped to loading="lazy"
  // only -- eager/fetchpriority="high" hero images (the ones this app's
  // LCP was specifically tuned around, see index.html) are never touched,
  // so this can't regress the paint timing already optimized there.
  //
  // Also deliberately NOT a blanket CSS "img { opacity: 0 }" rule: that
  // would hide every image sitewide the instant the stylesheet applies,
  // including on prerendered pages, until this effect gets around to
  // marking them loaded -- a real flash-of-invisible-content on a slow
  // connection. Instead each image starts fully visible (identical to
  // today) and only gets opacity:0 + a transition once this effect has
  // confirmed it isn't loaded yet and has a 'load' listener ready to
  // reveal it -- so if JS is slow or fails, images just render normally.
  useEffect(() => {
    const fade = (img) => {
      if (img.complete || img.dataset.tkFade) return;
      img.dataset.tkFade = '1';
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.4s ease';
      img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
    };
    const scan = (root) => {
      if (root.nodeType !== 1) return;
      if (root.tagName === 'IMG' && root.loading === 'lazy') fade(root);
      root.querySelectorAll?.('img[loading="lazy"]').forEach(fade);
    };
    scan(document.body);
    // Route changes (and any lazy content revealed after scroll) mount new
    // <img> tags after this effect's initial scan, so keep watching.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  // Dark mode is temporarily restricted to light-only — the toggle is
  // hidden in Navbar.jsx, and this always starts light regardless of a
  // previously stored "dark" preference so no one gets stuck without a
  // way back. The isDark/setIsDark plumbing is left intact so the toggle
  // can be re-shown later without redoing this wiring.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />

        <Route path="/:lang" element={<MainLayout isDark={isDark} setIsDark={setIsDark} />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<FAQs />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="page/:blogSlug" element={<BlogPage />} />
          <Route path="service" element={<Service />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyAndPolicy />} />
          <Route path="become-a-partner" element={<BecomePartner />} />
          <Route path="areas" element={<AllAreas />} />

          {/* Service pages */}
          <Route path="car-recovery-dubai"      element={<CarRecoveryDubai />} />
          <Route path="battery-service-dubai"   element={<BatteryServiceDubai />} />
          <Route path="flat-tyre-repair-dubai"  element={<FlatTyreRepairDubai />} />
          <Route path="fuel-delivery-dubai"     element={<FuelDeliveryDubai />} />
          <Route path="accident-recovery-dubai" element={<AccidentRecoveryDubai />} />
          <Route path="towing-service-dubai"    element={<TowingServiceDubai />} />
          <Route path="desert-recovery-dubai"   element={<DesertRecoveryDubai />} />
          <Route path="bike-recovery-dubai"     element={<BikeRecoveryDubai />} />
          <Route path="roadside-assistance-dubai" element={<RoadsideAssistanceDubai />} />

          {/* Location pages — driven by common.json via useTranslation */}
          {LOCATION_SLUGS.map(slug => {
            const Component = locationLazyComponents[slug];
            return Component
              ? <Route key={slug} path={slug} element={<Component />} />
              : null;
          })}

          {/* Unmatched paths under a known /:lang prefix (the vast majority of
              real 404s) render inside MainLayout, so a broken link doesn't
              also strand the visitor without a navbar, footer, or phone
              number. The top-level "*" below is only a fallback for URLs
              that don't even have a language segment. */}
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;