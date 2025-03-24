import { i18n, Locale } from "@/i18n.config"
import { getTranslationFile } from "./dictionary"

export type NameSpace = 'navigation' | 'home' | 'dashboard' | 'auth';

export type Translation = Record<string, string>

export type Translations = {
    [key in NameSpace]: Translation;
}

export interface TranslationValue {
    keyPath: string[],
    value: string
}

/** 
* Returns translation value
* 
* @param {string} nameSpace First level key
* @param {string} key Key to search for 
* @param {Locale} locale Language to search for
*/
export const getTranslationValueByLocale = async (nameSpace: NameSpace, key: string, locale: Locale): Promise<TranslationValue | null> => {
    const values = await getTranslationFile(locale);
    const path = [nameSpace, key];
    const currentNameSpace = values[nameSpace] as Translation;
    return { keyPath: path, value: currentNameSpace[key] ?? null }
}
/** 
* Returns translation values in all languages
* 
* @param {string} nameSpace First level key
* @param {string} key Key to search for 
*/
export const getTranslationValuesByKey = async (nameSpace: NameSpace, key: string,) => {
    const locales = i18n.locales
    return Promise.all(locales.map(locale => getTranslationValueByLocale(nameSpace, key, locale)))
}

export const getTranslationValuesByNameSpace = async (nameSpace: NameSpace, locale: Locale) => {
    const values = await getTranslationFile(locale);
    const path = [nameSpace];
    const currentNameSpace = values[nameSpace] as Translation;
    return { keyPath: path, value: currentNameSpace ?? null }
}
