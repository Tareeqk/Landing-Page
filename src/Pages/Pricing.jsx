// pages/Pricing.jsx
// Explains how a fare is decided without publishing a fixed price list for
// every service. Two distinct pricing paths, matching how the request
// actually works:
//   - Recovery/towing (pickup -> drop-off): calculated from the distance
//     between the two locations.
//   - On-demand, single-location services (battery boost, tyre repair,
//     etc. -- no vehicle is transported): a fixed price for the visit.
// No AED figures live here, only the method -- see llms.txt's own note.

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { MapPinned, Wrench, Eye, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import HreflangTags from '../Components/HreflangTags';
import BreadcrumbSchema from '../schemas/BreadcrumbSchema';
import FAQSchema from '../schemas/FAQSchema';

const COLORS = {
  ink: 'var(--primary-dark-bg)',
  muted: '#6b7280',
  gold: 'var(--primary-yellow)',
  goldDeep: '#92400e',
  line: '#edeef0',
  green: '#25D366',
};

const S = {
  section: { padding: 'clamp(48px,7vw,76px) 0' },
  inner: { maxWidth: '980px', margin: '0 auto', padding: '0 20px' },
  eyebrow: {
    fontSize: '11px', fontWeight: 700, letterSpacing: '3px',
    textTransform: 'uppercase', color: COLORS.gold, marginBottom: '12px', display: 'block',
  },
  h2: {
    fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)', fontWeight: 800,
    color: COLORS.ink, marginBottom: '14px', letterSpacing: '-0.022em', lineHeight: 1.18,
  },
  p: { color: COLORS.muted, lineHeight: 1.75, fontSize: '16px' },
};

// Deliberate mobile treatment instead of letting things just collapse to a
// default single column: the photo/content layout stacks with the photo
// capped to a shorter crop (a full portrait photo above the fold on a
// phone would push everything else below the scroll), the hero crop
// re-centers on the road instead of the sky, and every tap target goes
// full-width instead of shrink-wrapping.
const PRICING_CSS = `
@media (max-width: 860px) {
  .pr-paths-layout { grid-template-columns: 1fr !important; gap: 36px !important; }
  .pr-paths-photo { max-width: 360px; margin: 0 auto; }
  .pr-hero-inner { padding-top: 92px !important; }
  .pr-hero-badges { flex-direction: column !important; align-items: stretch !important; }
  .pr-hero-badge { justify-content: center !important; }
  .pr-cta-actions { flex-direction: column !important; align-items: stretch !important; }
  .pr-cta-actions button { width: 100%; justify-content: center; }
}

@media (max-width: 480px) {
  .pr-paths-photo { aspect-ratio: 4 / 3 !important; }
  .pr-feature-grid { gap: 20px !important; }
}

@media (max-width: 520px) {
  .pr-hero-img { object-position: 62% center !important; }
}
`;

