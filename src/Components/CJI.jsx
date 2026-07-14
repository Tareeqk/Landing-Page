import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Sparkles, Zap, Globe2, Truck, MapPin, Play } from "lucide-react"

// This component was built with plain Tailwind utility classes only
// (bg-white, text-gray-900, etc.) with no dark-mode handling at all, so it
// stayed a bright white panel regardless of the site-wide dark toggle. The
// rest of the codebase doesn't use Tailwind's `dark:` variant (it isn't
// configured) — every other section instead injects a <style> block with
// `body.dark .foo { ... !important }` overrides keyed off `body.dark` (set
// by App.jsx). This follows that same convention instead of introducing a
// second, inconsistent dark-mode mechanism.
function useCjiStyles() {
  useEffect(() => {
    if (document.getElementById("cji-styles")) return
    const style = document.createElement("style")
    style.id = "cji-styles"
    style.textContent = `
      body.dark .cji-section { background-image: linear-gradient(to bottom, var(--dark-bg-main, #141414), var(--dark-bg-main, #141414)) !important; }
      body.dark .cji-badge {
        background-color: rgba(245,166,35,0.14) !important;
        color: var(--primary-yellow, #f5a623) !important;
        box-shadow: none !important;
      }
      body.dark .cji-heading { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .cji-desc { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .cji-video-wrap {
        background-color: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .cji-feature-pill {
        background-color: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
        color: var(--dark-text-main, #eee) !important;
      }
      body.dark .cji-feature-icon {
        background-color: rgba(245,166,35,0.14) !important;
        color: var(--primary-yellow, #f5a623) !important;
      }

      /* Circular frame around the Nasir avatar clip — a bare rectangular
         <video> tag with no border/shadow read as an unstyled blob (and a
         stray bg-white utility on the glow behind it was fully opaque,
         hiding the amber glow entirely). Fixed square box + object-cover
         keeps the circle true regardless of the source video's aspect
         ratio. */
      .cji-avatar-glow {
        background: radial-gradient(circle, rgba(245,166,35,0.45) 0%, transparent 72%);
        filter: blur(10px);
        animation: cji-glow-pulse 3.2s ease-in-out infinite;
      }
      @keyframes cji-glow-pulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
      }
      @media (prefers-reduced-motion: reduce) {
        .cji-avatar-glow { animation: none; }
      }
      .cji-avatar-ring {
        border: 3px solid #fff;
        box-shadow: 0 10px 26px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06);
      }
      body.dark .cji-avatar-ring {
        border-color: var(--dark-bg-surface, #1e1e1e);
        box-shadow: 0 10px 26px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
      }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById("cji-styles")
      if (el) el.remove()
    }
  }, [])
}

export default function CJI() {
  const { t, i18n } = useTranslation()
  const isUrdu = i18n.language === "ur"
  const isRTL = i18n.dir() === "rtl"
  useCjiStyles()

  const FEATURES = [
    { icon: Zap, label: t("cji.features.instantResponses") },
    { icon: Globe2, label: t("cji.features.instantBooking") },
    { icon: Truck, label: t("cji.features.fastDispatch") },
    { icon: MapPin, label: t("cji.features.liveTracking") },
  ]

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="cji-section py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          className={`text-center mb-8 sm:mb-10 ${isUrdu ? "leading-loose" : ""}`}
        >
          <span className="cji-badge inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ring-1 ring-amber-200/60">
            <Sparkles className="w-4 h-4" />
            {t("cji.badge")}
          </span>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {/* Left Side */}
          <div
            data-aos="fade-right"
            className=" rounded-xl   p-6 sm:p-8 flex flex-col justify-center"
          >
            {/* Robot + Text */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative shrink-0 w-24 h-24 md:w-28 md:h-28">
                <div className="cji-avatar-glow absolute -inset-2 rounded-full" aria-hidden="true" />

                <div className="cji-avatar-ring relative w-full h-full rounded-full overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/new/NASIRWAVING.mp4"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="cji-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {t("cji.heading")}
                </h3>

                <p
                  className={`cji-desc text-gray-600 leading-relaxed text-[15px] sm:text-base ${
                    isUrdu ? "leading-loose" : ""
                  }`}
                >
                  {t("cji.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Video Side */}
          <div
            id="nasir-video"
            data-aos="fade-left"
            className="cji-video-wrap relative overflow-hidden rounded-3xl border border-gray-100 shadow-lg bg-white"
          >


            <div className="aspect-video w-full h-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dIX_NmPE2rs"
                title={t("cji.videoTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Feature Pills — full section width so all four fit on one row
            on desktop (they were confined to the half-width left card
            before and wrapped onto two lines); a 2-column grid on mobile
            instead of wrapping unevenly. */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-2 sm:flex sm:flex-nowrap sm:justify-center gap-3 sm:gap-4 mt-5 sm:mt-7"
        >
          {FEATURES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="cji-feature-pill group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-3 sm:py-2.5 rounded-2xl sm:rounded-full bg-white border border-gray-100 shadow-sm text-[12.5px] sm:text-sm font-semibold text-gray-800 whitespace-normal sm:whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300"
            >
              <span className="cji-feature-icon flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 shrink-0 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-black">
                <Icon className="w-4 h-4" />
              </span>
              <span className="leading-tight">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}