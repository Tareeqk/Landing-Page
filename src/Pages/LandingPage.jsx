import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import './landing.css';

// Keys map to `landing.services.<key>` in each locale file.
const SERVICE_KEYS = ['carRecovery', 'towing', 'battery', 'tire'];

// Single real photo, rendered once and never swapped/re-animated — a moody
// skyline render was here before (mostly empty sky, read as flat dark grey
// once darkened for legibility); this on-location shot reads as "alive"
// without needing four distinct service photos we don't have yet.
// Source: public/towing.jpg, 1024×640 — soft on large desktop viewports,
// swap for a higher-resolution shoot when available.
const HERO_PHOTO = '/new/service_hero_banner.png';

// Portrait crop for phones — the wide desktop banner reduces to a sliver of
// truck when cropped to a phone's aspect ratio, so mobile gets its own
// render instead: same truck/car/robot artwork, composed tall with a solid
// black upper half reserved for the hero text (see .tk-hero__inner's mobile
// top-alignment below) instead of the skyline detail the wide crop needs.
const HERO_PHOTO_MOBILE = '/new/hero_mobile.webp';

// Near-square crop for tablets — between the phone crop's tall portrait and
// the desktop banner's wide 2.33:1 landscape, an iPad portrait viewport (e.g.
// 768–1024 wide) doesn't fit either well. Same black-band-on-top composition
// as the mobile render, just closer to a 1:1 aspect ratio.
const HERO_PHOTO_TABLET = '/new/hero_tab.webp';

/* ── Typing cycle ──
   Drives the hero title's type/delete loop only — the background photo
   is static and does not change with it (previously four <picture>
   elements crossfaded/zoomed independently even though they shared the
   same image, which read as the photo visibly shifting).
   Respects prefers-reduced-motion (falls back to a static first phrase). */
function useTypingSlideCycle(phrases) {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const phrasesKey = phrases.join('|');

  const [text, setText] = useState(reduceMotion ? phrases[0] : '');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setIsDeleting(false);
    setText(reduceMotion ? phrases[0] : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrasesKey]);

  // Manual pill/dot click — jump straight to that phrase, fully typed.
  // The main effect below picks up from there (hold → delete → resume
  // the cycle), since it reacts to text/index the same way either way.
  const selectIndex = (i) => {
    setIndex(i);
    setIsDeleting(false);
    setText(phrases[i]);
  };

  useEffect(() => {
    if (reduceMotion) return;

    const currentPhrase = phrases[index % phrases.length];
    const typingSpeed = isDeleting ? 35 : 75;
    let timeout;

    if (!isDeleting && text === currentPhrase) {
      // Hold the fully-typed word before deleting and moving to the next
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 400);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? currentPhrase.slice(0, prev.length - 1)
            : currentPhrase.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, index, phrasesKey, reduceMotion]);

  return { text, index, reduceMotion, selectIndex };
}

function HeroBackground() {
  return (
    <div className="tk-hero__bg" aria-hidden="true">
      <picture>
        {/* Portrait phones only — a landscape phone at the same width
            should still get the wide banner (see the orientation:landscape
            rules in landing.css), not the tall portrait crop stretched
            sideways. */}
        <source media="(max-width: 767px) and (orientation: portrait)" srcSet={HERO_PHOTO_MOBILE} />
        {/* Portrait tablets (iPad et al.) — landscape tablets keep the wide
            banner, same reasoning as the phone source above. */}
        <source media="(min-width: 768px) and (max-width: 1024px) and (orientation: portrait)" srcSet={HERO_PHOTO_TABLET} />
        <img
          src={HERO_PHOTO}
          alt=""
          className="tk-hero__bg-img"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </picture>
      <div className="tk-hero__veil" />
      <div className="tk-hero__grain" />
    </div>
  );
}