export default function Pricing() {
  const { t } = useTranslation();
  const { lang } = useParams();

  const paths = [
    {
      Icon: MapPinned,
      title: t('pricing.paths.recovery.title', 'Recovery & Towing'),
      desc: t(
        'pricing.paths.recovery.desc',
        'Pickup and drop-off set the distance — longer routes cost more, shorter routes cost less. Calculated per trip.',
      ),
    },
    {
      Icon: Wrench,
      title: t('pricing.paths.onDemand.title', 'On-Demand Services'),
      desc: t(
        'pricing.paths.onDemand.desc',
        "No route to calculate — battery boosts, tyre changes and the like are a set fee at typical distances.",
      ),
    },
  ];

  const faqs = [
    {
      q: t('pricing.faqs.q1', 'How is the price for a tow or recovery decided?'),
      a: t(
        'pricing.faqs.a1',
        'By the distance between where your vehicle is picked up and where it needs to go — the fare is calculated per trip, not a flat rate.',
      ),
    },
    {
      q: t('pricing.faqs.q2', 'Why is a battery boost or tyre change a fixed price?'),
      a: t(
        'pricing.faqs.a2',
        "Those are on-demand, single-location services — nothing is transported, so there's no route to calculate. It's a fixed price for the visit at typical distances; if your location is very far from our coverage, that price adjusts to reflect it.",
      ),
    },
    {
      q: t('pricing.faqs.q3', 'Will I see the price before I confirm?'),
      a: t(
        'pricing.faqs.a3',
        'Yes. Whether it\'s a calculated route fare or a fixed on-demand price, you see it in the app before you confirm your request.',
      ),
    },
    {
      q: t('pricing.faqs.q4', "Why don't you publish a price list?"),
      a: t(
        'pricing.faqs.a4',
        'On-demand services already have a fixed price, but recovery and towing routes vary too much for one number to be accurate — a short local tow and a long cross-city recovery aren\'t the same job, so those are calculated per trip instead.',
      ),
    },
  ];

  // The highlighted-word headline is built from a translator-controlled
  // template ("Priced by the {route}, or one {fixed}") instead of gluing
  // together separate "pre"/"mid" fragment keys in a fixed English word
  // order — Arabic and Urdu need to reorder those clauses to read
  // naturally, which fragment concatenation can't do but a template with
  // placeholders can.
  const headlineTemplate = t('pricing.paths.headlineTemplate', 'Priced by the {route}, or one {fixed}');
  const headlineRouteWord = t('pricing.paths.headlineRouteWord', 'Route');
  const headlineFixedWord = t('pricing.paths.headlineFixedWord', 'Fixed Price');
  const [headlineBeforeRoute, headlineRestAfterRoute = ''] = headlineTemplate.split('{route}');
  const [headlineMid, headlineAfterFixed = ''] = headlineRestAfterRoute.split('{fixed}');

  const handleCall = () => { window.location.href = 'tel:+97142232269'; };
  const handleWhatsApp = () => { window.open('https://wa.me/97142232269', '_blank'); };

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>{t('meta.pricing.title', 'Pricing — How Tareeqk Prices a Job | Tareeqk')}</title>
        <meta
          name="description"
          content={t(
            'meta.pricing.description',
            'Car recovery and towing in Dubai are priced by distance. On-demand services like battery boost have a fixed price. See it before you confirm.',
          )}
        />
        <link rel="canonical" href={`https://tareeqk.ae/${lang}/pricing/`} />
        <meta property="og:title" content={t('meta.pricing.title', 'Pricing — How Tareeqk Prices a Job | Tareeqk')} />
        <meta
          property="og:description"
          content={t(
            'meta.pricing.description',
            'Car recovery and towing in Dubai are priced by distance. On-demand services like battery boost have a fixed price. See it before you confirm.',
          )}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://tareeqk.ae/${lang}/pricing`} />
        <meta property="og:image" content="https://tareeqk.ae/new/pricing_hero_banner.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://tareeqk.ae/new/pricing_hero_banner.webp" />
      </Helmet>
      <HreflangTags path="pricing" />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `https://tareeqk.ae/${lang}` },
          { name: t('navbar.pricing', 'Pricing') },
        ]}
      />
      <FAQSchema faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />
      <style>{PRICING_CSS}</style>

      {/* ── HERO — full-bleed photo + gradient, matching the treatment
              used on About/Service/Location hero sections, instead of a
              flat color block with no imagery. ── */}
      <section style={{
        position: 'relative', width: '100%', overflow: 'hidden',
        minHeight: 'clamp(420px, 48vw, 500px)',
        display: 'flex', alignItems: 'flex-end',
        color: '#fff',
      }}>
        <img
          src="/new/pricing_hero_banner.webp"
          alt=""
          aria-hidden="true"
          loading="eager"
          className="pr-hero-img"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 35%', zIndex: 0,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: `linear-gradient(180deg, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.62) 45%, rgba(8,8,10,0.94) 100%)`,
        }} />
        <div
          className="pr-hero-inner"
          style={{
            position: 'relative', zIndex: 2, maxWidth: '1140px', width: '100%',
            margin: '0 auto', padding: '128px 20px clamp(40px,5vw,60px)', textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px',
              padding: '8px 18px', marginBottom: '22px',
              fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
              color: COLORS.gold, fontWeight: 700,
            }}>
              {t('pricing.hero.eyebrow', 'Pricing')}
            </span>
            <h1 style={{
              fontSize: 'clamp(1.9rem, 4.6vw, 3rem)', fontWeight: 800,
              letterSpacing: '-0.025em', lineHeight: 1.15, margin: '0 0 16px',
            }}>
              {t('pricing.hero.title', 'Two Ways We Price a Job')}
            </h1>
            <p style={{ color: '#d6d8dc', fontSize: 'clamp(14px,2vw,17px)', lineHeight: 1.7, marginBottom: '28px' }}>
              {t(
                'pricing.hero.subtitle',
                "A tow or recovery is priced by the route. An on-demand service like a battery boost is one fixed price. Either way, you see it before you confirm.",
              )}
            </p>
            <div className="pr-hero-badges" style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span className="pr-hero-badge" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.16)', borderRadius: '100px',
                padding: '9px 18px', fontSize: '12.5px', fontWeight: 700, color: '#fff',
              }}>
                <MapPinned size={14} color={COLORS.gold} /> {t('pricing.hero.badgeRoute', 'Route-Based Recovery')}
              </span>
              <span className="pr-hero-badge" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.16)', borderRadius: '100px',
                padding: '9px 18px', fontSize: '12.5px', fontWeight: 700, color: '#fff',
              }}>
                <Wrench size={14} color={COLORS.gold} /> {t('pricing.hero.badgeFixed', 'Fixed On-Demand Price')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE TWO PATHS — photo left, headline with highlighted keywords
              and a compact feature grid right, instead of two identical
              bordered text panels. ── */}
      <section style={{ ...S.section, background: '#fff' }}>
        <div style={{ ...S.inner, maxWidth: '1100px' }}>
          <div
            className="pr-paths-layout"
            style={{
              display: 'grid', gridTemplateColumns: '0.85fr 1.15fr',
              gap: '56px', alignItems: 'center',
            }}
          >
            {/* Left: photo with an accent icon badge overlapping its corner */}
            <div style={{ position: 'relative' }}>
              <div
                className="pr-paths-photo"
                style={{
                  borderRadius: '32px 32px 32px 8px', overflow: 'hidden',
                  aspectRatio: '4 / 5', boxShadow: '0 24px 56px rgba(0,0,0,0.14)',
                }}
              >
                <img
                  src="/new/pricing_paths_photo.webp"
                  alt="Phone showing turn-by-turn route navigation in a car"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: '-16px', left: '-16px',
                width: '60px', height: '60px', borderRadius: '16px',
                background: COLORS.gold, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 10px 26px rgba(247,178,5,0.4)',
              }}>
                <MapPinned size={26} color="#000" />
              </div>
            </div>

            {/* Right: eyebrow, highlighted headline, intro, feature grid */}
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: COLORS.muted, marginBottom: '16px',
              }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: COLORS.gold, flexShrink: 0 }} />
                {t('pricing.paths.eyebrow', 'How It Works')}
              </span>
              <h2 style={{
                fontSize: 'clamp(1.7rem, 3vw, 2.3rem)', fontWeight: 800,
                color: COLORS.ink, lineHeight: 1.25, letterSpacing: '-0.02em', margin: '0 0 18px',
              }}>
                {headlineBeforeRoute}
                <span style={{ background: COLORS.gold, padding: '2px 10px', borderRadius: '8px', display: 'inline-block' }}>
                  {headlineRouteWord}
                </span>
                {headlineMid}
                <span style={{ background: COLORS.gold, padding: '2px 10px', borderRadius: '8px', display: 'inline-block' }}>
                  {headlineFixedWord}
                </span>
                {headlineAfterFixed}
              </h2>
              <p style={S.p}>
                {t(
                  'pricing.paths.intro',
                  "Which one applies depends on the job — a route between two points, or a single on-site visit. Either way, you see the number before you confirm.",
                )}
              </p>

              <div className="pr-feature-grid" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', marginTop: '32px',
              }}>
                {paths.map((path, i) => (
                  <div key={i}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '11px',
                      background: '#fef3c7', color: COLORS.goldDeep,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '10px',
                    }}>
                      <path.Icon size={19} />
                    </div>
                    <div style={{ width: '28px', height: '2px', background: COLORS.gold, marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: COLORS.ink, margin: '0 0 6px' }}>
                      {path.title}
                    </h3>
                    <p style={{ ...S.p, fontSize: '13.5px', lineHeight: 1.6 }}>{path.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Single trust line instead of a second row of cards. */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            marginTop: 'clamp(40px,5vw,56px)', color: COLORS.muted, fontSize: '13.5px', fontWeight: 600,
            flexWrap: 'wrap', textAlign: 'center',
          }}>
            <Eye size={15} color={COLORS.goldDeep} />
            {t('pricing.trustLine', 'Either way, the price is shown in the app before you confirm — no surprises after the job.')}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ ...S.section, background: '#fafafa', borderTop: `1px solid ${COLORS.line}` }}>
        <div style={{ ...S.inner, maxWidth: '760px' }}>
          <div style={{ marginBottom: '24px' }}>
            <span style={S.eyebrow}>{t('pricing.faqs.eyebrow', 'FAQ')}</span>
            <h2 style={S.h2}>{t('pricing.faqs.title', 'Pricing Questions')}</h2>
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderBottom: `1px solid ${COLORS.line}`, padding: '18px 0' }}>
                <summary style={{
                  cursor: 'pointer', listStyle: 'none', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                  fontSize: '15px', fontWeight: 700, color: COLORS.ink,
                }}>
                  {faq.q}
                  <ChevronDown size={18} color={COLORS.gold} style={{ flexShrink: 0 }} />
                </summary>
                <p style={{ ...S.p, marginTop: '12px', fontSize: '14.5px' }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 20px clamp(56px,7vw,84px)', background: '#fafafa' }}>
        <div style={{
          maxWidth: '980px', margin: '0 auto', textAlign: 'center',
          background: `linear-gradient(135deg, ${COLORS.ink}, #15171c)`,
          borderRadius: '24px', padding: 'clamp(40px,6vw,56px) 24px', color: '#fff',
        }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,2.8vw,1.9rem)', fontWeight: 800, marginBottom: '10px' }}>
            {t('pricing.cta.title', 'Request Help and See Your Price Instantly')}
          </h2>
          <p style={{ color: '#9ca3af', maxWidth: '460px', margin: '0 auto 26px', fontSize: '14.5px', lineHeight: 1.65 }}>
            {t('pricing.cta.body', 'Open the app, share your location, and see the exact price before you confirm.')}
          </p>
          <div className="pr-cta-actions" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleCall}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                background: COLORS.gold, color: '#000', border: 'none',
                padding: '14px 26px', borderRadius: '11px', fontSize: '14.5px',
                fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              <Phone size={15} /> {t('pricing.cta.call', 'Call Now')}
            </button>
            <button
              onClick={handleWhatsApp}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                background: COLORS.green, color: '#fff', border: 'none',
                padding: '14px 26px', borderRadius: '11px', fontSize: '14.5px',
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              <MessageCircle size={16} /> {t('pricing.cta.whatsapp', 'WhatsApp')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
