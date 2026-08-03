// pages/Service.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  Smartphone, MapPin, Tag, ShieldCheck, Clock, Map, Lock, Zap,
  ArrowRight, ArrowLeft, Phone, MessageCircle, Car, Truck,
  Battery, Wrench, AlertTriangle, ChevronRight, ChevronLeft,
  CheckCircle2, Trophy, DollarSign, HardHat, Download, Mountain, Bike,
} from 'lucide-react';

import howItWorksIllustration from '/how-it-works-illustration.png';
import useLangLink from '../hooks/useLangLink';
import { useParams } from 'react-router-dom';

// ── Schemas ────────────────────────────────────────────────────────────────
function ServicesPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Tareeqk Roadside Assistance Services Dubai",
    "description": "24/7 roadside assistance services in Dubai including car recovery, towing, battery boost, flat tyre repair, fuel delivery, and accident recovery.",
    "url": "https://tareeqk.ae/service",
    "numberOfItems": 7,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "Service", "name": "Car Recovery Dubai", "url": "https://tareeqk.ae/car-recovery-dubai", "description": "24/7 car recovery and towing service in Dubai with 20-minute response time.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "Service", "name": "Battery Boost & Replacement Dubai", "url": "https://tareeqk.ae/battery-service-dubai", "description": "On-site car battery jump start and replacement across Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "Service", "name": "Flat Tyre Repair Dubai", "url": "https://tareeqk.ae/flat-tyre-repair-dubai", "description": "Mobile flat tyre repair and replacement at your location in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "Service", "name": "Accident Recovery Dubai", "url": "https://tareeqk.ae/accident-recovery-dubai", "description": "Emergency accident recovery and towing for damaged vehicles in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "Service", "name": "Towing Service Dubai", "url": "https://tareeqk.ae/towing-service-dubai", "description": "Professional vehicle towing service across all Dubai districts.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 6, "item": { "@type": "Service", "name": "Desert Recovery Dubai", "url": "https://tareeqk.ae/desert-recovery-dubai", "description": "24/7 desert recovery for cars, SUVs, and 4x4s stuck in sand, dunes, or off-road terrain in Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
      { "@type": "ListItem", "position": 7, "item": { "@type": "Service", "name": "Bike Recovery Service Dubai", "url": "https://tareeqk.ae/bike-recovery-dubai", "description": "24/7 bike recovery for motorcycles, scooters, and two-wheelers across Dubai.", "provider": { "@type": "LocalBusiness", "name": "Tareeqk" }, "areaServed": "Dubai" } },
    ],
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Request Roadside Assistance in Dubai",
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Call, WhatsApp, or Open the App", "text": "Contact Tareeqk via phone, WhatsApp, or the mobile app and share your location." },
      { "@type": "HowToStep", "position": 2, "name": "Confirm Your Request", "text": "Confirm the service you need and get an upfront price before we dispatch." },
      { "@type": "HowToStep", "position": 3, "name": "We Dispatch Immediately", "text": "The nearest certified technician is dispatched to your location within minutes." },
      { "@type": "HowToStep", "position": 4, "name": "Problem Solved", "text": "Your vehicle is recovered, repaired, or transported — you're back on the road." },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </>
  );
}

// ── Lucide icon map for step/trust icons ──────────────────────────────────
function StepIcon({ name, size = 22 }) {
  const props = { size, strokeWidth: 1.6 };
  switch (name) {
    case 'phone-pin':    return <Smartphone {...props} />;
    case 'tag':          return <Tag {...props} />;
    case 'map-pin':      return <MapPin {...props} />;
    case 'shield-check': return <ShieldCheck {...props} />;
    case 'clock':        return <Clock {...props} />;
    case 'map':          return <Map {...props} />;
    case 'lock':         return <Lock {...props} />;
    case 'bolt':         return <Zap {...props} fill="currentColor" strokeWidth={0} />;
    case 'arrow':        return <ArrowRight {...props} />;
    default:             return null;
  }
}

