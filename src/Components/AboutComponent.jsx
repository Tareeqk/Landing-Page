import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AboutPreview() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

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
        padding: clamp(56px, 9vw, 110px) 0;
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
        aspect-ratio: 1 / 1.05;
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
        font-family: Georgia, "Times New Roman", serif;
      }
      @media (max-width: 960px) { .abt-preview-title { font-size: 38px; } }
      @media (max-width: 640px) { .abt-preview-title { font-size: 30px; } }

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

      /* ── Stat + photo cards row (scaled down) ──
         A big number anchors the claim, two photo cards back it up —
         mirrors the proof-point row from the reference design. */
      .abt-preview-proof {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 18px;
        align-items: center;
      }

      .abt-preview-photocard {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        aspect-ratio: 1 / 0.8;
        box-shadow: 0 8px 18px rgba(0,0,0,.10);
        background: #111; /* fallback so a transparent/light icon still reads dark */
      }

      .abt-preview-photocard img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.8) saturate(0.95);
      }

      /* Scrim guarantees label contrast no matter what icon sits underneath */
      .abt-preview-photocard::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,0.78) 100%);
        pointer-events: none;
      }

      .abt-preview-photocard-arrow {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: #0a0a0a;
        z-index: 1;
      }
      [dir="rtl"] .abt-preview-photocard-arrow { right: auto; left: 8px; }

      .abt-preview-photocard-label {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 9px;
        z-index: 1;
        color: #fff;
        font-size: 11.5px;
        font-weight: 700;
        line-height: 1.25;
        text-shadow: 0 1px 4px rgba(0,0,0,0.5);
      }

      @media (max-width: 700px) {
        .abt-preview-proof {
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
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
    `;

    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById("about-preview-styles");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <section className="abt-preview" dir={isRTL ? "rtl" : "ltr"}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        <div className="abt-preview-eyebrow">
          <span className="abt-preview-eyebrow-pill">
            <span className="abt-preview-eyebrow-dot" />
            {t("aboutPreview.eyebrow", "About Us")}
          </span>
        </div>

        <div className="abt-preview-grid">
          {/* Image side */}
          <div className="abt-preview-media" style={{ order: isRTL ? 2 : 1 }}>
            <div className="abt-preview-media-main">
              <img src="/new/Recovery_Van.webp" alt="Tareeqk recovery truck on a Dubai highway" />
            </div>

            <div className="abt-preview-float">
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
            </div>
          </div>

          {/* Content side */}
          <div
            className="abt-preview-content"
            style={{
              order: isRTL ? 1 : 2,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <h2 className="abt-preview-title">
              {t("aboutPreview.title")} <span>{t("aboutPreview.highlight")}</span>
            </h2>

            <p className="abt-preview-text">{t("aboutPreview.description")}</p>

            <div className="abt-preview-proof">
              <div className="abt-preview-photocard">
                <img src="/icons/clock.png" alt="" />
                <span className="abt-preview-photocard-arrow">↗</span>
                <span className="abt-preview-photocard-label">{t("aboutPreview.response")}</span>
              </div>

              <div className="abt-preview-photocard">
                <img src="/icons/clock.png" alt="" />
                <span className="abt-preview-photocard-arrow">↗</span>
                <span className="abt-preview-photocard-label">{t("aboutPreview.badgeTitle")}</span>
              </div>

              <div className="abt-preview-photocard">
                <img src="/icons/rating.png" alt="" />
                <span className="abt-preview-photocard-arrow">↗</span>
                <span className="abt-preview-photocard-label">{t("aboutPreview.rating")}</span>
              </div>
            </div>

            <button type="button" className="abt-preview-cta">
              {t("aboutPreview.learnMore")}
              <span className="abt-preview-cta-arrow">{isRTL ? "←" : "→"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}