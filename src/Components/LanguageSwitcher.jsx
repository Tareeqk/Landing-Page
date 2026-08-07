import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { useNavigate, useLocation } from "react-router-dom"

const LANG_PREFIXES = ["ar", "ur"] // English has no prefix

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
    { code: "ur", label: "اردو" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === i18n.language)

  const changeLang = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("i18nextLng", lng);
  document.documentElement.dir = (lng === "ar" || lng === "ur") ? "rtl" : "ltr";
  document.documentElement.lang = lng;
  setIsOpen(false);

  // 1. Get current segments, e.g., ["", "ar", "about"]
  const segments = location.pathname.split("/");
  
  // 2. Determine if the current path already has a language prefix
  const hasLangPrefix = ["en", "ar", "ur"].includes(segments[1]);

  let newPath;
  if (hasLangPrefix) {
    // Replace the existing language prefix with the new one
    // e.g., ["", "ar", "about"] -> ["", "en", "about"] -> "/en/about"
    segments[1] = lng;
    newPath = segments.join("/");
  } else {
    // No prefix found (shouldn't happen with your new App.jsx, but safe to handle)
    // e.g., "/about" -> "/en/about"
    newPath = `/${lng}${location.pathname}`;
  }

  // 3. Navigate
  navigate(newPath + location.search + location.hash);
};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 
                   px-2 py-1 text-xs
                   sm:px-3 sm:py-1.5 sm:text-sm
                   rounded-full bg-gray-100 hover:bg-gray-200 
                   transition-colors border-2 border-gray-500 
                   cursor-pointer"
      >
        <span className="font-medium">{currentLanguage?.label}</span>
        <ChevronDownIcon
          className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute end-0 mt-2 w-24 sm:w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className={`block w-full text-start px-3 py-1 text-xs sm:text-sm
                ${
                  i18n.language === lang.code
                    ? "bg-[var(--primary-yellow)] text-[var(--primary-dark-bg)]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
