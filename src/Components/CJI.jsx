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
      .cji-section { background: transparent; }
      .cji-panel {
        position: relative;
        border-radius: 32px;
        background: linear-gradient(180deg, #fffdf6 0%, #ffffff 55%);
        overflow: hidden;
      }
      body.dark .cji-panel {
        background: linear-gradient(180deg, var(--dark-bg-surface, #1c1c1c) 0%, var(--dark-bg-main, #121212) 60%) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
        box-shadow: 0 8px 24px -14px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,166,35,0.04) !important;
      }
      /* Faint ambient glow anchored to the corner where the avatar sits —
         the one signature atmosphere touch, kept subtle so it reads as
         depth, not decoration. */
      .cji-panel::before {
        content: "";
        position: absolute;
        top: -20%;
        left: -10%;
        width: 55%;
        height: 70%;
        background: radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 70%);
        pointer-events: none;
      }
      body.dark .cji-panel::before {
        background: radial-gradient(circle, rgba(245,166,35,0.16) 0%, transparent 70%) !important;
      }
      [dir="rtl"] .cji-panel::before { left: auto; right: -10%; }

      .cji-badge {
        position: relative;
        z-index: 1;
      }
      body.dark .cji-badge {
        background-color: rgba(245,166,35,0.14) !important;
        color: var(--primary-yellow, #f5a623) !important;
        box-shadow: none !important;
      }
      .cji-badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        animation: cji-dot-pulse 2s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .cji-badge-dot { animation: none; }
      }
      @keyframes cji-dot-pulse {
        0%, 100% { opacity: 0.4; transform: scale(0.85); }
        50% { opacity: 1; transform: scale(1.1); }
      }

      .cji-heading {
        position: relative;
        z-index: 1;
        letter-spacing: -0.5px;
      }
      body.dark .cji-heading { color: var(--dark-text-main, #f0f0f0) !important; }
      .cji-desc { position: relative; z-index: 1; }
      body.dark .cji-desc { color: var(--dark-text-muted, #aaa) !important; }

      .cji-video-wrap {
        position: relative;
        z-index: 1;
      }
      body.dark .cji-video-wrap {
        background-color: var(--dark-bg-main, #121212) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
      }

      .cji-video-badge {
        position: absolute;
        top: 14px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        z-index: 2;
        background: rgba(10,10,10,0.72);
        color: #fff;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }
      [dir="ltr"] .cji-video-badge { left: 14px; }
      [dir="rtl"] .cji-video-badge { right: 14px; }

      .cji-divider {
        border-top: 1px solid rgba(0,0,0,0.07);
      }
      body.dark .cji-divider { border-top-color: var(--dark-border, #2a2a2a) !important; }

      .cji-feature-pill {
        position: relative;
        z-index: 1;
      }
      body.dark .cji-feature-pill {
        background-color: var(--dark-bg-muted, #242424) !important;
        border-color: var(--dark-border, #2a2a2a) !important;
        color: var(--dark-text-main, #eee) !important;
      }
      body.dark .cji-feature-icon {
        background-color: rgba(245,166,35,0.14) !important;
        color: var(--primary-yellow, #f5a623) !important;
      }

      /* Circular frame around the Nasir avatar clip — a bare rectangular
         <video> tag with no border/shadow read as an unstyled blob, and
         with no explicit background the still-loading (10MB) clip showed
         as a stray white circle in dark mode before the first frame
         painted. Explicit background on the ring itself removes that
         flash regardless of load timing. */
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
        background: #fff9ec;
        border: 3px solid var(--primary-yellow, #f5a623);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
      body.dark .cji-avatar-ring {
        background: var(--dark-bg-muted, #242424) !important;
        border-color: rgba(245,166,35,0.55) !important;
        box-shadow: 0 4px 14px rgba(0,0,0,0.35) !important;
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
      className="cji-section pt-4 sm:pt-6 pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="container mx-auto px-4">
        <div className="cji-panel">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 sm:p-9 lg:p-12">
            {/* Left Side */}
            <div data-aos="fade-right">
              <span className="cji-badge inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ring-1 ring-amber-200/60 mb-5">
                <span className="cji-badge-dot" aria-hidden="true" />
                <Sparkles className="w-3.5 h-3.5" />
                {t("cji.badge")}
              </span>

              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative shrink-0 w-24 h-24 md:w-28 md:h-28 mx-auto sm:mx-0">
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

                <div className={isRTL ? "text-right sm:text-right" : "text-left"}>
                  <h3 className="cji-heading text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
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
              className="cji-video-wrap relative overflow-hidden rounded-3xl border border-gray-100 shadow-sm bg-white"
            >
              <span className="cji-video-badge rounded-full px-3 py-1.5 text-xs font-semibold">
                <Play className="w-3 h-3 fill-current" />
                {t("cji.videoBadge")}
              </span>

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

          {/* Feature Pills — full panel width so all four fit on one row
              on desktop; a 2-column grid on mobile instead of wrapping
              unevenly. A hairline divider ties them to the header above
              instead of floating in the panel's own empty space. */}
          <div
            data-aos="fade-up"
            className="cji-divider grid grid-cols-2 sm:flex sm:flex-nowrap sm:justify-center gap-3 sm:gap-4 px-6 sm:px-9 lg:px-12 py-6 sm:py-7"
          >
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <span
                key={label}
                data-aos="fade-up"
                data-aos-delay={i * 90}
                className="cji-feature-pill group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-3 sm:py-2.5 rounded-2xl sm:rounded-full bg-white border border-gray-100 text-[12.5px] sm:text-sm font-semibold text-gray-800 whitespace-normal sm:whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-amber-300"
              >
                <span className="cji-feature-icon flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 shrink-0 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-black">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="leading-tight">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
