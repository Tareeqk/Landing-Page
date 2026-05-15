// pages/services/FuelDeliveryDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'fuel-delivery-dubai',
  metaTitle: 'Emergency Fuel Delivery Dubai – 24/7 | Tareeqk',
  metaDesc: 'Run out of fuel in Dubai? Tareeqk delivers petrol to your location 24/7. Fast, affordable emergency fuel delivery anywhere in Dubai. Call now.',
  title: 'Emergency Fuel Delivery in Dubai – Petrol to Your Location',
  heroImage: '/new/Recovery_Van.webp',
  heroAlt: 'Emergency Fuel Delivery Service Dubai',
  intro: 'Ran out of petrol in Dubai? We deliver enough fuel to get you safely to the nearest station — dispatched within 20 minutes.',
  responseTime: '20 minutes',
  responseDesc: 'Running out of fuel in the middle of Dubai traffic is stressful. Our team delivers an emergency supply of petrol to your exact location within 20 minutes on average — enough to get you safely to the nearest ENOC, ADNOC, or EPPCO station.',
  whatIsService: 'Emergency fuel delivery in Dubai is a roadside assistance service where a Tareeqk technician brings a measured amount of petrol directly to your stalled vehicle. This service covers all areas of Dubai and is available 24/7. We deliver enough fuel to restart your car and reach the nearest petrol station — no towing required.',
  areas: [
    'Dubai Marina', 'JVC', 'Business Bay', 'Deira', 'Al Quoz',
    'Jumeirah', 'Downtown Dubai', 'Al Barsha', 'Mirdif', 'JBR',
    'DIFC', 'Dubai Hills', 'Motor City', 'Al Nahda', 'Palm Jumeirah',
  ],
  whyUs: [
    '24/7 emergency fuel delivery — we never close.',
    'Fast 20-minute dispatch to your exact GPS location.',
    'Petrol delivered safely in approved containers by certified staff.',
    'Affordable emergency pricing, shown upfront in the Tareeqk app.',
  ],
  faqs: [
    {
      q: 'Can you deliver fuel to my car in Dubai?',
      a: 'Yes. Tareeqk delivers emergency petrol to your exact location 24/7 anywhere in Dubai. Share your GPS pin via the app or WhatsApp and we\'ll be there.',
    },
    {
      q: 'How much fuel do you deliver in an emergency?',
      a: 'We typically deliver enough fuel (5–10 litres) to safely restart your vehicle and reach the nearest petrol station. This is an emergency service, not a full tank refill.',
    },
    {
      q: 'What type of fuel do you deliver?',
      a: 'We currently deliver unleaded petrol (Special 95 and Super 98). Diesel delivery may be available on request — confirm when booking.',
    },
    {
      q: 'Is emergency fuel delivery expensive?',
      a: 'Our fuel delivery pricing is transparent and shown in the app before you confirm. You pay the fuel cost plus a small service fee. There are no hidden charges.',
    },
    {
      q: 'What if I run out of fuel on a Dubai highway?',
      a: 'Pull safely to the hard shoulder, turn on hazard lights, and call or WhatsApp us immediately. We are experienced with highway fuel delivery and will reach you fast.',
    },
  ],
  serviceType: 'Fuel Delivery',
  schemaName: 'Emergency Fuel Delivery Dubai',
  schemaDesc: '24/7 emergency fuel delivery service in Dubai. Petrol delivered to your exact location within 20 minutes. No towing needed.',
};

export default function FuelDeliveryDubai() {
  return <ServicePageTemplate config={config} />;
}