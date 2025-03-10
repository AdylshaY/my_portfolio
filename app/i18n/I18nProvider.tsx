'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nClient from './client';
import { fallbackLng } from './settings';

type I18nProviderProps = {
  children: ReactNode;
  locale?: string;
};

export function I18nProvider({ children, locale }: I18nProviderProps) {
  // Dil değiştiğinde i18n'i güncelle
  useEffect(() => {
    if (locale && i18nClient.language !== locale) {
      i18nClient.changeLanguage(locale);
    }
  }, [locale]);

  // Sayfa yüklendiğinde localStorage'dan dil tercihini kontrol et
  useEffect(() => {
    const storedLang = localStorage.getItem('i18nextLng');
    const browserLang = navigator.language.split('-')[0];
    const detectedLang = storedLang || ((['tr', 'en'].includes(browserLang)) ? browserLang : fallbackLng);
    
    if (i18nClient.language !== detectedLang) {
      i18nClient.changeLanguage(detectedLang);
    }
  }, []);

  return <I18nextProvider i18n={i18nClient}>{children}</I18nextProvider>;
} 