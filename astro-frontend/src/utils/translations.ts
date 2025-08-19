import navigationTranslations from './lang/navigation.json';
import type { CountryCode, FooterTranslations, NavigationTranslations, SupportedLanguage, Translations } from './types';
export const languages: Record<string, string> = {
	ke: "en-KE",
	cbv: "pt-cbv",
	mz: "pt-MZ",
	tz: "en-TZ",
	st: "pt-ST",
};
// export function getLanguageFromCountry(country: string): 'en' | 'pt' {
//     const ptCountries = ['cbv', 'mz', 'st'];
//     return ptCountries.includes(country) ? 'pt' : 'en';
// }

// export function translateNavItem(item: string, country: string): string {
//     const lang = getLanguageFromCountry(country);
//     const translations = navigationTranslations[lang].nav;
//     return translations[item.toLowerCase() as keyof typeof translations] || item;
// }

// export function translateFooterItem(item: string, country: string): string {
//     const lang = getLanguageFromCountry(country);
//     const translations = navigationTranslations[lang].footer;
//     return translations[item as keyof typeof translations] || item;
// }

// i18n.ts
export const COUNTRY_LANGUAGE_MAP: Record<CountryCode, string> = {
  ke: "en-KE",
  cbv: "pt-cbv",
  mz: "pt-MZ",
  tz: "en-TZ",
  stm: "pt-ST",
} as const;

const PORTUGUESE_COUNTRIES: ReadonlySet<CountryCode> = new Set(['cbv', 'mz', 'stm']);

/**
 * Determines the language based on country code
 * @param country - The country code (e.g., 'ke', 'cbv', 'mz', 'tz', 'st')
 * @returns The language code ('en' or 'pt')
 * @throws Error if country code is not supported
 */
export function getLanguageFromCountry(country: string): SupportedLanguage {
  if (!isValidCountryCode(country)) {
    console.warn(`Unsupported country code: ${country}. Defaulting to English.`);
    return 'en';
  }
  
  return PORTUGUESE_COUNTRIES.has(country as CountryCode) ? 'pt' : 'en';
}

/**
 * Type guard to check if a string is a valid country code
 */
function isValidCountryCode(country: string): country is CountryCode {
  return country in COUNTRY_LANGUAGE_MAP;
}

/**
 * Type guard to check if a string is a valid navigation key
 */
function isValidNavKey(key: string): key is keyof NavigationTranslations {
  return ['home', 'about', 'services', 'products', 'contact'].includes(key);
}

/**
 * Type guard to check if a string is a valid footer key
 */
function isValidFooterKey(key: string): key is keyof FooterTranslations {
  return ['copyright', 'designed_by'].includes(key);
}

/**
 * Translates a navigation item based on country
 * @param item - The navigation item key
 * @param country - The country code
 * @returns The translated navigation item or the original item if translation not found
 */
export function translateNavItem(item: string, country: string): string {
  try {
    const lang = getLanguageFromCountry(country);
    const translations = navigationTranslations[lang]?.nav;
    
    if (!translations) {
      console.warn(`No navigation translations found for language: ${lang}`);
      return item;
    }
    
    const normalizedItem = item.toLowerCase();
    
    if (!isValidNavKey(normalizedItem)) {
      console.warn(`Unknown navigation key: ${normalizedItem}`);
      return item;
    }
    
    return translations[normalizedItem] || item;
  } catch (error) {
    console.error(`Error translating navigation item "${item}":`, error);
    return item;
  }
}

/**
 * Translates a footer item based on country
 * @param item - The footer item key
 * @param country - The country code
 * @returns The translated footer item or the original item if translation not found
 */
export function translateFooterItem(item: string, country: string): string {
  try {
    const lang = getLanguageFromCountry(country);
    const translations = navigationTranslations[lang]?.footer;
    
    if (!translations) {
      console.warn(`No footer translations found for language: ${lang}`);
      return item;
    }
    
    if (!isValidFooterKey(item)) {
      console.warn(`Unknown footer key: ${item}`);
      return item;
    }
    
    return translations[item] || item;
  } catch (error) {
    console.error(`Error translating footer item "${item}":`, error);
    return item;
  }
}

/**
 * Gets the full locale string for a country
 * @param country - The country code
 * @returns The full locale string (e.g., 'en-KE', 'pt-cbv')
 */
export function getLocaleFromCountry(country: string): string {
  if (!isValidCountryCode(country)) {
    console.warn(`Unsupported country code: ${country}. Defaulting to en-US.`);
    return 'en-US';
  }
  
  return COUNTRY_LANGUAGE_MAP[country as CountryCode];
}

/**
 * Gets all available translations for a specific language
 * @param lang - The language code
 * @returns The complete translation object for the language
 */
export function getTranslations(lang: SupportedLanguage): Translations | null {
  return navigationTranslations[lang] || null;
}

/**
 * Checks if a language is supported
 * @param lang - The language code to check
 * @returns True if the language is supported
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return lang === 'en' || lang === 'pt';
}