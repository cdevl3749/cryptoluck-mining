import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import ja from "./locales/ja.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: "fr", // langue par défaut
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

