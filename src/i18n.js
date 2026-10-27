// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// Start in the language the URL is already in (/ar/..., /ur/...), not
// always "en". The prerendered HTML for those routes is already Arabic/Urdu,
// and the first client render has to produce that same content -- starting
// in English and switching later (MainLayout's effect) meant the first
// render was the wrong language.
const SUPPORTED_LANGS = ["en", "ar", "ur"];
const urlLang = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";
const initialLng = SUPPORTED_LANGS.includes(urlLang) ? urlLang : "en";

// Resolves once the initial language's translations are loaded. main.jsx
// waits on it so the first render never suspends on i18n resources.
export const i18nReady = i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: initialLng,
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
