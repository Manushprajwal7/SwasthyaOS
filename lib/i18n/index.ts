// Main i18n export file
import { Language, TranslationKeys, languages } from "./types";
import { en } from "./en";
import { hi } from "./hi";
import { kn } from "./kn";
import { ta } from "./ta";
import { te } from "./te";
import { ml } from "./ml";
import { gu } from "./gu";
import { bn } from "./bn";

export const translations: Record<Language, TranslationKeys> = {
  en,
  hi,
  kn,
  ta,
  te,
  ml,
  gu,
  bn,
};

// Translation function
export function t(
  key: keyof TranslationKeys,
  language: Language = "en",
): string {
  return translations[language][key] || translations.en[key] || key;
}

// Format numbers according to locale
export function formatNumber(num: number, language: Language = "en"): string {
  const localeMap: Record<Language, string> = {
    en: "en-IN",
    hi: "hi-IN",
    kn: "kn-IN",
    ta: "ta-IN",
    te: "te-IN",
    ml: "ml-IN",
    gu: "gu-IN",
    bn: "bn-IN",
  };
  return new Intl.NumberFormat(localeMap[language]).format(num);
}

// Format dates according to locale
export function formatDate(date: Date, language: Language = "en"): string {
  const localeMap: Record<Language, string> = {
    en: "en-IN",
    hi: "hi-IN",
    kn: "kn-IN",
    ta: "ta-IN",
    te: "te-IN",
    ml: "ml-IN",
    gu: "gu-IN",
    bn: "bn-IN",
  };
  return new Intl.DateTimeFormat(localeMap[language], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// Format time according to locale
export function formatTime(date: Date, language: Language = "en"): string {
  const localeMap: Record<Language, string> = {
    en: "en-IN",
    hi: "hi-IN",
    kn: "kn-IN",
    ta: "ta-IN",
    te: "te-IN",
    ml: "ml-IN",
    gu: "gu-IN",
    bn: "bn-IN",
  };
  return new Intl.DateTimeFormat(localeMap[language], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

// Export types and language info
export type { Language, TranslationKeys } from "./types";
export { languages } from "./types";
