'use client'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import { usePathname } from 'next/navigation'

import { i18n, Locale } from '@/i18n.config'

import './LocaleSwitcher.css'

import huFlag from '@/data/images/flags/hu.png'
import enFlag from '@/data/images/flags/en.png'
import deFlag from '@/data/images/flags/de.png'
import Image from 'next/image'

export default function LocaleSwitcher({
  currentLocale
}: {
  currentLocale: Locale
}) {
  const pathName = usePathname()

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const handleLanguageChange = (locale: Locale) => {
    redirect(redirectedPathName(locale))
  }

  const getFlag = (locale: Locale) => {
    const flags = {
      hu: huFlag,
      en: enFlag,
      de: deFlag
    }

    return (
      <Image className='w-16 bg-none p-0' src={flags[locale]} alt={locale} />
    )
  }

  return (
    <>
      <div className='flag-dropdown'>
        <button className='dropdown-button'>
          <span>{getFlag(currentLocale)}</span>
        </button>
        <div className='dropdown-menu'>
          {i18n.locales.map(locale => (
            <div key={locale} onClick={() => handleLanguageChange(locale)}>
              {getFlag(locale)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
