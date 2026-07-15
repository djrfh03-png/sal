export type LanguageCode = 'ar' | 'en' | 'am' | 'om';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  dir: 'rtl' | 'ltr';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'am', label: 'Amharic', nativeLabel: 'አማርኛ', dir: 'ltr' },
  { code: 'om', label: 'Afaan Oromo', nativeLabel: 'Afaan Oromoo', dir: 'ltr' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'ar';
