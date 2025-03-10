'use client';

import i18next, { i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions, fallbackLng } from './settings';
import LanguageDetector from 'i18next-browser-languagedetector';

// Tarayıcı dilini algılama fonksiyonu
const detectUserLanguage = (): string => {
  if (typeof window === 'undefined') return fallbackLng;

  try {
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang) return storedLang;
    
    const browserLang = navigator.language.split('-')[0];
    return ['tr', 'en'].includes(browserLang) ? browserLang : fallbackLng;
  } catch {
    return fallbackLng;
  }
};

// Client-side i18n instance
const i18nClient: i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector) // Dil algılama eklentisi
  .use(resourcesToBackend((language: string, namespace: string) => 
    import(`./locales/${language}/${namespace}.json`)));

// i18n'i başlat
if (!i18nClient.isInitialized) {
  i18nClient.init({
    ...getOptions(),
    lng: detectUserLanguage(),
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    preload: ['tr', 'en'], // Önceden yüklenecek diller
  });
}

export default i18nClient;
