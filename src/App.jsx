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

const LANG_PREFIXES = ["ar", "ur"] // English has no prefix

function LangSync({ lang }) {
  const { i18n } = useTranslation()

  useEffect(() => {
    const resolvedLang = lang ?? "en"
    if (i18n.language !== resolvedLang) {
      i18n.changeLanguage(resolvedLang)
    }
    document.documentElement.lang = resolvedLang
    document.documentElement.dir =
      resolvedLang === "ar" || resolvedLang === "ur" ? "rtl" : "ltr"
  }, [lang])

  return null
}

function PrefixedLayout({ isDark, setIsDark }) {
  const { lang } = useParams()

  // If someone hits /about or /service directly (not a valid lang prefix),
  // this catches it before rendering garbage
  if (!LANG_PREFIXES.includes(lang)) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <LangSync lang={lang} />
      <MainLayout isDark={isDark} setIsDark={setIsDark} />
    </>
  )
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

  return (
    <Routes>
      {/* ——— English: no prefix, lives at / ——— */}
      <Route
        element={
          <>
            <LangSync lang="en" />
            <MainLayout isDark={isDark} setIsDark={setIsDark} />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQs />} />
        <Route path="/drivers-FAQs" element={<DriversFAQs />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/page/:blogSlug" element={<BlogPage />} />
        <Route path="/service" element={<Service />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route
          path="/driver-registration"
          element={<DriverRegistrationPage />}
        />
        <Route path="/vendor-registration" element={<VendorRegistration />} />
        <Route path="/privacy-policy" element={<PrivacyAndPolicy />} />
      </Route>

      {/* ——— Arabic & Urdu: prefixed with /:lang ——— */}
      <Route
        path="/:lang"
        element={<PrefixedLayout isDark={isDark} setIsDark={setIsDark} />}
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

      {/* ——— Redirect old /en/* to / ——— */}
      <Route path="/en" element={<Navigate to="/" replace />} />
      <Route path="/en/*" element={<Navigate to="/" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
