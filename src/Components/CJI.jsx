import React, { useRef } from "react"
import { useTranslation } from "react-i18next"

export default function CJI() {
  const { t, i18n } = useTranslation()
  const isUrdu = i18n.language === "ur"
  const videoRef = useRef(null)

  return (
    <div className="mx-auto py-4 container w-full">
      <div
        data-aos="fade-right"
        className={`mb-4 ${isUrdu ? "leading-loose" : ""}`}
      >
        <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block my-4 span-titles">
          {t("nasir.nasir")}
        </span>

        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-medium my-2 ${isUrdu ? "leading-loose" : ""}`}
        >
          {t("nasir.title")}
        </h2>

        <p className={`text-gray-400 mb-4 ${isUrdu ? "leading-loose" : ""}`}>
          {t("nasir.subtitle")}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <div
            data-aos="fade-right"
            className={`dark-bg text-gray-400 rounded-2xl p-4 md:p-5 border border-[var(--secondary-dark-bg)] h-full w-full flex flex-col justify-between ${isUrdu ? "leading-loose" : ""}`}
          >
            <h3
              className={`text-lg md:text-xl font-semibold text-black mb-2 ${isUrdu ? "leading-loose" : ""}`}
            >
              {t("nasir.title2")}
            </h3>
            <p className={`text-gray-400 ${isUrdu ? "leading-loose" : ""}`}>
              {t("nasir.content")}
            </p>

            {/* Add margin-top here to create space */}
            <div className="mt-8">
              <div
                className="relative w-fit group overflow-visible"
                onMouseEnter={() => {
                  videoRef.current?.play()
                }}
                onMouseLeave={() => {
                  const video = videoRef.current
                  if (!video) return
                  setTimeout(() => {
                    video.pause()
                    video.currentTime = 0
                  }, 500)
                }}
              >
                {/* Robot Video */}
                <video
                  ref={videoRef}
                  src="/new/Sajin.webm"
                  muted
                  playsInline
                  preload="none"
                  className="
                  absolute left-1/2 -translate-x-1/2
                  -top-16  /* Changed from bottom-full */
                  w-40
                  opacity-0
                  -translate-y-4  /* Changed from translate-y-4 */
                  transition-all duration-500 ease-out
                  group-hover:opacity-100
                  group-hover:-translate-y-6  /* Adjusted hover position */
                  pointer-events-none
                  z-0
                "
                />

                {/* Button */}
                <button
                  className="
                    relative z-10
                    bg-black text-white
                    px-6 py-3 rounded-full
                    font-medium
                    hover:bg-gray-800
                    transition
                  "
                >
                  Meet Nasir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full lg:w-1/2 overflow-x-hidden">
          <div
            data-aos="fade-left"
            className="relative w-full h-0 overflow-hidden rounded-2xl border border-[var(--secondary-dark-bg)]"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dIX_NmPE2rs"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
