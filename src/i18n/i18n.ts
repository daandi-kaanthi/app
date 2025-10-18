import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Load JSON files
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import es from "./locales/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, hi: { translation: hi }, es: { translation: es } },
    fallbackLng: "hi",
    interpolation: { escapeValue: false },
  });

export default i18n;
