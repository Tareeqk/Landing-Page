import React, { useRef, useState, useEffect } from 'react';
import { DownloadApps } from '../Components/DownloadApps';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import CarModel from './CarModel';
import './landing.css';

const CHIPS = [
  { strong: '5-min', span: 'avg. dispatch' },
  { strong: '24/7',  span: 'around the clock' },
  { strong: '4.9★',  span: '1,200+ reviews' },
];

 
function TrustChips() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [active, setActive]     = useState(0);
  const [anim, setAnim]         = useState('tk-chip-enter');

  // Track viewport width
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Cycling — only runs when isMobile
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setAnim('tk-chip-exit');
      setTimeout(() => {
        setActive(prev => (prev + 1) % CHIPS.length);
        setAnim('tk-chip-enter');
      }, 350);
    }, 2400);
    return () => clearInterval(id);
  }, [isMobile]);

  if (!isMobile) {
    // Desktop — all chips, original layout
    return (
      <ul className="tk-trust" data-testid="landing-trust-row">
        {CHIPS.map(({ strong, span }) => (
          <li key={strong} className="tk-trust__chip">
            <strong>{strong}</strong>
            <span>{span}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Mobile — single cycling chip
  const chip = CHIPS[active];
  return (
    <ul className="tk-trust tk-trust--cycle" data-testid="landing-trust-row">
      <li className={`tk-trust__chip tk-trust__chip--cycle ${anim}`} key={active}>
        <strong>{chip.strong}</strong>
        <span>{chip.span}</span>
      </li>
    </ul>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();
  const downloadRef = useRef(null);

  const handleDownloadRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const iosUrl     = 'https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854';
    const androidUrl = 'https://play.google.com/store/apps/details?id=com.tareeqk.order';
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isMacOS = navigator.platform.toUpperCase().includes('MAC') ||
      (navigator.userAgent.includes('Mac') && !('ontouchend' in document));
    window.location.href = (isIOSDevice || isMacOS) ? iosUrl : androidUrl;
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Car Recovery Service in Dubai — Tareeqk</title>
        <meta
          name="description"
          content="Premium 24/7 car recovery & towing in Dubai. Flatbed, heavy recovery, and emergency roadside assistance with 5-minute dispatch."
        />
      </Helmet>

      <section
        className="tk-hero"
        data-testid="landing-hero"
        aria-label="Car recovery hero"
      >
        <div className="tk-hero__bg" aria-hidden="true">
          <picture>
            <source media="(min-width: 768px)" srcSet="new/NewBGG.webp" />
            <img
              src="new/NewBG2.webp"
              alt=""
              className="tk-hero__bg-img"
              loading="eager"
              decoding="async"
            />
          </picture>
          <div className="tk-hero__veil" />
          <div className="tk-hero__grain" />
          <div className="tk-hero__horizon" />
        </div>

        <div className="tk-hero__inner">
          <div className="tk-hero__grid">

        
            <div
              data-aos="fade-right"
              className="tk-hero__text"
              data-testid="landing-hero-text"
            >
              <span className="tk-eyebrow" data-testid="landing-eyebrow">
                <span className="tk-eyebrow__dot" />
                24 / 7 · Dubai · Licensed RTA Operator
              </span>

              <h1
                className="tk-hero__title whitespace-pre-line"
                data-testid="landing-title"
              >
                {t('landing.title')}
              </h1>

              <p className="tk-hero__subtitle" data-testid="landing-subtitle">
                {t('landing.subtitle')}
              </p>

              {/* ── TRUCK: mobile only — sits between subtitle and trust chips ── */}
              <div className="tk-hero__stage--inline-mobile">
                <div className="tk-hero__stage-inner">
                  <CarModel />
                </div>
              </div>

              
              <TrustChips />

              <div className="tk-cta-row" data-testid="landing-cta-row">
                <button
                  onClick={handleDownloadRedirect}
                  className="tk-btn tk-btn--primary"
                  data-testid="landing-download-btn"
                >
                  <span>{t("landing.download")}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <a
                  href="tel:+97180082773375"
                  className="tk-btn tk-btn--ghost"
                  data-testid="landing-call-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Call now
                </a>
              </div>

              {/* App Store & Google Play badges */}
              <div className="tk-store-badges" data-testid="landing-store-badges">
                <a
                  href="https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tk-store-badge"
                  aria-label="Download on the App Store"
                >
                  <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" className="tk-store-badge__svg">
                    <rect width="120" height="40" rx="7" fill="#000"/>
                    <rect width="120" height="40" rx="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    <g transform="translate(7,7) scale(0.54)">
                      <path d="M22.2 9.8c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.9-3.7 2-.8 1-1.5 2.5-1.3 4 1.4.1 2.8-.7 3.7-1.9z" fill="#fff"/>
                      <path d="M15.5 20.1c0-3.2 2.6-4.7 2.7-4.8-1.5-2.2-3.8-2.5-4.6-2.5-2 0-3.8 1.2-4.8 1.2-1 0-2.5-1.1-4.2-1.1-2.1 0-4.1 1.3-5.2 3.2-2.2 3.9-.6 9.6 1.6 12.8 1.1 1.6 2.3 3.3 4 3.3 1.6-.1 2.2-1 4.2-1 1.9 0 2.5 1 4.2 1 1.7 0 2.9-1.6 3.9-3.1.9-1.3 1.3-2.7 1.3-2.8-.1 0-3.1-1.2-3.1-4.2z" fill="#fff"/>
                    </g>
                    <text x="33" y="15" fill="white" fontSize="7" fontFamily="'Helvetica Neue',Arial,sans-serif" fontWeight="400" letterSpacing="0.3">Download on the</text>
                    <text x="33" y="28" fill="white" fontSize="13" fontFamily="'Helvetica Neue',Arial,sans-serif" fontWeight="600">App Store</text>
                  </svg>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.tareeqk.order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tk-store-badge"
                  aria-label="Get it on Google Play"
                >
                  <svg viewBox="0 0 135 40" xmlns="http://www.w3.org/2000/svg" className="tk-store-badge__svg">
                    <rect width="135" height="40" rx="7" fill="#000"/>
                    <rect width="135" height="40" rx="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    <g transform="translate(8,10)">
                      <path d="M1.2 0.5L11 10.4 1.2 20.3c-.4-.2-.7-.6-.7-1.1V1.6C.5 1.1.8.7 1.2.5z" fill="#4FC3F7"/>
                      <path d="M14.5 7L11 10.4 1.2.5C1.5.3 1.9.3 2.2.5L14.5 7z" fill="#81C784"/>
                      <path d="M14.5 13.8L2.2 20.3c-.3.2-.7.2-1 0L11 10.4l3.5 3.4z" fill="#F44336"/>
                      <path d="M18.5 10.4c0 .8-.4 1.5-1 1.9l-3 1.5-3.5-3.4L14.5 7l3 1.5c.6.4 1 1.1 1 1.9z" fill="#FFCA28"/>
                    </g>
                    <text x="33" y="15" fill="white" fontSize="7" fontFamily="'Helvetica Neue',Arial,sans-serif" fontWeight="400" letterSpacing="0.3">GET IT ON</text>
                    <text x="33" y="28" fill="white" fontSize="13" fontFamily="'Helvetica Neue',Arial,sans-serif" fontWeight="600">Google Play</text>
                  </svg>
                </a>
              </div>

              <div className="tk-vehicles" data-testid="landing-vehicle-row">
                <span className="tk-vehicles__label">
                  {t("landing.vehicle")}
                </span>
                <div className="tk-vehicles__icons">
                  {['Bike', 'Car', 'Jeep', 'Bus'].map((v) => (
                    <div key={v} className="tk-vehicles__icon" title={v} data-testid={`landing-vehicle-${v.toLowerCase()}`}>
                      <img src={`new/${v}.svg`} alt={v} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TRUCK STAGE (desktop only — hidden on mobile) ── */}
            <div
              data-aos="fade-left"
              className="tk-hero__stage tk-hero__stage--desktop"
              data-testid="landing-truck-stage"
            >
              <div className="tk-hero__stage-inner">
                <CarModel />
              </div>
              <span className="tk-hero__tagline" data-testid="landing-truck-tagline">
                Beyond Reliable
              </span>
            </div>

          </div>
        </div>
      </section>

      <div
        ref={downloadRef}
        id="target-section"
        className="w-full overflow-x-hidden download-apps-container bg-[var(--secondary-light-gray)] dark-bg py-16 px-4"
        data-testid="landing-download-section"
      >
        <DownloadApps type="customer" />
      </div>
    </>
  );
}