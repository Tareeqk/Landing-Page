// pages/services/ServicePageTemplate.jsx
// Premium redesign — editorial SaaS aesthetic for the Tareeqk brand

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import {
  FaPhoneAlt, FaWhatsapp, FaMobileAlt, FaShieldAlt, FaBolt, FaClock, FaStar,
  FaTruck, FaMapMarkerAlt, FaCheckCircle, FaUserShield, FaUserCheck,
  FaCar, FaCarBattery, FaTools, FaCarCrash, FaChevronDown, FaHeadset, FaTh,
  FaMountain, FaMotorcycle,
} from 'react-icons/fa';
// ArrowRight specifically comes from lucide, not react-icons/fa, to match
// the one arrow style used site-wide (BecomeDriverPartner.jsx's "Apply as a
// Partner" button) -- react-icons' FaArrowRight is a visibly different,
// heavier glyph than every other CTA arrow on the site.
import { ArrowRight } from 'lucide-react';
import ServiceSchema from '../../schemas/ServiceSchema';
import FAQSchema from '../../schemas/FAQSchema';
import BreadcrumbSchema from '../../schemas/BreadcrumbSchema';
import HreflangTags from '../../Components/HreflangTags';
import useLangLink from '../../hooks/useLangLink';
import { prefetchRoute } from '../../routePrefetch';

const ALL_SERVICES = [
  { label: 'Car Recovery Dubai', href: '/car-recovery-dubai', Icon: FaCar },
  { label: 'Roadside Assistance Dubai', href: '/roadside-assistance-dubai', Icon: FaHeadset },
  { label: 'Battery Service Dubai', href: '/battery-service-dubai', Icon: FaCarBattery },
  { label: 'Flat Tyre Repair Dubai', href: '/flat-tyre-repair-dubai', Icon: FaTools },
  { label: 'Accident Recovery Dubai', href: '/accident-recovery-dubai', Icon: FaCarCrash },
  { label: 'Towing Service Dubai', href: '/towing-service-dubai', Icon: FaTruck },
  { label: 'Desert Recovery Dubai', href: '/desert-recovery-dubai', Icon: FaMountain },
  { label: 'Bike Recovery Dubai', href: '/bike-recovery-dubai', Icon: FaMotorcycle },
];

// Matches the Footer's own AREAS list and App.jsx's LOCATION_SLUGS exactly —
// these are the only areas with real, dedicated location pages behind them.
// Service pages must draw from this same set so every area card links to a
// page that actually exists instead of a generated href that 404s.
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
  { label: 'Dubai Investment Park', href: '/car-recovery-dubai-investment-park' },
  { label: 'Dubai Sports City', href: '/car-recovery-dubai-sports-city' },
  { label: 'Motor City', href: '/car-recovery-motor-city' },
  { label: 'Mirdif', href: '/car-recovery-mirdif' },
  { label: 'Al Qusais', href: '/car-recovery-al-qusais' },
  { label: 'Al Quoz', href: '/car-recovery-al-quoz' },
  { label: 'Jebel Ali', href: '/car-recovery-jebel-ali' },
  { label: 'Palm Jumeirah', href: '/car-recovery-palm-jumeirah' },
  { label: 'DIFC', href: '/car-recovery-difc' },
  { label: 'Dubai Hills Estate', href: '/car-recovery-dubai-hills-estate' },
  { label: 'Discovery Gardens', href: '/car-recovery-discovery-gardens' },
  { label: 'Al Nahda', href: '/car-recovery-al-nahda' },
  { label: 'Barsha Heights', href: '/car-recovery-barsha-heights' },
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
  { key: 'dispatch', Icon: FaClock, label: '24/7 Dispatch' },
  { key: 'certified', Icon: FaUserShield, label: 'Certified Operators' },
  { key: 'gpsTracking', Icon: FaMapMarkerAlt, label: 'Live GPS Tracking' },
  { key: 'whatsappBooking', Icon: FaWhatsapp, label: 'Instant WhatsApp Booking' },
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
  'Dubai Hills Estate': 'Green. Modern. Serene.',
  'Discovery Gardens': 'Themed garden clusters',
  'Barsha Heights': 'Media & internet city hub',
  default: 'Covered by Tareeqk, 24/7',
};

