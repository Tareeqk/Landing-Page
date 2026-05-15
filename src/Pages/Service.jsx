// pages/Service.jsx
// Redesigned: refined typography, custom IntersectionObserver scroll animations, unique layout

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// ── Service Schema ─────────────────────────────────────────────────────────
function ServicesPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Tareeqk Roadside Assistance Services Dubai",
    "description": "24/7 roadside assistance services in Dubai including car recovery, towing, battery boost, flat tyre repair, fuel delivery, and accident recovery.",
    "url": "https://www.tareeqk.ae/service",
    "numberOfItems": 6,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "Service", "name": "Car Recovery Dubai", "url": "https://www.tareeqk.ae/car-recovery-dubai", "description": "24/7 car recovery and towing service in Dubai with 20-minute response time.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "Service", "name": "Battery Boost & Replacement Dubai", "url": "https://www.tareeqk.ae/battery-service-dubai", "description": "On-site car battery jump start and replacement across Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "Service", "name": "Flat Tyre Repair Dubai", "url": "https://www.tareeqk.ae/flat-tyre-repair-dubai", "description": "Mobile flat tyre repair and replacement at your location in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "Service", "name": "Fuel Delivery Dubai", "url": "https://www.tareeqk.ae/fuel-delivery-dubai", "description": "Emergency petrol delivery to your exact location in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "Service", "name": "Accident Recovery Dubai", "url": "https://www.tareeqk.ae/accident-recovery-dubai", "description": "Emergency accident recovery and towing for damaged vehicles in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 6, "item": { "@type": "Service", "name": "Towing Service Dubai", "url": "https://www.tareeqk.ae/towing-service-dubai", "description": "Professional vehicle towing service across all Dubai districts.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Request Roadside Assistance in Dubai",
    "description": "Step-by-step guide to booking Tareeqk car recovery and roadside assistance in Dubai.",
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

// ── Scroll Animation Hook ──────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'trq-svc-styles';
    style.textContent = `
     
      .trq-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1);
      }
      .trq-reveal.trq-reveal--left  { transform: translateX(-28px); }
      .trq-reveal.trq-reveal--right { transform: translateX(28px); }
      .trq-reveal.trq-reveal--scale { transform: scale(0.95) translateY(14px); }
      .trq-reveal.is-visible { opacity: 1; transform: none; }

      .trq-svc-card {
        transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease;
      }
      .trq-svc-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 48px rgba(251,191,36,0.12) !important;
        border-color: #fbbf24 !important;
      }
      .trq-why-card {
        transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
      }
      .trq-why-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(251,191,36,0.1) !important;
        border-color: #fbbf24 !important;
      }
      .trq-pill-hover {
        transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
      }
      .trq-pill-hover:hover { background: #fbbf24 !important; color: #000 !important; transform: translateY(-1px); }
      .trq-btn-yellow {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .trq-btn-yellow:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(251,191,36,0.35); }
      .trq-step-row { transition: background 0.2s ease; }
      .trq-step-row:hover { background: rgba(251,191,36,0.04); }
      .trq-area-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
      .trq-area-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.08); }
    `;
    if (!document.getElementById('trq-svc-styles')) {
      document.head.appendChild(style);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('is-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.trq-reveal').forEach(el => observer.observe(el));
    }, 50);

    return () => {
      observer.disconnect();
      const el = document.getElementById('trq-svc-styles');
      if (el) document.head.removeChild(el);
    };
  }, []);
}

