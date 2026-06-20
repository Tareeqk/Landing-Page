
import React from "react"
import { useTranslation } from "react-i18next"

export default function CJI() {
  const { t, i18n } = useTranslation()
  const isUrdu = i18n.language === "ur"

  return (
    <section className="py-8 lg:py-5 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          data-aos="fade-up"
          className={`text-center mb-12 ${
            isUrdu ? "leading-loose" : ""
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ✨   Meet Nasir
          </span>

        
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Side */}
          <div
            data-aos="fade-right"
            className="bg-white rounded-3xl border border-gray-100  p-8 flex flex-col justify-center"
          >
            {/* Robot + Text */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-yellow-300/20 blur-2xl rounded-full" />

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/new/Sajin.webm"
                  className="relative w-24 md:w-28"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Smarter Roads Start Here
                </h3>

                <p
                  className={`text-gray-600 leading-relaxed ${
                    isUrdu ? "leading-loose" : ""
                  }`}
                >
                  Meet Nasir, your AI-powered roadside assistant. Get
                  instant support, live vehicle tracking and rapid
                  recovery dispatch whenever you need help.
                </p>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium">
                ⚡ Instant Responses
              </span>

              <span className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium">
                🌍 Arabic & English
              </span>

              <span className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium">
                🚚 Dispatch Support
              </span>

              <span className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium">
                📍 Live Tracking
              </span>
            </div>

          </div>

          {/* Video Side */}
          <div
            id="nasir-video"
            data-aos="fade-left"
            className="relative overflow-hidden rounded-3xl border border-gray-100 shadow-lg bg-white"
          >
            {/* Badge */}
            <div className="absolute top-4 left-4 z-20 bg-white shadow-md px-4 py-2 rounded-full text-sm font-medium">
              ▶ Watch Nasir in Action
            </div>

            <div className="aspect-video w-full h-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dIX_NmPE2rs"
                title="Meet Nasir"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
