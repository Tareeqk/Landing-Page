// Components/HreflangTags.jsx
import { Helmet } from "react-helmet-async"
import { useParams, useLocation } from "react-router-dom"

const BASE_URL = "https://tareeqk.ae"
const ALL_LANGS = ["en", "ar", "ur"]

export default function HreflangTags() {
  const { lang } = useParams()
  const location = useLocation()

  // Remove current lang prefix from path to get the "canonical" resource path
  // e.g., /en/about or /ar/about -> /about
  const barePath = lang
    ? location.pathname.replace(`/${lang}`, "")
    : location.pathname

  return (
    <Helmet>
      {/* Generate alternate tags for every language */}
      {ALL_LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${BASE_URL}/${l}${barePath === "/" ? "" : barePath}`}
        />
      ))}

      {/* x-default points to the default English version */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${barePath === "/" ? "" : barePath}`}
      />
    </Helmet>
  )
}