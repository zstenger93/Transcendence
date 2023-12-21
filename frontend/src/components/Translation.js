import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locales/en/translation.json";
import frTranslations from "../locales/fr/translation.json";
import huTranslations from "../locales/hu/translation.json";
import deTranslations from "../locales/de/translation.json";
import jpTranslations from "../locales/jp/translation.json";

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
    de: {
      translation: deTranslations,
    },
	jp: {
		translation: jpTranslations,
	  },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
