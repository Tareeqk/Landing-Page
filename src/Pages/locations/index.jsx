// pages/locations/index.jsx
// All 6 Dubai location pages — each is a separate export.
// Register each in your router: /car-recovery-dubai-marina, /car-recovery-jvc, etc.

import React from 'react';
import LocationPageTemplate from './LocationPageTemplate';

// ─────────────────────────────────────────
// 1. DUBAI MARINA
// ─────────────────────────────────────────
export function CarRecoveryDubaiMarina() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-dubai-marina',
      area: 'Dubai Marina',
      metaTitle: 'Car Recovery Dubai Marina – 24/7 Fast Response | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Dubai Marina. Tareeqk dispatches within 20 minutes, 24/7. Call or WhatsApp for instant help.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Dubai Marina',
      responseTime: '20 minutes',
      areaDesc: 'Dubai Marina is one of Dubai\'s busiest residential and tourism hubs, home to thousands of residents, hotels, and visitors. With heavy traffic on Marina Walk, Sheikh Zayed Road access roads, and the surrounding JBR area, vehicle breakdowns happen frequently. Tareeqk provides fast, reliable car recovery and roadside assistance throughout Dubai Marina and the surrounding waterfront district.',
      responseDesc: 'Our team has units positioned across the Marina and JBR area. Once you request help, the nearest available truck is dispatched immediately — reaching most Dubai Marina locations within 20 minutes.',
      faqs: [
        { q: 'How fast can you reach Dubai Marina?', a: 'Our average response time to Dubai Marina is 20 minutes. We have units positioned in the surrounding area for rapid dispatch.' },
        { q: 'Do you cover JBR and The Walk as well?', a: 'Yes. Our Dubai Marina coverage includes JBR, The Walk, Marina Promenade, and all surrounding streets and car parks.' },
        { q: 'What roadside assistance services are available in Dubai Marina?', a: 'All services are available: car recovery, towing, battery boost, flat tyre repair, fuel delivery, and accident recovery.' },
        { q: 'Can you recover a car from a Dubai Marina underground car park?', a: 'Yes. Our team is experienced with underground car park recoveries and has the appropriate equipment.' },
        { q: 'Is roadside assistance in Dubai Marina available 24/7?', a: 'Yes. Tareeqk operates 24 hours a day, 7 days a week, 365 days a year in Dubai Marina.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 2. JVC
// ─────────────────────────────────────────
export function CarRecoveryJVC() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-jvc',
      area: 'JVC',
      metaTitle: 'Car Recovery JVC (Jumeirah Village Circle) – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in JVC Dubai. Fast 20-minute response, 24/7 service. Call or WhatsApp Tareeqk for immediate help.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery JVC Jumeirah Village Circle Dubai',
      responseTime: '20 minutes',
      areaDesc: 'Jumeirah Village Circle (JVC) is a large, fast-growing residential community in Dubai with an extensive internal road network. Its circular layout and multiple entry/exit points can make navigation challenging — especially during a breakdown. Tareeqk\'s team knows JVC\'s road structure well and can locate and reach you quickly anywhere within the community.',
      responseDesc: 'JVC\'s circular internal roads can be confusing. Share your GPS pin via the Tareeqk app or WhatsApp and our team will navigate directly to you — typically arriving within 20 minutes.',
      faqs: [
        { q: 'Can you find me inside JVC if I\'m not sure of my exact location?', a: 'Yes. Share your GPS location via WhatsApp or the app and we\'ll navigate directly to you using your coordinates.' },
        { q: 'How quickly can Tareeqk reach JVC?', a: 'Our average response time in JVC is 20 minutes. We have units in the Al Barsha and surrounding areas ready to dispatch.' },
        { q: 'Do you cover JVT (Jumeirah Village Triangle) as well?', a: 'Yes. We cover both JVC and the adjacent JVT, as well as Dubai Sports City and Motor City nearby.' },
        { q: 'What if my car breaks down in a JVC basement car park?', a: 'We handle underground recoveries. Our technicians have the right equipment and experience for car park extractions.' },
        { q: 'Is car recovery available at night in JVC?', a: 'Yes — 24/7, including nights, weekends, and UAE public holidays.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 3. BUSINESS BAY
// ─────────────────────────────────────────
export function CarRecoveryBusinessBay() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-business-bay',
      area: 'Business Bay',
      metaTitle: 'Car Recovery Business Bay Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Business Bay Dubai. 20-minute response, 24/7 availability. Call or WhatsApp Tareeqk now.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Business Bay Dubai',
      responseTime: '20 minutes',
      areaDesc: 'Business Bay is Dubai\'s central business district, home to major corporate towers, hotels, and residential complexes along the Dubai Canal. With its dense traffic and underground car parks, vehicle issues are common. Tareeqk provides fast, professional car recovery and roadside assistance throughout Business Bay — minimising downtime for residents and professionals.',
      responseDesc: 'Business Bay is centrally located, which means our nearest unit is usually only minutes away. We navigate the area\'s busy roads and underground facilities efficiently, targeting a 20-minute response time.',
      faqs: [
        { q: 'Can you recover a car from a Business Bay office tower car park?', a: 'Yes. We handle multi-level and underground car park recoveries in Business Bay with appropriate equipment.' },
        { q: 'How fast is car recovery in Business Bay?', a: 'Average response time is 20 minutes. Business Bay\'s central location means we often reach you faster.' },
        { q: 'Do you cover the Downtown Dubai area nearby?', a: 'Yes. Our coverage extends to Downtown Dubai, DIFC, and the Dubai Canal waterfront area.' },
        { q: 'Is battery boost service available in Business Bay?', a: 'Yes. All our roadside services — battery boost, flat tyre, fuel delivery, and full recovery — are available in Business Bay.' },
        { q: 'Are you available on weekdays during business hours in Business Bay?', a: 'Yes — 24/7, which naturally includes all weekday business hours as well as evenings and weekends.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 4. DEIRA
// ─────────────────────────────────────────
export function CarRecoveryDeira() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-deira',
      area: 'Deira',
      metaTitle: 'Car Recovery Deira Dubai – 24/7 Fast Response | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Deira, Dubai. 24/7 service with 20-minute response. Covering all Deira streets and surrounding areas.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Deira Dubai',
      responseTime: '20 minutes',
      areaDesc: 'Deira is one of Dubai\'s oldest and most densely populated districts, with a complex network of streets, souks, and high-traffic corridors. From Deira City Centre to Al Rigga, Al Muteena, and the Port Saeed area, Tareeqk covers every corner of Deira with fast, reliable car recovery and roadside assistance.',
      responseDesc: 'Deira\'s dense street network requires local knowledge. Our team is familiar with all major routes and shortcuts in Deira, ensuring efficient navigation to your location with an average 20-minute response.',
      faqs: [
        { q: 'Do you cover all areas of Deira including Al Rigga and Port Saeed?', a: 'Yes. Our Deira coverage includes Al Rigga, Port Saeed, Al Muteena, Al Hamriya, Deira City Centre area, and all surrounding streets.' },
        { q: 'How quickly can you reach me in Deira?', a: 'Our average response time in Deira is 20 minutes. Traffic permitting, we often arrive faster.' },
        { q: 'Do you cover Sharjah border areas near Deira?', a: 'We primarily serve Dubai. For locations very close to the Sharjah border, contact us to confirm coverage for your specific location.' },
        { q: 'Is car battery replacement available in Deira?', a: 'Yes. Battery boost and replacement are available throughout Deira, 24/7.' },
        { q: 'Can you tow my car to a garage in Deira or another area?', a: 'Yes. We tow to any garage, dealership, or location of your choice within Dubai.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 5. AL QUOZ
// ─────────────────────────────────────────
export function CarRecoveryAlQuoz() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-al-quoz',
      area: 'Al Quoz',
      metaTitle: 'Car Recovery Al Quoz Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Al Quoz, Dubai. 20-minute response, 24/7. Covering Al Quoz Industrial, Al Quoz 1, 2, 3, 4.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Al Quoz Dubai',
      responseTime: '20 minutes',
      areaDesc: 'Al Quoz is a large mixed-use district in Dubai that includes industrial zones, warehouses, art spaces, and residential areas. It sits centrally between Sheikh Zayed Road and Al Khail Road, making it a key area for businesses and commuters alike. Tareeqk covers all of Al Quoz — including the Industrial areas 1, 2, 3, and 4 — with fast car recovery and roadside assistance.',
      responseDesc: 'Al Quoz\'s central location means our units are never far away. We cover all Al Quoz Industrial and residential sub-areas and aim for a 20-minute response time to any location within the district.',
      faqs: [
        { q: 'Do you cover Al Quoz Industrial areas?', a: 'Yes. We cover Al Quoz Industrial 1, 2, 3, and 4, as well as all residential and mixed-use parts of Al Quoz.' },
        { q: 'How fast can you reach Al Quoz?', a: 'Our average response time to Al Quoz is 20 minutes. The area\'s central location often means faster arrival.' },
        { q: 'Can you tow a heavy vehicle or van in Al Quoz?', a: 'Yes. We handle light commercial vehicles and vans in addition to standard cars. Contact us for heavy vehicle enquiries.' },
        { q: 'Is roadside assistance available in Al Quoz at night?', a: 'Yes — 24/7, including nights, weekends, and all UAE public holidays.' },
        { q: 'What areas near Al Quoz do you also cover?', a: 'We also cover Al Barsha, Motor City, Umm Al Sheif, Nad Al Sheba, and Downtown Dubai which are all adjacent to Al Quoz.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 6. JUMEIRAH
// ─────────────────────────────────────────
export function CarRecoveryJumeirah() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-jumeirah',
      area: 'Jumeirah',
      metaTitle: 'Car Recovery Jumeirah Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Jumeirah, Dubai. 24/7 service, 20-minute response. Covering Jumeirah 1, 2, 3, and surrounding areas.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Jumeirah Dubai',
      responseTime: '20 minutes',
      areaDesc: 'Jumeirah is one of Dubai\'s most prestigious coastal residential districts, spanning Jumeirah 1, 2, and 3 along the Arabian Gulf. With wide beachfront roads, Villa communities, and proximity to major landmarks, it\'s a key area for both residents and visitors. Tareeqk covers all of Jumeirah with fast, discreet, professional car recovery and roadside assistance.',
      responseDesc: 'Jumeirah\'s straight coastal roads and well-mapped streets allow our team to navigate quickly. We dispatch the nearest available unit to your location in Jumeirah and typically arrive within 20 minutes.',
      faqs: [
        { q: 'Do you cover Jumeirah 1, 2, and 3?', a: 'Yes. Our coverage spans all three Jumeirah districts — Jumeirah 1, Jumeirah 2, and Jumeirah 3 — as well as the coastal roads and beach areas.' },
        { q: 'How fast can you reach Jumeirah?', a: 'Our average response time in Jumeirah is 20 minutes. Jumeirah\'s clear road layout helps our team reach you efficiently.' },
        { q: 'Do you also cover Jumeirah Beach Road and Umm Suqeim?', a: 'Yes. We cover Jumeirah Beach Road, Umm Suqeim 1, 2, and 3, and areas up to the Madinat Jumeirah vicinity.' },
        { q: 'What if I break down near Kite Beach in Jumeirah?', a: 'We cover the entire Jumeirah coastal strip including Kite Beach, Black Palace Beach, and Jumeirah Open Beach.' },
        { q: 'Is car recovery available in Jumeirah on weekends?', a: 'Yes — we operate 24/7, seven days a week including all weekends and public holidays.' },
      ],
    }} />
  );
}