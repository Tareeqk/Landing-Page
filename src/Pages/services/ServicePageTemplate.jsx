// pages/services/ServicePageTemplate.jsx
// Premium redesign — editorial SaaS aesthetic for the Tareeqk brand

import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaPhoneAlt, FaWhatsapp, FaMobileAlt, FaShieldAlt, FaBolt, FaClock, FaStar,
  FaTruck, FaMapMarkerAlt, FaCheckCircle, FaUserShield, FaUserCheck,
  FaCar, FaCarBattery, FaTools, FaCarCrash, FaChevronDown, FaArrowRight, FaHeadset, FaTh,
  FaMountain, FaMotorcycle,
} from 'react-icons/fa';
import ServiceSchema from '../../schemas/ServiceSchema';
import FAQSchema from '../../schemas/FAQSchema';
import useLangLink from '../../hooks/useLangLink';

const ALL_SERVICES = [
  { label: 'Car Recovery Dubai', href: '/car-recovery-dubai', Icon: FaCar },
  { label: 'Battery Service Dubai', href: '/battery-service-dubai', Icon: FaCarBattery },
  { label: 'Flat Tyre Repair Dubai', href: '/flat-tyre-repair-dubai', Icon: FaTools },
  { label: 'Accident Recovery Dubai', href: '/accident-recovery-dubai', Icon: FaCarCrash },
  { label: 'Towing Service Dubai', href: '/towing-service-dubai', Icon: FaTruck },
  { label: 'Desert Recovery Dubai', href: '/desert-recovery-dubai', Icon: FaMountain },
  { label: 'Bike Recovery Dubai', href: '/bike-recovery-dubai', Icon: FaMotorcycle },
];

const ALL_LOCATIONS = [
  { label: 'Dubai Marina', href: '/car-recovery-dubai-marina' },
  { label: 'JVC', href: '/car-recovery-jvc' },
  { label: 'Business Bay', href: '/car-recovery-business-bay' },
  { label: 'Deira', href: '/car-recovery-deira' },
  { label: 'Al Quoz', href: '/car-recovery-al-quoz' },
  { label: 'Jumeirah', href: '/car-recovery-jumeirah' },
];

// Converts an area name to a URL slug, e.g. "Dubai Marina" → "dubai-marina"
const slugify = str => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Returns a location-page href for any area name.
// Tries ALL_LOCATIONS first; falls back to a generated slug.
const getAreaHref = (area, serviceSlug = 'car-recovery') => {
  const match = ALL_LOCATIONS.find(l => l.label.toLowerCase() === area.toLowerCase());
  if (match) return match.href;
  return `/${serviceSlug}-${slugify(area)}`;
};

// Generic, index-based icon sets reused across every service page
const WHY_ICONS = [FaBolt, FaTruck, FaShieldAlt, FaUserCheck];
const TRUST_CHECKLIST = [
  { Icon: FaClock, label: '24/7 Dispatch' },
  { Icon: FaUserShield, label: 'Certified Operators' },
  { Icon: FaMapMarkerAlt, label: 'Live GPS Tracking' },
  { Icon: FaWhatsapp, label: 'Instant WhatsApp Booking' },
];

// Short taglines shown under each area card — falls back to a generic line
// for any area string not covered here, so new config.areas entries never break.
const AREA_TAGLINES = {
  'Dubai Marina': 'Waterfront luxury living',
  'Business Bay': 'The heart of downtown',
  'Sheikh Zayed Road': "Dubai's main artery",
  'Deira': 'Historic Dubai charm',
  'Al Quoz': 'Industrial & creative hub',
  'Jumeirah': 'Coastal elegance & villas',
  'Downtown Dubai': 'Iconic landmarks & lifestyle',
  'Al Barsha': 'Family-friendly community',
  'JVC': 'Vibrant community living',
  'Mirdif': 'Peaceful suburban living',
  'Al Nahda': 'Connected convenience',
  'Dubai Hills': 'Green. Modern. Serene.',
  'Motor City': 'Motorsport inspired living',
  'DIFC': 'Finance & business district',
  'JBR': 'Beachfront excitement',
  'Palm Jumeirah': 'World-class island living',
  default: 'Covered by Tareeqk, 24/7',
};

