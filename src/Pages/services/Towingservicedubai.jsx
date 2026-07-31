// pages/services/TowingServiceDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'towing-service-dubai',
  metaTitle: 'Car Towing Service Dubai – 24/7 Towing & Vehicle Transport | Tareeqk',
  metaDesc: 'Need a tow truck in Dubai? Tareeqk offers 24/7 car towing with flatbed and wheel-lift trucks. Fast response, RTA-licensed. Call or WhatsApp us now.',
  title: 'Car Towing Service in Dubai',
  heroImage: '/new/Towing_Truck.webp',
  heroAlt: 'Car Towing Service Dubai',
  intro: 'Broken down, blocked in, or just need your car moved? Tareeqk\'s licensed tow trucks reach you fast and transport your vehicle safely, anywhere in Dubai.',
  responseTime: '20 minutes',
  responseDesc: 'Tareeqk\'s towing fleet covers everything from compact sedans to SUVs and light commercial vehicles. Our flatbed and wheel-lift trucks load your car without contact damage, whether it\'s parked, broken down, or stuck after a mechanical fault.',
  whatIsService: 'Car towing in Dubai is an on-demand service that moves your vehicle from one location to another — a breakdown spot, a no-parking zone, your home, a garage, or a dealership. Tareeqk\'s certified drivers use flatbed and wheel-lift tow trucks suited to your vehicle type, so it arrives at its destination exactly as it left.',
  areas: [
    'Dubai Marina', 'Business Bay', 'Sheikh Zayed Road', 'Deira',
    'Al Quoz', 'Jumeirah', 'Downtown Dubai', 'Al Barsha', 'JVC',
    'Mirdif', 'Al Nahda', 'Dubai Hills', 'Motor City', 'DIFC', 'JBR',
  ],
  whyUs: [
    '24/7 towing with RTA-licensed drivers and flatbed trucks.',
    'No-contact loading that protects your vehicle from further damage.',
    'Transport to any garage, dealership, or address you choose in Dubai.',
    'Transparent pricing confirmed by WhatsApp before dispatch.',
  ],
  faqs: [
    {
      q: 'How fast can a tow truck reach me in Dubai?',
      a: 'Our average response time is 20 minutes across most of Dubai, depending on traffic and your exact location. Call or WhatsApp us with your location pin for the fastest dispatch.',
    },
    {
      q: 'Can you tow a car that doesn\'t start or won\'t go into neutral?',
      a: 'Yes. Our flatbed trucks lift the entire vehicle off the road, so it doesn\'t need to be driveable or shifted into neutral. This is the safest method for mechanical or electrical faults.',
    },
    {
      q: 'Do you tow automatic and 4-wheel-drive vehicles?',
      a: 'Yes. We carry flatbed trucks for automatic, 4WD, and AWD vehicles where wheel-lift towing isn\'t suitable, preventing drivetrain damage during transport.',
    },
    {
      q: 'How much does towing cost in Dubai?',
      a: 'Pricing depends on your vehicle type, distance, and time of day. We confirm an exact quote over WhatsApp or phone before any truck is dispatched, with no hidden fees.',
    },
    {
      q: 'Can you tow my car to a specific garage or dealership?',
      a: 'Yes. Tell us the destination — your preferred garage, a dealership service centre, or your home — and we\'ll take it there directly.',
    },
    {
      q: 'Is towing available 24/7 in Dubai?',
      a: 'Yes. Tareeqk offers 24/7 towing services, including nights, weekends, and public holidays, so you can request assistance whenever you need it.',
    },
    {
      q: 'What types of vehicles can you tow?',
      a: 'We tow sedans, SUVs, luxury vehicles, sports cars, electric vehicles, motorcycles, vans, and light commercial vehicles using suitable towing equipment.',
    },
    {
      q: 'Can I schedule a towing service in advance?',
      a: 'Yes. If you need your vehicle transported at a later time or date, you can schedule a towing service in advance based on availability.',
    },
    {
      q: 'Do you provide towing after a road accident?',
      a: 'Yes. If your vehicle is unsafe to drive after an accident, we can arrange towing to your preferred garage, dealership, or an insurance-approved repair center.',
    },
  ],
  serviceType: 'Towing Service',
  schemaName: 'Car Towing Service Dubai',
  schemaDesc: '24/7 car towing service in Dubai. RTA-licensed drivers, flatbed and wheel-lift trucks, transparent pricing, transport to any location.',
};

export default function TowingServiceDubai() {
  return <ServicePageTemplate config={config} />;
}