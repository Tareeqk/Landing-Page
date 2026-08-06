import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import './landing.css';

// Keys map to `landing.services.<key>` in each locale file.
const SERVICE_KEYS = ['carRecovery', 'towing', 'battery', 'tire'];

// New renders with the full service list (Car Recovery, Battery Jump Start,
// Flat Tyre Repair, Desert Recovery, Bike Recovery, Accident Recovery)
// baked directly into the artwork as icon+label tags, replacing the old
// JSX-driven service pill ticker/dots below — the image itself is now the
// service list, so that UI was removed rather than doubling up on it.
//
// NOTE: mapped by actual composition, not by the literal filenames as
// supplied — "landingpage_banner.png" is a tall 1600×3009 (~0.53:1)
// portrait render with a solid black upper band for text, i.e. built for
// the narrow mobile crop; "landingpage_mobile.png" is a wide 7000×3000
// (2.33:1) landscape render, i.e. built for the desktop banner. Using them
// by filename instead of composition would stretch/crop each into the
// wrong shape.
const HERO_PHOTO = '/new/landingpage_mobile.png';

// Portrait crop for phones — tall render with the same black-band-on-top
// composition as before (see .tk-hero__inner's mobile top-alignment below),
// now with the service tags and truck/car/robot artwork filling the lower
// two-thirds instead of just the truck.
const HERO_PHOTO_MOBILE = '/new/landingpage_banner.png';

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

  return { text, reduceMotion };
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
        <img
          src={HERO_PHOTO}
          alt=""
          className="tk-hero__bg-img"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
      </picture>
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
  const { t, i18n } = useTranslation();
  const { lang } = useParams();

  const phrases = SERVICE_KEYS.map((key) => t(`landing.services.${key}`));
  const { text, reduceMotion } = useTypingSlideCycle(phrases);

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
      {/* Title/description/robots/canonical for this route are already set by
          Home.jsx's own <Helmet> (translated via meta.home.*) — react-helmet-async
          merges by render depth, and duplicating them here with hardcoded English
          previously won that merge, so every language showed an English tab title.
          This block only owns the tags Home.jsx doesn't set: OG/Twitter previews. */}
      <Helmet>
        <meta property="og:title" content={t('meta.home.title')} />
        <meta property="og:description" content={t('meta.home.description')} />
        <meta property="og:image" content="https://tareeqk.ae/new/service_hero_banner.webp" />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1029" />
        <meta property="og:url" content={`https://tareeqk.ae/${lang}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tareeqk" />
        <meta property="og:locale" content={{ en: 'en_US', ar: 'ar_AR', ur: 'ur_PK' }[i18n.language] || 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.home.title')} />
        <meta name="twitter:description" content={t('meta.home.description')} />
        <meta name="twitter:image" content="https://tareeqk.ae/new/service_hero_banner.webp" />
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