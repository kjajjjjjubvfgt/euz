import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import trTranslation from './tr.json';
import enTranslation from './en.json';
import { useSettingsStore } from '../store';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: trTranslation
      },
      en: {
        translation: enTranslation
      }
    },
    lng: useSettingsStore.getState().language,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

// Listen for language changes in the settings store
useSettingsStore.subscribe(
  (state) => {
    if (i18n.language !== state.language) {
      i18n.changeLanguage(state.language);
    }
  },
  (state) => state.language
);

export default i18n;