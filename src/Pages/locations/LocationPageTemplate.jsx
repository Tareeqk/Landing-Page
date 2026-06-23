// pages/locations/LocationPageTemplate.jsx
// v3: richer visuals (inline SVG illustrations + decorative shapes), refined icons,
//     "Read more / less" for long text, full mobile responsiveness

import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServiceSchema from '../../schemas/ServiceSchema';
import FAQSchema from '../../schemas/FAQSchema';
import useLangLink from '../../hooks/useLangLink';
import { Icon } from 'lucide-react';

// ─────────────────────────── ICONS ───────────────────────────
// All custom inline SVGs — no external dependency

const IconPhone = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
    <path d="M9 7h6M9 11h6M9 15h4" />
    <circle cx="12" cy="19" r="0.8" fill={color} stroke="none" />
  </svg>
);
const IconWhatsApp = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.518 3.662 1.42 5.18L2 22l4.957-1.387A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.93 13.67c-.2.563-.994 1.05-1.628 1.19-.432.09-.997.162-2.896-.622-2.432-1-3.992-3.47-4.115-3.631-.119-.162-.997-1.327-.997-2.528s.628-1.79.87-2.042c.243-.253.53-.316.707-.316l.508.01c.162.006.38-.062.596.456.221.533.748 1.834.814 1.968.066.135.11.292.021.471-.088.18-.133.292-.264.452-.132.16-.278.357-.397.48-.133.134-.272.28-.116.549.155.269.69 1.14 1.482 1.846 1.018.908 1.875 1.19 2.143 1.323.268.132.424.11.58-.066.156-.176.668-.78.847-1.048.179-.268.358-.224.604-.134.246.09 1.561.737 1.829.871.268.135.447.2.513.313.066.11.066.643-.133 1.206z" />
  </svg>
);
const IconPin = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const IconClock = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14.5" />
  </svg>
);
const IconStar = ({ size = 16, color = '#fbbf24', filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"
    fill={filled ? color : 'none'} stroke={color} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.63 22 9.27 16.5 14 18.18 21 12 17.27 5.82 21 7.5 14 2 9.27 8.91 8.63 12 2" />
  </svg>
);
const IconShield = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v6c0 5.2 3.4 9.8 8 11 4.6-1.2 8-5.8 8-11V6l-8-4z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconUsers = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconTruck = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v4h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const IconBolt = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconWrench = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconGas = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 22V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
    <path d="M2 22h12" />
    <path d="M13 8h2l2 2v3l-2 1v4" />
    <path d="M7 10v4" />
  </svg>
);
const IconAlert = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconCheckCircle = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconArrowRight = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconChevronDown = ({ size = 18, color = 'currentColor', rotated = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: rotated ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─────────────────────── DECORATIVE SVGs ────────────────────────

const DotGrid = ({ color = 'rgba(251,191,36,0.18)', size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" style={{ position: 'absolute', pointerEvents: 'none' }}>
    {Array.from({ length: 6 }).map((_, row) =>
      Array.from({ length: 6 }).map((_, col) => (
        <circle key={`${row}-${col}`} cx={10 + col * 20} cy={10 + row * 20} r="2.5" fill={color} />
      ))
    )}
  </svg>
);



// Process step icons as SVG shapes
const ProcessStepIcon = ({ step }) => {
  const icons = [
    // 1 — phone call
    <IconPhone size={22} color="#000" />,
    // 2 — truck dispatched
    <IconTruck size={22} color="#000" />,
    // 3 — location pin
    <IconPin size={22} color="#000" />,
    // 4 — checkmark
    <IconCheckCircle size={22} color="#000" />,
  ];
  return icons[step] || null;
};

// ─────────────────────── SERVICE ICON MAP ────────────────────────

const SERVICE_ICONS = {
  'Car Recovery': <IconTruck size={26} color="#92400e" />,
  'Towing Service': <IconTruck size={26} color="#92400e" />,
  'Battery Boost': <IconBolt size={26} color="#92400e" />,
  'Flat Tyre Repair': <IconWrench size={26} color="#92400e" />,
  'Fuel Delivery': <IconGas size={26} color="#92400e" />,
  'Accident Recovery': <IconAlert size={26} color="#92400e" />,
};

// ─────────────────────── HELPERS ────────────────────────────────

const titleCase = (str = '') => str.replace(/\b\w/g, (c) => c.toUpperCase());

// "Read more / less" component
function ExpandableText({ text, limit = 220, style = {} }) {
  const [expanded, setExpanded] = React.useState(false);
  const needsTrunc = text && text.length > limit;
  const display = needsTrunc && !expanded ? text.slice(0, limit).trimEnd() + '…' : text;
  return (
    <div style={style}>
      <p style={{ color: '#6b7280', lineHeight: 1.75, fontSize: '16px', margin: 0 }}>{display}</p>
      {needsTrunc && (
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            marginTop: '10px', background: 'none', border: 'none', cursor: 'pointer',
            color: '#fbbf24', fontWeight: 700, fontSize: '14px', padding: 0,
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontFamily: 'inherit',
          }}
        >
          {expanded ? 'Read less' : 'Read more'}
          <IconChevronDown size={14} color="#fbbf24" rotated={expanded} />
        </button>
      )}
    </div>
  );
}

// ─────────────────────── DATA ───────────────────────────────────

const ALL_SERVICES = [
  { name: 'Car Recovery', href: '/car-recovery-dubai' },
  { name: 'Towing Service', href: '/towing-service-dubai' },
  { name: 'Battery Boost', href: '/battery-service-dubai' },
  { name: 'Flat Tyre Repair', href: '/flat-tyre-repair-dubai' },
  { name: 'Fuel Delivery', href: '/fuel-delivery-dubai' },
  { name: 'Accident Recovery', href: '/accident-recovery-dubai' },
];

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

// ─────────────────────── STYLES ─────────────────────────────────

const S = {
  page: { fontFamily: "'Syne', 'DM Sans', sans-serif" },

  // ── Hero ──
  hero: {
    position: 'relative', width: '100%',
    minHeight: 'clamp(480px, 58vw, 560px)',
    display: 'flex', alignItems: 'flex-end',
    overflow: 'hidden', color: '#fff',
  },
  heroBg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', objectPosition: '68% center', zIndex: 0,
  },
  heroOverlay: {
    position: 'absolute', inset: 0, zIndex: 1,
    background: 'linear-gradient(100deg,rgba(5,5,5,0.97) 0%,rgba(5,5,5,0.84) 28%,rgba(5,5,5,0.46) 54%,rgba(5,5,5,0.12) 100%)',
  },
  heroInner: {
    position: 'relative', zIndex: 2, maxWidth: '1320px', margin: '0 auto',
    width: '100%', padding: '0 20px clamp(28px,4vw,44px)',
  },
  heroRow: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    gap: '24px', flexWrap: 'wrap',
  },
  heroContent: { maxWidth: '600px', flex: '1 1 320px' },
  heroBadgeRow: {
    display: 'flex', alignItems: 'center', gap: '10px',
    flexWrap: 'wrap', marginBottom: '24px',
  },
  badge247: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(251,191,36,0.14)', border: '1.5px solid rgba(251,191,36,0.55)',
    borderRadius: '100px', padding: '6px 14px',
    fontSize: '11.5px', fontWeight: 800, letterSpacing: '1.5px',
    color: '#fbbf24', textTransform: 'uppercase',
  },
  badge247Dot: {
    width: '7px', height: '7px', borderRadius: '50%',
    background: '#fbbf24', flexShrink: 0,
  },
  badgeArea: {
    display: 'inline-flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.28)',
    borderRadius: '100px', padding: '6px 14px',
    fontSize: '11.5px', fontWeight: 700, letterSpacing: '1.5px',
    color: '#e5e7eb', textTransform: 'uppercase',
  },
  heroH1: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
    lineHeight: 1.07, letterSpacing: '-0.025em', color: '#fff', margin: 0,
  },
  heroH1Accent: { display: 'block', color: '#fbbf24' },
  heroUnderline: {
    width: '56px', height: '4px', borderRadius: '4px',
    background: '#fbbf24', margin: '18px 0 20px',
  },
  heroSub: {
    fontSize: 'clamp(15px,2.2vw,17px)', color: '#d1d5db', lineHeight: 1.65,
    maxWidth: '460px', marginBottom: '28px',
  },
  heroCtaRow: {
    display: 'flex', alignItems: 'stretch', gap: '12px',
    flexWrap: 'wrap', marginBottom: '28px',
  },
  heroBtn: {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    padding: '13px 20px', borderRadius: '12px', border: 'none',
    cursor: 'pointer', textDecoration: 'none', fontFamily: 'inherit',
    minWidth: '140px',
  },
  heroBtnTitle: { fontSize: '14px', fontWeight: 800, lineHeight: 1.25 },
  heroBtnSub: { fontSize: '11px', fontWeight: 500, lineHeight: 1.3, marginTop: '1px' },

  // floating card
  floatingCard: {
    width: '270px', flexShrink: 0,
    background: 'rgba(8,8,8,0.82)', backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1.5px solid rgba(251,191,36,0.4)', borderRadius: '18px',
    padding: '20px',
  },
  floatingCardTop: { display: 'flex', alignItems: 'flex-start', gap: '12px' },
  floatingCardIconWrap: {
    width: '40px', height: '40px', borderRadius: '50%', background: '#fbbf24',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  floatingCardTitle: { fontSize: '14px', fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: '4px' },
  floatingCardSub: { fontSize: '11.5px', color: '#9ca3af', lineHeight: 1.5 },
  floatingCardDivider: { height: '1px', background: 'rgba(255,255,255,0.1)', margin: '14px 0' },
  floatingCardStats: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' },
  floatingCardStat: {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontSize: '12px', fontWeight: 600, color: '#e5e7eb',
  },

  // ── Shared section / typography ──
  section: { padding: 'clamp(48px,7vw,80px) 0' },
  inner: { maxWidth: '1140px', margin: '0 auto', padding: '0 20px' },
  eyebrow: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
    textTransform: 'uppercase', color: '#fbbf24',
    marginBottom: '12px', display: 'block',
  },
  h2: {
    fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)', fontWeight: 800,
    color: '#111', marginBottom: '14px', letterSpacing: '-0.022em',
    lineHeight: 1.18,
  },
  p: { color: '#6b7280', lineHeight: 1.75, fontSize: '16px' },

  // ── Stat grid ──
  statGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px',
  },
  statCard: (dark = false) => ({
    background: dark ? '#111' : '#f9fafb', borderRadius: '14px',
    padding: '22px 18px',
    border: `1.5px solid ${dark ? '#222' : '#f0f0f0'}`,
  }),
  statNum: (dark = false) => ({
    fontSize: '22px', fontWeight: 800,
    color: dark ? '#fbbf24' : '#111', marginBottom: '4px',
  }),
  statLabel: (dark = false) => ({
    fontSize: '12px', fontWeight: 600,
    color: dark ? '#9ca3af' : '#6b7280',
  }),

  // ── Service cards ──
  svcGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '14px',
  },
  svcCard: {
    display: 'block', textDecoration: 'none',
    border: '1.5px solid #e5e7eb', borderRadius: '16px',
    padding: '24px 16px 20px', textAlign: 'center',
    transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
    background: '#fff',
  },
  svcIconWrap: {
    width: '56px', height: '56px', borderRadius: '14px',
    background: '#fef3c7', display: 'flex', alignItems: 'center',
    justifyContent: 'center', margin: '0 auto 12px',
  },

  // ── Gallery ──
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  galleryItem: {
    position: 'relative', borderRadius: '18px', overflow: 'hidden',
    aspectRatio: '4 / 3', background: '#f3f4f6',
    boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
  },
  galleryImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  galleryCaption: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: '20px 16px 14px', color: '#fff', fontSize: '13px', fontWeight: 700,
    background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)',
  },

  // ── Response process steps ──
  stepRow: {
    display: 'flex', alignItems: 'flex-start', gap: '16px',
    padding: '20px 0', borderBottom: '1px solid #f3f4f6',
  },
  stepNum: {
    width: '40px', height: '40px', borderRadius: '50%',
    background: '#fbbf24', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0, marginTop: '2px',
  },

  // ── CTA block ──
  ctaWrap: {
    position: 'relative', overflow: 'hidden',
    background: '#0c0c0c', borderRadius: '24px',
    padding: 'clamp(48px,6vw,72px) clamp(20px,5vw,48px)',
    textAlign: 'center', color: '#fff',
    backgroundImage: 'radial-gradient(ellipse at 60% 0%, rgba(251,191,36,0.1) 0%, transparent 55%)',
  },
  ctaBtnRow: {
    display: 'flex', gap: '12px', justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#fbbf24', color: '#000', border: 'none',
    padding: '15px 30px', borderRadius: '12px', fontSize: '15px',
    fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    transition: 'filter 0.2s, transform 0.2s',
  },
  btnGreen: {
    background: '#25D366', color: '#fff', border: 'none',
    padding: '15px 30px', borderRadius: '12px', fontSize: '15px',
    fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    transition: 'filter 0.2s, transform 0.2s',
  },

  // ── FAQ ──
  faqQ: {
    width: '100%', textAlign: 'left', padding: '20px 0',
    background: 'none', border: 'none', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: '15px', fontWeight: 700, color: '#111', gap: '16px',
    borderBottom: '1px solid #f0f0f0', fontFamily: 'inherit',
  },

  // ── Pills ──
  linkPill: {
    display: 'inline-flex', alignItems: 'center',
    border: '1.5px solid #fbbf24', color: '#111',
    padding: '8px 18px', borderRadius: '100px',
    fontSize: '13px', fontWeight: 700, textDecoration: 'none',
    transition: 'background 0.2s, color 0.2s',
  },
};

