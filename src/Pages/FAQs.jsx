import axios from "axios"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import HreflangTags from "../Components/HreflangTags"
import FAQSchema from "../schemas/FAQSchema"

// FAQSchema needs plain text; faq.answer is CMS-sourced innerHTML.
function stripHtml(html) {
  if (!html) return ""
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent?.trim() || ""
}

export default function FAQs() {
  const { t, i18n } = useTranslation()
  const { lang } = useParams()
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [openIndexs, setOpenIndexs] = useState([])
  const baseUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    async function fetchFAQs() {
      const response = await axios.get(
        `${baseUrl}/pages?slug=faqs&lang=${i18n.language}`,
      )
      const htmlString = response.data.html

      // Convert the HTML into question/answer pairs
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, "text/html")
      const cards = Array.from(doc.querySelectorAll(".card"))
      const faqItems = cards.map((card) => {
        const question = card.querySelector("button")?.textContent.trim()
        const answer = card.querySelector(".card-body")?.innerHTML.trim()
        return { question, answer }
      })
      setLoading(false)
      setFaqs(faqItems)
    }

    fetchFAQs()
  }, [i18n.language, baseUrl])

  const toggleAccordion = (index) => {
    if (openIndexs.includes(index)) {
      setOpenIndexs(openIndexs.filter((i) => i !== index))
    } else {
      setOpenIndexs([...openIndexs, index])
    }
  }
  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t("meta.faqs.title")}</title>
        <meta name="description" content={t("meta.faqs.description")} />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/faq`} />
        <meta property="og:title" content={t("meta.faqs.title")} />
        <meta property="og:description" content={t("meta.faqs.description")} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tareeqk.ae/${lang}/faq`} />
        <meta property="og:image" content="https://tareeqk.ae/new/second_img.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("meta.faqs.title")} />
        <meta name="twitter:description" content={t("meta.faqs.description")} />
        <meta name="twitter:image" content="https://tareeqk.ae/new/second_img.webp" />
      </Helmet>
      <HreflangTags path="faq" />
      <FAQSchema faqs={faqs.map((f) => ({ question: f.question, answer: stripHtml(f.answer) }))} />
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(280px, 38vw, 380px)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
          padding: "128px 20px 44px",
          boxSizing: "border-box",
        }}
      >
        <img
          src="/new/second_img.webp"
          alt="FAQs"
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
        <div style={{ position: "relative", zIndex: 1, maxWidth: "640px" }}>
          <span
            data-aos="fade-up"
            style={{
              display: "inline-block", fontSize: "10px", fontWeight: 700,
              letterSpacing: "0.28em", textTransform: "uppercase",
              color: "var(--primary-yellow)", marginBottom: "14px",
            }}
          >
            Help Center
          </span>
          <h1
            data-aos="fade-up"
            style={{
              fontSize: "clamp(1.7rem, 5vw, 2.6rem)", fontWeight: 800,
              letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 12px",
            }}
          >
            {t("faqs.title")}
          </h1>
          <p
            data-aos="fade-up"
            style={{ fontSize: "clamp(13.5px, 2vw, 16px)", lineHeight: 1.6 }}
            className="text-gray-300"
          >
            {t("faqs.subtitle")}
          </p>
        </div>
      </section>

      <div className="space-y-3 max-w-3xl mx-auto my-4 px-4 sm:px-0" id="faqAccordion">
        {loading ? (
          <p>Loading...</p>
        ) : (
          faqs.map((faq, idx) => {
            const open = openIndexs.includes(idx)
            return (
              <div
                data-aos="fade-up"
                key={idx}
                className="border rounded-xl overflow-hidden bg-white transition-colors"
                style={{ borderColor: open ? "var(--primary-yellow)" : "rgba(0,0,0,0.1)" }}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={open}
                  className="w-full text-left px-4 py-3.5 hover:bg-gray-50 flex justify-between items-center gap-3 cursor-pointer"
                >
                  <span className="text-[14.5px] sm:text-base font-medium">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: "var(--primary-yellow)",
                      transform: open ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
                <div
                  className={`transition-max-h duration-400 overflow-hidden ${open ? "max-h-96" : "max-h-0"}`}
                >
                  <div
                    className="px-4 py-3 text-[13.5px] sm:text-base text-gray-600"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}