const MOBILE_AREA_LIMIT = 6;

const COLORS = {
  ink: 'var(--primary-dark-bg)',
  inkSoft: '#181818',
  muted: '#6b7280',
  mutedLight: '#9ca3af',
  gold: 'var(--primary-yellow)',
  goldDeep: '#d99a04',
  line: '#edeef0',
  bgAlt: 'var(--secondary-light-gray)',
  green: '#25D366',
};

const styles = {
  // Layout
  page: { fontFamily: "'Poppins', sans-serif", color: COLORS.ink, background: '#fff' },
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
    fontFamily: "'Poppins', sans-serif",
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
    fontFamily: "'Poppins', sans-serif",
  },
  btnGreen: {
    display: 'inline-flex', alignItems: 'center', gap: '9px',
    background: COLORS.green, color: '#fff', border: 'none',
    padding: '15px 30px', borderRadius: '11px', fontSize: '14.5px',
    fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  btnOutline: {
    display: 'inline-flex', alignItems: 'center', gap: '9px',
    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    color: '#fff', border: '1.5px solid rgba(255,255,255,0.28)',
    padding: '15px 30px', borderRadius: '11px', fontSize: '14.5px',
    fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
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
    fontFamily: "'Poppins', sans-serif",
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
    fontFamily: "'Poppins', sans-serif",
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

  // "Why Choose Us" — a slim divided strip of short reasons, deliberately
  // quieter than the "Process" step cards above it (that section earns
  // its cards because it's a real 4-step sequence; this one is a flat
  // list of reasons, so it shouldn't look like the same component).
  whyStrip: {
    display: 'flex', flexWrap: 'wrap',
    border: `1.5px solid ${COLORS.line}`, borderRadius: '20px', overflow: 'hidden',
  },
  whyStripItem: {
    flex: '1 1 0', minWidth: '230px',
    display: 'flex', alignItems: 'flex-start', gap: '14px',
    padding: '28px 26px',
  },
  whyStripIcon: {
    width: '38px', height: '38px', borderRadius: '11px', flexShrink: 0,
    background: COLORS.bgAlt, border: `1px solid ${COLORS.line}`, color: COLORS.goldDeep,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  whyStripText: { fontWeight: 600, color: COLORS.ink, fontSize: '14px', lineHeight: 1.65, margin: 0 },

  // Trust panel (right side of "Why Drivers Trust" section)
  trustCard: {
    background: COLORS.ink, borderRadius: '26px', padding: '40px 36px',
    color: '#fff', position: 'relative', overflow: 'hidden',
    backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(251,191,36,0.14) 0%, transparent 55%)',
  },
  trustCardRating: { fontFamily: "'Poppins', sans-serif", fontSize: '44px', fontWeight: 800, lineHeight: 1 },
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

  // Process — a dispatch-route line threading the 4 steps together (the
  // same dotted-line motif as the CTA signature and the About page's
  // story rail) instead of 4 disconnected number-cards, since this is a
  // literal sequence: call → dispatch → arrive → resolve.
  processConnector: {
    position: 'absolute', top: '28px', left: '12.5%', right: '12.5%', height: 0,
    borderTop: `2px dotted ${COLORS.gold}`, opacity: 0.5, zIndex: 0,
  },
  processNode: {
    position: 'relative', width: '56px', height: '56px', margin: '0 auto 20px',
    borderRadius: '50%', background: '#fff', border: `2px solid ${COLORS.gold}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(247,178,5,0.22)',
  },
  processNodeBadge: {
    position: 'absolute', top: '-6px', right: '-6px', width: '22px', height: '22px',
    borderRadius: '50%', background: COLORS.ink, color: '#fff',
    fontSize: '10px', fontWeight: 800, fontFamily: "'Poppins', sans-serif",
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  processLabel: {
    fontWeight: 700, color: COLORS.ink, fontSize: '14px', lineHeight: 1.55,
    margin: '0 auto', maxWidth: '190px', textAlign: 'center',
  },

  // Dark CTA section
  ctaSection: {
    position: 'relative', overflow: 'hidden',
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
    fontFamily: "'Poppins', sans-serif",
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
    fontFamily: "'Poppins', sans-serif",
  },
  faqA: {
    paddingBottom: '22px', color: COLORS.muted, lineHeight: 1.7,
    fontSize: '14.5px', maxWidth: '680px',
  },

  // Areas section — left column
  areasH2: {
    fontFamily: "'Poppins', sans-serif",
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
  quickAccessTitle: { fontFamily: "'Poppins', sans-serif", fontSize: '16px', fontWeight: 800, color: COLORS.ink },
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
  allAreasTitle: { fontFamily: "'Poppins', sans-serif", fontSize: '18px', fontWeight: 800, color: COLORS.ink },
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
    cursor: 'pointer', marginTop: '20px', fontFamily: "'Poppins', sans-serif",
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
.svc-why-strip-item { border-inline-end: 1.5px solid ${COLORS.line}; }
.svc-why-strip-item:last-child { border-inline-end: none; }

@media (max-width: 900px) {
  .svc-why-strip-item { flex: 1 1 50%; border-inline-end: none; border-bottom: 1.5px solid ${COLORS.line}; }
  .svc-why-strip-item:nth-child(odd) { border-inline-end: 1.5px solid ${COLORS.line}; }
}
@media (max-width: 480px) {
  .svc-why-strip-item { flex: 1 1 100%; border-inline-end: none !important; }
}

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
  .svc-process-connector { display: none !important; }

  .svc-cta-wrap { margin: 48px auto !important; }
  .svc-cta-section { margin: 0 16px !important; padding: 32px 24px !important; border-radius: 22px !important; }
  .svc-cta-actions { flex-direction: column !important; align-items: stretch !important; width: 100% !important; }
  .svc-cta-actions button { width: 100% !important; justify-content: center !important; }

  .svc-faq-item { padding: 4px 18px !important; border-radius: 14px !important; margin-bottom: 10px !important; }
  .svc-faq-q { padding: 16px 0 !important; font-size: 13.5px !important; gap: 12px !important; }
  .svc-faq-a { padding-bottom: 16px !important; font-size: 13px !important; line-height: 1.6 !important; }
}

@media (max-width: 420px) {
  /* .svc-grid4 stays 2-up even on narrow phones — the previous 1fr
     override turned the 4 process nodes and the 6 related-service
     cards into one long stacked column instead of a compact grid. */
  .svc-hero-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
}
`;

export default function ServicePageTemplate({ config }) {
  const { lang } = useParams();
  const langLink = useLangLink();
  const { t } = useTranslation();

  // Ar/ur copy lives in common.json under servicePages.<slug>.* — config's
  // own English strings are passed as the defaultValue, so an untranslated
  // field (or a slug missing from common.json entirely) quietly falls back
  // to English instead of rendering a raw i18next key on the page.
  const sp = key => t(`servicePages.${config.slug}.${key}`, config[key]);
  const spList = key => t(`servicePages.${config.slug}.${key}`, { returnObjects: true, defaultValue: config[key] });
  const tc = {
    metaTitle: sp('metaTitle'),
    metaDesc: sp('metaDesc'),
    title: sp('title'),
    intro: sp('intro'),
    responseTime: sp('responseTime'),
    responseDesc: sp('responseDesc'),
    whatIsService: sp('whatIsService'),
    whyUs: spList('whyUs'),
    faqs: spList('faqs'),
    serviceType: sp('serviceType'),
    schemaName: sp('schemaName'),
    schemaDesc: sp('schemaDesc'),
  };

  const schemaFaqs = tc.faqs.map(f => ({ question: f.q, answer: f.a }));
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
    { Icon: FaBolt, value: tc.responseTime, label: 'Avg Response' },
    { Icon: FaClock, value: '24/7', label: 'Available' },
    { Icon: FaStar, value: '4.9', label: 'Rating' },
    { Icon: FaShieldAlt, value: 'RTA', label: 'Licensed' },
  ];

  const processSteps = [
    { Icon: FaPhoneAlt, label: t('servicePageTemplate.process.step1', 'Call, WhatsApp, or open the Tareeqk app') },
    { Icon: FaTruck, label: t('servicePageTemplate.process.step2', 'Nearest certified unit dispatched immediately') },
    { Icon: FaMapMarkerAlt, label: t('servicePageTemplate.process.step3', 'Technician on-site in ~{{time}}', { time: tc.responseTime }) },
    { Icon: FaCheckCircle, label: t('servicePageTemplate.process.step4', 'Vehicle recovered or issue resolved') },
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
        <title>{tc.metaTitle}</title>
        <meta name="description" content={tc.metaDesc} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/${config.slug}/`} />
        <meta property="og:title" content={tc.metaTitle} />
        <meta property="og:description" content={tc.metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tareeqk.ae/${lang}/${config.slug}`} />
        <meta property="og:image" content={`https://tareeqk.ae${config.heroImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={tc.metaTitle} />
        <meta name="twitter:description" content={tc.metaDesc} />
        <meta name="twitter:image" content={`https://tareeqk.ae${config.heroImage}`} />
      </Helmet>
      <HreflangTags path={config.slug} />
      <BreadcrumbSchema
        items={[
          { name: t('servicePageTemplate.breadcrumbHome', 'Home'), url: `https://tareeqk.ae/${lang}` },
          { name: t('servicePageTemplate.breadcrumbServices', 'Services'), url: `https://tareeqk.ae/${lang}/service` },
          { name: tc.title },
        ]}
      />

      {/* ── SCHEMAS ── */}
      <ServiceSchema
        service={{
          name: tc.schemaName,
          url: `https://tareeqk.ae/${lang}/${config.slug}`,
          description: tc.schemaDesc,
          image: `https://tareeqk.ae${config.heroImage}`,
          areas: config.areas,
          serviceType: tc.serviceType,
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
          <div style={styles.heroContent} className="svc-hero-content">
            {/* Each hero element gets its own entrance beat instead of the
                tag/heading/subtitle/buttons all sharing one data-aos. */}
            <span style={styles.heroTag} className="svc-hero-tag" data-aos="fade-up" data-aos-delay="0">
              <FaShieldAlt size={11} /> {t('servicePageTemplate.heroTag', '24/7 · Fast Response · Dubai')}
            </span>
            <h1 style={styles.heroH1} className="svc-hero-h1" data-aos="fade-up" data-aos-delay="140">{tc.title}</h1>
            <p style={styles.heroSubtitle} className="svc-hero-subtitle" data-aos="fade-up" data-aos-delay="300">{tc.intro}</p>
            <div style={styles.heroCtas} className="svc-hero-ctas" data-aos="fade-up" data-aos-delay="440">
              <button onClick={handleDownload} style={styles.btnPrimary} aria-label={t('servicePageTemplate.downloadAppAria', 'Download Tareeqk App')}>
                <FaMobileAlt size={13} /> {t('servicePageTemplate.downloadApp', 'Download The App')}
              </button>
            </div>

          </div>
        </section>

        {/* ── WHY DRIVERS TRUST TAREEQK ── */}
        <section style={{ ...styles.section, background: '#fff' }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'center' }} className="svc-grid2">
              <div>
                <div data-aos="fade-right">
                  <span style={styles.eyebrow}>{t('servicePageTemplate.ourService', 'Our Service')}</span>
                  <h2 style={styles.sectionH2} className="svc-section-h2">{t('servicePageTemplate.whyTrustHeading', 'Why Drivers Trust Tareeqk')}</h2>
                  <p style={styles.sectionP}>{tc.whatIsService}</p>
                </div>
                <div style={styles.checklist}>
                  {TRUST_CHECKLIST.map((item, i) => (
                    <div key={i} data-aos="fade-up" data-aos-delay={200 + i * 90} style={styles.checklistItem}>
                      <span style={styles.checklistIconWrap}><item.Icon size={13} /></span>
                      <span style={styles.checklistLabel}>{t(`servicePageTemplate.trust.${item.key}`, item.label)}</span>
                    </div>
                  ))}
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay={200 + TRUST_CHECKLIST.length * 90 + 80}
                  style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}
                >
                  <Link to={langLink('/about')} onMouseEnter={() => prefetchRoute(langLink('/about'))} viewTransition style={styles.linkPill}>{t('servicePageTemplate.aboutUs', 'About Us')} <ArrowRight size={10} /></Link>
                  <HashLink to={langLink("/#contact")} style={styles.linkPill}>{t('servicePageTemplate.contact', 'Contact')} <ArrowRight size={10} /></HashLink>
                </div>
              </div>
              <div data-aos="fade-left">
                <div className="svc-trust-card" style={{
                  ...styles.trustCard,
                  backgroundImage: `linear-gradient(135deg, rgba(11,12,15,0.90), rgba(11,12,15,0.95)), url(${config.heroImage})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}>
                  <div style={styles.trustCardRating}>24/7</div>
                  <div style={styles.trustCardSub}>{t('servicePageTemplate.availableEvery', 'Available every')}</div>
                  <div style={styles.trustCardDivider} />
                  <div style={styles.trustCardRow}>
                    <span style={styles.trustCardRowIcon}><FaShieldAlt size={14} /></span>
                    {t('servicePageTemplate.rtaLicensed', 'RTA-Licensed Operators')}
                  </div>
                  <div style={styles.trustCardRow}>
                    <span style={styles.trustCardRowIcon}><FaBolt size={14} /></span>
                    {t('servicePageTemplate.avgResponseSuffix', '{{time}} Avg. Response', { time: tc.responseTime })}
                  </div>
                  <div style={styles.trustCardRow}>
                    <span style={styles.trustCardRowIcon}><FaMapMarkerAlt size={14} /></span>
                    {t('servicePageTemplate.gpsTrackedRecovery', 'Live GPS-Tracked Recovery')}
                  </div>
                  <div style={styles.trustCardAccent}>
                    <div style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 600 }}>{t('servicePageTemplate.serviceType', 'Service Type')}</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: "'Poppins', sans-serif", marginTop: '4px' }}>
                      {tc.schemaName}
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
              <span style={styles.eyebrow}>{t('servicePageTemplate.howItWorks', 'How It Works')}</span>
              <h2 style={styles.sectionH2} className="svc-section-h2">{t('servicePageTemplate.callToResolution', 'From Call to Resolution in {{time}}', { time: tc.responseTime })}</h2>
              <p style={{ ...styles.sectionP, margin: '0 auto' }}>{tc.responseDesc}</p>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={styles.processConnector} className="svc-process-connector" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '20px', position: 'relative' }} className="svc-grid4">
                {processSteps.map((step, i) => (
                  <div key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                    <div style={styles.processNode}>
                      <step.Icon size={20} color={COLORS.goldDeep} />
                      <span style={styles.processNodeBadge}>{i + 1}</span>
                    </div>
                    <p style={styles.processLabel}>{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{ ...styles.section, background: '#fff' }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <div style={{ marginBottom: '40px' }} data-aos="fade-up">
              <span style={styles.eyebrow}>{t('servicePageTemplate.whyUsEyebrow', 'Why Us')}</span>
              <h2 style={styles.sectionH2} className="svc-section-h2">{t('servicePageTemplate.whyChooseHeading', 'Why Choose Tareeqk?')}</h2>
            </div>
            <div style={styles.whyStrip} className="svc-why-strip">
              {tc.whyUs.map((reason, i) => {
                const Icon = WHY_ICONS[i % WHY_ICONS.length];
                return (
                  <div
                    key={i}
                    className="svc-why-strip-item"
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                    style={styles.whyStripItem}
                  >
                    <span style={styles.whyStripIcon}><Icon size={17} /></span>
                    <p style={styles.whyStripText}>{reason}</p>
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

              {/* Left: heading, contact pill, quick access, image — four
                  distinct stacked objects, each gets its own beat rather
                  than fading in as one flat column. */}
              <div>
                <div data-aos="fade-right" data-aos-delay="0">
                  <span style={styles.eyebrow}>{t('servicePageTemplate.coverage', 'Coverage')}</span>
                  <h2 style={styles.areasH2} className="svc-areas-h2">{t('servicePageTemplate.areasWeServe', 'Areas We Serve')}</h2>
                  <p style={styles.sectionP}>
                    {t('servicePageTemplate.areasIntro', 'Tareeqk covers all major Dubai districts. Need service in a specific area?')}
                  </p>
                </div>
                <HashLink to={langLink("/#contact")} style={styles.contactPill} data-aos="fade-right" data-aos-delay="140">
                  {t('servicePageTemplate.contactUs', 'Contact us')} <ArrowRight size={11} />
                </HashLink>

                <div style={styles.quickAccessCard} data-aos="fade-right" data-aos-delay="260">
                  <div style={styles.quickAccessHeader}>
                    <span style={styles.quickAccessTitle}>{t('servicePageTemplate.ourCoverage', 'Our Coverage')}</span>
                    <span style={styles.quickAccessIconChip}><FaTh size={13} /></span>
                  </div>
                  <p style={styles.quickAccessDesc}>
                    {t('servicePageTemplate.coverageDesc', 'Tareeqk operates across {{count}} areas in Dubai — from bustling downtown districts to quieter residential communities. Wherever you are, help is always close by. Click any area on the right to learn more about coverage in that location.', { count: config.areas.length })}
                  </p>
                </div>

                <div style={styles.areasImageWrap} data-aos="fade-right" data-aos-delay="380">
                  <img
                    src={config.areasImage || config.heroImage}
                    alt={`${tc.schemaName} coverage across Dubai`}
                    style={styles.areasImage}
                    loading="lazy"
                  />
                  <div style={styles.areasImageCaption}>
                    <span style={styles.areasImageCaptionIcon}><FaShieldAlt size={15} /></span>
                    <div>
                      <div className="urdu-loose-line" style={styles.areasImageCaptionTitle}>{t('servicePageTemplate.reliableLocal', 'Reliable. Local. Always Here.')}</div>
                      <div style={styles.areasImageCaptionSub}>{t('servicePageTemplate.servingDubai', 'Serving Dubai with trust and care.')}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: full area grid with taglines */}
              <div>
                <div data-aos="fade-left" style={styles.allAreasHeader}>
                  <span style={styles.allAreasTitle}>{t('servicePageTemplate.allAreas', 'All Areas')}</span>
                </div>
                <div style={styles.allAreasDivider} />
                <div style={styles.allAreasGrid} className="svc-all-areas-grid">
                  {visibleAreas.map((area, i) => (
                    <Link
                      key={area}
                      to={langLink(getAreaHref(area, config.slug))}
                      viewTransition
                      className="svc-all-area-card"
                      data-aos="fade-up"
                      data-aos-delay={Math.min(i * 45, 400)}
                      style={styles.allAreaCard}
                      onMouseEnter={e => { lift(e, true); prefetchRoute(langLink(getAreaHref(area, config.slug))); }}
                      onMouseLeave={e => lift(e, false)}
                    >
                      <span style={styles.allAreaIconWrap}><FaMapMarkerAlt size={14} /></span>
                      <div>
                        <div style={styles.allAreaName}>{t(`servicePageTemplate.areaNames.${slugify(area)}`, area)}</div>
                        <div className="urdu-loose-line" style={styles.allAreaTagline}>
                          {t(
                            AREA_TAGLINES[area]
                              ? `servicePageTemplate.areaTaglines.${slugify(area)}`
                              : 'servicePageTemplate.areaTaglines.default',
                            AREA_TAGLINES[area] || AREA_TAGLINES.default,
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {showAreaToggle && (
                  <button onClick={() => setShowAllAreas(v => !v)} style={styles.showMoreBtn}>
                    {showAllAreas
                      ? t('servicePageTemplate.showLess', 'Show Less')
                      : t('servicePageTemplate.showAllAreas', 'Show All {{count}} Areas', { count: config.areas.length })}
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
          <div style={styles.ctaSection} className="svc-cta-section">
            {/* Signature: dashed dispatch-route line with waypoint stops —
                same motif as the location pages' CTA, so both templates
                share one recognizable brand moment instead of each
                inventing its own generic dark CTA box. */}
            <svg
              viewBox="0 0 1200 320" preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' }}
            >
              <path
                d="M -20 60 C 220 60, 260 240, 560 220 S 900 90 1220 130"
                fill="none" stroke="rgba(247,178,5,0.4)" strokeWidth="2"
                strokeDasharray="3 11" strokeLinecap="round"
              />
              <circle cx="220" cy="93" r="4" fill="rgba(247,178,5,0.5)" />
              <circle cx="560" cy="220" r="4" fill="rgba(247,178,5,0.5)" />
              <circle cx="900" cy="150" r="5" fill={COLORS.gold} />
              <circle cx="900" cy="150" r="10" fill="none" stroke={COLORS.gold} strokeWidth="1.5" opacity="0.5" />
            </svg>
            <div style={{ position: 'relative', zIndex: 1 }} data-aos="fade-up" data-aos-delay="0">
              <div style={styles.ctaEyebrow}><FaHeadset size={13} /> {t('servicePageTemplate.emergencyLine', '24/7 Emergency Line')}</div>
              <h2 style={styles.ctaH2}>{t('servicePageTemplate.needRightNow', 'Need {{service}} Right Now?', { service: tc.schemaName })}</h2>
              <p style={styles.ctaP}>
                {t('servicePageTemplate.ctaBody', "Our team is on standby across Dubai. One tap or call is all it takes — we're already on our way.")}
              </p>
            </div>
            <div
              style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap' }}
              className="svc-cta-actions"
              data-aos="fade-up"
              data-aos-delay="180"
            >
              <button onClick={handleCall} style={styles.btnPrimary}><FaPhoneAlt size={13} /> {t('servicePageTemplate.callNow', 'Call Now')}</button>
              <button onClick={handleWhatsApp} style={styles.btnGreen}><FaWhatsapp size={16} /> {t('servicePageTemplate.whatsapp', 'WhatsApp')}</button>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <section style={{ ...styles.section, background: '#fff', paddingTop: '32px' }} className="svc-section">
          <div style={{ ...styles.sectionInner, maxWidth: '780px' }} className="svc-section-inner">
            <span style={styles.eyebrow}>{t('servicePageTemplate.faqEyebrow', 'FAQ')}</span>
            <h2 style={styles.sectionH2} className="svc-section-h2">{t('servicePageTemplate.faqHeading', 'Frequently Asked Questions')}</h2>
            <div style={{ marginTop: '32px' }}>
              {tc.faqs.map((faq, i) => (
                <div key={i} style={styles.faqItem} className="svc-faq-item">
                  <button
                    style={styles.faqQ}
                    className="svc-faq-q"
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
                    <div style={styles.faqA} className="svc-faq-a">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section style={{ ...styles.section, background: COLORS.bgAlt, borderTop: `1px solid ${COLORS.line}` }} className="svc-section">
          <div style={styles.sectionInner} className="svc-section-inner">
            <span style={styles.eyebrow}>{t('servicePageTemplate.exploreMore', 'Explore More')}</span>
            <h2 style={{ ...styles.sectionH2, marginBottom: '32px' }} className="svc-section-h2">{t('servicePageTemplate.otherServices', 'Our Other Services in Dubai')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }} className="svc-grid4">
              {relatedServices.map(svc => (
                <Link
                  key={svc.href}
                  to={langLink(svc.href)}
                  viewTransition
                  style={styles.svcCard}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = COLORS.gold;
                    e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.08)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    prefetchRoute(langLink(svc.href));
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = COLORS.line;
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={styles.svcCardIconWrap}><svc.Icon size={20} /></div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: COLORS.ink, margin: 0 }}>
                    {t(`servicePages.${svc.href.slice(1)}.schemaName`, svc.label)}
                  </p>
                  <span style={styles.svcCardLink}>{t('servicePageTemplate.learnMore', 'Learn More')} <ArrowRight size={10} /></span>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: '36px', paddingTop: '28px', borderTop: `1px solid ${COLORS.line}` }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: COLORS.ink, marginRight: '12px' }}>{t('servicePageTemplate.serviceAreasLabel', 'Service Areas:')}</span>
              {ALL_LOCATIONS.map(loc => (
                <Link key={loc.href} to={langLink(loc.href)} onMouseEnter={() => prefetchRoute(langLink(loc.href))} viewTransition style={{ ...styles.linkPill, marginRight: '8px', marginBottom: '8px' }}>
                  {t(`servicePageTemplate.areaNames.${slugify(loc.label)}`, loc.label)}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}