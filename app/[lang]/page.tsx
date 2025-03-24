import { Locale } from '@/i18n.config'
import { getTranslationFile } from '@/lib/dictionary'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/_options'

import AuthButton from '@/components/auth-button'
import CustomText from '@/components/CustomText/CustomText'
import {
  getTranslationValueByLocale,
  getTranslationValuesByKey,
  getTranslationValuesByNameSpace,
  NameSpace
} from '@/lib/translations'

export default async function Home({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const nameSpace: NameSpace = 'home'
  const { lang } = await params
  const { value: home } = await getTranslationValuesByNameSpace(nameSpace, lang)
  const { value: auth } = await getTranslationValuesByNameSpace('auth', lang)
  const textValues = await getTranslationValuesByKey('home', 'title')

  console.log('textValues', textValues)
  const session = await getServerSession(authOptions)
  console.log('session', session)
  const user = session?.user

  return (
    <section className='py-24'>
      <div className='container'>
        <CustomText textType='3xl'>{home?.title}</CustomText>
        <h1 className='text-3xl font-bold'>{home?.title}</h1>
        <p className='text-gray-500'>{home?.description}</p>

        <div className='mt-6'>
          <pre className='mt-4'>
            <code>{JSON.stringify({ name: user?.name }, null, 2)}</code>
          </pre>

          <AuthButton auth={auth} />
        </div>
      </div>
    </section>
  )
}
