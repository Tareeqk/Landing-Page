import React from 'react';
import { useTranslation } from 'react-i18next';

export default function CJI() {
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';

  return (
    <div className="mx-auto py-4 container w-full">
      <div
        data-aos="fade-right"
        className={`mb-4 ${isUrdu ? 'leading-loose' : ''}`}
      >
        <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block my-4 span-titles">
          {t('nasir.nasir')}
        </span>

        <h1
          className={`text-2xl sm:text-3xl md:text-4xl font-medium my-2 ${isUrdu ? 'leading-loose' : ''}`}
        >
          {t('nasir.title')}
        </h1>

        <p
          className={`text-gray-400 mb-4 ${isUrdu ? 'leading-loose' : ''}`}
        >
          {t('nasir.subtitle')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <div
            data-aos="fade-right"
            className={`dark-bg text-gray-400 rounded-2xl p-4 md:p-5 border border-[var(--secondary-dark-bg)] h-full w-full ${isUrdu ? 'leading-loose' : ''}`}
          >
            <h3
              className={`text-lg md:text-xl font-semibold text-black mb-2 ${isUrdu ? 'leading-loose' : ''}`}
            >
              {t('nasir.title2')}
            </h3>
            <p className={`text-gray-400 ${isUrdu ? 'leading-loose' : ''}`}>
              {t('nasir.content')}
            </p>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full lg:w-1/2 overflow-x-hidden">
          <div
            data-aos="fade-left"
            className="relative w-full h-0 overflow-hidden rounded-2xl border border-[var(--secondary-dark-bg)]"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dIX_NmPE2rs"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}