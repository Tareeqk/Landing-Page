// hooks/useLangLink.js
// Use this instead of hardcoding /${lang} in every Link and navigate() call
//
// Usage:
//   const langLink = useLangLink()
//   <Link to={langLink('/about')}>About</Link>
//   <Link to={langLink('/blogs')}>Blogs</Link>
//
// Instead of:
//   <Link to={`/${lang}/about`}>About</Link>

import { useParams } from "react-router-dom"

export default function useLangLink() {
  const { lang } = useParams()

  return (path) => {
    // Normalize: ensure path starts with /
    const normalized = path.startsWith("/") ? path : `/${path}`
    return `/${lang}${normalized}`
  }
}
