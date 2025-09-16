import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyAndPolicy = () => {
    const { t, i18n } = useTranslation();
    const [policy, setPolicy] = useState('');
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        async function fetchPolicy() {
            try {
                const response = await axios.get(
                    `https://order.tareeqk.ae/pages?slug=privacy-policy&lang=${i18n.language}`
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
            <div
                style={{
                    backgroundImage:
                        'url(https://tareek-assets.s3.me-central-1.amazonaws.com/banner/WhatsApp+Image+2025-09-12+at+15.04.44.jpeg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundBlendMode: 'multiply',
                    backgroundColor: 'rgba(0,0,0,0.65)',
                    width: '100%',
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    textAlign: 'center',
                    padding: '0 20px',
                }}
            >
                <h2 data-aos="fade-up" className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2">
                    {t('policy.title')}
                </h2>
                <p data-aos="fade-up"
                    style={{ fontSize: '18px', maxWidth: '600px', fontFamily }}
                    className="text-gray-300"
                >
                    {t('policy.subtitle')}
                </p>
            </div>

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