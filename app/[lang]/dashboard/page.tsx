import { Locale } from '@/i18n.config'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/_options'

import AuthButton from '@/components/auth-button'
import { getTranslation, NameSpace } from '@/lib/translations'
import CustomText from '@/components/CustomText/CustomText'

const NAMESPACE: NameSpace = 'dashboard'

export default async function Dashboard({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const translation = await getTranslation(null, lang)
  const translations = translation[lang][NAMESPACE]
  const auth = translation[lang].auth
  const session = await getServerSession(authOptions)
  const user = session?.user
  return (
    <section className='page'>
      <div className='container'>
        <CustomText textType='3xl' tName={NAMESPACE} tKey={'title'} />
        <h1 className='text-3xl font-bold'>{translations.title}</h1>
        <p className='text-gray-500'>{translations.description}</p>

        <div className='mt-6'>
          <pre className='mt-4'>
            <code>{JSON.stringify({ name: user?.name }, null, 2)}</code>
          </pre>

          <AuthButton />
        </div>
      </div>
    </section>
  )
}
