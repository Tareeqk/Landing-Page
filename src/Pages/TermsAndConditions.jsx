import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  const [terms, setTerms] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchTerms() {
      try {
        const response = await axios.get(
          `https://order.tareeqk.ae/pages?slug=terms-conditions&lang=${i18n.language}`
        );

        const htmlString = response.data.html;
        if (!htmlString) return;

        const cleanHtml = htmlString
          .replace(/\\"/g, '"')
          .replace(/\\n/g, '')
          .replace(/dir="LTR"/g, 'dir="RTL"'); // Force RTL for Arabic

        const parser = new DOMParser();
        const doc = parser.parseFromString(cleanHtml, 'text/html');

        const bodyChildren = Array.from(doc.body.children);
        const sections = [];
        let currentSection = null;

        bodyChildren.forEach((el) => {
          if (/H[1-6]/.test(el.tagName)) {
            // Push the previous section if it exists before starting a new one
            if (currentSection) {
              sections.push(currentSection);
            }
            currentSection = {
              heading: el.textContent.trim(),
              content: '',
            };
          } else if (currentSection && el.tagName === 'P') {
            // Only process <p> tags as content under the current section
            const elClone = el.cloneNode(true);

            // Enforce RTL for Arabic/Urdu
            if (i18n.language === 'ar' || i18n.language === 'ur') {
              elClone.setAttribute('dir', 'rtl');
            }

            // Apply consistent font and styles
            elClone.querySelectorAll('*').forEach(node => {
              // Remove API-provided inline styles that break dark mode
              node.removeAttribute('style');

              // Reapply your controlled font & spacing
              if (i18n.language === 'ar') {
                node.style.fontFamily = '"Noto Kufi Arabic", sans-serif';
              } else if (i18n.language === 'ur') {
                node.style.fontFamily = '"Noto Nastaliq Urdu", serif';
              } else {
                node.style.fontFamily = '"Manrope", sans-serif';
              }

              node.style.fontSize = '16px';
              node.style.lineHeight = '1.6';
              node.style.margin = '8px 0'; // add spacing between blocks
            });

            currentSection.content += elClone.outerHTML;
          }
        });

        // Push the last section if it exists
        if (currentSection && currentSection.content) {
          sections.push(currentSection);
        }

        setTerms(sections);
      } catch (err) {
        console.error('Error fetching terms:', err);
      }
    }

    fetchTerms();
  }, [i18n.language]);

  if (!terms.length) {
    return <p>Loading terms...</p>;
  }

  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <>
      <div
        style={{
          backgroundImage: 'url(https://tareek-assets.s3.me-central-1.amazonaws.com/banner/WhatsApp+Image+2025-09-12+at+15.04.44.jpeg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundBlendMode: 'multiply',
          backgroundColor: 'rgba(0,0,0,0.65)',
          width: '100%',
          height: '450px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <h2 data-aos="fade-up" className='text-2xl sm:text-3xl md:text-4xl font-medium mb-2'>
          {t('terms.title')}
        </h2>
        <p data-aos="fade-up" style={{ fontSize: '18px', maxWidth: '600px' }} className='text-gray-300'>
          {t('terms.subtitle')}
        </p>
      </div>
      <div
        className='container mx-auto px-4 my-20'
        style={{
          lineHeight: '1.6',
          fontSize: '16px',
          // color: '#333',
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          wordBreak: 'break-word',
        }}
      >
        {terms.map((section, idx) => (
          <div data-aos="fade-up" key={idx} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ padding: '10px 0', fontSize: '20px', fontWeight: 'bold' }}>{section.heading}</h2>
            <div
              className='terms-content'
              style={{
                fontFamily: isRTL ? '"Noto Kufi Arabic", sans-serif' : '"Manrope", sans-serif',
              }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TermsAndConditions;