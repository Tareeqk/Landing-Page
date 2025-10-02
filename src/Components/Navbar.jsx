import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useLocation, Link } from 'react-router-dom';
import ContactUs from './ContactUs';
import DarkMode from './DarkMode';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { HashLink } from 'react-router-hash-link';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar({ isDark, setIsDark }) {
    const location = useLocation();
    const { t } = useTranslation();

    const navigation = [
        { name: t('navbar.home'), href: '/', current: location.pathname === '/' },
        { name: t('navbar.about'), href: '/about', current: location.pathname === '/about' },
        { name: t('navbar.service'), href: '/service', current: location.pathname === '/service' },
        { name: t('navbar.gallery'), href: '/media-center', current: location.pathname === '/media-center' },
        // { name: t('navbar.terms'), href: '/terms', current: location.pathname === '/terms' },
        { name: t('navbar.contact'), href: '/#contact' },
    ];

    return (
        <div className="nav-color bg-white fixed top-0 left-0 w-full z-50 border-b border-[var(--primary-yellow)]">

            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
            // data-aos="fade-down"
            >
                <Disclosure as="nav" className="relative">
                    <div className="flex h-16 sm:h-20 items-center justify-between">
                        {/* Left section */}
                        <div className="flex items-center">
                            {/* Mobile menu button */}
                            <div className="flex lg:hidden mr-2">
                                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </DisclosureButton>
                            </div>

                            {/* Logo */}
                            <Link to="/" className="flex items-center">
                                <img
                                    src={isDark ? 'LogoW.png' : 'Logo.png'}
                                    alt="Logo"
                                    className="h-7 sm:h-8 w-auto"
                                    loading="lazy"
                                />
                            </Link>
                        </div>

                        {/* Center section - Desktop Navigation */}
                        <div className="hidden lg:flex mx-4 flex-1 justify-center">
                            <div className="flex space-x-3 xl:space-x-4">
                                {navigation.map((item) => (
                                    item.name === t('navbar.contact') ? (
                                        <HashLink
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'text-gray-900 border-b-2 border-[var(--primary-yellow)]'
                                                    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-[var(--primary-yellow)]',
                                                'px-2 py-2 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap'
                                            )}
                                        >
                                            {item.name}
                                        </HashLink>
                                    ) : (
                                        <Link
                                            onClick={() => window.scrollTo(0, 0)}
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'text-gray-900 border-b-2 border-[var(--primary-yellow)]'
                                                    : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-[var(--primary-yellow)]',
                                                'px-2 py-2 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center gap-2 sm:gap-3 relative">
                            <div className="relative z-50">
                                <LanguageSwitcher />
                            </div>
                            <DarkMode isDark={isDark} setIsDark={setIsDark} />
                            <div className="hidden lg:block">
                                <ContactUs name='call' />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <DisclosurePanel className="lg:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3">
                            {navigation.map((item) => (
                                item.name === t('navbar.contact') ? (
                                    <HashLink
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'text-gray-900 border-b-2 border-[var(--primary-yellow)]'
                                                : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-[var(--primary-yellow)]',
                                            'px-2 py-2 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap'
                                        )}
                                    >
                                        {item.name}
                                    </HashLink>
                                ) : (

                                    <DisclosureButton
                                        onClick={() => window.scrollTo(0, 0)}
                                        key={item.name}
                                        as={Link}
                                        to={item.href}
                                        className={classNames(
                                            item.current ? 'text-gray-900 border-b-2 border-[var(--primary-yellow)]'
                                                : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-[var(--primary-yellow)]',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                )
                            ))}
                            <ContactUs name='call' mobile />
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            </div>
        </div>
    );
}