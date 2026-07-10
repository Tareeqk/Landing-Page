import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Both the day and night renders of this mockup show the same *customer*
// app screen ("Unexpected Breakdown?" booking flow) — there's no driver-app
// screenshot in the project yet. DRIVER_APP_BG is a placeholder pointing at
// the same asset so nothing renders blank; swap it for a real driver-app
// screenshot (e.g. drop the file in public/new/ and update this one path)
// once one exists.
const CUSTOMER_APP_BG = "/new/howitworks_dark.png";
const DRIVER_APP_BG = "/new/howitworks_dark.png"; // TODO: replace with a real driver-app screenshot

const BANNER_CYCLE_MS = 6000;

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

  /* ── Auto-cycle between the two banners ── */
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    cycleRef.current = setInterval(() => {
      if (isPausedRef.current) return;
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

  /* ── Mobile step carousel — one horizontal scroll-snap track per banner
     (only the active banner's track is reachable by touch since the
     inactive one is off-screen), tracked independently so each banner
     remembers its own dot position. getBoundingClientRect, not
     scrollLeft/offsetLeft — scrollLeft's sign/origin differs between
     Chrome and Firefox inside an RTL container. ── */
  const stepsRefs = useRef([]);
  const [mobileStepIdx, setMobileStepIdx] = useState([0, 0]);
  useEffect(() => {
    const cleanups = banners.map((banner, bannerIdx) => {
      const el = stepsRefs.current[bannerIdx];
      if (!el) return () => {};
      const onScroll = () => {
        const containerRect = el.getBoundingClientRect();
        const cards = el.querySelectorAll(".hiw-step");
        let closest = 0, minDist = Infinity;
        cards.forEach((c, i) => {
          const dist = Math.abs(c.getBoundingClientRect().left - containerRect.left);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        setMobileStepIdx((prev) => {
          const next = [...prev];
          next[bannerIdx] = closest;
          return next;
        });
      };
      el.addEventListener("scroll", onScroll, { passive: true });
      return () => el.removeEventListener("scroll", onScroll);
    });
    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        padding: 100px 0;
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
      .hiw-bg-layer--active { opacity: 0.35; }
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
        margin-bottom: 32px;
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
      .hiw-tab--active {
        color: #111114;
        background: #d4a017;
      }
      .hiw-tab--active:hover { color: #111114; }

      /* ── Sliding track — two full banners side by side ── */
      .hiw-track-viewport { overflow: hidden; }
      .hiw-track {
        display: flex;
        width: 200%;
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

      /* ── PERKS ROW: shared across both banners, below the sliding track ── */
      .hiw-perks-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 36px;
      }
      .hiw-perk {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 999px;
        padding-block: 8px;
        padding-inline: 8px 16px;
        transition: border-color 0.2s, background 0.2s, transform 0.2s;
      }
      .hiw-perk:hover {
        border-color: rgba(212,160,23,0.35);
        background: rgba(255,255,255,0.06);
        transform: translateY(-2px);
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
        transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        cursor: default;
        display: flex;
        flex-direction: column;
      }
      .hiw-step:hover {
        transform: translateY(-4px);
        border-color: rgba(212,160,23,0.4);
        box-shadow: 0 14px 32px rgba(212,160,23,0.1);
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
        transition: transform 0.25s ease, background 0.25s ease;
      }
      .hiw-step:hover .hiw-step-icon {
        transform: scale(1.08) rotate(-4deg);
        background: rgba(212,160,23,0.16);
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
        .hiw-right { grid-template-columns: 1fr; }
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
          border: 0;
          padding: 0;
          cursor: pointer;
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

                  {/* ── RIGHT: 2×2 cards ── */}
                  <div className="hiw-right">
                    <div
                      className="hiw-cards"
                      ref={(el) => { stepsRefs.current[bannerIdx] = el; }}
                    >
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
                          <h3 className="hiw-step-title">{step.title}</h3>
                          <p className="hiw-step-desc">{step.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Dot indicators — mobile only, per-banner scroll position */}
                    <div className="hiw-dots" role="group" aria-label="Select a step">
                      {banner.steps.map((_, i) => (
                        <span
                          key={i}
                          className={`hiw-dot${i === mobileStepIdx[bannerIdx] ? " hiw-dot--active" : ""}`}
                        />
                      ))}
                    </div>
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
