import React from 'react';
import { FaTruckPickup, FaWarehouse } from 'react-icons/fa';
import './Registration.css';

const Registration = () => {
    return (
        <div className="container dark:bg-primary-dark-bg">
            <div className="mb-4 md:mb-8" data-aos="fade-right">
                <span
                    className="inline-block px-4 py-2 rounded-full border border-[var(--primary-light-gray)] text-[var(--secondary-dark-bg)] text-sm md:text-base span-titles"
                >
                    Registration
                </span>
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-medium my-4"
                >
                    Become a Service Provider
                </h1>
                <p
                    className="text-[var(--primary-light-gray)] mt-3 max-w-2xl text-sm sm:text-base"
                >
                    Be Part of Our Car Recovery Network
                </p>
            </div>

            <div className="registration-options">
                <div className="dark-bg registration-card driver-registration dark:bg-dark-bg-surface">
                    <div className="card-icon">
                        <FaTruckPickup className="text-primary-yellow text-4xl" />
                    </div>
                    <h2 className="dark:text-dark-text-main">Driver Registration</h2>
                    <p className="dark:text-dark-text-muted">Join our network of professional towing and recovery drivers</p>
                    <ul className="benefits-list dark:text-dark-text-muted">
                        <li>Flexible working hours</li>
                        <li>Competitive pay rates</li>
                        <li>Instant job notifications</li>
                    </ul>
                    <a href="https://order.tareeqk.ae/page/driver-registration" target="_blank" rel="noopener noreferrer">
                        <button className="register-button">
                            Register Now
                        </button>
                    </a>
                </div>

                <div className="dark-bg registration-card vendor-registration dark:bg-dark-bg-surface">
                    <div className="card-icon">
                        <FaWarehouse className="text-primary-yellow text-4xl" />
                    </div>
                    <h2 className="dark:text-dark-text-main">Vendor Registration</h2>
                    <p className="dark:text-dark-text-muted">Connect your towing company or garage with our network</p>
                    <ul className="benefits-list dark:text-dark-text-muted">
                        <li>Increased business visibility</li>
                        <li>Streamlined operations</li>
                        <li>Dedicated support</li>
                    </ul>
                    <a href="https://order.tareeqk.ae/page/vendor-registration" target="_blank" rel="noopener noreferrer">
                        <button className="register-button">
                            Register Now
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Registration;