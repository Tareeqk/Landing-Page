// pages/Service.jsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// ── Schemas ────────────────────────────────────────────────────────────────
function ServicesPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Tareeqk Roadside Assistance Services Dubai",
    "description": "24/7 roadside assistance services in Dubai including car recovery, towing, battery boost, flat tyre repair, fuel delivery, and accident recovery.",
    "url": "https://www.tareeqk.ae/service",
    "numberOfItems": 5,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "Service", "name": "Car Recovery Dubai", "url": "https://www.tareeqk.ae/car-recovery-dubai", "description": "24/7 car recovery and towing service in Dubai with 20-minute response time.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "Service", "name": "Battery Boost & Replacement Dubai", "url": "https://www.tareeqk.ae/battery-service-dubai", "description": "On-site car battery jump start and replacement across Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "Service", "name": "Flat Tyre Repair Dubai", "url": "https://www.tareeqk.ae/flat-tyre-repair-dubai", "description": "Mobile flat tyre repair and replacement at your location in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "Service", "name": "Accident Recovery Dubai", "url": "https://www.tareeqk.ae/accident-recovery-dubai", "description": "Emergency accident recovery and towing for damaged vehicles in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "Service", "name": "Towing Service Dubai", "url": "https://www.tareeqk.ae/towing-service-dubai", "description": "Professional vehicle towing service across all Dubai districts.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
    ]
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Request Roadside Assistance in Dubai",
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Call, WhatsApp, or Open the App", "text": "Contact Tareeqk via phone, WhatsApp, or the mobile app and share your location." },
      { "@type": "HowToStep", "position": 2, "name": "Confirm Your Request", "text": "Confirm the service you need and get an upfront price before we dispatch." },
      { "@type": "HowToStep", "position": 3, "name": "We Dispatch Immediately", "text": "The nearest certified technician is dispatched to your location within minutes." },
      { "@type": "HowToStep", "position": 4, "name": "Problem Solved", "text": "Your vehicle is recovered, repaired, or transported — you're back on the road." },
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
function useServiceStyles() {
  useEffect(() => {
    if (document.getElementById('trq-svc-styles')) return;
    const style = document.createElement('style');
    style.id = 'trq-svc-styles';
    style.textContent = `
      /* ── Scroll reveal ── */
      .svc-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                    transform 0.75s cubic-bezier(0.16,1,0.3,1);
      }
      .svc-reveal.svc-left  { transform: translateX(-28px); }
      .svc-reveal.svc-right { transform: translateX(28px); }
      .svc-reveal.svc-scale { transform: scale(0.96); }
      .svc-reveal.svc-fade  { transform: none; }
      .svc-reveal.svc-visible { opacity: 1 !important; transform: none !important; }

      /* RTL flip reveals */
      [dir="rtl"] .svc-reveal.svc-left  { transform: translateX(28px); }
      [dir="rtl"] .svc-reveal.svc-right { transform: translateX(-28px); }

      /* ── "Who we are" label pill (Annex style) ── */
      .svc-pill-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 999px;
        padding: 6px 14px 6px 10px;
        font-size: 13px;
        font-weight: 500;
        color: #444;
        background: #fff;
        margin-bottom: 28px;
      }
      .svc-pill-label .svc-pill-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--primary-yellow);
        flex-shrink: 0;
      }
      body.dark .svc-pill-label {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.1)) !important;
        color: var(--dark-text-muted, #aaa) !important;
      }

      /* ── Service cards (Annex-style: image top, clean white) ── */
      .svc-card {
        background: #fff;
        border-radius: 16px;
        border: 1px solid rgba(0,0,0,0.07);
        overflow: hidden;
        transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                    box-shadow 0.35s ease,
                    border-color 0.25s ease;
        text-decoration: none;
        display: block;
        cursor: pointer;
      }
      .svc-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 28px 64px rgba(0,0,0,0.10);
        border-color: var(--primary-yellow);
      }
      .svc-card-top-bar {
        height: 3px;
        background: var(--primary-yellow);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      [dir="rtl"] .svc-card-top-bar { transform-origin: right; }
      .svc-card:hover .svc-card-top-bar { transform: scaleX(1); }

      body.dark .svc-card {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .svc-card:hover {
        box-shadow: 0 28px 64px rgba(0,0,0,0.40) !important;
      }
      body.dark .svc-card-title  { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-card-body   { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .svc-card-icon   { background: var(--dark-bg-muted, #252525) !important; }
      body.dark .svc-feat-item   {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .svc-feat-label  { color: var(--dark-text-muted, #ccc) !important; }
      body.dark .svc-bullet-text { color: var(--dark-text-muted, #aaa) !important; }

      /* ── Step rows ── */
      .svc-step-row {
        transition: background 0.22s ease, transform 0.28s ease;
        border-radius: 12px;
      }
      .svc-step-row:hover {
        background: rgba(247,178,5,0.05) !important;
        transform: translateX(5px);
      }
      [dir="rtl"] .svc-step-row:hover { transform: translateX(-5px); }

      /* ── Why cards ── */
      .svc-why-card {
        transition: transform 0.32s cubic-bezier(0.16,1,0.3,1),
                    box-shadow 0.32s ease, border-color 0.25s ease;
      }
      .svc-why-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 48px rgba(247,178,5,0.10), 0 4px 12px rgba(0,0,0,0.06) !important;
        border-color: var(--primary-yellow) !important;
      }
      .svc-why-card:hover .svc-why-icon { background: var(--primary-yellow) !important; }
      body.dark .svc-why-card {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .svc-why-title { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-why-body  { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .svc-why-icon  { background: var(--dark-bg-muted, #252525) !important; }

      /* ── CTA buttons ── */
      .svc-btn-primary {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .svc-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(247,178,5,0.40);
      }
      .svc-btn-ghost {
        transition: background 0.2s ease, border-color 0.2s ease;
      }
      .svc-btn-ghost:hover {
        background: rgba(255,255,255,0.13) !important;
        border-color: rgba(255,255,255,0.40) !important;
      }

      /* ── Location pills ── */
      .svc-loc-pill {
        transition: background 0.18s ease, color 0.18s ease,
                    border-color 0.18s ease, transform 0.18s ease;
      }
      .svc-loc-pill:hover {
        background: var(--primary-yellow) !important;
        color: #000 !important;
        border-color: var(--primary-yellow) !important;
        transform: translateY(-1px);
      }

      /* ── Stat bar (Annex-style horizontal stats) ── */
      .svc-stat-bar {
        display: flex;
        gap: 0;
        border-top: 1px solid rgba(0,0,0,0.06);
        padding-top: 28px;
        margin-top: 36px;
        flex-wrap: wrap;
      }
      body.dark .svc-stat-bar { border-color: var(--dark-divider, rgba(255,255,255,0.08)) !important; }
      .svc-stat-item {
        padding-inline-end: 28px;
        margin-inline-end: 28px;
        border-inline-end: 1px solid rgba(0,0,0,0.08);
      }
      .svc-stat-item:last-child { border-inline-end: none; }
      body.dark .svc-stat-item { border-color: var(--dark-divider, rgba(255,255,255,0.08)) !important; }
      .svc-stat-num { font-size: 22px; font-weight: 800; color: var(--primary-dark-bg); line-height: 1; }
      body.dark .svc-stat-num { color: var(--dark-text-main, #f0f0f0) !important; }
      .svc-stat-label { font-size: 10px; color: #9b9b9b; margin-top: 3px; letter-spacing: 0.08em; text-transform: uppercase; }
      body.dark .svc-stat-label { color: var(--dark-text-disabled, #666) !important; }

      /* ── Gold glow animation ── */
      @keyframes svc-gold-pulse {
        0%, 100% { text-shadow: none; }
        50% { text-shadow: 0 0 32px rgba(247,178,5,0.25); }
      }
      .svc-gold-glow { animation: svc-gold-pulse 4s ease-in-out infinite; }

      /* ── Dark mode section roots ── */
      body.dark .svc-page-root      { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-intro-section  { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-cards-section  { background-color: var(--dark-bg-muted, #1a1a1a) !important; }
      body.dark .svc-steps-section  { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-why-section    { background-color: var(--dark-bg-muted, #1a1a1a) !important; }
      body.dark .svc-cta-section    { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-h2             { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-body-text      { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .svc-step-title     { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-step-body      { color: var(--dark-text-muted, #aaa) !important; }

      /* ── Responsive ── */
      @media (max-width: 1024px) {
        .svc-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        .svc-why-grid   { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 900px) {
        .svc-intro-grid    { grid-template-columns: 1fr !important; }
        .svc-coverage-grid { grid-template-columns: 1fr !important; }
        .svc-steps-header  { flex-direction: column !important; align-items: flex-start !important; }
      }
      @media (max-width: 768px) {
        .svc-cards-grid  { grid-template-columns: 1fr !important; }
        .svc-why-grid    { grid-template-columns: 1fr 1fr !important; }
        .svc-hero-stats  { display: none !important; }
        .svc-inner       { padding: 0 1.25rem !important; }
      }
      @media (max-width: 480px) {
        .svc-why-grid    { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('svc-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.svc-reveal').forEach(el => observer.observe(el));
    }, 50);

    return () => {
      observer.disconnect();
      const el = document.getElementById('trq-svc-styles');
      if (el) document.head.removeChild(el);
    };
  }, []);
}

// ── Shared tokens ──────────────────────────────────────────────────────────
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
export default function Service({ isSection = false }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const HeadingTag = isSection ? 'h2' : 'h1';
  useServiceStyles();

  const inner = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 3rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  const scrollToDownload = () => {
    const el = document.getElementById('download-buttons');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ── Data (i18n-driven) ─────────────────────────────────────────────────
  const SERVICES = [
    {
      icon: '🚗',
      href: '/car-recovery-dubai',
      tag: t('service.svc1Tag'),
      tagBg: 'rgba(247,178,5,0.10)',
      tagColor: '#b07c00',
      title: t('service.svc1Title'),
      desc: t('service.svc1Desc'),
      bullets: [t('service.svc1b1'), t('service.svc1b2'), t('service.svc1b3'), t('service.svc1b4')],
    },
    {
      icon: '🚛',
      href: '/towing-service-dubai',
      tag: null,
      title: t('service.svc2Title'),
      desc: t('service.svc2Desc'),
      bullets: [t('service.svc2b1'), t('service.svc2b2'), t('service.svc2b3'), t('service.svc2b4')],
    },
    {
      icon: '🔋',
      href: '/battery-service-dubai',
      tag: t('service.svc3Tag'),
      tagBg: 'rgba(239,68,68,0.07)',
      tagColor: '#c93030',
      title: t('service.svc3Title'),
      desc: t('service.svc3Desc'),
      bullets: [t('service.svc3b1'), t('service.svc3b2'), t('service.svc3b3'), t('service.svc3b4')],
    },
    {
      icon: '🔧',
      href: '/flat-tyre-repair-dubai',
      tag: null,
      title: t('service.svc4Title'),
      desc: t('service.svc4Desc'),
      bullets: [t('service.svc4b1'), t('service.svc4b2'), t('service.svc4b3'), t('service.svc4b4')],
    },
    {
      icon: '🚨',
      href: '/accident-recovery-dubai',
      tag: t('service.svc5Tag'),
      tagBg: 'rgba(249,115,22,0.07)',
      tagColor: '#c04f00',
      title: t('service.svc5Title'),
      desc: t('service.svc5Desc'),
      bullets: [t('service.svc5b1'), t('service.svc5b2'), t('service.svc5b3'), t('service.svc5b4')],
    },
  ];

  const HOW_STEPS = [
    { num: '01', icon: '📱', title: t('service.step1Title'), body: t('service.step1Body') },
    { num: '02', icon: '💰', title: t('service.step2Title'), body: t('service.step2Body') },
    { num: '03', icon: '🚛', title: t('service.step3Title'), body: t('service.step3Body') },
    { num: '04', icon: '✅', title: t('service.step4Title'), body: t('service.step4Body') },
  ];

  const WHY_POINTS = [
    { icon: '⚡', title: t('service.why1Title'), body: t('service.why1Body') },
    { icon: '🏆', title: t('service.why2Title'), body: t('service.why2Body') },
    { icon: '💰', title: t('service.why3Title'), body: t('service.why3Body') },
    { icon: '🕐', title: t('service.why4Title'), body: t('service.why4Body') },
    { icon: '👷', title: t('service.why5Title'), body: t('service.why5Body') },
    { icon: '📱', title: t('service.why6Title'), body: t('service.why6Body') },
  ];

  const LOCATIONS = [
    { label: 'Dubai Marina',   href: '/car-recovery-dubai-marina' },
    { label: 'JVC',            href: '/car-recovery-jvc' },
    { label: 'Business Bay',   href: '/car-recovery-business-bay' },
    { label: 'Deira',          href: '/car-recovery-deira' },
    { label: 'Al Quoz',        href: '/car-recovery-al-quoz' },
    { label: 'Jumeirah',       href: '/car-recovery-jumeirah' },
    { label: 'Downtown Dubai', href: '/car-recovery-downtown-dubai' },
    { label: 'Al Barsha',      href: '/car-recovery-al-barsha' },
    { label: 'Mirdif',         href: '/car-recovery-mirdif' },
  ];

  const FEATS = [
    { icon: '⚡', label: t('service.feat1') },
    { icon: '👷', label: t('service.feat2') },
    { icon: '📍', label: t('service.feat3') },
    { icon: '💰', label: t('service.feat4') },
    { icon: '🏆', label: t('service.feat5') },
    { icon: '📱', label: t('service.feat6') },
  ];

  return (
    <div className="svc-page-root" dir={isRTL ? 'rtl' : 'ltr'}>
      {!isSection && (
        <Helmet>
          <title>{t('meta.service.title')}</title>
          <meta name="description" content={t('meta.service.description')} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.tareeqk.ae/service" />
        </Helmet>
      )}

      <ServicesPageSchema />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — cinematic, overlay-heavy (Annex pattern: right-aligned content)
      ══════════════════════════════════════════════════════════════════ */}
      {!isSection && (
        <section
          className="svc-hero-section"
          style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '480px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Background image */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'url("new/Recovery_Van.webp")',
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Dark overlay — directional based on direction */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: isRTL
                ? `linear-gradient(100deg,rgba(10,10,10,0.25) 0%,rgba(10,10,10,0.70) 55%,rgba(10,10,10,0.92) 100%),
                   linear-gradient(0deg,rgba(10,10,10,0.60) 0%,transparent 50%)`
                : `linear-gradient(260deg,rgba(10,10,10,0.92) 0%,rgba(10,10,10,0.70) 45%,rgba(10,10,10,0.25) 100%),
                   linear-gradient(0deg,rgba(10,10,10,0.60) 0%,transparent 50%)`,
            }}
          />

          {/* Gold accent line — bottom-right (or bottom-left in RTL) */}
          <div
            style={{
              position: 'absolute', bottom: 0,
              right: isRTL ? 'auto' : 0,
              left: isRTL ? 0 : 'auto',
              width: '32%', height: '3px', zIndex: 2,
              background: isRTL
                ? 'linear-gradient(90deg, var(--primary-yellow), transparent)'
                : 'linear-gradient(270deg, var(--primary-yellow), transparent)',
            }}
          />

          {/* Content — aligned to the dark side */}
          <div
            className="svc-inner"
            style={{
              ...inner,
              position: 'relative', zIndex: 3,
              paddingTop: '80px', paddingBottom: '80px',
              display: 'flex',
              justifyContent: isRTL ? 'flex-start' : 'flex-end',
            }}
          >
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <span className="svc-reveal svc-fade" data-delay="0" style={eyebrow}>
                {t('service.heroTag')}
              </span>

              <HeadingTag
                className="svc-reveal"
                data-delay="80"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.04,
                  margin: '0 0 20px',
                }}
              >
                {t('service.heroTitle')}{' '}
                <span
                  style={{
                    color: 'var(--primary-yellow)',
                    display: 'block',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    fontSize: '1.06em',
                  }}
                >
                  {t('service.heroHighlight')}
                </span>
              </HeadingTag>

              <p
                className="svc-reveal"
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
                {t('service.heroSubtitle')}
              </p>

              <div
                className="svc-reveal"
                data-delay="240"
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '44px' }}
              >
                <button
                  onClick={scrollToDownload}
                  className="svc-btn-primary getTow-btn"
                  style={{
                    background: 'var(--primary-yellow)',
                    color: '#000',
                    padding: '13px 30px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '14px',
                    letterSpacing: '0.01em',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {t('service.heroCta')}
                </button>
                <a
                  href="https://wa.me/97180082773375"
                  target="_blank"
                  rel="noreferrer"
                  className="svc-btn-ghost"
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
                  {t('service.heroWhatsapp')}
                </a>
              </div>

              {/* Hero stat strip */}
              <div
                className="svc-reveal svc-hero-stats"
                data-delay="320"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0',
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  paddingTop: '22px',
                }}
              >
                {[
                  { stat: '20 min', label: t('service.statAvgResponse') },
                  { stat: '5',      label: t('service.statServices') },
                  { stat: '4.9★',  label: t('service.statReviews') },
                  { stat: 'RTA',    label: t('service.statLicensed') },
                ].map((m, i, arr) => (
                  <div
                    key={i}
                    style={{
                      paddingInlineEnd: '26px',
                      marginInlineEnd: '26px',
                      borderInlineEnd: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.10)' : 'none',
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
          INTRO — Annex "Who we are" two-column (pill label + stat row)
      ══════════════════════════════════════════════════════════════════ */}
      {!isSection && (
        <section
          className="svc-intro-section"
          style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: '#fff' }}
        >
          <div className="svc-inner" style={inner}>
            <div
              className="svc-intro-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '80px',
                alignItems: 'start',
              }}
            >
              {/* Left column */}
              <div style={{ order: isRTL ? 2 : 1 }}>
                {/* Annex-style "Who we are" pill */}
                <div className="svc-reveal svc-fade" data-delay="0">
                  <span className="svc-pill-label">
                    <span className="svc-pill-dot" />
                    {t('service.whoWeAreTag')}
                  </span>
                </div>

                <h2
                  className="svc-h2 svc-reveal svc-left"
                  data-delay="70"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.6rem)',
                    fontWeight: 800,
                    color: 'var(--primary-dark-bg)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    marginBottom: '20px',
                    marginTop: '6px',
                  }}
                >
                  {t('service.whoWeAreTitle')}
                </h2>
                <p
                  className="svc-body-text svc-reveal"
                  data-delay="150"
                  style={{ color: '#555', fontSize: '15px', lineHeight: 1.78, marginBottom: '20px' }}
                >
                  {t('service.whoWeAreP1').split('roadside assistance in Dubai').map((part, i, arr) =>
                    i < arr.length - 1
                      ? <React.Fragment key={i}>{part}<span style={{ color: 'var(--primary-yellow)', fontWeight: 700 }}>roadside assistance in Dubai</span></React.Fragment>
                      : part
                  )}
                </p>
                <p
                  className="svc-body-text svc-reveal"
                  data-delay="220"
                  style={{ color: '#777', fontSize: '14.5px', lineHeight: 1.75 }}
                >
                  {t('service.whoWeAreP2')}
                </p>

                {/* Inline stat row (Annex style) */}
                <div className="svc-stat-bar svc-reveal" data-delay="300">
                  {[
                    { n: '2019', l: t('about.statFounded') },
                    { n: '50K+', l: t('about.statRescues') },
                    { n: '4.9★', l: t('about.statRating') },
                  ].map((s, i) => (
                    <div key={i} className="svc-stat-item">
                      <div className="svc-stat-num">{s.n}</div>
                      <div className="svc-stat-label">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column — feature checklist + mini CTA */}
              <div style={{ paddingTop: '8px', order: isRTL ? 1 : 2 }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '28px',
                  }}
                >
                  {FEATS.map((feat, i) => (
                    <div
                      key={i}
                      className="svc-reveal svc-feat-item"
                      data-delay={`${120 + i * 55}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(0,0,0,0.06)',
                        background: '#fafafa',
                      }}
                    >
                      <span style={{ fontSize: '18px', flexShrink: 0 }}>{feat.icon}</span>
                      <span
                        className="svc-feat-label"
                        style={{ fontSize: '13px', fontWeight: 600, color: '#222', lineHeight: 1.3 }}
                      >
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini CTA card */}
                <div
                  className="svc-reveal svc-right"
                  data-delay="480"
                  style={{
                    background: 'var(--primary-dark-bg)',
                    borderRadius: '14px',
                    padding: '22px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ fontSize: '32px', flexShrink: 0 }}>🚗</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '6px' }}>
                      {t('service.needHelp')}
                    </div>
                    <button
                      onClick={scrollToDownload}
                      style={{
                        background: 'var(--primary-yellow)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 18px',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {t('service.downloadApp')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SERVICE CARDS — Annex-style card grid with top-bar accent
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-cards-section"
        style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: 'var(--secondary-light-gray)' }}
      >
        <div className="svc-inner" style={inner}>
          {/* Section header */}
          <div className="svc-reveal" style={{ marginBottom: '56px' }}>
            <span style={eyebrow}>{t('service.whatWeOfferTag')}</span>
            <h2
              className="svc-h2"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--primary-dark-bg)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                maxWidth: '480px',
              }}
            >
              {t('service.whatWeOfferTitle')}{' '}
              <span style={{ color: 'var(--primary-yellow)' }}>{t('service.whatWeOfferHighlight')}</span>
            </h2>
          </div>

          <div
            className="svc-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {SERVICES.map((svc, i) => (
              <a
                key={i}
                href={svc.href}
                className="svc-reveal svc-card"
                data-delay={i * 75}
              >
                {/* Annex-style top accent bar */}
                <div className="svc-card-top-bar" />

                <div style={{ padding: '24px 28px 28px' }}>
                  {/* Tag badge */}
                  {svc.tag && (
                    <div style={{ marginBottom: '14px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '10px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          background: svc.tagBg,
                          color: svc.tagColor,
                        }}
                      >
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: svc.tagColor, display: 'inline-block' }} />
                        {svc.tag}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="svc-card-icon"
                    style={{
                      width: '48px', height: '48px',
                      borderRadius: '12px',
                      background: '#fef9ec',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      marginBottom: '16px',
                      transition: 'background 0.25s ease',
                    }}
                  >
                    {svc.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className="svc-card-title"
                    style={{ fontWeight: 700, fontSize: '15px', color: '#111', marginBottom: '10px', letterSpacing: '-0.01em', lineHeight: 1.3 }}
                  >
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="svc-card-body"
                    style={{ color: '#6b6b6b', lineHeight: 1.7, fontSize: '13.5px', marginBottom: '18px' }}
                  >
                    {svc.desc}
                  </p>

                  {/* Bullets */}
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {svc.bullets.map((b, j) => (
                      <li
                        key={j}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px' }}
                      >
                        <span
                          style={{
                            width: '14px', height: '14px', borderRadius: '50%',
                            background: 'rgba(247,178,5,0.12)',
                            display: 'inline-flex', alignItems: 'center',
                            justifyContent: 'center', fontSize: '8px',
                            color: 'var(--primary-yellow)', flexShrink: 0, marginTop: '1px',
                          }}
                        >
                          ✓
                        </span>
                        <span className="svc-bullet-text" style={{ color: '#888' }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Read more link */}
                  <div
                    style={{
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(0,0,0,0.05)',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: 'var(--primary-yellow)',
                      letterSpacing: '0.02em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {t('service.learnMore')}
                    <span>{isRTL ? ' ←' : ' →'}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS — dark section with step rows
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-steps-section"
        style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: 'var(--primary-dark-bg)' }}
      >
        <div className="svc-inner" style={inner}>
          {/* Header */}
          <div
            className="svc-reveal svc-steps-header"
            style={{
              marginBottom: '64px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <span style={eyebrow}>{t('service.stepsTag')}</span>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  maxWidth: '420px',
                }}
              >
                {t('service.stepsTitle')}{' '}
                <span className="svc-gold-glow" style={{ color: 'var(--primary-yellow)' }}>
                  {t('service.stepsHighlight')}
                </span>
              </h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, maxWidth: '340px' }}>
              {t('service.stepsSubtitle')}
            </p>
          </div>

          {/* Step rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {HOW_STEPS.map((step, i) => (
              <div
                key={i}
                className="svc-reveal svc-step-row"
                data-delay={i * 90}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '72px 1fr',
                  gap: '28px',
                  alignItems: 'start',
                  padding: '28px 24px',
                  borderBottom: i < HOW_STEPS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {/* Number + icon */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '48px', height: '48px',
                      borderRadius: '12px',
                      background: 'rgba(247,178,5,0.10)',
                      border: '1px solid rgba(247,178,5,0.20)',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '20px',
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '11px', fontWeight: 700,
                      letterSpacing: '0.10em', color: 'rgba(255,255,255,0.22)',
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div style={{ paddingTop: '8px' }}>
                  <h3
                    className="svc-step-title"
                    style={{ fontWeight: 700, fontSize: '16px', color: '#fff', letterSpacing: '-0.01em', marginBottom: '8px' }}
                  >
                    {step.title}
                  </h3>
                  <p className="svc-step-body" style={{ color: 'rgba(255,255,255,0.48)', fontSize: '14px', lineHeight: 1.72 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHY TAREEQK — light muted section, 3-col grid
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-why-section"
        style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: '#fff' }}
      >
        <div className="svc-inner" style={inner}>
          <div className="svc-reveal" style={{ marginBottom: '56px' }}>
            <span style={eyebrow}>{t('service.whyTag')}</span>
            <h2
              className="svc-h2"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--primary-dark-bg)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                maxWidth: '460px',
              }}
            >
              {t('service.whyTitle')}
            </h2>
          </div>

          <div
            className="svc-why-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
          >
            {WHY_POINTS.map((point, i) => (
              <div
                key={i}
                className="svc-reveal svc-why-card"
                data-delay={i * 65}
                style={{
                  padding: '28px',
                  borderRadius: '14px',
                  background: 'var(--secondary-light-gray)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div
                  className="svc-why-icon"
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
                  {point.icon}
                </div>
                <h3 className="svc-why-title" style={{ fontWeight: 700, fontSize: '15px', color: '#111', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {point.title}
                </h3>
                <p className="svc-why-body" style={{ color: '#6b6b6b', lineHeight: 1.7, fontSize: '13.5px' }}>
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          COVERAGE — dark section with location pills + CTA card
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{ padding: '96px 0', overflow: 'hidden', backgroundColor: 'var(--primary-dark-bg)' }}
      >
        <div className="svc-inner" style={inner}>
          <div
            className="svc-coverage-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 0.72fr',
              gap: '80px',
              alignItems: 'start',
            }}
          >
            {/* Left — heading + location pills */}
            <div className="svc-reveal svc-left" style={{ order: isRTL ? 2 : 1 }}>
              <span style={eyebrow}>{t('service.coverageTag')}</span>
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
                {t('service.coverageTitle')}{' '}
                <span style={{ color: 'var(--primary-yellow)' }}>{t('service.coverageHighlight')}</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, fontSize: '15px', marginBottom: '36px' }}>
                {t('service.coverageSubtitle')}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {LOCATIONS.map((loc, i) => (
                  <a
                    key={i}
                    href={loc.href}
                    className="svc-loc-pill"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.65)',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      fontSize: '12.5px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {loc.label}
                  </a>
                ))}
                <a
                  href="/contact"
                  className="svc-loc-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid rgba(247,178,5,0.30)',
                    color: 'var(--primary-yellow)',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: 'rgba(247,178,5,0.06)',
                  }}
                >
                  {t('service.coverageNotListed')} {isRTL ? '←' : '→'}
                </a>
              </div>
            </div>

            {/* Right — yellow CTA card */}
            <div className="svc-reveal svc-right" style={{ order: isRTL ? 1 : 2 }}>
              <div
                style={{
                  background: 'var(--primary-yellow)',
                  borderRadius: '18px',
                  padding: '36px 30px',
                  color: '#000',
                }}
              >
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.55, marginBottom: '10px' }}>
                  {t('service.emergencyTag')}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  {t('service.emergencyTitle')}
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: 1.7, opacity: 0.75, marginBottom: '24px', fontWeight: 400 }}>
                  {t('service.emergencySubtitle')}
                </p>
                <a
                  href="tel:+97180082773375"
                  style={{
                    display: 'block', padding: '14px',
                    background: '#000', color: '#fff',
                    textAlign: 'center', borderRadius: '9px',
                    fontWeight: 700, textDecoration: 'none',
                    fontSize: '14px', marginBottom: '8px',
                  }}
                >
                  {t('service.callBtn')}
                </a>
                <a
                  href="https://wa.me/97180082773375"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'block', padding: '12px',
                    background: 'rgba(0,0,0,0.10)', color: '#000',
                    textAlign: 'center', borderRadius: '9px',
                    fontWeight: 600, textDecoration: 'none',
                    fontSize: '13.5px', border: '1px solid rgba(0,0,0,0.10)',
                  }}
                >
                  💬 {t('service.whatsappBtn')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — bottom banner (dark + gold glow)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-cta-section"
        style={{ padding: '96px 0', backgroundColor: '#fff' }}
      >
        <div className="svc-inner" style={inner}>
          <div
            className="svc-reveal svc-scale"
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
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 110%, rgba(247,178,5,0.2) 0%, transparent 70%)' }} />
            {/* Grid texture */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
            {/* Watermark */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(60px, 12vw, 150px)', fontWeight: 800, color: 'rgba(255,255,255,0.022)', letterSpacing: '-0.05em', userSelect: 'none' }}>
              TAREEQK
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ ...eyebrow, display: 'block', textAlign: 'center', marginBottom: '14px' }}>
                {t('service.ctaTag')}
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
                {t('service.ctaTitle')}{' '}
                <span className="svc-gold-glow" style={{ color: 'var(--primary-yellow)' }}>
                  {t('service.ctaHighlight')}
                </span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                {t('service.ctaSubtitle')}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                  💬 {t('service.whatsappCta')}
                </a>
                <button
                  onClick={scrollToDownload}
                  className="svc-btn-ghost"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    color: '#fff',
                    padding: '15px 38px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  📱 {t('service.downloadCta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}