import React from "react"
import { useTranslation } from "react-i18next"
import { Sparkles, Zap, Globe2, Truck, MapPin, Play } from "lucide-react"

export default function CJI() {
  const { t, i18n } = useTranslation()
  const isUrdu = i18n.language === "ur"
  const isRTL = i18n.dir() === "rtl"

  const FEATURES = [
    { icon: Zap, label: t("cji.features.instantResponses") },
    { icon: Globe2, label: t("cji.features.instantBooking") },
    { icon: Truck, label: t("cji.features.fastDispatch") },
    { icon: MapPin, label: t("cji.features.liveTracking") },
  ]

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          className={`text-center mb-8 sm:mb-10 ${isUrdu ? "leading-loose" : ""}`}
        >
          <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ring-1 ring-amber-200/60">
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
              <div className="relative shrink-0">
                <div className="absolute inset-0 blur-2xl rounded-full bg-amber-200/30" />

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/new/Sajin.webm"
                  className="relative w-24 md:w-28"
                />
              </div>

              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {t("cji.heading")}
                </h3>

                <p
                  className={`text-gray-600 leading-relaxed text-[15px] sm:text-base ${
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
            className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-lg bg-white"
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
              className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-3 sm:py-2.5 rounded-2xl sm:rounded-full bg-white border border-gray-100 shadow-sm text-[12.5px] sm:text-sm font-semibold text-gray-800 whitespace-normal sm:whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-amber-300"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700 shrink-0 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-black">
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