import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import CarModel from './CarModel';
import './landing.css';

// Keys map to `landing.services.<key>` in each locale file
const SERVICE_KEYS = ['carRecovery', 'towing', 'battery', 'tire'];

/* ── Typing-animation hero title ──
   Cycles through the translated service names with a type/delete loop.
   Respects prefers-reduced-motion (falls back to a static first phrase). */
function TypingTitle() {
  const { t } = useTranslation();
  const phrases = SERVICE_KEYS.map((key) => t(`landing.services.${key}`));
  const phrasesKey = phrases.join('|');

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [text, setText] = useState(reduceMotion ? phrases[0] : '');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset the cycle whenever the language (and thus the phrases) changes
  useEffect(() => {
    setPhraseIndex(0);
    setIsDeleting(false);
    setText(reduceMotion ? phrases[0] : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrasesKey]);

  useEffect(() => {
    if (reduceMotion) return;

    const currentPhrase = phrases[phraseIndex % phrases.length];
    const typingSpeed = isDeleting ? 35 : 75;
    let timeout;

    if (!isDeleting && text === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
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
  }, [text, isDeleting, phraseIndex, phrasesKey, reduceMotion]);

  return (
    <h1 className="tk-hero__title tk-hero__title--typing" data-testid="landing-title">
      <span className="tk-typing-text" aria-hidden="true">{text}</span>
      {!reduceMotion && <span className="tk-typing-cursor" aria-hidden="true" />}
      {/* Full list stays readable for screen readers / SEO crawlers */}
      <span className="tk-visually-hidden">{phrases.join(', ')}</span>
    </h1>
  );
}

function TrustChips() {
  const { t } = useTranslation();
  const CHIPS = [
    { id: 'dispatch',     strong: t('landing.trust.dispatchValue'),     span: t('landing.trust.dispatchLabel') },
    { id: 'availability', strong: t('landing.trust.availabilityValue'), span: t('landing.trust.availabilityLabel') },
    { id: 'rating',       strong: t('landing.trust.ratingValue'),       span: t('landing.trust.ratingLabel') },
  ];

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 1024);
  const [active, setActive]     = useState(0);
  const [anim, setAnim]         = useState('tk-chip-enter');

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setAnim('tk-chip-exit');
      setTimeout(() => {
        setActive(prev => (prev + 1) % CHIPS.length);
        setAnim('tk-chip-enter');
      }, 350);
    }, 2400);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  if (!isMobile) {
    return (
      <ul className="tk-trust" data-testid="landing-trust-row">
        {CHIPS.map(({ id, strong, span }) => (
          <li key={id} className="tk-trust__chip">
            <span className="tk-trust__pulse" aria-hidden="true" />
            <strong>{strong}</strong>
            <span>{span}</span>
          </li>
        ))}
      </ul>
    );
  }

  const chip = CHIPS[active];
  return (
    <ul className="tk-trust tk-trust--cycle" data-testid="landing-trust-row">
      <li className={`tk-trust__chip tk-trust__chip--cycle ${anim}`} key={active}>
        <span className="tk-trust__pulse" aria-hidden="true" />
        <strong>{chip.strong}</strong>
        <span>{chip.span}</span>
      </li>
    </ul>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();
  const downloadRef = useRef(null);

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

        {/* Preconnect to the CDN that serves the model-viewer ESM module */}
        <link rel="preconnect" href="https://ajax.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ajax.googleapis.com" />
      </Helmet>

      <section
        className="tk-hero"
        data-testid="landing-hero"
        aria-label="Car recovery hero"
      >
        <div className="tk-hero__bg" aria-hidden="true">
          <picture>
            <source media="(min-width: 768px)" srcSet="new/NewBGG.webp" />
            <img
              src="new/NewBG2.webp"
              alt=""
              className="tk-hero__bg-img"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </picture>
          <div className="tk-hero__veil" />
          <div className="tk-hero__grain" />
          <div className="tk-hero__horizon" />
          <div className="tk-hero__beam" aria-hidden="true" />
        </div>

        <div className="tk-hero__inner">
          <div className="tk-hero__grid">

            <div
              data-aos="fade-right"
              className="tk-hero__text"
              data-testid="landing-hero-text"
            >
              <span className="tk-eyebrow" data-testid="landing-eyebrow">
                <span className="tk-eyebrow__dot" />
                {t('landing.eyebrow')}
              </span>
              <br />
              <br/>

              <TypingTitle />

              <p className="tk-hero__subtitle" data-testid="landing-subtitle">
                {t('landing.subtitle')}
              </p>

              {/* ── TRUCK: mobile only ── */}
              <div className="tk-hero__stage--inline-mobile">
                <div className="tk-hero__stage-inner">
                  <CarModel />
                </div>
              </div>

              <TrustChips />

              <div className="tk-cta-row" data-testid="landing-cta-row">
                <button
                  onClick={handleDownloadRedirect}
                  className="tk-btn tk-btn--primary"
                  data-testid="landing-download-btn"
                >
                  <span>{t("landing.download")}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <a
                  href="tel:+97180082773375"
                  className="tk-btn tk-btn--ghost"
                  data-testid="landing-call-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('landing.callNow')}
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
                    src="playstore.png"
                    alt="Get it on Google Play"
                    className="tk-store-badge__img"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>

              <div className="tk-vehicles" data-testid="landing-vehicle-row">
                <span className="tk-vehicles__label">
                  {t("landing.vehicle")}
                </span>
                <div className="tk-vehicles__icons">
                  {['Bike', 'Car', 'Jeep', 'Bus'].map((v) => (
                    <div
                      key={v}
                      className="tk-vehicles__icon"
                      title={v}
                      data-testid={`landing-vehicle-${v.toLowerCase()}`}
                    >
                      <img src={`new/${v}.svg`} alt={v} loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TRUCK STAGE (desktop only) ── */}
            <div
              data-aos="fade-left"
              className="tk-hero__stage tk-hero__stage--desktop"
              data-testid="landing-truck-stage"
            >
              <div className="tk-hero__stage-inner">
                <CarModel />
              </div>
              <span className="tk-hero__tagline" data-testid="landing-truck-tagline">
                Beyond Reliable
              </span>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}