import { useEffect, useState } from "react"
import "./App.css"
import Home from "./Pages/Home"
import Service from "./Pages/Service"
import About from "./Pages/About"
import FAQs from "./Pages/FAQs"
import { Routes, Route, Navigate, useParams } from "react-router-dom"
import TermsAndConditions from "./Pages/TermsAndConditions"
import MainLayout from "./Components/MainLayout"
import AOS from "aos"
import "aos/dist/aos.css"
import DriversFAQs from "./Pages/DriversFAQs"
import PrivacyAndPolicy from "./Pages/PrivacyAndPolicy"
import DriverRegistrationPage from "./Pages/DriverRegistration"
import VendorRegistration from "./Pages/VendorRegistration"
import NotFound from "./Pages/NotFound"
import usePageViews from "./hooks/usePageViews"
import Blogs from "./Pages/Blogs"
import BlogPage from "./Pages/BlogPage"
import { useTranslation } from "react-i18next"

const SUPPORTED_LANGS = ["en", "ar", "ur"]

// Syncs /:lang param → i18n (drop this inside the layout so it has access to useParams)
function LangSync() {
  const { lang } = useParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(lang)) return
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
      document.documentElement.dir =
        lang === "ar" || lang === "ur" ? "rtl" : "ltr"
      document.body.lang = lang
    }
  }, [i18n, lang])

  return null
}

function App() {
  usePageViews()

  useEffect(() => {
    AOS.init({ duration: 1000 })
    setTimeout(() => AOS.refresh(), 100)
  }, [])

  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  )

  useEffect(() => {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(isDark ? "dark" : "light")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  // Detect the user's preferred language for the initial redirect
  const savedLang = localStorage.getItem("i18nextLng") || "en"
  const defaultLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : "en"

  return (
    <Routes>
      {/* Redirect bare "/" to the user's last language (or 'en') */}
      <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />

      {/* All routes under /:lang */}
      <Route
        path="/:lang"
        element={
          <>
            <LangSync />
            <MainLayout isDark={isDark} setIsDark={setIsDark} />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="faq" element={<FAQs />} />
        <Route path="drivers-FAQs" element={<DriversFAQs />} />
        <Route path="about" element={<About />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="page/:blogSlug" element={<BlogPage />} />
        <Route path="service" element={<Service />} />
        <Route path="terms" element={<TermsAndConditions />} />
        <Route
          path="driver-registration"
          element={<DriverRegistrationPage />}
        />
        <Route path="vendor-registration" element={<VendorRegistration />} />
        <Route path="privacy-policy" element={<PrivacyAndPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
