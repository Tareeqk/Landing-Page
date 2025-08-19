// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)   // 👈 THIS was missing
  .init({
    lng: "en",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    debug: true,
    backend: {
      loadPath: "/Landing-Page/locales/{{lng}}/{{ns}}.json", // ✅ includes repo name
    },
  });

export default i18n;
