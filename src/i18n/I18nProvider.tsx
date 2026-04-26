import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupportedLanguage, type SupportedLanguage } from "./types";
import { translate } from "./translations";

const STORAGE_KEY = "bella-cucina:lang";

type I18nContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isSupportedLanguage(saved) ? saved : "pt";
  });

  const setLanguage = (lang: SupportedLanguage) => {
    localStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    document.documentElement.lang =
      language === "pt" ? "pt-BR" : language === "it" ? "it" : "en";
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: (path: string) => translate(language, path),
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
