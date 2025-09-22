import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import Service from './Pages/Service';
import About from './Pages/About';
import FAQs from './Pages/FAQs';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TermsAndConditions from './Pages/TermsAndConditions';
import MainLayout from './Components/MainLayout';
import AOS from "aos";
import "aos/dist/aos.css";
import DriversFAQs from './Pages/DriversFAQs';
import PrivacyAndPolicy from './Pages/PrivacyAndPolicy';
import DriverRegistrationPage from './Pages/DriverRegistration';
import VendorRegistration from './Pages/VendorRegistration';
import NotFound from './Pages/NotFound';
import usePageViews from './hooks/usePageViews';


function App() {
  usePageViews()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      // once: false, // Ensure animations can trigger every time element comes into view
      // mirror: true, // Elements will animate out while scrolling past them
    });

    // Refresh AOS after initialization to catch all elements
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <BrowserRouter basename="/">
      <Routes >
        <Route element={<MainLayout isDark={isDark} setIsDark={setIsDark} />}>
          <Route path='/' element={<Home />} />
          <Route path='/faq' element={<FAQs />} />
          <Route path='/drivers-FAQs' element={<DriversFAQs />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/terms' element={<TermsAndConditions />} />
          <Route path='/driver-registration' element={<DriverRegistrationPage />} />
          <Route path='/vendor-registration' element={<VendorRegistration />} />
          <Route path='/privacy-policy' element={<PrivacyAndPolicy />} />
          <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;