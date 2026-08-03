import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Both mockups are multi-phone group shots (booking flow + home screen /
// wallet + active rides) on a transparent canvas, at the same 4:3 ratio —
// object-fit:contain on both keeps every phone in the group fully visible
// instead of cropping into the composition.
const CUSTOMER_APP_BG = "/new/MOBILE MOCKUP TAREEQK CUSTOMER.png";
const DRIVER_APP_BG = "/new/MOBILE MOCKUP TAREEQK DRIVER.png";

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
  // Doubled so the marquee can loop seamlessly (translateX(-50%) lands
  // exactly back on the first copy) — same trick as the offer section's
  // mobile stats ticker.
  const tickerPerks = [...perks, ...perks];

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

      /* Copy on the left, the phone group large on the right — the phone
         is the thing being sold here, so it gets the dominant half of the
         row instead of being squeezed into a slim center column between
         two text blocks. Step cards move to their own full-width row
         below, where they have real room instead of a cramped 1fr sliver. */
      .hiw-top {
        display: grid;
        grid-template-columns: minmax(260px, 420px) 1fr;
        gap: 40px;
        align-items: center;
        margin-bottom: 32px;
      }
      .hiw-info { max-width: 460px; }
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
        padding: 6px;
      }
      .hiw-perk {
        flex: 1 1 0;
        min-width: 170px;
        display: inline-flex;
        align-items: center;
        gap: 14px;
        padding: 16px 22px;
        border-inline-end: 1px solid rgba(255,255,255,0.09);
        transition: background 0.2s ease;
      }
      .hiw-perk:last-child { border-inline-end: none; }
      .hiw-perk:hover { background: rgba(255,255,255,0.04); }
      .hiw-perk-icon-wrap {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(212,160,23,0.08);
        border: 1px solid rgba(212,160,23,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .hiw-perk-icon { width: 40px; height: 40px; object-fit: contain; flex-shrink: 0; display: block; }
      .hiw-perk-label { font-size: 13px; font-weight: 700; color: #d0d0d6; white-space: nowrap; }

      /* ── PERKS TICKER — mobile-only auto-scrolling marquee, swapped in
         for the desktop bar below (same pattern as the "What We Offer"
         section's mobile stats ticker: duplicate the list once and
         animate a continuous loop, no user interaction required). ── */
      .hiw-perks-ticker { display: none; }

      /* ── PHONE — the section's visual lead. Both banners crossfade
         their own image + accent color here, so swapping the source
         mockup is a one-line change (see CUSTOMER_APP_BG/DRIVER_APP_BG
         above) — no layout work needed when a new render lands. */
      .hiw-phone-col {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 380px;
      }
      .hiw-phone-stage {
        position: relative;
        width: 100%;
        max-width: 560px;
        aspect-ratio: 4 / 3;
      }
      /* Soft "console" panel behind the phones — gives the render a
         defined edge to sit inside instead of floating loose against the
         page's flat dark background, which is what was making it read as
         small/washed-out. */
      .hiw-phone-stage::before {
        content: "";
        position: absolute;
        inset: 4%;
        border-radius: 32px;
        background: linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
        border: 1px solid rgba(255,255,255,0.08);
        z-index: 0;
      }
      .hiw-device-glow {
        position: absolute;
        inset: -10%;
        border-radius: 50%;
        filter: blur(60px);
        opacity: 0.6;
        transition: background 0.7s ease;
        pointer-events: none;
        z-index: 0;
      }
      .hiw-device-img {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 18px 30px rgba(0,0,0,0.35));
      }
      .hiw-device-badge {
        position: absolute;
        top: 6%;
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
        box-shadow: 0 6px 16px rgba(0,0,0,0.25);
      }
      .hiw-device-badge-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        transition: background 0.4s ease;
        flex-shrink: 0;
      }

      /* ── Step cards — full-width row below the phone, not squeezed into
         a sliver beside it, so each one has room to breathe. ── */
      .hiw-cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
      }
      .hiw-step {
        /* Frosted glass, not a near-transparent tint — cards need to read
           cleanly on their own regardless of what the background photo is
           doing underneath them. */
        background: rgba(20,18,10,0.55);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 16px;
        padding: 20px 16px 16px;
        position: relative;
        transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        cursor: default;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .hiw-step:hover {
        transform: translateY(-4px);
        border-color: rgba(212,160,23,0.4);
        box-shadow: 0 10px 24px rgba(212,160,23,0.08);
      }
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
        transition: opacity 1.0s cubic-bezier(0.16,1,0.3,1),
                    transform 1.0s cubic-bezier(0.16,1,0.3,1);
      }
      .hiw-reveal.hiw-visible { opacity: 1 !important; transform: none !important; }
      @media (prefers-reduced-motion: reduce) {
        .hiw-reveal { opacity: 1; transform: none; transition: none; }
      }

      /* ════════════════════
         TABLET  ≤ 1080px
      ════════════════════ */
      @media (max-width: 1080px) {
        .hiw-top { grid-template-columns: 1fr; gap: 8px; }
        .hiw-info { max-width: none; }
        .hiw-title { font-size: 36px; }
        /* Stacks below the copy instead of sitting beside it — still the
           full mockup, just smaller than the two-column desktop stage. */
        .hiw-phone-col { min-height: 0; margin: 20px 0 8px; }
        .hiw-phone-stage { max-width: 380px; margin: 0 auto; }
        .hiw-cards { grid-template-columns: 1fr 1fr; }
      }

      /* ════════════════════
         MOBILE  ≤ 680px
      ════════════════════ */
      @media (max-width: 680px) {
        .hiw-section { padding: 56px 0 52px; }
        .hiw-container { padding: 0 18px; }
        .hiw-tabs { margin-bottom: 24px; }
        .hiw-title { font-size: 30px; }
        .hiw-desc { font-size: 14px; }
        .hiw-phone-stage { max-width: 300px; }

        /* Manual swipe strip is swapped for an always-moving ticker below —
           five pills wrapped into a cramped 3-row block was the original
           problem, and a cut-off swipeable strip read as narrow/broken
           rather than inviting a swipe. Hide the desktop bar entirely. */
        .hiw-perks-viewport { display: none; }

        .hiw-perks-ticker {
          display: block;
          position: relative;
          margin: 20px -18px 0;
          overflow: hidden;
        }
        /* Same edge-fade hint as the "What We Offer" section's stats
           ticker — signals continuous motion rather than a hard cutoff. */
        .hiw-perks-ticker::before,
        .hiw-perks-ticker::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 28px;
          z-index: 2;
          pointer-events: none;
        }
        .hiw-perks-ticker::before {
          left: 0;
          background: linear-gradient(to right, #0b0b0e, transparent);
        }
        .hiw-perks-ticker::after {
          right: 0;
          background: linear-gradient(to left, #0b0b0e, transparent);
        }
        .hiw-perks-track {
          display: flex;
          gap: 10px;
          width: max-content;
          padding: 2px 18px;
          animation: hiw-perks-scroll 22s linear infinite;
        }
        .hiw-perks-ticker:hover .hiw-perks-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .hiw-perks-track { animation: none; }
        }
        @keyframes hiw-perks-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hiw-ticker-perk {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          padding: 10px 16px;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
          white-space: nowrap;
        }
        .hiw-ticker-perk .hiw-perk-icon-wrap { width: 32px; height: 32px; }
        .hiw-ticker-perk .hiw-perk-icon { width: 32px; height: 32px; }
        .hiw-ticker-perk .hiw-perk-label { font-size: 12px; }

        /* All 4 steps visible at once as a 2×2 grid — no horizontal
           scrolling, no auto-advancing carousel to sit through. */
        .hiw-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .hiw-step {
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
                <div className="hiw-top">
                  <div className={`hiw-info hiw-reveal${revealed ? " hiw-visible" : ""}`}>
                    <div className="hiw-eyebrow">{banner.eyebrow}</div>
                    <h2 className="hiw-title">{banner.title}</h2>
                    <p className="hiw-desc">{banner.description}</p>
                  </div>

                  {/* ── PHONE — the dominant visual, large on the right ── */}
                  <div
                    className={`hiw-phone-col hiw-reveal${revealed ? " hiw-visible" : ""}`}
                    style={{ transitionDelay: revealed ? "180ms" : "0ms" }}
                    aria-hidden="true"
                  >
                    <div className="hiw-phone-stage">
                      <div
                        className="hiw-device-glow"
                        style={{ background: `radial-gradient(circle, ${banner.accent}55 0%, transparent 70%)` }}
                      />
                      <img
                        className="hiw-device-img"
                        src={banner.bg}
                        alt=""
                        style={{ objectFit: "contain", objectPosition: "center" }}
                      />
                      <span className="hiw-device-badge">
                        <span className="hiw-device-badge-dot" style={{ background: banner.accent }} />
                        {banner.deviceLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── STEP CARDS — full-width row below ── */}
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
            ))}
          </div>
        </div>

        {/* Perks — wrapping bordered bar on desktop, hidden below 680px. */}
        <div className="hiw-perks-viewport">
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

        {/* Perks — auto-scrolling marquee, shown only below 680px (see
            .hiw-perks-ticker in the mobile block above). aria-hidden since
            the same five perks are already in the desktop bar above for
            assistive tech; this is a decorative duplicate. */}
        <div className="hiw-perks-ticker" aria-hidden="true">
          <div className="hiw-perks-track">
            {tickerPerks.map((p, i) => (
              <div className="hiw-ticker-perk" key={`${p.label}-${i}`}>
                <div className="hiw-perk-icon-wrap">
                  <img className="hiw-perk-icon" src={p.iconSrc} alt="" />
                </div>
                <span className="hiw-perk-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
