import './Registration.css';
import React from 'react';
import { FaTruckPickup, FaWarehouse } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

export default function Registration() {
    const { t } = useTranslation();

    return (
        <div className="container dark:bg-primary-dark-bg">
            <div className="mb-4 md:mb-8" data-aos="fade-right">
                <span className="text-[var(--secondary-dark-bg)] text-base sm:text-lg md:text-xl tracking-wide pb-1 border-b-2 border-[var(--primary-light-gray)] inline-block span-titles">
                    {t('register.title')}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium my-4">
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
                    <Link
                        onClick={() => window.scrollTo(0, 0)}
                        to="/driver-registration"
                    >
                        <button className="register-button">{t('register.driver.button')}</button>
                    </Link>
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
                    <Link
                        to="/vendor-registration"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <button className="register-button">{t('register.vendor.button')}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
