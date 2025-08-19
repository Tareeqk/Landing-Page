import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HowItWorks() {
    const { t } = useTranslation();
    const steps = t('howItWorks.steps', { returnObjects: true });

    return (
        <div className="mx-auto px-4 my-8 container">
            {/* Section Header */}
            <div className="mb-6" data-aos="fade-right">
                <span className="px-5 py-2 border rounded-full border-[var(--primary-light-gray)] inline-block span-titles text-gray-500">
                    {t("howItWorks.titleTag")}
                </span>
            </div>

            <h1 data-aos="fade-up" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-[var(--primary-dark-bg)]">
                {t("howItWorks.mainTitle")}
            </h1>

            <p data-aos="fade-up" className="text-[var(--primary-light-gray)] mb-8">
                {t("howItWorks.subtitle")}
            </p>

            {/* Content Section */}
            <div className='bg-[var(--secondary-light-gray)] dark-bg py-4 px-4 md:py-6 md:px-6 rounded-xl overflow-hidden'>
                {/* Changed flex behavior here */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Steps List */}
                    <div className="w-full lg:w-1/2 space-y-4 flex flex-col">
                        {steps.map((step, index) => (
                            <div key={index} className="flex group" data-aos="fade-right">
                                <div className="flex-shrink-0 mr-3">
                                    <div className="w-9 h-9 rounded-full bg-[var(--primary-yellow)] flex items-center justify-center text-[var(--primary-dark-bg)] font-bold text-base">
                                        {step.number}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-[var(--primary-dark-bg)] mb-1 group-hover:text-[var(--primary-yellow)] transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-[var(--primary-light-gray)] text-xs sm:text-sm leading-relaxed">
                                        {step.content}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="pt-4 mt-auto" data-aos="fade-up">
                            <a
                                href="https://order.tareeqk.ae/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-underline inline-block"
                            >
                                <button className="cursor-pointer getTow-btn px-5 py-2 sm:px-6 sm:py-3 bg-[var(--primary-dark-bg)] hover:bg-black text-white font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base">
                                    {t('howItWorks.cta')}
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-1/2">
                        <div data-aos="fade-left" className="relative h-full rounded-lg overflow-hidden">
                            <img
                                src="tareeqktow.jpg"
                                alt={t('howItWorks.imageAlt')}
                                className="w-full h-full object-cover min-h-[220px] sm:min-h-[280px] md:min-h-[320px]"
                                loading="lazy"
                            />
                            <div className="absolute bottom-2 right-2 bg-[var(--primary-yellow)] p-2 rounded-lg max-w-[140px] sm:max-w-[160px]">
                                <p className="font-bold text-[var(--primary-dark-bg)] text-xs sm:text-sm">
                                    {t('howItWorks.bannerText')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}