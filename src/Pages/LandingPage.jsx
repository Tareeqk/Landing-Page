import React, { useRef } from 'react';
import { DownloadApps } from '../Components/DownloadApps';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";

export default function LandingPage() {
  const { t } = useTranslation();
  const downloadRef = useRef(null);

  const scrollToDownload = () => {
    if (downloadRef.current) {
      const y = downloadRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
        <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Car Recovery in Dubai </title>
      </Helmet>

  return (
    <>
      <div className="relative w-full h-auto py-4 md:py-6 overflow-x-hidden landing-container"> {/* Keep overflow-x-hidden */}
        {/* Background */}
        <div className="absolute inset-x-0 top-0 bottom-0 z-0 h-full overflow-x-hidden"> {/* Changed to h-full, removed overflow-hidden */}
          <img
            src="new/NewBG2.webp"
            alt="vehicle recovery  in dubai"
            className="w-full h-full object-cover md:hidden"
          />
          <img
            src="new/NewBGG.webp"
            alt="towing service in dubai"
            className="w-full h-full object-cover hidden md:block"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center h-auto min-h-screen"> {/* Added min-h-screen for content */}
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 grid grid-cols-1 mt-10 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Text Content */}
            <div data-aos="fade-right" className="flex flex-col justify-center order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2 black-text max-w-lg whitespace-pre-line">
                {t('landing.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-2 md:mb-3 black-text max-w-lg">
                {t('landing.subtitle')}
              </p>

              {/* Buttons */}
              <div className="flex flex-row flex-wrap gap-2 mb-2">
                {/* <a
                  href="https://order.tareeqk.ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] sm:flex-none sm:w-48"
                >
                  <button className="w-full px-4 py-1.5 sm:px-5 sm:py-2 bg-black book-btn text-white rounded-xl hover:opacity-90 cursor-pointer whitespace-nowrap text-sm sm:text-base border-2 border-gray-500">
                    {t("landing.book")}
                  </button>
                </a> */}

                <button
                  onClick={scrollToDownload}
                  className="flex-1 min-w-[140px] sm:flex-none sm:w-48 px-4 py-1.5 sm:px-5 sm:py-2 bg-[var(--primary-yellow)] text-black download-btn rounded-xl hover:opacity-90 cursor-pointer whitespace-nowrap text-sm sm:text-base border-2 border-gray-500"
                >
                  {t("landing.download")}
                  {/* <ContactUs name='download'/> */}
                </button>
              </div>

              {/* Vehicle Icons */}
              <div>
                <span className="text-base sm:text-lg font-semibold border-b-2 border-black inline-block black-text mb-1 sm:mb-2">
                  {t("landing.vehicle")}
                </span>
                <div className="flex gap-2">
                  {['Bike', 'Car', 'Jeep', 'Bus'].map((v, i) => (
                    <img
                      key={i}
                      src={`new/${v}.svg`}
                      alt={v}
                      className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div data-aos="fade-left" className="flex justify-center items-center order-1 lg:order-2 lg:items-end">
              <img
                src="new/NewNasir.webp"
                alt="car recovery in dubai"
                className="max-h-[30vh] sm:max-h-[40vh] lg:max-h-[50vh] object-contain mt-2 sm:mt-3 lg:mt-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div ref={downloadRef} className="w-full overflow-x-hidden download-apps-container bg-[var(--secondary-light-gray)] dark-bg py-10 px-4" id="target-section">
        <DownloadApps type="customer"/>
      </div>
    </>
  );
}