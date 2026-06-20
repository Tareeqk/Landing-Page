// pages/services/ServicePageTemplate.jsx
// Premium redesign — bold, editorial aesthetic for Tareeqk brand

import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServiceSchema from '../../schemas/ServiceSchema';
import FAQSchema from '../../schemas/FAQSchema';
import useLangLink from '../../hooks/useLangLink';

const ALL_SERVICES = [
  { label: 'Car Recovery Dubai', href: '/car-recovery-dubai', icon: '🚗' },
  { label: 'Battery Service Dubai', href: '/battery-service-dubai', icon: '🔋' },
  { label: 'Flat Tyre Repair Dubai', href: '/flat-tyre-repair-dubai', icon: '🔧' },
  // { label: 'Fuel Delivery Dubai', href: '/fuel-delivery-dubai', icon: '⛽' },
  { label: 'Accident Recovery Dubai', href: '/accident-recovery-dubai', icon: '🚨' },
  { label: 'Towing Service Dubai', href: '/towing-service-dubai', icon: '🚛' },
];

const ALL_LOCATIONS = [
  { label: 'Dubai Marina', href: '/car-recovery-dubai-marina' },
  { label: 'JVC', href: '/car-recovery-jvc' },
  { label: 'Business Bay', href: '/car-recovery-business-bay' },
  { label: 'Deira', href: '/car-recovery-deira' },
  { label: 'Al Quoz', href: '/car-recovery-al-quoz' },
  { label: 'Jumeirah', href: '/car-recovery-jumeirah' },
];

const WHY_ICONS = ['⚡', '🕐', '💰', '👷'];

