import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    if (document.getElementById("hiw-v1-styles")) return;
    const style = document.createElement("style");
    style.id = "hiw-v1-styles";
    style.textContent = `
      .hiw-section {
        background: #0b0b0e;
        padding: 90px 0 80px;
        overflow: hidden;
        position: relative;
      }

      .hiw-container {
        max-width: 1260px;
        margin: 0 auto;
        padding: 0 32px;
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 40px;
        align-items: center;
      }
      @media (max-width: 980px) {
        .hiw-container { grid-template-columns: 1fr; }
      }

      .hiw-left { min-width: 0; }

      .hiw-eyebrow {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 12px;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: #d4a017;
        margin-bottom: 18px;
      }
      [dir="ltr"] .hiw-eyebrow::before {
        content: "";
        width: 36px;
        height: 1.5px;
        background: linear-gradient(to right, transparent, #d4a017);
        display: block;
      }
      [dir="ltr"] .hiw-eyebrow::after {
        content: "";
        width: 36px;
        height: 1.5px;
        background: linear-gradient(to left, transparent, #d4a017);
        display: block;
      }
      [dir="rtl"] .hiw-eyebrow::before {
        content: "";
        width: 36px;
        height: 1.5px;
        background: linear-gradient(to left, transparent, #d4a017);
        display: block;
      }
      [dir="rtl"] .hiw-eyebrow::after {
        content: "";
        width: 36px;
        height: 1.5px;
        background: linear-gradient(to right, transparent, #d4a017);
        display: block;
      }

      .hiw-title {
        font-size: 48px;
        font-weight: 900;
        line-height: 1.1;
        color: #fff;
        margin: 0 0 16px;
        letter-spacing: -0.5px;
      }
      @media (max-width: 640px) { .hiw-title { font-size: 34px; } }

      .hiw-desc {
        font-size: 15.5px;
        line-height: 1.8;
        color: #a3a3a8;
        max-width: 480px;
        margin: 0 0 44px;
      }

      .hiw-steps {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
        margin-bottom: 32px;
        position: relative;
      }
      @media (max-width: 860px) {
        .hiw-steps { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 480px) {
        .hiw-steps { grid-template-columns: 1fr; }
      }

      .hiw-step {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 18px;
        padding: 26px 18px 22px;
        position: relative;
        text-align: center;
      }

      .hiw-step-num {
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translateX(-50%);
        background: #15151a;
        border: 1px solid rgba(212,160,23,0.5);
        color: #d4a017;
        font-size: 12px;
        font-weight: 800;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hiw-step-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(212,160,23,0.08);
        border: 1px solid rgba(212,160,23,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px auto 18px;
      }
      .hiw-step-icon img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }

      .hiw-step-title {
        font-size: 16px;
        font-weight: 800;
        color: #fff;
        margin: 0 0 8px;
        line-height: 1.3;
      }

      .hiw-step-desc {
        font-size: 12.5px;
        line-height: 1.6;
        color: #9b9ba2;
        margin: 0;
      }

      .hiw-perks {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        padding: 20px 16px;
        justify-content: space-between;
      }

      .hiw-perk {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 88px;
      }

      .hiw-perk-icon {
        width: 38px;
        height: 38px;
        object-fit: contain;
      }

      .hiw-perk-label {
        font-size: 12.5px;
        color: #d6d6da;
        text-align: center;
        font-weight: 600;
        line-height: 1.3;
      }

      .hiw-right {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 320px;
      }

      .hiw-mockup {
        max-width: 100%;
        width: 100%;
        height: auto;
        object-fit: contain;
      }
      [dir="rtl"] .hiw-mockup { transform: scaleX(-1); }

      @media (max-width: 980px) {
        .hiw-right { order: -1; max-width: 320px; margin: 0 auto 24px; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const steps = [
    {
      num: "01",
      iconSrc: "/icons/icon_sample.png",
      title: t("howItWorks.step1Title"),
      desc: t("howItWorks.step1Desc"),
    },
    {
      num: "02",
      iconSrc: "/icons/icon_sample.png",
      title: t("howItWorks.step2Title"),
      desc: t("howItWorks.step2Desc"),
    },
    {
      num: "03",
      iconSrc: "/icons/icon_sample.png",
      title: t("howItWorks.step3Title"),
      desc: t("howItWorks.step3Desc"),
    },
    {
      num: "04",
      iconSrc: "/icons/icon_sample.png",
      title: t("howItWorks.step4Title"),
      desc: t("howItWorks.step4Desc"),
    },
  ];

  const perks = [
    { iconSrc: "/icons/icon_sample.png", label: t("howItWorks.perkVerified") },
    { iconSrc: "/icons/icon_sample.png", label: t("howItWorks.perkFast") },
    { iconSrc: "/icons/icon_sample.png", label: t("howItWorks.perkSecure") },
    { iconSrc: "/icons/icon_sample.png", label: t("howItWorks.perkSupport") },
    { iconSrc: "/icons/icon_sample.png", label: t("howItWorks.perkRated") },
  ];

  return (
    <section className="hiw-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="hiw-container">
        <div className="hiw-left">
          <div className="hiw-eyebrow">{t("howItWorks.subtitle")}</div>
          <h2 className="hiw-title">{t("howItWorks.title")}</h2>
          <p className="hiw-desc">{t("howItWorks.description")}</p>

          <div className="hiw-steps">
            {steps.map((step) => (
              <div className="hiw-step" key={step.num}>
                <span className="hiw-step-num">{step.num}</span>
                <div className="hiw-step-icon">
                  <img src={step.iconSrc} alt="" aria-hidden="true" />
                </div>
                <h3 className="hiw-step-title">{step.title}</h3>
                <p className="hiw-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="hiw-perks">
            {perks.map((perk) => (
              <div className="hiw-perk" key={perk.label}>
                <img className="hiw-perk-icon" src={perk.iconSrc} alt="" aria-hidden="true" />
                <span className="hiw-perk-label">{perk.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hiw-right">
          <img
            className="hiw-mockup"
            src="/towing.jpg"
            alt={t("howItWorks.mockupImageAlt")}
          />
        </div>
      </div>
    </section>
  );
}