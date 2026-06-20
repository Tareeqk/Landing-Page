import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { FaWhatsapp } from "react-icons/fa"
import "./Nasir.css"

const WHATSAPP_NUMBER = "97142232269"

export default function Nasir() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === "rtl"

  // Used to trigger the entrance animation after first paint rather than on load.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <div
      dir={i18n.dir()}
      className={`fixed bottom-4 z-50 ${isRtl ? "right-4" : "left-4"}`}
    >
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("nasir.cta", "Chat with us on WhatsApp")}
        className={`nasir-float relative block rounded-full transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 ${
          mounted ? "nasir-pop-in" : "opacity-0"
        }`}
      >
        <img
          src="/new/Nasir_Head.webp"
          alt={t(
            "nasir.avatarAlt",
            "Tareeqk car recovery Dubai support assistant"
          )}
          className="h-12 w-12 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
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
      </a>
    </div>
  )
}