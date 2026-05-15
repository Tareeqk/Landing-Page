// pages/About.jsx
// Redesigned: refined typography, custom IntersectionObserver scroll animations, unique layout

import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation, Trans } from 'react-i18next';
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
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2048",
      "longitude": "55.2708"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": { "@type": "City", "name": "Dubai" },
    "sameAs": [
      "https://www.instagram.com/tareeqk",
      "https://www.facebook.com/tareeqk"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Roadside Assistance Services Dubai",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Car Recovery Dubai" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Towing Service Dubai" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Battery Boost Dubai" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flat Tyre Repair Dubai" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fuel Delivery Dubai" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Accident Recovery Dubai" } },
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Scroll Animation Hook ──────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
     
      .trq-reveal {
        opacity: 0;
        transform: translateY(32px);
        transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .trq-reveal.trq-reveal--left {
        transform: translateX(-32px);
      }
      .trq-reveal.trq-reveal--right {
        transform: translateX(32px);
      }
      .trq-reveal.trq-reveal--scale {
        transform: scale(0.94) translateY(16px);
      }
      .trq-reveal.is-visible {
        opacity: 1;
        transform: none;
      }
      .trq-card-hover {
        transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .trq-card-hover:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 48px rgba(251,191,36,0.13) !important;
        border-color: #fbbf24 !important;
      }
      .trq-pill-hover {
        transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
      }
      .trq-pill-hover:hover {
        background: #fbbf24 !important;
        color: #000 !important;
        transform: translateY(-1px);
      }
      .trq-link-hover {
        transition: color 0.18s ease;
      }
      .trq-link-hover:hover { color: #fbbf24 !important; }
      .trq-btn-primary {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .trq-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(251,191,36,0.35);
      }
      .trq-timeline-dot {
        transition: transform 0.3s ease, background 0.3s ease;
      }
      .trq-timeline-item:hover .trq-timeline-dot {
        transform: scale(1.4);
        background: #fbbf24 !important;
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => {
              el.classList.add('is-visible');
            }, parseInt(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll('.trq-reveal');
    targets.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);
}

// ── Data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  { label: 'Car Recovery Dubai', href: '/car-recovery-dubai', icon: '🚗' },
  { label: 'Battery Service Dubai', href: '/battery-service-dubai', icon: '🔋' },
  { label: 'Flat Tyre Repair Dubai', href: '/flat-tyre-repair-dubai', icon: '🔧' },
  { label: 'Fuel Delivery Dubai', href: '/fuel-delivery-dubai', icon: '⛽' },
  { label: 'Accident Recovery Dubai', href: '/accident-recovery-dubai', icon: '🚨' },
  { label: 'Towing Service Dubai', href: '/towing-service-dubai', icon: '🚛' },
];

const LOCATIONS = [
  { label: 'Dubai Marina', href: '/car-recovery-dubai-marina' },
  { label: 'JVC', href: '/car-recovery-jvc' },
  { label: 'Business Bay', href: '/car-recovery-business-bay' },
  { label: 'Deira', href: '/car-recovery-deira' },
  { label: 'Al Quoz', href: '/car-recovery-al-quoz' },
  { label: 'Jumeirah', href: '/car-recovery-jumeirah' },
  { label: 'Downtown Dubai', href: '/car-recovery-downtown-dubai' },
  { label: 'Al Barsha', href: '/car-recovery-al-barsha' },
  { label: 'Mirdif', href: '/car-recovery-mirdif' },
];

const VALUES = [
  {
    icon: '⚡',
    title: 'Speed Without Compromise',
    body: 'Our average dispatch time is 20 minutes across all Dubai districts. Real-time fleet positioning ensures you never wait longer than necessary.',
  },
  {
    icon: '🏆',
    title: 'RTA-Licensed & Insured',
    body: 'Every Tareeqk operator holds a Roads and Transport Authority (RTA) of Dubai licence. Fully insured operations, zero shortcuts, total accountability.',
  },
  {
    icon: '💡',
    title: 'Transparent Pricing',
    body: 'The full price is shown before you confirm — always. No hidden fees, no post-service surprises. The Tareeqk app shows every cost upfront.',
  },
  {
    icon: '🤝',
    title: 'Certified Technicians',
    body: 'Every team member is trained, certified, and background-checked. Whether a simple jump start or a complex highway recovery, our people are ready.',
  },
  {
    icon: '📱',
    title: 'Live Technician Tracking',
    body: 'Watch your technician travel to you in real-time on the Tareeqk app. Exact ETA, live GPS position — no more anxious waiting by the roadside.',
  },
  {
    icon: '🌙',
    title: 'Operational Every Hour',
    body: 'We run 24 hours, 365 days — including all UAE public holidays, Ramadan nights, and National Day. Breakdowns don\'t keep office hours, and neither do we.',
  },
];

const MILESTONES = [
  { year: '2019', label: 'Founded in Dubai', detail: 'Launched with 5 recovery units covering central Dubai' },
  { year: '2020', label: 'Mobile App Launch', detail: 'Real-time booking and GPS tracking introduced' },
  { year: '2022', label: 'RTA Licence Granted', detail: 'Officially licensed by the Roads & Transport Authority' },
  { year: '2023', label: 'Fleet Expansion', detail: 'Grew to 30+ units covering all Dubai districts' },
  { year: '2024', label: '1,200+ 5-Star Reviews', detail: 'Rated 4.9 stars across Google and the app' },
];

const TEAM_VALUES = [
  { num: '30+', label: 'Recovery Units', sub: 'Positioned across Dubai' },
  { num: '4.9★', label: 'Customer Rating', sub: '1,200+ verified reviews' },
  { num: '20min', label: 'Avg. Response', sub: 'Across all Dubai areas' },
  { num: '24/7', label: 'Availability', sub: 'Every day, every hour' },
];

// ── Styles ─────────────────────────────────────────────────────────────────
const s = {
  eyebrow: {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '4px',
    textTransform: 'uppercase',
    color: '#fbbf24',
    marginBottom: '12px',
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
  },
  h1: {
    fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    fontFamily: "'Outfit', sans-serif",
  },
  h2: {
    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
    fontWeight: 700,
    color: '#111',
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
    fontFamily: "'Outfit', sans-serif",
  },
  p: {
    color: '#6b7280',
    lineHeight: 1.75,
    fontSize: '14.5px',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 400,
  },
  inner: { maxWidth: '1140px', margin: '0 auto', padding: '0 24px' },
  section: { padding: '72px 0' },
};

// ── Component ──────────────────────────────────────────────────────────────
export default function About({ isSection = false }) {
  const { t, i18n } = useTranslation();
  const HeadingTag = isSection ? 'h2' : 'h1';
  useScrollReveal();

  return (
    <>
      {!isSection && (
        <Helmet>
          <title>About Tareeqk – Dubai's 24/7 Car Recovery & Roadside Assistance</title>
          <meta name="description" content="Learn about Tareeqk — Dubai's RTA-licensed 24/7 car recovery and roadside assistance company. Fast 20-minute response across all Dubai areas." />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.tareeqk.ae/about" />
          <meta property="og:title" content="About Tareeqk – Dubai's 24/7 Car Recovery" />
          <meta property="og:description" content="Dubai's RTA-licensed car recovery and roadside assistance. 20-minute response, 4.9 star rating, 1,200+ reviews." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.tareeqk.ae/about" />
          <meta property="og:image" content="https://www.tareeqk.ae/new/Recovery_Van.webp" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Crimson+Pro:ital,wght@0,300;1,300&display=swap" rel="stylesheet" />
        </Helmet>
      )}

      <LocalBusinessSchema />

      <div style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ── HERO ── */}
        {!isSection && (
          <section style={{
            background: '#0a0a0a',
            backgroundImage: `
              radial-gradient(ellipse at 25% 60%, rgba(251,191,36,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 85% 20%, rgba(251,191,36,0.04) 0%, transparent 45%)
            `,
            padding: '96px 24px 80px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle grid */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
            }} />
            {/* Large ghost text */}
            <div style={{
              position: 'absolute', right: '-30px', bottom: '-20px',
              fontSize: 'clamp(100px, 18vw, 240px)', fontWeight: 900,
              color: 'rgba(251,191,36,0.03)', lineHeight: 1,
              userSelect: 'none', letterSpacing: '-0.05em', zIndex: 0,
              fontFamily: "'Outfit', sans-serif",
            }}>TAREEQK</div>

            <div style={{ ...s.inner, position: 'relative', zIndex: 1 }}>
              <div style={{ maxWidth: '660px' }}>
                <span
                  className="trq-reveal"
                  data-delay="0"
                  style={{ ...s.eyebrow }}
                >
                  About Us
                </span>
                <HeadingTag
                  className="trq-reveal"
                  data-delay="80"
                  style={s.h1}
                >
                  Dubai's 24/7{' '}
                  <em style={{
                    fontStyle: 'normal',
                    color: '#fbbf24',
                    fontFamily: "'Crimson Pro', serif",
                    fontWeight: 300,
                    fontSize: '1.08em',
                  }}>
                    Roadside Rescue
                  </em>
                </HeadingTag>
                <p
                  className="trq-reveal"
                  data-delay="160"
                  style={{ ...s.p, color: '#9ca3af', marginTop: '20px', fontSize: '15.5px', maxWidth: '520px', lineHeight: 1.7 }}
                >
                  {t('about.subtitle') || "Tareeqk is Dubai's most trusted car recovery and roadside assistance company — RTA-licensed, always on call, and committed to reaching you in 20 minutes or less, anywhere in the city."}
                </p>
                <div
                  className="trq-reveal"
                  data-delay="240"
                  style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                >
                  <a
                    href="tel:+97180082773375"
                    className="trq-btn-primary"
                    style={{
                      background: '#fbbf24', color: '#000',
                      padding: '13px 28px', borderRadius: '8px',
                      fontSize: '14px', fontWeight: 700,
                      textDecoration: 'none', display: 'inline-flex',
                      alignItems: 'center', gap: '8px',
                    }}
                  >
                    📞 Call Now
                  </a>
                  <a
                    href="/contact"
                    style={{
                      background: 'transparent', color: '#fff',
                      border: '1.5px solid rgba(255,255,255,0.25)',
                      padding: '13px 28px', borderRadius: '8px',
                      fontSize: '14px', fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'border-color 0.2s ease, color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.color = '#fbbf24'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
                  >
                    Contact Us →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── TRUST BAR ── */}
        <div style={{
          background: '#fbbf24',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0',
        }}>
          {[
            '⚡ 20-Min Response',
            '🕐 24/7 Available',
            '⭐ 4.9 · 1,200+ Reviews',
            '🏆 RTA Licensed',
          ].map((item, i, arr) => (
            <span key={i} style={{
              padding: '4px 20px',
              borderRight: i < arr.length - 1 ? '1.5px solid rgba(0,0,0,0.15)' : 'none',
              fontWeight: 700,
              fontSize: '12px',
              color: '#000',
              letterSpacing: '0.02em',
              fontFamily: "'Outfit', sans-serif",
            }}>
              {item}
            </span>
          ))}
        </div>

        {/* ── OUR STORY ── */}
        <section style={{ ...s.section, background: '#fff' }}>
          <div style={s.inner}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '64px',
              alignItems: 'center',
            }}>
              <div
                className="trq-reveal trq-reveal--left"
                data-delay="0"
              >
                <span style={s.eyebrow}>Our Story</span>
                <HeadingTag style={{ ...s.h2, marginBottom: '18px' }}>
                  {t('about.title') || 'Born on the roads of Dubai'}
                </HeadingTag>
                <p style={{ ...s.p, marginBottom: '14px' }}>
                  <Trans
                    i18nKey="about.subtitle1"
                    components={{ 1: <a href="/service" style={{ color: '#fbbf24', fontWeight: 600 }} /> }}
                  />
                </p>
                <p style={{ ...s.p, marginBottom: '14px' }}>
                  {t('about.subtitle2') || "What started as a small fleet of recovery trucks in 2019 has grown into Dubai's most responsive roadside assistance network — covering every district, every hour, with technology-backed dispatch and RTA-licensed professionals."}
                </p>
                <p style={s.p}>
                  {t('about.subtitle3') || "We built Tareeqk because we saw how stressful a breakdown could be — especially in Dubai's heat. Our mission is simple: get to you faster than anyone else, fix the problem cleanly, and get you back on your way."}
                </p>

                <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {[
                    t('about.item1') || 'RTA-licensed operators',
                    t('about.item2') || '20-minute average response',
                    t('about.item3') || 'Full coverage across all Dubai districts',
                    t('about.item4') || 'Transparent, app-based pricing',
                    t('about.item5') || 'Live GPS tracking to your vehicle',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: '#fbbf24', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0,
                        fontSize: '10px', fontWeight: 800, color: '#000',
                      }}>✓</span>
                      <span style={{ fontWeight: 500, color: '#374151', fontSize: '14px' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image + milestones */}
              <div
                className="trq-reveal trq-reveal--right"
                data-delay="100"
              >
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
                  <img
                    src="new/Recovery_Van.webp"
                    alt="Tareeqk car recovery van in Dubai"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute', bottom: '16px', left: '16px', right: '16px',
                    background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)',
                    borderRadius: '10px', padding: '14px 18px',
                    display: 'flex', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '10px',
                  }}>
                    {MILESTONES.slice(0, 4).map((m, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#fbbf24', letterSpacing: '-0.01em' }}>{m.year}</div>
                        <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 500, marginTop: '2px' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COUNTERS ── */}
        <section style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
          <div style={s.inner}>
            <Counters />
          </div>
        </section>

    

        {/* ── OUR VALUES ── */}
        <section style={{ ...s.section, background: '#fff' }}>
          <div style={s.inner}>
            <div
              className="trq-reveal"
              data-delay="0"
              style={{ marginBottom: '44px', maxWidth: '540px' }}
            >
              <span style={s.eyebrow}>Our Values</span>
              <h2 style={s.h2}>{t('about2.title') || 'What sets Tareeqk apart'}</h2>
              <p style={{ ...s.p, marginTop: '10px' }}>
                {t('about2.subtitle') || 'Every decision we make comes back to one goal: getting you back on the road, safely and fast.'}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className="trq-reveal trq-card-hover"
                  data-delay={`${i * 90}`}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    border: '1.5px solid #f0f0f0',
                    padding: '24px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: '#fffbeb', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', marginBottom: '14px',
                  }}>
                    {v.icon}
                  </div>
                  <h3 style={{
                    fontWeight: 700, fontSize: '14.5px', color: '#111',
                    marginBottom: '8px', letterSpacing: '-0.01em',
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {v.title}
                  </h3>
                  <p style={{ ...s.p, fontSize: '13.5px' }}>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY TRUST US – STAT ROW ── */}
        <section style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0', padding: '48px 0' }}>
          <div style={s.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: '#e5e7eb', borderRadius: '14px', overflow: 'hidden' }}>
              {TEAM_VALUES.map((tv, i) => (
                <div
                  key={i}
                  className="trq-reveal trq-reveal--scale"
                  data-delay={`${i * 80}`}
                  style={{ background: '#fff', padding: '28px 20px', textAlign: 'center' }}
                >
                  <div style={{
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800,
                    color: '#111', letterSpacing: '-0.04em',
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {tv.num}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#374151', marginTop: '4px' }}>{tv.label}</div>
                  <div style={{ fontSize: '11.5px', color: '#9ca3af', marginTop: '3px' }}>{tv.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES + LOCATIONS ── */}
        <section style={{ ...s.section, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={s.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
              {/* Services */}
              <div
                className="trq-reveal trq-reveal--left"
                data-delay="0"
              >
                <span style={s.eyebrow}>Our Services</span>
                <h2 style={{ ...s.h2, fontSize: '1.3rem', marginBottom: '20px' }}>
                  Roadside Assistance in Dubai
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {SERVICES.map(svc => (
                    <a
                      key={svc.href}
                      href={svc.href}
                      className="trq-card-hover"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '9px',
                        background: '#fafafa', border: '1.5px solid #f0f0f0',
                        borderRadius: '10px', padding: '12px 14px',
                        textDecoration: 'none', color: '#111',
                        fontWeight: 600, fontSize: '12.5px',
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{svc.icon}</span>
                      <span>{svc.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div
                className="trq-reveal trq-reveal--right"
                data-delay="120"
              >
                <span style={s.eyebrow}>Service Areas</span>
                <h2 style={{ ...s.h2, fontSize: '1.3rem', marginBottom: '20px' }}>
                  Areas We Cover in Dubai
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {LOCATIONS.map(loc => (
                    <a
                      key={loc.href}
                      href={loc.href}
                      className="trq-pill-hover"
                      style={{
                        display: 'inline-flex', alignItems: 'center',
                        border: '1.5px solid #e5e7eb', color: '#374151',
                        padding: '6px 14px', borderRadius: '100px',
                        fontSize: '12px', fontWeight: 600, textDecoration: 'none',
                      }}
                    >
                      {loc.label}
                    </a>
                  ))}
                </div>
                <div style={{
                  padding: '18px', background: '#fafafa',
                  borderRadius: '12px', border: '1.5px solid #f0f0f0',
                }}>
                  <p style={{ fontWeight: 700, fontSize: '13.5px', color: '#111', marginBottom: '6px' }}>
                    📍 Based in Dubai, UAE
                  </p>
                  <p style={{ ...s.p, fontSize: '13px' }}>
                    Operating across all Dubai districts 24 hours a day, 7 days a week — including all UAE public holidays and Ramadan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMITMENT SECTION ── */}
        <section style={{ ...s.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          <div style={s.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
              <div
                className="trq-reveal trq-reveal--left"
                data-delay="0"
              >
                <span style={s.eyebrow}>Our Commitment</span>
                <h2 style={{ ...s.h2, marginBottom: '16px' }}>Safety, speed, and honesty — every single call</h2>
                <p style={{ ...s.p, marginBottom: '14px' }}>
                  Dubai's roads demand reliability. Whether you're stranded on Sheikh Zayed Road at 2am or stuck in a JVC parking basement, our technicians arrive fully equipped and ready to resolve your situation on the first visit.
                </p>
                <p style={s.p}>
                  We hold ourselves to a simple standard: every customer interaction should feel professional, transparent, and reassuring. That's why every call is logged, every job is rated, and every operator is accountable to the service promise.
                </p>
              </div>
              <div
                className="trq-reveal trq-reveal--right"
                data-delay="150"
              >
                {[
                  { label: 'Response time guaranteed', icon: '⚡', detail: '20-minute average across all Dubai zones' },
                  { label: 'No hidden charges', icon: '💰', detail: 'Full price confirmed before dispatch' },
                  { label: 'Insured every job', icon: '🛡️', detail: 'Your vehicle is covered from pickup to drop-off' },
                  { label: 'Operator accountability', icon: '📋', detail: 'Every job logged, every rating reviewed' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="trq-reveal"
                    data-delay={`${i * 80 + 150}`}
                    style={{
                      display: 'flex', gap: '14px', padding: '14px 0',
                      borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: '#fffbeb', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '17px', flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#111', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontSize: '12.5px', color: '#6b7280' }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={s.section}>
          <div style={s.inner}>
            <div
              className="trq-reveal trq-reveal--scale"
              data-delay="0"
              style={{
                background: '#0a0a0a',
                borderRadius: '20px',
                padding: '64px 40px',
                textAlign: 'center',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `
                  radial-gradient(ellipse at 60% 0%, rgba(251,191,36,0.08) 0%, transparent 60%),
                  radial-gradient(ellipse at 10% 100%, rgba(251,191,36,0.04) 0%, transparent 50%)
                `,
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ ...s.eyebrow, textAlign: 'center', display: 'block' }}>Always Ready</span>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800,
                  marginBottom: '12px', letterSpacing: '-0.025em',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  Need help on the road?
                </h2>
                <p style={{ color: '#9ca3af', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px', fontSize: '14.5px', lineHeight: 1.7 }}>
                  Call, WhatsApp, or use the Tareeqk app. We reach you in 20 minutes, anywhere in Dubai.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href="tel:+97180082773375"
                    className="trq-btn-primary"
                    style={{
                      background: '#fbbf24', color: '#000',
                      padding: '12px 28px', borderRadius: '8px',
                      fontSize: '14px', fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    📞 Call Now
                  </a>
                  <a
                    href="https://wa.me/97180082773375"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#25D366', color: '#fff',
                      padding: '12px 28px', borderRadius: '8px',
                      fontSize: '14px', fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href="/contact"
                    style={{
                      background: 'transparent', color: '#fff',
                      border: '1.5px solid rgba(255,255,255,0.25)',
                      padding: '12px 28px', borderRadius: '8px',
                      fontSize: '14px', fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fbbf24'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                  >
                    Contact Us →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}