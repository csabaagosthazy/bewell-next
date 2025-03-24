'use client'

import { Translation } from '@/lib/translations'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthButton({ auth }: { auth: Translation }) {
  const { data: session } = useSession()

  return (
    <>
      {session ? (
        <button
          onClick={() => signOut()}
          className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          {auth.signout}
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className='mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          {auth.signin}
        </button>
      )}
    </>
  )
}
