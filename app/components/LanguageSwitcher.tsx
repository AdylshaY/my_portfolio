'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../i18n/client';

type Language = 'tr' | 'en';

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const currentLang = i18n.language as Language || 'tr';

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyToggleDropdown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleLanguageChange = async (lang: Language) => {
    await i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  const handleKeyLanguageChange = async (e: React.KeyboardEvent<HTMLButtonElement>, lang: Language) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      await i18n.changeLanguage(lang);
      setIsOpen(false);
    }
  };

  return (
    <div className='relative'>
      <button
        onClick={handleToggleDropdown}
        onKeyDown={handleKeyToggleDropdown}
        className='flex items-center space-x-1 px-3 py-1 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors'
        aria-label={`Change language. Current language: ${currentLang === 'tr' ? 'Turkish' : 'English'}`}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        tabIndex={0}
      >
        <span className='text-sm font-medium'>{currentLang.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='absolute right-0 mt-2 py-2 w-24 bg-popover rounded-lg shadow-lg border border-border'
          role='listbox'
          aria-label='Language options'
        >
          <button
            onClick={() => handleLanguageChange('tr')}
            onKeyDown={(e) => handleKeyLanguageChange(e, 'tr')}
            className={`w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground ${
              currentLang === 'tr' ? 'text-primary' : 'text-foreground'
            }`}
            role='option'
            aria-selected={currentLang === 'tr'}
            tabIndex={0}
          >
            Türkçe
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            onKeyDown={(e) => handleKeyLanguageChange(e, 'en')}
            className={`w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground ${
              currentLang === 'en' ? 'text-primary' : 'text-foreground'
            }`}
            role='option'
            aria-selected={currentLang === 'en'}
            tabIndex={0}
          >
            English
          </button>
        </motion.div>
      )}
    </div>
  );
}
