// hooks/useLangLink.js
import { useParams } from "react-router-dom"

const LANG_PREFIXES = ["ar", "ur"] // English has no prefix

export default function useLangLink() {
  const { lang } = useParams()

  return (path) => {
    const normalized = path.startsWith("/") ? path : `/${path}`

    // If we're on an English route, lang is undefined → no prefix
    if (!lang || !LANG_PREFIXES.includes(lang)) {
      return normalized
    }

    // Arabic/Urdu → prepend the lang prefix
    return `/${lang}${normalized}`
  }
}
