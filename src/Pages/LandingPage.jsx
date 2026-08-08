import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import './landing.css';

// Keys map to `landing.services.<key>` in each locale file.
const SERVICE_KEYS = ['carRecovery', 'towing', 'battery', 'tire'];

// The service tags (icon + label) used to be baked as pixels directly into
// one flattened hero photo — which meant a separate hand-composed image per
// breakpoint, no way to reflow for narrow/RTL layouts, and unreadable/
// untranslatable label text. Now each layer is its own asset (see
// public/hero/, sourced from public/WEBSITE IMAGE AND ICONS ASSET/) and the
// tags render as real, translated HTML — CSS handles the reflow and RTL
// mirroring instead of a second hand-drawn image.
const HERO_SKYLINE = '/hero/dubai-bg.webp';
const HERO_TRUCK = '/hero/truck-nasir.webp';
// Dedicated artwork for RTL — the truck is re-composited (not just CSS-
// mirrored) so the cab still faces the text column and its livery text/
// logos read correctly, instead of coming out backwards under scaleX(-1).
const HERO_TRUCK_RTL = '/hero/truck-nasir-rtl.webp';

// Keys map to `landing.heroTags.<key>` in each locale file.
const HERO_SERVICE_TAGS = [
  { key: 'carRecovery', icon: '/hero/icon-car-recovery.webp' },
  { key: 'batteryJumpStart', icon: '/hero/icon-battery-jumpstart.webp' },
  { key: 'tirePuncture', icon: '/hero/icon-tire-puncture.webp' },
  { key: 'desertRecovery', icon: '/hero/icon-desert-recovery.webp' },
  { key: 'bikeRecovery', icon: '/hero/icon-bike-recovery.webp' },
  { key: 'accidentRecovery', icon: '/hero/icon-accident-recovery.webp' },
];

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
      <img
        src={HERO_SKYLINE}
        alt=""
        className="tk-hero__skyline"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

// Cycles through HERO_SERVICE_TAGS three at a time, icon-only — the mobile
// (≤860px) replacement for the arc below (see .tk-hero__tags in
// LandingPage.jsx/landing.css, still used as-is on desktop/tablet and
// hidden here via CSS). The arc's position depended on --sphere-x/-y
// trigonometry sharing a box with the circle+truck, which real phones kept
// rendering differently than any emulator this was tested against
// (address-bar states, in-app browser chrome). A plain row that just
// renders as a normal-flow sibling of .tk-hero__visual (see the Fragment
// below) can't be pulled out of place by any of that. Hidden entirely on
// desktop/landscape via CSS, so it never touches those layouts.
//
// The 3 tile slots (keyed by position 0/1/2, not by tag) stay mounted the
// whole time — only their icon `src` and a `--fading` class change. That's
// what makes the swap an actual crossfade (old icon opacity 1→0, src
// swaps while invisible, new icon opacity 0→1 on the SAME element) rather
// than one icon vanishing instantly while an unrelated new one fades in,
// which is what remounting a new element per tag would produce.
function MobileServiceCarousel({ tags }) {
  const { t } = useTranslation();
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [offset, setOffset] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const FADE_MS = 350;
    const HOLD_MS = 2200;
    let fadeTimeout;
    const id = setInterval(() => {
      setFading(true);
      fadeTimeout = setTimeout(() => {
        setOffset((o) => (o + 1) % tags.length);
        setFading(false);
      }, FADE_MS);
    }, HOLD_MS);
    return () => {
      clearInterval(id);
      clearTimeout(fadeTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags.length, reduceMotion]);

  const visible = [0, 1, 2].map((i) => tags[(offset + i) % tags.length]);

  return (
    <div className="tk-hero__mobile-tags" data-testid="landing-hero-tags-mobile">
      {/* Icon-only by request, but the service names stay available to
          screen readers/crawlers instead of disappearing entirely. */}
      <span className="tk-visually-hidden">
        {tags.map((tag) => t(`landing.heroTags.${tag.key}`)).join(', ')}
      </span>
      {visible.map((tag, i) => (
        <div
          key={i}
          className={`tk-hero__mobile-tag${fading ? ' tk-hero__mobile-tag--fading' : ''}`}
          aria-hidden="true"
        >
          <img src={tag.icon} alt="" className="tk-hero__mobile-tag-icon" loading="lazy" width="30" height="30" />
        </div>
      ))}
    </div>
  );
}

