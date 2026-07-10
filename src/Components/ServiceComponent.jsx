import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useLangLink from "../hooks/useLangLink";

export default function WhatWeOffer() {
  const { t, i18n } = useTranslation();
  const getLangLink = useLangLink();
  const isRTL = i18n.dir() === "rtl";

  // ── Carousel state
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const gridRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isScrollingRef = useRef(false);

  const services = [
    {
      key: "recovery",
      title: t("offer.recovery"),
      description: t("offer.recoveryDescription"),
      link: "/car-recovery-dubai",
      featured: true,
      features: [
        t("offer.recovery3ton"),
        t("offer.recovery5ton"),
        t("offer.recovery10ton"),
      ],
      iconSrc: "/icons/TRUCK_ICON.png",
      photoSrc: "/icons/car_recovery.jpg",
      photoPosition: "center 30%",
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
      photoPosition: "center center",
    },
    {
      key: "tyre",
      title: t("offer.tyre"),
      description: t("offer.tyreDescription"),
      link: "/flat-tyre-repair-dubai",
      featured: false,
      features: [
        t("offer.tyreFlatAssist"),
        t("offer.tyreReplacement"),
        t("offer.tyreEmergency"),
      ],
      iconSrc: "/icons/TIRE_ICON.png",
      photoSrc: "/icons/tire_puncture.png",
      photoPosition: "center bottom",
    },
  ];

  const stats = [
    { iconSrc: "/icons/support.png",        value: t("offer.appBookingTop"),  label: t("offer.appBooking")  },
    { iconSrc: "/icons/clock.png",           value: t("offer.appServiceTop"), label: t("offer.appService")  },
    { iconSrc: "/icons/check.png",           value: t("offer.appTrackingTop"),label: t("offer.appTracking") },
    { iconSrc: "/icons/location_icon.png",   value: t("offer.appRecoveryTop"),label: t("offer.appRecovery") },
  ];

  // ── Scroll to card by index
  // Delta computed via getBoundingClientRect (always real physical
  // coordinates, sidesteps Chrome/Firefox disagreeing on the sign/origin
  // of `scrollLeft` inside an RTL container) and applied with `scrollBy`
  // on the grid element specifically. Deliberately NOT `scrollIntoView` —
  // that walks up every ancestor scroll container including the page
  // itself, so it was yanking the whole page back to this section on
  // every auto-scroll tick if the user had scrolled past it.
  const scrollToCard = useCallback((idx) => {
    const grid = gridRef.current;
    if (!grid) return;
    const card = grid.children[idx];
    if (!card) return;
    isScrollingRef.current = true;
    const delta = card.getBoundingClientRect().left - grid.getBoundingClientRect().left;
    grid.scrollBy({ left: delta, behavior: "smooth" });
    setActiveIdx(idx);
    setTimeout(() => { isScrollingRef.current = false; }, 500);
  }, []);

  // ── Auto-scroll timer — skipped entirely under prefers-reduced-motion
  const startAutoScroll = useCallback(() => {
    clearInterval(autoScrollRef.current);
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    autoScrollRef.current = setInterval(() => {
      if (isPaused) return;
      setActiveIdx((prev) => {
        const next = (prev + 1) % services.length;
        scrollToCard(next);
        return next;
      });
    }, 3500);
  }, [isPaused, services.length, scrollToCard]);

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(autoScrollRef.current);
  }, [startAutoScroll]);

  // ── Track user scroll to update dots
  // Uses `getBoundingClientRect()` rather than `scrollLeft` math for the
  // same RTL cross-browser reason as scrollToCard above — bounding rects
  // are always real physical viewport positions regardless of direction.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const onScroll = () => {
      if (isScrollingRef.current) return;
      const gridRect = grid.getBoundingClientRect();
      let closest = 0, minDist = Infinity;
      Array.from(grid.children).forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - gridRect.left);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIdx(closest);
    };
    grid.addEventListener("scroll", onScroll, { passive: true });
    return () => grid.removeEventListener("scroll", onScroll);
  }, [services.length]);

  // ── Scroll-reveal entrance (fade + rise), staggered via transitionDelay.
  // Tracked as React state, not imperative classList.add — an element
  // whose className also depends on frequently-changing state (like
  // HowItWorks' step cards keyed to its auto-cycling activeStep) would
  // have that imperative class silently wiped on the next re-render, since
  // React recomputes className from scratch and has no idea "s4-visible"
  // was ever added outside its own render. None of these elements happen
  // to hit that today, but keeping it in state removes the trap entirely.
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

  // ── Pause on touch
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd  = () => { setIsPaused(false); startAutoScroll(); };

  // ── Inject styles
  useEffect(() => {
    if (document.getElementById("services-v4-styles")) return;
    const style = document.createElement("style");
    style.id = "services-v4-styles";
    style.textContent = `
      /* ════════════ SECTION ════════════ */
      .s4-section {
        background: #f7f7f7;
        padding: 80px 0 100px;
        overflow: hidden;
      }
      body.dark .s4-section { background: #141414; }

      /* ── Scroll-reveal entrance ── */
      .s4-reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                    transform 0.7s cubic-bezier(0.16,1,0.3,1);
      }
      .s4-reveal.s4-visible { opacity: 1 !important; transform: none !important; }
      @media (prefers-reduced-motion: reduce) {
        .s4-reveal { opacity: 1; transform: none; transition: none; }
      }

      .s4-container {
        max-width: 1260px;
        margin: 0 auto;
        padding: 0 32px;
      }

      /* ════════════ HERO TOP ════════════ */
      .s4-top {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
        align-items: flex-end;
        margin-bottom: 0;
        position: relative;
      }
      @media (max-width: 768px) {
        .s4-top { grid-template-columns: 1fr; }
        .s4-hero-img-wrap { display: none; }
      }

      .s4-hero-text { padding-bottom: 40px; }

      .s4-eyebrow {
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
      [dir="ltr"] .s4-eyebrow::before {
        content: "";
        width: 32px; height: 2px;
        background: #d4a017;
        display: block;
        border-radius: 2px;
      }
      [dir="rtl"] .s4-eyebrow::after {
        content: "";
        width: 32px; height: 2px;
        background: #d4a017;
        display: block;
        border-radius: 2px;
      }

      .s4-title {
        font-size: 40px;
        font-weight: 900;
        line-height: 1.05;
        color: #0a0a0a;
        margin: 0 0 22px;
        letter-spacing: -1px;
      }
      body.dark .s4-title { color: #f2f2f2; }

      .s4-desc {
        font-size: 15px;
        line-height: 1.8;
        color: #5a5a5a;
        max-width: 480px;
      }
      [dir="ltr"] .s4-desc { text-align: left; }
      [dir="rtl"] .s4-desc { text-align: right; }
      body.dark .s4-desc { color: #888; }

      /* ── Hero Image — blended, not boxed ── */
      .s4-hero-img-wrap {
        position: relative;
        height: 320px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
      }
      .s4-hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 20%;
        display: block;
        mix-blend-mode: multiply;
        filter: brightness(0.9) contrast(1.05);
        border-radius: 32px;
        /* Crisp rounded silhouette (shadow gives it a defined edge/shape
           against the page) — fade is concentrated only at the very bottom
           where the stat row overlaps it (negative margin on
           .s4-stats-desktop), instead of a vignette on every side, which
           previously fought the border-radius and just read as blurry. */
        box-shadow: 0 24px 60px -20px rgba(0,0,0,0.35);
        -webkit-mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
        mask-image: linear-gradient(to bottom, #000 78%, transparent 100%);
      }
      body.dark .s4-hero-img {
        mix-blend-mode: luminosity;
  
        -webkit-mask-image: radial-gradient(ellipse 80% 90% at 60% 50%, #000 30%, transparent 85%);
        mask-image: radial-gradient(ellipse 80% 90% at 60% 50%, #000 30%, transparent 85%);
      }

      /* ════════════ STATS — desktop grid / mobile ticker ════════════ */
      .s4-stats-desktop {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
        margin: -40px 0 48px;
        position: relative;
        z-index: 2;
      }
      @media (max-width: 768px) { .s4-stats-desktop { display: none; } }

      .s4-stat {
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 16px;
        padding: 18px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        /* Elevation so the row reads as floating over the hero image/page
           seam instead of looking pasted flat on top of it. */
        box-shadow: 0 14px 32px rgba(0,0,0,0.09);
      }
      body.dark .s4-stat {
        background: #1e1e1e;
        border-color: rgba(255,255,255,0.07);
        box-shadow: 0 14px 32px rgba(0,0,0,0.4);
      }
      .s4-stat-icon {
        width: 46px; height: 46px;
        border-radius: 50%;
        background: #fff9e0;
        border: 1px solid #ffe97a;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      body.dark .s4-stat-icon {
        background: rgba(255,204,0,0.1);
        border-color: rgba(255,204,0,0.25);
      }
      .s4-stat-icon img { width: 24px; height: 24px; object-fit: contain; }
      .s4-stat-value {
        font-size: 26px;
        font-weight: 900;
        color: #0a0a0a;
        line-height: 1;
      }
      body.dark .s4-stat-value { color: #f0f0f0; }
      .s4-stat-label { font-size: 13px; color: #888; margin-top: 3px; }

      /* ── Mobile Stats Ticker ── */
      .s4-stats-ticker {
        display: none;
      }
      @media (max-width: 768px) {
        .s4-stats-ticker {
          display: block;
          margin: 24px -32px 32px;
          overflow: hidden;
          position: relative;
        }
        .s4-stats-ticker::before,
        .s4-stats-ticker::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: 48px;
          z-index: 2;
          pointer-events: none;
        }
        .s4-stats-ticker::before {
          left: 0;
          background: linear-gradient(to right, #f7f7f7, transparent);
        }
        .s4-stats-ticker::after {
          right: 0;
          background: linear-gradient(to left, #f7f7f7, transparent);
        }
        body.dark .s4-stats-ticker::before { background: linear-gradient(to right, #141414, transparent); }
        body.dark .s4-stats-ticker::after  { background: linear-gradient(to left,  #141414, transparent); }
      }

      .s4-ticker-track {
        display: flex;
        gap: 12px;
        animation: s4-ticker-scroll 18s linear infinite;
        width: max-content;
      }
      .s4-stats-ticker:hover .s4-ticker-track { animation-play-state: paused; }
      @media (prefers-reduced-motion: reduce) {
        .s4-ticker-track { animation: none; }
      }

      @keyframes s4-ticker-scroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      [dir="rtl"] @keyframes s4-ticker-scroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(50%); }
      }

      .s4-ticker-item {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 40px;
        padding: 10px 18px 10px 10px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      body.dark .s4-ticker-item {
        background: #1e1e1e;
        border-color: rgba(255,255,255,0.08);
      }
      .s4-ticker-icon {
        width: 36px; height: 36px;
        border-radius: 50%;
        background: #fff9e0;
        border: 1px solid #ffe97a;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      body.dark .s4-ticker-icon {
        background: rgba(255,204,0,0.1);
        border-color: rgba(255,204,0,0.25);
      }
      .s4-ticker-icon img { width: 18px; height: 18px; object-fit: contain; }
      .s4-ticker-value {
        font-size: 18px;
        font-weight: 900;
        color: #0a0a0a;
        line-height: 1;
      }
      body.dark .s4-ticker-value { color: #f0f0f0; }
      .s4-ticker-label { font-size: 12px; color: #888; margin-top: 2px; }
      .s4-ticker-sep {
        color: #FFCC00;
        font-weight: 900;
        font-size: 18px;
        flex-shrink: 0;
        align-self: center;
      }

      /* ════════════ SERVICE CARDS ════════════ */
      .s4-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }
      @media (max-width: 860px) and (min-width: 641px) {
        .s4-grid { grid-template-columns: 1fr; }
      }

      /* ── Mobile carousel ── */
      @media (max-width: 640px) {
        .s4-grid {
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 16px;
          padding: 4px 24px 16px;
          margin: 0 -32px;
          scrollbar-width: none;
        }
        .s4-grid::-webkit-scrollbar { display: none; }
        .s4-card {
          min-width: 84vw;
          max-width: 84vw;
          flex-shrink: 0;
          scroll-snap-align: start;
        }
      }

      /* ── Card base ── */
      .s4-card {
        background: #fff;
        border: 1.5px solid #e8e8e8;
        border-radius: 22px;
        padding: 28px 24px 0;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        transition: transform 0.28s ease, box-shadow 0.28s ease;
        min-height: 420px;
      }
      body.dark .s4-card {
        background: #1c1c1c;
        border-color: rgba(255,255,255,0.08);
      }
      .s4-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 48px rgba(0,0,0,0.08);
      }
      body.dark .s4-card:hover {
        box-shadow: 0 18px 48px rgba(0,0,0,0.4);
      }
      .s4-card:hover .s4-icon-circle {
        transform: scale(1.08) rotate(-4deg);
        background: #fff3c4;
      }
      body.dark .s4-card:hover .s4-icon-circle { background: #3a3106; }

      .s4-card.featured {
        background: #fffef0;
        border: 2px solid #FFCC00;
      }
      body.dark .s4-card.featured {
        background: #1d1b08;
        border-color: #FFCC00;
      }

      /* ── Badge — subtle shimmer sweep to draw the eye to "Most Requested" ── */
      .s4-badge {
        position: absolute;
        top: 20px;
        background: #FFCC00;
        color: #3b2d00;
        font-size: 12px;
        font-weight: 800;
        padding: 5px 12px 5px 9px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        z-index: 3;
        overflow: hidden;
      }
      .s4-badge::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.65) 48%, transparent 66%);
        transform: translateX(-120%);
        animation: s4-badge-shimmer 3.2s ease-in-out infinite;
      }
      @keyframes s4-badge-shimmer {
        0%, 55%  { transform: translateX(-120%); }
        100%     { transform: translateX(120%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .s4-badge::after { animation: none; display: none; }
      }
      .s4-badge img { width: 13px; height: 13px; object-fit: contain; position: relative; z-index: 1; }
      .s4-badge > span { position: relative; z-index: 1; }
      [dir="ltr"] .s4-badge { right: 20px; }
      [dir="rtl"] .s4-badge { left: 20px; right: auto; }

      /* ── Card header (icon + title) ── */
      .s4-card-header {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 14px;
      }
      [dir="rtl"] .s4-card-header { flex-direction: row-reverse; }

      .s4-icon-circle {
        width: 60px; height: 60px;
        min-width: 60px;
        border-radius: 50%;
        background: #f3f3f3;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      body.dark .s4-icon-circle { background: #2a2a2a; }
      .s4-icon-circle img { width: 36px; height: 36px; object-fit: contain; }

      .s4-card-title {
        font-size: 22px;
        font-weight: 900;
        color: #0a0a0a;
        margin: 0;
        letter-spacing: -0.3px;
        flex: 1;
        word-break: break-word;
      }
      body.dark .s4-card-title { color: #f0f0f0; }

      /* ── Description & features — contained to 60% to leave room for image ── */
      .s4-card-desc {
        font-size: 13.5px;
        color: #666;
        line-height: 1.7;
        margin: 0 0 18px;
        max-width: 58%;
        position: relative;
        z-index: 2;
      }
      body.dark .s4-card-desc { color: #888; }

      .s4-features {
        list-style: none;
        padding: 0;
        margin: 0 0 auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 58%;
        position: relative;
        z-index: 2;
      }
      .s4-feature {
        display: flex;
        align-items: center;
        gap: 9px;
        font-size: 13.5px;
        color: #222;
        font-weight: 500;
      }
      body.dark .s4-feature { color: #ccc; }

      .s4-check {
        width: 22px; height: 22px;
        border-radius: 50%;
        background: #FFCC00;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .s4-check img { width: 12px; height: 12px; object-fit: contain; }

      /* ── Card photo — blended into the card ── */
      .s4-card-photo-wrap {
        position: absolute;
        bottom: 0;
        width: 52%;
        max-width: 220px;
        height: 75%;
        pointer-events: none;
        z-index: 1;
      }
      [dir="ltr"] .s4-card-photo-wrap { right: 0; }
      [dir="rtl"] .s4-card-photo-wrap { left: 0; right: auto; }

      .s4-card-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 30%;
        display: block;
        border-radius: 0 0 20px 0;
      }
      [dir="ltr"] .s4-card-photo {
        -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, #000 70%),
                            linear-gradient(to top, #000 60%, transparent 100%);
        mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 30%, #000 70%),
                    linear-gradient(to top, #000 60%, transparent 100%);
        -webkit-mask-composite: intersect;
        mask-composite: intersect;
      }
      [dir="rtl"] .s4-card-photo {
        -webkit-mask-image: linear-gradient(to left, transparent 0%, rgba(0,0,0,0.6) 30%, #000 70%),
                            linear-gradient(to top, #000 60%, transparent 100%);
        mask-image: linear-gradient(to left, transparent 0%, rgba(0,0,0,0.6) 30%, #000 70%),
                    linear-gradient(to top, #000 60%, transparent 100%);
        -webkit-mask-composite: intersect;
        mask-composite: intersect;
        transform: scaleX(-1);
      }

      /* On mobile, card image is full-width bottom strip */
      @media (max-width: 640px) {
        .s4-card {
          padding-bottom: 0;
          min-height: 380px;
        }
        .s4-card-photo-wrap {
          width: 55%;
          height: 60%;
          max-width: none;
        }
        .s4-card-desc { max-width: 55%; }
        .s4-features { max-width: 55%; }
      }

      /* ── Learn More ── */
      .s4-learn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 15px;
        font-weight: 800;
        color: #0a0a0a;
        text-decoration: none;
        margin-top: 24px;
        padding-bottom: 26px;
        transition: color 0.2s;
        position: relative;
        z-index: 2;
      }
      body.dark .s4-learn { color: #f0f0f0; }
      .s4-learn:hover { color: #b8870f; }

      .s4-learn-arr {
        font-size: 16px;
        transition: transform 0.2s;
        display: inline-block;
      }
      [dir="rtl"] .s4-learn-arr { transform: scaleX(-1); }
      .s4-learn:hover .s4-learn-arr { transform: translateX(3px); }
      [dir="rtl"] .s4-learn:hover .s4-learn-arr { transform: scaleX(-1) translateX(3px); }

      /* ════════════ CAROUSEL CONTROLS (mobile only) ════════════ */
      .s4-carousel-controls {
        display: none;
      }
      @media (max-width: 640px) {
        .s4-carousel-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
      }

      .s4-carousel-btn {
        width: 38px; height: 38px;
        border-radius: 50%;
        background: #fff;
        border: 1.5px solid #e8e8e8;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        color: #0a0a0a;
        transition: background 0.2s, border-color 0.2s;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
      }
      body.dark .s4-carousel-btn {
        background: #1e1e1e;
        border-color: rgba(255,255,255,0.1);
        color: #f0f0f0;
      }
      .s4-carousel-btn:active {
        background: #FFCC00;
        border-color: #FFCC00;
        color: #000;
      }

      .s4-dots {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .s4-dot {
        width: 8px; height: 8px;
        border-radius: 999px;
        background: #d0d0d0;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: width 0.3s ease, background 0.3s ease;
        -webkit-tap-highlight-color: transparent;
      }
      body.dark .s4-dot { background: #444; }
      .s4-dot.active {
        width: 24px;
        background: #FFCC00;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // ── Carousel nav
  const goTo = (idx) => {
    setIsPaused(true);
    scrollToCard(idx);
    setTimeout(() => setIsPaused(false), 4000);
  };

  const goPrev = () => goTo((activeIdx - 1 + services.length) % services.length);
  const goNext = () => goTo((activeIdx + 1) % services.length);

  // ── Duplicate stats for infinite ticker
  const tickerStats = [...stats, ...stats];

  return (
    <section className="s4-section" dir={isRTL ? "rtl" : "ltr"}>
      <div className="s4-container" ref={sectionRef}>

        {/* ── Hero ── */}
        <div className="s4-top">
          <div className={`s4-hero-text s4-reveal${revealed ? " s4-visible" : ""}`}>
            <div className="s4-eyebrow">{t("offer.subtitle")}</div>
            <h2 className="s4-title">{t("offer.title")}</h2>
            <p className="s4-desc">{t("offer.description")}</p>
          </div>
          <div className="s4-hero-img-wrap">
            <img
              className="s4-hero-img"
              src="/new/whatweoffer.png"
              alt={t("offer.heroImageAlt")}
            />
          </div>
        </div>

        {/* ── Stats — desktop grid ── */}
        <div className="s4-stats-desktop">
          {stats.map((s, i) => (
            <div
              className={`s4-stat s4-reveal${revealed ? " s4-visible" : ""}`}
              style={{ transitionDelay: revealed ? `${i * 80}ms` : "0ms" }}
              key={s.value}
            >
              <div className="s4-stat-icon">
                <img src={s.iconSrc} alt="" aria-hidden="true" />
              </div>
              <div>
                <div className="s4-stat-value">{s.value}</div>
                <div className="s4-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Stats — mobile infinite ticker ── */}
        <div className="s4-stats-ticker" aria-hidden="true">
          <div className="s4-ticker-track">
            {tickerStats.map((s, i) => (
              <>
                <div className="s4-ticker-item" key={`${s.value}-${i}`}>
                  <div className="s4-ticker-icon">
                    <img src={s.iconSrc} alt="" />
                  </div>
                  <div>
                    <div className="s4-ticker-value">{s.value}</div>
                    <div className="s4-ticker-label">{s.label}</div>
                  </div>
                </div>
                <span className="s4-ticker-sep" key={`sep-${i}`}>✦</span>
              </>
            ))}
          </div>
        </div>

        {/* ── Cards ── */}
        <div
          className="s4-grid"
          ref={gridRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((service, i) => (
            <a
              key={service.key}
              href={getLangLink(service.link)}
              style={{ transitionDelay: revealed ? `${i * 100}ms` : "0ms" }}
              className={`s4-card s4-reveal${revealed ? " s4-visible" : ""}${service.featured ? " featured" : ""}`}
            >
              {service.featured && (
                <span className="s4-badge">
                  <img src="/icons/star_icon.png" alt="" aria-hidden="true" />
                  <span>{t("offer.mostRequested")}</span>
                </span>
              )}

              <div className="s4-card-header">
                <div className="s4-icon-circle">
                  <img src={service.iconSrc} alt="" aria-hidden="true" />
                </div>
                <h3 className="s4-card-title">{service.title}</h3>
              </div>

              <p className="s4-card-desc">{service.description}</p>

              <ul className="s4-features">
                {service.features.map((feat) => (
                  <li key={feat} className="s4-feature">
                    <span className="s4-check">
                      <img src="/icons/check.png" alt="" aria-hidden="true" />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Blended card photo */}
              <div className="s4-card-photo-wrap">
                <img
                  className="s4-card-photo"
                  src={service.photoSrc}
                  alt=""
                  aria-hidden="true"
                  style={{ objectPosition: service.photoPosition }}
                />
              </div>

              <span className="s4-learn">
                {t("offer.learnMore")}
                <span className="s4-learn-arr">→</span>
              </span>
            </a>
          ))}
        </div>

        {/* ── Carousel Controls (mobile only) ── */}
        <div className="s4-carousel-controls">
          <button
            className="s4-carousel-btn"
            onClick={isRTL ? goNext : goPrev}
            aria-label="Previous service"
          >
            {isRTL ? "→" : "←"}
          </button>

          <div className="s4-dots" role="tablist">
            {services.map((s, i) => (
              <button
                key={s.key}
                className={`s4-dot${i === activeIdx ? " active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.title}`}
                role="tab"
                aria-selected={i === activeIdx}
              />
            ))}
          </div>

          <button
            className="s4-carousel-btn"
            onClick={isRTL ? goPrev : goNext}
            aria-label="Next service"
          >
            {isRTL ? "←" : "→"}
          </button>
        </div>

      </div>
    </section>
  );
}