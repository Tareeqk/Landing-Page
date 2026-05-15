// pages/LandingPage.jsx — Updated with LocalBusiness schema
// Changes from original:
//   1. Import LocalBusinessSchema
//   2. Render <LocalBusinessSchema /> inside the component

import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";
import CarModel from './CarModel';
import './landing.css';
import LocalBusinessSchema from '../schemas/LocalBusinessSchema'; // ← NEW

const CHIPS = [
  { strong: '5-min', span: 'avg. dispatch' },
  { strong: '24/7',  span: 'around the clock' },
  { strong: '4.9★',  span: '1,200+ reviews' },
];

function TrustChips() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [active, setActive]     = useState(0);
  const [anim, setAnim]         = useState('tk-chip-enter');

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
      {/* ── PAGE SEO ── */}
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Car Recovery Service in Dubai</title>
        <meta
          name="description"
          content="Premium 24/7 car recovery & towing in Dubai. Flatbed, heavy recovery, and emergency roadside assistance with 5-minute dispatch."
        />
        <link rel="canonical" href="https://www.tareeqk.ae/" />
      </Helmet>

      {/* ── LOCAL BUSINESS SCHEMA (NEW) ── */}
      <LocalBusinessSchema />

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
        {/* Content */}
        <div className="relative z-10 flex items-center h-auto min-h-screen">
          {" "}
          {/* Added min-h-screen for content */}
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 grid grid-cols-1 mt-10 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Text Content */}
            <div
              data-aos="fade-right"
              className="flex flex-col justify-center order-2 lg:order-1"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2 black-text max-w-lg whitespace-pre-line">
                {t("landing.title")}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-2 md:mb-3 black-text max-w-lg">
                {t("landing.subtitle")}
              </p>

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

              <div className="tk-store-badges" data-testid="landing-store-badges">
                <a href="https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854" target="_blank" rel="noopener noreferrer" className="tk-store-badge" aria-label="Download on the App Store">
                  <img src="/applestore.png" alt="Download on the App Store" className="tk-store-badge__img" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.tareeqk.order" target="_blank" rel="noopener noreferrer" className="tk-store-badge" aria-label="Get it on Google Play">
                  <img src="playstore.png" alt="Get it on Google Play" className="tk-store-badge__img" />
                </a>
              </div>

              <div className="tk-vehicles" data-testid="landing-vehicle-row">
                <span className="tk-vehicles__label">{t("landing.vehicle")}</span>
                <div className="tk-vehicles__icons">
                  {['Bike', 'Car', 'Jeep', 'Bus'].map((v) => (
                    <div key={v} className="tk-vehicles__icon" title={v} data-testid={`landing-vehicle-${v.toLowerCase()}`}>
                      <img src={`new/${v}.svg`} alt={v} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
    </>
  )
}
