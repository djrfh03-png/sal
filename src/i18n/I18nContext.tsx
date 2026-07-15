import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE, type LanguageCode, type LanguageOption } from './languages';
import { ar } from './translations/ar';
import { en } from './translations/en';
import { am } from './translations/am';
import { om } from './translations/om';
import type { TranslationKeys } from './translations/ar';

const translations: Record<LanguageCode, TranslationKeys> = { ar, en, am, om };

interface I18nContextValue {
  lang: LanguageCode;
  dir: 'rtl' | 'ltr';
  t: TranslationKeys;
  languages: LanguageOption[];
  setLang: (code: LanguageCode) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'dar-al-quran-lang';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;
    }
    return DEFAULT_LANGUAGE;
  });

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? 'rtl';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const setLang = useCallback((code: LanguageCode) => setLangState(code), []);

  const value: I18nContextValue = {
    lang,
    dir,
    t: translations[lang],
    languages: LANGUAGES,
    setLang,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function useTranslation() {
  return useI18n().t;
}
