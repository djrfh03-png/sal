import type { LocalizedName } from '../types';
import type { LanguageCode } from '../i18n/languages';

export function localize(field: LocalizedName, lang: LanguageCode): string {
  return field[lang] ?? field.ar ?? field.en ?? '';
}
