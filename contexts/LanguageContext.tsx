"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ru");

  useEffect(() => {
    // Загружаем язык из localStorage или определяем по браузеру
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && ["ru", "uk", "tr", "en"].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      // Определяем язык браузера
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "tr") {
        setLanguageState("tr");
      } else if (browserLang === "uk") {
        setLanguageState("uk");
      } else if (browserLang === "en") {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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
