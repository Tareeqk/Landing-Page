import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const PrivacyAndPolicy = () => {
    const { t, i18n } = useTranslation();
    const [policy, setPolicy] = useState('');
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;

            <Helmet>
            <link rel="canonical" href="https://tareeqk.ae/privacy-policy" />
            <meta name="robots" content="index, follow" />
            <title>Privacy Policy </title>
          </Helmet>
    useEffect(() => {
        async function fetchPolicy() {
            try {
                const response = await axios.get(
                    `${baseUrl}/pages?slug=privacy-policy&lang=${i18n.language}`
                );
                let htmlString = response.data.html || '';
                if (!htmlString) {
                    setPolicy('');
                    setLoading(false);
                    return;
                }

                // Clean HTML string
                htmlString = htmlString
                    .replace(/\\"/g, '"')
                    .replace(/\\n/g, '')
                    .replace(/dir="LTR"/g, 'dir="RTL"'); // Force RTL for Arabic/Urdu

                // Parse HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, 'text/html');

                const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
                const fontFamily =
                    i18n.language === 'ar'
                        ? '"Noto Kufi Arabic", sans-serif'
                        : i18n.language === 'ur'
                            ? '"Noto Nastaliq Urdu", serif'
                            : '"Manrope", sans-serif';

                // Apply styles to all elements
                doc.body.querySelectorAll('*').forEach((el) => {
                    if (el.nodeType === 1) { // Element nodes only
                        // Remove existing inline styles to prevent color conflicts
                        el.removeAttribute('style');
                        // Apply controlled styles
                        el.style.fontFamily = fontFamily;
                        el.style.fontSize = '16px';
                        el.style.lineHeight = '1.6';
                        if (i18n.language === 'ur') el.style.margin = '8px 0'; // Urdu spacing
                        if (isRTL) el.setAttribute('dir', 'rtl');
                        // Add policy-content class for styling
                        el.classList.add('policy-content');
                        // Preserve bold styling for headings or strong tags
                        if (el.tagName.match(/H[1-6]/) || el.tagName === 'STRONG') {
                            el.style.fontWeight = 'bold';
                            if (el.tagName.match(/H[1-6]/)) {
                                el.style.fontSize = el.tagName === 'H1' ? '24px' : '20px';
                            }
                        }
                    }
                });

                setPolicy(doc.body.innerHTML);
            } catch (err) {
                console.error('Error fetching privacy policy:', err);
                setPolicy('');
            } finally {
                setLoading(false);
            }
        }

        fetchPolicy();
    }, [i18n.language, baseUrl]);

    if (loading) return <p className="policy-content">Loading privacy policy...</p>;

    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
    const fontFamily =
        i18n.language === 'ar'
            ? '"Noto Kufi Arabic", sans-serif'
            : i18n.language === 'ur'
                ? '"Noto Nastaliq Urdu", serif'
                : '"Manrope", sans-serif';

    return (
        <>
            <section
                style={{
                    position: "relative",
                    width: "100%",
                    height: "400px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    textAlign: "center",
                    padding: "0 20px",
                }}
            >
                <img
                    src="/new/second_img.webp"
                    alt="best car recovery in dubai"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.35)",
                    }}
                />
                <div className='d-flex'>
                    
                <h1 data-aos="fade-up" className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2">
                    {t('policy.title')}
                </h1>
                <p data-aos="fade-up"
                    style={{ fontSize: '18px', maxWidth: '600px', fontFamily }}
                    className="text-gray-300"
                    >
                    {t('policy.subtitle')}
                </p>
                    </div>
            </section>

            <div 
                className="container mx-auto px-4 py-10 policy-content"
                style={{
                    direction: isRTL ? 'rtl' : 'ltr',
                    fontFamily,
                    fontSize: '16px',
                    lineHeight: '1.6',
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word',
                }}
            >
                <h1 data-aos="fade-up"
                    style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        maxWidth: '600px',
                        fontFamily,
                    }}
                    className="policy-content"
                >
                    {t('policy.title')}
                </h1>
                <div data-aos="fade-up"
                    className="policy-content"
                    dangerouslySetInnerHTML={{ __html: policy }}
                />
            </div>
        </>
    );
};

export default PrivacyAndPolicy;