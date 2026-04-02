import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enAnalysis from "./locales/en/analysis.json";
import enAuth from "./locales/en/auth.json";
import enCommon from "./locales/en/common.json";
import enDashboard from "./locales/en/dashboard.json";
import enHistory from "./locales/en/history.json";
import enHome from "./locales/en/home.json";
import enLayout from "./locales/en/layout.json";
import enStatistics from "./locales/en/statistics.json";
import skAnalysis from "./locales/sk/analysis.json";
import skAuth from "./locales/sk/auth.json";
import skCommon from "./locales/sk/common.json";
import skDashboard from "./locales/sk/dashboard.json";
import skHistory from "./locales/sk/history.json";
import skHome from "./locales/sk/home.json";
import skLayout from "./locales/sk/layout.json";
import skStatistics from "./locales/sk/statistics.json";

const LANGUAGE_STORAGE_KEY = "slofactcheck-language";
const FALLBACK_LANGUAGE = "en";

const SUPPORTED_LANGUAGES = ["en", "sk"];
const LANGUAGE_LOCALES = {
  en: "en-US",
  sk: "sk-SK",
};

export const LANGUAGE_OPTIONS = [
  { code: "en", label: "EN" },
  { code: "sk", label: "SK" },
];

const normalizeLanguage = (language) => {
  const languageCode = String(language || "")
    .toLowerCase()
    .split("-")[0];

  return SUPPORTED_LANGUAGES.includes(languageCode) ? languageCode : FALLBACK_LANGUAGE;
};

const resolveInitialLanguage = () => {
  if (typeof window === "undefined") {
    return FALLBACK_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (storedLanguage) {
    return normalizeLanguage(storedLanguage);
  }

  return normalizeLanguage(window.navigator.language);
};

const syncDocumentLanguage = (language) => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = normalizeLanguage(language);
};

export const getDateLocale = (language) => LANGUAGE_LOCALES[normalizeLanguage(language)] ?? LANGUAGE_LOCALES[FALLBACK_LANGUAGE];

const resources = {
  en: {
    analysis: enAnalysis,
    auth: enAuth,
    common: enCommon,
    dashboard: enDashboard,
    history: enHistory,
    home: enHome,
    layout: enLayout,
    statistics: enStatistics,
  },
  sk: {
    analysis: skAnalysis,
    auth: skAuth,
    common: skCommon,
    dashboard: skDashboard,
    history: skHistory,
    home: skHome,
    layout: skLayout,
    statistics: skStatistics,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: resolveInitialLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

syncDocumentLanguage(i18n.language);

i18n.on("languageChanged", (language) => {
  const nextLanguage = normalizeLanguage(language);
  syncDocumentLanguage(nextLanguage);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }
});

export default i18n;
