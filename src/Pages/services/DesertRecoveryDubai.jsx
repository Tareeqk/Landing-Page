// pages/services/DesertRecoveryDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'desert-recovery-dubai',
  metaTitle: 'Desert Recovery Dubai – 24/7 Sand & Dune Recovery | Tareeqk',
  metaDesc: 'Stuck in the sand in Dubai? Tareeqk provides 24/7 desert recovery for cars, SUVs, and 4x4s stuck in dunes or off-road terrain. Fast dispatch. Call or WhatsApp now.',
  title: 'Desert Recovery in Dubai – 24/7 Sand & Dune Recovery',
  heroImage: '/new/Recovery_Van.webp',
  heroAlt: 'Desert Recovery Service in Dubai',
  intro: 'We provide dependable desert recovery services for cars, SUVs, and 4x4s stuck in sand, dunes, or off-road areas. Our team works fast, stays professional, and focuses on safe vehicle recovery across Dubai.',
  responseTime: '15 minutes',
  responseDesc: 'Getting stuck in sand can happen in an instant, especially in Dubai’s desert areas. Our recovery team reaches you quickly on average and handles safe vehicle recovery on the spot, whether you’re buried in sand, stuck in dunes, or unable to move off-road.',
  whatIsService: 'Tareeqk provides reliable desert recovery services for vehicles stuck in sand, dunes, or off-road terrain across Dubai. We provide dependable desert recovery services for cars, SUVs, and 4x4s stuck in sand, dunes, or off-road areas. Our team works fast, stays professional, and focuses on safe vehicle recovery across Dubai.',
  areas: [
    'Al Marmoom Desert', 'Al Qudra', 'Lehbab', 'Bab Al Shams', 'Al Awir',
    'Dubai Desert Conservation Reserve', 'Big Red', 'Fossil Rock', 'Margham', 'Al Faqa',
  ],
  whyUs: [
    '24/7 availability — we operate day and night, including weekends and public holidays.',
    'Average 15-minute response time across Dubai for desert and off-road recovery.',
    'Transparent, affordable pricing with no hidden charges.',
    'Licensed and insured recovery operators with professional recovery trucks and equipment.',
  ],
  faqs: [
    {
      q: 'How long does desert recovery usually take?',
      a: 'Response times depend on your location and traffic conditions. Once our recovery partner reaches you, most sand recoveries are completed within 15–20 minutes, depending on how deeply the vehicle is stuck and the surrounding terrain.',
    },
    {
      q: 'Is desert recovery available 24/7 in Dubai?',
      a: 'Yes. Tareeqk provides 24/7 desert recovery, including weekends and public holidays. Whether you\'re stranded during the day or late at night, you can request assistance anytime.',
    },
    {
      q: 'Is my vehicle safe during the recovery process?',
      a: 'Yes. Our recovery partners use professional equipment and proven recovery techniques to safely recover your vehicle while minimizing the risk of damage.',
    },
    {
      q: 'Why choose Tareeqk for Desert Recovery Dubai?',
      a: 'Tareeqk offers reliable 24/7 desert recovery with trained recovery partners, quick dispatch, GPS-based tracking, transparent pricing, and professional customer support across Dubai.',
    },
    {
      q: 'Which areas do you cover for desert recovery?',
      a: 'Tareeqk provides 24/7 desert recovery services across Dubai\'s desert and off-road areas. Simply share your live GPS location through WhatsApp or the Tareeqk app, and we\'ll dispatch the nearest available recovery partner to your location.',
    },
  ],
  serviceType: 'Desert Recovery',
  schemaName: 'Desert Recovery Dubai',
  schemaDesc: 'Reliable 24/7 desert recovery service in Dubai for cars, SUVs, and 4x4s stuck in sand, dunes, or off-road terrain. Fast dispatch, professional recovery equipment.',
};

export default function DesertRecoveryDubai() {
  return <ServicePageTemplate config={config} />;
}
