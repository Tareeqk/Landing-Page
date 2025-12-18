import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet-async";

export default function FAQs() {
    const { t, i18n } = useTranslation();
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openIndexs, setOpenIndexs] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        async function fetchFAQs() {
            const response = await axios.get(`${baseUrl}/pages?slug=faqs&lang=${i18n.language}`);
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
    }, [i18n.language, baseUrl]);

    const toggleAccordion = index => {
        if (openIndexs.includes(index)) {
            setOpenIndexs(openIndexs.filter(i => i !== index))
        } else {
            setOpenIndexs([...openIndexs, index]);
        }
    };
    return (
        <>
                <Helmet>
        <link rel="canonical" href="https://tareeqk.ae/faq" />
        <meta name="robots" content="index, follow" />
        <title>FAQ </title>
      </Helmet>
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
                    alt="roadside assistance in dubai"
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

                <h1 data-aos="fade-up" className='text-2xl sm:text-3xl md:text-4xl font-medium mb-2'>
                    {t('faqs.title')}
                </h1>
                <p data-aos="fade-up" style={{ fontSize: '18px', maxWidth: '600px' }} className='text-gray-300'>
                    {t('faqs.subtitle')}
                </p>
                </div>
            </section>

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
