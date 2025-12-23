import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function AboutAccordion() {
    const { t ,i18n } = useTranslation();
    const [openItems, setOpenItems] = useState({});
    const isUrdu = i18n.language === 'ur';

    const toggle = (index) => {
        setOpenItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Get arrays from translations
    // Assumes these keys return arrays of objects with { icon, title, content }
    const roadsideItems = t('serviceDetails.roadside', { returnObjects: true });
    const towingItems = t('serviceDetails.towing', { returnObjects: true });

    return (
            <div className="container max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-4 md:mb-8" data-aos="fade-right">
                    <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block span-titles">
                        {t('aboutAccordion.serviceDetails')}
                    </span>
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium my-4"
                    >
                        {t('aboutAccordion.detailedSupport')}
                    </h2>
                    <p
                        className={`text-[var(--primary-light-gray)] ${isUrdu ? 'mt-8' : 'mt-3' } max-w-2xl text-sm sm:text-base`}
                    >
                        {t('aboutAccordion.comprehensiveSolutions')}
                    </p>
                </div>

                {/* Accordion Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {/* Roadside Assistance Services */}
                    <div
                        className="bg-white dark-bg rounded-xl p-4 sm:p-6 shadow-lg"
                        data-aos="fade-up"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-[var(--primary-dark-bg)] mb-4 sm:mb-6 pb-2 border-b border-[var(--secondary-light-gray)]">
                            {t('aboutAccordion.roadsideAssistanceServices')}
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            {roadsideItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="border border-[var(--secondary-light-gray)] rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md lighter-bg"
                                >
                                    <button
                                        onClick={() => toggle(`roadside-${idx}`)}
                                        className={`light-bg w-full flex cursor-pointer items-center justify-between p-3 sm:p-4 text-left transition-colors duration-200 ${
                                            openItems[`roadside-${idx}`]
                                                ? 'bg-[var(--primary-yellow)/10]'
                                                : 'hover:bg-[var(--secondary-light-gray)/30]'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.icon}
                                                alt="car towing service in Dubai "
                                                className="w-8 h-8 p-1 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[var(--primary-yellow)] text-[var(--primary-dark-bg)] font-bold mx-1 sm:mx-2 md:mx-3 lg:mx-4"
                                            />
                                            <span className="light-text text-sm sm:text-base font-medium text-[var(--primary-dark-bg)]">
                                                {item.title}
                                            </span>
                                        </div>
                                        <span className="text-[var(--primary-yellow)] font-bold text-lg sm:text-xl">
                                            {openItems[`roadside-${idx}`] ? '−' : '+'}
                                        </span>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            openItems[`roadside-${idx}`]
                                                ? 'max-h-96 p-3 sm:p-4'
                                                : 'max-h-0'
                                        }`}
                                    >
                                        <p className="text-sm sm:text-base text-[var(--primary-light-gray)] black-text">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Towing Services */}
                    <div
                        className="bg-white dark-bg rounded-xl p-4 sm:p-6 shadow-lg"
                        data-aos="fade-up"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-[var(--primary-dark-bg)] mb-4 sm:mb-6 pb-2 border-b border-[var(--secondary-light-gray)]">
                            {t('aboutAccordion.towingServices')}
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                            {towingItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="border border-[var(--secondary-light-gray)] rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md lighter-bg"
                                >
                                    <button
                                        onClick={() => toggle(`towing-${idx}`)}
                                        className={`w-full cursor-pointer flex items-center justify-between p-3 sm:p-4 light-bg text-left transition-colors duration-200 ${
                                            openItems[`towing-${idx}`]
                                                ? 'bg-[var(--primary-yellow)/10]'
                                                : 'hover:bg-[var(--secondary-light-gray)/30]'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.icon}
                                                alt="Car Recovery Service in Dubai"
                                                className="p-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[var(--primary-yellow)] text-[var(--primary-dark-bg)] font-bold mx-1 sm:mx-2 md:mx-3 lg:mx-4"
                                            />
                                            <span className="light-text text-sm sm:text-base font-medium text-[var(--primary-dark-bg)]">
                                                {item.title}
                                            </span>
                                        </div>
                                        <span className="text-[var(--primary-yellow)] font-bold text-lg sm:text-xl">
                                            {openItems[`towing-${idx}`] ? '−' : '+'}
                                        </span>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            openItems[`towing-${idx}`]
                                                ? 'max-h-96 p-3 sm:p-4'
                                                : 'max-h-0'
                                        }`}
                                    >
                                        <p className="text-sm sm:text-base text-[var(--primary-light-gray)] black-text">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AboutAccordion;
