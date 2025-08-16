import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'ar', label: 'العربية' },
        { code: 'ur', label: 'اردو' }
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language);

    const changeLang = (lng) => {
        i18n.changeLanguage(lng);
        document.documentElement.dir = lng === 'ar' || lng === 'ur' ? 'rtl' : 'ltr';
        document.body.lang = lng;
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 
                           px-2 py-1 text-xs
                           sm:px-3 sm:py-1.5 sm:text-sm
                           rounded-full bg-gray-100 hover:bg-gray-200 
                           transition-colors border-2 border-gray-500 
                           cursor-pointer"
            >
                <span className="font-medium">{currentLanguage?.label}</span>
                <ChevronDownIcon className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-24 sm:w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                    <div>
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => changeLang(lang.code)}
                                className={`block w-full text-left px-3 py-1 text-xs sm:text-sm
                                    ${i18n.language === lang.code
                                        ? 'bg-[var(--primary-yellow)] text-[var(--primary-dark-bg)]'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LanguageSwitcher;
