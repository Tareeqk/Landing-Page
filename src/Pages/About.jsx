import React from 'react';
import Counters from '../Components/Counters';
import { useTranslation, Trans } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const About = ({ isSection = false }) => {
    const { t, i18n } = useTranslation();
    const isUrdu = i18n.language === 'ur';
    const HeadingTag = isSection ? 'h2' : 'h1'; 
    return (
        <>
                <Helmet>
        <link rel="canonical" href="https://tareeqk.ae/about" />    
        <meta name="robots" content="index, follow" />
        <title>ABOUT US </title>
      </Helmet>
            <section id={1}>
                <div className="container mx-auto px-4 my-8">
                    <div className="mb-6" data-aos="fade-right">
                        <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block span-titles">
                            {t("about.about")}
                        </span>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-2" data-aos="fade-right">
                        <HeadingTag className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium max-w-4xl ${isUrdu ? 'leading-loose' : 'leading-tight'}`}>
                            {t("about.title")}
                        </HeadingTag>
                        <h4 className={`subtitle text-md sm:text-xs md:text-sm lg:text-xl max-w-xl text-gray-600 mt-5 ${isUrdu ? 'leading-loose' : 'leading-tight'}`}>
                            {t("about.subtitle")}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            <p className={`text-gray-400 ${isUrdu ? 'leading-loose' : ''}`}>
                                <Trans 
                                i18nKey="about.subtitle1" 
                                components={{ 1: <a key="about-link" href="https://www.tareeqk.ae/service" className="text-[var(--primary-yellow)]" /> }} 
                            />
                            </p>
                            <p className={`text-gray-400 ${isUrdu ? 'leading-loose' : ''}`}>
                                {t("about.subtitle2")}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-evenly gap-4 mt-6">
                            <b className={`text-sm md:text-base ${isUrdu ? 'leading-loose' : ''}`}> <span style={{ color: "var(--primary-yellow)" }}>✓</span> {t("about.item1")}</b>
                            <b className={`text-sm md:text-base ${isUrdu ? 'leading-loose' : ''}`}> <span style={{ color: "var(--primary-yellow)" }}>✓</span> {t("about.item2")}</b>
                            <b className={`text-sm md:text-base ${isUrdu ? 'leading-loose' : ''}`}> <span style={{ color: "var(--primary-yellow)" }}>✓</span> {t("about.item3")}</b>
                            <b className={`text-sm md:text-base ${isUrdu ? 'leading-loose' : ''}`}> <span style={{ color: "var(--primary-yellow)" }}>✓</span> {t("about.item4")}</b>
                        </div>
                    </div>
                </div>
            </section>

            <Counters />

            <section id={2} className="my-20 overflow-x-hidden">
                <div className="container mx-auto px-4">
                    <div className="mb-6" data-aos="fade-right">
                        <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block span-titles mb-4">
                            {t("about2.about")}
                        </span>

                        <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-4 ${isUrdu ? 'leading-loose' : ''}`}>
                            {t("about2.title")}
                        </h2>

                        <p className={`text-gray-400 mb-8 ${isUrdu ? 'leading-loose' : ''}`}>
                            {t("about2.subtitle")} 
                            {/* <span className='t'>https://order.tareeqk.ae</span> */}
                        </p>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-6">
                        <div data-aos="fade-right" className="flex flex-col gap-4 w-full xl:w-1/2">
                            {[
                                { icon: "Road", title: "about2.item1title", subtitle: "about2.item1subtitle" },
                                { icon: "Towing", title: "about2.item2title", subtitle: "about2.item2subtitle" },
                                { icon: "User", title: "about2.item3title", subtitle: "about2.item3subtitle" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="dark-bg text-gray-400 rounded-xl p-4 border border-[var(--secondary-dark-bg)]"
                                >
                                    <div className="flex gap-3 items-center">
                                        <img
                                            src={`new/${item.icon}.svg`}
                                            className="w-10 h-10 flex items-center justify-center rounded-full p-1 flex-shrink-0"
                                            style={{ backgroundColor: 'var(--primary-yellow)' }}
                                            alt={item.icon}
                                        />
                                        <div>
                                            <h3 className={`text-base md:text-xl font-semibold text-black ${isUrdu ? 'leading-loose' : ''}`}>
                                                {t(item.title)}
                                            </h3>
                                            <p className={`text-gray-400 text-sm ${isUrdu ? 'leading-loose' : ''}`}>
                                                {t(item.subtitle)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Image Section - Always visible */}
                        <div className="w-full xl:w-1/2 mt-6 xl:mt-0">
                            <div
                                data-aos="fade-left"
                                className="relative w-full h-full rounded-xl border border-[var(--secondary-dark-bg)] overflow-hidden"
                                style={{ minHeight: '300px' }}
                            >
                                <img
                                    src="new/Recovery_Van.webp"
                                    alt="car recovery in dubai"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;