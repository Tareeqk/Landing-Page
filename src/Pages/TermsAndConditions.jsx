import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { parseHtmlSections } from "../utils/parseHtmlSections"
import { Helmet } from "react-helmet-async"

const TermsAndConditions = () => {

  const { t, i18n } = useTranslation()
  const [terms, setTerms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const baseUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    async function fetchPage() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `${baseUrl}/pages?slug=terms-conditions&lang=${i18n.language}`
        )
        const htmlString = response.data.html || response.data.content || ""
        const parsedSections = parseHtmlSections(htmlString, i18n.language)
        setTerms(parsedSections)
      } catch (err) {
        console.error("Error fetching terms:", err)
        setError("Failed to load terms and conditions. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPage()
  }, [i18n.language, baseUrl])

  const isRTL = i18n.language === "ar" || i18n.language === "ur"

  if (isLoading) {
    return <p>Loading terms...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!terms.length) {
    return <p>No terms and conditions available.</p>
  }

  return (
    <>
        <Helmet>
            <link rel="canonical" href="https://tareeqk.ae/terms" />
            <meta name="robots" content="index, follow" />
            <title>Terms Conditions </title>
          </Helmet>
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <img
          src="/new/second_img.webp"
          alt="best towing service in dubai"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.35)",
          }}
        />
        <div className="d-flex flex-column align-items-center">
          <h1
            data-aos="fade-up"
            className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2"
          >
            {t("terms.title")}
          </h1>
          <p
            data-aos="fade-up"
            style={{ fontSize: "18px", maxWidth: "600px" }}
            className="text-gray-300"
          >
            {t("terms.subtitle")}
          </p>
        </div>
      </section>
      <div
        className="container mx-auto px-4 my-20"
        style={{
          lineHeight: "1.6",
          fontSize: "16px",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left",
          wordBreak: "break-word",
        }}
      >
        {terms.map((section, idx) => (
          <div data-aos="fade-up" key={idx} style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                padding: "10px 0",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              {section.heading}
            </h2>
            <div
              className="terms-content"
              style={{
                fontFamily: isRTL
                  ? '"Noto Kufi Arabic", sans-serif'
                  : '"Manrope", sans-serif',
                marginBottom: "1rem",
              }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            {section.subSections.map((subSection, subIdx) => (
              <div
                key={subIdx}
                className="terms-content"
                style={{
                  fontFamily: isRTL
                    ? '"Noto Kufi Arabic", sans-serif'
                    : '"Manrope", sans-serif',
                  marginTop: "0.75rem",
                  marginBottom: "1rem",
                }}
                dangerouslySetInnerHTML={{ __html: subSection.content }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default TermsAndConditions