// ── Styles ─────────────────────────────────────────────────────────────────
function useServiceStyles() {
  useEffect(() => {
    if (document.getElementById('trq-svc-styles')) return;
    const style = document.createElement('style');
    style.id = 'trq-svc-styles';
    style.textContent = `
      /* ── Scroll reveal ── */
      .svc-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 1.05s cubic-bezier(0.16,1,0.3,1),
                    transform 1.05s cubic-bezier(0.16,1,0.3,1);
      }
      .svc-reveal.svc-left  { transform: translateX(-28px); }
      .svc-reveal.svc-right { transform: translateX(28px); }
      .svc-reveal.svc-scale { transform: scale(0.96); }
      .svc-reveal.svc-fade  { transform: none; }
      .svc-reveal.svc-visible { opacity: 1 !important; transform: none !important; }

      [dir="rtl"] .svc-reveal.svc-left  { transform: translateX(28px); }
      [dir="rtl"] .svc-reveal.svc-right { transform: translateX(-28px); }

      /* ── Hero image responsive ── */
      .svc-hero-img-desktop { display: block; }
      .svc-hero-img-mobile  { display: none; }
      @media (max-width: 640px) {
        .svc-hero-img-desktop { display: none; }
        .svc-hero-img-mobile  { display: block; }
      }

      /* ── "Who we are" pill ── */
      .svc-pill-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 999px;
        padding: 6px 14px 6px 10px;
        font-size: 13px;
        font-weight: 500;
        color: #444;
        background: #fff;
        margin-bottom: 28px;
      }
      .svc-pill-label .svc-pill-dot {
        width: 8px; height: 8px; border-radius: 50%;
        background: var(--primary-yellow); flex-shrink: 0;
      }
      body.dark .svc-pill-label {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.1)) !important;
        color: var(--dark-text-muted, #aaa) !important;
      }

      /* ── Service cards ── */
      .svc-card {
        position: relative;
        background: #fff;
        border-radius: 16px;
        border: 1px solid rgba(0,0,0,0.07);
        overflow: hidden;
        transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                    box-shadow 0.35s ease, border-color 0.25s ease;
        text-decoration: none;
        display: block;
        cursor: pointer;
      }
      .svc-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 28px 64px rgba(0,0,0,0.10);
        border-color: var(--primary-yellow);
      }
      .svc-card-top-bar {
        position: relative;
        z-index: 2;
        height: 3px;
        background: var(--primary-yellow);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      [dir="rtl"] .svc-card-top-bar { transform-origin: right; }
      .svc-card:hover .svc-card-top-bar { transform: scaleX(1); }

      /* Photo header — a real, service-matched photo (see the SERVICES
         data array for per-card object-position) rather than the old
         mismatched Unsplash picks. Tall enough (150px) that a sensible
         object-position doesn't need to crop out the actual subject, and
         tinted with the card's own accent color (its urgency tag color
         where it has one, brand amber otherwise) instead of a flat white
         wash, so the photo and the rest of the card's color language
         read as one designed thing instead of a stock photo pasted on. */
      .svc-card-stage {
        position: relative; z-index: 0;
        height: 150px;
        overflow: hidden;
      }
      .svc-card-stage-img {
        position: absolute; inset: 0; width: 100%; height: 100%;
        object-fit: cover;
        filter: saturate(1.05);
      }
      body.dark .svc-card-stage-img { filter: saturate(1.02) brightness(0.82); }
      .svc-card-stage-tint {
        position: absolute; inset: 0;
        background: linear-gradient(180deg,
          color-mix(in srgb, var(--svc-accent, var(--primary-yellow)) 55%, transparent) 0%,
          transparent 40%,
          transparent 65%,
          #fff 100%);
      }
      body.dark .svc-card-stage-tint {
        background: linear-gradient(180deg,
          color-mix(in srgb, var(--svc-accent, var(--primary-yellow)) 60%, transparent) 0%,
          transparent 40%,
          transparent 65%,
          #1e1e1e 100%);
      }

      body.dark .svc-card {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .svc-card:hover { box-shadow: 0 28px 64px rgba(0,0,0,0.40) !important; }
      body.dark .svc-card-title  { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-card-body   { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .svc-card-icon   { background: var(--dark-bg-muted, #252525) !important; }
      body.dark .svc-feat-item   {
        background: var(--dark-bg-surface, #1e1e1e) !important;
        border-color: var(--dark-border, rgba(255,255,255,0.08)) !important;
      }
      body.dark .svc-feat-label  { color: var(--dark-text-muted, #ccc) !important; }
      body.dark .svc-bullet-text { color: var(--dark-text-muted, #aaa) !important; }

      /* ── Service swiper (mobile) ── */
      .svc-swiper-wrap { position: relative; overflow: hidden; }
      .svc-swiper-track {
        display: flex; gap: 14px;
        overflow-x: auto; scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 8px;
      }
      .svc-swiper-track::-webkit-scrollbar { display: none; }
      .svc-swiper-slide { flex: 0 0 85vw; max-width: 340px; scroll-snap-align: start; }
      .svc-swiper-dots { display: flex; justify-content: center; gap: 6px; margin-top: 16px; }
      .svc-swiper-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(0,0,0,0.15); border: none; padding: 0; cursor: pointer;
        transition: background 0.2s ease, width 0.2s ease;
      }
      .svc-swiper-dot.active { width: 20px; border-radius: 3px; background: var(--primary-yellow); }
      body.dark .svc-swiper-dot { background: rgba(255,255,255,0.15) !important; }

      /* ── Why swiper (mobile) ── */
      .svc-why-swiper-wrap { position: relative; overflow: hidden; }

      /* ── How it works ── */
      .svc-steps-illustration {
        position: relative; border-radius: 14px; overflow: hidden;
        aspect-ratio: 12 / 5; background: #0a0a0a;
      }
      .svc-steps-illustration img { width: 100%; height: 100%; object-fit: cover; object-position: center 78%; display: block; }
      .svc-steps-badge {
        position: absolute; top: 12px;
        display: flex; align-items: center; gap: 8px;
        background: rgba(10,10,10,0.62); border: 1px solid rgba(255,255,255,0.10);
        border-radius: 11px; padding: 8px 12px; backdrop-filter: blur(6px); max-width: 185px;
      }
      .svc-steps-badge-icon {
        width: 25px; height: 25px; border-radius: 50%;
        background: rgba(247,178,5,0.12); border: 1px solid rgba(247,178,5,0.35);
        color: var(--primary-yellow);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .svc-steps-badge-text { font-size: 11px; color: rgba(255,255,255,0.85); line-height: 1.4; }
      .svc-steps-badge-text strong { color: var(--primary-yellow); font-weight: 700; }

      .svc-steps-track {
        position: relative; display: grid; grid-template-columns: repeat(4, 1fr);
        gap: 16px; margin-bottom: 8px;
      }
      .svc-steps-track-line {
        position: absolute; left: 12.5%; right: 12.5%; top: 24px;
        height: 0; border-top: 2px dotted rgba(247,178,5,0.45); z-index: 0;
      }
      .svc-step-node-wrap { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; }
      .svc-step-node {
        width: 48px; height: 48px; border-radius: 50%;
        background: rgba(247,178,5,0.08); border: 1.5px solid rgba(247,178,5,0.45);
        box-shadow: 0 0 14px rgba(247,178,5,0.18); color: var(--primary-yellow);
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .svc-step-num { font-size: 11.5px; font-weight: 700; letter-spacing: 0.04em; color: var(--primary-yellow); }
      .svc-steps-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
      .svc-step-card {
        position: relative; background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08); border-radius: 13px;
        padding: 14px 14px 40px;
        transition: border-color 0.25s ease, transform 0.3s ease;
      }
      .svc-step-card:hover { border-color: rgba(247,178,5,0.40); transform: translateY(-3px); }
      .svc-step-title { font-size: 14px; font-weight: 700; color: #fff; letter-spacing: -0.01em; margin-bottom: 4px; }
      .svc-step-body  { font-size: 12px; line-height: 1.55; color: rgba(255,255,255,0.5); }
      .svc-step-arrow {
        position: absolute; bottom: 12px; left: 14px;
        width: 26px; height: 26px; border-radius: 50%;
        border: 1px solid rgba(247,178,5,0.40); color: var(--primary-yellow);
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s ease, color 0.2s ease;
      }
      [dir="rtl"] .svc-step-arrow { left: auto; right: 14px; }
      [dir="rtl"] .svc-step-arrow svg { transform: scaleX(-1); }
      .svc-step-card:hover .svc-step-arrow { background: var(--primary-yellow); color: #000; }

      /* ── Trust strip ── */
      .svc-trust-strip {
        display: flex; flex-wrap: wrap;
        border: 1px solid rgba(255,255,255,0.10); border-radius: 13px; padding: 10px 8px;
      }
      .svc-trust-item {
        flex: 1 1 0; min-width: 170px;
        display: flex; align-items: center; gap: 10px; padding: 4px 18px;
        border-inline-end: 1px solid rgba(255,255,255,0.08);
      }
      .svc-trust-item:last-child { border-inline-end: none; }
      .svc-trust-icon {
        width: 30px; height: 30px; border-radius: 50%;
        background: rgba(247,178,5,0.08); border: 1px solid rgba(247,178,5,0.30);
        color: var(--primary-yellow); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .svc-trust-title { font-size: 12.5px; font-weight: 700; color: #fff; margin-bottom: 2px; }
      .svc-trust-body  { font-size: 11px; color: rgba(255,255,255,0.45); }

      /* ── Why cards ── */
      .svc-why-card {
        transition: transform 0.32s cubic-bezier(0.16,1,0.3,1),
                    box-shadow 0.32s ease, border-color 0.25s ease;
      }
      .svc-why-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 48px rgba(247,178,5,0.10), 0 4px 12px rgba(0,0,0,0.06) !important;
        border-color: var(--primary-yellow) !important;
      }
      .svc-why-card:hover .svc-why-icon { background: var(--primary-yellow) !important; }
      .svc-why-card:hover .svc-why-icon svg { color: #000 !important; }
      body.dark .svc-why-card { background: var(--dark-bg-surface, #1e1e1e) !important; border-color: var(--dark-border, rgba(255,255,255,0.08)) !important; }
      body.dark .svc-why-title { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-why-body  { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .svc-why-icon  { background: var(--dark-bg-muted, #252525) !important; }

      /* ── CTA buttons ── */
      .svc-btn-primary { transition: transform 0.2s ease, box-shadow 0.2s ease; }
      .svc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(247,178,5,0.40); }
      .svc-btn-ghost { transition: background 0.2s ease, border-color 0.2s ease; }
      .svc-btn-ghost:hover { background: rgba(255,255,255,0.13) !important; border-color: rgba(255,255,255,0.40) !important; }
      /* Was inline onMouseEnter/onMouseLeave handlers on the bottom CTA's
         WhatsApp button — every other button on this page (including the
         other two WhatsApp links, in Hero and Coverage) uses a CSS class
         for its hover state instead. */
      .svc-btn-whatsapp { transition: background 0.2s ease, color 0.2s ease; }
      .svc-btn-whatsapp:hover { background: #25D366 !important; color: #fff !important; }

      /* ── Location pills ── */
      .svc-loc-pill {
        transition: background 0.18s ease, color 0.18s ease,
                    border-color 0.18s ease, transform 0.18s ease;
      }
      .svc-loc-pill:hover {
        background: var(--primary-yellow) !important; color: #000 !important;
        border-color: var(--primary-yellow) !important; transform: translateY(-1px);
      }

      /* ── Stat bar ── */
      .svc-stat-bar {
        display: flex; gap: 0; border-top: 1px solid rgba(0,0,0,0.06);
        padding-top: 28px; margin-top: 36px; flex-wrap: wrap;
      }
      body.dark .svc-stat-bar { border-color: var(--dark-divider, rgba(255,255,255,0.08)) !important; }
      .svc-stat-item { padding-inline-end: 28px; margin-inline-end: 28px; border-inline-end: 1px solid rgba(0,0,0,0.08); }
      .svc-stat-item:last-child { border-inline-end: none; }
      body.dark .svc-stat-item { border-color: var(--dark-divider, rgba(255,255,255,0.08)) !important; }
      .svc-stat-num { font-size: 22px; font-weight: 800; color: var(--primary-dark-bg); line-height: 1; }
      body.dark .svc-stat-num { color: var(--dark-text-main, #f0f0f0) !important; }
      .svc-stat-label { font-size: 10px; color: #9b9b9b; margin-top: 3px; letter-spacing: 0.08em; text-transform: uppercase; }
      body.dark .svc-stat-label { color: var(--dark-text-disabled, #666) !important; }

      /* ── Gold glow animation ── */
      @keyframes svc-gold-pulse {
        0%, 100% { text-shadow: none; }
        50% { text-shadow: 0 0 32px rgba(247,178,5,0.25); }
      }
      .svc-gold-glow { animation: svc-gold-pulse 4s ease-in-out infinite; }

      /* ── Read more button ── */
      .svc-read-more-btn {
        background: none; border: none; padding: 0; cursor: pointer;
        font-size: 13px; font-weight: 700; color: var(--primary-yellow);
        display: inline-flex; align-items: center; gap: 4px;
        margin-top: 10px; text-decoration: underline; text-underline-offset: 3px;
      }

      /* ── Mobile stats ── */
      .svc-mobile-stats { display: none; }
      @media (max-width: 768px) {
        .svc-mobile-stats {
          display: flex; justify-content: space-around;
          background: var(--primary-yellow); border-radius: 14px;
          padding: 18px 12px; margin: 24px 0 0;
        }
        .svc-mobile-stat-num   { font-size: 20px; font-weight: 800; color: #000; line-height: 1; text-align: center; }
        .svc-mobile-stat-label { font-size: 10px; font-weight: 600; color: rgba(0,0,0,0.6); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 3px; text-align: center; }
      }
      @media (min-width: 769px) { .svc-mobile-stats { display: none !important; } }

      /* ── Dark mode section roots ── */
      body.dark .svc-page-root      { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-intro-section  { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-cards-section  { background-color: var(--dark-bg-muted, #1a1a1a) !important; }
      body.dark .svc-steps-section  { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-why-section    { background-color: var(--dark-bg-muted, #1a1a1a) !important; }
      body.dark .svc-cta-section    { background-color: var(--dark-bg-main, #0f0f0f) !important; }
      body.dark .svc-h2             { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-body-text      { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .svc-step-title     { color: var(--dark-text-main, #f0f0f0) !important; }
      body.dark .svc-step-body      { color: var(--dark-text-muted, #aaa) !important; }
      body.dark .svc-mobile-stats   { background: var(--dark-bg-surface, #1e1e1e) !important; }
      body.dark .svc-mobile-stat-num   { color: var(--primary-yellow) !important; }
      body.dark .svc-mobile-stat-label { color: var(--dark-text-muted, #888) !important; }
      body.dark .svc-read-more-btn  { color: var(--primary-yellow) !important; }
      body.dark .svc-swiper-dot     { background: rgba(255,255,255,0.15) !important; }

      /* ── Responsive ── */
      @media (max-width: 1024px) {
        .svc-why-grid   { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 900px) {
        .svc-intro-grid    { grid-template-columns: 1fr !important; }
        .svc-coverage-grid { grid-template-columns: 1fr !important; }
        .svc-steps-top     { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 768px) {
        .svc-cards-grid  { display: none !important; }
        .svc-cards-swiper { display: block !important; }
        .svc-why-grid    { display: none !important; }
        .svc-why-swiper  { display: block !important; }
        .svc-hero-stats  { display: none !important; }
        .svc-inner       { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
        .svc-steps-track, .svc-steps-cards { grid-template-columns: 1fr 1fr !important; }
        .svc-steps-track-line { display: none; }
        .svc-trust-item { flex: 1 1 50%; border-inline-end: none !important; padding: 10px 16px; }
      }
      @media (min-width: 769px) {
        .svc-cards-swiper { display: none !important; }
        .svc-why-swiper   { display: none !important; }
        .svc-mobile-stats { display: none !important; }
      }
      @media (max-width: 480px) {
        /* .svc-why-grid is already display:none by 768px (below), so a
           column-count override for it here was unreachable dead code —
           removed. */
        .svc-steps-track, .svc-steps-cards { grid-template-columns: 1fr !important; }
        .svc-trust-item { flex: 1 1 100%; }
      }

      /* ── App-like density on mobile ── */
      @media (max-width: 768px) {
        .svc-hero-section    { min-height: auto !important; }
        .svc-hero-section .svc-inner { padding-top: 112px !important; padding-bottom: 44px !important; }
        .svc-intro-section   { padding: 44px 0 !important; }
        .svc-cards-section   { padding: 44px 0 !important; }
        .svc-why-section     { padding: 44px 0 !important; }
        .svc-coverage-section { padding: 44px 0 !important; }
        .svc-cta-section     { padding: 56px 0 !important; }
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || 0);
            setTimeout(() => el.classList.add('svc-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.svc-reveal').forEach(el => observer.observe(el));
    }, 50);

    return () => {
      observer.disconnect();
      const el = document.getElementById('trq-svc-styles');
      if (el) document.head.removeChild(el);
    };
  }, []);
}

// ── Shared tokens ──────────────────────────────────────────────────────────
const eyebrow = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.32em',
  textTransform: 'uppercase',
  color: 'var(--primary-yellow)',
  marginBottom: '12px',
  display: 'block',
};

// ── Generic touch Swiper ───────────────────────────────────────────────────
function TouchSwiper({ items, renderSlide, className = '' }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const onScroll = () => {
    if (!trackRef.current) return;
    const slideW = trackRef.current.offsetWidth * 0.85 + 14;
    setActive(Math.round(trackRef.current.scrollLeft / slideW));
  };

  const goTo = (i) => {
    if (!trackRef.current) return;
    const slideW = trackRef.current.offsetWidth * 0.85 + 14;
    trackRef.current.scrollTo({ left: i * slideW, behavior: 'smooth' });
  };

  return (
    <div className={`svc-swiper-wrap ${className}`}>
      <div className="svc-swiper-track" ref={trackRef} onScroll={onScroll}>
        {items.map((item, i) => (
          <div key={i} className="svc-swiper-slide">
            {renderSlide(item, i)}
          </div>
        ))}
      </div>
      <div className="svc-swiper-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`svc-swiper-dot${active === i ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Service({ isSection = false }) {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isRTL = i18n.dir() === 'rtl';
  const langLink = useLangLink();
  const HeadingTag = isSection ? 'h2' : 'h1';
  useServiceStyles();

  const [introExpanded, setIntroExpanded] = useState(false);

  const inner = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 3rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  // Was scrolling to an element with id="download-buttons" that doesn't
  // exist anywhere on this page (only DriverRegistration renders that id),
  // so every "Download" button here was a silent no-op. Same OS-detect
  // redirect as the landing page and service pages instead.
  const handleDownloadRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const iosUrl     = 'https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854';
    const androidUrl = 'https://play.google.com/store/apps/details?id=com.tareeqk.order';
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isMacOS = navigator.platform.toUpperCase().includes('MAC') ||
      (navigator.userAgent.includes('Mac') && !('ontouchend' in document));
    window.location.href = (isIOSDevice || isMacOS) ? iosUrl : androidUrl;
  };

  // ── Data (i18n-driven) ─────────────────────────────────────────────────
  const SERVICES = [
    {
      icon: <Car size={18} />,
      href: '/car-recovery-dubai',
      img: 'https://images.unsplash.com/photo-1728117190970-2583f89dfa15?auto=format&fit=crop&w=800&q=60',
      tag: t('service.svc1Tag'),
      tagBg: 'rgba(255,244,214,0.95)',
      tagColor: '#b07c00',
      title: t('service.svc1Title'),
      desc: t('service.svc1Desc'),
      bullets: [t('service.svc1b1'), t('service.svc1b2'), t('service.svc1b3'), t('service.svc1b4')],
    },
    {
      icon: <Truck size={18} />,
      href: '/towing-service-dubai',
      img: 'https://images.unsplash.com/photo-1730514784243-f0e7f09c9f50?auto=format&fit=crop&w=800&q=60',
      tag: null,
      title: t('service.svc2Title'),
      desc: t('service.svc2Desc'),
      bullets: [t('service.svc2b1'), t('service.svc2b2'), t('service.svc2b3'), t('service.svc2b4')],
    },
    {
      icon: <Battery size={18} />,
      href: '/battery-service-dubai',
      img: 'https://images.unsplash.com/photo-1676337167752-2062c6ca7366?auto=format&fit=crop&w=800&q=60',
      tag: t('service.svc3Tag'),
      tagBg: 'rgba(254,226,226,0.95)',
      tagColor: '#c93030',
      title: t('service.svc3Title'),
      desc: t('service.svc3Desc'),
      bullets: [t('service.svc3b1'), t('service.svc3b2'), t('service.svc3b3'), t('service.svc3b4')],
    },
    {
      icon: <Wrench size={18} />,
      href: '/flat-tyre-repair-dubai',
      img: 'https://images.unsplash.com/photo-1664820578859-2a1eddb69bd5?auto=format&fit=crop&w=800&q=60',
      tag: null,
      title: t('service.svc4Title'),
      desc: t('service.svc4Desc'),
      bullets: [t('service.svc4b1'), t('service.svc4b2'), t('service.svc4b3'), t('service.svc4b4')],
    },
    {
      icon: <AlertTriangle size={18} />,
      href: '/accident-recovery-dubai',
      img: 'https://images.unsplash.com/photo-1713623311317-d3c43a4be4cf?auto=format&fit=crop&w=800&q=60',
      tag: t('service.svc5Tag'),
      tagBg: 'rgba(255,231,213,0.95)',
      tagColor: '#c04f00',
      title: t('service.svc5Title'),
      desc: t('service.svc5Desc'),
      bullets: [t('service.svc5b1'), t('service.svc5b2'), t('service.svc5b3'), t('service.svc5b4')],
    },
    {
      icon: <Mountain size={18} />,
      href: '/desert-recovery-dubai',
      img: 'https://images.unsplash.com/photo-1763535834153-22c340883793?auto=format&fit=crop&w=800&q=60',
      tag: null,
      title: t('service.svc6Title'),
      desc: t('service.svc6Desc'),
      bullets: [t('service.svc6b1'), t('service.svc6b2'), t('service.svc6b3'), t('service.svc6b4')],
    },
    {
      icon: <Bike size={18} />,
      href: '/bike-recovery-dubai',
      img: 'https://images.unsplash.com/photo-1624535460536-4d3631ccea9c?auto=format&fit=crop&w=800&q=60',
      tag: null,
      title: t('service.svc7Title'),
      desc: t('service.svc7Desc'),
      bullets: [t('service.svc7b1'), t('service.svc7b2'), t('service.svc7b3'), t('service.svc7b4')],
    },
  ];

  const HOW_STEPS = [
    { num: '01', icon: 'phone-pin', title: t('service.step1Title'), body: t('service.step1Body') },
    { num: '02', icon: 'tag',       title: t('service.step2Title'), body: t('service.step2Body') },
    { num: '03', icon: 'map-pin',   title: t('service.step3Title'), body: t('service.step3Body') },
    { num: '04', icon: 'shield-check', title: t('service.step4Title'), body: t('service.step4Body') },
  ];

  const TRUST_ITEMS = [
    { icon: 'shield-check', title: t('service.trust1Title'), body: t('service.trust1Body') },
    { icon: 'clock',        title: t('service.trust2Title'), body: t('service.trust2Body') },
    { icon: 'map',          title: t('service.trust3Title'), body: t('service.trust3Body') },
    { icon: 'lock',         title: t('service.trust4Title'), body: t('service.trust4Body') },
  ];

  const WHY_POINTS = [
    { icon: <Zap size={20} />,          title: t('service.why1Title'), body: t('service.why1Body') },
    { icon: <Trophy size={20} />,        title: t('service.why2Title'), body: t('service.why2Body') },
    { icon: <DollarSign size={20} />,    title: t('service.why3Title'), body: t('service.why3Body') },
    { icon: <Clock size={20} />,         title: t('service.why4Title'), body: t('service.why4Body') },
    { icon: <HardHat size={20} />,       title: t('service.why5Title'), body: t('service.why5Body') },
    { icon: <Smartphone size={20} />,    title: t('service.why6Title'), body: t('service.why6Body') },
  ];

  const LOCATIONS = [
    { label: 'Dubai Marina',   href: '/car-recovery-dubai-marina' },
    { label: 'JVC',            href: '/car-recovery-jvc' },
    { label: 'Business Bay',   href: '/car-recovery-business-bay' },
    { label: 'Deira',          href: '/car-recovery-deira' },
    { label: 'Al Quoz',        href: '/car-recovery-al-quoz' },
    { label: 'Jumeirah',       href: '/car-recovery-jumeirah' },
    { label: 'Downtown Dubai', href: '/car-recovery-downtown-dubai' },
    { label: 'Al Barsha',      href: '/car-recovery-al-barsha' },
    { label: 'Mirdif',         href: '/car-recovery-mirdif' },
  ];

  const FEATS = [
    { icon: <Zap size={18} />,         label: t('service.feat1') },
    { icon: <HardHat size={18} />,     label: t('service.feat2') },
    { icon: <MapPin size={18} />,      label: t('service.feat3') },
    { icon: <DollarSign size={18} />,  label: t('service.feat4') },
    { icon: <Trophy size={18} />,      label: t('service.feat5') },
    { icon: <Smartphone size={18} />,  label: t('service.feat6') },
  ];

  const HERO_STATS = [
    { stat: '20 min', label: t('service.statAvgResponse') },
    { stat: '7',      label: t('service.statServices') },
    { stat: '4.9★',  label: t('service.statReviews') },
    { stat: 'RTA',    label: t('service.statLicensed') },
  ];

  // ── Render helpers ─────────────────────────────────────────────────────
  const renderServiceCard = (svc, i) => (
    <a
      href={langLink(svc.href)}
      className="svc-card svc-card-v2"
      style={{ display: 'block', '--svc-accent': svc.tagColor || undefined }}
    >
      <div className="svc-card-top-bar" />

      <div className="svc-card-stage">
        <img
          className="svc-card-stage-img"
          src={svc.img}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{ objectPosition: svc.photoPosition || 'center' }}
        />
        <div className="svc-card-stage-tint" aria-hidden="true" />
        {svc.tag && (
          <span
            style={{
              position: 'absolute', top: '12px', insetInlineEnd: '14px', zIndex: 1,
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
              padding: '4px 9px', borderRadius: '100px',
              background: svc.tagBg, color: svc.tagColor, whiteSpace: 'nowrap',
              backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: svc.tagColor, display: 'inline-block', flexShrink: 0 }} />
            {svc.tag}
          </span>
        )}
      </div>

      {/* Icon + title straddle the photo/content seam — the icon overlaps
          up into the photo (negative margin) instead of sitting inside a
          flat block below it, so the title reads as introduced by the
          image instead of following a disconnected caption. */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '-22px', marginBottom: '14px' }}>
          <div
            className="svc-card-icon"
            style={{
              width: '46px', height: '46px', borderRadius: '13px', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(0,0,0,0.14)', border: '1px solid rgba(0,0,0,0.05)',
              transition: 'background 0.25s ease', color: 'var(--svc-accent, var(--primary-yellow))', flexShrink: 0,
            }}
          >
            {svc.icon}
          </div>
          <h3 className="svc-card-title" style={{ fontWeight: 700, fontSize: '14.5px', color: '#111', letterSpacing: '-0.01em', lineHeight: 1.3, margin: 0 }}>
            {svc.title}
          </h3>
        </div>
        <p
          className="svc-card-body"
          style={{
            color: '#6b6b6b', lineHeight: 1.6, fontSize: '12px', marginBottom: '14px',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}
        >
          {svc.desc}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {svc.bullets.map((b, j) => (
            <div key={j} className="svc-feat-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 9px', borderRadius: '9px', border: '1px solid rgba(0,0,0,0.06)', background: '#fafafa' }}>
              <CheckCircle2 size={11} style={{ color: 'var(--primary-yellow)', flexShrink: 0 }} />
              <span className="svc-feat-label" style={{ fontSize: '10.5px', fontWeight: 600, color: '#444', lineHeight: 1.25 }}>{b}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.06)',
            fontSize: '11.5px', fontWeight: 700, color: 'var(--primary-yellow)',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}
        >
          {t('service.learnMore')}
          {isRTL ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
        </div>
      </div>
    </a>
  );

  const renderWhyCard = (point, i) => (
    <div
      className="svc-why-card"
      style={{
        padding: '28px', borderRadius: '14px',
        background: 'var(--secondary-light-gray)',
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        height: '100%',
      }}
    >
      <div
        className="svc-why-icon"
        style={{
          width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245,166,35,0.14)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '18px', transition: 'background 0.25s ease',
          color: 'var(--primary-yellow)',
        }}
      >
        {point.icon}
      </div>
      <h3 className="svc-why-title" style={{ fontWeight: 700, fontSize: '15px', color: '#111', marginBottom: '8px', letterSpacing: '-0.01em' }}>
        {point.title}
      </h3>
      <p className="svc-why-body" style={{ color: '#6b6b6b', lineHeight: 1.7, fontSize: '13.5px' }}>
        {point.body}
      </p>
    </div>
  );

  return (
    <div className="svc-page-root" dir={isRTL ? 'rtl' : 'ltr'}>
      {!isSection && (
        <Helmet>
          <title>{t('meta.service.title')}</title>
          <meta name="description" content={t('meta.service.description')} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://tareeqk.ae/${lang}/service`} />
        </Helmet>
      )}

      <ServicesPageSchema />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — landscape image desktop / portrait image mobile
      ══════════════════════════════════════════════════════════════════ */}
      {!isSection && (
        <section
          className="svc-hero-section"
          style={{ position: 'relative', overflow: 'hidden', minHeight: '480px', display: 'flex', alignItems: 'center' }}
        >
          {/* Desktop background — service_banner.png was a 5.6MB, 7010px-wide
              PNG (the hero is the LCP element on this route); re-encoded to
              WebP at a realistic display width. */}
          <div
            className="svc-hero-img-desktop"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'url("/new/service_banner_hero.webp")',
              backgroundSize: 'cover', backgroundPosition: 'center 40%', backgroundRepeat: 'no-repeat',
            }}
          />
          {/* Mobile background — cropped tight to the truck/skyline art
              (service_mobile.png had ~50% dead black canvas above it).
              `contain` + bottom anchoring pins the truck full-width at
              its natural size instead of `cover` stretching that dead
              space to fill the tall mobile hero; the matching bg color
              makes the letterboxed area above read as intentional. */}
          <div
            className="svc-hero-img-mobile"
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundColor: '#050505',
              backgroundImage: 'url("/new/service_mobile_hero.webp")',
              backgroundSize: 'contain', backgroundPosition: 'bottom center', backgroundRepeat: 'no-repeat',
            }}
          />

          {/* Dark overlay */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: isRTL
                ? `linear-gradient(100deg,rgba(10,10,10,0.25) 0%,rgba(10,10,10,0.70) 55%,rgba(10,10,10,0.92) 100%),
                   linear-gradient(0deg,rgba(10,10,10,0.60) 0%,transparent 50%)`
                : `linear-gradient(260deg,rgba(10,10,10,0.92) 0%,rgba(10,10,10,0.70) 45%,rgba(10,10,10,0.25) 100%),
                   linear-gradient(0deg,rgba(10,10,10,0.60) 0%,transparent 50%)`,
            }}
          />

          {/* Gold accent line */}
          <div
            style={{
              position: 'absolute', bottom: 0,
              right: isRTL ? 'auto' : 0, left: isRTL ? 0 : 'auto',
              width: '32%', height: '3px', zIndex: 2,
              background: isRTL
                ? 'linear-gradient(90deg, var(--primary-yellow), transparent)'
                : 'linear-gradient(270deg, var(--primary-yellow), transparent)',
            }}
          />

          {/* Content */}
          <div
            className="svc-inner"
            style={{
              ...inner, position: 'relative', zIndex: 3,
              paddingTop: '80px', paddingBottom: '80px',
              display: 'flex',
              justifyContent: isRTL ? 'flex-start' : 'flex-end',
            }}
          >
            <div style={{ maxWidth: '600px', width: '100%' }}>
              <span className="svc-reveal svc-fade" data-delay="0" style={eyebrow}>
                {t('service.heroTag')}
              </span>

              <HeadingTag
                className="svc-reveal"
                data-delay="80"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                  fontWeight: 800, color: '#fff',
                  letterSpacing: '-0.03em', lineHeight: 1.04, margin: '0 0 20px',
                }}
              >
                {t('service.heroTitle')}{' '}
                <span style={{ color: 'var(--primary-yellow)', display: 'block', fontWeight: 300, fontStyle: 'italic', fontSize: '1.06em' }}>
                  {t('service.heroHighlight')}
                </span>
              </HeadingTag>

              <p
                className="svc-reveal"
                data-delay="160"
                style={{ color: 'rgba(255,255,255,0.70)', fontSize: '15px', lineHeight: 1.75, maxWidth: '500px', margin: '0 0 32px', fontWeight: 400 }}
              >
                {t('service.heroSubtitle')}
              </p>

              <div
                className="svc-reveal"
                data-delay="240"
                style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '44px' }}
              >
                <button
                  onClick={handleDownloadRedirect}
                  className="svc-btn-primary getTow-btn"
                  style={{
                    background: 'var(--primary-yellow)', color: '#000',
                    padding: '13px 30px', borderRadius: '8px', fontWeight: 700,
                    fontSize: '14px', letterSpacing: '0.01em', border: 'none', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <Download size={16} />
                  {t('service.heroCta')}
                </button>
                <a
                  href="https://wa.me/97142232269"
                  target="_blank"
                  rel="noreferrer"
                  className="svc-btn-ghost"
                  style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.22)',
                    color: '#fff', padding: '13px 30px', borderRadius: '8px', fontWeight: 500,
                    textDecoration: 'none', fontSize: '14px',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <MessageCircle size={16} />
                  {t('service.heroWhatsapp')}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          INTRO — two-column "Who we are"
      ══════════════════════════════════════════════════════════════════ */}
      {!isSection && (
        <section
          className="svc-intro-section"
          style={{ padding: '80px 0', overflow: 'hidden', backgroundColor: '#fff' }}
        >
          <div className="svc-inner" style={inner}>
            <div
              className="svc-intro-grid"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
            >
              {/* Left column */}
              <div style={{ order: isRTL ? 2 : 1 }}>
                <div className="svc-reveal svc-fade" data-delay="0">
                  <span className="svc-pill-label">
                    <span className="svc-pill-dot" />
                    {t('service.whoWeAreTag')}
                  </span>
                </div>

                <h2
                  className="svc-h2 svc-reveal svc-left"
                  data-delay="70"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.6rem)', fontWeight: 800,
                    color: 'var(--primary-dark-bg)', letterSpacing: '-0.03em',
                    lineHeight: 1.1, marginBottom: '20px', marginTop: '6px',
                  }}
                >
                  {t('service.whoWeAreTitle')}
                </h2>
                <p
                  className="svc-body-text svc-reveal"
                  data-delay="150"
                  style={{ color: '#555', fontSize: '15px', lineHeight: 1.78, marginBottom: '20px' }}
                >
                  {t('service.whoWeAreP1').split('roadside assistance in Dubai').map((part, i, arr) =>
                    i < arr.length - 1
                      ? <React.Fragment key={i}>{part}<span style={{ color: 'var(--primary-yellow)', fontWeight: 700 }}>roadside assistance in Dubai</span></React.Fragment>
                      : part
                  )}
                </p>

                {/* Read more/less on mobile */}
                <div>
                  <p
                    className="svc-body-text svc-reveal"
                    data-delay="220"
                    style={{
                      color: '#777', fontSize: '14.5px', lineHeight: 1.75,
                      overflow: introExpanded ? 'visible' : 'hidden',
                      maxHeight: introExpanded ? 'none' : '0',
                      transition: 'max-height 0.4s ease',
                    }}
                  >
                    {t('service.whoWeAreP2')}
                  </p>
                  <button
                    className="svc-read-more-btn"
                    onClick={() => setIntroExpanded(v => !v)}
                    aria-expanded={introExpanded}
                  >
                    {introExpanded ? t('service.readLess') || 'Read less' : t('service.readMore') || 'Read more'}
                    {introExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                  </button>
                </div>

            
              </div>

              {/* Right column — feature checklist + mini CTA */}
              <div style={{ paddingTop: '8px', order: isRTL ? 1 : 2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  {FEATS.map((feat, i) => (
                    <div
                      key={i}
                      className="svc-reveal svc-feat-item"
                      data-delay={`${120 + i * 55}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '14px 16px', borderRadius: '14px',
                        border: '1px solid rgba(0,0,0,0.06)', background: '#fafafa',
                      }}
                    >
                      {/* Was a bare icon with no backing — every other icon
                          on this page (service cards, Why Us cards) sits in
                          a rounded, tinted badge; this was the one
                          inconsistent exception. */}
                      <span
                        style={{
                          width: '30px', height: '30px', borderRadius: '9px', background: 'rgba(245,166,35,0.14)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--primary-yellow)', flexShrink: 0,
                        }}
                      >
                        {feat.icon}
                      </span>
                      <span className="svc-feat-label" style={{ fontSize: '13px', fontWeight: 600, color: '#222', lineHeight: 1.3 }}>
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mini CTA card */}
                <div
                  className="svc-reveal svc-right"
                  data-delay="480"
                  style={{
                    background: 'var(--primary-dark-bg)', borderRadius: '14px',
                    padding: '22px 20px', display: 'flex', alignItems: 'center', gap: '16px',
                  }}
                >
                  <div style={{ color: 'var(--primary-yellow)', flexShrink: 0 }}>
                    <Car size={32} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#fff', marginBottom: '6px' }}>
                      {t('service.needHelp')}
                    </div>
                    <button
                      onClick={handleDownloadRedirect}
                      style={{
                        background: 'var(--primary-yellow)', color: '#000', border: 'none',
                        borderRadius: '6px', padding: '8px 18px', fontWeight: 700,
                        fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px',
                      }}
                    >
                      <Download size={14} />
                      {t('service.downloadApp')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SERVICE CARDS — desktop grid / mobile swiper
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-cards-section"
        style={{ padding: '80px 0', overflow: 'hidden', backgroundColor: 'var(--secondary-light-gray)' }}
      >
        <div className="svc-inner" style={inner}>
          <div className="svc-reveal" style={{ marginBottom: '48px' }}>
            <span style={eyebrow}>{t('service.whatWeOfferTag')}</span>
            <h2
              className="svc-h2"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 800,
                color: 'var(--primary-dark-bg)', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '480px',
              }}
            >
              {t('service.whatWeOfferTitle')}{' '}
              <span style={{ color: 'var(--primary-yellow)' }}>{t('service.whatWeOfferHighlight')}</span>
            </h2>
          </div>

          {/* Desktop grid — flex-wrap + centered so a trailing partial row
              (7 cards don't divide evenly into any fixed column count)
              centers itself instead of hugging one side with an empty gap. */}
          <div className="svc-cards-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            {SERVICES.map((svc, i) => (
              <div key={i} className="svc-reveal svc-card-slot" data-delay={i * 75} style={{ flex: '1 1 260px', maxWidth: '280px' }}>
                {renderServiceCard(svc, i)}
              </div>
            ))}
          </div>

          {/* Mobile swiper */}
          <div className="svc-cards-swiper">
            <TouchSwiper items={SERVICES} renderSlide={renderServiceCard} />
          </div>
        </div>
      </section>

 

      {/* ══════════════════════════════════════════════════════════════════
          WHY TAREEQK — desktop 3-col grid / mobile swiper
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-why-section"
        style={{ padding: '80px 0', overflow: 'hidden', backgroundColor: '#fff' }}
      >
        <div className="svc-inner" style={inner}>
          <div className="svc-reveal" style={{ marginBottom: '48px' }}>
            <span style={eyebrow}>{t('service.whyTag')}</span>
            <h2
              className="svc-h2"
              style={{
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 800,
                color: 'var(--primary-dark-bg)', letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '460px',
              }}
            >
              {t('service.whyTitle')}
            </h2>
          </div>

          {/* Desktop grid */}
          <div className="svc-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {WHY_POINTS.map((point, i) => (
              <div key={i} className="svc-reveal" data-delay={i * 65}>
                {renderWhyCard(point, i)}
              </div>
            ))}
          </div>

          {/* Mobile swiper */}
          <div className="svc-why-swiper">
            <TouchSwiper items={WHY_POINTS} renderSlide={renderWhyCard} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          COVERAGE — dark section
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-coverage-section"
        style={{ padding: '80px 0', overflow: 'hidden', backgroundColor: 'var(--primary-dark-bg)' }}
      >
        <div className="svc-inner" style={inner}>
          <div
            className="svc-coverage-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 0.72fr', gap: '80px', alignItems: 'stretch' }}
          >
            {/* Left — heading + location pills */}
            <div className="svc-reveal svc-left" style={{ order: isRTL ? 2 : 1 }}>
              <span style={eyebrow}>{t('service.coverageTag')}</span>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', fontWeight: 800,
                  color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '18px',
                }}
              >
                {t('service.coverageTitle')}{' '}
                <span style={{ color: 'var(--primary-yellow)' }}>{t('service.coverageHighlight')}</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, fontSize: '15px', marginBottom: '36px' }}>
                {t('service.coverageSubtitle')}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {LOCATIONS.map((loc, i) => (
                  <a
                    key={i}
                    href={langLink(loc.href)}
                    className="svc-loc-pill"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.65)',
                      padding: '8px 16px', borderRadius: '100px', fontSize: '12.5px',
                      fontWeight: 500, textDecoration: 'none',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <MapPin size={11} />
                    {loc.label}
                  </a>
                ))}
                <a
                  href={langLink("/#contact")}
                  className="svc-loc-pill"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    border: '1px solid rgba(247,178,5,0.30)',
                    color: 'var(--primary-yellow)',
                    padding: '8px 16px', borderRadius: '100px', fontSize: '12.5px',
                    fontWeight: 600, textDecoration: 'none',
                    background: 'rgba(247,178,5,0.06)',
                  }}
                >
                  {t('service.coverageNotListed')} {isRTL ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
                </a>
              </div>
            </div>

            {/* Right — yellow CTA card. height:100% + flex column with the
                text block and button stack pinned to top/bottom (instead
                of just top-aligned content) so it fills the same visual
                height as however many rows the location pills wrap to on
                the left, rather than floating short next to a much taller
                column. */}
            <div className="svc-reveal svc-right" style={{ order: isRTL ? 1 : 2, height: '100%' }}>
              <div
                style={{
                  background: 'var(--primary-yellow)', borderRadius: '18px', padding: '36px 30px', color: '#000',
                  height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.55, marginBottom: '10px' }}>
                    {t('service.emergencyTag')}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                    {t('service.emergencyTitle')}
                  </h3>
                  <p style={{ fontSize: '13.5px', lineHeight: 1.7, opacity: 0.75, marginBottom: '24px', fontWeight: 400 }}>
                    {t('service.emergencySubtitle')}
                  </p>
                </div>
                <div>
                  <a
                    href="tel:+97142232269"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '14px', background: '#000', color: '#fff',
                      textAlign: 'center', borderRadius: '9px', fontWeight: 700,
                      textDecoration: 'none', fontSize: '14px', marginBottom: '8px',
                    }}
                  >
                    <Phone size={16} />
                    {t('service.callBtn')}
                  </a>
                  <a
                    href="https://wa.me/97142232269"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '12px', background: 'rgba(0,0,0,0.10)', color: '#000',
                      textAlign: 'center', borderRadius: '9px', fontWeight: 600,
                      textDecoration: 'none', fontSize: '13.5px', border: '1px solid rgba(0,0,0,0.10)',
                    }}
                  >
                    <MessageCircle size={16} />
                    {t('service.whatsappBtn')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — bottom banner
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="svc-cta-section"
        style={{ padding: '96px 0', backgroundColor: '#fff' }}
      >
        <div className="svc-inner" style={inner}>
          <div
            className="svc-reveal svc-scale"
            style={{
              position: 'relative', overflow: 'hidden', borderRadius: '20px',
              padding: 'clamp(40px, 8vw, 72px) clamp(24px, 6vw, 48px)',
              textAlign: 'center', background: 'var(--primary-dark-bg)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 55% 60% at 50% 110%, rgba(247,178,5,0.2) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(60px, 12vw, 150px)', fontWeight: 800, color: 'rgba(255,255,255,0.022)', letterSpacing: '-0.05em', userSelect: 'none' }}>
              TAREEQK
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ ...eyebrow, display: 'block', textAlign: 'center', marginBottom: '14px' }}>
                {t('service.ctaTag')}
              </span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: 800, color: '#fff',
                  letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '14px',
                }}
              >
                {t('service.ctaTitle')}{' '}
                <span className="svc-gold-glow" style={{ color: 'var(--primary-yellow)' }}>
                  {t('service.ctaHighlight')}
                </span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.7 }}>
                {t('service.ctaSubtitle')}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/97142232269"
                  target="_blank"
                  rel="noreferrer"
                  className="svc-btn-whatsapp"
                  style={{
                    background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)',
                    color: '#4ade80', padding: '15px 38px', borderRadius: '8px', fontWeight: 600,
                    textDecoration: 'none', fontSize: '14px',
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <MessageCircle size={16} />
                  {t('service.whatsappCta')}
                </a>
                <button
                  onClick={handleDownloadRedirect}
                  className="svc-btn-ghost"
                  style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.22)',
                    color: '#fff', padding: '15px 38px', borderRadius: '8px', fontWeight: 500,
                    fontSize: '14px', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  <Download size={16} />
                  {t('service.downloadCta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}