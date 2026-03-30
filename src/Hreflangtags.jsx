// Components/HreflangTags.jsx
import { Helmet } from "react-helmet-async"
import { useParams, useLocation } from "react-router-dom"

const BASE_URL = "https://tareeqk.ae"
const SUPPORTED_LANGS = ["en", "ar", "ur"]

export default function HreflangTags() {
  const { lang } = useParams()
  const location = useLocation()

  // Strip the lang prefix to get the bare path
  // e.g. /ar/about → /about,  /en → ""
  const barePath = location.pathname.replace(`/${lang}`, "")

  return (
    <Helmet>
      {/* Canonical: the authoritative URL for this page in the current language */}
      <link rel="canonical" href={`${BASE_URL}/${lang}${barePath}`} />

      {/* Tell Google about all language versions of this page */}
      {SUPPORTED_LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${BASE_URL}/${l}${barePath}`}
        />
      ))}

      {/* x-default: fallback for users whose language isn't supported */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${barePath}`}
      />
    </Helmet>
  )
}
