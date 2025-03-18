export const i18n = {
  defaultLocale: 'hu',
  locales: ['hu', 'en', 'de']
} as const

export type Locale = (typeof i18n)['locales'][number]
