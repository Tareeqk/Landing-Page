// hooks/useLangLink.js
import { useParams, useLocation } from "react-router-dom"

// Every route on the live host is a prerendered directory (dist/en/about/),
// and the server 301s any request without a trailing slash to the slashed
// form. The canonical, hreflang and sitemap URLs all use the slashed form,
// so internal links must too -- otherwise each internal click/crawl costs a
// redirect hop and the link target differs from the canonical URL.
//
// Splits off ?query and #hash first so "/#contact" becomes "/en/#contact"
// rather than "/en#contact/".
function withTrailingSlash(path) {
  const match = path.match(/^([^?#]*)(.*)$/)
  const pathname = match[1]
  const suffix = match[2]
  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`
  return `${slashed}${suffix}`
}

export default function useLangLink() {
  const { lang } = useParams()
  const location = useLocation()

  return (path) => {
    // 1. Get the "clean" path without the current language
    const currentPath = location.pathname
    const baseWithoutLang = lang
      ? currentPath.replace(`/${lang}`, "")
      : currentPath

    // 2. If the user provides a path, use it;
    // otherwise, we are just switching language on the current page
    const targetPath = path || baseWithoutLang

    // 3. Ensure we don't have double slashes
    const normalized = targetPath.startsWith("/") ? targetPath : `/${targetPath}`

    // 4. Return the new URL with the current language and a trailing slash
    // ("/" -> "/en/", "/about" -> "/en/about/", "/#contact" -> "/en/#contact").
    return withTrailingSlash(`/${lang}${normalized}`)
  }
}