const MOBILE_AREA_LIMIT = 6;

const COLORS = {
  ink: '#0b0c0f',
  inkSoft: '#13151a',
  muted: '#6b7280',
  mutedLight: '#9ca3af',
  gold: '#fbbf24',
  goldDeep: '#f59e0b',
  line: '#edeef0',
  bgAlt: '#fafafa',
  green: '#25D366',
};

const styles = {
  // Layout
  page: { fontFamily: "'Inter', 'DM Sans', sans-serif", color: COLORS.ink, background: '#fff' },
  container: { maxWidth: '1140px', margin: '0 auto', padding: '0 24px' },

  // Hero
  hero: {
    position: 'relative', width: '100%', minHeight: '520px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', color: '#fff',
  },
  heroBg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', filter: 'brightness(0.32) saturate(1.05)', zIndex: 0,
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(180deg, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.55) 45%, rgba(8,8,10,0.92) 100%)',
    zIndex: 1,
  },
  heroGlow: {
    position: 'absolute', top: '-10%', right: '-10%', width: '60%', height: '60%',
    background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)',
    zIndex: 1, pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative', zIndex: 2, textAlign: 'center',
    padding: '96px 24px 56px', maxWidth: '820px', width: '100%',
  },
  heroTag: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '100px', padding: '8px 18px', marginBottom: '26px',
    fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
    color: COLORS.gold, fontWeight: 700,
  },
  heroH1: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontSize: 'clamp(1rem, 2.6vw, 2.4rem)', fontWeight: 800,
    lineHeight: 1.12, marginBottom: '18px', letterSpacing: '-0.03em',
  },
  heroSubtitle: {
    fontSize: '13px', color: '#d6d8dc', maxWidth: '540px',
    margin: '0 auto 36px', lineHeight: 1.65,
  },
  heroCtas: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' },
  btnPrimary: {
    display: 'inline-flex', alignItems: 'center', gap: '9px',
    background: COLORS.gold, color: '#000', border: 'none',
    padding: '15px 30px', borderRadius: '11px', fontSize: '14.5px',
    fontWeight: 800, cursor: 'pointer', letterSpacing: '0.01em',
    transition: 'transform 0.15s, box-shadow 0.15s',
    fontFamily: "'Inter', sans-serif",
  },
  btnGreen: {
    display: 'inline-flex', alignItems: 'center', gap: '9px',
    background: COLORS.green, color: '#fff', border: 'none',
    padding: '15px 30px', borderRadius: '11px', fontSize: '14.5px',
    fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  btnOutline: {
    display: 'inline-flex', alignItems: 'center', gap: '9px',
    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)',
    padding: '15px 30px', borderRadius: '11px', fontSize: '14.5px',
    fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
    transition: 'transform 0.15s, background 0.15s',
  },

  // Hero glass metrics
  heroMetrics: {
    display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px',
    maxWidth: '480px', margin: '0 auto',
  },
  metricCardGlass: {
    background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.14)', borderRadius: '12px',
    padding: '18px 10px', textAlign: 'center',
  },
  metricValue: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '11px', fontWeight: 800, color: '#fff', marginTop: '8px', letterSpacing: '-0.01em',
  },
  metricLabel: {
    fontSize: '9px', color: '#aeb1b8', fontWeight: 600, marginTop: '3px',
    textTransform: 'uppercase', letterSpacing: '0.04em',
  },

  // Section scaffolding
  section: { padding: '88px 0' },
  sectionInner: { maxWidth: '1140px', margin: '0 auto', padding: '0 24px' },
  eyebrow: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px',
    textTransform: 'uppercase', color: COLORS.goldDeep,
    marginBottom: '14px', display: 'block',
  },
  sectionH2: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)', fontWeight: 800,
    color: COLORS.ink, marginBottom: '16px', letterSpacing: '-0.025em', lineHeight: 1.18,
  },
  sectionP: { color: COLORS.muted, lineHeight: 1.75, fontSize: '15.5px', maxWidth: '700px' },

  // Cards
  card: {
    background: '#fff', borderRadius: '20px',
    border: `1.5px solid ${COLORS.line}`, padding: '30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.035)',
    transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s',
  },

  // Grid helpers
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' },

  // Feature ("Why Choose Us") cards
  featureIconWrap: {
    width: '54px', height: '54px', borderRadius: '16px',
    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDeep})`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '20px', flexShrink: 0,
  },
  featureText: { fontWeight: 600, color: COLORS.ink, fontSize: '14.5px', lineHeight: 1.6 },

  // Trust panel (right side of "Why Drivers Trust" section)
  trustCard: {
    background: COLORS.ink, borderRadius: '26px', padding: '40px 36px',
    color: '#fff', position: 'relative', overflow: 'hidden',
    backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(251,191,36,0.14) 0%, transparent 55%)',
  },
  trustCardRating: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '44px', fontWeight: 800, lineHeight: 1 },
  trustCardSub: { color: '#9ca3af', fontSize: '13px', fontWeight: 600, marginTop: '8px' },
  trustCardDivider: { height: '1px', background: 'rgba(255,255,255,0.12)', margin: '28px 0' },
  trustCardRow: {
    display: 'flex', alignItems: 'center', gap: '12px',
    fontSize: '14.5px', fontWeight: 600, color: '#e5e7eb', marginBottom: '18px',
  },
  trustCardRowIcon: {
    width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
    background: 'rgba(251,191,36,0.14)', color: COLORS.gold,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  trustCardAccent: {
    marginTop: '8px', paddingTop: '22px', borderTop: '1px solid rgba(255,255,255,0.12)',
  },

  // Checklist
  checklist: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '28px' },
  checklistItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  checklistIconWrap: {
    width: '28px', height: '28px', borderRadius: '9px', flexShrink: 0,
    background: '#fef3c7', color: COLORS.goldDeep,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  checklistLabel: { fontSize: '13.5px', fontWeight: 700, color: COLORS.ink },

  // Process timeline cards
  processCard: {
    background: '#fff', borderRadius: '22px', border: `1.5px solid ${COLORS.line}`,
    padding: '28px 24px', transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s',
  },
  processTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '22px' },
  processNum: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '30px', fontWeight: 800, color: '#ececef', letterSpacing: '-0.02em',
  },
  processIconWrap: {
    width: '40px', height: '40px', borderRadius: '12px',
    background: COLORS.bgAlt, border: `1px solid ${COLORS.line}`, color: COLORS.goldDeep,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  processLabel: { fontWeight: 700, color: COLORS.ink, fontSize: '14.5px', lineHeight: 1.5 },

  // Dark CTA section
  ctaSection: {
    background: `linear-gradient(135deg, ${COLORS.ink}, #15171c)`, borderRadius: '28px',
    padding: '56px 48px', color: '#fff',
    margin: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '32px', flexWrap: 'wrap',
    boxShadow: `0 0 90px rgba(251,191,36,0.13)`,
  },
  ctaEyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase',
    color: COLORS.gold, marginBottom: '14px',
  },
  ctaH2: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', fontWeight: 800,
    marginBottom: '10px', letterSpacing: '-0.02em', maxWidth: '420px',
  },
  ctaP: { color: '#9ca3af', fontSize: '15px', maxWidth: '420px', lineHeight: 1.6 },

  // FAQ
  faqItem: {
    background: '#fff', border: `1.5px solid ${COLORS.line}`, borderRadius: '18px',
    padding: '6px 26px', marginBottom: '14px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  faqQ: {
    width: '100%', textAlign: 'left', padding: '22px 0',
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: '15px', fontWeight: 700, color: COLORS.ink, gap: '16px',
    fontFamily: "'Inter', sans-serif",
  },
  faqA: {
    paddingBottom: '22px', color: COLORS.muted, lineHeight: 1.7,
    fontSize: '14.5px', maxWidth: '680px',
  },

  // Areas section — left column
  areasH2: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: 'clamp(2.1rem, 4.2vw, 3.1rem)', fontWeight: 800,
    color: COLORS.ink, marginBottom: '14px', letterSpacing: '-0.03em', lineHeight: 1.05,
  },
  contactPill: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: '#fff', border: `1.5px solid ${COLORS.gold}`, color: COLORS.ink,
    padding: '12px 22px', borderRadius: '100px', fontSize: '14px', fontWeight: 700,
    textDecoration: 'none', margin: '18px 0 32px', transition: 'background 0.15s',
  },
  quickAccessCard: {
    background: '#fff', border: `1.5px solid ${COLORS.line}`, borderRadius: '22px',
    padding: '24px', marginBottom: '20px', boxShadow: '0 2px 14px rgba(0,0,0,0.04)',
  },
  quickAccessHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' },
  quickAccessTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 800, color: COLORS.ink },
  quickAccessIconChip: {
    width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
    background: '#fef3c7', color: COLORS.goldDeep,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  quickAccessDesc: {
    fontSize: '14px', color: COLORS.muted, lineHeight: 1.7,
  },
  areasImageWrap: { position: 'relative', borderRadius: '22px', overflow: 'hidden' },
  areasImage: { width: '100%', height: '260px', objectFit: 'cover', display: 'block' },
  areasImageCaption: {
    position: 'absolute', left: '14px', right: '14px', bottom: '14px',
    background: '#fff', borderRadius: '16px', padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: '12px',
    boxShadow: '0 10px 28px rgba(0,0,0,0.18)',
  },
  areasImageCaptionIcon: {
    width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
    background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDeep})`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.ink,
  },
  areasImageCaptionTitle: { fontSize: '13.5px', fontWeight: 800, color: COLORS.ink, lineHeight: 1.3 },
  areasImageCaptionSub: { fontSize: '12px', color: COLORS.muted, marginTop: '2px' },

  // Areas section — right column ("All Areas")
  allAreasHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' },
  allAreasTitle: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 800, color: COLORS.ink },
  allAreasDivider: { height: '1px', background: COLORS.line, marginBottom: '22px' },
  allAreasGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' },
  allAreaCard: {
    display: 'flex', alignItems: 'flex-start', gap: '12px',
    background: '#fff', border: `1.5px solid ${COLORS.line}`, borderRadius: '16px',
    padding: '16px', transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
    textDecoration: 'none', color: 'inherit', cursor: 'pointer',
  },
  allAreaIconWrap: {
    width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
    background: `linear-gradient(135deg, #fde9c0, ${COLORS.gold})`, color: '#92400e',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  allAreaName: { fontSize: '14.5px', fontWeight: 800, color: COLORS.ink, marginBottom: '2px' },
  allAreaTagline: { fontSize: '12.5px', color: COLORS.muted, lineHeight: 1.4 },
  showMoreBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    width: '100%', background: '#fff', border: `1.5px solid ${COLORS.line}`, color: COLORS.ink,
    padding: '13px 22px', borderRadius: '100px', fontSize: '13.5px', fontWeight: 700,
    cursor: 'pointer', marginTop: '20px', fontFamily: "'Inter', sans-serif",
  },

  // Link pill
  linkPill: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    border: `1.5px solid ${COLORS.gold}`, color: COLORS.ink,
    padding: '9px 18px', borderRadius: '100px',
    fontSize: '13px', fontWeight: 700, textDecoration: 'none',
    transition: 'background 0.15s, color 0.15s',
  },

  // Related service cards
  svcCard: {
    display: 'block', textDecoration: 'none',
    border: `1.5px solid ${COLORS.line}`, borderRadius: '20px',
    padding: '26px 22px', textAlign: 'left',
    transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
    background: '#fff',
  },
  svcCardIconWrap: {
    width: '46px', height: '46px', borderRadius: '13px',
    background: COLORS.bgAlt, border: `1px solid ${COLORS.line}`, color: COLORS.goldDeep,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '16px',
  },
  svcCardLink: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontSize: '12.5px', fontWeight: 700, color: COLORS.goldDeep, marginTop: '10px',
  },
};

