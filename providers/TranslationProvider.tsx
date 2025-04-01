'use client'

import { Locale } from '@/i18n.config'
import { NameSpace } from '@/lib/translations'
import { createContext, ReactNode, useContext } from 'react'

export type Translations = Record<string, NameSpace> // Represents translations by locale
export type GetNameSpaceItems = (namespace: NameSpace) => NameSpace | null

export interface TranslationProviderProps {
  children: ReactNode
  translation: Record<Locale, Translations>
  locale: Locale
}

export interface TranslationContextType {
  translation: Record<Locale, Translations>
  locale: Locale
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
)

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
  translation,
  locale
}) => {
  const getNameSpaceItems: GetNameSpaceItems = (nameSpace: NameSpace) => {
    return translation[locale]?.[nameSpace] || null
  }

  return (
    <TranslationContext.Provider value={{ translation, locale }}>
      {children}
    </TranslationContext.Provider>
  )
}
export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a translationProvider')
  }
  const { translation, locale } = context

  const t = (nameSpace: NameSpace, key: any) => {
    return translation[locale][nameSpace][key] || key
  }

  const getValueForAllLocales = (nameSpace: NameSpace, key: any) => {
    const allLocales = {} as Record<Locale, any>
    Object.keys(translation).forEach((locale): void => {
      allLocales[locale as Locale] =
        translation[locale as Locale][nameSpace][key] || key
    })

    return allLocales
  }

  return { t, getValueForAllLocales }
}
