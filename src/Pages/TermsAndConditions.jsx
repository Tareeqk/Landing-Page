import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TermsAndConditions = () => {
  const { t, i18n } = useTranslation();
  const [terms, setTerms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchTerms() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${baseUrl}/pages?slug=terms-conditions&lang=${i18n.language}`
        );

        const htmlString = response.data.html || response.data.content || '';
        if (!htmlString) {
          throw new Error('No HTML content received from API');
        }

        // Clean the HTML string
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
          if (el.tagName === 'P') {
            const strongTag = el.querySelector('strong');
            const textContent = el.textContent.trim();

            // Check if the paragraph is a main section heading (e.g., "1. Introduction")
            if (strongTag && textContent.match(/^\d+\.\s/)) {
              // Push the previous section if it exists
              if (currentSection) {
                sections.push(currentSection);
              }
              currentSection = {
                heading: strongTag.textContent.trim(),
                content: '',
                subSections: [],
              };
            }
            // Check if the paragraph is a sub-section (e.g., "1.1", "1.2")
            else if (textContent.match(/^\d+\.\d+\.?\s/)) {
              if (currentSection) {
                const elClone = el.cloneNode(true);
                
                // Extract the sub-section number (e.g., "1.1", "1.2")
                const subSectionNumber = textContent.match(/^\d+\.\d+\.?\s/)[0].trim();
                
                // Apply styles to the cloned element
                if (i18n.language === 'ar' || i18n.language === 'ur') {
                  elClone.setAttribute('dir', 'rtl');
                }
                elClone.querySelectorAll('*').forEach((node) => {
                  node.removeAttribute('style');
                  if (node.tagName === 'A') {
                    node.style.color = '#f7b205'; // Set link color to yellow
                    node.style.textDecoration = 'underline';
                  }
                  if (i18n.language === 'ar') {
                    node.style.fontFamily = '"Noto Kufi Arabic", sans-serif';
                  } else if (i18n.language === 'ur') {
                    node.style.fontFamily = '"Noto Nastaliq Urdu", serif';
                  } else {
                    node.style.fontFamily = '"Manrope", sans-serif';
                  }
                  node.style.fontSize = '16px';
                  node.style.lineHeight = '1.6';
                  node.style.margin = '8px 0';
                });

                // Store the full original paragraph with number inline
                currentSection.subSections.push({
                  subHeading: subSectionNumber,
                  content: elClone.outerHTML, // Keep the number inline with content
                });
              }
            }
            // Otherwise, treat as content for the current section
            else if (currentSection) {
              const elClone = el.cloneNode(true);
              // Apply styles to the cloned element
              if (i18n.language === 'ar' || i18n.language === 'ur') {
                elClone.setAttribute('dir', 'rtl');
              }
              elClone.querySelectorAll('*').forEach((node) => {
                node.removeAttribute('style');
                if (node.tagName === 'A') {
                  node.style.color = '#f7b205'; // Set link color to yellow
                  node.style.textDecoration = 'underline';
                }
                if (i18n.language === 'ar') {
                  node.style.fontFamily = '"Noto Kufi Arabic", sans-serif';
                } else if (i18n.language === 'ur') {
                  node.style.fontFamily = '"Noto Nastaliq Urdu", serif';
                } else {
                  node.style.fontFamily = '"Manrope", sans-serif';
                }
                node.style.fontSize = '16px';
                node.style.lineHeight = '1.6';
                node.style.margin = '8px 0';
              });
              currentSection.content += elClone.outerHTML;
            }
          }
        });

        // Push the last section if it exists
        if (currentSection && (currentSection.content || currentSection.subSections.length)) {
          sections.push(currentSection);
        }

        setTerms(sections);
      } catch (err) {
        console.error('Error fetching terms:', err);
        setError('Failed to load terms and conditions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTerms();
  }, [i18n.language, baseUrl]);

  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  if (isLoading) {
    return <p>Loading terms...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!terms.length) {
    return <p>No terms and conditions available.</p>;
  }

  return (
    <>
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <img
          src="/new/second_img.webp"
          alt="best towing service in dubai"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.35)',
          }}
        />
        <div className="d-flex flex-column align-items-center">
          <h1
            data-aos="fade-up"
            className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2"
          >
            {t('terms.title')}
          </h1>
          <p
            data-aos="fade-up"
            style={{ fontSize: '18px', maxWidth: '600px' }}
            className="text-gray-300"
          >
            {t('terms.subtitle')}
          </p>
        </div>
      </section>
      <div
        className="container mx-auto px-4 my-20"
        style={{
          lineHeight: '1.6',
          fontSize: '16px',
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
          wordBreak: 'break-word',
        }}
      >
        {terms.map((section, idx) => (
          <div data-aos="fade-up" key={idx} style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                padding: '10px 0',
                fontSize: '22px',
                fontWeight: 'bold',
                color: isRTL ? '#333' : '#000',
              }}
            >
              {section.heading}
            </h2>
            <div
              className="terms-content"
              style={{
                fontFamily: isRTL
                  ? '"Noto Kufi Arabic", sans-serif'
                  : '"Manrope", sans-serif',
                marginBottom: '1rem',
              }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
            {section.subSections.map((subSection, subIdx) => (
              <div 
                key={subIdx} 
                className="terms-content"
                style={{
                  fontFamily: isRTL
                    ? '"Noto Kufi Arabic", sans-serif'
                    : '"Manrope", sans-serif',
                  marginTop: '0.75rem',
                  marginBottom: '1rem',
                }}
                dangerouslySetInnerHTML={{ __html: subSection.content }}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TermsAndConditions;