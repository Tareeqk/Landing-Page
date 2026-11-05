import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import useLangLink from '../hooks/useLangLink';
import useDownloadLink from '../hooks/useDownloadLink';
import ratings from '../data/ratings.json';
import { whatsappLinkProps } from '../utils/whatsapp';
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
// used by the service ring in <HeroVisual> below so each tag is a real link,
// not just a label.
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

// Truck artwork + service tags move and reflow together as one unit (flex
// sibling of .tk-hero__content, see .tk-hero__visual in landing.css) —
// unlike the skyline, which is pure background ambiance and stays
// full-bleed behind everything regardless of language or breakpoint. The
// six tags render as a circular arc above 860px and as a full ring around the
// truck below it (see .tk-hero__tag in landing.css).
function HeroVisual() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const langLink = useLangLink();
  return (
    <>
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
        alt={t('landing.heroTruckAlt')}
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
            {/* One-word label for the phone ring (see the 860px block in
                landing.css); hidden above that, where the full label shows. */}
            <span className="tk-hero__tag-short" aria-hidden="true">{t(`landing.heroTagsShort.${tag.key}`)}</span>
          </Link>
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

  // `short` is the one-line label the phone strip shows (see the 860px block
  // in landing.css); `pin` swaps the satellite emoji for an SVG map pin there.
  const trustStats = [
    { value: t('landing.trust.dispatchValue'), label: t('landing.trust.dispatchLabel'), short: t('landing.trustShort.dispatch') },
    { value: t('landing.trust.availabilityValue'), label: t('landing.trust.availabilityLabel'), short: t('landing.trustShort.availability') },
    { value: t('landing.trust.ratingValue'), label: t('landing.trust.ratingLabel'), short: t('landing.trustShort.tracking'), pin: true },
  ];

  // Only added once a real value has been synced from Google (see
  // scripts/fetch-ratings.mjs) -- this visible stat is what makes the
  // AggregateRating markup in LocalBusinessSchema legitimate rather than
  // a schema claim with nothing matching on the page.
  const googleRating = ratings?.google;
  if (googleRating?.rating && googleRating?.review_count > 0) {
    trustStats.push({
      value: `${googleRating.rating}★`,
      label: t('landing.trust.googleReviewsLabel', { count: googleRating.review_count }),
      short: t('landing.trustShort.rating'),
      // Only this stat gets a url -- lets a visitor verify the rating
      // themselves on Google instead of just trusting a number on the
      // page, and is the one card of the four actually worth linking out.
      url: googleRating.url,
    });
  }

  const dl = useDownloadLink();
  const handleDownloadRedirect = dl.go;

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
        <meta property="og:image" content="https://tareeqk.ae/og/new/service_hero_banner.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://tareeqk.ae/${lang}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tareeqk" />
        <meta property="og:locale" content={{ en: 'en_US', ar: 'ar_AR', ur: 'ur_PK' }[i18n.language] || 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.home.title')} />
        <meta name="twitter:description" content={t('meta.home.description')} />
        <meta name="twitter:image" content="https://tareeqk.ae/og/new/service_hero_banner.jpg" />
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

              {/* WhatsApp replaces the old "Call now" button: it is the
                  fastest way for a stranded driver to share a location. Same
                  look as the other hero buttons. The click is counted by the
                  delegated tracker in utils/adsTracking.js. */}
              <a
                {...whatsappLinkProps()}
                target="_blank"
                rel="noopener noreferrer"
                className="tk-btn tk-btn--ghost"
                data-testid="landing-whatsapp-btn"
              >
                {t('whatsapp', 'WhatsApp us')}
                <span className="tk-btn__arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 448 512" fill="#25D366">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                </span>
              </a>
            </div>

            {/* Was floating in the top-right corner of the photo (absolute
                positioned, hidden below 900px) — moved inline here so the
                proof points sit right where a visitor's eye already is
                after the CTAs, and so mobile visitors see them too. */}
            <div className="tk-hero__stats" data-testid="landing-trust-cards">
              {trustStats.map((stat) => {
                const content = (
                  <>
                    <span className={`tk-hero__stat-value${stat.pin ? ' tk-hero__stat-value--emoji' : ''}`}>{stat.value}</span>
                    {stat.pin && (
                      <svg className="tk-hero__stat-pin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" stroke="#F5B301" strokeWidth="2" strokeLinejoin="round" />
                        <circle cx="12" cy="10.5" r="2.3" fill="#F5B301" />
                      </svg>
                    )}
                    <span className="tk-hero__stat-label">{stat.label}</span>
                    <span className="tk-hero__stat-short" aria-hidden="true">{stat.short}</span>
                  </>
                );

                return stat.url ? (
                  <a
                    key={stat.label}
                    href={stat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tk-hero__stat tk-hero__stat--link"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={stat.label} className="tk-hero__stat">
                    {content}
                  </div>
                );
              })}
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