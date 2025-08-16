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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="my-20">
      <div className="container mx-auto px-4">
        <div className="mb-6" data-aos="fade-right">
          <span
            className="inline-block px-4 py-2 rounded-full border border-[var(--primary-light-gray)] text-[var(--secondary-dark-bg)] text-sm md:text-base span-titles"
            data-aos="fade-up"
          >
            {t('contactForm.getInTouch')}
          </span>
        </div>

        <h1 data-aos="fade-up" className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2">
          {t('contactForm.title')}
        </h1>

        <p data-aos="fade-up" className="text-gray-400 mb-8 text-sm">
          {t('contactForm.description')}
        </p>

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
                    pattern="[0-9]{7,9}"
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
