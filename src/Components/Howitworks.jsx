import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// The customer render is a full opaque 3D scene (recovery truck + phone),
// so the device stage crops into it with object-fit:cover to feature just
// the phone. The driver screenshot is an isolated phone on a transparent
// background with generous padding baked into the canvas, so it needs
// object-fit:contain instead — cover would crop straight into the tilted
// phone's edges since there's no scenery to crop into around it.
const CUSTOMER_APP_BG = "/new/howitworks_dark.png";
const DRIVER_APP_BG = "/new/driver-app-mockup.png";

// Each banner shows 4 cards with a real title + sentence to read — 6s gave
// people almost no time to get through them before it auto-advanced.
const BANNER_CYCLE_MS = 12000;

export default function HowItWorks() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // Driver copy is real now (from the user), moved into common.json under
  // howItWorks.driver* alongside the existing customer strings, same
  // pattern, so it participates in ar/ur translation like everything else.
  // NOTE: only the English file has these keys filled in so far — ar.json
  // and ur.json need the same driverSubtitle/driverTitle/driverDescription/
  // driverStep1-4 Title/Desc keys added with real translations; until then
  // Arabic/Urdu visitors will see i18next's fallback behavior for those
  // specific strings only (everything else on the page still translates).
  const banners = [
    {
      key: "customer",
      tabLabel: t("howItWorks.customerTab", "For Customers"),
      deviceLabel: t("howItWorks.customerTab", "For Customers"),
      accent: "#d4a017",
      deviceFit: "cover",
      devicePosition: "right center",
      deviceFramed: true,
      eyebrow: t("howItWorks.subtitle"),
      title: t("howItWorks.title"),
      description: t("howItWorks.description"),
      bg: CUSTOMER_APP_BG,
      steps: [
        { num: "01", iconSrc: "/icons/request_tow.png", title: t("howItWorks.step1Title"), desc: t("howItWorks.step1Desc") },
        { num: "02", iconSrc: "/icons/best_fit.png", title: t("howItWorks.step2Title"), desc: t("howItWorks.step2Desc") },
        { num: "03", iconSrc: "/icons/track_time.png", title: t("howItWorks.step3Title"), desc: t("howItWorks.step3Desc") },
        { num: "04", iconSrc: "/icons/safe_hassle.png", title: t("howItWorks.step4Title"), desc: t("howItWorks.step4Desc") },
      ],
    },
    {
      key: "driver",
      tabLabel: t("howItWorks.driverTab", "For Drivers"),
      deviceLabel: t("howItWorks.driverTab", "For Drivers"),
      accent: "#3aa0ff",
      deviceFit: "cover",
      devicePosition: "center",
      eyebrow: t("howItWorks.driverSubtitle"),
      title: t("howItWorks.driverTitle"),
      description: t("howItWorks.driverDescription"),
      bg: DRIVER_APP_BG,
      steps: [
        { num: "01", iconSrc: "/icons/request_tow.png", title: t("howItWorks.driverStep1Title"), desc: t("howItWorks.driverStep1Desc") },
        { num: "02", iconSrc: "/icons/verified.png", title: t("howItWorks.driverStep2Title"), desc: t("howItWorks.driverStep2Desc") },
        { num: "03", iconSrc: "/icons/best_fit.png", title: t("howItWorks.driverStep3Title"), desc: t("howItWorks.driverStep3Desc") },
        { num: "04", iconSrc: "/icons/location_icon.png", title: t("howItWorks.driverStep4Title"), desc: t("howItWorks.driverStep4Desc") },
      ],
    },
  ];

  const perks = [
    { iconSrc: "/icons/verified.png", label: t("howItWorks.perkVerified") },
    { iconSrc: "/icons/fast_response.png", label: t("howItWorks.perkFast") },
    { iconSrc: "/icons/secure_payments.png", label: t("howItWorks.perkSecure") },
    { iconSrc: "/icons/all_service.png", label: t("howItWorks.perkSupport") },
    { iconSrc: "/icons/TopRated.png", label: t("howItWorks.perkRated") },
  ];

  const [activeBanner, setActiveBanner] = useState(0);
  const isPausedRef = useRef(false);
  const cycleRef = useRef(null);

  /* ── Auto-cycle between the two banners — desktop only. On mobile the
     banner should only change when a tab is pressed; auto-advancing while
     someone is mid-read of 4 stacked cards was disorienting on a phone. ── */
  const isMobileRef = useRef(
    typeof window !== "undefined" && window.matchMedia("(max-width: 680px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 680px)");
    const onChange = () => { isMobileRef.current = mq.matches; };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    cycleRef.current = setInterval(() => {
      if (isPausedRef.current || isMobileRef.current) return;
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, BANNER_CYCLE_MS);
    return () => clearInterval(cycleRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectBanner = (i) => {
    isPausedRef.current = true;
    setActiveBanner(i);
    setTimeout(() => { isPausedRef.current = false; }, 4000);
  };

  /* ── Scroll-reveal entrance (fade + rise) — React state, not imperative
     classList.add. An imperative class survives fine on elements whose
     className never changes elsewhere, but is a trap waiting to spring
     the moment something else (like activeBanner) starts toggling a class
     on the same element — the next re-render recomputes className from
     scratch and silently wipes anything added outside React. Keeping
     "revealed" in state means it's always part of that computation. ── */
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const existing = document.getElementById("hiw-v5-styles");
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = "hiw-v5-styles";
    style.textContent = `
      .hiw-section {
        position: relative;
        padding: 32px 0;
        overflow: hidden;
        background-color: #0b0b0e;
      }

      /* Background crossfade — one layer per banner, opacity-toggled by
         activeBanner, so the photo changes together with the banner. */
      .hiw-bg-stack {
        position: absolute;
        inset: 0;
        left: 35%;
        z-index: 0;
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 40%);
        mask-image: linear-gradient(to right, transparent 0%, black 40%);
      }
      .hiw-bg-layer {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: right center;
        background-repeat: no-repeat;
        opacity: 0;
        transition: opacity 1.1s ease;
      }
      .hiw-bg-layer--active { opacity: 0.22; }
      @media (prefers-reduced-motion: reduce) {
        .hiw-bg-layer { transition: none; }
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
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
      }

      /* ── Tabs — manual banner picker, also shows which one is auto-active ── */
      .hiw-tabs {
        display: inline-flex;
        gap: 6px;
        padding: 5px;
        border-radius: 999px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.09);
        margin-bottom: 20px;
      }
      .hiw-tab {
        appearance: none;
        font: inherit;
        border: 0;
        cursor: pointer;
        padding: 9px 20px;
        border-radius: 999px;
        font-size: 12.5px;
        font-weight: 700;
        color: #9a9aa3;
        background: transparent;
        transition: color 0.25s ease, background 0.25s ease;
        white-space: nowrap;
      }
      .hiw-tab:hover { color: #d0d0d6; }
      /* Custom focus ring, not the browser default blue outline — a stray
         blue ring on an otherwise gold/black page reads as broken, and the
         active pill needs to stay unmistakably bright regardless of
         hover/focus state. */
      .hiw-tab:focus-visible {
        outline: 2px solid rgba(212,160,23,0.55);
        outline-offset: 2px;
      }
      .hiw-tab--active {
        color: #111114;
        background: #d4a017;
        box-shadow: 0 4px 16px rgba(212,160,23,0.4);
      }
      .hiw-tab--active:hover { color: #111114; }
      .hiw-tab--active:focus-visible {
        outline-color: rgba(255,255,255,0.65);
      }

      /* ── Sliding track — two full banners side by side ── */
      .hiw-track-viewport { overflow: hidden; }
      .hiw-track {
        display: flex;
        width: 200%;
        /* The step-number badges sit at top:-13px, intentionally poking
           above their card's top edge. Row-1 cards (01/02) have nothing
           above them to absorb that overflow, so overflow:hidden on the
           viewport above was clipping their tops off. This padding
           reserves the headroom instead. */
        padding-top: 18px;
        transition: transform 0.65s cubic-bezier(0.65,0,0.35,1);
      }
      @media (prefers-reduced-motion: reduce) {
        .hiw-track { transition: none; }
      }
      .hiw-slide {
        flex: 0 0 50%;
        max-width: 50%;
        min-width: 0;
      }

      /* Sidebar | large centered phone | stacked step cards — three
         columns reading left to right as one composition, phone taking
         center stage instead of being tucked into a corner. */
      .hiw-layout {
        display: grid;
        grid-template-columns: 250px 320px 1fr;
        gap: 26px;
        align-items: center;
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
        margin-bottom: 10px;
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
        font-size: 30px;
        font-weight: 900;
        line-height: 1.1;
        color: #fff;
        letter-spacing: -0.5px;
        margin: 0 0 10px;
      }
      .hiw-desc {
        font-size: 13.5px;
        line-height: 1.65;
        color: #7e7e88;
        margin: 0;
      }

      /* ── PERKS STRIP: one continuous bordered bar with divider lines
         between segments, not separate floating pills — shared across
         both banners, below the sliding track. ── */
      .hiw-perks-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 20px;
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 14px;
        background: rgba(255,255,255,0.02);
        padding: 4px;
      }
      .hiw-perk {
        flex: 1 1 0;
        min-width: 170px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 9px 14px;
        border-inline-end: 1px solid rgba(255,255,255,0.09);
        transition: background 0.2s ease;
      }
      .hiw-perk:last-child { border-inline-end: none; }
      .hiw-perk:hover { background: rgba(255,255,255,0.04); }
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

      /* ── PHONE — large, centered, its own column. Both banners
         crossfade their own image + accent color here, so a real
         driver-app screenshot is a one-line swap away (see DRIVER_APP_BG
         above) — no layout work needed when it lands. ── */
      .hiw-phone-col {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 340px;
      }
      .hiw-device-glow {
        position: absolute;
        inset: -20px -30px;
        border-radius: 50%;
        filter: blur(54px);
        opacity: 0.5;
        transition: background 0.7s ease;
        pointer-events: none;
        z-index: 0;
      }
      .hiw-device-img {
        /* object-fit/position/framing are set inline per banner — the
           customer render is a full opaque scene that needs cropping into
           (cover), the driver screenshot is an isolated phone on a
           transparent canvas that needs to be shown whole (contain). */
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 26px 40px rgba(0,0,0,0.5));
      }
      .hiw-device-badge {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 999px;
        background: rgba(10,10,12,0.85);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.16);
        font-size: 11px;
        font-weight: 800;
        color: #fff;
        white-space: nowrap;
        box-shadow: 0 8px 20px rgba(0,0,0,0.35);
      }
      .hiw-device-badge-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        transition: background 0.4s ease;
        flex-shrink: 0;
      }

      /* ── Step cards — single stacked column beside the phone ── */
      .hiw-cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
      }
      .hiw-step {
        /* Frosted glass, not a near-transparent tint — cards need to read
           cleanly on their own regardless of what the background photo is
           doing underneath them. Wide single-column card now (not a 2×2
           grid tile), so icon sits beside the text instead of above it. */
        background: rgba(20,18,10,0.55);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 16px;
        padding: 13px 20px;
        position: relative;
        transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        cursor: default;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
      }
      .hiw-step:hover {
        transform: translateX(4px);
        border-color: rgba(212,160,23,0.4);
        box-shadow: 0 14px 32px rgba(212,160,23,0.1);
      }
      [dir="rtl"] .hiw-step:hover { transform: translateX(-4px); }
      .hiw-step-num {
        position: absolute;
        top: -10px;
        left: 14px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #111114;
        border: 1px solid rgba(212,160,23,0.5);
        color: #d4a017;
        font-size: 10px;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      [dir="rtl"] .hiw-step-num { left: auto; right: 18px; }
      .hiw-step-icon {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: rgba(212,160,23,0.07);
        border: 1px solid rgba(212,160,23,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: transform 0.25s ease, background 0.25s ease;
      }
      .hiw-step:hover .hiw-step-icon {
        transform: scale(1.08) rotate(-4deg);
        background: rgba(212,160,23,0.16);
      }
      .hiw-step-icon img { width: 26px; height: 24px; object-fit: contain; }
      .hiw-step-text { min-width: 0; }
      .hiw-step-title {
        font-size: 13.5px;
        font-weight: 800;
        color: #fff;
        line-height: 1.25;
        margin: 0 0 3px;
      }
      .hiw-step-desc {
        font-size: 11.5px;
        line-height: 1.45;
        color: #7e7e88;
        margin: 0;
      }

      /* ── Scroll-reveal entrance ── */
      .hiw-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                    transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .hiw-reveal.hiw-visible { opacity: 1 !important; transform: none !important; }
      @media (prefers-reduced-motion: reduce) {
        .hiw-reveal { opacity: 1; transform: none; transition: none; }
      }

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
        .hiw-phone-col { display: none; }
        .hiw-cards { grid-template-columns: 1fr 1fr; }
      }

      /* ════════════════════
         MOBILE  ≤ 680px
      ════════════════════ */
      @media (max-width: 680px) {
        .hiw-section { padding: 56px 0 52px; }
        .hiw-container { padding: 0 18px; }
        .hiw-tabs { margin-bottom: 24px; }
        .hiw-sidebar { grid-template-columns: 1fr; gap: 16px; }
        .hiw-title { font-size: 30px; }
        .hiw-desc { font-size: 14px; }

        /* Perks become a horizontal scroll-snap strip instead of wrapping
           five pills into a cramped 3-row block. */
        .hiw-perks-row {
          flex-wrap: nowrap;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 2px 18px 6px;
          margin: 20px -18px 0;
        }
        .hiw-perks-row::-webkit-scrollbar { display: none; }
        .hiw-perk {
          flex-shrink: 0;
          scroll-snap-align: start;
        }
        .hiw-perk-label { font-size: 11px; }

        /* All 4 steps visible at once as a 2×2 grid — no horizontal
           scrolling, no auto-advancing carousel to sit through. Cards
           revert to icon-above-text (not beside it) since a 2-up grid at
           phone width leaves too little room for a side-by-side row. */
        .hiw-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding-top: 14px;
        }
        .hiw-step {
          flex-direction: column;
          padding: 18px 14px 16px;
          min-width: 0;
        }
        .hiw-step-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
        }
        .hiw-step-icon img { width: 26px; height: 26px; }
        .hiw-step-title { font-size: 12.5px; margin-bottom: 5px; }
        .hiw-step-desc { font-size: 10.5px; line-height: 1.5; }
        .hiw-step-num { width: 24px; height: 24px; font-size: 10px; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("hiw-v5-styles");
      if (el) el.remove();
    };
  }, []);

  // 50% per step, not 100% — translateX() percentages resolve against the
  // *track's own* width (200%, since it holds 2 slides side by side), not
  // the viewport. -100% would drag the track a full two viewport-widths
  // left, pushing both banners' content off-screen entirely (only the
  // separately-layered background stayed visible, since it's not part of
  // this sliding track) — that's the "why is it blank" bug.
  const trackOffset = isRTL ? activeBanner * 50 : -activeBanner * 50;

  return (
    <section
      className="hiw-section"
      dir={isRTL ? "rtl" : "ltr"}
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      <div className="hiw-bg-stack" aria-hidden="true">
        {banners.map((banner, i) => (
          <div
            key={banner.key}
            className={`hiw-bg-layer${i === activeBanner ? " hiw-bg-layer--active" : ""}`}
            style={{ backgroundImage: `url(${banner.bg})` }}
          />
        ))}
      </div>

      <div className="hiw-container" ref={sectionRef}>
        <div className={`hiw-tabs hiw-reveal${revealed ? " hiw-visible" : ""}`} role="tablist" aria-label="Audience">
          {banners.map((banner, i) => (
            <button
              key={banner.key}
              type="button"
              role="tab"
              aria-selected={i === activeBanner}
              className={`hiw-tab${i === activeBanner ? " hiw-tab--active" : ""}`}
              onClick={() => selectBanner(i)}
            >
              {banner.tabLabel}
            </button>
          ))}
        </div>

        <div className="hiw-track-viewport">
          <div className="hiw-track" style={{ transform: `translateX(${trackOffset}%)` }}>
            {banners.map((banner, bannerIdx) => (
              <div className="hiw-slide" key={banner.key} aria-hidden={bannerIdx !== activeBanner}>
                <div className="hiw-layout">
                  {/* ── SIDEBAR ── */}
                  <div className="hiw-sidebar">
                    <div className={`hiw-reveal${revealed ? " hiw-visible" : ""}`}>
                      <div className="hiw-eyebrow">{banner.eyebrow}</div>
                      <h2 className="hiw-title">{banner.title}</h2>
                      <p className="hiw-desc">{banner.description}</p>
                    </div>
                  </div>

                  {/* ── PHONE — center stage ── */}
                  <div
                    className={`hiw-phone-col hiw-reveal${revealed ? " hiw-visible" : ""}`}
                    style={{ transitionDelay: revealed ? "180ms" : "0ms" }}
                    aria-hidden="true"
                  >
                    <div
                      className="hiw-device-glow"
                      style={{ background: `radial-gradient(circle, ${banner.accent}55 0%, transparent 70%)` }}
                    />
                    <img
                      className="hiw-device-img"
                      src={banner.bg}
                      alt=""
                      style={{
                        objectFit: banner.deviceFit,
                        objectPosition: banner.devicePosition,
                        ...(banner.deviceFramed
                          ? { borderRadius: "20px", border: "1px solid rgba(255,255,255,0.12)" }
                          : {}),
                      }}
                    />
                    <span className="hiw-device-badge">
                      <span className="hiw-device-badge-dot" style={{ background: banner.accent }} />
                      {banner.deviceLabel}
                    </span>
                  </div>

                  {/* ── STEP CARDS — stacked single column ── */}
                  <div className="hiw-cards">
                    {banner.steps.map((step, i) => (
                      <div
                        className={`hiw-step hiw-reveal${revealed ? " hiw-visible" : ""}`}
                        style={{ transitionDelay: revealed ? `${i * 90}ms` : "0ms" }}
                        key={step.num}
                      >
                        <span className="hiw-step-num">{step.num}</span>
                        <div className="hiw-step-icon">
                          <img src={step.iconSrc} alt="" aria-hidden="true" />
                        </div>
                        <div className="hiw-step-text">
                          <h3 className="hiw-step-title">{step.title}</h3>
                          <p className="hiw-step-desc">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Perks row — shared across both banners */}
        <div
          className={`hiw-perks-row hiw-reveal${revealed ? " hiw-visible" : ""}`}
          style={{ transitionDelay: revealed ? "440ms" : "0ms" }}
        >
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
    </section>
  );
}
