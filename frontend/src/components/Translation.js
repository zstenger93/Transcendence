import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en/en.json";
import frTranslations from "../locales/fr/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },

    // Add more language translations as needed
  },
  lng: "fr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
