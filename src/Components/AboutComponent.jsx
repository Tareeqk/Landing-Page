import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AboutPreview() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    if (document.getElementById("about-preview-styles")) return;

    const style = document.createElement("style");
    style.id = "about-preview-styles";
    style.textContent = `
      .abt-preview {
        padding: 100px 0;
        overflow: hidden;
        background: #fff;
      }

      body.dark .abt-preview {
        background-color: var(--dark-bg-main, #0f0f0f);
      }

      .abt-preview-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 70px;
        align-items: center;
      }

      .abt-preview-content {
        max-width: 600px;
      }
        .abt-preview-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.abt-preview-icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

      /* ── Eyebrow (matches s3-eyebrow) ── */
      .abt-preview-tag {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #d4a017;
        margin-bottom: 18px;
      }
      [dir="ltr"] .abt-preview-tag::before {
        content: "";
        width: 32px;
        height: 2px;
        background: #d4a017;
        display: block;
        border-radius: 2px;
      }
      [dir="rtl"] .abt-preview-tag::after {
        content: "";
        width: 32px;
        height: 2px;
        background: #d4a017;
        display: block;
        border-radius: 2px;
      }

      /* ── Title (matches s3-title) ── */
      .abt-preview-title {
        font-size: 58px;
        font-weight: 900;
        line-height: 1.05;
        color: #0a0a0a;
        margin: 0 0 22px;
        letter-spacing: -1px;
      }
      @media (max-width: 960px) { .abt-preview-title { font-size: 40px; } }
      @media (max-width: 640px) { .abt-preview-title { font-size: 34px; } }

      body.dark .abt-preview-title {
        color: var(--dark-text-main, #f2f2f2) !important;
      }

      .abt-preview-title span {
        color: #d4a017;
      }

      .abt-preview-text {
        color: #5a5a5a;
        font-size: 15px;
        line-height: 1.8;
        margin-bottom: 38px;
      }

      body.dark .abt-preview-text {
        color: var(--dark-text-muted, #aaa) !important;
      }

      /* ── Stat cards ── */
      .abt-preview-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 38px;
      }

      .abt-preview-card {
        background: #fff;
        border-radius: 18px;
        padding: 24px 18px;
        text-align: center;
        border: 1.5px solid #e8e8e8;
        transition: transform .28s ease, box-shadow .28s ease;
      }

      body.dark .abt-preview-card {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }

      .abt-preview-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 40px rgba(0,0,0,.08);
      }

      body.dark .abt-preview-card:hover {
        box-shadow: 0 18px 40px rgba(0,0,0,.4);
      }

      .abt-preview-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #fff9e0;
        border: 1px solid #ffe97a;
        margin: 0 auto 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
      }

      body.dark .abt-preview-icon {
        background: rgba(255,204,0,0.1) !important;
        border-color: rgba(255,204,0,0.25) !important;
      }

      .abt-preview-value {
        font-size: 21px;
        font-weight: 900;
        color: #0a0a0a;
        letter-spacing: -.3px;
      }

      body.dark .abt-preview-value {
        color: var(--dark-text-main, #f0f0f0) !important;
      }

      .abt-preview-label {
        font-size: 12px;
        color: #888;
        margin-top: 4px;
      }

      body.dark .abt-preview-label {
        color: var(--dark-text-disabled, #888) !important;
      }

      /* ── Button ── */
      .abt-preview-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #FFCC00;
        color: #0a0a0a;
        text-decoration: none;
        padding: 15px 30px;
        border-radius: 12px;
        font-weight: 800;
        font-size: 15px;
        transition: transform .28s ease, box-shadow .28s ease;
      }

      .abt-preview-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 32px rgba(255,204,0,.35);
      }

      .abt-preview-btn-arr {
        font-size: 16px;
        transition: transform .2s;
      }
      [dir="rtl"] .abt-preview-btn-arr { transform: scaleX(-1); }
      .abt-preview-btn:hover .abt-preview-btn-arr { transform: translateX(3px); }
      [dir="rtl"] .abt-preview-btn:hover .abt-preview-btn-arr { transform: scaleX(-1) translateX(3px); }

      /* ── Image ── */
      .abt-preview-image {
        position: relative;
      }

      .abt-preview-image img {
        width: 100%;
        border-radius: 24px;
        display: block;
        box-shadow: 0 25px 60px rgba(0,0,0,.12);
      }

      .abt-preview-badge {
        position: absolute;
        bottom: 25px;
        background: #fff;
        padding: 18px 22px;
        border-radius: 16px;
        box-shadow: 0 15px 40px rgba(0,0,0,.12);
        border: 1.5px solid #f0f0f0;
      }

      body.dark .abt-preview-badge {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }

      .abt-preview-badge-title {
        font-weight: 800;
        color: #0a0a0a;
        font-size: 14px;
      }

      body.dark .abt-preview-badge-title {
        color: var(--dark-text-main, #f0f0f0) !important;
      }

      .abt-preview-badge-text {
        font-size: 13px;
        color: #777;
      }

      body.dark .abt-preview-badge-text {
        color: var(--dark-text-muted, #aaa) !important;
      }

      @media(max-width: 900px) {
        .abt-preview-grid {
          grid-template-columns: 1fr;
        }
        .abt-preview-stats {
          grid-template-columns: 1fr 1fr;
        }
        .abt-preview-badge {
          display: none;
        }
      }

      @media(max-width: 480px) {
        .abt-preview-stats {
          grid-template-columns: 1fr;
        }
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
        <div className="abt-preview-grid">
          {/* Content */}
          <div
            className="abt-preview-content"
            style={{
              order: isRTL ? 2 : 1,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <span className="abt-preview-tag">{t("aboutPreview.tag")}</span>

            <h2 className="abt-preview-title">
              {t("aboutPreview.title")}
              <span> {t("aboutPreview.highlight")}</span>
            </h2>

            <p className="abt-preview-text">{t("aboutPreview.description")}</p>

            <div className="abt-preview-stats">
              <div className="abt-preview-card">
                               <div className="abt-preview-icon">
  <img src="/icons/clock.png" alt="Car" />
</div>
                <div className="abt-preview-value">20 min</div>
                <div className="abt-preview-label">{t("aboutPreview.response")}</div>
              </div>

              <div className="abt-preview-card">
                <div className="abt-preview-icon">
  <img src="/icons/truck-recovery.png" alt="Car" />
</div>
                <div className="abt-preview-value">50K+</div>
                <div className="abt-preview-label">{t("aboutPreview.drivers")}</div>
              </div>

              <div className="abt-preview-card">
                                <div className="abt-preview-icon">
  <img src="/icons/rating.png" alt="Car" />
</div>
                <div className="abt-preview-value">4.9★</div>
                <div className="abt-preview-label">{t("aboutPreview.rating")}</div>
              </div>
            </div>

            <a href="/about" className="abt-preview-btn">
              {t("aboutPreview.button")}
              <span className="abt-preview-btn-arr">→</span>
            </a>
          </div>

          {/* Image */}
          <div
            className="abt-preview-image"
            style={{ order: isRTL ? 1 : 2 }}
          >
            <img src="/new/Recovery_Van.webp" alt="Tareeqk Recovery" />

            <div
              className="abt-preview-badge"
              style={{
                left: isRTL ? "auto" : "-20px",
                right: isRTL ? "-20px" : "auto",
              }}
            >
              <div className="abt-preview-badge-title">{t("aboutPreview.badgeTitle")}</div>
              <div className="abt-preview-badge-text">{t("aboutPreview.badgeText")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}