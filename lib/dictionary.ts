import 'server-only'
import type { Locale } from '@/i18n.config'
import { downLoadFile, getTranslation } from '@/services/drive/functions'
import { Translations } from './translations';

interface TranslationFile {
  readonly id: string | null;
  readonly name: string | null;
  readonly locale: Locale;
}

const dictionaries = {
  hu: () => import('@/dictionaries/hu.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  de: () => import('@/dictionaries/de.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const getAllDictionaries = async () => {
  const keys = Object.keys(dictionaries) as Locale[]
  const dictionariesArray = await Promise.all(
    keys.map(key => dictionaries[key]())
  )
  return dictionariesArray
}

export const getTranslationFileIds = async () => {
  const fetchResult = await getTranslation();

  if (!fetchResult || !fetchResult.length) {
    console.error('Error fetching translation files:', fetchResult);
    return null;
  }
  const files: TranslationFile[] = fetchResult.map(file => {
    const { id, name } = file;
    const locale = (name?.split('.')[0] || 'en') as Locale; // default to en
    return {
      id: id || null,
      name: name || null,
      locale
    };
  })
  return files;
}


export const getTranslationFile = async (locale: Locale) => {

  const files = await getTranslationFileIds();
  if (!files) {
    console.error('No translation files found, returning default');
    return getDictionary(locale);
  }
  const translation = files.find(file => file.locale === locale);
  if (!translation) {
    console.error(`No translation file found for ${locale}!, returning default`);
    return getDictionary(locale);
  }
  const file = await downLoadFile(translation.id as string);
  if (!file) {
    return getDictionary(locale);
  }

  return file as Translations;
}

const getTranslationFiles = async () => {
  const files = await getTranslationFileIds();
  if (!files) {
    console.error('No translation files found, returning default');
    return getAllDictionaries();
  }

  const translations = files
    .filter(file => file.id !== null && file.id !== undefined)
    .map(({ id, locale }) => {
      return downLoadFile(id as string)
        .then(file => ({ [locale]: file }))
    });

  return Promise.all(translations);
}