// ── Data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: '🚗',
    title: 'Car Recovery Dubai',
    href: '/car-recovery-dubai',
    tag: 'Most Requested',
    tagColor: '#fbbf24',
    tagText: '#000',
    desc: 'Broken down anywhere in Dubai? Our flatbed and wheel-lift recovery trucks reach you in an average of 20 minutes, day or night. We handle everything from minor breakdowns to full vehicle extraction.',
    bullets: ['Flatbed & wheel-lift trucks', 'Transport to any address', 'Highway-capable recovery', '24/7 including holidays'],
  },
  {
    icon: '🚛',
    title: 'Towing Service Dubai',
    href: '/towing-service-dubai',
    tag: null,
    desc: 'Need your vehicle moved across Dubai — to a workshop, dealership, or any address? Our licensed towing fleet handles all vehicle types with full care and insurance documentation.',
    bullets: ['All vehicle sizes', 'Cross-Dubai transport', 'Insurance company drop-offs', 'Damage-free loading guarantee'],
  },
  {
    icon: '🔋',
    title: 'Battery Boost & Replacement',
    href: '/battery-service-dubai',
    tag: '#1 Breakdown Cause',
    tagColor: '#ef4444',
    tagText: '#fff',
    desc: "Dead battery in Dubai's intense heat? We test, jump-start, or replace your battery on the spot — no towing required. We carry OEM-compatible batteries for all major makes.",
    bullets: ['On-site battery diagnostics', 'OEM-compatible batteries', 'All makes & models', 'Warranty on replacement'],
  },
  {
    icon: '🔧',
    title: 'Flat Tyre Repair',
    href: '/flat-tyre-repair-dubai',
    tag: null,
    desc: "Flat tyre on a Dubai highway or in a parking structure? Our mobile technicians arrive with puncture repair kits and replacement tyres. Safe, fast, and fully equipped for any location.",
    bullets: ['Puncture repair on-site', 'Tyre swap available', 'Highway-safe service', 'Valve and rim inspection included'],
  },
  {
    icon: '⛽',
    title: 'Emergency Fuel Delivery',
    href: '/fuel-delivery-dubai',
    tag: null,
    desc: 'Run out of fuel anywhere in Dubai? We deliver petrol directly to you within 20 minutes — enough to reach the nearest station safely. Available for both Special 95 and Super 98.',
    bullets: ['Special 95 & Super 98', '5–10 litre emergency supply', 'All Dubai areas covered', 'No membership required'],
  },
  {
    icon: '🚨',
    title: 'Accident Recovery',
    href: '/accident-recovery-dubai',
    tag: '24/7 Emergency',
    tagColor: '#f97316',
    tagText: '#fff',
    desc: "Been in an accident? Stay safe and stay still — we handle the entire recovery. Heavy-duty flatbeds for non-driveable vehicles, coordination with Dubai Police, and direct delivery to approved workshops.",
    bullets: ['Non-driveable vehicle recovery', 'Dubai Police coordination', 'Insurance-approved garage drop-offs', 'Scene safety assessment'],
  },
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

const HOW_STEPS = [
  {
    num: '01',
    icon: '📱',
    title: 'Call, WhatsApp, or Open the App',
    body: 'Contact us via phone, WhatsApp, or the Tareeqk app. Share your live GPS pin so our dispatcher finds you instantly — no guesswork, no delays.',
  },
  {
    num: '02',
    icon: '💰',
    title: 'Receive an Upfront Price',
    body: 'The full price is shown and confirmed before we dispatch. No hidden fees, no revised invoices. What you see is what you pay — every time.',
  },
  {
    num: '03',
    icon: '🚛',
    title: 'We Dispatch Immediately',
    body: 'The nearest certified technician is on their way within minutes. Track their arrival live on the Tareeqk app. Our average on-scene time across Dubai is 20 minutes.',
  },
  {
    num: '04',
    icon: '✅',
    title: "You're Back on the Road",
    body: 'Vehicle recovered, tyre repaired, battery replaced, or fuel delivered — problem resolved cleanly and fast. You rate the job and we improve continuously.',
  },
];

