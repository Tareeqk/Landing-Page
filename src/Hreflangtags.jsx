// Components/HreflangTags.jsx
import { Helmet } from "react-helmet-async"
import { useParams, useLocation } from "react-router-dom"

const BASE_URL = "https://tareeqk.ae" // canonical domain — keep in sync with public/sitemap.xml and schemas/LocalBusinessSchema.jsx
const ALL_LANGS = ["en", "ar", "ur"]

export default function HreflangTags() {
  const { lang } = useParams()
  const location = useLocation()

  // Remove current lang prefix from path to get the "canonical" resource path
  // e.g., /en/about or /ar/about -> /about
  const rawBarePath = lang
    ? location.pathname.replace(`/${lang}`, "")
    : location.pathname

  // Trailing slash -- matches the live host's redirect behavior (every
  // route is a real directory). Normalized here (rather than trusting
  // location.pathname's current slash state) so the emitted hreflang URLs
  // are always in canonical form regardless of how this page was reached.
  // Always starts with "/", so it can be appended directly below.
  const trimmed = rawBarePath.replace(/\/+$/, "")
  const barePath = trimmed ? `${trimmed}/` : "/"

  return (
    <Helmet>
      {/* Generate alternate tags for every language */}
      {ALL_LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${BASE_URL}/${l}${barePath}`}
        />
      ))}

      {/* x-default points to the default English version */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/en${barePath}`}
      />
    </Helmet>
  )
}