// pages/services/CarRecoveryDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'car-recovery-dubai',
  metaTitle: 'Car Recovery Dubai – 24/7 Fast Response | Tareeqk',
  metaDesc: 'Stuck on the road in Dubai? Tareeqk provides 24/7 car recovery with an average 20-minute response. Licensed RTA operator. Call or WhatsApp now.',
  title: 'Car Recovery in Dubai – 24/7 Fast Service',
  heroImage: '/new/Recovery_Van.webp',
  heroAlt: 'Car Recovery Service in Dubai',
  intro: 'Stranded in Dubai? We dispatch a recovery truck to you in 20 minutes or less — day or night, anywhere in the UAE.',
  responseTime: '20 minutes',
  responseDesc: 'Our dispatch team monitors Dubai 24/7. Once you place a request via the app or call, a certified recovery truck is en route within minutes. Average on-scene time is 20 minutes across Dubai.',
  whatIsService: 'Car recovery Dubai is an emergency roadside service that safely transports your broken-down or damaged vehicle to a garage, dealer, or location of your choice. Tareeqk operates a fleet of flatbed and wheel-lift recovery trucks manned by certified technicians — ready around the clock across all Dubai districts.',
  areas: [
    'Dubai Marina', 'JVC', 'Business Bay', 'Deira', 'Al Quoz',
    'Jumeirah', 'Downtown Dubai', 'Al Barsha', 'Mirdif', 'Dubai Hills',
    'Motor City', 'DIFC', 'JBR', 'Al Nahda', 'Sharjah (border)',
  ],
  whyUs: [
    '24/7 availability — we never close, even on public holidays.',
    'Average 20-minute response time across Dubai.',
    'Transparent, affordable pricing with no hidden fees.',
    'RTA-licensed operators with fully insured recovery trucks.',
  ],
  faqs: [
    {
      q: 'How long does car recovery take in Dubai?',
      a: 'Our average response time is 20 minutes. Actual time depends on your exact location and current traffic in Dubai, but we always dispatch the nearest available unit immediately.',
    },
    {
      q: 'Do you provide 24/7 car recovery in Dubai?',
      a: 'Yes. Tareeqk operates 24 hours a day, 7 days a week, 365 days a year — including all UAE public holidays.',
    },
    {
      q: 'How much does car recovery cost in Dubai?',
      a: 'Pricing is transparent and shown upfront in the Tareeqk app before you confirm. Rates vary based on vehicle type and distance. There are no hidden fees.',
    },
    {
      q: 'Is Tareeqk a licensed car recovery company in Dubai?',
      a: 'Yes. Tareeqk is a licensed RTA (Roads and Transport Authority) operator in Dubai, ensuring all recoveries meet regulatory standards.',
    },
    {
      q: 'What happens if my car breaks down on Sheikh Zayed Road?',
      a: 'Call or WhatsApp us immediately. Our team is experienced with highway recoveries and will coordinate with you for safe extraction and transport to your chosen destination.',
    },
  ],
  serviceType: 'Car Recovery',
  schemaName: 'Car Recovery Dubai',
  schemaDesc: '24/7 car recovery service in Dubai. Fast dispatch, RTA-licensed operators, flatbed and wheel-lift trucks available across all Dubai areas.',
};

export default function CarRecoveryDubai() {
  return <ServicePageTemplate config={config} />;
}