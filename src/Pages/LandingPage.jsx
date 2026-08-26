import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import useLangLink from '../hooks/useLangLink';
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

// Keys map to `landing.heroTags.<key>` in each locale file. `link` is the
// route (post-/:lang) for that service, matching the paths in App.jsx --
// used by <MobileServiceGrid> below so each tag is a real link, not just
// a label.
const HERO_SERVICE_TAGS = [
  { key: 'carRecovery', icon: '/hero/icon-car-recovery.webp', link: '/car-recovery-dubai' },
  { key: 'batteryJumpStart', icon: '/hero/icon-battery-jumpstart.webp', link: '/battery-service-dubai' },
  { key: 'tirePuncture', icon: '/hero/icon-tire-puncture.webp', link: '/flat-tyre-repair-dubai' },
  { key: 'desertRecovery', icon: '/hero/icon-desert-recovery.webp', link: '/desert-recovery-dubai' },
  { key: 'bikeRecovery', icon: '/hero/icon-bike-recovery.webp', link: '/bike-recovery-dubai' },
  { key: 'accidentRecovery', icon: '/hero/icon-accident-recovery.webp', link: '/accident-recovery-dubai' },
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
        fetchpriority="high"
      />
    </div>
  );
}

// Mobile (≤860px) replacement for the arc — used to be a single pill
// (icon + title) that crossfaded through all six tags one at a time; now
// a static grid showing three tags per row (all six visible across two
// rows, no cycling/waiting), each a real link to that service's page
// instead of a decorative label.
function MobileServiceGrid({ tags }) {
  const { t } = useTranslation();
  const langLink = useLangLink();

  return (
    <div className="tk-hero__mobile-tag-grid" data-testid="landing-hero-tags-mobile">
      {tags.map((tag) => (
        <Link
          key={tag.key}
          to={langLink(tag.link)}
          onClick={() => window.scrollTo(0, 0)}
          className="tk-hero__mobile-tag"
          // The visible label is a short, one-word version ("Battery") for
          // layout reasons -- aria-label gives screen readers the full
          // "Battery Jump Start"-style name instead, since a link
          // announced out of context just as "Battery" is a lot less
          // clear than what a sighted visitor gets from the surrounding
          // hero (truck illustration, "services" grouping, etc.).
          aria-label={t(`landing.heroTags.${tag.key}`)}
        >
          <img src={tag.icon} alt="" className="tk-hero__mobile-tag-icon" loading="lazy" width="22" height="22" />
          <span className="tk-hero__mobile-tag-label" aria-hidden="true">
            {t(`landing.heroTagsShort.${tag.key}`)}
          </span>
        </Link>
      ))}
    </div>
  );
}

// Truck artwork + service tags move and reflow together as one unit (flex
// sibling of .tk-hero__content, see .tk-hero__visual in landing.css) —
// unlike the skyline, which is pure background ambiance and stays
// full-bleed behind everything regardless of language or breakpoint. The
// six tags render as a real circular arc above 860px (see .tk-hero__tag
// in landing.css); below that, <MobileServiceGrid> replaces it.
function HeroVisual() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const langLink = useLangLink();
  return (
    <>
      {/* Sibling of .tk-hero__visual, not a child of it — renders before it
          in normal flow, so on mobile (.tk-hero__inner: flex-direction:
          column) three tags land above the circle and the other three
          below it (see the second <MobileServiceGrid> after
          .tk-hero__visual), rather than all six stacked above it.
          Hidden entirely above 860px (see .tk-hero__mobile-tag-grid in
          landing.css). */}
      <MobileServiceGrid tags={HERO_SERVICE_TAGS.slice(0, 3)} />
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
        srcSet={
          isRtl
            ? "/hero/truck-nasir-rtl-480w.webp 480w, /hero/truck-nasir-rtl.webp 719w"
            : "/hero/truck-nasir-480w.webp 480w, /hero/truck-nasir.webp 719w"
        }
        sizes="240px"
        alt=""
        className="tk-hero__truck"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
      <div className="tk-hero__tags" data-testid="landing-hero-tags">
        {HERO_SERVICE_TAGS.map((tag) => (
          <Link
            key={tag.key}
            to={langLink(tag.link)}
            onClick={() => window.scrollTo(0, 0)}
            className="tk-hero__tag"
          >
            <span className="tk-hero__tag-label">{t(`landing.heroTags.${tag.key}`)}</span>
            <img src={tag.icon} alt="" className="tk-hero__tag-icon" loading="lazy" width="28" height="28" />
          </Link>
        ))}
      </div>
    </div>
    {/* Second row, mobile-only (see .tk-hero__mobile-tag-grid's 860px
        media query) -- sibling AFTER .tk-hero__visual so it lands below
        the circle in document flow, sandwiching the truck/glow between
        the two rows of tags. */}
    <MobileServiceGrid tags={HERO_SERVICE_TAGS.slice(3, 6)} />
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

  // The floating store badges (position: fixed, bottom-anchored — see
  // .tk-store-badges--floating in landing.css) sit at a real viewport-
  // relative position, but a real phone's own browser chrome (address bar
  // + bottom toolbar) leaves noticeably less content height above that
  // edge than Chrome DevTools' mobile emulation does — confirmed on an
  // actual iOS Safari screenshot, where they landed on top of the hero's
  // arc icons instead of below them. Rather than guess a pixel margin
  // that only happens to clear whichever phone was tested, keep them
  // hidden/non-interactive until the hero has scrolled fully out of view
  // (same pattern Nasir's WhatsApp bubble already uses, see its own
  // comment) — there is then no viewport height this can collide at,
  // regardless of how tall the arc makes the hero or how much of the
  // screen a given phone's own chrome eats into.
  //
  // isIntersecting (not intersectionRatio) is what matters here:
  // intersectionRatio is the visible fraction of the HERO'S OWN height,
  // which drops well under any reasonable threshold almost immediately
  // on a mobile hero taller than one screen — even while it's still
  // fully on screen — so a ratio-based check flipped this on right at
  // load. isIntersecting only goes false once the hero has left the
  // viewport entirely.
  const heroRef = useRef(null);
  const [badgesVisible, setBadgesVisible] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setBadgesVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setBadgesVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        ref={heroRef}
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
      <div
        className={`tk-store-badges tk-store-badges--floating${badgesVisible ? ' is-visible' : ''}`}
        data-testid="landing-store-badges-floating"
      >
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