// App-like mobile treatment. Inline `style` objects above win over plain CSS
// specificity, so these overrides use `!important` — the pragmatic way to
// retrofit responsiveness onto a template built entirely with style props.
const MOBILE_CSS = `
@media (max-width: 768px) {
  .svc-hero { min-height: auto !important; }
  .svc-hero-content { padding: 108px 20px 40px !important; }
  .svc-hero-tag { font-size: 9px !important; padding: 6px 14px !important; margin-bottom: 16px !important; }
  .svc-hero-h1 { font-size: 28px !important; line-height: 1.22 !important; margin-bottom: 14px !important; }
  .svc-hero-subtitle { font-size: 14px !important; margin: 0 auto 26px !important; }
  .svc-hero-ctas { flex-direction: column !important; align-items: stretch !important; gap: 10px !important; margin-bottom: 30px !important; }
  .svc-hero-ctas button { width: 100% !important; justify-content: center !important; padding: 14px 22px !important; }
  .svc-hero-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; max-width: 320px !important; gap: 10px !important; }

  .svc-section { padding: 52px 0 !important; }
  .svc-section-inner { padding: 0 18px !important; }
  .svc-section-h2 { font-size: 22px !important; margin-bottom: 12px !important; }
  .svc-areas-h2 { font-size: 30px !important; }

  .svc-grid2 { grid-template-columns: 1fr !important; gap: 28px !important; }
  .svc-grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 12px !important; }
  .svc-all-areas-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; }
  .svc-all-areas-grid .svc-all-area-card { padding: 14px !important; }

  .svc-trust-card { padding: 28px 22px !important; }
  .svc-process-card { padding: 22px 18px !important; }

  .svc-cta-wrap { margin: 48px auto !important; }
  .svc-cta-section { margin: 0 16px !important; padding: 32px 24px !important; border-radius: 22px !important; }
  .svc-cta-actions { flex-direction: column !important; align-items: stretch !important; width: 100% !important; }
  .svc-cta-actions button { width: 100% !important; justify-content: center !important; }
}

@media (max-width: 420px) {
  .svc-grid4 { grid-template-columns: 1fr !important; }
  .svc-hero-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
`;

