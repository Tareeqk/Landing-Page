import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useLangLink from "../hooks/useLangLink";

export default function AboutPreview() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const langLink = useLangLink();

  const TAGS = [
    t("aboutPreview.tags.flatbed", "Flatbed recovery"),
    t("aboutPreview.tags.dispatch", "5-min dispatch"),
    t("aboutPreview.tags.coverage", "All of Dubai"),
  ];

  useEffect(() => {
    if (document.getElementById("about-preview-styles")) return;

    const style = document.createElement("style");
    style.id = "about-preview-styles";
    style.textContent = `
      .abt-preview {
        /* Top padding trimmed well below the bottom value — a full 9vw
           top gap read as dead white space right under the hero; the
           bottom gap before the next section stays generous. */
        padding: clamp(24px, 3vw, 44px) 0 clamp(56px, 9vw, 110px);
        overflow: hidden;
        background: #fff;
      }

      body.dark .abt-preview {
        background-color: var(--dark-bg-main, #0f0f0f);
      }

      .abt-preview-grid {
        display: grid;
        grid-template-columns: 1fr 1.05fr;
        gap: clamp(40px, 6vw, 90px);
        align-items: center;
        margin-bottom: clamp(36px, 5vw, 56px);
      }

      /* ================= TOP EYEBROW ================= */
      .abt-preview-eyebrow {
        text-align: center;
        margin-bottom: clamp(28px, 4vw, 44px);
      }

      .abt-preview-eyebrow-pill {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 18px;
        border-radius: var(--tk-radius-pill, 999px);
        background: #f6f6f6;
        border: 1px solid rgba(0,0,0,0.06);
        font-size: 12.5px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #2a2a2a;
      }

      body.dark .abt-preview-eyebrow-pill {
        background: var(--dark-bg-surface, #1c1f1f) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
        color: var(--dark-text-main, #eee) !important;
      }

      .abt-preview-eyebrow-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--primary-yellow, #f5a623);
        flex-shrink: 0;
      }

      /* ================= IMAGE SIDE ================= */
      .abt-preview-media {
        position: relative;
      }

      .abt-preview-media-main {
        border-radius: 20px;
        overflow: hidden;
        /* Matches the source photo's natural ratio (717x538 ≈ 4:3) — it
           was forced into a near-square 1:1.05 crop before, which cut off
           both sides of this landscape shot under object-fit:cover. */
        aspect-ratio: 4 / 3;
      }

      .abt-preview-media-main img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      /* Floating overlap card — bottom-right on LTR, bottom-left on RTL */
      .abt-preview-float {
        position: absolute;
        bottom: -10%;
        right: -8%;
        width: 48%;
        background: #fff;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 24px 50px rgba(0,0,0,.16);
        border: 1px solid rgba(0,0,0,0.04);
      }
      [dir="rtl"] .abt-preview-float { right: auto; left: -8%; }

      body.dark .abt-preview-float {
        background: var(--dark-bg-surface, #1e1e1e);
        border-color: var(--dark-border, rgba(255,255,255,0.08));
      }

      .abt-preview-float-img {
        position: relative;
        aspect-ratio: 4 / 3;
      }

      .abt-preview-float-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .abt-preview-float-arrow {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: #0a0a0a;
        box-shadow: 0 6px 16px rgba(0,0,0,.18);
      }
      [dir="rtl"] .abt-preview-float-arrow { right: auto; left: 10px; }

      .abt-preview-float-body {
        padding: 16px 18px 18px;
      }

      .abt-preview-float-title {
        font-weight: 800;
        font-size: 15px;
        color: #0a0a0a;
        margin-bottom: 6px;
      }

      body.dark .abt-preview-float-title {
        color: var(--dark-text-main, #f0f0f0) !important;
      }

      .abt-preview-float-text {
        font-size: 12.5px;
        line-height: 1.55;
        color: #777;
      }

      body.dark .abt-preview-float-text {
        color: var(--dark-text-muted, #aaa) !important;
      }

      /* ================= CONTENT SIDE ================= */
      .abt-preview-content {
        max-width: 600px;
      }

      /* ── Title — direct, no eyebrow tag, matches reference ── */
      .abt-preview-title {
        font-size: 32px;
        font-weight: 600;
        line-height: 1.12;
        color: #0a0a0a;
        margin: 0 0 22px;
        letter-spacing: -1px;
        font-family: "Poppins", sans-serif;
      }
      @media (max-width: 960px) { .abt-preview-title { font-size: 38px; } }
      @media (max-width: 640px) { .abt-preview-title { font-size: 30px; } }

      .abt-preview-title-underline {
        display: block;
        width: 72px;
        height: 4px;
        border-radius: 999px;
        background: var(--primary-yellow, #f5a623);
        margin: 10px 0 0;
      }
      [dir="rtl"] .abt-preview-title-underline { margin-left: auto; margin-right: 0; }

      body.dark .abt-preview-title {
        color: var(--dark-text-main, #f2f2f2) !important;
      }

      .abt-preview-text {
        color: #5a5a5a;
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 38px;
        max-width: 50ch;
      }

      body.dark .abt-preview-text {
        color: var(--dark-text-muted, #aaa) !important;
      }

      /* ── Icon stat chips ──
         The media column already carries two truck photos (main + floating
         card); this row stays photo-free so the section doesn't turn into
         a wall of mismatched imagery. */
      .abt-preview-proof {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 12px;
        align-items: stretch;
      }

      .abt-preview-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 6px;
        padding: 16px 10px;
        border-radius: 12px;
        background: #f6f6f6;
      }

      body.dark .abt-preview-stat {
        background: var(--dark-bg-surface, #1c1f1f) !important;
      }

      .abt-preview-stat-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(245, 166, 35, 0.14);
        color: var(--primary-yellow, #c9860f);
      }

      body.dark .abt-preview-stat-icon {
        color: var(--primary-yellow, #f5a623);
      }

      .abt-preview-stat-value {
        font-weight: 800;
        font-size: 13.5px;
        line-height: 1.25;
        color: #0a0a0a;
      }

      body.dark .abt-preview-stat-value {
        color: var(--dark-text-main, #f0f0f0) !important;
      }

      .abt-preview-stat-label {
        font-size: 11px;
        line-height: 1.3;
        color: #808080;
      }

      body.dark .abt-preview-stat-label {
        color: var(--dark-text-muted, #999) !important;
      }

      /* Below 700px, three fixed columns leave too little width per chip
         to keep the value/label text legible — auto-fit lets the grid
         drop to 2-up (third chip wraps to its own row, centered by the
         grid) once a column would go under ~110px, instead of forcing
         all three to keep shrinking their text to fit. */
      @media (max-width: 700px) {
        .abt-preview-proof {
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 8px;
        }
      }

      @media (max-width: 480px) {
        .abt-preview-proof {
          grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
        }
        .abt-preview-stat {
          padding: 12px 6px;
          gap: 4px;
          border-radius: 10px;
        }
        .abt-preview-stat-icon {
          width: 28px;
          height: 28px;
        }
        .abt-preview-stat-icon svg {
          width: 14px;
          height: 14px;
        }
        .abt-preview-stat-value {
          font-size: 12.5px;
          line-height: 1.2;
        }
        .abt-preview-stat-label {
          font-size: 10.5px;
        }
      }

      /* ── Learn more button ── */
      .abt-preview-cta {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin-top: 28px;
        padding: 13px 26px;
        border-radius: var(--tk-radius-pill, 999px);
        background: #0a0a0a;
        color: #fff;
        font-size: 14.5px;
        font-weight: 700;
        border: none;
        cursor: pointer;
        transition: transform .2s ease, background .2s ease;
      }

      .abt-preview-cta:hover {
        background: var(--primary-yellow, #f5a623);
        transform: translateX(3px);
      }
      [dir="rtl"] .abt-preview-cta:hover { transform: translateX(-3px); }

      body.dark .abt-preview-cta {
        background: var(--primary-yellow, #f5a623);
        color: #0a0a0a;
      }

      .abt-preview-cta-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        line-height: 1;
      }
      [dir="rtl"] .abt-preview-cta-arrow { transform: scaleX(-1); }

      @media(max-width: 960px) {
        .abt-preview-grid {
          grid-template-columns: 1fr;
        }
        .abt-preview-float {
          display: none; /* avoid overlap crowding on stacked mobile layout */
        }
        .abt-preview-media-main {
          aspect-ratio: 16 / 10;
        }
      }

      /* ================= BOTTOM TAG BAR ================= */
      .abt-preview-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 14px 14px 14px 22px;
        border-radius: var(--tk-radius-pill, 999px);
        background: #eef6f5;
        flex-wrap: wrap;
      }

      body.dark .abt-preview-bar {
        background: var(--dark-bg-surface, #1c1f1f) !important;
      }

      .abt-preview-bar-tags {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      .abt-preview-bar-tag {
        padding: 8px 16px;
        border-radius: var(--tk-radius-pill, 999px);
        background: #fff;
        border: 1px solid rgba(0,0,0,0.08);
        font-size: 13.5px;
        font-weight: 600;
        color: #2a2a2a;
        white-space: nowrap;
      }

      body.dark .abt-preview-bar-tag {
        background: var(--dark-bg-main, #141414) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
        color: var(--dark-text-main, #eee) !important;
      }

      .abt-preview-bar-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: #0a0a0a;
        color: #fff;
        font-size: 17px;
        flex-shrink: 0;
        transition: transform .25s ease;
      }
      [dir="rtl"] .abt-preview-bar-arrow { transform: scaleX(-1); }
      .abt-preview-bar-arrow:hover { transform: translateX(3px); }
      [dir="rtl"] .abt-preview-bar-arrow:hover { transform: scaleX(-1) translateX(3px); }

      @media (max-width: 640px) {
        .abt-preview-bar { padding: 10px; gap: 12px; }
        .abt-preview-bar-tag { font-size: 12.5px; padding: 7px 12px; }
        .abt-preview-bar-arrow { width: 40px; height: 40px; }
      }

      /* The 3rem (48px) side padding below was fixed regardless of
         viewport, eating ~96px off a 390px-wide phone and crushing the
         3-column stat row into a too-narrow space. */
      .abt-preview-container { padding: 0 3rem; }
      @media (max-width: 640px) {
        .abt-preview-container { padding: 0 20px; }
      }
      @media (max-width: 960px) {
        .abt-preview { padding: clamp(40px, 8vw, 72px) 0; }
      }

      /* ── Scroll reveal — this section previously had no entrance
         animation at all (appeared instantly), unlike the rest of the
         site's sections. Same IntersectionObserver convention as
         About.jsx/Service.jsx, scoped to this component. ── */
      .abtprev-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 1.05s cubic-bezier(0.16,1,0.3,1),
                    transform 1.05s cubic-bezier(0.16,1,0.3,1);
      }
      .abtprev-reveal.abtprev-left  { transform: translateX(-28px); }
      .abtprev-reveal.abtprev-right { transform: translateX(28px); }
      .abtprev-reveal.abtprev-visible { opacity: 1 !important; transform: none !important; }
      [dir="rtl"] .abtprev-reveal.abtprev-left  { transform: translateX(28px); }
      [dir="rtl"] .abtprev-reveal.abtprev-right { transform: translateX(-28px); }
    `;

    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById("about-preview-styles");
      if (existing) existing.remove();
    };
  }, []);

  // Scroll-reveal observer — deliberately its own effect, not bundled into
  // the style-injection one above. That effect skips its body (via the
  // "already injected" guard) on any mount after the first, but this
  // section's prerendered HTML (see scripts/prerender.mjs) already has the
  // style tag baked in from the snapshot — so on a real page load the style
  // guard trips immediately, and if the observer setup lived inside that
  // same effect, it would never run and .abtprev-visible would never get
  // added, leaving the whole section permanently invisible. This effect has
  // no such guard, so it sets up a fresh observer on every mount regardless.
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".abtprev-reveal").forEach((el) => el.classList.add("abtprev-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || 0);
            setTimeout(() => el.classList.add("abtprev-visible"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    const timeout = setTimeout(() => {
      document.querySelectorAll(".abtprev-reveal").forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="abt-preview" dir={isRTL ? "rtl" : "ltr"}>
      <div
        className="abt-preview-container"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div className="abt-preview-eyebrow abtprev-reveal" data-delay="0">
          <span className="abt-preview-eyebrow-pill">
            <span className="abt-preview-eyebrow-dot" />
            {t("aboutPreview.eyebrow", "About Us")}
          </span>
        </div>

        <div className="abt-preview-grid">
          {/* Image side */}
          <div
            className={`abt-preview-media abtprev-reveal ${isRTL ? "abtprev-right" : "abtprev-left"}`}
            data-delay="80"
            style={{ order: isRTL ? 2 : 1 }}
          >
            <div className="abt-preview-media-main">
              <img src="/new/about_component.png" alt="Tareeqk recovery truck on a Dubai highway" />
            </div>

            {/* <div className="abt-preview-float">
              <div className="abt-preview-float-img">
                <img src="/icons/truck-recovery.png" alt="" />
                <span className="abt-preview-float-arrow">↗</span>
              </div>
              <div className="abt-preview-float-body">
                <div className="abt-preview-float-title">{t("aboutPreview.floatTitle", "Flatbed Recovery")}</div>
                <div className="abt-preview-float-text">
                  {t("aboutPreview.floatText", "Every vehicle is loaded and secured with care, on a flatbed built for the job.")}
                </div>
              </div>
            </div> */}
          </div>

          {/* Content side */}
          <div
            className={`abt-preview-content abtprev-reveal ${isRTL ? "abtprev-left" : "abtprev-right"}`}
            data-delay="140"
            style={{
              order: isRTL ? 1 : 2,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <h2 className="abt-preview-title">
              {t("aboutPreview.title")} <span>{t("aboutPreview.highlight")}</span>
              <span className="abt-preview-title-underline" aria-hidden="true" />
            </h2>

            <p className="abt-preview-text">{t("aboutPreview.description")}</p>

            {/* Icon stat chips, not photos — the media column already carries
                two truck photos (main + floating card); stacking three more
                differently-styled photos here read as visual clutter. */}
            <div className="abt-preview-proof">
              <div className="abt-preview-stat abtprev-reveal" data-delay="220">
                <span className="abt-preview-stat-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="abt-preview-stat-value">{t("aboutPreview.time")}</span>
                <span className="abt-preview-stat-label">{t("aboutPreview.response")}</span>
              </div>

              <div className="abt-preview-stat abtprev-reveal" data-delay="290">
                <span className="abt-preview-stat-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l7 3v6c0 4.4-3 7.9-7 9-4-1.1-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="abt-preview-stat-value">{t("aboutPreview.badgeTitle")}</span>
                <span className="abt-preview-stat-label">{t("aboutPreview.badgeText")}</span>
              </div>

              <div className="abt-preview-stat abtprev-reveal" data-delay="360">
                <span className="abt-preview-stat-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s-7-6.5-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.5 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                <span className="abt-preview-stat-value">{t("aboutPreview.rating")}</span>
                <span className="abt-preview-stat-label">{t("landing.trust.availabilityValue")}</span>
              </div>
            </div>

<Link to={langLink("/about")} className="abt-preview-cta">
  {t("aboutPreview.learnMore")}
  <span className="abt-preview-cta-arrow">
    {isRTL ? "←" : "→"}
  </span>
</Link>
          </div>
        </div>
      </div>
    </section>
  );
}