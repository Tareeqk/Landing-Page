// pages/AllAreas.jsx
//
// Hub page listing every location Tareeqk covers. The footer only ever
// shows a curated top-10 (see AREAS in Components/Footer.jsx, capped there
// specifically so the footer doesn't grow unbounded as more areas get
// added) with a "View All Areas" link pointing here. This is the one place
// meant to hold the full list, and it's the page to extend whenever a new
// area is added — the footer itself shouldn't need touching again.
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowRight, MapPin } from 'lucide-react';

import useLangLink from '../hooks/useLangLink';
import HreflangTags from '../Components/HreflangTags';
import BreadcrumbSchema from '../schemas/BreadcrumbSchema';
import { prefetchRoute } from '../routePrefetch';

// Same 19 slugs as LOCATION_SLUGS in App.jsx / site-routes.mjs / Footer.jsx
// — this codebase keeps one literal copy per file that needs it rather
// than a shared module (see the identical list in Pages/locations/index.jsx),
// so this follows that existing convention.
const LOCATION_SLUGS = [
  'car-recovery-dubai-marina',
  'car-recovery-business-bay',
  'car-recovery-downtown-dubai',
  'car-recovery-deira',
  'car-recovery-bur-dubai',
  'car-recovery-al-barsha',
  'car-recovery-jumeirah',
  'car-recovery-jvc',
  'car-recovery-jlt',
  'car-recovery-dubai-silicon-oasis',
  'car-recovery-international-city',
  'car-recovery-dubai-investment-park',
  'car-recovery-dubai-sports-city',
  'car-recovery-motor-city',
  'car-recovery-mirdif',
  'car-recovery-al-qusais',
  'car-recovery-al-quoz',
  'car-recovery-jebel-ali',
  'car-recovery-palm-jumeirah',
  'car-recovery-difc',
  'car-recovery-dubai-hills-estate',
  'car-recovery-discovery-gardens',
  'car-recovery-al-nahda',
  'car-recovery-barsha-heights',
];

// No photo -- every one of the 19 locations shares the exact same
// heroImage in common.json (/new/Recovery_Van.webp isn't per-area, it's
// the one generic fallback used everywhere), which is invisible on a
// single location page but reads as an obvious bug once 19 identical
// photos are shown side by side here. A compact icon-led row carries the
// area name/response time without leaning on a photo that has zero
// differentiating information, and it's also far denser on mobile than
// a stack of full-width image cards would be.
function AreaCard({ slug, langLink }) {
  const { t } = useTranslation('common');
  const entry = t(slug, { returnObjects: true });

  const to = langLink(`/${slug}`);
  return (
    <Link to={to} onMouseEnter={() => prefetchRoute(to)} viewTransition className="areas-card" data-aos="fade-up">
      <span className="areas-card-icon">
        <MapPin size={17} strokeWidth={2} />
      </span>
      {/* Grouped so the mobile list-strip layout can lay out icon / text /
          cta as three items in a row -- title and response need to stay
          stacked as a unit regardless of whether the card itself is a
          column (desktop grid) or a row (mobile strip). */}
      <span className="areas-card-text">
        <span className="areas-card-title">{entry.area}</span>
        <span className="areas-card-response">
          <Clock size={12} strokeWidth={2} />
          {t('areasPage.respondsIn', { responseTime: entry.responseTime })}
        </span>
      </span>
      <span className="areas-card-cta">
        <span className="areas-card-cta-label">{t('areasPage.cardCta')}</span>
        <ArrowRight size={13} strokeWidth={2} />
      </span>
    </Link>
  );
}

