import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronDown } from "lucide-react"

function useHomeFaqStyles() {
  useEffect(() => {
    if (document.getElementById("home-faq-styles")) return
    const style = document.createElement("style")
    style.id = "home-faq-styles"
    style.textContent = `
      .hfaq-section { padding: clamp(36px, 5vw, 56px) 0; background: #fff; }
      body.dark .hfaq-section { background-color: var(--dark-bg-main, #141414) !important; }

      .hfaq-container { max-width: 680px; margin: 0 auto; padding: 0 24px; }

      .hfaq-eyebrow {
        display: block; text-align: center;
        font-size: 10px; font-weight: 700; letter-spacing: 0.26em;
        text-transform: uppercase; color: var(--primary-yellow, #f5a623);
        margin-bottom: 10px;
      }
      .hfaq-title {
        text-align: center;
        font-size: clamp(1.25rem, 2.2vw, 1.6rem); font-weight: 800;
        letter-spacing: -0.02em; line-height: 1.15;
        color: #0a0a0a; margin: 0 0 8px;
      }
      body.dark .hfaq-title { color: var(--dark-text-main, #f0f0f0) !important; }
      .hfaq-subtitle {
        text-align: center; color: #6b6b6b; font-size: 13px; line-height: 1.6;
        max-width: 480px; margin: 0 auto 26px;
      }
      body.dark .hfaq-subtitle { color: var(--dark-text-muted, #aaa) !important; }

      .hfaq-item {
        background: #fff; border: 1.5px solid rgba(0,0,0,0.08); border-radius: 12px;
        padding: 6px 18px; margin-bottom: 12px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .hfaq-item:hover { border-color: rgba(245,166,35,0.4); }
      body.dark .hfaq-item {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }

      .hfaq-q {
        width: 100%; text-align: left; padding: 12px 0;
        background: none; border: none; cursor: pointer;
        display: flex; justify-content: space-between; align-items: center; gap: 14px;
        font-size: 13px; font-weight: 700; color: #0a0a0a; font-family: inherit;
      }
      [dir="rtl"] .hfaq-q { text-align: right; }
      body.dark .hfaq-q { color: var(--dark-text-main, #f0f0f0) !important; }

      .hfaq-q-icon {
        color: var(--primary-yellow, #c9860f); flex-shrink: 0;
        transition: transform 0.25s ease;
      }
      .hfaq-item.open .hfaq-q-icon { transform: rotate(180deg); }

      .hfaq-a {
        overflow: hidden; max-height: 0; transition: max-height 0.3s ease;
      }
      .hfaq-item.open .hfaq-a { max-height: 300px; }
      .hfaq-a-inner {
        padding-bottom: 14px; color: #5c5c5c; line-height: 1.6; font-size: 12.5px;
      }
      body.dark .hfaq-a-inner { color: var(--dark-text-muted, #aaa) !important; }

      @media (max-width: 640px) {
        .hfaq-container { padding: 0 20px; }
        .hfaq-item { padding: 4px 16px; }
      }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById("home-faq-styles")
      if (el) el.remove()
    }
  }, [])
}

const FAQS = [
  {
    q: "How fast can Tareeqk reach me in Dubai?",
    a: "Our average response time is 15–20 minutes anywhere in Dubai. Once you request help via the app, call, or WhatsApp, the nearest certified unit is dispatched immediately.",
  },
  {
    q: "What services does Tareeqk offer?",
    a: "Car recovery, towing, battery boost & replacement, flat tyre repair, accident recovery, fuel delivery, desert recovery, and bike recovery — all available across Dubai.",
  },
  {
    q: "Is Tareeqk available 24/7?",
    a: "Yes. We operate around the clock, every day of the year, including weekends and public holidays.",
  },
  {
    q: "Is your pricing transparent?",
    a: "Yes. You see an upfront price in the Tareeqk app before we dispatch — no hidden fees or surprise charges.",
  },
  {
    q: "How do I book a recovery or roadside service?",
    a: "Open the Tareeqk app, call our hotline, or message us on WhatsApp with your location — whichever is fastest for you.",
  },
  {
    q: "Are your operators licensed and insured?",
    a: "Yes. Tareeqk is an RTA-licensed operator, and all recovery trucks and technicians are fully insured.",
  },
]

export default function HomeFAQ() {
  const { i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"
  useHomeFaqStyles()

  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="hfaq-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="hfaq-container">
        <span className="hfaq-eyebrow">FAQ</span>
        <h2 className="hfaq-title">Frequently Asked Questions</h2>
        <p className="hfaq-subtitle">
          Quick answers about how Tareeqk works, our coverage, and what to expect when you request help.
        </p>

        <div>
          {FAQS.map((faq, i) => (
            <div key={i} className={`hfaq-item${openIndex === i ? " open" : ""}`}>
              <button
                className="hfaq-q"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.q}</span>
                <ChevronDown size={16} className="hfaq-q-icon" />
              </button>
              <div className="hfaq-a">
                <div className="hfaq-a-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
