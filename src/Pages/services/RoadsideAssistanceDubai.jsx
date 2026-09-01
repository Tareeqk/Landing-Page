// pages/services/RoadsideAssistanceDubai.jsx
//
// Deliberately built as its own page rather than folded into Car Recovery
// Dubai. "Roadside assistance dubai" is a real, separately-searched head
// term -- every competitor actually ranking for it (quickfitautos.com/rsa,
// alqusaisgarage.ae/roadside-assistance, ersa.ae) has a dedicated page
// whose title/H1/URL lead with the phrase itself. Tareeqk had the phrase
// buried as a secondary mention on the homepage and nowhere else, which is
// why it wasn't ranking. This page targets it directly as the umbrella
// term (battery/tyre/fuel/lockout/recovery collectively), positioned
// alongside Car Recovery Dubai rather than competing with it.
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'roadside-assistance-dubai',
  metaTitle: 'Roadside Assistance Dubai – 24/7 Emergency Help | Tareeqk',
  metaDesc: 'Need roadside assistance in Dubai? Tareeqk offers 24/7 emergency help — battery boost, flat tyre, fuel delivery, lockouts, and recovery. Call or WhatsApp now.',
  title: 'Roadside Assistance in Dubai',
  heroImage: '/new/Recovery_Van.webp',
  heroAlt: 'Roadside Assistance Dubai',
  intro: 'Stuck with a dead battery, flat tyre, empty tank, or locked out? Tareeqk\'s 24/7 roadside assistance covers every kind of breakdown in Dubai — one call gets you a certified technician, fast.',
  responseTime: '15 minutes',
  responseDesc: 'Whatever\'s gone wrong with your car, the nearest available Tareeqk unit is dispatched the moment you request help — day or night, anywhere in Dubai.',
  whatIsService: 'Roadside assistance is on-the-spot help for any vehicle problem that leaves you stranded — a dead battery, a flat tyre, an empty tank, a locked car, or a breakdown that needs full recovery. Tareeqk brings every one of these services under one 24/7 dispatch: certified technicians reach you wherever you are in Dubai, diagnose the issue on-site, and either fix it there or arrange recovery to a garage of your choice.',
  areas: [
    'Dubai Marina', 'Business Bay', 'Downtown Dubai', 'Deira', 'Bur Dubai',
    'Al Barsha', 'Jumeirah', 'JVC', 'JLT', 'Dubai Silicon Oasis',
    'International City', 'Dubai Investment Park', 'Dubai Sports City', 'Motor City', 'Mirdif',
    'Al Qusais', 'Al Quoz', 'Jebel Ali', 'Palm Jumeirah',
    'DIFC', 'Dubai Hills Estate', 'Discovery Gardens', 'Al Nahda', 'Barsha Heights',
  ],
  whyUs: [
    'One number for every roadside problem — battery, tyre, fuel, lockout, or full recovery.',
    '24/7 dispatch with certified technicians and RTA-licensed operators.',
    'Transparent pricing confirmed by WhatsApp before any technician is sent.',
    'Coverage across every district in Dubai, from Downtown to the outer suburbs.',
  ],
  faqs: [
    {
      q: 'What counts as roadside assistance?',
      a: 'Any on-the-spot help for a stranded vehicle — battery jump-starts, flat tyre changes, fuel delivery, lockout assistance, and full car recovery if your vehicle can\'t be fixed on-site.',
    },
    {
      q: 'How fast is roadside assistance in Dubai?',
      a: 'Average response time is 15 minutes, though it can vary slightly by area and traffic. Share your live location by phone, WhatsApp, or the app for the fastest dispatch.',
    },
    {
      q: 'Is roadside assistance available 24/7 in Dubai?',
      a: 'Yes. Tareeqk operates 24 hours a day, 7 days a week, including public holidays, across every district in Dubai.',
    },
    {
      q: 'Can you fix my car on the spot, or do you always tow it?',
      a: 'Many issues — dead batteries, flat tyres, empty tanks, lockouts — are resolved on-site. If the problem needs a workshop, we arrange recovery to a garage of your choice instead.',
    },
    {
      q: 'How much does roadside assistance cost in Dubai?',
      a: 'Pricing depends on the service and your location. We confirm an exact quote over WhatsApp or phone before dispatching a technician, with no hidden fees.',
    },
    {
      q: 'Do you offer roadside assistance for all vehicle types?',
      a: 'Yes. We assist sedans, SUVs, luxury and sports cars, electric vehicles, vans, and light commercial vehicles.',
    },
    {
      q: 'How do I request roadside assistance from Tareeqk?',
      a: 'Call us, message us on WhatsApp, or open the Tareeqk app and share your location — the nearest available technician is dispatched immediately.',
    },
  ],
  serviceType: 'Roadside Assistance',
  schemaName: 'Roadside Assistance Dubai',
  schemaDesc: '24/7 roadside assistance in Dubai covering battery jump-starts, flat tyre repair, fuel delivery, lockout help, and full vehicle recovery.',
};

export default function RoadsideAssistanceDubai() {
  return <ServicePageTemplate config={config} />;
}
