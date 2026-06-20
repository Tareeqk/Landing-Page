// pages/locations/LocationPageTemplate.jsx
// Premium redesign — bold, editorial aesthetic for Tareeqk brand
// v2: full 19-location coverage list + image gallery section + UI polish

import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServiceSchema from '../../schemas/ServiceSchema';
import FAQSchema from '../../schemas/FAQSchema';
import useLangLink from '../../hooks/useLangLink';

// ── Inline line-icons (hero) — kept dependency-free, sized/colored via props ──
const IconPhone = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconChat = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const IconPin = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconClock = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
const IconStar = ({ size = 16, color = 'currentColor', filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.63 22 9.27 16.5 14 18.18 21 12 17.27 5.82 21 7.5 14 2 9.27 8.91 8.63 12 2" />
  </svg>
);
const IconShieldCheck = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 4 5v6c0 5.2 3.4 9.8 8 11 4.6-1.2 8-5.8 8-11V5l-8-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const IconUsers = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const Icon247 = ({ size = 18, color = 'currentColor' }) => (
  <span style={{ fontSize: size * 0.46, fontWeight: 800, color, letterSpacing: '-0.5px' }}>24/7</span>
);

// "20 minutes" → "20 Minutes" for display in the hero stats bar
const titleCase = (str = '') => str.replace(/\b\w/g, (c) => c.toUpperCase());

const ALL_SERVICES = [
  { name: 'Car Recovery', icon: '🚗', href: '/car-recovery-dubai' },
  { name: 'Towing Service', icon: '🚛', href: '/towing-service-dubai' },
  { name: 'Battery Boost', icon: '🔋', href: '/battery-service-dubai' },
  { name: 'Flat Tyre Repair', icon: '🔧', href: '/flat-tyre-repair-dubai' },
  { name: 'Fuel Delivery', icon: '⛽', href: '/fuel-delivery-dubai' },
  { name: 'Accident Recovery', icon: '🚨', href: '/accident-recovery-dubai' },
];

// Full 19-area coverage list — keep in sync with pages/locations/index.jsx
const ALL_LOCATIONS = [
  { label: 'Dubai Marina', href: '/car-recovery-dubai-marina' },
  { label: 'Business Bay', href: '/car-recovery-business-bay' },
  { label: 'Downtown Dubai', href: '/car-recovery-downtown-dubai' },
  { label: 'Deira', href: '/car-recovery-deira' },
  { label: 'Bur Dubai', href: '/car-recovery-bur-dubai' },
  { label: 'Al Barsha', href: '/car-recovery-al-barsha' },
  { label: 'Jumeirah', href: '/car-recovery-jumeirah' },
  { label: 'JVC', href: '/car-recovery-jvc' },
  { label: 'JLT', href: '/car-recovery-jlt' },
  { label: 'Dubai Silicon Oasis', href: '/car-recovery-dubai-silicon-oasis' },
  { label: 'International City', href: '/car-recovery-international-city' },
  { label: 'Dubai Investment Park (DIP)', href: '/car-recovery-dubai-investment-park' },
  { label: 'Dubai Sports City', href: '/car-recovery-dubai-sports-city' },
  { label: 'Motor City', href: '/car-recovery-motor-city' },
  { label: 'Mirdif', href: '/car-recovery-mirdif' },
  { label: 'Al Qusais', href: '/car-recovery-al-qusais' },
  { label: 'Al Quoz', href: '/car-recovery-al-quoz' },
  { label: 'Jebel Ali', href: '/car-recovery-jebel-ali' },
  { label: 'Palm Jumeirah', href: '/car-recovery-palm-jumeirah' },
];

const styles = {
  page: { fontFamily: "'Syne', 'DM Sans', sans-serif" },
  hero: {
    position: 'relative', width: '100%', minHeight: 'clamp(620px, 78vw, 700px)',
    display: 'flex', alignItems: 'flex-end',
    overflow: 'hidden', color: '#fff',
  },
  heroBg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', objectPosition: '68% center', zIndex: 0,
  },
  heroOverlay: {
    position: 'absolute', inset: 0, zIndex: 1,
    background: 'linear-gradient(90deg, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.86) 26%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.18) 72%, rgba(5,5,5,0.05) 100%)',
  },
  heroInner: {
    position: 'relative', zIndex: 2, maxWidth: '1320px', margin: '0 auto',
    width: '100%', padding: '0 24px clamp(28px,4vw,40px)',
  },
  heroRow: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    gap: '24px', flexWrap: 'wrap',
  },
  heroContent: { maxWidth: '600px', flex: '1 1 420px' },
  heroBadgeRow: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '26px' },
  badge247: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(251,191,36,0.14)', border: '1.5px solid rgba(251,191,36,0.55)',
    borderRadius: '100px', padding: '7px 16px',
    fontSize: '12px', fontWeight: 800, letterSpacing: '1.5px',
    color: '#fbbf24', textTransform: 'uppercase',
  },
  badge247Dot: { width: '7px', height: '7px', borderRadius: '50%', background: '#fbbf24', flexShrink: 0 },
  badgeArea: {
    display: 'inline-flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.3)',
    borderRadius: '100px', padding: '7px 16px',
    fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px',
    color: '#e5e7eb', textTransform: 'uppercase',
  },
  heroH1: {
    fontSize: 'clamp(2.1rem, 4.6vw, 3.5rem)', fontWeight: 800,
    lineHeight: 1.08, letterSpacing: '-0.02em', color: '#fff', margin: 0,
  },
  heroH1Accent: { display: 'block', color: '#fbbf24' },
  heroUnderline: { width: '64px', height: '4px', borderRadius: '4px', background: '#fbbf24', margin: '20px 0 22px' },
  heroSub: {
    fontSize: '17px', color: '#d1d5db', lineHeight: 1.6,
    maxWidth: '460px', marginBottom: '30px',
  },
  heroCtaRow: { display: 'flex', alignItems: 'stretch', gap: '12px', flexWrap: 'wrap', marginBottom: '30px' },
  heroBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    padding: '13px 20px', borderRadius: '10px', border: 'none',
    cursor: 'pointer', textDecoration: 'none', fontFamily: 'inherit',
  },
  heroBtnTitle: { fontSize: '14px', fontWeight: 800, lineHeight: 1.25 },
  heroBtnSub: { fontSize: '11.5px', fontWeight: 500, lineHeight: 1.3, marginTop: '1px' },
  heroTrustRow: { display: 'flex', alignItems: 'center', gap: '14px' },
  avatarImg: {
    width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover',
    border: '2px solid #000', boxShadow: '0 0 0 1px rgba(255,255,255,0.15)', display: 'block',
  },
  heroTrustText: { fontSize: '13.5px', color: '#e5e7eb', lineHeight: 1.4, fontWeight: 500 },
  floatingCard: {
    width: '290px', flexShrink: 0,
    background: 'rgba(8,8,8,0.78)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    border: '1.5px solid rgba(251,191,36,0.45)', borderRadius: '16px',
    padding: '20px',
  },
  floatingCardTop: { display: 'flex', alignItems: 'flex-start', gap: '12px' },
  floatingCardIconWrap: {
    width: '38px', height: '38px', borderRadius: '50%', background: '#fbbf24',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  floatingCardTitle: { fontSize: '14.5px', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '4px' },
  floatingCardSub: { fontSize: '12px', color: '#9ca3af', lineHeight: 1.45 },
  floatingCardDivider: { height: '1px', background: 'rgba(255,255,255,0.12)', margin: '16px 0' },
  floatingCardStats: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' },
  floatingCardStat: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#e5e7eb' },
  heroStatsBar: {
    display: 'flex', flexWrap: 'wrap',
    background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px',
    marginTop: '32px', overflow: 'hidden',
  },
  heroStatItem: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '20px 26px', flex: '1 1 220px',
  },
  heroStatIconWrap: {
    width: '40px', height: '40px', borderRadius: '50%',
    border: '1.5px solid #fbbf24', color: '#fbbf24',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  heroStatNum: { fontSize: '15px', fontWeight: 800, color: '#fff', marginBottom: '2px' },
  heroStatLabel: { fontSize: '12.5px', color: '#9ca3af', fontWeight: 500 },
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
    padding: '24px 16px', textAlign: 'center',
    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
    background: '#fff',
  },
  svcIconWrap: {
    width: '52px', height: '52px', borderRadius: '50%',
    background: '#fef3c7', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '24px', margin: '0 auto 12px',
  },
  linkPill: {
    display: 'inline-flex', alignItems: 'center',
    border: '1.5px solid #fbbf24', color: '#111',
    padding: '8px 20px', borderRadius: '100px',
    fontSize: '13px', fontWeight: 700, textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s',
  },
  ctaWrap: {
    position: 'relative', overflow: 'hidden',
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
  galleryGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px',
  },
  galleryItem: {
    position: 'relative', borderRadius: '16px', overflow: 'hidden',
    aspectRatio: '4 / 3', background: '#f3f4f6',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
  },
  galleryImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  galleryCaption: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: '16px 16px 14px', color: '#fff', fontSize: '13px', fontWeight: 700,
    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
  },
};

