// pages/locations/index.jsx
// All 19 Dubai location pages — each is a separate export.
// Register each in your router using the slug in its config (e.g. /car-recovery-dubai-marina).
// Keep this list in sync with ALL_LOCATIONS in ./LocationPageTemplate.jsx

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
// 2. BUSINESS BAY
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
// 3. DOWNTOWN DUBAI
// ─────────────────────────────────────────
export function CarRecoveryDowntownDubai() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-downtown-dubai',
      area: 'Downtown Dubai',
      metaTitle: 'Car Recovery Downtown Dubai – 24/7 Fast Response | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Downtown Dubai. Tareeqk reaches Burj Khalifa, Dubai Mall and DIFC areas in 20 minutes, 24/7.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Downtown Dubai Burj Khalifa',
      responseTime: '20 minutes',
      areaDesc: 'Downtown Dubai is the city\'s most iconic district, home to the Burj Khalifa, Dubai Mall, and Sheikh Mohammed Bin Rashid Boulevard. Dense traffic, valet zones, and multi-level car parks make breakdowns particularly stressful here. Tareeqk provides fast, discreet car recovery and roadside assistance throughout Downtown Dubai, from the Opera District to Business Bay Crossing.',
      responseDesc: 'With units stationed close to Downtown\'s major towers, we navigate the Boulevard and surrounding service roads quickly — reaching most Downtown Dubai locations within 20 minutes, even during peak mall traffic.',
      faqs: [
        { q: 'Can you recover a car from a Dubai Mall or Burj Khalifa car park?', a: 'Yes. We regularly handle recoveries from the Dubai Mall, Burj Khalifa Residence, and Boulevard car parks, including valet areas.' },
        { q: 'How fast can Tareeqk reach Downtown Dubai?', a: 'Our average response time in Downtown Dubai is 20 minutes, even with the area\'s heavy traffic and one-way systems.' },
        { q: 'Do you cover DIFC and the Opera District too?', a: 'Yes. Our Downtown coverage extends to DIFC, the Opera District, and Business Bay Crossing.' },
        { q: 'Is roadside assistance available during Downtown Dubai events or fireworks nights?', a: 'Yes, though response times may vary slightly during major road closures for events like New Year\'s Eve.' },
        { q: 'Can you tow my car from Downtown Dubai to another emirate?', a: 'Yes. We can tow within Dubai or to neighbouring emirates — just let us know your destination when booking.' },
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
// 5. BUR DUBAI
// ─────────────────────────────────────────
export function CarRecoveryBurDubai() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-bur-dubai',
      area: 'Bur Dubai',
      metaTitle: 'Car Recovery Bur Dubai – 24/7 Fast Response | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Bur Dubai. Covering Al Fahidi, Al Mankhool and Dubai Creek. 20-minute response, 24/7.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Bur Dubai Al Fahidi Dubai Creek',
      responseTime: '20 minutes',
      areaDesc: 'Bur Dubai is one of the city\'s oldest and most culturally rich districts, with narrow streets around Al Fahidi, Meena Bazaar, and the Dubai Creek waterfront. The mix of historic lanes and busy commercial roads means breakdowns need a team that knows the area well. Tareeqk covers all of Bur Dubai with fast, experienced recovery and roadside support.',
      responseDesc: 'Our drivers know Bur Dubai\'s older street layout, from Al Mankhool to Oud Metha, and can navigate narrow lanes and souk traffic to reach you in around 20 minutes.',
      faqs: [
        { q: 'Do you cover the Al Fahidi and Meena Bazaar areas?', a: 'Yes. Our Bur Dubai coverage includes Al Fahidi, Meena Bazaar, Al Mankhool, and the Dubai Creek waterfront.' },
        { q: 'How quickly can you reach Bur Dubai?', a: 'Average response time is 20 minutes, accounting for Bur Dubai\'s narrower streets and souk-area traffic.' },
        { q: 'Do you also cover Oud Metha nearby?', a: 'Yes, Oud Metha and the surrounding Healthcare City area are part of our Bur Dubai coverage zone.' },
        { q: 'Can you help if my car breaks down near Dubai Creek?', a: 'Yes. We cover the full Creek-side stretch including Al Seef and the abra station areas.' },
        { q: 'Is night-time recovery available in Bur Dubai?', a: 'Yes, we operate 24/7 across Bur Dubai including late nights and early mornings.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 6. AL BARSHA
// ─────────────────────────────────────────
export function CarRecoveryAlBarsha() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-al-barsha',
      area: 'Al Barsha',
      metaTitle: 'Car Recovery Al Barsha Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Al Barsha, Dubai. Covering Al Barsha 1, 2, 3 and Mall of the Emirates area. 20-minute response.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Al Barsha Dubai Mall of the Emirates',
      responseTime: '20 minutes',
      areaDesc: 'Al Barsha is a major residential and commercial district stretching along Sheikh Zayed Road near the Mall of the Emirates. With Al Barsha 1, 2, and 3 covering a wide stretch of villas, apartments, and labour accommodation zones, the area sees a steady stream of recovery requests. Tareeqk covers every part of Al Barsha with rapid, round-the-clock response.',
      responseDesc: 'Positioned close to Sheikh Zayed Road, our units can reach most Al Barsha addresses — including the areas around Mall of the Emirates — within 20 minutes.',
      faqs: [
        { q: 'Do you cover Al Barsha 1, 2, and 3?', a: 'Yes. We cover all of Al Barsha 1, 2, 3, and South, plus the areas around Mall of the Emirates.' },
        { q: 'How fast can you reach Al Barsha?', a: 'Our average response time in Al Barsha is 20 minutes thanks to our Sheikh Zayed Road positioning.' },
        { q: 'Can you recover a car from a Mall of the Emirates car park?', a: 'Yes. We handle multi-level mall car park recoveries regularly in this area.' },
        { q: 'Do you cover Al Barsha South and the labour accommodation areas?', a: 'Yes, our coverage extends to Al Barsha South and the surrounding industrial and accommodation zones.' },
        { q: 'Is roadside assistance available in Al Barsha at night?', a: 'Yes — 24/7, including nights, weekends, and public holidays.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 7. JUMEIRAH
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

// ─────────────────────────────────────────
// 8. JVC
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
// 9. JLT (JUMEIRAH LAKE TOWERS)
// ─────────────────────────────────────────
export function CarRecoveryJLT() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-jlt',
      area: 'JLT',
      metaTitle: 'Car Recovery JLT (Jumeirah Lake Towers) – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in JLT Dubai. Covering all clusters around the lakes. 20-minute response, 24/7 service.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery JLT Jumeirah Lake Towers Dubai',
      responseTime: '20 minutes',
      areaDesc: 'Jumeirah Lake Towers (JLT) is a dense cluster of high-rise towers built around a series of man-made lakes, just off Sheikh Zayed Road near Dubai Marina. With dozens of numbered clusters and shared basement car parks, finding a specific tower during a breakdown can be tricky. Tareeqk\'s team knows the cluster layout well and dispatches quickly to any JLT address.',
      responseDesc: 'We know JLT\'s cluster numbering system and basement parking layouts, so our team can locate your tower quickly — typically arriving within 20 minutes.',
      faqs: [
        { q: 'Can you find my tower if I only know the cluster number?', a: 'Yes. Just share your cluster number and tower name and we\'ll navigate directly to you.' },
        { q: 'How fast can Tareeqk reach JLT?', a: 'Our average response time in JLT is 20 minutes, with units positioned nearby in Dubai Marina and JVC.' },
        { q: 'Do you cover the JLT basement and podium car parks?', a: 'Yes. We regularly recover vehicles from basement and podium-level parking across JLT towers.' },
        { q: 'Is JLT covered alongside Dubai Marina and JVC?', a: 'Yes — JLT sits between our Marina and JVC coverage zones, so response is fast either way.' },
        { q: 'Can you tow my car out of JLT to a garage elsewhere?', a: 'Yes. We can tow to any garage or dealership across Dubai.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 10. DUBAI SILICON OASIS
// ─────────────────────────────────────────
export function CarRecoveryDubaiSiliconOasis() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-dubai-silicon-oasis',
      area: 'Dubai Silicon Oasis',
      metaTitle: 'Car Recovery Dubai Silicon Oasis – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Dubai Silicon Oasis. Covering DSO residential and tech park zones. 25-minute response, 24/7.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Dubai Silicon Oasis DSO',
      responseTime: '25 minutes',
      areaDesc: 'Dubai Silicon Oasis (DSO) is a free zone and residential community built around a technology park, located along Sheikh Mohammed Bin Zayed Road. It combines villa communities, apartment clusters, and commercial tech offices spread across a wide area. Tareeqk covers all of DSO with reliable recovery and roadside assistance, from the residential zones to the business park.',
      responseDesc: 'DSO\'s wide layout means slightly longer travel distances, but our units cover the area regularly — reaching most locations within 25 minutes.',
      faqs: [
        { q: 'Do you cover both the residential and tech park areas of DSO?', a: 'Yes. We cover all of Dubai Silicon Oasis, including the villa clusters and the business park.' },
        { q: 'How long does it take to reach Dubai Silicon Oasis?', a: 'Our average response time is 25 minutes due to DSO\'s wider road network.' },
        { q: 'Do you also serve the areas near DSO like Al Ain Road?', a: 'Yes, we cover the surrounding stretches of Sheikh Mohammed Bin Zayed Road near DSO.' },
        { q: 'Can you help with a flat tyre at a DSO office building?', a: 'Yes, flat tyre repair is available throughout DSO at any office or residential location.' },
        { q: 'Is recovery available in DSO on weekends?', a: 'Yes, we operate 24/7, seven days a week, in Dubai Silicon Oasis.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 11. INTERNATIONAL CITY
// ─────────────────────────────────────────
export function CarRecoveryInternationalCity() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-international-city',
      area: 'International City',
      metaTitle: 'Car Recovery International City Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in International City, Dubai. Covering all country clusters and Dragon Mart. 25-minute response.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery International City Dubai Dragon Mart',
      responseTime: '25 minutes',
      areaDesc: 'International City is a large residential community made up of country-themed clusters — China, Russia, Morocco, Spain and more — surrounding the Dragon Mart shopping complex. Its repeating block layout and similar street names can make a breakdown location hard to describe. Tareeqk\'s drivers are familiar with the cluster naming system and reach any block quickly.',
      responseDesc: 'Share your cluster name and building number, or drop a GPS pin, and our team will navigate directly to you — usually within 25 minutes.',
      faqs: [
        { q: 'How do I describe my location if I don\'t know my exact cluster?', a: 'Share a GPS pin via WhatsApp or the app and we\'ll find you without needing the cluster name.' },
        { q: 'How fast can you reach International City?', a: 'Our average response time is 25 minutes given the area\'s size and distance from central Dubai.' },
        { q: 'Do you cover the area around Dragon Mart?', a: 'Yes, Dragon Mart 1 and 2 and the surrounding clusters are fully covered.' },
        { q: 'Can you recover a car from inside a cluster\'s internal parking?', a: 'Yes, our team is experienced with the internal block parking layout across International City.' },
        { q: 'Is roadside assistance available at night in International City?', a: 'Yes — 24/7, including nights and weekends.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 12. DUBAI INVESTMENT PARK (DIP)
// ─────────────────────────────────────────
export function CarRecoveryDIP() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-dubai-investment-park',
      area: 'Dubai Investment Park (DIP)',
      metaTitle: 'Car Recovery Dubai Investment Park (DIP) – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Dubai Investment Park (DIP). Covering DIP 1 and 2, residential and industrial zones. 30-minute response.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Dubai Investment Park DIP',
      responseTime: '30 minutes',
      areaDesc: 'Dubai Investment Park (DIP) is a sprawling mixed-use zone combining residential communities, warehouses, and light industrial units near Expo City and Al Maktoum Airport. Its scale and the mix of residential DIP 2 villas with industrial DIP 1 facilities mean recovery jobs here often involve longer distances. Tareeqk covers all of DIP with dependable, scheduled or emergency dispatch.',
      responseDesc: 'Given DIP\'s distance from central Dubai, we aim for a 30-minute response, with units that regularly service the surrounding Jebel Ali and Expo corridor.',
      faqs: [
        { q: 'Do you cover both DIP 1 and DIP 2?', a: 'Yes. We cover the full Dubai Investment Park area, including residential DIP 2 and industrial DIP 1.' },
        { q: 'How long does recovery take in DIP?', a: 'Our average response time is 30 minutes due to the area\'s distance from central Dubai.' },
        { q: 'Can you recover a commercial vehicle or van from a DIP warehouse?', a: 'Yes, we handle light commercial vehicles and vans in addition to standard cars.' },
        { q: 'Do you also cover areas near Expo City close to DIP?', a: 'Yes, our DIP coverage extends to the surrounding Expo City and Al Maktoum Airport corridor.' },
        { q: 'Is 24/7 service available in DIP?', a: 'Yes, including nights and weekends, though we recommend calling ahead for very remote warehouse locations.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 13. DUBAI SPORTS CITY
// ─────────────────────────────────────────
export function CarRecoveryDubaiSportsCity() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-dubai-sports-city',
      area: 'Dubai Sports City',
      metaTitle: 'Car Recovery Dubai Sports City – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Dubai Sports City. Covering all residential towers and stadium areas. 25-minute response, 24/7.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Dubai Sports City Dubai',
      responseTime: '25 minutes',
      areaDesc: 'Dubai Sports City is a residential and sporting hub built around several stadiums and academies, located off Sheikh Mohammed Bin Zayed Road near Motor City. With a mix of apartment towers, villa clusters, and event-day traffic around the cricket stadium and golf courses, vehicle issues here need a team that can adapt quickly. Tareeqk covers the full Sports City area.',
      responseDesc: 'We track event schedules around the stadiums to plan routes accordingly, generally reaching Dubai Sports City addresses within 25 minutes.',
      faqs: [
        { q: 'Do you cover the residential towers in Dubai Sports City?', a: 'Yes, we cover all residential clusters as well as the area around the stadiums and academies.' },
        { q: 'How fast can you reach Dubai Sports City?', a: 'Average response time is 25 minutes, slightly longer on event days due to stadium traffic.' },
        { q: 'Is recovery available during cricket or golf events nearby?', a: 'Yes, though response may take a little longer during major events due to road closures.' },
        { q: 'Do you also cover Motor City next door?', a: 'Yes, Motor City is part of our adjacent coverage area as well.' },
        { q: 'Is roadside assistance available at night in Dubai Sports City?', a: 'Yes — 24/7, including nights and weekends.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 14. MOTOR CITY
// ─────────────────────────────────────────
export function CarRecoveryMotorCity() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-motor-city',
      area: 'Motor City',
      metaTitle: 'Car Recovery Motor City Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Motor City, Dubai. Covering Green Community and Dubai Autodrome areas. 25-minute response.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Motor City Dubai Autodrome',
      responseTime: '25 minutes',
      areaDesc: 'Motor City is a residential community centred around the Dubai Autodrome, home to the Green Community villas and several apartment clusters. Located close to Dubai Sports City and Al Qudra Road, it\'s popular with families and motorsport enthusiasts alike. Tareeqk covers all of Motor City, from the Green Community to the Autodrome service roads.',
      responseDesc: 'Our units regularly service the Motor City and Sports City corridor, reaching most addresses within 25 minutes, including evenings around track-day events.',
      faqs: [
        { q: 'Do you cover the Green Community in Motor City?', a: 'Yes, the Green Community villas and apartments are fully within our Motor City coverage.' },
        { q: 'How fast can you reach Motor City?', a: 'Our average response time is 25 minutes for Motor City addresses.' },
        { q: 'Can you help near the Dubai Autodrome on event days?', a: 'Yes, though response may be slightly delayed during major race or track events due to road closures.' },
        { q: 'Do you also cover Sports City and Al Qudra Road nearby?', a: 'Yes, both areas are part of our extended coverage zone alongside Motor City.' },
        { q: 'Is recovery available in Motor City at night?', a: 'Yes — 24/7, including nights, weekends, and holidays.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 15. MIRDIF
// ─────────────────────────────────────────
export function CarRecoveryMirdif() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-mirdif',
      area: 'Mirdif',
      metaTitle: 'Car Recovery Mirdif Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Mirdif, Dubai. Covering all Mirdif villa communities and Mirdif City Centre. 25-minute response.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Mirdif Dubai',
      responseTime: '25 minutes',
      areaDesc: 'Mirdif is a quiet, established villa community in eastern Dubai, close to Dubai International Airport and Mirdif City Centre. Its grid of residential streets and proximity to Emirates Road make it a popular family neighbourhood, though its distance from central Dubai means breakdowns can leave drivers waiting longer with other providers. Tareeqk covers Mirdif with the same 24/7 dispatch as the rest of the city.',
      responseDesc: 'We keep units positioned to serve eastern Dubai communities like Mirdif, typically reaching villa addresses or the City Centre area within 25 minutes.',
      faqs: [
        { q: 'Do you cover all Mirdif villa communities?', a: 'Yes, we cover all of Mirdif\'s residential streets and villa clusters.' },
        { q: 'How fast can you reach Mirdif?', a: 'Our average response time in Mirdif is 25 minutes, given its distance from central Dubai.' },
        { q: 'Can you recover a car from near Mirdif City Centre?', a: 'Yes, the City Centre area and surrounding streets are part of our standard Mirdif coverage.' },
        { q: 'Do you cover areas near Dubai Airport close to Mirdif?', a: 'Yes, our coverage extends to the areas bordering Dubai International Airport.' },
        { q: 'Is car recovery available in Mirdif on public holidays?', a: 'Yes, we operate 24/7, including all UAE public holidays.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 16. AL QUSAIS
// ─────────────────────────────────────────
export function CarRecoveryAlQusais() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-al-qusais',
      area: 'Al Qusais',
      metaTitle: 'Car Recovery Al Qusais Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Al Qusais, Dubai. Covering residential and industrial zones near Sharjah border. 20-minute response.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Al Qusais Dubai',
      responseTime: '20 minutes',
      areaDesc: 'Al Qusais is a busy residential and industrial district in northern Dubai, close to the Sharjah border and Dubai International Airport. It combines older apartment buildings, labour accommodation, and a sizable industrial zone, all served by busy roads like Damascus Street and the Al Ittihad corridor. Tareeqk covers all of Al Qusais with fast, reliable recovery and roadside support.',
      responseDesc: 'Our team knows Al Qusais\' mix of residential streets and industrial roads well, and typically reaches you within 20 minutes regardless of which side of the district you\'re on.',
      faqs: [
        { q: 'Do you cover both Al Qusais residential and industrial areas?', a: 'Yes, we cover all of Al Qusais, including the industrial zone and residential clusters.' },
        { q: 'How fast can you reach Al Qusais?', a: 'Our average response time in Al Qusais is 20 minutes.' },
        { q: 'Do you cover areas near the Sharjah border close to Al Qusais?', a: 'We primarily serve Dubai; for locations right at the border, contact us to confirm coverage.' },
        { q: 'Can you help with a flat tyre in the Al Qusais industrial area?', a: 'Yes, flat tyre repair and all roadside services are available throughout the industrial zone.' },
        { q: 'Is recovery available in Al Qusais at night?', a: 'Yes — 24/7, including nights and weekends.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 17. AL QUOZ
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
// 18. JEBEL ALI
// ─────────────────────────────────────────
export function CarRecoveryJebelAli() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-jebel-ali',
      area: 'Jebel Ali',
      metaTitle: 'Car Recovery Jebel Ali Dubai – 24/7 | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance in Jebel Ali, Dubai. Covering the free zone, port area and residential village. 30-minute response.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Jebel Ali Dubai Free Zone',
      responseTime: '30 minutes',
      areaDesc: 'Jebel Ali is home to one of the world\'s largest man-made ports and a major free zone, alongside the residential Jebel Ali Village and Discovery Gardens nearby. The area\'s industrial scale, heavy truck traffic, and long internal roads mean recovery here often covers more ground than in central Dubai. Tareeqk services all of Jebel Ali, from the port and free zone to the residential pockets.',
      responseDesc: 'Given Jebel Ali\'s size and distance from the city centre, we aim for a 30-minute response, with units that regularly cover the wider Jebel Ali–DIP corridor.',
      faqs: [
        { q: 'Do you cover the Jebel Ali Free Zone and port area?', a: 'Yes, we cover the Free Zone, port area, and surrounding industrial roads.' },
        { q: 'How long does recovery take in Jebel Ali?', a: 'Our average response time is 30 minutes due to the area\'s scale and distance from central Dubai.' },
        { q: 'Can you recover a truck or commercial vehicle in Jebel Ali?', a: 'Yes, we handle light commercial vehicles and vans; contact us for heavy vehicle enquiries.' },
        { q: 'Do you cover Jebel Ali Village and Discovery Gardens nearby?', a: 'Yes, both residential areas are part of our Jebel Ali coverage zone.' },
        { q: 'Is recovery available in Jebel Ali at night?', a: 'Yes — 24/7, including nights and weekends, though we recommend confirming exact gate or access details in advance for free zone locations.' },
      ],
    }} />
  );
}

// ─────────────────────────────────────────
// 19. PALM JUMEIRAH
// ─────────────────────────────────────────
export function CarRecoveryPalmJumeirah() {
  return (
    <LocationPageTemplate config={{
      slug: 'car-recovery-palm-jumeirah',
      area: 'Palm Jumeirah',
      metaTitle: 'Car Recovery Palm Jumeirah – 24/7 Fast Response | Tareeqk',
      metaDesc: 'Car recovery and roadside assistance on Palm Jumeirah, Dubai. Covering the Trunk, Fronds and Crescent. 25-minute response, 24/7.',
      heroImage: '/new/Recovery_Van.webp',
      heroAlt: 'Car Recovery Palm Jumeirah Dubai',
      responseTime: '25 minutes',
      areaDesc: 'Palm Jumeirah is Dubai\'s iconic man-made island, with villas along the Fronds, apartments on the Trunk, and resorts on the outer Crescent. Because the island connects to the mainland by a single access road, breakdowns here can mean a longer wait with the wrong provider. Tareeqk keeps units ready to cross onto the Palm quickly and reach any Frond, the Trunk, or the Crescent.',
      responseDesc: 'We monitor traffic on the Palm\'s access bridge and plan routes accordingly, generally reaching Trunk and Frond addresses within 25 minutes.',
      faqs: [
        { q: 'Do you cover all the Fronds on Palm Jumeirah?', a: 'Yes, we cover every Frond, the Trunk, and the outer Crescent resorts.' },
        { q: 'How fast can you reach Palm Jumeirah?', a: 'Our average response time is 25 minutes, accounting for the single access road onto the island.' },
        { q: 'Can you recover a car from a Palm Jumeirah villa driveway?', a: 'Yes, our team is experienced with Frond villa access and gated community entry.' },
        { q: 'Do you cover the hotels and resorts on the Crescent?', a: 'Yes, the Crescent resorts and surrounding access roads are part of our Palm Jumeirah coverage.' },
        { q: 'Is roadside assistance available on Palm Jumeirah at night?', a: 'Yes — 24/7, including nights, weekends, and public holidays.' },
      ],
    }} />
  );
}