import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { getLocalizedBlogs } from "../data/blogs"
import useLangLink from "../hooks/useLangLink"

function useBlogsStyles() {
  useEffect(() => {
    if (document.getElementById("blogs-v2-styles")) return
    const style = document.createElement("style")
    style.id = "blogs-v2-styles"
    style.textContent = `
      .bl-page { background: #fff; }
      body.dark .bl-page { background: var(--dark-bg-main, #141414); }

      /* ── Hero ── */
      .bl-hero {
        position: relative;
        height: 420px;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
      }
      .bl-hero-img {
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        filter: brightness(0.55) saturate(1.05);
      }
      .bl-hero-scrim {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.35) 45%, rgba(10,10,10,0.88) 100%);
      }
      .bl-hero-inner {
        position: relative;
        z-index: 1;
        max-width: 1280px;
        margin: 0 auto;
        width: 100%;
        padding: 0 24px 48px;
      }
      .bl-hero-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: var(--primary-yellow, #f5a623);
        margin-bottom: 14px;
      }
      .bl-hero-eyebrow::before {
        content: "";
        width: 24px; height: 2px;
        background: var(--primary-yellow, #f5a623);
        border-radius: 2px;
      }
      .bl-hero-title {
        font-size: clamp(30px, 4.5vw, 52px);
        font-weight: 900;
        line-height: 1.08;
        color: #fff;
        letter-spacing: -0.02em;
        margin: 0 0 12px;
        max-width: 720px;
      }
      .bl-hero-subtitle {
        font-size: clamp(14px, 1.4vw, 17px);
        color: rgba(255,255,255,0.72);
        max-width: 620px;
        line-height: 1.6;
        margin: 0;
      }

      /* ── Mobile hero — shorter, tighter, no wasted height ── */
      @media (max-width: 640px) {
        .bl-hero { height: 300px; align-items: flex-end; }
        .bl-hero-inner { padding: 0 20px 32px; }
        .bl-hero-eyebrow { font-size: 10px; margin-bottom: 10px; }
        .bl-hero-subtitle { font-size: 13.5px; }
      }

      /* ── Reveal ── */
      .bl-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .bl-reveal.bl-visible { opacity: 1 !important; transform: none !important; }
      @media (prefers-reduced-motion: reduce) { .bl-reveal { opacity: 1; transform: none; transition: none; } }

      /* ── Section ── */
      .bl-section { padding: 64px 0 96px; }
      .bl-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

      /* ── Featured post — first item gets a bigger side-by-side card ── */
      .bl-featured {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 36px;
        align-items: center;
        margin-bottom: 56px;
        padding-bottom: 56px;
        border-bottom: 1px solid rgba(0,0,0,0.08);
      }
      body.dark .bl-featured { border-color: var(--dark-border, rgba(255,255,255,0.08)); }
      @media (max-width: 860px) { .bl-featured { grid-template-columns: 1fr; } }

      .bl-featured-media {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        aspect-ratio: 4 / 3;
        box-shadow: 0 24px 60px -20px rgba(0,0,0,0.28);
      }
      .bl-featured-media img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      .bl-featured-media:hover img { transform: scale(1.05); }
      .bl-featured-tag {
        position: absolute; top: 16px;
        inset-inline-start: 16px;
        padding: 6px 14px;
        border-radius: 999px;
        background: var(--primary-yellow, #f5a623);
        color: #111;
        font-size: 11.5px;
        font-weight: 800;
        letter-spacing: 0.03em;
      }
      .bl-featured-eyebrow {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--primary-yellow, #c9860f);
        margin-bottom: 12px;
      }
      body.dark .bl-featured-eyebrow { color: var(--primary-yellow, #f5a623); }
      .bl-featured-title {
        font-size: clamp(22px, 2.6vw, 32px);
        font-weight: 900;
        line-height: 1.15;
        color: #0a0a0a;
        margin: 0 0 14px;
        letter-spacing: -0.01em;
      }
      body.dark .bl-featured-title { color: var(--dark-text-main, #f0f0f0); }
      .bl-featured-desc {
        color: #5c5c5c;
        line-height: 1.75;
        font-size: 15px;
        margin: 0 0 20px;
      }
      body.dark .bl-featured-desc { color: var(--dark-text-muted, #aaa); }
      .bl-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: #8a8a8a;
        margin-bottom: 18px;
      }
      body.dark .bl-meta { color: var(--dark-text-disabled, #888); }
      .bl-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: currentColor; flex-shrink: 0; }

      /* ── Mobile — tighter rhythm, full-bleed featured image (the
         edge-to-edge photo + rounded-corner text card underneath is the
         pattern premium mobile magazine apps use — Medium, Apple News —
         instead of just shrinking the desktop card in place). ── */
      @media (max-width: 640px) {
        .bl-section { padding: 36px 0 64px; }
        .bl-container { padding: 0 20px; }

        .bl-featured {
          grid-template-columns: 1fr;
          gap: 0;
          margin-bottom: 40px;
          padding-bottom: 40px;
        }
        .bl-featured-media {
          margin: 0 -20px 22px;
          border-radius: 0;
          aspect-ratio: 16 / 12;
          box-shadow: none;
        }
        .bl-featured-tag { top: 14px; }
        .bl-featured-title { font-size: 22px; }
        .bl-featured-desc { font-size: 14px; }

        .bl-grid { gap: 20px; }
        .bl-card-title { font-size: 16px; }

        /* Read More is the primary tap target on a card — give it real
           height instead of relying on line-height alone. */
        .bl-card-link { min-height: 44px; align-items: center; }
      }

      /* ── Grid cards ── */
      .bl-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
      }
      @media (max-width: 960px) { .bl-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 640px) { .bl-grid { grid-template-columns: 1fr; } }

      .bl-card {
        border-radius: 18px;
        overflow: hidden;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.07);
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }
      body.dark .bl-card {
        background: var(--dark-bg-surface, #1e1e1e);
        border-color: var(--dark-border, rgba(255,255,255,0.08));
      }
      .bl-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 44px -14px rgba(0,0,0,0.18);
        border-color: rgba(245,166,35,0.35);
      }
      body.dark .bl-card:hover { box-shadow: 0 20px 44px -14px rgba(0,0,0,0.5); }

      .bl-card-media { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
      .bl-card-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
      .bl-card:hover .bl-card-media img { transform: scale(1.08); }
      .bl-card-tag {
        position: absolute; top: 14px;
        inset-inline-start: 14px;
        padding: 5px 12px;
        border-radius: 999px;
        background: rgba(10,10,10,0.72);
        backdrop-filter: blur(6px);
        color: var(--primary-yellow, #f5a623);
        font-size: 10.5px;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .bl-card-body { padding: 20px; }
      .bl-card-title {
        font-size: 17px;
        font-weight: 800;
        color: #0f0f0f;
        line-height: 1.35;
        margin: 0 0 10px;
        letter-spacing: -0.01em;
      }
      body.dark .bl-card-title { color: var(--dark-text-main, #f0f0f0); }
      .bl-card:hover .bl-card-title { color: var(--primary-yellow, #c9860f); }
      body.dark .bl-card:hover .bl-card-title { color: var(--primary-yellow, #f5a623); }

      .bl-card-desc {
        font-size: 13.5px;
        line-height: 1.65;
        color: #6b6b6b;
        margin: 0 0 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      body.dark .bl-card-desc { color: var(--dark-text-muted, #999); }

      .bl-card-link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13.5px;
        font-weight: 700;
        color: #0a0a0a;
        text-decoration: none;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: gap 0.2s ease, color 0.2s ease;
      }
      body.dark .bl-card-link { color: var(--dark-text-main, #f0f0f0); }
      .bl-card-link:hover { gap: 10px; color: var(--primary-yellow, #c9860f); }
      body.dark .bl-card-link:hover { color: var(--primary-yellow, #f5a623); }
      .bl-card-link svg { transition: transform 0.2s ease; }
      [dir="rtl"] .bl-card-link svg { transform: scaleX(-1); }

      /* ── Empty / loading ── */
      .bl-empty {
        text-align: center;
        padding: 80px 24px;
        color: #8a8a8a;
      }
      body.dark .bl-empty { color: var(--dark-text-muted, #999); }
    `
    document.head.appendChild(style)
    return () => {
      const el = document.getElementById("blogs-v2-styles")
      if (el) el.remove()
    }
  }, [])
}

