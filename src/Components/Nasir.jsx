import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaWhatsapp } from "react-icons/fa"
import "./Nasir.css"

const WHATSAPP_NUMBER = "97142232269"

// Hero sections on About/Service/service-detail pages are short enough that
// their second-section heading lands at y=0's bottom-left corner — right
// where this fixed widget sits — so it visually covers the heading and
// creates a competing tap target on first paint. Keeping the widget hidden
// until the page has actually been scrolled avoids every verified overlap
// case without needing per-page exclusion zones.
const SCROLL_REVEAL_THRESHOLD = 260

export default function Nasir() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === "rtl"

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_REVEAL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const visible = mounted && scrolled
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <div
      dir={i18n.dir()}
      className={`fixed bottom-4 z-50 ${isRtl ? "right-4" : "left-4"} ${
        visible ? "" : "pointer-events-none"
      }`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("nasir.cta", "Chat with us on WhatsApp")}
        tabIndex={visible ? 0 : -1}
        className={`nasir-group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 rounded-full ${
          visible ? "nasir-pop-in" : "opacity-0"
        }`}
      >
        <span className="nasir-glow absolute inset-0 rounded-full" aria-hidden="true" />

        <span className="nasir-float nasir-badge relative flex items-center justify-center rounded-full">
          <img
            src="/new/Nasir_Head.webp"
            alt={t(
              "nasir.avatarAlt",
              "Tareeqk car recovery Dubai support assistant"
            )}
            className="h-11 w-11 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
            style={{ transform: isRtl ? "scaleX(-1)" : "none" }}
            loading="lazy"
          />

          {/* WhatsApp icon badge */}
          <span
            className={`absolute bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-md sm:h-7 sm:w-7 ${
              isRtl ? "left-0" : "right-0"
            }`}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
            <FaWhatsapp className="relative text-xs sm:text-sm" />
          </span>
        </span>

        <span className="nasir-tooltip">
          {t("nasir.cta", "Chat with us on WhatsApp")}
        </span>
      </a>
    </div>
  )
}