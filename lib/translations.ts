import { i18n, Locale } from "@/i18n.config"
import { getDictionary, getAllDictionaries } from "./dictionary"
import { downLoadFile, getFilesInFolder } from '@/services/drive/queries'
import { Session } from 'next-auth';

interface TranslationFile {
    readonly id: string | null;
    readonly name: string | null;
    readonly locale: Locale;
}

export type NameSpace = 'navigation' | 'home' | 'dashboard' | 'about' | 'auth' | 'footer';

type TranlsationContent<Namespaces extends string> = {
    [Namespace in Namespaces]: Record<string, any>; // Allow flexible content in each namespace
};

type Translation<Locales extends string, Namespaces extends string> = {
    [Locale in Locales]: TranlsationContent<Namespaces>; // Map locales to their namespaces
};


export interface TranslationValue {
    keyPath: string[],
    value: string
}


export const getTranslationFileIds = async () => {
    const fetchResult = await getFilesInFolder(i18n.driveFolderName, 'application/json');;

    if (!fetchResult || !fetchResult.length) {
        console.error('Error fetching translation files:', fetchResult);
        return null;
    }
    const files: TranslationFile[] = fetchResult.map(file => {
        const { id, name } = file;
        const locale = (name?.split('.')[0] || i18n.defaultLocale) as Locale; // default to i18n default
        return {
            id: id || null,
            name: name || null,
            locale
        };
    })
    return files;
}


export const getTranslationFiles = async (locale: Locale) => {

    const files = await getTranslationFileIds();
    if (!files) {
        console.error('No translation files found, returning default');
        return { [locale]: await getDictionary(locale) };
    }
    const translation = files.find(file => file.locale === locale);
    if (!translation) {
        console.error(`No translation file found for ${locale}!, returning default`);
        return { [locale]: await getDictionary(locale) };
    }
    const file = await downLoadFile(translation.id as string);
    if (!file) {
        return { [locale]: await getDictionary(locale) };
    }
    console.log(file)
    return { [locale]: file };
}

export const getAllTranslationFiles = async () => {
    try {
        const files = await getTranslationFileIds();

        if (!files || files.length === 0) {
            console.error('No translation files found, returning default');
            return await getAllDictionaries();
        }
        // Initialize translations with locales
        interface Translation {
            fileIds?: Record<Locale, string>;
            hu: any; // Allow flexible content in each locale
            en: any; // Allow flexible content in each locale
            de: any; // Allow flexible content in each locale
        }
        let fileIds = {} as Record<Locale, string>;
        files.forEach(({ locale, id }) => {
            if (id) {
                fileIds[locale] = id;
            }
        });
        const translations: Translation = { fileIds, hu: undefined, en: undefined, de: undefined };

        // Resolve files in parallel
        const filePromises = files
            .filter(({ id }) => id)
            .map(async ({ id, locale }) => {
                const file = await downLoadFile(id as string);
                translations[locale] = file;
            });

        await Promise.all(filePromises); // Wait for all downloads to complete
        return translations;
    } catch (error) {
        console.error('Error fetching translation files:', error);
        throw error; // Rethrow error to allow upstream handling
    }
};

export const getTranslation = async (session: Session | null, locale: Locale) => {
    if (!session) {
        return await getTranslationFiles(locale)
    }
    return await getAllTranslationFiles()
}

/** 
* Returns translation value
* 
* @param {string} nameSpace First level key
* @param {string} key Key to search for 
* @param {Locale} locale Language to search for
*/
/* export const getTranslationValueByLocale = async (nameSpace: NameSpace, key: string, locale: Locale): Promise<TranslationValue | null> => {
    const values = await getTranslation(locale);
    const path = [nameSpace, key];
    const currentNameSpace = values[nameSpace] as Translation;
    return { keyPath: path, value: currentNameSpace[key] ?? null }
} */
/** 
* Returns translation values in all languages
* 
* @param {string} nameSpace First level key
* @param {string} key Key to search for 
*/
/* export const getTranslationValuesByKey = async (nameSpace: NameSpace, key: string,) => {
    const locales = i18n.locales
    return Promise.all(locales.map(locale => getTranslationValueByLocale(nameSpace, key, locale)))
} */

/* export const getTranslationValuesByNameSpace = async (nameSpace: NameSpace, locale: Locale) => {
    const values = await getTranslation(locale);
    const path = [nameSpace];
    const currentNameSpace = values[nameSpace] as Translation;
    return { keyPath: path, value: currentNameSpace ?? null }
} */
