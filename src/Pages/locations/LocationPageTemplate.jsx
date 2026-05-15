// pages/locations/LocationPageTemplate.jsx
// Premium redesign — bold, editorial aesthetic for Tareeqk brand

import React from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceSchema from '../../schemas/ServiceSchema';
import FAQSchema from '../../schemas/FAQSchema';

const ALL_SERVICES = [
  { name: 'Car Recovery', icon: '🚗', href: '/car-recovery-dubai' },
  { name: 'Towing Service', icon: '🚛', href: '/towing-service-dubai' },
  { name: 'Battery Boost', icon: '🔋', href: '/battery-service-dubai' },
  { name: 'Flat Tyre Repair', icon: '🔧', href: '/flat-tyre-repair-dubai' },
  { name: 'Fuel Delivery', icon: '⛽', href: '/fuel-delivery-dubai' },
  { name: 'Accident Recovery', icon: '🚨', href: '/accident-recovery-dubai' },
];

const ALL_LOCATIONS = [
  { label: 'Dubai Marina', href: '/car-recovery-dubai-marina' },
  { label: 'JVC', href: '/car-recovery-jvc' },
  { label: 'Business Bay', href: '/car-recovery-business-bay' },
  { label: 'Deira', href: '/car-recovery-deira' },
  { label: 'Al Quoz', href: '/car-recovery-al-quoz' },
  { label: 'Jumeirah', href: '/car-recovery-jumeirah' },
];

const styles = {
  page: { fontFamily: "'Syne', 'DM Sans', sans-serif" },
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
    background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(20,20,20,0.35) 100%)',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative', zIndex: 2, textAlign: 'center',
    padding: '80px 24px 60px', maxWidth: '760px', margin: '0 auto',
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
  heroSub: {
    fontSize: '18px', color: '#d1d5db', maxWidth: '520px',
    margin: '0 auto 36px', lineHeight: 1.6,
  },
  heroCtas: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#fbbf24', color: '#000', border: 'none',
    padding: '15px 32px', borderRadius: '10px', fontSize: '15px',
    fontWeight: 800, cursor: 'pointer',
  },
  btnGreen: {
    background: '#25D366', color: '#fff', border: 'none',
    padding: '15px 32px', borderRadius: '10px', fontSize: '15px',
    fontWeight: 700, cursor: 'pointer',
  },
  trustBar: {
    background: '#fbbf24', padding: '14px 24px',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    gap: '0', flexWrap: 'wrap', fontWeight: 800,
    fontSize: '13px', color: '#000',
  },
  trustItem: { padding: '4px 24px', borderRight: '1.5px solid rgba(0,0,0,0.15)' },
  trustLast: { padding: '4px 24px' },
  section: { padding: '72px 0' },
  inner: { maxWidth: '1140px', margin: '0 auto', padding: '0 24px' },
  eyebrow: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
    textTransform: 'uppercase', color: '#fbbf24',
    marginBottom: '14px', display: 'block',
  },
  h2: {
    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800,
    color: '#111', marginBottom: '16px', letterSpacing: '-0.02em',
  },
  p: { color: '#6b7280', lineHeight: 1.75, fontSize: '16px' },
  card: {
    background: '#fff', borderRadius: '16px',
    border: '1.5px solid #f3f4f6', padding: '28px',
    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
  },
  svcCard: {
    display: 'block', textDecoration: 'none',
    border: '1.5px solid #e5e7eb', borderRadius: '14px',
    padding: '22px 16px', textAlign: 'center',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    background: '#fff',
  },
  linkPill: {
    display: 'inline-flex', alignItems: 'center',
    border: '1.5px solid #fbbf24', color: '#111',
    padding: '8px 20px', borderRadius: '100px',
    fontSize: '13px', fontWeight: 700, textDecoration: 'none',
  },
  ctaWrap: {
    background: '#0f0f0f', borderRadius: '24px',
    padding: '72px 40px', textAlign: 'center', color: '#fff',
    backgroundImage: 'radial-gradient(ellipse at 60% 0%, rgba(251,191,36,0.08) 0%, transparent 60%)',
  },
  stepRow: {
    display: 'flex', alignItems: 'flex-start', gap: '16px',
    padding: '20px 0', borderBottom: '1px solid #f3f4f6',
  },
  stepNum: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: '#fbbf24', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontWeight: 800, fontSize: '15px',
    color: '#000', flexShrink: 0, marginTop: '2px',
  },
  faqQ: {
    width: '100%', textAlign: 'left', padding: '20px 0',
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: '15px', fontWeight: 700, color: '#111', gap: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
};

