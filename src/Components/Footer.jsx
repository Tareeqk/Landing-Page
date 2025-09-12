import React from 'react';
import {
  FaSnapchatGhost,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = ({ isDark }) => {
  const { t } = useTranslation();

  return (
    <footer className="nav-color bg-white border-t text-black">
      <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-6 gap-6 px-4 ">
        {/* Brand Info */}
        <div className="md:col-span-2 lg:col-span-2 ">
          <img
            src={isDark ? 'LogoW.png' : 'Logo.png'}
            alt="Tareeqk Logo"
            className="h-10 mb-4"
          />
          <p className="text-sm max-w-md span-titles" style={{ width: '90%' }}>
            {t('footer.brandDescription')}
          </p>
          <div className="flex space-x-4 mt-4 text-xl text-gray-600 span-titles">
            <a href="https://www.snapchat.com/add/tareeqkportal" target="_blank" rel="noopener noreferrer">
              <FaSnapchatGhost className="hover:text-black cursor-pointer" title={t('footer.socials.snapchat')} />
            </a>
            <a href="https://www.instagram.com/tareeqk.ae/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-black cursor-pointer" title={t('footer.socials.instagram')} />
            </a>
            <a href="https://www.facebook.com/tareeqk.ae" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-black cursor-pointer" title={t('footer.socials.facebook')} />
            </a>
            <a href="https://x.com/Tareeqkportal" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-black cursor-pointer" title={t('footer.socials.twitter')} />
            </a>
            <a href="https://www.youtube.com/@tareeqk?" target="_blank" rel="noopener noreferrer"><FaYoutube className="hover:text-black cursor-pointer" title={t('footer.socials.youtube')} /></a>
          </div>
        </div>

        {/* HOME Links */}
        <div className="md:col-span-1 lg:col-span-1">
          <div>
            <h3 className="text-lg font-semibold mb-2 footer-links span-titles">{t('footer.home.title')}</h3>
            <div className="w-8 mb-4" />
            <ul className="space-y-2 text-sm">
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/" className="hover:underline span-titles">{t('footer.home.links.home')}</Link></li>
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/faq" className="hover:underline span-titles">{t('footer.home.links.faqs')}</Link></li>
              <li><Link onClick={() => window.scrollTo(0, 0)} to="/drivers-FAQs" className="hover:underline span-titles">{t('footer.home.links.driverFaqs')}</Link></li>
            </ul>
          </div>
        </div>

        {/* REGISTRATION Links */}
        <div className="md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-2 footer-links span-titles">{t('footer.registration.title')}</h3>
          <div className="w-8 mb-4" />
          <ul className="space-y-2 text-sm">
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/driver-registration" className="hover:underline span-titles">{t('footer.registration.links.driver')}</Link></li>
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/vendor-registration" className="hover:underline span-titles">{t('footer.registration.links.vendor')}</Link></li>
            <li><a href="https://apps.apple.com/in/app/tareeqk-order/id6480442854" target='_blank' className="hover:underline span-titles">{t('footer.registration.links.customer')}</a></li>
          </ul>
        </div>

        {/* POLICIES Links */}
        <div className="md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-2 footer-links span-titles">{t('footer.policies.title')}</h3>
          <div className="w-8 mb-4" />
          <ul className="space-y-2 text-sm">
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/terms" className="hover:underline span-titles">{t('footer.policies.links.terms')}</Link></li>
            <li><Link onClick={() => window.scrollTo(0, 0)} to="/privacy-policy" className="hover:underline span-titles">{t('footer.policies.links.privacy')}</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="md:col-span-1 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-2 footer-links span-titles">{t('footer.contact.title')}</h3>
          <div className="w-8 mb-4" />
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="mt-1 span-titles" />
              <a
                href="https://maps.app.goo.gl/HpvPEWRRbhwuMpGx9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline span-titles"
              >
                {t('footer.contact.address')}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="span-titles" />
              <a href="tel:+97142232269" className="hover:underline span-titles">{t('footer.contact.phone')}</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="span-titles" />
              <a href="mailto:info@tareeqk.ae" className="hover:underline span-titles">{t('footer.contact.email')}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-black text-white text-center py-3 text-sm">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
};

export default Footer;