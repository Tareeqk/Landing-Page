import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CalendarIcon, ClockIcon, TagIcon, Download, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { parseHtmlSections } from '../utils/parseHtmlSections';
import { getBlogBySlugOrId } from '../data/blogs';
import useLangLink from '../hooks/useLangLink';

// Real Tareeqk photography, cycled between article sections as visual
// breaks — generic/reusable for any article this template renders, not
// tied to one specific post's content.
const SECTION_IMAGES = [
  { src: '/towing.jpg', alt: 'Tareeqk tow truck on a Dubai street' },
  { src: '/tareeqktow.jpg', alt: 'Tareeqk truck loading a vehicle' },
  { src: '/newTruck.jpg', alt: 'Tareeqk flatbed recovery truck' },
];

function useBlogPageStyles() {
  useEffect(() => {
    if (document.getElementById('blog-page-v2-styles')) return;
    const style = document.createElement('style');
    style.id = 'blog-page-v2-styles';
    style.textContent = `
      .bp-page { background: #fff; }
      body.dark .bp-page { background: var(--dark-bg-main, #141414); }

      /* ── Reading progress ── */
      .bp-progress-track {
        position: fixed; top: 0; left: 0; right: 0; z-index: 60;
        height: 3px;
        background: rgba(0,0,0,0.06);
      }
      body.dark .bp-progress-track { background: rgba(255,255,255,0.08); }
      .bp-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, var(--seconday-yellow, #f5d608), var(--primary-yellow, #f5a623));
        transform-origin: left;
        transition: transform 0.1s linear;
      }
      [dir="rtl"] .bp-progress-bar { transform-origin: right; }

      /* ── Hero — full-bleed image with title overlaid ── */
      .bp-hero {
        position: relative;
        height: min(64vh, 560px);
        min-height: 360px;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
      }
      .bp-hero-img {
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        filter: brightness(0.55) saturate(1.05);
      }
      .bp-hero-scrim {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.92) 100%);
      }
      .bp-hero-inner {
        position: relative; z-index: 1;
        max-width: 880px;
        margin: 0 auto;
        width: 100%;
        padding: 0 24px 44px;
      }
      .bp-hero-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 999px;
        background: var(--primary-yellow, #f5a623);
        color: #111;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin-bottom: 16px;
      }
      .bp-hero-title {
        font-size: clamp(26px, 4.2vw, 44px);
        font-weight: 900;
        line-height: 1.12;
        color: #fff;
        letter-spacing: -0.02em;
        margin: 0 0 18px;
      }
      .bp-hero-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 18px;
        color: rgba(255,255,255,0.75);
        font-size: 13.5px;
      }
      .bp-hero-meta-item { display: flex; align-items: center; gap: 6px; }
      .bp-hero-meta-item svg { color: var(--primary-yellow, #f5a623); flex-shrink: 0; }

      /* ── Body ── */
      .bp-body {
        max-width: 720px;
        margin: 0 auto;
        padding: 56px 24px 0;
      }

      .bp-section { margin-bottom: 40px; }
      .bp-section-heading {
        font-size: clamp(20px, 2.4vw, 26px);
        font-weight: 800;
        color: #0a0a0a;
        letter-spacing: -0.01em;
        margin: 0 0 18px;
        padding-inline-start: 16px;
        border-inline-start: 3px solid var(--primary-yellow, #f5a623);
      }
      body.dark .bp-section-heading { color: var(--dark-text-main, #f0f0f0); }

      .bp-prose { color: #444; line-height: 1.8; font-size: 16px; }
      body.dark .bp-prose { color: var(--dark-text-muted, #bbb); }
      .bp-prose p { margin: 0 0 16px; }
      .bp-prose ul, .bp-prose ol { margin: 0 0 16px; padding-inline-start: 22px; display: flex; flex-direction: column; gap: 8px; }
      .bp-prose li { line-height: 1.7; }
      .bp-prose li::marker { color: var(--primary-yellow, #c9860f); }
      .bp-prose strong { font-weight: 700; color: #111; }
      body.dark .bp-prose strong { color: var(--dark-text-main, #f0f0f0); }
      .bp-prose a { color: #b07c00; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
      body.dark .bp-prose a { color: var(--primary-yellow, #f5a623); }

      /* ── Interstitial image break between sections ── */
      .bp-image-break {
        margin: 40px 0 48px;
        border-radius: 18px;
        overflow: hidden;
        aspect-ratio: 16 / 8;
        box-shadow: 0 20px 48px -18px rgba(0,0,0,0.28);
      }

      /* ── Mobile — tighter hero, full-bleed interstitial photos (same
         edge-to-edge pattern as the listing page's featured card), and
         stacked full-width CTA buttons instead of wrapped inline ones. ── */
      @media (max-width: 640px) {
        .bp-hero { height: 44vh; min-height: 260px; }
        .bp-hero-inner { padding: 0 20px 28px; }
        .bp-hero-meta { gap: 14px; font-size: 12.5px; }

        .bp-body { padding: 36px 20px 0; }
        .bp-section { margin-bottom: 32px; }
        .bp-section-heading { font-size: 20px; margin-bottom: 14px; }
        .bp-prose { font-size: 15px; }

        .bp-image-break {
          margin: 32px -20px 36px;
          border-radius: 0;
          aspect-ratio: 4 / 3;
          box-shadow: none;
        }

        .bp-cta { padding: 0 20px; margin: 16px auto 56px; }
        .bp-cta-card { padding: 28px 22px; border-radius: 18px; }
        .bp-cta-actions { flex-direction: column; }
        .bp-cta-btn { width: 100%; justify-content: center; }
      }
      .bp-image-break img { width: 100%; height: 100%; object-fit: cover; }

      /* ── Bottom CTA card ── */
      .bp-cta {
        max-width: 880px;
        margin: 24px auto 80px;
        padding: 0 24px;
      }
      .bp-cta-card {
        position: relative;
        overflow: hidden;
        border-radius: 22px;
        padding: clamp(32px, 5vw, 52px);
        background: var(--primary-dark-bg, #171a1f);
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 32px;
        align-items: center;
      }
      @media (max-width: 720px) { .bp-cta-card { grid-template-columns: 1fr; text-align: center; } }
      .bp-cta-glow {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 60% 70% at 85% 20%, rgba(245,166,35,0.16) 0%, transparent 60%);
        pointer-events: none;
      }
      .bp-cta-title { font-size: clamp(20px, 2.6vw, 28px); font-weight: 900; color: #fff; margin: 0 0 10px; letter-spacing: -0.01em; position: relative; }
      .bp-cta-desc { color: rgba(255,255,255,0.65); font-size: 14.5px; line-height: 1.7; margin: 0 0 22px; position: relative; }
      .bp-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; position: relative; }
      @media (max-width: 720px) { .bp-cta-actions { justify-content: center; } }
      .bp-cta-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 13px 24px; border-radius: 10px;
        font-weight: 700; font-size: 14px;
        text-decoration: none; cursor: pointer; border: none;
        transition: transform 0.2s ease;
      }
      .bp-cta-btn:hover { transform: translateY(-2px); }
      .bp-cta-btn--primary { background: var(--primary-yellow, #f5a623); color: #111; }
      .bp-cta-btn--ghost { background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.18); }
      .bp-cta-media { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 4/3; }
      .bp-cta-media img { width: 100%; height: 100%; object-fit: cover; }
      @media (max-width: 720px) { .bp-cta-media { display: none; } }

      .bp-back-link {
        display: inline-flex; align-items: center; gap: 6px;
        color: #8a8a8a; font-size: 13.5px; font-weight: 600;
        text-decoration: none; margin-bottom: 20px;
      }
      body.dark .bp-back-link { color: var(--dark-text-muted, #999); }
      .bp-back-link:hover { color: var(--primary-yellow, #c9860f); }
      [dir="rtl"] .bp-back-link svg { transform: scaleX(-1); }

      .bp-empty {
        display: flex; flex-direction: column; align-items: center; gap: 16px;
        text-align: center; padding: 120px 24px; color: #8a8a8a;
      }
      body.dark .bp-empty { color: var(--dark-text-muted, #999); }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById('blog-page-v2-styles');
      if (el) el.remove();
    };
  }, []);
}

export default function BlogPage() {
  const { blogSlug } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const langLink = useLangLink();
  useBlogPageStyles();

  const blog = getBlogBySlugOrId(blogSlug);
  const sections = blog?.html ? parseHtmlSections(blog.html, i18n.language) : [];

  // ── Reading progress bar ──
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, doc.scrollTop / scrollable)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!blog || !sections.length) {
    return (
      <div className="bp-empty">
        <p>{t('blogs.no_content', 'Article not found.')}</p>
        <Link to={langLink('/blogs')} className="bp-back-link" style={{ justifyContent: 'center' }}>
          {t('blogs.backToAll', 'Back to all articles')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bp-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{blog?.title || 'Article'}</title>
        <meta name="description" content={blog?.description || 'Read our latest article'} />
      </Helmet>

      <div className="bp-progress-track" aria-hidden="true">
        <div className="bp-progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* ── Hero ── */}
      <section className="bp-hero">
        {blog?.image && <img className="bp-hero-img" src={blog.image} alt="" aria-hidden="true" />}
        <div className="bp-hero-scrim" aria-hidden="true" />
        <div className="bp-hero-inner">
          {blog?.section && <span className="bp-hero-tag">{blog.section}</span>}
          {blog?.title && <h1 className="bp-hero-title">{blog.title}</h1>}
          <div className="bp-hero-meta">
            {blog?.date && (
              <span className="bp-hero-meta-item">
                <CalendarIcon size={15} />
                {new Date(blog.date).toLocaleDateString(i18n.language, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            )}
            {blog?.mins && (
              <span className="bp-hero-meta-item"><ClockIcon size={15} />{blog.mins} {t('blogs.mins')}</span>
            )}
            {blog?.section && (
              <span className="bp-hero-meta-item"><TagIcon size={15} />{blog.section}</span>
            )}
          </div>
        </div>
      </section>

      <article className="bp-body">
        <Link to={langLink('/blogs')} className="bp-back-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
          </svg>
          {t('blogs.backToAll', 'Back to all articles')}
        </Link>

        {sections.map((section, i) => (
          <div key={i}>
            <div className="bp-section">
              {section.heading && <h2 className="bp-section-heading">{section.heading}</h2>}
              <div className="bp-prose" dangerouslySetInnerHTML={{ __html: section.content }} />
              {section.subSections?.map((sub, j) => (
                <div key={j} className="bp-prose" style={{ marginTop: 12 }}>
                  <div dangerouslySetInnerHTML={{ __html: sub.content }} />
                </div>
              ))}
            </div>

            {/* Visual break every other section — not after the last one */}
            {i % 2 === 1 && i !== sections.length - 1 && (() => {
              const breakImage = SECTION_IMAGES[Math.floor(i / 2) % SECTION_IMAGES.length];
              return (
                <div className="bp-image-break">
                  <img src={breakImage.src} alt={breakImage.alt} loading="lazy" />
                </div>
              );
            })()}
          </div>
        ))}
      </article>

      {/* ── Bottom CTA ── */}
      <div className="bp-cta">
        <div className="bp-cta-card">
          <div className="bp-cta-glow" aria-hidden="true" />
          <div>
            <h3 className="bp-cta-title">{t('blogs.ctaTitle', 'Need roadside help right now?')}</h3>
            <p className="bp-cta-desc">
              {t('blogs.ctaDesc', 'Download the Tareeqk app for fast, verified recovery, towing, and roadside assistance across Dubai — or call our 24/7 line.')}
            </p>
            <div className="bp-cta-actions">
              <a href="https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854" target="_blank" rel="noopener noreferrer" className="bp-cta-btn bp-cta-btn--primary">
                <Download size={16} />
                {t('blogs.ctaDownload', 'Download the App')}
              </a>
              <a href="tel:+97142232269" className="bp-cta-btn bp-cta-btn--ghost">
                <Phone size={16} />
                {t('blogs.ctaCall', 'Call Now')}
              </a>
            </div>
          </div>
          <div className="bp-cta-media">
            <img src="/tareeqktow.jpg" alt="Tareeqk tow truck loading a car" />
          </div>
        </div>
      </div>
    </div>
  );
}
