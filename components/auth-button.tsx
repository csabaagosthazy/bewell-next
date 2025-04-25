'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

import { NameSpace } from '@/lib/translations'
import { useTranslation } from '@/providers/TranslationProvider'

const NAMESPACE: NameSpace = 'auth'

export default function AuthButton() {
  const { data: session } = useSession()
  const { t } = useTranslation()

  return (
    <>
      {session ? (
        <button
          onClick={() => signOut()}
          className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          {t(NAMESPACE, 'signin')}
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          {t(NAMESPACE, 'signout')}
        </button>
      )}
    </>
  )
}
