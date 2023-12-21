import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en/en.json";
import frTranslations from "../locales/fr/fr.json";
import huTranslations from "../locales/hu/hu.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
    hu: {
      translation: huTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
