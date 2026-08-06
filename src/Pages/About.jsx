// pages/About.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  Zap, Trophy, Lightbulb, Handshake, Smartphone, Moon,
  Car, Battery, Wrench, Fuel, ChevronRight, ChevronLeft,
  Phone, MessageCircle, Star, Shield, Clock, MapPin,
  Target, Eye, Heart, CheckCircle2, Truck, AlertTriangle,
  Mountain, Bike,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import LocalBusinessSchema from '../schemas/LocalBusinessSchema';
import HreflangTags from '../Components/HreflangTags';

// ── Styles ─────────────────────────────────────────────────────────────────
function useAboutStyles() {
  useEffect(() => {
    if (document.getElementById('trq-about-styles')) return;
    const style = document.createElement('style');
    style.id = 'trq-about-styles';
    style.textContent = `
      /* ── Scroll reveal ── */
      .abt-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 1.05s cubic-bezier(0.16,1,0.3,1),
                    transform 1.05s cubic-bezier(0.16,1,0.3,1);
      }
      .abt-reveal.abt-left  { transform: translateX(-28px); }
      .abt-reveal.abt-right { transform: translateX(28px); }
      .abt-reveal.abt-scale { transform: scale(0.96); }
      .abt-reveal.abt-visible { opacity: 1 !important; transform: none !important; }

      [dir="rtl"] .abt-reveal.abt-left  { transform: translateX(28px); }
      [dir="rtl"] .abt-reveal.abt-right { transform: translateX(-28px); }

      /* ── Hero image responsive ── */
      .abt-hero-img-desktop { display: block; }
      .abt-hero-img-mobile  { display: none; }
      @media (max-width: 640px) {
        .abt-hero-img-desktop { display: none; }
        .abt-hero-img-mobile  { display: block; }
      }

      /* ── Mission/Vision responsive ── */
      @media (max-width: 900px) {
        .abt-mv-grid { grid-template-columns: 1fr !important; }
      }

      /* ── Value cards ── */
      .abt-value-card {
        transition: transform 0.32s cubic-bezier(0.16,1,0.3,1),
                    box-shadow 0.32s ease, border-color 0.25s ease;
        cursor: default;
      }
      .abt-value-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 48px rgba(247,178,5,0.10), 0 4px 12px rgba(0,0,0,0.06) !important;
        border-color: var(--primary-yellow) !important;
      }
      .abt-value-card:hover .abt-icon-box {
        background: var(--primary-yellow) !important;
      }
      .abt-value-card:hover .abt-icon-box svg { color: #000 !important; }

      /* ── Buttons ── */
      .abt-btn-cta {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .abt-btn-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(247,178,5,0.4);
      }
      .abt-btn-ghost {
        transition: background 0.2s ease, border-color 0.2s ease;
      }
      .abt-btn-ghost:hover {
        background: rgba(255,255,255,0.13) !important;
        border-color: rgba(255,255,255,0.4) !important;
      }

      /* ── Service links ── */
      .abt-svc-link {
        transition: background 0.18s ease, transform 0.18s ease;
      }
      .abt-svc-link:hover {
        background: rgba(247,178,5,0.10) !important;
        transform: translateX(3px);
      }
      [dir="rtl"] .abt-svc-link:hover { transform: translateX(-3px); }

      /* Four across on desktop now that the grid has the full section
         width to itself (see .abt-coverage-grid above) — two rows of four
         instead of four rows of two for the 8 services. */
      .abt-svc-grid { grid-template-columns: repeat(4, 1fr); }
      @media (max-width: 900px) {
        .abt-svc-grid { grid-template-columns: 1fr 1fr; }
      }

      /* ── Float badge RTL ── */
      [dir="rtl"] .abt-float-badge {
        left: auto !important;
        right: -24px !important;
      }

      /* ── Gold frame RTL ── */
      [dir="rtl"] .abt-frame-border {
        right: auto !important;
        left: -14px !important;
      }

      /* ── Gold accent line RTL ── */
      [dir="rtl"] .abt-hero-accent {
        left: auto !important;
        right: 0 !important;
        background: linear-gradient(270deg, var(--primary-yellow), transparent) !important;
      }

      /* ── Mobile story photo — single image, matching the one desktop
         shows, instead of a 4-photo scroll strip ── */
      .abt-photo-strip {
        display: none;
      }
      @media (max-width: 900px) {
        .abt-photo-strip {
          display: block;
          border-radius: 16px;
          overflow: hidden;
        }
        .abt-photo-strip-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }
      }

      /* ── DARK MODE ── */
      body.dark .abt-page-root       { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .abt-story-section   { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .abt-values-section  { background-color: var(--dark-bg-muted, #1a1a1a) !important; }
      body.dark .abt-cta-section     { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .abt-card {
        background-color: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .abt-value-card:hover { background-color: var(--dark-bg-muted, #252525) !important; }
      body.dark .abt-h2            { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .abt-body-text     { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .abt-card-title    { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .abt-card-body     { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .abt-stat-num      { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .abt-stat-label    { color: var(--dark-text-disabled, #666) !important; }
      body.dark .abt-divider-line  { border-color: var(--dark-divider, rgba(255,255,255,0.08)) !important; }
      body.dark .abt-float-badge   {
        background-color: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .abt-float-badge-title { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .abt-float-badge-sub   { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .abt-icon-box      { background-color: var(--dark-bg-muted, #252525) !important; }
      body.dark .abt-story-strong  { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .abt-read-more-btn { color: var(--primary-yellow) !important; }

      /* ── Read more button ── */
      .abt-read-more-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-size: 13px;
        font-weight: 700;
        color: var(--primary-yellow);
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-top: 10px;
        text-decoration: underline;
        text-underline-offset: 3px;
      }

      /* ── Responsive ── */
      @media (max-width: 900px) {
        .abt-story-grid    { grid-template-columns: 1fr !important; }
        .abt-coverage-grid { grid-template-columns: 1fr !important; }
        .abt-coverage-grid .abt-cta-card { margin-top: 0 !important; }
      }
      @media (max-width: 768px) {
        .abt-float-badge  { display: none !important; }
        .abt-inner        { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        .abt-story-section .abt-story-img-col { display: none !important; }
      }

      /* ── App-like density on mobile: desktop's 80-96px section padding
         reads as dead whitespace on a phone; tighten the rhythm. ── */
      @media (max-width: 768px) {
        .abt-story-section  { padding: 44px 0 40px !important; }
        .abt-mv-section     { padding: 44px 0 !important; }
        .abt-values-section { padding: 44px 0 !important; }
        .abt-coverage-section { padding: 44px 0 !important; }
        .abt-cta-section    { padding: 56px 0 !important; }
        .abt-mv-grid        { gap: 14px !important; margin-bottom: 40px !important; }
        .abt-coverage-grid  { gap: 32px !important; }
      }

      /* ── Mission/Vision card head: icon-above-heading on desktop (a
         column, matching how it always looked), icon-beside-heading on
         mobile — that single change removes the ~60px of vertical space
         the icon's own row was costing, without touching the copy. ── */
      .abt-mv-head {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 22px;
        margin-bottom: 14px;
      }
      @media (max-width: 768px) {
        .abt-mv-card { padding: 22px 20px !important; }
        .abt-mv-head {
          flex-direction: row;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .abt-mv-icon {
          width: 34px !important;
          height: 34px !important;
          border-radius: 9px !important;
        }
        .abt-mv-icon svg { width: 16px !important; height: 16px !important; }
        .abt-mv-title { font-size: 16.5px !important; }
        .abt-mv-body { font-size: 13px !important; line-height: 1.6 !important; }
      }

      /* ── Story "route" rail — a dotted line + two waypoint dots framing
         the origin text, echoing dispatch/route imagery (this is a
         recovery-dispatch company) instead of a plain paragraph block. ── */
      .abt-route-rail {
        position: absolute;
        top: 8px; bottom: 8px;
        left: -28px;
        width: 2px;
        background-image: linear-gradient(rgba(247,178,5,0.4) 0 6px, transparent 6px 13px);
        background-size: 2px 13px;
      }
      [dir="rtl"] .abt-route-rail { left: auto; right: -28px; }
      .abt-route-dot {
        position: absolute; left: -33px;
        width: 12px; height: 12px; border-radius: 50%;
        background: #fff; border: 2px solid var(--primary-yellow);
        box-shadow: 0 0 0 4px #fff;
      }
      body.dark .abt-route-dot { background: var(--dark-bg-main, #0f0f0f) !important; box-shadow: 0 0 0 4px var(--dark-bg-main, #0f0f0f) !important; }
      [dir="rtl"] .abt-route-dot { left: auto; right: -33px; }
      @media (max-width: 900px) {
        .abt-route-rail, .abt-route-dot { display: none; }
      }

      /* ── Dispatch note — origins P2 framed like an operations status
         update rather than a second identical paragraph. ── */
      .abt-dispatch-note {
        padding: 18px 20px;
        border-radius: 10px;
        background: var(--secondary-light-gray);
        border-inline-start: 3px solid var(--primary-yellow);
      }
      body.dark .abt-dispatch-note { background: var(--dark-bg-surface, #1e1e1e) !important; }

      /* ── Core values — a compact divided strip instead of a card grid,
         so it reads as a different kind of content than the trust/value
         cards below it, not the same component twice. ── */
      .abt-principles-strip {
        display: flex; flex-wrap: wrap;
        border: 1px solid rgba(0,0,0,0.08); border-radius: 14px;
        overflow: hidden;
      }
      body.dark .abt-principles-strip { border-color: var(--dark-border, rgba(255,255,255,0.08)) !important; }
      .abt-principle-item {
        flex: 1 1 0; min-width: 168px;
        display: flex; align-items: flex-start; gap: 12px;
        padding: 22px 20px;
        border-inline-end: 1px solid rgba(0,0,0,0.07);
      }
      body.dark .abt-principle-item { border-color: var(--dark-border, rgba(255,255,255,0.08)) !important; }
      .abt-principle-item:last-child { border-inline-end: none; }
      @media (max-width: 900px) {
        .abt-principle-item {
          flex: 1 1 50%; border-inline-end: none !important;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        body.dark .abt-principle-item { border-color: var(--dark-border, rgba(255,255,255,0.08)) !important; }
        .abt-principle-item:nth-child(odd) { border-inline-end: 1px solid rgba(0,0,0,0.07) !important; }
        body.dark .abt-principle-item:nth-child(odd) { border-color: var(--dark-border, rgba(255,255,255,0.08)) !important; }
      }
      @media (max-width: 480px) {
        .abt-principle-item { flex: 1 1 100%; border-inline-end: none !important; }
      }

      /* ── Value proposition — one stat-hero card (15-min ETA is the
         single most decision-relevant number on the page) plus a
         compact feature list, instead of five identical cards. ── */
      .abt-trust-layout {
        display: grid;
        grid-template-columns: 0.85fr 1.15fr;
        gap: 16px;
      }
      @media (max-width: 900px) {
        .abt-trust-layout { grid-template-columns: 1fr; }
      }
      .abt-stat-hero {
        position: relative; overflow: hidden;
        border-radius: 18px; padding: 32px 28px;
        background: var(--primary-dark-bg);
        display: flex; flex-direction: column; justify-content: flex-end;
        min-height: 220px;
      }
      .abt-trust-feature-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      @media (max-width: 640px) {
        .abt-trust-feature-list { grid-template-columns: 1fr; }
      }
      .abt-trust-feature-row {
        display: flex; align-items: flex-start; gap: 14px;
        padding: 20px; border-radius: 14px;
        background: #fff; border: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      }
      body.dark .abt-trust-feature-row {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('trq-about-styles');
      if (el) document.head.removeChild(el);
    };
  }, []);

  // Scroll-reveal observer — its own effect, not bundled into the
  // style-injection one above. That effect skips its body (via the
  // "already injected" guard) on any mount after the first, but this
  // page's prerendered HTML (see scripts/prerender.mjs) already has the
  // style tag baked in from the snapshot — so on a real page load the
  // guard trips immediately, and if the observer setup lived inside that
  // same effect, it would never run and .abt-visible would never get
  // added, leaving every reveal section permanently invisible. This
  // effect has no such guard, so it sets up a fresh observer every mount.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.abt-reveal').forEach(el => el.classList.add('abt-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('abt-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    const timeout = setTimeout(() => {
      document.querySelectorAll('.abt-reveal').forEach(el => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);
}

// ── Shared style tokens ─────────────────────────────────────────────────────
const eyebrow = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'var(--primary-yellow)',
  marginBottom: '12px',
  display: 'block',
};

// ── Component ──────────────────────────────────────────────────────────────
export default function About({ isSection = false }) {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isRTL = i18n.dir() === 'rtl';
  useAboutStyles();
  const HeadingTag = isSection ? 'h2' : 'h1';

  const [storyExpanded, setStoryExpanded] = useState(false);

  const inner = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 3rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  const VALUES = [
    { icon: <Zap size={20} />,        title: t('about.value1Title'), body: t('about.value1Body') },
    { icon: <Trophy size={20} />,      title: t('about.value2Title'), body: t('about.value2Body') },
    { icon: <Lightbulb size={20} />,   title: t('about.value3Title'), body: t('about.value3Body') },
    { icon: <Handshake size={20} />,   title: t('about.value4Title'), body: t('about.value4Body') },
    { icon: <Smartphone size={20} />,  title: t('about.value5Title'), body: t('about.value5Body') },
  
  ];

  const CORE_VALUES = [
    { icon: <CheckCircle2 size={20} />, title: t('about.coreValue1Title'), body: t('about.coreValue1Body') },
    { icon: <Heart size={20} />,        title: t('about.coreValue2Title'), body: t('about.coreValue2Body') },
    { icon: <Shield size={20} />,       title: t('about.coreValue3Title'), body: t('about.coreValue3Body') },
    { icon: <Handshake size={20} />,    title: t('about.coreValue4Title'), body: t('about.coreValue4Body') },
    { icon: <Star size={20} />,         title: t('about.coreValue5Title'), body: t('about.coreValue5Body') },
  ];

  const SERVICES_LIST = [
    { label: t('about.svc1'), href: '/car-recovery-dubai',      icon: <Car size={17} /> },
    { label: t('about.svc2'), href: '/battery-service-dubai',   icon: <Battery size={17} /> },
    { label: t('about.svc3'), href: '/flat-tyre-repair-dubai',  icon: <Wrench size={17} /> },
    // Was pointed at /fuel-delivery-dubai with the Fuel icon while the
    // label read "Towing Service" — fuel delivery gets its own entry
    // below now, and this one links to the page its text actually names.
    { label: t('about.svc4'), href: '/towing-service-dubai',    icon: <Truck size={17} /> },
    { label: t('about.svc5'), href: '/fuel-delivery-dubai',     icon: <Fuel size={17} /> },
    { label: t('about.svc6'), href: '/accident-recovery-dubai', icon: <AlertTriangle size={17} /> },
    { label: t('about.svc7'), href: '/desert-recovery-dubai',   icon: <Mountain size={17} /> },
    { label: t('about.svc8'), href: '/bike-recovery-dubai',     icon: <Bike size={17} /> },
  ];

  // Mobile story photo — a single real Tareeqk photo, matching what
  // desktop shows in the image column next to this same text.
  const MOBILE_STORY_PHOTO = { src: '/new/Recovery_Van.webp', alt: 'Tareeqk recovery van, Dubai' };

  return (
    <div className="abt-page-root" dir={isRTL ? 'rtl' : 'ltr'}>
      {!isSection && (
        <>
          <Helmet>
            <title>{t('meta.about.title')}</title>
            <meta name="description" content={t('meta.about.description')} />
            <link rel="canonical" href={`https://tareeqk.ae/${lang}/about`} />
            <meta property="og:title" content={t('meta.about.title')} />
            <meta property="og:description" content={t('meta.about.description')} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://tareeqk.ae/${lang}/about`} />
            <meta property="og:image" content="https://tareeqk.ae/new/about_banner_hero.webp" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t('meta.about.title')} />
            <meta name="twitter:description" content={t('meta.about.description')} />
            <meta name="twitter:image" content="https://tareeqk.ae/new/about_banner_hero.webp" />
          </Helmet>
          <HreflangTags path="about" />
        </>
      )}
      <LocalBusinessSchema />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — landscape image desktop, portrait image mobile
      ══════════════════════════════════════════════════════════════════ */}
      {!isSection && (
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '460px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Desktop hero image — about_header.png was a 5.5MB, 7010px-wide
              PNG; re-encoded to WebP at a realistic display width. */}
          <div
            className="abt-hero-img-desktop"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'url("/new/about_banner_hero.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center 38%',
              backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Mobile hero image — mobile_about.png had ~55% dead black
              canvas above the actual photo. `contain` + bottom anchoring
              pins the real content full-width instead of `cover`
              stretching that dead space to fill the tall mobile hero. */}
          <div
            className="abt-hero-img-mobile"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundColor: '#050505',
              backgroundImage: 'url("/new/about_mobile_hero.webp")',
              backgroundSize: 'contain',
              backgroundPosition: 'bottom center',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Overlay */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: isRTL
                ? `linear-gradient(260deg,rgba(10,10,10,0.90) 0%,rgba(10,10,10,0.68) 42%,rgba(10,10,10,0.22) 100%),
                   linear-gradient(0deg,rgba(10,10,10,0.55) 0%,transparent 48%)`
                : `linear-gradient(100deg,rgba(10,10,10,0.90) 0%,rgba(10,10,10,0.68) 42%,rgba(10,10,10,0.22) 100%),
                   linear-gradient(0deg,rgba(10,10,10,0.55) 0%,transparent 48%)`,
            }}
          />

          {/* Gold accent line */}
          <div
            className="abt-hero-accent"
            style={{
              position: 'absolute', top: 0,
              left: isRTL ? 'auto' : 0, right: isRTL ? 0 : 'auto',
              width: '32%', height: '3px', zIndex: 2,
              background: isRTL
                ? 'linear-gradient(270deg, var(--primary-yellow), transparent)'
                : 'linear-gradient(90deg, var(--primary-yellow), transparent)',
            }}
          />

          {/* Content */}
          <div
            className="abt-inner"
            style={{ ...inner, position: 'relative', zIndex: 3, paddingTop: '80px', paddingBottom: '80px' }}
          >
            <div style={{ maxWidth: '600px', marginInlineStart: 0 }}>
              <span className="abt-reveal" data-delay="0" style={eyebrow}>
                {t('about.heroTag')}
              </span>

              <HeadingTag
                className="abt-reveal"
                data-delay="80"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.04,
                  margin: '0 0 20px',
                }}
              >
                {t('about.heroTitle')}{' '}
                <span
                  style={{
                    color: 'var(--primary-yellow)',
                    display: 'block',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: '1.06em',
                  }}
                >
                  {t('about.heroHighlight')}
                </span>
              </HeadingTag>

              <p
                className="abt-reveal"
                data-delay="160"
                style={{
                  color: 'rgba(255,255,255,0.70)',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  maxWidth: '500px',
                  margin: '0 0 32px',
                  fontWeight: 400,
                }}
              >
                {t('about.heroSubtitle')}
              </p>

              {/* CTAs */}
              <div
                className="abt-reveal"
                data-delay="240"
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '44px' }}
              >
                <a
                  href="tel:+97142232269"
                  className="abt-btn-cta getTow-btn"
                  style={{
                    background: 'var(--primary-yellow)',
                    color: '#000',
                    padding: '13px 30px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '14px',
                    letterSpacing: '0.01em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Phone size={16} />
                  {t('about.heroCta')}
                </a>
                <a
                  href="/contact"
                  className="abt-btn-ghost"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    color: '#fff',
                    padding: '13px 30px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {t('about.heroInquire')}
                  {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </a>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          STORY — asymmetric two-column + mobile photo strip
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="abt-story-section"
        style={{ padding: '80px 0 72px', overflow: 'hidden', backgroundColor: '#fff' }}
      >
        <div className="abt-inner" style={inner}>
          <div
            className="abt-story-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '72px',
              alignItems: 'center',
            }}
          >
            {/* Text column */}
            <div
              className="abt-reveal abt-left"
              style={{ order: isRTL ? 2 : 1, position: 'relative' }}
            >
              <div className="abt-route-rail" aria-hidden="true" />
              <div className="abt-route-dot" style={{ top: '2px' }} aria-hidden="true" />
              <div className="abt-route-dot" style={{ bottom: '2px' }} aria-hidden="true" />
              <span style={eyebrow}>{t('about.originsTag')}</span>
              <h2
                className="abt-h2"
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: 'var(--primary-dark-bg)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                }}
              >
                {t('about.originsTitle')}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p className="abt-body-text" style={{ color: '#555', lineHeight: 1.8, fontSize: '15px' }}>
                  {t('about.originsP1').split('<strong>').map((part, i) => {
                    if (i === 0) return part;
                    const [bold, rest] = part.split('</strong>');
                    return (
                      <React.Fragment key={i}>
                        <strong className="abt-story-strong" style={{ color: 'var(--primary-dark-bg)', fontWeight: 700 }}>{bold}</strong>
                        {rest}
                      </React.Fragment>
                    );
                  })}
                </p>
                {/* Read more / less on mobile */}
                <div>
                  <div
                    style={{
                      overflow: storyExpanded ? 'visible' : 'hidden',
                      maxHeight: storyExpanded ? 'none' : '0',
                      transition: 'max-height 0.4s ease',
                    }}
                  >
                    <p className="abt-body-text abt-dispatch-note" style={{ color: '#555', lineHeight: 1.8, fontSize: '15px', margin: 0 }}>
                      {t('about.originsP2')}
                    </p>
                  </div>
                  <button
                    className="abt-read-more-btn"
                    onClick={() => setStoryExpanded(v => !v)}
                    aria-expanded={storyExpanded}
                  >
                    {storyExpanded ? t('about.readLess') || 'Read less' : t('about.readMore') || 'Read more'}
                    {storyExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                  </button>
                </div>
              </div>
 
            </div>

            {/* Image column — hidden on mobile; replaced by strip below */}
            <div
              className="abt-reveal abt-right abt-story-img-col"
              style={{ position: 'relative', order: isRTL ? 1 : 2 }}
            >
              <div
                className="abt-frame-border"
                style={{
                  position: 'absolute',
                  top: '-14px',
                  right: isRTL ? 'auto' : '-14px',
                  left: isRTL ? '-14px' : 'auto',
                  width: '100%', height: '100%',
                  borderRadius: '18px',
                  border: '1.5px solid rgba(247,178,5,0.28)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  minHeight: '380px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 28px 64px rgba(0,0,0,0.12)',
                }}
              >
                <img
                  src="/new/Recovery_Van.webp"
                  alt="Tareeqk roadside recovery Dubai"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
              {/* Floating RTA badge */}
              <div
                className="abt-float-badge"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: isRTL ? 'auto' : '-24px',
                  right: isRTL ? '-24px' : 'auto',
                  zIndex: 2,
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  boxShadow: '0 14px 36px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '210px',
                }}
              >
                <div
                  style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: '#fef9ec',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                    color: 'var(--primary-yellow)',
                  }}
                >
                  <Trophy size={20} />
                </div>
                <div>
                  <div className="abt-float-badge-title" style={{ fontWeight: 700, fontSize: '13px', color: '#111' }}>
                    {t('about.rtaLicensed')}
                  </div>
                  <div className="abt-float-badge-sub" style={{ fontSize: '11px', color: '#9b9b9b', marginTop: '1px' }}>
                    {t('about.rtaSubtitle')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile story photo — one image, same as desktop */}
          <div className="abt-photo-strip" style={{ marginTop: '28px' }}>
            <img
              src={MOBILE_STORY_PHOTO.src}
              alt={MOBILE_STORY_PHOTO.alt}
              className="abt-photo-strip-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MISSION & VISION — two-card spotlight + core values strip
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="abt-mv-section"
        style={{ padding: '80px 0', backgroundColor: '#fff' }}
      >
        <div className="abt-inner" style={inner}>
          {/* Mission / Vision cards */}
          <div
            className="abt-mv-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '56px' }}
          >
            <div
              className="abt-reveal abt-left abt-mv-card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '40px 36px',
                borderRadius: '18px',
                background: 'var(--primary-dark-bg)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 60% 60% at 0% 0%, rgba(247,178,5,0.16) 0%, transparent 70%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="abt-mv-head">
                  <div
                    className="abt-mv-icon"
                    style={{
                      width: '46px', height: '46px',
                      borderRadius: '12px',
                      background: 'var(--primary-yellow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#000', flexShrink: 0,
                    }}
                  >
                    <Target size={22} />
                  </div>
                  <h3 className="abt-mv-title" style={{ fontWeight: 800, fontSize: '20px', color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
                    {t('about.missionTitle')}
                  </h3>
                </div>
                <p className="abt-mv-body" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '14.5px' }}>
                  {t('about.missionBody')}
                </p>
              </div>
            </div>

            <div
              className="abt-reveal abt-right abt-mv-card"
              style={{
                padding: '40px 36px',
                borderRadius: '18px',
                background: 'var(--secondary-light-gray)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="abt-mv-head">
                <div
                  className="abt-mv-icon"
                  style={{
                    width: '46px', height: '46px',
                    borderRadius: '12px',
                    background: '#fef9ec',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary-yellow)', flexShrink: 0,
                  }}
                >
                  <Eye size={22} />
                </div>
                <h3 className="abt-mv-title" style={{ fontWeight: 800, fontSize: '20px', color: 'var(--primary-dark-bg)', letterSpacing: '-0.02em', margin: 0 }}>
                  {t('about.visionTitle')}
                </h3>
              </div>
              <p className="abt-mv-body" style={{ color: '#6b6b6b', lineHeight: 1.8, fontSize: '14.5px' }}>
                {t('about.visionBody')}
              </p>
            </div>
          </div>

          {/* Core values strip */}
          <div className="abt-reveal" style={{ marginBottom: '32px' }}>
            <span style={eyebrow}>{t('about.coreValuesTag')}</span>
            <h2
              className="abt-h2"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--primary-dark-bg)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                maxWidth: '460px',
              }}
            >
              {t('about.coreValuesTitle')}
            </h2>
          </div>

          <div className="abt-principles-strip">
            {CORE_VALUES.map((v, i) => (
              <div
                key={i}
                className="abt-reveal abt-principle-item"
                data-delay={i * 70}
              >
                <div
                  className="abt-icon-box"
                  style={{
                    width: '34px', height: '34px', flexShrink: 0,
                    borderRadius: '9px',
                    background: '#fef9ec',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.25s ease',
                    color: 'var(--primary-yellow)',
                  }}
                >
                  {v.icon}
                </div>
                <div>
                  <h3 className="abt-card-title" style={{ fontWeight: 700, fontSize: '13.5px', color: '#111', marginBottom: '4px', letterSpacing: '-0.01em' }}>
                    {v.title}
                  </h3>
                  <p className="abt-card-body" style={{ color: '#6b6b6b', lineHeight: 1.55, fontSize: '12px', margin: 0 }}>
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VALUES — 3-column card grid (desktop) / swiper (mobile)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="abt-values-section"
        style={{ padding: '80px 0', overflow: 'hidden', backgroundColor: 'var(--secondary-light-gray)' }}
      >
        <div className="abt-inner" style={inner}>
          <div className="abt-reveal" style={{ marginBottom: '40px' }}>
            <span style={eyebrow}>{t('about.valuesTag')}</span>
            <h2
              className="abt-h2"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--primary-dark-bg)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                maxWidth: '460px',
              }}
            >
              {t('about.valuesTitle')}
            </h2>
          </div>

          {/* Stat-hero (the 15-min ETA — the single most decision-relevant
              number on this page) + a compact feature list for the rest,
              instead of five identical cards. */}
          <div className="abt-trust-layout">
            <div
              className="abt-reveal abt-left abt-stat-hero"
              data-delay="0"
              style={{
                backgroundImage: 'linear-gradient(165deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.92) 100%), url("https://images.unsplash.com/photo-1730514784243-f0e7f09c9f50?auto=format&fit=crop&w=900&q=60")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 60% 60% at 0% 100%, rgba(247,178,5,0.22) 0%, transparent 70%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ color: 'var(--primary-yellow)', marginBottom: '14px' }}>{VALUES[0].icon}</div>
                <h3 className="abt-stat-hero-title" style={{ fontWeight: 800, fontSize: 'clamp(22px, 2.6vw, 28px)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 12px' }}>
                  {VALUES[0].title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontSize: '13.5px', margin: 0 }}>
                  {VALUES[0].body}
                </p>
              </div>
            </div>

            <div className="abt-trust-feature-list">
              {VALUES.slice(1).map((v, i) => (
                <div
                  key={i}
                  className="abt-reveal abt-right abt-trust-feature-row"
                  data-delay={i * 70}
                >
                  <div
                    className="abt-icon-box"
                    style={{
                      width: '38px', height: '38px', flexShrink: 0,
                      borderRadius: '10px',
                      background: '#fef9ec',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.25s ease',
                      color: 'var(--primary-yellow)',
                    }}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="abt-card-title" style={{ fontWeight: 700, fontSize: '14px', color: '#111', marginBottom: '5px', letterSpacing: '-0.01em' }}>
                      {v.title}
                    </h3>
                    <p className="abt-card-body" style={{ color: '#6b6b6b', lineHeight: 1.6, fontSize: '12.5px', margin: 0 }}>
                      {v.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          COVERAGE — dark section
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="abt-coverage-section"
        style={{ padding: '80px 0', overflow: 'hidden', backgroundColor: 'var(--primary-dark-bg)' }}
      >
        <div className="abt-inner" style={inner}>
          {/* Was a 1fr/0.72fr split reserving a right column for a yellow
              CTA card — that card is commented out below (dead), so the
              grid was leaving its own 0.72fr as permanent blank space
              next to the service links. Single column now; the link grid
              below fills the width itself with more columns instead. */}
          <div
            className="abt-coverage-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              alignItems: 'start',
            }}
          >
            {/* Left: text + service links */}
            <div className="abt-reveal abt-left" style={{ order: isRTL ? 2 : 1 }}>
              <span style={eyebrow}>{t('about.coverageTag')}</span>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '18px',
                }}
              >
                {t('about.coverageTitle')}
              </h2>
             
              <div className="abt-svc-grid" style={{ display: 'grid', gap: '10px' }}>
                {SERVICES_LIST.map((svc, i) => (
                  <a
                    key={i}
                    href={svc.href}
                    className="abt-svc-link"
                    style={{
                      padding: '15px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: 'rgba(255,255,255,0.82)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <span style={{ color: 'var(--primary-yellow)', flexShrink: 0 }}>{svc.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: '13px' }}>{svc.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: CTA card (yellow) */}
            {/* <div className="abt-reveal abt-right abt-cta-card" style={{ order: isRTL ? 1 : 2 }}>
              <div
                style={{
                  background: 'var(--primary-yellow)',
                  borderRadius: '18px',
                  padding: '36px 30px',
                  color: '#000',
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.55, marginBottom: '10px' }}>
                  {t('about.emergencyTag')}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  {t('about.emergencyTitle')}
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: 1.7, opacity: 0.75, marginBottom: '24px', fontWeight: 400 }}>
                  {t('about.emergencySubtitle')}
                </p>
                <a
                  href="tel:+971"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '14px',
                    background: '#000', color: '#fff',
                    textAlign: 'center', borderRadius: '9px',
                    fontWeight: 700, textDecoration: 'none',
                    fontSize: '14px', marginBottom: '8px',
                  }}
                >
                  <Phone size={16} />
                  {t('about.callBtn')}
                </a>
                <a
                  href="https://wa.me/97142232269"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    padding: '12px',
                    background: 'rgba(0,0,0,0.10)', color: '#000',
                    textAlign: 'center', borderRadius: '9px',
                    fontWeight: 600, textDecoration: 'none',
                    fontSize: '13.5px',
                    border: '1px solid rgba(0,0,0,0.10)',
                  }}
                >
                  <MessageCircle size={16} />
                  {t('about.whatsappBtn')}
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — bottom banner
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="abt-cta-section"
        style={{ padding: '96px 0', backgroundColor: '#fff' }}
      >
        <div className="abt-inner" style={inner}>
          <div
            className="abt-reveal abt-scale"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '20px',
              padding: 'clamp(40px, 8vw, 72px) clamp(24px, 6vw, 48px)',
              textAlign: 'center',
              background: 'var(--primary-dark-bg)',
            }}
          >
            {/* Gold glow */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 110%, rgba(247,178,5,0.2) 0%, transparent 70%)' }} />
            {/* Grid texture */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
            {/* Watermark */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(60px, 12vw, 150px)', fontWeight: 800, color: 'rgba(255,255,255,0.022)', letterSpacing: '-0.05em', userSelect: 'none' }}>
              TAREEQK
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ ...eyebrow, display: 'block', textAlign: 'center', marginBottom: '14px' }}>
                {t('about.ctaTag')}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4.2vw, 3rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  marginBottom: '14px',
                }}
              >
                {t('about.ctaTitle')}{' '}
                <span style={{ color: 'var(--primary-yellow)' }}>{t('about.ctaHighlight')}</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                {t('about.ctaSubtitle')}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="tel:+97142232269"
                  className="abt-btn-cta getTow-btn"
                  style={{
                    background: 'var(--primary-yellow)', color: '#000',
                    padding: '15px 38px', borderRadius: '8px',
                    fontWeight: 700, textDecoration: 'none', fontSize: '14px',
                    letterSpacing: '0.01em', display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <Phone size={16} />
                  {t('about.callNow')}
                </a>
                <a
                  href="https://wa.me/97142232269"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'rgba(37,211,102,0.12)',
                    border: '1px solid rgba(37,211,102,0.3)',
                    color: '#4ade80',
                    padding: '15px 38px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.color = '#4ade80'; }}
                >
                  <MessageCircle size={16} />
                  {t('about.whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}