// ─────────────────────── COMPONENT ──────────────────────────────

export default function LocationPageTemplate({ config }) {
  const { lang } = useParams();
  const langLink = useLangLink();
  const schemaFaqs = config.faqs.map(f => ({ question: f.q, answer: f.a }));
  const [openFaq, setOpenFaq] = React.useState(null);

  const handleCall = () => { window.location.href = 'tel:+97142232269'; };
  const handleWhatsApp = () => { window.open('https://wa.me/97142232269', '_blank'); };

  const currentHref = `/${config.slug}`;
  const otherLocations = ALL_LOCATIONS.filter(l => l.href !== currentHref);

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

      {/* ── GLOBAL MICRO-STYLES ── */}
      <style>{`
        a, button { outline-offset: 2px; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #fbbf24; border-radius: 6px;
        }
        .tk-link-pill:hover { background: #fbbf24 !important; color: #000 !important; }
        .tk-svc-card:hover {
          border-color: #fbbf24 !important;
          box-shadow: 0 6px 24px rgba(251,191,36,0.18) !important;
          transform: translateY(-3px) !important;
        }
        .tk-cta-btn:hover { filter: brightness(1.08); transform: translateY(-2px); }
        @media (max-width: 860px) {
          .tk-hero-floating { display: none !important; }
        }
        @media (max-width: 600px) {
          .tk-hero-cta-row { flex-direction: column !important; }
          .tk-hero-cta-row button,
          .tk-hero-cta-row a { width: 100% !important; justify-content: center; }
          .tk-stat-grid { grid-template-columns: 1fr 1fr !important; }
          .tk-svc-grid { grid-template-columns: 1fr 1fr !important; }
          .tk-gallery-grid { grid-template-columns: 1fr !important; }
          .tk-process-grid { grid-template-columns: 1fr !important; }
          .tk-footer-grid { grid-template-columns: 1fr !important; }
          .tk-cta-btns { flex-direction: column !important; align-items: stretch !important; }
          .tk-cta-btns button { width: 100% !important; justify-content: center !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tk-svc-card, .tk-cta-btn { transition: none !important; }
        }
      `}</style>

      {/* ── SCHEMAS ── */}
      <ServiceSchema service={{
        name: `Car Recovery ${config.area}`,
        url: `https://www.tareeqk.ae/${lang}/${config.slug}`,
        description: config.metaDesc,
        image: `https://www.tareeqk.ae${config.heroImage}`,
        areas: [config.area, 'Dubai', 'UAE'],
        serviceType: 'Car Recovery',
      }} />
      <FAQSchema faqs={schemaFaqs} />

      {/* ══════════════════════════════════
              HERO
      ══════════════════════════════════ */}
      <section style={S.hero}>
        <img src={config.heroImage} alt={config.heroAlt} style={S.heroBg} loading="eager" />
        <div style={S.heroOverlay} />

        {/* decorative dots top-right */}
        <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 2, opacity: 0.6 }}>
          <DotGrid color="rgba(251,191,36,0.22)" size={100} />
        </div>

        <div style={S.heroInner}>
          <div style={S.heroRow} data-aos="fade-up">
            <div style={S.heroContent}>
              <div style={S.heroBadgeRow}>
                <span style={S.badge247}>
                  <span style={S.badge247Dot} />
                  24/7 Service
                </span>
                <span style={S.badgeArea}>{config.area} • Dubai</span>
              </div>

              <h1 style={S.heroH1}>
                Car Recovery in
                <span style={S.heroH1Accent}>{config.area}</span>
              </h1>
              <div style={S.heroUnderline} />

              <p style={S.heroSub}>
                Stuck in {config.area}? We reach you in {config.responseTime} — day or night, every day.
              </p>

              <div style={S.heroCtaRow} className="tk-hero-cta-row">
                <button onClick={handleCall} className="tk-cta-btn"
                  style={{ ...S.heroBtn, background: '#fbbf24', color: '#000' }}>
                  <IconPhone size={18} color="#000" />
                  <span>
                    <div style={S.heroBtnTitle}>Call Now</div>
                    <div style={{ ...S.heroBtnSub, color: 'rgba(0,0,0,0.6)' }}>Instant Response</div>
                  </span>
                </button>
                <button onClick={handleWhatsApp} className="tk-cta-btn"
                  style={{ ...S.heroBtn, background: '#25D366', color: '#fff' }}>
                  <IconWhatsApp size={18} color="#fff" />
                  <span>
                    <div style={S.heroBtnTitle}>WhatsApp</div>
                    <div style={{ ...S.heroBtnSub, color: 'rgba(255,255,255,0.82)' }}>Chat Now</div>
                  </span>
                </button>
              </div>
            </div>

            {/* Floating info card — hidden on mobile */}
            <div style={S.floatingCard} className="tk-hero-floating">
              <div style={S.floatingCardTop}>
                <div style={S.floatingCardIconWrap}>
                  <IconShield size={20} color="#000" />
                </div>
                <div>
                  <div style={S.floatingCardTitle}>Reliable. Fast. Professional.</div>
                  <div style={S.floatingCardSub}>RTA Licensed · Fully Insured · Modern Fleet</div>
                </div>
              </div>
              <div style={S.floatingCardDivider} />
              <div style={S.floatingCardStats}>
                <span style={S.floatingCardStat}>
                  <IconTruck size={14} color="#fbbf24" filled /> Live Tracking
                </span>
                <span style={S.floatingCardStat}>
                  <IconUsers size={14} color="#fbbf24" /> 5,000+ Customers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
              ABOUT THE AREA
      ══════════════════════════════════ */}
      <section style={{ ...S.section, background: '#fff' }}>
        <div style={S.inner}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(32px,5vw,56px)', alignItems: 'center',
          }}>
            {/* Text */}
            <div data-aos="fade-right">
              <span style={S.eyebrow}>Serving {config.area}</span>
              <h2 style={S.h2}>Roadside Assistance in {config.area}, Dubai</h2>
              <ExpandableText text={config.areaDesc} limit={220} />
              <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <a href={langLink('/car-recovery-dubai')} className="tk-link-pill" style={S.linkPill}>
                  All Dubai Services <IconArrowRight size={13} color="#111" />
                </a>
                <a href={langLink('/about')} className="tk-link-pill" style={S.linkPill}>
                  About Tareeqk <IconArrowRight size={13} color="#111" />
                </a>
              </div>
            </div>

            {/* Right column: real photo + stat cards */}
            <div data-aos="fade-left">
              {/* Real photo */}
              <div style={{
                borderRadius: '20px', overflow: 'hidden',
                position: 'relative', aspectRatio: '16/9',
                marginBottom: '16px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
              }}>
                <img
                  src={config.heroImage}
                  alt={config.heroAlt}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    display: 'block',
                  }}
                />
                {/* Subtle bottom gradient + badge */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
                }} />
                <div style={{
                  position: 'absolute', bottom: '14px', left: '16px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(251,191,36,0.4)',
                  borderRadius: '100px', padding: '6px 14px',
                }}>
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#4ade80', flexShrink: 0,
                    boxShadow: '0 0 6px #4ade80',
                  }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                    Units active in {config.area}
                  </span>
                </div>
              </div>

              {/* Stat cards */}
              <div style={S.statGrid} className="tk-stat-grid">
                {[
                  { num: config.responseTime, label: 'Avg. Response', dark: true },
                  { num: '24/7', label: 'Available', dark: false },
                  { num: '', label: 'Live Tracking', dark: false },
                  { num: 'RTA', label: 'Licensed', dark: false },
                ].map((s, i) => (
                  <div key={i} style={S.statCard(s.dark)}>
                    <div style={S.statNum(s.dark)}>{s.num}</div>
                    <div style={S.statLabel(s.dark)}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
              GALLERY
      ══════════════════════════════════ */}
      <section style={{ ...S.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.inner}>
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto 36px' }} data-aos="fade-up">
            <span style={S.eyebrow}>On The Ground</span>
            <h2 style={S.h2}>Tareeqk Working in {config.area}</h2>
            <p style={S.p}>Real units, real equipment, real coverage — every time you call.</p>
          </div>

          {/* If no real images yet, show illustrated placeholder tiles */}
          <div style={S.galleryGrid} className="tk-gallery-grid" data-aos="fade-up">
            {galleryImages.map((img, i) => (
              <div key={i} style={S.galleryItem}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{ ...S.galleryImg, objectPosition: img.pos || 'center' }}
                />
                {/* Gradient + caption */}
                <div style={S.galleryCaption}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconCheckCircle size={14} color="#fbbf24" />
                    {img.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
              SERVICES
      ══════════════════════════════════ */}
      <section style={{ ...S.section, background: '#fff' }}>
        <div style={S.inner}>
          <div style={{ marginBottom: '36px' }} data-aos="fade-up">
            <span style={S.eyebrow}>What We Offer</span>
            <h2 style={S.h2}>Services Available in {config.area}</h2>
          </div>
          <div style={S.svcGrid} className="tk-svc-grid">
            {ALL_SERVICES.map(svc => (
              <a key={svc.name} href={langLink(svc.href)} className="tk-svc-card" style={S.svcCard}>
                <div style={S.svcIconWrap}>
                  {SERVICE_ICONS[svc.name] || <IconWrench size={26} color="#92400e" />}
                </div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111', margin: 0 }}>{svc.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
              RESPONSE PROCESS
      ══════════════════════════════════ */}
      <section style={{ ...S.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.inner}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(32px,5vw,52px)', alignItems: 'start',
          }} className="tk-process-grid">
            {/* Left */}
            <div data-aos="fade-right">
              <span style={S.eyebrow}>Response Time</span>
              <h2 style={S.h2}>How fast do we reach {config.area}?</h2>
              <ExpandableText text={config.responseDesc} limit={200} />
              <div style={{ marginTop: '20px' }}>
                <span style={{
                  background: '#fef3c7', border: '1px solid #fde68a',
                  color: '#92400e', padding: '7px 18px', borderRadius: '100px',
                  fontSize: '13px', fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                }}>
                  <IconClock size={14} color="#92400e" />
                  Avg. {config.responseTime} dispatch
                </span>
              </div>
            </div>

            {/* Steps */}
            <div data-aos="fade-left">
              {[
                { label: 'App or call request placed' },
                { label: 'Nearest unit dispatched immediately' },
                { label: `Technician on-site in ~${config.responseTime}` },
                { label: 'Vehicle recovered or issue resolved' },
              ].map((step, i) => (
                <div key={i} style={S.stepRow}>
                  <div style={S.stepNum}>
                    <ProcessStepIcon step={i} />
                  </div>
                  <div style={{ paddingTop: '8px' }}>
                    <div style={{ fontWeight: 600, color: '#111', fontSize: '15px', lineHeight: 1.4 }}>
                      {step.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
              CTA BLOCK — photo + split layout
      ══════════════════════════════════ */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 20px clamp(48px,7vw,80px)' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: '24px', minHeight: '360px',
          display: 'flex', alignItems: 'stretch',
        }} data-aos="fade-up">
          {/* Background photo */}
          <img
            src={config.heroImage}
            alt={config.heroAlt}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: '60% center',
            }}
          />
          {/* Dark overlay — heavier on the left where text is */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(100deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.88) 38%, rgba(5,5,5,0.55) 65%, rgba(5,5,5,0.22) 100%)',
          }} />
          {/* Yellow accent glow top-right */}
          <div style={{
            position: 'absolute', top: -80, right: -80,
            width: '320px', height: '320px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 2,
            width: '100%', maxWidth: '1100px', margin: '0 auto',
            padding: 'clamp(40px,5vw,64px) clamp(24px,4vw,56px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {/* Left: copy + trust signals */}
            <div style={{ flex: '1 1 320px', maxWidth: '520px' }}>
              {/* Live badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.35)',
                borderRadius: '100px', padding: '5px 14px',
                marginBottom: '20px',
              }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#4ade80', boxShadow: '0 0 8px #4ade80',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#4ade80', letterSpacing: '0.5px' }}>
                  Units on standby now
                </span>
              </div>

              <h2 style={{
                fontSize: 'clamp(1.7rem,3.2vw,2.6rem)', fontWeight: 800,
                color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.1,
                marginBottom: '14px',
              }}>
                Need Help in<br />
                <span style={{ color: '#fbbf24' }}>{config.area}</span> Right Now?
              </h2>

              <p style={{
                color: '#d1d5db', fontSize: '16px', lineHeight: 1.65,
                marginBottom: '28px', maxWidth: '400px',
              }}>
                One call and we're already moving. Our nearest unit reaches you in {config.responseTime} — day or night.
              </p>

              {/* Trust row */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '20px',
              }}>
                {[
                  { icon: <IconShield size={15} color="#fbbf24" />, text: 'RTA Licensed' },
                  { icon: <IconTruck size={14} color="#fbbf24" filled />, text: 'Live Tracking ' },
                  { icon: <IconUsers size={15} color="#fbbf24" />, text: 'Rescued' },
                ].map((t, i) => (
                  <span key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '13px', fontWeight: 600, color: '#e5e7eb',
                  }}>
                    {t.icon} {t.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: action buttons */}
            <div style={{
              flex: '0 1 auto',
              display: 'flex', flexDirection: 'column', gap: '12px',
              minWidth: '220px',
            }} className="tk-cta-action-col">
              <button onClick={handleCall} className="tk-cta-btn" style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: '#fbbf24', color: '#000', border: 'none',
                padding: '18px 28px', borderRadius: '14px',
                cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                transition: 'filter 0.2s, transform 0.2s',
                textAlign: 'left',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: 'rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconPhone size={20} color="#000" />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.2 }}>Call Now</div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(0,0,0,0.6)', marginTop: '2px' }}>
                    Instant dispatch
                  </div>
                </div>
              </button>

              <button onClick={handleWhatsApp} className="tk-cta-btn" style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.2)',
                padding: '18px 28px', borderRadius: '14px',
                cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                transition: 'filter 0.2s, transform 0.2s, background 0.2s',
                textAlign: 'left',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px',
                  background: '#25D366',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <IconWhatsApp size={22} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1.2 }}>WhatsApp</div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
                    Chat with us
                  </div>
                </div>
              </button>

              <p style={{
                fontSize: '11.5px', color: 'rgba(255,255,255,0.35)',
                textAlign: 'center', margin: 0, lineHeight: 1.5,
              }}>
                Average response · {config.responseTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .tk-cta-action-col { width: 100% !important; min-width: unset !important; }
        }
        .tk-cta-btn:hover { filter: brightness(1.07); transform: translateY(-2px); }
      `}</style>

      {/* ══════════════════════════════════
              FAQ
      ══════════════════════════════════ */}
      <section style={{ ...S.section, background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
        <div style={{ ...S.inner, maxWidth: '780px' }}>
          <span style={S.eyebrow}>FAQ</span>
          <h2 style={S.h2}>FAQs — Car Recovery in {config.area}</h2>
          <div style={{ marginTop: '28px', borderTop: '1px solid #f0f0f0' }}>
            {config.faqs.map((faq, i) => (
              <div key={i}>
                <button
                  style={S.faqQ}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ flex: 1 }}>{faq.q}</span>
                  <IconChevronDown size={18} color="#fbbf24" rotated={openFaq === i} />
                </button>
                <div style={{
                  maxHeight: openFaq === i ? '600px' : '0',
                  overflow: 'hidden', transition: 'max-height 0.32s ease',
                }}>
                  <div style={{
                    padding: '4px 0 20px', color: '#6b7280',
                    lineHeight: 1.75, fontSize: '15px',
                  }}>
                    {/* Expandable answer for long FAQ answers */}
                    {faq.a && faq.a.length > 260 ? (
                      <ExpandableText text={faq.a} limit={260} />
                    ) : faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
              OTHER LOCATIONS + SERVICES
      ══════════════════════════════════ */}
      <section style={{ ...S.section, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
        <div style={S.inner}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
          }} className="tk-footer-grid">
            <div>
              <span style={S.eyebrow}>Other Areas</span>
              <h2 style={{ ...S.h2, fontSize: '1.35rem' }}>We Also Cover</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {otherLocations.map(loc => (
                  <a key={loc.href} href={langLink(loc.href)} className="tk-link-pill" style={S.linkPill}>
                    {loc.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <span style={S.eyebrow}>All Services</span>
              <h2 style={{ ...S.h2, fontSize: '1.35rem' }}>Roadside Services</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ALL_SERVICES.map(svc => (
                  <a key={svc.href} href={langLink(svc.href)} className="tk-link-pill" style={S.linkPill}>
                    {svc.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <a href={langLink('/about')} className="tk-link-pill"
              style={{ ...S.linkPill, marginRight: '10px' }}>About Tareeqk</a>
            <a href={langLink('/contact')} className="tk-link-pill" style={S.linkPill}>Contact Us</a>
          </div>
        </div>
      </section>
    </>
  );
}