export default function AllAreas() {
  const { t, ready } = useTranslation('common');
  const { lang } = useParams();
  const langLink = useLangLink();

  if (!ready) return null;

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t('meta.areas.title')}</title>
        <meta name="description" content={t('meta.areas.description')} />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/areas/`} />
        <meta property="og:title" content={t('meta.areas.title')} />
        <meta property="og:description" content={t('meta.areas.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tareeqk.ae/${lang}/areas/`} />
        <meta property="og:image" content="https://tareeqk.ae/new/location_hero_banner.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.areas.title')} />
        <meta name="twitter:description" content={t('meta.areas.description')} />
        <meta name="twitter:image" content="https://tareeqk.ae/new/location_hero_banner.webp" />
      </Helmet>
      <HreflangTags path="areas" />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `https://tareeqk.ae/${lang}/` },
          { name: t('areasPage.title') },
        ]}
      />

      {/* Hero -- same shell as FAQs.jsx (full-bleed darkened banner, eyebrow
          + h1 + subtitle), reusing the location pages' own background image
          rather than introducing a new asset. */}
      <section
        style={{
          position: 'relative', width: '100%', minHeight: 'clamp(280px, 38vw, 380px)',
          overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center',
          color: '#fff', textAlign: 'center', padding: '128px 20px 44px', boxSizing: 'border-box',
        }}
      >
        <img
          src="/new/location_hero_banner.webp"
          alt=""
          loading="eager"
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'brightness(0.35)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px' }}>
          <span
            data-aos="fade-up"
            style={{
              display: 'inline-block', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--primary-yellow)', marginBottom: '14px',
            }}
          >
            {t('areasPage.eyebrow')}
          </span>
          <h1
            data-aos="fade-up"
            style={{
              fontSize: 'clamp(1.7rem, 5vw, 2.6rem)', fontWeight: 800,
              letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 12px',
            }}
          >
            {t('areasPage.title')}
          </h1>
          <p
            data-aos="fade-up"
            style={{ fontSize: 'clamp(13.5px, 2vw, 16px)', lineHeight: 1.6 }}
            className="text-gray-300"
          >
            {t('areasPage.subtitle')}
          </p>
        </div>
      </section>

      <style>{`
        .areas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
          max-width: 1180px;
          margin: 0 auto;
          padding: 8px 20px 64px;
        }
        .areas-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          padding: 16px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.08);
          text-decoration: none;
          color: inherit;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .areas-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.10);
          border-color: var(--primary-yellow);
        }
        .areas-card-icon {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: rgba(247,178,5,0.13); color: var(--primary-yellow);
          margin-bottom: 4px;
        }
        .areas-card-text {
          display: flex; flex-direction: column; gap: 5px; width: 100%;
        }
        .areas-card-title {
          font-size: 14.5px; font-weight: 700; letter-spacing: -0.01em; line-height: 1.25;
        }
        .areas-card-response {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11.5px; color: #6b7280;
        }
        .areas-card-cta {
          display: flex; align-items: center; gap: 4px; width: 100%;
          font-size: 12px; font-weight: 700; color: var(--primary-dark-bg, #121212);
          border-top: 1px solid rgba(0,0,0,0.06); margin-top: 8px; padding-top: 10px;
        }
        body.dark .areas-card { background: var(--dark-bg-surface); border-color: var(--dark-border); }
        body.dark .areas-card-cta { color: var(--dark-text-main); border-top-color: var(--dark-border); }

        /* Single-column list strips on mobile instead of a card grid --
           several area names (Dubai Investment Park (DIP), Dubai Silicon
           Oasis, International City) wrap to 2 lines in a narrow 2-column
           card and break the grid's alignment. A full-width row never
           wraps, and a straight vertical scan reads faster than a
           left-right zigzag when someone's hunting for their own area. */
        @media (max-width: 640px) {
          .areas-grid {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 4px 16px 48px;
          }
          .areas-card {
            flex-direction: row;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            border-radius: 14px;
          }
          .areas-card-icon { width: 32px; height: 32px; margin-bottom: 0; }
          .areas-card-title { font-size: 14px; }
          .areas-card-cta {
            width: auto; border-top: none; margin-top: 0; padding-top: 0;
            color: var(--primary-yellow);
          }
          .areas-card-cta-label { display: none; }
        }
      `}</style>

      <div className="areas-grid">
        {LOCATION_SLUGS.map((slug) => (
          <AreaCard key={slug} slug={slug} langLink={langLink} />
        ))}
      </div>
    </>
  );
}
