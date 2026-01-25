"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, t, TranslationKeys } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "swasthyaos-language",
    ) as Language;
    const validLanguages: Language[] = [
      "en",
      "hi",
      "kn",
      "ta",
      "te",
      "ml",
      "gu",
      "bn",
    ];
    if (savedLanguage && validLanguages.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("swasthyaos-language", newLanguage);

    // Update document language attribute
    document.documentElement.lang = newLanguage;

    // Update document direction for RTL languages (future use)
    document.documentElement.dir = "ltr"; // All Indian languages are LTR
  };

  // Translation function that uses current language
  const translate = (key: keyof TranslationKeys) => t(key, language);

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: translate,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook for getting translation function
export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}
