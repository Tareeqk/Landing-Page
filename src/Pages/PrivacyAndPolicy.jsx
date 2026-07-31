import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const PrivacyAndPolicy = () => {
    const { t, i18n } = useTranslation();
    const { lang } = useParams();
    const [policy, setPolicy] = useState('');
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;

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

    if (loading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '128px 20px 44px', textAlign: 'center' }}>
                <p className="policy-content" style={{ color: '#6b7280', fontSize: '15px' }}>Loading privacy policy…</p>
            </div>
        );
    }

    const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
    const fontFamily =
        i18n.language === 'ar'
            ? '"Noto Kufi Arabic", sans-serif'
            : i18n.language === 'ur'
                ? '"Noto Nastaliq Urdu", serif'
                : '"Manrope", sans-serif';

    return (
        <>
                    <Helmet>
            <meta name="robots" content="index, follow" />
            <title>Privacy Policy </title>
            <link rel="canonical" href={`https://tareeqk.ae/${lang}/privacy-policy`} />
          </Helmet>
            <section
                style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "clamp(280px, 38vw, 380px)",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    textAlign: "center",
                    padding: "128px 20px 44px",
                    boxSizing: "border-box",
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
                <div style={{ position: "relative", zIndex: 1, maxWidth: "640px" }}>
                    <span
                        data-aos="fade-up"
                        style={{
                            display: "inline-block", fontSize: "10px", fontWeight: 700,
                            letterSpacing: "0.28em", textTransform: "uppercase",
                            color: "var(--primary-yellow)", marginBottom: "14px",
                        }}
                    >
                        Legal
                    </span>
                    <h1
                        data-aos="fade-up"
                        style={{
                            fontSize: "clamp(1.7rem, 5vw, 2.6rem)", fontWeight: 800,
                            letterSpacing: "-0.02em", lineHeight: 1.15, margin: "0 0 12px", fontFamily,
                        }}
                    >
                        {t('policy.title')}
                    </h1>
                    <p data-aos="fade-up"
                        style={{ fontSize: 'clamp(13.5px, 2vw, 16px)', lineHeight: 1.6, fontFamily }}
                        className="text-gray-300"
                        >
                        {t('policy.subtitle')}
                    </p>
                </div>
            </section>

            <div
                className="container mx-auto px-4 py-8 sm:py-10 policy-content"
                style={{
                    direction: isRTL ? 'rtl' : 'ltr',
                    fontFamily,
                    fontSize: '16px',
                    lineHeight: '1.6',
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word',
                }}
            >
                <div data-aos="fade-up"
                    className="policy-content"
                    dangerouslySetInnerHTML={{ __html: policy }}
                />
            </div>
        </>
    );
};

export default PrivacyAndPolicy;