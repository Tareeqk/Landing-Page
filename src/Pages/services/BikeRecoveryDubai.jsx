// pages/services/BikeRecoveryDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'bike-recovery-dubai',
  metaTitle: 'Bike Recovery Service Dubai – 24/7 | Tareeqk',
  metaDesc: 'Broken-down or stranded bike in Dubai? Tareeqk offers quick, careful bike recovery with safe pickup and transport, available 24/7. Call or WhatsApp now.',
  title: 'Bike Recovery Service in Dubai',
  heroImage: '/new/Recovery_Van.webp',
  heroAlt: 'Bike Recovery Service in Dubai',
  intro: 'Need help with a broken-down or stranded bike in Dubai? We provide quick and careful bike recovery, with safe pickup and transport available around the clock.',
  responseTime: '20 minutes',
  responseDesc: 'Bike trouble can happen anywhere, from busy roads to parking areas. Once you contact us, our recovery team reaches your location quickly and handles the pickup and transport of your bike safely.',
  whatIsService: 'Our bike recovery service in Dubai is designed for motorcycles, scooters, and other two-wheelers that need safe transport after a breakdown, accident, or mechanical issue. We arrive with the right equipment to load and move your bike carefully, helping protect it from further damage. With fast response across Dubai, riders can count on reliable recovery when they need it most.',
  areas: [
    'Dubai Marina', 'Business Bay', 'Downtown Dubai', 'Deira', 'Bur Dubai',
    'Al Barsha', 'Jumeirah', 'JVC', 'JLT', 'Dubai Silicon Oasis',
    'International City', 'Dubai Investment Park', 'Dubai Sports City', 'Motor City', 'Mirdif',
    'Al Qusais', 'Al Quoz', 'Jebel Ali', 'Palm Jumeirah',
  ],
  whyUs: [
    '24/7 bike recovery in Dubai, including nights, weekends, and public holidays.',
    'Fast average response time across Dubai for broken-down or stranded bikes.',
    'Clear and competitive pricing with no hidden charges.',
    'Safe and insured bike recovery handled by trained operators.',
  ],
  faqs: [
    {
      q: 'What types of bikes do you recover?',
      a: 'Tareeqk offers recovery for motorcycles, scooters, and other two-wheelers across Dubai.',
    },
    {
      q: 'What happens if my bike breaks down on the road?',
      a: 'If your bike breaks down, Tareeqk can dispatch a recovery team quickly to pick up your bike and transport it safely to your preferred location.',
    },
    {
      q: 'How much does bike recovery cost in Dubai?',
      a: 'The cost of bike recovery in Dubai depends on the distance, location, and type of recovery needed. Tareeqk offers clear and upfront pricing before dispatch.',
    },
    {
      q: 'Do you recover bikes from accident locations?',
      a: 'Yes, Tareeqk provides safe bike recovery from accident scenes, breakdown spots, parking areas, and roadside locations across Dubai.',
    },
  ],
  serviceType: 'Bike Recovery',
  schemaName: 'Bike Recovery Service Dubai',
  schemaDesc: '24/7 bike recovery service in Dubai for motorcycles, scooters, and two-wheelers. Fast, safe pickup and transport after a breakdown or accident.',
};

export default function BikeRecoveryDubai() {
  return <ServicePageTemplate config={config} />;
}
