// Components/HreflangTags.jsx
import { Helmet } from "react-helmet-async"
import { useParams, useLocation } from "react-router-dom"

const BASE_URL = "https://tareeqk.ae"
const LANG_PREFIXES = ["ar", "ur"] // English has no prefix

export default function HreflangTags() {
  const { lang } = useParams()
  const location = useLocation()

  // Strip lang prefix to get bare path
  // /ar/about → /about
  // /about    → /about (English, nothing to strip)
  const barePath = lang
    ? location.pathname.replace(`/${lang}`, "")
    : location.pathname

  return (
    <Helmet>
      {/* Canonical: always points to the English (no prefix) version */}
      <link rel="canonical" href={`${BASE_URL}${barePath || "/"}`} />

      {/* English — no prefix */}
      <link
        rel="alternate"
        hrefLang="en"
        href={`${BASE_URL}${barePath || "/"}`}
      />

      {/* Arabic & Urdu — prefixed */}
      {LANG_PREFIXES.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${BASE_URL}/${l}${barePath || ""}`}
        />
      ))}

      {/* x-default → English */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}${barePath || "/"}`}
      />
    </Helmet>
  )
}