const WHY_POINTS = [
  { icon: '⚡', title: '20-Min Average Response', body: 'We track every unit in real-time and dispatch the closest certified technician to your location.' },
  { icon: '🏆', title: 'RTA-Licensed Operators', body: "Every Tareeqk operator holds a valid Roads and Transport Authority licence — Dubai's highest standard." },
  { icon: '💰', title: 'Transparent Pricing', body: 'Full price confirmed before dispatch — in the app or on the call. Always. No surprises, no add-ons.' },
  { icon: '🕐', title: '24/7, No Exceptions', body: 'Every hour of every day, including UAE public holidays, Ramadan nights, and National Day.' },
  { icon: '👷', title: 'Certified Technicians', body: 'Trained, background-checked, and equipped for every scenario — from simple jump starts to highway vehicle extractions.' },
  { icon: '📱', title: 'Live GPS Tracking', body: 'Watch your technician approach in real-time on the Tareeqk app — exact ETA, no more guessing when help will arrive.' },
  { icon: '🛡️', title: 'Fully Insured Jobs', body: 'Your vehicle is covered from the moment our operator arrives. Every recovery is logged and accountable.' },
  { icon: '⭐', title: '4.9-Star Rated Service', body: 'Over 1,200 verified five-star reviews across Google and the Tareeqk app. Customer satisfaction drives every decision.' },
];

const AREA_ZONES = [
  { area: 'Marina & JBR', detail: 'Palm Jumeirah, Marina Walk', icon: '🏙️' },
  { area: 'Downtown & DIFC', detail: 'Burj Khalifa area, DIFC', icon: '🏢' },
  { area: 'Business Bay', detail: 'Bay Square, Executive Towers', icon: '💼' },
  { area: 'Deira & Al Nahda', detail: 'Airport area, Al Qusais', icon: '✈️' },
  { area: 'Al Quoz & Barsha', detail: 'Industrial & residential zones', icon: '🔧' },
  { area: 'JVC & Motor City', detail: 'Springs, Meadows, Lakes', icon: '🌿' },
];

// ── Styles ─────────────────────────────────────────────────────────────────
const s = {
  eyebrow: {
    fontSize: '10px', fontWeight: 700, letterSpacing: '4px',
    textTransform: 'uppercase', color: '#fbbf24',
    marginBottom: '12px', display: 'block',
    fontFamily: "'Outfit', sans-serif",
  },
  h1: {
    fontSize: 'clamp(1.85rem, 4vw, 3rem)', fontWeight: 800,
    letterSpacing: '-0.03em', lineHeight: 1.1,
    fontFamily: "'Outfit', sans-serif",
  },
  h2: {
    fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)', fontWeight: 700,
    color: '#111', letterSpacing: '-0.025em', marginBottom: '14px',
    lineHeight: 1.2, fontFamily: "'Outfit', sans-serif",
  },
  p: { color: '#6b7280', lineHeight: 1.75, fontSize: '14px', fontFamily: "'Outfit', sans-serif" },
  inner: { maxWidth: '1140px', margin: '0 auto', padding: '0 24px' },
  section: { padding: '72px 0' },
  linkPill: {
    display: 'inline-flex', alignItems: 'center',
    border: '1.5px solid #e5e7eb', color: '#374151',
    padding: '6px 14px', borderRadius: '100px',
    fontSize: '12px', fontWeight: 600, textDecoration: 'none',
  },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    background: '#fbbf24', color: '#000', textDecoration: 'none',
    padding: '12px 24px', borderRadius: '8px', fontSize: '13.5px',
    fontWeight: 700, cursor: 'pointer', border: 'none',
    fontFamily: "'Outfit', sans-serif",
  },
  btnGhost: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    background: 'transparent', color: '#fff', textDecoration: 'none',
    padding: '12px 24px', borderRadius: '8px', fontSize: '13.5px',
    fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.25)',
    cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
    transition: 'border-color 0.2s ease, color 0.2s ease',
  },
};

