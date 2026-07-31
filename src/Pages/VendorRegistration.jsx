import React from 'react'
import SplitText from "../Components/ComingSoon";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function VendorRegistration() {
    const { t } = useTranslation();
    const { lang } = useParams();
    const translatedText = t('comingSoon');
    return (
        <>
        <Helmet>
            <meta name="robots" content="index, follow" />
            <title>Vendor Registration </title>
            <link rel="canonical" href={`https://tareeqk.ae/${lang}/vendor-registration`} />
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