export default function Blogs() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"
  const blogs = getLocalizedBlogs(i18n.language)
  const navigate = useNavigate()
  const langLink = useLangLink()
  useBlogsStyles()

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString(i18n.language, { year: "numeric", month: "long", day: "numeric" })

  // ── Scroll-reveal, staggered ──
  const sectionRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const [featured, ...rest] = blogs
  const goToBlog = (blog) => navigate(langLink(`/page/${blog.slug}`), { state: { blog } })

  return (
    <div className="bl-page" dir={isRTL ? "rtl" : "ltr"}>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t("meta.blogs.title")}</title>
        <meta name="description" content={t("meta.blogs.description")} />
      </Helmet>

      {/* ── Hero ── */}
      <section className="bl-hero">
        <img className="bl-hero-img" src="/new/blogs.webp" alt="" aria-hidden="true" />
        <div className="bl-hero-scrim" aria-hidden="true" />
        <div className="bl-hero-inner">
          <span className="bl-hero-eyebrow">{t("blogs.eyebrow", "Tareeqk Journal")}</span>
          <h1 className="bl-hero-title">{t("blogs.title")}</h1>
          <p className="bl-hero-subtitle">{t("blogs.subtitle")}</p>
        </div>
      </section>

      <section className="bl-section" ref={sectionRef}>
        <div className="bl-container">
          {blogs.length === 0 ? (
            <div className="bl-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 16px", opacity: 0.5 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6 15L18 21m0 0l2.25-2.25M18 21V9" />
              </svg>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{t("blogs.no_blogs")}</h3>
              <p style={{ fontSize: 14, opacity: 0.75 }}>{t("blogs.checkBackSoon", "New articles are on the way — check back soon.")}</p>
            </div>
          ) : (
            <>
              {featured && (
                <div className={`bl-featured bl-reveal${revealed ? " bl-visible" : ""}`}>
                  <div className="bl-featured-media">
                    <img src={featured.image} alt={featured.title} loading="eager" />
                    <span className="bl-featured-tag">{featured.section}</span>
                  </div>
                  <div>
                    <div className="bl-featured-eyebrow">{t("blogs.latest", "Latest Article")}</div>
                    <h2 className="bl-featured-title">{featured.title}</h2>
                    <div className="bl-meta">
                      <span>{formatDate(featured.date)}</span>
                      <span className="bl-meta-dot" />
                      <span>{featured.mins} {t("blogs.mins")}</span>
                    </div>
                    <p className="bl-featured-desc">{featured.description}</p>
                    <button className="bl-card-link" style={{ fontSize: 15 }} onClick={() => goToBlog(featured)}>
                      {t("blogs.readMore")}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {rest.length > 0 && (
                <div className="bl-grid">
                  {rest.map((blog, i) => (
                    <div
                      key={blog.id}
                      className={`bl-card bl-reveal${revealed ? " bl-visible" : ""}`}
                      style={{ transitionDelay: revealed ? `${i * 80}ms` : "0ms" }}
                    >
                      <div className="bl-card-media">
                        <img src={blog.image} alt={blog.title} loading="lazy" />
                        <span className="bl-card-tag">{blog.section}</span>
                      </div>
                      <div className="bl-card-body">
                        <div className="bl-meta" style={{ marginBottom: 10 }}>
                          <span>{formatDate(blog.date)}</span>
                          <span className="bl-meta-dot" />
                          <span>{blog.mins} {t("blogs.mins")}</span>
                        </div>
                        <h3 className="bl-card-title">{blog.title}</h3>
                        <p className="bl-card-desc">{blog.description}</p>
                        <button className="bl-card-link" onClick={() => goToBlog(blog)}>
                          {t("blogs.readMore")}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
