import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import trTranslation from './tr.json';
import enTranslation from './en.json';

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
    lng: 'tr', // Default language
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

// We'll set up the subscription to settings store after initialization
// to avoid circular dependency issues
setTimeout(() => {
  // Import here to avoid circular dependency
  import('../store').then(({ useSettingsStore }) => {
    // Set initial language from settings if available
    const initialLang = useSettingsStore.getState().language;
    if (initialLang && i18n.language !== initialLang) {
      i18n.changeLanguage(initialLang);
    }
  
    // Listen for language changes in the settings store
    useSettingsStore.subscribe(
      (state) => {
        if (i18n.language !== state.language) {
          i18n.changeLanguage(state.language);
        }
      }
    );
  });
}, 0);

export default i18n;