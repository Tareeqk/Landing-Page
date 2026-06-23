import { useEffect, useState, lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
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

// ── NEW SEO SERVICE PAGES (Lazy Loaded) ───────────────────────────
const CarRecoveryDubai       = lazy(() => import('./pages/services/CarRecoveryDubai'));
const BatteryServiceDubai    = lazy(() => import('./pages/services/BatteryServiceDubai'));
const FlatTyreRepairDubai    = lazy(() => import('./pages/services/FlatTyreRepairDubai'));
const FuelDeliveryDubai      = lazy(() => import('./pages/services/FuelDeliveryDubai'));
const AccidentRecoveryDubai  = lazy(() => import('./pages/services/AccidentRecoveryDubai'));
const TowingServiceDubai     = lazy(() => import('./pages/services/Towingservicedubai'));

// ── NEW LOCATION PAGES (all 19 — keep in sync with pages/locations/index.jsx) ─
import {
  CarRecoveryDubaiMarina,
  CarRecoveryBusinessBay,
  CarRecoveryDowntownDubai,
  CarRecoveryDeira,
  CarRecoveryBurDubai,
  CarRecoveryAlBarsha,
  CarRecoveryJumeirah,
  CarRecoveryJVC,
  CarRecoveryJLT,
  CarRecoveryDubaiSiliconOasis,
  CarRecoveryInternationalCity,
  CarRecoveryDIP,
  CarRecoveryDubaiSportsCity,
  CarRecoveryMotorCity,
  CarRecoveryMirdif,
  CarRecoveryAlQusais,
  CarRecoveryAlQuoz,
  CarRecoveryJebelAli,
  CarRecoveryPalmJumeirah,
} from './pages/locations';

// Loading Fallback for Lazy Routes
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
        {/* Redirect root to English default */}
        <Route path="/" element={<Navigate to="/en" replace />} />

        {/* Routes prefixed with language */}
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

          <Route path="car-recovery-dubai" element={<CarRecoveryDubai />} />
          <Route path="battery-service-dubai" element={<BatteryServiceDubai />} />
          <Route path="flat-tyre-repair-dubai" element={<FlatTyreRepairDubai />} />
          <Route path="fuel-delivery-dubai" element={<FuelDeliveryDubai />} />
          <Route path="accident-recovery-dubai" element={<AccidentRecoveryDubai />} />
          <Route path="towing-service-dubai" element={<TowingServiceDubai />} />

          <Route path="car-recovery-dubai-marina" element={<CarRecoveryDubaiMarina />} />
          <Route path="car-recovery-business-bay" element={<CarRecoveryBusinessBay />} />
          <Route path="car-recovery-downtown-dubai" element={<CarRecoveryDowntownDubai />} />
          <Route path="car-recovery-deira" element={<CarRecoveryDeira />} />
          <Route path="car-recovery-bur-dubai" element={<CarRecoveryBurDubai />} />
          <Route path="car-recovery-al-barsha" element={<CarRecoveryAlBarsha />} />
          <Route path="car-recovery-jumeirah" element={<CarRecoveryJumeirah />} />
          <Route path="car-recovery-jvc" element={<CarRecoveryJVC />} />
          <Route path="car-recovery-jlt" element={<CarRecoveryJLT />} />
          <Route path="car-recovery-dubai-silicon-oasis" element={<CarRecoveryDubaiSiliconOasis />} />
          <Route path="car-recovery-international-city" element={<CarRecoveryInternationalCity />} />
          <Route path="car-recovery-dubai-investment-park" element={<CarRecoveryDIP />} />
          <Route path="car-recovery-dubai-sports-city" element={<CarRecoveryDubaiSportsCity />} />
          <Route path="car-recovery-motor-city" element={<CarRecoveryMotorCity />} />
          <Route path="car-recovery-mirdif" element={<CarRecoveryMirdif />} />
          <Route path="car-recovery-al-qusais" element={<CarRecoveryAlQusais />} />
          <Route path="car-recovery-al-quoz" element={<CarRecoveryAlQuoz />} />
          <Route path="car-recovery-jebel-ali" element={<CarRecoveryJebelAli />} />
          <Route path="car-recovery-palm-jumeirah" element={<CarRecoveryPalmJumeirah />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;