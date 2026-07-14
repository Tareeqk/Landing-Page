import { useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

// Existing Components & Layout
import MainLayout from './Components/MainLayout';
import usePageViews from './hooks/usePageViews';

// Existing Pages
import Home from './Pages/Home';
import Service from './Pages/Service';
import About from './Pages/About';
import FAQs from './Pages/FAQs';
import TermsAndConditions from './Pages/TermsAndConditions';
import DriversFAQs from './Pages/DriversFAQs';
import PrivacyAndPolicy from './Pages/PrivacyAndPolicy';
import DriverRegistrationPage from './Pages/DriverRegistration';
import VendorRegistration from './Pages/VendorRegistration';
import Blogs from './Pages/Blogs';
import BlogPage from './Pages/BlogPage';
import NotFound from './Pages/NotFound';

// ── SEO SERVICE PAGES (Lazy Loaded) ──────────────────────────────
const CarRecoveryDubai      = lazy(() => import('./Pages/services/CarRecoveryDubai'));
const BatteryServiceDubai   = lazy(() => import('./Pages/services/BatteryServiceDubai'));
const FlatTyreRepairDubai   = lazy(() => import('./Pages/services/FlatTyreRepairDubai'));
const FuelDeliveryDubai     = lazy(() => import('./Pages/services/FuelDeliveryDubai'));
const AccidentRecoveryDubai = lazy(() => import('./Pages/services/AccidentRecoveryDubai'));
const TowingServiceDubai    = lazy(() => import('./Pages/services/Towingservicedubai'));
const DesertRecoveryDubai   = lazy(() => import('./Pages/services/DesertRecoveryDubai'));
const BikeRecoveryDubai     = lazy(() => import('./Pages/services/BikeRecoveryDubai'));

// ── LOCATION PAGES ────────────────────────────────────────────────
// locationComponents is a { ComponentName: Component } map built from
// the slugs in index.jsx, which reads all data from common.json via
// useTranslation — no separate data file needed.
import locationComponents from './Pages/locations';

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
];

function slugToComponentName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Loading Fallback
const PageLoader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" />
  </div>
);

function App() {
  usePageViews();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setTimeout(() => { AOS.refresh(); }, 100);
  }, []);

  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

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
          <Route path="drivers-FAQs" element={<DriversFAQs />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="page/:blogSlug" element={<BlogPage />} />
          <Route path="service" element={<Service />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="driver-registration" element={<DriverRegistrationPage />} />
          <Route path="vendor-registration" element={<VendorRegistration />} />
          <Route path="privacy-policy" element={<PrivacyAndPolicy />} />

          {/* Service pages */}
          <Route path="car-recovery-dubai"      element={<CarRecoveryDubai />} />
          <Route path="battery-service-dubai"   element={<BatteryServiceDubai />} />
          <Route path="flat-tyre-repair-dubai"  element={<FlatTyreRepairDubai />} />
          <Route path="fuel-delivery-dubai"     element={<FuelDeliveryDubai />} />
          <Route path="accident-recovery-dubai" element={<AccidentRecoveryDubai />} />
          <Route path="towing-service-dubai"    element={<TowingServiceDubai />} />
          <Route path="desert-recovery-dubai"   element={<DesertRecoveryDubai />} />
          <Route path="bike-recovery-dubai"     element={<BikeRecoveryDubai />} />

          {/* Location pages — driven by common.json via useTranslation */}
          {LOCATION_SLUGS.map(slug => {
            const Component = locationComponents[slugToComponentName(slug)];
            return Component
              ? <Route key={slug} path={slug} element={<Component />} />
              : null;
          })}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;