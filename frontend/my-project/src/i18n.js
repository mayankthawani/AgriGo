import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './utils/i18n';

const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Add language change listener to update localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;