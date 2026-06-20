// hooks/useLangLink.js
import { useParams, useLocation } from "react-router-dom"

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
    
    // 4. Return the new URL with the current language (or logic to inject new lang)
    return `/${lang}${normalized === "/" ? "" : normalized}`
  }
}