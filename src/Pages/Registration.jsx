import './Registration.css';
import React from 'react';
import { FaTruckPickup, FaWarehouse } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Registration() {
    const { t } = useTranslation();

    return (
        <div className="container dark:bg-primary-dark-bg">
            <div className="mb-4 md:mb-8" data-aos="fade-right">
                <span className="inline-block px-4 py-2 rounded-full border border-[var(--primary-light-gray)] text-[var(--secondary-dark-bg)] text-sm md:text-base span-titles">
                    {t('register.title')}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium my-4">
                    {t('register.heading')}
                </h1>
                <p className="text-[var(--primary-light-gray)] mt-3 max-w-2xl text-sm sm:text-base">
                    {t('register.subtitle')}
                </p>
            </div>

            <div className="registration-options">
                {/* Driver Registration */}
                <div className="dark-bg registration-card driver-registration dark:bg-dark-bg-surface">
                    <div className="card-icon">
                        <FaTruckPickup className="text-primary-yellow text-4xl" />
                    </div>
                    <h2 className="dark:text-dark-text-main">{t('register.driver.title')}</h2>
                    <p className="dark:text-dark-text-muted">{t('register.driver.description')}</p>
                    <ul className="benefits-list dark:text-dark-text-muted">
                        <li>{t('register.driver.benefits.0')}</li>
                        <li>{t('register.driver.benefits.1')}</li>
                        <li>{t('register.driver.benefits.2')}</li>
                    </ul>
                    <a
                        href="https://order.tareeqk.ae/page/driver-registration"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="register-button">{t('register.driver.button')}</button>
                    </a>
                </div>

                {/* Vendor Registration */}
                <div className="dark-bg registration-card vendor-registration dark:bg-dark-bg-surface">
                    <div className="card-icon">
                        <FaWarehouse className="text-primary-yellow text-4xl" />
                    </div>
                    <h2 className="dark:text-dark-text-main">{t('register.vendor.title')}</h2>
                    <p className="dark:text-dark-text-muted">{t('register.vendor.description')}</p>
                    <ul className="benefits-list dark:text-dark-text-muted">
                        <li>{t('register.vendor.benefits.0')}</li>
                        <li>{t('register.vendor.benefits.1')}</li>
                        <li>{t('register.vendor.benefits.2')}</li>
                    </ul>
                    <a
                        href="https://order.tareeqk.ae/page/vendor-registration"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="register-button">{t('register.vendor.button')}</button>
                    </a>
                </div>
            </div>
        </div>
    );
}
