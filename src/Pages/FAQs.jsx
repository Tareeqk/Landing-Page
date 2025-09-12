import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQs() {
    const { t, i18n } = useTranslation();
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openIndexs, setOpenIndexs] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        async function fetchFAQs() {
            const response = await axios.get(`https://order.tareeqk.ae/pages?slug=faqs&lang=${i18n.language}`);
            const htmlString = response.data.html;

            // Convert the HTML into question/answer pairs
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const cards = Array.from(doc.querySelectorAll('.card'));
            const faqItems = cards.map(card => {
                const question = card.querySelector('button')?.textContent.trim();
                const answer = card.querySelector('.card-body')?.innerHTML.trim();
                return { question, answer };
            });
            setLoading(false)
            setFaqs(faqItems);
        }

        fetchFAQs();
    }, [i18n.language]);

    const toggleAccordion = index => {
        if (openIndexs.includes(index)) {
            setOpenIndexs(openIndexs.filter(i => i !== index))
        } else {
            setOpenIndexs([...openIndexs, index]);
        }
    };

    return (
        <>
            <div
                style={{
                    backgroundImage: `url(https://tareek-assets.s3.me-central-1.amazonaws.com/banner/WhatsApp+Image+2025-09-12+at+15.04.44.jpeg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundBlendMode: 'multiply',
                    backgroundColor: 'rgba(0,0,0,0.65)',
                    width: '100%',
                    height: '350px',
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
                    {t('faqs.title')}
                </h2>
                <p data-aos="fade-up" style={{ fontSize: '18px', maxWidth: '600px' }} className='text-gray-300'>
                    {t('faqs.subtitle')}
                </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto my-4 " id="faqAccordion">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    faqs.map((faq, idx) => (
                        <div data-aos="fade-up" key={idx} className="border border-gray-400 rounded-md">
                            <button
                                onClick={() => toggleAccordion(idx)}
                                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center cursor-pointer"
                            >
                                <span>{faq.question}</span>
                                <span>{openIndexs.includes(idx) ? '-' : '+'}</span>
                            </button>
                            <div
                                className={`transition-max-h duration-400 overflow-hidden ${openIndexs.includes(idx) ? 'max-h-96' : 'max-h-0'}`}
                            >
                                <div className="px-4 py-3" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
