// components/MainLayout.jsx
import { useEffect } from "react"
import { Outlet, useParams, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Nasir from "./Nasir"
import HreflangTags from "../Hreflangtags"
import CookieConsent from "./CookieConsent"

const SUPPORTED_LANGS = ["en", "ar", "ur"]

const MainLayout = ({ isDark, setIsDark }) => {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const location = useLocation()

  // react-router doesn't scroll to top on navigate by default -- SPA
  // route changes keep whatever scrollTop the previous page had. Bit us
  // concretely on the footer's Terms/Privacy links: clicking them from
  // the bottom of a tall page landed on the new (usually shorter) page
  // already scrolled near its own bottom. Skipped when the new URL has a
  // hash -- that's an in-page anchor jump (HashLink in Navbar.jsx, and
  // Home.jsx's own hash-scroll effect), which already has its own
  // scroll target and shouldn't be yanked back to the top first. Keyed
  // on pathname only (not the full location) so a hash-only change to
  // the same page doesn't also trigger this.
  useEffect(() => {
    if (location.hash) return
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

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
      <CookieConsent />
    </div>
  )
}

export default MainLayout
