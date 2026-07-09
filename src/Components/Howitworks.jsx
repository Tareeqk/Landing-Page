import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const stepsRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const autoScrollRef = useRef(null);
  const isPausedRef = useRef(false);
  const [perkOffset, setPerkOffset] = useState(0);
  const [perkFade, setPerkFade] = useState(true);

  /* ── Auto-cycle perks 2 at a time (mobile only) ── */
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth > 680) return;
      // fade out
      setPerkFade(false);
      setTimeout(() => {
        setPerkOffset((prev) => (prev + 2));
        // fade in
        setPerkFade(true);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* ── Auto-scroll steps carousel (mobile only) ── */
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;

    const onScroll = () => {
      const cards = el.querySelectorAll(".hiw-step");
      let closest = 0, minDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.offsetLeft - el.scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveStep(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const onTouchStart = () => { isPausedRef.current = true; };
    const onTouchEnd = () => {
      setTimeout(() => { isPausedRef.current = false; }, 2000);
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    const startAutoScroll = () => {
      if (window.innerWidth > 680) return;
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = setInterval(() => {
        if (isPausedRef.current) return;
        const cards = el.querySelectorAll(".hiw-step");
        if (!cards.length) return;
        const cardWidth = cards[0].offsetWidth + 14;
        const maxScroll = el.scrollWidth - el.clientWidth;
        const nextScroll = el.scrollLeft + cardWidth;
        if (el.scrollLeft >= maxScroll - 4) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          el.scrollTo({ left: nextScroll, behavior: "smooth" });
        }
      }, 2800);
    };

    startAutoScroll();
    window.addEventListener("resize", startAutoScroll);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", startAutoScroll);
      clearInterval(autoScrollRef.current);
    };
  }, []);

  useEffect(() => {
    const existing = document.getElementById("hiw-v5-styles");
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = "hiw-v5-styles";
    style.textContent = `
      .hiw-section {
        position: relative;
        padding: 100px 0;
        overflow: hidden;
        background-color: #0b0b0e;
      }
      /* bg: the mockup image, anchored to the right, fading out toward the left */
      .hiw-section::after {
        content: "";
        position: absolute;
        inset: 0;
        left: 35%;
        background-image: url("/new/howitworks_dark.png");
        background-size: cover;
        background-position: right center;
        background-repeat: no-repeat;
        opacity: 0.35;
        z-index: 0;
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 40%);
        mask-image: linear-gradient(to right, transparent 0%, black 40%);
      }
      /* warm gold glow on the right to tie it together */
      .hiw-section::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse at 85% 50%, rgba(212,160,23,0.07) 0%, transparent 55%),
          linear-gradient(to left, rgba(11,11,14,0.15) 0%, rgba(11,11,14,0.85) 55%, #0b0b0e 75%);
        z-index: 1;
        pointer-events: none;
      }
      .hiw-container {
        position: relative;
        z-index: 2;
      }
      .hiw-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
      }
      .hiw-layout {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 48px;
        align-items: start;
      }
      .hiw-sidebar {
        position: sticky;
        top: 100px;
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
      .hiw-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 3.5px;
        text-transform: uppercase;
        color: #d4a017;
        margin-bottom: 16px;
      }
      .hiw-eyebrow::before,
      .hiw-eyebrow::after {
        content: "";
        display: block;
        width: 26px;
        height: 1px;
        background: #d4a017;
        opacity: 0.65;
        flex-shrink: 0;
      }
      .hiw-title {
        font-size: 40px;
        font-weight: 900;
        line-height: 1.08;
        color: #fff;
        letter-spacing: -0.5px;
        margin: 0 0 12px;
      }
      .hiw-desc {
        font-size: 14.5px;
        line-height: 1.8;
        color: #7e7e88;
        margin: 0;
      }

      /* ── PERKS ROW: horizontal, below the cards ── */
      .hiw-perks-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 4px;
      }
      .hiw-perk {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 999px;
        padding: 8px 16px 8px 8px;
        transition: border-color 0.2s, background 0.2s;
      }
      .hiw-perk:hover {
        border-color: rgba(212,160,23,0.35);
        background: rgba(255,255,255,0.06);
      }
      .hiw-perk-icon-wrap {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(212,160,23,0.08);
        border: 1px solid rgba(212,160,23,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .hiw-perk-icon { width: 34px; height: 34px; object-fit: contain; flex-shrink: 0; display: block; }
      .hiw-perk-label { font-size: 12px; font-weight: 700; color: #d0d0d6; white-space: nowrap; }

      /* ── RIGHT ── */
      .hiw-right {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: stretch;
        overflow: visible;
      }
      .hiw-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 16px;
      }
      .hiw-step {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 28px 18px 22px;
        position: relative;
        transition: transform 0.25s ease, border-color 0.25s ease;
        cursor: default;
        display: flex;
        flex-direction: column;
      }
      .hiw-step:hover {
        transform: translateY(-4px);
        border-color: rgba(212,160,23,0.3);
      }
      .hiw-step-num {
        position: absolute;
        top: -13px;
        left: 18px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #111114;
        border: 1px solid rgba(212,160,23,0.5);
        color: #d4a017;
        font-size: 11px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      [dir="rtl"] .hiw-step-num { left: auto; right: 18px; }
      .hiw-step-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(212,160,23,0.07);
        border: 1px solid rgba(212,160,23,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 14px;
        flex-shrink: 0;
      }
      .hiw-step-icon img { width: 38px; height: 36px; object-fit: contain; }
      .hiw-step-title {
        font-size: 14px;
        font-weight: 800;
        color: #fff;
        line-height: 1.3;
        margin: 0 0 7px;
      }
      .hiw-step-desc {
        font-size: 12px;
        line-height: 1.6;
        color: #7e7e88;
        margin: 0;
      }

      .hiw-dots { display: none; }

      /* ════════════════════
         TABLET  ≤ 1080px
      ════════════════════ */
      @media (max-width: 1080px) {
        .hiw-layout { grid-template-columns: 1fr; gap: 36px; }
        .hiw-sidebar {
          position: relative;
          top: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .hiw-title { font-size: 36px; }
        .hiw-right { grid-template-columns: 1fr; }
      }

      /* ════════════════════
         MOBILE  ≤ 680px
      ════════════════════ */
      @media (max-width: 680px) {
        .hiw-section { padding: 56px 0 52px; }
        .hiw-container { padding: 0 18px; }
        .hiw-sidebar { grid-template-columns: 1fr; gap: 16px; }
        .hiw-title { font-size: 30px; }
        .hiw-desc { font-size: 14px; }

        /* hide desktop perks, show mobile cycling perks */
        .hiw-perks-row { gap: 8px; }
        .hiw-perk-label { font-size: 11px; }

        .hiw-right { grid-template-columns: 1fr; gap: 20px; }
        .hiw-cards {
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 14px;
          padding: 16px 18px 10px;
          margin: 0 -18px;
          scrollbar-width: none;
          grid-template-columns: unset;
          grid-template-rows: unset;
        }
        .hiw-cards::-webkit-scrollbar { display: none; }
        .hiw-step {
          min-width: 72vw;
          max-width: 72vw;
          flex-shrink: 0;
          scroll-snap-align: start;
        }

        .hiw-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 10px;
        }
        .hiw-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          transition: background 0.25s, transform 0.25s;
        }
        .hiw-dot.hiw-dot--active {
          background: #d4a017;
          transform: scale(1.4);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("hiw-v5-styles");
      if (el) el.remove();
    };
  }, []);

  const steps = [
    { num: "01", iconSrc: "/icons/request_tow.png", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
    { num: "02", iconSrc: "/icons/best_fit.png", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
    { num: "03", iconSrc: "/icons/track_time.png", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
    { num: "04", iconSrc: "/icons/safe_hassle.png", title: t("howItWorks.step4Title"), desc: t("howItWorks.step4Desc") },
  ];

   const perks = [
    { iconSrc: "/icons/verified.png", label: t("howItWorks.perkVerified") },
    { iconSrc: "/icons/fast_response.png", label: t("howItWorks.perkFast") },
    { iconSrc: "/icons/secure_payments.png", label: t("howItWorks.perkSecure") },
    { iconSrc: "/icons/all_service.png", label: t("howItWorks.perkSupport") },
    { iconSrc: "/icons/TopRated.png", label: t("howItWorks.perkRated") },
  ];

  // Always show exactly 2 perks, cycling through with wrap-around
  const visiblePerks = [
    perks[perkOffset % perks.length],
    perks[(perkOffset + 1) % perks.length],
  ];

  return (
    <section className="hiw-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="hiw-container">
        <div className="hiw-layout">

          {/* ── SIDEBAR ── */}
          <div className="hiw-sidebar">
            <div>
              <div className="hiw-eyebrow">{t("howItWorks.subtitle")}</div>
              <h2 className="hiw-title">{t("howItWorks.title")}</h2>
              <p className="hiw-desc">{t("howItWorks.description")}</p>
            </div>
          </div>

          {/* ── RIGHT: 2×2 cards + perks row ── */}
          <div className="hiw-right">
            <div className="hiw-cards" ref={stepsRef}>
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

            {/* Perks row — below the cards */}
            <div className="hiw-perks-row">
              {perks.map((p) => (
                <div className="hiw-perk" key={p.label}>
                  <div className="hiw-perk-icon-wrap">
                    <img className="hiw-perk-icon" src={p.iconSrc} alt="" aria-hidden="true" />
                  </div>
                  <span className="hiw-perk-label">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dot indicators — mobile only */}
        <div className="hiw-dots" aria-hidden="true">
          {steps.map((_, i) => (
            <span key={i} className={`hiw-dot${i === activeStep ? " hiw-dot--active" : ""}`} />
          ))}
        </div>

      </div>
    </section>
  );
}