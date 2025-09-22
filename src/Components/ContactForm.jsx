import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare URL-encoded data like PHP
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('phone', formData.mobile);
      params.append('subject', formData.subject);
      params.append('message', formData.message);
      params.append('dial_code', '+971'); // Or dynamically if needed
      params.append('submit', 'true');

      const response = await axios.post(
        'https://order.tareeqk.ae/contact-us',
        params,
      );

      if (response.data.status === 200) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Error: ' + (response.data.message || 'Something went wrong.'));
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="my-20">
      <div className="container mx-auto px-4">
        <div className="mb-6" data-aos="fade-right">
          <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block span-titles mb-4">
            {t('contactForm.getInTouch')}
          </span>

        <h1  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2">
          {t('contactForm.title')}
        </h1>

        <p  className="text-gray-400 mb-8 text-sm">
          {t('contactForm.description')}
        </p>
        </div>

        <div data-aos="fade-up" className="max-w-2xl mx-auto w-full">
          <div className="dark-bg text-gray-400 rounded-xl p-6 border border-[var(--secondary-dark-bg)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 subtitle mb-1">
                    {t('contactForm.fields.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-3 text-base rounded-lg border border-[var(--primary-light-gray)] w-full bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 subtitle mb-1">
                    {t('contactForm.fields.mobile')}
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 text-base rounded-lg border border-[var(--primary-light-gray)] w-full bg-transparent"
                    placeholder={t('contactForm.fields.mobilePlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 subtitle mb-1">
                  {t('contactForm.fields.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 text-base rounded-lg border border-[var(--primary-light-gray)] w-full bg-transparent"
                  placeholder={t('contactForm.fields.emailPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 subtitle mb-1">
                  {t('contactForm.fields.subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 text-base rounded-lg border border-[var(--primary-light-gray)] w-full bg-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 subtitle mb-1">
                  {t('contactForm.fields.message')}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 text-base rounded-lg border border-[var(--primary-light-gray)] w-full bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 text-base cursor-pointer submit bg-[var(--primary-yellow)] text-white rounded-lg hover:bg-[var(--seconday-yellow)] w-full mt-4"
              >
                {t('contactForm.button')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