const styles = {
  // Layout
  page: { fontFamily: "'Syne', 'DM Sans', sans-serif" },
  container: { maxWidth: '1140px', margin: '0 auto', padding: '0 24px' },

  // Hero
  hero: {
    position: 'relative', width: '100%', minHeight: '520px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', color: '#fff',
  },
  heroBg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', filter: 'brightness(0.28)', zIndex: 0,
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.4) 100%)',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative', zIndex: 2, textAlign: 'center',
    padding: '80px 24px 60px', maxWidth: '760px',
  },
  heroTag: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)',
    borderRadius: '100px', padding: '6px 18px', marginBottom: '24px',
    fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
    color: '#fbbf24', fontWeight: 700,
  },
  heroH1: {
    fontSize: 'clamp(2rem, 5.5vw, 3.6rem)', fontWeight: 800,
    lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    fontSize: '18px', color: '#d1d5db', maxWidth: '520px',
    margin: '0 auto 36px', lineHeight: 1.6,
  },
  heroCtas: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#fbbf24', color: '#000', border: 'none',
    padding: '15px 32px', borderRadius: '10px', fontSize: '15px',
    fontWeight: 800, cursor: 'pointer', letterSpacing: '0.02em',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  btnGreen: {
    background: '#25D366', color: '#fff', border: 'none',
    padding: '15px 32px', borderRadius: '10px', fontSize: '15px',
    fontWeight: 700, cursor: 'pointer',
  },
  btnOutline: {
    background: 'transparent', color: '#fff',
    border: '2px solid rgba(255,255,255,0.35)',
    padding: '15px 32px', borderRadius: '10px', fontSize: '15px',
    fontWeight: 600, cursor: 'pointer',
  },

  // Trust bar
  trustBar: {
    background: '#fbbf24', padding: '14px 24px',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    gap: '0', flexWrap: 'wrap', fontWeight: 800,
    fontSize: '13px', color: '#000', letterSpacing: '0.01em',
  },
  trustItem: {
    padding: '4px 24px', borderRight: '1.5px solid rgba(0,0,0,0.15)',
  },
  trustItemLast: { padding: '4px 24px' },

  // Section scaffolding
  section: { padding: '72px 0' },
  sectionInner: { maxWidth: '1140px', margin: '0 auto', padding: '0 24px' },
  eyebrow: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
    textTransform: 'uppercase', color: '#fbbf24',
    marginBottom: '14px', display: 'block',
  },
  sectionH2: {
    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800,
    color: '#111', marginBottom: '16px', letterSpacing: '-0.02em',
  },
  sectionP: { color: '#6b7280', lineHeight: 1.75, fontSize: '16px', maxWidth: '700px' },

  // Cards
  card: {
    background: '#fff', borderRadius: '16px',
    border: '1.5px solid #f3f4f6', padding: '28px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
    transition: 'box-shadow 0.2s, border-color 0.2s',
  },
  cardDark: {
    background: '#111', borderRadius: '16px',
    border: '1.5px solid #222', padding: '28px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
  },

  // Grid helpers
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' },

  // Dark CTA section
  ctaSection: {
    background: '#0f0f0f', borderRadius: '24px',
    padding: '72px 40px', textAlign: 'center', color: '#fff',
    margin: '0 24px 72px',
    backgroundImage: 'radial-gradient(ellipse at 60% 0%, rgba(251,191,36,0.08) 0%, transparent 60%)',
  },
  ctaH2: {
    fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', fontWeight: 800,
    marginBottom: '14px', letterSpacing: '-0.02em',
  },
  ctaP: { color: '#9ca3af', marginBottom: '36px', fontSize: '16px' },

  // FAQ
  faqItem: {
    borderBottom: '1px solid #f0f0f0', overflow: 'hidden',
  },
  faqQ: {
    width: '100%', textAlign: 'left', padding: '20px 0',
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: '15px', fontWeight: 700, color: '#111', gap: '16px',
  },
  faqA: {
    paddingBottom: '20px', color: '#6b7280', lineHeight: 1.7,
    fontSize: '15px',
  },

  // Tags
  tag: {
    display: 'inline-block', background: '#fef3c7',
    border: '1px solid #fde68a', color: '#92400e',
    padding: '5px 14px', borderRadius: '100px',
    fontSize: '13px', fontWeight: 600,
  },

  // Area pill
  areaPill: {
    background: '#f9fafb', border: '1px solid #e5e7eb',
    padding: '7px 16px', borderRadius: '100px',
    fontSize: '13px', fontWeight: 600, color: '#374151',
  },

  // Link pill
  linkPill: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    border: '1.5px solid #fbbf24', color: '#111',
    padding: '8px 20px', borderRadius: '100px',
    fontSize: '13px', fontWeight: 700, textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
  },

  // Service card link
  svcCard: {
    display: 'block', textDecoration: 'none',
    border: '1.5px solid #e5e7eb', borderRadius: '14px',
    padding: '20px', textAlign: 'center',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    background: '#fff',
  },

  // Process steps
  stepRow: {
    display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  stepNum: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: '#fbbf24', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontWeight: 800, fontSize: '15px',
    color: '#000', flexShrink: 0, marginTop: '2px',
  },
};

