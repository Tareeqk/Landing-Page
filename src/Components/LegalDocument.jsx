import { useEffect, useRef, useState, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"
import { Phone, Mail, ChevronDown } from "lucide-react"
import HreflangTags from "./HreflangTags"

// NOTE: this codebase sets `overflow-x: hidden` on both `html` and `body`
// (src/index.css). Per the CSS overflow spec, setting overflow-x to a
// non-visible value forces the paired overflow-y to compute as `auto`
// instead of `visible` on that same box — which silently turns html/body
// into a second scroll-containing block. `position: sticky` descendants
// then resolve against that unintended containing block instead of the
// viewport, and simply never stick. Rather than touch the global
// html/body rule (site-wide blast radius, was very likely added
// deliberately to kill a horizontal-scroll bug elsewhere), both nav
// affordances below are pinned with real `position: fixed`, driven by a
// scroll listener that measures a static in-flow anchor element each
// tick — the classic pre-`position:sticky` technique, and immune to the
// overflow quirk because fixed positioning only cares about transformed
// ancestors (there are none here), not scroll containers.

const DESKTOP_TOP = 96
const MOBILE_TOP = 64

// Simple two-state pin (used by the mobile jump bar): off while above its
// natural position, fixed to the viewport top once scrolled past it.
function useFixedAside(topOffset, { horizontal = true } = {}) {
  const slotRef = useRef(null)
  const [box, setBox] = useState({ fixed: false, left: 0, right: 0, width: 0, top: 0 })

  const measure = useCallback(() => {
    const el = slotRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const isRTL = document.documentElement.dir === "rtl"
    const fixed = rect.top <= topOffset
    setBox({
      fixed,
      left: horizontal && !isRTL ? Math.round(rect.left) : 0,
      right: horizontal && isRTL ? Math.round(window.innerWidth - rect.right) : 0,
      width: horizontal ? Math.round(rect.width) : 0,
      top: topOffset,
    })
  }, [topOffset, horizontal])

  useEffect(() => {
    measure()
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  return { slotRef, ...box }
}

// Three-state pin for the desktop sidebar: sits in-flow until the page
// scrolls it to `topOffset`, then follows the viewport (`fixed`), then —
// once the (much taller) content column's bottom edge is about to pass
// under it — switches to `position: absolute` pinned to the bottom of its
// own slot, so it rides down with the content and never overlaps the
// footer that follows. `slot` is a grid item stretched to the full row
// height (`.lgl-toc-slot`), so its own rect never moves regardless of the
// nav's positioning mode inside it — a stable measurement anchor.
function useFooterAwareAside(topOffset) {
  const slotRef = useRef(null)
  const navRef = useRef(null)
  const [state, setState] = useState({ mode: "static", left: 0, right: 0, width: 0, top: 0 })

  const measure = useCallback(() => {
    const slot = slotRef.current
    const nav = navRef.current
    if (!slot || !nav) return
    const slotRect = slot.getBoundingClientRect()
    const navHeight = nav.offsetHeight
    const isRTL = document.documentElement.dir === "rtl"

    let mode = "static"
    if (slotRect.top <= topOffset) {
      mode = slotRect.bottom - navHeight > topOffset ? "fixed" : "bottom"
    }

    setState({
      mode,
      left: !isRTL ? Math.round(slotRect.left) : 0,
      right: isRTL ? Math.round(window.innerWidth - slotRect.right) : 0,
      width: Math.round(slotRect.width),
      top: topOffset,
    })
  }, [topOffset])

  useEffect(() => {
    measure()
    window.addEventListener("scroll", measure, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("scroll", measure)
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  return { slotRef, navRef, ...state }
}

function useLegalPageStyles() {
  useEffect(() => {
    if (document.getElementById("legal-page-styles")) return
    const style = document.createElement("style")
    style.id = "legal-page-styles"
    style.textContent = `
      .lgl-layout {
        max-width: 1180px; margin: 0 auto;
        padding: 48px 24px 80px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 40px;
      }
      @media (min-width: 1040px) {
        .lgl-layout { grid-template-columns: 220px 1fr; gap: 56px; }
      }

      .lgl-toc-slot { display: none; }
      @media (min-width: 1040px) {
        /* stretches to the full row height (matching the content column)
           so its rect is a stable anchor, and so bottom:0 on the pinned
           nav lands exactly at the end of the content, not the viewport */
        .lgl-toc-slot { display: block; position: relative; height: 100%; }
      }
      .lgl-toc { width: 220px; z-index: 20; }
      .lgl-toc-label {
        font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
        color: #9a9a9a; margin: 0 0 14px;
      }
      body.dark .lgl-toc-label { color: var(--dark-text-muted) !important; }
      .lgl-toc-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; max-height: calc(100vh - 160px); overflow-y: auto; }
      .lgl-toc-link {
        display: block; padding: 7px 10px; border-radius: 8px;
        font-size: 12.5px; line-height: 1.4; color: #5c5c5c; text-decoration: none;
        border-inline-start: 2px solid transparent;
        transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
      }
      .lgl-toc-link:hover { color: #0a0a0a; background: rgba(247,178,5,0.08); border-inline-start-color: var(--primary-yellow); }
      body.dark .lgl-toc-link { color: var(--dark-text-muted) !important; }
      body.dark .lgl-toc-link:hover { color: var(--dark-text-main) !important; background: rgba(247,178,5,0.1); }

      /* mobile jump-to-section bar */
      .lgl-mnav-slot { display: block; }
      @media (min-width: 1040px) { .lgl-mnav-slot { display: none; } }
      .lgl-mnav {
        background: #fff; border-bottom: 1px solid rgba(0,0,0,0.08);
        box-shadow: 0 4px 14px rgba(17,24,39,0.05);
      }
      .lgl-mnav.is-fixed { position: fixed; left: 0; right: 0; z-index: 30; }
      body.dark .lgl-mnav { background: var(--dark-bg-surface) !important; border-color: var(--dark-border) !important; }
      .lgl-mnav-btn {
        width: 100%; display: flex; align-items: center; justify-content: space-between;
        gap: 10px; padding: 12px 20px; background: none; border: none; font-family: inherit;
        font-size: 12.5px; font-weight: 700; letter-spacing: 0.04em; color: #0a0a0a; cursor: pointer;
      }
      body.dark .lgl-mnav-btn { color: var(--dark-text-main) !important; }
      .lgl-mnav-btn svg { color: var(--primary-yellow); transition: transform 0.2s ease; flex-shrink: 0; }
      .lgl-mnav-panel {
        max-height: 60vh; overflow-y: auto;
        border-top: 1px solid rgba(0,0,0,0.06);
        padding: 6px 8px;
      }
      body.dark .lgl-mnav-panel { border-color: var(--dark-border) !important; }
      .lgl-mnav-panel a {
        display: block; padding: 10px 12px; border-radius: 8px;
        font-size: 13px; color: #4a4a4a; text-decoration: none;
      }
      .lgl-mnav-panel a:active { background: rgba(247,178,5,0.1); }
      body.dark .lgl-mnav-panel a { color: var(--dark-text-muted) !important; }

      .lgl-content { min-width: 0; }
      .lgl-section { padding-top: 8px; margin-bottom: 40px; scroll-margin-top: 112px; }
      .lgl-section-title {
        font-size: clamp(1.05rem, 2vw, 1.25rem); font-weight: 800; letter-spacing: -0.01em;
        color: #0a0a0a; margin: 0 0 14px;
      }
      body.dark .lgl-section-title { color: var(--dark-text-main) !important; }

      .lgl-p { font-size: 14.5px; line-height: 1.75; color: #4a4a4a; margin: 0 0 12px; }
      body.dark .lgl-p { color: var(--dark-text-muted) !important; }

      .lgl-h3 { font-size: 13.5px; font-weight: 700; color: #0a0a0a; margin: 18px 0 8px; }
      body.dark .lgl-h3 { color: var(--dark-text-main) !important; }

      .lgl-list { list-style: none; margin: 0 0 12px; padding: 0; display: flex; flex-direction: column; gap: 8px; }
      .lgl-list li { font-size: 14.5px; line-height: 1.65; color: #4a4a4a; padding-inline-start: 20px; position: relative; }
      body.dark .lgl-list li { color: var(--dark-text-muted) !important; }
      .lgl-list li::before {
        content: ""; position: absolute; inset-inline-start: 0; top: 8px;
        width: 6px; height: 6px; border-radius: 50%; background: var(--primary-yellow);
      }

      .lgl-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 40px 0; }
      body.dark .lgl-divider { background: var(--dark-border) !important; }

      .lgl-contact-card {
        background: var(--primary-dark-bg, #121212); border-radius: 18px; padding: 26px 24px;
        display: flex; flex-direction: column; gap: 14px; margin-top: 8px;
      }
      .lgl-contact-row { display: flex; align-items: center; gap: 12px; text-decoration: none; }
      .lgl-contact-icon {
        flex-shrink: 0; width: 34px; height: 34px; border-radius: 10px;
        background: rgba(247,178,5,0.14); display: flex; align-items: center; justify-content: center;
        color: var(--primary-yellow);
      }
      .lgl-contact-text { display: flex; flex-direction: column; }
      .lgl-contact-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.14em; color: #9a9a9a; }
      .lgl-contact-value { font-size: 13.5px; font-weight: 700; color: #fff; }

      @media (max-width: 1039px) {
        .lgl-layout { padding: 16px 20px 60px; gap: 28px; }
        .lgl-section { margin-bottom: 32px; }
      }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById("legal-page-styles")
      if (el) el.remove()
    }
  }, [])
}

function renderBlock(block, idx) {
  if (block.type === "h3") return <h3 key={idx} className="lgl-h3">{block.text}</h3>
  if (block.type === "list") {
    return (
      <ul key={idx} className="lgl-list">
        {block.items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    )
  }
  return <p key={idx} className="lgl-p">{block.text}</p>
}

function DesktopToc({ sections, tocLabel }) {
  const { slotRef, navRef, mode, left, right, width, top } = useFooterAwareAside(DESKTOP_TOP)
  const isRTL = document.documentElement.dir === "rtl"

  const style =
    mode === "fixed"
      ? { position: "fixed", top, width, [isRTL ? "right" : "left"]: isRTL ? right : left }
      : mode === "bottom"
      ? { position: "absolute", bottom: 0, width, [isRTL ? "right" : "left"]: 0 }
      : undefined

  return (
    <div className="lgl-toc-slot" ref={slotRef}>
      <nav ref={navRef} className="lgl-toc" style={style} aria-label={tocLabel}>
        <p className="lgl-toc-label">{tocLabel}</p>
        <ul className="lgl-toc-list">
          {sections.map((section, i) => (
            <li key={i}>
              <a className="lgl-toc-link" href={`#legal-section-${i}`}>{section.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function MobileJumpNav({ sections, tocLabel }) {
  const { slotRef, fixed, top } = useFixedAside(MOBILE_TOP, { horizontal: false })
  const barRef = useRef(null)
  const [open, setOpen] = useState(false)
  // Measured once from the closed bar (mount is always closed) and kept
  // constant afterwards — this is the slot's reserved height, so the
  // in-flow bar never overlaps the section below it, and nothing jumps
  // when the bar switches to position: fixed. The dropdown panel only
  // ever opens while `fixed` is true, where it overlays in its own
  // fixed-position box and doesn't affect this reserved height at all.
  const [barHeight, setBarHeight] = useState(0)

  useEffect(() => {
    if (barRef.current) setBarHeight(barRef.current.offsetHeight)
  }, [])

  useEffect(() => {
    if (!fixed) setOpen(false)
  }, [fixed])

  return (
    <div className="lgl-mnav-slot" ref={slotRef} style={{ height: barHeight || undefined }}>
      <div
        ref={barRef}
        className={`lgl-mnav${fixed ? " is-fixed" : ""}`}
        style={fixed ? { top } : undefined}
      >
        <button className="lgl-mnav-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          <span>{tocLabel}</span>
          <ChevronDown size={16} style={{ transform: open ? "rotate(180deg)" : "none" }} />
        </button>
        {open && (
          <div className="lgl-mnav-panel">
            {sections.map((section, i) => (
              <a key={i} href={`#legal-section-${i}`} onClick={() => setOpen(false)}>
                {section.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function LegalDocument({ namespace, heroImage = "/new/second_img.webp", heroAlt = "Tareeqk roadside recovery" }) {
  const { t, i18n } = useTranslation()
  const { lang } = useParams()
  useLegalPageStyles()

  const isRTL = i18n.language === "ar" || i18n.language === "ur"
  const sections = t(`${namespace}.sections`, { returnObjects: true, defaultValue: [] })
  const tocLabel = t(`${namespace}.tocLabel`, "On This Page")
  const path = namespace === "policy" ? "privacy-policy" : "terms"

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t(`${namespace}.title`)} | Tareeqk</title>
        <meta name="description" content={t(`${namespace}.subtitle`)} />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/${path}`} />
      </Helmet>
      <HreflangTags path={path} />
      <section
        style={{
          position: "relative", width: "100%", minHeight: "clamp(280px, 38vw, 380px)",
          overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center",
          color: "#fff", textAlign: "center", padding: "128px 20px 44px", boxSizing: "border-box",
        }}
      >
        <img
          src={heroImage}
          alt={heroAlt}
          loading="eager"
          style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            objectFit: "cover", filter: "brightness(0.35)",
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
            Legal
          </span>
          <h1
            data-aos="fade-up"
            style={{ fontSize: "clamp(1.7rem, 5vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 12px" }}
          >
            {t(`${namespace}.title`)}
          </h1>
          <p data-aos="fade-up" style={{ fontSize: "clamp(13.5px, 2vw, 16px)", lineHeight: 1.6 }} className="text-gray-300">
            {t(`${namespace}.subtitle`)}
          </p>
        </div>
      </section>

      <MobileJumpNav sections={sections} tocLabel={tocLabel} />

      <div className="lgl-layout" dir={isRTL ? "rtl" : "ltr"}>
        <DesktopToc sections={sections} tocLabel={tocLabel} />

        <div className="lgl-content" data-legal-content-bounds>
          {sections.map((section, i) => (
            <div key={i} id={`legal-section-${i}`} className="lgl-section" data-aos="fade-up">
              <h2 className="lgl-section-title">{section.title}</h2>
              {section.blocks?.map((block, bi) => renderBlock(block, bi))}
            </div>
          ))}

          <div className="lgl-divider" />

          <div className="lgl-contact-card" data-aos="fade-up">
            <p className="lgl-toc-label" style={{ color: "var(--primary-yellow)", marginBottom: 0 }}>
              {t(`${namespace}.contactLabel`, "Questions?")}
            </p>
            <a className="lgl-contact-row" href="mailto:info@tareeqk.ae">
              <span className="lgl-contact-icon"><Mail size={16} /></span>
              <span className="lgl-contact-text">
                <span className="lgl-contact-label">Email</span>
                <span className="lgl-contact-value">info@tareeqk.ae</span>
              </span>
            </a>
            <a className="lgl-contact-row" href="tel:+97142232269">
              <span className="lgl-contact-icon"><Phone size={16} /></span>
              <span className="lgl-contact-text">
                <span className="lgl-contact-label">Phone</span>
                <span className="lgl-contact-value" dir="ltr">+971 4 223 2269</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
