import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  // Rendered both nested under /:lang (the common case — has a real lang)
  // and from the top-level catch-all for URLs with no language segment at
  // all, where there's nothing to read a lang param from.
  const { lang = 'en' } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Helmet>
        <meta name="robots" content="noindex, follow" />
        <title>{t('notFound.title', 'Page Not Found')} | Tareeqk</title>
      </Helmet>
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold text-[#f7b205] leading-none">
            4<span className="text-[var(--secondary-dark-bg)]">0</span>4
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            {t('notFound.heading', "Oops! Page Not Found")}
          </h2>
          <p className="text-[#6b6b6b] text-lg">
            {t(
              'notFound.body',
              "The page you're looking for seems to have taken a wrong turn. Don't worry, let's get you back on track."
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={`/${lang}`}
            className="bg-[#f7b205] hover:bg-[#f5d608] text-[var(--primary-dark-bg)] font-semibold py-3 px-8 rounded-full transition-colors duration-300"
          >
            {t('notFound.goHome', 'Go Home')}
          </Link>
          <a
            href="tel:+97142232269"
            className="border border-[var(--primary-dark-bg)] text-[var(--primary-dark-bg)] font-semibold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-gray-50"
          >
            {t('notFound.callNow', 'Call Now:')} <span dir="ltr">+971 4 223 2269</span>
          </a>
        </div>

        {/* Additional Help */}
        <div className="mt-12">
          <p className="text-[#6b6b6b] text-sm">
            {t('notFound.needHelp', 'Need help?')}{' '}
            <HashLink
              to={`/${lang}#contact`}
              className="text-[#f7b205] hover:text-[#f5d608] underline transition-colors"
            >
              {t('notFound.contactSupport', 'Contact Support')}
            </HashLink>
          </p>
        </div>
      </div>
    </div>
  );
}
