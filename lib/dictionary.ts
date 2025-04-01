import 'server-only'

import { Locale, i18n } from '@/i18n.config'


const dictionaries = {
  hu: () => import('@/dictionaries/hu.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  de: () => import('@/dictionaries/de.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const getAllDictionaries = async () => {
  const keys = Object.keys(dictionaries)
  const promises = keys.map(key => dictionaries[key as keyof typeof dictionaries]())
  return Promise.all(promises).then(resolvedData => {
    const resolvedObject: Record<Locale, any> = {
      hu: undefined,
      en: undefined,
      de: undefined
    };
    keys.forEach((key, index) => {
      resolvedObject[key as Locale] = resolvedData[index];
    });
    return resolvedObject;
  })
}