// Truck artwork + service tags move and reflow together as one unit (flex
// sibling of .tk-hero__content, see .tk-hero__visual in landing.css) —
// unlike the skyline, which is pure background ambiance and stays
// full-bleed behind everything regardless of language or breakpoint.
function HeroVisual() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  return (
    <>
      {/* Sibling of .tk-hero__visual, not a child of it — renders before it
          in normal flow, so on mobile (.tk-hero__inner: flex-direction:
          column) it always lands above the circle, no matter how tall
          .tk-hero__visual itself ends up being. Hidden entirely above
          860px (see .tk-hero__mobile-tags in landing.css). */}
      <MobileServiceCarousel tags={HERO_SERVICE_TAGS} />
      <div className="tk-hero__visual">
        {/* Radial glow behind the truck — was a hand-drawn gradient PNG
            (WEBSITE IMAGE AND ICONS ASSET/CIRCLE DESIGN.png); reproduced in
            CSS instead since it's just two flat radial gradients, so it
            scales to any size/position with zero extra bytes and flips for
            free under [dir="rtl"]. Lives in this column (not .tk-hero__bg)
            so it shares .tk-hero__truck's own containing block — the two
            were previously positioned against different boxes (full hero
            width vs this narrower column), so no percentage could ever
            land the truck centered on the glow; sharing --sphere-x/-y here
            (see .tk-hero__visual in landing.css) makes that centering
            actually hold. Under RTL the CSS reproduction is swapped for the
            dedicated CIRCLE LEFT SIDE_rtl.png artwork instead (see
            [dir="rtl"] .tk-hero__glow in landing.css). */}
        <div className="tk-hero__glow" />
        <img
          src={isRtl ? HERO_TRUCK_RTL : HERO_TRUCK}
          alt=""
          className="tk-hero__truck"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        {/* Arc — desktop/tablet only below 861px (see .tk-hero__tags in
            landing.css); replaced by <MobileServiceCarousel> on mobile. */}
        <div className="tk-hero__tags" data-testid="landing-hero-tags">
          {HERO_SERVICE_TAGS.map((tag) => (
            <div key={tag.key} className="tk-hero__tag">
              <span className="tk-hero__tag-label">{t(`landing.heroTags.${tag.key}`)}</span>
              <img src={tag.icon} alt="" className="tk-hero__tag-icon" loading="lazy" width="28" height="28" />
            </div>
          ))}
        </div>
      </div>
    </>
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

        <div className="tk-hero__inner">
          <div
            data-aos="fade-up"
            className="tk-hero__content"
            data-testid="landing-hero-text"
          >
            <span className="tk-dispatch-chip" data-testid="landing-eyebrow">
              <span className="tk-dispatch-chip__dot" aria-hidden="true" />
              {t('landing.eyebrow')}
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

            {/* Was floating in the top-right corner of the photo (absolute
                positioned, hidden below 900px) — moved inline here so the
                proof points sit right where a visitor's eye already is
                after the CTAs, and so mobile visitors see them too. */}
            <div className="tk-hero__stats" data-testid="landing-trust-cards">
              {trustStats.map((stat) => (
                <div key={stat.label} className="tk-hero__stat">
                  <span className="tk-hero__stat-value">{stat.value}</span>
                  <span className="tk-hero__stat-label">{stat.label}</span>
                </div>
              ))}
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
                  src="/applestore.webp"
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
                  src="/playstore.webp"
                  alt="Get it on Google Play"
                  className="tk-store-badge__img"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>

          <HeroVisual />
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
            src="/applestore.webp"
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
            src="/playstore.webp"
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