export default function LocationPageTemplate({ config }) {
  const { lang } = useParams();
  const langLink = useLangLink();
  const schemaFaqs = config.faqs.map(f => ({ question: f.q, answer: f.a }));
  const [openFaq, setOpenFaq] = React.useState(null);

  const handleCall = () => { window.location.href = 'tel:+97142232269'; };
  const handleWhatsApp = () => { window.open('https://wa.me/97142232269', '_blank'); };

  const currentHref = `/${config.slug}`;
  const otherLocations = ALL_LOCATIONS.filter(l => l.href !== currentHref);

  // Per-location photo set, with a graceful fallback so pages never ship without imagery
  // even before real on-site photos are added for every area.
  const galleryImages = (config.gallery && config.gallery.length === 3)
    ? config.gallery
    : [
        { src: config.heroImage, alt: `${config.heroAlt} — recovery truck dispatched`, caption: `Recovery dispatched in ${config.area}`, pos: 'center' },
        { src: config.heroImage, alt: `${config.heroAlt} — technician arriving on site`, caption: 'Technician arriving on-site', pos: 'top' },
        { src: config.heroImage, alt: `${config.heroAlt} — unit on standby`, caption: 'Standing by, 24/7', pos: 'bottom' },
      ];

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

      {/* Focus visibility + small interaction polish that inline styles can't express */}
      <style>{`
        a, button { outline-offset: 2px; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #fbbf24;
          border-radius: 6px;
        }
        .tk-link-pill:hover { background: #fbbf24; color: #000; }
        .tk-svc-card:hover { border-color: #fbbf24 !important; box-shadow: 0 4px 20px rgba(251,191,36,0.15); transform: translateY(-2px); }
        .tk-hero-btn:hover { filter: brightness(1.07); transform: translateY(-1px); }
        @media (max-width: 880px) {
          .tk-hero-floating { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tk-svc-card, .tk-hero-btn { transition: none !important; }
        }
      `}</style>

      {/* ── SCHEMAS ── */}
      <ServiceSchema
        service={{
          name: `Car Recovery ${config.area}`,
          url: `https://www.tareeqk.ae/${lang}/${config.slug}`,
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
        <div style={styles.heroInner}>
          <div style={styles.heroRow} data-aos="fade-up">
            <div style={styles.heroContent}>
              <div style={styles.heroBadgeRow}>
                <span style={styles.badge247}><span style={styles.badge247Dot} />24/7 Service</span>
                <span style={styles.badgeArea}>{config.area} • Dubai</span>
              </div>

              <h1 style={styles.heroH1}>
                Car Recovery in
                <span style={styles.heroH1Accent}>{config.area}</span>
              </h1>
              <div style={styles.heroUnderline} />

              <p style={styles.heroSub}>
                Stuck in {config.area}? We reach you in {config.responseTime} — day or night, every day.
              </p>

              <div style={styles.heroCtaRow}>
                <button onClick={handleCall} className="tk-hero-btn" style={{ ...styles.heroBtn, background: '#fbbf24', color: '#000' }}>
                  <IconPhone size={18} color="#000" />
                  <span>
                    <div style={styles.heroBtnTitle}>Call Now</div>
                    <div style={{ ...styles.heroBtnSub, color: 'rgba(0,0,0,0.65)' }}>Instant Response</div>
                  </span>
                </button>
                <button onClick={handleWhatsApp} className="tk-hero-btn" style={{ ...styles.heroBtn, background: '#25D366', color: '#fff' }}>
                  <IconChat size={18} color="#fff" />
                  <span>
                    <div style={styles.heroBtnTitle}>WhatsApp</div>
                    <div style={{ ...styles.heroBtnSub, color: 'rgba(255,255,255,0.85)' }}>Chat Now</div>
                  </span>
                </button>
                {/* <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.area + ' Dubai')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="tk-hero-btn"
                  style={{ ...styles.heroBtn, background: 'rgba(0,0,0,0.35)', color: '#fff', border: '1.5px solid #fbbf24' }}
                >
                  <IconPin size={18} color="#fbbf24" />
                  <span>
                    <div style={styles.heroBtnTitle}>Our Location</div>
                    <div style={{ ...styles.heroBtnSub, color: '#d1d5db' }}>{config.area}</div>
                  </span>
                </a> */}
              </div>

              
            </div>

            <div style={styles.floatingCard} className="tk-hero-floating">
              <div style={styles.floatingCardTop}>
                <div style={styles.floatingCardIconWrap}>
                  <IconShieldCheck size={20} color="#000" />
                </div>
                <div>
                  <div style={styles.floatingCardTitle}>Reliable. Fast. Professional.</div>
                  <div style={styles.floatingCardSub}>RTA Licensed • Fully Insured • Modern Fleet</div>
                </div>
              </div>
              <div style={styles.floatingCardDivider} />
              <div style={styles.floatingCardStats}>
                <span style={styles.floatingCardStat}><IconStar size={14} color="#fbbf24" filled /> 4.9 Rating</span>
                <span style={styles.floatingCardStat}><IconUsers size={14} color="#fbbf24" /> 5000+ Happy Customers</span>
              </div>
            </div>
          </div>

          {/* <div style={styles.heroStatsBar} data-aos="fade-up">
            {[
              { icon: <IconClock size={18} color="#fbbf24" />, num: titleCase(config.responseTime), label: 'Average Response' },
              { icon: <Icon247 size={20} color="#fbbf24" />, num: '24/7 Available', label: 'Day & Night' },
              { icon: <IconStar size={16} color="#fbbf24" filled />, num: '4.9 Rating', label: 'From 5000+ Customers' },
              { icon: <IconShieldCheck size={18} color="#fbbf24" />, num: 'RTA Licensed', label: 'Certified & Insured' },
            ].map((s, i) => (
              <div key={i} style={styles.heroStatItem}>
                <div style={styles.heroStatIconWrap}>{s.icon}</div>
                <div>
                  <div style={styles.heroStatNum}>{s.num}</div>
                  <div style={styles.heroStatLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* ── ABOUT THE AREA ── */}
      <section style={{ ...styles.section, background: '#fff' }}>
        <div style={styles.inner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div data-aos="fade-right">
              <span style={styles.eyebrow}>Serving {config.area}</span>
              <h2 style={styles.h2}>Roadside Assistance in {config.area}, Dubai</h2>
              <p style={styles.p}>{config.areaDesc}</p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={langLink('/car-recovery-dubai')} className="tk-link-pill" style={styles.linkPill}>All Dubai Services →</a>
                <a href={langLink('/about')} className="tk-link-pill" style={styles.linkPill}>About Tareeqk →</a>
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

      {/* ── ON-THE-GROUND GALLERY ── */}
      <section style={{ ...styles.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={styles.inner}>
          <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 36px' }} data-aos="fade-up">
            <span style={styles.eyebrow}>On The Ground</span>
            <h2 style={styles.h2}>Tareeqk Working in {config.area}</h2>
            <p style={styles.p}>Real units, real equipment, real coverage — every time you call.</p>
          </div>
          <div style={styles.galleryGrid} data-aos="fade-up">
            {galleryImages.map((img, i) => (
              <div key={i} style={styles.galleryItem}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{ ...styles.galleryImg, objectPosition: img.pos || 'center' }}
                />
                <div style={styles.galleryCaption}>{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ ...styles.section, background: '#fff' }}>
        <div style={styles.inner}>
          <div style={{ marginBottom: '36px' }} data-aos="fade-up">
            <span style={styles.eyebrow}>What We Offer</span>
            <h2 style={styles.h2}>Services Available in {config.area}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
            {ALL_SERVICES.map(svc => (
              <a key={svc.name} href={langLink(svc.href)} className="tk-svc-card" style={styles.svcCard}>
                <div style={styles.svcIconWrap}>{svc.icon}</div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{svc.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESPONSE PROCESS ── */}
      <section style={{ ...styles.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
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
                  <a key={loc.href} href={langLink(loc.href)} className="tk-link-pill" style={styles.linkPill}>{loc.label}</a>
                ))}
              </div>
            </div>
            <div>
              <span style={styles.eyebrow}>All Services</span>
              <h2 style={{ ...styles.h2, fontSize: '1.4rem' }}>Roadside Services</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {ALL_SERVICES.map(svc => (
                  <a key={svc.href} href={langLink(svc.href)} className="tk-link-pill" style={styles.linkPill}>
                    {svc.icon} {svc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
            <a href={langLink('/about')} className="tk-link-pill" style={{ ...styles.linkPill, marginRight: '12px' }}>About Tareeqk</a>
            <a href={langLink('/contact')} className="tk-link-pill" style={styles.linkPill}>Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
}