// components/MainLayout.jsx
import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Nasir from "./Nasir"
import HreflangTags from "../Hreflangtags"

const SUPPORTED_LANGS = ["en", "ar", "ur"]

const MainLayout = ({ isDark, setIsDark }) => {
  const { lang } = useParams()
  const { i18n } = useTranslation()

  // Only LanguageSwitcher ever called i18n.changeLanguage() before this —
  // nothing synced the active language from the URL itself, so opening an
  // /ar/... or /ur/... link directly (bookmark, shared link, hard refresh)
  // rendered in whatever language was last active instead of the one in
  // the URL. This keeps them in sync on every route change, including the
  // first load.
  useEffect(() => {
    if (!SUPPORTED_LANGS.includes(lang) || lang === i18n.language) return
    i18n.changeLanguage(lang)
    localStorage.setItem("i18nextLng", lang)
    document.documentElement.dir = lang === "ar" || lang === "ur" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }, [lang, i18n])

  return (
    <div className="pt-16 sm:pt-20">
      <HreflangTags />
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Nasir />
      <main>
        <Outlet />
      </main>
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </div>
  )
}

export default MainLayout