export default function ServicePageTemplate({ config }) {
  const { lang } = useParams();
  const langLink = useLangLink();
  const schemaFaqs = config.faqs.map(f => ({ question: f.q, answer: f.a }));
  const [openFaq, setOpenFaq] = React.useState(null);
  const [showAllAreas, setShowAllAreas] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
  const showAreaToggle = isMobile && config.areas.length > MOBILE_AREA_LIMIT;
  const visibleAreas = showAreaToggle && !showAllAreas
    ? config.areas.slice(0, MOBILE_AREA_LIMIT)
    : config.areas;

  const heroMetrics = [
    { Icon: FaBolt, value: config.responseTime, label: 'Avg Response' },
    { Icon: FaClock, value: '24/7', label: 'Available' },
    { Icon: FaStar, value: '4.9', label: 'Rating' },
    { Icon: FaShieldAlt, value: 'RTA', label: 'Licensed' },
  ];

  const processSteps = [
    { Icon: FaPhoneAlt, label: 'Call, WhatsApp, or open the Tareeqk app' },
    { Icon: FaTruck, label: 'Nearest certified unit dispatched immediately' },
    { Icon: FaMapMarkerAlt, label: `Technician on-site in ~${config.responseTime}` },
    { Icon: FaCheckCircle, label: 'Vehicle recovered or issue resolved' },
  ];

  const lift = (e, on) => {
    e.currentTarget.style.transform = on ? 'translateY(-6px)' : 'translateY(0)';
    e.currentTarget.style.boxShadow = on ? '0 18px 40px rgba(0,0,0,0.09)' : '0 2px 10px rgba(0,0,0,0.035)';
    e.currentTarget.style.borderColor = on ? COLORS.gold : COLORS.line;
  };

  return (
    <>
      {/* ── SEO HEAD ── */}
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/${config.slug}`} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tareeqk.ae/${lang}/${config.slug}`} />
        <meta property="og:image" content={`https://tareeqk.ae${config.heroImage}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* ── SCHEMAS ── */}
      <ServiceSchema
        service={{
          name: config.schemaName,
          url: `https://tareeqk.ae/${lang}/${config.slug}`,
          description: config.schemaDesc,
          image: `https://tareeqk.ae${config.heroImage}`,
          areas: config.areas,
          serviceType: config.serviceType,
        }}
      />
      <FAQSchema faqs={schemaFaqs} />

      <div style={styles.page} className="svc-tpl">
        <style>{MOBILE_CSS}</style>

        {/* ── HERO ── */}
        <section style={styles.hero} className="svc-hero" aria-label="Service hero">
          <img src={config.heroImage} alt={config.heroAlt} style={styles.heroBg} loading="eager" />
          <div style={styles.heroOverlay} />
          <div style={styles.heroGlow} />
          <div style={styles.heroContent} className="svc-hero-content" data-aos="fade-up">
            <span style={styles.heroTag} className="svc-hero-tag">
              <FaShieldAlt size={11} /> 24/7 · Fast Response · Dubai
            </span>
            <h1 style={styles.heroH1} className="svc-hero-h1">{config.title}</h1>
            <p style={styles.heroSubtitle} className="svc-hero-subtitle">{config.intro}</p>
            <div style={styles.heroCtas} className="svc-hero-ctas">
              <button onClick={handleCall} style={styles.btnPrimary} aria-label="Call Tareeqk">
                <FaPhoneAlt size={13} /> Call Now
              </button>
              <button onClick={handleWhatsApp} style={styles.btnGreen} aria-label="WhatsApp Tareeqk">
                <FaWhatsapp size={16} /> WhatsApp
              </button>
              <button onClick={handleDownload} style={styles.btnOutline} aria-label="Download Tareeqk App">
                <FaMobileAlt size={13} /> App
              </button>
            </div>
           
          </div>
        </section>

        {/* ── WHY DRIVERS TRUST TAREEQK ── */}
        <section style={{ ...styles.section, background: '#fff' }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'center' }} className="svc-grid2">
              <div data-aos="fade-right">
                <span style={styles.eyebrow}>Our Service</span>
                <h2 style={styles.sectionH2} className="svc-section-h2">Why Drivers Trust Tareeqk</h2>
                <p style={styles.sectionP}>{config.whatIsService}</p>
                <div style={styles.checklist}>
                  {TRUST_CHECKLIST.map((item, i) => (
                    <div key={i} style={styles.checklistItem}>
                      <span style={styles.checklistIconWrap}><item.Icon size={13} /></span>
                      <span style={styles.checklistLabel}>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href={langLink('/about')} style={styles.linkPill}>About Us <FaArrowRight size={10} /></a>
                  <a href={langLink("/#contact")} style={styles.linkPill}>Contact <FaArrowRight size={10} /></a>
                </div>
              </div>
              <div data-aos="fade-left">
                <div className="svc-trust-card" style={{
                  ...styles.trustCard,
                  backgroundImage: `linear-gradient(135deg, rgba(11,12,15,0.90), rgba(11,12,15,0.95)), url(${config.heroImage})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}>
                  <div style={styles.trustCardRating}>24/7</div>
                  <div style={styles.trustCardSub}>Available every</div>
                  <div style={styles.trustCardDivider} />
                  <div style={styles.trustCardRow}>
                    <span style={styles.trustCardRowIcon}><FaShieldAlt size={14} /></span>
                    RTA-Licensed Operators
                  </div>
                  <div style={styles.trustCardRow}>
                    <span style={styles.trustCardRowIcon}><FaBolt size={14} /></span>
                    {config.responseTime} Avg. Response
                  </div>
                  <div style={styles.trustCardRow}>
                    <span style={styles.trustCardRowIcon}><FaMapMarkerAlt size={14} /></span>
                    Live GPS-Tracked Recovery
                  </div>
                  <div style={styles.trustCardAccent}>
                    <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>Service Type</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: '4px' }}>
                      {config.schemaName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS / HOW IT WORKS ── */}
        <section style={{ ...styles.section, background: COLORS.bgAlt, borderTop: `1px solid ${COLORS.line}` }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }} data-aos="fade-up">
              <span style={styles.eyebrow}>How It Works</span>
              <h2 style={styles.sectionH2} className="svc-section-h2">From Call to Resolution in {config.responseTime}</h2>
              <p style={{ ...styles.sectionP, margin: '0 auto' }}>{config.responseDesc}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px' }} className="svc-grid4">
              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="svc-process-card"
                  style={styles.processCard}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  onMouseEnter={e => lift(e, true)}
                  onMouseLeave={e => lift(e, false)}
                >
                  <div style={styles.processTop}>
                    <span style={styles.processNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={styles.processIconWrap}><step.Icon size={16} /></span>
                  </div>
                  <div style={styles.processLabel}>{step.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{ ...styles.section, background: '#fff' }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <div style={{ marginBottom: '40px' }} data-aos="fade-up">
              <span style={styles.eyebrow}>Why Us</span>
              <h2 style={styles.sectionH2} className="svc-section-h2">Why Choose Tareeqk?</h2>
            </div>
            <div style={styles.grid4} className="svc-grid4">
              {config.whyUs.map((reason, i) => {
                const Icon = WHY_ICONS[i % WHY_ICONS.length];
                return (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                    style={styles.card}
                    onMouseEnter={e => lift(e, true)}
                    onMouseLeave={e => lift(e, false)}
                  >
                    <div style={styles.featureIconWrap}>
                      <Icon size={22} color={COLORS.ink} />
                    </div>
                    <p style={styles.featureText}>{reason}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── AREAS COVERED ── */}
        <section style={{ ...styles.section, background: '#fff' }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '56px', alignItems: 'start' }} className="svc-grid2">

              {/* Left: heading, contact pill, quick access, image */}
              <div data-aos="fade-right">
                <span style={styles.eyebrow}>Coverage</span>
                <h2 style={styles.areasH2} className="svc-areas-h2">Areas We Serve</h2>
                <p style={styles.sectionP}>
                  Tareeqk covers all major Dubai districts. Need service in a specific area?
                </p>
                <a href={langLink("/#contact")} style={styles.contactPill}>
                  Contact us <FaArrowRight size={11} />
                </a>

                <div style={styles.quickAccessCard}>
                  <div style={styles.quickAccessHeader}>
                    <span style={styles.quickAccessTitle}>Our Coverage</span>
                    <span style={styles.quickAccessIconChip}><FaTh size={13} /></span>
                  </div>
                  <p style={styles.quickAccessDesc}>
                    Tareeqk operates across {config.areas.length} areas in Dubai — from bustling downtown districts to quieter residential communities. Wherever you are, help is always close by. Click any area on the right to learn more about coverage in that location.
                  </p>
                </div>

                <div style={styles.areasImageWrap}>
                  <img
                    src={config.areasImage || config.heroImage}
                    alt={`${config.schemaName} coverage across Dubai`}
                    style={styles.areasImage}
                    loading="lazy"
                  />
                  <div style={styles.areasImageCaption}>
                    <span style={styles.areasImageCaptionIcon}><FaShieldAlt size={15} /></span>
                    <div>
                      <div style={styles.areasImageCaptionTitle}>Reliable. Local. Always Here.</div>
                      <div style={styles.areasImageCaptionSub}>Serving Dubai with trust and care.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: full area grid with taglines */}
              <div data-aos="fade-left">
                <div style={styles.allAreasHeader}>
                  <span style={styles.allAreasTitle}>All Areas</span>
                </div>
                <div style={styles.allAreasDivider} />
                <div style={styles.allAreasGrid} className="svc-all-areas-grid">
                  {visibleAreas.map(area => (
                    <a
                      key={area}
                      href={langLink(getAreaHref(area, config.slug))}
                      className="svc-all-area-card"
                      style={styles.allAreaCard}
                      onMouseEnter={e => lift(e, true)}
                      onMouseLeave={e => lift(e, false)}
                    >
                      <span style={styles.allAreaIconWrap}><FaMapMarkerAlt size={14} /></span>
                      <div>
                        <div style={styles.allAreaName}>{area}</div>
                        <div style={styles.allAreaTagline}>{AREA_TAGLINES[area] || AREA_TAGLINES.default}</div>
                      </div>
                    </a>
                  ))}
                </div>

                {showAreaToggle && (
                  <button onClick={() => setShowAllAreas(v => !v)} style={styles.showMoreBtn}>
                    {showAllAreas ? 'Show Less' : `Show All ${config.areas.length} Areas`}
                    <FaChevronDown
                      size={11}
                      style={{ transform: showAllAreas ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
                    />
                  </button>
                )}
              </div>

            </div>
          </div>
        </section>


        {/* ── CTA BLOCK ── */}
        <div style={{ maxWidth: '1140px', margin: '72px auto' }} className="svc-cta-wrap">
          <div style={styles.ctaSection} className="svc-cta-section" data-aos="fade-up">
            <div>
              <div style={styles.ctaEyebrow}><FaHeadset size={13} /> 24/7 Emergency Line</div>
              <h2 style={styles.ctaH2}>Need {config.schemaName} Right Now?</h2>
              <p style={styles.ctaP}>
                Our team is on standby across Dubai. One tap or call is all it takes — we're already on our way.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} className="svc-cta-actions">
              <button onClick={handleCall} style={styles.btnPrimary}><FaPhoneAlt size={13} /> Call Now</button>
              <button onClick={handleWhatsApp} style={styles.btnGreen}><FaWhatsapp size={16} /> WhatsApp</button>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <section style={{ ...styles.section, background: '#fff', paddingTop: '32px' }} className="svc-section">
          <div style={{ ...styles.sectionInner, maxWidth: '780px' }} className="svc-section-inner">
            <span style={styles.eyebrow}>FAQ</span>
            <h2 style={styles.sectionH2} className="svc-section-h2">Frequently Asked Questions</h2>
            <div style={{ marginTop: '32px' }}>
              {config.faqs.map((faq, i) => (
                <div key={i} style={styles.faqItem}>
                  <button
                    style={styles.faqQ}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown
                      size={14}
                      style={{
                        color: COLORS.goldDeep, flexShrink: 0,
                        transform: openFaq === i ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s',
                      }}
                    />
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
        <section style={{ ...styles.section, background: COLORS.bgAlt, borderTop: `1px solid ${COLORS.line}` }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <span style={styles.eyebrow}>Explore More</span>
            <h2 style={{ ...styles.sectionH2, marginBottom: '32px' }} className="svc-section-h2">Our Other Services in Dubai</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }} className="svc-grid4">
              {relatedServices.map(svc => (
                <a
                  key={svc.href}
                  href={langLink(svc.href)}
                  style={styles.svcCard}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = COLORS.gold;
                    e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = COLORS.line;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.svcCardIconWrap}><svc.Icon size={20} /></div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: COLORS.ink, margin: 0 }}>{svc.label}</p>
                  <span style={styles.svcCardLink}>Learn More <FaArrowRight size={10} /></span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: `1px solid ${COLORS.line}` }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: COLORS.ink, marginRight: '12px' }}>Service Areas:</span>
              {ALL_LOCATIONS.map(loc => (
                <a key={loc.href} href={langLink(loc.href)} style={{ ...styles.linkPill, marginRight: '8px', marginBottom: '8px' }}>
                  {loc.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}