// ── Component ──────────────────────────────────────────────────────────────
export default function Service({ isSection = false }) {
  const { t } = useTranslation();
  const HeadingTag = isSection ? 'h2' : 'h1';
  const [activeService, setActiveService] = useState(null);
  useScrollReveal();

  const scrollToDownload = () => {
    const el = document.getElementById('download-buttons');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 200;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {!isSection && (
        <Helmet>
          <title>Tareeqk Services – Car Recovery, Towing & Roadside Assistance Dubai | 24/7</title>
          <meta name="description" content="Tareeqk offers 24/7 car recovery, towing, battery service, flat tyre repair, fuel delivery, and accident recovery across all Dubai areas. RTA-licensed, 20-minute response." />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.tareeqk.ae/service" />
          <meta property="og:title" content="Tareeqk Services – 24/7 Roadside Assistance Dubai" />
          <meta property="og:description" content="Car recovery, towing, battery, tyre, fuel delivery and accident recovery across Dubai. RTA-licensed, 20-minute average response." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.tareeqk.ae/service" />
          <meta property="og:image" content="https://www.tareeqk.ae/new/Recovery_Van.webp" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Crimson+Pro:ital,wght@0,300;1,300&display=swap" rel="stylesheet" />
        </Helmet>
      )}

      <ServicesPageSchema />

      <div style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        {!isSection && (
          <section style={{
            background: '#0a0a0a',
            backgroundImage: `
              radial-gradient(ellipse at 20% 50%, rgba(251,191,36,0.09) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 80%, rgba(251,191,36,0.04) 0%, transparent 50%)
            `,
            padding: '104px 24px 84px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }} />
            <div style={{
              position: 'absolute', right: '-30px', top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 'clamp(140px, 18vw, 260px)', fontWeight: 900,
              color: 'rgba(251,191,36,0.035)', lineHeight: 1,
              userSelect: 'none', letterSpacing: '-0.05em', zIndex: 0,
              fontFamily: "'Outfit', sans-serif",
            }}>24/7</div>

            <div style={{ ...s.inner, position: 'relative', zIndex: 1 }}>
              <div style={{ maxWidth: '640px' }}>
                <span className="trq-reveal" data-delay="0" style={s.eyebrow}>
                  Dubai Roadside Assistance
                </span>
                <HeadingTag className="trq-reveal" data-delay="80" style={s.h1}>
                  Every service you need,{' '}
                  <em style={{
                    fontStyle: 'normal',
                    color: '#fbbf24',
                    fontFamily: "'Crimson Pro', serif",
                    fontWeight: 300,
                    fontSize: '1.06em',
                  }}>
                    in 20 minutes
                  </em>
                </HeadingTag>

                <p
                  className="trq-reveal"
                  data-delay="160"
                  style={{ ...s.p, color: '#9ca3af', fontSize: '15px', marginTop: '20px', maxWidth: '500px', lineHeight: 1.75 }}
                >
                  Tareeqk operates a fleet of RTA-licensed recovery units, mobile technicians, and tow trucks — positioned across Dubai so help is always close, always fast, always professional.
                </p>

                <div
                  className="trq-reveal"
                  data-delay="240"
                  style={{ marginTop: '32px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}
                >
                  <a href="tel:+97180082773375" className="trq-btn-yellow" style={s.btnPrimary}>
                    📞 Call Now
                  </a>
                  <a
                    href="https://wa.me/97180082773375"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...s.btnGhost,
                      background: 'rgba(37,211,102,0.12)',
                      borderColor: 'rgba(37,211,102,0.4)',
                      color: '#4ade80',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.12)'; e.currentTarget.style.color = '#4ade80'; }}
                  >
                    💬 WhatsApp
                  </a>
                  <button onClick={scrollToDownload} style={{ ...s.btnGhost, cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.color = '#fbbf24'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
                  >
                    📱 Get the App
                  </button>
                </div>

                {/* Stat row */}
                <div
                  className="trq-reveal"
                  data-delay="320"
                  style={{
                    display: 'flex', gap: '0', flexWrap: 'wrap', marginTop: '44px',
                    borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px',
                  }}
                >
                  {[
                    { num: '20 min', label: 'Avg. response' },
                    { num: '24/7', label: 'No exceptions' },
                    { num: '4.9★', label: '1,200+ reviews' },
                    { num: 'RTA', label: 'Licensed' },
                  ].map((stat, i, arr) => (
                    <div key={i} style={{
                      padding: '0 28px 0 0', marginRight: '28px',
                      borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    }}>
                      <div style={{
                        fontSize: '19px', fontWeight: 800, color: '#fbbf24',
                        letterSpacing: '-0.02em', fontFamily: "'Outfit', sans-serif",
                      }}>
                        {stat.num}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── TRUST BAR ── */}
        <div style={{
          background: '#fbbf24', padding: '12px 24px',
          display: 'flex', justifyContent: 'center',
          flexWrap: 'wrap', gap: '0',
        }}>
          {['⚡ 20-Min Response', '🕐 24/7 Available', '⭐ 4.9 · 1,200+ Reviews', '🏆 RTA Licensed'].map((item, i, arr) => (
            <span key={i} style={{
              padding: '4px 20px',
              borderRight: i < arr.length - 1 ? '1.5px solid rgba(0,0,0,0.15)' : 'none',
              fontWeight: 700, fontSize: '12px', color: '#000',
              letterSpacing: '0.02em', fontFamily: "'Outfit', sans-serif",
            }}>
              {item}
            </span>
          ))}
        </div>

        {/* ══ ALL SERVICES GRID ════════════════════════════════════════════ */}
        <section style={{ ...s.section, background: '#fff' }}>
          <div style={s.inner}>
            <div
              className="trq-reveal"
              data-delay="0"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '44px' }}
            >
              <div>
                <span style={s.eyebrow}>What We Do</span>
                <h2 style={{ ...s.h2, marginBottom: '8px' }}>All Services in Dubai</h2>
                <p style={{ ...s.p, maxWidth: '480px' }}>
                  Six specialised roadside services, one number to call. Available across all Dubai districts, 24 hours a day, every day of the year.
                </p>
              </div>
              <a href="/contact" className="trq-pill-hover" style={s.linkPill}>Book a service →</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px' }}>
              {SERVICES.map((svc, i) => (
                <div
                  key={i}
                  className="trq-reveal trq-svc-card"
                  data-delay={`${i * 80}`}
                  style={{
                    background: '#fff', borderRadius: '14px',
                    border: `1.5px solid ${activeService === i ? '#fbbf24' : '#f0f0f0'}`,
                    padding: '24px',
                    boxShadow: activeService === i ? '0 16px 48px rgba(251,191,36,0.12)' : '0 2px 10px rgba(0,0,0,0.04)',
                    position: 'relative', overflow: 'hidden', cursor: 'default',
                  }}
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  {svc.tag && (
                    <span style={{
                      position: 'absolute', top: '16px', right: '16px',
                      background: svc.tagColor, color: svc.tagText,
                      fontSize: '9px', fontWeight: 800, letterSpacing: '1.5px',
                      textTransform: 'uppercase', padding: '3px 9px', borderRadius: '100px',
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {svc.tag}
                    </span>
                  )}

                  {/* Left accent bar */}
                  <div style={{
                    position: 'absolute', left: 0, top: '20%', bottom: '20%',
                    width: '3px', background: '#fbbf24', borderRadius: '0 2px 2px 0',
                    opacity: activeService === i ? 1 : 0, transition: 'opacity 0.25s ease',
                  }} />

                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: '#fffbeb', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '22px', marginBottom: '14px',
                  }}>
                    {svc.icon}
                  </div>

                  <h3 style={{
                    fontSize: '15px', fontWeight: 700, color: '#111',
                    marginBottom: '8px', letterSpacing: '-0.015em',
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {svc.title}
                  </h3>
                  <p style={{ ...s.p, fontSize: '13px', marginBottom: '14px', lineHeight: 1.7 }}>
                    {svc.desc}
                  </p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {svc.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12.5px', fontWeight: 500, color: '#374151' }}>
                        <span style={{
                          width: '15px', height: '15px', borderRadius: '50%',
                          background: '#fffbeb', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', flexShrink: 0,
                          fontSize: '8px', fontWeight: 800, color: '#92400e',
                        }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={svc.href}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      color: '#111', fontWeight: 700, fontSize: '12.5px',
                      textDecoration: 'none', paddingBottom: '2px',
                      borderBottom: '1.5px solid #fbbf24',
                      transition: 'color 0.18s ease',
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#92400e'}
                    onMouseLeave={e => e.currentTarget.style.color = '#111'}
                  >
                    Learn more →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ════════════════════════════════════════════════ */}
        <section style={{ ...s.section, background: '#0a0a0a' }}>
          <div style={s.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>

              <div className="trq-reveal trq-reveal--left" data-delay="0" style={{ position: 'relative' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src="new/third_img.webp"
                    alt="Tareeqk roadside assistance in Dubai"
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute', bottom: '16px', left: '16px',
                    background: '#fbbf24', borderRadius: '10px', padding: '12px 18px',
                  }}>
                    <div style={{ fontWeight: 800, fontSize: '20px', color: '#000', fontFamily: "'Outfit', sans-serif" }}>20 min</div>
                    <div style={{ fontWeight: 600, fontSize: '11px', color: 'rgba(0,0,0,0.7)' }}>Average response</div>
                  </div>
                </div>
                <div style={{
                  position: 'absolute', top: '-12px', right: '-12px',
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)',
                  zIndex: 0,
                }} />
              </div>

              <div className="trq-reveal trq-reveal--right" data-delay="80">
                <span style={{ ...s.eyebrow }}>How It Works</span>
                <h2 style={{ ...s.h2, color: '#fff', marginBottom: '32px' }}>
                  From stranded to sorted in 4 steps
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {HOW_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className="trq-reveal trq-step-row"
                      data-delay={`${i * 100 + 120}`}
                      style={{
                        display: 'flex', gap: '16px', padding: '18px 10px',
                        borderBottom: i < HOW_STEPS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        borderRadius: '8px',
                      }}
                    >
                      <div style={{
                        flexShrink: 0, width: '44px', height: '44px',
                        borderRadius: '10px',
                        background: i === 0 ? '#fbbf24' : 'rgba(255,255,255,0.05)',
                        border: `1.5px solid ${i === 0 ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: '13px',
                        color: i === 0 ? '#000' : 'rgba(255,255,255,0.3)',
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {step.num}
                      </div>
                      <div>
                        <div style={{ fontSize: '17px', marginBottom: '4px' }}>{step.icon}</div>
                        <h3 style={{
                          fontSize: '13.5px', fontWeight: 700, color: '#fff',
                          marginBottom: '5px', fontFamily: "'Outfit', sans-serif",
                        }}>
                          {step.title}
                        </h3>
                        <p style={{ ...s.p, color: '#6b7280', fontSize: '13px' }}>{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="trq-reveal" data-delay="520" style={{ marginTop: '28px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href="tel:+97180082773375" className="trq-btn-yellow" style={s.btnPrimary}>📞 Call Now</a>
                  <button onClick={scrollToDownload} style={{ ...s.btnGhost, cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.color = '#fbbf24'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
                  >
                    📱 Download App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHY TAREEQK ════════════════════════════════════════════════ */}
        <section style={{ ...s.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          <div style={s.inner}>
            <div className="trq-reveal" data-delay="0" style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={s.eyebrow}>Why Choose Us</span>
              <h2 style={{ ...s.h2, maxWidth: '520px', margin: '0 auto' }}>
                The standard Dubai expects. The service Dubai deserves.
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              {WHY_POINTS.map((pt, i) => (
                <div
                  key={i}
                  className="trq-reveal trq-why-card"
                  data-delay={`${i * 70}`}
                  style={{
                    background: '#fff', borderRadius: '12px',
                    border: '1.5px solid #f0f0f0', padding: '20px',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: '#fffbeb', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '17px', marginBottom: '12px',
                  }}>
                    {pt.icon}
                  </div>
                  <h3 style={{
                    fontSize: '13px', fontWeight: 700, color: '#111',
                    marginBottom: '6px', lineHeight: 1.35,
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {pt.title}
                  </h3>
                  <p style={{ ...s.p, fontSize: '12.5px' }}>{pt.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING TRANSPARENCY ════════════════════════════════════════ */}
        <section style={{ ...s.section, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={s.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>
              <div className="trq-reveal trq-reveal--left" data-delay="0">
                <span style={s.eyebrow}>Pricing</span>
                <h2 style={{ ...s.h2, marginBottom: '16px' }}>No surprises. Ever.</h2>
                <p style={{ ...s.p, marginBottom: '14px' }}>
                  We built Tareeqk on a simple principle: you should know exactly what you're paying before anyone shows up. That's why every service has a confirmed price displayed before dispatch — whether you're calling, messaging, or using the app.
                </p>
                <p style={s.p}>
                  No surge pricing. No after-service add-ons. No "additional charges" once the job is done. The price we quote is the price you pay.
                </p>
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  <a href="/contact" className="trq-pill-hover" style={{ ...s.linkPill, borderColor: '#fbbf24', color: '#111' }}>
                    Get a quote →
                  </a>
                </div>
              </div>
              <div className="trq-reveal trq-reveal--right" data-delay="120">
                {[
                  { label: 'Price shown before dispatch', icon: '✅' },
                  { label: 'No hidden fees or add-ons', icon: '✅' },
                  { label: 'Payment via cash or card', icon: '✅' },
                  { label: 'Invoice provided for every job', icon: '✅' },
                  { label: 'Insurance documentation available', icon: '✅' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="trq-reveal"
                    data-delay={`${i * 70 + 150}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '13px 0',
                      borderBottom: i < 4 ? '1px solid #f5f5f5' : 'none',
                    }}
                  >
                    <span style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      background: '#fffbeb', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '11px', flexShrink: 0,
                      color: '#92400e', fontWeight: 800,
                    }}>
                      {item.icon}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '13.5px', color: '#374151' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ AREA COVERAGE ═══════════════════════════════════════════════ */}
        <section style={{ ...s.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          <div style={s.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>
              <div className="trq-reveal trq-reveal--left" data-delay="0">
                <span style={s.eyebrow}>Coverage</span>
                <h2 style={{ ...s.h2, marginBottom: '12px' }}>All Dubai areas, one call away</h2>
                <p style={{ ...s.p, marginBottom: '22px' }}>
                  From the Marina to Deira, Business Bay to Al Quoz — our technicians are positioned across Dubai so wait times stay consistently short. We also cover Sharjah border areas on request.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {LOCATIONS.map(loc => (
                    <a
                      key={loc.href}
                      href={loc.href}
                      className="trq-pill-hover"
                      style={s.linkPill}
                    >
                      {loc.label}
                    </a>
                  ))}
                </div>
                <a href="/contact" className="trq-pill-hover" style={{ ...s.linkPill, borderColor: '#fbbf24' }}>
                  Not listed? Contact us →
                </a>
              </div>

              <div className="trq-reveal trq-reveal--right" data-delay="80">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {AREA_ZONES.map((area, i) => (
                    <div
                      key={i}
                      className="trq-reveal trq-area-card"
                      data-delay={`${i * 80 + 100}`}
                      style={{
                        background: i === 0 ? '#0a0a0a' : '#fff',
                        border: `1.5px solid ${i === 0 ? '#222' : '#f0f0f0'}`,
                        borderRadius: '12px', padding: '16px',
                        color: i === 0 ? '#fff' : '#111',
                      }}
                    >
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>{area.icon}</div>
                      <div style={{
                        fontWeight: 700, fontSize: '12.5px', marginBottom: '3px',
                        color: i === 0 ? '#fbbf24' : '#111',
                        fontFamily: "'Outfit', sans-serif",
                      }}>
                        {area.area}
                      </div>
                      <div style={{ fontSize: '11px', color: i === 0 ? '#6b7280' : '#9ca3af', fontWeight: 400 }}>
                        {area.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 72px' }}>
          <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
            <div
              className="trq-reveal trq-reveal--scale"
              data-delay="0"
              style={{
                background: '#0a0a0a',
                backgroundImage: `
                  radial-gradient(ellipse at 20% 50%, rgba(251,191,36,0.08) 0%, transparent 55%),
                  radial-gradient(ellipse at 80% 50%, rgba(251,191,36,0.04) 0%, transparent 50%)
                `,
                borderRadius: '20px', padding: '64px 36px',
                textAlign: 'center', color: '#fff',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                backgroundSize: '56px 56px',
              }} />
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(70px, 13vw, 160px)', fontWeight: 900,
                color: 'rgba(255,255,255,0.02)', userSelect: 'none',
                letterSpacing: '-0.05em', zIndex: 0, fontFamily: "'Outfit', sans-serif",
              }}>TAREEQK</div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span style={{ ...s.eyebrow, display: 'block', textAlign: 'center' }}>Always Ready</span>
                <h2 style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', fontWeight: 800,
                  marginBottom: '12px', letterSpacing: '-0.03em',
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  Stuck on the road?{' '}
                  <span style={{ color: '#fbbf24' }}>We're already on the way.</span>
                </h2>
                <p style={{ color: '#9ca3af', fontSize: '14.5px', marginBottom: '36px', maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                  Call, WhatsApp, or use the app. One contact and our nearest team is dispatched — 24 hours a day, every single day.
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="tel:+97180082773375" className="trq-btn-yellow" style={s.btnPrimary}>📞 Call Now</a>
                  <a
                    href="https://wa.me/97180082773375"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...s.btnPrimary, background: '#25D366', color: '#fff',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    💬 WhatsApp
                  </a>
                  <button
                    onClick={scrollToDownload}
                    style={{ ...s.btnGhost, cursor: 'pointer' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#fbbf24'; e.currentTarget.style.color = '#fbbf24'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
                  >
                    📱 Get the App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ INTERNAL LINKS FOOTER ════════════════════════════════════════ */}
        <section style={{
          padding: '44px 0',
          background: '#fafafa',
          borderTop: '1px solid #f0f0f0',
        }}>
          <div style={s.inner}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
              <div className="trq-reveal" data-delay="0">
                <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '14px' }}>
                  Service Pages
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {SERVICES.map(svc => (
                    <a
                      key={svc.href}
                      href={svc.href}
                      className="trq-link-hover"
                      style={{ color: '#374151', fontWeight: 600, fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '7px' }}
                    >
                      <span>{svc.icon}</span> {svc.title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="trq-reveal" data-delay="80">
                <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '14px' }}>
                  Area Pages
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {LOCATIONS.map(loc => (
                    <a key={loc.href} href={loc.href} className="trq-link-hover"
                      style={{ color: '#374151', fontWeight: 600, fontSize: '13px', textDecoration: 'none' }}
                    >
                      📍 {loc.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="trq-reveal" data-delay="160">
                <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '14px' }}>
                  Quick Links
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    { label: 'About Tareeqk', href: '/about' },
                    { label: 'Contact Us', href: '/contact' },
                    { label: 'Download the App', href: '#download-buttons' },
                    { label: 'Privacy Policy', href: '/privacy' },
                    { label: 'Terms of Service', href: '/terms' },
                  ].map(link => (
                    <a key={link.href} href={link.href} className="trq-link-hover"
                      style={{ color: '#374151', fontWeight: 600, fontSize: '13px', textDecoration: 'none' }}
                    >
                      → {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="trq-reveal" data-delay="240">
                <div style={{ fontWeight: 700, fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '14px' }}>
                  Emergency
                </div>
                <div style={{ background: '#0a0a0a', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: '#fff', marginBottom: '5px' }}>
                    🚨 Need help now?
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>
                    Available 24/7 — no exceptions
                  </div>
                  <a href="tel:+97180082773375" className="trq-btn-yellow" style={{ ...s.btnPrimary, fontSize: '12.5px', padding: '9px 16px' }}>
                    📞 Call Now
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