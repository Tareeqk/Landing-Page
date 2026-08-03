// pages/services/BatteryServiceDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'battery-service-dubai',
  metaTitle: 'Car Battery Replacement & Boost Dubai – 24/7 | Tareeqk',
  metaDesc: 'Dead car battery in Dubai? Tareeqk offers on-site battery boost and replacement 24/7 across Dubai. Fast 15-minute dispatch. Call or WhatsApp now.',
  title: 'Car Battery Jump Start Service',
  heroImage: '/new/second_img.webp',
  heroAlt: 'Car Battery Boost and Replacement Service Dubai',
  intro: 'Dead battery in Dubai? We come to you, test your battery, and jump-start or replace it on the spot — 24 hours a day.',
  responseTime: '15 minutes',
  responseDesc: 'A battery failure can happen anytime — especially in Dubai\'s extreme summer heat. Our technicians reach you within 15 minutes on average and handle the battery test, jump-start, or replacement right where your car is parked.',
  whatIsService: 'Car battery service in Dubai includes on-site jump starts (battery boost) and full battery replacement. Dubai\'s intense summer heat accelerates battery degradation — making battery failures the #1 cause of breakdowns in the UAE. Tareeqk\'s mobile technicians arrive equipped with battery testers, jump-start packs, and a stock of compatible replacement batteries for most vehicle makes and models.',
  areas: [
    'Dubai Marina', 'JVC', 'Business Bay', 'Deira', 'Al Quoz',
    'Jumeirah', 'Downtown Dubai', 'Al Barsha', 'Mirdif', 'JBR',
    'Al Nahda', 'Dubai Hills', 'Motor City', 'DIFC', 'Palm Jumeirah',
  ],
  whyUs: [
    '24/7 mobile battery service — we come to your exact location.',
    'On-the-spot battery testing, boost, or replacement in one visit.',
    'Affordable, upfront pricing shown in the app before you confirm.',
    'Certified technicians with OEM-compatible batteries for all car brands.',
  ],
  faqs: [
    {
      q: 'What should I do if my car battery dies in Dubai?',
      a: 'If your car battery dies, park safely, switch on your hazard lights, and contact Tareeqk for a fast battery jump start anywhere in Dubai. Our team will arrive quickly to get your vehicle running again.',
    },
    {
      q: 'Why do car batteries die quickly in Dubai?',
      a: 'Dubai\'s extreme summer heat (up to 50°C) dramatically shortens battery lifespan. Most batteries need replacement every 2–3 years in the UAE climate, compared to 4–5 years in cooler regions.',
    },
    {
      q: 'How long does a battery jump start take?',
      a: 'A jump start typically takes 5–15 minutes on-site once our technician arrives. We test the battery first to advise whether a boost is sufficient or a full replacement is needed.',
    },
    {
      q: 'Do you provide battery service at night in Dubai?',
      a: 'Yes — Tareeqk is fully operational 24/7, including late night, early morning, weekends, and public holidays.',
    },
    {
      q: 'What battery brands do you use for replacement?',
      a: 'We use trusted brands compatible with UAE vehicle requirements. Our technicians will recommend the right battery specification for your car model and usage.',
    },
    {
      q: 'How quickly can you provide a battery jump start in Dubai?',
      a: 'Our average response time depends on your location and traffic conditions, but we aim to reach customers as quickly as possible across Dubai.',
    },
    {
      q: 'Do you offer 24/7 battery jump start service in Dubai?',
      a: 'Yes. Tareeqk provides 24/7 emergency battery jump start service throughout Dubai, including nights, weekends, and public holidays.',
    },
    {
      q: 'Can you jump start any type of vehicle?',
      a: 'Yes. We provide battery jump start assistance for most cars, SUVs, vans, and light commercial vehicles.',
    },
    {
      q: 'Can a dead battery be jump started?',
      a: 'Yes. If the battery is simply discharged, a jump start can usually get your vehicle running again. If the battery has reached the end of its lifespan, additional repairs or replacement may be required by a battery specialist.',
    },
  ],
  serviceType: 'Battery Boost & Replacement',
  schemaName: 'Car Battery Service Dubai',
  schemaDesc: '24/7 mobile car battery boost and replacement service in Dubai. On-site service for all vehicle makes, fast 15-minute dispatch across Dubai.',
};

export default function BatteryServiceDubai() {
  return <ServicePageTemplate config={config} />;
}