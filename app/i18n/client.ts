'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions, fallbackLng } from './settings';

const detectUserLanguage = (): string => {
  if (typeof window === 'undefined') return fallbackLng;

  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang) return storedLang;

  const browserLang = navigator.language.split('-')[0];
  return ['tr', 'en'].includes(browserLang) ? browserLang : fallbackLng;
};

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: detectUserLanguage(),
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18next;
