import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import './landing.css';

// Keys map to `landing.services.<key>` in each locale file.
// Each key also maps 1:1 to a background slide in HERO_SLIDES below —
// swap in real per-service photography when available; duplicates here
// are safe placeholders so the slider/typing sync still works out of the box.
const SERVICE_KEYS = ['carRecovery', 'towing', 'battery', 'tire'];

const HERO_SLIDES = [
  { key: 'carRecovery', mobile: 'new/NewBG2.webp', desktop: 'new/NewBGG.webp' },
  { key: 'towing',      mobile: 'new/NewBGG.webp', desktop: 'new/NewBG2.webp' },
  { key: 'battery',     mobile: 'new/NewBG2.webp', desktop: 'new/NewBGG.webp' },
  { key: 'tire',        mobile: 'new/NewBGG.webp', desktop: 'new/NewBG2.webp' },
];

/* ── Shared typing + slide cycle ──
   Drives the hero title's type/delete loop AND the background slider
   from a single index, so the photo always matches the word being typed.
   Respects prefers-reduced-motion (falls back to a static first phrase/slide). */
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

  useEffect(() => {
    if (reduceMotion) return;

    const currentPhrase = phrases[index % phrases.length];
    const typingSpeed = isDeleting ? 35 : 75;
    let timeout;

    if (!isDeleting && text === currentPhrase) {
      // Hold the fully-typed word — the slide crossfades shortly after
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

  return { text, index, reduceMotion };
}

function HeroSlides({ slides, activeIndex, reduceMotion }) {
  return (
    <div className="tk-hero__bg" aria-hidden="true">
      {slides.map((slide, i) => (
        <picture
          key={slide.key}
          className={`tk-hero__slide ${i === activeIndex ? 'tk-hero__slide--active' : ''} ${reduceMotion ? 'tk-hero__slide--static' : ''}`}
        >
          <source media="(min-width: 768px)" srcSet={slide.desktop} />
          <img
            src={slide.mobile}
            alt=""
            className="tk-hero__bg-img"
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchpriority={i === 0 ? 'high' : 'low'}
          />
        </picture>
      ))}
      <div className="tk-hero__veil" />
      <div className="tk-hero__grain" />
    </div>
  );
}

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
  const { text, index, reduceMotion } = useTypingSlideCycle(phrases);

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
        <HeroSlides slides={HERO_SLIDES} activeIndex={index} reduceMotion={reduceMotion} />

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
                href="tel:+97180082773375"
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
                  src="playstore.png"
                  alt="Get it on Google Play"
                  className="tk-store-badge__img"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Slide position dots — mirror the typing/slide index */}
        <div className="tk-hero__dots" role="presentation" aria-hidden="true">
          {HERO_SLIDES.map((slide, i) => (
            <span
              key={slide.key}
              className={`tk-hero__dot ${i === index ? 'tk-hero__dot--active' : ''}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}