export default function ServicePageTemplate({ config }) {
  const { lang } = useParams();
  const langLink = useLangLink();
  const schemaFaqs = config.faqs.map(f => ({ question: f.q, answer: f.a }));
  const [openFaq, setOpenFaq] = React.useState(null);

  const handleCall = () => { window.location.href = 'tel:+97142232269'; };
  const handleWhatsApp = () => { window.open('https://wa.me/97142232269', '_blank'); };
  const handleDownload = () => {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    window.location.href = isIOS
      ? 'https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854'
      : 'https://play.google.com/store/apps/details?id=com.tareeqk.order';
  };

  const relatedServices = ALL_SERVICES.filter(s => !s.href.includes(config.slug));

  return (
    <>
      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.tareeqk.ae/${lang}/${config.slug}`} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.tareeqk.ae/${lang}/${config.slug}`} />
        <meta property="og:image" content={`https://www.tareeqk.ae${config.heroImage}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── SCHEMAS ── */}
      <ServiceSchema
        service={{
          name: config.schemaName,
          url: `https://www.tareeqk.ae/${lang}/${config.slug}`,
          description: config.schemaDesc,
          image: `https://www.tareeqk.ae${config.heroImage}`,
          areas: config.areas,
          serviceType: config.serviceType,
        }}
      />
      <FAQSchema faqs={schemaFaqs} />

      {/* ── HERO ── */}
      <section style={styles.hero} aria-label="Service hero">
        <img src={config.heroImage} alt={config.heroAlt} style={styles.heroBg} loading="eager" />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent} data-aos="fade-up">
          <span style={styles.heroTag}>
            <span>●</span> 24/7 · Dubai · RTA Licensed
          </span>
          <h1 style={styles.heroH1}>{config.title}</h1>
          <p style={styles.heroSubtitle}>{config.intro}</p>
          <div style={styles.heroCtas}>
            <button onClick={handleCall} style={styles.btnPrimary} aria-label="Call Tareeqk">
              📞 Call Now
            </button>
            <button onClick={handleWhatsApp} style={styles.btnGreen} aria-label="WhatsApp Tareeqk">
              💬 WhatsApp
            </button>
            <button onClick={handleDownload} style={styles.btnOutline} aria-label="Download Tareeqk App">
              📱 App
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={styles.trustBar} role="complementary" aria-label="Trust indicators">
        {[
          `⚡ ${config.responseTime} Response`,
          '🕐 24/7 Available',
          '⭐ 4.9 · 1,200+ Reviews',
          '🏆 RTA Licensed',
        ].map((item, i, arr) => (
          <span key={i} style={i < arr.length - 1 ? styles.trustItem : styles.trustItemLast}>
            {item}
          </span>
        ))}
      </div>

      {/* ── WHAT IS THE SERVICE ── */}
      <section style={{ ...styles.section, background: '#fff' }}>
        <div style={styles.sectionInner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div data-aos="fade-right">
              <span style={styles.eyebrow}>Our Service</span>
              <h2 style={styles.sectionH2}>What Is {config.schemaName}?</h2>
              <p style={styles.sectionP}>{config.whatIsService}</p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={langLink('/about')} style={{ ...styles.linkPill }}>About Us →</a>
                <a href={langLink('/contact')} style={{ ...styles.linkPill }}>Contact →</a>
              </div>
            </div>
            <div data-aos="fade-left">
              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { num: config.responseTime, label: 'Avg Response', icon: '⚡' },
                  { num: '24/7', label: 'Availability', icon: '🕐' },
                  { num: '4.9★', label: 'Customer Rating', icon: '⭐' },
                  { num: 'RTA', label: 'Licensed Operator', icon: '🏆' },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: i === 0 ? '#111' : '#fafafa',
                    border: `1.5px solid ${i === 0 ? '#333' : '#f0f0f0'}`,
                    borderRadius: '14px', padding: '22px 20px',
                    color: i === 0 ? '#fff' : '#111',
                  }}>
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>{stat.icon}</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px', color: i === 0 ? '#fbbf24' : '#111' }}>
                      {stat.num}
                    </div>
                    <div style={{ fontSize: '12px', color: i === 0 ? '#9ca3af' : '#6b7280', fontWeight: 600 }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section style={{ ...styles.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={styles.sectionInner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>
            <div data-aos="fade-right">
              <span style={styles.eyebrow}>How It Works</span>
              <h2 style={styles.sectionH2}>From Call to Resolution in {config.responseTime}</h2>
              <p style={styles.sectionP}>{config.responseDesc}</p>
              <div style={{ marginTop: '20px' }}>
                <span style={{ ...styles.tag }}>Avg. {config.responseTime} dispatch</span>
              </div>
            </div>
            <div data-aos="fade-left">
              {[
                { label: 'Call, WhatsApp, or open the Tareeqk app', icon: '📱' },
                { label: 'Nearest certified unit dispatched immediately', icon: '🚛' },
                { label: `Technician on-site in ~${config.responseTime}`, icon: '📍' },
                { label: 'Vehicle recovered or issue resolved', icon: '✅' },
              ].map((step, i) => (
                <div key={i} style={styles.stepRow}>
                  <div style={styles.stepNum}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: '22px', marginBottom: '4px' }}>{step.icon}</div>
                    <div style={{ fontWeight: 600, color: '#111', fontSize: '15px' }}>{step.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY TAREEQK ── */}
      <section style={{ ...styles.section, background: '#fff' }}>
        <div style={styles.sectionInner}>
          <div style={{ marginBottom: '40px' }} data-aos="fade-up">
            <span style={styles.eyebrow}>Why Us</span>
            <h2 style={styles.sectionH2}>Why Choose Tareeqk?</h2>
          </div>
          <div style={styles.grid4}>
            {config.whyUs.map((reason, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={i * 80} style={{
                ...styles.card,
                borderTop: '3px solid #fbbf24',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{WHY_ICONS[i]}</div>
                <p style={{ fontWeight: 600, color: '#111', fontSize: '14px', lineHeight: 1.65 }}>{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS COVERED ── */}
      <section style={{ ...styles.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={styles.sectionInner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>
            <div data-aos="fade-right">
              <span style={styles.eyebrow}>Coverage</span>
              <h2 style={styles.sectionH2}>Areas We Serve</h2>
              <p style={styles.sectionP}>
                Tareeqk covers all major Dubai districts. Need service in a specific area?
                <br />
                <a href={langLink('/contact')} style={{ color: '#fbbf24', fontWeight: 700, textDecoration: 'none' }}>
                  Contact us →
                </a>
              </p>
              <div style={{ marginTop: '24px' }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: '#111', display: 'block', marginBottom: '12px' }}>
                  Area Pages:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ALL_LOCATIONS.map(loc => (
                    <a key={loc.href} href={langLink(loc.href)} style={{ ...styles.linkPill, fontSize: '12px' }}>
                      {loc.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div data-aos="fade-left">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {config.areas.map(area => (
                  <span key={area} style={styles.areaPill}>{area}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BLOCK ── */}
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={styles.ctaSection} data-aos="fade-up">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚗</div>
          <h2 style={styles.ctaH2}>Need {config.schemaName} Right Now?</h2>
          <p style={styles.ctaP}>
            Our team is on standby 24/7. One tap or call is all it takes — we're already on our way.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleCall} style={styles.btnPrimary}>📞 Call Now</button>
            <button onClick={handleWhatsApp} style={styles.btnGreen}>💬 WhatsApp</button>
            <button onClick={handleDownload} style={styles.btnOutline}>📱 Download App</button>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section style={{ ...styles.section, background: '#fff' }}>
        <div style={{ ...styles.sectionInner, maxWidth: '780px' }}>
          <span style={styles.eyebrow}>FAQ</span>
          <h2 style={styles.sectionH2}>Frequently Asked Questions</h2>
          <div style={{ marginTop: '32px', borderTop: '1px solid #f0f0f0' }}>
            {config.faqs.map((faq, i) => (
              <div key={i} style={styles.faqItem}>
                <button
                  style={styles.faqQ}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span style={{
                    fontSize: '22px', color: '#fbbf24', flexShrink: 0, lineHeight: 1,
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '400px' : '0',
                  overflow: 'hidden', transition: 'max-height 0.3s ease',
                }}>
                  <div style={styles.faqA}>{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section style={{ ...styles.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={styles.sectionInner}>
          <span style={styles.eyebrow}>Explore More</span>
          <h2 style={{ ...styles.sectionH2, marginBottom: '32px' }}>Our Other Services in Dubai</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
            {relatedServices.map(svc => (
              <a key={svc.href} href={langLink(svc.href)} style={styles.svcCard}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#fbbf24';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(251,191,36,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{svc.icon}</div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{svc.label}</p>
              </a>
            ))}
          </div>
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
            <span style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginRight: '12px' }}>Service Areas:</span>
            {ALL_LOCATIONS.map(loc => (
              <a key={loc.href} href={langLink(loc.href)} style={{ ...styles.linkPill, marginRight: '8px', marginBottom: '8px' }}>
                {loc.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}