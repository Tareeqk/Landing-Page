import React from 'react'
import SplitText from "../Components/ComingSoon";
import { useTranslation } from 'react-i18next';

export default function VendorRegistration() {
    const { t } = useTranslation();
    const translatedText = t('vendorRegistration.comingSoon');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <SplitText
                text={translatedText}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center coming-soon text-[var(--primary-yellow)]"
            />
        </div>
    )
}