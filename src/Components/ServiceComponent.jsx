import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLangLink from "../hooks/useLangLink"; 

export default function WhatWeOffer() {
  const { t, i18n } = useTranslation();
  const getLangLink = useLangLink();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    if (document.getElementById("services-v3-styles")) return;
    const style = document.createElement("style");
    style.id = "services-v3-styles";
    style.textContent = `
      .s3-section {
        background: #f7f7f7;
        padding: 80px 0 100px;
        overflow: hidden;
      }
      body.dark .s3-section {
        background: #141414;
      }

      .s3-container {
        max-width: 1260px;
        margin: 0 auto;
        padding: 0 32px;
      }

      /* ── TOP HERO ── */
      .s3-top {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        align-items: flex-end;
        margin-bottom: 0;
        position: relative;
      }
      @media (max-width: 768px) {
        .s3-top { grid-template-columns: 1fr; }
        .s3-hero-img-wrap { display: none; }
      }

      .s3-hero-text {
    
        padding-bottom: 40px;
      }
        .s3-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

[dir="rtl"] .s3-card-header {
  flex-direction: row-reverse;
}

.s3-card-title {
  margin: 0;
  font-size: 24px;
  font-weight: 900;
  color: #0a0a0a;
  line-height: 1.2;
  flex: 1;
  word-break: break-word;
}

body.dark .s3-card-title {
  color: #f0f0f0;
}

.s3-icon-circle {
  width: 64px;
  height: 64px;
  min-width: 64px;
  border-radius: 50%;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.s3-icon-circle img {
  width: 38px;
  height: 38px;
  object-fit: contain;
}

      .s3-eyebrow {
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
      [dir="ltr"] .s3-eyebrow::before {
        content: "";
        width: 32px;
        height: 2px;
        background: #d4a017;
        display: block;
        border-radius: 2px;
      }
      [dir="rtl"] .s3-eyebrow::after {
        content: "";
        width: 32px;
        height: 2px;
        background: #d4a017;
        display: block;
        border-radius: 2px;
      }

      .s3-title {
        font-size: 40px;
        font-weight: 900;
        line-height: 1.05;
        color: #0a0a0a;
        margin: 0 0 22px;
        letter-spacing: -1px;
      }
      body.dark .s3-title { color: #f2f2f2; }
      @media (max-width: 960px) { .s3-title { font-size: 40px; } }

      .s3-desc {
        font-size: 15px;
        line-height: 1.8;
        color: #5a5a5a;
        max-width: 480px;
        text-align: center;
        margin: 0 auto;
      }
      [dir="ltr"] .s3-desc { text-align: left; margin: 0; }
      [dir="rtl"] .s3-desc { text-align: right; margin: 0; }
      body.dark .s3-desc { color: #888; }

      .s3-hero-img-wrap {
        position: relative;
        height: 320px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        border-radius: 28px;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 12%, #000 100%),
                             linear-gradient(to top, transparent 0%, #000 14%, #000 100%);
        -webkit-mask-composite: source-in;
        mask-image: linear-gradient(to right, transparent 0%, #000 12%, #000 100%),
                    linear-gradient(to top, transparent 0%, #000 14%, #000 100%);
        mask-composite: intersect;
      }
      .s3-hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 28px;
        display: block;
      }

      /* ── STATS ROW ── */
      .s3-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
        margin: -40px 0 48px;
        position: relative;
        z-index: 2;
      }
      @media (max-width: 640px) {
        .s3-stats { grid-template-columns: repeat(2, 1fr); }
      }

      .s3-stat {
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 16px;
        padding: 18px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
      }
      body.dark .s3-stat {
        background: #1e1e1e;
        border-color: rgba(255,255,255,0.07);
      }

      .s3-stat-icon {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: #fff9e0;
        border: 1px solid #ffe97a;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      body.dark .s3-stat-icon {
        background: rgba(255,204,0,0.1);
        border-color: rgba(255,204,0,0.25);
      }
      .s3-stat-icon img {
        width: 24px;
        height: 24px;
        object-fit: contain;
      }

      .s3-stat-value {
        font-size: 26px;
        font-weight: 900;
        color: #0a0a0a;
        line-height: 1;
      }
      body.dark .s3-stat-value { color: #f0f0f0; }

      .s3-stat-label {
        font-size: 13px;
        color: #888;
        margin-top: 3px;
      }

      /* ── SERVICE CARDS ── */
      .s3-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }
      @media (max-width: 860px) {
        .s3-grid { grid-template-columns: 1fr; }
      }

      .s3-card {
        background: #fff;
        border: 1.5px solid #e8e8e8;
        border-radius: 22px;
        padding: 30px 26px 26px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        transition: transform 0.28s ease, box-shadow 0.28s ease;
        min-height: 420px;
      }
      body.dark .s3-card {
        background: #1c1c1c;
        border-color: rgba(255,255,255,0.08);
      }
      .s3-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 48px rgba(0,0,0,0.08);
      }
      body.dark .s3-card:hover {
        box-shadow: 0 18px 48px rgba(0,0,0,0.4);
      }

      /* Featured card */
      .s3-card.featured {
        background: #fffef0;
        border: 2px solid #FFCC00;
      }
      body.dark .s3-card.featured {
        background: #1d1b08;
        border-color: #FFCC00;
      }

      /* Most Requested badge */
      .s3-badge {
        position: absolute;
        top: 22px;
        background: #FFCC00;
        color: #3b2d00;
        font-size: 12px;
        font-weight: 800;
        padding: 6px 14px 6px 10px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
      }
      .s3-badge img {
        width: 13px;
        height: 13px;
        object-fit: contain;
      }
      [dir="ltr"] .s3-badge { right: 22px; }
      [dir="rtl"] .s3-badge { left: 22px; right: auto; }

      /* Service icon — small grey circle */
      .s3-icon-circle {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        background: #f3f3f3;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        flex-shrink: 0;
      }
      body.dark .s3-icon-circle { background: #2a2a2a; }
      .s3-icon-circle img {
        width: 70px;
        height: 70px;
        object-fit: contain;
      }

      .s3-card-title {
        font-size: 24px;
        font-weight: 900;
        color: #0a0a0a;
        margin: 0 0 10px;
        letter-spacing: -0.3px;
      }
      body.dark .s3-card-title { color: #f0f0f0; }

      .s3-card-desc {
        font-size: 13.5px;
        color: #666;
        line-height: 1.7;
        margin: 0 0 22px;
        /* leave room for the photo on the right */
        max-width: 58%;
      }
      body.dark .s3-card-desc { color: #888; }

      /* Feature list */
      .s3-features {
        list-style: none;
        padding: 0;
        margin: 0 0 auto;
        display: flex;
        flex-direction: column;
        gap: 11px;
        /* keep text away from photo */
        max-width: 58%;
      }
      .s3-feature {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 13.5px;
        color: #222;
        font-weight: 500;
      }
      body.dark .s3-feature { color: #ccc; }

      .s3-check {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #FFCC00;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .s3-check img {
        width: 12px;
        height: 12px;
        object-fit: contain;
      }

      /* Decorative product photo — bottom-right */
      .s3-card-photo {
        position: absolute;
        bottom: 0;
        width: 48%;
        max-width: 200px;
        object-fit: contain;
        pointer-events: none;
      }
      [dir="ltr"] .s3-card-photo { right: 0; }
      [dir="rtl"] .s3-card-photo { left: 0; right: auto; transform: scaleX(-1); }

      /* Learn More link */
      .s3-learn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 15px;
        font-weight: 800;
        color: #0a0a0a;
        text-decoration: none;
        margin-top: 26px;
        transition: color 0.2s;
      }
        @media (max-width: 768px) {
  .s3-card-header {
    gap: 12px;
  }

  .s3-icon-circle {
    width: 52px;
    height: 52px;
    min-width: 52px;
  }

  .s3-icon-circle img {
    width: 30px;
    height: 30px;
  }

  .s3-card-title {
    font-size: 18px;
    line-height: 1.3;
  }
}
      body.dark .s3-learn { color: #f0f0f0; }
      .s3-learn:hover { color: #b8870f; }

      .s3-learn-arr {
        font-size: 16px;
        transition: transform 0.2s;
      }
      [dir="rtl"] .s3-learn-arr { transform: scaleX(-1); }
      .s3-learn:hover .s3-learn-arr { transform: translateX(3px); }
      [dir="rtl"] .s3-learn:hover .s3-learn-arr { transform: scaleX(-1) translateX(3px); }
    `;
    document.head.appendChild(style);
  }, []);

  const stats = [
    {
      iconSrc: "/icons/support.png",
      value: t("offer.appBookingTop"),
      label: t("offer.appBooking"),
    },
    {
      iconSrc: "/icons/clock.png",
      value: t("offer.appServiceTop"),
      label: t("offer.appService"),
    },
    {
      iconSrc: "/icons/check.png",
      value: t("offer.appTrackingTop"),
      label: t("offer.appTracking"),
    },
    {
      iconSrc: "/icons/location_icon.png",
      value: t("offer.appRecoveryTop"),
      label: t("offer.appRecovery"),
    },
  ];

  const services = [
    {
      key: "recovery",
      title: t("offer.recovery"),
      description: t("offer.recoveryDescription"),
      link: "/car-recovery-dubai",
      featured: false,
      features: [
        t("offer.recovery3ton"),
        t("offer.recovery5ton"),
        t("offer.recovery10ton"),
      ],
      iconSrc: "/icons/TRUCK_ICON.png",
      photoSrc: "/icons/car_recovery.jpg",
    },
    {
      key: "battery",
      title: t("offer.battery"),
      description: t("offer.batteryDescription"),
      link: "/battery-service-dubai",
      featured: false,
      features: [
        t("offer.batteryReplacement"),
        t("offer.batteryJump"),
        t("offer.batteryTesting"),
      ],
      iconSrc: "/icons/BATTERY_ICON.png",
      photoSrc: "/icons/battery_jumpstart.jpg",
    },
    {
      key: "tyre",
      title: t("offer.tyre"),
      description: t("offer.tyreDescription"),
      link: "/flat-tyre-repair-dubai",
      featured: true,
      features: [
        t("offer.tyreFlatAssist"),
        t("offer.tyreReplacement"),
        t("offer.tyreEmergency"),
      ],
      iconSrc: "/icons/TIRE_ICON.png",
      photoSrc: "/icons/tire_puncture.png",
    },
  ];

  return (
    <section className="s3-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="s3-container">

        {/* ── Hero ── */}
        <div className="s3-top">
          <div className="s3-hero-text">
            <div className="s3-eyebrow">{t("offer.subtitle")}</div>
            <h2 className="s3-title">{t("offer.title")}</h2> 
            <p className="s3-desc">{t("offer.description")}</p>
          </div>
          <div className="s3-hero-img-wrap">
            <img
              className="s3-hero-img"
              src="/towing.jpg"
              alt={t("offer.heroImageAlt")}
            />
          </div>
        </div>
        <br/>

        {/* ── Stats ── */}
        <div className="s3-stats">
          {stats.map((s) => (
            <div className="s3-stat" key={s.value}>
              <div className="s3-stat-icon">
                <img src={s.iconSrc} alt="" aria-hidden="true" />
              </div>
              <div>
                <div className="s3-stat-value">{s.value}</div>
                <div className="s3-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Cards ── */}
        <div className="s3-grid">
          {services.map((service) => (
            <a
              key={service.key}
             href={getLangLink(service.link)} // Change this line
              className={`s3-card${service.featured ? " featured" : ""}`}
            >
              {service.featured && (
                <span className="s3-badge">
                  <img src="/icons/star_icon.png" alt="" aria-hidden="true" />
                  {t("offer.mostRequested")}
                </span>
              )}

              <div className="s3-card-header">
  <div className="s3-icon-circle">
    <img src={service.iconSrc} alt="" aria-hidden="true" />
  </div>

  <h3 className="s3-card-title">{service.title}</h3>
</div>

              <p className="s3-card-desc">{service.description}</p>

              <ul className="s3-features">
                {service.features.map((feat) => (
                  <li key={feat} className="s3-feature">
                    <span className="s3-check">
                      <img src="/icons/check.png" alt="" aria-hidden="true" />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              <img
                className="s3-card-photo"
                src={service.photoSrc}
                alt=""
                aria-hidden="true"
              />

              <span className="s3-learn">
                {t("offer.learnMore")}
                <span className="s3-learn-arr">→</span>
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}