export default function LocationPageTemplate({ config }) {
  const schemaFaqs = config.faqs.map(f => ({ question: f.q, answer: f.a }));
  const [openFaq, setOpenFaq] = React.useState(null);

  const handleCall = () => { window.location.href = 'tel:+97180082773375'; };
  const handleWhatsApp = () => { window.open('https://wa.me/97180082773375', '_blank'); };

  const otherLocations = ALL_LOCATIONS.filter(
    l => !l.href.includes(config.slug.split('/').pop().replace('car-recovery-', ''))
  );

  return (
    <>
      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.tareeqk.ae/${config.slug}`} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.tareeqk.ae/${config.slug}`} />
        <meta property="og:image" content={`https://www.tareeqk.ae${config.heroImage}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── SCHEMAS ── */}
      <ServiceSchema
        service={{
          name: `Car Recovery ${config.area}`,
          url: `https://www.tareeqk.ae/${config.slug}`,
          description: config.metaDesc,
          image: `https://www.tareeqk.ae${config.heroImage}`,
          areas: [config.area, 'Dubai', 'UAE'],
          serviceType: 'Car Recovery',
        }}
      />
      <FAQSchema faqs={schemaFaqs} />

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <img src={config.heroImage} alt={config.heroAlt} style={styles.heroBg} loading="eager" />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent} data-aos="fade-up">
          <span style={styles.heroTag}>
            <span>●</span> 24/7 · {config.area} · Dubai
          </span>
          <h1 style={styles.heroH1}>Car Recovery in {config.area}</h1>
          <p style={styles.heroSub}>
            Stuck in {config.area}? We reach you in {config.responseTime} — day or night, every day.
          </p>
          <div style={styles.heroCtas}>
            <button onClick={handleCall} style={styles.btnPrimary}>📞 Call Now</button>
            <button onClick={handleWhatsApp} style={styles.btnGreen}>💬 WhatsApp</button>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div style={styles.trustBar}>
        {[
          `⚡ ${config.responseTime} Response`,
          '🕐 24/7 Available',
          '⭐ 4.9 Rating',
          '🏆 RTA Licensed',
        ].map((item, i, arr) => (
          <span key={i} style={i < arr.length - 1 ? styles.trustItem : styles.trustLast}>{item}</span>
        ))}
      </div>

      {/* ── ABOUT THE AREA ── */}
      <section style={{ ...styles.section, background: '#fff' }}>
        <div style={styles.inner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div data-aos="fade-right">
              <span style={styles.eyebrow}>Serving {config.area}</span>
              <h2 style={styles.h2}>Roadside Assistance in {config.area}, Dubai</h2>
              <p style={styles.p}>{config.areaDesc}</p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="/car-recovery-dubai" style={styles.linkPill}>All Dubai Services →</a>
                <a href="/about" style={styles.linkPill}>About Tareeqk →</a>
              </div>
            </div>
            <div data-aos="fade-left">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { num: config.responseTime, label: 'Avg. Response', bg: '#111', textColor: '#fbbf24', subColor: '#9ca3af' },
                  { num: '24/7', label: 'Available', bg: '#fafafa', textColor: '#111', subColor: '#6b7280' },
                  { num: '4.9★', label: 'Rating', bg: '#fafafa', textColor: '#111', subColor: '#6b7280' },
                  { num: 'RTA', label: 'Licensed', bg: '#fafafa', textColor: '#111', subColor: '#6b7280' },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: s.bg, borderRadius: '14px', padding: '22px 18px',
                    border: `1.5px solid ${i === 0 ? '#333' : '#f0f0f0'}`,
                  }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: s.textColor, marginBottom: '4px' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: s.subColor }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ ...styles.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={styles.inner}>
          <div style={{ marginBottom: '36px' }} data-aos="fade-up">
            <span style={styles.eyebrow}>What We Offer</span>
            <h2 style={styles.h2}>Services Available in {config.area}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
            {ALL_SERVICES.map(svc => (
              <a
                key={svc.name}
                href={svc.href}
                style={styles.svcCard}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#fbbf24';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(251,191,36,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{svc.icon}</div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{svc.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESPONSE PROCESS ── */}
      <section style={{ ...styles.section, background: '#fff' }}>
        <div style={styles.inner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>
            <div data-aos="fade-right">
              <span style={styles.eyebrow}>Response Time</span>
              <h2 style={styles.h2}>How fast do we reach {config.area}?</h2>
              <p style={styles.p}>{config.responseDesc}</p>
              <div style={{ marginTop: '20px' }}>
                <span style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '7px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 700 }}>
                  Avg. {config.responseTime} dispatch
                </span>
              </div>
            </div>
            <div data-aos="fade-left">
              {[
                { label: 'App or call request placed', icon: '📱' },
                { label: 'Nearest unit dispatched immediately', icon: '🚛' },
                { label: `Technician on-site in ~${config.responseTime}`, icon: '📍' },
                { label: 'Vehicle recovered or issue resolved', icon: '✅' },
              ].map((step, i) => (
                <div key={i} style={styles.stepRow}>
                  <div style={styles.stepNum}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{step.icon}</div>
                    <div style={{ fontWeight: 600, color: '#111', fontSize: '15px' }}>{step.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BLOCK ── */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px 72px' }}>
        <div style={styles.ctaWrap} data-aos="fade-up">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚗</div>
          <h2 style={{ fontSize: 'clamp(1.7rem,3vw,2.6rem)', fontWeight: 800, marginBottom: '14px', letterSpacing: '-0.02em' }}>
            Need Help in {config.area} Right Now?
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '36px', fontSize: '16px', maxWidth: '480px', margin: '0 auto 36px' }}>
            Our team is on standby 24/7. One tap or call — we're already on our way.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleCall} style={styles.btnPrimary}>📞 Call Now</button>
            <button onClick={handleWhatsApp} style={styles.btnGreen}>💬 WhatsApp</button>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section style={{ ...styles.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ ...styles.inner, maxWidth: '780px' }}>
          <span style={styles.eyebrow}>FAQ</span>
          <h2 style={styles.h2}>FAQs – Car Recovery in {config.area}</h2>
          <div style={{ marginTop: '32px', borderTop: '1px solid #f0f0f0' }}>
            {config.faqs.map((faq, i) => (
              <div key={i}>
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
                  <div style={{ padding: '0 0 20px', color: '#6b7280', lineHeight: 1.7, fontSize: '15px' }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER LOCATIONS + SERVICES ── */}
      <section style={{ ...styles.section, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={styles.inner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
            <div>
              <span style={styles.eyebrow}>Other Areas</span>
              <h2 style={{ ...styles.h2, fontSize: '1.4rem' }}>We Also Cover</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {otherLocations.map(loc => (
                  <a key={loc.href} href={loc.href} style={styles.linkPill}>{loc.label}</a>
                ))}
              </div>
            </div>
            <div>
              <span style={styles.eyebrow}>All Services</span>
              <h2 style={{ ...styles.h2, fontSize: '1.4rem' }}>Roadside Services</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {ALL_SERVICES.map(svc => (
                  <a key={svc.href} href={svc.href} style={styles.linkPill}>
                    {svc.icon} {svc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
            <a href="/about" style={{ ...styles.linkPill, marginRight: '12px' }}>About Tareeqk</a>
            <a href="/contact" style={styles.linkPill}>Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
}