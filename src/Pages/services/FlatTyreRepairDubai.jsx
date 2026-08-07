// pages/services/FlatTyreRepairDubai.jsx
import React from 'react';
import ServicePageTemplate from './ServicePageTemplate';

const config = {
  slug: 'flat-tyre-repair-dubai',
  metaTitle: 'Flat Tyre Repair & Replacement Dubai – 24/7 | Tareeqk',
  metaDesc: 'Flat tyre in Dubai? Tareeqk\'s mobile tyre service comes to you 24/7. Puncture repair or full tyre replacement on-site. Call or WhatsApp now.',
  title: 'Flat Tyre Repair in Dubai ',
  heroImage: '/new/third_img.webp',
  heroAlt: 'Flat Tyre Repair Service Dubai',
  intro: 'Flat tyre anywhere in Dubai? We dispatch a tyre technician directly to your location — no need to drive on a rim or call a tow.',
  responseTime: '20 minutes',
  responseDesc: 'A flat tyre stops you instantly. Our mobile tyre technicians are stationed across Dubai and dispatch to your GPS pin within 20 minutes on average — handling puncture repairs and full tyre swaps on-site.',
  whatIsService: 'Flat tyre repair service in Dubai means a certified technician comes to your exact location with the tools to patch a puncture or fit a replacement tyre on the spot. Tareeqk\'s mobile units carry tyre repair kits and a selection of common tyre sizes suitable for the most popular cars in the UAE, saving you the risk and damage of driving on a flat.',
  areas: [
    'Dubai Marina', 'Business Bay', 'Downtown Dubai', 'Deira', 'Bur Dubai',
    'Al Barsha', 'Jumeirah', 'JVC', 'JLT', 'Dubai Silicon Oasis',
    'International City', 'Dubai Investment Park', 'Dubai Sports City', 'Motor City', 'Mirdif',
    'Al Qusais', 'Al Quoz', 'Jebel Ali', 'Palm Jumeirah',
  ],
  whyUs: [
    '24/7 mobile tyre service — we come to your car, wherever it is.',
    'Puncture repair and full tyre replacement available on-site.',
    'Transparent pricing with no surprise charges.',
    'Experienced technicians with proper jacking and safety equipment.',
  ],
  faqs: [
    {
      q: 'Can you fix a flat tyre at my location in Dubai?',
      a: 'Yes. Our mobile tyre technicians come to your exact location with the equipment to repair a puncture or fit a replacement tyre on-site.',
    },
    {
      q: 'How long does a flat tyre repair take on-site?',
      a: 'A standard puncture repair takes 15–30 minutes on-site once our technician arrives. A full tyre replacement takes a similar amount of time depending on the vehicle.',
    },
    {
      q: 'What if you don\'t have my tyre size?',
      a: 'If we don\'t carry the exact tyre size, we can fit your spare tyre safely and arrange for a proper replacement at your preferred tyre shop.',
    },
    {
      q: 'Is it safe to drive on a flat tyre to a garage?',
      a: 'No. Driving on a flat tyre quickly damages the rim and can create a dangerous handling situation, especially at highway speeds. Call us — we come to you.',
    },
    {
      q: 'Do you provide flat tyre service on Dubai highways?',
      a: 'Yes. We handle tyre repairs on all Dubai roads including Sheikh Zayed Road and other major highways. Safety of your vehicle and our technicians is always observed.',
    },
    {
      q: 'Why choose Tareeqk for flat tyre repair in Dubai?',
      a: 'Tareeqk offers fast response times, experienced technicians, transparent pricing, 24/7 roadside assistance, and reliable mobile tyre repair services across Dubai, helping drivers get back on the road safely and efficiently.',
    },
    {
      q: 'Who provides the fastest flat tyre repair in Dubai?',
      a: 'Tareeqk provides fast and reliable flat tyre repair services across Dubai. Our mobile technicians are dispatched to your location as quickly as possible, whether you\'re at home, work, on the roadside, or on a highway. We aim to minimize your downtime with prompt, professional roadside assistance available 24/7.',
    },
    {
      q: 'Do you offer emergency flat tire repair anywhere in Dubai?',
      a: 'Yes. Tareeqk provides emergency mobile flat tyre repair across Dubai. Whether you\'re at home, work, a parking area, or stranded on the roadside, our technicians will come to your location and get you back on the road quickly.',
    },
  ],
  serviceType: 'Flat Tyre Repair',
  schemaName: 'Flat Tyre Repair Dubai',
  schemaDesc: '24/7 mobile flat tyre repair and replacement service in Dubai. Puncture repair or full tyre swap at your location, fast 20-minute dispatch.',
};

export default function FlatTyreRepairDubai() {
  return <ServicePageTemplate config={config} />;
}