import React from 'react'
import SplitText from "../Components/ComingSoon";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

export default function VendorRegistration() {
    const { t } = useTranslation();
    const translatedText = t('comingSoon');
    return (
        <>
        <Helmet>
            <link rel="canonical" href="https://tareeqk.ae/vendor-registration" />
            <meta name="robots" content="index, follow" />
            <title>Vendor Registration </title>
          </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <SplitText
                text={translatedText}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center coming-soon text-[var(--primary-yellow)]"
                />
        </div>
                </>
    )
}