const SERVICE_ICONS = {
  carRecovery: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 13l1.5-5A2 2 0 016.4 6.5h11.2A2 2 0 0119.5 8l1.5 5M3 13v5a1 1 0 001 1h1.5M3 13h18M20 18h.5a1 1 0 001-1v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  towing: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 17V9a2 2 0 012-2h6l4 4h4a2 2 0 012 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  battery: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7V5.5a1 1 0 011-1h6a1 1 0 011 1V7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M13 10l-3 3.5h2.5L11 17l4-4.2h-2.5L13 10z" fill="currentColor" />
    </svg>
  ),
  tire: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 4v3.5M12 16.5V20M20 12h-3.5M7.5 12H4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

function TypingTitle({ text, reduceMotion, phrases }) {
  return (
    <h1 className="tk-hero__title tk-hero__title--typing" data-testid="landing-title">
      <span className="tk-typing-text" aria-hidden="true">{text}</span>
      {!reduceMotion && <span className="tk-typing-cursor" aria-hidden="true" />}
      {/* Full list stays readable for screen readers / SEO crawlers */}
      <span className="tk-visually-hidden">{phrases.join(', ')}</span>
    </h1>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();

  const phrases = SERVICE_KEYS.map((key) => t(`landing.services.${key}`));
  const { text, index, reduceMotion, selectIndex } = useTypingSlideCycle(phrases);

  const trustStats = [
    { value: t('landing.trust.dispatchValue'), label: t('landing.trust.dispatchLabel') },
    { value: t('landing.trust.availabilityValue'), label: t('landing.trust.availabilityLabel') },
    { value: t('landing.trust.ratingValue'), label: t('landing.trust.ratingLabel') },
  ];

  const handleDownloadRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const iosUrl     = 'https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854';
    const androidUrl = 'https://play.google.com/store/apps/details?id=com.tareeqk.order';
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isMacOS = navigator.platform.toUpperCase().includes('MAC') ||
      (navigator.userAgent.includes('Mac') && !('ontouchend' in document));
    window.location.href = (isIOSDevice || isMacOS) ? iosUrl : androidUrl;
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Car Recovery in Dubai | 24/7 Towing & Roadside Assistance</title>
        <meta
          name="description"
          content="Premium 24/7 car recovery & towing in Dubai. Flatbed, heavy recovery, and emergency roadside assistance with 5-minute dispatch."
        />
        <meta
          name="keywords"
          content="car recovery, towing, roadside assistance, Dubai, 24/7"
        />
        <meta property="og:title" content="Car Recovery in Dubai | 24/7 Towing & Roadside Assistance" />
        <meta
          property="og:description"
          content="Premium 24/7 car recovery & towing in Dubai. Flatbed, heavy recovery, and emergency roadside assistance with 5-minute dispatch."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://www.tareeqk.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section
        className="tk-hero"
        data-testid="landing-hero"
        aria-label="Car recovery hero"
      >
        <HeroBackground />

        {/* Floating trust stats — real numbers we already translate but
            weren't rendering anywhere; fills the empty top-right corner
            of the photo and backs up the headline with proof. */}
        <div className="tk-hero__trust" data-testid="landing-trust-cards">
          {trustStats.map((stat) => (
            <div key={stat.label} className="tk-hero__trust-card">
              <span className="tk-hero__trust-value">{stat.value}</span>
              <span className="tk-hero__trust-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="tk-hero__inner">
          <div
            data-aos="fade-up"
            className="tk-hero__content"
            data-testid="landing-hero-text"
          >
            <span className="tk-eyebrow" data-testid="landing-eyebrow">
              <span className="tk-eyebrow__badge">{t('landing.badge', '')}</span>
              <span className="tk-eyebrow__divider" aria-hidden="true" />
              {t('landing.eyebrow')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <br/>
            <TypingTitle text={text} reduceMotion={reduceMotion} phrases={phrases} />
            <br/>
            <p className="tk-hero__subtitle" data-testid="landing-subtitle">
              {t('landing.subtitle')}
            </p>

            {/* Service ticker — a 2-slot sliding window (see the SERVICE
                TICKER block in landing.css): the left slot always shows
                whatever matches the typing title (active/amber), the
                right slot previews what's next. The whole 4-item track
                shifts by one slot via the --tk-index custom property,
                which CSS turns into the slide animation — this div just
                sets that number each time the cycle advances. Clicking
                either visible pill still jumps straight to it. Placed
                ahead of the CTAs so it reads as "here's what we do"
                right after the subtitle instead of sitting below the
                buttons. */}
            <div className="tk-service-track-viewport" data-testid="landing-service-pills" role="group">
              <div className="tk-service-track" style={{ '--tk-index': index }}>
                {SERVICE_KEYS.map((key, i) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectIndex(i)}
                    className={`tk-service-pill ${i === index ? 'tk-service-pill--active' : ''}`}
                    aria-pressed={i === index}
                  >
                    <span className="tk-service-pill__icon">{SERVICE_ICONS[key]}</span>
                    <span className="tk-service-pill__label">{phrases[i]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="tk-cta-row" data-testid="landing-cta-row">
              <button
                onClick={handleDownloadRedirect}
                className="tk-btn tk-btn--primary"
                data-testid="landing-download-btn"
              >
                <span>{t("landing.download")}</span>
                <span className="tk-btn__arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              <a
                href="tel:+97142232269"
                className="tk-btn tk-btn--ghost"
                data-testid="landing-call-btn"
              >
                {t('landing.callNow')}
                <span className="tk-btn__arrow" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>

            <div className="tk-store-badges" data-testid="landing-store-badges">
              <a
                href="https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854"
                target="_blank"
                rel="noopener noreferrer"
                className="tk-store-badge"
                aria-label="Download on the App Store"
              >
                <img
                  src="/applestore.png"
                  alt="Download on the App Store"
                  className="tk-store-badge__img"
                  loading="lazy"
                  decoding="async"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.tareeqk.order"
                target="_blank"
                rel="noopener noreferrer"
                className="tk-store-badge"
                aria-label="Get it on Google Play"
              >
                <img
                  src="/playstore.png"
                  alt="Get it on Google Play"
                  className="tk-store-badge__img"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Typing-phrase position dots — background photo no longer moves
            with these, only the headline text does */}
        <div className="tk-hero__dots" role="group" aria-label="Select a service">
          {SERVICE_KEYS.map((key, i) => (
            <button
              key={key}
              type="button"
              onClick={() => selectIndex(i)}
              className={`tk-hero__dot ${i === index ? 'tk-hero__dot--active' : ''}`}
              aria-label={phrases[i]}
              aria-pressed={i === index}
            />
          ))}
        </div>
      </section>

      {/* Floating store badges — mobile only (see .tk-store-badges--floating
          in landing.css). Deliberately rendered as a sibling of <section
          className="tk-hero"> rather than inside .tk-hero__content: that
          element gets an AOS fade-up transform, and any transform on an
          ancestor becomes the containing block for a position:fixed
          descendant — it was silently anchoring these to the hero's text
          column instead of the viewport corner. Same links as the in-flow
          desktop badges above; that pair stays for desktop and hides on
          mobile via CSS, this pair is the reverse. */}
      <div className="tk-store-badges tk-store-badges--floating" data-testid="landing-store-badges-floating">
        <a
          href="https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854"
          target="_blank"
          rel="noopener noreferrer"
          className="tk-store-badge"
          aria-label="Download on the App Store"
        >
          <img
            src="/applestore.png"
            alt="Download on the App Store"
            className="tk-store-badge__img"
            loading="lazy"
            decoding="async"
          />
        </a>

        <a
          href="https://play.google.com/store/apps/details?id=com.tareeqk.order"
          target="_blank"
          rel="noopener noreferrer"
          className="tk-store-badge"
          aria-label="Get it on Google Play"
        >
          <img
            src="/playstore.png"
            alt="Get it on Google Play"
            className="tk-store-badge__img"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </>
  );
}