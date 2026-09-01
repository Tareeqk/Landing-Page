import { Helmet } from "react-helmet-async"

const LANGS = ["en", "ar", "ur"]
const DOMAIN = "https://tareeqk.ae"

// Emits rel="alternate" hreflang links for every language variant of the
// current page, plus x-default. Without these, search engines have no
// signal that /en/service, /ar/service, /ur/service are the same page in
// three languages — each can get treated as separate, weaker, or even
// duplicate content instead of being offered to the right-language searcher.
//
// `path` is the route segment AFTER the language prefix, no leading slash
// (e.g. "" for the homepage, "about", "car-recovery-dubai-marina").
export default function HreflangTags({ path = "" }) {
  // Trailing slash -- matches the live host's redirect behavior (every
  // route is a real directory, and a request without the trailing slash
  // gets 301'd to the slashed form). See the matching comment in
  // scripts/site-routes.mjs.
  const suffix = path ? `/${path}/` : "/"

  return (
    <Helmet>
      {LANGS.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${DOMAIN}/${lang}${suffix}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${DOMAIN}/en${suffix}`} />
    </Helmet>
  )
}
