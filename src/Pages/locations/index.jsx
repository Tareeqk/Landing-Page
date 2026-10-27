import React from 'react';
import { useTranslation } from 'react-i18next';
import LocationPageTemplate from './LocationPageTemplate';

// All 19 location slugs that exist as top-level keys in common.json
const LOCATION_SLUGS = [
  'car-recovery-dubai-marina',
  'car-recovery-business-bay',
  'car-recovery-downtown-dubai',
  'car-recovery-deira',
  'car-recovery-bur-dubai',
  'car-recovery-al-barsha',
  'car-recovery-jumeirah',
  'car-recovery-jvc',
  'car-recovery-jlt',
  'car-recovery-dubai-silicon-oasis',
  'car-recovery-international-city',
  'car-recovery-dubai-investment-park',
  'car-recovery-dubai-sports-city',
  'car-recovery-motor-city',
  'car-recovery-mirdif',
  'car-recovery-al-qusais',
  'car-recovery-al-quoz',
  'car-recovery-jebel-ali',
  'car-recovery-palm-jumeirah',
  'car-recovery-difc',
  'car-recovery-dubai-hills-estate',
  'car-recovery-discovery-gardens',
  'car-recovery-al-nahda',
  'car-recovery-barsha-heights',
];

// Single reusable component — reads its data from common.json via useTranslation
function LocationPage({ slug }) {
  const { t, ready } = useTranslation('common');

  if (!ready) return null;

  const entry = t(slug, { returnObjects: true });

  const config = {
    slug,
    area:         entry.area,
    metaTitle:    entry.meta.title,
    metaDesc:     entry.meta.description,
    heroImage:    entry.heroImage,
    heroAlt:      entry.heroAlt,
    responseTime: entry.responseTime,
    areaDesc:     entry.areaDescription,
    responseDesc: entry.responseDescription,
    faqs:         entry.faqs.map(({ question, answer }) => ({ q: question, a: answer })),
  };

  return <LocationPageTemplate config={config} />;
}

// ── Named exports (keeps App.jsx and any direct imports working) ──

export const CarRecoveryDubaiMarina         = () => <LocationPage slug="car-recovery-dubai-marina" />;
export const CarRecoveryBusinessBay         = () => <LocationPage slug="car-recovery-business-bay" />;
export const CarRecoveryDowntownDubai       = () => <LocationPage slug="car-recovery-downtown-dubai" />;
export const CarRecoveryDeira               = () => <LocationPage slug="car-recovery-deira" />;
export const CarRecoveryBurDubai            = () => <LocationPage slug="car-recovery-bur-dubai" />;
export const CarRecoveryAlBarsha            = () => <LocationPage slug="car-recovery-al-barsha" />;
export const CarRecoveryJumeirah            = () => <LocationPage slug="car-recovery-jumeirah" />;
export const CarRecoveryJvc                 = () => <LocationPage slug="car-recovery-jvc" />;
export const CarRecoveryJlt                 = () => <LocationPage slug="car-recovery-jlt" />;
export const CarRecoveryDubaiSiliconOasis   = () => <LocationPage slug="car-recovery-dubai-silicon-oasis" />;
export const CarRecoveryInternationalCity   = () => <LocationPage slug="car-recovery-international-city" />;
export const CarRecoveryDubaiInvestmentPark = () => <LocationPage slug="car-recovery-dubai-investment-park" />;
export const CarRecoveryDubaiSportsCity     = () => <LocationPage slug="car-recovery-dubai-sports-city" />;
export const CarRecoveryMotorCity           = () => <LocationPage slug="car-recovery-motor-city" />;
export const CarRecoveryMirdif              = () => <LocationPage slug="car-recovery-mirdif" />;
export const CarRecoveryAlQusais            = () => <LocationPage slug="car-recovery-al-qusais" />;
export const CarRecoveryAlQuoz              = () => <LocationPage slug="car-recovery-al-quoz" />;
export const CarRecoveryJebelAli            = () => <LocationPage slug="car-recovery-jebel-ali" />;
export const CarRecoveryPalmJumeirah        = () => <LocationPage slug="car-recovery-palm-jumeirah" />;

// ── Default export: slug → component map for dynamic routing ──────

function slugToComponentName(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const locationComponents = Object.fromEntries(
  LOCATION_SLUGS.map(slug => {
    const Component = () => <LocationPage slug={slug} />;
    Object.defineProperty(Component, 'name', { value: slugToComponentName(slug) });
    return [slugToComponentName(slug), Component];
  })
);

export default locationComponents;