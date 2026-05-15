// pages/services/AccidentRecoveryDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'accident-recovery-dubai',
  metaTitle: 'Accident Recovery Dubai – 24/7 Emergency Towing | Tareeqk',
  metaDesc: 'Car accident in Dubai? Tareeqk provides 24/7 emergency accident recovery and towing. Fast response, RTA-licensed. Call or WhatsApp us immediately.',
  title: 'Accident Recovery in Dubai – 24/7 Emergency Response',
  heroImage: '/new/Recovery_Van.webp',
  heroAlt: 'Accident Recovery Service Dubai',
  intro: 'Been in an accident in Dubai? Stay safe — we handle the recovery. Our RTA-licensed team arrives fast and transports your vehicle safely.',
  responseTime: '20 minutes',
  responseDesc: 'Accident scenes require speed and precision. Tareeqk\'s accident recovery units are equipped with heavy-duty flatbed trucks and wheel-lift rigs to safely recover damaged vehicles from any position — on the road, in a ditch, or against a barrier.',
  whatIsService: 'Accident recovery in Dubai is an emergency service that safely removes and transports your damaged vehicle from an accident site. Tareeqk\'s certified recovery team handles all vehicle types — from sedans to SUVs and light commercial vehicles — and can transport your car to a police-approved garage, your insurance company\'s preferred repairer, or any location you choose.',
  areas: [
    'Dubai Marina', 'Business Bay', 'Sheikh Zayed Road', 'Deira',
    'Al Quoz', 'Jumeirah', 'Downtown Dubai', 'Al Barsha', 'JVC',
    'Mirdif', 'Al Nahda', 'Dubai Hills', 'Motor City', 'DIFC', 'JBR',
  ],
  whyUs: [
    '24/7 emergency accident recovery with RTA-licensed operators.',
    'Heavy-duty flatbed trucks for damaged, non-drivable vehicles.',
    'Transport to your chosen garage, insurer, or any Dubai location.',
    'Experienced team that coordinates with Dubai Police when needed.',
  ],
  faqs: [
    {
      q: 'What should I do after a car accident in Dubai?',
      a: 'Stay calm and safe. Turn on hazard lights, call Dubai Police (999) to file a report, then call Tareeqk for immediate accident recovery. Do not move the vehicle until police have attended if required.',
    },
    {
      q: 'Do I need a police report before you recover my car?',
      a: 'For accidents in Dubai, a police report is generally required by insurance companies. We recommend calling Dubai Police (999) first. Our team can wait on-site or arrive simultaneously.',
    },
    {
      q: 'Can you recover a car that won\'t start or drive after an accident?',
      a: 'Yes. Our flatbed recovery trucks can safely load and transport completely non-drivable vehicles, including those with airbag deployment or front-end damage.',
    },
    {
      q: 'Where will you take my car after an accident?',
      a: 'We transport your vehicle to any location of your choice — your insurer\'s approved garage, your own mechanic, a dealership service centre, or your home. You decide.',
    },
    {
      q: 'Do you handle accident recovery on Dubai highways like E11?',
      a: 'Yes. We are experienced with highway accident recovery on Sheikh Zayed Road (E11), Emirates Road (E611), and all other Dubai motorways.',
    },
  ],
  serviceType: 'Accident Recovery',
  schemaName: 'Accident Recovery Dubai',
  schemaDesc: '24/7 emergency accident recovery and towing in Dubai. RTA-licensed, flatbed trucks, fast response. Transport to any garage or location.',
};

export default function AccidentRecoveryDubai() {
  return <ServicePageTemplate config={config} />;
}