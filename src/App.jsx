import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home';
import Service from './Pages/Service';
import About from './Pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TermsAndConditions from './Pages/TermsAndConditions';
import MainLayout from './Components/MainLayout';
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from 'react-i18next';


function App() {
  const { t } = useTranslation();

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
    <BrowserRouter>
      <Routes >
        <Route element={<MainLayout isDark={isDark} setIsDark={setIsDark} />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/terms' element={<TermsAndConditions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;