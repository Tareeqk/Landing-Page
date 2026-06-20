// pages/About.jsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Counters from '../Components/Counters';

// ── Local Business Schema ──────────────────────────────────────────────────
function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TowingService"],
    "name": "Tareeqk",
    "alternateName": "Tareeqk Roadside Assistance Dubai",
    "description": "24/7 car recovery, towing, battery boost, flat tyre repair, fuel delivery, and accident recovery in Dubai, UAE. RTA-licensed operator.",
    "url": "https://www.tareeqk.ae",
    "logo": "https://www.tareeqk.ae/new/logo.png",
    "image": "https://www.tareeqk.ae/new/Recovery_Van.webp",
    "telephone": "+97180082773375",
    "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
    "geo": { "@type": "GeoCoordinates", "latitude": "25.2048", "longitude": "55.2708" },
    "openingHours": "Mo-Sa 09:00-17:00",
    "areaServed": { "@type": "City", "name": "Dubai" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1200", "bestRating": "5" }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

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
        transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                    transform 0.75s cubic-bezier(0.16,1,0.3,1);
      }
      .abt-reveal.abt-left  { transform: translateX(-28px); }
      .abt-reveal.abt-right { transform: translateX(28px); }
      .abt-reveal.abt-scale { transform: scale(0.96); }
      .abt-reveal.abt-visible { opacity: 1 !important; transform: none !important; }

      /* ── RTL reveal directions flip ── */
      [dir="rtl"] .abt-reveal.abt-left  { transform: translateX(28px); }
      [dir="rtl"] .abt-reveal.abt-right { transform: translateX(-28px); }

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
      [dir="rtl"] .abt-svc-link:hover {
        transform: translateX(-3px);
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

      /* ── DARK MODE ── */
      body.dark .abt-page-root       { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .abt-story-section   { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .abt-values-section  { background-color: var(--dark-bg-muted, #1a1a1a) !important; }
      body.dark .abt-cta-section     { background-color: var(--dark-bg-main, #0f0f0f) !important; }

      body.dark .abt-card {
        background-color: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .abt-value-card:hover {
        background-color: var(--dark-bg-muted, #252525) !important;
      }
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

      /* ── Responsive ── */
      @media (max-width: 900px) {
        .abt-story-grid    { grid-template-columns: 1fr !important; }
        .abt-coverage-grid { grid-template-columns: 1fr !important; }
        .abt-coverage-grid .abt-cta-card { margin-top: 0 !important; }
      }
      @media (max-width: 768px) {
        .abt-values-grid  { grid-template-columns: 1fr 1fr !important; }
        .abt-hero-stats   { display: none !important; }
        .abt-float-badge  { display: none !important; }
        .abt-inner        { padding: 0 1.25rem !important; }
      }
      @media (max-width: 480px) {
        .abt-values-grid  { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);

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

    setTimeout(() => {
      document.querySelectorAll('.abt-reveal').forEach(el => observer.observe(el));
    }, 50);

    return () => {
      observer.disconnect();
      const el = document.getElementById('trq-about-styles');
      if (el) document.head.removeChild(el);
    };
  }, []);
}

// ── Shared style tokens ────────────────────────────────────────────────────
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
  const isRTL = i18n.dir() === 'rtl';
  useAboutStyles();
  const HeadingTag = isSection ? 'h2' : 'h1';

  const inner = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 3rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  const VALUES = [
    { icon: '⚡', title: t('about.value1Title'), body: t('about.value1Body') },
    { icon: '🏆', title: t('about.value2Title'), body: t('about.value2Body') },
    { icon: '💡', title: t('about.value3Title'), body: t('about.value3Body') },
    { icon: '🤝', title: t('about.value4Title'), body: t('about.value4Body') },
    { icon: '📱', title: t('about.value5Title'), body: t('about.value5Body') },
    { icon: '🌙', title: t('about.value6Title'), body: t('about.value6Body') },
  ];

  const SERVICES_LIST = [
    { label: t('about.svc1'), href: '/car-recovery-dubai',     icon: '🚗' },
    { label: t('about.svc2'), href: '/battery-service-dubai',  icon: '🔋' },
    { label: t('about.svc3'), href: '/flat-tyre-repair-dubai', icon: '🔧' },
    { label: t('about.svc4'), href: '/fuel-delivery-dubai',    icon: '⛽' },
  ];

  const HERO_STATS = [
    { stat: '20 min', label: t('about.statAvgResponse') },
    { stat: '50K+',   label: t('about.statDriversHelped') },
    { stat: '4.9★',   label: t('about.statReviews') },
    { stat: 'RTA',    label: t('about.statLicensed') },
  ];

  return (
    <div className="abt-page-root" dir={isRTL ? 'rtl' : 'ltr'}>
      {!isSection && (
        <Helmet>
          <title>{t('meta.about.title')}</title>
          <meta name="description" content={t('meta.about.description')} />
        </Helmet>
      )}
      <LocalBusinessSchema />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
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
          {/* Hero image */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'url("about_hero.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center 38%',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Overlay — adapts direction for RTL */}
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
              position: 'absolute', top: 0, left: isRTL ? 'auto' : 0, right: isRTL ? 0 : 'auto',
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
                  href="tel:+97180082773375"
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
                    display: 'inline-block',
                  }}
                >
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
                    display: 'inline-block',
                  }}
                >
                  {t('about.heroInquire')} {isRTL ? '←' : '→'}
                </a>
              </div>

              {/* Stat strip */}
              <div
                className="abt-reveal abt-hero-stats"
                data-delay="320"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0',
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  paddingTop: '22px',
                }}
              >
                {HERO_STATS.map((m, i, arr) => (
                  <div
                    key={i}
                    style={{
                      paddingInlineEnd: '26px',
                      marginInlineEnd: '26px',
                      borderInlineEnd: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '19px', fontWeight: 800, color: 'var(--primary-yellow)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {m.stat}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.42)', fontWeight: 500, marginTop: '3px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          STORY — asymmetric two-column
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="abt-story-section"
        style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: '#fff' }}
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
            {/* Text column — swaps order in RTL */}
            <div
              className="abt-reveal abt-left"
              style={{ order: isRTL ? 2 : 1 }}
            >
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
                <p className="abt-body-text" style={{ color: '#555', lineHeight: 1.8, fontSize: '15px' }}>
                  {t('about.originsP2')}
                </p>
              </div>

              {/* Stat row */}
              <div
                className="abt-divider-line"
                style={{
                  display: 'flex',
                  gap: '32px',
                  marginTop: '36px',
                  paddingTop: '28px',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                {[
                  { n: '2019', l: t('about.statFounded') },
                  { n: '50K+', l: t('about.statRescues') },
                  { n: '4.9★', l: t('about.statRating') },
                ].map((item, i) => (
                  <div key={i}>
                    <div
                      className="abt-stat-num"
                      style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary-dark-bg)', letterSpacing: '-0.03em', lineHeight: 1 }}
                    >
                      {item.n}
                    </div>
                    <div
                      className="abt-stat-label"
                      style={{ fontSize: '10px', color: '#9b9b9b', marginTop: '3px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                    >
                      {item.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image column */}
            <div
              className="abt-reveal abt-right"
              style={{ position: 'relative', order: isRTL ? 1 : 2 }}
            >
              {/* Decorative offset border frame */}
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
                  src="new/Recovery_Van.webp"
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
                    justifyContent: 'center', fontSize: '18px', flexShrink: 0,
                  }}
                >
                  🏆
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          VALUES — 3-column card grid
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="abt-values-section"
        style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: 'var(--secondary-light-gray)' }}
      >
        <div className="abt-inner" style={inner}>
          <div className="abt-reveal" style={{ marginBottom: '56px' }}>
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

          <div
            className="abt-values-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
          >
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="abt-reveal abt-value-card abt-card"
                data-delay={i * 60}
                style={{
                  padding: '28px',
                  borderRadius: '14px',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div
                  className="abt-icon-box"
                  style={{
                    width: '42px', height: '42px',
                    borderRadius: '10px',
                    background: '#fef9ec',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px', marginBottom: '18px',
                    transition: 'background 0.25s ease',
                  }}
                >
                  {v.icon}
                </div>
                <h3 className="abt-card-title" style={{ fontWeight: 700, fontSize: '15px', color: '#111', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {v.title}
                </h3>
                <p className="abt-card-body" style={{ color: '#6b6b6b', lineHeight: 1.7, fontSize: '13.5px' }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ══════════════════════════════════════════════════════════════════
          COVERAGE — dark section
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: 'var(--primary-dark-bg)' }}
      >
        <div className="abt-inner" style={inner}>
          <div
            className="abt-coverage-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 0.72fr',
              gap: '80px',
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
              <p
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.75,
                  fontSize: '15px',
                  marginBottom: '36px',
                }}
              >
                {t('about.coverageSubtitle')}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
                    <span style={{ fontSize: '18px' }}>{svc.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: '13px' }}>{svc.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: CTA card (yellow) */}
            <div className="abt-reveal abt-right abt-cta-card" style={{ order: isRTL ? 1 : 2 }}>
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
                    display: 'block', padding: '14px',
                    background: '#000', color: '#fff',
                    textAlign: 'center', borderRadius: '9px',
                    fontWeight: 700, textDecoration: 'none',
                    fontSize: '14px', marginBottom: '8px',
                  }}
                >
                  {t('about.callBtn')}
                </a>
                <a
                  href="https://wa.me/971"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'block', padding: '12px',
                    background: 'rgba(0,0,0,0.10)', color: '#000',
                    textAlign: 'center', borderRadius: '9px',
                    fontWeight: 600, textDecoration: 'none',
                    fontSize: '13.5px',
                    border: '1px solid rgba(0,0,0,0.10)',
                  }}
                >
                  💬 {t('about.whatsappBtn')}
                </a>
              </div>
            </div>
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
              padding: '72px 48px',
              textAlign: 'center',
              background: 'var(--primary-dark-bg)',
            }}
          >
            {/* Gold glow */}
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 0,
                background: 'radial-gradient(ellipse 55% 60% at 50% 110%, rgba(247,178,5,0.2) 0%, transparent 70%)',
              }}
            />
            {/* Grid texture */}
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                backgroundSize: '52px 52px',
              }}
            />
            {/* Watermark */}
            <div
              style={{
                position: 'absolute', inset: 0, zIndex: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(60px, 12vw, 150px)', fontWeight: 800,
                color: 'rgba(255,255,255,0.022)',
                letterSpacing: '-0.05em', userSelect: 'none',
              }}
            >
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
              <p
                style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '15px',
                  maxWidth: '480px',
                  margin: '0 auto 36px',
                  lineHeight: 1.7,
                }}
              >
                {t('about.ctaSubtitle')}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="tel:+97180082773375"
                  className="abt-btn-cta getTow-btn"
                  style={{
                    background: 'var(--primary-yellow)', color: '#000',
                    padding: '15px 38px', borderRadius: '8px',
                    fontWeight: 700, textDecoration: 'none', fontSize: '14px',
                    letterSpacing: '0.01em', display: 'inline-block',
                  }}
                >
                  {t('about.callNow')}
                </a>
                <a
                  href="https://wa.me/97180082773375"
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
                    display: 'inline-block',
                    transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.color = '#4ade80'; }}
                >
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